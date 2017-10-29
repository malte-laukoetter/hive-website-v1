const fs = require('fs')

var lineReader = require('readline').createInterface({
  input: fs.createReadStream('ranks.txt')
});

const ranks = new Map()

lineReader.on('line', function (line) {

  line = line.replace('- ', '');

  const rank = line.split(' [')[0];

  if(line.match(/default/i)){
    ranks.set(rank, 0);
  }else if(line.match(/top/i)){
    ranks.set(rank, Infinity);
  }else{
    const points = parseInt(line.split('[unlocked after having obtained ')[1].split(' ')[0].replace(/,/g, ''))
    
    ranks.set(rank, points);
  }


});

lineReader.on('close', function (line) {
  let res = {};

  [...ranks.entries()].forEach(([a,b])=>res[a] = b)

  console.log(res)
});