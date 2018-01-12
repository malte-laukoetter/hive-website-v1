function calcGlobalLeaderboardPoints(pl) {
  let allGamesTotalPoints = Promise.all(hive.GameTypes.list.map(gt => {
    let lb = new hive.Leaderboard(gt)

    return lb.load(980, 1000).then(() => lb.load(998, 1000)).then(places => {
      let points = (places.get(998).points + places.get(999).points) / 2;

      if (isNaN(points)) {
        points = Promise.all([998, 999].map(pl => places.get(pl).player.gameInfo(gt).then(info => info.points))).then(([a, b]) => (a + b) / 2)
      }

      return points;
    });
  })).then(data => data.reduce((a, b) => a + b, 0));


  let plAvgPoints = Promise.all(hive.GameTypes.list.map(gt => pl.gameInfo(gt).then(info => {
    if (!info) {
      return 0;
    }

    let gmPoints = 0;

    if (info.gamesPlayed) {
      gmPoints = info.gamesPlayed * 100;
    }


    if (isNaN(gmPoints) && info.rolePoints) {
      gmPoints = info.rolePoints / 20;
    }

    if (isNaN(gmPoints) && info.captures && info.kills) {
      gmPoints = (info.kills + info.captures) / 2
    }

    if (isNaN(gmPoints) && info.data && info.data.games_played) {
      gmPoints = info.data.games_played * 100;
    }

    return info.points + gmPoints;
  })))
  .then(data => data.reduce((a, b) => a + b, 0))

  return Promise.all([allGamesTotalPoints, plAvgPoints]).then(([allGamesTotalPoints, plAvgPoints]) => plAvgPoints / (allGamesTotalPoints / hive.GameTypes.list.length))
}

const calcGlobalLeaderboardPointsPlayer = name => calcGlobalLeaderboardPoints(new hive.Player(name)).then(points => console.log(`${name}: ${points}`))