var family=undefined;
var drawParams = {
	cardWidth: 500,
	cardHeight: 300,
    halfCardWidth: 250,
    halfCardHeight: 150,	
	imgSize: 200,
	lineHeight: 30,
	cardPadding: 10
}


function loadFamily(familyURL)
{
	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			initFamily(this.responseText);
		}
	};
	xmlhttp.open("GET", familyURL, true);
	xmlhttp.send();
}


function initFamily(jsonData)
{
	family = JSON.parse(jsonData);
	
	displayPerson("1");
}


function displayPerson(id)
{
	var output = document.getElementById("eggTree");
	
	var person = family.people[id];
	
	var nameText = person.name.given+" "+person.name.father+" "+person.name.birth_clan;
	if(person.name.married_clan != undefined)
		nameText += " "+person.name.married_clan;
	
	var hatchedText= "hatched "+person.hatch_date.year+"/"+person.hatch_date.month+"/"+person.hatch_date.day;

	
	var posX = person.x - drawParams.halfCardWidth;
	var posY = person.y - drawParams.halfCardHeight;
	var topBlocksY = posY + drawParams.cardPadding;
	var leftBlockX = posX + drawParams.cardPadding;
	var rightBlockX = posX + drawParams.cardPadding*2 + drawParams.imgSize;
	var bottomBlockY = posY + drawParams.cardPadding;
	var bottomBlockX = posX + drawParams.cardPadding;
	
	output.innerHTML ="<g id=\"person_"+id+"\">"
				+"<rect class=\"card\" x=\""+posX+"\" y=\""+posY+"\" width=\"500\" height=\"300\"/>"
				+"<image class=\"portrait\" x=\""+leftBlockX+"\" y=\""+topBlocksY+"\" width=\"200\" height=\"200\" xlink:href=\""+person.image_url+"\"/>"
				+"<text class=\"name\" x=\""+rightBlockX+"\" y=\""+topBlocksY+"\">"+nameText+"</text>"
				+"<text class=\"name\" x=\""+rightBlockX+"\" y=\""+(topBlocksY+drawParams.lineHeight)+"\">"+hatchedText+"</text>"
				+"</g>";
}