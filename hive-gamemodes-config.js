const numFormat = a => new Number(a || 0).toLocaleString();
const strFormat = a => a ? a.split(/\s/g).map(a => a.toString().charAt(0).toUpperCase() + a.toString().slice(1).toLowerCase()).join(" ") : "";
const dateFormat = a => new Date(a).toLocaleDateString();
const boolFormat = a => strFormat(`${(a == undefined) ? "false" : a.toString()}`);

const secToDays = a => Math.floor(a / (60 * 60 * 24));
const secToHours = a => Math.floor(a / (60 * 60));
const secToMinutes = a => Math.floor(a / 60);

const timeFormat = a => {
  if(!(a >= 0) || a === null){
    return 'unknown';
  }

  let res = '';
  
  if (secToDays(a) >= 1){
    res += `${secToDays(a)}d `;
    a = a - secToDays(a) * 60 * 60 * 24;
  }
  
  if (secToHours(a) >= 1 || res != ''){
    res += `${secToHours(a)}h `
    a = a - secToHours(a) * 60 * 60;
  }
  
  if (secToMinutes(a) >= 1 || res != ''){
    res += `${secToMinutes(a)}m `
    a = a - secToMinutes(a) * 60;
  }

  res += `${a}s`

  return res;
}
const subPropCount = a => b => b ? numFormat(b[a]) : 0;
/**
 * creates the text for an unlock that has the amount stored in an enum onder the hive api libary
 * a : name of the enum
 * b : array of unlocks
 */
const unlocks = a => b => `${numFormat(b ? b.length : 0)} / ${enumAmount(a)}`;
const enumAmount = a => Object.keys(hive[a]).length;

