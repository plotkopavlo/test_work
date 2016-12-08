var 
SelectCountry = document.getElementById("form__country"),
SelectCity = document.getElementById("form__city"),
xhrCountries=  new XMLHttpRequest(),
xhrCities=  new XMLHttpRequest(),

ListCountries,
ListCities;

//--------- Section load json file and read it --------------------

xhrCountries.open("GET", "json/countries.json", true);
xhrCountries.send(); // (1)
xhrCountries.onreadystatechange = function() { // (3)
	if (xhrCountries.readyState != 4) return;
	if (xhrCountries.status != 200) {
		alert(xhrCountries.status + ": " + xhrCountries.statusText);
	} else {
		ListCountries = JSON.parse(xhrCountries.responseText);
		while (SelectCountry.firstChild)
			SelectCountry.removeChild(SelectCountry.firstChild)
		for(var key in ListCountries){
			if(key !== undefined){
				var option = document.createElement("option");
				option.setAttribute("value", key);
				option.innerHTML= String(ListCountries[key]);
				SelectCountry.insertAdjacentElement("beforeEnd", option);
			}
		}
	}
}

xhrCities.open("GET", "json/cities.json", true);
xhrCities.send(); // (1)
xhrCities.onreadystatechange = function() { // (3)
	if (xhrCities.readyState != 4) return;
	if (xhrCities.status != 200) {
		alert(xhrCities.status + ": " + xhrCities.statusText);
	} else{
		ListCities = JSON.parse(xhrCities.responseText);
		changeCityInCountry();
	}

}
//end section of json


//function who changed options in SelectCity, when option in SelectCountry had changed 

function changeCityInCountry(){
	if (xhrCities.status == 200)
		for (var i = 0; i < SelectCountry.options.length; i++) {
			if (SelectCountry.options[i].selected){
				console.log("city");
				while (SelectCity.firstChild)
					SelectCity.removeChild(SelectCity.firstChild)
				for(var key in ListCities)
					if (SelectCountry.options[i].value == ListCities[key].country){
						var option = document.createElement("option");
						option.setAttribute("value", key);
						option.innerHTML= String(ListCities[key]["name"]);
						SelectCity.insertAdjacentElement("beforeEnd", option);
					}
			}
		}
}

///AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
SelectCountry.onchange = function (){
	if (xhrCities.status == 200)
		for (var i = 0; i < SelectCountry.options.length; i++) {
			if (SelectCountry.options[i].selected){
				console.log("city");
				while (SelectCity.firstChild)
					SelectCity.removeChild(SelectCity.firstChild)
				for(var key in ListCities)
					if (SelectCountry.options[i].value == ListCities[key].country){
						var option = document.createElement("option");
						option.setAttribute("value", key);
						option.innerHTML= String(ListCities[key]["name"]);
						SelectCity.insertAdjacentElement("beforeEnd", option);
					}
			}
		}
};



//--------- end  of Section load json file and read it --------------------

//--------- Section create step by step form --------------------

document.getElementById("navigaite").classList.remove("navigaite--undisplay");

var steps = $("#SignupForm fieldset");
var count = steps.length;
var NAVList = document.getElementsByClassName("nav__button");

steps.each(function(i) {
	$(this).wrap("<div class='form__step' id='form__step" + i + "' data-passed='false'></div>");
	$("#form__step" + i).append("<div class='form__control' id='form__step" + i + "commands'></div>");
	//$(this).parentElement.appendChild(document.createElement('div').setAttribute("id", "'form__step" + i + "commands'"));
	if (i == 0) {
		createPrevButton(i);
		createNextButton(i);

	}
	else if (i == count - 1) {
		document.getElementById("form__step" + i).classList.add("form__step--undisplay");
		createPrevButton(i);  
		createSubmiteButton(i);
	}
	else {
		document.getElementById("form__step" + i).classList.add("form__step--undisplay");
		createPrevButton(i);
		createNextButton(i);
		}
});

