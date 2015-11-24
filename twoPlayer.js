window.onload = function (){

  $.ajax({
    url: '/js/data.json',
    json: "callback",
    dataType: "json"
  }).done(function main(data) {

    // get all question data
    var questBank = data;

    // start score with 0 from game initiation
    var score = 0;
    // start game with 3 lives
    var lives = 3;

    // function to update score text to current score
    function updateScore(){
      $('#score').html(score);
    }
    updateScore();

    // function to update lives text after wrong answers
    function updateLives(){
      $('#life').html(lives);
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
      $(this).append($goodAns);
      $('.optB').css({backgroundColor: "#113856"});
      $(this).append($goodAns);


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

      // on click of zone check if year is smaller
      $('.optA').click(function(event){
        if (questionData[0].Date < questionData[1].Date){
          score++;
          updateScore();
          // save the question data for return later
          correctAnswered.push(questionData[0]);
          // delete question from bank for next round
          questArray.splice(questArray.indexOf(questionIDs[0]), 1);
          // display success visuals and message
          $(this).css({backgroundColor: "rgb(105, 143, 90)"});
          $(this).append($goodAns);
          prepNext();
        } else {
          lives--;
          updateLives();
          // save the question data for return later
          wrongAnswered.push(questionData[0]);
          // display failure visuals and message
          $(this).css({backgroundColor: "rgb(176, 73, 67)"});
          $(this).append($badAns);
          prepNext();
          // reset vars and show start over button - refreshes page.
        }

      });
      // on click of zone check if year is smaller
      $('.optB').click(function(event){
        if (questionData[1].Date < questionData[0].Date){
          score++;
          updateScore();
          // save the question data for return later
          correctAnswered.push(questionData[1]);
          // delete question from bank for next round
          questArray.splice(questArray.indexOf(questionIDs[1]), 1);
          // display success visuals and message
          $(this).css({backgroundColor: "rgb(105, 143, 90)"});
          $(this).append($goodAns);
          prepNext();
        } else {
          lives--;
          updateLives();
          // save the question data for return later
          wrongAnswered.push(questionData[1]);
          // display failure visuals and message
          $(this).css({backgroundColor: "rgb(176, 73, 67)"});
          $(this).append($badAns);
          prepNext();
          // reset vars and show start over button - refreshes page.
          }

      });
      // after question is answered prep next question or lose
      function prepNext (){
        if (lives === 0){
          console.log('you lose');
        } else {
          $('.optA').off('click');
          $('.optB').off('click');
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
