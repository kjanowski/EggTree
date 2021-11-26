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
	
	var outputText = person.name.given+" "+person.name.father+" "+person.name.birth_clan;
	if(person.name.married_clan != undefined)
		outputText += " "+person.name.married_clan;
	
	outputText += "<br>hatched "+person.hatch_date.year+"/"+person.hatch_date.month+"/"+person.hatch_date.day;
	
	outputSVG.innerHTML ="<g id=\"person_"+id+"\" x=\"100\" y=\"200\">"
				+"<rect class=\"card\" x=\"50\" y=\"50\" width=\"300\" height=\"200\"/>"
				+"<text x=\"100\" y=\"100\">"+outputText+"</text>"
				+"</g>";
}