// RewriteClass.. works without JQ. It stiches class in nav__button
function RewriteClassPrev(i){
	document.getElementById("nav__button-"+i).classList.remove("nav__button--active");
	document.getElementById("nav__button-"+(i-1)).classList.add("nav__button--active");
}

function RewriteClassNext(i){
	var
	 StepNowClassList = document.getElementById("nav__button-"+i).classList,
	 StepNextClassList= document.getElementById("nav__button-"+(i+1)).classList;  

	StepNowClassList.remove("nav__button--active");

	StepNextClassList.add("nav__button--active");
	if(StepNowClassList.contains("nav__button--passing")){
		StepNowClassList.remove("nav__button--passing");
		StepNowClassList.add("nav__button--passed");
	}
	if(StepNextClassList.contains("nav__button--not-passed")){
		StepNextClassList.remove("nav__button--not-passed");
		StepNextClassList.add("nav__button--passing");
	}

}

function RewriteClassSubmite(i){
	var StepNowClassList = document.getElementById("nav__button-"+i).classList;
	StepNowClassList.remove("nav__button--passing");
	StepNowClassList.remove("nav__button--active");
	StepNowClassList.add("nav__button--passed");

}




function createPrevButton(i) {

	var stepName = "form__step" + i;

	$("#" + stepName + "commands").append("<button type='button' class='form__button form__button--prev' id='" + stepName + "Prev' class='prev'> <span class='form__icon-svg form__icon-svg--prev'> </span> <span class='form__button-text'>  Предыдущий </span></button>");
	if(i !==0)
		document.getElementById(stepName + "Prev").onclick =function(e) {
			document.getElementById(stepName).classList.add("form__step--undisplay");

			document.getElementById("form__step" + (i - 1)).classList.remove("form__step--undisplay");

			RewriteClassPrev(i)
		};
}

function createNextButton(i) {
	/*var 
		ButtonNext =document.createElement('button');
		
		ButtonNext.type ="button";
		ButtonNext.id="form__step" + i + "Next";
		ButtonNext.classList.add("form__button");
		ButtonNext.classList.add("form__button--next");
		ButtonNext.onclick  = function(e) {
			if (valid (i)){
				document.getElementById("form__step" + i).classList.add("form__step--undisplay");
				document.getElementById("form__step" + (i + 1)).classList.remove("form__step--undisplay");
				RewriteClassNext(i);
			}else{}
		};

		document.getElementById("form__step" + i +"commands").appendChild(ButtonNext);*/
		var stepName = "form__step" + i;
	$("#" + stepName + "commands").append("<button type='button' class='form__button form__button--next' id='" + stepName + "Next'> <span class='form__icon-svg form__icon-svg--next'> </span> <span class='form__button-text'> Следующий </span></button>");
	document.getElementById(stepName + "Next").onclick =function(e) {
		if (valid(i)){
			document.getElementById(stepName).classList.add("form__step--undisplay");
			document.getElementById("form__step" + (i + 1)).classList.remove("form__step--undisplay");
			RewriteClassNext(i);
		}

	};
}
// createSubmiteButton creates button submit and hide html button submite.

function createSubmiteButton(i) {
	document.getElementById("form__submite").classList.add("form__submite--undisplay");

	var stepName = "form__step" + i;
	$("#" + stepName + "commands").append("<button type='button' class='form__submite' id='form__submite-js'> <span class='form__submite-text'> Завершить </span></button>");
	
	document.getElementById("form__submite-js").onclick =function(e) {
		console.log("ad");
		if(valid(i)){
			document.getElementById(stepName).classList.add("form__step--undisplay");
			document.getElementById("form__step0").classList.remove("form__step--undisplay");

			RewriteClassSubmite(i);
			SwitchFormToCard();
		}
		
	};
}

//--------- end  of Section create step by step form --------------------


//---------Section navigaite button. This block works without Jq--------------------
var 
	NavButton= document.getElementsByClassName("nav__button"),
	NumberNavButtonActive= 0;
	for(let i = 0; i < NavButton.length; i++)
		if(NavButton[i].classList.contains("nav__button--active"))
			NumberNavButtonActive = i;

