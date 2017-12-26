// 'use strict';

// const Alexa = require('alexa-sdk');

// const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

// var states = {
//     GUESSMODE: '_GUESSMODE', // User is trying to guess the number.
//     STARTMODE: '_STARTMODE'  // Prompt the user to start or restart the game.
// };

// var FACTS = [
//     'A year on Mercury is just 89 days long.',
// ];
// var SKILL_NAME = 'Space Facts';
// var GET_FACT_MESSAGE = "Here's your fact: ";
// var HELP_MESSAGE = 'You can say tell me a space fact, or, you can say exit... What can I help you with?';
// var HELP_REPROMPT = 'What can I help you with?';
// var STOP_MESSAGE = 'Goodbye!';

// const handlers = {
//     'LaunchRequest': function () {
//         if(Object.keys(this.attributes).length === 0) { // Check if it's the first time the skill has been invoked
//             this.attributes['endedSessionCount'] = 0;
//             this.attributes['gamesPlayed'] = 0;
//         }
//         this.handler.state = states.STARTMODE;
//         this.emit(':ask', 'Welcome to High Low guessing game. You have played '
//             + this.attributes['gamesPlayed'].toString() + ' times. Would you like to play?',
//             'Say yes to start the game or no to quit.');
//     },
//     'StartGame': function () {
//         if(Object.keys(this.attributes).length === 0) { // Check if it's the first time the skill has been invoked
//             this.attributes['endedSessionCount'] = 0;
//             this.attributes['gamesPlayed'] = 0;
//         }
//         this.handler.state = states.STARTMODE;
//         this.emit(':ask', 'Welcome to High Lowest guessing game. You have played '
//             + this.attributes['gamesPlayed'].toString() + ' times. Would you like to play?',
//             'Say yes to start the game or no to quit.');
//     },
//     'GetNewFactIntent': function () {
//         this.emit('GetFact');
//     },
//     'GetFact': function () {
//         // Get a random space fact from the space facts list
//         // Use this.t() to get corresponding language data
//         const factArr = FACTS;
//         const factIndex = Math.floor(Math.random() * factArr.length);
//         const randomFact = factArr[factIndex];

//         // Create speech output
//         const speechOutput = GET_FACT_MESSAGE + randomFact;
//         this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact);
//     },
//     'AMAZON.HelpIntent': function () {
//         var message = 'I will think of a number between zero and one hundred, try to guess and I will tell you if it' +
//             ' is higher or lower. Do you want to start the game?';
//         this.emit(':ask', message, message);
//     },
//     'AMAZON.CancelIntent': function () {
//         this.emit(':tell', STOP_MESSAGE);
//     },
//     'AMAZON.StopIntent': function () {
//         this.emit(':tell', STOP_MESSAGE);
//     },

//     'AMAZON.YesIntent': function() {
//         var message = 'Say yes to continue, or no to end the game.';
//         this.emit(':ask', message, message);
//     },

//     'Unhandled': function() {
//         var message = 'Say yes to continue, or no to end the game.';
//         this.emit(':ask', message, message);
//     }
// };

// // var guessModeHandlers = Alexa.CreateStateHandler(states.GUESSMODE, {

// //     'NewSession': function () {
// //         this.handler.state = '';
// //         this.emitWithState('NewSession'); // Equivalent to the Start Mode NewSession handler
// //     },

// //     'NumberGuessIntent': function() {
// //         var guessNum = parseInt(this.event.request.intent.slots.number.value);
// //         var targetNum = this.attributes['guessNumber'];

// //         console.log('user guessed: ' + guessNum);

// //         if(guessNum > targetNum){
// //             this.emit('TooHigh', guessNum);
// //         } else if( guessNum < targetNum){
// //             this.emit('TooLow', guessNum);
// //         } else if (guessNum === targetNum){
// //             // With a callback, use the arrow function to preserve the correct 'this' context
// //             this.emit('JustRight', () => {
// //                 this.emit(':ask', guessNum.toString() + 'is correct! Would you like to play a new game?',
// //                 'Say yes to start a new game, or no to end the game.');
// //             });
// //         } else {
// //             this.emit('NotANum');
// //         }
// //     },

// //     'AMAZON.HelpIntent': function() {
// //         this.emit(':ask', 'I am thinking of a number between zero and one hundred, try to guess and I will tell you' +
// //             ' if it is higher or lower.', 'Try saying a number.');
// //     },

// //     'SessionEndedRequest': function () {
// //         console.log('session ended!');
// //         this.attributes['endedSessionCount'] += 1;
// //         this.emit(':saveState', true); // Be sure to call :saveState to persist your session attributes in DynamoDB
// //     },

// //     'Unhandled': function() {
// //         this.emit(':ask', 'Sorry, I didn\'t get that. Try saying a number.', 'Try saying a number.');
// //     }

// // });

// var startGameHandlers = Alexa.CreateStateHandler(states.STARTMODE, {

//     'NewSession': function () {
//         this.emit('LaunchRequest'); // Uses the handler in handlers
//     },

//     'AMAZON.HelpIntent': function() {
//         this.emit('HelpIntent');
//     },
    
//     'AMAZON.RecipeIntent': function(){
//         this.attributes['guessNumber'] = Math.floor(Math.random() * 100);
//         this.handler.state = states.GUESSMODE;
//         this.emit(':ask', 'Great! ' + 'Try saying a number to start the game.', 'Try saying a number.');
//     },

//     'AMAZON.YesIntent': function() {
//         this.attributes['guessNumber'] = Math.floor(Math.random() * 100);
//         this.handler.state = states.GUESSMODE;
//         this.emit(':ask', 'Great! ' + 'Try saying a number to start the game.', 'Try saying a number.');
//     },

//     'AMAZON.NoIntent': function() {
//         this.emit(':tell', 'Ok, see you next time!');
//     },

//     'SessionEndedRequest': function () {
//         this.attributes['endedSessionCount'] += 1;
//         this.emit(':saveState', true);
//     },

//     'Unhandled': function() {
//         var message = 'Say yes to continue, or no to end the game.';
//         this.emit(':ask', message, message);
//     }
// });

// exports.handler = function (event, context) {
//     const alexa = Alexa.handler(event, context);
//     alexa.APP_ID = APP_ID;
//     // To enable string internationalization (i18n) features, set a resources object.
//     alexa.registerHandlers(handlers, startGameHandlers);
//     alexa.execute();
// };

