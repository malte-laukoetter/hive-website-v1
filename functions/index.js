/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

function generateTeamChangeNotificationPayload(data){
  const payload = {
    notification: {
      icon: `https://crafatar.com/avatars/${data.uuid}?overlay`,
      clickAction: `https://hive.lergin.de/team`
    }
  };

  switch (data.type){
    case "MODERATOR_ADD": 
      payload.notification.title = 'New Moderator';
      payload.notification.body = `${data.name} is now a Moderator!`;
      break;
    case "MODERATOR_REMOVE": 
      payload.notification.title = 'A Moderator left the Hive Team';
      payload.notification.body = `${data.name} is no longer a Moderator`;
      break;
    case "SENIOR_MODERATOR_ADD": 
      payload.notification.title = 'New Senior Moderator';
      payload.notification.body = `${data.name} is now a Senior Moderator!`;
      break;
    case "SENIOR_MODERATOR_REMOVE":
      payload.notification.title = 'A Senior Moderator left the Hive Team';
      payload.notification.body = `${data.name} is no longer a Senior Moderator`;
      break;
    case "DEVELOPER_ADD":
      payload.notification.title = 'New Developer';
      payload.notification.body = `${data.name} is now a Developer!`;
      break;
    case "DEVELOPER_REMOVE":
      payload.notification.title = 'A Developer left the Hive Team';
      payload.notification.body = `${data.name} is no longer a Developer`;
      break;
    case "OWNER_ADD":
      payload.notification.title = 'New Owner';
      payload.notification.body = `${data.name} is now an Owner!`;
      break;
    case "OWNER_REMOVE":
      payload.notification.title = 'An Owner left the Hive';
      payload.notification.body = `${data.name} is no longer an Owner!`;
      break;
    case "NECTAR_ADD":
      payload.notification.title = 'New Team Nectar Member';
      payload.notification.body = `${data.name} is now a part of Team Nectar!`;
      break;
    case "NECTAR_REMOVE":
      payload.notification.title = 'An Team Nectar Member left';
      payload.notification.body = `${data.name} is no longer part of Team Nectar!`;
      break;
    default:
      payload.notification.title = 'Something changed in the team of the Hive';
      payload.notification.body = `${data.name} is now something else but we don't know what...`;
      break;
  }

  return payload;
}

const gameModes = new Map([['SG', 'Survival Games'],
['BP', 'BlockParty'],
['CAI', 'Cowboys and Indians'],
['CR', 'Cranked'],
['DR', 'DeathRun'],
['HB', 'The Herobrine'],
['HERO', 'SG:Heroes'],
['HIDE', 'Hide and Seek'],
['OITC', 'One in the Chamber'],
['SP', 'Splegg'],
['TIMV', 'Trouble in Mineville'],
['SKY', 'SkyWars'],
['LAB', 'The Lab'],
['DRAW', 'Draw It'],
['SLAP', 'Slaparoo'],
['EF', 'Electric Floor'],
['MM', 'Music Masters'],
['GRAV', 'Gravity'],
['RR', 'Restaurant Rush'],
['GNT', 'SkyGiants'],
['GNTM', 'SkyGiants: Mini'],
['PMK', 'Pumpkinfection'],
['SGN', 'Survival Games 2'],
['BD', 'BatteryDash'],
['SPL', 'Sploop'],
['MIMV', 'Murder in Mineville'],
['BED', 'BedWars']]);

function generateNewMapNotificationPayload(data){
  let notification = {
    notification: {
      icon: `https://hive.lergin.de/images/icons/icon-192x192.png`,
      clickAction: `https://hive.lergin.de/maps`,
      title: `New ${gameModes.has(data.gameType) ? gameModes.get(data.gameType) : data.gameType} map: ${data.mapName || data.worldName}`
    }
  };

  if(data.author){
    notification.notification.body = `The map was created by: ${data.author}.\nIt may take some weeks till the map can be played...`;
  }else{
    notification.notification.body = `The map's author is still unknown...\nIt may take some weeks till the map can be played...`;
  }

  return notification;
}

