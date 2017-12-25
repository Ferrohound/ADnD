/*
	generic, placeholder dialogue options
*/

const Alexa = require('alexa-sdk');
const states = {
	STARTMODE  : '_STARTMODE',
	RIDDLEMODE : '_RIDDLEMODE',
	PUZZLEMODE : '_PUZZLEMODE',
	FIGHTMODE  : '_FIGHTMODE'
}

const creatures = [
	'Imp',
	'Silver dragon',
	'Giant rat',
	'Goblin',
	'Slime',
	'Land Shark',
	'Bullywug',
	'Pit Fiend',
	'Doppelganger',
	'Elementals',
	'Gargoyle',
	'Dao',
	'Hellhound'
];

const helpful = [
	'Spirits',
	'Griffon',
	'Half-dragon',
	'Crow',
	'Raven'
];

const legendary = [
	'Sphynx',
	'Deva',
	'Basilisk',
	'Lich',
	'Naga',
	'Pixiu',
];

const riddles = [
	'What is the creature that walks on four legs in the morning, two legs at noon and three in the evening?'
]

function getRiddle(){
	var riddle = Math.floor(Math.random() * (riddles.length - 1));
	if(riddle == 1){ return [1, 1]; }
	var legendary = Math.floor(Math.random() * (legendary.length - 1));
	return [riddle, legendary];
}

const handlers = {
	
}

const guessModeHandlers = Alexa.CreateStateHandler(states.GUESSMODE, {

'NewSession': function () {
    this.handler.state = '';
    this.emitWithState('NewSession'); // Equivalent to the Start Mode NewSession handler
},

'NumberGuessIntent': function() {
    const guessNum = parseInt(this.event.request.intent.slots.number.value);
    const targetNum = this.attributes['guessNumber'];

    console.log('user guessed: ' + guessNum);

    if(guessNum > targetNum){
        this.emit('TooHigh', guessNum);
    } else if( guessNum < targetNum){
        this.emit('TooLow', guessNum);
    } else if (guessNum === targetNum){
        // With a callback, use the arrow function to preserve the correct 'this' context
        this.emit('JustRight', () => {
            this.response.speak(guessNum.toString() + 'is correct! Would you like to play a new game?')
                        .listen('Say yes to start a new game, or no to end the game.');
            this.emit(':responseReady');
        });
    } else {
        this.emit('NotANum');
    }
},

'AMAZON.HelpIntent': function() {
    this.response.speak('I am thinking of a number between zero and one hundred, try to guess and I will tell you' +
    ' if it is higher or lower.')
                .listen('Try saying a number.');
    this.emit(':responseReady');
},

'SessionEndedRequest': function () {
    console.log('session ended!');
    this.attributes['endedSessionCount'] += 1;
    this.emit(':saveState', true); // Be sure to call :saveState to persist your session attributes in DynamoDB
},

'Unhandled': function() {
    this.response.spean('Sorry, I didn\'t get that. Try saying a number.')
                .listen('Try saying a number.');
    this.emit(':responseReady');
}
});

exports.handler = function(event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.appId = 'APP_ID'; // APP_ID is your skill id which can be found in the Amazon developer console where you create the skill.
    alexa.registerHandlers(handlers, );
    alexa.execute();
};