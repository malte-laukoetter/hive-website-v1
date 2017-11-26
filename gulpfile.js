/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

'use strict';

const hive = require('hive-api');
const del = require('del');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const mergeStream = require('merge-stream');
const polymerBuild = require('polymer-build');
const runSequence = require('run-sequence');
const cache = require('gulp-cache');


// Here we add tools that will be used to process our source files.
const imagemin = require('gulp-imagemin');

// Additional plugins can be used to optimize your source files after splitting.
// Before using each plugin, install with `npm i --save-dev <package-name>`
const uglifyjs = require('uglify-es');
const composer = require('gulp-uglify/composer');
const uglify = composer(uglifyjs, console);
const cssSlam = require('css-slam').gulp;
const htmlMinifier = require('gulp-html-minifier');
const htmlMinifierOptions = {
  collapseWhitespace: true,
  minifyCSS: true,
  removeComments: true
}

const fs = require('fs');
const { promisify } = require('util');
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

const buildDirectory = 'build';
const config = require('./hive-gamemodes-config');

/**
 * Waits for the given ReadableStream
 */
function waitFor(stream) {
  return new Promise((resolve, reject) => {
    stream.on('end', resolve);
    stream.on('error', reject);
  });
}

/**
 * default polymer build on the generated files in temp
 */
function buildPolymer() {
  process.chdir('./temp');

  const polymerProject = new polymerBuild.PolymerProject({
    "entrypoint": "index.html",
    "shell": "src/my-app.html",
    "fragments": [
      "src/hive-team-changes.html",
      "src/hive-leaderboard.html",
      "src/hive-profile.html",
      "src/hive-random-game.html",
      "src/hive-gamemode-stats.html"
    ],
    "sources": [
      "src/**/*",
      "images/**/*",
      "bower.json"
    ],
    "extraDependencies": [
      "manifest.json",
      "autotrack.js",
      "bower_components/webcomponentsjs/*.js",
      "bower_components/app-storage/app-indexeddb-mirror/*.js",
      "bower_components/firebase/*.js",
      "google61bee3df118b250a.html",
      "firebase-messaging-sw.js",
      "__/**"
    ]
  });

  return new Promise((resolve, reject) => { // eslint-disable-line no-unused-vars

    // Lets create some inline code splitters in case you need them later in your build.
    let sourcesStreamSplitter = new polymerBuild.HtmlSplitter();
    let dependenciesStreamSplitter = new polymerBuild.HtmlSplitter();

    // Okay, so first thing we do is clear the build directory
    console.log(`Deleting ${buildDirectory} directory...`);
    del([buildDirectory])
      .then(() => {

        // Let's start by getting your source files. These are all the files
        // in your `src/` directory, or those that match your polymer.json
        // "sources"  property if you provided one.
        let sourcesStream = polymerProject.sources()

          // If you want to optimize, minify, compile, or otherwise process
          // any of your source code for production, you can do so here before
          // merging your sources and dependencies together.
          .pipe(gulpif(/\.(png|gif|jpg|svg)$/, cache(imagemin())))

          // The `sourcesStreamSplitter` created above can be added here to
          // pull any inline styles and scripts out of their HTML files and
          // into seperate CSS and JS files in the build stream. Just be sure
          // to rejoin those files with the `.rejoin()` method when you're done.
          .pipe(sourcesStreamSplitter.split())

          // Uncomment these lines to add a few more example optimizations to your
          // source files, but these are not included by default. For installation, see
          // the require statements at the beginning.
          .pipe(gulpif(/\.js$/, uglify())) // Install gulp-uglify to use
          .pipe(gulpif(/\.css$/, cssSlam())) // Install css-slam to use
          .pipe(gulpif(/\.html$/, htmlMinifier(htmlMinifierOptions))) // Install gulp-html-minifier to use

          // Remember, you need to rejoin any split inline code when you're done.
          .pipe(sourcesStreamSplitter.rejoin());


        // Similarly, you can get your dependencies seperately and perform
        // any dependency-only optimizations here as well.
        let dependenciesStream = polymerProject.dependencies()
          .pipe(dependenciesStreamSplitter.split())
          .pipe(gulpif(/\.js$/, uglify())) // Install gulp-uglify to use
          .pipe(gulpif(/\.css$/, cssSlam())) // Install css-slam to use
          .pipe(gulpif(/\.html$/, htmlMinifier(htmlMinifierOptions))) // Install gulp-html-minifier to use
          // Add any dependency optimizations here.
          .pipe(dependenciesStreamSplitter.rejoin());


        // Okay, now let's merge your sources & dependencies together into a single build stream.
        let buildStream = mergeStream(sourcesStream, dependenciesStream)
          .once('data', () => {
            console.log('Analyzing build dependencies...');
          });

        // If you want bundling, pass the stream to polymerProject.bundler.
        // This will bundle dependencies into your fragments so you can lazy
        // load them.
        buildStream = buildStream.pipe(polymerProject.bundler());

        // Now let's generate the HTTP/2 Push Manifest
        buildStream = buildStream.pipe(polymerProject.addPushManifest());

        // Okay, time to pipe to the build directory
        buildStream = buildStream.pipe(gulp.dest(buildDirectory));

        // waitFor the buildStream to complete
        return waitFor(buildStream);
      })
      .then(() => {
        // Okay, now let's generate the Service Worker
        console.log('Generating the Service Worker...');
        return polymerBuild.addServiceWorker({
          project: polymerProject,
          buildRoot: buildDirectory,
          bundled: true,
          swPrecacheConfig: {
            staticFileGlobs: [
              '/index.html',
              '/manifest.json',
              '/bower_components/webcomponentsjs/*',
              '/images/*'
            ],
            navigateFallback: 'index.html',
            runtimeCaching: [{
              urlPattern: /^https:\/\/api\.hivemc\.com/,
              handler: 'networkFirst'
            }, {
              urlPattern: /^https:\/\/lergin\.de\/api\/cors\/^https:\/\/api\.hivemc\.com/,
              handler: 'networkFirst'
            }, {
              urlPattern: /^https:\/\/cors-anywhere\.herokuapp\.com\/https:\/\/api\.hivemc\.com/,
              handler: 'networkFirst'
            }]
          }
        });
      })
      .then(() => {
        // You did it!
        console.log('Build complete!');

        process.chdir('..');

        resolve();
      });
  });
}