/**
 * Triggers when a change happends to the hive team and sends a notification.
 */
exports.sendTeamChangeNotification = functions.database.ref('/teamChanges/data/{changeId}').onCreate(event => {
  // If un-follow we exit the function.
  if (!event.data.val()) {
    return console.log('No data :/');
  }

  const data = event.data.val();

  // Get the list of device notification tokens.
  const getDeviceTokensPromise = admin.database().ref(`/teamChanges/notificationTokens`).once('value');

  return getDeviceTokensPromise.then(tokensSnapshot => {
    console.log(`Sending Notification ${data.type} with player ${data.name} to ${tokensSnapshot.numChildren()} tokens`);

    // Check if there are any device tokens.
    if (!tokensSnapshot.hasChildren()) {
      return;
    }


    // Notification details.
    const payload = generateTeamChangeNotificationPayload(data);

    // Listing all tokens.
    const tokens = Object.keys(tokensSnapshot.val());


    // Send notifications to all tokens.
    return admin.messaging().sendToDevice(tokens, payload).then(response => {
      // For each message check if there was an error.
      const tokensToRemove = [];
      response.results.forEach((result, index) => {
        const error = result.error;
        if (error) {
          console.error('Failure sending notification to', tokens[index], error);
          // Cleanup the tokens who are not registered anymore.
          if (error.code === 'messaging/invalid-registration-token' ||
              error.code === 'messaging/registration-token-not-registered') {
            tokensToRemove.push(tokensSnapshot.ref.child(tokens[index]).remove());
          }
        }
      });
      return Promise.all(tokensToRemove);
    });
  });
});

/**
 * Triggers when a change happends to the hive team and sends a notification.
 */
exports.sendNewMapNotification = functions.database.ref('/maps/data/{changeId}').onCreate(event => {
  // If un-follow we exit the function.
  if (!event.data.val()) {
    return console.log('No data :/');
  }

  const data = event.data.val();

  // Get the list of device notification tokens.
  const getDeviceTokensPromise = admin.database().ref(`/maps/notificationTokens`).once('value');

  return getDeviceTokensPromise.then(tokensSnapshot => {
    console.log(`Sending Notification for map ${data.mapName} to ${tokensSnapshot.numChildren()} tokens`);

    // Check if there are any device tokens.
    if (!tokensSnapshot.hasChildren()) {
      return;
    }


    // Notification details.
    const payload = generateNewMapNotificationPayload(data);

    // Listing all tokens.
    const tokens = Object.keys(tokensSnapshot.val());


    // Send notifications to all tokens.
    return admin.messaging().sendToDevice(tokens, payload).then(response => {
      // For each message check if there was an error.
      const tokensToRemove = [];
      response.results.forEach((result, index) => {
        const error = result.error;
        if (error) {
          console.error('Failure sending notification to', tokens[index], error);
          // Cleanup the tokens who are not registered anymore.
          if (error.code === 'messaging/invalid-registration-token' ||
              error.code === 'messaging/registration-token-not-registered') {
            tokensToRemove.push(tokensSnapshot.ref.child(tokens[index]).remove());
          }
        }
      });
      return Promise.all(tokensToRemove);
    });
  });
});

/**
 * Triggers when a new player is added to the daily stats update list
 */
exports.removeWeeklyAndMonthlyForNewAddsToDaily = functions.database.ref('/playerStats/daily/{uuid}').onCreate(event => {
  // Get the list of device notification tokens.
  const weeklyRefs = admin.database().ref('playerStats').child('weekly');
  const monthlyRefs = admin.database().ref('playerStats').child('monthly');

  for(let i = 0; i < 7; i++){
    weeklyRefs.child(i).child(event.params.uuid).remove();
  }

  for(let i = 0; i < 30; i++){
    monthlyRefs.child(i).child(event.params.uuid).remove();
  }
});