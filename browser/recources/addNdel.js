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
}

document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('deleteBreedButton').addEventListener('click', function() {
		var el = document.getElementById('selectDelItem');
		if(el.value === "Выберите породу") {
			return;
		}
		makePostRequest("/del?id="+el.value);
		var tmp = document.getElementById("'" + el.options[ el.selectedIndex ].text + "'");
		tmp.outerHTML = "";
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