function copyComponents() {
  return gulp.src(["components/**", "bower_components/**"]).pipe(gulp.dest('temp/bower_components'));
}

function copySrc() {
  return gulp.src(["src/**"]).pipe(gulp.dest('temp/src'));
}

function copyBaseFiles() {
  return gulp.src(["*.*"]).pipe(gulp.dest('temp'));
}

function copyImages() {
  return gulp.src(["images/**"]).pipe(gulp.dest('temp/images'));
}

function deleteTemp() {
  return del("temp/**");
}

function deleteBuild() {
  return del("build/**");
}

function deleteBuildTemp() {
  return del("build/temp/**");
}

function copyBuildFromTemp() {
  return gulp.src(["temp/build/**"]).pipe(gulp.dest('build'));
}

function copyFromTemp() {
  return gulp.src(["temp/**"]).pipe(gulp.dest('build'));
}

const replaceInBuffer = (buffer, a, b) => {
  const content = buffer.toString();
  return Buffer.from(content.replace(a, b));
}

gulp.task('clear', cache.clearAll);

gulp.task('deleteTemp', deleteTemp);
gulp.task('deleteBuild', deleteBuild);
gulp.task('deleteBuildTemp', deleteBuildTemp);

gulp.task('copyComponents', copyComponents);
gulp.task('copyStatic', copySrc);
gulp.task('copyImages', copyImages);
gulp.task('copyBaseFiles', copyBaseFiles);

gulp.task('copyToTemp', callback => runSequence("deleteTemp", ["copyComponents", "copyStatic", "copyBaseFiles", "copyImages"], callback));

gulp.task('polymer', buildPolymer);

gulp.task('copyBuildFromTemp', copyBuildFromTemp)
gulp.task('copyFromTemp', copyFromTemp)
/**
 * generate the tabs for the different gamemodes
 */
gulp.task('hiveGamemodeTabs-HiveProfileHtml', async ()=> {
  let buffer = await readFile('./temp/src/hive-profile.html');

  await hive.GameTypes.update();

  const gamemodeTabs = [...Object.entries(config.gameModeConfigs)].map(([key, val]) => `<li gamemode="${key}"><a>${hive.GameTypes[key].name}</a></li>`).join("");

  buffer = replaceInBuffer(buffer, /<!-- HIVE_GAMEMODES_TABS -->/, gamemodeTabs);

  return writeFile("./temp/src/hive-profile.html", buffer)
})

gulp.task('hiveGamemodeNames', async ()=> {
  const files = [
    './temp/src/hive-api.html',
    './temp/src/hive-gamemode-stats.html',
    './temp/src/hive-maps.html'
  ]

  let buffers = await Promise.all(files.map(a => readFile(a)));

  await hive.GameTypes.update();

  const gamemodeTabs = {};
  hive.GameTypes.list.forEach(gameType => gamemodeTabs[gameType.id] = gameType.name);
  
  buffers = buffers.map(buffer => replaceInBuffer(buffer, /\{\}\/\* HIVE_GAMEMODE_NAMES \*\//, JSON.stringify(gamemodeTabs)));

  return Promise.all(files.map((a,i) => writeFile(a, buffers[i])))
})

gulp.task('hiveGamemodes', callback => runSequence(['hiveGamemodeNames', 'hiveGamemodeTabs-HiveProfileHtml'], callback))


gulp.task('dev', callback => runSequence(["copyToTemp", "deleteBuild"], "hiveGamemodes", "copyFromTemp", ["deleteTemp", "deleteBuildTemp"], callback));

gulp.task('build', callback => runSequence(["copyToTemp", "deleteBuild"], "polymer", "copyBuildFromTemp", ["deleteTemp", "deleteBuildTemp"], callback));

