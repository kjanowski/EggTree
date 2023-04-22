var family=undefined;
var drawParams = {
	cardWidth: 400,
	cardHeight: 200,
    halfCardWidth: 200,
    halfCardHeight: 100,	
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
	
	//clear the container element
	var output = document.getElementById("eggTree");
	output.innerHTML = "" 
	for (person in family.people){
		svg = createPersonSVG(person);
		output.innerHTML = output.innerHTML + svg
	}
}


function createPersonSVG(id)
{
	var person = family.people[id];
	
	
	var posX = person.display.x*1 - drawParams.halfCardWidth;
	var posY = person.display.y*1 - drawParams.halfCardHeight;
	var topBlocksY = posY + drawParams.cardPadding;
	var leftBlockX = posX + drawParams.cardPadding;
	var rightBlockX = posX + drawParams.cardPadding*2 + drawParams.imgSize;
	var bottomBlockY = posY + drawParams.cardPadding;
	var bottomBlockX = posX + drawParams.cardPadding;

	
	//begin the group element
	var svgGroup = "<g class=\"card\" id=\"person_"+id+"\">"
				+"<rect x=\""+posX+"\" y=\""+posY+"\" width=\"500\" height=\"300\"/>";

	//add the portrait
	svgGroup += "<image class=\"portrait\" x=\""+leftBlockX+"\" y=\""+topBlocksY+"\" width=\"200\" height=\"200\" xlink:href=\""+person.display.image_url+"\"/>";
	
	//add the name
	var nameText = person.name.given+" "+person.name.parent_name+" "+person.name.birth_clan;
	if(person.name.married_clan != undefined)
		nameText += " "+person.name.married_clan;
	svgGroup += "<text class=\"name\" x=\""+rightBlockX+"\" y=\""+(topBlocksY+drawParams.lineHeight)+"\">"+nameText+"</text>"
	
	
	//add the hatching date
	var hatchedText= "hatched "+person.hatch_date.year+"/"+person.hatch_date.month+"/"+person.hatch_date.day;
	svgGroup += "<text class=\"name\" x=\""+rightBlockX+"\" y=\""+(topBlocksY+drawParams.lineHeight*2)+"\">"+hatchedText+"</text>"
				
	//close the group element
	svgGroup += "</g>";

	return svgGroup;
}	
