document.addEventListener("keydown", handleKeyDown);

function openModal(img) {
	var modal = document.querySelector(".modal");
	var modalImg = document.querySelector("#modal-img");
	var captionText = document.querySelector("#modal-caption");
	modal.style.display = "flex";
	document.body.style.overflow = 'hidden';
	modalImg.src = img.src;
	captionText.innerHTML = img.nextElementSibling.innerHTML;

	// Store the parent container of the clicked image
	var imageContainer = img.parentNode.parentNode;
	// Store all the images and captions within the same container
	images = Array.from(imageContainer.querySelectorAll("img"));
	captions = Array.from(imageContainer.querySelectorAll("figcaption"));

	// Find the index of the clicked image
	currentIndex = images.indexOf(img);
}

function showCaption(element) {
	var h6Text = element.querySelector("h6").innerHTML;
	var modalDetails = document.querySelector(".modal-details");
	var existingDetails = modalDetails.innerHTML;

	var paragraph = "<h7>" + h6Text + "</h7>";

	if (existingDetails.includes(paragraph)) {
		// Le texte est déjà présent, le supprimer
		modalDetails.innerHTML = existingDetails.replace(paragraph, '');
	} else {
		// Le texte n'est pas présent, l'ajouter
		modalDetails.innerHTML = existingDetails + paragraph;
	}
}

function handleKeyDown(event) {
	if (event.key === "ArrowLeft") {
		prevImage();
	} else if (event.key === "ArrowRight") {
		nextImage();
	} else if (event.key === "Escape") {
		closeModal();
		closelore();
		closeSong();
	}
}

function prevImage() {
	var prevIndex = (currentIndex - 1 + images.length) % images.length;
	while (images[prevIndex].parentNode.parentNode !== images[currentIndex].parentNode.parentNode) {
		prevIndex = (prevIndex - 1 + images.length) % images.length;
	}
	currentIndex = prevIndex;
	showImage(currentIndex);
}

function nextImage() {
	var nextIndex = (currentIndex + 1) % images.length;
	while (images[nextIndex].parentNode.parentNode !== images[currentIndex].parentNode.parentNode) {
		nextIndex = (nextIndex + 1) % images.length;
	}
	currentIndex = nextIndex;
	showImage(currentIndex);
}

function showImage(index) {
	var modalImg = document.querySelector("#modal-img");
	var modalDetails = document.querySelector(".modal-details");
	var captionText = document.querySelector("#modal-caption");

	// Réinitialiser les détails
	modalDetails.innerHTML = "";

	modalImg.src = images[index].src;
	captionText.innerHTML = captions[index].innerHTML;
}

function closeModal() {
	document.querySelector(".modal").style.display = "none";
	document.body.style.overflow = 'auto';
	document.querySelector(".modal-details").innerHTML = "";
}

function lore(element) {
	var modal = document.querySelector(".lore");
	var captionText = document.querySelector("#lore-caption");
	modal.style.display = "flex";
	document.body.style.overflow = 'hidden';
	captionText.innerHTML = element.querySelector("h4").innerHTML;
}

function closelore() {
	document.querySelector(".lore").style.display = "none";
	document.body.style.overflow = 'auto';
}

function openSong() {
	var modal = document.getElementById("audio-modal");
	modal.style.display = "block";
	document.body.style.overflow = 'hidden';
}

function closeSong() {
	var modal = document.getElementById("audio-modal");
	modal.style.display = "none";
	document.body.style.overflow = 'auto';
}

window.addEventListener("click", function (event) {
	var modal = document.getElementById("audio-modal");
	if (event.target === modal) {
		modal.style.display = "none";
	}
});

document.querySelectorAll('.container').forEach((container) => {
	const slider = container.querySelector('.slider');

	slider.addEventListener('input', (e) => {
		container.style.setProperty('--position', `${e.target.value}%`);
	});
});

function toggleImage(element) {
    var images = element.querySelectorAll(".popup-image");
	var arrow = element.querySelector("#arrow");

	for (var i = 0; i < images.length; i++) {
		var image = images[i];
		if (image.style.display === "none" || image.style.display === "") {
			image.style.display = "flex";
			image.style.maxHeight = "500px";
			arrow.textContent = "↓";
		} else {
			image.style.display = "none";
			image.style.maxHeight = "0";
			arrow.textContent = "❯";
		}
	}
}

function OpenPop(area) {
    // Récupérer les attributs "alt" et "title" de la zone cliquée
    var altText = area.getAttribute("alt");
    var titleText = area.getAttribute("title");

    // Sélectionner la div de la pop-up
    var popup = document.getElementById(altText);
    var popups1 = document.querySelectorAll(".popup1");
    var popups2 = document.querySelectorAll(".popup2");

    // Vérifier si la pop-up est actuellement affichée
    if (popup.style.display === "block") {
        // Si la pop-up est affichée, la désafficher
        popup.style.display = "none";
    } else {
        // Ajouter un délai de 500 millisecondes (0.5 seconde) avant d'effectuer la manipulation
        
            popups1.forEach(function (popup) {
                if (popup.style.display === "block") {
                    setTimeout(function () {
						popup.style.display = "none";
					}, 100)	
                }
            });
            popups2.forEach(function (popup) {
                if (popup.style.display === "block") {
					setTimeout(function () {
                    	popup.style.display = "none";
					}, 100)	
                }
            });
            // Afficher la nouvelle pop-up en la rendant visible
			setTimeout(function () {
        	    popup.style.display = "block";
			}, 300)	
        ; // Vous pouvez ajuster le délai selon vos besoins
    }
}

function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain attribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /*make an HTTP request using the attribute value as the file name:*/
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /*remove the attribute, and call this function once more:*/
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }      
      xhttp.open("GET", file, true);
      xhttp.send();
      /*exit the function:*/
      return;
    }
  }
};