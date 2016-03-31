createNewDiv = function(name, en_name, description, imagepath) {
	var newDiv = document.createElement('div');
	newDiv.innerHTML = ''+
	'<div class="content" id="' + en_name + '">' +
	'<image class="contentImage" src ="'+imagepath+'">' +
	'<h5>'+name+'</h5>' +
	'<span class="catDescription" >'+description+''+
	'<br/>' +
	'<span class="contentLink"><a href="/'+en_name+'">Узнать больше ></a></span></span> '+
	'</div> ';
	document.getElementById('addNeccessaryDivsHere').appendChild(newDiv);
	var el = document.getElementById('selectDelItem');
	var ID = getLastAddedKey("name="+name+"&imagepath="+imagepath+
			"&smalldescription="+description+"&en_name="+en_name);
	var newOption = document.createElement("option");
	newOption.className = en_name;
	newOption.value = ID;
	newOption.innerHTML = name;
	el.appendChild(newOption);
};

getLastAddedKey = function(string) {
	return makeGetRequest('/getLastKey?' + string);
};

document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('deleteBreedButton').addEventListener('click', function() {
		var el = document.getElementById('selectDelItem');
		if(el.value === "Выберите породу") {
			return;
		}
		makePostRequest("/del?id="+el.value);
		var neccessaryClassName = el.options[ el.selectedIndex ].className ;
		el.options[el.options["selectedIndex"]].remove();
		/* We can't get dynamicly added element. Get ALL and find neccessary */
		var all = document.getElementsByTagName('*');
		for (var i = 0, len = all.length; i < len; i++) {
			if (all[i].id === neccessaryClassName) {
				var result = all[i];
				result.outerHTML = "";
				break;
			}
		}
		var addSpoiler = document.getElementById('delSpoiler');
		var checkbox = addSpoiler.children.item('checkbox');
		checkbox.checked = false
	})
});

document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('addBreedButton').addEventListener('click', function() {
		var name = document.getElementById('breedName');
		var enName = document.getElementById('breedEn_name');
		var url = document.getElementById('site');
		var breedDescription = document.getElementById('breedDescription');
		var hasError = false;
		[name, enName, url, breedDescription].forEach(function(datum) {
			if(datum.value === "") {
				datum.className = "error";
				datum.placeholder = 'Это поле не может быть пустым!';
				hasError = true;
			}
		})
		if(hasError) {
			return;
		}
		makePostRequest("/add?name="+name.value+"&imagepath="+url.value+
			"&smalldescription="+breedDescription.value+"&en_name="+enName.value);
		createNewDiv(name.value,enName.value,breedDescription.value,url.value);
		var addSpoiler = document.getElementById('addSpoiler');
		var checkbox = addSpoiler.children.item('checkbox');
		checkbox.checked = false
	})
});

makePostRequest = function(string) {
	var request = new XMLHttpRequest();
	request.open('POST', string);
	request.send();
};

makeGetRequest = function(string) {
	var request = new XMLHttpRequest();
	request.open('GET', string, false);
	request.send();
	if (request.status != 200) {
		console.log( request.status + ': ' + request.statusText );
		return;
	} else {
		return JSON.parse(request.response).id;
	}
};

document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('breedName').addEventListener('focus', function() {
		if(this.className === "error") {
			this.className = "";
			this.placeholder = "Имя породы";
		}
	})
});

document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('breedEn_name').addEventListener('focus', function() {
		if(this.className === "error") {
			this.className = "";
			this.placeholder = "Имя породы на английском";
		}
	})
});

document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('site').addEventListener('focus', function() {
		if(this.className === "error") {
			this.className = "";
			this.placeholder = "URL изображения";
		}
	})
});

document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('breedDescription').addEventListener('focus', function() {
		if(this.className === "error") {
			this.className = "";
			this.placeholder = "Краткое описание породы";
		}
	})
});