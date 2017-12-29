/*

Dungeon game demo

//=========================================================================

Have different rooms for cutscenes and all that fun stuff
try setTimeout("alert(\"pop up\");", 4000);
for them

load cutscenes or generate them on the fly

//=========================================================================

Creatures:
	//common
	Imp
	Silver dragon
	Giant rat
	Goblin
	Slime
	Land Shark
	Bullywug
	Pit Fiend
	Doppelganger
	Elementals
	Gargoyle
	Dao
	Hellhound
	
	//helpful
	Spirits
	Griffon
	Half-dragon
	Crow
	Raven
	
	//legendary
	Sphynx
	Deva
	Basilisk
	Lich
	Naga
	Pixiu
	

*/

//houses all the rooms in the dungeon
function Dungeon()
{
	this.Rooms = [];
	this.current = 0;
	this.playing = true;
	this.numRooms = 0;
	
	this.Play = function()
	{
		while(this.playing)
		{
			this.current = this.Rooms[this.current].Update();
			alert("Changing rooms");
		}
		alert("Thanks for playing!");
	}
	
	this.LoadRoom = function(room)
	{
		this.Rooms.push(room);
		room.Dungeon = this;
		room.ID = this.numRooms;
		this.numRooms++;
	}
};


//room class, inherit from this to get different rooms
//inherit and modify the GetInput and UpdateRoom functions
function Room()
{
	this.state = 0;
	this.ID = 0;
	this.Dungeon = -1;
};

Room.prototype.Update = function()
	{
		while(true)
		{
			var input = this.GetInput();
			if(input == null)
				continue;
			
			switch(this.state)
			{
				case 0:
					if(input == "Dog")
					{
						alert("yes, I do like dogs!");
						return 1;
					}
				break;
				
				case 1:
				break;
				
				default:
					alert("Please try something else!");
				break;
				
			}
		}
		return 0;
	};
	
Room.prototype.GetInput = function()
	{
		return prompt("What would you like to do in room " + this.ID + "?");
	}

	
/*======================================================================================
battle room should take in an array of enemies that need to be defeated
Player's hp and stats reset each battle
Player and enemies take turn attacking each other
//======================================================================================*/

/*
enemies for the battle rooms
*/
//maybe actor base class

//have player and enemy stats that play into this
function Attack(A, D)
{
	D.hp--;
	if(D.hp < 0)
		D.state = -1;
}


//state -1 means defeated
//take in arguments later
function Enemy(hp)
{
	this.hp = hp;
	this.state = 0;
	this.name = "Spatos";
};

//have a thing in here that changes the enemy's state based on the player's previous actions
//or hp
Enemy.prototype.Act = function(player)
{
	switch(state)
	{
		case 0:
			Attack(this, player);
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
			Alert("Monster looks very descriptive!");
		break;
		
		default:
			Alert("Something seems different...");
		break;
	};
}

//state -1 means defeated
function Player(hp)
{
	this.hp = hp;
	this.state = 0;
};

Player.prototype.Act = function(flag, enemy = null)
{
	// 0: attack
	// 1: magic attack
	// 2: defense/evade
	// 3: investigate
	switch(flag)
	{
		case 0:
			Attack(this, enemy);
			this.state = 0;
		break;
		
		case 1:
			Attack(this, enemy);
			this.state = 0;
		break;
		
		case 2:
			this.state = 1;
		break;
		
		case 3:
			Enemy.Description();
			this.state = 0;
		break;
		
	}
}

//the actual room ===================================================================

function BattleRoom(Enemies)
{
	Room.call(this);
	this.Enemies = Enemies;
	this.player = new Player();
}

BattleRoom.prototype = Object.create(Room.prototype);
BattleRoom.prototype.constructor = BattleRoom;

