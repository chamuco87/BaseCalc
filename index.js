var {Options} = require('selenium-webdriver/chrome')
const {Builder, Browser, By, Key, until} = require('selenium-webdriver');
var fs = require('fs');

var statsURL = "https://www.espn.com/mlb/player/stats/_/";
var battersURL = "https://www.espn.com/mlb/team/stats/_/name/";
var schedulesURL = "https://www.espn.com/mlb/team/schedule/_/name/";
var pitchersURL = "https://www.espn.com/mlb/team/stats/_/type/pitching/name/";

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

(async function example() {
    let driver =await new Builder()
          .withCapabilities(
              Options.chrome()
               //.setPageLoadStrategy('none')
          ).build()
    //let driver = await new Builder().forBrowser(Browser.CHROME).build();
    try {
        var selectedDate = "April19th";
        //await getESPNData(selectedDate);
        //await getBattersData(selectedDate);
        //await getBestScoringTeamsByBatting(selectedDate);
        //await getBestHittingTeamsByBatting(selectedDate);
        //await getAllPitchersData(selectedDate);
        //await getBestStartingPitchersTeams(selectedDate);
        //await getBestRelievingPitchersTeams(selectedDate);
        //await getBestOverallPitchersTeams(selectedDate);
        //await getScheduleData(selectedDate);
        //await getMoreWininigTeams(selectedDate);
        //await getMoreScoringTeams(selectedDate);
        //await getMoreReceivingTeams(selectedDate);
        //await evaluateGames(selectedDate);
        //await sortBetterAvgs(selectedDate);
        //await filterConsistentPicks(selectedDate);

        //await AlgoSeriesWinnerBasedOnResultAndPattern(selectedDate);
        //await AlgoDetailedPitchingAndBattingAnalysis(selectedDate);

        //await consolidateAlgorithmResults(selectedDate);

        //await getScheduleData(selectedDate);
        //await getResults(selectedDate);

        await getBestPitcherOfTheDay(selectedDate);

    } 
    catch(Ex){
      console.log(Ex);
    } finally {
      await driver.quit();
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
    var stopHere = "";
}

async function consolidateAlgorithmResults(date)
{
    var seriesWinnersResults = await load(date+"SeriesWinners");
    var pitcherBatterResults = await load(date);
    var homeConfidentExpectedWinners = [];
    var awayConfidentExpectedWinners = [];
    var homeNoConfidentExpectedWinners = [];
    var awayNoConfidentExpectedWinners = [];
    var noConclusiveGames = [];

    var selectedGames = [];
    var overSelectedGames = [];
    var underSelectedGames = [];

    for (let index = 0; index < pitcherBatterResults[0].games.length; index++) {
        const pitcherBatterGame = pitcherBatterResults[0].games[index];

        var seriesWinnerGame = seriesWinnersResults.filter(function(item){
            return item.game.indexOf(pitcherBatterGame.game)>=0;         
            })[0];

        

        if(pitcherBatterGame.gameExpectedResult && seriesWinnerGame)
        {
            var gameAnalisysDetails = {
                pitcherBatterExWinner:pitcherBatterGame.gameExpectedResult.expectedFinalWinner,
                pitcherBatterFinalHandicap: pitcherBatterGame.gameExpectedResult.finalHandicapExpected,
                pitcherBatterAwayExRuns : pitcherBatterGame.gameExpectedResult.awayFinalExpectedRuns,
                pitcherBatterHomeExRuns : pitcherBatterGame.gameExpectedResult.homeFinalExpectedRuns,
                seriesExWinner: seriesWinnerGame.seriesExpectedWinner,
                seriesConfidenceRanking: seriesWinnerGame.confidenceRanking,
                seriesExpectedWinnerRuns: seriesWinnerGame.expectedWinnerRuns,
                seriesExpectedLoserRuns: seriesWinnerGame.expectedLoserRuns
            };
            if(pitcherBatterGame.gameExpectedResult.expectedFinalWinner == seriesWinnerGame.seriesExpectedWinner)
            {
                var overallConfidence = pitcherBatterGame.gameExpectedResult.finalHandicapExpected + seriesWinnerGame.confidenceRanking;
                if(seriesWinnerGame.isConsistent)
                {
                    if(seriesWinnerGame.seriesExpectedWinner == pitcherBatterGame.homeTeam.homeTeam)
                    {
                        homeConfidentExpectedWinners.push({game:pitcherBatterGame.game, expectedWinner: seriesWinnerGame.seriesExpectedWinner, overallConfidence:overallConfidence, gameAnalisysDetails:gameAnalisysDetails });
                        selectedGames.push({game:pitcherBatterGame.game, expectedWinner: seriesWinnerGame.seriesExpectedWinner, overallConfidence:overallConfidence, gameAnalisysDetails:gameAnalisysDetails });
                    }
                    else{
                        awayConfidentExpectedWinners.push({game:pitcherBatterGame.game, expectedWinner: seriesWinnerGame.seriesExpectedWinner, overallConfidence:overallConfidence, gameAnalisysDetails:gameAnalisysDetails });
                        selectedGames.push({game:pitcherBatterGame.game, expectedWinner: seriesWinnerGame.seriesExpectedWinner, overallConfidence:overallConfidence, gameAnalisysDetails:gameAnalisysDetails });
                    }
                }
                else{
                    if(seriesWinnerGame.seriesExpectedWinner == pitcherBatterGame.homeTeam.homeTeam)
                    {
                        homeNoConfidentExpectedWinners.push({game:pitcherBatterGame.game, expectedWinner: seriesWinnerGame.seriesExpectedWinner, overallConfidence:overallConfidence, gameAnalisysDetails:gameAnalisysDetails });
                        selectedGames.push({game:pitcherBatterGame.game, expectedWinner: seriesWinnerGame.seriesExpectedWinner, overallConfidence:overallConfidence, gameAnalisysDetails:gameAnalisysDetails });
                    }
                    else{
                        awayNoConfidentExpectedWinners.push({game:pitcherBatterGame.game, expectedWinner: seriesWinnerGame.seriesExpectedWinner, overallConfidence:overallConfidence, gameAnalisysDetails:gameAnalisysDetails });
                        selectedGames.push({game:pitcherBatterGame.game, expectedWinner: seriesWinnerGame.seriesExpectedWinner, overallConfidence:overallConfidence, gameAnalisysDetails:gameAnalisysDetails });
                    }
                }
            }
            else{
                noConclusiveGames.push(gameAnalisysDetails);
            }

            if(seriesWinnerGame.expectedTotalScore >= 9 && pitcherBatterGame.gameExpectedResult.finalTotalRunsExpected >= 9)
            {
                var confidenceLevel = (seriesWinnerGame.expectedTotalScore + pitcherBatterGame.gameExpectedResult.finalTotalRunsExpected)/2;
                overSelectedGames.push({game:pitcherBatterGame.game, seriesRunsEx: seriesWinnerGame.expectedTotalScore, pitcherBatterRunsEx: pitcherBatterGame.gameExpectedResult.finalTotalRunsExpected, confidenceLevel:confidenceLevel, gameAnalisysDetails:gameAnalisysDetails  });
            }
            else if(seriesWinnerGame.expectedTotalScore < 8 && pitcherBatterGame.gameExpectedResult.finalTotalRunsExpected < 8)
            {
                var confidenceLevel = (seriesWinnerGame.expectedTotalScore + pitcherBatterGame.gameExpectedResult.finalTotalRunsExpected)/2;
                underSelectedGames.push({game:pitcherBatterGame.game, seriesRunsEx: seriesWinnerGame.expectedTotalScore, pitcherBatterRunsEx: pitcherBatterGame.gameExpectedResult.finalTotalRunsExpected, confidenceLevel:confidenceLevel, gameAnalisysDetails:gameAnalisysDetails  });
            }

        }
        else if(pitcherBatterGame.gameExpectedResult){
            noConclusiveGames.push(pitcherBatterGame.gameExpectedResult);
        }
        else{
            noConclusiveGames.push(seriesWinnerGame);
        }
        
    }

    selectedGames = await sorting(selectedGames, "overallConfidence", "DESC");
    overSelectedGames = await sorting(overSelectedGames, "confidenceLevel", "DESC");
    underSelectedGames = await sorting(underSelectedGames, "confidenceLevel", "ASC");

    await save("SelectedGames"+date, selectedGames, function(){}, "replace");
    await save("overSelectedGames"+date, overSelectedGames, function(){}, "replace");
    await save("underSelectedGames"+date, underSelectedGames, function(){}, "replace");
    await save("SonadoraGames"+date, noConclusiveGames, function(){}, "replace");

}


async function AlgoDetailedPitchingAndBattingAnalysis(date)
{
    var allGamesWithPitcherData = await load(date);
    for (let index = 0; index < allGamesWithPitcherData[0].games.length; index++) {
        const game = allGamesWithPitcherData[0].games[index];
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
                return item.teamName.indexOf(game.awayTeam.awayTeam)>=0;         
                })[0];

            var homeRelieverPitcherRuns = relevingPitchersAllowedRuns.filter(function(item){
                return item.teamName.indexOf(game.homeTeam.homeTeam)>=0;         
                })[0];


            var runsBatterData = await load(date+"ScoringBattersTeamsByRuns");

            var awayBatterPowerByRuns = runsBatterData.filter(function(item){
                return item.teamName.indexOf(game.awayTeam.awayTeam)>=0;         
                })[0];
            
            var awayAvgRunsSecondHalf = (awayBatterPowerByRuns.runsAvg)/2;
            var awayRunsSecondHalf = 0;

            var homeBatterPowerByRuns = runsBatterData.filter(function(item){
                return item.teamName.indexOf(game.homeTeam.homeTeam)>=0;         
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
    }
    var stopHere = "";
}

async function AlgoSeriesWinnerBasedOnResultAndPattern(date)
{
    var allGames = await load(date);
    var teamsResultsData = await load(date+"TeamSchedules");
    var teamsReceivingRuns = await load(date+"TeamSchedulesByReceiving");
    var teamsScoringRuns = await load(date+"TeamSchedulesByScoring");
    var teamsWinningResults = await load(date+"TeamSchedulesByWinning");


    
    var battersData = await load(date+"BattersData");
    var hittingBatterData = await load(date+"HittingBattersTeamsByHits");
    var runsBatterData = await load(date+"ScoringBattersTeamsByRuns");



    var pitchersData = await load(date+"PitchersData");
    var starterPitchersAllowedRuns = await load(date+"StarterPitcherTeamsByRunsAllowed");
    var relevingPitchersAllowedRuns = await load(date+"RelevingPitcherTeamsByRunsAllowed");
    var overallPitchersAllowedRuns = await load(date+"OverallPitcherTeamsByRunsAllowed");
    
    var noDataGames = [];
    var winnersByResults = [];
    for (let index = 0; index < allGames[0].games.length; index++) {
        const game = allGames[0].games[index];
        

        /// Comparing Results
        
        var teamHomeResultsData = teamsResultsData.filter(function(item){
            return item.teamName.indexOf(game.homeTeam.homeTeam)>=0;         
            })[0];
        
        var homeReceivingRanking = teamsReceivingRuns.findIndex((team) => team.teamName.indexOf(game.homeTeam.homeTeam)>=0);
        var homeScoringRanking = teamsScoringRuns.findIndex((team) => team.teamName.indexOf(game.homeTeam.homeTeam)>=0);
        var homeWinningRanking = teamsWinningResults.findIndex((team) => team.teamName.indexOf(game.homeTeam.homeTeam)>=0);

        var teamAwayResultsData = teamsResultsData.filter(function(item){
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

        
        var winsAndRunsCalcResult = (winningExpectedWinner == runsExpectedWinner) ? 
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

    await save(date+"SeriesWinners", winnersByResults, function(){},"replace");

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
    var moreWininngTeams = await sorting(teamsData, "totalWins", "DESC");
    await save(date+"TeamSchedulesByWinning", moreWininngTeams, function(){}, "replace");
}

async function getMoreScoringTeams(date)
{
    var teamsData = await load(date+"TeamSchedules");
    var moreScoringTeams = await sorting(teamsData, "avgRunsScored", "DESC");
    await save(date+"TeamSchedulesByScoring", moreScoringTeams, function(){}, "replace");
}

async function getMoreReceivingTeams(date)
{
    var teamsData = await load(date+"TeamSchedules");
    var moreReceivingTeams = await sorting(teamsData, "avgRunsReceived", "ASC");
    await save(date+"TeamSchedulesByReceiving", moreReceivingTeams, function(){}, "replace");
}

async function filterConsistentPicks(date)
{
    var allGames = await load(date);
    var teamsData = await load(date+"TeamSchedules");
    var picksSummary = [];
    var winningGames = allGames[0].games.filter(function(item){
        return item.selection == 1;         
        });

    for (let W = 0; W < winningGames.length; W++) {
        const game = winningGames[W];
        var expectedWinnerData = teamsData.filter(function(item){
            return item.teamName.indexOf(game.expectedWinner)>=0;         
            })[0];

        game.isConfidentExpectedWinner = (expectedWinnerData.avgRunsScored>expectedWinnerData.avgRunsReceived && 
                                expectedWinnerData.totalWins> expectedWinnerData.totalLoses && expectedWinnerData.totalRunsScored > expectedWinnerData.totalRunsReceived) ? true: false;
        var opponentWinnerData = [];
        if(game.expectedWinner == game.awayTeam.awayTeam)
        {
            opponentWinnerData = teamsData.filter(function(item){
                return item.teamName.indexOf(game.homeTeam.homeTeam)>=0;         
                })[0];
        }
        else{
            opponentWinnerData = teamsData.filter(function(item){
                return item.teamName.indexOf(game.awayTeam.awayTeam)>=0;         
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
                    return item.teamName.indexOf(game.expectedWinner)>=0;         
                    })[0];
        
                game.isConfidentExpectedWinner = (expectedWinnerData.avgRunsScored>expectedWinnerData.avgRunsReceived && 
                                        expectedWinnerData.totalWins> expectedWinnerData.totalLoses && expectedWinnerData.totalRunsScored > expectedWinnerData.totalRunsReceived) ? true: false;
                var opponentWinnerData = [];
                if(game.expectedWinner == game.awayTeam.awayTeam)
                {
                    opponentWinnerData = teamsData.filter(function(item){
                        return item.teamName.indexOf(game.homeTeam.homeTeam)>=0;         
                        })[0];
                }
                else{
                    opponentWinnerData = teamsData.filter(function(item){
                        return item.teamName.indexOf(game.awayTeam.awayTeam)>=0;         
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
            return item.teamName.indexOf(game.expectedWinner)>=0;         
            })[0];

        if(game.expectedWinner == game.awayTeam.awayTeam)
        {
            opponentWinnerData = teamsData.filter(function(item){
                return item.teamName.indexOf(game.homeTeam.homeTeam)>=0;         
                })[0];
        }
        else{
            opponentWinnerData = teamsData.filter(function(item){
                return item.teamName.indexOf(game.awayTeam.awayTeam)>=0;         
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
                return item.teamName.indexOf(game.awayTeam.awayTeam)>=0;         
                })[0];

            var awayTeamsData = teamsData.filter(function(item){
                return item.teamName.indexOf(game.awayTeam.awayTeam)>=0;         
                })[0];

            var homeBatters = battersData.filter(function(item){
                return item.teamName.indexOf(game.homeTeam.homeTeam)>=0;         
                })[0];

            var homeTeamsData = teamsData.filter(function(item){
                return item.teamName.indexOf(game.homeTeam.homeTeam)>=0;         
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
  if(sort == "ASC")
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

async function getScheduleData(date)
{
    var schedulesAllData =[];
    for (let index = 0; index < teams.length; index++) {
        const team = teams[index];
        var teamName = team.team.replace(" ","");
        await driver.get(schedulesURL+team.url);
        await driver.manage().setTimeouts({ implicit: 1000 });
        var scheduleData = [];
        await driver.executeScript(await GetTeamSchedule()).then(function(return_value) {
            scheduleData = JSON.parse(return_value);
            //for (let a = 0; a < scheduleData.length; a++) {
                //const game = scheduleData[a];
                var wins =  scheduleData.filter(function(item){
                    return item.ISWIN == "Win";         
                  });

                var loses =  scheduleData.filter(function(item){
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



                
            //}
            schedulesAllData.push({
                teamName: teamName, 
                totalWins:totalWins, 
                totalLoses:totalLoses,  
                totalRunsScored:totalRunsScored, 
                totalRunsReceived:totalRunsReceived,
                avgRunsScored:avgRunsScored,
                avgRunsReceived:avgRunsReceived,
                scheduleData: scheduleData});
            //}
        });
        await save(date+"TeamSchedules", schedulesAllData, function(){}, "replace");
    }
}


async function getAllPitchersData(date)
    {
        var pitchersAllData = [];
        var allPitchersInfo = [];
        for (let index = 0; index < teams.length; index++) {
            const team = teams[index];
            var teamName = team.team.replace(" ","");
            await driver.get(pitchersURL+team.url);
            await driver.manage().setTimeouts({ implicit: 1000 });
            var pitchersData = [];
            var starterSumAvg = 0;
            var relevingSumAvg = 0;
            var starterPitchersCount = 0;
            var relevingPitchersCount = 0
            await driver.executeScript(await GetAllPitchersStats()).then(function(return_value) {
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

            await save(date+"PitchersData",pitchersAllData, function(){}, "replace");
            await save(date+"AllPitchersInfo",allPitchersInfo, function(){}, "replace");
            
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
            var sumHits = 0;
            var sumRuns = 0;
            await driver.executeScript(await GetBattingStats()).then(function(return_value) {
                battersData = JSON.parse(return_value);
                for (let ele = 0; ele < battersData.length; ele++) {
                    const batter = battersData[ele];
                    var avg =  batter.playerStats.filter(function(item){
                        return item.stat == "AVG";         
                      });

                    var ops =  batter.playerStats.filter(function(item){
                    return item.stat == "OPS";         
                    });

                    var r =  batter.playerStats.filter(function(item){
                        return item.stat == "R";         
                      });

                    var h =  batter.playerStats.filter(function(item){
                    return item.stat == "H";         
                    });

                    sumAvg += parseFloat(avg[0].value);
                    sumHits += parseFloat(h[0].value);  
                    sumRuns += parseFloat(r[0].value);     
                    allPlayersInfo.push({teamName: teamName, name: batter.name, r:parseFloat(r[0].value), h:parseFloat(h[0].value) ,avg:parseFloat(avg[0].value), ops:parseFloat(ops[0].value), totalChances: parseFloat(avg[0].value)+parseFloat(ops[0].value) });                
                }
                var battingAvg = sumAvg/battersData.length;
                var runsAvg = sumRuns/battersData.length;
                var hitsAvg = sumHits/battersData.length;
                battersAllData.push({teamName: teamName, battingAvg: battingAvg, battersData: battersData, runsAvg:runsAvg, hitsAvg:hitsAvg});
                
            });

            await save(date+"BattersData",battersAllData, function(){}, "replace");
            await save(date+"AllPlayersInfo",allPlayersInfo, function(){}, "replace");
            
        }
        var stopHere = "";
    }

    async function getESPNData(date)
    {
        
        var data = await load(date);
        for (let i = 0; i < data[0].games.length; i++) {
            var game = data[0].games[i];
            //
            if((game.awayTeam.awayPitcher && game.homeTeam.homePitcher)&& (typeof game.homeTeam.homePitcherData == 'undefined' || typeof game.awayTeam.awayPitcherData == 'undefined'))
            {
                var stopHere = "";
                game = await getPitcherData(game, "away", date);
                game = await getPitcherData(game, "home", date);
                save(date, data, function(){}, "replace")
            }
        }
        
    }
    
    async function getPitcherData(game, homeOrAway, date)
    {
        await driver.get("https://www.google.com");
        await driver.manage().setTimeouts({ implicit: 1000 });
        try{
            var noPitcherDataGames = await load(date+"NoData");
        }
        catch{
            var noPitcherDataGames = [];
        }

        try{
            var fixSearch = await load(date+"FixSearch");
        }
        catch{
            var fixSearch = [];
        }
        try{
        var term = homeOrAway == "home" ? game.homeTeam.homePitcher + " " + game.homeTeam.homeId +" "+ game.homeTeam.homeTeam.replace(game.homeTeam.homeId,"") : game.awayTeam.awayPitcher +" "+ game.awayTeam.awayId +" "+game.awayTeam.awayTeam.replace(game.awayTeam.awayId,"");
        try{
            var search = await driver.findElement(By.name("q")).sendKeys('site:www.espn.com.mx stats pitcher ' + term, Key.ENTER);
            var result = await driver.findElement(By.xpath('//*[@id="rso"]/div[1]/div/div/div[1]/div/div/span/a')).click();
            var espnId = (await driver.getCurrentUrl()).split("_/")[1];
            await driver.get(statsURL+espnId);
            }
            catch{
                try{
                    var result = await driver.findElement(By.xpath('/html/body/div[4]/div/div[13]/div/div[2]/div[2]/div/div/div[1]/div/div/div/div[1]/div/div/span/a')).click();
                    var espnId = (await driver.getCurrentUrl()).split("_/")[1];
                    await driver.get(statsURL+espnId);
                }
                catch{
                    await driver.get("https://www.google.com");
                    var search = await driver.findElement(By.name("q")).sendKeys('site:www.espn.com.ar estadisticas pitcher ' + term, Key.ENTER);
                    var result = await driver.findElement(By.xpath('//*[@id="rso"]/div[1]/div/div/div[1]/div/div/span/a')).click();
                    var espnId = (await driver.getCurrentUrl()).split("_/")[1];
                    await driver.get(statsURL+espnId);
                }
            }
        }
        catch{
            fixSearch.push(game);
            await save(date+"FixSearch", fixSearch, function(){}, "replace");
            console.log(term);
        }
        try{
            await driver.executeScript(await GetPitcherData()).then(function(return_value) {
            if(homeOrAway == "away")
            {
                game.awayTeam.awayPitcherData = JSON.parse(return_value);
            }
            else{
                game.homeTeam.homePitcherData = JSON.parse(return_value);
            }
            });

            await driver.executeScript(await GetPitcherDataWithFinalERA()).then(function(return_value) {
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
            
            noPitcherDataGames.push(game);
            await save(date+"NoData", noPitcherDataGames, function(){}, "replace");
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
    script += 'var player = players[index].innerText;';
    script += 'playersInfo.name = player;';
    script += 'if (index == 0) {';
        script += 'a = index * 17;';
    script += '} else {';
        script += 'a = (index * 18);';
    script += '}';
    script += 'var d = 0;';
    script += 'for (var b = a; d < statsCatalog.length; b++) {';
        script += 'var stat = statsCatalog[d].innerText;';
        script += 'var value = playersData[b].innerText;';
        script += 'd++;';
        script += 'playersStats.push({';
            script += 'stat: stat,';
            script += 'value: value';
        script += '});';
    script += '}';
    script += 'playersInfo.playerStats = playersStats;';
    script += 'playersDat.push(playersInfo);';
script += '}';
script += 'return JSON.stringify(playersDat);';

return script;
}

async function GetBattingStats()
{
    var script = 'var battersTable = document.getElementsByClassName("ResponsiveTable--fixed-left")[0];';
    script += 'var players = battersTable.getElementsByClassName("Table Table--align-right Table--fixed Table--fixed-left")[0].getElementsByClassName("Table__TD");';
    script += 'var playersData = battersTable.getElementsByClassName("Table__Scroller")[0].getElementsByClassName("Table__TD");';
    script += 'var statsCatalog = battersTable.getElementsByClassName("Table__header-group Table__THEAD")[1].getElementsByClassName("stats-cell Table__TH");';

    script += 'var playersDat = [];';
    script += 'var a = 0;';
    script += 'for (var index = 0; index < 9; index++) {';
        script += 'var playersStats =[];';
        script += 'var playersInfo = {name:"", playerStats:[]};';
        script += 'var player = players[index].innerText;';
        script += 'playersInfo.name = player;';
        script += 'if(index == 0)';
        script += '{';
            script += 'a = index*16;';
            script += '}';
            script += 'else{';
                script += 'a = (index*17);';
                script += '}';
                script += 'var d =0;';
                script += 'for (var b = a; d < statsCatalog.length; b++) {';
                    script += 'var stat = statsCatalog[d].innerText;';
                    script += 'var value = playersData[b].innerText;';
                    script += 'd++;';
                    script += 'playersStats.push({stat:stat, value:value});';
                    script += '}';

                    script += 'playersInfo.playerStats = playersStats;';
                    script += 'playersDat.push(playersInfo);';
                    script += '}';
                    script += 'return JSON.stringify(playersDat);';

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

async function load(filename)
{
const data = fs.readFileSync("./"+filename+".json");
return JSON.parse(data);

}


async function save(fileName, jsonObject, callback, appendOrReplace)
{
    if(appendOrReplace == "replace")
    {
    fs.writeFileSync(fileName + '.json', JSON.stringify(jsonObject) , 'utf8', callback);
    }
}


async function GetTeamSchedule()
{
    var script = 'var scheduleData = document.getElementsByClassName("page-container cf")[0];';
script += 'var scheduleRows = scheduleData.getElementsByClassName("Table__TR Table__TR--sm Table__even");';
script += 'var columns = [];';
script += 'var schedules = [];';

script += 'for (let index = 0; index < scheduleRows.length; index++) {';
    script += 'const row = scheduleRows[index];';
    script += 'var values = row.getElementsByClassName("Table__TD");';
    script += 'var scheduleValues = [];';
    script += 'var record = {';
        script += 'DATE: "",';
        script += 'OPPONENT: "",';
        script += 'RESULT: "",';
        script += '"W-L": "",';
        script += 'WIN: "",';
        script += 'LOSS: "",';
        script += 'SAVE: "",';
        script += 'ATT: "",';
        script += 'WINS: "",';
        script += 'LOSES: "",';
        script += 'RUNSSCORED: "",';
        script += 'RUNSRECEIVED: "",';
        script += 'ISWIN: ""';
    script += '};';
    script += 'for (let id = 0; id < values.length; id++) {';
        script += 'const val = values[id];';
        script += 'if (index == 0) {';
            script += 'columns.push(val.innerText);';
        script += '} else {';
            script += 'if (columns[id] != val.innerText) {';
                script += 'if (columns[id] == "W-L") {';
                    script += 'var wins = val.innerText.split("-")[0];';
                    script += 'var loses = val.innerText.split("-")[1];';
                    script += 'record[columns[id]] = val.innerText;';
                    script += 'record.WINS = wins;';
                    script += 'record.LOSES = loses;';

                script += '} else if (columns[id] == "RESULT") {';
                    script += 'var score = val.innerText.split(" ")[0];';
                    script += 'var runsScored = "";';
                    script += 'var runsReceived = "";';
                    script += 'var isWin = "";';
                    script += 'var scoreDiff = "";';
                    script += 'if(score.indexOf("LIVE") < 0){';
                    script += 'if (score.indexOf("W") >= 0) {';
                        script += 'runsScored = score.replace("W").split("-")[0].replace("undefined", "");';
                        script += 'runsReceived = score.replace("W").split("-")[1].replace("undefined", "");';
                        script += 'isWin = "Win";';
                        script += 'scoreDiff = runsScored - runsReceived;';
                    script += '} else if (score.indexOf("L") >= 0) {';
                        script += 'runsScored = score.replace("L").split("-")[1].replace("undefined", "");';
                        script += 'runsReceived = score.replace("L").split("-")[0].replace("undefined", "");';
                        script += 'isWin = "Lost";';
                        script += 'scoreDiff = runsReceived - runsScored;';
                    script += '}}';
                    script += 'record[columns[id]] = val.innerText;';
                    script += 'record.RUNSSCORED = runsScored;';
                    script += 'record.RUNSRECEIVED = runsReceived;';
                    script += 'record.ISWIN = isWin;';

                script += '} else {';
                    script += 'record[columns[id]] = val.innerText;';
                script += '}';
            script += '} else {';
                script += 'break;';
            script += '}';
        script += '}';
    script += '}';
script += 'if (record.ISWIN) {';
    script += 'schedules.push(record);';

script += '}';
script += '}';

script += 'return JSON.stringify(schedules);';


            return script;
}

async function JSGetDataFromBet365()
{
    var dayWithGames = document.getElementsByClassName("gl-MarketGroup_Wrapper src-MarketGroup_Container");
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