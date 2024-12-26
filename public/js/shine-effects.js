// Fonction pour arrondir les valeurs à 2 décimales
const round = (value) => Math.round(value * 100) / 100;

const setDefaultValues = (holographic) => {
  // Initialiser les variables CSS avec les valeurs par défaut
  holographic.style.setProperty("--mx", `50%`);
  holographic.style.setProperty("--my", `50%`);
  holographic.style.setProperty("--hyp", "0");
  holographic.style.setProperty("--pos", `50% 50%`);
  holographic.style.setProperty("--posx", `50%`);
  holographic.style.setProperty("--posy", `50%`);
  holographic.style.setProperty("--space", "5%");
};

// Initialiser toutes les cartes au chargement de la page
document.addEventListener("DOMContentLoaded", () => { 
  document.querySelectorAll(".card").forEach((card) => {
    const holographic = card.querySelector(".card-content");

    // Initialiser les valeurs par défaut
    setDefaultValues(holographic);

    // Lors du mouvement de la souris sur la carte
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect(); // Récupérer la taille et la position de la carte
      const x = e.clientX - rect.left; // Position X de la souris par rapport à la carte
      const y = e.clientY - rect.top; // Position Y de la souris par rapport à la carte

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
      // Réinitialiser les variables CSS pour l'effet holographique
      setTimeout(() => {
        setDefaultValues(holographic);
      }, 200);
    });
  });
});