BattleRoom.prototype.Update = function()
{
	//we get an initial description of the enemy here, load in dynamically as
	//"entrance text"
	alert("enemies appear before you!");
	for(var i = 0; i<this.Enemies.length; i++)
	{
		this.Enemies[i].Description();
	}
	//while loop continues until either the player's hp reaces 0 or all enemies are defeated
	//or the player runs away successfully
	while(this.state<2)
	{
		alert("BattleRoom update");
		var input = this.GetInput();
		if(input == null)
			continue;
		
		//ping-pong state between player move => 0 and enemy(ies) move => 1 
		switch(this.state)
		{
			case 0:
				//maybe use another switch statement here
				if(input == "Attack")
				{
					var input = 
						prompt("Which Enemy? Select a number from 0 to " + (this.Enemies.length - 1));
					
					if(input >= this.Enemies.length)
						alert("Invalid Enemy!");
					else
					{
						alert("you strike at " + this.Enemies[input].name + "!");
						this.player.Act(0, this.Enemies[input]);
					}
					//call some function that takes in the enemy and player as an argument
					//and does something accordingly
				}
				else if(input == "Spell")
				{
					//alert("you wave your wand at the enemy!");
					var input = 
						prompt("Which Enemy? Select a number from 0 to " + (this.Enemies.length - 1));
					
					if(input >= this.Enemies.length)
						alert("Invalid Enemy!");
					else
					{
						alert("you wave your wand at " + this.Enemies[input].name + "!");
						this.player.Act(1, this.Enemies[input]);
					}
				}
				else if(input == "Guard")
				{
					alert("You take a defensive stance!");
					this.player.Act(2);
					//set the player's state to defensive
				}
				else if(input == "Run")
				{
					alert("You try to run!");
					//call some function that takes in the enemies and the player and does
					//some equations
				}
				else
				{
					alert("The player does nothing.");
				}
				
				this.state = 2;
				
				for(var i = 0; i<this.Enemies.length; i++)
				{
					if(this.Enemies[i].state != -1)
						this.state = 1;
				}
				
			break;
				
			case 1:
				//alert("Enemy forfeits its move");
				for(var i = 0; i<this.Enemies.length; i++)
				{
					this.Enemies[i].Act(this.player);
				}
				if(this.player.state == -1)
					this.state = 3;
				else
					this.state = 0;
			break;
			
			default:
				alert("Please try something else!");
			break;		
		}
	}
	
	if(this.state == 2)
	{
		alert("You won the battle!");
	}
	else
	{
		alert("Your party was slain in battle...please try again!");
	}
	
	return 0;
};


/*======================================================================================
riddle room should take in a riddle string and a solution(s) string
should also have a hint ability
//======================================================================================*/



/*======================================================================================
pattern room is more like a state machine than the others, each probably needs to be hand crafted..
for now anyway.
should also have a hint ability
//======================================================================================*/

function PatternRoom(pattern, solution)
{
	Room.call(this);
	this.pattern = pattern;
	this.solution = solution;
}

PatternRoom.prototype = Object.create(Room.prototype);
PatternRoom.prototype.constructor = PatternRoom;

PatternRoom.prototype.Update = function()
{
	while(true)
	{
		alert(this.pattern);
		var input = this.GetInput();
		if(input == null)
			continue;
			
		switch(this.state)
		{
			case 0:
				if(input == this.solution)
				{
					alert("Correct answer!");
					return 1;
				}
			break;
				
			case 1:
			break;
			
			default:
				alert("Please try something else!");
			break;		
		}
	}
	return 0;
};


/*======================================================================================
cutscene room simply displays dialogue and possibly has branching
should also have a hint ability
//======================================================================================*/

function main()
{
	alert("Welcome!");
	alert("Let the adventure begin!");
	var D = new Dungeon();
	var R = new Room();
	var T = new Room();
	var B = new BattleRoom();
	var P = new PatternRoom("1, 2, 3, 4, 5..........", "6");
	
	//first solution is Dog
	D.LoadRoom(R);
	//D.LoadRoom(B);
	D.LoadRoom(P);
	
	D.Play();
	
}

main();