// Fonction pour arrondir les valeurs à 2 décimales
const round = (value) => Math.round(value * 100) / 100;

document.querySelectorAll(".card").forEach((card) => {
  const cardContent = card.querySelector(".card-content");
  const halo = card.querySelector(".halo"); // Halo de lumière au survol de la carte qui suit la souris
  const holographic = card.querySelector(".holographic"); // Élément holographique

  card.addEventListener("mouseenter", () => {
    // Appliquer la transition à l'entrée de la souris
    holographic.style.transition = "all 0.4s ease-out";
  });

  // Lors du mouvement de la souris sur la carte
  card.addEventListener("mousemove", (e) => {
    // Afficher le halo et désactiver les transitions sur holographic
    halo.style.opacity = "1";

    // Désactiver la transition pour une mise à jour instantanée de holographic pendant le mouvement
    holographic.style.transition = "none";
    holographic.style.transition = "opacity 0.4s ease-out";

    const rect = card.getBoundingClientRect(); // Récupérer la taille et la position de la carte
    const x = e.clientX - rect.left; // Position X de la souris par rapport à la carte
    const y = e.clientY - rect.top; // Position Y de la souris par rapport à la carte

    // Calcul des rotations basées sur la position de la souris
    const xRot = (y / rect.height - 0.5) * 50; // Rotation sur l'axe X
    const yRot = (x / rect.width - 0.5) * -50; // Rotation sur l'axe Y

    // Appliquer les rotations au contenu de la carte
    cardContent.style.transform = `rotateX(${xRot}deg) rotateY(${yRot}deg)`;

    // Calculer les pourcentages de position de la souris pour holographic
    const mx = (x / rect.width) * 100;
    const my = (y / rect.height) * 100;
    holographic.style.setProperty("--mx", `${mx}%`);
    holographic.style.setProperty("--my", `${my}%`);

    // Calcul des coordonnées en pourcentage pour springGlare
    const percent = {
      x: round((100 / rect.width) * x),
      y: round((100 / rect.height) * y),
    };

    // Calcul de la distance normalisée pour springGlare
    const hyp = Math.sqrt((percent.y - 50) ** 2 + (percent.x - 50) ** 2) / 50;

    // Mettre à jour la variable CSS --hyp pour l'effet holographique
    holographic.style.setProperty("--hyp", hyp.toFixed(2));

    // Positionner le halo en fonction de la souris
    halo.style.left = `${x}px`;
    halo.style.top = `${y}px`;

    // Calcul des pourcentages pour springBackground (mouvement de fond)
    const percentSpring = {
      x: round((100 / rect.width) * x),
      y: round((100 / rect.height) * y),
    };

    // Calculer la position pour l'effet springBackground
    const springBackground = {
      x: round(50 + percentSpring.x / 4 - 12.5),
      y: round(50 + percentSpring.y / 3 - 16.67),
    };

    // Mettre à jour la position de springBackground dans les variables CSS
    holographic.style.setProperty(
      "--pos",
      `${springBackground.x}% ${springBackground.y}%`
    );
    holographic.style.setProperty("--posx", `${springBackground.x}%`);
    holographic.style.setProperty("--posy", `${springBackground.y}%`);
  });

  // Lors du départ de la souris de la carte
  card.addEventListener("mouseleave", () => {
    // Réactiver la transition à la sortie de la souris
    holographic.style.transition = "all 0.4s ease-out";

    // Transition avant de réinitialiser
    cardContent.style.transition = "transform 0.3s ease-out";
    cardContent.style.transform = "rotateX(0deg) rotateY(0deg)";

    // Cacher le halo avec une transition d'opacité
    halo.style.opacity = "0";

    // Réinitialiser les variables CSS pour l'effet holographique
    holographic.style.setProperty("--mx", `50%`);
    holographic.style.setProperty("--my", `50%`);
    holographic.style.setProperty("--hyp", "0");
    holographic.style.setProperty("--pos", `50% 50%`);
    holographic.style.setProperty("--posx", `50%`);
    holographic.style.setProperty("--posy", `50%`);
  });
});