for(let i = 0; i < NavButton.length; i++){
	NavButton[i].onclick = function() {
		if(this.classList.contains("nav__button--not-passed"))
			return false;
		for(let i = 0; i < NavButton.length; i++)
			if(NavButton[i].classList.contains("nav__button--active"))
				NumberNavButtonActive = i;
		if( i !==NumberNavButtonActive){
				this.classList.add("nav__button--active");
				NavButton[NumberNavButtonActive].classList.remove("nav__button--active")
		
				document.getElementById("form__step"+NumberNavButtonActive).classList.add("form__step--undisplay");
				document.getElementById("form__step" + i).classList.remove("form__step--undisplay");
			}
	};
}
//--------- end of Section  navigaite button--------------------

//---------Section Enter on input. This block works without Jq--------------------
document.getElementById("SignupForm").onsubmit= function() {return false};
let 
	Fieldset = document.getElementsByClassName("form__fieldest"),
	EventClick = new Event("click");
for(let i = 0 ; i < Fieldset.length; i++)
{
	let 
		FieldsetInput = Fieldset[i].getElementsByTagName("input"),
	 	Button =  Fieldset[i].nextElementSibling.children[1];
	for(let j=0; j< FieldsetInput.length; j++)
	{
		FieldsetInput[j].onkeydown = function ()
		{
			
			if(event.keyCode === 13){
				console.log(Button);

				Button.dispatchEvent(EventClick);
			}
		};
	}
}



//--------- end of Section Enter on input. This block works without Jq--------------------


//---------Section  valid input data.  This block works without Jq --------------------


var field_values = {
 //id : value
 "username" : "",
 "e-mail" : "",
 "country" :  "", 
 "city" :  "",
 "social1": "",
 "social2": "",
 "social3": "",
 "social4": "",
 "numberCat" : ""
};
// Valid testes input data  
function valid (i){
	switch(i) {
		case 0:
		var 
			inputname = document.getElementById("form__name"),
			inputemail = document.getElementById("form__email");

		field_values["username"]= "";
		field_values["e-mail"]= "";

		field_values["username"]= inputname.value;
		field_values["e-mail"]= inputemail.value;


		if(  (field_values["username"] !=="") && (isValidEmailAddress(field_values["e-mail"]))){
			inputname.classList.remove("form__input-data--errore");
			inputemail.classList.remove("form__input-data--errore");
			document.getElementById("form__step" + i).setAttribute("data-passed", "true");
			return true;


		}else{
			document.getElementById("form__step" + i).setAttribute("data-passed", "false");
			if(field_values["username"] ==="")
				inputname.classList.add("form__input-data--errore");
			if( !isValidEmailAddress(field_values['e-mail'] ))
				inputemail.classList.add("form__input-data--errore");
			return false;
		}
		break;

		case 1:
		var 
			SelectCountry= document.getElementById("form__country"),
			SelectCity= document.getElementById("form__city");

		field_values["country"] = "";
		field_values["city"] = "";


		for (let j = 0; j < SelectCountry.children.length; j++){
			if (SelectCountry.children[j].selected)
				field_values["country"] = SelectCountry.children[j].value;
		}
		for (let j = 0; j < SelectCity.children.length; j++){
			if (SelectCity.children[j].selected)
				field_values["city"] = SelectCity.children[j].value;		
		}

		if( (field_values !== "") && (field_values["city"] !== "")){

			
			document.getElementById("form__step" + i).setAttribute("data-passed", "true");
			SelectCountry.classList.remove("form__input-data--errore");
			SelectCity.classList.remove("form__input-data--errore");
			return true;
		}else{
			document.getElementById("form__step" + i).setAttribute("data-passed", "false");
			if(field_values["country"] ==="")
				SelectCountry.classList.add("form__input-data--errore");
			if( field_values["city"] === "")
				SelectCity.classList.add("form__input-data--errore");
			return false;
		}

		break;

		case 2:
		var 
		checkbox = document.getElementsByClassName("form__checkbox-social"),
		input = document.getElementsByClassName("form__social-url");
		errore = false;
		for(let j=0; j< checkbox.length; j++){
			field_values["social"+(j+1)] = "";
			document.getElementById("form__social-url-"+(j+1)).classList.remove("form__input-data--errore")
			
			if(checkbox[j].checked){
				field_values["social"+(j+1)]=input[j].value;

				if(field_values["social"+(j+1)] ===""){
					document.getElementById("form__social-url-"+(j+1)).classList.add("form__input-data--errore")
					errore=true;
				}
			}
		}

		if(errore){
			document.getElementById("form__step" + i).setAttribute("data-passed", "false");
			return false;
		}
		else{
			document.getElementById("form__step" + i).setAttribute("data-passed", "true");
			return true;
		}

		break;

		case 3:
		var
			RadioCat = document.getElementsByClassName("form__radio"),
			DivErrore = document.getElementById("form__error");
		DivErrore.innerHTML = "";

		field_values["numberCat"] = "";

		if(RadioCat[RadioCat.length-1].checked){
			DivErrore.innerHTML = "Вы выбрали собачку. A надо котика";
			return false;
		}

		for(var j = 0; j < RadioCat.length - 1; j++){
			if(RadioCat[j].checked){
				field_values["numberCat"] = j+1;
				return true;
			}
		}
		return false;

		default:
			return false;
		
	}
}

