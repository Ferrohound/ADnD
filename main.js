/*

Dungeon game demo

//=========================================================================

Have different rooms for cutscenes and all that fun stuff

try setTimeout("alert(\"pop up\");", 4000);
for them

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


function main()
{
	alert("Welcome!");
	alert("Let the adventure begin!");
	var D = new Dungeon();
	var R = new Room();
	var T = new Room();
	
	D.LoadRoom(R);
	D.LoadRoom(T);
	
	D.Play();
	
}

main();