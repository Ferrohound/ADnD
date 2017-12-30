//===============================================================================
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
  
/*
enemies for the battle rooms
*/
//maybe actor base class

//have player and enemy stats that play into this
function Attack(A, D, Alexa)
{
	var HR = A.skill * 2 + A.luck/2;
	var Evade = A.agility * 2 + A.luck;
	
	var Accuracy = HR - Evade;
	
	//check for hit
	var hit = getRandomArbitrary(0, 1);
	
	//miss
	if(hit > Accuracy)
	{
		Alexa.emit(':tell', "Critical hit!");
		return;
	}
	
	//calculate damage
	var Attk = A.wisdom + A.skill/2;
	var DP = D.wisdom;
	
	var dmg = Attk - DP;
	
	var CriticalHit = A.skill/2;
	var CriticalEvade = D.luck;
	
	var Critical = CriticalHit - CriticalEvade;
	
	hit = getRandomArbitrary(0, 1);
	if(hit < Critical)
	{
		dmg*=2;
		D.hp-=dmg;
		Alexa.emit(':tell', "Critical hit!");
		
		if(D.hp < 0)
			D.state = -1;
		
		return;
	}
	
	D.hp-=dmg;
	
	if(D.hp < 0)
		D.state = -1;
	
	//damage tiers
	//ineffective
	//regular
	//critical
	if(dmg < (D.MaxHP/100) * 5)
	{
		Alexa.emit(':tell', "Not very effective..");
		return;
	}
	
	else
	{
		Alexa.emit(':tell', A.name + " strikes " D.name + " with all of their might!");
		return;
	}
	
	//fire emblem battle formulae
	/*
	Hit Rate = Weapon Accuracy + Skill x 2 + Luck / 2
            + Support Bonus
			
	Avoid = Attack Speed x 2 + Luck + Terrain Bonus
         + Support Bonus
		 
	Accuracy = Hit Rate (Attacker) - Evade (Defender)
	
	Defense Power
	DP = Terrain Bonus + Defense
      + Support Bonus
	  
	DP = Terrain Bonus + Resistance
      + Support Bonus
	  
	Critical Rate = Weapon Critical + Skill / 2
                 + Support Bonus + Class Critical
				 
	Critical Evade = Luck + Support Bonus
	
	Critical = Critical Rate - Critical Evade
	
	Physical Attack = Strength + (Weapon Might + Weapon Triangle Bonus) X 
		Weapon effectiveness + Support Bonus
		
	Magical Attack = magic + (Magic Might + Trinity of Magic Bonus) X 
		Magic Effectiveness + Support Bonus

	D.hp--;
	if(D.hp < 0)
		D.state = -1;
	
	Alexa.emit(':tell', A.name + " strikes " D.name + " with all of their might!");*/
}

function MagicAttack(A, D, Alexa)
{
	var HR = A.skill * 2 + A.luck/2;
	var Evade = A.agility * 2 + A.luck;
	
	var Accuracy = HR - Evade;
	
	//check for hit
	var hit = getRandomArbitrary(0, 1);
	
	//miss
	if(hit > Accuracy)
	{
		Alexa.emit(':tell', "Missed!");
		return;
	}
	
	//calculate damage
	var Attk = A.strength + A.skill/2;
	var DP = D.defense;
	
	var dmg = Attk - DP;
	
	var CriticalHit = A.skill/2;
	var CriticalEvade = D.luck;
	
	var Critical = CriticalHit - CriticalEvade;
	
	hit = getRandomArbitrary(0, 1);
	if(hit < Critical)
	{
		dmg*=2;
		D.hp-=dmg;
		Alexa.emit(':tell', "Critical hit!");
		
		if(D.hp < 0)
			D.state = -1;
		
		return;
	}
	
	D.hp-=dmg;
	
	if(D.hp < 0)
		D.state = -1;
	
	//damage tiers
	//ineffective
	//regular
	//critical
	if(dmg < (D.MaxHP/100) * 5)
	{
		Alexa.emit(':tell', "Not very effective..");
		return;
	}
	
	else
	{
		Alexa.emit(':tell', A.name + "'s magic ravages " D.name + "!");
		return;
	}
}