//It testes input email
function isValidEmailAddress(emailAddress) {
	var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
	return pattern.test(emailAddress);
}


//--------- end  of Section  valid input data --------------------

//--------- Section sticth form to card and conversely. This block works without Jq--------------------

//SwitchFormToCard works without Jq. It switches Form to Card
function SwitchFormToCard(){
	document.getElementById("container-form").classList.add("container-form--undisplay");
	document.getElementById("card").classList.remove("card--undisplay");
	document.body.classList.add("body--background-card");
	FillDataInCard (); 
}

//FillDataInCard works without Jq. It switches Form to Card
function FillDataInCard (){
	var
		CardSocialBlocks=document.getElementsByClassName("card__social-block");

	document.getElementById("card__name").innerHTML=field_values["username"];
	document.getElementById("card__email").innerHTML=field_values["e-mail"];

	if(	(xhrCities.status == 200) &&(xhrCountries.status == 200))
		document.getElementById("card__geotext").innerHTML=ListCountries[field_values["country"]]+", "+ListCities[field_values["city"]].name;

	for(var j = 0; j<CardSocialBlocks.length; j++ ){
		if(field_values["social"+(j+1)] !==""){
			CardSocialBlocks[j].classList.remove("card__social-block--undisplay");
			CardSocialBlocks[j].children[0].setAttribute("href","https://"+field_values["social"+(j+1)]);
			CardSocialBlocks[j].children[1].innerHTML=field_values["social"+(j+1)];
		}else{
			CardSocialBlocks[j].classList.add("card__social-block--undisplay")
		}
	}

	document.getElementById("card__image").setAttribute("src", "img/cat" + field_values["numberCat"]+".jpg");
}


// this function cleans all style in button and cleans inputdate. But doesn't clean geodata 
document.getElementById("card__button").onclick = function  (){
	document.getElementById("container-form").classList.remove("container-form--undisplay");
	document.getElementById("card").classList.add("card--undisplay");
	document.body.classList.remove("body--background-card");

	CleanFormandButton ()

};

function CleanFormandButton (){
	var 
		NavButton = document.getElementsByClassName("nav__button"),
		FormStep = document.getElementsByClassName("form__step"),
		Input = document.getElementsByTagName("input");
	for( let i = 0; i < count; i++){
		NavButton[i].classList.add("nav__button--not-passed");
		NavButton[i].classList.remove("nav__button--passed");
		FormStep[i].setAttribute("data-passed", "false");
	}
	NavButton[0].classList.remove("nav__button--not-passed");
	NavButton[0].classList.add("nav__button--passing");
	NavButton[0].classList.add("nav__button--active");

	for(let i =  0; i< Input.length; i++){
		Input[i].value= "";
		Input[i].checked= false;
	}
}
//--------- end  of Section sticth form to card and conversely--------------------
