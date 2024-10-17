var {Options} = require('selenium-webdriver/chrome')
const {Builder, Browser, By, Key, until} = require('selenium-webdriver');
var fs = require('fs');
const { is } = require('express/lib/request');
const { generateKey } = require('crypto');
const { Console } = require('console');

var statsURL = "https://www.espn.com/mlb/player/stats/_/";
var battersURL = "https://www.espn.com/mlb/team/stats/_/name/";
var schedulesURL = "https://www.espn.com/mlb/team/schedule/_/name/";
var pitchersURL = "https://www.espn.com/mlb/team/stats/_/type/pitching/name/";
var pitcherPreviousURL = "https://www.espn.com/mlb/team/stats/_/type/pitching/name/{team}/season/{year}/seasontype/2";

var teams = [
    {team:"TEX Rangers", url:"tex/texas-rangers"},
    {team:"CHI Cubs", url:"chc/chicago-cubs"},
    {team:"COL Rockies", url:"col/colorado-rockies"},
    {team:"ARI Diamondbacks", url:"ari/arizona-diamondbacks"},
    {team:"NY Yankees", url:"nyy/new-york-yankees"},
    {team:"HOU Astros", url:"hou/houston-astros"},
    {team:"TOR Blue Jays", url:"tor/toronto-blue-jays"},
    {team:"TB Rays", url:"tb/tampa-bay-rays"},
    {team:"LA Angels", url:"laa/los-angeles-angels"},
    {team:"BAL Orioles", url:"bal/baltimore-orioles"},
    {team:"KC Royals", url:"kc/kansas-city-royals"},
    {team:"MIN Twins", url:"min/minnesota-twins"},
    {team:"MIL Brewers", url:"mil/milwaukee-brewers"},
    {team:"NY Mets", url:"nym/new-york-mets"},
    {team:"DET Tigers", url:"det/detroit-tigers"},
    {team:"CHI White Sox", url:"chw/chicago-white-sox"},
    {team:"ATL Braves", url:"atl/atlanta-braves"},
    {team:"PHI Phillies", url:"phi/philadelphia-phillies"},
    {team:"CIN Reds", url:"cin/cincinnati-reds"},
    {team:"SEA Mariners", url:"sea/seattle-mariners"},
    {team:"BOS Red Sox", url:"bos/boston-red-sox"},
    {team:"OAK Athletics", url:"oak/oakland-athletics"},
    {team:"CLE Guardians", url:"cle/cleveland-guardians"},
    {team:"WAS Nationals", url:"wsh/washington-nationals"},
    {team:"PIT Pirates", url:"pit/pittsburgh-pirates"},
    {team:"MIA Marlins", url:"mia/miami-marlins"},
    {team:"STL Cardinals", url:"stl/st-louis-cardinals"},
    {team:"SD Padres", url:"sd/san-diego-padres"},
    {team:"LA Dodgers", url:"lad/los-angeles-dodgers"},
    {team:"SF Giants", url:"sf/san-francisco-giants"}

];

const indexToVariable = [
    'formulaWinner',
    'seriesWinner',
    'nextWinners',
    'isF5HomeWinner',
    'isHomeWinner',
    'patternWinner'
  ];


var previousScheduleUrl = "https://www.espn.com/mlb/team/schedule/_/name/{team}/season/{year}/seasontype/2/half/{order}";

(async function example() {
    let driver =await new Builder()
          .withCapabilities(
              Options.chrome()
               //.setPageLoadStrategy('none')
          ).build()



try {
    var full2018DatesAnalysis = [
        {month:"April", from:8, to:30, monthNumber:"04"}, 
        {month:"May", from:1, to:31, monthNumber:"05"},
        {month:"June", from:1, to:30, monthNumber:"06"},
        {month:"July", from:11, to:31, monthNumber:"07"},
        {month:"August", from:1, to:31, monthNumber:"08"},
        {month:"September", from:1, to:30, monthNumber:"09"}
    ];
    var full2019DatesAnalysis = [
        {month:"July", from:11, to:31, monthNumber:"07"},
        {month:"August", from:1, to:31, monthNumber:"08"},
        {month:"September", from:1, to:29, monthNumber:"09"}
    ];

    var full2020DatesAnalysis = [
        {month:"August", from:2, to:31, monthNumber:"08"},
        {month:"September", from:1, to:27, monthNumber:"09"},
    ];

    var full2021DatesAnalysis = [
        {month:"April", from:9, to:30, monthNumber:"04"}, 
        {month:"May", from:1, to:31, monthNumber:"05"},
        {month:"June", from:1, to:30, monthNumber:"06"},
        {month:"July", from:1, to:31, monthNumber:"07"},
        {month:"August", from:1, to:31, monthNumber:"08"},
        {month:"September", from:1, to:30, monthNumber:"09"},
        {month:"October", from:1, to:3, monthNumber:"10"}
    ];

    var full2022DatesAnalysis = [
        {month:"April", from:16, to:30, monthNumber:"04"}, 
        {month:"May", from:1, to:31, monthNumber:"05"},
        {month:"June", from:1, to:30, monthNumber:"06"},
        {month:"July", from:1, to:31, monthNumber:"07"},
        {month:"August", from:1, to:31, monthNumber:"08"},
        {month:"September", from:1, to:30, monthNumber:"09"},
        {month:"October", from:1, to:5, monthNumber:"10"}
    ];

    var full2023DatesAnalysis = [
        {month:"April", from:8, to:30, monthNumber:"04"}, 
        {month:"May", from:1, to:31, monthNumber:"05"},
        {month:"June", from:1, to:30, monthNumber:"06"},
        {month:"July", from:1, to:31, monthNumber:"07"},
        {month:"August", from:1, to:31, monthNumber:"08"},
        {month:"September", from:1, to:30, monthNumber:"09"},
        {month:"October", from:1, to:1, monthNumber:"10"}
    ];
    
    
    var previousYears = [{year: "2023", dates:full2023DatesAnalysis},{year: "2022", dates:full2022DatesAnalysis},{year: "2021", dates:full2021DatesAnalysis},{year: "2020", dates:full2020DatesAnalysis},{year: "2019", dates:full2019DatesAnalysis},{year: "2018", dates:full2018DatesAnalysis}];
    


        var oldYearsPredictions = [];
        var allYearsPredictions = [];
        for (let ater = 0; ater < previousYears.length; ater++) {
             const yearData = previousYears[ater];
            // await getPreviousScheduleData(yearData.year);
            // await ProcessPreviousGameByGame(yearData.year);
            // await getPreviousPitcherGameByGame(yearData.year);
            //  await getPreviousBatterGameByGame(yearData.year);
            //  await getPreviousAllPitchersData(yearData.year);//true for noselections to be shown/included

            // var type = "AllGamesConsolidated";
            // await save(yearData.year+type, [], function(){}, "replace" ,"allConsolidatedGames");
            // await save("finalSelectionsCSV", [], function(){}, "replace" ,yearData.year);
            // await ProcessDailyGames(yearData.dates,false, type ,yearData.year);

            // var yearPredicitions = await load(yearData.year+"AllGamesConsolidated", "allConsolidatedGames");
            // oldYearsPredictions = oldYearsPredictions.concat(yearPredicitions);

        }
    
        //await save("oldYearsPredictions", oldYearsPredictions, function(){}, "replace", "allConsolidatedGames");

        async function getAllCombinations(array) {
            const results = [];
            async function combine(tempArray, remainingArray) {
              for (let i = 0; i < remainingArray.length; i++) {
                const newCombination = tempArray.concat(remainingArray[i]);
                results.push(newCombination);
                combine(newCombination, remainingArray.slice(i + 1));
              }
            }
          
            await combine([], array);
            
            for (let index = 0; index < results.length; index++) {
                const array = results[index];
                await save("combination"+index, array, function(){}, "replace", "allConsolidatedGames");
                
            }
            
            return results;


          }
          
          var results2018 = await load("2018AllGamesConsolidated", "allConsolidatedGames");
          var results2019 = await load("2019AllGamesConsolidated", "allConsolidatedGames");
          var results2020 = await load("2020AllGamesConsolidated", "allConsolidatedGames");
          var results2021 = await load("2021AllGamesConsolidated", "allConsolidatedGames");
          var results2022 = await load("2022AllGamesConsolidated", "allConsolidatedGames");
          var results2023 = await load("2023AllGamesConsolidated", "allConsolidatedGames");
          //var allYears = await load("allYearsPredictions", "allConsolidatedGames");

          // Example usage:
          const array = [results2018, results2019, results2020, results2021, results2022, results2023];
          //const combinations = await getAllCombinations(array);
    // for (let ayy = 8; ayy <= 30; ayy++) {
    //     const target = ayy;
    //     const last = ayy-1;
        
    
  //----------------------------------------  
    var fullDatesAnalysis = [
        {month:"April", from:8, to:30, monthNumber:"04"}, 
        {month:"May", from:1, to:31, monthNumber:"05"},
        {month:"June", from:1, to:30, monthNumber:"06"},
        {month:"July", from:1, to:14, monthNumber:"07"},
        {month:"July", from:19, to:31, monthNumber:"07"},
        {month:"August", from:1, to:17, monthNumber:"08"},
        {month:"August", from:22, to:31, monthNumber:"08"},
        {month:"September", from:1, to:30, monthNumber:"09"},
        {month:"October", from:1, to:3, monthNumber:"10"},
        {month:"October", from:5, to:17, monthNumber:"10"}
    ];

    var singleDayAnalysis = [ 
        //{month:"April", from:8, to:30, monthNumber:"04"}, 
        //{month:"May", from:1, to:31, monthNumber:"05"},
        //{month:"June", from:30, to:30, monthNumber:"06"},
        //{month:"July", from:31, to:31, monthNumber:"07"},
        //{month:"August", from:31, to:31, monthNumber:"08"},
        {month:"October", from:17, to:17, monthNumber:"10"}

    ];
    

    //Steps
    /// 1.Daily Updates(requires GetScheduleData to be in place)
    ///     *    
                    // await ProcessGameByGame();
                    // await getPitcherGameByGame();
                    // await getBatterGameByGame();

    /// 2.Generate Patterns from Stats (Check to include the last day in the internal method) 
    // ///    Theres is a big debendecy to have the Final Selections when the Get Picks happen
    // ///     *    
    //                 //await CleanUpAndGenerateStats(fullDatesAnalysis);

    // /// 3.Get specific data for a day of Games(make sure you have a json with initial data)
    // // // // ///     *    
                        // var type = "AllGamesConsolidated";
                        // await save(type, [], function(){}, "replace" ,"GameByGame");
                        // await save("finalSelectionsCSV", [], function(){}, "replace" ,"GameByGame");
                        // await ProcessDailyGames(fullDatesAnalysis,false, type);//true for noselections to be shown/included
                        // var oldYearsPredictions = await load("oldYearsPredictions", "allConsolidatedGames");
                        // var allConsolidatedGames = await load("AllGamesConsolidated", "GameByGame"); 
                        // allYearsPredictions = oldYearsPredictions.concat(allConsolidatedGames);
                        // await save("allYearsPredictions", allYearsPredictions, function(){}, "replace", "allConsolidatedGames");

                        // var type = "NewGamesConsolidated";
                        // await save(type, [], function(){}, "replace" ,"GameByGame");
                        // await save("finalSelectionsCSV", [], function(){}, "replace" ,"GameByGame");
                        // await ProcessDailyGames(singleDayAnalysis,true ,type);//true for noselections to be shown/included

                        //To generate visualisationFilesCreated
                        await GenerateRawJsonViewObjects(fullDatesAnalysis);
                        await CalculatePatternsForVisualisations();
                        var cleanAnalysisFile = true;
                        await GenerateAnalysisGameData(fullDatesAnalysis, cleanAnalysisFile);
                        await AnalyzeFactors();
                        await AnalyzeIndexes();
                        await GenerateFinalViewObjects(fullDatesAnalysis);
                        await GetHotNumberPerTeam();
                        await EnrichDecision();
                        //await processVariables()
                        //await BuildBettingStrategy();
                        //await GPTEvaluation()
// //}                     

                        

    //  4. Calculate Picks(can be individualDate or allDays) Obsolete
    ///     *
                    //var patternPercentage = 55;
                    //var pickPercentage = 80;//67 the best shot with 89%, 79 picks, 71 Wins
                    ////await GetPicksGames(fullDatesAnalysis, true,  patternPercentage, pickPercentage);
                    ////await ProcessFinalPicks();
                    //await GetPicksGames(fullDatesAnalysis, false,  patternPercentage, pickPercentage);

    //  5. Check for results of the selected picks if they already played
    ///     *
                    //await GetResultsSummary();
                    //await GetResultsSummaryPrototype();
                    //await ConsolidateSelectionsResults();

    //  6. * Optional - Process old date with no json initial data through the algorithm(specify old/passed date)
    ///     *
                //await AlgoSeriesWinnerBasedOnResultAndPattern(selectedDate);
                //await getESPNData(selectedDate);
                //await CalculateWinnersViaFormula(selectedDate);     

    

        
    } 
    catch(Ex){
        console.log(Ex);
        await driver.quit();
        //await example();
    } finally {
        await driver.quit();
    }

    function filterByIndices(results, indicesToFilter) {
        return results.filter(result => 
          indicesToFilter.every(index => result.indices.includes(index))
        );
      }

      function groupBySeries(games)
      {
        games.forEach(element => {
            element.OPPONENT = element.OPPONENT.replace(/(?:\r\n|\r|\n)/g, '');
        });
        const series = games.reduce((serie, item) => {
            const { OPPONENT } = item;
            if (!serie[OPPONENT]) {
              serie[OPPONENT] = [];
            }
            serie[OPPONENT].push(item);
            return serie;
          }, {});

          return series;
      }

      async function GetHotNumberPerTeam(){
        
        var teamsSchedule = await GetLatestTeamSchedules();
        teamsSchedule = teamsSchedule.filter(function(item){
            return item.period == 0; 
        });
        var hotChancesByTeamByDay = [];
        for (let index = 0; index < teamsSchedule.length; index++) {
            const team = teamsSchedule[index];
            var det = {team:team.teamName, winChances:[]};
            var gameDates = team.scheduleData.map(function(item){
                return item.DATE;
            });
            var  distinctGameDates= [...new Set(gameDates)];
            var today = new Date().toLocaleDateString('en-us', { weekday:"short", month:"short", day:"numeric"}).toString() ;
            var isTodayIn = distinctGameDates.filter(function(item){return item == today});
            if(isTodayIn.length == 0){ 
                distinctGameDates.push(today);
            }
            for (let dateIndex = 0; dateIndex < distinctGameDates.length; dateIndex++) {
                const date = distinctGameDates[dateIndex];
                
                var chances = {date : ConvertESPNDate(date), winPer:0, lostPer:0};
                var ind = team.scheduleData.findIndex(x =>x.DATE == date) == 0 ? 1:team.scheduleData.findIndex(x =>x.DATE == date) ;
                if(ind !=-1)
                {
                    var dataScope = team.scheduleData.slice(0,ind);
                    var winsLoses = dataScope.map(function(item){return item.ISWIN =="Win"?1:0;} );
                    chances.winPer = probabilityNextOne(winsLoses);

            
                }
                else{
                    var winsLoses = team.scheduleData.map(function(item){return item.ISWIN =="Win"?1:0;} );
                    chances.winPer = probabilityNextOne(winsLoses);
                }
                
                det.winChances.push(chances);
            }
            hotChancesByTeamByDay.push(det);
            var series = groupBySeries(team.scheduleData);
        }
        await save("hotChancesByTeam", hotChancesByTeamByDay, function(){}, "replace", "hotChancesByTeamByDay");
      }

      function ConvertESPNDate(date)
      {
        var espnDate = date;
        var day = date.split(", ")[1];
        var number = day.split(" ")[1];
        var month =  day.split(" ")[0] == "Jan" ? "January" : day.split(" ")[0] == "Feb" ? "February" : day.split(" ")[0] == "Mar" ? "March" :day.split(" ")[0] == "Apr" ? "April" :
        day.split(" ")[0] == "May" ? "May" :day.split(" ")[0] == "Jun" ? "June"  : day.split(" ")[0] == "Jul" ? "July" :day.split(" ")[0] == "Aug" ? "August" :day.split(" ")[0] == "Sep" ? "September" :
        day.split(" ")[0] == "Oct" ? "October" :day.split(" ")[0] == "Nov" ? "November" :day.split(" ")[0] == "Dec" ? "December":"None";
        var selectedDate = month+number;
        if(number == 1 || number == 31)
            {
                selectedDate += "st";
            }
            else if(number == 3)
            {
                selectedDate += "rd";

            }
            else if(number == 2)
            {
                selectedDate += "nd";

            }
            else{
                selectedDate += "th";
            }

            return selectedDate;
      }

      function generatePatternCombinationsWithIndices(pattern) {
        const combinations = [];
        const length = pattern.length;
      
        // Generate all combinations of 1 to length characters with their indices
        for (let i = 1; i < (1 << length); i++) {
          let combination = '';
          let indices = [];
          for (let j = 0; j < length; j++) {
            if (i & (1 << j)) {
              combination += pattern[j];
              indices.push(indexToVariable[j]);
            }
          }
          combinations.push({ combination, indices });
        }
      
        return combinations;
      }

      
    async function GPTEvaluation(){
        // Example JSON data
    var jsonData = await load("allAnalysisData", "allAnalysisData" );
  
    function generatePatternCombinationsWithIndices(pattern) {
        const combinations = [];
        const length = pattern.length;
      
        // Generate all combinations of 1 to length characters with their indices
        for (let i = 1; i < (1 << length); i++) {
          let combination = '';
          let indices = [];
          for (let j = 0; j < length; j++) {
            if (i & (1 << j)) {
              combination += pattern[j];
              indices.push(indexToVariable[j]);
            }
          }
          combinations.push({ combination, indices });
        }
      
        return combinations;
      }
      
      // Function to determine the target value based on the most repeated character
      function determineTargetValue(combination) {
        const counts = {};
        for (const char of combination) {
          if (!counts[char]) {
            counts[char] = 0;
          }
          counts[char] += 1;
        }
        return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
      }
      
      // Function to evaluate matches for all combinations of agnosticPattern
      function evaluatePatternMatches(data) {
        const allCombinations = new Set();
        data.forEach(obj => {
          const combinations = generatePatternCombinationsWithIndices(obj.variables.agnosticPattern);
          combinations.forEach(comb => allCombinations.add(JSON.stringify(comb)));
        });
      
        const matchCounts = {};
      
        allCombinations.forEach(combination => {
          const parsedCombination = JSON.parse(combination);
          matchCounts[combination] = { 
            combination: parsedCombination.combination,
            indices: parsedCombination.indices,
            targetValue: determineTargetValue(parsedCombination.combination),
            isHomeWinner: { match: 0, total: 0 }, 
            isF5HomeWinner: { match: 0, total: 0 } 
          };
        });
      
        data.forEach(obj => {
          const pattern = obj.variables.agnosticPattern;
          const combinations = generatePatternCombinationsWithIndices(pattern);
      
          combinations.forEach(combination => {
            const key = JSON.stringify(combination);
            const targetValue = matchCounts[key].targetValue;
      
            if (targetValue === obj.results.isHomeWinner) {
              matchCounts[key].isHomeWinner.match += 1;
            }
            matchCounts[key].isHomeWinner.total += 1;
      
            if (targetValue === obj.results.isF5HomeWinner) {
              matchCounts[key].isF5HomeWinner.match += 1;
            }
            matchCounts[key].isF5HomeWinner.total += 1;
          });
        });
      
        const resultPercentages = [];
      
        for (const key in matchCounts) {
          const homeWinTracker = matchCounts[key].isHomeWinner;
          const f5HomeWinTracker = matchCounts[key].isF5HomeWinner;
          resultPercentages.push({
            combination: matchCounts[key].combination,
            indices: matchCounts[key].indices,
            targetValue: matchCounts[key].targetValue,
            total: homeWinTracker.total, // Adding the total count
            isHomeWinnerPercentage: homeWinTracker.total > 0 ? (homeWinTracker.match / homeWinTracker.total) * 100 : 0,
            isF5HomeWinnerPercentage: f5HomeWinTracker.total > 0 ? (f5HomeWinTracker.match / f5HomeWinTracker.total) * 100 : 0
          });
        }
      
        // Sort the result by isHomeWinnerPercentage in descending order
        resultPercentages.sort((a, b) => b.isHomeWinnerPercentage - a.isHomeWinnerPercentage);
      
        return resultPercentages;
      }
      
      
      
      // Example usage
      const resultPercentages = evaluatePatternMatches(jsonData);
      console.log(resultPercentages);
  await save("resultsPercentages", resultPercentages, function(){}, "replace" ,"resultPercentages");
  
    }

    async function BuildBettingStrategy()
    {
        var selections = await load("analysisGameDetails", "analysisGameDetails");
        var IndexAndDayStats =  await load("IndexAndDayStats", "IndexAndDayStats");
        var dayWonPatterns = {parlays:[], trilays:[], fourlays:[], parlaysWinPercentage:0, parlayTimeLine : [], parlaysBestStreak:"", parlaysWorstStreak:"", parlaysAvgBestStreak:"", parlaysAvgWorstStreak:"",trilayTimeLine : [], trilaysBestStreak:"", trilaysWorstStreak:"", trilaysAvgBestStreak:"", trilaysAvgWorstStreak:"",fourlayTimeLine : [], fourlaysBestStreak:"", fourlaysWorstStreak:"", fourlaysAvgBestStreak:"", fourlaysAvgWorstStreak:""};
        for (let index = 0; index < selections.length; index++) {
            const day = selections[index];

            
            var dayGameWonResults = day.games.map(function(item){
                return item.betWon
            });

            var numberOfParlays = Math.floor(dayGameWonResults.length/2);
            var numberOfTrilays = Math.floor(dayGameWonResults.length/3);
            var numberOfFourlays = Math.floor(dayGameWonResults.length/4);
           
            //workon selections only top
            var numberOfTopParlays = 1;
            if(numberOfParlays > numberOfTopParlays)
            {
                numberOfParlays = numberOfTopParlays;
            }

            var startParlay = 0;
            var lastParlay = 2;
            var totalParlaysWon = 0;
            var parlayIndexesWon = [];
            
            for (let sin = 0; sin < numberOfParlays; sin++) {

                var parlay = dayGameWonResults.slice(startParlay,lastParlay);
                startParlay += 2;
                lastParlay += 2;
                var isParlayWon = parlay.reduce((accumulator, current) => accumulator + current, 0) == 2 ? 1:0;
                totalParlaysWon += isParlayWon;
                if(isParlayWon)
                {
                    parlayIndexesWon.push(sin);
                    
                }
                
                var stopHere = "";          
            }
            dayWonPatterns.parlayTimeLine.push((totalParlaysWon == numberOfTopParlays ? 1:0))
            dayWonPatterns.parlays.push({date: day.date,dayOfWeek: GetDayOfWeek(day.date) ,dayGameWonResults:dayGameWonResults, numberOfParlays:numberOfParlays, totalParlaysWon:totalParlaysWon, parlayIndexesWon:parlayIndexesWon, winPercentage:Math.round((totalParlaysWon*100)/(numberOfParlays ==0 ? 1 :numberOfParlays))});
            

            //workon selections only top
            var numberOfTopTrilays = 1;
            if(numberOfTrilays > numberOfTopTrilays)
            {
                numberOfTrilays = numberOfTopTrilays;
            }

            var startTrilay = 0;
            var lastTrilay = 3;
            var totalTrilaysWon = 0;
            var trilayIndexesWon = [];
            for (let sin = 0; sin < numberOfTrilays; sin++) {

                var trilay = dayGameWonResults.slice(startTrilay,lastTrilay);
                startTrilay += 2;
                lastTrilay += 2;
                var isTrilayWon = trilay.reduce((accumulator, current) => accumulator + current, 0) == 2 ? 1:0;
                totalTrilaysWon += isTrilayWon;
                if(isTrilayWon)
                {
                    trilayIndexesWon.push(sin);
                }
                var stopHere = "";          
            }
            dayWonPatterns.trilayTimeLine.push((totalTrilaysWon == numberOfTopTrilays ? 1:0));
            dayWonPatterns.trilays.push({date: day.date,dayOfWeek: GetDayOfWeek(day.date) ,dayGameWonResults:dayGameWonResults, numberOfTrilays:numberOfTrilays, totalTrilaysWon:totalTrilaysWon, trilayIndexesWon:trilayIndexesWon, winPercentage:Math.round((totalTrilaysWon*100)/(numberOfTrilays == 0 ? 1 : numberOfTrilays))});
            

            //workon selections only top
            var numberOfTopFourlays = 1;
            if(numberOfFourlays > numberOfTopFourlays)
            {
                numberOfFourlays = numberOfTopFourlays;
            }

            var startFourlay = 0;
            var lastFourlay = 3;
            var totalFourlaysWon = 0;
            var fourlayIndexesWon = [];
            for (let sin = 0; sin < numberOfFourlays; sin++) {

                var fourlay = dayGameWonResults.slice(startFourlay,lastFourlay);
                startFourlay += 2;
                lastFourlay += 2;
                var isFourlayWon = fourlay.reduce((accumulator, current) => accumulator + current, 0) == 2 ? 1:0;
                totalFourlaysWon += isFourlayWon;
                if(isFourlayWon)
                {
                    fourlayIndexesWon.push(sin);
                }
                var stopHere = "";          
            }
            dayWonPatterns.fourlayTimeLine.push((totalFourlaysWon == numberOfTopFourlays ? 1:0));
            dayWonPatterns.fourlays.push({date: day.date,dayOfWeek: GetDayOfWeek(day.date) ,dayGameWonResults:dayGameWonResults, numberOfFourlays:numberOfFourlays, totalFourlaysWon:totalFourlaysWon, fourlayIndexesWon:fourlayIndexesWon, winPercentage:Math.round((totalFourlaysWon*100)/(numberOfFourlays ==0?1:numberOfFourlays))});
            
            await save("ParlaysStats", dayWonPatterns, function(){}, "replace", "ParlaysStats")
            var stopHere = "";
        }
        //var parlaysWinPercentages = dayWonPatterns.parlays.map(function(item){return item.winPercentage});
        dayWonPatterns.parlaysWinPercentage = Math.round(dayWonPatterns.parlayTimeLine.reduce((accumulator, current) => accumulator + current, 0)*100/dayWonPatterns.parlayTimeLine.length);
        dayWonPatterns.parlaysBestStreak = "W-"+longestStreak(dayWonPatterns.parlayTimeLine, 1);
        dayWonPatterns.parlaysWorstStreak = "L-"+longestStreak(dayWonPatterns.parlayTimeLine, 0);
        dayWonPatterns.parlaysAvgBestStreak = "W-"+averageStreak(dayWonPatterns.parlayTimeLine, 1);
        dayWonPatterns.parlaysAvgWorstStreak = "L-"+averageStreak(dayWonPatterns.parlayTimeLine, 0);
        dayWonPatterns.parlaysCurrentStreak = currentStreak(dayWonPatterns.parlayTimeLine, 1);
        dayWonPatterns.parlaysHotWinChances = probabilityNextOne(dayWonPatterns.parlayTimeLine);

        dayWonPatterns.trilaysWinPercentage = Math.round(dayWonPatterns.trilayTimeLine.reduce((accumulator, current) => accumulator + current, 0)*100/dayWonPatterns.trilayTimeLine.length);
        dayWonPatterns.trilaysBestStreak = "W-"+longestStreak(dayWonPatterns.trilayTimeLine, 1);
        dayWonPatterns.trilaysWorstStreak = "L-"+longestStreak(dayWonPatterns.trilayTimeLine, 0);
        dayWonPatterns.trilaysAvgBestStreak = "W-"+averageStreak(dayWonPatterns.trilayTimeLine, 1);
        dayWonPatterns.trilaysAvgWorstStreak = "L-"+averageStreak(dayWonPatterns.trilayTimeLine, 0);
        dayWonPatterns.trilaysCurrentStreak = currentStreak(dayWonPatterns.trilayTimeLine, 1);
        dayWonPatterns.trilaysHotWinChances = probabilityNextOne(dayWonPatterns.trilayTimeLine);


        dayWonPatterns.fourlaysWinPercentage = Math.round(dayWonPatterns.fourlayTimeLine.reduce((accumulator, current) => accumulator + current, 0)*100/dayWonPatterns.fourlayTimeLine.length);
        dayWonPatterns.fourlaysBestStreak = "W-"+longestStreak(dayWonPatterns.fourlayTimeLine, 1);
        dayWonPatterns.fourlaysWorstStreak = "L-"+longestStreak(dayWonPatterns.fourlayTimeLine, 0);
        dayWonPatterns.fourlaysAvgBestStreak = "W-"+averageStreak(dayWonPatterns.fourlayTimeLine, 1);
        dayWonPatterns.fourlaysAvgWorstStreak = "L-"+averageStreak(dayWonPatterns.fourlayTimeLine, 0);
        dayWonPatterns.fourlaysCurrentStreak = currentStreak(dayWonPatterns.fourlayTimeLine, 1);
        dayWonPatterns.fourlaysHotWinChances = probabilityNextOne(dayWonPatterns.fourlayTimeLine);

        var stopHere = "";

    }

    function analyzeStreaks(data, value) {
        let streaks = [];
        let currentStreak = 0;
        let lastValue = value;
    
        // Calculate all streaks for the given value
        data.forEach((val, index) => {
            if (val === lastValue) {
                currentStreak++;
            } else {
                if (currentStreak > 0) {
                    streaks.push(currentStreak);
                }
                currentStreak = 0; // Reset streak when value changes
            }
        });
    
        // Include the last streak if the last value matches
        if (currentStreak > 0 && data[data.length - 1] === lastValue) {
            streaks.push(currentStreak);
        }
    
        return streaks;
    }
    
    function calculateAverage(streaks) {
        if (streaks.length === 0) return 0;
        const sum = streaks.reduce((acc, cur) => acc + cur, 0);
        return sum / streaks.length;
    }
    
    function probabilityNextOne(data) {
        const streaks1 = analyzeStreaks(data, 1);
        const streaks0 = analyzeStreaks(data, 0);
    
        const averageStreak1 = calculateAverage(streaks1);
        const averageStreak0 = calculateAverage(streaks0);
    
        // Determine current value to identify current streak type
        const currentStreakValue = data[data.length - 1];
        const currentStreak = (currentStreakValue === 1 ? streaks1 : streaks0).pop() || 0;
    
        if (currentStreakValue === 0) {
            // Probability model if the last value was 0
            if (currentStreak < averageStreak0) {
                return Math.ceil(100 * (currentStreak / averageStreak0));
            } else {
                return Math.ceil(100 * (averageStreak0 / currentStreak));
            }
        } else {
            // Probability model if the last value was 1
            if (currentStreak < averageStreak1) {
                return Math.ceil(100 * (currentStreak / averageStreak1));
            } else {
                return Math.ceil(100 * (averageStreak1 / currentStreak));
            }
        }
    }
    

    function probabilityNextLost(data) {
        const streaks1 = analyzeStreaks(data, 1);
        const streaks0 = analyzeStreaks(data, 0);
    
        const averageStreak1 = calculateAverage(streaks1);
        const averageStreak0 = calculateAverage(streaks0);
    
        // Determine current value to identify current streak type
        const currentStreakValue = data[data.length - 1];
        const currentStreak = (currentStreakValue === 1 ? streaks1 : streaks0).pop() || 0;
    
        if (currentStreakValue === 1) {
            // Probability model if the last value was 1
            if (currentStreak < averageStreak1) {
                return Math.ceil(100 * (currentStreak / averageStreak1));
            } else {
                return Math.ceil(100 * (averageStreak1 / currentStreak));
            }
        } else {
            // Probability model if the last value was 0
            if (currentStreak < averageStreak0) {
                return Math.ceil(100 * (currentStreak / averageStreak0));
            } else {
                return Math.ceil(100 * (averageStreak0 / currentStreak));
            }
        }
    }

    function currentStreak(arr) {
        if (arr.length === 0) {
            return "No data";
        }
    
        let lastValue = arr[arr.length - 1];
        let streak = 0;
    
        for (let i = arr.length - 1; i >= 0; i--) {
            if (arr[i] === lastValue) {
                streak++;
            } else {
                break;
            }
        }
    
        // Format the result based on the value of the streak
        if (lastValue === 0) {
            return "L-" + Math.ceil(streak);
        } else if (lastValue === 1) {
            return "W-" + Math.ceil(streak);
        } else {
            return "Current streak: " + streak; // Fallback for any other number
        }
    }

    function averageStreak(arr, value) {
        let totalStreaks = 0;
        let totalStreakLength = 0;
        let currentStreak = 0;
    
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === value) {
                currentStreak++;
            } else if (currentStreak > 0) {
                totalStreaks++;
                totalStreakLength += currentStreak;
                currentStreak = 0;
            }
        }
    
        // Check if the last element was part of a streak
        if (currentStreak > 0) {
            totalStreaks++;
            totalStreakLength += currentStreak;
        }
    
        // Compute average; avoid division by zero
        return Math.ceil(totalStreaks > 0 ? totalStreakLength / totalStreaks : 0);
    }

    function longestStreak(arr, value) {
        let maxStreak = 0;
        let currentStreak = 0;
    
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === value) {
                currentStreak++;
                maxStreak = Math.max(maxStreak, currentStreak);
            } else {
                currentStreak = 0; // Reset streak count on mismatch
            }
        }
    
        return maxStreak;
    }

    async function AnalyzeIndexes()
    {
        
        var selections = await load("analysisGameDetails", "analysisGameDetails");
        var allStats = [];
        var dates = selections.map(function(item){
            return item.date;
        });

        for (let tsgt = 0; tsgt < dates.length; tsgt++) {
            var finalResults = {wins:[], loses:[]};

            const date = dates[tsgt];
            var dateIndex = selections.findIndex(x => x.date == date);
            dateIndex = dateIndex == 0 ? 1 : dateIndex;
            if(dateIndex != -1)
            {
                    var dataScope = selections.slice(0, dateIndex);
                        var indexStats = [];
                    for (let sdf = 0; sdf < 18; sdf++) {
                        const ind = sdf;
                        var indexDetail = {index:ind, wins:0, loses:0, winsWandicaps:0, winPercenatge:0, winHandicapPercentage:0, totalGames:0, games:[], hotChances:0};
                        indexStats.push(indexDetail);
                    }

                    var topGamesWon = [];
                    for (let index = 0; index < dataScope.length; index++) {
                        const gamesInDay = dataScope[index].games;
                        var isFirstLost = false;
                        var isHandicapLost = false;
                        var topGamesWonCount= 0;
                        var topGamesHandicapped = 0;
                        var wins = 0;
                        var loses= 0;
                        for (let hsbd = 0; hsbd < gamesInDay.length; hsbd++) {
                            var indexDetail = indexStats.filter(function(item){return item.index == hsbd})[0];
                            if(indexDetail)
                            {
                                const game = gamesInDay[hsbd];
                                indexDetail.games.push(game);
                                indexDetail.wins += game.betWon == 1 ? 1 : 0;
                                indexDetail.loses += game.betWon == 0 ? 1 : 0;
                                wins += game.betWon == 1 ? 1 : 0;
                                loses += game.betWon == 0 ? 1 : 0;
                                indexDetail.totalGames++;
                                indexDetail.winPercenatge = Math.round((indexDetail.wins*100)/ (indexDetail.wins + indexDetail.loses));
                                indexDetail.winsWandicaps += (game.betWon == 1 && game.wasHandicapped)? 1 : 0;
                                indexDetail.winHandicapPercentage = Math.round((indexDetail.winsWandicaps*100)/ (indexDetail.wins + indexDetail.loses));
                                if(game.betWon == 0)
                                {
                                    isFirstLost = true;
                                }
                                if(!isFirstLost)
                                {
                                    topGamesWonCount++;
                                }
                                if(game.wasHandicapped == 0)
                                { 
                                    isHandicapLost = true;
                                }
                                if(!isFirstLost && !isHandicapLost)
                                {
                                    topGamesHandicapped++;
                                }
                            }
                            else{
                                var stopHere = "";
                            }
                        }
                        if(gamesInDay.length > 0){
                            topGamesWon.push({dayOfWeek: GetDayOfWeek(gamesInDay[0].date), date:gamesInDay[0].date, topGamesWon: topGamesWonCount, topGamesHandicapped:topGamesHandicapped, totalWins: wins, totalLoses:loses});
                        }
                        
                    }

                    indexStats.forEach(function(item){
                        var indexBetWons = item.games.map(function(item){return item.betWon;});
                        item.hotChances = probabilityNextOne(indexBetWons);
                    });

                    var indexStatsSorted = await sorting(indexStats, "hotChances", "desc");

                    var mon = topGamesWon.filter(function(item){return item.dayOfWeek == "Mon"});
                    var monTopGameValues = mon.map(function(item){return item.topGamesWon});
                    var monTopGameAvg = Math.round(GetAverage(monTopGameValues));
                    var monTotalWinsValues = mon.map(function(item){return item.totalWins});
                    var monTotalWinsAvg = Math.round(GetAverage(monTotalWinsValues));
                    var monTotalLosesValues = mon.map(function(item){return item.totalLoses});
                    var monTotalLosesAvg = Math.round(GetAverage(monTotalLosesValues));
                    var monWinPercentage = Math.round((monTotalWinsAvg * 100)/(monTotalWinsAvg + monTotalLosesAvg));

                    var tue = topGamesWon.filter(function(item){return item.dayOfWeek == "Tue"});
                    var tueTopGameValues = tue.map(function(item){return item.topGamesWon});
                    var tueTopGameAvg = Math.round(GetAverage(tueTopGameValues));
                    var tueTotalWinsValues = tue.map(function(item){return item.totalWins});
                    var tueTotalWinsAvg = Math.round(GetAverage(tueTotalWinsValues));
                    var tueTotalLosesValues = tue.map(function(item){return item.totalLoses});
                    var tueTotalLosesAvg = Math.round(GetAverage(tueTotalLosesValues));
                    var tueWinPercentage = Math.round((tueTotalWinsAvg * 100)/(tueTotalWinsAvg + tueTotalLosesAvg));


                    var wed = topGamesWon.filter(function(item){return item.dayOfWeek == "Wed"});
                    var wedTopGameValues = wed.map(function(item){return item.topGamesWon});
                    var wedTopGameAvg = Math.round(GetAverage(wedTopGameValues));
                    var wedTotalWinsValues = wed.map(function(item){return item.totalWins});
                    var wedTotalWinsAvg = Math.round(GetAverage(wedTotalWinsValues));
                    var wedTotalLosesValues = wed.map(function(item){return item.totalLoses});
                    var wedTotalLosesAvg = Math.round(GetAverage(wedTotalLosesValues));
                    var wedWinPercentage = Math.round((wedTotalWinsAvg * 100)/(wedTotalWinsAvg + wedTotalLosesAvg));

                    var thu = topGamesWon.filter(function(item){return item.dayOfWeek == "Thu"});
                    var thuTopGameValues = thu.map(function(item){return item.topGamesWon});
                    var thuTopGameAvg = Math.round(GetAverage(thuTopGameValues));
                    var thuTotalWinsValues = thu.map(function(item){return item.totalWins});
                    var thuTotalWinsAvg = Math.round(GetAverage(thuTotalWinsValues));
                    var thuTotalLosesValues = thu.map(function(item){return item.totalLoses});
                    var thuTotalLosesAvg = Math.round(GetAverage(thuTotalLosesValues));
                    var thuWinPercentage = Math.round((thuTotalWinsAvg * 100)/(thuTotalWinsAvg + thuTotalLosesAvg));


                    var fri = topGamesWon.filter(function(item){return item.dayOfWeek == "Fri"});
                    var friTopGameValues = fri.map(function(item){return item.topGamesWon});
                    var friTopGameAvg = Math.round(GetAverage(friTopGameValues));
                    var friTotalWinsValues = fri.map(function(item){return item.totalWins});
                    var friTotalWinsAvg = Math.round(GetAverage(friTotalWinsValues));
                    var friTotalLosesValues = fri.map(function(item){return item.totalLoses});
                    var friTotalLosesAvg = Math.round(GetAverage(friTotalLosesValues));
                    var friWinPercentage = Math.round((friTotalWinsAvg * 100)/(friTotalWinsAvg + friTotalLosesAvg));


                    var sat = topGamesWon.filter(function(item){return item.dayOfWeek == "Sat"});
                    var satTopGameValues = sat.map(function(item){return item.topGamesWon});
                    var satTopGameAvg = Math.round(GetAverage(satTopGameValues));
                    var satTotalWinsValues = sat.map(function(item){return item.totalWins});
                    var satTotalWinsAvg = Math.round(GetAverage(satTotalWinsValues));
                    var satTotalLosesValues = sat.map(function(item){return item.totalLoses});
                    var satTotalLosesAvg = Math.round(GetAverage(satTotalLosesValues));
                    var satWinPercentage = Math.round((satTotalWinsAvg * 100)/(satTotalWinsAvg + satTotalLosesAvg));


                    var sun = topGamesWon.filter(function(item){return item.dayOfWeek == "Sun"});
                    var sunTopGameValues = sun.map(function(item){return item.topGamesWon});
                    var sunTopGameAvg = Math.round(GetAverage(sunTopGameValues));
                    var sunTotalWinsValues = sun.map(function(item){return item.totalWins});
                    var sunTotalWinsAvg = Math.round(GetAverage(sunTotalWinsValues));
                    var sunTotalLosesValues = sun.map(function(item){return item.totalLoses});
                    var sunTotalLosesAvg = Math.round(GetAverage(sunTotalLosesValues));
                    var sunWinPercentage = Math.round((sunTotalWinsAvg * 100)/(sunTotalWinsAvg + sunTotalLosesAvg));

                    var stats = {indexStats:indexStatsSorted, dayStats:{topGamesWon:topGamesWon, 
                        Mon:{TopGameAvg:monTopGameAvg, WinPercentage:monWinPercentage },
                        Tue:{TopGameAvg:tueTopGameAvg, WinPercentage:tueWinPercentage },
                        Wed:{TopGameAvg:wedTopGameAvg, WinPercentage:wedWinPercentage },
                        Thu:{TopGameAvg:thuTopGameAvg, WinPercentage:thuWinPercentage },
                        Fri:{TopGameAvg:friTopGameAvg, WinPercentage:friWinPercentage },
                        Sat:{TopGameAvg:satTopGameAvg, WinPercentage:satWinPercentage },
                        Sun:{TopGameAvg:sunTopGameAvg, WinPercentage:sunWinPercentage },
                    }};
                    allStats.push({date: date, stats:stats});
                    await save(date+"IndexAndDayStats",stats, function(){},"replace", "IndexAndDayStats");
                    var stopHere = "";
                }
        }
        await save("allIndexAndDayStats",allStats, function(){},"replace", "IndexAndDayStats");
        
    }

    function GetAverage(dataset)
    {
        return dataset.reduce((accumulator, current) => accumulator + current, 0)/dataset.length;
    }

    async function AnalyzeFactors()
    {
        
        var selections = await load("analysisGameDetails", "analysisGameDetails");

        var dates = selections.map(function(item){
            return item.date;
        });

        for (let tsgt = 0; tsgt < dates.length; tsgt++) {
            var finalResults = {wins:[], loses:[]};
            const date = dates[tsgt];
            var dateIndex = selections.findIndex(x => x.date == date);
            dateIndex = dateIndex == 0 ? 1 : dateIndex;
            if(dateIndex != -1)
            {
                var dataScope = selections.slice(0, dateIndex);
                var allGames = [];
                for (let index = 0; index < dataScope.length; index++) {
                    const day = dataScope[index];
                    allGames = allGames.concat(day.games);
                    
                }

                var recommendedBets = allGames.map(function(item){
                    return item.recommendedBet ;
                });

                var maxFactor = Math.max(...recommendedBets);
                var maxRoundedFactor = roundToClosestQuarterOrInt(maxFactor)+.25;

            var allSplittedFactors = [];

            while(maxRoundedFactor > 0)
                {
                    maxRoundedFactor -= .25;
                    allSplittedFactors[(maxRoundedFactor).toString()] = [];
                    
                }

                for (let tsgw = 0; tsgw < allGames.length; tsgw++) {
                    const game = allGames[tsgw];

                    var roundedFactor = roundToClosestQuarterOrInt(game.recommendedBet);

                    var targetArray = allSplittedFactors[roundedFactor.toString()]
                    targetArray.push(game);
                    
                }

                


                var consolidatedFactors = [];
                var keyFactors = Object.keys(allSplittedFactors);
                for (let hdsf = 0; hdsf < keyFactors.length; hdsf++) {
                    var keyFactor = keyFactors[hdsf];
                    const gamesInRange = allSplittedFactors[keyFactor];
                    var rangeDetails = {factor:keyFactor, wins:0, loses:0, winsWandicaps:0, winPercenatge:0, winHandicapPercentage:0, totalGames:0,games:gamesInRange};
                    for (let hsbd = 0; hsbd < gamesInRange.length; hsbd++) {
                        const game = gamesInRange[hsbd];
                        rangeDetails.wins += game.betWon == 1 ? 1 : 0;
                        rangeDetails.loses += game.betWon == 0 ? 1 : 0;
                        rangeDetails.totalGames++;
                        rangeDetails.winPercenatge = (rangeDetails.wins*100)/ (rangeDetails.wins + rangeDetails.loses);
                        rangeDetails.winsWandicaps += (game.betWon == 1 && game.wasHandicapped)? 1 : 0;
                        rangeDetails.winHandicapPercentage = (rangeDetails.winsWandicaps*100)/ (rangeDetails.wins + rangeDetails.loses);
                        
                    }
                    if(gamesInRange.length > 0){
                        consolidatedFactors.push(rangeDetails);
                    }
                    var stopHere = "";

                    
                }

                var consolidatedFactorsSorted = await sorting(consolidatedFactors,"winPercenatge", "desc");

                await save(date+"consolidatedFactors", consolidatedFactorsSorted ,function(){}, "replace" ,"analysisGameDetails");
            }
            else{
                var stopHere = "";
            }
            
        }

        
    }

    async function ProcessDailyGames(datesAnalysis, noSelections, type ,year = null){
        numberPicks = {0:0, 1:0, 2:0, 3:0, 4:0, 5:0};
        winsCount = {0:0, 1:0, 2:0, 3:0, 4:0, 5:0};
        var singleExec = true;
        allConsolidatedGames = [];
        for (let te = 0; te < datesAnalysis.length; te++) {
            const mmonth = datesAnalysis[te];
        
    
                for (let index =mmonth.from; index <= mmonth.to; index++)
                {
                var selectedDate = mmonth.month+index;
                
                if(index == 1 || index == 31)
                {
                    selectedDate += "st";
                }
                else if(index == 3)
                {
                    selectedDate += "rd";
    
                }
                else{
                    selectedDate += "th";
                }
                if(index <10)
                {
                    if(year){
                    var descriptiveDate = year+"-"+mmonth.monthNumber+"-0"+index;
                    }
                    else{
                        var descriptiveDate = "2024-"+mmonth.monthNumber+"-0"+index;
                    }
                }
                else{
                    if(year){
                            var descriptiveDate = year +"-"+mmonth.monthNumber+"-"+index;
                        }
                        else{
                            var descriptiveDate = "2024-"+mmonth.monthNumber+"-0"+index;
                        }
                }
                

                if(year)
                {
                    //await AlgoPreviousSeriesWinnerBasedOnResultAndPattern(selectedDate, year);
                    //await getPreviousESPNData(selectedDate, year);
                    //await getPreviousCoversWinPercentages(selectedDate, descriptiveDate, year);
                    //await CalculatePreviousWinnersViaFormula(selectedDate, noSelections, type, year);
                }
                //if(selectedDate != "July15th" && selectedDate != "July16th" &&  selectedDate != "July17th" && selectedDate != "July18th")
                else {   
                //-----------------------------    
                //try{
                // await getScheduleData(selectedDate);
                // await ProcessGameByGame();
                // await getPitcherGameByGame();
                // await getBatterGameByGame();
                // await CleanUpAndGenerateStats(datesAnalysis); //This process now only one for the day before

                // await getAllPitchersData(selectedDate);
                // await getESPNData(selectedDate);
                //  await getBattersData(selectedDate);
                //  await getBestScoringTeamsByBatting(selectedDate);
                //  await getBestHittingTeamsByBatting(selectedDate);
                //  await getBestStartingPitchersTeams(selectedDate);
                //  await getBestRelievingPitchersTeams(selectedDate);
                //  await getBestOverallPitchersTeams(selectedDate);
             
                //  await getMoreWininigTeams(selectedDate);
                //  await getMoreScoringTeams(selectedDate);
                //  await getMoreReceivingTeams(selectedDate);
                //  await evaluateGames(selectedDate);
                //  await sortBetterAvgs(selectedDate);
                //  await filterConsistentPicks(selectedDate)
             
                //  await AlgoSeriesWinnerBasedOnResultAndPattern(selectedDate);
                //  await AlgoDetailedPitchingAndBattingAnalysis(selectedDate)
                //  await getCoversWinPercentages(selectedDate, descriptiveDate);
                //  await consolidateAlgorithmResults(selectedDate);

                 await CalculateWinnersViaFormula(selectedDate, noSelections, type);
            

                
                //}
                
                //catch(ex){
                    //throw ex;
                    // console.log("Generating from scratch:" + selectedDate);
                    //await AlgoSeriesWinnerBasedOnResultAndPattern(selectedDate);
                    // await getESPNData(selectedDate);
                    //await CalculateWinnersViaFormula(selectedDate, noSelections, type);  
                    //continue;
                //}
            }
                }
            }
    }

    async function GenerateRawJsonViewObjects(datesAnalysis){
        numberPicks = {0:0, 1:0, 2:0, 3:0, 4:0, 5:0};
        winsCount = {0:0, 1:0, 2:0, 3:0, 4:0, 5:0};
        var singleExec = true;
        allConsolidatedGames = [];
        for (let te = 0; te < datesAnalysis.length; te++) {
            const mmonth = datesAnalysis[te];
        
    
                for (let index =mmonth.from; index <= mmonth.to; index++)
                {
                var selectedDate = mmonth.month+index;
                
                if(index == 1 || index == 31)
                {
                    selectedDate += "st";
                }
                else if(index == 3)
                {
                    selectedDate += "rd";
    
                }
                else{
                    selectedDate += "th";
                }
                if(index <10)
                {
                    
                        var descriptiveDate = "2024-"+mmonth.monthNumber+"-0"+index;
                    
                }
                else{
                            var descriptiveDate = "2024-"+mmonth.monthNumber+"-0"+index;
                        
                }
                
                var evaluatePatterns = false;
                var processIndexAndDays = false;
                var evaluateFactors = false;
                var refreshAnalysisGameDetails = true;
                await GenerateDataForVisualization(selectedDate, evaluatePatterns, evaluateFactors, processIndexAndDays, refreshAnalysisGameDetails);
               
            
                }
            }
    }
    
    async function GenerateFinalViewObjects(datesAnalysis){
        numberPicks = {0:0, 1:0, 2:0, 3:0, 4:0, 5:0};
        winsCount = {0:0, 1:0, 2:0, 3:0, 4:0, 5:0};
        var singleExec = true;
        allConsolidatedGames = [];
        for (let te = 0; te < datesAnalysis.length; te++) {
            const mmonth = datesAnalysis[te];
        
    
                for (let index =mmonth.from; index <= mmonth.to; index++)
                {
                var selectedDate = mmonth.month+index;
                
                if(index == 1 || index == 31)
                {
                    selectedDate += "st";
                }
                else if(index == 3)
                {
                    selectedDate += "rd";
    
                }
                else{
                    selectedDate += "th";
                }
                if(index <10)
                {
                    
                        var descriptiveDate = "2024-"+mmonth.monthNumber+"-0"+index;
                    
                }
                else{
                            var descriptiveDate = "2024-"+mmonth.monthNumber+"-0"+index;
                        
                }
                
                var evaluatePatterns = true;
                var processIndexAndDays = true;
                var evaluateFactors = true;
                var refreshAnalysisGameDetails = false;
                await GenerateDataForVisualization(selectedDate, evaluatePatterns,  evaluateFactors ,processIndexAndDays, refreshAnalysisGameDetails);

                }
            }
    }

    async function GenerateAnalysisGameData(datesAnalysis, cleanAnalysisFile){
        numberPicks = {0:0, 1:0, 2:0, 3:0, 4:0, 5:0};
        winsCount = {0:0, 1:0, 2:0, 3:0, 4:0, 5:0};
        if(cleanAnalysisFile)
        {
            await save("analysisGameDetails", [] ,function(){}, "replace" ,"analysisGameDetails");
        }
        var singleExec = true;
        allConsolidatedGames = [];
        for (let te = 0; te < datesAnalysis.length; te++) {
            const mmonth = datesAnalysis[te];
        
    
                for (let index =mmonth.from; index <= mmonth.to; index++)
                {
                var selectedDate = mmonth.month+index;
                
                if(index == 1 || index == 31)
                {
                    selectedDate += "st";
                }
                else if(index == 3)
                {
                    selectedDate += "rd";
    
                }
                else{
                    selectedDate += "th";
                }
                if(index <10)
                {
                    
                        var descriptiveDate = "2024-"+mmonth.monthNumber+"-0"+index;
                    
                }
                else{
                            var descriptiveDate = "2024-"+mmonth.monthNumber+"-0"+index;
                        
                }
                
                var evaluatePatterns = true;
                var processIndexAndDays = false;
                var evaluateFactors = false;
                var refreshAnalysisGameDetails = cleanAnalysisFile;
                await GenerateDataForVisualization(selectedDate, evaluatePatterns, evaluateFactors , processIndexAndDays, refreshAnalysisGameDetails);
               
            
                }
            }
    }

    function roundToClosestQuarterOrInt(num) {
        // Define the possible fractional values
        const fractions = [0, 0.25, 0.5, 0.75, 1];
    
        // Find the nearest fractional part
        let integerPart = Math.floor(num);
        let decimalPart = num - integerPart;
    
        let closestFraction = fractions.reduce((prev, curr) => 
            Math.abs(curr - decimalPart) < Math.abs(prev - decimalPart) ? curr : prev
        );
    
        // Combine the integer part with the closest fractional part
        let result = integerPart + closestFraction;
    
        // Round to the nearest integer if close enough
        if (result - Math.floor(result) === 1) {
            result = Math.ceil(result);
        }
    
        return result;
    }

    async function CalculatePatternsForVisualisations()
    {
        var fs = require('fs');
        var files = fs.readdirSync('./JsonViewObjects');
        var fileNames = Object.values(files);
        var allFiles = [];
        var agnosticPatterns =[];
        var daysOfWeek = [];
        for (let dgss = 0; dgss < fileNames.length; dgss++) {
            const file = fileNames[dgss].replace(".json","");
            if(file != "allFiles"){
                var data = await load(file, "JsonViewObjects");
                for (let gdtg = 0; gdtg < data.length; gdtg++) {
                    const game = data[gdtg];
                    agnosticPatterns = await GetAgnosticPatterns(game, agnosticPatterns, daysOfWeek, "agnostic");
                    daysOfWeek = await GetAgnosticPatterns(game, agnosticPatterns, daysOfWeek,"days");
                    //teams = await GetAgnosticPatterns(game, agnosticPatterns, daysOfWeek,teams, "teams");
                }
                
            }
            
        }
        var sortedByMostWins = await sorting(agnosticPatterns, "winsCount", "desc");
        var sortedByMostLoses = await sorting(agnosticPatterns, "losesCount", "desc");
        await save("agnosticPatterns",agnosticPatterns, function(){}, "replace", "agnosticPatterns")
    }

    function GetDayOfWeek(date)
    {
        day = date.match(/-?\d+(\.\d+)?/g).map(Number)[0];
        var month = date.split(day)[0];
        var dates = new Date("2024-"+month+"-"+day);
        var dayOfWeek = dates.toString().split(" ")[0];

        return dayOfWeek;
    }

    async function GetAgnosticPatterns(game, agnosticPatterns, daysOfWeekData, returnAgnostic = "agnostic")
    {
        
        var home = game.common.game.split(" @ ")[1].replace(" ","").replace("Sox", "").replace("Jays","");
        var away = game.common.game.split(" @ ")[0].replace(" ","").replace("Sox", "").replace("Jays","");
        

        var dayOfWeek = GetDayOfWeek(game.common.date);
        // day = date.match(/-?\d+(\.\d+)?/g).map(Number)[0];
        // var month = date.split(day)[0];
        // var dates = new Date("2024-"+month+"-"+day);
        // var dayOfWeek = dates.toString().split(" ")[0];

        var day = {day: dayOfWeek, winsCount:0, losesCount:0, totalCount:0, winPercenatge:0 ,details:{wins:{teams:[], factorDiff:[] ,factorHandicap:[], handicapSum:0, factorDiffSum:0,count:0}, loses:{teams:[], factorDiff:[], factorHandicap:[], handicapSum:0, factorDiffSum:0, count:0}}};    
        
        var team1 = {team: "", winsCount:0, losesCount:0, totalCount:0, winPercenatge:0 ,details:{wins:{teams:[], factorDiff:[] ,factorHandicap:[], handicapSum:0, factorDiffSum:0,count:0}, loses:{teams:[], factorDiff:[], factorHandicap:[], handicapSum:0, factorDiffSum:0, count:0}}};    
        var team2 = {team: "", winsCount:0, losesCount:0, totalCount:0, winPercenatge:0 ,details:{wins:{teams:[], factorDiff:[] ,factorHandicap:[], handicapSum:0, factorDiffSum:0,count:0}, loses:{teams:[], factorDiff:[], factorHandicap:[], handicapSum:0, factorDiffSum:0, count:0}}};    
        
        var pattern = {formulaWinner:"",	seriesWinner:"",	nextWinners:"",	overallWinner:"", isF5HomeWinner:"", isHomeWinner:"", pattern:"", agnosticPattern:"",wins:{ handicap:[], factorDiff:[], count:0, handicapSum:0, factorDiffSum:0 ,avgHandicap:0, avgFactorDiff:0} , loses:{ handicap:[], factorDiff:[], count:0, handicapSum:0, factorDiffSum:0 ,avgHandicap:0, avgFactorDiff:0}, factorHandicap:{wins:[], loses:[]} ,winsCount:0, losesCount:0, totalCount:0 , expWinner:""}

        var awayRepeated = 0;
        var homeRepeated = 0;
        pattern.formulaWinner = game.common.formulaWinner.replace(" ","").indexOf(home) >= 0 ? 1 : 0;
        awayRepeated += pattern.formulaWinner == 0 ? 1 : 0;
        homeRepeated += pattern.formulaWinner == 1 ? 1 : 0;
        pattern.seriesWinner = game.common.seriesWinner.replace(" ","").indexOf(home) >= 0 ? 1 : 0;
        awayRepeated += pattern.seriesWinner == 0 ? 1 : 0;
        homeRepeated += pattern.seriesWinner == 1 ? 1 : 0;
        pattern.nextWinners = game.common.nextWinners.replace(" ","").indexOf(home) >= 0 ? 1 : 0;
        awayRepeated += pattern.nextWinners == 0 ? 1 : 0;
        homeRepeated += pattern.nextWinners == 1 ? 1 : 0;
        pattern.overallWinner = game.common.overallWinner.replace(" ","").indexOf(home) >= 0 ? 1 : 0;
        awayRepeated += pattern.overallWinner == 0 ? 1 : 0;
        homeRepeated += pattern.overallWinner == 1 ? 1 : 0;
        pattern.isF5HomeWinner = game.common.isF5HomeWinner.replace(" ","").indexOf(home) >= 0 ? 1 : game.common.isF5HomeWinner.replace(" ","").indexOf(away) >= 0 ? 0:3;
        awayRepeated += pattern.isF5HomeWinner == 0 ? 1 : 0;
        homeRepeated += pattern.isF5HomeWinner == 1 ? 1 : 0;
        pattern.isF5HomeWinner = game.common.isHomeWinner.replace(" ","").indexOf(home) >= 0 ? 1 : game.common.isHomeWinner.replace(" ","").indexOf(away) >= 0 ? 0:3;
        awayRepeated += pattern.isHomeWinner == 0 ? 1 : 0;
        homeRepeated += pattern.isHomeWinner == 1 ? 1 : 0;
        pattern.pattern = pattern.formulaWinner.toString()+pattern.seriesWinner.toString()+pattern.nextWinners.toString()+pattern.overallWinner.toString()+pattern.isF5HomeWinner.toString()+pattern.isHomeWinner.toString();
        pattern.agnosticPattern = pattern.pattern;
        var isPatternWin = false;
        while(pattern.agnosticPattern.indexOf("0")>=0 ||pattern.agnosticPattern.indexOf("1")>=0 ||pattern.agnosticPattern.indexOf("3")>=0)
        {
            if(homeRepeated > awayRepeated || homeRepeated == awayRepeated )
            {
                pattern.expWinner = "home";
                pattern.agnosticPattern = pattern.agnosticPattern.replace("1","X").replace("0","Y");
                if(game.compare.results.isHomeWinner && game.compare.results.isHomeWinner.replace(" ","").indexOf(home) >= 0)
                {
                    isPatternWin = true;
                }
            }
            else{
                pattern.agnosticPattern = pattern.agnosticPattern.replace("0","X").replace("1","Y");
                pattern.expWinner = "away";
                if(game.compare.results.isHomeWinner && game.compare.results.isHomeWinner.replace(" ","").indexOf(away) >= 0)
                {
                    isPatternWin = true;
                    
                }
            }
            pattern.agnosticPattern = pattern.agnosticPattern.replace("3","Z");
        }
        
        

        var isPatternInLibrary = agnosticPatterns.filter(function(item){
            return item.agnosticPattern == pattern.agnosticPattern;
        });

        if(game.common.handicap == null || isNaN(game.common.handicap))
        {
            var stopHere = "";
        }
        if(isPatternInLibrary.length == 0)
        {
            if(isPatternWin)
            {
                pattern.wins.handicap.push(Math.abs(game.common.handicap));
                pattern.wins.factorDiff.push(Math.round(game.common.factorDiff));
                pattern.wins.handicapSum += Math.abs(game.common.handicap);
                pattern.wins.factorDiffSum += Math.round(game.common.factorDiff);
                pattern.wins.count++;
                pattern.winsCount++;
                pattern.wins.avgHandicap = pattern.wins.handicapSum/pattern.wins.count;
                pattern.wins.avgFactorDiff = pattern.wins.factorDiffSum/pattern.wins.count;
                pattern.factorHandicap.wins.push({factorDiff: Math.round(game.common.factorDiff), handicap:Math.abs(game.common.handicap), team:eval(pattern.expWinner)});


            }
            else{
                pattern.loses.handicap.push(Math.abs(game.common.handicap));
                pattern.loses.factorDiff.push(Math.round(game.common.factorDiff));
                pattern.loses.handicapSum += Math.abs(game.common.handicap);
                pattern.loses.factorDiffSum += Math.round(game.common.factorDiff);
                pattern.loses.count++;
                pattern.losesCount++;
                pattern.loses.avgHandicap = pattern.loses.handicapSum/pattern.loses.count;
                pattern.loses.avgFactorDiff = pattern.loses.factorDiffSum/pattern.loses.count;
                pattern.factorHandicap.loses.push({factorDiff: Math.round(game.common.factorDiff), handicap:Math.abs(game.common.handicap), team:eval(pattern.expWinner)});
            }
            pattern.totalCount++;
            agnosticPatterns.push(pattern);
        }
        else{
            var agnosticIndex = agnosticPatterns.findIndex(x => x.agnosticPattern == pattern.agnosticPattern);
            if(isPatternWin)
            {
                agnosticPatterns[agnosticIndex].wins.handicap.push(Math.abs(game.common.handicap));
                agnosticPatterns[agnosticIndex].wins.factorDiff.push(Math.round(game.common.factorDiff));
                agnosticPatterns[agnosticIndex].wins.handicapSum += Math.abs(game.common.handicap);
                agnosticPatterns[agnosticIndex].wins.factorDiffSum += Math.round(game.common.factorDiff);
                agnosticPatterns[agnosticIndex].wins.count++;
                agnosticPatterns[agnosticIndex].winsCount++;
                agnosticPatterns[agnosticIndex].wins.avgHandicap = agnosticPatterns[agnosticIndex].wins.handicapSum/agnosticPatterns[agnosticIndex].wins.count;
                agnosticPatterns[agnosticIndex].wins.avgFactorDiff = agnosticPatterns[agnosticIndex].wins.factorDiffSum/agnosticPatterns[agnosticIndex].wins.count;
                agnosticPatterns[agnosticIndex].factorHandicap.wins.push({factorDiff: Math.round(game.common.factorDiff), handicap:Math.abs(game.common.handicap), team:eval(pattern.expWinner)});

                
            }
            else{
                agnosticPatterns[agnosticIndex].loses.handicap.push(Math.abs(game.common.handicap));
                agnosticPatterns[agnosticIndex].loses.factorDiff.push(Math.round(game.common.factorDiff));
                agnosticPatterns[agnosticIndex].loses.handicapSum += Math.abs(game.common.handicap);
                agnosticPatterns[agnosticIndex].loses.factorDiffSum += Math.round(game.common.factorDiff);
                agnosticPatterns[agnosticIndex].loses.count++;
                agnosticPatterns[agnosticIndex].losesCount++;
                agnosticPatterns[agnosticIndex].loses.avgHandicap = agnosticPatterns[agnosticIndex].loses.handicapSum/agnosticPatterns[agnosticIndex].loses.count;
                agnosticPatterns[agnosticIndex].loses.avgFactorDiff = agnosticPatterns[agnosticIndex].loses.factorDiffSum/agnosticPatterns[agnosticIndex].loses.count;
                agnosticPatterns[agnosticIndex].factorHandicap.loses.push({factorDiff: Math.round(game.common.factorDiff), handicap:Math.abs(game.common.handicap), team:eval(pattern.expWinner)});

            }
            agnosticPatterns[agnosticIndex].totalCount++;
            
        }

        var isDayOfWeek = daysOfWeekData.filter(function(item){
            return item.day == day.day;
        });


        if(isDayOfWeek.length == 0)
            {
                if(isPatternWin)
                {
                    day.details.wins.factorDiff.push(Math.round(game.common.factorDiff));
                    day.details.wins.handicapSum += Math.abs(game.common.handicap);
                    day.details.wins.factorDiffSum += Math.round(game.common.factorDiff);
                    day.details.wins.count++;
                    day.winsCount++;
                    day.details.wins.avgHandicap = day.details.wins.handicapSum/day.details.wins.count;
                    day.details.wins.avgFactorDiff = day.details.wins.factorDiffSum/day.details.wins.count;
                    if(isNaN(day.details.wins.avgHandicap))
                    {
                        var stopHere = "";
                    }
                    day.details.wins.factorHandicap.push({factorDiff: Math.round(game.common.factorDiff), handicap:Math.abs(game.common.handicap)});
    
    
                }
                else{
                    day.details.loses.factorDiff.push(Math.round(game.common.factorDiff));
                    day.details.loses.handicapSum += Math.abs(game.common.handicap);
                    day.details.loses.factorDiffSum += Math.round(game.common.factorDiff);
                    day.details.loses.count++;
                    day.losesCount++;
                    day.details.loses.avgHandicap = day.details.loses.handicapSum/day.details.loses.count;
                    day.details.loses.avgFactorDiff = day.details.loses.factorDiffSum/day.details.loses.count;
                    day.details.loses.factorHandicap.push({factorDiff: Math.round(game.common.factorDiff), handicap:Math.abs(game.common.handicap)});
                }
                day.totalCount++;
                day.winPercenatge = (day.winsCount*100)/(day.losesCount+day.winsCount);
                daysOfWeekData.push(day);
            }
            else{
                var dayIndex = daysOfWeekData.findIndex(x => x.day == day.day);
                if(isPatternWin)
                    {
                        daysOfWeekData[dayIndex].details.wins.factorDiff.push(Math.round(game.common.factorDiff));
                        daysOfWeekData[dayIndex].details.wins.handicapSum += Math.abs(game.common.handicap);
                        daysOfWeekData[dayIndex].details.wins.factorDiffSum += Math.round(game.common.factorDiff);
                        daysOfWeekData[dayIndex].details.wins.count++;
                        daysOfWeekData[dayIndex].winsCount++;
                        daysOfWeekData[dayIndex].details.wins.avgHandicap = daysOfWeekData[dayIndex].details.wins.handicapSum/daysOfWeekData[dayIndex].details.wins.count;
                        daysOfWeekData[dayIndex].details.wins.avgFactorDiff = daysOfWeekData[dayIndex].details.wins.factorDiffSum/daysOfWeekData[dayIndex].details.wins.count;
                        daysOfWeekData[dayIndex].details.wins.factorHandicap.push({factorDiff: Math.round(game.common.factorDiff), handicap:Math.abs(game.common.handicap)});
        
        
                    }
                    else{
                        daysOfWeekData[dayIndex].details.loses.factorDiff.push(Math.round(game.common.factorDiff));
                        daysOfWeekData[dayIndex].details.loses.handicapSum += Math.abs(game.common.handicap);
                        daysOfWeekData[dayIndex].details.loses.factorDiffSum += Math.round(game.common.factorDiff);
                        daysOfWeekData[dayIndex].details.loses.count++;
                        daysOfWeekData[dayIndex].losesCount++;
                        daysOfWeekData[dayIndex].details.loses.avgHandicap = daysOfWeekData[dayIndex].details.loses.handicapSum/daysOfWeekData[dayIndex].details.loses.count;
                        daysOfWeekData[dayIndex].details.loses.avgFactorDiff = daysOfWeekData[dayIndex].details.loses.factorDiffSum/daysOfWeekData[dayIndex].details.loses.count;
                        daysOfWeekData[dayIndex].details.loses.factorHandicap.push({factorDiff: Math.round(game.common.factorDiff), handicap:Math.abs(game.common.handicap)});
                    }
                    daysOfWeekData[dayIndex].totalCount++;
                    daysOfWeekData[dayIndex].winPercenatge = (daysOfWeekData[dayIndex].winsCount*100)/(daysOfWeekData[dayIndex].losesCount+daysOfWeekData[dayIndex].winsCount);
                
            }

            // var isTeam = teams.filter(function(item){
            //     return item.team == eval(pattern.expWinner);
            // });

            // if(isTeam.length == 0)
            //     {
            //         team1.team = eval(pattern.expWinner);
            //         if(isPatternWin)
            //         {
            //             team1.details.wins.factorDiff.push(Math.round(game.common.factorDiff));
            //             team1.details.wins.handicapSum += Math.abs(game.common.handicap);
            //             team1.details.wins.factorDiffSum += Math.round(game.common.factorDiff);
            //             team1.details.wins.count++;
            //             team1.winsCount++;
            //             team1.details.wins.avgHandicap = team1.details.wins.handicapSum/team1.details.wins.count;
            //             team1.details.wins.avgFactorDiff = team1.details.wins.factorDiffSum/team1.details.wins.count;
            //             team1.details.wins.factorHandicap.push({factorDiff: Math.round(game.common.factorDiff), handicap:Math.abs(game.common.handicap)});
                        
            //             var otherTeam = eval(pattern.expWinner == "home" ? "away" : "home");

            //             var isOtherTeam = teams.filter(function(item){
            //                 return item.team == otherTeam;
            //             });

            //             if(isOtherTeam.length == 0)
            //             {
            //                 team2.team = otherTeam;
            //                 team2.details.loses.factorDiff.push(Math.round(game.common.factorDiff));
            //                 team2.details.loses.handicapSum += Math.abs(game.common.handicap);
            //                 team2.details.loses.factorDiffSum += Math.round(game.common.factorDiff);
            //                 team2.details.loses.count++;
            //                 team2.losesCount++;
            //                 team2.details.loses.avgHandicap = team2.details.loses.handicapSum/team2.details.loses.count;
            //                 team2.details.loses.avgFactorDiff = team2.details.loses.factorDiffSum/team2.details.loses.count;
            //                 team2.details.loses.factorHandicap.push({factorDiff: Math.round(game.common.factorDiff), handicap:Math.abs(game.common.handicap)});
                            
            //             }
            //             else{
            //                 var teamIndex = teams.findIndex(x => x.team.indexOf(otherTeam)>=0);
            //                 teams[teamIndex].details.loses.factorDiff.push(Math.round(game.common.factorDiff));
            //                 teams[teamIndex].details.loses.handicapSum += Math.abs(game.common.handicap);
            //                 teams[teamIndex].details.loses.factorDiffSum += Math.round(game.common.factorDiff);
            //                 teams[teamIndex].details.loses.count++;
            //                 teams[teamIndex].losesCount++;
            //                 teams[teamIndex].details.loses.avgHandicap = teams[teamIndex].details.loses.handicapSum/teams[teamIndex].details.loses.count;
            //                 teams[teamIndex].details.loses.avgFactorDiff = teams[teamIndex].details.loses.factorDiffSum/teams[teamIndex].details.loses.count;
            //                 teams[teamIndex].details.loses.factorHandicap.push({factorDiff: Math.round(game.common.factorDiff), handicap:Math.abs(game.common.handicap)});

            //             }
        
            //         }
            //         else{
            //             team1.team = eval(pattern.expWinner);
            //             team1.details.loses.factorDiff.push(Math.round(game.common.factorDiff));
            //             team1.details.loses.handicapSum += Math.abs(game.common.handicap);
            //             team1.details.loses.factorDiffSum += Math.round(game.common.factorDiff);
            //             team1.details.loses.count++;
            //             team1.losesCount++;
            //             team1.details.loses.avgHandicap = team1.details.loses.handicapSum/team1.details.loses.count;
            //             team1.details.loses.avgFactorDiff = team1.details.loses.factorDiffSum/team1.details.loses.count;
            //             team1.details.loses.factorHandicap.push({factorDiff: Math.round(game.common.factorDiff), handicap:Math.abs(game.common.handicap)});

            //             var otherTeam = eval(pattern.expWinner == "home" ? "away" : "home");

            //             var isOtherTeam = teams.filter(function(item){
            //                 return item.team == otherTeam;
            //             });

            //             if(isOtherTeam.length == 0)
            //             {
            //                 team2.team = otherTeam;
            //                 team2.details.wins.factorDiff.push(Math.round(game.common.factorDiff));
            //                 team2.details.wins.handicapSum += Math.abs(game.common.handicap);
            //                 team2.details.wins.factorDiffSum += Math.round(game.common.factorDiff);
            //                 team2.details.wins.count++;
            //                 team2.winsCount++;
            //                 team2.details.wins.avgHandicap = team2.details.wins.handicapSum/team2.details.wins.count;
            //                 team2.details.wins.avgFactorDiff = team2.details.wins.factorDiffSum/team2.details.wins.count;
            //                 team2.details.wins.factorHandicap.push({factorDiff: Math.round(game.common.factorDiff), handicap:Math.abs(game.common.handicap)});
                            
            //             }
            //             else{
            //                 var teamIndex = teams.findIndex(x => x.team.indexOf(otherTeam)>=0);
            //                 teams[teamIndex].details.wins.factorDiff.push(Math.round(game.common.factorDiff));
            //                 teams[teamIndex].details.wins.handicapSum += Math.abs(game.common.handicap);
            //                 teams[teamIndex].details.wins.factorDiffSum += Math.round(game.common.factorDiff);
            //                 teams[teamIndex].details.wins.count++;
            //                 teams[teamIndex].winsCount++;
            //                 teams[teamIndex].details.wins.avgHandicap = teams[teamIndex].details.wins.handicapSum/teams[teamIndex].details.wins.count;
            //                 teams[teamIndex].details.wins.avgFactorDiff = teams[teamIndex].details.wins.factorDiffSum/teams[teamIndex].details.wins.count;
            //                 teams[teamIndex].details.wins.factorHandicap.push({factorDiff: Math.round(game.common.factorDiff), handicap:Math.abs(game.common.handicap)});

            //             }
            //         }
            //         team1.totalCount++;
            //         team1.winPercenatge = (team1.winsCount*100)/(team1.losesCount+team1.winsCount);
            //         teams.push(team1);
            //         team2.totalCount++;
            //         team2.winPercenatge = (team2.winsCount*100)/(team2.losesCount+team2.winsCount);
            //         teams.push(team2);
            //     }
            //     else{
            //         var teamIndex = teams.findIndex(x => x.team.indexOf(eval(pattern.expWinner))>=0);
            //         if(isPatternWin)
            //             {
            //                 teams[teamIndex].details.wins.factorDiff.push(Math.round(game.common.factorDiff));
            //                 teams[teamIndex].details.wins.handicapSum += Math.abs(game.common.handicap);
            //                 teams[teamIndex].details.wins.factorDiffSum += Math.round(game.common.factorDiff);
            //                 teams[teamIndex].details.wins.count++;
            //                 teams[teamIndex].winsCount++;
            //                 teams[teamIndex].details.wins.avgHandicap = teams[teamIndex].details.wins.handicapSum/teams[teamIndex].details.wins.count;
            //                 teams[teamIndex].details.wins.avgFactorDiff = teams[teamIndex].details.wins.factorDiffSum/teams[teamIndex].details.wins.count;
            //                 teams[teamIndex].details.wins.factorHandicap.push({factorDiff: Math.round(game.common.factorDiff), handicap:Math.abs(game.common.handicap)});
                            
            //                 var otherTeam = eval(pattern.expWinner == "home" ? "away" : "home");

            //             var isOtherTeam = teams.filter(function(item){
            //                 return item.team == otherTeam;
            //             });

            //             if(isOtherTeam.length == 0)
            //             {
            //                 team2.team = otherTeam;
            //                 team2.details.loses.factorDiff.push(Math.round(game.common.factorDiff));
            //                 team2.details.loses.handicapSum += Math.abs(game.common.handicap);
            //                 team2.details.loses.factorDiffSum += Math.round(game.common.factorDiff);
            //                 team2.details.loses.count++;
            //                 team2.losesCount++;
            //                 team2.details.loses.avgHandicap = team2.details.loses.handicapSum/team2.details.loses.count;
            //                 team2.details.loses.avgFactorDiff = team2.details.loses.factorDiffSum/team2.details.loses.count;
            //                 team2.details.loses.factorHandicap.push({factorDiff: Math.round(game.common.factorDiff), handicap:Math.abs(game.common.handicap)});
                            
            //             }
            //             else{
            //                 var teamIndex = teams.findIndex(x => x.team.indexOf(otherTeam)>=0);
            //                 teams[teamIndex].details.loses.factorDiff.push(Math.round(game.common.factorDiff));
            //                 teams[teamIndex].details.loses.handicapSum += Math.abs(game.common.handicap);
            //                 teams[teamIndex].details.loses.factorDiffSum += Math.round(game.common.factorDiff);
            //                 teams[teamIndex].details.loses.count++;
            //                 teams[teamIndex].losesCount++;
            //                 teams[teamIndex].details.loses.avgHandicap = teams[teamIndex].details.loses.handicapSum/teams[teamIndex].details.loses.count;
            //                 teams[teamIndex].details.loses.avgFactorDiff = teams[teamIndex].details.loses.factorDiffSum/teams[teamIndex].details.loses.count;
            //                 teams[teamIndex].details.loses.factorHandicap.push({factorDiff: Math.round(game.common.factorDiff), handicap:Math.abs(game.common.handicap)});
            //                 teams[teamIndex].totalCount++;
            //                 teams[teamIndex].winPercenatge = (teams[teamIndex].winsCount*100)/(teams[teamIndex].losesCount+teams[teamIndex].winsCount);
            //             }
            
            //             }
            //             else{
            //                 teams[teamIndex].details.loses.factorDiff.push(Math.round(game.common.factorDiff));
            //                 teams[teamIndex].details.loses.handicapSum += Math.abs(game.common.handicap);
            //                 teams[teamIndex].details.loses.factorDiffSum += Math.round(game.common.factorDiff);
            //                 teams[teamIndex].details.loses.count++;
            //                 teams[teamIndex].losesCount++;
            //                 teams[teamIndex].details.loses.avgHandicap = teams[teamIndex].details.loses.handicapSum/teams[teamIndex].details.loses.count;
            //                 teams[teamIndex].details.loses.avgFactorDiff = teams[teamIndex].details.loses.factorDiffSum/teams[teamIndex].details.loses.count;
            //                 teams[teamIndex].details.loses.factorHandicap.push({factorDiff: Math.round(game.common.factorDiff), handicap:Math.abs(game.common.handicap)});
            //                 teams[teamIndex].totalCount++;
            //                 teams[teamIndex].winPercenatge = (teams[teamIndex].winsCount*100)/(teams[teamIndex].losesCount+teams[teamIndex].winsCount);
            //                 var otherTeam = eval(pattern.expWinner == "home" ? "away" : "home");

            //             var isOtherTeam = teams.filter(function(item){
            //                 return item.team == otherTeam;
            //             });

            //             if(isOtherTeam.length == 0)
            //             {
            //                 team2.team = otherTeam;
            //                 team2.details.wins.factorDiff.push(Math.round(game.common.factorDiff));
            //                 team2.details.wins.handicapSum += Math.abs(game.common.handicap);
            //                 team2.details.wins.factorDiffSum += Math.round(game.common.factorDiff);
            //                 team2.details.wins.count++;
            //                 team2.winsCount++;
            //                 team2.details.wins.avgHandicap = team2.details.wins.handicapSum/team2.details.wins.count;
            //                 team2.details.wins.avgFactorDiff = team2.details.wins.factorDiffSum/team2.details.wins.count;
            //                 team2.details.wins.factorHandicap.push({factorDiff: Math.round(game.common.factorDiff), handicap:Math.abs(game.common.handicap)});
                            
            //             }
            //             else{
            //                 var teamIndex = teams.findIndex(x => x.team.indexOf(otherTeam)>=0);
            //                 teams[teamIndex].details.wins.factorDiff.push(Math.round(game.common.factorDiff));
            //                 teams[teamIndex].details.wins.handicapSum += Math.abs(game.common.handicap);
            //                 teams[teamIndex].details.wins.factorDiffSum += Math.round(game.common.factorDiff);
            //                 teams[teamIndex].details.wins.count++;
            //                 teams[teamIndex].winsCount++;
            //                 teams[teamIndex].details.wins.avgHandicap = teams[teamIndex].details.wins.handicapSum/teams[teamIndex].details.wins.count;
            //                 teams[teamIndex].details.wins.avgFactorDiff = teams[teamIndex].details.wins.factorDiffSum/teams[teamIndex].details.wins.count;
            //                 teams[teamIndex].details.wins.factorHandicap.push({factorDiff: Math.round(game.common.factorDiff), handicap:Math.abs(game.common.handicap)});
            //                 teams[teamIndex].totalCount++;
            //                 teams[teamIndex].winPercenatge = (teams[teamIndex].winsCount*100)/(teams[teamIndex].losesCount+teams[teamIndex].winsCount);
            //             }
            //             }
                        
                    
            //     }


        if(returnAgnostic == "agnostic")
        {
            return agnosticPatterns;
        }
        else if(returnAgnostic == "days"){
            return daysOfWeekData;
        }
        else{
            return agnosticPatterns;
        }
        
    }

    async function GenerateDataForVisualization(date, evaluatePatterns, evaluateFactors,  processIndexAndDays, refreshAnalysisGameDetails)
    {
        var gameDataAnalysis = await load(date+"NewGamesConsolidated", "NewGames");
        if(date == "September26th")
        {
            var stopHere ="";
        }
        var MLResults = await load(date+"MLResults");
        var patternSelections = await load(date+'finalSelectionsCSV');
        try{
            var relevingRunsAllowed = await load(date+'OverallPitcherTeamsByRunsAllowed');
        }
        catch{
            var relevingRunsAllowed = 0;
        }

        try{
            var analysisGameDetails = await load('analysisGameDetails', "analysisGameDetails");
        }
        catch{
            var analysisGameDetails = [];
        }

        if(processIndexAndDays)
        {
            try{
                var IndexAndDayStats = await load(date+'IndexAndDayStats', "IndexAndDayStats");
            }
            catch{
                var IndexAndDayStats = [];
            }
        }
        var teamsSchedule = await load(date+"TeamSchedules");
        teamsSchedule = teamsSchedule.filter(function(item){
            return item.period == 0; 
        });
        var formattedGames = [];

        var todayParts = new Date().toString().split(" ");
        var month = todayParts[1];
        var today = parseInt(todayParts[2]);
        var isTodaysFile = gameDataAnalysis[0].date.toLowerCase().indexOf(today.toString().toLowerCase()) >=0 && gameDataAnalysis[0].date.toLowerCase().indexOf(month.toLowerCase()) >=0;
        
        
        var analysisGames = [];
        var gamesDay = gameDataAnalysis.length;
        var gamesWon = 0;
        var gamesLost = 0;
        var gamesWonHome = 0;
        var gamesWonAway = 0;

        for (let index = 0; index < gameDataAnalysis.length; index++) {
            const game = gameDataAnalysis[index];
            var keys = Object.keys(game);
            var gameFormatted = {common : {},compare : { awayRow:{}, homeRow:{}, selected:{}, results:{} }, calcDetails:{} };

            for (let sds = 0; sds < keys.length; sds++) {
                const key = keys[sds];
                if(key.toLowerCase().indexOf("away")>=0)
                {
                    if(key.toLowerCase() === "away")
                    {
                        gameFormatted.compare.awayRow[key.replace("away","team")] = game[key];
                        var isSelectedPattern = patternSelections.filter(function(item){
                            return item.selectedTeam == game[key];
                        });
                        if(isSelectedPattern.length > 0)
                        {
                            gameFormatted.compare.selected["team"] = game[key];
                        }
                        if(relevingRunsAllowed != 0)
                        {

                        
                        var teamPitchersStats = relevingRunsAllowed.filter(function(item){
                            return item.teamName.indexOf(game[key]) >=0 || item.teamName.replace(" ","").indexOf(game[key]) >=0;
                        })[0].pitchersData;

                        var relevingPitchers = teamPitchersStats.filter(function(item){
                            return item.name.indexOf(" SP") < 0;
                        });

                        var stats = relevingPitchers.map(function(item){
                            return item.playerStats;
                        });

                        var totalGames = teamsSchedule.filter(function(item){
                            return item.teamName.indexOf(game[key])>=0 || item.teamName.replace(" ","").indexOf(game[key])>=0;
                        })[0].scheduleData.length;

                        
                        var statER = 0;
                        for (let resr = 0; resr < stats.length; resr++) {
                            const stat = stats[resr];
                            for (let gsts = 0; gsts < stat.length; gsts++) {
                                const statss = stat[gsts];
                                if(statss.stat == 'ER')
                                {
                                    statER += parseFloat(statss.value);
                                }
                                
                                
                            }
                            
                            
                        }

                        gameFormatted.compare.awayRow["RelevingRuns"] = statER/totalGames;
                    }
                    else{
                        gameFormatted.compare.awayRow["RelevingRuns"] = 0;
                    }
                        
                    }
                    else{
                        gameFormatted.compare.awayRow[key.replace("away","").replace("Away","")] = game[key];
                    }
                }
                else if(key.toLowerCase().indexOf("home")>=0 &&  key != "isHomeWinner" && key != "isF5HomeWinner")
                {
                    if(key.toLowerCase() === "home")
                    {
                        gameFormatted.compare.homeRow[key.replace("home","team")] = game[key];
                        var isSelectedPattern = patternSelections.filter(function(item){
                            return item.selectedTeam == game[key];
                        });
                        if(isSelectedPattern.length > 0)
                        {
                            gameFormatted.compare.selected["team"] = game[key];
                        }
                        if(relevingRunsAllowed != 0)
                        {
                        var teamPitchersStats = relevingRunsAllowed.filter(function(item){
                            return item.teamName.indexOf(game[key]) >=0 || item.teamName.replace(" ","").indexOf(game[key]) >=0 ;
                        })[0].pitchersData;

                        var relevingPitchers = teamPitchersStats.filter(function(item){
                            return item.name.indexOf(" SP") < 0;
                        });

                        var stats = relevingPitchers.map(function(item){
                            return item.playerStats;
                        });

                        var totalGames = teamsSchedule.filter(function(item){
                            return item.teamName.indexOf(game[key])>=0 || item.teamName.replace(" ","").indexOf(game[key])>=0 ;
                        })[0].scheduleData.length;

                        var statER = 0;
                        for (let resr = 0; resr < stats.length; resr++) {
                            const stat = stats[resr];
                            for (let gsts = 0; gsts < stat.length; gsts++) {
                                const statss = stat[gsts];

                                if(statss.stat == 'ER')
                                {
                                    statER += parseFloat(statss.value);
                                }
                                
                                
                            }
                            
                            
                        }

                        gameFormatted.compare.homeRow["RelevingRuns"] = statER/totalGames;
                    }
                    else{
                        gameFormatted.compare.homeRow["RelevingRuns"] = 0;
                    }
                    }
                    else{
                        gameFormatted.compare.homeRow[key.replace("home","").replace("Home","")] = game[key];
                    }
                }
                else{

                    if(key == "isHomeWinner" || key == "isF5HomeWinner" || key == "isOver")
                    {
                        gameFormatted.common[key] = "No consistent";
                        gameFormatted.common[key+"Prob"] = 0;
                    }
                    else{
                        gameFormatted.common[key] = game[key];
                    }

                }
            }

            var MLSelections = MLResults.selections.filter(function(item){
                return item.game == game.game;
            });

            if(MLSelections.length > 0)
            {
                for (let sada = 0; sada < MLSelections.length; sada++) {
                    const selection = MLSelections[sada];
                    if(selection.target == "isHomeWinner")
                    {
                        gameFormatted.common["isHomeWinner"] = selection.prediction == 1 ? gameFormatted.compare.homeRow.team : gameFormatted.compare.awayRow.team;
                        gameFormatted.common.isHomeWinnerProb =  selection.average_probability;
                    }
                    else if(selection.target == "isF5HomeWinner")
                    {
                        gameFormatted.common["isF5HomeWinner"] = selection.prediction == 1 ? gameFormatted.compare.homeRow.team : gameFormatted.compare.awayRow.team;
                        gameFormatted.common.isF5HomeWinnerProb =  selection.average_probability;
                    }
                    else if(selection.target == "isOver")
                    {
                        gameFormatted.common["isOver"] = selection.prediction == 1 ? "Over" : "Under";
                        gameFormatted.common.isOverProb =  selection.average_probability;
                    }
                    
                }
            }
            var gamePostponed = false;
            if(!isTodaysFile)
            {   
                //if(date == "May13th" && game.game.indexOf("Dodgers")>=0){
            //     var stopHere = "";
            //     }
                var winnerData = await GetResultDetails(date, {away: game.away, home: game.home}, game.home);
                if(typeof winnerData.finalWinner != "undefined"){
                    gameFormatted.compare.results["isHomeWinner"] = winnerData.finalWinner.indexOf(game.home) >=0 ? game.home : game.away;
                    gameFormatted.compare.results["isF5HomeWinner"] = winnerData.f5Winner.indexOf(game.home) >=0 ? game.home : game.away;
                    gameFormatted.compare.results["isOver"] = (winnerData.awayTotalRuns + winnerData.homeTotalRuns) > 8 ? "Over" : (winnerData.awayTotalRuns + winnerData.homeTotalRuns) < 8 ? "Under" : "Push";
                    gameFormatted.common["handicap"] = winnerData.homeTotalRuns - winnerData.awayTotalRuns;                    
                }
            }
            else{
                var stopHere = "";
            }

            var awayEras = [gameFormatted.compare.awayRow["CarrerEra"],
            gameFormatted.compare.awayRow["CurrentEra"], 
            gameFormatted.compare.awayRow["SpecificEra"],
            gameFormatted.compare.awayRow["FinalEra"]];

            let awayGreatestValue = Math.max(...awayEras);

            var awaySum = 0;
            awaySum += parseFloat(gameFormatted.compare.awayRow["RelevingRuns"]);
            awaySum += parseFloat(gameFormatted.compare.awayRow["formulaWinPercentage"])/100;
            awaySum += parseFloat(gameFormatted.compare.awayRow["SeriesPercentage"])/100;
            awaySum += parseFloat(gameFormatted.compare.awayRow["NextWinningPercentage"])/100;
            awaySum += parseFloat(gameFormatted.compare.awayRow["TotalPercentage"])/100;
            awaySum -= parseFloat(gameFormatted.compare.awayRow["CarrerEra"]);
            awaySum -= parseFloat(gameFormatted.compare.awayRow["CurrentEra"]);
            awaySum -= parseFloat(gameFormatted.compare.awayRow["SpecificEra"]);
            awaySum -= parseFloat(gameFormatted.compare.awayRow["FinalEra"]);
            awaySum += parseFloat(gameFormatted.compare.awayRow["PitcherWins"]);
            awaySum -= parseFloat(gameFormatted.compare.awayRow["PitcherLoses"]);
            awaySum += parseFloat(gameFormatted.compare.awayRow["AVG"]);
            awaySum += parseFloat(gameFormatted.compare.awayRow["OPS"]);
            awaySum += parseFloat(gameFormatted.compare.awayRow["OBP"]);
            awaySum += parseFloat(gameFormatted.compare.awayRow["SLG"]);
            awaySum += parseFloat(gameFormatted.compare.awayRow["CoversPer"])/100;
            awaySum = awaySum + awayGreatestValue;

            gameFormatted.compare.awayRow["totalFactor"] = awaySum;
                

            var homeEras = [
            gameFormatted.compare.homeRow["CarrerEra"],
            gameFormatted.compare.homeRow["CurrentEra"], 
            gameFormatted.compare.homeRow["SpecificEra"],
            gameFormatted.compare.homeRow["FinalEra"]];


            let homeGreatestValue = Math.max(...homeEras);

            var homeSum = 0;
            homeSum += parseFloat(gameFormatted.compare.homeRow["RelevingRuns"]);
            homeSum += parseFloat(gameFormatted.compare.homeRow["formulaWinPercentage"])/100;
            homeSum += parseFloat(gameFormatted.compare.homeRow["SeriesPercentage"])/100;
            homeSum += parseFloat(gameFormatted.compare.homeRow["NextWinningPercentage"])/100;
            homeSum += parseFloat(gameFormatted.compare.homeRow["TotalPercentage"])/100;
            homeSum -= parseFloat(gameFormatted.compare.homeRow["CarrerEra"]);
            homeSum -= parseFloat(gameFormatted.compare.homeRow["CurrentEra"]);
            homeSum -= parseFloat(gameFormatted.compare.homeRow["SpecificEra"]);
            homeSum -= parseFloat(gameFormatted.compare.homeRow["FinalEra"]);
            homeSum += parseFloat(gameFormatted.compare.homeRow["PitcherWins"]);
            homeSum -= parseFloat(gameFormatted.compare.homeRow["PitcherLoses"]);
            homeSum += parseFloat(gameFormatted.compare.homeRow["AVG"]);
            homeSum += parseFloat(gameFormatted.compare.homeRow["OPS"]);
            homeSum += parseFloat(gameFormatted.compare.homeRow["OBP"]);
            homeSum += parseFloat(gameFormatted.compare.homeRow["SLG"]);
            homeSum += parseFloat(gameFormatted.compare.homeRow["CoversPer"])/100;
            homeSum = homeSum + homeGreatestValue;

            gameFormatted.compare.homeRow["totalFactor"] = homeSum;
            
            var factorDiff = 0;
            if(homeSum < 0 && awaySum < 0)
            {
                factorDiff = Math.abs(homeSum) > Math.abs(awaySum) ? Math.abs(homeSum) - Math.abs(awaySum) : Math.abs(awaySum) - Math.abs(homeSum);
            }
            else if(awaySum < 0 && homeSum > 0)
            {
                factorDiff = homeSum - awaySum;
            }
            else if(awaySum > 0 && homeSum < 0)
            {
                factorDiff = awaySum - homeSum;
            }
            else{
                 factorDiff = homeSum > awaySum ? homeSum - awaySum : awaySum - homeSum;
            }

            gameFormatted.common["factorDiff"] = Math.abs(factorDiff);
            gameFormatted["factorDiff"] = Math.abs(factorDiff);
            
            var zeroHomeEras = homeEras.filter(function(item){
                return item == 0;
            });

            var zeroAwayEras = awayEras.filter(function(item){
                return item == 0;
            });
            var gameFactorCompleteness = 1;
            if(zeroHomeEras.length >= 1 || zeroAwayEras.length >= 1 )
            {
                gameFactorCompleteness = 0.25;
            }
            gameFormatted["gameFactorCompleteness"] = gameFactorCompleteness;
            //Comment This block to build patterns, excute this commented out and reintroduce it.
            
            if(evaluatePatterns)
            {
                gameFormatted = await AddAgnosticPatterns(gameFormatted, game, gameFactorCompleteness);

                if(evaluateFactors)
                {
                    gameFormatted  = await ProcessFactors(gameFormatted, gameFactorCompleteness);
                }
            }
            else{
                
                    gameFormatted.common["factor"] = gameFormatted.recommendedBet;

            }
            
            

            var stopHere = "";
            
            var winData = await GetResultDetails(date, {away: game.away, home: game.home}, game.home); 
            var isGamePlayed = typeof winData.finalWinner != "undefined" ? true : false;
            var analysisGameDetail = {};
            if(!isTodaysFile && isGamePlayed && evaluatePatterns)
            {
                console.log(date+" "+game.game)
                analysisGameDetail["winnerData"] = winData;
                var expWinnerFinal = gameFormatted["patternChances"] >= gameFormatted["otherTeamChances"] ? game[gameFormatted["expWinner"]] : game[gameFormatted["otherTeam"]];
                var analysisGameDetail = {};
                analysisGameDetail["game"] = game.game; 
                analysisGameDetail["date"] = game.date; 
                analysisGameDetail["betWon"] = winnerData.finalWinner.indexOf(expWinnerFinal)>=0 ? 1 :0;
                analysisGameDetail["wasHandicapped"] = Math.abs(winnerData.handicap) >= 2 ? 1:0;
                analysisGameDetail["handicap"] = Math.abs(winnerData.handicap);
                analysisGameDetail["betTeam"] = expWinnerFinal;
                analysisGameDetail["betTeamChances"] = expWinnerFinal == game[gameFormatted["expWinner"]] ? gameFormatted["patternChances"] : gameFormatted["otherTeamChances"];
                analysisGameDetail["betHomeAwayWinner"] = game.home.indexOf(expWinnerFinal)>= 0 ? "home" : "away";
                analysisGameDetail["team2"] = gameFormatted["patternChances"] < gameFormatted["otherTeamChances"] ? game[gameFormatted["expWinner"]] : game[gameFormatted["otherTeam"]];
                analysisGameDetail["team2Chances"] = expWinnerFinal != game[gameFormatted["otherTeam"]] ? gameFormatted["otherTeamChances"] : gameFormatted["patternChances"];
                analysisGameDetail["sampleSize"] = (gameFormatted["winsCount"]+gameFormatted["losesCount"]);
                analysisGameDetail["factorDiff"] = gameFormatted.common.factorDiff;
                analysisGameDetail["recommendedBet"] = gameFormatted.recommendedBet;
                analysisGameDetail["gamePatternSelected"] = gameFormatted["agnosticPattern"];
                gamesWon += analysisGameDetail["betWon"] == 1 ? 1 :0;
                gamesLost += analysisGameDetail["betWon"] == 0 ? 1 :0;
                gamesWonHome += analysisGameDetail["betHomeAwayWinner"] == "home" ? 1 :0;
                gamesWonAway += analysisGameDetail["betHomeAwayWinner"] == "away" ? 1 :0;
                
                analysisGames.push(analysisGameDetail)
            }

            
            
            formattedGames.push(gameFormatted);
            
            
            
            
        }   
        var formattedGamesSorted = await sorting(formattedGames, "recommendedBet", "desc");
        var analysisGamesSorted = await sorting(analysisGames, "recommendedBet", "desc");

        


        if(typeof analysisGameDetails[gameDataAnalysis[0].date] == "undefined")
        {
            analysisGameDetails.push({ date:gameDataAnalysis[0].date, games:analysisGamesSorted,gamesPlayed:gamesDay, gamesWon: gamesWon, gamesLost:gamesLost, perWin:(gamesWon*100)/(gamesWon+gamesLost), gamesWonHome:gamesWonHome, gamesWonAway:gamesWonAway });
        
        }

        for (let asdnjsnd = 0; asdnjsnd < formattedGamesSorted.length; asdnjsnd++) {
            var gameSort = formattedGamesSorted[asdnjsnd];
            if(processIndexAndDays)
            {
                gameSort = await AddIndexAndDays(gameSort, IndexAndDayStats, asdnjsnd, gameDataAnalysis, gameFactorCompleteness)
            }
        }

        if(processIndexAndDays && evaluatePatterns){
            formattedGames.forEach((gam) => {
                gam.common.FinalFactor = gam.decisionTakerFactor +gam.common.factorDiff;
                gam.FinalFactor = gam.decisionTakerFactor +gam.common.factorDiff;
                gam["stringDate"] = convertSortingDate(gam.common.date);
              });
            var decisionTaking = await sorting(formattedGames, "decisionTakerFactor", "desc");
            
            await save(date+"DecisionViewObject",decisionTaking, function(){}, "replace", "DecisionViewObject" );
        }

        await save(date+"JsonViewObject",formattedGamesSorted, function(){}, "replace", "JsonViewObjects" );
        if(refreshAnalysisGameDetails){
            await save("analysisGameDetails",analysisGameDetails, function(){}, "replace", "analysisGameDetails" );
        }

        var resultsPercentages = await load("resultsPercentages", "resultPercentages");
        var fs = require('fs');
        var files = fs.readdirSync('./JsonViewObjects');
        var fileNames = Object.values(files);
        var allFiles = [];
        var matchCount = 0;
        var allAnalysisData = [];
        for (let dgss = 0; dgss < fileNames.length; dgss++) {
            const file = fileNames[dgss].replace(".json","");
            
           if(file != "allFiles"){
                var data = await load(file, "JsonViewObjects");
                allFiles = allFiles.concat(data);
            
            }
        }

        await save("allAnalysisData",allAnalysisData, function(){}, "replace", "allAnalysisData" );

        var fs = require('fs');
        var decisions = fs.readdirSync('./DecisionViewObject');
        var decisionNames = Object.values(decisions);
        var allDecisions = [];
        for (let dgss = 0; dgss < decisionNames.length; dgss++) {
            const file = decisionNames[dgss].replace(".json","");
            if(file.indexOf("July2th")>=0)
            {
                var stopHere = "";
            }
            if(file != "allDecisions"){
                var data = await load(file, "DecisionViewObject");
                allDecisions = allDecisions.concat(data);
            }
        }

        await save("allFiles",allFiles, function(){}, "replace", "JsonViewObjects" );
        await save("allDecisions",allDecisions, function(){}, "replace", "DecisionViewObject" );
        var stopHere = "";
    }

    async function processVariables()
    {
        var resultsPercentages = await load("resultsPercentages", "resultPercentages");
        var fs = require('fs');
        var files = fs.readdirSync('./JsonViewObjects');
        var fileNames = Object.values(files);
        var allFiles = [];
        var matchCount = 0;
        var allAnalysisData = [];
        for (let dgss = 0; dgss < fileNames.length; dgss++) {
            const file = fileNames[dgss].replace(".json","");
            
           if(file != "allFiles"){
                var data = await load(file, "JsonViewObjects");
                allFiles = allFiles.concat(data);
            if(true){
                for (let shjdgsaj = 0; shjdgsaj < data.length; shjdgsaj++) {
                    var objectAnalysis = {variables:{}, results:{}};
                    const game = data[shjdgsaj];
                        if(game.common.date == "July21th")
                        {
                            var stopHere = "";
                        }
                        console.log(game.common.date);
                        var xElement = game.compare.homeRow.team;
                        var yElement = game.compare.awayRow.team;
                        
                        objectAnalysis.variables.formulaWinner = game.common.formulaWinner == xElement ? "X":"Y";
                        objectAnalysis.variables.seriesWinner = game.common.seriesWinner == xElement ? "X":"Y";
                        objectAnalysis.variables.nextWinners = game.common.nextWinners == xElement ? "X":"Y";
                        objectAnalysis.variables.factorDiff = roundToClosestQuarterOrInt(game.common.factorDiff);
                        objectAnalysis.variables.isF5HomeWinner = game.common.isF5HomeWinner == xElement ? "X":game.common.isF5HomeWinner == yElement ? "Y":"Z";
                        objectAnalysis.variables.isF5HomeWinnerProb = roundToClosestQuarterOrInt(game.common.isF5HomeWinnerProb);
                        objectAnalysis.variables.isHomeWinner = game.common.isHomeWinner == xElement ? "X":game.common.isF5HomeWinner == yElement ? "Y":"Z";
                        objectAnalysis.variables.isHomeWinnerProb = roundToClosestQuarterOrInt(game.common.isHomeWinnerProb);
                        //objectAnalysis.variables.isOver = game.common.isOver;
                        //objectAnalysis.variables.isOverProb = roundToClosestQuarterOrInt(game.common.isOverProb);
                        var patternChancesElements = game.common.patternChances.split("  ");
                        var team1Chances = parseInt(patternChancesElements[0].split("%")[0]);
                        var  team1 = patternChancesElements[0].split("%(")[1].replace(")","");
                        var team2Chances = parseInt(patternChancesElements[1].split("%")[0]);
                        var  team2 = patternChancesElements[1].split("%(")[1].replace(")","");
                        objectAnalysis.variables.patternWinner = team1Chances >= team2Chances ?team1 :team2;
                        objectAnalysis.variables.patternWinner = objectAnalysis.variables.patternWinner == xElement ? "X":"Y";
                        objectAnalysis.variables.patternWinnerProb =roundToClosestQuarterOrInt((team1Chances >= team2Chances ?team1Chances :team2Chances)/100);
                        objectAnalysis.variables.agnosticPattern = game.common.formulaWinner == xElement ? "X":"Y";
                        objectAnalysis.variables.agnosticPattern += game.common.seriesWinner == xElement ? "X":"Y";
                        objectAnalysis.variables.agnosticPattern += game.common.nextWinners == xElement ? "X":"Y";
                        objectAnalysis.variables.agnosticPattern += game.common.isF5HomeWinner == xElement ? "X":game.common.isF5HomeWinner == yElement ? "Y":"Z";
                        objectAnalysis.variables.agnosticPattern += game.common.isHomeWinner == xElement ? "X":game.common.isF5HomeWinner == yElement ? "Y":"Z";
                        objectAnalysis.variables.agnosticPattern += objectAnalysis.variables.patternWinner;

                        
                        
                        
                        //objectAnalysis.results.isOver = game.compare.results.isOver;

                        if(!isNaN(game.compare.results.isHomeWinner && typeof game.compare.results.isHomeWinner != 'undefined'))
                        {
                            objectAnalysis.results.isHomeWinner = game.compare.results.isHomeWinner == xElement ? "X":"Y";
                            objectAnalysis.results.isF5HomeWinner = game.compare.results.isF5HomeWinner == xElement ? "X":"Y";
                            allAnalysisData.push(objectAnalysis);
                        }

                        if(resultsPercentages.length > 0)
                        {
                            var combinations = generatePatternCombinationsWithIndices(objectAnalysis.variables.agnosticPattern).filter(function(item){return item.combination.length >=4});
                            var isF5HomeWinnerXValues = [];
                            var isF5HomeWinnerYValues = [];
                            var isHomeWinnerXValues = [];
                            var isHomeWinnerYValues = [];
                            for (let gsg = 0; gsg < combinations.length; gsg++) {
                                const combination = combinations[gsg];
                                var results = filterByIndices(resultsPercentages,combination.indices).filter(function(item){return item.combination == combination.combination;})[0];
                                if(results)
                                {
                                    if(results.targetValue == "X")
                                    {
                                        isF5HomeWinnerXValues.push(results.isF5HomeWinnerPercentage);
                                        isF5HomeWinnerYValues.push(100-results.isF5HomeWinnerPercentage);

                                        isHomeWinnerXValues.push(results.isHomeWinnerPercentage);
                                        isHomeWinnerYValues.push(100-results.isHomeWinnerPercentage);
                                    }
                                    else{
                                        isF5HomeWinnerYValues.push(results.isF5HomeWinnerPercentage);
                                        isF5HomeWinnerXValues.push(100-results.isF5HomeWinnerPercentage);

                                        isHomeWinnerYValues.push(results.isHomeWinnerPercentage);
                                        isHomeWinnerXValues.push(100-results.isHomeWinnerPercentage);
                                    }
                                    
                                    var averageHomeWinPercentage = isHomeWinnerXValues.reduce((accumulator, current) => accumulator + current, 0)/isHomeWinnerXValues.length;
                                    var averageAwayWinPercentage = isHomeWinnerYValues.reduce((accumulator, current) => accumulator + current, 0)/isHomeWinnerXValues.length;
                                    game.compare.awayRow.WinPercentage = averageAwayWinPercentage;
                                    game.compare.homeRow.WinPercentage = averageHomeWinPercentage;
                                }
                                else{
                                    var stopHere = "";
                                }
                            }
                            
                            //game["selection"] = 
                        }
                        var stopHere = "";
                }
                    
                }
            }
        }
        await save("allFiles",allFiles, function(){}, "replace", "JsonViewObjects" );
    }

    function convertSortingDate(input) {
        // Regular expression to extract the month name and the day number
        const regex = /^([a-zA-Z]+)(\d+)(st|nd|rd|th)$/;
    
        // Matching the input string against the regex
        const match = input.match(regex);
    
        if (match) {
            const monthName = match[1]; // The month name
            let day = parseInt(match[2], 10); // The day number, parsed as an integer
    
            // Array of month names to convert month name to month number
            const monthNames = ["January", "February", "March", "April", "May", "June",
                                "July", "August", "September", "October", "November", "December"];
            const monthNumber = monthNames.indexOf(monthName) + 1; // Find index and adjust for 1-based index
    
            // Ensure the month number and day are always two digits
            const formattedMonth = monthNumber < 10 ? `0${monthNumber}` : `${monthNumber}`;
            const formattedDay = day < 10 ? `0${day}` : `${day}`;
    
            // Return the formatted date string "MonthNumber-Day"
            return `${formattedMonth}-${formattedDay}`;
        } else {
            // If the input doesn't match the expected format, return null or an appropriate error handling
            return null;
        }
    }

    function sortDataByStringDate(data) {
        return data.sort((a, b) => {
            // Convert "MM-DD" to "YYYY-MM-DD"
            const year = "2000"; // Arbitrary common year
            const dateA = new Date(`${year}-${a.stringDate}`); // Assuming each object has a 'date' property in "MM-DD" format
            const dateB = new Date(`${year}-${b.stringDate}`);
    
            return dateA - dateB;
        });
    }

    async function EnrichDecision()
    {
        var allViewObjects = await load("allFiles", "JsonViewObjects");
        var allIndexAndDays = await load("allIndexAndDayStats","IndexAndDayStats");
        var hotChancesByTeam =  await load("hotChancesByTeam", "hotChancesByTeamByDay");

        var viewDates = allViewObjects.map(function(item){
            return item.common.date;
        });

        var indexDates = allIndexAndDays.map(function(item){
            return item.date;
        });

        const distinctViewDates= [...new Set(viewDates)];
        const distinctIndexDates= [...new Set(indexDates)];
        
        var allSelections = [];
        var allKeys = [];
        var allTeams = [];
        var plainData = [];
        var decisionObjects = [];
        var indexNormalizedRecords = [];
        var datesSubject = distinctViewDates.length >= distinctIndexDates.length ? distinctViewDates : distinctIndexDates;
        for (let tsgt = 1; tsgt < datesSubject.length; tsgt++) {
            var targetDate = datesSubject[tsgt];

            var normalizedObject = {};
            
            allViewObjects.forEach(function(item){
                item.common.RecommendedBet = item.recommendedBet; //item.common.overallWinner;
                item.common.patternExpWinner = item.patternChances;
                item.common.patternOtherTeam = item.otherTeamChances;
                item.coversPer = item.compare[item.expWinner+"Row"].CoversPer != 100 ? item.compare[item.expWinner+"Row"].CoversPer : 10;
                item.isMLWin = item.common.isHomeWinner == item.compare.results.isHomeWinner;
                item.isFormulaWin = item.common.formulaWinner == item.compare.results.isHomeWinner;
                item.isSeriesWin = item.common.seriesWinner == item.compare.results.isHomeWinner;
                if(item.common.date == "September3rd")
                {
                    var stopHere = "";
                }
                item.patternWinner = item.compare[item.expWinner+"Row"].team;
                item.isPatternWin = item.patternWinner == item.compare.results.isHomeWinner;
                item.hotWinner = item.compare["homeRow"].hot >= item.compare["awayRow"].hot ? item.compare["homeRow"].team : item.compare["awayRow"].team;
                item.isHotWin = item.hotWinner == item.compare.results.isHomeWinner;
                item.dayOfWeek = GetDayOfWeek(item.common.date);
                var hotChancesAway = hotChancesByTeam.filter(function(it){
                    return it.team.indexOf(item.compare["homeRow"].team) >= 0
                });
                var hotChancesHome = hotChancesByTeam.filter(function(it){
                    return it.team.indexOf(item.compare["awayRow"].team) >= 0
                });

                if(hotChancesAway.length > 0 &&  hotChancesHome.length > 0)
                {
                    var homeChances = hotChancesHome[0].winChances.filter(function(ye){
                        return item.common.date.replace("th","").replace("nd","").replace("st","").replace("rd","") == ye.date.replace("th","").replace("nd","").replace("st","").replace("rd","");
                    });

                    var awayChances = hotChancesAway[0].winChances.filter(function(ye){
                        return item.common.date.replace("th","").replace("nd","").replace("st","").replace("rd","") == ye.date.replace("th","").replace("nd","").replace("st","").replace("rd","");
                    });

                    if(homeChances.length > 0 && awayChances.length){
                        item.hotChancesDiff = item.compare["homeRow"].team == item.common.isHomeWinner ? (homeChances[0].winPer - awayChances[0].winPer) : (awayChances[0].winPer - homeChances[0].winPer) ;
                        item.hotChancesByTeam = item.compare["homeRow"].team == item.common.isHomeWinner ? homeChances[0].winPer : awayChances[0].winPer;
                        item.compare["homeRow"].hot = homeChances[0].winPer;
                        item.compare["awayRow"].hot = awayChances[0].winPer;
                    }
                    else{
                        item.common.hot = 0;
                        item.hotChancesDiff = 0;
                        item.compare["homeRow"].hot = 0;
                        item.compare["awayRow"].hot = 0;
                        
                    }
                }
                else{
                    item.common.hot = 0;
                    item.hotChancesDiff = 0;
                    item.compare["homeRow"].hot = 0;
                    item.compare["awayRow"].hot = 0;
                }
                if(item.common.date == "July22th")
                {
                    var stopHere = "";
                }
                item.common.hotExpWinner = item.compare[item.expWinner+"Row"].hot;
                item.common.hotOtherTeam = item.compare[item.otherTeam+"Row"].hot;
            });


            var viewObjects = await sorting(allViewObjects
                .filter(function(item){
                   if(item.common.date == "September3rd")
                    {
                        var stopHere = "";
                    } 
                return item.common.date == targetDate &&
                    // ((item.common.formulaWinner == item.common.overallWinner &&
                    // item.common.overallWinner == item.common.isHomeWinner &&
                    // item.common.isHomeWinner == item.compare[item.expWinner+"Row"].team &&
                    // item.patternChances > 50 )
                    // ||
                    (item.common.isF5HomeWinnerProb >= .79 || item.common.isHomeWinnerProb >= .79 || item.common.isOverProb >= .78 ) 
                    // ||
                    // (item.recommendedBet >= 6.74 && item.recommendedBet <= 7.16)
                    // ||
                    // (item.factorDiff >= 11.56 && item.factorDiff <= 11.79)
                    // ||
                    // (item.FinalFactor >= 96.6)
                    // ||
                    // (item.factorDiff >= 10 && item.recommendedBet >= 7 && item.recommendedBet <= 9.43 && item.common.isF5HomeWinnerProb >= .65 && item.common.isHomeWinnerProb >=.65)
                    
                    // )
                    //&& item.patternChances > 50 
                    //&& item.common.isF5HomeWinner == item.common.formulaWinner ;
                    }
        ), "patternChances", "desc");


        // var maxF5Game = viewObjects.reduce((max, game) => {
        //     return (game.common.isF5HomeWinnerProb > max.common.isF5HomeWinnerProb) ? game : max;
        //   }, viewObjects[0]);

        //   var maxIsHomeGame = viewObjects.reduce((max, game) => {
        //     return (game.common.isHomeWinnerProb > max.common.isHomeWinnerProb) ? game : max;
        //   }, viewObjects[0]);

        //   var maxIsOverGame = viewObjects.reduce((max, game) => {
        //     return (game.common.isOverProb > max.common.isOverProb) ? game : max;
        //   }, viewObjects[0]);


        //   viewObjects = [];
        //   viewObjects.push(maxF5Game);
        //   viewObjects.push(maxIsHomeGame);
        //   viewObjects.push(maxIsOverGame);
            // viewObjects.forEach(function(item){
            //     item.common.FinalFactor = item.common.overallWinner;
            //     item.coversPer = item.compare[item.expWinner+"Row"].CoversPer != 100 ? item.compare[item.expWinner+"Row"].CoversPer : 10;
            //     item.isWin = item.common.isHomeWinner == item.compare.results.isHomeWinner;
            //     item.dayOfWeek = GetDayOfWeek(item.common.date);
            //     var hotChancesAway = hotChancesByTeam.filter(function(it){
            //         return it.team.indexOf(item.compare["homeRow"].team) >= 0
            //     });
            //     var hotChancesHome = hotChancesByTeam.filter(function(it){
            //         return it.team.indexOf(item.compare["awayRow"].team) >= 0
            //     });

            //     if(hotChancesAway.length > 0 &&  hotChancesHome.length > 0)
            //     {
            //         var homeChances = hotChancesHome[0].winChances.filter(function(ye){
            //             return item.common.date.replace("th","").replace("nd","").replace("st","").replace("rd","") == ye.date.replace("th","").replace("nd","").replace("st","").replace("rd","");
            //         });

            //         var awayChances = hotChancesAway[0].winChances.filter(function(ye){
            //             return item.common.date.replace("th","").replace("nd","").replace("st","").replace("rd","") == ye.date.replace("th","").replace("nd","").replace("st","").replace("rd","");
            //         });

            //         if(homeChances.length > 0 && awayChances.length){
            //             item.hotChancesDiff = item.compare["homeRow"].team == item.common.isHomeWinner ? (homeChances[0].winPer - awayChances[0].winPer) : (awayChances[0].winPer - homeChances[0].winPer) ;
            //             item.hotChancesByTeam = item.compare["homeRow"].team == item.common.isHomeWinner ? homeChances[0].winPer : awayChances[0].winPer;
            //             item.compare["homeRow"].hot = homeChances[0].winPer;
            //             item.compare["awayRow"].hot = awayChances[0].winPer;
            //         }
            //         else{
            //             item.common.hot = 0;
            //             item.hotChancesDiff = 0;
            //             item.compare["homeRow"].hot = 0;
            //             item.compare["awayRow"].hot = 0;
                        
            //         }
            //     }
            //     else{
            //         item.common.hot = 0;
            //         item.hotChancesDiff = 0;
            //         item.compare["homeRow"].hot = 0;
            //         item.compare["awayRow"].hot = 0;
            //     }
            // });
           
            
            await save("allFiles", allViewObjects, function(){}, "replace" ,"JsonViewObjects");

            viewObjects = await sorting(viewObjects, "patternChances", "desc");
            decisionObjects = decisionObjects.concat(viewObjects);

        
            if(viewObjects.length >0){
                var isNewKey = false; 
                var isNewTeam = false; 
                var keys = Object.keys(viewObjects[0]);
                for (let tye = 0; tye < keys.length; tye++) {
                    const key = keys[tye];
                    const selectedTeam = viewObjects[0].common.isHomeWinner;
                    if(!isNaN(parseFloat(viewObjects[0][key])))
                    {
                        var obje = allKeys.filter(function(item){return item.key == key});
                        
                        if(obje.length == 0){
                            obje = {key:key, indexes:[] ,winAvg:[]};
                            isNewKey = true;  
                        }
                        else{
                            obje = obje[0];  
                        }

                        
                                            
                        viewObjects = await sorting(viewObjects, key, "desc");
                        var winLostPatern = viewObjects.map(function(item){return item.isWin == true ? 1: 0;});
                        for (let hdys = 0; hdys < winLostPatern.length; hdys++) {
                            const win = winLostPatern[hdys];
                            try{
                                obje.indexes[hdys].push(win);
                                obje.winAvg[hdys] = ((obje.indexes[hdys].reduce((accumulator, current) => accumulator + current, 0)*100)/obje.indexes[hdys].length);
                            }
                            catch{
                                obje.indexes[hdys] = [];
                                obje.indexes[hdys].push(win);
                                obje.winAvg[hdys] = ((obje.indexes[hdys].reduce((accumulator, current) => accumulator + current, 0)*100)/obje.indexes[hdys].length);
                                
                            }
                        }
                        if(isNewKey)
                        allKeys.push(obje);

                        var teamPatern = viewObjects.map(item => ({ isWin: item.isWin == true ? 1: 0, isHomeWinner: item.common.isHomeWinner }));
                        for (let hdys = 0; hdys < teamPatern.length; hdys++) {
                            var isNewTeam = false; 
                            const tem = teamPatern[hdys];
                            if(tem.isHomeWinner.indexOf("Red") >= 0)
                                var stopHere = "";
                            var team  = allTeams.filter(function(item){return item.team.replace(" ","").replace("BOSRedSox","BOSRed").indexOf(tem.isHomeWinner.replace(" ","").replace("BOSRedSox","BOSRed")) >= 0});
                            
                            if(team.length == 0){
                                team = {team:tem.isHomeWinner, wins:[], loses:[] ,winAvg:[]};
                                isNewTeam = true;  
                            }
                            else{
                                team = team[0];  
                            }
                            
                            if(tem.isWin)
                            {
                                team.team = tem.isHomeWinner;
                                team.wins.push(tem.isWin);
                            }
                            else{
                                team.loses.push(1);
                            }
                            
                            team.winAvg = ((team.wins.reduce((accumulator, current) => accumulator + current, 0)*100)/(team.wins.length + team.loses.length));
                            
                        }
                        if(isNewTeam)
                        allTeams.push(team);

                    }
                }
            
        }
            
        }

        decisionObjects.forEach(function(item){
            var teamData = allTeams.filter(function(alt){return alt.team.indexOf(item.common.isHomeWinner)>=0 || item.common.isHomeWinner.indexOf(alt.team)>=0});
            if(teamData.length > 0)
            {
                item.winPerCalc = teamData[0].winAvg;
                item.common.FinalFactor = teamData[0].winAvg;
            }
            else{
                item.winPerCalc = 0;
                item.common.FinalFactor = 0;
            }
            //item.sorting = ((Math.abs(item.compare.awayRow.formulaWinPercentage - item.compare.homeRow.formulaWinPercentage)/100)  + (item.common.isHomeWinnerProb) + (item.patternChances/100) + (item.winPerCalc/100)  +  (item.hotChancesByTeam/100) + (item.hotChancesDiff/100) );
            item.sorting = item.common.isHomeWinner;
            item.common.FinalFactor = item.hotChancesDiff;
        });

        
        allSelections = allSelections.concat(decisionObjects);


        allKeys.forEach(function(item){
            item.top2Avg = (item.winAvg[0]+ item.winAvg[1])/2;
            item.top3Avg = (item.winAvg[0]+ item.winAvg[1]+ item.winAvg[3])/3;
        });

        var sortedData = await sorting(allKeys, "top3Avg", "desc");
        var sortedTeamData = await sorting(allTeams, "winAvg", "desc");


        var wons = decisionObjects.filter(function(item){
            return item.isWin  == true;
        });


        var loses = decisionObjects.filter(function(item){
            return item.isWin  != true;
        });

        var winAvg = (wons.length*100)/(loses.length+wons.length);

        console.log(winAvg.toFixed(2));

        
        allSelections = await sorting(allSelections, "patternChances", "desc");
        await save("allDecisions",allSelections, function(){}, "replace" ,"DecisionViewObject");
        var stopHere = "";
    }

    function arrayDifference(arr1, arr2) {
        return arr1.filter(element => !arr2.includes(element));
    }

    async function AddIndexAndDays(gameSort, IndexAndDayStats, asdnjsnd, gameDataAnalysis, gameFactorCompleteness)
    {
        if(IndexAndDayStats && IndexAndDayStats.indexStats &&IndexAndDayStats.indexStats.length > 0 ){
            var indexData = IndexAndDayStats.indexStats.filter(function(item){
                return item.index == asdnjsnd;
            })[0];
            console.log(gameDataAnalysis[0].date);
            if(indexData && indexData.games && indexData.games.length > 0){
                var dataId = indexData.games.findIndex(x => x.date == gameDataAnalysis[0].date) == 0 ? 1: indexData.games.findIndex(x => x.date == gameDataAnalysis[0].date);
                if(dataId != -1){
                    var gamesForStreak = indexData.games.slice(0,(dataId));
                }
                else{
                    var gamesForStreak = indexData.games;
                }
                gameSort["indexDataWinPercenatge"] = indexData.winPercenatge;
                gameSort["indexDataHotChances"] = indexData.hotChances;
                gameSort.common["factor"] += " Index"+indexData.index+"("+indexData.winPercenatge+"%) hot%("+indexData.hotChances+")";
                gameSort.calcDetails["indexWin"] = indexData.winPercenatge;
                gameSort.calcDetails["hotWin"] = indexData.hotChances;

                
                var streak= "";
                var lastGame = "";
                var streakCount = 0;
                for (let xckm = gamesForStreak.length-1; xckm >= 0; xckm--) {
                    if(gameDataAnalysis[0].date == "May14th")
                        {
                            var stopHere = "";
                        }
                    const gameIndex= gamesForStreak[xckm];
                    if(lastGame === "")
                    {
                        lastGame = gameIndex.betWon;
                        streakCount++;
                    }
                    else if(lastGame == gameIndex.betWon){
                        streakCount++;
                    }
                    else{
                        
                        break;
                    }
                }
                streak = lastGame == 1 ? "W-"+streakCount : "L-"+streakCount;
                gameSort.common["factor"] += " IndexStreak("+streak+")";
                var stopHere = "";
            }
        }
        gameSort["decisionTakerFactor"] = (gameSort["factorDiff"]) * (((gameSort["biggestChances"])/100) + ((gameSort["sample"])/100)  + (gameSort["factorDetailsWinPercenatge"]/100) +(gameSort["indexDataWinPercenatge"]/100) +(gameSort["indexDataHotChances"]/100 )) * gameFactorCompleteness;

        return gameSort;
    }

    async function ConsolidateMachineLearningResults(date)
    {
        var finalPredictions = [];
        var finalBets = [];
        var consolidatedPredictions = {winners:[], isOver:[]};
        //var MLResults = await load(date+"MachineLearningResults");
        var MLPredictions = await load(date+"ForestLinear");
        var games = await load(date);
        var minumalPercentage = .80;

        for (let index = 0; index < games[0].games.length; index++) {
            const game = games[0].games[index];

            var gamePredictions = MLPredictions.filter(function(item){
                return item.game == game.game;
            });

            var predictions = gamePredictions.map(function(item){
                return item.predictions;
            });
            if(predictions.length > 0)
            {
            var pred = {game:game.game ,isHomeWinner:{prediction:null, probability:null}, isF5HomeWinner:{prediction:null, probability:null}, isOver:{prediction:null, probability:null}};
            if(predictions[0].isHomeWinner.prediction == predictions[1].isHomeWinner.prediction)
            {
                pred.isHomeWinner.prediction = predictions[0].isHomeWinner.prediction;
                pred.isHomeWinner.probability = (predictions[0].isHomeWinner.probability + predictions[1].isHomeWinner.probability)/2;
                // if(pred.isHomeWinner.probability >= minumalPercentage)
                // {
                    finalBets.push({game:game.game, isHomeWinner:{prediction:pred.isHomeWinner.prediction, probability:pred.isHomeWinner.probability}});
                //}
            }

            if(predictions[0].isF5HomeWinner.prediction == predictions[1].isF5HomeWinner.prediction)
            {
                pred.isF5HomeWinner.prediction = predictions[0].isF5HomeWinner.prediction;
                pred.isF5HomeWinner.probability = (predictions[0].isF5HomeWinner.probability + predictions[1].isF5HomeWinner.probability)/2;
                //if(pred.isF5HomeWinner.probability >= minumalPercentage)
                //{
                    finalBets.push({game:game.game, isF5HomeWinner:{prediction:pred.isF5HomeWinner.prediction, probability:pred.isF5HomeWinner.probability}});
                //}
            }

            if(predictions[0].isOver.prediction == predictions[1].isOver.prediction)
            {
                pred.isOver.prediction = predictions[0].isOver.prediction;
                pred.isOver.probability = (predictions[0].isOver.probability + predictions[1].isOver.probability)/2;
                //if(pred.isOver.probability >= minumalPercentage)
                    //{
                        finalBets.push({game:game.game, isOver:{prediction:pred.isOver.prediction, probability:pred.isOver.probability}});
                    //}
            }

            finalPredictions.push(pred);
            
        }

        //     var winnerResults = MLResults.filter(function(item){
        //         return item.game == game.game;
        //     });

        //     // var isOverResults = MLResults.IsOver.filter(function(item){
        //     //     return item.game == game.game;
        //     // });

        //     if(winnerResults.length > 0)
        //     {
        //         var homeWinners = winnerResults.filter(function(item){
        //             return item.prediction == 1;
        //         });

        //         var awayWinners = winnerResults.filter(function(item){
        //             return item.prediction == 0;
        //         });

        //         var homeCount = homeWinners.length;
        //         var homeProbabilitySum = 0;
        //         for (let sd = 0; sd < homeWinners.length; sd++) {
        //             const prediction = homeWinners[sd];
        //             homeProbabilitySum += parseFloat(prediction.Probability);
        //         }
        //         var homeProbAvg = homeProbabilitySum/(homeCount != 0 ? homeCount : 1);

        //         var awayCount = awayWinners.length;
        //         var awayProbabilitySum = 0;
        //         for (let sd = 0; sd < awayWinners.length; sd++) {
        //             const prediction = awayWinners[sd];
        //             awayProbabilitySum += parseFloat(prediction.Probability);
        //         }
        //         var awayProbAvg = awayProbabilitySum/(awayCount != 0 ? awayCount : 1);

        //         var selectionDiff = homeCount >= awayCount ? homeCount - awayCount : awayCount - homeCount;

        //         var probDiff = homeProbAvg >= awayProbAvg ? homeProbAvg - awayProbAvg : awayProbAvg - homeProbAvg;

        //         var totalProbSum = (homeProbAvg + homeCount +  awayProbAvg + awayCount)                        
        //         var finalHomeProb = ((homeProbAvg + homeCount)*100) / totalProbSum;
        //         var finaAwayProb = ((awayProbAvg + awayCount)*100) / totalProbSum;

        //         var finalProbDiff = finalHomeProb >= finaAwayProb ? finalHomeProb - finaAwayProb : finaAwayProb - finalHomeProb;

        //         var expectedWinner = finalHomeProb >= finaAwayProb ? game.homeTeam.homeTeam : game.awayTeam.awayTeam;

        //         var prediction = {game: game.game, home: game.homeTeam.homeTeam, homeSelCount:homeCount, homeProbAvg: homeProbAvg, away: game.awayTeam.awayTeam, awaySelCount:awayCount, awayProbAvg: awayProbAvg, selectionDiff: selectionDiff, probDiff:probDiff, finalHomeProb:finalHomeProb, finaAwayProb:finaAwayProb, finalProbDiff:finalProbDiff, expectedWinner:expectedWinner };

        //         consolidatedPredictions.winners.push(prediction);
                
        //         // if(isOverResults.length > 0)
        //         // {
        //         //     var isOverGame = isOverResults.filter(function(item){
        //         //         return item.prediction == 1;
        //         //     });

        //         //     var isUnderGame = isOverResults.filter(function(item){
        //         //         return item.prediction == 0;
        //         //     });

        //         //     var isOverCount = isOverGame.length;
        //         //     var isOverProbabilitySum = 0;
        //         //     for (let sid = 0; sid < isOverGame.length; sid++) {
        //         //         const prediction = isOverGame[sid];
        //         //         isOverProbabilitySum += parseFloat(prediction.Probability);
        //         //     }
        //         //     var isOverAvg = isOverProbabilitySum/(isOverCount != 0 ? isOverCount : 1);

        //         //     var isUnderCount = isUnderGame.length;
        //         //     var isUnderProbabilitySum = 0;
        //         //     for (let sid = 0; sid < isUnderGame.length; sid++) {
        //         //         const prediction = isUnderGame[sid];
        //         //         isUnderProbabilitySum += parseFloat(prediction.Probability);
        //         //     }
        //         //     var isUnderAvg = isUnderProbabilitySum/(isUnderCount != 0 ? isUnderCount : 1);

        //         //     var selectionDiff = isOverCount >= isUnderCount ? isOverCount - isUnderCount : isUnderCount - isOverCount;

        //         //     var probDiff = isOverAvg >= isUnderAvg ? isOverAvg - isUnderAvg : isUnderAvg - isOverAvg;

        //         //     var totalProbSum = (isOverAvg + isOverCount +  isUnderAvg + isUnderCount)                        
        //         //     var finalIsOverProb = ((isOverAvg + isOverCount)*100) / totalProbSum;
        //         //     var finaIsUnderProb = ((isUnderAvg + isUnderCount)*100) / totalProbSum;

        //         //     var finalProbDiff = finalIsOverProb >= finaIsUnderProb ? finalIsOverProb - finaIsUnderProb : finaIsUnderProb - finalIsOverProb;

        //         //     var expectedWinner = finalIsOverProb >= finaIsUnderProb ? "Over": "Under";

        //         //     var prediction = {game: game.game, IsOverSelCount:isOverCount, isOverAvg: isOverAvg, isUnderSelCount:isUnderCount, isUnderAvg: isUnderAvg, selectionDiff: selectionDiff, probDiff:probDiff, finalIsOverProb:finalIsOverProb, finaIsUnderProb:finaIsUnderProb, finalProbDiff:finalProbDiff, expectedWinner:expectedWinner };

        //         //     consolidatedPredictions.isOver.push(prediction);
        //         // }
        //     }
            
         }

        // var sortedWinnerPredictions = await sorting(consolidatedPredictions.winners,"finalProbDiff", "desc");
        // //var sortedOverPredictions = await sorting(consolidatedPredictions.isOver,"finalProbDiff", "desc");

        // consolidatedPredictions.winners = sortedWinnerPredictions;
        // //consolidatedPredictions.isOver = sortedOverPredictions;

        // await save(date+"ConsolidatedPredictions", consolidatedPredictions, function(){}, "replace");

        await save(date+"finalPredictions", finalPredictions, function(){}, "replace");
        await save(date+"finalBets", finalBets, function(){}, "replace");
        var stopHere = "";
    }

    async function AddAgnosticPatterns(gameFormatted, game, gameFactorCompleteness)
    {

        var agnosticPatterns =  await load("agnosticPatterns", "agnosticPatterns");

            var gamePattern = await GetAgnosticPatterns(gameFormatted,[], [], "agnostic");
            var selectedPattern = agnosticPatterns.filter(function(item){
                return item.agnosticPattern == gamePattern[0].agnosticPattern;
            })[0];
            gameFormatted["agnosticPattern"] = selectedPattern.agnosticPattern;
            var winsCount = selectedPattern.wins.factorDiff.filter(function(item){
                return item <= Math.round(gameFormatted.common.factorDiff);
            }).length;

            gameFormatted["winsCount"] = winsCount;

            var handicapWins = selectedPattern.factorHandicap.wins
                .filter(item => item.factorDiff <= Math.round(gameFormatted.common.factorDiff))
                .map(item => item.handicap);

            if(handicapWins.length>3)
            {
                var maxWinHandicap = Math.max(...handicapWins);
                var minWinHandicap = Math.min(...handicapWins);

                var sumOfHandicapWins = handicapWins.reduce((accumulator, current) => accumulator + current, 0)-maxWinHandicap-minWinHandicap;

                var handicapWinFinal = sumOfHandicapWins/(handicapWins.length-2);
            }
            else{
                var sumOfHandicapWins = handicapWins.reduce((accumulator, current) => accumulator + current, 0);

                var handicapWinFinal = sumOfHandicapWins/(handicapWins.length != 0 ? handicapWins.length : 1);
            }

            var losesCount = selectedPattern.loses.factorDiff.filter(function(item){
                return item <= Math.round(gameFormatted.common.factorDiff);
            }).length;

            gameFormatted["losesCount"] = losesCount;

            var handicapLoses = selectedPattern.factorHandicap.loses
                .filter(item => item.factorDiff <= Math.round(gameFormatted.common.factorDiff))
                .map(item => item.handicap);

            if(handicapLoses.length>3)
            {
                var maxLoseHandicap = Math.max(...handicapLoses);
                var minLoseHandicap = Math.min(...handicapLoses);

                var sumOfHandicapLoses = handicapLoses.reduce((accumulator, current) => accumulator + current, 0)-maxLoseHandicap-minLoseHandicap;

                var handicapLoseFinal = sumOfHandicapLoses/(handicapLoses.length-2);
            }
            else{
                var sumOfHandicapLoses = handicapLoses.reduce((accumulator, current) => accumulator + current, 0);

                var handicapLoseFinal = sumOfHandicapLoses/(handicapLoses.length != 0 ? handicapLoses.length : 1);
            }


            
            var patternChances = Math.round(((winsCount)*(100))/(winsCount+losesCount));
            gameFormatted["patternChances"] = patternChances;
            var otherTeamChances = 100 - patternChances;
            gameFormatted["otherTeamChances"] = otherTeamChances;
            gameFormatted["expWinner"] = gamePattern[0].expWinner;
            var otherTeam = gamePattern[0].expWinner == "away" ? "home" : gamePattern[0].expWinner == "home" ? "away":"check";
            gameFormatted["otherTeam"] = otherTeam;
            gameFormatted["biggestChances"] = patternChances >= otherTeamChances ? patternChances : otherTeamChances;
            gameFormatted.common["patternChances"] = patternChances.toString()+"%("+game[gamePattern[0].expWinner]+")  "+otherTeamChances.toString()+"%("+game[otherTeam]+")"  ;
            gameFormatted.common["sample"] = "wins:"+ winsCount+" loses:"+losesCount+" ="+(winsCount+losesCount);
            gameFormatted.common["avgHandicap"] = "Win:"+Math.round(handicapWinFinal) +" Lost:"+Math.round(handicapLoseFinal);
            
            gameFormatted["sample"] = winsCount+losesCount;
            gameFormatted["factorDiff"] = gameFormatted.factorDiff;
            gameFormatted.calcDetails["factorDiff"] = gameFormatted.factorDiff;
            gameFormatted["recommendedBet"] = (((gameFormatted.biggestChances)/100) + ((winsCount+losesCount)/100) + (gameFormatted.factorDiff/100)) * gameFactorCompleteness;

            
            return gameFormatted;
    }

    async function ProcessFactors(gameFormatted, gameFactorCompleteness)
    {
        
        var percentageFactors = await load(gameFormatted.common.date+"consolidatedFactors", "analysisGameDetails");
        
       
        //if(percentageFactors.length > 0 ){
            var roundedFactor = roundToClosestQuarterOrInt(gameFormatted.recommendedBet);
            var factorDetails = percentageFactors.filter(function(item){
                return item.factor == roundedFactor;
            })[0];

                if(factorDetails){
                gameFormatted["factorDetailsWinPercenatge"] = factorDetails.winPercenatge;
                gameFormatted["recommendedBet"] = (((gameFormatted["biggestChances"])/100) + ((gameFormatted["winsCount"]+gameFormatted["losesCount"])/100) + (gameFormatted.factorDiff/100)+ (Math.round(factorDetails.winPercenatge)/100)) * gameFactorCompleteness;
                gameFormatted.common["factor"] = parseFloat(gameFormatted.recommendedBet.toFixed(2))+" Win("+Math.round(factorDetails.winPercenatge)+"%) Hand("+Math.round(factorDetails.winHandicapPercentage)+"%) totGam:"+factorDetails.totalGames;
                gameFormatted.calcDetails["factorWin"] = Math.round(factorDetails.winPercenatge);
                }
        // }
        // else{
        //     gameFormatted.common["factor"] = gameFormatted.recommendedBet;
        // }
        
        return gameFormatted;
    }

    async function GetPicksGames(datesAnalysis, GetStats, patternPercentage ,pickPercentage){
        dayResultsWins = 0;
        resultsCount = 0;
        
        await save("FinalPicks", [], function(){}, "replace", "GameByGame");
        for (let te = 0; te < datesAnalysis.length; te++) {
            const mmonth = datesAnalysis[te];
        var startIndex = 0;
            var firstElement = te==0 ? mmonth.from + 1 : mmonth.from;
                for (let index =firstElement; index <= mmonth.to; index++)
                {
                var selectedDate = mmonth.month+ index;
                if(index == 1 || index == 31)
                {
                    selectedDate += "st";
                }
                else if(index == 3)
                {
                    selectedDate += "rd";
    
                }
                else{
                    selectedDate += "th";
                }
                if(index <10)
                {
                    var descriptiveDate = "2024-"+mmonth.monthNumber+"-0"+index;
                }
                else{
                    var descriptiveDate = "2024-"+mmonth.monthNumber+"-"+index;
                }
                await CleanUpAndGenerateStats(fullDatesAnalysis, mmonth, index);
                startIndex++;
                
                await EvaluateResults(selectedDate,mmonth.month+" "+index+", 2024" );
                await EvaluateResultsPrototype(selectedDate,mmonth.month+" "+index+", 2024" );
                if(startIndex >=15)
                {
                    await GetPicks(selectedDate, GetStats, patternPercentage ,pickPercentage);
                }
            }
        }
    }

    async function ProcessFinalPicks()
    {
        var selections = await load("FinalPicks","GameByGame");
        if(selections.length > 0)
        {
            var finalStats = [];
            function countUnique(iterable) {
                return new Set(iterable);
            }
            
            var uniqueAppearences = countUnique(selections.map(function(item){return item.appearances}));

            for (const value of uniqueAppearences) {
                const appearance = value;
                var scope = selections.filter(function(item){
                    return item.appearances == appearance ;
                });
                var stopHere = "";
                var sumWins = 0;
                var removeCount = 0;
                for (let index = 0; index < scope.length; index++) {
                    const game = scope[index];
                    if(game.isAWin == 0 || game.isAWin ==1)
                    {
                        sumWins += game.isAWin;
                    }
                    else{
                        removeCount++;
                    }
                }
                finalStats.push({appearances:appearance, times:scope.length, winPercentage: ((sumWins*100)/(scope.length - removeCount))});
            }

            var sortedChances = await sorting(finalStats, "times", "desc");

            var uniqueDates = countUnique(selections.map(function(item){return item.date}));

            for (const value of uniqueDates) {
                const date = value;
                var scope = selections.filter(function(item){
                    return item.date == date ;
                });
                var stopHere = "";
                var sumWins = 0;
                var removeCount = 0;
                for (let index = 0; index < scope.length; index++) {
                    const game = scope[index];
                    if(game.isAWin == 0 || game.isAWin ==1)
                    {
                        sumWins += game.isAWin;
                    }
                    else{
                        removeCount++;
                    }
                }
                finalStats.push({date:date, betsAmount:scope.length, winPercentage: ((sumWins*100)/(scope.length - removeCount))});
            }

            var sortedByDate = await sorting(finalStats, "date", "desc");

            var uniqueTeams = countUnique(selections.map(function(item){return item.selectedTeam}));

            for (const value of uniqueTeams) {
                const team = value;
                var scope = selections.filter(function(item){
                    return item.selectedTeam.indexOf(team) >= 0;
                });
                var stopHere = "";
                var sumWins = 0;
                var removeCount = 0;
                for (let index = 0; index < scope.length; index++) {
                    const game = scope[index];
                    if(game.isAWin == 0 || game.isAWin ==1)
                    {
                        sumWins += game.isAWin;
                    }
                    else{
                        removeCount++;
                    }
                }
                finalStats.push({team:team, betsAmount:scope.length, winPercentage: ((sumWins*100)/(scope.length - removeCount))});
            }

            var sortedByTeam = await sorting(finalStats, "team", "desc");


            var uniqueCovers = countUnique(selections.map(function(item){return Math.round(item.coversPer)}));

            for (const value of uniqueCovers) {
                const coverPer = value;
                var scope = selections.filter(function(item){
                    return Math.round(item.coversPer) == coverPer;
                });
                var stopHere = "";
                var sumWins = 0;
                var removeCount = 0;
                for (let index = 0; index < scope.length; index++) {
                    const game = scope[index];
                    if(game.isAWin == 0 || game.isAWin ==1)
                    {
                        sumWins += game.isAWin;
                    }
                    else{
                        removeCount++;
                    }
                }
                finalStats.push({coverPer:coverPer, betsAmount:scope.length, winPercentage: ((sumWins*100)/(scope.length - removeCount))});
            }

            var sortedByCovers = await sorting(finalStats, "coverPer", "desc");
            await save("FinalPicksPercentages", finalStats, function(){}, "replace", "GameByGame");
            var stopHere = "";
        }
        else{

            throw new Error("No final Selections Found");
        }
    }

    async function GetPicks(date, GetStats, patternPercentage,pickPercentage)
    {
        var patterns = await load("GeneralStatsPerSummary" ,"GameByGame");
        var games = await load(date+"FinalSelections");
        var coversPercentages = await load("CoversPercentagesP","GameByGame");
        var finalPicksPercentages = await load("FinalPicksPercentages","GameByGame");
        
        if(!GetStats){
            patterns = patterns.filter(function(item){
                return item.maxValue >= patternPercentage;
            });
        }
        try{
            var expectedResults = await load("ExpectedResults","GameByGame");
            var exists = expectedResults.findIndex(x => x.date == date);
            while (exists != -1)
            {
                exists = expectedResults.findIndex(x => x.date == date);
                if(exists >=0)
                {
                    expectedResults.splice(exists, 1);
                }

            }
            
        }
        catch{
            var expectedResults = [];
        }
        var dayResults = [];
        try{
            var finalPicks = await load("FinalPicks","GameByGame");
            var exists = finalPicks.findIndex(x => x.date == date);
            while (exists != -1)
            {
                exists = finalPicks.findIndex(x => x.date == date);
                if(exists >=0)
                {
                    finalPicks.splice(exists, 1);
                }

            }
        }
        catch{
             var finalPicks = [];
        }
        var dayPicks = [];
        for (let index = 0; index < patterns.length; index++) {
            const pattern = patterns[index];

            var patternSorted = await sorting(games, pattern.selectedProperty, pattern.orderByDirection);

            var selectedGame = patternSorted[pattern.index];
            if(selectedGame)
            {
                var selectedProperty = "";
                if(pattern.maxProperty.toLowerCase().indexOf("formula") >= 0)
                {
                    selectedProperty = "formulaWinner";
                }
                else if(pattern.maxProperty.toLowerCase().indexOf("series") >= 0)
                {
                    selectedProperty = "seriesWinner";
                }
                else if(pattern.maxProperty.toLowerCase().indexOf("overall") >= 0)
                {
                    selectedProperty = "overallWinner";
                }
                else if(pattern.maxProperty.toLowerCase().indexOf("next") >= 0)
                {
                    selectedProperty = "nextWinners";
                }
                var selectedWinner = selectedGame[selectedProperty];
            }

            var record = {date: date, maxProperty:pattern.maxProperty, selectedWinner:selectedWinner, chances: pattern.maxValue, handicapF5: pattern.handicapF5, handicap: pattern.handicap };
            dayResults.push(record);
            //console.log(pattern.maxProperty+ ": " + selectedWinner + " " + pattern.maxValue+"%, handicapF5: " +pattern.handicapF5+ " handicap: " +pattern.handicap);
            
        }

            expectedResults = expectedResults.concat(dayResults);
            await save("ExpectedResults", expectedResults, function(){}, "replace", "GameByGame");

        function countUnique(iterable) {
            return new Set(iterable);
          }
          
        var uniqueVals = countUnique(dayResults.map(function(item){return item.selectedWinner}));


        for (const value of uniqueVals) {
            const team = value;
            if(date == "April18th")
            {
                var stopHere = "";
            }
            if(team)
            {
                var scope = dayResults.filter(function(item){
                    return item.selectedWinner == team ;
                });

                var appearances = scope.length;

                var perSum = 0;
                var sumHandicapF5 = 0;
                var sumHandicap = 0;
                scope.forEach(function(item){
                    perSum += item.chances;
                    sumHandicapF5 += item.handicapF5;
                    sumHandicap += item.handicap
                    
                });

                var averagePer = perSum/appearances;
                var handicapF5 = sumHandicapF5/appearances;
                var handicap = sumHandicap/appearances;



                var gameSele = games.filter(function(item){
                    return item.home == team || item.away == team;
                })[0];
                if(gameSele)
                {
                    var homeToWin = dayResults.filter(function(item){
                        return item.selectedWinner == gameSele.home;
                    });

                    var awayToWin = dayResults.filter(function(item){
                        return item.selectedWinner == gameSele.away;
                    });

                    var coversPercentagesData = coversPercentages.filter(function(item){
                        return item.date == date && (item.homeTeam == team || item.awayTeam == team);
                    });

                    var coversPer = 100;
                    var opponentPer = 0;
                    if(coversPercentagesData.length > 0)
                    {
                        if(coversPercentagesData[0].awayTeam == team)
                        {
                            coversPer = coversPercentagesData[0].coversAwayWinPercentage;
                            opponentPer = coversPercentagesData[0].coversHomeWinPercentage;
                        }
                        else{
                            coversPer = coversPercentagesData[0].coversHomeWinPercentage;
                            opponentPer = coversPercentagesData[0].coversAwayWinPercentage;
                        }
                    }
                    //!(homeToWin.length >=1 && awayToWin.length >= 1) &&
                    //if( ((appearances > 1 || averagePer > 75) && coversPer > opponentPer))
                    //{
                        var isProcessed = finalPicks.filter(function(item){
                            return item.selectedTeam == team && item.date == date;
                        });
                        if(isProcessed.length == 0)
                        {
                            var totalSum = 0;
                            var totalStats = 0;
                            var appearanceRecord = finalPicksPercentages.filter(function(item){
                                return item.appearances == appearances;
                            });
                            if(appearanceRecord.length > 0)
                            {
                                totalSum += appearanceRecord[0].winPercentage;
                                totalStats++;
                            } 

                            var teamRecord = finalPicksPercentages.filter(function(item){
                                return item.team == team;
                            });
                            if(teamRecord.length > 0)
                            {
                                totalSum += teamRecord[0].winPercentage;
                                totalStats++;
                            } 

                            var coversRecord = finalPicksPercentages.filter(function(item){
                                return item.coverPer == Math.round(coversPer);
                            });
                            if(coversRecord.length > 0)
                            {
                                totalSum += coversRecord[0].winPercentage;
                                totalStats++;
                            } 
                            var realPercentage = ((totalSum)/totalStats);
                            var gameResult = await GetResultDetails(date, {away: gameSele.away, home: gameSele.home}, team);
                            //console.log("date: "+date +" team: ("+ gameResult.FinalWinner+")"+ team + " " +realPercentage+"% ("+appearances+"), totalC:"+((averagePer+coversPer)/2) +", bet: "+scope[0].maxProperty+" handicapF5: " + handicapF5+ " handicap: "+ handicap + " coversPer: "+coversPer);
                            dayPicks.push({date: date, selectedTeam: team, realPercentage:realPercentage ,algoChances:averagePer, totalChances:((averagePer+coversPer+realPercentage)/3), appearances:appearances, maxBet: scope[0].maxProperty, handicapF5:handicapF5, handicap:handicap, coversPer:coversPer, isAWin:gameResult.FinalWinner, handicap: gameResult.handicap});
                        //}
                    }
                    else{
                        var stopHere = "";
                    }
                }
            }
        }

        if(dayPicks.length > 0)
        {
            
           //var sortedDayPicks = dayPicks.filter(function(item){
           //    return item.algoChances >=  pickPercentage;
           //});
           //if(sortedDayPicks.length == 0)
           //{
                var sortedDayPicks = await sorting(dayPicks, "realPercentage", "desc");
                sortedDayPicks = sortedDayPicks.slice(0,2);
            //}
            var dayWins = 0;
            var numberPicks = 0;
            sortedDayPicks = await sorting(sortedDayPicks, "realPercentage", "desc");
            //sortedDayPicks = sortedDayPicks.slice(0, 1);
            for (let gst = 0; gst < sortedDayPicks.length; gst++) {
                const pick = sortedDayPicks[gst];
                dayResultsWins += pick.isAWin == 0 || pick.isAWin == 1 ? pick.isAWin : 0;
                dayWins += pick.isAWin == 0 || pick.isAWin == 1 ? pick.isAWin : 0;
                numberPicks++;
                resultsCount++;
                if(!GetStats){
                    console.log("date: "+pick.date +" team: ("+ pick.isAWin+")"+ pick.selectedTeam + " " +pick.realPercentage+"% ("+pick.appearances+"), totalC:"+pick.totalChances +", bet: "+pick.maxBet+" handicapF5: " + pick.handicapF5+ " handicap: "+ pick.handicap + " coversPer: "+pick.coversPer);
                }
            }
            if(sortedDayPicks.length > 0)
            {
                if(!GetStats){
                    console.log("date:"+date+" ,dayPicks: "+numberPicks+" ,dayWins:"+dayWins+" , dayPercentage: "+ ((dayWins*100)/numberPicks)+" ,winPercentageOverall: "+((dayResultsWins*100)/resultsCount)+ ", wins:"+dayResultsWins+" , totalPicks:"+resultsCount);
                }
                finalPicks = finalPicks.concat(sortedDayPicks);
                await save("FinalPicks", finalPicks, function(){}, "replace", "GameByGame");
                await ProcessFinalPicks();

            }
            if(dayPicks.length > 0)
            {
                
            }
        }
        else{
            var stopHere = "";
        }

        
    }

    async function GetBetterPatterns(date)
    {
        var games = await load(date+"FinalSelections");
        var keys = Object.keys(games[0]);

        var evaluationKeys = [];
        for (let sds = 0; sds < keys.length; sds++) {
            const key = keys[sds];
            
            var isNum = parseFloat(games[0][key]);
            if(!isNaN(isNum))
            {
                evaluationKeys.push(key);
            }
            
        }

        var consolidatedArray = [];
        for (let tet = 0; tet < evaluationKeys.length; tet++) {
            const key = evaluationKeys[tet];
            selectedProperty = key;
            orderByDirection = "desc";
            if(selectedProperty != "time")
            {
                var percentages = await load("GeneralStatsPer"+selectedProperty+orderByDirection, "GameByGame");
                consolidatedArray = consolidatedArray.concat(percentages);
            }
            
        }

        var orderedPercenatges = [];
        var highestPercentage = 0;


        var keys2 = Object.keys(consolidatedArray[0]);

        var evaluationKeys2 = [];
        for (let sds = 0; sds < keys2.length; sds++) {
            const key2 = keys2[sds];
            
            var isNum2 = parseFloat(consolidatedArray[0][key2]);
            if(!isNaN(isNum2))
            {
                evaluationKeys2.push(key2);
            }
            
        }
        

        for (let sd = 0; sd < consolidatedArray.length; sd++) {
            const percentages = consolidatedArray[sd];
            var maxValue = 0;
            var maxProperty = "";
            for (let tet = 0; tet < evaluationKeys2.length; tet++) {
                const key = evaluationKeys2[tet];
                selectedProperty = key;
                if(selectedProperty != "index" && selectedProperty != "propertyValue" && selectedProperty != "count")
                {
                    var value = parseFloat(percentages[key]);
                    if(value > maxValue)
                    {
                        maxValue = value;
                        maxProperty = key;
                    }
                }

            }
            percentages.maxValue = maxValue;
            percentages.maxProperty = maxProperty;
            percentages.coeficient = maxValue * percentages.count;
            
        }
        console.log(date);
        var sortedArray = await sorting(consolidatedArray,"coeficient", "desc");
        await save(date+"GeneralStatsPerSummary",sortedArray, function(){}, "replace" ,"GeneralStatsPerSummary");
        var stopHere = "";
    }

    async function ProcessGeneralStats(date)
    {
        var games = await load(date+"FinalSelections");
        var keys = Object.keys(games[0]);

        var evaluationKeys = [];
        for (let sds = 0; sds < keys.length; sds++) {
            const key = keys[sds];
            
            var isNum = parseFloat(games[0][key]);
            if(!isNaN(isNum))
            {
                evaluationKeys.push(key);
            }
            
        }

        for (let tet = 0; tet < evaluationKeys.length; tet++) {
            const key = evaluationKeys[tet];
            selectedProperty = key;
            orderByDirection = "desc";
        var generalStats = await load("GeneralStats"+selectedProperty+orderByDirection, "GameByGame");

        var GeneralStatsPer =[];
        for (let index = 0; index < generalStats.length; index++) {
            const statIndex = generalStats[index];
            var record={
                index: statIndex.index,
                F5FormulaWinner :(statIndex. F5FormulaWinner*100)/statIndex.count,  
                F5SeriesWinner :  (statIndex.F5SeriesWinner*100)/statIndex.count, 
                F5NextWinner :  (statIndex.F5NextWinner*100)/statIndex.count, 
                F5OverallWinner : (statIndex.F5OverallWinner*100)/statIndex.count,
                FinalFormulaWinner :  (statIndex.FinalFormulaWinner*100)/statIndex.count,
                FinalSeriesWinner :  (statIndex.FinalSeriesWinner*100)/statIndex.count,
                FinalNextWinner :  (statIndex.FinalNextWinner*100)/statIndex.count,
                FinalOverallWinner :  (statIndex.FinalOverallWinner*100)/statIndex.count,
                selectedProperty : statIndex.selectedProperty,
                orderByDirection : statIndex.orderByDirection,
                propertyValue  :  (statIndex.propertyValue)/statIndex.count,
                handicapF5  :  (statIndex.handicapF5)/statIndex.count,
                handicap  :  (statIndex.handicap)/statIndex.count,
                count: statIndex.count
            }

            GeneralStatsPer.push(record);
        }

        await save("GeneralStatsPer"+selectedProperty+orderByDirection, GeneralStatsPer, function(){}, "replace", "GameByGame");
        }
    }

    async function ConsolidateSelectionsResults()
    {
        var sel1 = await load("ResultsSeriesWinner", "GameByGame");
        var sel2 = await load("ResultsFoRmulaWinner", "GameByGame");

        // sel1 = sel1.filter(function(item){
        //     return item.handicap != "Pending Game";
        // });

        // sel2 = sel2.filter(function(item){
        //     return item.handicap != "Pending Game";
        // });

        
        var budget = 2000;
        
        var withHandicap = false;
        var allResults = [];
        var days = [];
        if(sel1.length >= sel2.length)
        {
            days = sel1;
        }
        else{
            days = sel2;
        }

        for (let index = 0; index < days.length; index++) {
            const day = days[index];
            if(day.date == "May16th")
            {
                var stopHere = "";
            }
            var selection1 = sel1.filter(function(item){
                return day.date == item.date
            });

            var selection2 = sel2.filter(function(item){
                return day.date == item.date
            });
            var result = {day:day.date, dayOfWeek: day.dayOfWeek, wins:0, result1:"", result2:"", budget:null};
            if(index == 0)
            {
                result.budget = budget;
            }
            else{
                result.budget = allResults[allResults.length-1].budget;
            }

            var individualBetAmount = 500;//result.budget/4;
            if(selection1.length >= 1 && selection2.length >= 1)
            {
                result.budget = result.budget - (individualBetAmount * 2);
                var win1 = selection1[0].FinalSeriesWinnerPer == 100 ;
                var win2 = selection2[0].FinalFormulaWinnerPer == 100;
                var handicap1 = true;
                var handicap2 = true;
                var isPush1 = true;
                var isPush2 = true;
                var momio = 0;
                if(withHandicap)
                {
                    handicap1 = (selection1[0].handicap > 1);
                    handicap2 = (selection2[0].handicap > 1);
                    isPush1 = (selection1[0].handicap == 1);
                    isPush2 = (selection2[0].handicap == 1);
                    momio = 2.5;
                }
                else{
                    handicap1 = true;
                    handicap2 = true;
                    isPush1 = true;
                    isPush2 = true;
                    momio = 1.7;
                }

                if(win1 && win2)
                {
                    result.wins = 2;
                    result.result1 = "W-" + selection1[0].seriesWinner+"/"+selection1[0].handicap;
                    result.result2 = "W-" + selection2[0].formulaWinner+"/"+selection2[0].handicap;
                    if(handicap1)
                    {
                        result.budget = result.budget + ((individualBetAmount * momio)*1);
                    }
                    else if(isPush1)
                    {
                        result.budget = result.budget + ((individualBetAmount));
                    }
                    else{
                        result.budget = result.budget;
                    }

                    if(handicap2)
                    {
                        result.budget = result.budget + ((individualBetAmount * momio)*1);
                    }
                    else if(isPush2)
                    {
                        result.budget = result.budget + ((individualBetAmount));
                    }
                    else{
                        result.budget = result.budget;
                    }
                    
                    
                }
                else if(!win1 && !win2)
                {
                    if(selection1[0].handicap != "Pending Game" || selection2[0].handicap != "Pending Game")
                    {
                        result.result1 = "L-" + selection1[0].seriesWinner+"/"+selection1[0].handicap;
                        result.result2 = "L-" + selection2[0].formulaWinner+"/"+selection2[0].handicap;
                        result.budget = result.budget;
                    }
                    else{
                        result.result1 = "Pending-" + selection1[0].seriesWinner+"/"+selection1[0].handicap;
                        result.result2 = "Pending-" + selection2[0].formulaWinner+"/"+selection2[0].handicap;
                        result.budget = "Pending";
                    }
                }
                else if(win1)
                {
                    result.wins = 1;
                    result.result1 = "W-" + selection1[0].seriesWinner+"/"+selection1[0].handicap;
                    result.result2 = "L-" + selection2[0].formulaWinner+"/"+selection2[0].handicap;
                    if(handicap1)
                    {
                        result.budget = result.budget + ((individualBetAmount * momio)*1);
                    }
                    else if(isPush1)
                    {
                        result.budget = result.budget + ((individualBetAmount));
                    }
                    else{
                        result.budget = result.budget;
                    }
                    

                }
                else if(win2)
                {
                    result.wins = 1;
                    result.result1 = "L-" + selection1[0].seriesWinner+"/"+selection1[0].handicap;
                    result.result2 = "W-" + selection2[0].formulaWinner+"/"+selection2[0].handicap;
                    if(handicap2)
                    {
                        result.budget = result.budget + ((individualBetAmount * momio)*1);
                    }
                    else if(isPush2)
                    {
                        result.budget = result.budget + ((individualBetAmount));
                    }
                    else{
                        result.budget = result.budget;
                    }
                }
            }
            else if(selection1.length >= 1){
                result.budget = result.budget - (individualBetAmount * 1);
                if(win1)
                {
                    result.wins = 1;
                    result.result1 = "W-" + selection1[0].seriesWinner+"/"+selection1[0].handicap;
                    result.result2 = "NO GAME";
                    if(handicap1)
                    {
                        result.budget = result.budget + ((individualBetAmount * momio)*1);
                    }
                    else if(handicap1){
                        result.budget = result.budget + ((individualBetAmount * momio)*1);
                    }
                    else if(isPush1)
                    {
                        result.budget = result.budget + ((individualBetAmount));
                    }
                    else{
                        result.budget = result.budget;
                    }
                }
                else{
                    result.result1 = "L-" + selection1[0].seriesWinner+"/"+selection1[0].handicap;
                    result.result2 = "NO GAME";
                    result.budget = result.budget;
                }
            }
            else if(selection2.length >= 1 && selection2[0].handicap > 1){
                result.budget = result.budget - (individualBetAmount * 1);
                if(win2)
                {
                    result.wins = 1;
                    result.result1 = "NO GAME";
                    result.result2 = "W-" + selection2[0].formulaWinner+"/"+selection2[0].handicap;
                    if(handicap2)
                    {
                        result.budget = result.budget + ((individualBetAmount * momio)*1);
                    }
                    else if(handicap2){
                        result.budget = result.budget + ((individualBetAmount * momio)*1);
                    }
                    else if(isPush2)
                    {
                        result.budget = result.budget + ((individualBetAmount));
                    }
                    else{
                        result.budget = result.budget;
                    }
                }
                else{
                    result.result1 = "NO GAME";
                    result.result2 = "L-" + selection2[0].formulaWinner+"/"+selection2[0].handicap;
                    result.budget = result.budget;
                }
            }
            
            allResults.push(result);
            
        }
        console.log(allResults);
        await save("DayByDayResults", allResults, function(){}, "replace", "GameByGame");

        var days = {Mon:{wins:0, loses:0, pushes:0},Tue:{wins:0, loses:0, pushes:0}, Wed:{wins:0, loses:0, pushes:0},
                    Thu:{wins:0, loses:0, pushes:0},Fri:{wins:0, loses:0, pushes:0}, Sat:{wins:0, loses:0, pushes:0}, 
                    Sun:{wins:0, loses:0, pushes:0}};

        var winninigTeams = [];
        var losingTeams = [];
        var weekResults = {from:"", to:"",wins:0, pushes:0, loses:0};
        var counter = 0;
        var weekByWeekResults = [];
        for (let as = 0; as < allResults.length; as++) {
            const day = allResults[as];
            
            
            if(day.dayOfWeek == "Mon")
            {
                counter = 0;
                weekResults = {from:day.day, to:"", wins:0, pushes:0, loses:0};
            }
            if(day.wins == 1)
            {
                days[day.dayOfWeek].pushes++;
                weekResults.pushes++;
            }
            else if(day.wins == 2){
                days[day.dayOfWeek].wins++;
                weekResults.wins++;
            }
            else{
                days[day.dayOfWeek].loses++;
                weekResults.loses++;
            }
            counter++;
            if(day.dayOfWeek == "Sun" || as == (allResults.length-1))
            {
                weekResults.to = day.day
                weekByWeekResults.push(weekResults);
            }

            if(day.result1.indexOf("L-") >= 0)
            {
                losingTeams.push(day.result1.split("/")[0].split("-")[1]);
            }
            else{
                winninigTeams.push(day.result1.split("/")[0].split("-")[1]);
            }
        }          
        
        const winninigTeamsCounts = {};
        winninigTeams.forEach(function (x) { winninigTeamsCounts[x] = (winninigTeamsCounts[x] || 0) + 1; });

        const losingTeamsCounts = {};
        losingTeams.forEach(function (x) { losingTeamsCounts[x] = (losingTeamsCounts[x] || 0) + 1; });

        var resultsStats = {daysResult: days, winninigTeams: winninigTeamsCounts, losingTeams:losingTeamsCounts};
       
        await save("DayByDayResultsSumary", resultsStats, function(){}, "replace", "GameByGame");

        await save("DayByDayWeekByWeekResults", weekByWeekResults, function(){}, "replace", "GameByGame");
        


    }

    async function GetResultDetails(date, game, expectedWinner)
    {

        if(game.away.indexOf("TOR") >= 0 ||game.home.indexOf("TOR") >= 0)
            {
                if(game.away.indexOf("TOR") >= 0)
                {
                    game.away = "TORBlue Jays";
                }

                if(game.home.indexOf("TOR") >= 0)
                {
                    game.home = "TORBlue Jays";
                }
            }

            if(game.away.indexOf("White") >= 0 ||game.home.indexOf("White") >= 0)
            {
                if(game.away.indexOf("White") >= 0)
                {
                    game.away = "CHIWhite Sox";
                }

                if(game.home.indexOf("White") >= 0)
                {
                    game.home = "CHIWhite Sox";
                }
            }
            if(game.away.indexOf("BOSRed") >= 0 ||game.home.indexOf("BOSRed") >= 0)
            {
                if(game.away.indexOf("BOSRed") >= 0)
                {
                    game.away = "BOSRed Sox";
                }

                if(game.home.indexOf("BOSRed") >= 0)
                {
                    game.home = "BOSRed Sox";
                }
            }

            var gamesDet =[];
            var isHomeOrAway = "";
            try{
                var gamesDet = await load("Games"+game.away+"Details", "GameByGame");
                isHomeOrAway = "away";
            }
            catch{
                var gamesDet = await load("Games"+game.home+"Details", "GameByGame");
                isHomeOrAway = "home";
            }

            var fullMonth = date.split(/[0-9]/)[0];
            var targetMonth = fullMonth.substring(0,3);
            var targetDate = date.replace(fullMonth, "").replace("th","").replace("rd","").replace("nd","").replace("st","");
            var datee = targetMonth + " " +targetDate;
            var targetGame = gamesDet.games.filter(function(item){
                var dat = item.date.split(" ")[1] + " " + item.date.split(" ")[2];
                
                return dat.toLowerCase() == datee.toLocaleLowerCase(); 
            })[0];
        if(targetGame)
        {
            var awayTotalRuns = parseInt(targetGame.awayDetails.runsHitsDeatils[0].R);
            var awayF5Runs =  parseInt(targetGame.awayDetails.runsHitsDeatils[0]["1"]);
                awayF5Runs += parseInt(targetGame.awayDetails.runsHitsDeatils[0]["2"])
                awayF5Runs += parseInt(targetGame.awayDetails.runsHitsDeatils[0]["3"])
                awayF5Runs += parseInt(targetGame.awayDetails.runsHitsDeatils[0]["4"])
                awayF5Runs += parseInt(targetGame.awayDetails.runsHitsDeatils[0]["5"])
            var awayAfter5Runs = awayTotalRuns - awayF5Runs;

            var homeTotalRuns = parseInt(targetGame.homeDetails.runsHitsDeatils[0].R);
            var homeF5Runs =  parseInt(targetGame.homeDetails.runsHitsDeatils[0]["1"]);
                homeF5Runs += parseInt(targetGame.homeDetails.runsHitsDeatils[0]["2"])
                homeF5Runs += parseInt(targetGame.homeDetails.runsHitsDeatils[0]["3"])
                homeF5Runs += parseInt(targetGame.homeDetails.runsHitsDeatils[0]["4"])
                homeF5Runs += parseInt(targetGame.homeDetails.runsHitsDeatils[0]["5"])
            var homeAfter5Runs = homeTotalRuns - homeF5Runs;
            
            game.homeTotalRuns = homeTotalRuns;
            game.awayTotalRuns = awayTotalRuns;

            game.f5Winner = awayF5Runs > homeF5Runs ? game.away : homeF5Runs > awayF5Runs ? game.home : "Draw";

            game.finalWinner = awayTotalRuns > homeTotalRuns ? game.away : homeTotalRuns > awayTotalRuns ? game.home: "Draw";

            if(game.f5Winner.indexOf(expectedWinner) >= 0)
            {
                game.handicapF5 = awayF5Runs > homeF5Runs ? awayF5Runs - homeF5Runs :  homeF5Runs - awayF5Runs;
            }
            else{
                game.handicapF5 = awayF5Runs > homeF5Runs ? homeF5Runs - awayF5Runs : awayF5Runs - homeF5Runs;
            }

            if(game.finalWinner.indexOf(expectedWinner) >= 0)
            {
                game.handicap = awayTotalRuns > homeTotalRuns ? awayTotalRuns - homeTotalRuns :  homeTotalRuns - awayTotalRuns;
            }
            else{
                game.handicap = awayTotalRuns > homeTotalRuns ? homeTotalRuns - awayTotalRuns : awayTotalRuns - homeTotalRuns;
            }

            game.F5Winner = game.f5Winner.indexOf(expectedWinner) >= 0 ? 1 : 0;

            game.FinalWinner = game.finalWinner.indexOf(expectedWinner) >= 0 ? 1 : 0;
            
        }
        return game;
    }

    async function GetPreviousResultDetails(date, game, expectedWinner, year)
    {

        if(game.away.indexOf("TOR") >= 0 ||game.home.indexOf("TOR") >= 0)
            {
                if(game.away.indexOf("TOR") >= 0)
                {
                    game.away = "TORBlue Jays";
                }

                if(game.home.indexOf("TOR") >= 0)
                {
                    game.home = "TORBlue Jays";
                }
            }

            if(game.away.indexOf("White") >= 0 ||game.home.indexOf("White") >= 0)
            {
                if(game.away.indexOf("White") >= 0)
                {
                    game.away = "CHIWhite Sox";
                }

                if(game.home.indexOf("White") >= 0)
                {
                    game.home = "CHIWhite Sox";
                }
            }
            if(game.away.indexOf("BOSRed") >= 0 ||game.home.indexOf("BOSRed") >= 0)
            {
                if(game.away.indexOf("BOSRed") >= 0)
                {
                    game.away = "BOSRed Sox";
                }

                if(game.home.indexOf("BOSRed") >= 0)
                {
                    game.home = "BOSRed Sox";
                }
            }

            var gamesDet =[];
            var isHomeOrAway = "";
            try{
                var gamesDet = await load("Games"+game.away+"Details", year);
                isHomeOrAway = "away";
            }
            catch{
                var gamesDet = await load("Games"+game.home+"Details", year);
                isHomeOrAway = "home";
            }

            var fullMonth = date.split(/[0-9]/)[0];
            var targetMonth = fullMonth.substring(0,3);
            var targetDate = date.replace(fullMonth, "").replace("th","").replace("rd","").replace("nd","").replace("st","");
            var datee = targetMonth + " " +targetDate;
            var targetGame = gamesDet.games.filter(function(item){
                var dat = item.date.split(" ")[1] + " " + item.date.split(" ")[2];
                
                return dat.toLowerCase() == datee.toLocaleLowerCase(); 
            })[0];
        if(targetGame)
        {
            var awayTotalRuns = parseInt(targetGame.awayDetails.runsHitsDeatils[0].R);
            var awayF5Runs =  parseInt(targetGame.awayDetails.runsHitsDeatils[0]["1"]);
                awayF5Runs += parseInt(targetGame.awayDetails.runsHitsDeatils[0]["2"])
                awayF5Runs += parseInt(targetGame.awayDetails.runsHitsDeatils[0]["3"])
                awayF5Runs += parseInt(targetGame.awayDetails.runsHitsDeatils[0]["4"])
                awayF5Runs += parseInt(targetGame.awayDetails.runsHitsDeatils[0]["5"])
            var awayAfter5Runs = awayTotalRuns - awayF5Runs;

            var homeTotalRuns = parseInt(targetGame.homeDetails.runsHitsDeatils[0].R);
            var homeF5Runs =  parseInt(targetGame.homeDetails.runsHitsDeatils[0]["1"]);
                homeF5Runs += parseInt(targetGame.homeDetails.runsHitsDeatils[0]["2"])
                homeF5Runs += parseInt(targetGame.homeDetails.runsHitsDeatils[0]["3"])
                homeF5Runs += parseInt(targetGame.homeDetails.runsHitsDeatils[0]["4"])
                homeF5Runs += parseInt(targetGame.homeDetails.runsHitsDeatils[0]["5"])
            var homeAfter5Runs = homeTotalRuns - homeF5Runs;
            
            game.homeTotalRuns = homeTotalRuns;
            game.awayTotalRuns = awayTotalRuns;
            game.awayF5Runs = awayF5Runs;
            game.homeF5Runs = homeF5Runs;
            game.f5Winner = awayF5Runs > homeF5Runs ? game.away : homeF5Runs > awayF5Runs ? game.home : "Draw";

            game.finalWinner = awayTotalRuns > homeTotalRuns ? game.away : homeTotalRuns > awayTotalRuns ? game.home: "Draw";

            if(game.f5Winner.indexOf(expectedWinner) >= 0)
            {
                game.handicapF5 = awayF5Runs > homeF5Runs ? awayF5Runs - homeF5Runs :  homeF5Runs - awayF5Runs;
            }
            else{
                game.handicapF5 = awayF5Runs > homeF5Runs ? homeF5Runs - awayF5Runs : awayF5Runs - homeF5Runs;
            }

            if(game.finalWinner.indexOf(expectedWinner) >= 0)
            {
                game.handicap = awayTotalRuns > homeTotalRuns ? awayTotalRuns - homeTotalRuns :  homeTotalRuns - awayTotalRuns;
            }
            else{
                game.handicap = awayTotalRuns > homeTotalRuns ? homeTotalRuns - awayTotalRuns : awayTotalRuns - homeTotalRuns;
            }

            game.F5Winner = game.f5Winner.indexOf(expectedWinner) >= 0 ? 1 : 0;

            game.FinalWinner = game.finalWinner.indexOf(expectedWinner) >= 0 ? 1 : 0;
            
        }
        return game;
    }

    async function EvaluateResultsPrototype(date, stringDate)
    {
        var d = new Date(stringDate);
        var dayOfWeek = d.toDateString().split(" ")[0];
        var games = await load(date+"FinalSelections");

        if(date == "May20th")
        {
            var stopHere = "";
        }
        //console.log(date);
        
        // var homeSortedGames = await sorting(games,"homeNextWinningPercentage", "desc");
        // var awaySortedGames = await sorting(games,"awayNextWinningPercentage", "desc");
//-----------------------------------------33%----------------------------------------------------------
        // var games = games.filter(function(item){
        //     return item.home != item.nextWinners;
        // });

        // gameSelected = await sorting(games,"formulahomeWinPercentage", "asc");

//--------------------------------27%-------------------------------------------------------------------

// var games = games.filter(function(item){
//     return item.away != item.overallWinner;
// });

// gameSelected = await sorting(games,"formulahomeWinPercentage", "asc");

//---------------------------------------19%------------------------------------------------------------

// var games = games.filter(function(item){
//     return item.nextWinners == item.overallWinner && item.formulaWinner == item.overallWinner && item.seriesWinner == item.overallWinner  ;
// });

gameSelected = await sorting(games,"homeTotalPercentage", "desc");

        // var homeGamesL = homeGames.filter(function(item){
        //     return item.homeCurrentStreak.indexOf("L") >= 0;
        // });
        // if(homeGamesL.length >= 1)
        // {
        //     homeGames = homeGamesL;
        // }

        // var homeSortedGames = await sorting(homeGames,"homeCurrentStreak", "asc");

        // var homeWorstStreak = homeSortedGames[homeSortedGames.length-1];

        // var homeSortedGames = homeSortedGames.filter(function(item){
        //     return item.homeCurrentStreak == homeWorstStreak.homeCurrentStreak;
        // });

        // var awayGames = awaySortedGames.filter(function(item){
        //     return item.awayNextWinningPercentage == awaySortedGames[0].awayNextWinningPercentage;
        // });

        // var awayGamesL = awayGames.filter(function(item){
        //     return item.awayCurrentStreak.indexOf("L") >= 0;
        // });

        // if(awayGamesL.length >= 1)
        // {
        //     awayGames = awayGamesL;
        // }

        // var awaySortedGames = await sorting(awayGames,"awayCurrentStreak", "asc");

        // var awayWorstStreak = awaySortedGames[awaySortedGames.length-1];

        // var awaySortedGames = awaySortedGames.filter(function(item){
        //     return item.awayCurrentStreak == awayWorstStreak.awayCurrentStreak;
        // });





        // var homeGamesS = homeSortedGames.map(function(item){
        //     return {team : item.home, average:  (item.formulahomeWinPercentage + item.homeSeriesPercentage)/2};
        // });

        // var awayGamesS = awaySortedGames.map(function(item){
        //     return {team : item.away, average: (item.formulaawayWinPercentage + item.awaySeriesPercentage)/2
        //     };
        // });

        // var allGames = homeGamesS.concat(awayGamesS); 

        // var allGamesSorted = await sorting(allGames,"average", "desc");

        // var gameSelected = games.filter(function(item){
        //     return item.home == allGamesSorted[0].team || item.away == allGamesSorted[0].team;
        // });


        games = [];
        if(gameSelected.length >=1)
        {
            games.push(gameSelected[0]);
        }
        // if(gameSelected.length > 1)
        // {
        //     games.push(gameSelected[1]);
        // }
        var F5FormulaWinnerSum = 0; 
        var F5SeriesWinnerSum = 0;
        var F5NextWinnerSum = 0; 
        var F5OverallWinnerSum = 0; 

        var FinalFormulaWinnerSum = 0;  
        var FinalSeriesWinnerSum = 0; 
        var FinalNextWinnerSum = 0; 
        var FinalOverallWinnerSum = 0; 
        var formulaWinner = "";
        var handicap = 0;
        var handicapF5 = 0;

        try{
            var stats = await load("ResultsFormulaWinner","GameByGame");
            var exists = stats.findIndex(x => x.date == date);
            if(exists >=0)
            {
               stats.splice(exists, 1);
            }
        }
        catch{
            var stats = [];
        }

        var selectionGamesCount = 0;
        for (let index = 0; index < games.length; index++) {
            const game = games[index];
            // if(game.formulaWinner == game.seriesWinner)
            // {
                    if(game.away.indexOf("TOR") >= 0 ||game.home.indexOf("TOR") >= 0)
                    {
                        if(game.away.indexOf("TOR") >= 0)
                        {
                            game.away = "TORBlue Jays";
                        }

                        if(game.home.indexOf("TOR") >= 0)
                        {
                            game.home = "TORBlue Jays";
                        }
                    }

                    if(game.away.indexOf("White") >= 0 ||game.home.indexOf("White") >= 0)
                    {
                        if(game.away.indexOf("White") >= 0)
                        {
                            game.away = "CHIWhite Sox";
                        }

                        if(game.home.indexOf("White") >= 0)
                        {
                            game.home = "CHIWhite Sox";
                        }
                    }
                    if(game.away.indexOf("BOSRed") >= 0 ||game.home.indexOf("BOSRed") >= 0)
                    {
                        if(game.away.indexOf("BOSRed") >= 0)
                        {
                            game.away = "BOSRed Sox";
                        }

                        if(game.home.indexOf("BOSRed") >= 0)
                        {
                            game.home = "BOSRed Sox";
                        }
                    }

                    selectionGamesCount++;
                    var gamesDet =[];
                    var isHomeOrAway = "";
                    try{
                        var gamesDet = await load("Games"+game.away+"Details", "GameByGame");
                        isHomeOrAway = "away";
                    }
                    catch{
                        var gamesDet = await load("Games"+game.home+"Details", "GameByGame");
                        isHomeOrAway = "home";
                    }

                    var fullMonth = date.split(/[0-9]/)[0];
                    var targetMonth = fullMonth.substring(0,3);
                    var targetDate = date.replace(fullMonth, "").replace("th","").replace("rd","").replace("nd","").replace("st","");
                    var datee = targetMonth + " " +targetDate;
                    var targetGame = gamesDet.games.filter(function(item){
                        var dat = item.date.split(" ")[1] + " " + item.date.split(" ")[2];
                        
                        return dat.toLowerCase() == datee.toLocaleLowerCase(); 
                    })[0];
                    if(targetGame)
                    {
                    var awayTotalRuns = parseInt(targetGame.awayDetails.runsHitsDeatils[0].R);
                    var awayF5Runs =  parseInt(targetGame.awayDetails.runsHitsDeatils[0]["1"]);
                        awayF5Runs += parseInt(targetGame.awayDetails.runsHitsDeatils[0]["2"])
                        awayF5Runs += parseInt(targetGame.awayDetails.runsHitsDeatils[0]["3"])
                        awayF5Runs += parseInt(targetGame.awayDetails.runsHitsDeatils[0]["4"])
                        awayF5Runs += parseInt(targetGame.awayDetails.runsHitsDeatils[0]["5"])
                    var awayAfter5Runs = awayTotalRuns - awayF5Runs;

                    var homeTotalRuns = parseInt(targetGame.homeDetails.runsHitsDeatils[0].R);
                    var homeF5Runs =  parseInt(targetGame.homeDetails.runsHitsDeatils[0]["1"]);
                        homeF5Runs += parseInt(targetGame.homeDetails.runsHitsDeatils[0]["2"])
                        homeF5Runs += parseInt(targetGame.homeDetails.runsHitsDeatils[0]["3"])
                        homeF5Runs += parseInt(targetGame.homeDetails.runsHitsDeatils[0]["4"])
                        homeF5Runs += parseInt(targetGame.homeDetails.runsHitsDeatils[0]["5"])
                    var homeAfter5Runs = homeTotalRuns - homeF5Runs;


                    game.F5Winner = awayF5Runs > homeF5Runs ? game.away : homeF5Runs > awayF5Runs ? game.home : "Draw";

                    game.finalWinner = awayTotalRuns > homeTotalRuns ? game.away : homeTotalRuns > awayTotalRuns ? game.home: "Draw";

                    if(game.F5Winner.indexOf(game.formulaWinner) >= 0)
                    {
                        handicapF5 = awayF5Runs > homeF5Runs ? awayF5Runs - homeF5Runs :  homeF5Runs - awayF5Runs;
                    }
                    else{
                        handicapF5 = awayF5Runs > homeF5Runs ? homeF5Runs - awayF5Runs : awayF5Runs - homeF5Runs;
                    }

                    if(game.finalWinner.indexOf(game.formulaWinner) >= 0)
                    {
                        handicap += awayTotalRuns > homeTotalRuns ? awayTotalRuns - homeTotalRuns :  homeTotalRuns - awayTotalRuns;
                    }
                    else{
                        handicap += awayTotalRuns > homeTotalRuns ? homeTotalRuns - awayTotalRuns : awayTotalRuns - homeTotalRuns;
                    }

                    game.F5FormulaWinner = game.F5Winner.indexOf(game.formulaWinner) >= 0 ? 1 : 0;
                    game.F5SeriesWinner = game.F5Winner.indexOf(game.seriesWinner) >= 0 ? 1 : 0;
                    game.F5NextWinner = game.F5Winner.indexOf(game.nextWinners) >= 0 ? 1 : 0;
                    game.F5OverallWinner = game.F5Winner.indexOf(game.overallWinner) >= 0 ? 1 : 0;

                    game.FinalFormulaWinner = game.finalWinner.indexOf(game.formulaWinner) >= 0 ? 1 : 0;
                    game.FinalSeriesWinner = game.finalWinner.indexOf(game.seriesWinner) >= 0 ? 1 : 0;
                    game.FinalNextWinner = game.finalWinner.indexOf(game.nextWinners) >= 0 ? 1 : 0;
                    game.FinalOverallWinner = game.finalWinner.indexOf(game.overallWinner) >= 0 ? 1 : 0;

                    formulaWinner = game.formulaWinner;
                    
                    F5FormulaWinnerSum += game.F5FormulaWinner;
                    F5SeriesWinnerSum += game.F5SeriesWinner;
                    F5NextWinnerSum += game.F5NextWinner; 
                    F5OverallWinnerSum += game.F5OverallWinner; 
                    FinalFormulaWinnerSum += game.FinalFormulaWinner;
                    FinalSeriesWinnerSum += game.FinalSeriesWinner;
                    FinalNextWinnerSum += game.FinalNextWinner; 
                    FinalOverallWinnerSum += game.FinalOverallWinner; 


                    //await save(date+"FinalSelections", games, function(){}, "replace");
                }
                else{
                    //console.log(date + "Winner = "+ game.formulaWinner);
                    formulaWinner = game.formulaWinner;
                    F5FormulaWinnerSum = 0;
                    F5SeriesWinnerSum = 0;
                    F5NextWinnerSum = 0;
                    F5OverallWinnerSum = 0;
                    FinalFormulaWinnerSum = 0;
                    FinalSeriesWinnerSum = 0;
                    FinalNextWinnerSum = 0;
                    FinalOverallWinnerSum = 0;
                    handicap = "Pending Game"
                }
        //}
        }

        var stat = {
                date: date,
                dayOfWeek:dayOfWeek,
                F5FormulaWinnerPer : (F5FormulaWinnerSum*100)/selectionGamesCount,
                F5SeriesWinnerPer : (F5SeriesWinnerSum*100)/selectionGamesCount,
                F5NextWinnerPer : (F5NextWinnerSum*100)/selectionGamesCount, 
                F5OverallWinnerPer : (F5OverallWinnerSum*100)/selectionGamesCount, 
                FinalFormulaWinnerPer : (FinalFormulaWinnerSum*100)/selectionGamesCount,
                FinalSeriesWinnerPer : (FinalSeriesWinnerSum*100)/selectionGamesCount,
                FinalNextWinnerPer : (FinalNextWinnerSum*100)/selectionGamesCount, 
                FinalOverallWinnerPer : (FinalOverallWinnerSum*100)/selectionGamesCount, 
                NumberOGames: selectionGamesCount,
                formulaWinner: formulaWinner,
                handicap: handicap,
                handicapF5: handicapF5
        }

        stats.push(stat);
        //console.log(stats);
        await save("ResultsFormulaWinner", stats, function(){}, "replace", "GameByGame");
        
        
    }

    async function CleanUpAndGenerateStats(datesAnalysis, currentMonth, currentDay)
    {
        // var date = "May15th";

        // var games = await load(date+"FinalSelections");

        // var keys = Object.keys(games[0]);

        // var evaluationKeys = [];
        //     for (let sds = 0; sds < keys.length; sds++) {
        //         const key = keys[sds];
                
        //         var isNum = parseFloat(games[0][key]);
        //         if(!isNaN(isNum))
        //         {
        //             evaluationKeys.push(key);
        //         }
                
        //     }

        // var selectedProperty = "";
        // var orderByDirection = "";
        // var generalStats = [];
        // for (let tet = 0; tet < evaluationKeys.length; tet++) {
        //     const key = evaluationKeys[tet];
        //     selectedProperty = key;
        //     orderByDirection = "desc";
            
        //     await save("GeneralStats"+selectedProperty+orderByDirection, generalStats, function(){}, "replace", "GameByGame");

        // }
        //await save("ExpectedResults", generalStats, function(){}, "replace", "GameByGame");
        //

        for (let te = 0; te < datesAnalysis.length; te++) {
            const mmonth = datesAnalysis[te];
        
                    for (let index =mmonth.from; index <= mmonth.to; index++)
                    {
                    if((currentMonth == null && currentDay ==null)||((mmonth.month == currentMonth.month && index < currentDay) || (currentMonth.month == 'May' && mmonth.month == "April"))){
                        var selectedDate = mmonth.month+ (index-1);//Change to index only if you want to process all date, index-1 if you want to pass the current day
                        if((index-1) == 1 || (index-1) == 31)
                        {
                            selectedDate += "st";
                        }
                        else if((index-1) == 3)
                        {
                            selectedDate += "rd";
            
                        }
                        else{
                            selectedDate += "th";
                        }
                        if((index-1) <10)
                        {
                            var descriptiveDate = "2024-"+mmonth.monthNumber+"-0"+index;
                        }
                        else{
                            var descriptiveDate = "2024-"+mmonth.monthNumber+"-"+index;
                        }

                        //selectedDate = "October5th";
            
                        await EvaluateAllPatterns(selectedDate,mmonth.month+" "+index+", 2024" );
                        await EvaluateOverUnderPatterns(selectedDate,mmonth.month+" "+index+", 2024" );
                        await ProcessGeneralStats(selectedDate);
                        await GetBetterPatterns(selectedDate);
            
                        }
                        else{
                            //break;
                            var stopHere = "";
                        }
                    }
                }

                
    }

    async function EvaluateOverUnderPatterns(date, stringDate)
    {
        var d = new Date(stringDate);
        var dayOfWeek = d.toDateString().split(" ")[0];
        var games = await load(date+"FinalSelections");

        var keys = Object.keys(games[0]);

        var evaluationKeys = [];
    for (let sds = 0; sds < keys.length; sds++) {
        const key = keys[sds];
        
        var isNum = parseFloat(games[0][key]);
        if(!isNaN(isNum))
        {
            evaluationKeys.push(key);
        }
        
    }

        if(date == "May20th")
        {
            var stopHere = "";
        }
        //console.log(date);
        
        // var homeSortedGames = await sorting(games,"homeNextWinningPercentage", "desc");
        // var awaySortedGames = await sorting(games,"awayNextWinningPercentage", "desc");
//-----------------------------------------33%----------------------------------------------------------
        // var games = games.filter(function(item){
        //     return item.home != item.nextWinners;
        // });

        // gameSelected = await sorting(games,"formulahomeWinPercentage", "asc");

//--------------------------------27%-------------------------------------------------------------------

// var games = games.filter(function(item){
//     return item.away != item.overallWinner;
// });

var selectedProperty = "";
var orderByDirection = "";
for (let tet = 0; tet < evaluationKeys.length; tet++) {
    const key = evaluationKeys[tet];
    selectedProperty = key;
    orderByDirection = "desc";





gameSelected = await sorting(games, selectedProperty, orderByDirection);

//---------------------------------------19%------------------------------------------------------------

// var games = games.filter(function(item){
//     return item.nextWinners == item.overallWinner && item.formulaWinner == item.overallWinner && item.seriesWinner == item.overallWinner  ;
// });

//gameSelected = await sorting(games,"homeTotalPercentage", "desc");

        // var homeGamesL = homeGames.filter(function(item){
        //     return item.homeCurrentStreak.indexOf("L") >= 0;
        // });
        // if(homeGamesL.length >= 1)
        // {
        //     homeGames = homeGamesL;
        // }

        // var homeSortedGames = await sorting(homeGames,"homeCurrentStreak", "asc");

        // var homeWorstStreak = homeSortedGames[homeSortedGames.length-1];

        // var homeSortedGames = homeSortedGames.filter(function(item){
        //     return item.homeCurrentStreak == homeWorstStreak.homeCurrentStreak;
        // });

        // var awayGames = awaySortedGames.filter(function(item){
        //     return item.awayNextWinningPercentage == awaySortedGames[0].awayNextWinningPercentage;
        // });

        // var awayGamesL = awayGames.filter(function(item){
        //     return item.awayCurrentStreak.indexOf("L") >= 0;
        // });

        // if(awayGamesL.length >= 1)
        // {
        //     awayGames = awayGamesL;
        // }

        // var awaySortedGames = await sorting(awayGames,"awayCurrentStreak", "asc");

        // var awayWorstStreak = awaySortedGames[awaySortedGames.length-1];

        // var awaySortedGames = awaySortedGames.filter(function(item){
        //     return item.awayCurrentStreak == awayWorstStreak.awayCurrentStreak;
        // });





        // var homeGamesS = homeSortedGames.map(function(item){
        //     return {team : item.home, average:  (item.formulahomeWinPercentage + item.homeSeriesPercentage)/2};
        // });

        // var awayGamesS = awaySortedGames.map(function(item){
        //     return {team : item.away, average: (item.formulaawayWinPercentage + item.awaySeriesPercentage)/2
        //     };
        // });

        // var allGames = homeGamesS.concat(awayGamesS); 

        // var allGamesSorted = await sorting(allGames,"average", "desc");

        // var gameSelected = games.filter(function(item){
        //     return item.home == allGamesSorted[0].team || item.away == allGamesSorted[0].team;
        // });


        games = gameSelected;
        // if(gameSelected.length >=1)
        // {
        //     games.push(gameSelected[0]);
        // }
        // if(gameSelected.length > 1)
        // {
        //     games.push(gameSelected[1]);
        // }
        var F5FormulaWinnerSum = 0; 
        var F5SeriesWinnerSum = 0;
        var F5NextWinnerSum = 0; 
        var F5OverallWinnerSum = 0; 

        var FinalFormulaWinnerSum = 0;  
        var FinalSeriesWinnerSum = 0; 
        var FinalNextWinnerSum = 0; 
        var FinalOverallWinnerSum = 0; 
        var formulaWinner = "";
        var handicap = 0;
        var handicapF5 = 0;

        try{
            var generalStats = await load("GeneralStats"+selectedProperty+orderByDirection, "GameByGame");
        }
        catch{
            var generalStats = [];
        }

        try{
            var stats = await load("ResultsFormulaWinner","GameByGame");
            var exists = stats.findIndex(x => x.date == date);
            if(exists >=0)
            {
               stats.splice(exists, 1);
            }
        }
        catch{
            var stats = [];
        }

        var selectionGamesCount = 0;
        for (let index = 0; index < games.length; index++) {
            const game = games[index];
            if(games.length > 16)
            {
                var stopHere = "";
            }
            var indexExists = generalStats.findIndex(x => x.index == index);
            if(indexExists >=0)
            {
               var record = generalStats[indexExists];
            }
            else{

               var record = {
                    index: index,
                    F5FormulaWinner: 0, 
                    F5SeriesWinner: 0,
                    F5NextWinner: 0,
                    F5OverallWinner: 0,
                    FinalFormulaWinner: 0,
                    FinalSeriesWinner: 0,
                    FinalNextWinner: 0,
                    FinalOverallWinner: 0,
                    selectedProperty: "",
                    orderByDirection: "",
                    propertyValue :0,
                    handicapF5:0,
                    handicap: 0,
                    count: 0
               }
               generalStats.push(record);
               record = generalStats[index];
            }
            // if(game.formulaWinner == game.seriesWinner)
            // {
                    if(game.away.indexOf("TOR") >= 0 ||game.home.indexOf("TOR") >= 0)
                    {
                        if(game.away.indexOf("TOR") >= 0)
                        {
                            game.away = "TORBlue Jays";
                        }

                        if(game.home.indexOf("TOR") >= 0)
                        {
                            game.home = "TORBlue Jays";
                        }
                    }

                    if(game.away.indexOf("White") >= 0 ||game.home.indexOf("White") >= 0)
                    {
                        if(game.away.indexOf("White") >= 0)
                        {
                            game.away = "CHIWhite Sox";
                        }

                        if(game.home.indexOf("White") >= 0)
                        {
                            game.home = "CHIWhite Sox";
                        }
                    }
                    if(game.away.indexOf("BOSRed") >= 0 ||game.home.indexOf("BOSRed") >= 0)
                    {
                        if(game.away.indexOf("BOSRed") >= 0)
                        {
                            game.away = "BOSRed Sox";
                        }

                        if(game.home.indexOf("BOSRed") >= 0)
                        {
                            game.home = "BOSRed Sox";
                        }
                    }

                    selectionGamesCount++;
                    var gamesDet =[];
                    var isHomeOrAway = "";
                    try{
                        var gamesDet = await load("Games"+game.away+"Details", "GameByGame");
                        isHomeOrAway = "away";
                    }
                    catch{
                        var gamesDet = await load("Games"+game.home+"Details", "GameByGame");
                        isHomeOrAway = "home";
                    }

                    var fullMonth = date.split(/[0-9]/)[0];
                    var targetMonth = fullMonth.substring(0,3);
                    var targetDate = date.replace(fullMonth, "").replace("th","").replace("rd","").replace("nd","").replace("st","");
                    var datee = targetMonth + " " +targetDate;
                    var targetGame = gamesDet.games.filter(function(item){
                        var dat = item.date.split(" ")[1] + " " + item.date.split(" ")[2];
                        
                        return dat.toLowerCase() == datee.toLocaleLowerCase(); 
                    })[0];
                    if(targetGame)
                    {
                    var awayTotalRuns = parseInt(targetGame.awayDetails.runsHitsDeatils[0].R);
                    var awayF5Runs =  parseInt(targetGame.awayDetails.runsHitsDeatils[0]["1"]);
                        awayF5Runs += parseInt(targetGame.awayDetails.runsHitsDeatils[0]["2"])
                        awayF5Runs += parseInt(targetGame.awayDetails.runsHitsDeatils[0]["3"])
                        awayF5Runs += parseInt(targetGame.awayDetails.runsHitsDeatils[0]["4"])
                        awayF5Runs += parseInt(targetGame.awayDetails.runsHitsDeatils[0]["5"])
                    var awayAfter5Runs = awayTotalRuns - awayF5Runs;

                    var homeTotalRuns = parseInt(targetGame.homeDetails.runsHitsDeatils[0].R);
                    var homeF5Runs =  parseInt(targetGame.homeDetails.runsHitsDeatils[0]["1"]);
                        homeF5Runs += parseInt(targetGame.homeDetails.runsHitsDeatils[0]["2"])
                        homeF5Runs += parseInt(targetGame.homeDetails.runsHitsDeatils[0]["3"])
                        homeF5Runs += parseInt(targetGame.homeDetails.runsHitsDeatils[0]["4"])
                        homeF5Runs += parseInt(targetGame.homeDetails.runsHitsDeatils[0]["5"])
                    var homeAfter5Runs = homeTotalRuns - homeF5Runs;


                    game.F5Winner = awayF5Runs > homeF5Runs ? game.away : homeF5Runs > awayF5Runs ? game.home : "Draw";

                    game.finalWinner = awayTotalRuns > homeTotalRuns ? game.away : homeTotalRuns > awayTotalRuns ? game.home: "Draw";

                    
                    handicapF5 = awayF5Runs > homeF5Runs ? awayF5Runs - homeF5Runs :  homeF5Runs - awayF5Runs;
                

                    handicap = awayTotalRuns > homeTotalRuns ? awayTotalRuns - homeTotalRuns :  homeTotalRuns - awayTotalRuns;
                    

                    game.F5FormulaWinner = game.F5Winner.indexOf(game.formulaWinner) >= 0 ? 1 : 0;
                    game.F5SeriesWinner = game.F5Winner.indexOf(game.seriesWinner) >= 0 ? 1 : 0;
                    game.F5NextWinner = game.F5Winner.indexOf(game.nextWinners) >= 0 ? 1 : 0;
                    game.F5OverallWinner = game.F5Winner.indexOf(game.overallWinner) >= 0 ? 1 : 0;

                    game.FinalFormulaWinner = game.finalWinner.indexOf(game.formulaWinner) >= 0 ? 1 : 0;
                    game.FinalSeriesWinner = game.finalWinner.indexOf(game.seriesWinner) >= 0 ? 1 : 0;
                    game.FinalNextWinner = game.finalWinner.indexOf(game.nextWinners) >= 0 ? 1 : 0;
                    game.FinalOverallWinner = game.finalWinner.indexOf(game.overallWinner) >= 0 ? 1 : 0;

                    
                    record.F5FormulaWinner+=game.F5FormulaWinner,  
                    record.F5SeriesWinner+= game.F5SeriesWinner, 
                    record.F5NextWinner+= game.F5NextWinner, 
                    record.F5OverallWinner+=game.F5OverallWinner,
                    record.FinalFormulaWinner+= game.FinalFormulaWinner,
                    record.FinalSeriesWinner+= game.FinalSeriesWinner,
                    record.FinalNextWinner+= game.FinalNextWinner,
                    record.FinalOverallWinner+= game.FinalOverallWinner,
                    record.selectedProperty = selectedProperty,
                    record.orderByDirection = orderByDirection,
                    record.propertyValue += game[selectedProperty];
                    record.handicapF5 += handicapF5,
                    record.handicap += handicap,
                    record.count++
                        


                    formulaWinner = game.formulaWinner;
                    
                    F5FormulaWinnerSum += game.F5FormulaWinner;
                    F5SeriesWinnerSum += game.F5SeriesWinner;
                    F5NextWinnerSum += game.F5NextWinner; 
                    F5OverallWinnerSum += game.F5OverallWinner; 
                    FinalFormulaWinnerSum += game.FinalFormulaWinner;
                    FinalSeriesWinnerSum += game.FinalSeriesWinner;
                    FinalNextWinnerSum += game.FinalNextWinner; 
                    FinalOverallWinnerSum += game.FinalOverallWinner; 


                    //await save(date+"FinalSelections", games, function(){}, "replace");
                }
        //}
        }

        var stat = {
                date: date,
                dayOfWeek:dayOfWeek,
                F5FormulaWinnerPer : (F5FormulaWinnerSum*100)/selectionGamesCount,
                F5SeriesWinnerPer : (F5SeriesWinnerSum*100)/selectionGamesCount,
                F5NextWinnerPer : (F5NextWinnerSum*100)/selectionGamesCount, 
                F5OverallWinnerPer : (F5OverallWinnerSum*100)/selectionGamesCount, 
                FinalFormulaWinnerPer : (FinalFormulaWinnerSum*100)/selectionGamesCount,
                FinalSeriesWinnerPer : (FinalSeriesWinnerSum*100)/selectionGamesCount,
                FinalNextWinnerPer : (FinalNextWinnerSum*100)/selectionGamesCount, 
                FinalOverallWinnerPer : (FinalOverallWinnerSum*100)/selectionGamesCount, 
                NumberOGames: selectionGamesCount,
                formulaWinner: formulaWinner,
                handicap: handicap,
                handicapF5: handicapF5
        }

        //stats.push(stat);      
        await save("GeneralStatsOU"+selectedProperty+orderByDirection, generalStats, function(){}, "replace", "GameByGame");
    }
    }

    async function EvaluateAllPatterns(date, stringDate)
    {
        var d = new Date(stringDate);
        var dayOfWeek = d.toDateString().split(" ")[0];
        var games = await load(date+"FinalSelections");

        var keys = Object.keys(games[0]);

        var evaluationKeys = [];
    for (let sds = 0; sds < keys.length; sds++) {
        const key = keys[sds];
        
        var isNum = parseFloat(games[0][key]);
        if(!isNaN(isNum))
        {
            evaluationKeys.push(key);
        }
        
    }

        if(date == "May20th")
        {
            var stopHere = "";
        }
        //console.log(date);
        
        // var homeSortedGames = await sorting(games,"homeNextWinningPercentage", "desc");
        // var awaySortedGames = await sorting(games,"awayNextWinningPercentage", "desc");
//-----------------------------------------33%----------------------------------------------------------
        // var games = games.filter(function(item){
        //     return item.home != item.nextWinners;
        // });

        // gameSelected = await sorting(games,"formulahomeWinPercentage", "asc");

//--------------------------------27%-------------------------------------------------------------------

// var games = games.filter(function(item){
//     return item.away != item.overallWinner;
// });

var selectedProperty = "";
var orderByDirection = "";
for (let tet = 0; tet < evaluationKeys.length; tet++) {
    const key = evaluationKeys[tet];
    selectedProperty = key;
    orderByDirection = "desc";





gameSelected = await sorting(games, selectedProperty, orderByDirection);

//---------------------------------------19%------------------------------------------------------------

// var games = games.filter(function(item){
//     return item.nextWinners == item.overallWinner && item.formulaWinner == item.overallWinner && item.seriesWinner == item.overallWinner  ;
// });

//gameSelected = await sorting(games,"homeTotalPercentage", "desc");

        // var homeGamesL = homeGames.filter(function(item){
        //     return item.homeCurrentStreak.indexOf("L") >= 0;
        // });
        // if(homeGamesL.length >= 1)
        // {
        //     homeGames = homeGamesL;
        // }

        // var homeSortedGames = await sorting(homeGames,"homeCurrentStreak", "asc");

        // var homeWorstStreak = homeSortedGames[homeSortedGames.length-1];

        // var homeSortedGames = homeSortedGames.filter(function(item){
        //     return item.homeCurrentStreak == homeWorstStreak.homeCurrentStreak;
        // });

        // var awayGames = awaySortedGames.filter(function(item){
        //     return item.awayNextWinningPercentage == awaySortedGames[0].awayNextWinningPercentage;
        // });

        // var awayGamesL = awayGames.filter(function(item){
        //     return item.awayCurrentStreak.indexOf("L") >= 0;
        // });

        // if(awayGamesL.length >= 1)
        // {
        //     awayGames = awayGamesL;
        // }

        // var awaySortedGames = await sorting(awayGames,"awayCurrentStreak", "asc");

        // var awayWorstStreak = awaySortedGames[awaySortedGames.length-1];

        // var awaySortedGames = awaySortedGames.filter(function(item){
        //     return item.awayCurrentStreak == awayWorstStreak.awayCurrentStreak;
        // });





        // var homeGamesS = homeSortedGames.map(function(item){
        //     return {team : item.home, average:  (item.formulahomeWinPercentage + item.homeSeriesPercentage)/2};
        // });

        // var awayGamesS = awaySortedGames.map(function(item){
        //     return {team : item.away, average: (item.formulaawayWinPercentage + item.awaySeriesPercentage)/2
        //     };
        // });

        // var allGames = homeGamesS.concat(awayGamesS); 

        // var allGamesSorted = await sorting(allGames,"average", "desc");

        // var gameSelected = games.filter(function(item){
        //     return item.home == allGamesSorted[0].team || item.away == allGamesSorted[0].team;
        // });


        games = gameSelected;
        // if(gameSelected.length >=1)
        // {
        //     games.push(gameSelected[0]);
        // }
        // if(gameSelected.length > 1)
        // {
        //     games.push(gameSelected[1]);
        // }
        var F5FormulaWinnerSum = 0; 
        var F5SeriesWinnerSum = 0;
        var F5NextWinnerSum = 0; 
        var F5OverallWinnerSum = 0; 

        var FinalFormulaWinnerSum = 0;  
        var FinalSeriesWinnerSum = 0; 
        var FinalNextWinnerSum = 0; 
        var FinalOverallWinnerSum = 0; 
        var formulaWinner = "";
        var handicap = 0;
        var handicapF5 = 0;

        try{
            var generalStats = await load("GeneralStats"+selectedProperty+orderByDirection, "GameByGame");
        }
        catch{
            var generalStats = [];
        }

        try{
            var stats = await load("ResultsFormulaWinner","GameByGame");
            var exists = stats.findIndex(x => x.date == date);
            if(exists >=0)
            {
               stats.splice(exists, 1);
            }
        }
        catch{
            var stats = [];
        }

        var selectionGamesCount = 0;
        for (let index = 0; index < games.length; index++) {
            const game = games[index];
            if(games.length > 16)
            {
                var stopHere = "";
            }
            var indexExists = generalStats.findIndex(x => x.index == index);
            if(indexExists >=0)
            {
               var record = generalStats[indexExists];
            }
            else{

               var record = {
                    index: index,
                    F5FormulaWinner: 0, 
                    F5SeriesWinner: 0,
                    F5NextWinner: 0,
                    F5OverallWinner: 0,
                    FinalFormulaWinner: 0,
                    FinalSeriesWinner: 0,
                    FinalNextWinner: 0,
                    FinalOverallWinner: 0,
                    selectedProperty: "",
                    orderByDirection: "",
                    propertyValue :0,
                    handicapF5:0,
                    handicap: 0,
                    count: 0
               }
               generalStats.push(record);
               record = generalStats[index];
            }
            // if(game.formulaWinner == game.seriesWinner)
            // {
                    if(game.away.indexOf("TOR") >= 0 ||game.home.indexOf("TOR") >= 0)
                    {
                        if(game.away.indexOf("TOR") >= 0)
                        {
                            game.away = "TORBlue Jays";
                        }

                        if(game.home.indexOf("TOR") >= 0)
                        {
                            game.home = "TORBlue Jays";
                        }
                    }

                    if(game.away.indexOf("White") >= 0 ||game.home.indexOf("White") >= 0)
                    {
                        if(game.away.indexOf("White") >= 0)
                        {
                            game.away = "CHIWhite Sox";
                        }

                        if(game.home.indexOf("White") >= 0)
                        {
                            game.home = "CHIWhite Sox";
                        }
                    }
                    if(game.away.indexOf("BOSRed") >= 0 ||game.home.indexOf("BOSRed") >= 0)
                    {
                        if(game.away.indexOf("BOSRed") >= 0)
                        {
                            game.away = "BOSRed Sox";
                        }

                        if(game.home.indexOf("BOSRed") >= 0)
                        {
                            game.home = "BOSRed Sox";
                        }
                    }

                    selectionGamesCount++;
                    var gamesDet =[];
                    var isHomeOrAway = "";
                    try{
                        var gamesDet = await load("Games"+game.away+"Details", "GameByGame");
                        isHomeOrAway = "away";
                    }
                    catch{
                        var gamesDet = await load("Games"+game.home+"Details", "GameByGame");
                        isHomeOrAway = "home";
                    }

                    var fullMonth = date.split(/[0-9]/)[0];
                    var targetMonth = fullMonth.substring(0,3);
                    var targetDate = date.replace(fullMonth, "").replace("th","").replace("rd","").replace("nd","").replace("st","");
                    var datee = targetMonth + " " +targetDate;
                    var targetGame = gamesDet.games.filter(function(item){
                        var dat = item.date.split(" ")[1] + " " + item.date.split(" ")[2];
                        
                        return dat.toLowerCase() == datee.toLocaleLowerCase(); 
                    })[0];
                    if(targetGame)
                    {
                    var awayTotalRuns = parseInt(targetGame.awayDetails.runsHitsDeatils[0].R);
                    var awayF5Runs =  parseInt(targetGame.awayDetails.runsHitsDeatils[0]["1"]);
                        awayF5Runs += parseInt(targetGame.awayDetails.runsHitsDeatils[0]["2"])
                        awayF5Runs += parseInt(targetGame.awayDetails.runsHitsDeatils[0]["3"])
                        awayF5Runs += parseInt(targetGame.awayDetails.runsHitsDeatils[0]["4"])
                        awayF5Runs += parseInt(targetGame.awayDetails.runsHitsDeatils[0]["5"])
                    var awayAfter5Runs = awayTotalRuns - awayF5Runs;

                    var homeTotalRuns = parseInt(targetGame.homeDetails.runsHitsDeatils[0].R);
                    var homeF5Runs =  parseInt(targetGame.homeDetails.runsHitsDeatils[0]["1"]);
                        homeF5Runs += parseInt(targetGame.homeDetails.runsHitsDeatils[0]["2"])
                        homeF5Runs += parseInt(targetGame.homeDetails.runsHitsDeatils[0]["3"])
                        homeF5Runs += parseInt(targetGame.homeDetails.runsHitsDeatils[0]["4"])
                        homeF5Runs += parseInt(targetGame.homeDetails.runsHitsDeatils[0]["5"])
                    var homeAfter5Runs = homeTotalRuns - homeF5Runs;


                    game.F5Winner = awayF5Runs > homeF5Runs ? game.away : homeF5Runs > awayF5Runs ? game.home : "Draw";

                    game.finalWinner = awayTotalRuns > homeTotalRuns ? game.away : homeTotalRuns > awayTotalRuns ? game.home: "Draw";

                    
                    handicapF5 = awayF5Runs > homeF5Runs ? awayF5Runs - homeF5Runs :  homeF5Runs - awayF5Runs;
                

                    handicap = awayTotalRuns > homeTotalRuns ? awayTotalRuns - homeTotalRuns :  homeTotalRuns - awayTotalRuns;
                    

                    game.F5FormulaWinner = game.F5Winner.indexOf(game.formulaWinner) >= 0 ? 1 : 0;
                    game.F5SeriesWinner = game.F5Winner.indexOf(game.seriesWinner) >= 0 ? 1 : 0;
                    game.F5NextWinner = game.F5Winner.indexOf(game.nextWinners) >= 0 ? 1 : 0;
                    game.F5OverallWinner = game.F5Winner.indexOf(game.overallWinner) >= 0 ? 1 : 0;

                    game.FinalFormulaWinner = game.finalWinner.indexOf(game.formulaWinner) >= 0 ? 1 : 0;
                    game.FinalSeriesWinner = game.finalWinner.indexOf(game.seriesWinner) >= 0 ? 1 : 0;
                    game.FinalNextWinner = game.finalWinner.indexOf(game.nextWinners) >= 0 ? 1 : 0;
                    game.FinalOverallWinner = game.finalWinner.indexOf(game.overallWinner) >= 0 ? 1 : 0;

                    
                    record.F5FormulaWinner+=game.F5FormulaWinner,  
                    record.F5SeriesWinner+= game.F5SeriesWinner, 
                    record.F5NextWinner+= game.F5NextWinner, 
                    record.F5OverallWinner+=game.F5OverallWinner,
                    record.FinalFormulaWinner+= game.FinalFormulaWinner,
                    record.FinalSeriesWinner+= game.FinalSeriesWinner,
                    record.FinalNextWinner+= game.FinalNextWinner,
                    record.FinalOverallWinner+= game.FinalOverallWinner,
                    record.selectedProperty = selectedProperty,
                    record.orderByDirection = orderByDirection,
                    record.propertyValue += game[selectedProperty];
                    record.handicapF5 += handicapF5,
                    record.handicap += handicap,
                    record.count++
                        


                    formulaWinner = game.formulaWinner;
                    
                    F5FormulaWinnerSum += game.F5FormulaWinner;
                    F5SeriesWinnerSum += game.F5SeriesWinner;
                    F5NextWinnerSum += game.F5NextWinner; 
                    F5OverallWinnerSum += game.F5OverallWinner; 
                    FinalFormulaWinnerSum += game.FinalFormulaWinner;
                    FinalSeriesWinnerSum += game.FinalSeriesWinner;
                    FinalNextWinnerSum += game.FinalNextWinner; 
                    FinalOverallWinnerSum += game.FinalOverallWinner; 


                    //await save(date+"FinalSelections", games, function(){}, "replace");
                }
        //}
        }

        var stat = {
                date: date,
                dayOfWeek:dayOfWeek,
                F5FormulaWinnerPer : (F5FormulaWinnerSum*100)/selectionGamesCount,
                F5SeriesWinnerPer : (F5SeriesWinnerSum*100)/selectionGamesCount,
                F5NextWinnerPer : (F5NextWinnerSum*100)/selectionGamesCount, 
                F5OverallWinnerPer : (F5OverallWinnerSum*100)/selectionGamesCount, 
                FinalFormulaWinnerPer : (FinalFormulaWinnerSum*100)/selectionGamesCount,
                FinalSeriesWinnerPer : (FinalSeriesWinnerSum*100)/selectionGamesCount,
                FinalNextWinnerPer : (FinalNextWinnerSum*100)/selectionGamesCount, 
                FinalOverallWinnerPer : (FinalOverallWinnerSum*100)/selectionGamesCount, 
                NumberOGames: selectionGamesCount,
                formulaWinner: formulaWinner,
                handicap: handicap,
                handicapF5: handicapF5
        }

        //stats.push(stat);      
        await save("GeneralStats"+selectedProperty+orderByDirection, generalStats, function(){}, "replace", "GameByGame");
    }
    }


    async function EvaluateResults(date, stringDate)
    {
        var d = new Date(stringDate);
        var dayOfWeek = d.toDateString().split(" ")[0];
        var games = await load(date+"FinalSelections");

        var teamsSchedule = await load(date+"TeamSchedules");
        var scheduleScope = teamsSchedule.filter(function(item){
            return item.period == 0;         
            });

        if(date == "May20th")
        {
            var stopHere = "";
        }
        //console.log(date);
        
        // var homeSortedGames = await sorting(games,"homeNextWinningPercentage", "desc");
        // var awaySortedGames = await sorting(games,"awayNextWinningPercentage", "desc");
//-----------------------------------------33%----------------------------------------------------------
        // var games = games.filter(function(item){
        //     return item.home != item.nextWinners;
        // });

        // gameSelected = await sorting(games,"formulahomeWinPercentage", "asc");

//--------------------------------27%-------------------------------------------------------------------

// var games = games.filter(function(item){
//     return item.away != item.overallWinner;
// });

// gameSelected = await sorting(games,"formulahomeWinPercentage", "asc");

//---------------------------------------19%------------------------------------------------------------

// var games = games.filter(function(item){
//     return item.nextWinners != item.overallWinner;
//     //return item.nextWinners != item.seriesWinner;
// });

//gameSelected = await sorting(games,"overallDiff", "desc");

// var inf = 0;
// var selIndex = 0;
// while (selIndex == 0 && inf < gameSelected.length) {
//     const gameSel = gameSelected[inf];

//     var scheduleSelected = scheduleScope.filter(function(item){
//         return item.teamName.indexOf(gameSel.seriesWinner) >=0;
//     })[0].scheduleData;

//     var latestRecord = scheduleSelected[scheduleSelected.length-1]["W-L"];

//     var wins = parseInt(latestRecord.split("-")[0]);
//     var loses = parseInt(latestRecord.split("-")[1]);

//     if(wins > loses)
//     {
//         selIndex = inf;
//     }

//     inf++;
// }


///Just this filter 73% 
//gameSelected = await sorting(games,"homeTotalPercentage", "desc");

        // var homeGamesL = homeGames.filter(function(item){
        //     return item.homeCurrentStreak.indexOf("L") >= 0;
        // });
        // if(homeGamesL.length >= 1)
        // {
        //     homeGames = homeGamesL;
        // }

        // var homeSortedGames = await sorting(homeGames,"homeCurrentStreak", "asc");

        // var homeWorstStreak = homeSortedGames[homeSortedGames.length-1];

        // var homeSortedGames = homeSortedGames.filter(function(item){
        //     return item.homeCurrentStreak == homeWorstStreak.homeCurrentStreak;
        // });

        // var awayGames = awaySortedGames.filter(function(item){
        //     return item.awayNextWinningPercentage == awaySortedGames[0].awayNextWinningPercentage;
        // });

        // var awayGamesL = awayGames.filter(function(item){
        //     return item.awayCurrentStreak.indexOf("L") >= 0;
        // });

        // if(awayGamesL.length >= 1)
        // {
        //     awayGames = awayGamesL;
        // }

        // var awaySortedGames = await sorting(awayGames,"awayCurrentStreak", "asc");

        // var awayWorstStreak = awaySortedGames[awaySortedGames.length-1];

        // var awaySortedGames = awaySortedGames.filter(function(item){
        //     return item.awayCurrentStreak == awayWorstStreak.awayCurrentStreak;
        // });





        // var homeGamesS = homeSortedGames.map(function(item){
        //     return {team : item.home, average:  (item.formulahomeWinPercentage + item.homeSeriesPercentage)/2};
        // });

        // var awayGamesS = awaySortedGames.map(function(item){
        //     return {team : item.away, average: (item.formulaawayWinPercentage + item.awaySeriesPercentage)/2
        //     };
        // });

        // var allGames = homeGamesS.concat(awayGamesS); 

        // var allGamesSorted = await sorting(allGames,"average", "desc");

        // var gameSelected = games.filter(function(item){
        //     return item.home == allGamesSorted[0].team || item.away == allGamesSorted[0].team;
        // });


        //games = [];
        //games.push(gameSelected[0]);
        var F5FormulaWinnerSum = 0; 
        var F5SeriesWinnerSum = 0;
        var F5NextWinnerSum = 0; 
        var F5OverallWinnerSum = 0; 

        var FinalFormulaWinnerSum = 0;  
        var FinalSeriesWinnerSum = 0; 
        var FinalNextWinnerSum = 0; 
        var FinalOverallWinnerSum = 0; 
        var seriesWinner = "";
        var handicap = 0;
        var handicapF5 = 0;

        try{
            var stats = await load("ResultsSeriesWinner","GameByGame");
            var exists = stats.findIndex(x => x.date == date);
            if(exists >=0)
            {
               stats.splice(exists, 1);
            }
        }
        catch{
            var stats = [];
        }

        
        var selectionGamesCount = 0;
        for (let index = 0; index < games.length; index++) {
            const game = games[index];
            // if(game.formulaWinner == game.seriesWinner)
            // {
                if(game.away.indexOf("TOR") >= 0 ||game.home.indexOf("TOR") >= 0)
                {
                    if(game.away.indexOf("TOR") >= 0)
                    {
                        game.away = "TORBlue Jays";
                    }

                    if(game.home.indexOf("TOR") >= 0)
                    {
                        game.home = "TORBlue Jays";
                    }
                }

                if(game.away.indexOf("White") >= 0 ||game.home.indexOf("White") >= 0)
                {
                    if(game.away.indexOf("White") >= 0)
                    {
                        game.away = "CHIWhite Sox";
                    }

                    if(game.home.indexOf("White") >= 0)
                    {
                        game.home = "CHIWhite Sox";
                    }
                }
                if(game.away.indexOf("BOSRed") >= 0 ||game.home.indexOf("BOSRed") >= 0)
                {
                    if(game.away.indexOf("BOSRed") >= 0)
                    {
                        game.away = "BOSRed Sox";
                    }

                    if(game.home.indexOf("BOSRed") >= 0)
                    {
                        game.home = "BOSRed Sox";
                    }
                }

                    selectionGamesCount++;
                    var gamesDet =[];
                    var isHomeOrAway = "";
                    try{
                        var gamesDet = await load("Games"+game.away+"Details", "GameByGame");
                        isHomeOrAway = "away";
                    }
                    catch{
                        var gamesDet = await load("Games"+game.home+"Details", "GameByGame");
                        isHomeOrAway = "home";
                    }

                    var fullMonth = date.split(/[0-9]/)[0];
                    var targetMonth = fullMonth.substring(0,3);
                    var targetDate = date.replace(fullMonth, "").replace("th","").replace("rd","").replace("nd","").replace("st","");
                    var datee = targetMonth + " " +targetDate;
                    var targetGame = gamesDet.games.filter(function(item){
                        var dat = item.date.split(" ")[1] + " " + item.date.split(" ")[2];
                        
                        return dat.toLowerCase() == datee.toLocaleLowerCase(); 
                    })[0];
                    if(targetGame)
                    {
                        var awayTotalRuns = parseInt(targetGame.awayDetails.runsHitsDeatils[0].R);
                        var awayF5Runs =  parseInt(targetGame.awayDetails.runsHitsDeatils[0]["1"]);
                            awayF5Runs += parseInt(targetGame.awayDetails.runsHitsDeatils[0]["2"])
                            awayF5Runs += parseInt(targetGame.awayDetails.runsHitsDeatils[0]["3"])
                            awayF5Runs += parseInt(targetGame.awayDetails.runsHitsDeatils[0]["4"])
                            awayF5Runs += parseInt(targetGame.awayDetails.runsHitsDeatils[0]["5"])
                        var awayAfter5Runs = awayTotalRuns - awayF5Runs;

                        var homeTotalRuns = parseInt(targetGame.homeDetails.runsHitsDeatils[0].R);
                        var homeF5Runs =  parseInt(targetGame.homeDetails.runsHitsDeatils[0]["1"]);
                            homeF5Runs += parseInt(targetGame.homeDetails.runsHitsDeatils[0]["2"])
                            homeF5Runs += parseInt(targetGame.homeDetails.runsHitsDeatils[0]["3"])
                            homeF5Runs += parseInt(targetGame.homeDetails.runsHitsDeatils[0]["4"])
                            homeF5Runs += parseInt(targetGame.homeDetails.runsHitsDeatils[0]["5"])
                        var homeAfter5Runs = homeTotalRuns - homeF5Runs;


                        game.F5Winner = awayF5Runs > homeF5Runs ? game.away : homeF5Runs > awayF5Runs ? game.home : "Draw";

                        game.finalWinner = awayTotalRuns > homeTotalRuns ? game.away : homeTotalRuns > awayTotalRuns ? game.home: "Draw";

                        if(game.seriesWinner.indexOf(game.F5Winner) >= 0)
                        {
                            handicapF5 = awayF5Runs > homeF5Runs ? awayF5Runs - homeF5Runs :  homeF5Runs - awayF5Runs;
                        }
                        else{
                            handicapF5 = awayF5Runs > homeF5Runs ? homeF5Runs - awayF5Runs : awayF5Runs - homeF5Runs;
                        }

                        if(game.seriesWinner.indexOf(game.finalWinner) >= 0)
                        {
                            handicap = awayTotalRuns > homeTotalRuns ? awayTotalRuns - homeTotalRuns :  homeTotalRuns - awayTotalRuns;
                        }
                        else{
                            handicap = awayTotalRuns > homeTotalRuns ? homeTotalRuns - awayTotalRuns : awayTotalRuns - homeTotalRuns;
                        }

                        game.F5FormulaWinner = game.F5Winner.indexOf(game.formulaWinner) >= 0 ? 1 : 0;
                        game.F5SeriesWinner = game.F5Winner.indexOf(game.seriesWinner) >= 0  ? 1 : 0;
                        game.F5NextWinner = game.F5Winner.indexOf(game.nextWinners) >= 0  ? 1 : 0;
                        game.F5OverallWinner = game.F5Winner.indexOf(game.overallWinner) >= 0  ? 1 : 0;

                        game.FinalFormulaWinner = game.finalWinner.indexOf(game.formulaWinner) >= 0  ? 1 : 0;
                        game.FinalSeriesWinner = game.finalWinner.indexOf(game.seriesWinner) >= 0  ? 1 : 0;
                        game.FinalNextWinner = game.finalWinner.indexOf(game.nextWinners) >= 0  ? 1 : 0;
                        game.FinalOverallWinner = game.finalWinner.indexOf(game.overallWinner) >= 0  ? 1 : 0;

                        seriesWinner = game.seriesWinner;
                        
                        F5FormulaWinnerSum += game.F5FormulaWinner;
                        F5SeriesWinnerSum += game.F5SeriesWinner;
                        F5NextWinnerSum += game.F5NextWinner; 
                        F5OverallWinnerSum += game.F5OverallWinner; 
                        FinalFormulaWinnerSum += game.FinalFormulaWinner;
                        FinalSeriesWinnerSum += game.FinalSeriesWinner;
                        FinalNextWinnerSum += game.FinalNextWinner; 
                        FinalOverallWinnerSum += game.FinalOverallWinner; 


                        //await save(date+"FinalSelections", games, function(){}, "replace");
                }
                else{
                    //console.log(date + "Winner = "+ game.seriesWinner);
                    seriesWinner = game.seriesWinner;
                    F5FormulaWinnerSum = 0;
                    F5SeriesWinnerSum = 0;
                    F5NextWinnerSum = 0;
                    F5OverallWinnerSum = 0;
                    FinalFormulaWinnerSum = 0;
                    FinalSeriesWinnerSum = 0;
                    FinalNextWinnerSum = 0;
                    FinalOverallWinnerSum = 0;
                    handicap = "Pending Game"
                }
        //}
        }

        var stat = {
                date: date,
                dayOfWeek:dayOfWeek,
                F5FormulaWinnerPer : (F5FormulaWinnerSum*100)/selectionGamesCount,
                F5SeriesWinnerPer : (F5SeriesWinnerSum*100)/selectionGamesCount,
                F5NextWinnerPer : (F5NextWinnerSum*100)/selectionGamesCount, 
                F5OverallWinnerPer : (F5OverallWinnerSum*100)/selectionGamesCount, 
                FinalFormulaWinnerPer : (FinalFormulaWinnerSum*100)/selectionGamesCount,
                FinalSeriesWinnerPer : (FinalSeriesWinnerSum*100)/selectionGamesCount,
                FinalNextWinnerPer : (FinalNextWinnerSum*100)/selectionGamesCount, 
                FinalOverallWinnerPer : (FinalOverallWinnerSum*100)/selectionGamesCount, 
                NumberOGames: selectionGamesCount,
                seriesWinner: seriesWinner,
                handicap: handicap,
                handicapF5: handicapF5
        }

        stats.push(stat);
        //console.log(stats);
        await save("ResultsSeriesWinner", stats, function(){}, "replace", "GameByGame");
        
        
    }


    async function GetResultsSummaryPrototype(){

        var stats = await load("ResultsFormulaWinner", "GameByGame");
        
        stats = stats.filter(function(item){
            return item.handicap != "Pending Game";
        });
            var F5FormulaWinnerSum = 0; 
            var F5SeriesWinnerSum = 0;
            var F5NextWinnerSum = 0; 
            var F5OverallWinnerSum = 0; 
    
            var FinalFormulaWinnerSum = 0;  
            var FinalSeriesWinnerSum = 0; 
            var FinalNextWinnerSum = 0; 
            var FinalOverallWinnerSum = 0;
            var handicapSum = 0; 
            var handicapWins = 0;
            var handicapLostSum = 0; 
            var handicapLost = 0;
            var handicapF5Sum = 0; 
            var handicapF5Wins = 0;
            var handicapF5LostSum = 0; 
            var handicapF5Lost = 0;
    
            for (let er = 0; er < stats.length; er++) {
                const day = stats[er];
    
                F5FormulaWinnerSum += day.F5FormulaWinnerPer;
                F5SeriesWinnerSum += day.F5SeriesWinnerPer;
                F5NextWinnerSum += day.F5NextWinnerPer; 
                F5OverallWinnerSum += day.F5OverallWinnerPer; 
    
                FinalFormulaWinnerSum += day.FinalFormulaWinnerPer;  
                FinalSeriesWinnerSum += day.FinalSeriesWinnerPer; 
                FinalNextWinnerSum += day.FinalNextWinnerPer; 
                FinalOverallWinnerSum += day.FinalOverallWinnerPer; 
                
                if(day.handicap > 1.5 )
                {
                    handicapSum += day.handicap;
                    handicapWins++;
                }
                else{
                    handicapLostSum += day.handicap;
                    handicapLost++;
                }

                if(day.handicapF5 > 1.5 )
                {
                    handicapF5Sum += day.handicapF5;
                    handicapF5Wins++;
                }
                else{
                    handicapF5LostSum += day.handicapF5;
                    handicapF5Lost++;
                }
                
            }
            var summary = {
                    F5FormulaWinnerPer : (F5FormulaWinnerSum)/stats.length,
                    F5SeriesWinnerPer : (F5SeriesWinnerSum)/stats.length,
                    F5NextWinnerPer : (F5NextWinnerSum)/stats.length, 
                    F5OverallWinnerPer : (F5OverallWinnerSum)/stats.length, 
                    FinalFormulaWinnerPer : (FinalFormulaWinnerSum)/stats.length,
                    FinalSeriesWinnerPer : (FinalSeriesWinnerSum)/stats.length,
                    FinalNextWinnerPer : (FinalNextWinnerSum)/stats.length, 
                    FinalOverallWinnerPer : (FinalOverallWinnerSum)/stats.length, 
                    handicapAvg : (handicapSum)/handicapWins, 
                    handicapLostAvg : (handicapLostSum)/handicapLost, 
                    handicapF5Avg : (handicapF5Sum)/handicapF5Wins, 
                    handicapF5LostAvg : (handicapF5LostSum)/handicapF5Lost, 
                    DaysInScope : stats.length
            }
            console.log(summary);
            await save("ResultsFormulaSummary", summary, function(){}, "replace", "GameByGame");
    }

async function GetResultsSummary(){

    var stats = await load("ResultsSeriesWinner", "GameByGame");

    stats = stats.filter(function(item){
        return item.handicap != "Pending Game";
    });
        
        var F5FormulaWinnerSum = 0; 
        var F5SeriesWinnerSum = 0;
        var F5NextWinnerSum = 0; 
        var F5OverallWinnerSum = 0; 

        var FinalFormulaWinnerSum = 0;  
        var FinalSeriesWinnerSum = 0; 
        var FinalNextWinnerSum = 0; 
        var FinalOverallWinnerSum = 0;
        var handicapSum = 0; 
        var handicapWins = 0;
        var handicapLostSum = 0; 
        var handicapLost = 0;
        var handicapF5Sum = 0; 
        var handicapF5Wins = 0;
        var handicapF5LostSum = 0; 
        var handicapF5Lost = 0;

        for (let er = 0; er < stats.length; er++) {
            const day = stats[er];

            F5FormulaWinnerSum += day.F5FormulaWinnerPer;
            F5SeriesWinnerSum += day.F5SeriesWinnerPer;
            F5NextWinnerSum += day.F5NextWinnerPer; 
            F5OverallWinnerSum += day.F5OverallWinnerPer; 

            FinalFormulaWinnerSum += day.FinalFormulaWinnerPer;  
            FinalSeriesWinnerSum += day.FinalSeriesWinnerPer; 
            FinalNextWinnerSum += day.FinalNextWinnerPer; 
            FinalOverallWinnerSum += day.FinalOverallWinnerPer; 
            
            if(day.handicap > 1.5 )
            {
                handicapSum += day.handicap;
                handicapWins++;
            }
            else{
                handicapLostSum += day.handicap;
                handicapLost++;
            }

            if(day.handicapF5 > 1.5 )
            {
                handicapF5Sum += day.handicapF5;
                handicapF5Wins++;
            }
            else{
                handicapF5LostSum += day.handicapF5;
                handicapF5Lost++;
            }
            
        }
        var summary = {
                F5FormulaWinnerPer : (F5FormulaWinnerSum)/stats.length,
                F5SeriesWinnerPer : (F5SeriesWinnerSum)/stats.length,
                F5NextWinnerPer : (F5NextWinnerSum)/stats.length, 
                F5OverallWinnerPer : (F5OverallWinnerSum)/stats.length, 
                FinalFormulaWinnerPer : (FinalFormulaWinnerSum)/stats.length,
                FinalSeriesWinnerPer : (FinalSeriesWinnerSum)/stats.length,
                FinalNextWinnerPer : (FinalNextWinnerSum)/stats.length, 
                FinalOverallWinnerPer : (FinalOverallWinnerSum)/stats.length, 
                handicapAvg : (handicapSum)/handicapWins, 
                handicapLostAvg : (handicapLostSum)/handicapLost, 
                handicapF5Avg : (handicapF5Sum)/handicapF5Wins, 
                handicapF5LostAvg : (handicapF5LostSum)/handicapF5Lost, 
                DaysInScope : stats.length
        }
        console.log(summary);
        await save("ResultSeriesSummary", summary, function(){}, "replace", "GameByGame");
}
async function CalculateWinnersViaFormula(date, noSelections, type)
{
    if(type.toLowerCase().indexOf("new") >= 0)
    {
        allConsolidatedGames = [];
    }
    try{
        var finalSelectionsCSV = await load("finalSelectionsCSV", "GameByGame");
    }catch{
        var finalSelectionsCSV = [];
    }
    var pitchersData = await load(date);
    //var battersData = await load(date+"BattersData");
    var seriesData0 = await load(date+"SeriesWinners0");
    var seriesData7 = await load(date+"SeriesWinners7");
    var seriesData3 = await load(date+"SeriesWinners3");
    var teamsSchedule = await load(date+"TeamSchedules");
    var coversPercentages = await load("CoversPercentagesP","GameByGame");
    var pitchersDataByGame = await load("PitchersByTeamByGame", "GameByGame");
    var battersDataByGame = await load("BattersByTeamByGame", "GameByGame");

    var games = [];
    var gams = [];
    if(pitchersData.length == 1)
    {
        gams = pitchersData[0].games;
    }
    else{
        gams = pitchersData;
    }
    for (let index = 0; index < gams.length; index++) {
        var gameData = {};
        const game = gams[index];
        if(game.homeTeam.homePitcherDataNew && game.awayTeam.awayPitcherDataNew)
        {
        // var homePitcher = game.homeTeam.homePitcherDataNew[0];
        // var homeBatter = battersData.filter(function(item){
        //     return item.teamName.indexOf(game.homeTeam.homeTeam) >=0;
        // })[0];
        // var awayPitcher = game.awayTeam.awayPitcherDataNew[0];
        // var awayBatter = battersData.filter(function(item){
        //     return item.teamName.indexOf(game.awayTeam.awayTeam)>=0;
        // })[0];

        // var awayFactors = await CalculateFactors(awayPitcher, awayBatter);
        // var homeFactors = await CalculateFactors(homePitcher, homeBatter);

        // var stdDev = await getStandardDeviation([awayPitcher.currentEra, awayPitcher.carrerEra, homePitcher.currentEra, homePitcher.carrerEra]);
        // var calcs = await CalculateDiffsAndPercentages(awayFactors, homeFactors, stdDev);

        var homePitchersComplete = pitchersDataByGame.filter(function(item){
            return item.teamName.replace(" ","").indexOf(game.homeTeam.homeTeam) >= 0 || item.teamName.indexOf(game.homeTeam.homeTeam) >= 0;
        })[0];

        var homePitcher = "";
        var homePitcherParts = game.homeTeam.homePitcher.split(" ");
        if(homePitcherParts.length > 1)
        {
            homePitcher = game.homeTeam.homePitcher.split(" ")[1];
        }
        else{
            homePitcher = game.homeTeam.homePitcher;
        }

        var homePitcherComplete = homePitchersComplete.pitchersData.filter(function(item){
            return item.pitcher.indexOf(homePitcher)>=0;
        });

        var homeIndexPitcher = homePitcherComplete.findIndex(x => x.date.indexOf(game.date) >= 0) ;

        var homePitcherCompleteSliced = [];
        if(homeIndexPitcher != -1)
        {
            homePitcherCompleteSliced = homePitcherComplete.slice(0,(homeIndexPitcher));
        }
        else{
            homePitcherCompleteSliced = homePitcherComplete;
        }

        var homeBattersComplete = battersDataByGame.filter(function(item){
            return item.teamName.replace(" ","").indexOf(game.homeTeam.homeTeam) >= 0 || item.teamName.indexOf(game.homeTeam.homeTeam) >= 0;
        })[0];

        var homeBatterComplete = homeBattersComplete.battersData.games[homeBattersComplete.battersData.games.length-1];

        var awayPitcher = "";
        var awayPitcherParts = game.awayTeam.awayPitcher.split(" ");
        if(awayPitcherParts.length > 1)
        {
            awayPitcher = game.awayTeam.awayPitcher.split(" ")[1];
        }
        else{
            awayPitcher = game.awayTeam.awayPitcher;
        }

        var awayPitchersComplete = pitchersDataByGame.filter(function(item){
            return (item.teamName.replace(" ","").indexOf(game.awayTeam.awayTeam) >= 0) || (item.teamName.indexOf(game.awayTeam.awayTeam) >= 0);
        })[0];

        var awayPitcherComplete = awayPitchersComplete.pitchersData.filter(function(item){
            return item.pitcher.indexOf(awayPitcher)>=0;
        });
        
        var awayIndexPitcher = awayPitcherComplete.findIndex(x => x.date.indexOf(game.date) >= 0);

        var awayPitcherCompleteSliced = [];
        if(awayIndexPitcher != -1)
        {
            awayPitcherCompleteSliced = awayPitcherComplete.slice(0,(awayIndexPitcher));
        }
        else{
            awayPitcherCompleteSliced = awayPitcherComplete;
        }

        var awayBattersComplete = battersDataByGame.filter(function(item){
            return item.teamName.replace(" ","").indexOf(game.awayTeam.awayTeam) >= 0 || item.teamName.indexOf(game.awayTeam.awayTeam) >= 0 ;
        })[0];

        var awayBatterComplete = awayBattersComplete.battersData.games[awayBattersComplete.battersData.games.length-1];
        if(homePitcherCompleteSliced.length > 0 && awayPitcherCompleteSliced.length > 0){

            var awayPitcherData = awayPitcherComplete[awayPitcherComplete.length-1];
            var homePitcherData = homePitcherComplete[homePitcherComplete.length-1];
            var completeAwayPitcher = {currentEra:awayPitcherData.eraAvg, carrerEra:game.awayTeam.awayPitcherDataNew[0].carrerEra, awayHomeEra:awayPitcherData.eraAvgAway };
            var completeHomePitcher = {currentEra:homePitcherData.eraAvg, carrerEra:game.homeTeam.homePitcherDataNew[0].carrerEra, awayHomeEra:homePitcherData.eraAvgHome}
            var completeAwayBatter = {totalsData:[]};
            completeAwayBatter.totalsData.push({stat:"AVG",value:awayBatterComplete.avgAvg});
            completeAwayBatter.totalsData.push({stat:"OPS",value:awayBatterComplete.avgRunsHitsFactor});
            completeAwayBatter.totalsData.push({stat:"OBP",value:awayBatterComplete.battingAvg});
            completeAwayBatter.totalsData.push({stat:"SLG",value:awayBatterComplete.hitsRunsFactor});

            var completeHomeBatter = {totalsData:[]};
            completeHomeBatter.totalsData.push({stat:"AVG",value:homeBatterComplete.avgAvg});
            completeHomeBatter.totalsData.push({stat:"OPS",value:homeBatterComplete.avgRunsHitsFactor});
            completeHomeBatter.totalsData.push({stat:"OBP",value:homeBatterComplete.battingAvg});
            completeHomeBatter.totalsData.push({stat:"SLG",value:homeBatterComplete.hitsRunsFactor});

            var completeAwayFactors = await CalculateFactors(completeAwayPitcher, completeAwayBatter);
            var completeHomeFactors = await CalculateFactors(completeHomePitcher, completeHomeBatter);

            var allData = homePitcherComplete.concat(awayPitcherComplete);

            var eras = allData.map(function(item){
                return parseFloat(item.eraGame);
            });

            

            var completeStdDev = await getStandardDeviation(eras);

            completeStdDev  = completeStdDev == 0 ? 1 : completeStdDev;
            var completeCalcs = await CalculateDiffsAndPercentages(completeAwayFactors, completeHomeFactors, completeStdDev);

        

            var serie0 = seriesData0.filter(function(item){
                return item.game.replace(" ","") == game.game.replace(" ","");
            })[0];

            var serie3 = seriesData3.filter(function(item){
                return item.game.replace(" ","") == game.game.replace(" ","");
            })[0];

            var serie7 = seriesData7.filter(function(item){
                return item.game.replace(" ","") == game.game.replace(" ","");
            })[0];

            var seriesIsConsistent = "";
            var seriesWinner = "";
            var seriesWinnerPercentage = 0;
            var confidenceRanking = 0;
            seriesIsConsistent =  serie0.seriesExpectedWinner == serie7.seriesExpectedWinner && serie0.seriesExpectedWinner == serie3.seriesExpectedWinner ? true:false;
            if(seriesIsConsistent)
            {
                seriesWinner = serie0.seriesExpectedWinner;
                seriesWinnerPercentage = (((serie0.expectedWinnerRuns + serie7.expectedWinnerRuns + serie3.expectedWinnerRuns)/3)*10);
                seriesWinnerPercentage += serie0.isConsistent && seriesWinnerPercentage < 90  ? 10: 0;
                seriesWinnerPercentage += serie3.isConsistent && seriesWinnerPercentage < 90  ? 10: 0;
                seriesWinnerPercentage += serie7.isConsistent && seriesWinnerPercentage < 90  ? 10: 0;
                confidenceRanking = ((serie0.confidenceRanking + serie7.confidenceRanking + serie3.confidenceRanking)/3)*((serie0.expectedHandicap + serie3.expectedHandicap + serie7.expectedHandicap)/3);
            }
            else{
                if(serie0.seriesExpectedWinner == serie7.seriesExpectedWinner)
                {
                    seriesWinner = serie0.seriesExpectedWinner;
                    seriesWinnerPercentage = (((serie0.expectedWinnerRuns + serie7.expectedWinnerRuns)/2)*10);
                    seriesWinnerPercentage += serie0.isConsistent && seriesWinnerPercentage < 90  ? 10: 0;
                    seriesWinnerPercentage += serie7.isConsistent && seriesWinnerPercentage < 90  ? 10: 0;
                    confidenceRanking = ((serie0.confidenceRanking + serie7.confidenceRanking)/2)*((serie0.expectedHandicap + serie7.expectedHandicap)/2);
                }
                else if(serie3.seriesExpectedWinner == serie7.seriesExpectedWinner)
                {
                    seriesWinner = serie3.seriesExpectedWinner;
                    seriesWinnerPercentage = (((serie3.expectedWinnerRuns + serie7.expectedWinnerRuns)/2)*10);
                    seriesWinnerPercentage += serie3.isConsistent && seriesWinnerPercentage < 90  ? 10: 0;
                    seriesWinnerPercentage += serie7.isConsistent && seriesWinnerPercentage < 90  ? 10: 0;
                    confidenceRanking = ((serie7.confidenceRanking + serie3.confidenceRanking)/2)*((serie3.expectedHandicap + serie7.expectedHandicap)/2);
                }
                else if(serie0.seriesExpectedWinner == serie3.seriesExpectedWinner){
                    seriesWinner = serie3.seriesExpectedWinner;
                    seriesWinnerPercentage = (((serie0.expectedWinnerRuns + serie3.expectedWinnerRuns)/2)*10);
                    seriesWinnerPercentage += serie0.isConsistent && seriesWinnerPercentage < 90 ? 10: 0;
                    seriesWinnerPercentage += serie3.isConsistent && seriesWinnerPercentage < 90  ? 10: 0;
                    confidenceRanking = ((serie0.confidenceRanking + serie3.confidenceRanking)/2)*((serie0.expectedHandicap + serie3.expectedHandicap)/2);
                }
                else{
                    seriesWinner = serie0.seriesExpectedWinner;
                    seriesWinnerPercentage = (((serie0.expectedWinnerRuns)/1)*10);
                    seriesWinnerPercentage += serie0.isConsistent && seriesWinnerPercentage < 90 ? 10: 0;
                    seriesWinnerPercentage += serie3.isConsistent && seriesWinnerPercentage < 90  ? 10: 0;
                    confidenceRanking = ((serie0.confidenceRanking)/1)*((serie0.expectedHandicap)/1);
                }
            }

            var homeSeriesPercentage = seriesWinner == game.homeTeam.homeTeam ? seriesWinnerPercentage : (100-seriesWinnerPercentage);
            var awaySeriesPercentage = seriesWinner == game.awayTeam.awayTeam ? seriesWinnerPercentage : (100-seriesWinnerPercentage);

            var awayResults = teamsSchedule.filter(function(item){
                return item.teamName.replace(" ","").indexOf(game.awayTeam.awayTeam) >= 0 || item.teamName.indexOf(game.awayTeam.awayTeam);
            })[0];

            var homeResults = teamsSchedule.filter(function(item){
                return item.teamName.replace(" ","").indexOf(game.homeTeam.homeTeam) >= 0 || item.teamName.indexOf(game.homeTeam.homeTeam) >= 0;
            })[0];


            var awayMostProbaleNextResult = awayResults.mostProbaleNextResult;
            var awayMostProbablePercentage = awayResults.mostProbablePercentage == 100 ? 85 : awayResults.mostProbablePercentage;
            var awayNextWinningPercentage = 0;
            var awayNextlosingPercentage = 0;
            if(awayMostProbaleNextResult == "Win")
            {
                if(awayMostProbablePercentage > 50)
                {
                    awayNextWinningPercentage = awayMostProbablePercentage;
                    awayNextlosingPercentage = (100 - awayNextWinningPercentage);
                }
                else{
                    awayNextWinningPercentage = 60;
                    awayNextlosingPercentage = (100 - awayNextWinningPercentage);
                }
            }
            else{
                if(awayMostProbablePercentage > 50)
                {
                    awayNextlosingPercentage = awayMostProbablePercentage;
                    awayNextWinningPercentage = (100 - awayNextlosingPercentage);
                }
                else{
                    awayNextlosingPercentage = 60;
                    awayNextWinningPercentage = (100 - awayNextlosingPercentage);
                }
            }
            console.log(game.date +  game.game)
            if(game.date =="Tue, Apr 9" && game.game =="LADodgers @ MINTwins")
            {
                var stopHere = "";
            }
            var homeMostProbaleNextResult = homeResults.mostProbaleNextResult;
            var homeMostProbablePercentage = homeResults.mostProbablePercentage == 100 ? 85 : homeResults.mostProbablePercentage;
            var homeNextWinningPercentage = 0;
            var homeNextlosingPercentage = 0;
            if(homeMostProbaleNextResult == "Win")
            {
                if(homeMostProbablePercentage > 50)
                {
                    homeNextWinningPercentage = homeMostProbablePercentage;
                    homeNextlosingPercentage = (100 - homeNextWinningPercentage);
                }
                else{
                    homeNextWinningPercentage = 60;
                    homeNextlosingPercentage = (100 - homeNextWinningPercentage);
                }
            }
            else{
                if(homeMostProbablePercentage > 50)
                {
                    homeNextlosingPercentage = homeMostProbablePercentage;
                    homeNextWinningPercentage = (100 - homeNextlosingPercentage);
                }
                else{
                    homeNextlosingPercentage = 60;
                    homeNextWinningPercentage = (100 - homeNextlosingPercentage);
                }
            }

            var coversPercentagesData = coversPercentages.filter(function(item){
                return item.date == date && (item.homeTeam.indexOf(game.homeTeam.homeTeam) >= 0 || item.awayTeam.indexOf(game.awayTeam.awayTeam) >= 0);
            });

            var coversPer = 100;
            var opponentPer = 0;
            var awayCoversPer = 0;
            var homeCoversPer = 100;
            if(coversPercentagesData.length > 0)
            {
                if(coversPercentagesData[0].awayTeam == game.awayTeam.awayTeam)
                {
                    coversPer = coversPercentagesData[0].coversAwayWinPercentage;
                    opponentPer = coversPercentagesData[0].coversHomeWinPercentage;
                    awayCoversPer = coversPer;
                    homeCoversPer = opponentPer;
                }
                else{
                    coversPer = coversPercentagesData[0].coversHomeWinPercentage;
                    opponentPer = coversPercentagesData[0].coversAwayWinPercentage;
                    homeCoversPer = coversPer;
                    awayCoversPer = opponentPer;

                }
            }

            gameData.game = game.game;
            //gameData.time = game.gameTime;
            gameData.away = game.awayTeam.awayTeam;
            gameData.formulaawayWinPercentage = completeCalcs.totalAwayPercenatge;
            gameData.awaySeriesPercentage = awaySeriesPercentage;
            gameData.awayNextWinningPercentage = awayNextWinningPercentage;
            gameData.awayCurrentStreak = awayResults.currentStreak;

            gameData.home = game.homeTeam.homeTeam;
            gameData.formulahomeWinPercentage = completeCalcs.totalHomePercentage;
            gameData.homeSeriesPercentage = homeSeriesPercentage;
            gameData.homeNextWinningPercentage = homeNextWinningPercentage;
            gameData.homeCurrentStreak = homeResults.currentStreak;
            
            
            gameData.formulaWinner = completeCalcs.winner == "away" ? game.awayTeam.awayTeam : game.homeTeam.homeTeam;
            gameData.seriesWinner = seriesWinner;
            gameData.nextWinners = homeNextWinningPercentage > awayNextWinningPercentage ? game.homeTeam.homeTeam : game.awayTeam.awayTeam;

            var awayTotalPercentage = (gameData.formulaawayWinPercentage + gameData.awaySeriesPercentage +gameData.awayNextWinningPercentage)/3;
            var homeTotalPercentage = (gameData.formulahomeWinPercentage + gameData.homeSeriesPercentage +gameData.homeNextWinningPercentage)/3;

            gameData.awayTotalPercentage = (awayTotalPercentage*100)/(awayTotalPercentage + homeTotalPercentage);
            gameData.homeTotalPercentage = (homeTotalPercentage*100)/(awayTotalPercentage + homeTotalPercentage);
            gameData.overallWinner = gameData.homeTotalPercentage > gameData.awayTotalPercentage ? game.homeTeam.homeTeam : game.awayTeam.awayTeam;
            
            
            gameData.overallDiff = Math.abs(gameData.awayTotalPercentage - gameData.homeTotalPercentage);
            gameData.stdDev = completeCalcs.stdDev;
            gameData.awayPitcher = game.awayTeam.awayPitcher;
            gameData.awayCarrerEra = game.awayTeam.awayPitcherDataNew[0].carrerEra;
            gameData.awayCurrentEra = game.awayTeam.awayPitcherDataNew[0].currentEra;
            gameData.awaySpecificEra = awayPitcherData.eraAvgAway != null ? awayPitcherData.eraAvgAway : 0;
            gameData.awayPitcherWins = awayPitcherData.totalAwayWins;
            gameData.awayPitcherLoses = awayPitcherData.totalAwayLoses;
            gameData.awayFinalEra = game.awayTeam.awayPitcherDataNew[0].finalEra;
            gameData.awayAVG = completeAwayBatter.totalsData[0].value;
            gameData.awayOPS = completeAwayBatter.totalsData[1].value;
            gameData.awayOBP = completeAwayBatter.totalsData[2].value;
            gameData.awaySLG = completeAwayBatter.totalsData[3].value;
            gameData.homePitcher = game.homeTeam.homePitcher;
            gameData.homeCarrerEra = game.homeTeam.homePitcherDataNew[0].carrerEra;
            gameData.homeCurrentEra = game.homeTeam.homePitcherDataNew[0].currentEra;
            gameData.homeSpecificEra = homePitcherData.eraAvgHome != null ? homePitcherData.eraAvgHome :0 ;
            gameData.homePitcherWins = homePitcherData.totalHomeWins;
            gameData.homePitcherLoses = homePitcherData.totalHomeLoses;
            gameData.homeFinalEra = game.homeTeam.homePitcherDataNew[0].finalEra;
            gameData.homeAVG = completeHomeBatter.totalsData[0].value;
            gameData.homeOPS = completeHomeBatter.totalsData[1].value;
            gameData.homeOBP = completeHomeBatter.totalsData[2].value;
            gameData.homeSLG = completeHomeBatter.totalsData[3].value;
            gameData.awayCoversPer = awayCoversPer;
            gameData.homeCoversPer = homeCoversPer;
            var winnerData = await GetResultDetails(date, {away: game.awayTeam.awayTeam, home: game.homeTeam.homeTeam}, game.homeTeam.homeTeam);
            if(winnerData.f5Winner){
                gameData.isF5HomeWinner = winnerData.f5Winner.indexOf(game.homeTeam.homeTeam) >= 0 ? 1 : 0;
                //gameData.finalWinner = winnerData.finalWinner;
                gameData.isHomeWinner = winnerData.finalWinner.indexOf(game.homeTeam.homeTeam) >=0 ? 1 : 0;
                //gameData.isHomeHandicap = winnerData.homeTotalRuns - winnerData.awayTotalRuns >= 2 ? 1:0;
                gameData.isOver = (winnerData.homeTotalRuns + winnerData.awayTotalRuns) >= 9 ? 1:(winnerData.homeTotalRuns + winnerData.awayTotalRuns) <= 7 ? 0: 2;
            }
            else{
                gameData.isF5HomeWinner = 0;
                //gameData.finalWinner = winnerData.finalWinner;
                gameData.isHomeWinner = 0;
                //gameData.isHomeHandicap = winnerData.homeTotalRuns - winnerData.awayTotalRuns >= 2 ? 1:0;
                gameData.isOver = 2;
            }
            
            gameData.date = date;
            
            games.push(gameData);
            if(!isNaN(gameData.formulaawayWinPercentage) && !isNaN(gameData.formulaawayWinPercentage)){
                allConsolidatedGames.push(gameData);
                if(type.indexOf("New")>=0){
                    await save(date+type, allConsolidatedGames, function(){}, "replace", "NewGames");
                }
                else{
                    await save(type, allConsolidatedGames, function(){}, "replace", "GameByGame");
                }
                
            }
            

            await save(date+"FinalSelections", games, function(){}, "replace");

            
            

            

        }
        else{
            var stopHere = "";
        }
    }
    
}
        console.log(games);
        var expectedWinners =[];
        var thenum = parseInt(date.replace(/^\D+/g, ''));
        var previousDate = date;
        if(thenum != 1 )
        {

            previousDate = date.replace(thenum.toString(),(thenum-1).toString()).replace("nd", "th").replace("st","th").replace("rd", "th").replace("Auguth","August");

            //.replace("rd", "th").replace("st", "th");

        } 
        try{
            var patterns = await load(previousDate+"GeneralStatsPerSummary","GeneralStatsPerSummary");
        }
        catch{
            if(previousDate == "Auguth3th"){
                var patterns = await load("August3rd"+"GeneralStatsPerSummary","GeneralStatsPerSummary");
                }
            else if(previousDate == "Auguth2th"){
                var patterns = await load("August2th"+"GeneralStatsPerSummary","GeneralStatsPerSummary");
                }
            else if(previousDate == "Auguth1th"){
                var patterns = await load("August1st"+"GeneralStatsPerSummary","GeneralStatsPerSummary");
                }
            else if(previousDate == "July3st" || previousDate == "July3th"){
                var patterns = await load("July3rd"+"GeneralStatsPerSummary","GeneralStatsPerSummary");
                }
            else if(date == "July2nd" || date == "July2th"){
            var patterns = await load("July1st"+"GeneralStatsPerSummary","GeneralStatsPerSummary");
            }
            else if(date == "July1th" || date == "July1st" )
            {
                var patterns = await load("June30th"+"GeneralStatsPerSummary","GeneralStatsPerSummary");
            }
            else if(date == "July19th" || date == "July19st" )
                {
                    var patterns = await load("July14th"+"GeneralStatsPerSummary","GeneralStatsPerSummary");
                }
                else if(date == "August1st" || date == "August1st" )
                    {
                        var patterns = await load("July31st"+"GeneralStatsPerSummary","GeneralStatsPerSummary");
                    }
                    else if(date == "August22th")
                        {
                            var patterns = await load("August17th"+"GeneralStatsPerSummary","GeneralStatsPerSummary");
                        }
                        else if(date == "August31st")
                            {
                                var patterns = await load("August30th"+"GeneralStatsPerSummary","GeneralStatsPerSummary");
                            }
                            else if(date == "September1st")
                                {
                                    var patterns = await load("August31st"+"GeneralStatsPerSummary","GeneralStatsPerSummary");
                                }
                                else if(date == "September2th")
                                    {
                                        var patterns = await load("September1st"+"GeneralStatsPerSummary","GeneralStatsPerSummary");
                                    }
                                    else if(date == "September4th")
                                        {
                                            var patterns = await load("September3rd"+"GeneralStatsPerSummary","GeneralStatsPerSummary");
                                        }

                                        else if(date == "October1st")
                                            {
                                                var patterns = await load("September30th"+"GeneralStatsPerSummary","GeneralStatsPerSummary");
                                            }

                                            else if(date == "October2th" || date == "October2nd" || date == "October3rd")
                                                {
                                                    var patterns = await load("October1st"+"GeneralStatsPerSummary","GeneralStatsPerSummary");
                                                }
                                                else if(date == "October3rd")
                                                    {
                                                        var patterns = await load("October2th"+"GeneralStatsPerSummary","GeneralStatsPerSummary");
                                                    }
                                                    else if(date == "October5th")
                                                        {
                                                            var patterns = await load("October3rd"+"GeneralStatsPerSummary","GeneralStatsPerSummary");
                                                        }
            else{
                var patterns = await load(date+"GeneralStatsPerSummary","GeneralStatsPerSummary");
            }
        }
        patterns = await sorting(patterns, "propertyValue", "desc");
        
        var selectedPatterns =  patterns.filter(function(item){
            //return item.maxProperty.toLowerCase().indexOf("series") >= 0 && item.selectedProperty.toLowerCase().indexOf("series") >= 0 ? 1 : item.maxProperty.toLowerCase().indexOf("formula") >= 0 && item.selectedProperty.toLowerCase().indexOf("formula") >= 0 ? 1:0;
            return item;
        });
            selectedPatterns = patterns.slice(0,5);

            for (let fsfs = 0; fsfs < selectedPatterns.length; fsfs++) {
                const pattern = selectedPatterns[fsfs];
                var sortedGames = await sorting(games, pattern.selectedProperty, pattern.orderByDirection);
                var selectedGame = sortedGames[pattern.index];
                var isConsistentPattern = true;
                //pattern.maxProperty.toLowerCase().indexOf("series") >= 0 && pattern.selectedProperty.toLowerCase().indexOf("series") >= 0 ? 1 : pattern.maxProperty.toLowerCase().indexOf("formula") >= 0 && pattern.selectedProperty.toLowerCase().indexOf("formula") >= 0 ? 1:0;

                
                if(selectedGame && isConsistentPattern)
                {
                    var selectedTeam = "";
                    if(pattern.selectedProperty.toLowerCase().indexOf("series") >=0){
                        selectedTeam = selectedGame["seriesWinner"];
                    }
                    else if(pattern.selectedProperty.toLowerCase().indexOf("formula") >=0){
                        selectedTeam = selectedGame["formulaWinner"];
                    }
                    else if(pattern.selectedProperty.toLowerCase().indexOf("next") >=0){
                        selectedTeam = selectedGame["nextWinners"];
                    }
                    else if(pattern.selectedProperty.toLowerCase().indexOf("overall") >=0){
                        selectedTeam = selectedGame["overallWinner"];
                    }
                    if(selectedTeam == "" || typeof selectedTeam == "undefined")
                    {
                        selectedTeam = selectedGame["home"];
                    }
                    //console.log(selectedTeam);
                    var isConsitent = true;
                    if(pattern.selectedProperty == "homeSeriesPercentage")
                    {
                        if(
                            (selectedGame.formulahomeWinPercentage > selectedGame.formulaawayWinPercentage)
                        )
                        {
                            isConsitent = true;
                        }
                    }

                    if(pattern.selectedProperty == "overallDiff" && !isConsitent)
                        {
                            var isHome = selectedGame.overallWinner == selectedGame.home ? true : false;
                            if(isHome){
                            if((selectedGame.formulaawayWinPercentage < selectedGame.formulahomeWinPercentage))
                            {
                                isConsitent = true;
                            }
                            }
                            else{
                                if((selectedGame.formulaawayWinPercentage > selectedGame.formulahomeWinPercentage))
                                {
                                    isConsitent = true;
                                }
                            }
                        }
                    if(pattern.selectedProperty == "awayNextWinningPercentage" && !isConsitent)
                    {
                        if(
                            (selectedGame.homeSeriesPercentage < selectedGame.awaySeriesPercentage) 
                        )
                        {
                            isConsitent = true;
                        }
                    }  
                    if(pattern.selectedProperty == "formulahomeWinPercentage" && !isConsitent)
                        {
                            if((selectedGame.formulahomeWinPercentage > selectedGame.formulaawayWinPercentage)
                            )
                            {
                                isConsitent = true;
                            }
                        }
                    if(!isConsitent)
                    {
                        var matches = (selectedTeam == selectedGame.formulaWinner ? 1 : 0) + 
                                        (selectedTeam == selectedGame.nextWinners ? 1 : 0) +
                                        (selectedTeam == selectedGame.overallWinner ? 1 : 0) +
                                        (selectedTeam == selectedGame.seriesWinner ? 1 : 0) ;

                        isConsitent = matches >=4 ? true : false;

                    }
                    
                    var coversPercentagesData = coversPercentages.filter(function(item){
                        return item.date == date && (item.homeTeam.indexOf(selectedTeam) >= 0 || item.awayTeam.indexOf(selectedTeam) >= 0);
                    });
        
                    var coversPer = 100;
                    var opponentPer = 0;
                    if(coversPercentagesData.length > 0)
                    {
                        if(coversPercentagesData[0].awayTeam == selectedTeam)
                        {
                            coversPer = coversPercentagesData[0].coversAwayWinPercentage;
                            opponentPer = coversPercentagesData[0].coversHomeWinPercentage;
                        }
                        else{
                            coversPer = coversPercentagesData[0].coversHomeWinPercentage;
                            opponentPer = coversPercentagesData[0].coversAwayWinPercentage;
        
                        }
                    }
                    

                    if(coversPer > opponentPer && isConsitent && date.indexOf("April") <0 && (noSelections == null || noSelections == false))
                    {
                        var detail = await ShowSelectionDetails(date, selectedGame, selectedTeam, pattern.selectedProperty,pattern.maxValue , winsCount, numberPicks, fsfs, coversPer , expectedWinners, finalSelectionsCSV);
                        winsCount = detail.winsCount;
                        numberPicks = detail.numberPicks;
                        expectedWinners = detail.expectedWinners;
                        finalSelectionsCSV = detail.finalSelectionsCSV;
                    }
                    else if((noSelections != null && noSelections != false)){
                        var detail = await ShowSelectionDetails(date, selectedGame, selectedTeam, pattern.selectedProperty,pattern.maxValue , winsCount, numberPicks, fsfs, coversPer , expectedWinners, finalSelectionsCSV);
                        winsCount = detail.winsCount;
                        numberPicks = detail.numberPicks;
                        expectedWinners = detail.expectedWinners;
                        finalSelectionsCSV = detail.finalSelectionsCSV;
                    }
                    await save(date+"finalSelectionsCSV", finalSelectionsCSV, function(){}, "replace");
                }
            }


}


async function CalculatePreviousWinnersViaFormula(date, noSelections, type, year)
{
    try{
        var finalSelectionsCSV = await load("finalSelectionsCSV", year);
    }catch{
        var finalSelectionsCSV = [];
    }
    var pitchersData = await load(date, year+"/"+date);
    //var battersData = await load(date+"BattersData");
    var seriesData0 = await load(date+"SeriesWinners0", year+"/"+date);
    var seriesData7 = await load(date+"SeriesWinners7", year+"/"+date);
    var seriesData3 = await load(date+"SeriesWinners3", year+"/"+date);
    var teamsSchedule = await load(year+"TeamSchedules", year);
    var coversPercentages = await load("CoversPercentagesP",year);
    var pitchersDataByGame = await load("PitchersByTeamByGame", year);
    var battersDataByGame = await load("BattersByTeamByGame", year);

    var games = [];
    var gams = [];
    //if(pitchersData.length == 1)
    //{
        //gams = pitchersData[0].games;
    //}
    //else{
        gams = pitchersData;
    //}
    for (let index = 0; index < gams.length; index++) {
        var gameData = {};
        const game = gams[index];
        if(game.homeTeam.homePitcherDataNew && game.awayTeam.awayPitcherDataNew)
        {
            
        // var homePitcher = game.homeTeam.homePitcherDataNew[0];
        // var homeBatter = battersData.filter(function(item){
        //     return item.teamName.indexOf(game.homeTeam.homeTeam) >=0;
        // })[0];
        // var awayPitcher = game.awayTeam.awayPitcherDataNew[0];
        // var awayBatter = battersData.filter(function(item){
        //     return item.teamName.indexOf(game.awayTeam.awayTeam)>=0;
        // })[0];

        // var awayFactors = await CalculateFactors(awayPitcher, awayBatter);
        // var homeFactors = await CalculateFactors(homePitcher, homeBatter);

        // var stdDev = await getStandardDeviation([awayPitcher.currentEra, awayPitcher.carrerEra, homePitcher.currentEra, homePitcher.carrerEra]);
        // var calcs = await CalculateDiffsAndPercentages(awayFactors, homeFactors, stdDev);

        var homePitchersComplete = pitchersDataByGame.filter(function(item){
            return item.teamName.replace(" ","").indexOf(game.homeTeam.homeTeam) >= 0;
        })[0];

        var awayPitchersComplete = pitchersDataByGame.filter(function(item){
            return item.teamName.replace(" ","").indexOf(game.awayTeam.awayTeam) >= 0;
        })[0];
        

        var homePitcher = "";
        var homePitcherParts = game.homeTeam.homePitcher.split(" ");
        if(homePitcherParts.length > 1)
        {
            homePitcher = game.homeTeam.homePitcher.split(" ")[1];
        }
        else{
            homePitcher = game.homeTeam.homePitcher;
        }

        var homePitcherComplete = homePitchersComplete.pitchersData.filter(function(item){
            return item.pitcher.normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(homePitcher.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))>=0;
        });

        if(homePitcherComplete.length ==0)
        {
            homePitcherComplete = awayPitchersComplete.pitchersData.filter(function(item){
                return item.pitcher.normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(homePitcher.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))>=0;
            });
        }

        var homeIndexPitcher = homePitcherComplete.findIndex(x => x.date.indexOf(game.date) >= 0) ;
        if(homeIndexPitcher == 0)
        {
            homeIndexPitcher = 1;
        }
        var homePitcherCompleteSliced = [];
        if(homeIndexPitcher != -1)
        {
            homePitcherCompleteSliced = homePitcherComplete.slice(0,(homeIndexPitcher));
        }
        else{
        var homePitcherCompleteSliced = homePitcherComplete;
        }

        var homeBattersComplete = battersDataByGame.filter(function(item){
            return item.teamName.replace(" ","").indexOf(game.homeTeam.homeTeam) >= 0 || item.teamName.indexOf(game.homeTeam.homeTeam) ;
        })[0];

        var homeIndexBatter = homeBattersComplete.battersData.games.findIndex(x => x.date.indexOf(game.date) >= 0) ;

        var homeBatterCompleteSliced = [];
        if(homeIndexBatter != -1)
        {
            homeBatterCompleteSliced = homeBattersComplete.battersData.games.slice(0,(homeIndexBatter));
        }
        else{
            homeBatterCompleteSliced = homeBattersComplete.battersData.games;
        }

        

        
        

        var awayPitcher = "";
        var awayPitcherParts = game.awayTeam.awayPitcher.split(" ");
        if(awayPitcherParts.length > 1)
        {
            awayPitcher = game.awayTeam.awayPitcher.split(" ")[1];
        }
        else{
            awayPitcher = game.awayTeam.awayPitcher;
        }

        var awayPitcherComplete = awayPitchersComplete.pitchersData.filter(function(item){
            return item.pitcher.normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(awayPitcher.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))>=0;
        });

        if(awayPitcherComplete.length ==0)
        {
            awayPitcherComplete = homePitchersComplete.pitchersData.filter(function(item){
                return item.pitcher.normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(awayPitcher.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))>=0;
            });
        }
    
        var awayIndexPitcher = awayPitcherComplete.findIndex(x => x.date.indexOf(game.date) >= 0) ;
        if(awayIndexPitcher == 0)
        {
            awayIndexPitcher = 1;
        }
        var awayPitcherCompleteSliced = [];
        if(awayIndexPitcher != -1)
        {
            awayPitcherCompleteSliced = awayPitcherComplete.slice(0,(awayIndexPitcher));
        }
        else{
        var awayPitcherCompleteSliced = awayPitcherComplete;
        }

        var awayBattersComplete = battersDataByGame.filter(function(item){
            return item.teamName.replace(" ","").indexOf(game.awayTeam.awayTeam) >= 0 || item.teamName.indexOf(game.awayTeam.awayTeam) >= 0;
        })[0];

        var awayIndexBatter = awayBattersComplete.battersData.games.findIndex(x => x.date.indexOf(game.date) >= 0) ;

        var awayBatterCompleteSliced = [];
        if(awayIndexBatter != -1)
        {
            awayBatterCompleteSliced = awayBattersComplete.battersData.games.slice(0,(awayIndexBatter));
        }
        else{
            awayBatterCompleteSliced = awayBattersComplete.battersData.games;
        }

        var homeBatterComplete = homeBatterCompleteSliced[homeBatterCompleteSliced.length-1];
        var awayBatterComplete = awayBatterCompleteSliced[awayBatterCompleteSliced.length-1];

        if(homePitcherCompleteSliced.length > 0 && awayPitcherCompleteSliced.length > 0){
            var awayPitcherData = awayPitcherComplete[awayPitcherComplete.length - 1];
                var homePitcherData = homePitcherComplete[homePitcherComplete.length - 1];
                var completeAwayPitcher = {
                    currentEra: awayPitcherData.eraAvg,
                    carrerEra: game.awayTeam.awayPitcherDataNew[0].carrerEra,
                    awayHomeEra: awayPitcherData.eraAvgAway
                };
                var completeHomePitcher = {
                    currentEra: homePitcherData.eraAvg,
                    carrerEra: game.homeTeam.homePitcherDataNew[0].carrerEra,
                    awayHomeEra: homePitcherData.eraAvgHome
                };
            var completeAwayBatter = {totalsData:[]};
            completeAwayBatter.totalsData.push({stat:"AVG",value:awayBatterComplete.avgAvg});
            completeAwayBatter.totalsData.push({stat:"OPS",value:awayBatterComplete.avgRunsHitsFactor});
            completeAwayBatter.totalsData.push({stat:"OBP",value:awayBatterComplete.battingAvg});
            completeAwayBatter.totalsData.push({stat:"SLG",value:awayBatterComplete.hitsRunsFactor});

            var completeHomeBatter = {totalsData:[]};
            completeHomeBatter.totalsData.push({stat:"AVG",value:homeBatterComplete.avgAvg});
            completeHomeBatter.totalsData.push({stat:"OPS",value:homeBatterComplete.avgRunsHitsFactor});
            completeHomeBatter.totalsData.push({stat:"OBP",value:homeBatterComplete.battingAvg});
            completeHomeBatter.totalsData.push({stat:"SLG",value:homeBatterComplete.hitsRunsFactor});

            var completeAwayFactors = await CalculateFactors(completeAwayPitcher, completeAwayBatter);
            var completeHomeFactors = await CalculateFactors(completeHomePitcher, completeHomeBatter);

            var allData = homePitcherComplete.concat(awayPitcherComplete);

            var eras = allData.map(function(item){
                return parseFloat(item.eraGame);
            });

            

            var completeStdDev = await getStandardDeviation(eras);
            completeStdDev = completeStdDev == 0 ? 1 : completeStdDev;
            var completeCalcs = await CalculateDiffsAndPercentages(completeAwayFactors, completeHomeFactors, completeStdDev);

        

            var serie0 = seriesData0.filter(function(item){
                return item.game.replace(" ","") == game.game.replace(" ","");
            })[0];

            var serie3 = seriesData3.filter(function(item){
                return item.game.replace(" ","") == game.game.replace(" ","");
            })[0];

            var serie7 = seriesData7.filter(function(item){
                return item.game.replace(" ","") == game.game.replace(" ","");
            })[0];

            var seriesIsConsistent = "";
            var seriesWinner = "";
            var seriesWinnerPercentage = 0;
            var confidenceRanking = 0;
            seriesIsConsistent =  serie0.seriesExpectedWinner == serie7.seriesExpectedWinner && serie0.seriesExpectedWinner == serie3.seriesExpectedWinner ? true:false;
            if(seriesIsConsistent)
            {
                seriesWinner = serie0.seriesExpectedWinner;
                seriesWinnerPercentage = (((serie0.expectedWinnerRuns + serie7.expectedWinnerRuns + serie3.expectedWinnerRuns)/3)*10);
                seriesWinnerPercentage += serie0.isConsistent && seriesWinnerPercentage < 90  ? 10: 0;
                seriesWinnerPercentage += serie3.isConsistent && seriesWinnerPercentage < 90  ? 10: 0;
                seriesWinnerPercentage += serie7.isConsistent && seriesWinnerPercentage < 90  ? 10: 0;
                confidenceRanking = ((serie0.confidenceRanking + serie7.confidenceRanking + serie3.confidenceRanking)/3)*((serie0.expectedHandicap + serie3.expectedHandicap + serie7.expectedHandicap)/3);
            }
            else{
                if(serie0.seriesExpectedWinner == serie7.seriesExpectedWinner)
                {
                    seriesWinner = serie0.seriesExpectedWinner;
                    seriesWinnerPercentage = (((serie0.expectedWinnerRuns + serie7.expectedWinnerRuns)/2)*10);
                    seriesWinnerPercentage += serie0.isConsistent && seriesWinnerPercentage < 90  ? 10: 0;
                    seriesWinnerPercentage += serie7.isConsistent && seriesWinnerPercentage < 90  ? 10: 0;
                    confidenceRanking = ((serie0.confidenceRanking + serie7.confidenceRanking)/2)*((serie0.expectedHandicap + serie7.expectedHandicap)/2);
                }
                else if(serie3.seriesExpectedWinner == serie7.seriesExpectedWinner)
                {
                    seriesWinner = serie3.seriesExpectedWinner;
                    seriesWinnerPercentage = (((serie3.expectedWinnerRuns + serie7.expectedWinnerRuns)/2)*10);
                    seriesWinnerPercentage += serie3.isConsistent && seriesWinnerPercentage < 90  ? 10: 0;
                    seriesWinnerPercentage += serie7.isConsistent && seriesWinnerPercentage < 90  ? 10: 0;
                    confidenceRanking = ((serie7.confidenceRanking + serie3.confidenceRanking)/2)*((serie3.expectedHandicap + serie7.expectedHandicap)/2);
                }
                else if(serie0.seriesExpectedWinner == serie3.seriesExpectedWinner){
                    seriesWinner = serie3.seriesExpectedWinner;
                    seriesWinnerPercentage = (((serie0.expectedWinnerRuns + serie3.expectedWinnerRuns)/2)*10);
                    seriesWinnerPercentage += serie0.isConsistent && seriesWinnerPercentage < 90 ? 10: 0;
                    seriesWinnerPercentage += serie3.isConsistent && seriesWinnerPercentage < 90  ? 10: 0;
                    confidenceRanking = ((serie0.confidenceRanking + serie3.confidenceRanking)/2)*((serie0.expectedHandicap + serie3.expectedHandicap)/2);
                }
                else{
                    seriesWinner = serie0.seriesExpectedWinner;
                    seriesWinnerPercentage = (((serie0.expectedWinnerRuns) / 1) * 10);
                    seriesWinnerPercentage += serie0.isConsistent && seriesWinnerPercentage < 90 ? 10 : 0;
                    seriesWinnerPercentage += serie3.isConsistent && seriesWinnerPercentage < 90 ? 10 : 0;
                    confidenceRanking = ((serie0.confidenceRanking) / 1) * ((serie0.expectedHandicap) / 1);
                }
            }

            var homeSeriesPercentage = seriesWinner == game.homeTeam.homeTeam ? seriesWinnerPercentage : (100-seriesWinnerPercentage);
            var awaySeriesPercentage = seriesWinner == game.awayTeam.awayTeam ? seriesWinnerPercentage : (100-seriesWinnerPercentage);

            var awayResults = teamsSchedule.filter(function(item){
                return item.teamName.replace(" ","").indexOf(game.awayTeam.awayTeam) >= 0 || item.teamName.indexOf(game.awayTeam.awayTeam) >= 0;
            })[0];

            var homeResults = teamsSchedule.filter(function(item){
                return item.teamName.replace(" ","").indexOf(game.homeTeam.homeTeam) >= 0 || item.teamName.indexOf(game.homeTeam.homeTeam) >= 0;
            })[0];


            var awayMostProbaleNextResult = awayResults.mostProbaleNextResult;
            var awayMostProbablePercentage = awayResults.mostProbablePercentage == 100 ? 85 : awayResults.mostProbablePercentage;
            var awayNextWinningPercentage = 0;
            var awayNextlosingPercentage = 0;
            if(awayMostProbaleNextResult == "Win")
            {
                if(awayMostProbablePercentage > 50)
                {
                    awayNextWinningPercentage = awayMostProbablePercentage;
                    awayNextlosingPercentage = (100 - awayNextWinningPercentage);
                }
                else{
                    awayNextWinningPercentage = 60;
                    awayNextlosingPercentage = (100 - awayNextWinningPercentage);
                }
            }
            else{
                if(awayMostProbablePercentage > 50)
                {
                    awayNextlosingPercentage = awayMostProbablePercentage;
                    awayNextWinningPercentage = (100 - awayNextlosingPercentage);
                }
                else{
                    awayNextlosingPercentage = 60;
                    awayNextWinningPercentage = (100 - awayNextlosingPercentage);
                }
            }

            var homeMostProbaleNextResult = homeResults.mostProbaleNextResult;
            var homeMostProbablePercentage = homeResults.mostProbablePercentage == 100 ? 85 : homeResults.mostProbablePercentage;
            var homeNextWinningPercentage = 0;
            var homeNextlosingPercentage = 0;
            if(homeMostProbaleNextResult == "Win")
            {
                if(homeMostProbablePercentage > 50)
                {
                    homeNextWinningPercentage = homeMostProbablePercentage;
                    homeNextlosingPercentage = (100 - homeNextWinningPercentage);
                }
                else{
                    homeNextWinningPercentage = 60;
                    homeNextlosingPercentage = (100 - homeNextWinningPercentage);
                }
            }
            else{
                if(homeMostProbablePercentage > 50)
                {
                    homeNextlosingPercentage = homeMostProbablePercentage;
                    homeNextWinningPercentage = (100 - homeNextlosingPercentage);
                }
                else{
                    homeNextlosingPercentage = 60;
                    homeNextWinningPercentage = (100 - homeNextlosingPercentage);
                }
            }


            var coversPercentagesData = coversPercentages.filter(function(item){
                return item.date == date && (item.homeTeam.indexOf(game.homeTeam.homeTeam) >= 0 || item.awayTeam.indexOf(game.awayTeam.awayTeam) >= 0);
            });

            var coversPer = 100;
            var opponentPer = 0;
            var awayCoversPer = 0;
            var homeCoversPer = 100;
            if(coversPercentagesData.length > 0)
            {
                if(coversPercentagesData[0].awayTeam == game.awayTeam.awayTeam)
                {
                    coversPer = coversPercentagesData[0].coversAwayWinPercentage;
                    opponentPer = coversPercentagesData[0].coversHomeWinPercentage;
                    awayCoversPer = coversPer;
                    homeCoversPer = opponentPer;
                }
                else{
                    coversPer = coversPercentagesData[0].coversHomeWinPercentage;
                    opponentPer = coversPercentagesData[0].coversAwayWinPercentage;
                    homeCoversPer = coversPer;
                    awayCoversPer = opponentPer;

                }
            }

            gameData.game = game.game;
            //gameData.time = game.gameTime;
            gameData.away = game.awayTeam.awayTeam;
            gameData.formulaawayWinPercentage = completeCalcs.totalAwayPercenatge;
            gameData.awaySeriesPercentage = awaySeriesPercentage;
            gameData.awayNextWinningPercentage = awayNextWinningPercentage;
            gameData.awayCurrentStreak = awayResults.currentStreak;

            gameData.home = game.homeTeam.homeTeam;
            gameData.formulahomeWinPercentage = completeCalcs.totalHomePercentage;
            gameData.homeSeriesPercentage = homeSeriesPercentage;
            gameData.homeNextWinningPercentage = homeNextWinningPercentage;
            gameData.homeCurrentStreak = homeResults.currentStreak;
            
            
            gameData.formulaWinner = completeCalcs.winner == "away" ? game.awayTeam.awayTeam : game.homeTeam.homeTeam;
            gameData.seriesWinner = seriesWinner;
            gameData.nextWinners = homeNextWinningPercentage > awayNextWinningPercentage ? game.homeTeam.homeTeam : game.awayTeam.awayTeam;

            var awayTotalPercentage = (gameData.formulaawayWinPercentage + gameData.awaySeriesPercentage +gameData.awayNextWinningPercentage)/3;
            var homeTotalPercentage = (gameData.formulahomeWinPercentage + gameData.homeSeriesPercentage +gameData.homeNextWinningPercentage)/3;

            gameData.awayTotalPercentage = (awayTotalPercentage*100)/(awayTotalPercentage + homeTotalPercentage);
            gameData.homeTotalPercentage = (homeTotalPercentage*100)/(awayTotalPercentage + homeTotalPercentage);
            gameData.overallWinner = gameData.homeTotalPercentage > gameData.awayTotalPercentage ? game.homeTeam.homeTeam : game.awayTeam.awayTeam;
          
            
            gameData.overallDiff = Math.abs(gameData.awayTotalPercentage - gameData.homeTotalPercentage);
            gameData.stdDev = completeCalcs.stdDev;
            gameData.awayPitcher = game.awayTeam.awayPitcher;
            gameData.awayCarrerEra = game.awayTeam.awayPitcherDataNew[0].carrerEra;
            gameData.awayCurrentEra = game.awayTeam.awayPitcherDataNew[0].currentEra;
            gameData.awaySpecificEra = awayPitcherData.eraAvgAway != null ? awayPitcherData.eraAvgAway : 0;
            gameData.awayPitcherWins = awayPitcherData.totalAwayWins;
            gameData.awayPitcherLoses = awayPitcherData.totalAwayLoses;
            gameData.awayFinalEra = game.awayTeam.awayPitcherDataNew[0].finalEra;
            gameData.awayAVG = completeAwayBatter.totalsData[0].value;
            gameData.awayOPS = completeAwayBatter.totalsData[1].value;
            gameData.awayOBP = completeAwayBatter.totalsData[2].value;
            gameData.awaySLG = completeAwayBatter.totalsData[3].value;
            gameData.homePitcher = game.homeTeam.homePitcher;
            gameData.homeCarrerEra = game.homeTeam.homePitcherDataNew[0].carrerEra;
            gameData.homeCurrentEra = game.homeTeam.homePitcherDataNew[0].currentEra;
            gameData.homeSpecificEra = homePitcherData.eraAvgHome != null ? homePitcherData.eraAvgHome : 0;
            gameData.homePitcherWins = homePitcherData.totalHomeWins;
            gameData.homePitcherLoses = homePitcherData.totalHomeLoses;
            gameData.homeFinalEra = game.homeTeam.homePitcherDataNew[0].finalEra;
            gameData.homeAVG = completeHomeBatter.totalsData[0].value;
            gameData.homeOPS = completeHomeBatter.totalsData[1].value;
            gameData.homeOBP = completeHomeBatter.totalsData[2].value;
            gameData.homeSLG = completeHomeBatter.totalsData[3].value;
            gameData.awayCoversPer = awayCoversPer;
            gameData.homeCoversPer = homeCoversPer;
            var winnerData = await GetPreviousResultDetails(date, {away: game.awayTeam.awayTeam, home: game.homeTeam.homeTeam}, game.homeTeam.homeTeam, year);
            gameData.isF5HomeWinner = winnerData.f5Winner.indexOf(game.homeTeam.homeTeam) >=0 ? 1 : 0;
            //gameData.finalWinner = winnerData.finalWinner;
            gameData.isHomeWinner = winnerData.finalWinner.indexOf(game.homeTeam.homeTeam) >=0 ? 1 : 0;
            //gameData.isHomeHandicap = winnerData.homeTotalRuns - winnerData.awayTotalRuns >= 2 ? 1:0;
            gameData.isOver = (winnerData.homeTotalRuns + winnerData.awayTotalRuns) >= 9 ? 1:(winnerData.homeTotalRuns + winnerData.awayTotalRuns) <= 7 ? 0: 2;
            gameData.date = date;
            
            games.push(gameData);
            if (!isNaN(gameData.formulaawayWinPercentage) && !isNaN(gameData.formulaawayWinPercentage)) {
                allConsolidatedGames.push(gameData);
            }

            await save(date+"FinalSelections", games, function(){}, "replace", year+"/"+date);

            await save(year+type, allConsolidatedGames, function(){}, "replace", "allConsolidatedGames");


        }
        else{
            var stopHere = "";
        }
    }
    
}
        console.log(games);
        var expectedWinners =[];
        //var patterns = await load("GeneralStatsPerSummary",year);
        
        // var selectedPatterns =  patterns.filter(function(item){
        //     return item.maxProperty.toLowerCase().indexOf("series") >= 0 && item.selectedProperty.toLowerCase().indexOf("series") >= 0 ? 1 : item.maxProperty.toLowerCase().indexOf("formula") >= 0 && item.selectedProperty.toLowerCase().indexOf("formula") >= 0 ? 1:0;
        // });
        //     selectedPatterns = patterns.slice(0,5);

            for (let fsfs = 0; fsfs < games.length; fsfs++) {
                //const pattern = selectedPatterns[fsfs];
                //var sortedGames = await sorting(games, pattern.selectedProperty, pattern.orderByDirection);
                var selectedGame = games[fsfs];
                //var isConsistentPattern = pattern.maxProperty.toLowerCase().indexOf("series") >= 0 && pattern.selectedProperty.toLowerCase().indexOf("series") >= 0 ? 1 : pattern.maxProperty.toLowerCase().indexOf("formula") >= 0 && pattern.selectedProperty.toLowerCase().indexOf("formula") >= 0 ? 1:0;

                
                if(selectedGame)
                {
                    

                    var selectedTeam = selectedGame.home;
                    var isConsitent = false;
                    if(!isConsitent)
                    {
                        var matches = (selectedGame.nextWinners == selectedGame.formulaWinner ? 1 : 0) + 
                                        (selectedGame.overallWinner == selectedGame.nextWinners ? 1 : 0) +
                                        (selectedGame.seriesWinner  == selectedGame.overallWinner ? 1 : 0);

                        isConsitent = matches >=3 ? true : false;
                        if(isConsitent)
                        {
                            selectedTeam = selectedGame.formulaWinner;
                        }
                        else if(selectedGame.seriesWinner == selectedGame.formulaWinner){
                            selectedTeam = selectedGame.formulaWinner;
                        }
                        
                    }
                    

                    var coversPercentagesData = coversPercentages.filter(function(item){
                        return item.date == date && (item.homeTeam.indexOf(selectedTeam) >= 0 || item.awayTeam.indexOf(selectedTeam) >= 0);
                    });

                    var coversPer = 100;
                    var opponentPer = 0;
                    if(coversPercentagesData.length > 0)
                    {
                        if(coversPercentagesData[0].awayTeam == selectedTeam)
                        {
                            coversPer = coversPercentagesData[0].coversAwayWinPercentage;
                            opponentPer = coversPercentagesData[0].coversHomeWinPercentage;
                        }
                        else{
                            coversPer = coversPercentagesData[0].coversHomeWinPercentage;
                            opponentPer = coversPercentagesData[0].coversAwayWinPercentage;
                        }
                    }

                    if(coversPer > opponentPer && isConsitent &&  (noSelections == null || noSelections == false) && false)
                    {
                        var detail = await ShowPreviousSelectionDetails(date, selectedGame, selectedTeam, null,null , winsCount, numberPicks, fsfs, coversPer , expectedWinners, finalSelectionsCSV, year);
                        winsCount = detail.winsCount;
                        numberPicks = detail.numberPicks;
                        expectedWinners = detail.expectedWinners;
                        finalSelectionsCSV = detail.finalSelectionsCSV;
                    }
                    else if((noSelections != null && noSelections != false)&& false){
                        var detail = await ShowPreviousSelectionDetails(date, selectedGame, selectedTeam, null,null , winsCount, numberPicks, fsfs, coversPer , expectedWinners, finalSelectionsCSV, year);
                        winsCount = detail.winsCount;
                        numberPicks = detail.numberPicks;
                        expectedWinners = detail.expectedWinners;
                        finalSelectionsCSV = detail.finalSelectionsCSV;
                    }
                    await save("finalSelectionsCSV", finalSelectionsCSV, function(){}, "replace" ,year);
                }
            }


}

function getStandardDeviation (array) {
    if(array.length >0)
    {
    const n = array.length
    const mean = array.reduce((a, b) => a + b) / n
    return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n);
    }
    else {
        return 0
    };
  }



async function ShowSelectionDetails(date, selectedGame, selectedTeam, selectedProperty, maxValue , winsCount, numberPicks, fsfs, coversPer, expectedWinners, finalSelectionsCSV)
{
    var gameResult = await GetResultDetails(date, {away: selectedGame.away, home: selectedGame.home}, selectedTeam);
                        if(gameResult.finalWinner)
                        {
                            var isSelectionWinner = gameResult.finalWinner.indexOf(selectedTeam) >= 0 ? 1 : 0;
                            winsCount[fsfs] = winsCount[fsfs] + isSelectionWinner;
                            winsCount[5] = winsCount[5] + isSelectionWinner;
                        }
                        else{
                            var isSelectionWinner = "Pending Game";
                        }
                        
                        //console.log(sortedGames);
                        console.log(selectedGame);
                        console.log(selectedProperty);

                        var value = {date:date, selectedTeam:selectedTeam, percentage:maxValue, isAWin: isSelectionWinner, coversPer: coversPer};

                        if(typeof value.selectedTeam == "undefined")
                        {
                            var stopHere ="";
                        }
                        if(isSelectionWinner != "Pending Game")
                        {
                            numberPicks[fsfs]++;
                            numberPicks[5]++;
                            
                        }
                        var winPercentageTotal = ((winsCount[5]*100)/numberPicks[5]);
                        var winPercentageOverall = ((winsCount[fsfs]*100)/numberPicks[fsfs]);
                        expectedWinners.push(value);
                        if(!isSelectionWinner){
                            console.log("\u001b[1;31m date: "+ value.date+", selectedTeam: "+ value.selectedTeam+ ", percentage:"  + value.percentage+", isAWin: "+ value.isAWin+", coversPer: "+ value.coversPer);
                            console.log("\u001b[1;31m "+"date:"+date+" , index: "+ fsfs +" ,winPercentageOverall: "+winPercentageOverall+ ", wins:"+winsCount[fsfs]+" , totalPicks:"+numberPicks[fsfs]+" ,winPercentageTotal: "+winPercentageTotal+ ", winsTotal:"+winsCount[5]+" , totalPicksTotal:"+numberPicks[5]);
                        }
                        else if(isSelectionWinner == "Pending Game")
                        {
                            console.log("\u001b[1;33m date: "+ value.date+", selectedTeam: "+ value.selectedTeam+ ", percentage:"  + value.percentage+", isAWin: "+ value.isAWin+", coversPer: "+ value.coversPer);
                            console.log("\u001b[1;33m "+"date:"+date+" , index: "+ fsfs +" ,winPercentageOverall: "+winPercentageOverall+ ", wins:"+winsCount[fsfs]+" , totalPicks:"+numberPicks[fsfs]+" ,winPercentageTotal: "+winPercentageTotal+ ", winsTotal:"+winsCount[5]+" , totalPicksTotal:"+numberPicks[5]);                            
                        }
                        else{
                            console.log("\u001b[1;32m date: "+ value.date+", selectedTeam: "+ value.selectedTeam+ ", percentage:"  + value.percentage+", isAWin: "+ value.isAWin+", coversPer: "+ value.coversPer);
                            console.log("\u001b[1;32m "+"date:"+date+" , index: "+ fsfs +" ,winPercentageOverall: "+winPercentageOverall+ ", wins:"+winsCount[fsfs]+" , totalPicks:"+numberPicks[fsfs]+" ,winPercentageTotal: "+winPercentageTotal+ ", winsTotal:"+winsCount[5]+" , totalPicksTotal:"+numberPicks[5]);
                        }

                        finalSelectionsCSV.push(value);

                        return {expectedWinners: expectedWinners, winsCount: winsCount, numberPicks:numberPicks, finalSelectionsCSV:finalSelectionsCSV};
}

async function ShowPreviousSelectionDetails(date, selectedGame, selectedTeam, selectedProperty, maxValue , winsCount, numberPicks, fsfs, coversPer, expectedWinners, finalSelectionsCSV, year)
{
    var gameResult = await GetPreviousResultDetails(date, {away: selectedGame.away, home: selectedGame.home}, selectedTeam, year);
                        if(gameResult.finalWinner)
                        {
                            var isSelectionWinner = gameResult.finalWinner.indexOf(selectedTeam) >= 0 ? 1 : 0;
                            winsCount[fsfs] = winsCount[fsfs] + isSelectionWinner;
                            winsCount[5] = winsCount[5] + isSelectionWinner;
                        }
                        else{
                            var isSelectionWinner = "Pending Game";
                        }
                        
                        //console.log(sortedGames);
                        console.log(selectedGame);
                        console.log(selectedProperty);

                        var value = {date:date, selectedTeam:selectedTeam, percentage:maxValue, isAWin: isSelectionWinner, coversPer: coversPer};

                        if(isSelectionWinner != "Pending Game")
                        {
                            numberPicks[fsfs]++;
                            numberPicks[5]++;
                            
                        }
                        var winPercentageTotal = ((winsCount[5]*100)/numberPicks[5]);
                        var winPercentageOverall = ((winsCount[fsfs]*100)/numberPicks[fsfs]);
                        expectedWinners.push(value);
                        if(!isSelectionWinner){
                            console.log("\u001b[1;31m date: "+ value.date+", selectedTeam: "+ value.selectedTeam+ ", percentage:"  + value.percentage+", isAWin: "+ value.isAWin+", coversPer: "+ value.coversPer);
                            console.log("\u001b[1;31m "+"date:"+date+" , index: "+ fsfs +" ,winPercentageOverall: "+winPercentageOverall+ ", wins:"+winsCount[fsfs]+" , totalPicks:"+numberPicks[fsfs]+" ,winPercentageTotal: "+winPercentageTotal+ ", winsTotal:"+winsCount[5]+" , totalPicksTotal:"+numberPicks[5]);
                        }
                        else if(isSelectionWinner == "Pending Game")
                        {
                            console.log("\u001b[1;33m date: "+ value.date+", selectedTeam: "+ value.selectedTeam+ ", percentage:"  + value.percentage+", isAWin: "+ value.isAWin+", coversPer: "+ value.coversPer);
                            console.log("\u001b[1;33m "+"date:"+date+" , index: "+ fsfs +" ,winPercentageOverall: "+winPercentageOverall+ ", wins:"+winsCount[fsfs]+" , totalPicks:"+numberPicks[fsfs]+" ,winPercentageTotal: "+winPercentageTotal+ ", winsTotal:"+winsCount[5]+" , totalPicksTotal:"+numberPicks[5]);                            
                        }
                        else{
                            console.log("\u001b[1;32m date: "+ value.date+", selectedTeam: "+ value.selectedTeam+ ", percentage:"  + value.percentage+", isAWin: "+ value.isAWin+", coversPer: "+ value.coversPer);
                            console.log("\u001b[1;32m "+"date:"+date+" , index: "+ fsfs +" ,winPercentageOverall: "+winPercentageOverall+ ", wins:"+winsCount[fsfs]+" , totalPicks:"+numberPicks[fsfs]+" ,winPercentageTotal: "+winPercentageTotal+ ", winsTotal:"+winsCount[5]+" , totalPicksTotal:"+numberPicks[5]);
                        }

                        finalSelectionsCSV.push(value);

                        return {expectedWinners: expectedWinners, winsCount: winsCount, numberPicks:numberPicks, finalSelectionsCSV:finalSelectionsCSV};
}

async function CalculateDiffsAndPercentages(awayFactors, homeFactors, stdDev)
{
    var old ={
        average:{ diff:0, winPercenatge:0, lostPercentage:0 , winner:""}, 
        current:{diff:0, winPercenatge:0, lostPercentage:0, winner:""}, 
        carrer:{diff:0, winPercenatge:0, lostPercentage:0, winner:""},
        currentCarrer:{diff:0, winPercenatge:0, lostPercentage:0, winner:""},
        carrerCurrent:{diff:0, winPercenatge:0, lostPercentage:0, winner:""},
        currentAwayHome:{diff:0, winPercenatge:0, lostPercentage:0, winner:""},
        awayHomeCurrent:{diff:0, winPercenatge:0, lostPercentage:0, winner:""},

        awayPercentage : 0,
        homePercenatge: 0,
        awayScenarios: 0,
        homeScenarios: 0,
        awayFinalPercentage: 0,
        homeFinalPercentage: 0
    };

    var neww ={
        average:{ diff:0, winPercenatge:0, lostPercentage:0, winner:"" }, 
        current:{diff:0, winPercenatge:0, lostPercentage:0, winner:""}, 
        carrer:{diff:0, winPercenatge:0, lostPercentage:0, winner:""},
        currentCarrer:{diff:0, winPercenatge:0, lostPercentage:0, winner:""},
        carrerCurrent:{diff:0, winPercenatge:0, lostPercentage:0, winner:""},
        currentAwayHome:{diff:0, winPercenatge:0, lostPercentage:0, winner:""},
        awayHomeCurrent:{diff:0, winPercenatge:0, lostPercentage:0, winner:""},

        awayPercentage : 0,
        homePercenatge: 0,
        awayScenarios: 0,
        homeScenarios: 0,
        awayFinalPercentage: 0,
        homeFinalPercentage: 0
    };

    old.average.diff = awayFactors.old.average > homeFactors.old.average ? awayFactors.old.average - homeFactors.old.average : homeFactors.old.average - awayFactors.old.average;
    old.current.diff = awayFactors.old.current > homeFactors.old.current ? awayFactors.old.current - homeFactors.old.current : homeFactors.old.current - awayFactors.old.current;
    old.carrer.diff = awayFactors.old.carrer > homeFactors.old.carrer ? awayFactors.old.carrer - homeFactors.old.carrer : homeFactors.old.carrer - awayFactors.old.carrer;
    old.currentCarrer.diff = awayFactors.old.current > homeFactors.old.carrer ? awayFactors.old.current - homeFactors.old.carrer : homeFactors.old.carrer - awayFactors.old.current;
    old.carrerCurrent.diff = awayFactors.old.carrer > homeFactors.old.current ? awayFactors.old.carrer - homeFactors.old.current : homeFactors.old.current - awayFactors.old.carrer;
    old.currentAwayHome.diff = awayFactors.old.current > homeFactors.old.awayHomeEra ? awayFactors.old.current - homeFactors.old.awayHomeEra : homeFactors.old.awayHomeEra - awayFactors.old.current;
    old.awayHomeCurrent.diff = awayFactors.old.awayHomeEra > homeFactors.old.current ? awayFactors.old.awayHomeEra - homeFactors.old.current : homeFactors.old.current - awayFactors.old.awayHomeEra;
    
    old.average.winPercenatge = awayFactors.old.average > homeFactors.old.average ? (Math.abs(awayFactors.old.average)/ (Math.abs(homeFactors.old.average) + Math.abs(awayFactors.old.average)))*100 : (Math.abs(homeFactors.old.average)/ (Math.abs(homeFactors.old.average) + Math.abs(awayFactors.old.average)))*100;
    old.current.winPercenatge = awayFactors.old.current > homeFactors.old.current ? (Math.abs(awayFactors.old.current)/ (Math.abs(homeFactors.old.current) + Math.abs(awayFactors.old.current)))*100 : (Math.abs(homeFactors.old.current)/ (Math.abs(homeFactors.old.current) + Math.abs(awayFactors.old.current)))*100;
    old.carrer.winPercenatge = awayFactors.old.carrer > homeFactors.old.carrer ? (Math.abs(awayFactors.old.carrer)/ (Math.abs(homeFactors.old.carrer) + Math.abs(awayFactors.old.carrer)))*100 : (Math.abs(homeFactors.old.carrer)/ (Math.abs(homeFactors.old.carrer) + Math.abs(awayFactors.old.carrer)))*100;
    old.currentCarrer.winPercenatge = awayFactors.old.current > homeFactors.old.carrer ? (Math.abs(awayFactors.old.current)/ (Math.abs(homeFactors.old.carrer) + Math.abs(awayFactors.old.current)))*100 : (Math.abs(homeFactors.old.carrer)/ (Math.abs(homeFactors.old.carrer) + Math.abs(awayFactors.old.current)))*100;
    old.carrerCurrent.winPercenatge = awayFactors.old.carrer > homeFactors.old.current ? (Math.abs(awayFactors.old.carrer)/ (Math.abs(homeFactors.old.current) + Math.abs(awayFactors.old.carrer)))*100 : (Math.abs(homeFactors.old.current)/ (Math.abs(homeFactors.old.current) + Math.abs(awayFactors.old.carrer)))*100;
    old.currentAwayHome.winPercenatge = awayFactors.old.current > homeFactors.old.awayHomeEra ? (Math.abs(awayFactors.old.current)/ (Math.abs(homeFactors.old.awayHomeEra) + Math.abs(awayFactors.old.current)))*100 : (Math.abs(homeFactors.old.awayHomeEra)/ (Math.abs(homeFactors.old.awayHomeEra) + Math.abs(awayFactors.old.current)))*100;
    old.awayHomeCurrent.winPercenatge = awayFactors.old.awayHomeEra > homeFactors.old.current ? (Math.abs(awayFactors.old.awayHomeEra)/ (Math.abs(homeFactors.old.current) + Math.abs(awayFactors.old.awayHomeEra)))*100 : (Math.abs(homeFactors.old.current)/ (Math.abs(homeFactors.old.current) + Math.abs(awayFactors.old.awayHomeEra)))*100;


    old.average.lostPercentage = 100 - old.average.winPercenatge;
    old.current.lostPercentage = 100 - old.current.winPercenatge;
    old.carrer.lostPercentage = 100 - old.carrer.winPercenatge;
    old.currentCarrer.lostPercentage = 100 - old.currentCarrer.winPercenatge;
    old.carrerCurrent.lostPercentage = 100 - old.carrerCurrent.winPercenatge;
    old.currentAwayHome.lostPercentage = 100 - old.currentAwayHome.winPercenatge;
    old.awayHomeCurrent.lostPercentage = 100 - old.awayHomeCurrent.winPercenatge;

    old.average.winner = awayFactors.old.average < homeFactors.old.average ? "away" : "home";
    old.current.winner = awayFactors.old.current < homeFactors.old.current ? "away" : "home";
    old.carrer.winner = awayFactors.old.carrer < homeFactors.old.carrer ? "away" : "home";
    old.currentCarrer.winner = awayFactors.old.current < homeFactors.old.carrer ? "away" : "home";
    old.carrerCurrent.winner = awayFactors.old.carrer < homeFactors.old.current ? "away" : "home";
    old.currentAwayHome.winner = awayFactors.old.current < homeFactors.old.awayHomeEra ? "away" : "home";
    old.awayHomeCurrent.winner = awayFactors.old.awayHomeEra < homeFactors.old.current ? "away" : "home";

    old.awayScenarios = old.average.winner == "away"? 1:0;
    old.awayScenarios += old.current.winner == "away"? 1:0;
    old.awayScenarios += old.carrer.winner == "away"? 1:0;
    old.awayScenarios += old.currentCarrer.winner == "away"? 1:0;
    old.awayScenarios += old.carrerCurrent.winner == "away"? 1:0;
    old.awayScenarios += old.currentAwayHome.winner == "away"? 1:0;
    old.awayScenarios += old.awayHomeCurrent.winner == "away"? 1:0;

    old.homeScenarios = old.average.winner == "home"? 1:0;
    old.homeScenarios += old.current.winner == "home"? 1:0;
    old.homeScenarios += old.carrer.winner == "home"? 1:0;
    old.homeScenarios += old.currentCarrer.winner == "home"? 1:0;
    old.homeScenarios += old.carrerCurrent.winner == "home"? 1:0;
    old.homeScenarios += old.currentAwayHome.winner == "home"? 1:0;
    old.homeScenarios += old.awayHomeCurrent.winner == "home"? 1:0;

    var awaySum = old.average.winner == "away"? old.average.winPercenatge:old.average.lostPercentage;
    awaySum += old.current.winner == "away"? old.current.winPercenatge:old.current.lostPercentage;
    awaySum += old.carrer.winner == "away"? old.carrer.winPercenatge:old.carrer.lostPercentage;
    awaySum += old.currentCarrer.winner == "away"? old.currentCarrer.winPercenatge:old.currentCarrer.lostPercentage;
    awaySum += old.carrerCurrent.winner == "away"? old.carrerCurrent.winPercenatge:old.carrerCurrent.lostPercentage;
    awaySum += old.currentAwayHome.winner == "away"? old.currentAwayHome.winPercenatge:old.currentAwayHome.lostPercentage;
    awaySum += old.awayHomeCurrent.winner == "away"? old.awayHomeCurrent.winPercenatge:old.awayHomeCurrent.lostPercentage;

    var homeSum = old.average.winner == "home"? old.average.winPercenatge:old.currentCarrer.lostPercentage;
    homeSum += old.current.winner == "home"? old.current.winPercenatge:old.currentCarrer.lostPercentage;
    homeSum += old.carrer.winner == "home"? old.carrer.winPercenatge:old.currentCarrer.lostPercentage;
    homeSum += old.currentCarrer.winner == "home"? old.currentCarrer.winPercenatge:old.currentCarrer.lostPercentage;
    homeSum += old.carrerCurrent.winner == "home"? old.carrerCurrent.winPercenatge:old.carrerCurrent.lostPercentage;
    homeSum += old.currentAwayHome.winner == "home"? old.currentAwayHome.winPercenatge:old.currentAwayHome.lostPercentage;
    homeSum += old.awayHomeCurrent.winner == "home"? old.awayHomeCurrent.winPercenatge:old.awayHomeCurrent.lostPercentage;

    old.awayPercentage = awaySum/7;
    old.homePercenatge = homeSum/7;

    old.awayScenarios = old.awayScenarios*20;
    old.homeScenarios = old.homeScenarios*20;

    old.awayFinalPercentage = (old.awayPercentage + old.awayScenarios)/2;
    old.homeFinalPercentage = (old.homePercenatge + old.homeScenarios)/2;


    neww.average.diff = awayFactors.new.average > homeFactors.new.average ? awayFactors.new.average - homeFactors.new.average : homeFactors.new.average - awayFactors.new.average;
    neww.current.diff = awayFactors.new.current > homeFactors.new.current ? awayFactors.new.current - homeFactors.new.current : homeFactors.new.current - awayFactors.new.current;
    neww.carrer.diff = awayFactors.new.carrer > homeFactors.new.carrer ? awayFactors.new.carrer - homeFactors.new.carrer : homeFactors.new.carrer - awayFactors.new.carrer;
    neww.currentCarrer.diff = awayFactors.new.current > homeFactors.new.carrer ? awayFactors.new.current - homeFactors.new.carrer : homeFactors.new.carrer - awayFactors.new.current;
    neww.carrerCurrent.diff = awayFactors.new.carrer > homeFactors.new.current ? awayFactors.new.carrer - homeFactors.new.current : homeFactors.new.current - awayFactors.new.carrer;
    neww.currentAwayHome.diff = awayFactors.new.current > homeFactors.new.awayHomeEra ? awayFactors.new.current - homeFactors.new.awayHomeEra : homeFactors.new.awayHomeEra - awayFactors.new.current;
    neww.awayHomeCurrent.diff = awayFactors.new.awayHomeEra > homeFactors.new.current ? awayFactors.new.awayHomeEra - homeFactors.new.current : homeFactors.new.current - awayFactors.new.awayHomeEra;


    neww.average.winPercenatge = awayFactors.new.average > homeFactors.new.average ? (Math.abs(awayFactors.new.average)/ (Math.abs(homeFactors.new.average) + Math.abs(awayFactors.new.average)))*100: (Math.abs(homeFactors.new.average)/ (Math.abs(homeFactors.new.average) + Math.abs(awayFactors.new.average)))*100;
    neww.current.winPercenatge = awayFactors.new.current > homeFactors.new.current ? (Math.abs(awayFactors.new.current)/ (Math.abs(homeFactors.new.current) + Math.abs(awayFactors.new.current)))*100 : (Math.abs(homeFactors.new.current)/ (Math.abs(homeFactors.new.current) + Math.abs(awayFactors.new.current)))*100;
    neww.carrer.winPercenatge = awayFactors.new.carrer > homeFactors.new.carrer ? (Math.abs(awayFactors.new.carrer)/ (Math.abs(homeFactors.new.carrer) + Math.abs(awayFactors.new.carrer)))*100 : (Math.abs(homeFactors.new.carrer)/ (Math.abs(homeFactors.new.carrer) + Math.abs(awayFactors.new.carrer)))*100;
    neww.currentCarrer.winPercenatge = awayFactors.new.current > homeFactors.new.carrer ? (Math.abs(awayFactors.new.current)/ (Math.abs(homeFactors.new.carrer) + Math.abs(awayFactors.new.current)))*100 : (Math.abs(homeFactors.new.carrer)/ (Math.abs(homeFactors.new.carrer) + Math.abs(awayFactors.new.current)))*100;
    neww.carrerCurrent.winPercenatge = awayFactors.new.carrer > homeFactors.new.current ? (Math.abs(awayFactors.new.carrer)/ (Math.abs(homeFactors.new.current) + Math.abs(awayFactors.new.carrer)))*100 : (Math.abs(homeFactors.new.current)/ (Math.abs(homeFactors.new.current) + Math.abs(awayFactors.new.carrer)))*100;
    neww.currentAwayHome.winPercenatge = awayFactors.new.current > homeFactors.new.awayHomeEra ? (Math.abs(awayFactors.new.current)/ (Math.abs(homeFactors.new.awayHomeEra) + Math.abs(awayFactors.new.current)))*100 : (Math.abs(homeFactors.new.awayHomeEra)/ (Math.abs(homeFactors.new.awayHomeEra) + Math.abs(awayFactors.new.current)))*100;
    neww.awayHomeCurrent.winPercenatge = awayFactors.new.awayHomeEra > homeFactors.new.current ? (Math.abs(awayFactors.new.awayHomeEra)/ (Math.abs(homeFactors.new.current) + Math.abs(awayFactors.new.awayHomeEra)))*100 : (Math.abs(homeFactors.new.current)/ (Math.abs(homeFactors.new.current) + Math.abs(awayFactors.new.awayHomeEra)))*100;



    neww.average.lostPercentage = 100 - neww.average.winPercenatge;
    neww.current.lostPercentage = 100 - neww.current.winPercenatge;
    neww.carrer.lostPercentage = 100 - neww.carrer.winPercenatge;
    neww.currentCarrer.lostPercentage = 100 - neww.currentCarrer.winPercenatge;
    neww.carrerCurrent.lostPercentage = 100 - neww.carrerCurrent.winPercenatge;
    neww.currentAwayHome.lostPercentage = 100 - neww.currentAwayHome.winPercenatge;
    neww.awayHomeCurrent.lostPercentage = 100 - neww.awayHomeCurrent.winPercenatge;

    neww.average.winner = awayFactors.new.average < homeFactors.new.average ? "away" : "home";
    neww.current.winner = awayFactors.new.current < homeFactors.new.current ? "away" : "home";
    neww.carrer.winner = awayFactors.new.carrer < homeFactors.new.carrer ? "away" : "home";
    neww.currentCarrer.winner = awayFactors.new.current < homeFactors.new.carrer ? "away" : "home";
    neww.carrerCurrent.winner = awayFactors.new.carrer < homeFactors.new.current ? "away" : "home";
    neww.currentAwayHome.winner = awayFactors.new.current < homeFactors.new.awayHomeEra ? "away" : "home";
    neww.awayHomeCurrent.winner = awayFactors.new.awayHomeEra < homeFactors.new.current ? "away" : "home";

    neww.awayScenarios = neww.average.winner == "away"? 1:0;
    neww.awayScenarios += neww.current.winner == "away"? 1:0;
    neww.awayScenarios += neww.carrer.winner == "away"? 1:0;
    neww.awayScenarios += neww.currentCarrer.winner == "away"? 1:0;
    neww.awayScenarios += neww.carrerCurrent.winner == "away"? 1:0;
    neww.awayScenarios += neww.currentAwayHome.winner == "away"? 1:0;
    neww.awayScenarios += neww.awayHomeCurrent.winner == "away"? 1:0;

    neww.homeScenarios = neww.average.winner == "home"? 1:0;
    neww.homeScenarios += neww.current.winner == "home"? 1:0;
    neww.homeScenarios += neww.carrer.winner == "home"? 1:0;
    neww.homeScenarios += neww.currentCarrer.winner == "home"? 1:0;
    neww.homeScenarios += neww.carrerCurrent.winner == "home"? 1:0;
    neww.homeScenarios += neww.currentAwayHome.winner == "home"? 1:0;
    neww.homeScenarios += neww.awayHomeCurrent.winner == "home"? 1:0;

    var awaySum = neww.average.winner == "away"? neww.average.winPercenatge:neww.average.lostPercentage;
    awaySum += neww.current.winner == "away"? neww.current.winPercenatge:neww.current.lostPercentage;
    awaySum += neww.carrer.winner == "away"? neww.carrer.winPercenatge:neww.carrer.lostPercentage;
    awaySum += neww.currentCarrer.winner == "away"? neww.currentCarrer.winPercenatge:neww.currentCarrer.lostPercentage;
    awaySum += neww.carrerCurrent.winner == "away"? neww.carrerCurrent.winPercenatge:neww.carrerCurrent.lostPercentage;
    awaySum += neww.currentAwayHome.winner == "away"? neww.currentAwayHome.winPercenatge:neww.currentAwayHome.lostPercentage;
    awaySum += neww.awayHomeCurrent.winner == "away"? neww.awayHomeCurrent.winPercenatge:neww.awayHomeCurrent.lostPercentage;

    var homeSum = neww.average.winner == "home"? neww.average.winPercenatge:neww.currentCarrer.lostPercentage;
    homeSum += neww.current.winner == "home"? neww.current.winPercenatge:neww.currentCarrer.lostPercentage;
    homeSum += neww.carrer.winner == "home"? neww.carrer.winPercenatge:neww.currentCarrer.lostPercentage;
    homeSum += neww.currentCarrer.winner == "home"? neww.currentCarrer.winPercenatge:neww.currentCarrer.lostPercentage;
    homeSum += neww.carrerCurrent.winner == "home"? neww.carrerCurrent.winPercenatge:neww.carrerCurrent.lostPercentage;
    homeSum += neww.currentAwayHome.winner == "home"? neww.currentAwayHome.winPercenatge:neww.currentAwayHome.lostPercentage;
    homeSum += neww.awayHomeCurrent.winner == "home"? neww.awayHomeCurrent.winPercenatge:neww.awayHomeCurrent.lostPercentage;

    neww.awayPercentage = awaySum/7;
    neww.homePercenatge = homeSum/7;

    neww.awayScenarios = neww.awayScenarios*20;
    neww.homeScenarios = neww.homeScenarios*20;

    neww.awayFinalPercentage = (neww.awayPercentage + neww.awayScenarios)/2;
    neww.homeFinalPercentage = (neww.homePercenatge + neww.homeScenarios)/2;

    var summary = {awayPercentage: 0, homePercentage:0, awayScenarios:0, homeScenarios:0, totalAwayPercenatge:0, totalHomePercentage:0, winner:"", stdDev:stdDev , old:old, new: neww}

    summary.awayPercentage =  (old.awayFinalPercentage + neww.awayFinalPercentage)/2;
    summary.homePercentage =  (old.homeFinalPercentage + neww.homeFinalPercentage)/2;

    summary.awayScenarios =  (old.awayScenarios + neww.awayScenarios)/2;
    summary.homeScenarios =  (old.homeScenarios + neww.homeScenarios)/2;


    var totalAwayPercenatge = ((summary.awayPercentage + summary.awayScenarios)/2)/stdDev;
    var totalHomePercentage = ((summary.homePercentage + summary.homeScenarios)/2)/stdDev;

    summary.totalAwayPercenatge = (totalAwayPercenatge*100)/(totalAwayPercenatge + totalHomePercentage);
    summary.totalHomePercentage = (totalHomePercentage*100)/(totalAwayPercenatge + totalHomePercentage);;
    
    
    

    summary.winner = summary.totalAwayPercenatge > summary.totalHomePercentage ? "away" :"home";


    return summary;



}

async function CalculateFactors(pitcher, batter)
{
    var factors = {old:{ average:0, current:0, carrer:0, awayHomeEra:0 }, new:{ average:0, current:0, carrer:0, awayHomeEra:0 }};

    var avg = parseFloat(batter.totalsData.filter(function(item){
        return item.stat == "AVG"
    })[0].value);

    var obp = parseFloat(batter.totalsData.filter(function(item){
        return item.stat == "OBP"
    })[0].value);

    var slg = parseFloat(batter.totalsData.filter(function(item){
        return item.stat == "SLG"
    })[0].value);

    var ops = parseFloat(batter.totalsData.filter(function(item){
        return item.stat == "OPS"
    })[0].value);

    factors.old.average = (avg + obp + slg + ops) + ((pitcher.currentEra + pitcher.carrerEra +pitcher.awayHomeEra)/3);
    factors.old.current = (avg + obp + slg + ops) + pitcher.currentEra;
    factors.old.carrer = (avg + obp + slg + ops) + pitcher.carrerEra;
    factors.old.awayHomeEra = (avg + obp + slg + ops) + pitcher.awayHomeEra;

    factors.new.average = ((pitcher.currentEra + pitcher.carrerEra+ pitcher.awayHomeEra)/3) - (avg + obp + slg + ops);
    factors.new.current = pitcher.currentEra - (avg + obp + slg + ops);
    factors.new.carrer = pitcher.carrerEra - (avg + obp + slg + ops);
    factors.new.awayHomeEra = pitcher.awayHomeEra - (avg + obp + slg + ops);

    return factors;

}

async function getPitcherGameByGame()
{
    var teamsResultsData = await GetLatestTeamSchedules();
    var dataScope = teamsResultsData.filter(function(item){
        return item.period == 0;         
        });
        // try{
        //     var pitchersByTeam = await load("PitchersByTeamByGame","GameByGame");
        // }
        // catch{
            var pitchersByTeam = [];
        //}
    for (let index = 0; index < dataScope.length; index++) {
        const team = dataScope[index];
        
        var pitchersTeam = [];
        var uniquePitchers = [];
        var allGamesDetails = await load("Games"+team.teamName+"Details", "GameByGame");
        var teamDetails = {teamName: team.teamName, pitchers:[]}
        for (let tr = 0; tr < allGamesDetails.games.length; tr++) {
            const game = allGamesDetails.games[tr];
          var scope = [];
          var isHomeGame = 0;
            if(game.game.indexOf(" @ " + team.teamName) >= 0)
            {
                scope = game.homeDetails.pitchersDeatils;
                isHomeGame = 1;
            }
            else{
                scope = game.awayDetails.pitchersDeatils;
            }
            
            for (let re = 0; re < scope.length; re++) {
                const pitcher = scope[re];
                var pitcherData = { 
                    team: team.teamName,
                    date: game.date, 
                    pitcher: pitcher.PITCHERS, 
                    eraGame: pitcher.ERA,
                    isHomeGame : isHomeGame,
                    isWin: game.resultDetails.ISWIN == "Win" ?  1 : 0
                };
                pitchersTeam.push(pitcherData);
                var isPitcherInList = uniquePitchers.filter(function(item){
                    return item == pitcherData.pitcher;
                });
                if(isPitcherInList == 0)
                {
                    uniquePitchers.push(pitcherData.pitcher);
                }
                else{
                    var stopHere = "";
                }
            }
            var stopHere = "";
        }
        
        for (let pt = 0; pt < uniquePitchers.length; pt++) {
            const pitcher = uniquePitchers[pt];
            var pitcherGames = pitchersTeam.filter(function(item){
                return item.pitcher == pitcher
            });
            var stopHere = "";
            var sumEra = 0;
            var eraValues = [];
            var avgCount = 0;
            var sumEraHome = 0;
            var eraValuesHome = [];
            var avgCountHome = 0;
            var sumEraAway = 0;
            var eraValuesAway = [];
            var avgCountAway = 0;
            var totalWins = 0;
            var totalLoses = 0;
            var totalHomeWins = 0;
            var totalHomeLoses = 0;
            var totalAwayWins = 0;
            var totalAwayLoses = 0
            for (let rr = 0; rr < pitcherGames.length; rr++) {
                const game = pitcherGames[rr];
                var era = parseFloat(game.eraGame);
                if(!isNaN(era))
                {
                    avgCount++;
                    sumEra += era;
                    game.eraAvg = sumEra/(avgCount);
                    eraValues.push(parseFloat(game.eraGame));
                    game.stdDev= getStandardDeviation(eraValues);
                    totalWins = game.isWin ? totalWins + game.isWin : totalWins ;
                    game.totalWins = totalWins;
                    totalLoses = !game.isWin ? totalLoses + 1 : totalLoses ;
                    game.totalLoses = totalLoses;
                    //console.log(game);
                    if(game.isHomeGame)
                    {
                        avgCountHome++;
                        sumEraHome += era;
                        game.eraAvgHome = sumEraHome/(avgCountHome);
                        eraValuesHome.push(parseFloat(game.eraGame));
                        game.stdDevHome= getStandardDeviation(eraValuesHome);
                        game.eraAvgAway = sumEraAway/(avgCountAway);
                        game.stdDevAway= getStandardDeviation(eraValuesAway);
                        totalHomeWins = game.isWin ? totalHomeWins + game.isWin : totalHomeWins ;
                        game.totalHomeWins = totalHomeWins;
                        totalHomeLoses = !game.isWin ? totalHomeLoses + 1 : totalHomeLoses ;
                        game.totalHomeLoses = totalHomeLoses;
                        totalAwayWins = totalAwayWins;
                        game.totalAwayWins = totalAwayWins;
                        totalAwayLoses = totalAwayLoses ;
                        game.totalAwayLoses = totalAwayLoses;
                        //console.log(game);
                    }
                    else if(!game.isHomeGame)
                    {
                        avgCountAway++;
                        sumEraAway += era;
                        game.eraAvgAway = sumEraAway/(avgCountAway);
                        eraValuesAway.push(parseFloat(game.eraGame));
                        game.stdDevAway= getStandardDeviation(eraValuesAway);
                        game.eraAvgHome = sumEraHome/(avgCountHome);
                        game.stdDevHome= getStandardDeviation(eraValuesHome);
                        totalAwayWins = game.isWin ? totalAwayWins + game.isWin : totalAwayWins ;
                        game.totalAwayWins = totalAwayWins;
                        totalAwayLoses = !game.isWin ? totalAwayLoses + 1 : totalAwayLoses ;
                        game.totalAwayLoses = totalAwayLoses;
                        totalHomeWins = totalHomeWins;
                        game.totalHomeWins = totalHomeWins;
                        totalHomeLoses = totalHomeLoses ;
                        game.totalHomeLoses = totalHomeLoses;
                        //console.log(game);
                    }
                }
                
                
            }
            var stopHere = "";
        }

        pitchersByTeam.push({teamName: team.teamName, pitchersData:pitchersTeam});
        console.log(pitchersByTeam);
        await save("PitchersByTeamByGame", pitchersByTeam, function(){}, "replace", "GameByGame");
    }
}

async function getPreviousPitcherGameByGame(year)
{
    var teamsResultsData = await load(year+"TeamSchedules", year);
    var dataScope = teamsResultsData.filter(function(item){
        return item.period == 0;         
        });
        //try{
            //var pitchersByTeam = await load("PitchersByTeamByGame",year);
        //}
        //catch{
            var pitchersByTeam = [];
        //}
    for (let index = 0; index < dataScope.length; index++) {
        const team = dataScope[index];
        
        var pitchersTeam = [];
        var uniquePitchers = [];
        var allGamesDetails = await load("Games"+team.teamName+"Details", year);
        var teamDetails = {teamName: team.teamName, pitchers:[]}
        for (let tr = 0; tr < allGamesDetails.games.length; tr++) {
            const game = allGamesDetails.games[tr];
          var scope = [];
			var isHomeGame = 0;
            if(game.game.indexOf(" @ "+ team.teamName ) >= 0)
            {
                scope = game.homeDetails.pitchersDeatils;
				isHomeGame = 1;			   
            }
            else{
                scope = game.awayDetails.pitchersDeatils;
            }
            
            for (let re = 0; re < scope.length; re++) {
                const pitcher = scope[re];
                var pitcherData = { 
                    team: team.teamName,
                    date: game.date, 
                    pitcher: pitcher.PITCHERS, 
                    eraGame: pitcher.ERA,
					isHomeGame : isHomeGame,
                    isWin: game.resultDetails.ISWIN == "Win" ?  1 : 0						
                };
                pitchersTeam.push(pitcherData);
                var isPitcherInList = uniquePitchers.filter(function(item){
                    return item == pitcherData.pitcher;
                });
                if(isPitcherInList == 0)
                {
                    uniquePitchers.push(pitcherData.pitcher);
                }
                else{
                    var stopHere = "";
                }
            }
            var stopHere = "";
        }
        
        for (let pt = 0; pt < uniquePitchers.length; pt++) {
            const pitcher = uniquePitchers[pt];
            var pitcherGames = pitchersTeam.filter(function(item){
                return item.pitcher == pitcher
            });
            var stopHere = "";
            var sumEra = 0;
            var eraValues = [];
            var avgCount = 0;
			var sumEraHome = 0;
            var eraValuesHome = [];
            var avgCountHome = 0;
            var sumEraAway = 0;
            var eraValuesAway = [];
            var avgCountAway = 0;
            var totalWins = 0;
            var totalLoses = 0;
            var totalHomeWins = 0;
            var totalHomeLoses = 0;
            var totalAwayWins = 0;
            var totalAwayLoses = 0
            for (let rr = 0; rr < pitcherGames.length; rr++) {
                const game = pitcherGames[rr];
                var era = parseFloat(game.eraGame);
                if(!isNaN(era))
                {
                    avgCount++;
                    sumEra += era;
                    game.eraAvg = sumEra/(avgCount);
                    eraValues.push(parseFloat(game.eraGame));
                    game.stdDev= getStandardDeviation(eraValues);
                    totalWins = game.isWin ? totalWins + game.isWin : totalWins ;
                    game.totalWins = totalWins;
                    totalLoses = !game.isWin ? totalLoses + 1 : totalLoses ;
                    game.totalLoses = totalLoses;
                    //console.log(game);
                    if(game.isHomeGame)
                    {
                        avgCountHome++;
                        sumEraHome += era;
                        game.eraAvgHome = sumEraHome/(avgCountHome);
                        eraValuesHome.push(parseFloat(game.eraGame));
                        game.stdDevHome= getStandardDeviation(eraValuesHome);
                        game.eraAvgAway = sumEraAway/(avgCountAway);
                        game.stdDevAway= getStandardDeviation(eraValuesAway);
                        totalHomeWins = game.isWin ? totalHomeWins + game.isWin : totalHomeWins ;
                        game.totalHomeWins = totalHomeWins;
                        totalHomeLoses = !game.isWin ? totalHomeLoses + 1 : totalHomeLoses ;
                        game.totalHomeLoses = totalHomeLoses;
                        totalAwayWins = totalAwayWins;
                        game.totalAwayWins = totalAwayWins;
                        totalAwayLoses = totalAwayLoses ;
                        game.totalAwayLoses = totalAwayLoses;
                        //console.log(game);
                    }
                    else if(!game.isHomeGame)
                    {
                        avgCountAway++;
                        sumEraAway += era;
                        game.eraAvgAway = sumEraAway/(avgCountAway);
                        eraValuesAway.push(parseFloat(game.eraGame));
                        game.stdDevAway= getStandardDeviation(eraValuesAway);
                        game.eraAvgHome = sumEraHome/(avgCountHome);
                        game.stdDevHome= getStandardDeviation(eraValuesHome);
                        totalAwayWins = game.isWin ? totalAwayWins + game.isWin : totalAwayWins ;
                        game.totalAwayWins = totalAwayWins;
                        totalAwayLoses = !game.isWin ? totalAwayLoses + 1 : totalAwayLoses ;
                        game.totalAwayLoses = totalAwayLoses;
                        totalHomeWins = totalHomeWins;
                        game.totalHomeWins = totalHomeWins;
                        totalHomeLoses = totalHomeLoses ;
                        game.totalHomeLoses = totalHomeLoses;
                        //console.log(game);
                    }
                }
                
                
            }
            var stopHere = "";
        }

        pitchersByTeam.push({teamName: team.teamName, pitchersData:pitchersTeam});
        console.log(pitchersByTeam);
        await save("PitchersByTeamByGame", pitchersByTeam, function(){}, "replace", year);
    }
}

async function getBatterGameByGame()
{
    var teamsResultsData = await GetLatestTeamSchedules();
    var dataScope = teamsResultsData.filter(function(item){
        return item.period == 0;         
        });
        // try{
        //     var battersByTeam = await load("BattersByTeamByGame", "GameByGame");
        // }
        // catch{
            var battersByTeam = [];
        //}
    for (let index = 0; index < dataScope.length; index++) {
        const team = dataScope[index];
        
        var battersTeam = [];
        var uniqueBatters = [];
        var allGamesDetails = await load("Games"+team.teamName+"Details", "GameByGame");
        var teamDetails = {teamName: team.teamName, games:[]}
        for (let tr = 0; tr < allGamesDetails.games.length; tr++) {
            const game = allGamesDetails.games[tr];
          var scope = [];
            if(game.game.indexOf(" @ " + team.teamName) >= 0)
            {
                scope = game.homeDetails.battersDeatils;
            }
            else{
                scope = game.awayDetails.battersDeatils;
            }
            var avgSum = 0;
            var avgCount = 0;
            var hitsSum = 0;
            var runsSum = 0;
            for (let re = 0; re < scope.length; re++) {
                const player = scope[re];
                var isValidPlayer = isNaN(parseFloat(player["H-AB"].split("-")[0])) ? false : true;
                if( isValidPlayer)
                {
                    var playerData = { 
                        team: team.teamName,
                        date: game.date, 
                        player: player.HITTERS.split("\n")[0], 
                        position: player.HITTERS.split("\n")[1],
                        avg: player.AVG,
                        ab: player["H-AB"].split("-")[1],
                        runs: player.R,
                        hits: player["H-AB"].split("-")[0],
                        homeRuns: player.HR,
                        rbi: player.RBI
                    };
                    avgSum += parseFloat(player.AVG);
                    avgCount++;
                    runsSum += parseFloat(player.R);
                    hitsSum += parseFloat(player["H-AB"].split("-")[0]);
                    battersTeam.push(playerData);
                    var isPlayerInList = uniqueBatters.filter(function(item){
                        return item == playerData.player;
                    });
                    if(isPlayerInList == 0)
                    {
                        uniqueBatters.push(playerData.player);
                    }
                    else{
                        var stopHere = "";
                    }
                }
            }
            var gameAvg = avgSum/avgCount;
            hitsSum = hitsSum == 0 ? 1 : hitsSum;
            var hitsRunsFactor = runsSum/hitsSum;
            if(isNaN(hitsRunsFactor))
            {
                var stopHere = "";
            }
            teamDetails.games.push({date: game.date, battingAvg: gameAvg, hitsRunsFactor:hitsRunsFactor, hits: hitsSum, runs:runsSum});
        }

            var sumAvg = 0;
            var sumRunHitFactor = 0;
            var avgValues = [];
            var runHitFactorValues = [];
            var avgCount = 0;
            for (let rr = 0; rr < teamDetails.games.length; rr++) {
                const game = teamDetails.games[rr];
                var avg = parseFloat(game.battingAvg);
                if(!isNaN(avg))
                {
                    avgCount++;
                    sumAvg += avg;
                    sumRunHitFactor += game.hitsRunsFactor;
                    game.avgAvg = sumAvg/(avgCount);
                    avgValues.push(parseFloat(avg));
                    game.avgStdDev= getStandardDeviation(avgValues);
                    game.avgRunsHitsFactor = sumRunHitFactor/avgCount;
                    runHitFactorValues.push(parseFloat(game.hitsRunsFactor));
                    game.runsHitsStdDev= getStandardDeviation(runHitFactorValues);

                    //console.log(game);
                }
            
            var stopHere = +"";
        }
        

        battersByTeam.push({teamName: team.teamName, battersData:teamDetails});
        console.log(battersByTeam);
        await save("BattersByTeamByGame", battersByTeam, function(){}, "replace", "GameByGame");
    }
}

async function getPreviousBatterGameByGame(year)
{
    var teamsResultsData = await load(year+"TeamSchedules", year);
    var dataScope = teamsResultsData.filter(function(item){
        return item.period == 0;         
        });
        try{
            var battersByTeam = await load("BattersByTeamByGame", year);
        }
        catch{
            var battersByTeam = [];
        }
    for (let index = 0; index < dataScope.length; index++) {
        const team = dataScope[index];
        
        var battersTeam = [];
        var uniqueBatters = [];
        var allGamesDetails = await load("Games"+team.teamName+"Details", year);
        var teamDetails = {teamName: team.teamName, games:[]}
        for (let tr = 0; tr < allGamesDetails.games.length; tr++) {
            const game = allGamesDetails.games[tr];
          var scope = [];
            if(game.game.indexOf( "@ "+ team.teamName) >= 0)
            {
                scope = game.homeDetails.battersDeatils;
            }
            else{
                scope = game.awayDetails.battersDeatils;
            }
            var avgSum = 0;
            var avgCount = 0;
            var hitsSum = 0;
            var runsSum = 0;
            for (let re = 0; re < scope.length; re++) {
                const player = scope[re];
                var isValidPlayer = isNaN(parseFloat(player["H-AB"].split("-")[0])) ? false : true;
                if( isValidPlayer)
                {
                    var playerData = { 
                        team: team.teamName,
                        date: game.date, 
                        player: player.HITTERS.split("\n")[0], 
                        position: player.HITTERS.split("\n")[1],
                        avg: player.AVG,
                        ab: player["H-AB"].split("-")[1],
                        runs: player.R,
                        hits: player["H-AB"].split("-")[0],
                        homeRuns: player.HR,
                        rbi: player.RBI
                    };
                    avgSum += parseFloat(player.AVG);
                    avgCount++;
                    runsSum += parseFloat(player.R);
                    hitsSum += parseFloat(player["H-AB"].split("-")[0]);
                    battersTeam.push(playerData);
                    var isPlayerInList = uniqueBatters.filter(function(item){
                        return item == playerData.player;
                    });
                    if(isPlayerInList == 0)
                    {
                        uniqueBatters.push(playerData.player);
                    }
                    else{
                        var stopHere = "";
                    }
                }
            }
            var gameAvg = avgSum/avgCount;
            hitsSum = hitsSum == 0 ? 1 : hitsSum;
            var hitsRunsFactor = runsSum/hitsSum;
            if(isNaN(hitsRunsFactor))
            {
                var stopHere = "";
            }
            teamDetails.games.push({date: game.date, battingAvg: gameAvg, hitsRunsFactor:hitsRunsFactor, hits: hitsSum, runs:runsSum});
        }

            var sumAvg = 0;
            var sumRunHitFactor = 0;
            var avgValues = [];
            var runHitFactorValues = [];
            var avgCount = 0;
            for (let rr = 0; rr < teamDetails.games.length; rr++) {
                const game = teamDetails.games[rr];
                var avg = parseFloat(game.battingAvg);
                if(!isNaN(avg))
                {
                    avgCount++;
                    sumAvg += avg;
                    sumRunHitFactor += game.hitsRunsFactor;
                    game.avgAvg = sumAvg/(avgCount);
                    avgValues.push(parseFloat(avg));
                    game.avgStdDev= getStandardDeviation(avgValues);
                    game.avgRunsHitsFactor = sumRunHitFactor/avgCount;
                    runHitFactorValues.push(parseFloat(game.hitsRunsFactor));
                    game.runsHitsStdDev= getStandardDeviation(runHitFactorValues);

                    //console.log(game);
                }
            
            var stopHere = +"";
        }
        

        battersByTeam.push({teamName: team.teamName, battersData:teamDetails});
        console.log(battersByTeam);
        await save("BattersByTeamByGame", battersByTeam, function(){}, "replace", year);
    }
}

async function ProcessPreviousGameByGame(year)
{
    var teamsResultsData = await load(year+"TeamSchedules", year);
    var dataScope = teamsResultsData.filter(function(item){
        return item.period == 0;         
        });
    
    for (let index = 0; index < dataScope.length; index++) {
        const team = dataScope[index];
        var processedDates = [];
        try{
        var allGamesDetails = await load("Games"+team.teamName+"Details",year);
        for (let tr = 0; tr < allGamesDetails.games.length; tr++) {
            const game = allGamesDetails.games[tr];
            processedDates.push(game.date);
            
        }
    }
    catch{
        var allGamesDetails = {teamName : team.teamName, games:[]};
    }
    
    for (let index = 0; index < team.scheduleData.length; index++) {
        const game = team.scheduleData[index];
        var isProcessed = processedDates.filter(function(item){
            return item == game.DATE;
        });
        if(isProcessed.length ==0)
            {
            var gameDetails = {game:"",date:game.DATE, homeTeam:"", awayTeam:"" , resultDetails:game, homeDetails:{}, awayDetails:{}};
            var homeTeam = "";
            var awayTeam = "";
            if(game.OPPONENT.indexOf("vs") >= 0)
            {
                var opponent = game.OPPONENT.replace("vs\n","");
                homeTeam = team.teamName;
                awayTeam = opponent;
                
            }
            else{
                var opponent = game.OPPONENT.replace("@\n","");
                homeTeam = opponent;
                awayTeam = team.teamName;
            }

            gameDetails.awayTeam = awayTeam;
            gameDetails.homeTeam = homeTeam;
            gameDetails.game = awayTeam + " @ " + homeTeam;
            
            await driver.get(game.GAMELINK);
            await driver.manage().setTimeouts({ implicit: 1000 });

            await driver.executeScript(await ProcessRunsHitsGameData()).then(function(return_value) {
                console.log(return_value);
                var hitsRunsData = JSON.parse(return_value);
                gameDetails.awayDetails.runsHitsDeatils = hitsRunsData.away;
                gameDetails.homeDetails.runsHitsDeatils = hitsRunsData.home;
            });

            await driver.executeScript(await ProcessPitcherGameData()).then(function(return_value) {
                console.log(return_value);
                var pitchersData = JSON.parse(return_value);
                gameDetails.awayDetails.pitchersDeatils = pitchersData.away;
                gameDetails.homeDetails.pitchersDeatils = pitchersData.home;
            });

            await driver.executeScript(await ProcessBatterGameData()).then(function(return_value) {
                console.log(return_value);
                var battersData = JSON.parse(return_value);
                gameDetails.awayDetails.battersDeatils = battersData.away;
                gameDetails.homeDetails.battersDeatils = battersData.home;
            });
            
            allGamesDetails.games.push(gameDetails);
            console.log(allGamesDetails);
            await save("Games"+team.teamName+"Details", allGamesDetails, function(){}, "replace", year);
        }
    }

        var stopHere = "";
        
    }
}

async function ProcessGameByGame()
{
    var teamsResultsData = await GetLatestTeamSchedules();
    var dataScope = teamsResultsData.filter(function(item){
        return item.period == 0;         
        });
    
    for (let index = 0; index < dataScope.length; index++) {
        const team = dataScope[index];
        var processedDates = [];
        try{
        var allGamesDetails = await load("Games"+team.teamName+"Details","GameByGame");
        for (let tr = 0; tr < allGamesDetails.games.length; tr++) {
            const game = allGamesDetails.games[tr];
            processedDates.push(game.date);
            
        }
    }
    catch{
        var allGamesDetails = {teamName : team.teamName, games:[]};
    }
    
    for (let index = 0; index < team.scheduleData.length; index++) {
        const game = team.scheduleData[index];
        var isProcessed = processedDates.filter(function(item){
            return item == game.DATE;
        });
        if(isProcessed.length ==0)
            {
            var gameDetails = {game:"",date:game.DATE, homeTeam:"", awayTeam:"" , resultDetails:game, homeDetails:{}, awayDetails:{}};
            var homeTeam = "";
            var awayTeam = "";
            if(game.OPPONENT.indexOf("vs") >= 0)
            {
                var opponent = game.OPPONENT.replace("vs\n","");
                homeTeam = team.teamName;
                awayTeam = opponent;
                
            }
            else{
                var opponent = game.OPPONENT.replace("@\n","");
                homeTeam = opponent;
                awayTeam = team.teamName;
            }

            gameDetails.awayTeam = awayTeam;
            gameDetails.homeTeam = homeTeam;
            gameDetails.game = awayTeam + " @ " + homeTeam;
            
            await driver.get(game.GAMELINK);
            await driver.manage().setTimeouts({ implicit: 1000 });

            await driver.executeScript(await ProcessRunsHitsGameData()).then(function(return_value) {
                console.log(return_value);
                var hitsRunsData = JSON.parse(return_value);
                gameDetails.awayDetails.runsHitsDeatils = hitsRunsData.away;
                gameDetails.homeDetails.runsHitsDeatils = hitsRunsData.home;
            });

            await driver.executeScript(await ProcessPitcherGameData()).then(function(return_value) {
                console.log(return_value);
                var pitchersData = JSON.parse(return_value);
                gameDetails.awayDetails.pitchersDeatils = pitchersData.away;
                gameDetails.homeDetails.pitchersDeatils = pitchersData.home;
            });

            await driver.executeScript(await ProcessBatterGameData()).then(function(return_value) {
                console.log(return_value);
                var battersData = JSON.parse(return_value);
                gameDetails.awayDetails.battersDeatils = battersData.away;
                gameDetails.homeDetails.battersDeatils = battersData.home;
            });
            
            allGamesDetails.games.push(gameDetails);
            console.log(allGamesDetails);
            await save("Games"+team.teamName+"Details", allGamesDetails, function(){}, "replace", "GameByGame");
        }
    }

        var stopHere = "";
        
    }
}

async function getPreviousCoversWinPercentages(date, descDate, year)
{
    var winPercentages = {};
    var teamWinPercentages = [];
    var links = [];
    try{
    var coversPercentages = await load("CoversPercentagesP",year);
        var exists = coversPercentages.findIndex(x => x.date == date);
    }
    catch{
        var coversPercentages = [];
        var exists = -1;
    }
    if(exists == -1)
    {
        await driver.get("https://www.covers.com/sports/mlb/matchups?selectedDate="+descDate);
        await driver.manage().setTimeouts({ implicit: 1000 });
        await driver.executeScript(await GetCoversConsensusLinks()).then(function(return_value) {
            console.log(return_value);
            links = JSON.parse(return_value);
        });

        for (let sdf = 0; sdf < links.length; sdf++) {
            const link = links[sdf];
            await driver.get(link);

            await driver.executeScript(await GetConsesunsData()).then(function(return_value) {
                console.log(return_value);
                var homeTeamName = "";
                var awayTeamName = "";
                var consensusData = JSON.parse(return_value);
                if(consensusData.awayTeam != "no data")
                {
                var homeParts = consensusData.homeTeam.replace(".","").split(" ");
                if(homeParts.length > 1)
                { 
                    if(homeParts[0] == "ST")
                    {
                        homeParts[0] = "STL";
                    }

                    if(homeParts[1] == "DIEGO")
                        {
                            homeParts[0] = "SD";
                        }
                        if(homeParts[1] == "FRANCISCO")
                        {
                            homeParts[0] = "SF";
                        }

                    if(homeParts[0] == "KANSAS")
                    {
                        homeParts[0] = "KC";
                    }
                    if(homeParts[0] == "TAMPA")
                    {
                        homeParts[0] = "TB";
                    }
                    var homeTeam = teams.filter(function(item){
                        return item.team.toLowerCase().indexOf(homeParts[0].toLowerCase())>=0;
                    });
                    if(homeTeam.length > 1)
                    {
                        var homeTeam = homeTeam.filter(function(item){
                            return item.team.toLowerCase().indexOf(homeParts[1].toLowerCase())>=0;
                        });
                    }
                    if(homeTeam.length == 1)
                    {
                        homeTeamName = homeTeam[0].team.replace(" ","");
                    }
                    else{
                        var stopHere = "";
                    }
                }
                else{
                    var homeParts = consensusData.homeTeam.substring(0,3);
                    var homeTeam = teams.filter(function(item){
                        return item.team.indexOf(homeParts)>=0;
                    });
                    if(homeTeam.length == 1)
                    {
                        homeTeamName = homeTeam[0].team.replace(" ","");
                    }
                    else{
                        var homeTeam = teams.filter(function(item){
                            return item.url.indexOf(homeParts)>=0;
                        });
                        if(homeTeam.length == 1)
                            {
                                homeTeamName = homeTeam[0].team.replace(" ","");
                            }
                            else{
                                var stopHere = "";
                            }
                    }
                }

                var awayParts = consensusData.awayTeam.replace(".","").split(" ");
                if(awayParts.length > 1)
                { 
                    if(awayParts[0] == "ST")
                    {
                        awayParts[0] = "STL";
                    }
                    if(awayParts[1] == "DIEGO")
                    {
                        awayParts[0] = "SD";
                    }
                    if(awayParts[1] == "FRANCISCO")
                    {
                        awayParts[0] = "SF";
                    }
                    if(awayParts[0] == "KANSAS")
                    {
                        awayParts[0] = "KC";
                    }
                    if(awayParts[0] == "TAMPA")
                    {
                        awayParts[0] = "TB";
                    }
                    var awayTeam = teams.filter(function(item){
                        return item.team.toLowerCase().indexOf(awayParts[0].toLowerCase())>=0;
                    });
                    if(awayTeam.length > 1)
                    {
                        var awayTeam = awayTeam.filter(function(item){
                            return item.team.toLowerCase().indexOf(awayParts[1].toLowerCase())>=0;
                        });
                    }
                    if(awayTeam.length == 1)
                    {
                        awayTeamName = awayTeam[0].team.replace(" ","");
                    }
                    else{
                        var stopHere = "";
                    }
                }
                else{
                    var awayParts = consensusData.awayTeam.substring(0,3);
                    var awayTeam = teams.filter(function(item){
                        return item.team.indexOf(awayParts)>=0;
                    });
                    if(awayTeam.length == 1)
                    {
                        awayTeamName = awayTeam[0].team.replace(" ","");
                    }
                    else{
                        var awayTeam = teams.filter(function(item){
                            return item.url.indexOf(awayParts)>=0;
                        });
                        if(awayTeam.length == 1)
                            {
                                awayTeamName = awayTeam[0].team.replace(" ","");
                            }
                            else{
                                var stopHere = "";
                            }
                    }
                }
                var record = {date: date, awayTeam: awayTeamName, coversAwayWinPercentage: consensusData.awayPercentage, homeTeam: homeTeamName, coversHomeWinPercentage: consensusData.homePercentage,}
                console.log("date: "+date + " away: "+ awayTeamName +" home: "+ homeTeamName);
                coversPercentages.push(record);
                }
            });

            
            await save("CoversPercentagesP",coversPercentages,function(){},"replace",year);
        
        }
    }
}


async function getCoversWinPercentages(date, descDate)
{
    var winPercentages = {};
    var teamWinPercentages = [];
    var links = [];
    try{
    var coversPercentages = await load("CoversPercentagesP","GameByGame");
        var exists = coversPercentages.findIndex(x => x.date == date);
    }
    catch{
        var coversPercentages = [];
        var exists = -1;
    }
    if(exists == -1)
    {
        await driver.get("https://www.covers.com/sports/mlb/matchups?selectedDate="+descDate);
        await driver.manage().setTimeouts({ implicit: 1000 });
        await driver.executeScript(await GetCoversConsensusLinks()).then(function(return_value) {
            console.log(return_value);
            links = JSON.parse(return_value);
        });

        for (let sdf = 0; sdf < links.length; sdf++) {
            const link = links[sdf];
            await driver.get(link);

            await driver.executeScript(await GetConsesunsData()).then(function(return_value) {
                console.log(return_value);
                var homeTeamName = "";
                var awayTeamName = "";
                var consensusData = JSON.parse(return_value);
                if(consensusData.awayTeam != "no data")
                {
                var homeParts = consensusData.homeTeam.replace(".","").split(" ");
                if(homeParts.length > 1)
                { 
                    if(homeParts[0] == "ST")
                    {
                        homeParts[0] = "STL";
                    }

                    if(homeParts[1] == "DIEGO")
                        {
                            homeParts[0] = "SD";
                        }
                        if(homeParts[1] == "FRANCISCO")
                        {
                            homeParts[0] = "SF";
                        }

                    if(homeParts[0] == "KANSAS")
                    {
                        homeParts[0] = "KC";
                    }
                    if(homeParts[0] == "TAMPA")
                    {
                        homeParts[0] = "TB";
                    }
                    var homeTeam = teams.filter(function(item){
                        return item.team.toLowerCase().indexOf(homeParts[0].toLowerCase())>=0;
                    });
                    if(homeTeam.length > 1)
                    {
                        var homeTeam = homeTeam.filter(function(item){
                            return item.team.toLowerCase().indexOf(homeParts[1].toLowerCase())>=0;
                        });
                    }
                    if(homeTeam.length == 1)
                    {
                        homeTeamName = homeTeam[0].team.replace(" ","");
                    }
                    else{
                        var stopHere = "";
                    }
                }
                else{
                    var homeParts = consensusData.homeTeam.substring(0,3);
                    var homeTeam = teams.filter(function(item){
                        return item.team.indexOf(homeParts)>=0;
                    });
                    if(homeTeam.length == 1)
                    {
                        homeTeamName = homeTeam[0].team.replace(" ","");
                    }
                    else{
                        var homeTeam = teams.filter(function(item){
                            return item.url.indexOf(homeParts)>=0;
                        });
                        if(homeTeam.length == 1)
                            {
                                homeTeamName = homeTeam[0].team.replace(" ","");
                            }
                            else{
                                var stopHere = "";
                            }
                    }
                }

                var awayParts = consensusData.awayTeam.replace(".","").split(" ");
                if(awayParts.length > 1)
                { 
                    if(awayParts[0] == "ST")
                    {
                        awayParts[0] = "STL";
                    }
                    if(awayParts[1] == "DIEGO")
                    {
                        awayParts[0] = "SD";
                    }
                    if(awayParts[1] == "FRANCISCO")
                    {
                        awayParts[0] = "SF";
                    }
                    if(awayParts[0] == "KANSAS")
                    {
                        awayParts[0] = "KC";
                    }
                    if(awayParts[0] == "TAMPA")
                    {
                        awayParts[0] = "TB";
                    }
                    var awayTeam = teams.filter(function(item){
                        return item.team.toLowerCase().indexOf(awayParts[0].toLowerCase())>=0;
                    });
                    if(awayTeam.length > 1)
                    {
                        var awayTeam = awayTeam.filter(function(item){
                            return item.team.toLowerCase().indexOf(awayParts[1].toLowerCase())>=0;
                        });
                    }
                    if(awayTeam.length == 1)
                    {
                        awayTeamName = awayTeam[0].team.replace(" ","");
                    }
                    else{
                        var stopHere = "";
                    }
                }
                else{
                    var awayParts = consensusData.awayTeam.substring(0,3);
                    var awayTeam = teams.filter(function(item){
                        return item.team.indexOf(awayParts)>=0;
                    });
                    if(awayTeam.length == 1)
                    {
                        awayTeamName = awayTeam[0].team.replace(" ","");
                    }
                    else{
                        var awayTeam = teams.filter(function(item){
                            return item.url.indexOf(awayParts)>=0;
                        });
                        if(awayTeam.length == 1)
                            {
                                awayTeamName = awayTeam[0].team.replace(" ","");
                            }
                            else{
                                var stopHere = "";
                            }
                    }
                }
                var record = {date: date, awayTeam: awayTeamName, coversAwayWinPercentage: consensusData.awayPercentage, homeTeam: homeTeamName, coversHomeWinPercentage: consensusData.homePercentage,}
                console.log("date: "+date + " away: "+ awayTeamName +" home: "+ homeTeamName);
                coversPercentages.push(record);
                }
            });

            
            await save("CoversPercentagesP",coversPercentages,function(){},"replace","GameByGame");
        
        }
    }
}

async function getBestPitcherOfTheDay(date)
{
    var pitcherBatterResults = await load(date);
    var selectedGames = await load("SelectedGames"+date);
    var sonadoraGames = await load("SonadoraGames"+date);
    var allPitchers = [];
    for (let index = 0; index < pitcherBatterResults[0].games.length; index++) {
        const pitcherBatterGame = pitcherBatterResults[0].games[index];
if(pitcherBatterGame.awayTeam.awayPitcherData && pitcherBatterGame.homeTeam.homePitcherData)
{
        var awayEra = pitcherBatterGame.awayTeam.awayPitcherDataNew[0].finalEra;

        var homeEra = pitcherBatterGame.homeTeam.homePitcherDataNew[0].finalEra;
        
        allPitchers.push({
            team: pitcherBatterGame.awayTeam.awayTeam, 
            game: pitcherBatterGame.game, 
            pitcher: pitcherBatterGame.awayTeam.awayPitcher,
            era: awayEra
        });

        allPitchers.push({
            team: pitcherBatterGame.homeTeam.homeTeam, 
            game: pitcherBatterGame.game, 
            pitcher: pitcherBatterGame.homeTeam.homePitcher,
            era: homeEra
        });
    }
}




    var bestEraPitcher = await sorting(allPitchers, "era", "ASC");
    await save(date+"BestPitcherForProps", bestEraPitcher, function(){}, "replace");
    var stopHere = "";
}

async function consolidateAlgorithmResults(date)
{
    
    var pitcherBatterResults = await load(date);
    //var coversWinPredictions = await load(date+"CoversWinPercentages");
    

    var dataPeriod = [0,7,3];
    for (let a = 0; a < dataPeriod.length; a++) {
        const period = dataPeriod[a];
        var seriesWinnersResults = await load(date+"SeriesWinners"+period);
        var homeConfidentExpectedWinners = [];
        var awayConfidentExpectedWinners = [];
        var homeNoConfidentExpectedWinners = [];
        var awayNoConfidentExpectedWinners = [];
        var noConclusiveGames = [];

        var selectedGames = [];
        var parlayGames = [];
        var overSelectedGames = [];
        var underSelectedGames = [];
    for (let index = 0; index < pitcherBatterResults[0].games.length; index++) {
        const pitcherBatterGame = pitcherBatterResults[0].games[index];

        var seriesWinnerGame = seriesWinnersResults.filter(function(item){
            return item.game.indexOf(pitcherBatterGame.game)>=0;         
            })[0];

        //var awayCoversWinPercentage = coversWinPredictions.filter(function(item){
            // return item.awayTeam.awayTeam.indexOf(pitcherBatterGame.awayTeam.awayId)>=0;         
            // })[0];

        // if(awayCoversWinPercentage)
        // {
        //     awayCoversWinPercentage = awayCoversWinPercentage.awayTeam.awayTeam + "," +awayCoversWinPercentage.awayTeam.winPercentage;
        // }
        // else{
        //     awayCoversWinPercentage = "nodata";
        // }

        // var homeCoversWinPercentage = coversWinPredictions.filter(function(item){
        //     return item.homeTeam.homeTeam.indexOf(pitcherBatterGame.homeTeam.homeId)>=0;         
        //     })[0];

        // if(homeCoversWinPercentage)
        // {
        //     homeCoversWinPercentage = homeCoversWinPercentage.homeTeam.homeTeam + "," +homeCoversWinPercentage.homeTeam.winPercentage;
        // }
        // else{
        //     homeCoversWinPercentage = "nodata";
        // }

        if(pitcherBatterGame.gameExpectedResult && seriesWinnerGame)
        {
            var gameAnalisysDetails = {
                pitcherBatterExWinner:pitcherBatterGame.gameExpectedResult.expectedFinalWinner,
                pitcherBatterFinalHandicap: pitcherBatterGame.gameExpectedResult.finalHandicapExpected,
                pitcherBatterAwayExRuns : pitcherBatterGame.gameExpectedResult.awayFinalExpectedRuns,
                pitcherBatterHomeExRuns : pitcherBatterGame.gameExpectedResult.homeFinalExpectedRuns,
                pitcherBatterExF5Winner : pitcherBatterGame.gameExpectedResult.expectedWinnerF5,
                pitcherBatterExF5Diff: pitcherBatterGame.gameExpectedResult.runsDiffF5,
                seriesExWinner: seriesWinnerGame.seriesExpectedWinner,
                seriesConfidenceRanking: seriesWinnerGame.confidenceRanking,
                seriesExpectedWinnerRuns: seriesWinnerGame.expectedWinnerRuns,
                seriesExpectedLoserRuns: seriesWinnerGame.expectedLoserRuns,
                seriesFinalHandicap: seriesWinnerGame.expectedWinnerRuns - seriesWinnerGame.expectedLoserRuns,
                finalHandicapExpected : Math.round((pitcherBatterGame.gameExpectedResult.finalHandicapExpected + (seriesWinnerGame.expectedWinnerRuns - seriesWinnerGame.expectedLoserRuns))/2),
                //awayCoversWinPercentage: awayCoversWinPercentage,
                //homeCoversWinPercentage: homeCoversWinPercentage
            };
            if(pitcherBatterGame.gameExpectedResult.expectedFinalWinner == seriesWinnerGame.seriesExpectedWinner)
            {
                if(pitcherBatterGame.gameExpectedResult.expectedFinalWinner == pitcherBatterGame.gameExpectedResult.expectedWinnerF5)
                {
                    var overallConfidence = pitcherBatterGame.gameExpectedResult.finalHandicapExpected + seriesWinnerGame.confidenceRanking;
                    if(seriesWinnerGame.isConsistent)
                    {
                        if(seriesWinnerGame.seriesExpectedWinner == pitcherBatterGame.homeTeam.homeTeam)
                        {
                            homeConfidentExpectedWinners.push({game:pitcherBatterGame.game,gameTime:pitcherBatterGame.gameTime  ,expectedWinner: seriesWinnerGame.seriesExpectedWinner, avgHandicapExp: gameAnalisysDetails.finalHandicapExpected , overallConfidence:overallConfidence, gameAnalisysDetails:gameAnalisysDetails });
                            parlayGames.push({game:pitcherBatterGame.game, gameTime:pitcherBatterGame.gameTime  , expectedWinner: seriesWinnerGame.seriesExpectedWinner, avgHandicapExp: gameAnalisysDetails.finalHandicapExpected ,overallConfidence:overallConfidence, gameAnalisysDetails:gameAnalisysDetails });
                            selectedGames.push({game:pitcherBatterGame.game, gameTime:pitcherBatterGame.gameTime  , expectedWinner: seriesWinnerGame.seriesExpectedWinner, avgHandicapExp: gameAnalisysDetails.finalHandicapExpected , overallConfidence:overallConfidence, gameAnalisysDetails:gameAnalisysDetails });
                        }
                        else{
                            awayConfidentExpectedWinners.push({game:pitcherBatterGame.game, gameTime:pitcherBatterGame.gameTime  ,expectedWinner: seriesWinnerGame.seriesExpectedWinner, avgHandicapExp: gameAnalisysDetails.finalHandicapExpected , overallConfidence:overallConfidence, gameAnalisysDetails:gameAnalisysDetails });
                            parlayGames.push({game:pitcherBatterGame.game, gameTime:pitcherBatterGame.gameTime  ,expectedWinner: seriesWinnerGame.seriesExpectedWinner, avgHandicapExp: gameAnalisysDetails.finalHandicapExpected , overallConfidence:overallConfidence, gameAnalisysDetails:gameAnalisysDetails });
                            selectedGames.push({game:pitcherBatterGame.game, gameTime:pitcherBatterGame.gameTime  ,expectedWinner: seriesWinnerGame.seriesExpectedWinner, avgHandicapExp: gameAnalisysDetails.finalHandicapExpected , overallConfidence:overallConfidence, gameAnalisysDetails:gameAnalisysDetails });
                        }
                    }
                    else{
                        if(seriesWinnerGame.seriesExpectedWinner == pitcherBatterGame.homeTeam.homeTeam)
                        {
                            homeNoConfidentExpectedWinners.push({game:pitcherBatterGame.game, gameTime:pitcherBatterGame.gameTime  ,expectedWinner: seriesWinnerGame.seriesExpectedWinner, avgHandicapExp: gameAnalisysDetails.finalHandicapExpected , overallConfidence:overallConfidence, gameAnalisysDetails:gameAnalisysDetails });
                            selectedGames.push({game:pitcherBatterGame.game, gameTime:pitcherBatterGame.gameTime  ,expectedWinner: seriesWinnerGame.seriesExpectedWinner, overallConfidence:overallConfidence, gameAnalisysDetails:gameAnalisysDetails });
                        }
                        else{
                            awayNoConfidentExpectedWinners.push({game:pitcherBatterGame.game, gameTime:pitcherBatterGame.gameTime  ,expectedWinner: seriesWinnerGame.seriesExpectedWinner, avgHandicapExp: gameAnalisysDetails.finalHandicapExpected , overallConfidence:overallConfidence, gameAnalisysDetails:gameAnalisysDetails });
                            selectedGames.push({game:pitcherBatterGame.game, gameTime:pitcherBatterGame.gameTime  ,expectedWinner: seriesWinnerGame.seriesExpectedWinner, avgHandicapExp: gameAnalisysDetails.finalHandicapExpected , overallConfidence:overallConfidence, gameAnalisysDetails:gameAnalisysDetails });
                        }
                    }
                }
                else{
                    var overallConfidence = pitcherBatterGame.gameExpectedResult.finalHandicapExpected + seriesWinnerGame.confidenceRanking;
                    if(seriesWinnerGame.isConsistent)
                    {
                        if(seriesWinnerGame.seriesExpectedWinner == pitcherBatterGame.homeTeam.homeTeam)
                        {
                            homeConfidentExpectedWinners.push({game:pitcherBatterGame.game,gameTime:pitcherBatterGame.gameTime  ,expectedWinner: seriesWinnerGame.seriesExpectedWinner, avgHandicapExp: gameAnalisysDetails.finalHandicapExpected , overallConfidence:overallConfidence, gameAnalisysDetails:gameAnalisysDetails });
                            
                            selectedGames.push({game:pitcherBatterGame.game, gameTime:pitcherBatterGame.gameTime  , expectedWinner: seriesWinnerGame.seriesExpectedWinner, avgHandicapExp: gameAnalisysDetails.finalHandicapExpected , overallConfidence:overallConfidence, gameAnalisysDetails:gameAnalisysDetails });
                        }
                        else{
                            awayConfidentExpectedWinners.push({game:pitcherBatterGame.game, gameTime:pitcherBatterGame.gameTime  ,expectedWinner: seriesWinnerGame.seriesExpectedWinner, avgHandicapExp: gameAnalisysDetails.finalHandicapExpected , overallConfidence:overallConfidence, gameAnalisysDetails:gameAnalisysDetails });
                            
                            selectedGames.push({game:pitcherBatterGame.game, gameTime:pitcherBatterGame.gameTime  ,expectedWinner: seriesWinnerGame.seriesExpectedWinner, avgHandicapExp: gameAnalisysDetails.finalHandicapExpected , overallConfidence:overallConfidence, gameAnalisysDetails:gameAnalisysDetails });
                        }
                    }
                    else{
                        if(seriesWinnerGame.seriesExpectedWinner == pitcherBatterGame.homeTeam.homeTeam)
                        {
                            homeNoConfidentExpectedWinners.push({game:pitcherBatterGame.game, gameTime:pitcherBatterGame.gameTime  ,expectedWinner: seriesWinnerGame.seriesExpectedWinner, avgHandicapExp: gameAnalisysDetails.finalHandicapExpected , overallConfidence:overallConfidence, gameAnalisysDetails:gameAnalisysDetails });
                            
                            selectedGames.push({game:pitcherBatterGame.game, gameTime:pitcherBatterGame.gameTime  ,expectedWinner: seriesWinnerGame.seriesExpectedWinner, avgHandicapExp: gameAnalisysDetails.finalHandicapExpected , overallConfidence:overallConfidence, gameAnalisysDetails:gameAnalisysDetails });
                        }
                        else{
                            awayNoConfidentExpectedWinners.push({game:pitcherBatterGame.game, gameTime:pitcherBatterGame.gameTime  ,expectedWinner: seriesWinnerGame.seriesExpectedWinner, avgHandicapExp: gameAnalisysDetails.finalHandicapExpected , overallConfidence:overallConfidence, gameAnalisysDetails:gameAnalisysDetails });
                            
                            selectedGames.push({game:pitcherBatterGame.game, gameTime:pitcherBatterGame.gameTime  ,expectedWinner: seriesWinnerGame.seriesExpectedWinner, avgHandicapExp: gameAnalisysDetails.finalHandicapExpected , overallConfidence:overallConfidence, gameAnalisysDetails:gameAnalisysDetails });
                        }
                    }
                }
            }
            else{
                noConclusiveGames.push(gameAnalisysDetails);
            }

            if(seriesWinnerGame.expectedTotalScore >= 9 && pitcherBatterGame.gameExpectedResult.finalTotalRunsExpected >= 9)
            {
                var confidenceLevel = (seriesWinnerGame.expectedTotalScore + pitcherBatterGame.gameExpectedResult.finalTotalRunsExpected)/2;
                overSelectedGames.push({game:pitcherBatterGame.game, time:pitcherBatterGame.time  ,seriesRunsEx: seriesWinnerGame.expectedTotalScore, pitcherBatterRunsEx: pitcherBatterGame.gameExpectedResult.finalTotalRunsExpected, confidenceLevel:confidenceLevel, gameAnalisysDetails:gameAnalisysDetails  });
            }
            else if(seriesWinnerGame.expectedTotalScore < 8 && pitcherBatterGame.gameExpectedResult.finalTotalRunsExpected < 8)
            {
                var confidenceLevel = (seriesWinnerGame.expectedTotalScore + pitcherBatterGame.gameExpectedResult.finalTotalRunsExpected)/2;
                underSelectedGames.push({game:pitcherBatterGame.game, time:pitcherBatterGame.time  ,seriesRunsEx: seriesWinnerGame.expectedTotalScore, pitcherBatterRunsEx: pitcherBatterGame.gameExpectedResult.finalTotalRunsExpected, confidenceLevel:confidenceLevel, gameAnalisysDetails:gameAnalisysDetails  });
            }

        }
        else if(pitcherBatterGame.gameExpectedResult){
            noConclusiveGames.push({gameExpectedResult: pitcherBatterGame.gameExpectedResult });
        }
        else{
            noConclusiveGames.push({gameExpectedResult: seriesWinnerGame });
        }


    }

    parlayGames = await sorting(parlayGames, "overallConfidence", "DESC");
    selectedGames = await sorting(selectedGames, "overallConfidence", "DESC");
    overSelectedGames = await sorting(overSelectedGames, "confidenceLevel", "DESC");
    underSelectedGames = await sorting(underSelectedGames, "confidenceLevel", "ASC");

    
    await save(date+"ParlayGames"+period, parlayGames, function(){}, "replace");
    await save(date+"SelectedGames"+period, selectedGames, function(){}, "replace");
    await save(date+"overSelectedGames"+period, overSelectedGames, function(){}, "replace");
    await save(date+"underSelectedGames"+period, underSelectedGames, function(){}, "replace");
    await save(date+"SonadoraGames"+period, noConclusiveGames, function(){}, "replace");

    

    }
    var allParlays = [];
    var parlayAll = await load(date+"ParlayGames"+0);
    var parlay7 = await load(date+"ParlayGames"+7);
    var parlay15 = await load(date+"ParlayGames"+3);

    allParlays = parlayAll.concat(parlay7);
    allParlays = allParlays.concat(parlay15);

    var parlaysGrouped = allParlays.reduce(function (r, a) {
        r[a.game] = r[a.game] || [];
        r[a.game].push(a);
        return r;
    }, Object.create(null));

    var gameKeys = Object.keys(parlaysGrouped);

    var finalParlay = [];
    for (let r = 0; r < gameKeys.length; r++) {
        const gameKey = gameKeys[r];
        var selection = parlaysGrouped[gameKey];
        var record ={game:gameKey, expectedWinner:"" ,avgHandicap:0, avgConfidence:0, algoCount:0};

        record.algoCount = selection.length;
        var sumHandicap =0;
        var sumConfidence = 0;
        var pastWinner = selection[0].expectedWinner;
        var isSameWinner = true;
        for (let y = 0; y < selection.length; y++) {
            const sel = selection[y];
            sumHandicap += sel.avgHandicapExp;
            sumConfidence += sel.overallConfidence;
            if(pastWinner != sel.expectedWinner)
            {
                isSameWinner = false;
                break;
            }
        }
        record.avgHandicap = sumHandicap/selection.length;
        record.avgConfidence = sumConfidence/selection.length;
        if(isSameWinner)
        {
            record.expectedWinner = pastWinner;
            finalParlay.push(record);
        }

    }

    var sortedParlays = await sorting(finalParlay,"avgConfidence","DESC")

    await save(date+"FinalParlay", sortedParlays, function(){}, "replace");
    var stopHere = "";
}


async function AlgoDetailedPitchingAndBattingAnalysis(date)
{
    var allGamesWithPitcherData = await load(date);
    var gams = [];
    if(allGamesWithPitcherData.length == 1)
    {
        gams = allGamesWithPitcherData[0].games;
    }
    else{
        gams = allGamesWithPitcherData;
    }
    for (let index = 0; index < gams.length; index++) {
        const game = gams[index];
        if(game.awayTeam.awayPitcherDataNew && game.homeTeam.homePitcherDataNew)
        {
            try{
            var awayPitcherData = game.awayTeam.awayPitcherDataNew[0];
            var homePitcherData = game.homeTeam.homePitcherDataNew[0];
            }
            catch{
                var stopHere = "";
            }
            
            var awayRunsF5 = homePitcherData.finalEra;
            var homeRunsF5 = awayPitcherData.finalEra;
            var expectedWinnerF5 = "";
            var resultTypeF5 = "draw";
            var runsDiffF5 = 0;

            if(awayRunsF5 > homeRunsF5)
            {
                runsDiffF5 = Math.round(awayRunsF5 - homeRunsF5);
                expectedWinnerF5 = game.awayTeam.awayTeam;
                if(runsDiffF5 != 0)
                {
                    resultTypeF5 = "Winner";
                }
                
            }
            else if(awayRunsF5 < homeRunsF5)
            {
                runsDiffF5 = Math.round(homeRunsF5 > awayRunsF5);
                expectedWinnerF5 = game.homeTeam.homeTeam;
                if(runsDiffF5 != 0)
                {
                    resultTypeF5 = "Winner";
                }
                
            }

        
            var relevingPitchersAllowedRuns = await load(date+"RelevingPitcherTeamsByRunsAllowed");

            var awayRelieverPitcherRuns = relevingPitchersAllowedRuns.filter(function(item){
                return item.teamName.replace(" ","").indexOf(game.awayTeam.awayTeam)>=0 || item.teamName.indexOf(game.awayTeam.awayTeam)>=0 ;         
                })[0];

            var homeRelieverPitcherRuns = relevingPitchersAllowedRuns.filter(function(item){
                return item.teamName.replace(" ","").replace(" ","").indexOf(game.homeTeam.homeTeam)>=0 ;         
                })[0];


            var runsBatterData = await load(date+"ScoringBattersTeamsByRuns");

            var awayBatterPowerByRuns = runsBatterData.filter(function(item){
                return item.teamName.replace(" ","").replace(" ","").replace(" ","").indexOf(game.awayTeam.awayTeam)>=0;         
                })[0];
            
            var awayAvgRunsSecondHalf = (awayBatterPowerByRuns.runsAvg)/2;
            var awayRunsSecondHalf = 0;

            var homeBatterPowerByRuns = runsBatterData.filter(function(item){
                return item.teamName.replace(" ","").replace(" ","").indexOf(game.homeTeam.homeTeam)>=0;         
                })[0];

            var homeAvgRunsSecondHalf = (homeBatterPowerByRuns.runsAvg)/2;

            var homeRunsSecondHalf = 0;

            if(awayRelieverPitcherRuns.relevingPitchingAvg < homeAvgRunsSecondHalf)
            {
                homeRunsSecondHalf = awayRelieverPitcherRuns.relevingPitchingAvg;
            }
            else if(awayRelieverPitcherRuns.relevingPitchingAvg > homeAvgRunsSecondHalf)
            {
                homeRunsSecondHalf = homeAvgRunsSecondHalf;
            }
            else{
                homeRunsSecondHalf = awayRelieverPitcherRuns.relevingPitchingAvg;
            }

            if(homeRelieverPitcherRuns.relevingPitchingAvg < awayAvgRunsSecondHalf)
            {
                awayRunsSecondHalf = homeRelieverPitcherRuns.relevingPitchingAvg;
            }
            else if(homeRelieverPitcherRuns.relevingPitchingAvg > awayAvgRunsSecondHalf)
            {
                awayRunsSecondHalf = awayAvgRunsSecondHalf;
            }
            else{
                awayRunsSecondHalf = homeRelieverPitcherRuns.relevingPitchingAvg;
            }

            var awayFinalExpectedRuns = awayRunsF5 + awayRunsSecondHalf;
            var homeFinalExpectedRuns = homeRunsF5 + homeRunsSecondHalf;

            var finalHandicapExpected = 0;
            var expectedFinalWinner = "";
            var resultTypeFinal = "draw";
            {
                if(awayFinalExpectedRuns > homeFinalExpectedRuns)
                {
                    finalHandicapExpected = Math.round(awayFinalExpectedRuns - homeFinalExpectedRuns);
                    expectedFinalWinner = game.awayTeam.awayTeam;
                    if(finalHandicapExpected != 0)
                    {
                        resultTypeFinal = "Winner";   
                    }
                }
                if(awayFinalExpectedRuns < homeFinalExpectedRuns)
                {
                    finalHandicapExpected = Math.round(homeFinalExpectedRuns - awayFinalExpectedRuns);
                    expectedFinalWinner = game.homeTeam.homeTeam;
                    if(finalHandicapExpected != 0)
                    {
                        resultTypeFinal = "Winner";   
                    }
                }
                
            }
            
            var finalTotalRunsExpected = awayFinalExpectedRuns + homeFinalExpectedRuns;

            game.gameExpectedResult = {
                expectedWinnerF5:expectedWinnerF5, 
                resultTypeF5:resultTypeF5, 
                awayRunsF5:awayRunsF5, 
                homeRunsF5:homeRunsF5,
                runsDiffF5: runsDiffF5,
                expectedFinalWinner:expectedFinalWinner,
                resultTypeFinal: resultTypeFinal,
                awayFinalExpectedRuns: awayFinalExpectedRuns,
                homeFinalExpectedRuns:homeFinalExpectedRuns,
                finalHandicapExpected:finalHandicapExpected,
                finalTotalRunsExpected:finalTotalRunsExpected
            };
        
            await save(date, allGamesWithPitcherData, function(){}, "replace");
            //console.log(expectedFinalWinner, finalHandicapExpected, resultTypeFinal,  finalTotalRunsExpected);
        }
        else{

            
    

            var stopHere = "";
        }
    }
    
    var stopHere = "";
}

async function PopulatePitcherData(date)
{
    var games = await load(date);
    var pitchersDataByGame = await load("PitchersByTeamByGame", "GameByGame");

    for (let index = 0; index < games.length; index++) {
        const game = games[index];
            
            var awayPitcherTeamsData = pitchersDataByGame.filter(function(item){
                return item.teamName == game.awayTeam.awayTeam;
            })[0].pitchersData;

            var awayPitcherData = awayPitcherTeamsData.filter(function(item){
                return item.pitcher.indexOf(game.awayTeam.awayPitcher) >= 0;
            });

            awayIndex = awayPitcherData.findIndex(x => x.date.indexOf(game.date) >= 0);
            
            var awayPitchData = awayPitcherData[awayIndex-1];
            
            game.awayTeam.awayPitcherDataNew = [
                {
                    currentEra: awayPitchData.eraGame,
                    carrerEra: awayPitchData.eraAvg,
                }];

                var homePitcherTeamsData = pitchersDataByGame.filter(function(item){
                    return item.teamName.replace(" ","") == game.homeTeam.homeTeam;
                })[0].pitchersData;
    
                var homePitcherData = homePitcherTeamsData.filter(function(item){
                    return item.pitcher.indexOf(game.homeTeam.homePitcher) >= 0;
                });
                
                homeIndex = homePitcherData.findIndex(x => x.date.indexOf(game.date) >= 0);
                
                if(homePitcherData.length > 1)
                {

                    var homePitchData = homePitcherData[homeIndex-1];
                }
                else{
                    var homePitchData = homePitcherData[homeIndex];
                }
                
                game.homeTeam.homePitcherDataNew = [
                    {
                        currentEra: homePitchData.eraGame,
                        carrerEra: homePitchData.eraAvg,
                    }];

            await save(date, games, function(){}, "replace");
        }
}

async function GetLatestTeamSchedules(date = null)
{
    var dateparts = Date().split(" ");
    if(dateparts[1] == "Jul")
    {
        var mmmmonth = "July";
    }
    else if(dateparts[1] == "Jun")
    {
        var mmmmonth = "June";
    }
    else if(dateparts[1] == "Aug")
    {
        var mmmmonth = "August";
    }
    else if(dateparts[1] == "Sep")
        {
            var mmmmonth = "September";
        }
        else if(dateparts[1] == "Oct")
            {
                var mmmmonth = "October";
            }
    else{
        var mmmmonth = dateparts[1];
    }
    
    var today = mmmmonth+parseInt(dateparts[2]);

    try{
        var teamsSchedule = await load(today+"th"+"TeamSchedules");
    }
    catch{
        try{
            var teamsSchedule = await load(today+"rd"+"TeamSchedules");
        }
        catch{
            try{
                var teamsSchedule = await load(today+"nd"+"TeamSchedules");
            }
            catch{
                try{
                    var teamsSchedule = await load(today+"st"+"TeamSchedules");
                }
                catch{
                    try{
                        await getScheduleData(today);
                        var teamsSchedule = await load(today+"TeamSchedules");
                    }
                    catch{
                        var stopHere = "";
                    }
                }
            }
        }
    }
    
    if(date)
    {
        var fullMonth = date.split(/[0-9]/)[0];
        var targetMonth = fullMonth.substring(0,3);
        var targetDate = date.replace(fullMonth, "").replace("th","").replace("rd","").replace("nd","").replace("st","");

        var scopeSchedule = teamsSchedule.filter(function(item){
            return item.period == 0;
        });
        var schedulesAllData = [];
        for (let uts = 0; uts < scopeSchedule.length; uts++) {
            const teamScheduleDet = scopeSchedule[uts].scheduleData;
            index = -1;
            var tries = 0;
            while(index == -1)
            {
                index = teamScheduleDet.findIndex(x => x.DATE.indexOf(targetMonth+" "+ (parseInt(targetDate)-tries)) >= 0);
                tries++;
            }
            try{
                var slicedSchedule = teamScheduleDet.slice(0,(index+1));

                var data = ProcessScheduleData(slicedSchedule, scopeSchedule[uts].teamName);
                for (let rd = 0; rd < data.length; rd++) {
                    const periodData = data[rd];
                    schedulesAllData.push(periodData);
                }
                await save(date+"TeamSchedules", schedulesAllData, function(){}, "replace");
            }
            catch(ex){
                console.log(ex);
                var stopHere = "";
            }
        }

        return schedulesAllData;
    }
    else{
        return teamsSchedule;
    }
}

async function BuildDayFiles(date)
{
    try{
        var teamsSchedule = await load(date+"TeamSchedules");
    }
    catch{
        var teamsSchedule = await GetLatestTeamSchedules(date);
    }
    var dataScope = teamsSchedule.filter(function(item){
        return item.period == 0;;         
        });
    
    var gamesInADay = [];
    var targetMonth = date.split(/[0-9]/)[0].substring(0,3);
    var targetDay = date.replace(/\D/g, "");
    var datee = targetMonth+" "+targetDay; 
    for (let index = 0; index < dataScope.length; index++) {
        const team = dataScope[index];
        var teamName = team.teamName;
        var games = team.scheduleData.filter(function(item){
            var dat = item.DATE.split(" ")[1] + " " + item.DATE.split(" ")[2];
            console.log(dat);
            console.log(datee);
            return dat.toLowerCase() == datee.toLocaleLowerCase();         
        });
        for (let wa = 0; wa < games.length; wa++) {
            const game = games[wa];
            if(game.OPPONENT.indexOf("@")>=0)
            {
                
                var gameDet = {
                    game:"", 
                    awayTeam: {
                        awayTeam: "",
                        awayId: "",
                        awayPitcher: ""
                    },
                    homeTeam: {
                        homeTeam: "",
                        homeId: "",
                        homePitcher: ""
                    },
                };

                
                gameDet.awayTeam.awayTeam = teamName;
                if(game.OPPONENT.indexOf("Los Angeles") >= 0 || game.OPPONENT.indexOf("St.") >= 0 || game.OPPONENT.indexOf("New York") >= 0 || game.OPPONENT.indexOf("Chicago") >= 0 || game.OPPONENT.indexOf("Boston") >= 0 )
                {
                    var potentialTeam = game.GAMELINK.split("-")[(game.GAMELINK.split("-")).length-1];
                    if(potentialTeam == "sox")
                    {
                        potentialTeam = game.GAMELINK.split("-")[(game.GAMELINK.split("-")).length-2];
                    }
                    gameDet.homeTeam.homeTeam = getTeam(potentialTeam);
                }
                else{
                    gameDet.homeTeam.homeTeam = getTeam(game.OPPONENT);
                }
                gameDet.date = game.DATE;
                gameDet.game = gameDet.awayTeam.awayTeam + " @ "+ gameDet.homeTeam.homeTeam;

                gameDet.awayTeam.awayPitcher = game.ISWIN == "Lost" ? game.LOSS.split(" ")[0] : game.WIN.split(" ")[0];
                gameDet.homeTeam.homePitcher = game.ISWIN == "Lost" ? game.WIN.split(" ")[0] : game.LOSS.split(" ")[0];

                gamesInADay.push(gameDet);
            }
            
        }
    }

    await save(date, gamesInADay, function(){}, "replace");
    return gamesInADay;
}

async function BuildPreviousDayFiles(date, year)
{
    try{
        var teamsSchedule = await load(year+"TeamSchedules", year);
    }
    catch{
        //var teamsSchedule = await GetLatestTeamSchedules(date);
    }
    var dataScope = teamsSchedule.filter(function(item){
        return item.period == 0; 
        });
    
    var gamesInADay = [];
    var targetMonth = date.split(/[0-9]/)[0].substring(0,3);
    var targetDay = date.replace(/\D/g, "");
    var datee = targetMonth+" "+targetDay; 
    for (let index = 0; index < dataScope.length; index++) {
        const team = dataScope[index];
        var teamName = team.teamName;
        var games = team.scheduleData.filter(function(item){
            var dat = item.DATE.split(" ")[1] + " " + item.DATE.split(" ")[2];
            console.log(dat);
            console.log(datee);
            return dat.toLowerCase() == datee.toLocaleLowerCase();         
        });
        for (let wa = 0; wa < games.length; wa++) {
            const game = games[wa];
            if(game.OPPONENT.indexOf("@")>=0)
            {
                
                var gameDet = {
                    game:"", 
                    awayTeam: {
                        awayTeam: "",
                        awayId: "",
                        awayPitcher: ""
                    },
                    homeTeam: {
                        homeTeam: "",
                        homeId: "",
                        homePitcher: ""
                    },
                };

                
                gameDet.awayTeam.awayTeam = teamName;
                if(game.OPPONENT.indexOf("Los Angeles") >= 0 || game.OPPONENT.indexOf("St.") >= 0 || game.OPPONENT.indexOf("New York") >= 0 || game.OPPONENT.indexOf("Chicago") >= 0 || game.OPPONENT.indexOf("Boston") >= 0 )
                {
                    var potentialTeam = game.GAMELINK.split("-")[(game.GAMELINK.split("-")).length-1];
                    if(potentialTeam == "sox")
                    {
                        potentialTeam = game.GAMELINK.split("-")[(game.GAMELINK.split("-")).length-2];
                    }
                    gameDet.homeTeam.homeTeam = getTeam(potentialTeam);
                }
                else{
                    gameDet.homeTeam.homeTeam = getTeam(game.OPPONENT);
                }
                gameDet.date = game.DATE;
                gameDet.game = gameDet.awayTeam.awayTeam + " @ "+ gameDet.homeTeam.homeTeam;

                gameDet.awayTeam.awayPitcher = game.ISWIN == "Lost" ? game.LOSS.split(" ")[0] : game.WIN.split(" ")[0];
                gameDet.homeTeam.homePitcher = game.ISWIN == "Lost" ? game.WIN.split(" ")[0] : game.LOSS.split(" ")[0];

                gamesInADay.push(gameDet);
            }
            
        }
    }

    await save(date, gamesInADay, function(){}, "replace", year+"/"+date);
    return gamesInADay;
}

function getTeam(originalTeam)
{
    var homeTeam = originalTeam.replace("@\n","");
    var homeParts = homeTeam.split(" ");
    var homeTeam = "";
    var initials = "";
    if(homeParts.length > 1)
    {
        initials = homeParts[0].substring(0,1) + homeParts[1].substring(0,1);
    }
    else if(homeParts.length == 1 && originalTeam != "angels"&& originalTeam != "yankees" && originalTeam != "mets" && originalTeam != "white"&& originalTeam != "cubs"&& originalTeam != "cardinals")
    {
        initials = homeParts[0].substring(0,3);
    }
    else{
        initials = originalTeam;
    }
    var possibleTeams = teams.filter(function(item){
        return item.team.toLowerCase().indexOf(initials.toLowerCase())>=0 && item.url.toLowerCase().indexOf(initials.toLowerCase())>=0;
    });
    if(possibleTeams.length == 1)
    {
        homeTeam = possibleTeams[0].team.replace(" ","");
    }
    else{
        var possibleTeams = teams.filter(function(item){
            return item.url.toLowerCase().indexOf(homeParts[0].toLowerCase())>=0 && item.url.toLowerCase().indexOf(initials.toLowerCase())>=0;
        });
        if(possibleTeams.length == 1)
        {
            homeTeam = possibleTeams[0].team.replace(" ","");
        }
        else{
            if(originalTeam == "red")
            {
                var possibleTeams = possibleTeams.filter(function(item){
                    return item.url.toLowerCase().indexOf("cin") < 0;
                });

                if(possibleTeams.length == 1)
                {
                    homeTeam = possibleTeams[0].team.replace(" ","");
                }
                else{
                    var stopHere = "";
                }

            }
        }
    }

    return homeTeam;
}

async function AlgoSeriesWinnerBasedOnResultAndPattern(date)
{
    try{
        var allGames = await load(date);
    }
    catch{
        var allGames = await BuildDayFiles(date);
    }

    
    var dataPeriod = [0,7,3];
    for (let a = 0; a < dataPeriod.length; a++) {
        const period = dataPeriod[a];
        try{
            var teamsResultsData = await load(date+"TeamSchedules");
        }
        catch{
            var teamsResultsData = await GetLatestTeamSchedules(date);
        }
        var dataScope = teamsResultsData.filter(function(item){
            return item.period == period;         
            });

        await getMoreWininigTeams(date);
        await getMoreScoringTeams(date);
        await getMoreReceivingTeams(date);
        var teamsReceivingRuns = await load(date+"TeamSchedulesByReceiving"+period);
        var teamsScoringRuns = await load(date+"TeamSchedulesByScoring"+period);
        var teamsWinningResults = await load(date+"TeamSchedulesByWinning"+period);

        var noDataGames = [];
        var winnersByResults = [];
        var gams = [];
        if(allGames.length == 1)
        {
            gams = allGames[0].games
        }
        else{
            gams = allGames
        }
        for (let index = 0; index < gams.length; index++) {
            const game = gams[index];
            

            /// Comparing Results
            
            var teamHomeResultsData = dataScope.filter(function(item){
                return item.teamName.replace(" ","").indexOf(game.homeTeam.homeTeam)>=0;         
                })[0];
            
            var homeReceivingRanking = teamsReceivingRuns.findIndex((team) => team.teamName.indexOf(game.homeTeam.homeTeam)>=0);
            var homeScoringRanking = teamsScoringRuns.findIndex((team) => team.teamName.indexOf(game.homeTeam.homeTeam)>=0);
            var homeWinningRanking = teamsWinningResults.findIndex((team) => team.teamName.indexOf(game.homeTeam.homeTeam)>=0);

            var teamAwayResultsData = dataScope.filter(function(item){
                return item.teamName.replace(" ","").indexOf(game.awayTeam.awayTeam)>=0;         
                })[0];
            
            var awayReceivingRanking = teamsReceivingRuns.findIndex((team) => team.teamName.indexOf(game.awayTeam.awayTeam)>=0);
            var awayScoringRanking = teamsScoringRuns.findIndex((team) => team.teamName.indexOf(game.awayTeam.awayTeam)>=0);
            var awayWinningRanking = teamsWinningResults.findIndex((team) => team.teamName.indexOf(game.awayTeam.awayTeam)>=0);

            var WinningRankingWithDiff = (awayWinningRanking>=homeWinningRanking) ? 
                                            {WinningRankingBest: game.homeTeam.homeTeam,
                                            WinningRankingDiff:(awayWinningRanking - homeWinningRanking), 
                                            WinningGamesCountDiff: (teamHomeResultsData.totalWins - teamAwayResultsData.totalWins )} 
                                            : 
                                            {WinningRankingBest: game.awayTeam.awayTeam,
                                                WinningRankingDiff:(homeWinningRanking - awayWinningRanking), 
                                                WinningGamesCountDiff: (teamAwayResultsData.totalWins - teamHomeResultsData.totalWins )};

            var ScoringRankingWithDiff = (awayScoringRanking>=homeScoringRanking) ? 
            {ScoringRankingBest: game.homeTeam.homeTeam,
                ScoringRankingDiff:(awayScoringRanking - homeScoringRanking), 
                ScoringGamesCountDiff: (teamHomeResultsData.totalRunsScored - teamAwayResultsData.totalRunsScored )} 
                : 
                {ScoringRankingBest: game.awayTeam.awayTeam,
                ScoringRankingDiff:(homeScoringRanking - awayScoringRanking), 
                ScoringGamesCountDiff: (teamAwayResultsData.totalRunsScored - teamHomeResultsData.totalRunsScored )};


            var ReceivingRankingWithDiff = (awayReceivingRanking<=homeReceivingRanking) ? 
            {ReceivingRankingBest: game.awayTeam.awayTeam,
                ReceivingRankingDiff:(homeReceivingRanking - awayReceivingRanking), 
                ReceivingGamesCountDiff: (teamHomeResultsData.totalRunsReceived - teamAwayResultsData.totalRunsReceived )} 
                : 
                {ReceivingRankingBest: game.homeTeam.homeTeam,
                ReceivingRankingDiff:(awayReceivingRanking - homeReceivingRanking), 
                ReceivingGamesCountDiff: (teamAwayResultsData.totalRunsReceived - teamHomeResultsData.totalRunsReceived )};


            var winningExpectedWinner = "";
            var runsExpectedWinner = "";
            var confidenceRanking = 0;

            if(WinningRankingWithDiff.WinningGamesCountDiff > 0)
            {
                winningExpectedWinner = WinningRankingWithDiff.WinningRankingBest;
                confidenceRanking += WinningRankingWithDiff.WinningGamesCountDiff;

                if(ScoringRankingWithDiff.ScoringGamesCountDiff > ReceivingRankingWithDiff.ReceivingGamesCountDiff)
                {
                    runsExpectedWinner = ScoringRankingWithDiff.ScoringRankingBest;
                    
                    if(ScoringRankingWithDiff.ScoringRankingBest == ReceivingRankingWithDiff.ReceivingRankingBest)
                    {
                        confidenceRanking += (ScoringRankingWithDiff.ScoringGamesCountDiff + ReceivingRankingWithDiff.ReceivingGamesCountDiff);
                    }
                    else{
                        confidenceRanking += (ScoringRankingWithDiff.ScoringGamesCountDiff - ReceivingRankingWithDiff.ReceivingGamesCountDiff);
                    }
                }
                else if(ScoringRankingWithDiff.ScoringGamesCountDiff < ReceivingRankingWithDiff.ReceivingGamesCountDiff)
                {
                    runsExpectedWinner = ReceivingRankingWithDiff.ReceivingRankingBest;
                    
                    if(ScoringRankingWithDiff.ScoringRankingBest == ReceivingRankingWithDiff.ReceivingRankingBest)
                    {
                        confidenceRanking += (ScoringRankingWithDiff.ScoringGamesCountDiff + ReceivingRankingWithDiff.ReceivingGamesCountDiff);
                    }
                    else{
                        confidenceRanking += (ReceivingRankingWithDiff.ReceivingGamesCountDiff - ScoringRankingWithDiff.ScoringGamesCountDiff);
                    }

                }
                else{
                    runsExpectedWinner = winningExpectedWinner;
                }

            }
            else{

                if(ScoringRankingWithDiff.ScoringGamesCountDiff > ReceivingRankingWithDiff.ReceivingGamesCountDiff)
                {
                    runsExpectedWinner = ScoringRankingWithDiff.ScoringRankingBest;

                    if(ScoringRankingWithDiff.ScoringRankingBest == ReceivingRankingWithDiff.ReceivingRankingBest)
                    {
                        confidenceRanking += (ScoringRankingWithDiff.ScoringGamesCountDiff + ReceivingRankingWithDiff.ReceivingGamesCountDiff);
                    }
                    else{
                        confidenceRanking += (ScoringRankingWithDiff.ScoringGamesCountDiff - ReceivingRankingWithDiff.ReceivingGamesCountDiff);
                    }
                }
                else if(ScoringRankingWithDiff.ScoringGamesCountDiff < ReceivingRankingWithDiff.ReceivingGamesCountDiff)
                {
                    runsExpectedWinner = ReceivingRankingWithDiff.ReceivingRankingBest;

                    if(ScoringRankingWithDiff.ScoringRankingBest == ReceivingRankingWithDiff.ReceivingRankingBest)
                    {
                        confidenceRanking += (ScoringRankingWithDiff.ScoringGamesCountDiff + ReceivingRankingWithDiff.ReceivingGamesCountDiff);
                    }
                    else{
                        confidenceRanking += (ReceivingRankingWithDiff.ReceivingGamesCountDiff - ScoringRankingWithDiff.ScoringGamesCountDiff);
                    }
                }
                else{
                    runsExpectedWinner = "No clear winner";
                }

                winningExpectedWinner = runsExpectedWinner;
            }

            
            var winsAndRunsCalcResult = (winningExpectedWinner == runsExpectedWinner && WinningRankingWithDiff.WinningRankingBest == winningExpectedWinner) ? 
            {   game: game.game,
                seriesExpectedWinner: runsExpectedWinner, isConsistent: true, confidenceRanking: confidenceRanking,
            analysisData: {winningExpectedWinner:winningExpectedWinner, 
                            runsExpectedWinner:runsExpectedWinner,
                            teamsData: { 
                                    teamHomeResultsData:teamHomeResultsData, 
                                    teamAwayResultsData: teamAwayResultsData,
                                    WinningRankingWithDiff: WinningRankingWithDiff,
                                    ScoringRankingWithDiff:ScoringRankingWithDiff,
                                    ReceivingRankingWithDiff: ReceivingRankingWithDiff
                                        }} } 
            : 
            {   game: game.game,
                seriesExpectedWinner: runsExpectedWinner, isConsistent: false, confidenceRanking: confidenceRanking,
                analysisData: {winningExpectedWinner:winningExpectedWinner, 
                                runsExpectedWinner:runsExpectedWinner,
                                teamsData: { 
                                        teamHomeResultsData:teamHomeResultsData, 
                                        teamAwayResultsData: teamAwayResultsData,
                                        WinningRankingWithDiff: WinningRankingWithDiff,
                                        ScoringRankingWithDiff:ScoringRankingWithDiff,
                                        ReceivingRankingWithDiff: ReceivingRankingWithDiff
                                            }} } 


            winsAndRunsCalcResult.expectedTotalScore = ((winsAndRunsCalcResult.seriesExpectedWinner == teamHomeResultsData.teamName) ? 
                                ((teamHomeResultsData.avgRunsScored >= teamAwayResultsData.avgRunsReceived) ? teamHomeResultsData.avgRunsScored:teamAwayResultsData.avgRunsReceived) + 
                                ((teamHomeResultsData.avgRunsReceived <= teamAwayResultsData.avgRunsScored) ? teamHomeResultsData.avgRunsReceived:teamAwayResultsData.avgRunsScored)
                                : 
                                ((teamAwayResultsData.avgRunsScored >= teamHomeResultsData.avgRunsReceived) ? teamAwayResultsData.avgRunsScored:teamHomeResultsData.avgRunsReceived) + 
                                ((teamAwayResultsData.avgRunsReceived <= teamHomeResultsData.avgRunsScored) ? teamAwayResultsData.avgRunsReceived:teamHomeResultsData.avgRunsScored)
                            );
            
            winsAndRunsCalcResult.expectedWinnerRuns = ((winsAndRunsCalcResult.seriesExpectedWinner == teamHomeResultsData.teamName) ? 
                ((teamHomeResultsData.avgRunsScored >= teamAwayResultsData.avgRunsReceived) ? teamHomeResultsData.avgRunsScored:teamAwayResultsData.avgRunsReceived) 
                : 
                ((teamAwayResultsData.avgRunsScored >= teamHomeResultsData.avgRunsReceived) ? teamAwayResultsData.avgRunsScored:teamHomeResultsData.avgRunsReceived) 
            );

            winsAndRunsCalcResult.expectedLoserRuns = ((winsAndRunsCalcResult.seriesExpectedWinner == teamHomeResultsData.teamName) ? 
                                ((teamHomeResultsData.avgRunsReceived <= teamAwayResultsData.avgRunsScored) ? teamHomeResultsData.avgRunsReceived:teamAwayResultsData.avgRunsScored)
                                : 
                                ((teamAwayResultsData.avgRunsReceived <= teamHomeResultsData.avgRunsScored) ? teamAwayResultsData.avgRunsReceived:teamHomeResultsData.avgRunsScored)
                            );

            winsAndRunsCalcResult.expectedHandicap = winsAndRunsCalcResult.expectedWinnerRuns - winsAndRunsCalcResult.expectedLoserRuns;
                                            
            winnersByResults.push(winsAndRunsCalcResult);
        }
        var highestConfidence = await sorting(winnersByResults, "confidenceRanking", "DESC");
        highestConfidence = highestConfidence.filter(function(item){
            return item.isConsistent == true;         
            });

        var highestHandicap = await sorting(highestConfidence, "expectedHandicap", "DESC");

        var highestScore = await sorting(winnersByResults, "expectedTotalScore", "DESC");

        await save(date+"SeriesWinners"+period, winnersByResults, function(){},"replace");
    }
    

}

async function AlgoPreviousSeriesWinnerBasedOnResultAndPattern(date, year)
{
    try{
        var allGames = await load(date, year);
    }
    catch{
        var allGames = await BuildPreviousDayFiles(date,year);
    }

    
    var dataPeriod = [0,7,3];
    for (let a = 0; a < dataPeriod.length; a++) {
        const period = dataPeriod[a];
        try{
            var teamsResultsData = await load(year+"TeamSchedules", year);
        }
        catch{
            //var teamsResultsData = await GetLatestTeamSchedules(date);
        }
        var dataScope = teamsResultsData.filter(function(item){
            return item.period == period;         
            });

        await getPreviousMoreWininigTeams(date, year);
        await getPreviousMoreScoringTeams(date, year);
        await getPreviousMoreReceivingTeams(date, year);
        var teamsReceivingRuns = await load(date+"TeamSchedulesByReceiving"+period, year+"/"+date);
        var teamsScoringRuns = await load(date+"TeamSchedulesByScoring"+period, year+"/"+date);
        var teamsWinningResults = await load(date+"TeamSchedulesByWinning"+period, year+"/"+date);

        var noDataGames = [];
        var winnersByResults = [];
        var gams = [];
        // if(allGames.length == 1)
        // {
        //     gams = allGames[0].games
        // }
        //else{
            gams = allGames
        //}
        for (let index = 0; index < gams.length; index++) {
            const game = gams[index];
            

            /// Comparing Results
            
            var teamHomeResultsData = dataScope.filter(function(item){
                return item.teamName.indexOf(game.homeTeam.homeTeam)>=0;         
                })[0];
            
            var homeReceivingRanking = teamsReceivingRuns.findIndex((team) => team.teamName.indexOf(game.homeTeam.homeTeam)>=0);
            var homeScoringRanking = teamsScoringRuns.findIndex((team) => team.teamName.indexOf(game.homeTeam.homeTeam)>=0);
            var homeWinningRanking = teamsWinningResults.findIndex((team) => team.teamName.indexOf(game.homeTeam.homeTeam)>=0);

            var teamAwayResultsData = dataScope.filter(function(item){
                return item.teamName.indexOf(game.awayTeam.awayTeam)>=0;         
                })[0];
            
            var awayReceivingRanking = teamsReceivingRuns.findIndex((team) => team.teamName.indexOf(game.awayTeam.awayTeam)>=0);
            var awayScoringRanking = teamsScoringRuns.findIndex((team) => team.teamName.indexOf(game.awayTeam.awayTeam)>=0);
            var awayWinningRanking = teamsWinningResults.findIndex((team) => team.teamName.indexOf(game.awayTeam.awayTeam)>=0);

            var WinningRankingWithDiff = (awayWinningRanking>=homeWinningRanking) ? 
                                            {WinningRankingBest: game.homeTeam.homeTeam,
                                            WinningRankingDiff:(awayWinningRanking - homeWinningRanking), 
                                            WinningGamesCountDiff: (teamHomeResultsData.totalWins - teamAwayResultsData.totalWins )} 
                                            : 
                                            {WinningRankingBest: game.awayTeam.awayTeam,
                                                WinningRankingDiff:(homeWinningRanking - awayWinningRanking), 
                                                WinningGamesCountDiff: (teamAwayResultsData.totalWins - teamHomeResultsData.totalWins )};

            var ScoringRankingWithDiff = (awayScoringRanking>=homeScoringRanking) ? 
            {ScoringRankingBest: game.homeTeam.homeTeam,
                ScoringRankingDiff:(awayScoringRanking - homeScoringRanking), 
                ScoringGamesCountDiff: (teamHomeResultsData.totalRunsScored - teamAwayResultsData.totalRunsScored )} 
                : 
                {ScoringRankingBest: game.awayTeam.awayTeam,
                ScoringRankingDiff:(homeScoringRanking - awayScoringRanking), 
                ScoringGamesCountDiff: (teamAwayResultsData.totalRunsScored - teamHomeResultsData.totalRunsScored )};


            var ReceivingRankingWithDiff = (awayReceivingRanking<=homeReceivingRanking) ? 
            {ReceivingRankingBest: game.awayTeam.awayTeam,
                ReceivingRankingDiff:(homeReceivingRanking - awayReceivingRanking), 
                ReceivingGamesCountDiff: (teamHomeResultsData.totalRunsReceived - teamAwayResultsData.totalRunsReceived )} 
                : 
                {ReceivingRankingBest: game.homeTeam.homeTeam,
                ReceivingRankingDiff:(awayReceivingRanking - homeReceivingRanking), 
                ReceivingGamesCountDiff: (teamAwayResultsData.totalRunsReceived - teamHomeResultsData.totalRunsReceived )};


            var winningExpectedWinner = "";
            var runsExpectedWinner = "";
            var confidenceRanking = 0;

            if(WinningRankingWithDiff.WinningGamesCountDiff > 0)
            {
                winningExpectedWinner = WinningRankingWithDiff.WinningRankingBest;
                confidenceRanking += WinningRankingWithDiff.WinningGamesCountDiff;

                if(ScoringRankingWithDiff.ScoringGamesCountDiff > ReceivingRankingWithDiff.ReceivingGamesCountDiff)
                {
                    runsExpectedWinner = ScoringRankingWithDiff.ScoringRankingBest;
                    
                    if(ScoringRankingWithDiff.ScoringRankingBest == ReceivingRankingWithDiff.ReceivingRankingBest)
                    {
                        confidenceRanking += (ScoringRankingWithDiff.ScoringGamesCountDiff + ReceivingRankingWithDiff.ReceivingGamesCountDiff);
                    }
                    else{
                        confidenceRanking += (ScoringRankingWithDiff.ScoringGamesCountDiff - ReceivingRankingWithDiff.ReceivingGamesCountDiff);
                    }
                }
                else if(ScoringRankingWithDiff.ScoringGamesCountDiff < ReceivingRankingWithDiff.ReceivingGamesCountDiff)
                {
                    runsExpectedWinner = ReceivingRankingWithDiff.ReceivingRankingBest;
                    
                    if(ScoringRankingWithDiff.ScoringRankingBest == ReceivingRankingWithDiff.ReceivingRankingBest)
                    {
                        confidenceRanking += (ScoringRankingWithDiff.ScoringGamesCountDiff + ReceivingRankingWithDiff.ReceivingGamesCountDiff);
                    }
                    else{
                        confidenceRanking += (ReceivingRankingWithDiff.ReceivingGamesCountDiff - ScoringRankingWithDiff.ScoringGamesCountDiff);
                    }

                }
                else{
                    runsExpectedWinner = winningExpectedWinner;
                }

            }
            else{

                if(ScoringRankingWithDiff.ScoringGamesCountDiff > ReceivingRankingWithDiff.ReceivingGamesCountDiff)
                {
                    runsExpectedWinner = ScoringRankingWithDiff.ScoringRankingBest;

                    if(ScoringRankingWithDiff.ScoringRankingBest == ReceivingRankingWithDiff.ReceivingRankingBest)
                    {
                        confidenceRanking += (ScoringRankingWithDiff.ScoringGamesCountDiff + ReceivingRankingWithDiff.ReceivingGamesCountDiff);
                    }
                    else{
                        confidenceRanking += (ScoringRankingWithDiff.ScoringGamesCountDiff - ReceivingRankingWithDiff.ReceivingGamesCountDiff);
                    }
                }
                else if(ScoringRankingWithDiff.ScoringGamesCountDiff < ReceivingRankingWithDiff.ReceivingGamesCountDiff)
                {
                    runsExpectedWinner = ReceivingRankingWithDiff.ReceivingRankingBest;

                    if(ScoringRankingWithDiff.ScoringRankingBest == ReceivingRankingWithDiff.ReceivingRankingBest)
                    {
                        confidenceRanking += (ScoringRankingWithDiff.ScoringGamesCountDiff + ReceivingRankingWithDiff.ReceivingGamesCountDiff);
                    }
                    else{
                        confidenceRanking += (ReceivingRankingWithDiff.ReceivingGamesCountDiff - ScoringRankingWithDiff.ScoringGamesCountDiff);
                    }
                }
                else{
                    runsExpectedWinner = "No clear winner";
                }

                winningExpectedWinner = runsExpectedWinner;
            }

            
            var winsAndRunsCalcResult = (winningExpectedWinner == runsExpectedWinner && WinningRankingWithDiff.WinningRankingBest == winningExpectedWinner) ? 
            {   game: game.game,
                seriesExpectedWinner: runsExpectedWinner, isConsistent: true, confidenceRanking: confidenceRanking,
            analysisData: {winningExpectedWinner:winningExpectedWinner, 
                            runsExpectedWinner:runsExpectedWinner,
                            teamsData: { 
                                    teamHomeResultsData:teamHomeResultsData, 
                                    teamAwayResultsData: teamAwayResultsData,
                                    WinningRankingWithDiff: WinningRankingWithDiff,
                                    ScoringRankingWithDiff:ScoringRankingWithDiff,
                                    ReceivingRankingWithDiff: ReceivingRankingWithDiff
                                        }} } 
            : 
            {   game: game.game,
                seriesExpectedWinner: runsExpectedWinner, isConsistent: false, confidenceRanking: confidenceRanking,
                analysisData: {winningExpectedWinner:winningExpectedWinner, 
                                runsExpectedWinner:runsExpectedWinner,
                                teamsData: { 
                                        teamHomeResultsData:teamHomeResultsData, 
                                        teamAwayResultsData: teamAwayResultsData,
                                        WinningRankingWithDiff: WinningRankingWithDiff,
                                        ScoringRankingWithDiff:ScoringRankingWithDiff,
                                        ReceivingRankingWithDiff: ReceivingRankingWithDiff
                                            }} } 


            winsAndRunsCalcResult.expectedTotalScore = ((winsAndRunsCalcResult.seriesExpectedWinner == teamHomeResultsData.teamName) ? 
                                ((teamHomeResultsData.avgRunsScored >= teamAwayResultsData.avgRunsReceived) ? teamHomeResultsData.avgRunsScored:teamAwayResultsData.avgRunsReceived) + 
                                ((teamHomeResultsData.avgRunsReceived <= teamAwayResultsData.avgRunsScored) ? teamHomeResultsData.avgRunsReceived:teamAwayResultsData.avgRunsScored)
                                : 
                                ((teamAwayResultsData.avgRunsScored >= teamHomeResultsData.avgRunsReceived) ? teamAwayResultsData.avgRunsScored:teamHomeResultsData.avgRunsReceived) + 
                                ((teamAwayResultsData.avgRunsReceived <= teamHomeResultsData.avgRunsScored) ? teamAwayResultsData.avgRunsReceived:teamHomeResultsData.avgRunsScored)
                            );
            
            winsAndRunsCalcResult.expectedWinnerRuns = ((winsAndRunsCalcResult.seriesExpectedWinner == teamHomeResultsData.teamName) ? 
                ((teamHomeResultsData.avgRunsScored >= teamAwayResultsData.avgRunsReceived) ? teamHomeResultsData.avgRunsScored:teamAwayResultsData.avgRunsReceived) 
                : 
                ((teamAwayResultsData.avgRunsScored >= teamHomeResultsData.avgRunsReceived) ? teamAwayResultsData.avgRunsScored:teamHomeResultsData.avgRunsReceived) 
            );

            winsAndRunsCalcResult.expectedLoserRuns = ((winsAndRunsCalcResult.seriesExpectedWinner == teamHomeResultsData.teamName) ? 
                                ((teamHomeResultsData.avgRunsReceived <= teamAwayResultsData.avgRunsScored) ? teamHomeResultsData.avgRunsReceived:teamAwayResultsData.avgRunsScored)
                                : 
                                ((teamAwayResultsData.avgRunsReceived <= teamHomeResultsData.avgRunsScored) ? teamAwayResultsData.avgRunsReceived:teamHomeResultsData.avgRunsScored)
                            );

            winsAndRunsCalcResult.expectedHandicap = winsAndRunsCalcResult.expectedWinnerRuns - winsAndRunsCalcResult.expectedLoserRuns;
                                            
            winnersByResults.push(winsAndRunsCalcResult);
        }
        var highestConfidence = await sorting(winnersByResults, "confidenceRanking", "DESC");
        highestConfidence = highestConfidence.filter(function(item){
            return item.isConsistent == true;         
            });

        var highestHandicap = await sorting(highestConfidence, "expectedHandicap", "DESC");

        var highestScore = await sorting(winnersByResults, "expectedTotalScore", "DESC");

        await save(date+"SeriesWinners"+period, winnersByResults, function(){},"replace", year+"/"+date);
    }
    

}

async function getBestScoringTeamsByBatting(date)
{
    var battersData = await load(date+"BattersData");

    var scoringBattersTeams = await sorting(battersData, "runsAvg", "DESC");
    await save(date+"ScoringBattersTeamsByRuns", scoringBattersTeams, function(){}, "replace");
}

async function getBestHittingTeamsByBatting(date)
{
    var battersData = await load(date+"BattersData");

    var hittingBattersTeams = await sorting(battersData, "hitsAvg", "DESC");
    await save(date+"HittingBattersTeamsByHits", hittingBattersTeams, function(){}, "replace");
}

async function getBestOverallPitchersTeams(date)
{
    var pitchersData = await load(date+"PitchersData");

    var overallPitchersTeams = await sorting(pitchersData, "totalPitchingAvgRuns", "ASC");
    await save(date+"OverallPitcherTeamsByRunsAllowed", overallPitchersTeams, function(){}, "replace");
}

async function getBestStartingPitchersTeams(date)
{
    var pitchersData = await load(date+"PitchersData");

    var bestStartingPitchersTeams = await sorting(pitchersData, "starterPitchingAvg", "ASC");
    await save(date+"StarterPitcherTeamsByRunsAllowed", bestStartingPitchersTeams, function(){}, "replace");
}

async function getBestRelievingPitchersTeams(date)
{
    var pitchersData = await load(date+"PitchersData");

    var bestRelevingPitchersTeams = await sorting(pitchersData, "relevingPitchingAvg", "ASC");
    await save(date+"RelevingPitcherTeamsByRunsAllowed", bestRelevingPitchersTeams, function(){}, "replace");
}

async function getResults(date)
{
    var teamsData = await load(date+"TeamSchedules");
    teamsData= teamsData.filter(function(item){
        return item.period == 0;         
        });
    var MLPicks = await load(date+"MLPicks");
    var OverPicks = await load(date+"OverPicks");
    var UnderPicks = await load(date+"UnderPicks");
    var OtherPicks = await load(date+"MLPicksOthers");
    var picksAndResults = [];
    var otherPicksAndResults = [];
    for (let index = 0; index < MLPicks.length; index++) {
        const pick = MLPicks[index];
        var teamData = teamsData.filter(function(item){
            return item.teamName.indexOf(pick.expectedWinner)>=0;         
            })[0];
        var isWin = teamData.scheduleData[teamData.scheduleData.length-1].ISWIN;
        var result = teamData.scheduleData[teamData.scheduleData.length-1].RESULT;
        picksAndResults.push({betType:"ML", game: pick.game, teamName: pick.expectedWinner, isWin: isWin, result:result});
    }
    await save(date+"picksAndResults", picksAndResults, function(){}, "replace");


    for (let index = 0; index < OverPicks.length; index++) {
        const pick = OverPicks[index];
        var teamData = teamsData.filter(function(item){
            return item.teamName.indexOf(pick.expectedWinner)>=0;         
            })[0];
        var totalRuns = parseInt(teamData.scheduleData[teamData.scheduleData.length-1].RUNSSCORED) + parseInt(teamData.scheduleData[teamData.scheduleData.length-1].RUNSRECEIVED);
        var isWin = totalRuns > 8.5 ? "Win":"Lost";
        picksAndResults.push({betType:"Over",game: pick.game, isWin: isWin, totalRuns:totalRuns});
    }

    for (let index = 0; index < UnderPicks.length; index++) {
        const pick = UnderPicks[index];
        var teamData = teamsData.filter(function(item){
            return item.teamName.indexOf(pick.expectedWinner)>=0;         
            })[0];
        var totalRuns = parseInt(teamData.scheduleData[teamData.scheduleData.length-1].RUNSSCORED) + parseInt(teamData.scheduleData[teamData.scheduleData.length-1].RUNSRECEIVED);
        var isWin = totalRuns < 8.5 ? "Win":"Lost";
        picksAndResults.push({betType:"Under",game: pick.game, isWin: isWin, totalRuns:totalRuns});
    }

    for (let index = 0; index < OtherPicks.length; index++) {
        const pick = OtherPicks[index];
        var teamData = teamsData.filter(function(item){
            return item.teamName.indexOf(pick.expectedWinner)>=0;         
            })[0];
        var isWin = teamData.scheduleData[teamData.scheduleData.length-1].ISWIN;
        var result = teamData.scheduleData[teamData.scheduleData.length-1].RESULT;
        otherPicksAndResults.push({betType:"ML", game: pick.game, teamName: pick.expectedWinner, isWin: isWin, result:result});
    }
    await save(date+"otherPicksAndResults", otherPicksAndResults, function(){}, "replace");

    var totalPickWins =  picksAndResults.filter(function(item){
        return item.isWin == "Win";         
        });

    var totalPickLoses =  picksAndResults.filter(function(item){
        return item.isWin == "Lost";         
        });

    var totalMLPickWins =  picksAndResults.filter(function(item){
        return item.isWin == "Win" && item.betType == "ML";         
        });

    var totalMLPickLoses =  picksAndResults.filter(function(item){
        return item.isWin == "Lost" && item.betType == "ML";         
        });

    var totalOverPickWins =  picksAndResults.filter(function(item){
        return item.isWin == "Win" && item.betType == "Over";         
        });

    var totalOverPickLoses =  picksAndResults.filter(function(item){
        return item.isWin == "Lost" && item.betType == "Over";         
        });
    
    var totalUnderPickWins =  picksAndResults.filter(function(item){
        return item.isWin == "Win" && item.betType == "Under";         
        });

    var totalUnderPickLoses =  picksAndResults.filter(function(item){
        return item.isWin == "Lost" && item.betType == "Under";         
        });
    

    var otherTotalPickWins =  otherPicksAndResults.filter(function(item){
        return item.isWin == "Win";         
        });

    var otherTotalPickLoses =  otherPicksAndResults.filter(function(item){
        return item.isWin == "Lost";         
        });


    var totalPicksWinPercentage = (totalPickWins.length*100)/picksAndResults.length;

    var totalPicksLostPercentage = (totalPickLoses.length*100)/picksAndResults.length;

    var MLWinPercentage = (totalMLPickWins.length*100)/(totalMLPickWins.length+totalMLPickLoses.length);

    var MLLostPercentage = (totalMLPickLoses.length*100)/(totalMLPickWins.length+totalMLPickLoses.length);

    var OverWinPercentage = (totalOverPickWins.length*100)/(totalOverPickWins.length+totalOverPickLoses.length);

    var OverLostPercentage = (totalOverPickLoses.length*100)/(totalOverPickWins.length+totalOverPickLoses.length);

    var UnderWinPercentage = (totalUnderPickWins.length*100)/(totalUnderPickWins.length+totalUnderPickLoses.length);

    var UnderLostPercentage = (totalUnderPickLoses.length*100)/(totalUnderPickWins.length+totalUnderPickLoses.length);

    var otherTotalWinPercentage = (otherTotalPickWins.length*100)/otherPicksAndResults.length;

    var otherTotalLostPercentage = (otherTotalPickLoses.length*100)/otherPicksAndResults.length;

    var totalWinPercentage = ((totalPickWins.length+otherTotalPickWins.length)*100)/(picksAndResults.length+otherPicksAndResults.length);

    var totalLostPercentage = ((totalPickLoses.length+otherTotalPickLoses.length)*100)/(picksAndResults.length+otherPicksAndResults.length);

    var totalPicksBets = picksAndResults.length;
    var totalPicksBetsWin = totalMLPickWins.length + totalOverPickWins.length+ totalUnderPickWins.length;
    var totalPicksBetsLost = totalMLPickLoses.length + totalOverPickLoses.length+ totalUnderPickLoses.length; 

    var otherBets = otherPicksAndResults.length;
    var otherTotalPickWin = otherTotalPickWins.length;
    var otherTotalPickLost = otherTotalPickLoses.length; 

    var totalBetsOverall = totalPicksBets +otherBets;
    var totalWinBetsOverall = totalPicksBetsWin + otherTotalPickWin;
    var totalLostBetsOverall = totalPicksBetsLost + otherTotalPickLost; 

    var summary = {date:date, 
        totalPicksBets:totalPicksBets,
        totalPicksBetsWin:totalPicksBetsWin,
        totalPicksBetsLost:totalPicksBetsLost,
        otherTotalPickWin:otherTotalPickWin,
        otherTotalPickLost:otherTotalPickLost,
        totalWinBetsOverall:totalWinBetsOverall,
        totalLostBetsOverall:totalLostBetsOverall,
        otherBets:otherBets,
        totalBetsOverall:totalBetsOverall,
        totalWinPercentage:totalWinPercentage,
        totalLostPercentage:totalLostPercentage,
        totalPicksWinPercentage:totalPicksWinPercentage, 
        totalPicksLostPercentage:totalPicksLostPercentage, 
        MLWinPercentage:MLWinPercentage,MLLostPercentage: MLLostPercentage, 
        OverWinPercentage:OverWinPercentage, OverLostPercentage:OverLostPercentage, 
        UnderWinPercentage:UnderWinPercentage, UnderLostPercentage:UnderLostPercentage ,
        picksAndResults:picksAndResults,
        otherTotalWinPercentage:otherTotalWinPercentage,
        otherTotalLostPercentage: otherTotalLostPercentage,
        otherPicksAndResults:otherPicksAndResults
    };

    await save(date+"picksAndResults", summary, function(){}, "replace");
    var stopHere = "";
}

    


async function getMoreWininigTeams(date)
{
    var teamsData = await load(date+"TeamSchedules");
    var dataPeriod = [0,7,3];
    for (let a = 0; a < dataPeriod.length; a++) {
        const period = dataPeriod[a];
        var dataScope = teamsData;
        var teamsInScope = teamsData.filter(function(item){
            return item.period == period;         
            });
        var moreWininngTeams = await sorting(teamsInScope, "totalWins", "DESC");
        await save(date+"TeamSchedulesByWinning"+period, moreWininngTeams, function(){}, "replace");
    }
    
}


async function getPreviousMoreWininigTeams(date, year)
{
    var teamsData = await load(year+"TeamSchedules", year);
    var dataPeriod = [0,7,3];
    for (let a = 0; a < dataPeriod.length; a++) {
        const period = dataPeriod[a];
        var dataScope = teamsData;
        var teamsInScope = teamsData.filter(function(item){
            return item.period == period;         
            });
        var moreWininngTeams = await sorting(teamsInScope, "totalWins", "DESC");
        await save(date+"TeamSchedulesByWinning"+period, moreWininngTeams, function(){}, "replace", year+"/"+date);
    }
    
}

async function getMoreScoringTeams(date)
{
    var teamsData = await load(date+"TeamSchedules");
    var dataPeriod = [0,7,3];
    for (let a = 0; a < dataPeriod.length; a++) {
        const period = dataPeriod[a];    
        var teamsInScope = teamsData.filter(function(item){
            return item.period == period;         
            });
        var moreScoringTeams = await sorting(teamsInScope, "avgRunsScored", "DESC");
        await save(date+"TeamSchedulesByScoring"+period, moreScoringTeams, function(){}, "replace");
        }
}

async function getPreviousMoreScoringTeams(date, year)
{
    var teamsData = await load(year+"TeamSchedules", year);
    var dataPeriod = [0,7,3];
    for (let a = 0; a < dataPeriod.length; a++) {
        const period = dataPeriod[a];    
        var teamsInScope = teamsData.filter(function(item){
            return item.period == period;         
            });
        var moreScoringTeams = await sorting(teamsInScope, "avgRunsScored", "DESC");
        await save(date+"TeamSchedulesByScoring"+period, moreScoringTeams, function(){}, "replace", year+"/"+date);
        }
}

async function getPreviousMoreReceivingTeams(date, year)
{
    var teamsData = await load(year+"TeamSchedules", year);
    var dataPeriod = [0,7,3];
    for (let a = 0; a < dataPeriod.length; a++) {
        const period = dataPeriod[a];
        
        var teamsInScope = teamsData.filter(function(item){
            return item.period == period;         
            });
        var moreReceivingTeams = await sorting(teamsInScope, "avgRunsReceived", "ASC");
        await save(date+"TeamSchedulesByReceiving"+period, moreReceivingTeams, function(){}, "replace", year+"/"+date);
        }
}

async function getMoreReceivingTeams(date)
{
    var teamsData = await load(date+"TeamSchedules");
    var dataPeriod = [0,7,3];
    for (let a = 0; a < dataPeriod.length; a++) {
        const period = dataPeriod[a];
        
        var teamsInScope = teamsData.filter(function(item){
            return item.period == period;         
            });
        var moreReceivingTeams = await sorting(teamsInScope, "avgRunsReceived", "ASC");
        await save(date+"TeamSchedulesByReceiving"+period, moreReceivingTeams, function(){}, "replace");
        }
}

async function filterConsistentPicks(date)
{
    var allGames = await load(date);
    var teamsData = await load(date+"TeamSchedules");
    teamsData = teamsData.filter(function(item){
        return item.period == 0;         
        });
    var picksSummary = [];
    var winningGames = allGames[0].games.filter(function(item){
        return item.selection == 1;         
        });

    for (let W = 0; W < winningGames.length; W++) {
        const game = winningGames[W];
        var expectedWinnerData = teamsData.filter(function(item){
            return item.teamName.replace(" ","").indexOf(game.expectedWinner)>=0;         
            })[0];

        game.isConfidentExpectedWinner = (expectedWinnerData.avgRunsScored>expectedWinnerData.avgRunsReceived && 
                                expectedWinnerData.totalWins> expectedWinnerData.totalLoses && expectedWinnerData.totalRunsScored > expectedWinnerData.totalRunsReceived) ? true: false;
        var opponentWinnerData = [];
        if(game.expectedWinner == game.awayTeam.awayTeam)
        {
            opponentWinnerData = teamsData.filter(function(item){
                return item.teamName.replace(" ","").indexOf(game.homeTeam.homeTeam)>=0;         
                })[0];
        }
        else{
            opponentWinnerData = teamsData.filter(function(item){
                return item.teamName.replace(" ","").indexOf(game.awayTeam.awayTeam)>=0;         
                })[0];
        }

        game.isDifficultOpponent = (opponentWinnerData.avgRunsScored>opponentWinnerData.avgRunsReceived && 
            opponentWinnerData.totalWins> opponentWinnerData.totalLoses && opponentWinnerData.totalRunsScored > opponentWinnerData.totalRunsReceived) ? true: false;

            var stopHere = "";
    }
    
    var confidentPicks = winningGames.filter(function(item){
        return item.isConfidentExpectedWinner == true && item.isDifficultOpponent == false ;         
        });
        for (let index = 0; index < confidentPicks.length; index++) {
            const pick = confidentPicks[index];
            picksSummary.push(pick);
        }

    var MLPicks = await sorting(confidentPicks, "diffRatio", "DESC");
    await save(date+"MLPicks", MLPicks, function(){}, "replace" );

    var otherGames = allGames[0].games.filter(function(item){
        return item.selection != 1;         
        });

        for (let W = 0; W < otherGames.length; W++) {
            const game = otherGames[W];
            if(typeof game.expectedWinner != "undefined")
            {
                var expectedWinnerData = teamsData.filter(function(item){
                    return item.teamName.replace(" ","").indexOf(game.expectedWinner)>=0;         
                    })[0];
        
                game.isConfidentExpectedWinner = (expectedWinnerData.avgRunsScored>expectedWinnerData.avgRunsReceived && 
                                        expectedWinnerData.totalWins> expectedWinnerData.totalLoses && expectedWinnerData.totalRunsScored > expectedWinnerData.totalRunsReceived) ? true: false;
                var opponentWinnerData = [];
                if(game.expectedWinner == game.awayTeam.awayTeam)
                {
                    opponentWinnerData = teamsData.filter(function(item){
                        return item.teamName.replace(" ","").indexOf(game.homeTeam.homeTeam)>=0;         
                        })[0];
                }
                else{
                    opponentWinnerData = teamsData.filter(function(item){
                        return item.teamName.replace(" ","").indexOf(game.awayTeam.awayTeam)>=0;         
                        })[0];
                }
        
                game.isDifficultOpponent = (opponentWinnerData.avgRunsScored>opponentWinnerData.avgRunsReceived && 
                    opponentWinnerData.totalWins> opponentWinnerData.totalLoses && opponentWinnerData.totalRunsScored > opponentWinnerData.totalRunsReceived) ? true: false;
        
                    var stopHere = "";
            }
        }
        
        var otherConfidentPicks = otherGames.filter(function(item){
            return item.isConfidentExpectedWinner == true && item.isDifficultOpponent == false ;         
            });
            for (let index = 0; index < otherConfidentPicks.length; index++) {
                const pick = otherConfidentPicks[index];
                picksSummary.push(pick);
            }
    
    var OtherMLPicks = await sorting(otherConfidentPicks, "selection", "ASC");
    await save(date+"MLPicksOthers", OtherMLPicks, function(){}, "replace" );

    var overGames = allGames[0].games.filter(function(item){
        return item.totalRunsExpectedInGame > 8;         
        });
    
    for (let W = 0; W < overGames.length; W++){
        const game = overGames[W];
        var expectedWinnerData = teamsData.filter(function(item){
            return item.teamName.replace(" ","").indexOf(game.expectedWinner)>=0;         
            })[0];

        if(game.expectedWinner == game.awayTeam.awayTeam)
        {
            opponentWinnerData = teamsData.filter(function(item){
                return item.teamName.replace(" ","").indexOf(game.homeTeam.homeTeam)>=0;         
                })[0];
        }
        else{
            opponentWinnerData = teamsData.filter(function(item){
                return item.teamName.replace(" ","").indexOf(game.awayTeam.awayTeam)>=0;         
                })[0];
        }

        game.isConfidentOverPick = (expectedWinnerData.avgRunsScored + opponentWinnerData.avgRunsScored) > 8 
        && (expectedWinnerData.avgRunsReceived + opponentWinnerData.avgRunsReceived) > 8
    }

    var overConfidentPicks = overGames.filter(function(item){
        return item.isConfidentOverPick == true ;         
        });
        for (let index = 0; index < overConfidentPicks.length; index++) {
            const pick = overConfidentPicks[index];
            picksSummary.push(pick);
        }

    var overPicks = await sorting(overConfidentPicks, "totalRunsExpectedInGame", "DESC");
    await save(date+"OverPicks", overPicks, function(){}, "replace");

    var underGames = allGames[0].games.filter(function(item){
        return item.totalRunsExpectedInGame < 8;         
        });

    var underPicks = await sorting(underGames, "totalRunsExpectedInGame", "ASC");
    await save(date+"UnderPicks", underPicks, function(){}, "replace");

    var allPicks = await sorting(picksSummary, "gameTime", "ASC");
    await save(date+"PicksSummary", picksSummary, function(){}, "replace" );


    var stopHere = "";
}

async function evaluateGames(date)
{
    var allGames = await load(date);
    var battersData = await load(date+"battersData");
    var teamsData = await load(date+"TeamSchedules");
    teamsData = teamsData.filter(function(item){
        return item.period == 0;         
        });
    var noDataGames = [];
    for (let index = 0; index < allGames[0].games.length; index++) {
        const game = allGames[0].games[index];
        if(game.awayTeam.awayPitcherData && game.homeTeam.homePitcherData)
        {
            var awayEra = parseFloat(game.awayTeam.awayPitcherData.filter(function(item){
                return item.dataField == "ERA";         
            })[0].value);
            var awayWHIP = parseFloat(game.awayTeam.awayPitcherData.filter(function(item){
            return item.dataField == "WHIP";         
            })[0].value);
            var awayK = parseFloat(game.awayTeam.awayPitcherData.filter(function(item){
                return item.dataField == "K";         
                })[0].value);
            var awayIP = parseFloat(game.awayTeam.awayPitcherData.filter(function(item){
                return item.dataField == "IP";         
                })[0].value);
            var awayGP = parseFloat(game.awayTeam.awayPitcherData.filter(function(item){
                return item.dataField == "GP";         
                })[0].value);
            var awayInningsPerGame = awayIP/awayGP;
            var awayStrikeoutsPerGame = awayK/awayGP;


            try{
            
            var homeEra = parseFloat(game.homeTeam.homePitcherData.filter(function(item){
                return item.dataField == "ERA";         
            })[0].value);
        }
        catch{
            var stopHere ="";
        }
            var homeWHIP = parseFloat(game.homeTeam.homePitcherData.filter(function(item){
            return item.dataField == "WHIP";         
            })[0].value);
            var homeK = parseFloat(game.homeTeam.homePitcherData.filter(function(item){
                return item.dataField == "K";         
                })[0].value);
            var homeIP = parseFloat(game.homeTeam.homePitcherData.filter(function(item){
                return item.dataField == "IP";         
                })[0].value);
            var homeGP = parseFloat(game.homeTeam.homePitcherData.filter(function(item){
                return item.dataField == "GP";         
                })[0].value);
            var homeInningsPerGame = homeIP/homeGP;
            var homeStrikeoutsPerGame = homeK/homeGP;

            var awayBatters = battersData.filter(function(item){
                return item.teamName.replace(" ","").indexOf(game.awayTeam.awayTeam)>=0;         
                })[0];

            var awayTeamsData = teamsData.filter(function(item){
                return item.teamName.replace(" ","").indexOf(game.awayTeam.awayTeam)>=0;         
                })[0];

            var homeBatters = battersData.filter(function(item){
                return item.teamName.replace(" ","").indexOf(game.homeTeam.homeTeam)>=0;         
                })[0];

            var homeTeamsData = teamsData.filter(function(item){
                return item.teamName.replace(" ","").indexOf(game.homeTeam.homeTeam)>=0;         
                })[0];
            


            var battingAvgDiff = awayBatters.battingAvg >= homeBatters.battingAvg ?  awayBatters.battingAvg - homeBatters.battingAvg :  homeBatters.battingAvg - awayBatters.battingAvg;
            var battingGameAvg = (awayBatters.battingAvg + homeBatters.battingAvg)/2;
            
            var eraDiff = awayEra < homeEra ? homeEra - awayEra : awayEra - homeEra;

            var awayExpectedTotalRuns = awayEra;
            var homeExpectedTotalRuns = homeEra;

            if(battingGameAvg >= 300)
            {
                awayExpectedTotalRuns = awayExpectedTotalRuns + awayWHIP;
                homeExpectedTotalRuns = homeExpectedTotalRuns + homeWHIP;
            }

            var totalRunsExpectedInGameByPitcher = awayExpectedTotalRuns + homeExpectedTotalRuns;
            
            var totalRunsInGameByScoredAvg = awayTeamsData.avgRunsScored + homeTeamsData.avgRunsScored;

            var totalRunsInGameByReceivedAvg = awayTeamsData.avgRunsReceived + homeTeamsData.avgRunsReceived;

            var totalRunsExpectedInGame = (totalRunsExpectedInGameByPitcher+totalRunsInGameByScoredAvg+totalRunsInGameByReceivedAvg)/3;

            var bestPitcher = awayEra < homeEra ? game.awayTeam.awayTeam : game.homeTeam.homeTeam;
            var bestBatting = awayBatters.battingAvg > homeBatters.battingAvg ?  game.awayTeam.awayTeam : game.homeTeam.homeTeam;;
            var bestScoringAvg = awayTeamsData.avgRunsScored < homeTeamsData.avgRunsScored ? game.homeTeam.homeTeam : game.awayTeam.awayTeam;
            var bestRecevingAvg = awayTeamsData.avgRunsReceived < homeTeamsData.avgRunsReceived ? game.awayTeam.awayTeam : game.homeTeam.homeTeam;

            var diffRatio = battingAvgDiff + eraDiff;
            var expectedWinner = "no bet";

            
            var selection = 0;
            if(bestPitcher == bestBatting && bestPitcher == bestScoringAvg &&  bestPitcher == bestRecevingAvg)
            {
                expectedWinner = bestPitcher;
                selection = 1;
            }
            else if((bestPitcher == bestBatting && bestPitcher == bestScoringAvg)  ||(bestPitcher == bestRecevingAvg && bestPitcher == bestScoringAvg))
            {
                expectedWinner = bestPitcher;
                selection = 2;
            }
            else if(bestRecevingAvg == bestScoringAvg && bestRecevingAvg == bestBatting)
            {
                expectedWinner = bestRecevingAvg;
                selection = 2;
            }
            else if(bestPitcher == bestBatting)
            {
                expectedWinner = bestPitcher;
                selection = 3;
            }
            else if(bestScoringAvg == bestRecevingAvg)
            {
                expectedWinner = bestScoringAvg;
                selection = 4;
            }
            else{
                expectedWinner = bestPitcher;
                selection = 5;
            }




            game.selection = selection;
            game.expectedWinner = expectedWinner;
            game.diffRatio = diffRatio;
            game.totalRunsExpectedInGame = totalRunsExpectedInGame;
            game.bestPitcher = bestPitcher;
            game.bestBatting = bestBatting;
            game.bestScoringAvg = bestScoringAvg;
            game.bestRecevingAvg = bestRecevingAvg;
            game.battingAvgDiff = battingAvgDiff;
            game. eraDiff = eraDiff;

            await save(date, allGames, function(){}, "replace");
        }
        else{
            noDataGames.push(game);
            await save(date+"NoData", noDataGames, function(){}, "replace");
        }
    } 
}

async function sortBetterAvgs(date)
{
    var allPlayersInfo = await load(date+"allPlayersInfo"); 
    var sorted = await sorting(allPlayersInfo, "avg", "DESC");
    //var highest = sorted.filter(function(item){
        //return parseFloat(item.ops) > 1;         
      //});
    var finalSorted = await sorting(allPlayersInfo, "avg", "DESC");
    await save(date+"allPlayersInfo",finalSorted, function(){}, "replace");
}


async function sorting(dataSet, property, sort)
{
  var sorted = [];
  if(sort == "ASC"|| sort == "asc")
  {
    sorted = dataSet.sort(function(a, b) {
      var x = parseFloat(a[property]);
      var y = parseFloat(b[property]);
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }
  else{
    sorted = dataSet.sort(function(a, b) {
      var x = parseFloat(a[property]);
      var y = parseFloat(b[property]);
      return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
  }

  var answer = sorted.map(function(val){
    return val
});

  return answer;

}

function ProcessScheduleData(scheduleData, teamName)
{
    var schedulesAllData =[];
    var dataPeriod = [0,7,3];
            for (let a = 0; a < dataPeriod.length; a++) {
                const period = dataPeriod[a];
                
                var dataScope = scheduleData;
                
                if(period != 0 &&  dataScope.length>=15)
                {   
                    
                    dataScope = scheduleData.slice(Math.max(scheduleData.length - period, 1));
                }
                else if(period != 0 &&  dataScope.length>=7)
                {
                    dataScope = scheduleData.slice(Math.max(scheduleData.length - period, 1));
                }
                

                var wins =  dataScope.filter(function(item){
                    return item.ISWIN == "Win";         
                  });

                var loses =  dataScope.filter(function(item){
                return item.ISWIN == "Lost";         
                });

                var totalWins = wins.length;
                var totalLoses = loses.length;

                var avgRunsScored = 0;
                var avgRunsReceived = 0;

                var totalRunsScored = 0;
                var totalRunsReceived = 0;

                var allGamesPlayed = [];
                for (let r = 0; r < wins.length; r++) {
                    const game = wins[r];
                    allGamesPlayed.push(game);
                }

                for (let r = 0; r < loses.length; r++) {
                    const game = loses[r];
                    allGamesPlayed.push(game);
                }

                for (let y = 0; y < allGamesPlayed.length; y++) {
                    const game = allGamesPlayed[y];
                    totalRunsScored += parseInt(game.RUNSSCORED);
                    totalRunsReceived += parseInt(game.RUNSRECEIVED);
                }

                avgRunsScored = totalRunsScored/allGamesPlayed.length;
                avgRunsReceived = totalRunsReceived/allGamesPlayed.length;

                if(period == 0)
                {
                var winStreaks= [];
                var losesStreaks = [];
                var currentStreak = "";
                var mostProbaleNextResult = "";
                var mostProbablePercentage = 0;
                var wins = 0;
                var loses = 0;
                var sumWins = 0;
                var sumLoses = 0;
                var previous = "";
                for (let ser = 0; ser < dataScope.length; ser++) {
                    const game = dataScope[ser];
                    if(!previous)
                    {
                        previous = game.ISWIN;
                        if(previous == "Win")
                        {
                            wins++;
                        }
                        else{
                            loses++;
                        }
                    }
                    else if(previous == "Win" && game.ISWIN == "Win")
                    {
                        wins++;
                        if(ser == (dataScope.length - 1))
                        {
                            winStreaks.push(wins);
                            sumWins += wins;
                            currentStreak = "W"+wins+"-0";
                        }
                    }
                    else if(previous == "Win" && game.ISWIN == "Lost")
                    {
                        winStreaks.push(wins);
                        sumWins += wins;
                        wins = 0;
                        loses++;
                        previous = "Lost";
                        if(ser == (dataScope.length - 1))
                        {
                            losesStreaks.push(loses);
                            sumLoses += loses;
                            currentStreak = "L"+loses+"-0";
                        }
                        
                    }
                    else if(previous == "Lost" && game.ISWIN == "Lost")
                    {
                        loses++;
                        if(ser == (dataScope.length - 1))
                        {
                            losesStreaks.push(loses);
                            sumLoses += loses;
                            currentStreak = "L"+loses+"-0";
                        }
                    }
                    else if(previous == "Lost" && game.ISWIN == "Win")
                    {
                        losesStreaks.push(loses);
                        sumLoses += loses;
                        loses = 0;
                        wins++;
                        previous = "Win"
                        if(ser == (dataScope.length - 1))
                        {
                            winStreaks.push(wins);
                            sumWins += wins;
                            currentStreak = "W"+wins+"-0";
                        }
                    }

                    
                }

                var winStreakAverage = sumWins/winStreaks.length;
                var winStreakStdDev = getStandardDeviation(winStreaks);
                var losesStreakAverage = sumLoses/losesStreaks.length;
                var losesStreakStdDev = getStandardDeviation(losesStreaks);
                
                var bestWinStreak = winStreaks.sort(function(a, b) {
                    var x = parseFloat(a);
                    var y = parseFloat(b);
                    return ((x > y) ? -1 : ((x < y) ? 1 : 0));
                  })[0];

                var worstLostStreak = losesStreaks.sort(function(a, b) {
                    var x = parseFloat(a);
                    var y = parseFloat(b);
                    return ((x > y) ? -1 : ((x < y) ? 1 : 0));
                })[0];

                if(currentStreak.indexOf("W")>=0)
                {
                    var currentWins = parseInt(currentStreak.split("-")[0].replace("W",""));
                    var winLimit = winStreakAverage + winStreakStdDev;
                    var diff = 0;
                    if(currentWins< winLimit)
                    {
                        mostProbaleNextResult = "Win";
                        diff = winLimit-currentWins;
                        
                        if(diff < 1)
                        {
                            mostProbaleNextResult = "Lost";
                            mostProbablePercentage = 100-((diff*100)/(winLimit));
                        }
                        else{
                            if(diff >= 2)
                            {
                                mostProbablePercentage = (100)/(diff-1);
                            }
                            else if(diff >= 3){
                                mostProbablePercentage = (100)/(diff-2);
                            }
                            else if(diff >= 1){
                                mostProbablePercentage = (100)/(diff);
                            }
                        }
                        
                        
                    }
                    else{
                        mostProbaleNextResult = "Lost";
                        mostProbablePercentage = (100)- ((diff*100)/winLimit);                        
                    }
                }
                else{
                    var currentLoses = parseInt(currentStreak.split("-")[0].replace("L",""));
                    var loseLimit = losesStreakAverage + losesStreakStdDev;
                    var diff = 0;
                    if(currentLoses< loseLimit)
                    {
                        mostProbaleNextResult = "Lost";
                        diff = loseLimit-currentLoses;
                        
                        if(diff < 1)
                        {
                            mostProbaleNextResult = "Lost";
                            mostProbablePercentage = 100-((diff*100)/(loseLimit));
                        }
                        else{
                            if(diff >= 2)
                            {
                                mostProbablePercentage = (100)/(diff-1);
                            }
                            else if(diff >= 3){
                                mostProbablePercentage = (100)/(diff-2);
                            }
                            else if(diff >= 1){
                                mostProbablePercentage = (100)/(diff);
                            }
                        }
                        
                        
                    }
                    else{
                        mostProbaleNextResult = "Win";
                        mostProbablePercentage = (100)- ((diff*100)/loseLimit);                        
                    }
                }


                schedulesAllData.push({
                    period:period,
                    teamName: teamName, 
                    totalWins:totalWins, 
                    totalLoses:totalLoses,  
                    totalRunsScored:totalRunsScored, 
                    totalRunsReceived:totalRunsReceived,
                    avgRunsScored:avgRunsScored,
                    avgRunsReceived:avgRunsReceived,
                    scheduleData: dataScope,
                    winStreakAverage: winStreakAverage,
                    losesStreakAverage:losesStreakAverage,
                    bestWinStreak:bestWinStreak,
                    worstLostStreak:worstLostStreak,
                    currentStreak:currentStreak,
                    mostProbaleNextResult:mostProbaleNextResult,
                    mostProbablePercentage:mostProbablePercentage
                });
                }
                else{
                        schedulesAllData.push({
                            period:period,
                            teamName: teamName, 
                            totalWins:totalWins, 
                            totalLoses:totalLoses,  
                            totalRunsScored:totalRunsScored, 
                            totalRunsReceived:totalRunsReceived,
                            avgRunsScored:avgRunsScored,
                            avgRunsReceived:avgRunsReceived,
                            scheduleData: dataScope});
                    
                }
                
            }

            return schedulesAllData;
}

async function getScheduleData(date)
{
    var schedulesAllData = [];
    for (let index = 0; index < teams.length; index++) {
        const team = teams[index];
        var teamName = team.team.replace(" ","");
        //await driver.get(schedulesURL+team.url);
        await driver.get(schedulesURL+team.url+"//seasontype/2/half/1");
        await driver.manage().setTimeouts({ implicit: 1000 });
        var scheduleData = [];
        await driver.executeScript(await GetTeamSchedule()).then(function(return_value) {
            console.log(return_value);
            scheduleData = JSON.parse(return_value);
            // var data = ProcessScheduleData(scheduleData,teamName);
            // for (let ar = 0; ar < data.length; ar++) {
            //     const schedule = data[ar];
            //     schedulesAllData.push(schedule);  
            // }
                      
        });  

        // await driver.get(schedulesURL+team.url+"//seasontype/2/half/2");
        // await driver.manage().setTimeouts({ implicit: 1000 });
        // await driver.executeScript(await GetTeamSchedule()).then(function(return_value) {
        //     console.log(return_value);
        //     scheduleData = scheduleData.concat(JSON.parse(return_value));
        //     // var data = ProcessScheduleData(scheduleData,teamName);
        //     // for (let ar = 0; ar < data.length; ar++) {
        //     //     const schedule = data[ar];
        //     //     schedulesAllData.push(schedule);  
        //     // }
                      
        // });  

        await driver.get(schedulesURL+team.url+"//seasontype/2/half/2");
        await driver.manage().setTimeouts({ implicit: 1000 });
        await driver.executeScript(await GetTeamSchedule()).then(function(return_value) {
            console.log(return_value);
            scheduleData = scheduleData.concat(JSON.parse(return_value));
            
            var data = ProcessScheduleData(scheduleData,teamName);
            for (let ar = 0; ar < data.length; ar++) {
                const schedule = data[ar];
                schedulesAllData.push(schedule);  
            }  
        });  
        
        await save(date+"TeamSchedules", schedulesAllData, function(){}, "replace");
        
        
    }
}


async function getPreviousScheduleData(year = null)
{
    var schedulesAllData = [];
    for (let index = 0; index < teams.length; index++) {
        const team = teams[index];
        var teamName = team.team.replace(" ","");
        var integratedUrl = previousScheduleUrl.replace("{team}", team.url.split('/')[0]).replace("{year}", year).replace("{order}", 1);
        await driver.get(integratedUrl);
        await driver.manage().setTimeouts({ implicit: 1000 });
        var scheduleData = [];
        await driver.executeScript(await GetTeamSchedule()).then(function(return_value) {
            console.log(return_value);
            scheduleData = JSON.parse(return_value);
            // var data = ProcessScheduleData(scheduleData,teamName);
            // for (let ar = 0; ar < data.length; ar++) {
            //     const schedule = data[ar];
            //     schedulesAllData.push(schedule);  
            // }
                      
        });

        var integratedUrl = previousScheduleUrl.replace("{team}", team.url.split('/')[0]).replace("{year}", year).replace("{order}", 2);
        await driver.get(integratedUrl);
        await driver.manage().setTimeouts({ implicit: 1000 });
        await driver.executeScript(await GetTeamSchedule()).then(function(return_value) {
            console.log(return_value);
            var scheduleData2 = JSON.parse(return_value);
            scheduleData = scheduleData.concat(scheduleData2);
            var data = ProcessScheduleData(scheduleData,teamName);
            for (let ar = 0; ar < data.length; ar++) {
                const schedule = data[ar];
                schedulesAllData.push(schedule);  
            }
                      
        });

        await save(year+"TeamSchedules", schedulesAllData, function(){}, "replace", year);
        
        
    }
}

async function getAllPitchersData(date)
    {
        var pitchersAllData = [];
        var allPitchersInfo = [];
        for (let index = 0; index < teams.length; index++) {
            const team = teams[index];
            var teamName = team.team.replace(" ","");
            await driver.get(pitchersURL+team.url.split("/")[0]+"/season/2024/seasontype/2");
            await driver.manage().setTimeouts({ implicit: 1000 });
            var pitchersData = [];
            var starterSumAvg = 0;
            var relevingSumAvg = 0;
            var starterPitchersCount = 0;
            var relevingPitchersCount = 0
            await driver.executeScript(await GetAllPitchersStats()).then(function(return_value) {
                console.log(return_value);
               pitchersData = JSON.parse(return_value);
                for (let ele = 0; ele < pitchersData.length; ele++) {
                    const pitcher = pitchersData[ele];
                    var pitcherType = pitcher.name.split(" ");
                    pitcherType = pitcherType[pitcherType.length-1];
                    var er =  pitcher.playerStats.filter(function(item){
                        return item.stat == "ER";         
                      });

                    var ip =  pitcher.playerStats.filter(function(item){
                    return item.stat == "IP";         
                    });

                    var h =  pitcher.playerStats.filter(function(item){
                        return item.stat == "H";         
                        });

                    var hr =  pitcher.playerStats.filter(function(item){
                        return item.stat == "HR";         
                        });

                    var bb =  pitcher.playerStats.filter(function(item){
                        return item.stat == "BB";         
                        });

                    var k =  pitcher.playerStats.filter(function(item){
                        return item.stat == "K";         
                        });

                    var whip =  pitcher.playerStats.filter(function(item){
                        return item.stat == "WHIP";         
                        });

                    var era =  pitcher.playerStats.filter(function(item){
                    return item.stat == "ERA";         
                    }); 

                    if(pitcherType == "SP")
                    {
                        starterSumAvg += parseFloat(er[0].value);  
                        starterPitchersCount++;
                    }  
                    else{
                        relevingSumAvg += parseFloat(er[0].value);  
                        relevingPitchersCount++;
                    }
                    allPitchersInfo.push({teamName: teamName, name: pitcher.name, era:parseFloat(era[0].value), ip:parseFloat(ip[0].value), h:parseFloat(h[0].value), hr:parseFloat(hr[0].value), bb:parseFloat(bb[0].value), k:parseFloat(k[0].value), whip:parseFloat(whip[0].value), era:parseFloat(era[0].value)});                
                }
                var starterPitchingAvg = starterSumAvg/starterPitchersCount;
                var relevingPitchingAvg = relevingSumAvg/relevingPitchersCount;
                pitchersAllData.push({teamName: teamName, starterPitchingAvg: starterPitchingAvg, relevingPitchingAvg:relevingPitchingAvg , totalPitchingAvgRuns:relevingPitchingAvg + starterPitchingAvg ,pitchersData: pitchersData});
                
            });
            await save("PitchersData",pitchersAllData, function(){}, "replace", "GameByGame");
            await save(date+"PitchersData",pitchersAllData, function(){}, "replace");
            await save(date+"AllPitchersInfo",allPitchersInfo, function(){}, "replace");
            
        }
    }


    async function getPreviousAllPitchersData(year)
    {
        var pitchersAllData = [];
        var allPitchersInfo = [];
        for (let index = 0; index < teams.length; index++) {
            const team = teams[index];
            var teamName = team.team.replace(" ","");
            var integratedUrl = pitcherPreviousURL.replace("{team}", team.url.split('/')[0]).replace("{year}", year).replace("{order}", 1);
            await driver.get(integratedUrl);
            await driver.manage().setTimeouts({ implicit: 1000 });
            var pitchersData = [];
            var starterSumAvg = 0;
            var relevingSumAvg = 0;
            var starterPitchersCount = 0;
            var relevingPitchersCount = 0
            await driver.executeScript(await GetAllPitchersStats()).then(function(return_value) {
                console.log(return_value);
               pitchersData = JSON.parse(return_value);
                for (let ele = 0; ele < pitchersData.length; ele++) {
                    const pitcher = pitchersData[ele];
                    var pitcherType = pitcher.name.split(" ");
                    pitcherType = pitcherType[pitcherType.length-1];
                    var er =  pitcher.playerStats.filter(function(item){
                        return item.stat == "ER";         
                      });

                    var ip =  pitcher.playerStats.filter(function(item){
                    return item.stat == "IP";         
                    });

                    var h =  pitcher.playerStats.filter(function(item){
                        return item.stat == "H";         
                        });

                    var hr =  pitcher.playerStats.filter(function(item){
                        return item.stat == "HR";         
                        });

                    var bb =  pitcher.playerStats.filter(function(item){
                        return item.stat == "BB";         
                        });

                    var k =  pitcher.playerStats.filter(function(item){
                        return item.stat == "K";         
                        });

                    var whip =  pitcher.playerStats.filter(function(item){
                        return item.stat == "WHIP";         
                        });

                    var era =  pitcher.playerStats.filter(function(item){
                    return item.stat == "ERA";         
                    }); 

                    if(pitcherType == "SP")
                    {
                        starterSumAvg += parseFloat(er[0].value);  
                        starterPitchersCount++;
                    }  
                    else{
                        if(er && er[0] && er[0].value)
                        {
                            relevingSumAvg += parseFloat(er[0].value);  
                            relevingPitchersCount++;
                        }
                        else{
                            var stopHere ='';
                        }
                    }
                    allPitchersInfo.push({teamName: teamName, name: pitcher.name, era:parseFloat(era[0].value), ip:parseFloat(ip[0].value), h:parseFloat(h[0].value), hr:parseFloat(hr[0].value), bb:parseFloat(bb[0].value), k:parseFloat(k[0].value), whip:parseFloat(whip[0].value), era:parseFloat(era[0].value)});                
                }
                var starterPitchingAvg = starterSumAvg/starterPitchersCount;
                var relevingPitchingAvg = relevingSumAvg/relevingPitchersCount;
                pitchersAllData.push({teamName: teamName, starterPitchingAvg: starterPitchingAvg, relevingPitchingAvg:relevingPitchingAvg , totalPitchingAvgRuns:relevingPitchingAvg + starterPitchingAvg ,pitchersData: pitchersData});
                
            });

            await save("PitchersData",pitchersAllData, function(){}, "replace", year);
            await save("AllPitchersInfo",allPitchersInfo, function(){}, "replace", year);
            
        }
    }

    async function getBattersData(date)
    {
        var battersAllData = [];
        var allPlayersInfo = [];
        for (let index = 0; index < teams.length; index++) {
            const team = teams[index];
            var teamName = team.team.replace(" ","");
            await driver.get(battersURL+team.url);
            await driver.manage().setTimeouts({ implicit: 1000 });
            var battersData = [];
            var sumAvg = 0;
            var sumOBP = 0;
            var sumOPS = 0;
            var sumSLG = 0;
            var sumWAR = 0;
            var sumHits = 0;
            var sumRuns = 0;
            await driver.executeScript(await GetBattingStats()).then(function(return_value) {
                console.log(return_value);
                battersData = JSON.parse(return_value);
                for (let ele = 0; ele < battersData.playersDat.length; ele++) {
                    const batter = battersData.playersDat[ele];
                    var avg =  batter.playerStats.filter(function(item){
                        return item.stat == "AVG";         
                      });

                    var obp =  batter.playerStats.filter(function(item){
                    return item.stat == "OBP";         
                    });

                    var slg =  batter.playerStats.filter(function(item){
                        return item.stat == "SLG";         
                      });

                    var ops =  batter.playerStats.filter(function(item){
                    return item.stat == "OPS";         
                    });

                    var war =  batter.playerStats.filter(function(item){
                        return item.stat == "WAR";         
                      });

                    var r =  batter.playerStats.filter(function(item){
                        return item.stat == "R";         
                      });

                    var h =  batter.playerStats.filter(function(item){
                    return item.stat == "H";         
                    });

                    sumAvg += parseFloat(avg[0].value);
                    sumOPS += parseFloat(ops[0].value);
                    sumOBP += parseFloat(obp[0].value);  
                    sumSLG += parseFloat(slg[0].value);  
                    sumWAR += parseFloat(war[0].value);  
                    sumHits += parseFloat(h[0].value);  
                    sumRuns += parseFloat(r[0].value);     
                    allPlayersInfo.push({teamName: teamName, name: batter.name, r:parseFloat(r[0].value), h:parseFloat(h[0].value) ,avg:parseFloat(avg[0].value), ops:parseFloat(ops[0].value), totalChances: parseFloat(avg[0].value)+parseFloat(ops[0].value) });                
                }
                var battingAvg = sumAvg/battersData.playersDat.length;
                var battingOBP = sumOBP/battersData.playersDat.length;
                var battingSLG = sumSLG/battersData.playersDat.length;
                var battingOPS = sumOPS/battersData.playersDat.length;
                var battingWAR= sumWAR;
                var runsAvg = sumRuns/battersData.playersDat.length;
                var hitsAvg = sumHits/battersData.playersDat.length;
            
                battersAllData.push({teamName: teamName, totalsData:battersData.totalsDat  ,battingAvg: battingAvg,battingOPS:battingOPS ,battingOBP:battingOBP, battingSLG:battingSLG,battingWAR:battingWAR ,battersData: battersData.playersDat, runsAvg:runsAvg, hitsAvg:hitsAvg});
                
            });

            await save(date+"BattersData",battersAllData, function(){}, "replace");
            await save(date+"AllPlayersInfo",allPlayersInfo, function(){}, "replace");
            
        }
        var stopHere = "";
    }

    async function getESPNData(date)
    {
        
        var data = await load(date);
        var gams = [];
        if(data.length == 1)
        {
            gams = data[0].games;
        }
        else{
            gams = data;
        }

        for (let i = 0; i < gams.length; i++) {
            var game = gams[i];
            //
            // if((game.awayTeam.awayPitcher && game.homeTeam.homePitcher))
            // {
                var stopHere = "";
                game = await getPitcherData(game, "away", date);
                game = await getPitcherData(game, "home", date);
                save(date, data, function(){}, "replace")
            //}
        }
        
    }

    async function getPreviousESPNData(date, year)
    {
        
        var data = await load(date, year+"/"+date);
        var gams = [];
        //if(data.length == 1)
        //{
            //gams = data[0].games;
        //}
        //else{
            gams = data;
        //}

        for (let i = 0; i < gams.length; i++) {
            var game = gams[i];
            //
            if((game.awayTeam.awayPitcher && game.homeTeam.homePitcher)&& (typeof game.homeTeam.homePitcherData == 'undefined' || typeof game.awayTeam.awayPitcherData == 'undefined'))
            {
                var stopHere = "";
                game = await getPreviousPitcherData(game, "away", date, year);
                game = await getPreviousPitcherData(game, "home", date, year);
                save(date, data, function(){}, "replace", year+"/"+date);
            }
        }
        
    }
    
    async function getPitcherData(game, homeOrAway, date)
    {
        var pitchersData = await load("PitchersData","GameByGame");
        
        var team = "";
        var pitcherFullName = "";
        if(homeOrAway == "home"){
            team = game.homeTeam.homeTeam;
            pitcherFullName = game.homeTeam.homePitcher;
        }
        else{
            team = game.awayTeam.awayTeam;
            pitcherFullName = game.awayTeam.awayPitcher;
        }

        console.log(team);
        var homePitchers = pitchersData.filter(function(item){
            return item.teamName.replace(" ","").indexOf(team) >= 0 || item.teamName.indexOf(team) >= 0 ;
        })[0].pitchersData;
        
        var pitcherNameParts = pitcherFullName.split(" ");
        var pitcherName = "";
        if(pitcherNameParts.length > 1)
        {
            pitcherName = pitcherNameParts[1];
        }
        else{ 
            pitcherName = pitcherFullName;
        }

        var pitcher = homePitchers.filter(function(item){
            return item.name.indexOf(pitcherName) >=0;
        });
        var pitcherUrl = "";
        if(pitcher.length == 1)
        {
            pitcherUrl = pitcher[0].playerUrl;
        }
        else{
            var pitcher = pitcher.filter(function(item){
                return item.name.indexOf("SP") >=0;
            });
            if(pitcher.length == 1)
            {
                pitcherUrl = pitcher[0].playerUrl;
            }
            else{
                console.log(game[homeOrAway+"Team"][homeOrAway+"Team"] + " " + game[homeOrAway+"Team"][homeOrAway+"Pitcher"]);
                var stopHere = "";
            }
        }
        
        if(pitcherUrl)
        {
            //await driver.get();
            //var espnId = (await driver.getCurrentUrl()).split("_/")[1];
            await driver.get(statsURL+pitcherUrl.split("_/")[1]);
        }
        else{
            var stopHere = "";
        }
            
        try{
            await driver.executeScript(await GetPitcherData()).then(function(return_value) {
                console.log(return_value);
            if(homeOrAway == "away")
            {
                game.awayTeam.awayPitcherData = JSON.parse(return_value);
            }
            else{
                game.homeTeam.homePitcherData = JSON.parse(return_value);
            }
            });

            await driver.executeScript(await GetPitcherDataWithFinalERA()).then(function(return_value) {
                console.log(return_value);
                if(homeOrAway == "away")
                {
                    game.awayTeam.awayPitcherDataNew = JSON.parse(return_value);
                }
                else{
                    game.homeTeam.homePitcherDataNew = JSON.parse(return_value);
                }
                });
        }
        catch(Ex)
        {
            var pitcherData = [
                {
                    "dataField": "GP",
                    "description": "Games Played",
                    "value": "0"
                },
                {
                    "dataField": "GS",
                    "description": "Games Started",
                    "value": "0"
                },
                {
                    "dataField": "W",
                    "description": "Wins",
                    "value": "0"
                },
                {
                    "dataField": "L",
                    "description": "Losses",
                    "value": "0"
                },
                {
                    "dataField": "W%",
                    "description": "Win Percentage",
                    "value": "0"
                },
                {
                    "dataField": "WAR",
                    "description": "Wins Above Replacement",
                    "value": "0"
                },
                {
                    "dataField": "ERA",
                    "description": "Earned Run Average",
                    "value": "5"
                },
                {
                    "dataField": "WHIP",
                    "description": "Walks Plus Hits Per Inning Pitched",
                    "value": "2.0"
                },
                {
                    "dataField": "IP",
                    "description": "Innings pitched",
                    "value": "0"
                },
                {
                    "dataField": "K",
                    "description": "Strikeouts",
                    "value": "0"
                },
                {
                    "dataField": "BB",
                    "description": "Walks",
                    "value": "0"
                },
                {
                    "dataField": "K/BB",
                    "description": "Strikeout To Walk Ratio",
                    "value": "0"
                },
                {
                    "dataField": "H",
                    "description": "Hits",
                    "value": "0"
                },
                {
                    "dataField": "R",
                    "description": "Runs",
                    "value": "0"
                },
                {
                    "dataField": "ER",
                    "description": "Earned runs",
                    "value": "0"
                },
                {
                    "dataField": "SV",
                    "description": "Saves",
                    "value": "0"
                },
                {
                    "dataField": "HLD",
                    "description": "Holds",
                    "value": "0"
                },
                {
                    "dataField": "BLSV",
                    "description": "Blown Saves",
                    "value": "0"
                }
            ];
            if(homeOrAway == "away")
            {
                game.awayTeam.awayPitcherData = pitcherData;
            }
            else{
                game.homeTeam.homePitcherData = pitcherData;
            }
            
        }
        return game;
    }


    async function getPreviousPitcherData(game, homeOrAway, date, year)
    {
        var pitchersData = await load("PitchersData",year);
        try{
            var pitchersUrlResponses = await load("PitchersUrlResponses",year);
        }
        catch{
            var pitchersUrlResponses = [];
        }
        var team = "";
        var pitcherFullName = "";
        if(homeOrAway == "home"){
            team = game.homeTeam.homeTeam;
            pitcherFullName = game.homeTeam.homePitcher;
        }
        else{
            team = game.awayTeam.awayTeam;
            pitcherFullName = game.awayTeam.awayPitcher;
        }

        var homePitchers = pitchersData.filter(function(item){
            return item.teamName.indexOf(team) >= 0;
        })[0].pitchersData;
        
        var pitcherNameParts = pitcherFullName.split(" ");
        var pitcherName = "";
        if(pitcherNameParts.length > 1)
        {
            pitcherName = pitcherNameParts[1];
        }
        else{ 
            pitcherName = pitcherFullName;
        }

        var pitcher = homePitchers.filter(function(item){
            return item.name.indexOf(pitcherName) >=0;
        });
        var pitcherUrl = "";
        if(pitcher.length == 1)
        {
            pitcherUrl = pitcher[0].playerUrl;
        }
        else{
            var pitcher = pitcher.filter(function(item){
                return item.name.indexOf("SP") >=0;
            });
            if(pitcher.length == 1)
            {
                pitcherUrl = pitcher[0].playerUrl;
            }
            else{
                var stopHere = "";
            }
        }
        
        var isPitcherDataAvailable = pitchersUrlResponses.filter(function(item){
            return item.pitcherUrl == pitcherUrl;
        });

        if(pitcherUrl && isPitcherDataAvailable.length <= 0)
        {
            //await driver.get();
            //var espnId = (await driver.getCurrentUrl()).split("_/")[1];
            await driver.get(statsURL+pitcherUrl.split("_/")[1]);
            try{
                var dataR = {team: team, pitcherFullName:pitcherFullName ,pitcherUrl:pitcherUrl, GetPitcherData:{},GetPitcherDataWithFinalERA: {} };
                await driver.executeScript(await GetPitcherData()).then(function(return_value) {
                    dataR.GetPitcherData = return_value;
                    console.log(return_value);
    
                if(homeOrAway == "away")
                {
                    game.awayTeam.awayPitcherData = JSON.parse(return_value);
                }
                else{
                    game.homeTeam.homePitcherData = JSON.parse(return_value);
                }
                });
    
                await driver.executeScript(await GetPitcherDataWithFinalERA()).then(function(return_value) {
                    dataR.GetPitcherDataWithFinalERA = return_value;
                    console.log(return_value);
                    pitchersUrlResponses.push(dataR);
                    if(homeOrAway == "away")
                    {
                        game.awayTeam.awayPitcherDataNew = JSON.parse(return_value);
                    }
                    else{
                        game.homeTeam.homePitcherDataNew = JSON.parse(return_value);
                    }
                    });
    
                    await save("PitchersUrlResponses", pitchersUrlResponses, function(){} , "replace" ,year);
            }
            catch(Ex)
            {
                var pitcherData = [
                    {
                        "dataField": "GP",
                        "description": "Games Played",
                        "value": "0"
                    },
                    {
                        "dataField": "GS",
                        "description": "Games Started",
                        "value": "0"
                    },
                    {
                        "dataField": "W",
                        "description": "Wins",
                        "value": "0"
                    },
                    {
                        "dataField": "L",
                        "description": "Losses",
                        "value": "0"
                    },
                    {
                        "dataField": "W%",
                        "description": "Win Percentage",
                        "value": "0"
                    },
                    {
                        "dataField": "WAR",
                        "description": "Wins Above Replacement",
                        "value": "0"
                    },
                    {
                        "dataField": "ERA",
                        "description": "Earned Run Average",
                        "value": "5"
                    },
                    {
                        "dataField": "WHIP",
                        "description": "Walks Plus Hits Per Inning Pitched",
                        "value": "2.0"
                    },
                    {
                        "dataField": "IP",
                        "description": "Innings pitched",
                        "value": "0"
                    },
                    {
                        "dataField": "K",
                        "description": "Strikeouts",
                        "value": "0"
                    },
                    {
                        "dataField": "BB",
                        "description": "Walks",
                        "value": "0"
                    },
                    {
                        "dataField": "K/BB",
                        "description": "Strikeout To Walk Ratio",
                        "value": "0"
                    },
                    {
                        "dataField": "H",
                        "description": "Hits",
                        "value": "0"
                    },
                    {
                        "dataField": "R",
                        "description": "Runs",
                        "value": "0"
                    },
                    {
                        "dataField": "ER",
                        "description": "Earned runs",
                        "value": "0"
                    },
                    {
                        "dataField": "SV",
                        "description": "Saves",
                        "value": "0"
                    },
                    {
                        "dataField": "HLD",
                        "description": "Holds",
                        "value": "0"
                    },
                    {
                        "dataField": "BLSV",
                        "description": "Blown Saves",
                        "value": "0"
                    }
                ];
                if(homeOrAway == "away")
                {
                    game.awayTeam.awayPitcherData = pitcherData;
                }
                else{
                    game.homeTeam.homePitcherData = pitcherData;
                }
                
            }
        }
        else if(pitcherUrl){
                
                var return_value = isPitcherDataAvailable[0].GetPitcherData;
                if(homeOrAway == "away")
                {
                    game.awayTeam.awayPitcherData = JSON.parse(return_value);
                }
                else{
                    game.homeTeam.homePitcherData = JSON.parse(return_value);
                }
                
    
                var return_value = isPitcherDataAvailable[0].GetPitcherDataWithFinalERA;
                    console.log(return_value);
                    if(homeOrAway == "away")
                    {
                        game.awayTeam.awayPitcherDataNew = JSON.parse(return_value);
                    }
                    else{
                        game.homeTeam.homePitcherDataNew = JSON.parse(return_value);
                    }
                
        }
        else{
            var pitcherData = [
                {
                    "dataField": "GP",
                    "description": "Games Played",
                    "value": "0"
                },
                {
                    "dataField": "GS",
                    "description": "Games Started",
                    "value": "0"
                },
                {
                    "dataField": "W",
                    "description": "Wins",
                    "value": "0"
                },
                {
                    "dataField": "L",
                    "description": "Losses",
                    "value": "0"
                },
                {
                    "dataField": "W%",
                    "description": "Win Percentage",
                    "value": "0"
                },
                {
                    "dataField": "WAR",
                    "description": "Wins Above Replacement",
                    "value": "0"
                },
                {
                    "dataField": "ERA",
                    "description": "Earned Run Average",
                    "value": "5"
                },
                {
                    "dataField": "WHIP",
                    "description": "Walks Plus Hits Per Inning Pitched",
                    "value": "2.0"
                },
                {
                    "dataField": "IP",
                    "description": "Innings pitched",
                    "value": "0"
                },
                {
                    "dataField": "K",
                    "description": "Strikeouts",
                    "value": "0"
                },
                {
                    "dataField": "BB",
                    "description": "Walks",
                    "value": "0"
                },
                {
                    "dataField": "K/BB",
                    "description": "Strikeout To Walk Ratio",
                    "value": "0"
                },
                {
                    "dataField": "H",
                    "description": "Hits",
                    "value": "0"
                },
                {
                    "dataField": "R",
                    "description": "Runs",
                    "value": "0"
                },
                {
                    "dataField": "ER",
                    "description": "Earned runs",
                    "value": "0"
                },
                {
                    "dataField": "SV",
                    "description": "Saves",
                    "value": "0"
                },
                {
                    "dataField": "HLD",
                    "description": "Holds",
                    "value": "0"
                },
                {
                    "dataField": "BLSV",
                    "description": "Blown Saves",
                    "value": "0"
                }
            ];
            if(homeOrAway == "away")
            {
                game.awayTeam.awayPitcherData = pitcherData;
            }
            else{
                game.homeTeam.homePitcherData = pitcherData;
            }
        }
            
        
        return game;
    }

})();

async function GetAllPitchersStats()
{
    var script = 'var pitchersTable = document.getElementsByClassName("ResponsiveTable--fixed-left")[0];';
script += 'var players = pitchersTable.getElementsByClassName("Table Table--align-right Table--fixed Table--fixed-left")[0].getElementsByClassName("Table__TD");';
script += 'var playersData = pitchersTable.getElementsByClassName("Table__Scroller")[0].getElementsByClassName("Table__TD");';
script += 'var statsCatalog = pitchersTable.getElementsByClassName("Table__header-group Table__THEAD")[1].getElementsByClassName("stats-cell Table__TH");';
script += 'var playersDat = [];';
script += 'var a = 0;';
script += 'for (var index = 0; index < players.length - 1; index++) {';
    script += 'var playersStats = [];';
    script += 'var playersInfo = {';
        script += 'name: "",';
        script += 'playerStats: []';
    script += '};';
    script += 'playersInfo.playerUrl = players[index].getElementsByClassName("AnchorLink")[0].href;';
    script += 'playersInfo.name = players[index].innerText;';
    script += 'if (index == 0) {';
        script += 'a = index * 17;';
    script += '} else {';
        script += 'a = (index * 18);';
    script += '}';
    script += 'var d = 0;';
    script += 'for (var b = a; d < statsCatalog.length; b++) {';
        script += 'try{var stat = statsCatalog[d].innerText;';
        script += 'var value = playersData[b].innerText;';
        script += 'd++;';
        script += 'playersStats.push({';
            script += 'stat: stat,';
            script += 'value: value';
        script += '});}catch{d++;}';
    script += '}';
    script += 'playersInfo.playerStats = playersStats;';
    script += 'playersDat.push(playersInfo);';
script += '}';
script += 'return JSON.stringify(playersDat);';

return script;
}

async function GetBattingStats()
{
    var script = 'var battersTable = document.getElementsByClassName("ResponsiveTable--fixed-left")[0];                                                               ';
script += 'var players = battersTable.getElementsByClassName("Table Table--align-right Table--fixed Table--fixed-left")[0].getElementsByClassName("Table__TD");   ';
script += 'var totalsData = battersTable.getElementsByClassName("Stats__TotalRow fw-bold Table__TD");                                                             ';
script += 'var playersData = battersTable.getElementsByClassName("Table__Scroller")[0].getElementsByClassName("Table__TD");                                       ';
script += 'var statsCatalog = battersTable.getElementsByClassName("Table__header-group Table__THEAD")[1].getElementsByClassName("stats-cell Table__TH");          ';
script += 'var playersDat = [];                                                                                                                                   ';
script += 'var totalsDat = [];                                                                                                                                    ';
script += 'var a = 0;                                                                                                                                             ';
script += 'for (var index = 0; index < players.length - 1; index++) {                                                                                             ';
script += '    var playersStats = [];                                                                                                                             ';
script += '    var playersInfo = {                                                                                                                                ';
script += '        name: "",                                                                                                                                      ';
script += '        playerStats: []                                                                                                                                ';
script += '    };                                                                                                                                                 ';
script += '    var player = players[index].innerText;                                                                                                             ';
script += '    playersInfo.name = player;                                                                                                                         ';
script += '    if (index == 0) {                                                                                                                                  ';
script += '        a = index * 16;                                                                                                                                ';
script += '    } else {                                                                                                                                           ';
script += '        a = (index * 17);                                                                                                                              ';
script += '    }                                                                                                                                                  ';
script += '    var d = 0;                                                                                                                                         ';
script += '    for (var b = a; d < statsCatalog.length; b++) {                                                                                                    ';
script += '        var stat = statsCatalog[d].innerText;                                                                                                          ';
script += '        var value = playersData[b].innerText;                                                                                                          ';
script += '        d++;                                                                                                                                           ';
script += '        playersStats.push({                                                                                                                            ';
script += '            stat: stat,                                                                                                                                ';
script += '            value: value                                                                                                                               ';
script += '        });                                                                                                                                            ';
script += '    }                                                                                                                                                  ';
script += '    playersInfo.playerStats = playersStats;                                                                                                            ';
script += '    playersDat.push(playersInfo);                                                                                                                      ';
script += '                                                                                                                                                       ';
script += '                                                                                                                                                       ';
script += '}                                                                                                                                                      ';
script += 'var d = statsCatalog.length-1;                                                                                                                         ';
script += '    for (var t = totalsData.length - 1; d > 1 ; t--) {                                                                                                 ';
script += '        var stat = statsCatalog[d].innerText;                                                                                                          ';
script += '        var value = totalsData[t].innerText;                                                                                                           ';
script += '        d--;                                                                                                                                           ';
script += '        totalsDat.push({                                                                                                                               ';
script += '            stat: stat,                                                                                                                                ';
script += '            value: value                                                                                                                               ';
script += '        });                                                                                                                                            ';
script += '    }                                                                                                                                                  ';
script += 'var batterData = {playersDat: playersDat, totalsDat:totalsDat};                                                                                        ';
script += 'return JSON.stringify(batterData);																														  ';

        return script;
} 



async function GetPitcherData()
{
    var script = 'var pitchingStatsTable = document.getElementsByClassName("ResponsiveTable ResponsiveTable--fixed-left pt4")[0];';
    script += 'var tableRecords = pitchingStatsTable.getElementsByClassName("Table__TR Table__TR--sm Table__even");';
    script += 'var latestIndex = tableRecords.length>6 ? 4: 3;';
    script += 'var extractedRecords = tableRecords[tableRecords.length-latestIndex].getElementsByClassName("Table__TD");';
    script += 'var dataFields = pitchingStatsTable.getElementsByClassName("Table__header-group Table__THEAD");';
    script += 'var extractedFields = dataFields[dataFields.length-1].getElementsByClassName("Table__TH");';

    script += 'var pitcherStats = [];';
    script += 'for (let index = 0; index < extractedFields.length; index++) {';
        script += 'var dataField = extractedFields[index].innerText;';
        script += 'var description = extractedFields[index].getAttribute("title");';
        script += 'var value = extractedRecords[index].innerText;';
        script += 'pitcherStats.push({dataField: dataField, description:description ,value:value});';
        script += '}';
    script += 'return JSON.stringify(pitcherStats);';

    return script;

}


async function GetWinPercentagesFromCovers()
{

    var script = 'var allGames = document.getElementsByClassName("cmg_matchup_game_box  cmg_game_data");';

    script += 'var coversRecords = [];';
    
    script += 'for(var i =0; i< allGames.length; i++)';
    script += '{';
        script += 'const game = allGames[i];';
        script += 'var awayTeam = game.getElementsByClassName("cmg_matchup_list_column_1")[0];';
        script += 'var homeTeam = game.getElementsByClassName("cmg_matchup_list_column_3")[0];';
        
        script += 'var awayTeamName = awayTeam.getElementsByClassName("cmg_team_name")[0].innerText;';
        script += 'awayTeamName = awayTeamName.split(" ")[0];';
        script += 'while(awayTeamName.indexOf(" ") >= 0){';
            script += 'awayTeamName = awayTeamName.replace(" ", "");';
        script += '}';
        script += 'console.log(awayTeamName);';
        
        
        script += 'var homeTeamName = homeTeam.getElementsByClassName("cmg_team_name")[0].innerText;';
        script += 'homeTeamName = homeTeamName.split(" ")[1];';
        script += 'while(homeTeamName.indexOf(" ") >= 0){';
            script += 'homeTeamName = homeTeamName.replace(" ", "");';
        script += '}';
        script += 'console.log(homeTeamName);';
        
        
        script += 'var awayWinPercentage = "no data";';
        script += 'if(awayTeam.getElementsByClassName("cmg_matchup_list_odds_value").length > 0)';
        script += 'awayWinPercentage = awayTeam.getElementsByClassName("cmg_matchup_list_odds_value")[0].innerText;';
        script += 'if(awayWinPercentage.indexOf(" ") >= 0){';
            script += 'awayWinPercentage = awayWinPercentage.replace(" ", "");';
        script += '}';
        
        script += 'var homeWinPercentage = "no data";';
        script += 'if(homeTeam.getElementsByClassName("cmg_matchup_list_odds_value").length > 0)';
        script += 'homeWinPercentage = homeTeam.getElementsByClassName("cmg_matchup_list_odds_value")[0].innerText;';
        script += 'if(homeWinPercentage.indexOf(" ") >= 0){';
            script += 'homeWinPercentage = homeWinPercentage.replace(" ", "");';
        script += '}';
        
        script += 'var gameRecord= {game:awayTeamName + " @ "+ homeTeamName, time:"", awayTeam:{awayTeam: awayTeamName, winPercentage: awayWinPercentage}, homeTeam:{homeTeam: homeTeamName, winPercentage: homeWinPercentage}};';
        
        script += 'coversRecords.push(gameRecord);';
    script += '}';
    script += 'return JSON.stringify(coversRecords);';

    return script;
}

async function GetConsesunsData()
{

    var script = 'var away = document.getElementsByClassName("covers-CoversConsensusDetailsTable-sideHeadLeft");';
script += 'if(away.length >0){';
    script += 'var away = document.getElementsByClassName("covers-CoversConsensusDetailsTable-sideHeadLeft")[0].innerText;';

    script += 'var home = document.getElementsByClassName("covers-CoversConsensusDetailsTable-sideHeadRight")[0].innerText;';
    script += 'var awayPercentage = parseInt(away.split(" ")[0]);';
    script += 'var homePercentage = 100-awayPercentage;';
    script += 'var awayTeam = away.split("%")[1].trim();';
    script += 'var homeParts = home.split(" ");';
    script += 'var homeTeam = home.replace(homeParts[homeParts.length-1],"").replace(homeParts[homeParts.length-2],"").trim();';
    
    script += 'var details = {awayTeam:awayTeam, awayPercentage:awayPercentage, homeTeam:homeTeam, homePercentage:homePercentage};';
script += '}';
script += 'else{';
    script += 'var details = {awayTeam:"no data", awayPercentage:awayPercentage, homeTeam:homeTeam, homePercentage:homePercentage};';
script += '}';
    script += 'return JSON.stringify(details);';
    

    return script;
}

async function GetCoversConsensusLinks()
{
    var script = 'var games = document.getElementsByClassName("cmg_l_row cmg_matchup_list_gamebox");';
    script += 'var consensusLinks = [];';
    script += 'for (let game of games) {';
    script += 'if((game.getElementsByTagName("a")).length >2){var index = game.getElementsByTagName("a")[2].innerText == "Concensus" || game.getElementsByTagName("a")[2].innerText == "Consensus"? 2 : 3;';           
    script += 'consensusLinks.push(game.getElementsByTagName("a")[index].href);';
    script += '}}';
    script += 'return JSON.stringify(consensusLinks);';
    return script;
}


async function GetPitcherDataWithFinalERA()
{
    var script = 'var pitchingStatsTable = document.getElementsByClassName("ResponsiveTable ResponsiveTable--fixed-left pt4")[0];';
script += 'var tableRecords = pitchingStatsTable.getElementsByClassName("Table__TR Table__TR--sm Table__even");';
script += 'var currentIndex = tableRecords.length > 6 ? 3 : 2;';
script += 'var currentRecords = tableRecords[tableRecords.length - currentIndex].getElementsByClassName("Table__TD");';
script += 'var carrerRecords = tableRecords[tableRecords.length - 2].getElementsByClassName("Table__TD");';
script += 'var dataFields = pitchingStatsTable.getElementsByClassName("Table__header-group Table__THEAD");';
script += 'var extractedFields = dataFields[dataFields.length - 1].getElementsByClassName("Table__TH");';
script += 'var pitcherStats = [];';
script += 'var currentStats = [];';
script += 'var carrerStats = [];';
script += 'var currentEra = 0;';
script += 'var carrerEra = 0;';
script += 'for (let index = 0; index < extractedFields.length; index++) {';
    script += 'var dataField = extractedFields[index].innerText;';
    script += 'var description = extractedFields[index].getAttribute("title");';
    script += 'var value = currentRecords[index].innerText;';
    script += 'currentStats.push({';
        script += 'dataField: dataField,';
        script += 'description: description,';
        script += 'value: value';
    script += '});';
	 script += 'if(dataField == "ERA")';
	 script += '{';
		script += 'currentEra = parseFloat(value);';
	 script += '}';
script += '}';

script += 'for (let index = 0; index < extractedFields.length; index++) {';
    script += 'var dataField = extractedFields[index].innerText;';
    script += 'var description = extractedFields[index].getAttribute("title");';
    script += 'var value = carrerRecords[index].innerText;';
    script += 'carrerStats.push({';
        script += 'dataField: dataField,';
        script += 'description: description,';
        script += 'value: value';
    script += '});';
	 script += 'if(dataField == "ERA")';
	 script += '{';
		 script += 'carrerEra = parseFloat(value);';
	 script += '}';
script += '}';

script += 'var tendencia = "";';
script += 'var finalEra = "";';

script += 'if(currentEra < carrerEra)';
script += '{';
	script += 'var eraDiff = carrerEra - currentEra;';
	script += 'if(eraDiff >=1)';
	script += '{';
		script += 'tendencia = "Positiva";';
		script += 'finalEra = currentEra;';
	script += '}';
	script += 'else{';
		script += 'tendencia = "Neutral";';
		script += 'finalEra = (carrerEra + currentEra)/2;';
	script += '}';
script += '}';
script += 'else if(currentEra > carrerEra)';
script += '{';
	script += 'var eraDiff = currentEra - carrerEra;';
	script += 'if(eraDiff >=1)';
	script += '{';
		script += 'tendencia = "Negativa";';
		script += 'finalEra = currentEra;';
	script += '}';
	script += 'else{';
		script += 'tendencia = "Neutral";';
		script += 'finalEra = (carrerEra + currentEra)/2;';
	script += '}';
script += '}';
script += 'else{';
		script += 'tendencia = "Neutral";';
		script += 'finalEra = (carrerEra + currentEra)/2;';
script += '}';


script += 'pitcherStats.push({currentStats:currentStats, carrerStats:carrerStats, currentEra: currentEra, carrerEra:carrerEra, tendencia:tendencia, finalEra:finalEra });';
script += 'return JSON.stringify(pitcherStats);';


    return script;

}

async function load(filename, foldername = null)
{
    if(foldername)
    {
        const data = fs.readFileSync("./"+foldername+"/"+filename+".json");
        return JSON.parse(data);
    }
    else{
        var folder = "";
            if(filename.indexOf("th") >= 0)
            {
                folder = filename.split("th")[0]+"th";
            }
            else if(filename.indexOf("rd") >= 0){
                folder = filename.split("rd")[0]+"rd";
            }
            else if(filename.indexOf("nd") >= 0){
                folder = filename.split("nd")[0]+"nd";
            }
            else if(filename.indexOf("st") >= 0){
                folder = filename.split("st")[0]+"st";
                if(filename.indexOf("August1st") >= 0)
                {
                    folder = filename.split("1st")[0]+"1st";
                }
                else if(filename.indexOf("August21st") >= 0)
                {
                    folder = filename.split("21st")[0]+"21st";
                }
                else if(filename.indexOf("August31st") >= 0)
                {
                    folder = filename.split("31st")[0]+"31st";
                }
            }
        const data = fs.readFileSync("./"+filename.split(/[0-9]/)[0]+"/"+folder+"/"+filename+".json");
        return JSON.parse(data);
    }

}


async function save(fileName, jsonObject, callback, appendOrReplace, foldername = null)
{
    if(foldername)
    {
        if(appendOrReplace == "replace")
        {
            var dir = "./"+foldername+"/";
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir, { recursive: true });
            }  
            fs.writeFileSync(dir+fileName + '.json', JSON.stringify(jsonObject) , 'utf8', callback);
        }
    }
    else{
        if(appendOrReplace == "replace")
        {
            var folder = "";
            if(fileName.indexOf("th") >= 0)
            {
                folder = fileName.split("th")[0]+"th";
            }
            else if(fileName.indexOf("rd") >= 0){
                folder = fileName.split("rd")[0]+"rd";
            }
            else if(fileName.indexOf("nd") >= 0){
                folder = fileName.split("nd")[0]+"nd";
            }
            else if(fileName.indexOf("st") >= 0){
                folder = fileName.split("st")[0]+"st";
                if(fileName.indexOf("August1st") >= 0)
                {
                    folder = fileName.split("1st")[0]+"1st";
                }
                else if(fileName.indexOf("August21st") >= 0)
                {
                    folder = fileName.split("21st")[0]+"21st";
                }
                else if(fileName.indexOf("August31st") >= 0)
                {
                    folder = fileName.split("31st")[0]+"31st";
                }
            }

            var dir = "./"+fileName.split(/[0-9]/)[0]+"/"+folder+"/";
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir, { recursive: true });
            }  

            fs.writeFileSync(dir+fileName + '.json', JSON.stringify(jsonObject) , 'utf8', callback);
        }
    }
}

function splitAtFirstNumber(str) {
    // Find the index of the first occurrence of a number
    let match = str.match(/\d/);
    if (match) {
        let index = match.index;
        return [str.slice(0, index), str.slice(index)];
    }
    // If no number is found, return the original string in an array
    return [str];
}


async function GetTeamSchedule()
{
    var script = 'var scheduleData = document.getElementsByClassName("page-container cf")[0];                           ';
script += 'var scheduleRows = scheduleData.getElementsByClassName("Table__TR Table__TR--sm Table__even");       ';
script += 'var columns = [];                                                                                    ';
script += 'var schedules = [];                                                                                  ';
script += 'for (let index = 0; index < scheduleRows.length; index++) {                                          ';
script += '    const row = scheduleRows[index];                                                                 ';
script += '    var values = row.getElementsByClassName("Table__TD");                                            ';
script += '    var scheduleValues = [];                                                                         ';
script += '    var record = {                                                                                   ';
script += '        DATE: "",                                                                                    ';
script += '        OPPONENT: "",                                                                                ';
script += '        RESULT: "",                                                                                  ';
script += '        "W-L": "",                                                                                   ';
script += '        WIN: "",                                                                                     ';
script += '        LOSS: "",                                                                                    ';
script += '        SAVE: "",                                                                                    ';
script += '        ATT: "",                                                                                     ';
script += '        WINS: "",                                                                                    ';
script += '        LOSES: "",                                                                                   ';
script += '        RUNSSCORED: "",                                                                              ';
script += '        RUNSRECEIVED: "",                                                                            ';
script += '        ISWIN: "",                                                                                   ';
script += '        GAMELINK: ""                                                                                 ';
script += '    };                                                                                               ';
script += '    for (let id = 0; id < values.length; id++) {                                                     ';
script += '        const val = values[id];                                                                      ';
script += '        if (index == 0) {                                                                            ';
script += '            columns.push(val.innerText);                                                             ';
script += '        } else {                                                                                     ';
script += '            if (columns[id] != val.innerText) {                                                      ';
script += '                if (columns[id] == "W-L") {                                                          ';
script += '                    var wins = val.innerText.split("-")[0];                                          ';
script += '                    var loses = val.innerText.split("-")[1];                                         ';
script += '                    record[columns[id]] = val.innerText;                                             ';
script += '                    record.WINS = wins;                                                              ';
script += '                    record.LOSES = loses;                                                            ';
script += '                } else if (columns[id] == "RESULT") {                                                ';
script += '                try{                                                                                  '; 
script += '                    gameLink = val.getElementsByClassName("AnchorLink")[0].href;';
script += '                    }';
script += '                    catch';
script += '                    {';
script += '                        gameLink = "Postponed";';
script += '                    }';
script += '                    var score = val.innerText.split(" ")[0];                                         ';
script += '                    var runsScored = "";                                                             ';
script += '                    var runsReceived = "";                                                           ';
script += '                    var isWin = "";                                                                  ';
script += '                    var scoreDiff = "";                                                              ';
script += '                    if (score.indexOf("LIVE") < 0) {                                                 ';
script += '                        if (score.indexOf("W") >= 0) {                                               ';
script += '                            runsScored = score.replace("W").split("-")[0].replace("undefined", "");  ';
script += '                            runsReceived = score.replace("W").split("-")[1].replace("undefined", "");';
script += '                            isWin = "Win";                                                           ';
script += '                            scoreDiff = runsScored - runsReceived;                                   ';
script += '                        } else if (score.indexOf("L") >= 0) {                                        ';
script += '                            runsScored = score.replace("L").split("-")[1].replace("undefined", "");  ';
script += '                            runsReceived = score.replace("L").split("-")[0].replace("undefined", "");';
script += '                            isWin = "Lost";                                                          ';
script += '                            scoreDiff = runsReceived - runsScored;                                   ';
script += '                        }                                                                            ';
script += '                    }                                                                                ';
script += '                    record[columns[id]] = val.innerText;                                             ';
script += '                    record.RUNSSCORED = runsScored;                                                  ';
script += '                    record.RUNSRECEIVED = runsReceived;                                              ';
script += '                    record.ISWIN = isWin;                                                            ';
script += '                    record.GAMELINK = gameLink;                                                      ';
script += '                } else {                                                                             ';
script += '                    record[columns[id]] = val.innerText;                                             ';
script += '                }                                                                                    ';
script += '            } else {                                                                                 ';
script += '                break;                                                                               ';
script += '            }                                                                                        ';
script += '        }                                                                                            ';
script += '    }                                                                                                ';
script += '    if (record.ISWIN) {                                                                              ';
script += '        schedules.push(record);                                                                      ';
script += '    }                                                                                                ';
script += '} return JSON.stringify(schedules);																	';


            return script;
}

async function ProcessRunsHitsGameData(){
    var script = 'var scoreBoard = document.getElementsByClassName("ResponsiveTable")[0];                      ' ;
script += 'var scoreHeadersData = scoreBoard.getElementsByClassName("Table__TH");                          ' ;
script += '    var scoreData = scoreBoard.getElementsByClassName("playByPlay__linescore__score Table__TD");' ;
script += '    var scoreHeaders = [];                                                                      ' ;
script += '    for (let i = 0; i < scoreHeadersData.length-1; i++) {                                       ' ;
script += '        const header = scoreHeadersData[i].innerText.trim();                                    ' ;
script += '        scoreHeaders.push(header);                                                              ' ;
script += '    }                                                                                           ' ;
script += '                                                                                                ' ;
script += '    var scoreDetails = {away:[],home:[]};                                                       ' ;
script += '    var times = 0;                                                                              ' ;
script += '    for (let index = 0; index < scoreData.length-1; index++) {                                  ' ;
script += '        var scoreDataDetail = {};                                                               ' ;
script += '                                                                                                ' ;
script += '        for (let r = 0; r < scoreHeaders.length; r++) {                                         ' ;
script += '            const header = scoreHeaders[r];                                                     ' ;
script += '            var data = scoreData[index].innerText;                                              ' ;
script += '            scoreDataDetail[header] = data;                                                     ' ;
script += '            index++;                                                                            ' ;
script += '        }                                                                                       ' ;
script += '                                                                                                ' ;
script += '        if(times == 0)                                                                          ' ;
script += '        {                                                                                       ' ;
script += '            scoreDetails.away.push(scoreDataDetail);                                            ' ;
script += '        }                                                                                       ' ;
script += '        else{                                                                                   ' ;
script += '            scoreDetails.home.push(scoreDataDetail);                                            ' ;
script += '        }                                                                                       ' ;
script += '        times++;                                                                                ' ;
script += '        index = ((scoreHeaders.length-1)*times);                                                ' ;
script += '    }                                                                                           ' ;
script += '    return JSON.stringify(scoreDetails);															';

return script;
}


async function ProcessPitcherGameData(){
    var script = 'var pitcherDetails = {away:[],home:[]};                                               ';
script += '    var indexes = [3,5];                                                                  ';
script += '    for (let t = 0; t < indexes.length; t++)                                             ';
script += '    {                                                                                    ';
script += '        var ind = indexes[t];                                                            ';
script += '        var pitcherBoard = document.getElementsByClassName("ResponsiveTable")[ind];      ';
script += '        var pitchersHeadersData = pitcherBoard.getElementsByClassName("Table__TH");      ';
script += '        var pitchersData = pitcherBoard.getElementsByClassName("Table__TD");             ';
script += '        var pitcherHeaders = [];                                                         ';
script += '        for (let i = 0; i < pitchersHeadersData.length; i++) {                           ';
script += '            const header = pitchersHeadersData[i].innerText.trim();                      ';
script += '            pitcherHeaders.push(header);                                                 ';
script += '        }                                                                                ';
script += '                                                                                         ';
script += '        var times = 0;                                                                   ';
script += '        for (let index = 0; index < pitchersData.length-1; index++) {                    ';
script += '            var pitcherDataDetail = {};                                                  ';
script += '                                                                                         ';
script += '            for (let r = 0; r < pitcherHeaders.length; r++) {                            ';
script += '                const header = pitcherHeaders[r];                                        ';
script += '                var data = pitchersData[index].innerText;                                ';
script += '                pitcherDataDetail[header] = data;                                        ';
script += '                index++;                                                                 ';
script += '                                                                                         ';
script += '            }                                                                            ';
script += '            if(ind == 3)                                                                 ';
script += '            {                                                                            ';
script += '                pitcherDetails.away.push(pitcherDataDetail);                             ';
script += '            }                                                                            ';
script += '            else{                                                                        ';
script += '                pitcherDetails.home.push(pitcherDataDetail);                             ';
script += '            }                                                                            ';
script += '            times++;                                                                     ';
script += '            index = ((pitcherHeaders.length)*times)-1;                                   ';
script += '                                                                                         ';
script += '        }                                                                                ';
script += '                                                                                         ';
script += '    }                                                                                    ';
script += '    return JSON.stringify(pitcherDetails);												';

    return script;
}

async function ProcessBatterGameData(){
    var script = 'var batterDetails = {away:[],home:[]};                                               ' ;
script += '   var indexes = [2,4];                                                                  ' ;
script += '    for (let t = 0; t < indexes.length; t++)                                            ' ;
script += '    {                                                                                   ' ;
script += '        var ind = indexes[t];                                                           ' ;
script += '        var batterBoard = document.getElementsByClassName("ResponsiveTable")[ind];      ' ;
script += '        var battersHeadersData = batterBoard.getElementsByClassName("Table__TH");       ' ;
script += '        var battersData = batterBoard.getElementsByClassName("Table__TD");              ' ;
script += '        var batterHeaders = [];                                                         ' ;
script += '        for (let i = 0; i < battersHeadersData.length; i++) {                           ' ;
script += '            const header = battersHeadersData[i].innerText.trim();                      ' ;
script += '            batterHeaders.push(header);                                                 ' ;
script += '        }                                                                               ' ;
script += '                                                                                        ' ;
script += '        var times = 0;                                                                  ' ;
script += '        for (let index = 0; index < battersData.length-1; index++) {                    ' ;
script += '            var batterDataDetail = {};                                                  ' ;
script += '                                                                                        ' ;
script += '            for (let r = 0; r < batterHeaders.length; r++) {                            ' ;
script += '                const header = batterHeaders[r];                                        ' ;
script += '                var data = battersData[index].innerText;                                ' ;
script += '                batterDataDetail[header] = data;                                        ' ;
script += '                index++;                                                                ' ;
script += '                                                                                        ' ;
script += '            }                                                                           ' ;
script += '            if(ind == 2)                                                                ' ;
script += '            {                                                                           ' ;
script += '                batterDetails.away.push(batterDataDetail);                              ' ;
script += '            }                                                                           ' ;
script += '            else{                                                                       ' ;
script += '                batterDetails.home.push(batterDataDetail);                              ' ;
script += '            }                                                                           ' ;
script += '            times++;                                                                    ' ;
script += '            index = ((batterHeaders.length)*times)-1;                                   ' ;
script += '                                                                                        ' ;
script += '        }                                                                               ' ;
script += '                                                                                        ' ;
script += '    }                                                                                   ' ;
script += '    return JSON.stringify(batterDetails);												';
    return script;
}

async function JSGetDataFromBet365()
{
    var dayWithGames = document.getElementsByClassName("gl-MarketGroupContainer");
    var upcomingGames = [];
    for(var d=0; d<dayWithGames.length; d++)

    {
        var data = dayWithGames[d];
        var date = data.getElementsByClassName("rcl-MarketHeaderLabel-isdate")[0].innerText;
        var matches = data.getElementsByClassName("sbb-ParticipantTwoWayWithPitchersBaseball_LhsContainer");

        var schedule = {date: date, games:[]};

        var handicap = data.getElementsByClassName("sgl-MarketOddsExpand")[0];
        var handicapRuns = handicap.getElementsByClassName("sac-ParticipantCenteredStacked60OTB_Handicap");
        var handicapOdds = handicap.getElementsByClassName("sac-ParticipantCenteredStacked60OTB_Odds");
        var hr = 0;

        var overUnder = data.getElementsByClassName("sgl-MarketOddsExpand")[1];
        var oUruns = overUnder.getElementsByClassName("sac-ParticipantCenteredStacked60OTB_Handicap")
        var oUOdds = overUnder.getElementsByClassName("sac-ParticipantCenteredStacked60OTB_Odds");
        
        var moneyLine = data.getElementsByClassName("sgl-MarketOddsExpand")[2];
        var mLOdds = moneyLine.getElementsByClassName("sac-ParticipantCenteredStacked60OTB_Odds");

            for(var i=0; i<matches.length; i++)
            {
                var match = matches[i];
                var teams = match.getElementsByClassName("sbb-ParticipantTwoWayWithPitchersBaseball_Team");
                var pitchers = match.getElementsByClassName("sbb-ParticipantTwoWayWithPitchersBaseball_Pitcher");
                var awayTeam = teams[0].innerText.split(" ")[1];
                var awayId = teams[0].innerText.split(" ")[0];
                var homeTeam = teams[1].innerText.split(" ")[1];
                var homeId = teams[1].innerText.split(" ")[0];
                var awayPitcher = pitchers[0].innerText;
                var homePitcher = pitchers[1].innerText;
                var awayHandicapRuns = handicapRuns[hr].innerText;
                var awayHandicapOdds = handicapOdds[hr].innerText;
                var overRuns = oUruns[hr].innerText;
                var overOdd = oUOdds[hr].innerText;
                var awayML = mLOdds[hr].innerText;
                hr = hr +1;

                var homeHandicapRuns = handicapRuns [hr].innerText;
                var homeHandicapOdds = handicapOdds[hr].innerText;
                var underRuns = oUruns[hr].innerText;
                var underOdd = oUOdds[hr].innerText;
                var homeML = mLOdds[hr].innerText;
                hr = hr +1;

                var gameTime = match.getElementsByClassName("sbb-ParticipantTwoWayWithPitchersBaseball_Details")[0].innerText.split("\n")[0];

                var game =  {
                    game:awayId +" "+awayTeam+" @ "+ homeId +" "+ homeTeam, 
                    gameTime: gameTime ,
                    overUnder: {
                        overRuns: overRuns,
                        overOdd: overOdd,
                        underRuns: underRuns,
                        underOdd: underOdd
                    },

                    awayTeam: {
                        awayTeam: awayId+awayTeam, 
                        awayId: awayId, 
                        awayPitcher: awayPitcher,
                        awayHandicapRuns: awayHandicapRuns,
                        awayHandicapOdds: awayHandicapOdds,
                        awayML: awayML
                    }, 

                    homeTeam:{
                        homeTeam: homeId+homeTeam, 
                        homeId: homeId,
                        homePitcher:homePitcher,
                        homeHandicapRuns: homeHandicapRuns,
                        homeHandicapOdds: homeHandicapOdds,
                        homeML: homeML
                    }}
                schedule.games.push(game);
            }
            upcomingGames.push(schedule);
            JSON.stringify(upcomingGames);

    }

}

async function JSUpdateBetAmounts()
{
    const regex = /\d+\.\d{2}/g; // Using the global flag to find all matches
    var bets  = document.getElementsByClassName("mbl-SettledBetItem");
    for (let index = 0; index < bets.length; index++) {
        var bet = bets[index];
        var betHeader = bet.getElementsByClassName("mbl-SettledBetItemHeader_Text")[0];
        var returnHeader = bet.getElementsByClassName("mbl-SettledBetItem_BetReturnLabel")[0];
        var betFooter = bet.getElementsByClassName("lyx-StakeDisplay_StakeWrapper")[0];
        var returnFooter = bet.getElementsByClassName("mbl-SettledBetItemFooter_BetInformationText")[0];
        var betHeaderToBeReplaced = betHeader.innerText.match(regex)[0];
        var returnHeaderToBeReplaced = returnHeader.innerText.match(regex)[0];
        var betFooterToBeReplaced = betFooter.innerText.match(regex)[0];
        var returnFooterToBeReplaced = returnFooter.innerText.match(regex)[0];
        const betHeaderValue = new Intl.NumberFormat('en-US', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format((parseFloat(betHeaderToBeReplaced)*10).toFixed(2));
        const returnHeaderValue = new Intl.NumberFormat('en-US', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format((parseFloat(returnHeaderToBeReplaced)*10).toFixed(2));
        const betFooterValue = new Intl.NumberFormat('en-US', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format((parseFloat(betFooterToBeReplaced)*10).toFixed(2));
        const returnFooterValue = new Intl.NumberFormat('en-US', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format((parseFloat(returnFooterToBeReplaced)*10).toFixed(2));
        betHeader.innerText = betHeader.innerText.replace(betHeaderToBeReplaced, betHeaderValue);
        returnHeader.innerText = returnHeader.innerText.replace(returnHeaderToBeReplaced, returnHeaderValue);
        betFooter.innerText = betFooter.innerText.replace(betFooterToBeReplaced, betFooterValue);
        returnFooter.innerText = returnFooter.innerText.replace(returnFooterToBeReplaced, returnFooterValue);
        console.log(betHeaderValue);
        console.log(returnHeaderValue);
        console.log(betFooterValue);
        console.log(returnFooterValue);
    }
}

async function JSGetMLBGamesFromBet(){
var dayWithGames = document.getElementsByClassName("gsbb-ParticipantTwoWayWithPitchersBaseball rcl-MarketCouponAdvancedBase_Divider gl-Market_General-cn1");
var games = document.getElementsByClassName("sbb-ParticipantTwoWayWithPitchersBaseball_LhsContainer");
var elements = document.getElementsByClassName("sac-ParticipantCenteredStacked60OTB");
var moneyLines = [];
var handicaps = [];
var overs = [];
var date = document.getElementsByClassName("rcl-MarketHeaderLabel-isdate")[0].innerText;

for(var d=0; d<(games.length*2); d++)
{

	moneyLines.push(elements[d].innerText);

}


for(var d=(games.length*2); d<(games.length*4); d++)
{

	handicaps.push(elements[d].innerText);

}

for(var d=(games.length*4); d<(games.length*6); d++)
{

	overs.push(elements[d].innerText);

}

var upcomingGames = [];
var schedule = {date: date, games:[]};

for(var d=0; d<games.length; d++)
{

	var awayTeam = games[d].getElementsByClassName("sbb-ParticipantTwoWayWithPitchersBaseball_Team")[0].innerText;
	var homeTeam = games[d].getElementsByClassName("sbb-ParticipantTwoWayWithPitchersBaseball_Team")[1].innerText;
	var game = awayTeam+" @ "+ homeTeam;
	var gameTime = games[d].getElementsByClassName("sbb-ParticipantTwoWayWithPitchersBaseball_BookCloses")[0].innerText.split("\n")[0];
	var homePitcher = games[d].getElementsByClassName("sbb-ParticipantTwoWayWithPitchersBaseball_Pitcher")[1].innerText;
	var awayPitcher = games[d].getElementsByClassName("sbb-ParticipantTwoWayWithPitchersBaseball_Pitcher")[0].innerText;
	console.log(homePitcher);
	console.log(awayPitcher);
	var game =  {
		game:game, 
		gameTime: gameTime ,
		overUnder: {
			overOdd: overs[d],
			underOdd: overs[d+1]
		},

		awayTeam: {
			awayTeam: awayTeam.replace(/\s+/g, ''), 
			awayId: awayTeam.split(" ")[0], 
			awayPitcher: awayPitcher,
			awayHandicapRuns: handicaps[d].split("\n")[0],
			awayHandicapOdds: handicaps[d].split("\n")[1],
			awayML: moneyLines[d]
		}, 

		homeTeam:{
			homeTeam: homeTeam.replace(/\s+/g, ''), 
			homeId: homeTeam.split(" ")[0],
			homePitcher:homePitcher,
			homeHandicapRuns: handicaps[d+1].split("\n")[0],
			homeHandicapOdds: handicaps[d+1].split("\n")[1],
			homeML: moneyLines[d+1]
		}}
	schedule.games.push(game);
	
}
upcomingGames.push(schedule);
JSON.stringify(upcomingGames);
}

async function JSUpdateBetAmounts(){
    const regex = /\d+\.\d{2}/g; // Using the global flag to find all matches
    var bets  = document.getElementsByClassName("myb-OpenBetItem");
    for (let index = 0; index < bets.length; index++) {
        var bet = bets[index];
        var betHeader = bet.getElementsByClassName("myb-OpenBetItem_StakeDesc")[0];
        var returns = bet.querySelectorAll('.myb-CloseBetButtonBase_Return:not(.Hidden)');;
        var returnHeader = bet.getElementsByClassName("myb-CloseBetButtonBase_Return")[returns.length-1];
        var betFooter = bet.getElementsByClassName("myx-StakeDisplay_StakeWrapper")[0];
        var returnFooter = bet.getElementsByClassName("myb-OpenBetItemInnerView_BetInformationText")[0];
        
        var betHeaderToBeReplaced = betHeader.innerText.match(regex)[0];
        if(returns.length > 0){
            var returnHeaderToBeReplaced = returnHeader.innerText.match(regex)[0];
            const returnHeaderValue = new Intl.NumberFormat('en-US', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format((parseFloat(returnHeaderToBeReplaced)*10).toFixed(2));
            returnHeader.innerText = returnHeader.innerText.replace(returnHeaderToBeReplaced, returnHeaderValue);
        }
        var betFooterToBeReplaced = betFooter.innerText.match(regex)[0];
        var returnFooterToBeReplaced = returnFooter.innerText.match(regex)[0];
        const betHeaderValue = new Intl.NumberFormat('en-US', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format((parseFloat(betHeaderToBeReplaced)*10).toFixed(2));
        
        const betFooterValue = new Intl.NumberFormat('en-US', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format((parseFloat(betFooterToBeReplaced)*10).toFixed(2));
        const returnFooterValue = new Intl.NumberFormat('en-US', {minimumFractionDigits: 2,maximumFractionDigits: 2}).format((parseFloat(returnFooterToBeReplaced)*10).toFixed(2));
        betHeader.innerText = betHeader.innerText.replace(betHeaderToBeReplaced, betHeaderValue);
        
        betFooter.innerText = betFooter.innerText.replace(betFooterToBeReplaced, betFooterValue);
        returnFooter.innerText = returnFooter.innerText.replace(returnFooterToBeReplaced, returnFooterValue);
        console.log(betHeaderValue);
        //console.log(returnHeaderValue);
        console.log(betFooterValue);
        console.log(returnFooterValue);
    }
}