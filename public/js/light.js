document.querySelectorAll(".card").forEach((card) => {
  const halo = card.querySelector(".halo"); // Halo de lumière au survol de la carte qui suit la souris

  // Lors du mouvement de la souris sur la carte
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect(); // Récupérer la taille et la position de la carte
    const x = e.clientX - rect.left; // Position X de la souris par rapport à la carte
    const y = e.clientY - rect.top; // Position Y de la souris par rapport à la carte

    // Positionner le halo en fonction de la souris
    halo.style.left = `${x}px`;
    halo.style.top = `${y}px`;
  });
});
