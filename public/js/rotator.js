document.querySelectorAll(".card").forEach((card) => {
  const cardContent = card.querySelector(".card-content");

  card.addEventListener("mouseenter", () => {
    /* setTimeout(() => {
      cardContent.style.transition = "none";
    }, 400); */
  });

  // Lors du mouvement de la souris sur la carte
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect(); // Récupérer la taille et la position de la carte

    const x = e.clientX - rect.left; // Position X de la souris par rapport à la carte
    const y = e.clientY - rect.top; // Position Y de la souris par rapport à la carte

    // Calcul des rotations basées sur la position de la souris
    const xRot = (y / rect.height - 0.5) * 50; // Rotation sur l'axe X
    const yRot = (x / rect.width - 0.5) * -50; // Rotation sur l'axe Y

    // Appliquer les rotations au contenu de la carte
    cardContent.style.transform = `rotateX(${xRot}deg) rotateY(${yRot}deg)`;
  });

  // Lors du départ de la souris de la carte
  card.addEventListener("mouseleave", () => {
    // Transition avant de réinitialiser
    cardContent.style.transform = "rotateX(0deg) rotateY(0deg)";
  });
});