//state -1 means defeated
//take in arguments later, ideally pass in an array of descriptions for each state it's in
function Enemy(hp)
{
	this.hp = this.MaxHP = hp;
	this.state = 0;
	this.name = "Spatos";
	
	this.agility = 1;
	this.wisdom = 1;
	this.strength = 1;
	this.defense = 1;
	this.skill = 1;
	this.luck = 1;
	
	//for meditation
	this.growthFactor = 0.5;
};

//have a thing in here that changes the enemy's state based on the player's previous actions
//or hp
Enemy.prototype.Act = function(player, Alexa)
{
	// 0 for regular
	// 1 for magic
	// 2 for special attack - well choreographed
	// 3 unleash special attack! two-turned
	switch(state)
	{
		case 0:
			Attack(this, player, Alexa);
		break;
		
		case 1:
			MagicAttack(this, player, Alexa);
		break;
		
		case 2:
			this.state = 3;
		break;
		
		case 3:
			MagicAttack(this, player, Alexa);
		break;
		
		default:
		break;
	};
};

Enemy.prototype.Description = function()
{
	switch(state)
	{
		case 0:
			return "Monster is very descriptive! It has a colourful vocabulary.";
		break;
		
		default:
			return "Something seems different... Hey! This isn't descriptive at all!";
		break;
	};
}

Enemy.prototype.Status = function()
{
	switch(state)
	{
		case 0:
			if(this.hp > this.MaxHP/100 * 90)
				return this.name + " is full of energy!";
			else if(this.hp > this.MaxHP/100 * 30)
				return this.name + " is full of energy!";
			else
				return this.name + " is struggling to stay conscious..";
		break;
		
		case 2:
			return this.name + " is charging up for a powerful attack!";
		
		case -1:
			return this.name " lays unconscious on the floor.";
		break;
	};
}

//state -1 means defeated
function Player(hp)
{
	this.hp = this.MaxHP = hp;
	this.state = 0;
	
	this.agility = this.originalAgility = 0.1;
	this.wisdom = 0.1;
	this.strength = 0.1;
	this.defense = this.originalDefense = 0.1;
	this.skill = 0.1;
	this.luck = 0.1;
	
	//for meditation
	this.growthFactor = 0.25;
};

Player.prototype.Act = function(flag, Alexa, enemy = null)
{
	//flags
	// 0: attack
	// 1: magic attack
	// 2: defense/evade
	// 3: meditate
	// 4: investigate
	if(this.state == 1)
	{
		this.defense = this.originalDefense;
		this.agility = this.originalAgility;
		this.state = 0;
	}
	
	switch(flag)
	{
		case 0:
			Attack(this, enemy, Alexa);
			this.state = 0;
		break;
		
		case 1:
			MagicAttack(this, enemy, Alexa);
			this.state = 0;
		break;
		
		case 2:
			Alexa.emit(':tell', "You brace for impact!");
			this.defense += getRandomArbitrary(0.1, this.growthFactor);
			this.agility += getRandomArbitrary(0.1, this.growthFactor);
			this.state = 1;
		break;
		
		case 3:
			//boost stats and heal a little bit
			Alexa.emit(':tell', "...-!");
			this.defense += getRandomArbitrary(0.1, this.growthFactor);
			this.agility += getRandomArbitrary(0.1, this.growthFactor);
			this.wisdom += getRandomArbitrary(0.1, this.growthFactor);
			this.strength += getRandomArbitrary(0.1, this.growthFactor);
			this.hp += getRandomArbitrary(0.1, this.growthFactor);
			this.skill += getRandomArbitrary(0.1, this.growthFactor);
			
			//diminishing returns
			this.growthFactor/=2;
			
			this.state = 0;
		break;
		
		case 4:
			Enemy.Description();
			this.state = 0;
		break;
		
	}
}
//===============================================================================

