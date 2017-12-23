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

function BattleRoom()
{
	Room.call(this);
}

BattleRoom.prototype = Object.create(Room.prototype);
BattleRoom.prototype.constructor = BattleRoom;

BattleRoom.prototype.Update = function()
{
	while(true)
	{
		alert("BattleRoom update");
		var input = this.GetInput();
		if(input == null)
			continue;
			
		switch(this.state)
		{
			case 0:
				if(input == "JohnnyCage")
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

/*======================================================================================
riddle room should take in a riddle string and a solution(s) string
should also have a hint ability
//======================================================================================*/



/*======================================================================================
puzzle room is more like a state machine than the others, each probably needs to be hand crafted..
for now anyway.
should also have a hint ability
//======================================================================================*/


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
	
	D.LoadRoom(R);
	D.LoadRoom(B);
	
	D.Play();
	
}

main();