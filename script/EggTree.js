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
	
	outputSVG.innerHTML ="<g id=\"person_"+id+"\" x=\"100\" y=\"200\">"
				+"<rect class=\"card\" x=\"50\" y=\"50\" width=\"300\" height=\"200\"/>"
				+"<rect class=\"portrait\" x=\"100\" y=\"100\" width=\"100\" height=\"100\" style=\"background:\"+person.image_url+";\"/>"
				+"<text class=\"name\" x=\"250\" y=\"250\">"+nameText+"</text>"
				+"<text class=\"name\" x=\"250\" y=\"280\">"+hatchedText+"</text>"
				+"</g>";
}