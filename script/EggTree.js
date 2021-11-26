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
	var output = document.getElementById("eggTree");
	
	var person = family.people[id];
	
	var nameText = person.name.given+" "+person.name.father+" "+person.name.birth_clan;
	if(person.name.married_clan != undefined)
		nameText += " "+person.name.married_clan;
	
	hatchedText= "hatched "+person.hatch_date.year+"/"+person.hatch_date.month+"/"+person.hatch_date.day;
	
	
	
	output.innerHTML ="<g id=\"person_"+id+"\">"
				+"<rect class=\"card\" x=\""+person.x"\" y=\""+person.y+"\" width=\"500\" height=\"300\"/>"
				+"<image class=\"portrait\" x=\"10\" y=\"10\" width=\"200\" height=\"200\" xlink:href=\""+person.image_url+"\"/>"
				+"<text class=\"name\" x=\"250\" y=\"10\">"+nameText+"</text>"
				+"<text class=\"name\" x=\"250\" y=\"40\">"+hatchedText+"</text>"
				+"</g>";
}