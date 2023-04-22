var family=undefined;
var drawParams = undefined;

function loadDrawParams(paramsURL)
{
	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			drawParams=JSON.parse(this.responseText);
		}
	};
	xmlhttp.open("GET", paramsURL, true);
	xmlhttp.send();
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
	
	for (pairing in family.pairings){
		svg = createPersonSVG(person);
		output.innerHTML = output.innerHTML + svg
	}
}


function createPersonSVG(id)
{
	var person = family.people[id];
	
	
	var posX = person.display.x*1 - drawParams.person.originX;
	var posY = person.display.y*1 - drawParams.person.originY;
	var topBlocksY = posY + drawParams.person.cardPadding;
	var leftBlockX = posX + drawParams.person.cardPadding;
	var rightBlockX = posX + drawParams.person.cardPadding*2 + drawParams.person.imgSize;
	var bottomBlockY = posY + drawParams.person.cardPadding;
	var bottomBlockX = posX + drawParams.person.cardPadding;

	
	//begin the group element
	var svgGroup = "<g class=\"card\" id=\"person_"+id+"\">"
				+"<rect x=\""+posX+"\" y=\""+posY+"\" width=\""+drawParams.person.cardWidth+"\" height=\""+drawParams.person.cardHeight
				+"\" style=\"fill:"+drawParams.person.fill+";\"/>";

	//add the portrait
	svgGroup += "<image class=\"portrait\" x=\""+leftBlockX+"\" y=\""+topBlocksY
						+"\" width=\""+drawParams.person.imgSize+"\" height=\""+drawParams.person.imgSize
						+"\" xlink:href=\""+person.display.image_url+"\"/>";
	
	//add the name
	var nameText = person.name.given+" "+person.name.parent_name+" "+person.name.birth_clan;
	if(person.name.married_clan != undefined)
		nameText += " "+person.name.married_clan;
	svgGroup += "<text class=\"name\" x=\""+rightBlockX+"\" y=\""+(topBlocksY+drawParams.person.lineHeight)+"\">"+nameText+"</text>"
	
	
	//add the hatching date
	var hatchedText= "hatched "+person.hatch_date.year+"/"+person.hatch_date.month+"/"+person.hatch_date.day;
	svgGroup += "<text class=\"name\" x=\""+rightBlockX+"\" y=\""+(topBlocksY+drawParams.person.lineHeight*2)+"\">"+hatchedText+"</text>"
	
	//add the death date
	if(person.death_date != undefined)
	{
		var diedText= "died "+person.death_date.year+"/"+person.death_date.month+"/"+person.death_date.day;
		svgGroup += "<text class=\"name\" x=\""+rightBlockX+"\" y=\""+(topBlocksY+drawParams.person.lineHeight*3)+"\">"+diedText+"</text>"
	}
	
	//close the group element
	svgGroup += "</g>";

	return svgGroup;
}	


function createPairingSVG(id)
{
	var pairing = family.pairing[id];
	
	var avgX = 0;
	var avgY = 0;
	for (person in pairing.partners){
		avgX = avgX+(person.display.x*1);
		avgY = avgY+(person.display.y*1);
	}
	avgX = avgX/pairing.persons.length;
	avgY = avgY/pairing.persons.length;
	
	
	var posX = avgX - drawParams.pairing.originX;
	var posY = avgY - drawParams.pairing.originY;
	var topBlocksY = posY + drawParams.pairing.cardPadding;
	var leftBlockX = posX + drawParams.pairing.cardPadding;
	var rightBlockX = posX + drawParams.pairing.cardPadding*2 + drawParams.person.imgSize;
	var bottomBlockY = posY + drawParams.pairing.cardPadding;
	var bottomBlockX = posX + drawParams.pairing.cardPadding;

	
	//begin the group element
	var svgGroup = "<g class=\"card\" id=\"pairing_"+id+"\">"
				+"<rect x=\""+posX+"\" y=\""+posY+"\" width=\""+drawParams.pairing.cardWidth+"\" height=\""+drawParams.pairing.cardHeight
				+"\" style=\"fill:"+drawParams.pairing.fill+";\"/>";

	
	//add the name
	var startDateText= "from "+pairing.start_date.year+"/"+pairing.start_date.month+"/"+pairing.start_date.day;
	svgGroup += "<text class=\"name\" x=\""+rightBlockX+"\" y=\""+(topBlocksY+drawParams.person.lineHeight)+"\">"+startDateText+"</text>"
	
	if(paring.end_date != undefined)
	{
		var endDateText= "until "+pairing.end_date.year+"/"+pairing.end_date.month+"/"+pairing.end_date.day;
		svgGroup += "<text class=\"name\" x=\""+rightBlockX+"\" y=\""+(topBlocksY+drawParams.person.lineHeight*2)+"\">"+endDateText+"</text>"
	}
					
	//close the group element
	svgGroup += "</g>";

	return svgGroup;
}	
