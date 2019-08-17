
/* IMAGES */
var imgArray;
var defaultSrc = "cswdimages/cswdimages/back.png";
var gearOn = "cswdimages/cswdimages/gearson.png";
var gearOff = "cswdimages/cswdimages/gearsoff.png";

/* HTML ELEMENTS */
var main_body;
var settings_button;
var settings_menu;
var radio_one, radio_two, radio_three;
var table;
var card_1, card_2, card_3;
var shuffle_button;
var message_box;
var message_text;

/* VARIABLES */
var process_click = false;
var message_box_size, text_width, margin_left;
var text;
var give_feedback = true;
var menu_open = false;
var border_on = true;
var player_score = 0
var computer_score = 0
var cards_shuffled = false;
var all = false;

/* THEME VARIABLES */
var var1, var2, var3, var4, var5='5px solid white', var6;
//===========================================================================================================
//				SETUP
//===========================================================================================================
window.onload = function() {
	
	initialize_image_arrays();
	collect_references();
	settings_gear_button.src = gearOff;
	player.innerHTML = player_score;
	computer.innerHTML = computer_score;
	showCards();
	
	/* WHENEVER THERE IS A CLICK, WE CHECK IF IT WAS INSIDE THE 'CARD TABLE',
		AND IF THE MENU IS OPEN, WE CLOSE THE MENU*/
	main_body.onclick = function(e) {
		if(e.target != settings_menu && e.target != settings_gear_button) {			
			if(menu_open){
				console.log('You clicked outside');
				settings_button.src = gearOff;
				settings_menu.style.visibility = "hidden";
				menu_open = false;
			}
		}
	}	 
};
		   
/*
TO DO:


2)animate the gear moving???
3)re structure the elements... one main div with other inside may be best???       Naaaaaa
*/

/* LOAD THE CARD IMAGES TO THE ARRAY */
function initialize_image_arrays(){
	
	imgArray = new Array();
	imgArray[0] = new Image();
	imgArray[0].src = 'cswdimages/cswdimages/six.png';
	imgArray[1] = new Image();
	imgArray[1].src = 'cswdimages/cswdimages/ten.png';
	imgArray[2] = new Image();
	imgArray[2].src = 'cswdimages/cswdimages/queen.png';
}
/* GET THE ELEMENTS NEEDED*/
function collect_references(){
	
	// reference these once now, to use later
	main_body = document.getElementsByTagName("body")[0];
	settings_button = document.getElementById("settings_gear_button");
	settings_menu = document.getElementById("settings_menu");
	radio_one = document.getElementById("theme_one");
	radio_two = document.getElementById("theme_two");
	radio_three = document.getElementById("theme_three");
	table = document.getElementById("card_table");
	card_1 = document.getElementById("card_1");
	card_2 = document.getElementById("card_2");
	card_3 = document.getElementById("card_3");
	shuffle_button = document.getElementById('shuffle_button');
	message_box = document.getElementById("message_box");
	message_text= document.getElementById("message_text");
	// score counters
	player = document.getElementById("player_score");
	computer = document.getElementById("computer_score");
}
//===========================================================================================================
//				MENU OPTIONS
//===========================================================================================================
/* SHOW MENU TOGGLE*/
function toggle_options(){
	
	// show menu
	if(settings_button.getAttribute('src') == gearOff){
		settings_button.src = gearOn;
		settings_menu.style.visibility = "visible";
		menu_open = true;
	}
	else{ // hide the menu
		settings_button.src = gearOff;
		settings_menu.style.visibility = "hidden";
		menu_open= false;
	}
}

/* CHANGE COLOR SCHEME*/
function handleChange(event){
	
	if(event == radio_one){
		themeOne();
		radio_two.checked = false;
		radio_three.checked = false;
	}
	if(event == radio_two){
		themeTwo();
		radio_one.checked = false;
		radio_three.checked = false;
	}
	if(event == radio_three){
		themeThree();
		radio_two.checked = false;
		radio_one.checked = false;
	}
	//toggle_options();
}

