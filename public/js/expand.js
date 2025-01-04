document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("click", (e) => {
    if (window.innerWidth < 768) {
      return; // Ne rien faire si la largeur de l'écran est inférieure à 768px
    }

    // Empêcher la propagation du clic pour éviter que le clic sur la carte déclenche l'événement global
    e.stopPropagation();

    // Si la carte est déjà agrandie, on la réduit
    if (card.classList.contains("expanded")) {
      card.classList.remove("expanded");
      // Réactiver les événements sur toutes les cartes
      document.querySelectorAll(".card").forEach((otherCard) => {
        otherCard.style.pointerEvents = "auto";
      });
    } else {
      // Réduire les autres cartes et désactiver leurs événements
      document.querySelectorAll(".card").forEach((otherCard) => {
        if (otherCard !== card) {
          otherCard.style.pointerEvents = "none";
        }
      });

      // Agrandir la carte cliquée
      card.classList.add("expanded");
    }
  });
});

// Écouter les clics sur tout le document
document.addEventListener("click", () => {
  // Réduire toutes les cartes agrandies
  document.querySelectorAll(".card.expanded").forEach((expandedCard) => {
    expandedCard.classList.remove("expanded");
  });

  // Réactiver les événements sur toutes les cartes
  document.querySelectorAll(".card").forEach((card) => {
    card.style.pointerEvents = "auto";
  });
});
