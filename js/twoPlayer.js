window.onload = function (){

  $.ajax({
    url: '/js/data.json',
    json: "callback",
    dataType: "json"
  }).done(function main(data) {

    // get all question data
    var questBank = data;

    // start score with 0 from game initiation
    var playerOneScore = 0;
    // start game with 3 lives
    var playerOneLives = 3;
    // start score with 0 from game initiation
    var playerTwoScore = 0;
    // start game with 3 lives
    var playerTwoLives = 3;

    // function to update score text to current scores
    function updateScore(){
      $('#playerOneScore').html(playerOneScore);
      $('#playerTwoScore').html(playerTwoScore);
    }
    updateScore();

    // function to update lives text after wrong answers
    function updateLives(){
      $('#playerOneLife').html(playerOneLives);
      $('#playerTwoLife').html(playerTwoLives);
    }
    updateLives();


  // function to generate numbers for questions, to be called on play click
  function randomGenerator(array, numToReturn){
    var bank = array;
    // return random numbers for requested amount
    var count = 0;
    var results = [];

    while (count < numToReturn) {
      // set max equal to last position of array entered
      var max = (bank.length -1);
      var rando = (Math.random() * (max - 0)).toFixed();
      // add first num from bank to results
      results.push(bank[rando]);
      // remove that option from bank
      bank.splice(bank.indexOf(bank[rando]), 1);
      count++;
      }
    return results;
    // returns specified number of random elements from array without duplicates
  }

  // store all correct answers
  var correctAnswered = [];
  // store all incorrect answers
  var wrongAnswered = [];
  // get num of available questions and 'IDs' of those questions
  var questArray = Object.keys(questBank);


  // var zone1 = $('.optA').html();
  var playBtn = $('#play');

  // set initial time for timer
  var timeLeft = 10;
  // set timer to initial time
  $('#time').html(timeLeft);

  // set goal score to play to
  var win = 5;

  // on click PLAY initiate gameplay ----------------- BEGIN GAME-----------
  playBtn.click(function start(event){

    // timer function countdown from input time
    function timer(arg){
      var nIntervId;
      var count = arg;

        function changeText() {
          nIntervId = setInterval(updateText, 1000);
        }

        function updateText() {
          if (count > -1) {
            $('#time').html(count);
            count--;
          } else {
            stopTimer();
            outOfTime();
          }
        }

        function stopTimer() {
          clearInterval(nIntervId);
        }
        // changeText();

        return {
          startTimer:changeText,
          stopTimer:stopTimer
        };
     }

     // create message for out of time
     var $noTime = $( "<p class='noTimemsg'>Sorry, out of time.</p>" );
     $noTime.css({fontSize: '28pt'});

     // if timer runs out, run this function
     function outOfTime(){
       playerOneLives--;
       playerTwoLives--;
       updateLives();
       // save the question data for return later
       wrongAnswered.push(questionData[0]);
       wrongAnswered.push(questionData[1]);
       // display failure visuals and message
       if (questionData[0].Date < questionData[1].Date){
         $('.optA').css({backgroundColor: "rgb(105, 143, 90)"});
         $('.optB').css({backgroundColor: "rgb(176, 73, 67)"});
       } else {
         $('.optA').css({backgroundColor: "rgb(176, 73, 67)"});
         $('.optB').css({backgroundColor: "rgb(105, 143, 90)"});
       }
       $('.timeAlert').css({display: 'block'});
       $('.timeAlert').append($noTime);
       prepNext();
     }

      // creates timer object which with start and stop elements
      var myTimer = timer(timeLeft);
      // calls functions within timer object
      myTimer.startTimer();

      // turn off play button till question is answered
      playBtn.off('click');
      // disable playbtn hover while question is being answered.


      // activate full color answers
      $('.optA').css({opacity: '1'});
      $('.optB').css({opacity: '1'});


      // reset colors of answers and result message
      $('.optA').css({backgroundColor: "#9FBACE"});
      $('.optB').css({backgroundColor: "#113856"});
      $('.timeAlert').css({display: 'none'});
      $('.noTimemsg').remove();
      // reset player score/life colors
      $('.scoreKeeper1').css({backgroundColor: "transparent"});
      $('.scoreKeeper2').css({backgroundColor: "transparent"});
      $('.lives1').css({backgroundColor: "transparent"});
      $('.lives2').css({backgroundColor: "transparent"});


      // get correct amount of random questions
      var questionIDs = randomGenerator(questArray, 2);
      // console.log(questionIDs);
      // create storage for current question Data
      var questionData = [];
      // get question info from random questions
      for (var j = 0; j < questionIDs.length; j++){
        questionData.push(questBank[questionIDs[j]]);
      }
      // store curret question IDs for removal if answer is correct
      // var questIdOne =

      // fill zones with event data from question data
      $('.optA').html(questionData[0].Event);
      // console.log(questionData[0]);
      $('.optB').html(questionData[1].Event);
      // console.log(questionData[1]);

      // create messages to be displayed
      var $goodAns = $( "<p class='message'>Nice Job!</p>" );
      $goodAns.css({fontSize: '28pt', marginTop: '1.5em'});
      var $badAns = $( "<p class='message'>Nope. Not even close.</p>" );
      $badAns.css({fontSize: '24pt', marginTop: '2.5em'});



      // check for key presses and return player choice functions
      $(document).keydown(function(e) {
        if (e.which === 191) {
          // / pressed
          // console.log('you pressed /');
          plyTwoZoneB();
        } else if(e.which === 190) {
          // . pressed
          // console.log('you pressed .');
          plyTwoZoneA();
        } else if(e.which === 90) {
          // z pressed
          // console.log('you pressed z');
          plyOneZoneA();
        } else if(e.which === 88) {
          // x pressed
          // console.log('you pressed x');
          plyOneZoneB();
        }
      });

      // on z-press check zoneA if year is smaller
      function plyOneZoneA(event){
        myTimer.stopTimer();
        if (questionData[0].Date < questionData[1].Date){
          playerOneScore++;
          updateScore();
          // save the question data for return later
          correctAnswered.push(questionData[0]);
          // delete question from bank for next round
          questArray.splice(questArray.indexOf(questionIDs[0]), 1);
          // display success visuals and message
          $('.optA').css({backgroundColor: "rgb(105, 143, 90)"});
          $('.optA').append($goodAns);
          $('.scoreKeeper1').css({backgroundColor: "rgb(105, 143, 90)", borderRadius: "10px"});
          prepNext();
        } else {
          playerOneLives--;
          updateLives();
          // save the question data for return later
          wrongAnswered.push(questionData[0]);
          // display failure visuals and message
          $('.optA').css({backgroundColor: "rgb(176, 73, 67)"});
          $('.optA').append($badAns);
          $('.lives1').css({backgroundColor: "rgb(176, 73, 67)", borderRadius: "10px"});
          prepNext();
          // reset vars and show start over button - refreshes page.
        }
      }

      // on x-press check zoneB if year is smaller
      function plyOneZoneB (event){
        myTimer.stopTimer();
        if (questionData[1].Date < questionData[0].Date){
          playerOneScore++;
          updateScore();
          // save the question data for return later
          correctAnswered.push(questionData[1]);
          // delete question from bank for next round
          questArray.splice(questArray.indexOf(questionIDs[1]), 1);
          // display success visuals and message
          $('.optB').css({backgroundColor: "rgb(105, 143, 90)"});
          $('.optB').append($goodAns);
          $('.scoreKeeper1').css({backgroundColor: "rgb(105, 143, 90)", borderRadius: "10px"});
          prepNext();
        } else {
          playerOneLives--;
          updateLives();
          // save the question data for return later
          wrongAnswered.push(questionData[1]);
          // display failure visuals and message
          $('.optB').css({backgroundColor: "rgb(176, 73, 67)"});
          $('.optB').append($badAns);
          $('.lives1').css({backgroundColor: "rgb(176, 73, 67)", borderRadius: "10px"});
          prepNext();
          // reset vars and show start over button - refreshes page.
          }
      }

      // on .-press check zoneA if year is smaller
      function plyTwoZoneA (event){
        myTimer.stopTimer();
        if (questionData[0].Date < questionData[1].Date){
          playerTwoScore++;
          updateScore();
          // save the question data for return later
          correctAnswered.push(questionData[0]);
          // delete question from bank for next round
          questArray.splice(questArray.indexOf(questionIDs[0]), 1);
          // display success visuals and message
          $('.optA').css({backgroundColor: "rgb(105, 143, 90)"});
          $('.optA').append($goodAns);
          $('.scoreKeeper2').css({backgroundColor: "rgb(105, 143, 90)", borderRadius: "10px"});
          prepNext();
        } else {
          playerTwoLives--;
          updateLives();
          // save the question data for return later
          wrongAnswered.push(questionData[0]);
          // display failure visuals and message
          $('.optA').css({backgroundColor: "rgb(176, 73, 67)"});
          $('.optA').append($badAns);
          $('.lives2').css({backgroundColor: "rgb(176, 73, 67)", borderRadius: "10px"});
          prepNext();
          // reset vars and show start over button - refreshes page.
        }
      }

      // on /-press check zoneB if year is smaller
      function plyTwoZoneB (event){
        myTimer.stopTimer();
        if (questionData[1].Date < questionData[0].Date){
          playerTwoScore++;
          updateScore();
          // save the question data for return later
          correctAnswered.push(questionData[1]);
          // delete question from bank for next round
          questArray.splice(questArray.indexOf(questionIDs[1]), 1);
          // display success visuals and message
          $('.optB').css({backgroundColor: "rgb(105, 143, 90)"});
          $('.optB').append($goodAns);
          $('.scoreKeeper2').css({backgroundColor: "rgb(105, 143, 90)", borderRadius: "10px"});
          prepNext();
        } else {
          playerTwoLives--;
          updateLives();
          // save the question data for return later
          wrongAnswered.push(questionData[1]);
          // display failure visuals and message
          $('.optB').css({backgroundColor: "rgb(176, 73, 67)"});
          $('.optB').append($badAns);
          $('.lives2').css({backgroundColor: "rgb(176, 73, 67)", borderRadius: "10px"});
          prepNext();
          // reset vars and show start over button - refreshes page.
          }
      }

      // after question is answered prep next question or lose
      function prepNext (){
        // set global variables
        var winner;
        var finalScore;
        var notes;
        // check if either player has lost
        if (playerOneLives === 0){
          console.log('Player One, you lose');
          winner = 'Player Two';
          finalScore = playerTwoScore + ' - ' + playerOneScore;
          notes = ' By not being wrong all the time.';
          gameOver(winner, finalScore, notes);

        } else if (playerTwoLives === 0){
          console.log('Player Two, you lose');
          winner = 'Player One';
          finalScore = playerOneScore + ' - ' + playerTwoScore;
          notes = ' By not being wrong all the time.';
          gameOver(winner, finalScore, notes);

        // check if either player has won
        } else if (playerOneScore === win) {
          console.log('Player One, you win!');
          winner = 'Player One';
          finalScore = playerOneScore + ' - ' + playerTwoScore;
          notes = '';
          gameOver(winner, finalScore, notes);
        } else if (playerTwoScore === win) {
          console.log('Player Two, you win!');
          winner = 'Player Two';
          notes = '';
          finalScore = playerTwoScore + ' - ' + playerOneScore;
          gameOver(winner, finalScore, notes);
          // if game is not over, setup next question
        } else {
          $(document).off('keydown');
          $('#play').html('<h2>NEXT</h2>');
          $('#play').animate({
            borderWidth: '15px'
          }, 100);
          $('#play').animate({
            borderWidth: '2px'
          }, 500);
          playBtn.click(start);
        }
      }

      // define function for gameover screen
      function gameOver(winner, score, note) {
        $('#gameOverMessage').html(winner + ' wins!' + note);
        $('#finalScoreMessage').html(score);
        $('#play').html('<h2>NEW GAME</h2>');
        $('.gamePlay').css({display: 'none'});
        $('.postGame').css({display: 'block'});

        $('#play').animate({
          borderWidth: '15px'
        }, 100);
        $('#play').animate({
          borderWidth: '2px'
        }, 500);
        playBtn.click(function (){
          location.reload();
        });
      }

    });
  });

};