const gameModeConfigs = {
  BD: {
    stats: [
      {
        title: "Points",
        prop: "points",
        func: numFormat
      },
      {
        title: "Games Played",
        prop: "gamesPlayed",
        func: numFormat
      },
      {
        title: "Kills",
        prop: "kills",
        func: numFormat
      },
      {
        title: "Deaths",
        prop: "deaths",
        func: numFormat
      },
      {
        title: "Energy Collected",
        prop: "energyCollected",
        func: numFormat
      },
      {
        title: "Batteries Charged",
        prop: "batteriesCharged",
        func: numFormat
      }
    ],
    logins: [
      {
        title: "First Login",
        prop: "firstLogin",
        func: dateFormat
      },
      {
        title: "Latest Login",
        prop: "lastLogin",
        func: dateFormat
      }
    ],
    leaderboard: [{
      key: 'total_points',
      title: 'Points'
    }, {
      key: 'games_played',
      title: 'Games Played'
    }, {
      key: 'kills',
      title: 'Kills'
    }, {
      key: 'deaths',
      title: 'Deaths'
    }, {
      key: 'energy_collected',
      title: 'Energy Collected'
    }, {
      key: 'batteries_charged',
      title: 'Batteries Charged'
    }]
  },
  BED: {
    stats: [
      {
        title: "Points",
        prop: "points",
        func: numFormat
      },
      {
        title: "Victories",
        prop: "victories",
        func: numFormat
      },
      {
        title: "Games Played",
        prop: "gamesPlayed",
        func: numFormat
      },
      {
        title: "Kills",
        prop: "kills",
        func: numFormat
      },
      {
        title: "Deaths",
        prop: "deaths",
        func: numFormat
      },
      {
        title: "Beds Destroyed",
        prop: "bedsDestroyed",
        func: numFormat
      },
      {
        title: "Teams Eliminated",
        prop: "teamsEliminated",
        func: numFormat
      }
    ],
    logins: [
      {
        title: "First Login",
        prop: "firstLogin",
        func: dateFormat
      },
      {
        title: "Latest Login",
        prop: "lastLogin",
        func: dateFormat
      }
    ],
    leaderboard: [{
      key: 'total_points',
      title: 'Points'
    }, {
      key: 'games_played',
      title: 'Games Played'
    }, {
      key: 'victories',
      title: 'Victories'
    }, {
      key: 'kills',
      title: 'Kills'
    }, {
      key: 'deaths',
      title: 'Deaths'
    }, {
      key: 'beds_destroyed',
      title: 'Beds destroyed'
    }, {
      key: 'teams_eliminated',
      title: 'Teams eliminated'
    }]
  },
  BP: {
    stats: [
      {
        title: "Points",
        prop: "points",
        func: numFormat
      },
      {
        title: "Victories",
        prop: "victories",
        func: numFormat
      },
      {
        title: "Games Played",
        prop: "gamesPlayed",
        func: numFormat
      },
      {
        title: "Eliminations",
        prop: "totalElimination",
        func: numFormat
      },
      {
        title: "Placings",
        prop: "totalPlacing",
        func: numFormat
      },
      {
        title: "Selected Bling",
        prop: "selectedBling",
        func: strFormat
      },
      {
        title: "Blings Unlocked",
        prop: "unlockedBling",
        func: unlocks("BpBling")
      },
      {
        title: "Selected Death Sound",
        prop: "selectedDeathSound",
        func: strFormat
      },
      {
        title: "Death Sounds Unlocked",
        prop: "unlockedDeathSounds",
        func: unlocks("BpDeathSound")
      },
      {
        title: "Selected Trail",
        prop: "selectedTrail",
        func: strFormat
      },
      {
        title: "Trails Unlocked",
        prop: "unlockedTrails",
        func: unlocks("BpTrail")
      }
    ],
    logins: [
      {
        title: "First Login",
        prop: "firstLogin",
        func: dateFormat
      }
    ],
    leaderboard: [{
      key: 'total_points',
      title: 'Points'
    }, {
      key: 'games_played',
      title: 'Games Played'
    }, {
      key: 'victories',
      title: 'Victories'
    }, {
      key: 'total_eliminations',
      title: 'Eliminations'
    }, {
      key: 'total_placing',
      title: 'Placings'
    }]
  },
  CAI: {
    stats: [
      {
        title: "Points",
        prop: "points",
        func: numFormat
      },
      {
        title: "Victories",
        prop: "victories",
        func: numFormat
      },
      {
        title: "Games Played",
        prop: "gamesPlayed",
        func: numFormat
      },
      {
        title: "Captures",
        prop: "captures",
        func: numFormat
      },
      {
        title: "Captured",
        prop: "captured",
        func: numFormat
      },
      {
        title: "Catches",
        prop: "catches",
        func: numFormat
      },
      {
        title: "Caught",
        prop: "caught",
        func: numFormat
      }
    ],
    logins: [
      {
        title: "First Login",
        prop: "firstLogin",
        func: dateFormat
      },
      {
        title: "Latest Login",
        prop: "lastLogin",
        func: dateFormat
      }
    ],
    leaderboard: [{
      key: 'points',
      title: 'Points'
    }, {
      key: 'played',
      title: 'Games Played'
    }, {
      key: 'victories',
      title: 'Victories'
    }, {
      key: 'caught',
      title: 'Caught'
    }, {
      key: 'captures',
      title: 'Captures'
    }]
  },
  CR: {
    stats: [
      {
        title: "Points",
        prop: "points",
        func: numFormat
      },
      {
        title: "Victories",
        prop: "victories",
        func: numFormat
      },
      {
        title: "Games Played",
        prop: "gamesPlayed",
        func: numFormat
      },
      {
        title: "Kills",
        prop: "kills",
        func: numFormat
      },
      {
        title: "Deaths",
        prop: "deaths",
        func: numFormat
      },
      {
        title: "RCCAT Count",
        prop: "rccatCount",
        func: numFormat
      },
      {
        title: "RCCAT Kills",
        prop: "rccatKills",
        func: numFormat
      },
      {
        title: "Airstrice Count",
        prop: "airstrikeCount",
        func: numFormat
      },
      {
        title: "Airstrice Kills",
        prop: "airstrikeKills",
        func: numFormat
      }
    ],
    logins: [
      {
        title: "First Login",
        prop: "firstLogin",
        func: dateFormat
      },
      {
        title: "Latest Login",
        prop: "lastLogin",
        func: dateFormat
      }
    ],
    leaderboard: [{
      key: 'victories',
      title: 'Victories'
    }, {
      key: 'points',
      title: 'Points'
    }, {
      key: 'kills',
      title: 'Kills'
    }, {
      key: 'deaths',
      title: 'Deaths'
    }, {
      key: 'kd',
      title: 'K/D'
    }]
  },
  DRAW: {
    stats: [
      {
        title: "Points",
        prop: "points",
        func: numFormat
      },
      {
        title: "Victories",
        prop: "victories",
        func: numFormat
      },
      {
        title: "Games Played",
        prop: "gamesPlayed",
        func: numFormat
      },
      {
        title: "Correct Guesses",
        prop: "correctGuesses",
        func: numFormat
      },
      {
        title: "Incorrect Guesses",
        prop: "incorrectGuesses",
        func: numFormat
      },
      {
        title: "Skips",
        prop: "skips",
        func: numFormat
      }
    ],
    logins: [
      {
        title: "First Login",
        prop: "firstLogin",
        func: dateFormat
      }
    ],
    leaderboard: [{
      key: 'total_points',
      title: 'Points'
    }, {
      key: 'gamesplayed',
      title: 'Games Played'
    }, {
      key: 'victories',
      title: 'Victories'
    }, {
      key: 'correct_guesses',
      title: 'Correct Guesses'
    }, {
      key: 'incorrect_guesses',
      title: 'Incorrect Guesses'
    }, {
      key: 'skips',
      title: 'Skips'
    }]
  },
  DR: {
    stats: [
      {
        title: "Points",
        prop: "points",
        func: numFormat
      },
      {
        title: "Victories",
        prop: "victories",
        func: numFormat
      },
      {
        title: "Games Played",
        prop: "gamesPlayed",
        func: numFormat
      },
      {
        title: "Kills",
        prop: "kills",
        func: numFormat
      },
      {
        title: "Deaths",
        prop: "deaths",
        func: numFormat
      },
      {
        title: "Games as Death",
        prop: "deathGamesPlayed",
        func: numFormat
      },
      /*
      These aren't working
      {
        title: "Wins as Death",
        prop: "deathWins",
        func: numFormat
      },*/
      {
        title: "Games as Runner",
        prop: "runnerGamesPlayed",
        func: numFormat
      },
      {
        title: "Wins as Runner",
        prop: "runnerWins",
        func: numFormat
      },
      {
        title: "Checkpoints passed",
        prop: "totalCheckpoints",
        func: numFormat
      },
      {
        title: "Traps activated",
        prop: "trapsActivated",
        func: numFormat
      },
      {
        title: "Runner Visibility",
        prop: "visibility",
        func: strFormat
      }
    ],
    logins: [
      {
        title: "First Login",
        prop: "firstLogin",
        func: dateFormat
      },
      {
        title: "Latest Login",
        prop: "lastLogin",
        func: dateFormat
      }
    ],
    leaderboard: [{
      key: 'total_points',
      title: 'Points'
    }, {
      key: 'games_played',
      title: 'Games Played'
    }, {
      key: 'victories',
      title: 'Victories'
    }, {
      key: 'kills',
      title: 'Kills'
    }, {
      key: 'deaths',
      title: 'Deaths'
    }]
  },
  EF: {
    stats: [
      {
        title: "Points",
        prop: "points",
        func: numFormat
      },
      {
        title: "Victories",
        prop: "victories",
        func: numFormat
      },
      {
        title: "Games Played",
        prop: "gamesPlayed",
        func: numFormat
      },
      {
        title: "Blocks activated",
        prop: "blocksactivated",
        func: numFormat
      },
      {
        title: "Players outlived",
        prop: "outlived",
        func: numFormat
      }
    ],
    logins: [
      {
        title: "First Login",
        prop: "firstLogin",
        func: dateFormat
      },
      {
        title: "Latest Login",
        prop: "lastLogin",
        func: dateFormat
      }
    ],
    leaderboard: [{
      key: 'points',
      title: 'Points'
    }, {
      key: 'gamesplayed',
      title: 'Games Played'
    }, {
      key: 'victories',
      title: 'Victories'
    }, {
      key: 'outlived',
      title: 'Outlived'
    }]
  },
  GRAV: {
    stats: [
      {
        title: "Points",
        prop: "points",
        func: numFormat
      },
      {
        title: "Victories",
        prop: "victories",
        func: numFormat
      },
      {
        title: "Games Played",
        prop: "gamesPlayed",
        func: numFormat
      }
    ],
    logins: [
      {
        title: "First Login",
        prop: "firstLogin",
        func: dateFormat
      },
      {
        title: "Latest Login",
        prop: "lastLogin",
        func: dateFormat
      }
    ],
    leaderboard: [{
      key: 'points',
      title: 'Points'
    }, {
      key: 'gamesplayed',
      title: 'Games Played'
    }, {
      key: 'victories',
      title: 'Victories'
    }]
  },
  GNT: {
    stats: [
      {
        title: "Points",
        prop: "points",
        func: numFormat
      },
      {
        title: "Victories",
        prop: "victories",
        func: numFormat
      },
      {
        title: "Games Played",
        prop: "gamesPlayed",
        func: numFormat
      },
      {
        title: "Kills",
        prop: "kills",
        func: numFormat
      },
      {
        title: "Deaths",
        prop: "deaths",
        func: numFormat
      },
      {
        title: "Gold earned",
        prop: "goldEarned",
        func: numFormat
      },
      {
        title: "Beasts Slain",
        prop: "beastsSlain",
        func: numFormat
      },
      {
        title: "Shutdowns",
        prop: "shutdowns",
        func: numFormat
      }
    ],
    logins: [
      {
        title: "First Login",
        prop: "firstLogin",
        func: dateFormat
      },
      {
        title: "Latest Login",
        prop: "lastLogin",
        func: dateFormat
      }
    ],
    leaderboard: [{
      key: 'total_points',
      title: 'Points'
    }, {
      key: 'games_played',
      title: 'Games Played'
    }, {
      key: 'victories',
      title: 'Victories'
    }, {
      key: 'kills',
      title: 'Kills'
    }, {
      key: 'deaths',
      title: 'Deaths'
    }]
  },
  GNTM: {
    stats: [
      {
        title: "Points",
        prop: "points",
        func: numFormat
      },
      {
        title: "Victories",
        prop: "victories",
        func: numFormat
      },
      {
        title: "Games Played",
        prop: "gamesPlayed",
        func: numFormat
      },
      {
        title: "Kills",
        prop: "kills",
        func: numFormat
      },
      {
        title: "Deaths",
        prop: "deaths",
        func: numFormat
      },
      {
        title: "Gold earned",
        prop: "goldEarned",
        func: numFormat
      },
      {
        title: "Beasts Slain",
        prop: "beastsSlain",
        func: numFormat
      },
      {
        title: "Shutdowns",
        prop: "shutdowns",
        func: numFormat
      }
    ],
    logins: [
      {
        title: "First Login",
        prop: "firstLogin",
        func: dateFormat
      },
      {
        title: "Latest Login",
        prop: "lastLogin",
        func: dateFormat
      }
    ],
    leaderboard: [{
      key: 'total_points',
      title: 'Points'
    }, {
      key: 'games_played',
      title: 'Games Played'
    }, {
      key: 'victories',
      title: 'Victories'
    }, {
      key: 'kills',
      title: 'Kills'
    }, {
      key: 'deaths',
      title: 'Deaths'
    }]
  },
  HB: {
    stats: [
      {
        title: "Points",
        prop: "points",
        func: numFormat
      },
      {
        title: "Captures",
        prop: "captures",
        func: numFormat
      },
      {
        title: "Kills",
        prop: "kills",
        func: numFormat
      },
      {
        title: "Deaths",
        prop: "deaths",
        func: numFormat
      },
      {
        title: "Active Class",
        prop: "activeClass",
        func: strFormat
      },
      {
        title: "Classes Unlocked",
        prop: "unlockedClasses",
        func: unlocks("HbClass")
      }
    ],
    logins: [
      {
        title: "First Login",
        prop: "firstLogin",
        func: dateFormat
      }
    ],
    leaderboard: [{
      key: 'points',
      title: 'Points'
    }, {
      key: 'captures',
      title: 'Captures'
    }, {
      key: 'kills',
      title: 'Kills'
    }, {
      key: 'deaths',
      title: 'Deaths'
    }, {
      key: 'kd',
      title: 'K/D'
    }]
  },
  HERO: {
    stats: [
      {
        title: "Points",
        prop: "points",
        func: numFormat
      },
      {
        title: "Victories",
        prop: "victories",
        func: numFormat
      },
      {
        title: "Games Played",
        prop: "gamesPlayed",
        func: numFormat
      },
      {
        title: "Kills",
        prop: "kills",
        func: numFormat
      },
      {
        title: "Deaths",
        prop: "deaths",
        func: numFormat
      },
      {
        title: "One vs One wins",
        prop: "oneVsOnesWins",
        func: numFormat
      },
      {
        title: "Deathmatches",
        prop: "deathmatches",
        func: numFormat
      },
      {
        title: "TNT used",
        prop: "tntUsed",
        func: numFormat
      },
      {
        title: "Food consumed",
        prop: "foodConsumed",
        func: numFormat
      },
      {
        title: "Crates opened",
        prop: "cratesOpened",
        func: numFormat
      }
    ],
    logins: [
      {
        title: "First Login",
        prop: "firstLogin",
        func: dateFormat
      },
      {
        title: "Latest Login",
        prop: "lastLogin",
        func: dateFormat
      }
    ],
    leaderboard: [{
      key: 'victories',
      title: 'Victories'
    }, {
      key: 'total_points',
      title: 'Points'
    }, {
      key: 'kills',
      title: 'Kills'
    }, {
      key: 'deaths',
      title: 'Deaths'
    }, {
      key: 'one_vs_ones_wins',
      title: 'One vs One wins'
    }]
  },
  HIDE: {
    stats: [
      {
        title: "Points",
        prop: "points",
        func: numFormat
      },
      {
        title: "Victories",
        prop: "victories",
        func: numFormat
      },
      {
        title: "Games Played",
        prop: "gamesPlayed",
        func: numFormat
      },
      {
        title: "Deaths",
        prop: "deaths",
        func: numFormat
      },
      {
        title: "Time Alive",
        prop: "timeAlive",
        func: timeFormat
      },
      {
        title: "Unlocked Blocks",
        prop: "blocks",
        func: a => a ? a.length : 0
      },
      {
        title: "Hider Kills",
        prop: "hiderKills",
        func: numFormat
      },
      {
        title: "Seeker Kills",
        prop: "seekerKills",
        func: numFormat
      }
    ],
    logins: [
      {
        title: "First Login",
        prop: "firstLogin",
        func: dateFormat
      },
      {
        title: "Latest Login",
        prop: "lastLogin",
        func: dateFormat
      }
    ],
    leaderboard: [{
      key: 'points',
      title: 'Points'
    }, {
      key: 'victories',
      title: 'Victories'
    }, {
      key: 'hiderKills',
      title: 'Hider Kills'
    }, {
      key: 'seekerKills',
      title: 'SeekerKills'
    }, {
      key: 'deaths',
      title: 'Deaths'
    }]
  },
  LAB: {
    stats: [
      {
        title: "Points",
        prop: "points",
        func: numFormat
      },
      {
        title: "Victories",
        prop: "victories",
        func: numFormat
      },
      {
        title: "Games Played",
        prop: "gamesPlayed",
        func: numFormat
      },
      {
        title: "Rocket Race Victories",
        prop: "gameVictories",
        func: subPropCount("ROCKETRACE")
      },
      {
        title: "Breaking Blocks Victories",
        prop: "gameVictories",
        func: subPropCount("BREAKINGBLOCKS")
      },
      {
        title: "Fight Victories",
        prop: "gameVictories",
        func: subPropCount("FIGHT")
      },
      {
        title: "Dodgeball Victories",
        prop: "gameVictories",
        func: subPropCount("DODGEBALL")
      },
      {
        title: "Balloon Pop Victories",
        prop: "gameVictories",
        func: subPropCount("BALLOONPOP")
      },
      {
        title: "Boat Wars Victories",
        prop: "gameVictories",
        func: subPropCount("BOATWARS")
      },
      {
        title: "Crazy Paint Victories",
        prop: "gameVictories",
        func: subPropCount("CRAZYPAINT")
      },
      {
        title: "Gold Rush Victories",
        prop: "gameVictories",
        func: subPropCount("GOLDRUSH")
      },
      {
        title: "Splegg Victories",
        prop: "gameVictories",
        func: subPropCount("SPLEGG")
      },
      {
        title: "Pig Raicing Victories",
        prop: "gameVictories",
        func: subPropCount("PIGRACING")
      },
      {
        title: "Whack a Mob Victories",
        prop: "gameVictories",
        func: subPropCount("WHACKAMOB")
      },
      {
        title: "Catastrophic Victories",
        prop: "gameVictories",
        func: subPropCount("CATASTROPHIC")
      },
      {
        title: "Snowman Victories",
        prop: "gameVictories",
        func: subPropCount("SNOWMAN")
      }
    ],
    logins: [
      {
        title: "First Login",
        prop: "firstLogin",
        func: dateFormat
      },
      {
        title: "Latest Login",
        prop: "lastLogin",
        func: dateFormat
      }
    ],
    leaderboard: [{
      key: 'total_points',
      title: 'Points'
    }, {
      key: 'gamesplayed',
      title: 'Games Played'
    }, {
      key: 'victories',
      title: 'Victories'
    }]
  },
  MIMV: {
    stats: [
      {
        title: "Points",
        prop: "points",
        func: numFormat
      },
      {
        title: "Victories",
        prop: "victories",
        func: numFormat
      },
      {
        title: "Games Played",
        prop: "gamesPlayed",
        func: numFormat
      },
      {
        title: "Kills",
        prop: "kills",
        func: numFormat
      },
      {
        title: "Deaths",
        prop: "deaths",
        func: numFormat
      },
      {
        title: "Latest Emote",
        prop: "lastUsedEmote",
        func: strFormat
      },
      {
        title: "Emote Selector",
        prop: "preferredEmoteSelectorMenu",
        func: a => a ? a.replace("EmoteSelectorMenu", "") : 0
      }
    ],
    logins: [
      {
        title: "First Login",
        prop: "firstLogin",
        func: dateFormat
      },
      {
        title: "Latest Login",
        prop: "lastLogin",
        func: dateFormat
      }
    ],
    leaderboard: [{
      key: 'total_points',
      title: 'Points'
    }, {
      key: 'games_played',
      title: 'Games Played'
    }, {
      key: 'victories',
      title: 'Victories'
    }, {
      key: 'kills',
      title: 'Kills'
    }, {
      key: 'deaths',
      title: 'Deaths'
    }]
  },
  MM: {
    stats: [
      {
        title: "Points",
        prop: "points",
        func: numFormat
      },
      {
        title: "Victories",
        prop: "victories",
        func: numFormat
      },
      {
        title: "Games Played",
        prop: "gamesPlayed",
        func: numFormat
      },
      {
        title: "Correct Notes",
        prop: "correctNotes",
        func: numFormat
      },
      {
        title: "Incorrect Notes",
        prop: "incorrectNotes",
        func: numFormat
      },
      {
        title: "Perfect Notes",
        prop: "perfectNotes",
        func: numFormat
      },
      {
        title: "Good Notes",
        prop: "goodNotes",
        func: numFormat
      }
    ],
    logins: [
      {
        title: "First Login",
        prop: "firstLogin",
        func: dateFormat
      },
      {
        title: "Latest Login",
        prop: "lastLogin",
        func: dateFormat
      }
    ],
    leaderboard: [{
      key: 'points',
      title: 'Points'
    }, {
      key: 'gamesplayed',
      title: 'Games Played'
    }, {
      key: 'victories',
      title: 'Victories'
    }, {
      key: 'correctnotes',
      title: 'Correct Notes'
    }, {
      key: 'incorrectnotes',
      title: 'Incorrect Notes'
    }]
  },
  OITC: {
    stats: [
      {
        title: "Points",
        prop: "points",
        func: numFormat
      },
      {
        title: "Victories",
        prop: "victories",
        func: numFormat
      },
      {
        title: "Games Played",
        prop: "gamesPlayed",
        func: numFormat
      },
      {
        title: "Kills",
        prop: "kills",
        func: numFormat
      },
      {
        title: "Deaths",
        prop: "deaths",
        func: numFormat
      },
      {
        title: "Arrows Fired",
        prop: "arrowsFired",
        func: numFormat
      },
      {
        title: "Cupid Unlock",
        prop: "cupidUnlock",
        func: boolFormat
      },
      {
        title: "Rainbow Unlock",
        prop: "rainbowUnlock",
        func: boolFormat
      },
      {
        title: "Music Unlock",
        prop: "musicUnlock",
        func: boolFormat
      },
      {
        title: "Herobrine Unlock",
        prop: "herobrineUnlock",
        func: boolFormat
      }
    ],
    logins: [
      {
        title: "First Login",
        prop: "firstLogin",
        func: dateFormat
      },
      {
        title: "Latest Login",
        prop: "lastLogin",
        func: dateFormat
      }
    ],
    leaderboard: [{
      key: 'victories',
      title: 'Victories'
    }, {
      key: 'kills',
      title: 'Kills'
    }, {
      key: 'deaths',
      title: 'Deaths'
    }, {
      key: 'arrowsfired',
      title: 'Arrows Fired'
    }, {
      key: 'arrowshit',
      title: 'Arrows Hit'
    }]
  },
  RR: {
    stats: [
      {
        title: "Points",
        prop: "points",
        func: numFormat
      },
      {
        title: "Victories",
        prop: "victories",
        func: numFormat
      },
      {
        title: "Games Played",
        prop: "gamesPlayed",
        func: numFormat
      },
      {
        title: "Tables Cleared",
        prop: "tablesCleared",
        func: numFormat
      }
    ],
    logins: [
      {
        title: "First Login",
        prop: "firstLogin",
        func: dateFormat
      },
      {
        title: "Latest Login",
        prop: "lastLogin",
        func: dateFormat
      }
    ],
    leaderboard: [{
      key: 'points',
      title: 'Points'
    }, {
      key: 'gamesplayed',
      title: 'Games Played'
    }, {
      key: 'victories',
      title: 'Victories'
    }, {
      key: 'tablescleared',
      title: 'Tables Cleard'
    }]
  },
  SGN: {
    stats: [
      {
        title: "Points",
        prop: "points",
        func: numFormat
      },
      {
        title: "Victories",
        prop: "victories",
        func: numFormat
      },
      {
        title: "Games Played",
        prop: "gamesPlayed",
        func: numFormat
      },
      {
        title: "Kills",
        prop: "kills",
        func: numFormat
      },
      {
        title: "Deaths",
        prop: "deaths",
        func: numFormat
      },
      {
        title: "Most Points",
        prop: "mostPoints",
        func: numFormat
      },
      {
        title: "Crates opened",
        prop: "cratesOpened",
        func: numFormat
      },
      {
        title: "Deathmatches",
        prop: "deathMatches",
        func: numFormat
      }
    ],
    logins: [
      {
        title: "First Login",
        prop: "firstLogin",
        func: dateFormat
      },
      {
        title: "Latest Login",
        prop: "lastLogin",
        func: dateFormat
      }
    ],
    leaderboard: [{
      key: 'total_points',
      title: 'Points'
    }, {
      key: 'games_played',
      title: 'Games Played'
    }, {
      key: 'victories',
      title: 'Victories'
    }, {
      key: 'deathmatches',
      title: 'Deathmatches'
    }, {
      key: 'crates_opened',
      title: 'Crates Opened'
    }, {
      key: 'kills',
      title: 'Kills'
    }, {
      key: 'deaths',
      title: 'Deaths'
    }, {
      key: 'most_points',
      title: 'Mots Points'
    }]
  },
  SG: {
    stats: [
      {
        title: "Points",
        prop: "points",
        func: numFormat
      },
      {
        title: "Victories",
        prop: "victories",
        func: numFormat
      },
      {
        title: "Games Played",
        prop: "gamesPlayed",
        func: numFormat
      },
      {
        title: "Kills",
        prop: "kills",
        func: numFormat
      },
      {
        title: "Deaths",
        prop: "deaths",
        func: numFormat
      },
      {
        title: "Most Points",
        prop: "mostPoints",
        func: numFormat
      },
      {
        title: "Crates opened",
        prop: "cratesOpened",
        func: numFormat
      },
      {
        title: "Deathmatches",
        prop: "deathMatches",
        func: numFormat
      },
      {
        title: "Time Alive",
        prop: "timeAlive",
        func: timeFormat
      },
      {
        title: "Unlocked vanity colors",
        prop: "vanityColors",
        func: unlocks("SgVanityColor")
      },
      {
        title: "Active vanity color",
        prop: "activeVanityColor",
        func: strFormat
      },
      {
        title: "Unlocked arrow trails",
        prop: "arrowTrails",
        func: unlocks("SgArrowTrail")
      },
      {
        title: "Unlocked battle cries",
        prop: "battleCries",
        func: unlocks("SgBattleCrie")
      },
      {
        title: "Death Crate Active",
        prop: "activeDeathcrate",
        func: boolFormat
      },
    ],
    logins: [
      {
        title: "First Login",
        prop: "firstLogin",
        func: dateFormat
      },
      {
        title: "First Win",
        prop: "firstWinDay",
        func: dateFormat
      },
      {
        title: "Latest Login",
        prop: "lastLogin",
        func: dateFormat
      }
    ],
    leaderboard: [{
      key: 'victories',
      title: 'Victories'
    }, {
      key: 'points',
      title: 'Points'
    }, {
      key: 'deathmatches',
      title: 'Deathmatches'
    }, {
      key: 'kills',
      title: 'Kills'
    }, {
      key: 'deaths',
      title: 'Deaths'
    }]
  },
  SKY: {
    stats: [
      {
        title: "Points",
        prop: "points",
        func: numFormat
      },
      {
        title: "Victories",
        prop: "victories",
        func: numFormat
      },
      {
        title: "Games Played",
        prop: "gamesPlayed",
        func: numFormat
      },
      {
        title: "Kills",
        prop: "kills",
        func: numFormat
      },
      {
        title: "Deaths",
        prop: "deaths",
        func: numFormat
      },
      {
        title: "Most Points",
        prop: "mostPoints",
        func: numFormat
      },
      {
        title: "Time Alive",
        prop: "timeAlive",
        func: timeFormat
      },
    ],
    logins: [
      {
        title: "First Login",
        prop: "firstLogin",
        func: dateFormat
      },
      {
        title: "Latest Login",
        prop: "lastLogin",
        func: dateFormat
      }
    ],
    leaderboard: [{
      key: 'total_points',
      title: 'Points'
    }, {
      key: 'gamesplayed',
      title: 'Games Played'
    }, {
      key: 'victories',
      title: 'Victories'
    }, {
      key: 'deathmatches',
      title: 'Deathmatches'
    }, {
      key: 'kills',
      title: 'Kills'
    }, {
      key: 'deaths',
      title: 'Deaths'
    }, {
      key: 'most_points',
      title: 'Most Points'
    }]
  },
  SLAP: {
    stats: [
      {
        title: "Points",
        prop: "points",
        func: numFormat
      },
      {
        title: "Victories",
        prop: "victories",
        func: numFormat
      },
      {
        title: "Games Played",
        prop: "gamesPlayed",
        func: numFormat
      },
      {
        title: "Kills",
        prop: "kills",
        func: numFormat
      },
      {
        title: "Deaths",
        prop: "deaths",
        func: numFormat
      },
    ],
    logins: [
      {
        title: "First Login",
        prop: "firstLogin",
        func: dateFormat
      },
      {
        title: "Latest Login",
        prop: "lastLogin",
        func: dateFormat
      }
    ],
    leaderboard: [{
      key: 'points',
      title: 'Points'
    }, {
      key: 'gamesplayed',
      title: 'Games Played'
    }, {
      key: 'victories',
      title: 'Victories'
    }, {
      key: 'deathmatches',
      title: 'Deathmatches'
    }, {
      key: 'kills',
      title: 'Kills'
    }, {
      key: 'deaths',
      title: 'Deaths'
    }]
  },
  SP: {
    stats: [
      {
        title: "Points",
        prop: "points",
        func: numFormat
      },
      {
        title: "Victories",
        prop: "victories",
        func: numFormat
      },
      {
        title: "Games Played",
        prop: "gamesPlayed",
        func: numFormat
      },
      {
        title: "Deaths",
        prop: "deaths",
        func: numFormat
      },
      {
        title: "Eggs fired",
        prop: "eggsFired",
        func: numFormat
      },
      {
        title: "Blocks Destroyed",
        prop: "blocksDestroyed",
        func: numFormat
      },
      {
        title: "Time Alive",
        prop: "timeAlive",
        func: timeFormat
      }
    ],
    logins: [
      {
        title: "First Login",
        prop: "firstLogin",
        func: dateFormat
      },
      {
        title: "Latest Login",
        prop: "lastLogin",
        func: dateFormat
      }
    ],
    leaderboard: [{
      key: 'points',
      title: 'Points'
    }, {
      key: 'played',
      title: 'Games Played'
    }, {
      key: 'victories',
      title: 'Victories'
    }, {
      key: 'eggs',
      title: 'Eggs Fired'
    }, {
      key: 'blocks',
      title: 'Blocks Destoyed'
    }, {
      key: 'deaths',
      title: 'Deaths'
    }]
  },
  SPL: {
    stats: [
      {
        title: "Points",
        prop: "points",
        func: numFormat
      },
      {
        title: "Victories",
        prop: "victories",
        func: numFormat
      },
      {
        title: "Games Played",
        prop: "gamesPlayed",
        func: numFormat
      },
      {
        title: "Kills",
        prop: "kills",
        func: numFormat
      },
      {
        title: "Deaths",
        prop: "deaths",
        func: numFormat
      },
      {
        title: "Blocks Painted",
        prop: "blocksPainted",
        func: numFormat
      },
      {
        title: "Ultimates Earned",
        prop: "ultimatesEarned",
        func: numFormat
      }
      // characterStats missing
    ],
    logins: [
      {
        title: "First Login",
        prop: "firstLogin",
        func: dateFormat
      },
      {
        title: "Latest Login",
        prop: "lastLogin",
        func: dateFormat
      }
    ],
    leaderboard: [{
      key: 'total_points',
      title: 'Points'
    }, {
      key: 'games_played',
      title: 'Games Played'
    }, {
      key: 'victories',
      title: 'Victories'
    }, {
      key: 'kills',
      title: 'Kills'
    }, {
      key: 'deaths',
      title: 'Deaths'
    }, {
      key: 'blocks_painted',
      title: 'Blocks Painted'
    }, {
      key: 'ultimates_earned',
      title: 'Ultimates Earned'
    }]
  },
  TIMV: {
    stats: [
      {
        title: "Points",
        prop: "points",
        func: numFormat
      },
      {
        title: "Most Points",
        prop: "mostPoints",
        func: numFormat
      },
      {
        title: "Role Points",
        prop: "rolePoints",
        func: numFormat
      },
      {
        title: "Traitor Points",
        prop: "traitorPoints",
        func: numFormat
      },
      {
        title: "Innocent Points",
        prop: "innocentPoints",
        func: numFormat
      },
      {
        title: "Detective Points",
        prop: "detectivePoints",
        func: numFormat
      },
    /*  {
        title: "Active Detective Stick",
        prop: "activeDetectiveStick",
        func: strFormat
      },
      {
        title: "Unlocked Detective Sticks",
        prop: "detectiveSticks",
        func: unlocks("TimvDetectiveStick")
      },
      {
        title: "Active Flare",
        prop: "activeFlareUpgrade",
        func: strFormat
      },
      {
        title: "Unlocked Flares",
        prop: "flareUpgrades",
        func: unlocks("TimvFlare")
      },*/
      {
        title: "Detective Book",
        prop: "detectiveBook",
        func: boolFormat
      },
    ],
    logins: [
      {
        title: "Latest Login",
        prop: "lastLogin",
        func: dateFormat
      }
    ],
    leaderboard: [{
      key: 'karma',
      title: 'Karma'
    }, {
      key: 'detective',
      title: 'Detective Games'
    }, {
      key: 'innocent',
      title: 'Innocent Games'
    }, {
      key: 'traitor',
      title: 'Traitor Games'
    }, {
      key: 'mostPoints',
      title: 'Most Points'
    }]
  },
}

/**
 * only export the modules if loaded by node
 */
if (typeof window === 'undefined'){
  module.exports = {
    gameModeConfigs: gameModeConfigs,
    numFormat: numFormat,
    strFormat: strFormat,
    dateFormat: dateFormat,
    boolFormat: boolFormat,
    timeFormat: timeFormat,
  };
}