const Alexa = require('alexa-sdk');
const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

/*
	generic, placeholder dialogue options
*/
const WELCOME_DIALOGUE = "Welcome to Hidden Dungeon, where only the brave survive. Let the adventure begin! ";
const LOCATION_DESCRIPTION = [
	"You stand at the entrance of a darkened castle. Above you, the castle seems almost welcoming, if intimidating, compared to the serpentine path that winds below it. This is your lot as a hero. You follow the path as it winds through branches and thorns until you can no longer see the castle through the thick underbrush. Before you is a heavy wooden door with a large ring for a handle. Would you like to enter? "
]
const START_REMINDER = "Would you like to start this game? ";

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

const LEGENDARY_DESCRIPTION = [
	'Pawing gently towards you is a terrifying beast. It is has the head of a man in an ornate head dress, with the body of a lion. It is the mighty sphynx. ',
	'A Deva looks at you. It is a Deva. ',
	'The entire room is wrapped with thick scaley vines as black as night. It is impossible to tell where the body of the snake ends, but it begins at the head which rises before you, as the powerful Basilisk smells dinner. ',
	'A Lich looks at you. It is a Lich. ',
	'A Naga looks at you. It is a Naga. ',
	'A Pixiu looks at you. It is a Pixiu. '
];

const RIDDLE_CORRECT_REACTION = [
	'The Sphynx bares his teeth. You are correct, you may pass. ',
	'The Deva tells you you are correct and may pass. ',
	'The Basilisk hisses violently and pulls his head back. You are correct, you may pass. ',
	'The Lich tells you you are correct and may pass. ',
	'The Naga tells you you are correct and may pass. ',
	'The Pixiu tells you you are correct and may pass. '
];

const RIDDLE_INCORRECT_REACTION = [
	'The Sphynx bares his teeth. Dinner time. ',
	'The Deva bares its teeth. Dinner time. ',
	'The Basilisk bares his teeth. Dinner time. ',
	'The Lich bares his teeth. Dinner time. ',
	'The Naga bares his teeth. Dinner time. ',
	'The Pixiu bares his teeth. Dinner time. '
]

const RIDDLE_START = "The beast asks you a simple question. "

const riddles = [
	'What is the creature that walks on four legs in the morning, two legs at noon and three in the evening?'
]

const RIDDLE_ANSWERS = [
	['man', 'human', 'person', 'woman', 'people']
]

function getRiddle(){
	var riddle = Math.floor(Math.random() * (riddles.length - 1));
	if(riddle == 0){ return [0, 0]; }
	var legendary = Math.floor(Math.random() * (legendary.length - 1));
	return [riddle, legendary];
}

const handlers = {

	'NewSession': function () {
		this.attributes['location'] = Math.random() * (LOCATION_DESCRIPTION.length - 1);
		this.handler.state = states.RIDDLEMODE;
		this.emit(':ask', WELCOME_DIALOGUE + LOCATION_DESCRIPTION[this.attributes['location']], START_REMINDER);
	},
	
}

const riddleModeHandlers = Alexa.CreateStateHandler(states.RIDDLEMODE, {

	'AMAZON.YesIntent': function() {
		this.attributes['riddleInfo'] = getRiddle();
		this.emit(':ask', LEGENDARY_DESCRIPTION[this.attributes['riddleInfo'][1]] + RIDDLE_START + riddles[this.attributes['riddleInfo'][0]], riddles[this.attributes['riddleInfo'][0]]);
	},

	'AMAZON.NoIntent': function() {
		this.emit(':tell', "Return when you are ready to be a hero. ");
	},

	'AnswerIntent': function() {
		
	}

});

exports.handler = function(event, context, callback) {
	const alexa = Alexa.handler(event, context, callback);
	alexa.APP_ID = APP_ID; // APP_ID is your skill id which can be found in the Amazon developer console where you create the skill.
	alexa.registerHandlers(handlers, riddleModeHandlers);
	alexa.execute();
};