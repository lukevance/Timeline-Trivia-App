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

  // on click PLAY initiate gameplay ----------------- BEGIN GAME-----------
  playBtn.click(function start(event){

      // turn off play button till question is answered
      playBtn.off('click');
      // disable playbtn hover while question is being answered.


      // activate hover and pointer for answers
      $('.optA').hover(function(){
        $(this).css({opacity: '1', cursor: 'pointer'});
      }, function(){
        $(this).css({opacity: '0.7'});
      });
      $('.optB').hover(function(){
        $(this).css({opacity: '1', cursor: 'pointer'});
      }, function(){
        $(this).css({opacity: '0.7'});
      });

      // reset colors of answers and result message
      $('.optA').css({backgroundColor: "#9FBACE"});
      // $(this).append($goodAns);
      $('.optB').css({backgroundColor: "#113856"});
      // $(this).append($goodAns);


      // get correct amount of random questions
      var questionIDs = randomGenerator(questArray, 2);
      console.log(questionIDs);
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
      console.log(questionData[0]);
      $('.optB').html(questionData[1].Event);
      console.log(questionData[1]);

      // create messages to be displayed
      var $goodAns = $( "<p class='message'>Nice Job!</p>" );
      $goodAns.css({fontSize: '32pt', marginTop: '1.5em'});
      var $badAns = $( "<p class='message'>Nope. Not even close.</p>" );
      $badAns.css({fontSize: '28pt', marginTop: '2.5em'});



      // check for key presses and return player choice functions
      $(document).keydown(function(e) {
        if (e.which === 191) {
          // / pressed
          console.log('you pressed /');
          plyTwoZoneB();
        } else if(e.which === 190) {
          // . pressed
          console.log('you pressed .');
          plyTwoZoneA();
        } else if(e.which === 90) {
          // z pressed
          console.log('you pressed z');
          plyOneZoneA();
        } else if(e.which === 88) {
          // x pressed
          console.log('you pressed x');
          plyOneZoneB();
        }
      });

      // on z-press check zoneA if year is smaller
      function plyOneZoneA(event){
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
          prepNext();
        } else {
          playerOneLives--;
          updateLives();
          // save the question data for return later
          wrongAnswered.push(questionData[0]);
          // display failure visuals and message
          $('.optA').css({backgroundColor: "rgb(176, 73, 67)"});
          $('.optA').append($badAns);
          prepNext();
          // reset vars and show start over button - refreshes page.
        }
      }

      // on x-press check zoneB if year is smaller
      function plyOneZoneB (event){
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
          prepNext();
        } else {
          playerOneLives--;
          updateLives();
          // save the question data for return later
          wrongAnswered.push(questionData[1]);
          // display failure visuals and message
          $('.optB').css({backgroundColor: "rgb(176, 73, 67)"});
          $('.optB').append($badAns);
          prepNext();
          // reset vars and show start over button - refreshes page.
          }
      }

      // on .-press check zoneA if year is smaller
      function plyTwoZoneA (event){
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
          prepNext();
        } else {
          playerTwoLives--;
          updateLives();
          // save the question data for return later
          wrongAnswered.push(questionData[0]);
          // display failure visuals and message
          $('.optA').css({backgroundColor: "rgb(176, 73, 67)"});
          $('.optA').append($badAns);
          prepNext();
          // reset vars and show start over button - refreshes page.
        }
      }

      // on /-press check zoneB if year is smaller
      function plyTwoZoneB (event){
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
          prepNext();
        } else {
          playerTwoLives--;
          updateLives();
          // save the question data for return later
          wrongAnswered.push(questionData[1]);
          // display failure visuals and message
          $('.optB').css({backgroundColor: "rgb(176, 73, 67)"});
          $('.optB').append($badAns);
          prepNext();
          // reset vars and show start over button - refreshes page.
          }
      }

      // after question is answered prep next question or lose
      function prepNext (){
        // check if either player has lost
        if (playerOneLives === 0){
          console.log('Player One, you lose');
        } else if (playerTwoLives === 0){
          console.log('Player Two, you lose');
        // check if either player has won
        } else if (playerOneScore === win) {
          console.log('Player One, you win!');
        } else if (playerTwoScore === win) {
          console.log('Player Two, you win!');
        } else {
          $(document).off('keydown');
          $('.optA').off('mouseenter mouseleave');
          $('.optB').off('mouseenter mouseleave');
          $('.optA').css({cursor: 'default', opacity: '1'});
          $('.optB').css({cursor: 'default', opacity: '1'});
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

    });
  });
};
