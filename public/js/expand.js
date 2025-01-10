document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("click", (e) => {
    if (window.innerWidth < 768) {
      return;
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
