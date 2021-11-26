var family=undefined;


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
	var outputSVG = document.getElementById("eggTree");
	
	var person = family.people[id];
	
	var nameText = person.name.given+" "+person.name.father+" "+person.name.birth_clan;
	if(person.name.married_clan != undefined)
		nameText += " "+person.name.married_clan;
	
	hatchedText= "hatched "+person.hatch_date.year+"/"+person.hatch_date.month+"/"+person.hatch_date.day;
	
	outputSVG.innerHTML ="<g id=\"person_"+id+"\" x=\"300\" y=\"0\">"
				+"<rect class=\"card\" x=\"300\" y=\"0\" width=\"300\" height=\"200\"/>"
				+"<image class=\"portrait\" x=\"10\" y=\"10\" width=\"200\" height=\"200\" xlink:href=\""+person.image_url+"\"/>"
				+"<text class=\"name\" x=\"250\" y=\"150\">"+nameText+"</text>"
				+"<text class=\"name\" x=\"250\" y=\"180\">"+hatchedText+"</text>"
				+"</g>";
}