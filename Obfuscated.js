// Fonction pour générer une chaîne de caractères aléatoire
function genererTexteAleatoire(longueur) {
	let caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let texte = '';
	for (let i = 0; i < longueur; i++) {
	  texte += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
	}
	return texte;
  }
  
  // Fonction pour mettre à jour le texte de manière aléatoire
  function mettreAJourTexte(element) {
	let texteActuel = element.textContent;
	let lg = texteActuel.length;
	let texte = genererTexteAleatoire(lg); // Longueur du texte aléatoire
	element.textContent = texte;
  }
  
  // Récupérer tous les éléments avec la classe 'illisible' et mettre à jour leur texte
  let elementsIllisibles = document.getElementsByClassName('Obfuscated');
  for (let i = 0; i < elementsIllisibles.length; i++) {
	setInterval(() => mettreAJourTexte(elementsIllisibles[i]), 10);
  }
  