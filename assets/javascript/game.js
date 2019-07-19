var wins = 0;
var losses = 0;
var totalScore = 0;
var target;

function start() {
    target = Math.floor(Math.random() * 102 + 19);
    var targetUpdate = $('#targetScorer').text(target);
    totalScore = 0;
    var myScore = $('#myScore').text(totalScore);
    var gemSpawn = [];
    while (gemSpawn.length < 3) {
        //purposely forced 1 value out because it trivializes the game
        //2 is removed at this point, but can generate later
        var antiDupe = Math.ceil(Math.random() * 10 + 2);
        if (gemSpawn.includes(antiDupe)) {
            antiDupe = Math.ceil(Math.random() * 10 + 2);
        } else {
            gemSpawn.push(antiDupe);
        }
        $('#emeraldValue').text("??");
        $('#rubyValue').text("??");
        $('#diamondValue').text("??");
        $('#sapphireValue').text("??");

    }
    //console.log(gemSpawn);

    //0 1 2 01 02 12 mod outcome pairings for creating winning gem combinations

    var antiArray = [target % gemSpawn[0], target % gemSpawn[1],
    target % gemSpawn[2], (target % gemSpawn[0]) % gemSpawn[1],
    (target % gemSpawn[0]) % gemSpawn[2], (target % gemSpawn[1]) % gemSpawn[2]]
    //console.log(antiArray);

    var lastGem = Math.floor(Math.random() * 6);

    //console.log(antiArray[lastGem]);
    //no remainder, fresh value
    if (antiArray[lastGem] > 12) {
        lastGem = Math.floor(Math.random() * 6);
        while (antiArray[lastGem] > 12) {
            lastGem = Math.floor(Math.random() * 6);
        }
        gemSpawn.push(antiArray[lastGem]);

    } else if (antiArray[lastGem] == 0) {
        var gem = Math.ceil(Math.random() * 11 + 1);
        while (gemSpawn.includes(gem)) {
            gem = Math.ceil(Math.random() * 11 + 1);
        }
        gemSpawn.push(gem);
    }
    //get rid of trivial 1 values
    else if (antiArray[lastGem] == 1) {
        target--;
        targetUpdate = $('#targetScorer').text(target);
        gem = Math.ceil(Math.random() * 11 + 1);
        while (gemSpawn.includes(gem)) {
            gem = Math.ceil(Math.random() * 11 + 1);
        }
        gemSpawn.push(gem);

    } else {
        gemSpawn.push(antiArray[lastGem]);
    }


    //console.log(gemSpawn);
    for (var i = 0; i < 4; i++) {
        var gemValue = $('img').eq(i).attr('hiddenv', gemSpawn[i]);
        var displayGemValue = $('img').eq(i).attr('hiddenValue', true);

    }


    var displayValue;
}
var z = 0;
//emerald
$('#emerald').on('click', function () {
    var emeralds = $(this).attr("hiddenv");
    var emeraldUpdate = $('#emeraldValue').text(emeralds);
    $('#emeraldValue').show();
})
//ruby
$('#ruby').on('click', function () {
    var rubies = $(this).attr("hiddenv");
    var rubyUpdate = $('#rubyValue').text(rubies);
})
//diamond
$('#diamond').on('click', function () {
    var diamonds = $(this).attr("hiddenv");
    var diamondUpdate = $('#diamondValue').text(diamonds);
})
//sapphire
$('#sapphire').on('click', function () {
    var sapphires = $(this).attr("hiddenv");
    var sapphireUpdate = $('#sapphireValue').text(sapphires);
})

$('#gems').on('click', 'img', function () {

   // console.log($(this).attr("hiddenv"));



    // displayValue = $(this).attr("hiddenValue");
    // if (displayValue == true){
    //     displayValue = false;
    // }
   // console.log($(this).attr("hiddenValue"));
    //  var gemValue = Math.ceil(Math.random() * 12);

    /*win debugger
    var gemValue=target;
    */
    // console.log(gemValue);
    var gemValue = $(this).attr("hiddenv");
    totalScore += parseInt(gemValue);
    myScore = $('#myScore').text(totalScore);
    //loss
    if (totalScore > target) {
        console.log("you lose");
        losses++;
        var lossesUpdate = $('#Losses').text(losses);
        start();
        //win
    } else if (totalScore == target) {
        console.log("you win");
        wins++;
        var winsUpdate = $('#Wins').text(wins);
        start();
    }
    var hiddenValues = $(this)

})
start();