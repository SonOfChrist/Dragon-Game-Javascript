// you can create variables with var, let and const
//Declaring withouht initializing the variable
let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

// Updating the html element (id, class and text) and assingning them to their variables we need to give them references on our javascript code
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

// Creating a weapons varible where a player can buy the weapon of His or Her own choice in the Game
const weapons = [
	{ name: "stick", power: 5 },
	{ name: "dagger", power: 30 },
	{ name: "claw hammer", power: 50 },
	{ name: "sword", power: 100 }
];

// Creating the monster that needs to be defeated in the game.
const monsters = [
    { name: "slime", level: 2, health: 15 },
    { name: "fanged beast", level: 8, health: 60},
    { name: "dragon", level: 2, health: 300}
];

// Creating the location areas varibales where the player can move from one area to another
// when you have a lot of repetion on your code is sogn that you need a new function to help with it (creating afuntion called update) && that should take a parameter.
const locations = [
	//location 0
    {	name: "town square",
        "button text": ["Go to store", "Go to cave", "Fight dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "You are in the town square Our hero Mr.Stan. You see a sign that says \"Store.\""
    },
	//Location 1
	{	name: "store",
		"button text": ["Buy 10 health $1000 || (10 gold)", "Buy weapon $3000 || (30 gold)", "Go to town square Mr.Stan"], //changing the text (button1.innertext = "buy 10 health $1000 || (10 gold)")
		"button functions": [buyHealth, buyWeapon, goTown],
		text: "You enter the STORE Mr.Stanley Mochoge. What do you want to buy we, this what we have in our Store."
	},
	//location 2
	{	name: "cave",
		"button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
		"button functions": [fightSlime, fightBeast, goTown],
		text: "You enter the cave Mr.Stan. You see some monsters.Which Monster do you chose to fight in this Arena."
	},
	//location 3
	{	name: "fight",
		"button text": ["Attack", "Dodge", "Run"],
		"button functions": [attack, dodge, goTown],
		text: "You are fighting a monster use the skills provided above you Mr.Stan."
	}, 
	//location 4
	{	name: "kill monster",
		"button text": ["Go to town square", "Go to town square", "Go to town square"],
		"button functions": [goTown, goTown, goTown],
		text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
	},
	//location 5
	{	name: "lose",
		"button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
		"button functions": [restart, restart, restart],
		text: "You die. ☠️"
	},
	//location 6
	{	name: "win",
		"button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
		"button functions": [restart, restart, restart],
		text: "You defeat the dragon! YOU WIN THE GAME! 🎉"
    },
	//location 7
	{	name: "easter egg",
		"button text": ["2", "8", "Go to town square?"],
		"button functions": [pickTwo, pickEight, goTown],
		text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
	}
]

// initialize buttons so that they can be called when we click the button through the function 
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

// Easy way to repeat the code is by creating functions that are going to be called, the group of code that are called over and over again
// All function are going to be defined
// This will now use data from the location that is passed into to it
function update(location) {
    monsterStats.style.display = "none";
	button1.innerText = location["button text"][0];
	button2.innerText = location["button text"][1];
	button3.innerText = location["button text"][2];
	button1.onclick = location["button functions"][0];
	button2.onclick = location["button functions"][1];
	button3.onclick = location["button functions"][2];
    text.innerText = location.text;     															//when the key is one word we can use dot notation
}

function goTown() {
    update(locations[0]);
}

function goStore() {
    update(locations[1]);
}

function goCave() {
    update(locations[2]);
}

//Note here we are calling the action of what is happenning in this places
//Conditional statement has to be true if not should provide the false code
function buyHealth() {
    if (gold >= 10) {																				//->be carefull of the conditional operators
        gold -= 10;
        health += 10;
        goldText.innerText = gold;  																//->Updating the value that is displayed on the screen
    	healthText.innerText = health;       
    } else {
        text.innerText = "You do not have enough gold to buy health Mr.Stan try to update your Game or fightMonsters to have enough Health.";
    }

}

function buyWeapon() {																				//-> Nested if statement -- if statement inside another if statement in the project
    if (currentWeapon < weapons.length - 1) {
    	if (gold >= 30) {
            gold -= 30;
            currentWeapon++;  									//currentWeapon += 1
            goldText.innerText = gold;
            let newWeapon = weapons[currentWeapon].name;											//->Telling the player what weapon they bought
    		text.innerText = "You now have a " + newWeapon + ".";
            inventory.push(newWeapon);																//->adding the new weapon on to the inventory
            text.innerText += " In your inventory you have: " + inventory;
    	} else {
    		text.innerText = "You do not have enough gold to buy a weapon Sir.Stan. Please find a way to raise enough Gold to buy a Powerfull Weapon";
    	} 
    } else {
		text.innerText = "Sir.Stan!!! You already have the most powerful weapon!";
        button2.innerText = "Hey Stan you can Sell weapon for 15 gold";
		button2.onclick = sellWeapon;
	}
}

function sellWeapon() {
	if (inventory.length > 1) {
		gold += 15;
		goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText = "You sold a " + currentWeapon + ".";
        text.innerText += " In your inventory you have: " + inventory;
	} else {
    	text.innerText = "Don't sell your only weapon Mr.Stanley!";
  	}
}

function fightSlime() {
	fighting = 0;
	goFight();
}

function fightBeast() {
	fighting = 1;
	goFight();    
}

function fightDragon() {
	fighting = 2;
	goFight();
}

function goFight() {
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";														//-> Updating Css styles through javascript 
    monsterNameText.innerText = monsters[fighting].name;
	monsterHealthText.innerText = monsterHealth;
}

function attack() {
    text.innerText = "The " + monsters[fighting].name + " attacks.";
    text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";

    if (isMonsterHit()) {
        health -= getMonsterAttackValue(monsters[fighting].level);
    } else {
		text.innerText += " You miss.";
	}

    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
	healthText.innerText = health;
	monsterHealthText.innerText = monsterHealth;   

	if (health <= 0) {
		lose();
	} else if (monsterHealth <= 0) {
		fighting === 2 ? winGame() : defeatMonster();	 			//Ternary operator in the exclusive of if / else statement
		/* if (fighting ===2){
			winGame();
		}else{
			defeatMonster();
		}
		*/									
	}

	if (Math.random() <= .1 && inventory.length !== 1) {				//Here chance is that your weapon can break during fighting
        text.innerText += " Your " + inventory.pop() + " breaks.";
        currentWeapon--;
	}
}

function getMonsterAttackValue(level) {
    let hit = (level * 5) - (Math.floor(Math.random() * xp));
    console.log(hit);
    return hit;
}

function isMonsterHit() {
	return Math.random() > .2 || health < 20;
}

function dodge() {
    text.innerText = "You dodge the attack from the " + monsters[fighting].name + ".";
}

function defeatMonster() {
    gold += Math.floor(monsters[fighting].level * 6.7)
    xp += monsters[fighting].level;
    goldText.innerText = gold;
	xpText.innerText = xp;
    update(locations[4]);
}

function lose() {
    update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
	xp = 0;
	health = 100;
	gold = 50;
	currentWeapon = 0;
	inventory = ["stick"];
	goldText.innerText = gold;
	healthText.innerText = health;
	xpText.innerText = xp;
	goTown();
}

function easterEgg() {
	update(locations[7]);
}

function pickTwo() {
 pick(2);
}

function pickEight() {
 pick(8);
}

function pick(guess) {
    let numbers = [];
    while (numbers.length < 10) {
        numbers.push(Math.floor(Math.random() * 11));
    }

    text.innerText = "You picked " + guess + ". Here are the random numbers:\n";

    for (let i = 0; i < 10; i++) {
        text.innerText += numbers[i] + "\n";
    }

    if (numbers.indexOf(guess) !== -1) {
        text.innerText += "Right! You win 20 gold!"
        gold += 20;
        goldText.innerText = gold;
    } else {
        text.innerText += "Wrong! You lose 10 health!"
        health -= 10;
        healthText.innerText = health
        if (health <= 0) {
          lose();
        }
    }
}