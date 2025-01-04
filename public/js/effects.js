// Fonction pour arrondir les valeurs à 2 décimales
const round = (value) => Math.round(value * 100) / 100;

const setDefaultValues = (effects) => {
  // Initialiser les variables CSS avec les valeurs par défaut
  effects.style.setProperty("--mx", `50%`);
  effects.style.setProperty("--my", `50%`);
  effects.style.setProperty("--hyp", "0");
  effects.style.setProperty("--pos", `50% 50%`);
  effects.style.setProperty("--posx", `50%`);
  effects.style.setProperty("--posy", `50%`);
  effects.style.setProperty("--op", `0`);
};

document.querySelectorAll(".card").forEach((card) => {
  const cardContent = card.querySelector(".card-content");
  const shine = card.querySelector(".shine");
  const effects = card.querySelector(".effects");

  setDefaultValues(effects);

  cardContent.addEventListener("mouseenter", () => {
    setTimeout(() => {
      cardContent.style.setProperty("transition-duration", "0s");
      shine.style.setProperty("transition-duration", "0s");
    }, 300);
    cardContent.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.6)";
    effects.style.setProperty("--op", `1`);
  });

  // Lors du mouvement de la souris sur la carte
  cardContent.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect(); // Récupérer la taille et la position de la carte

    const x = e.clientX - rect.left; // Position X de la souris par rapport à la carte
    const y = e.clientY - rect.top; // Position Y de la souris par rapport à la carte

    /****** CALCUL DE LA ROTATION DE LA CARTE ******/
    const xRot = (y / rect.height - 0.5) * 50; // Rotation sur l'axe X
    const yRot = (x / rect.width - 0.5) * -50; // Rotation sur l'axe Y

    // Appliquer les rotations au contenu de la carte
    cardContent.style.transform = `rotateX(${xRot}deg) rotateY(${yRot}deg) scale(1.05)`;
    /* ------------- FIN ROTATION ------------- */

    /* ------------- CALCUL EFFET BRILLANT ------------- */

    // Calculer les pourcentages de position de la souris pour effects
    const mx = (x / rect.width) * 100;
    const my = (y / rect.height) * 100;
    effects.style.setProperty("--mx", `${mx}%`);
    effects.style.setProperty("--my", `${my}%`);

    // Calcul des coordonnées en pourcentage pour springeffects
    const percent = {
      x: round((100 / rect.width) * x),
      y: round((100 / rect.height) * y),
    };

    // Calcul de la distance normalisée pour springeffects
    const hyp = Math.sqrt((percent.y - 50) ** 2 + (percent.x - 50) ** 2) / 50;

    // Mettre à jour la variable CSS --hyp pour l'effet holographique
    effects.style.setProperty("--hyp", hyp.toFixed(2));

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
    effects.style.setProperty(
      "--pos",
      `${springBackground.x}% ${springBackground.y}%`
    );
    effects.style.setProperty("--posx", `${springBackground.x}%`);
    effects.style.setProperty("--posy", `${springBackground.y}%`);

    /* ------------- FIN EFFET HOLOGRAPHIQUE ------------- */
  });

  // Lors du départ de la souris de la carte
  cardContent.addEventListener("mouseleave", () => {
    cardContent.style.setProperty("transition", "all 0.4s ease-out");
    shine.style.setProperty("transition", "all 0.4s ease-out");

    // Temps d'attente afin que la transition se termine avant de réinitialiser les variables CSS
    setTimeout(() => {
      // Réinitialisation des variables CSS pour l'effet rotation
      cardContent.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
      cardContent.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.4)";

      // Réinitialisation des variables CSS pour l'effet brillant
      setDefaultValues(effects);
      effects.style.setProperty("--op", `0`);
    }, 400);
  });
});