const Alexa = require('alexa-sdk');
const APP_ID = undefined;  //replace with your app ID (OPTIONAL).

/*
	generic, placeholder dialogue options
*/
const WELCOME_DIALOGUE = "Welcome to Hidden Dungeon, where only the brave survive. Let the adventure begin! ";
const LOCATION_DESCRIPTION = [
	"You stand at the entrance of a darkened castle. Above you, the castle seems almost welcoming, if intimidating, compared to the serpentine path that winds below it. This is your lot as a hero. You follow the path as it winds through branches and thorns until you can no longer see the castle through the thick underbrush. Before you is a heavy wooden door with a large ring for a handle. Would you like to enter? "
]
const START_REMINDER = "Would you like to start this game? ";

const states = {
	STARTMODE   : '_STARTMODE',
	RIDDLEMODE  : '_RIDDLEMODE',
	PUZZLEMODE  : '_PUZZLEMODE',
	PATTERNMODE : '_PATTERNMODE',
	BATTLEMODE   : '_BATTLEMODE'
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
	'Pawing gently towards you is a terrifying beast. It has the head of a man in an ornate head dress, with the body of a lion. It is the mighty sphynx. ',
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

const PHYSICAL_EVASION_REACTION = [

]

const MAGIC_EVASION_REACTION = [

]

const PHYSICAL_HIT_REACTION = [

]

const MAGIC_HIT_REACTION = [

]

const PHYSICAL_CRITICAL_HIT_REACTION = 
[

]

const PHYSICAL_CRITICAL_HIT_REACTION = 
[

]

const PHYSICAL_INEFFECTIVE_REACTION = 
[

]

const MAGIC_INEFFECTIVE_REACTION = 
[

]



const RIDDLE_START = "The beast asks you a simple question. ";
const CONTINUE = "Would you like to enter the next room? ";

const riddles = [
	'What is the creature that walks on four legs in the morning, two legs at noon and three in the evening?'
];

const RIDDLE_ANSWERS = [
	['man', 'human', 'person', 'woman', 'people']
];

const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199];

const fibonacci = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946, 17711, 28657, 46368, 75025, 121393, 196418, 317811];

function getRiddle(){
	var riddle = Math.floor(Math.random() * (riddles.length - 1));
	if(riddle == 0){ return [0, 0]; }
	var legendary = Math.floor(Math.random()*(legendary.length - 1));
	return [riddle, legendary];
}

function getPattern(){
	//iterate max everytime a new patter is added
	var max = 2;
	//pick random pattern
	var type = Math.floor(Math.random() * (max - 1));
	if(type == 0){ //fibonacci
		var startIdx = Math.floor(Math.random() * (5 - 1));
		return fibonacci.slice(startIdx, startIdx + 6);
	}else if(type == 1){//primes
		var startIdx = Math.floor(Math.random() * (5 - 1));
		return primes.slice(startIdx, startIdx + 6);
	}
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

	'RiddleAnswer': function() {
		var answer = this.event.request.intent.slots.answer.value;
		if (RIDDLE_ANSWERS[this.attributes['riddleInfo'][0]].indexOf(answer) != -1){
			this.handler.state = states.PATTERNMODE;
			this.emit(':ask', RIDDLE_CORRECT_REACTION[this.attributes['riddleInfo'][1]] + CONTINUE, CONTINUE);
		}else{
			this.emit(':tell', RIDDLE_INCORRECT_REACTION[this.attributes['riddleInfo'][1]]);
		}
	}

});

const patternModeHandlers = Alexa.CreateStateHandler(states.PATTERNMODE, {

	'AMAZON.YesIntent': function() {
		var pattern = getPattern();
		var sequence = "";
		for (var i = 0; i < 5; i++) {
			sequence += pattern[i] + " ";
		}
		this.attributes['patternNext'] = pattern[5];
		this.emit(':ask', "Complete the give the next number in the sequence " + sequence, sequence);
	},

	'AMAZON.NoIntent': function() {
		this.emit(':tell', "Return when you are ready to be a hero. ");
	},

	'PatternAnswer': function() {
		var answer = this.event.request.intent.slots.patternanswer.value;
		if (this.attributes['patternNext'] == answer){
			this.emit(':ask', "that's correct " + CONTINUE, CONTINUE);
		}else{
			this.emit(':tell', "Incorrect");
		}
	}

});

