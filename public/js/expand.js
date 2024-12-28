document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("click", () => {
    if (window.innerWidth < 768) {
      return;
    }

    // Si la carte est déjà agrandie, on la réduit
    if (card.classList.contains("expanded")) {
      card.classList.remove("expanded");
    } else {
      // Réduire les autres cartes avant d'agrandir celle-ci
      document.querySelectorAll(".card.expanded").forEach((expandedCard) => {
        expandedCard.classList.remove("expanded");
      });

      card.classList.add("expanded");
    }
  });
});
