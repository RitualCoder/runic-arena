// Fonction pour arrondir les valeurs à 2 décimales
const round = (value) => Math.round(value * 100) / 100;

const setDefaultValues = (shine) => {
  // Initialiser les variables CSS avec les valeurs par défaut
  shine.style.setProperty("--mx", `50%`);
  shine.style.setProperty("--my", `50%`);
  shine.style.setProperty("--hyp", "0");
  shine.style.setProperty("--pos", `50% 50%`);
  shine.style.setProperty("--posx", `50%`);
  shine.style.setProperty("--posy", `50%`);
};

// Initialiser toutes les cartes au chargement de la page
document.querySelectorAll(".card").forEach((card) => {
  const shine = card.querySelector(".shine");

  // Initialiser les valeurs par défaut
  setDefaultValues(shine);

  // Lors du mouvement de la souris sur la carte
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect(); // Récupérer la taille et la position de la carte
    const x = e.clientX - rect.left; // Position X de la souris par rapport à la carte
    const y = e.clientY - rect.top; // Position Y de la souris par rapport à la carte

    // Calculer les pourcentages de position de la souris pour shine
    const mx = (x / rect.width) * 100;
    const my = (y / rect.height) * 100;
    shine.style.setProperty("--mx", `${mx}%`);
    shine.style.setProperty("--my", `${my}%`);

    // Calcul des coordonnées en pourcentage pour springshine
    const percent = {
      x: round((100 / rect.width) * x),
      y: round((100 / rect.height) * y),
    };

    // Calcul de la distance normalisée pour springshine
    const hyp = Math.sqrt((percent.y - 50) ** 2 + (percent.x - 50) ** 2) / 50;

    // Mettre à jour la variable CSS --hyp pour l'effet holographique
    shine.style.setProperty("--hyp", hyp.toFixed(2));

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
    shine.style.setProperty(
      "--pos",
      `${springBackground.x}% ${springBackground.y}%`
    );
    shine.style.setProperty("--posx", `${springBackground.x}%`);
    shine.style.setProperty("--posy", `${springBackground.y}%`);
  });

  // Lors du départ de la souris de la carte
  card.addEventListener("mouseleave", () => {
    // Réinitialiser les variables CSS pour l'effet holographique
    setTimeout(() => {
      setDefaultValues(shine);
    }, 200);
  });
});