const battleModeHandlers = Alexa.CreateStateHandler(states.BATTLEMODE, {

	'AMAZON.YesIntent': function() {
		this.State = 0;
		
		this.Enemies = [];
		
		//make a function for this later
		var E = new Enemy(5);
		this.Enemies.push(E);
		var E = new Enemy(3);
		this.Enemies.push(E);
		var E = new Enemy(1);
		this.Enemies.push(E);
		
		this.Player = new Player(10);
		
		this.emit(':tell', "Several creatures block your path!");
		
		for(var i = 0; i<this.Enemies.length; i++)
		{
			this.emit(':tell', this.Enemies[i].Description());
		}
	},

	'AMAZON.NoIntent': function() {
		this.emit(':tell', "Return when you are ready to be a hero. ");
	},

	'Attack': function() 
	{
		//I'm assuming this is how you'd get the answer
		this.emit(':ask', "Which Enemy? Select a number from 0 to " + (this.Enemies.length - 1));
		var answer = this.event.request.intent.slots.attack.value;
		
		if(answer >= this.Enemies.length)
			this.emit(':tell', "Invalid Enemy!");
		else
		{
			this.Player.Act(0, this, this.Enemies[input]);
		}
		
		for(var i = 0; i<this.Enemies.length; i++)
		{
			if(this.Enemies[i].state != -1)
				this.emitWithState("EnemyPhase");
		}
		
		//battle was won!
		//this.handler.state = "BATTLEWON";
	}
	
	'Spell': function() 
	{
		//I'm assuming this is how you'd get the answer
		this.emit(':ask', "Which Enemy? Select a number from 0 to " + (this.Enemies.length - 1));
		var answer = this.event.request.intent.slots.attack.value;
		
		if(answer >= this.Enemies.length)
			this.emit(':tell', "Invalid Enemy!");
		else
		{
			this.Player.Act(1, this, this.Enemies[input]);
		}
		
		for(var i = 0; i<this.Enemies.length; i++)
		{
			if(this.Enemies[i].state != -1)
				this.emitWithState("EnemyPhase");
		}
		
		//battle was won!
		//this.handler.state = "BATTLEWON";
	}
	
	'Defend': function() 
	{
		this.Player.Act(2, this);
		
		//this.State = 1;
		this.emitWithState("EnemyPhase");
	}
	
	'Meditate': function()
	{
		this.Player.Act(3, this);
		
		//this.State = 1;
		this.emitWithState("EnemyPhase");
	}
	
	'EnemyPhase': function()
	{
		//enemy makes their move, state 3 means the player dies, otherwise the player 
		//takes their turn
		for(var i = 0; i<this.Enemies.length; i++)
		{
			this.Enemies[i].Act(this.player, this);
		}
		if(this.Player.state == -1)
		{
			//this.state = 3;
			//the player is dead, go to gameOver state
			//this.handler.state = "ASKMODE";
		}
		
		var tmp = true;
		//in case I add an enemy that can self-destruct
		for(var i = 0; i<this.Enemies.length; i++)
		{
			if(this.Enemies[i].state != -1)
				tmp = false;
		}
		
		if(tmp)
		{
			//battle was won!
			//this.handler.state = "BATTLEWON";
		}
		
		//otherwise output the enemy's status
		for(var i = 0; i<this.Enemies.length; i++)
		{
			this.emit(':tell', this.Enemies[i].Status());
		}
	}

});

exports.handler = function(event, context, callback) {
	const alexa = Alexa.handler(event, context, callback);
	alexa.APP_ID = APP_ID; // APP_ID is your skill id which can be found in the Amazon developer console where you create the skill.
	alexa.registerHandlers(handlers, riddleModeHandlers, patternModeHandlers, battleModeHandlers);
	alexa.execute();
};