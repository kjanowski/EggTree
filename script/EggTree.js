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
	
	var output = document.getElementById("eggTree");
	output.innerHTML = ""+family;
}