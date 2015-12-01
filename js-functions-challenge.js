var games;

var team_objs = [];
var loadTeams;
var gameWinLoss;
var compare;
var rank;
var setRank;


var gameInfo = function(){
  return [
   {
     home_team: "Patriots",
     away_team: "Broncos",
     home_score: 7,
     away_score: 3
   },
   {
     home_team: "Broncos",
     away_team: "Colts",
     home_score: 3,
     away_score: 0
   },
   {
     home_team: "Patriots",
     away_team: "Colts",
     home_score: 11,
     away_score: 7
   },
   {
     home_team: "Steelers",
     away_team: "Patriots",
     home_score: 7,
     away_score: 21
   }
 ]
}
games = gameInfo();

function loadTeams(array){
  for(var i = 0; i < array.length; i++){
    team_objs.push(createTeam(array[i].home_team));
    team_objs.push(createTeam(array[i].away_team));
  }
  team_objs.sort(compare);
  deleteDuplicates(team_objs);
  gameWinLoss(array);
  team_objs.sort(rank);
  setRank(team_objs);
  display(team_objs);
}

function gameWinLoss(array){
  for(var i = 0; i < array.length; i++){
    if(array[i].home_score > array[i].away_score){
      for(var j = 0; j < team_objs.length; j++){
        if(array[i].home_team === team_objs[j].name){
          team_objs[j].wins += 1;
        }else if(array[i].away_team === team_objs[j].name){
          team_objs[j].losses += 1;
        }
      }
    }else if(array[i].home_score < array[i].away_score){
      for(var j = 0; j < team_objs.length; j++){
        if(array[i].home_team === team_objs[j].name){
          team_objs[j].losses += 1;
        }else if(array[i].away_team === team_objs[j].name){
          team_objs[j].wins += 1;
        }
      }
    }
  }
}

function compare(a,b) {
 if (a.name < b.name)
   return -1;
 if (a.name > b.name)
   return 1;
 return 0;
}

function rank(a,b) {
 if (a.wins < b.wins)
   return 1;
 if (a.wins > b.wins)
   return -1;
 return 0;
}

function setRank(array){
  for(var i = 0; i < array.length; i++){
    array[i].rank = i + 1;
  }
}


function deleteDuplicates(array){
  for(var i = 0; i < array.length - 1; i++){
    if(array[i].name === array[i+1].name){
      array.splice(i,1);
      i = 0;
    }
  }
  return array
}


function createTeam(name){
  var team = { name: name,
               wins: 0,
               losses: 0,
               rank: 0
              };
  return team;
};

function display(array){
  var result = " \n"
  result += "---------------------------------------------------------\n";
  var header = "| Name\t\tRank\tTotal Wins\tTotal Losses \t|\n"
  result += header;
  for(var i = 0; i < array.length; i++){
    result += "| " + array[i].name +"  " + "\t" + array[i].rank + "\t" + array[i].wins + "\t\t"+ array[i].losses + "\t\t|\n";
   }
   result += "---------------------------------------------------------";
  console.log(result);}

loadTeams(games);