function themeOne(){
	//this is the black & white theme
	let var1='black'; let var2='black'; let var3='black';let var4='white'; ; let var5='black';	
	process_theme_change('1',var1,var2,var3,var4,var5,var6);
}
function themeTwo(){
	//this is the shades of green theme
	//DARK SLATE GRAY		//MIDDLE GREEN			//SAGE			 //MIDDLE GREEN    
	let var1='#344E41'; ; let var2='#588157'; let var3='#A3B18A'; let var4='#588157'; let var5='white';	
	process_theme_change('2', var1,var2,var3,var4,var5,var6);
}
function themeThree(){  
	//this is the shades of pink theme
	//BLUE-MAGENTA			//MAGENTA			  //PINK			 //MAGENTA
	let var1='#C287E8';  let var2='#E6ADEC'; let var3='#EFB9CB'; let var4='#E6ADEC'; let var5='white';	
	process_theme_change('3',var1,var2,var3,var4,var5,var6);
}

function process_theme_change(number,var1,var2,var3,var4,var5){
	
	main_body.style.backgroundColor = var1;
	settings_menu.style.backgroundColor = var2;
	table.style.backgroundColor = var3;
	shuffle_button.style.backgroundColor = var4;
	shuffle_button.style.color = var5;

	// show feedback if ticked
	if(give_feedback){
		shuffle_button.style.visibility = 'hidden';
		showFeedBack('900px', '20%', "You have changed to theme " + number, '570px');
		if(!cards_shuffled)
			all = true;
		// wait 2 seconds and reset
		setTimeout(function(){ reset(all) }, 2000);
	}
}

/* BORDER ON/OFF TOGGLE */
function toggle_border(){
	if(table.style.border ==  "none"){
		border_on = true;
		word = "added";
		table.style.border =  var5;
	}
	else{
		table.style.border =  "none";
		border_on = false;
		word = "removed";
	}
	toggle_options();
	
	// show feedback for change
	if(give_feedback){
		shuffle_button.style.visibility = 'hidden';
		showFeedBack('900px', '20%', "You have " + word + " the border", '570px');
		if(!cards_shuffled)
			all = true;
		// wait 2 seconds and reset
		setTimeout(function(){ reset(all) }, 2000);
	}
}

/* FEEDBACK ON/OFF TOGGLE*/
function toggle_feedback(){
	if(give_feedback == false)
		give_feedback = true;
	else
		give_feedback = false;
	toggle_options();
}
//===========================================================================================================
// 				THE GAME
//===========================================================================================================

/* SHUFFLE & HIDE THE CARDS */
function shuffle(){
	cards_shuffled = true;
	//random sort
	imgArray.sort(randomSort);
	//show back of cards
	card_1.src = defaultSrc;
	card_2.src = defaultSrc;
	card_3.src = defaultSrc;
	//hide shuffle button
	shuffle_button.style.visibility = 'hidden';
	//change boolean to true
	process_click = true;
}

function randomSort(a,b){
	return Math.random() - 0.5;
}

/* PROCESS THE GAME*/
function process(event){
	
	// if the click option is available 
	if(process_click == true){
		process_click = false;
		// get the last char of the event id and -1 for index
		var index = (event.id[event.id.length -1]) -1;
		// show the card
		document.getElementById(event.id).src = imgArray[index].src;
		// check if win
		
		if(imgArray[index].src == "file:///C:/Users/r00050477/Desktop/CSWD/cswdimages/cswdimages/queen.png"){
			message_box_size = "420px"; margin_left = "66%"; text = "You Win"; text_width = "175px";
			player_score = player_score+1;
			player.innerHTML = player_score;
		}
		else{
			message_box_size = "430px"; margin_left = "64.5%"; text = "You Lose"; text_width = "185px";
			computer_score = computer_score+1;
			computer.innerHTML = computer_score;
		}
		// show feedback if ticked
		if(give_feedback)
			showFeedBack(message_box_size, margin_left, text, text_width);
		// wait 2 seconds and reset
			all = true;
		setTimeout(function(){ reset(all) }, 2000);
	}
}

/* SHOW FEEDBACK */
function showFeedBack(message_box_size, margin_left, text, text_width){
	
	message_box.style.width = message_box_size;
	message_box.style.marginLeft = margin_left;
	message_box.style.visibility = "visible" ;
	message_text.style.width = text_width;
	message_text.innerHTML = text;
}

/* RESET THE GAME */
function reset(all){
	if(all){
		showCards();
		shuffle_button.style.visibility = 'visible';
	}
	message_box.style.visibility = "hidden" ;
}

/* SHOW ALL CARDS*/
function showCards(){
	cards_shuffled = false;
	all = false;
	card_1.src = imgArray[0].src;
	card_2.src = imgArray[1].src;
	card_3.src = imgArray[2].src;
}