let sections = document.querySelectorAll(".page-section");
let currentIndex = 0;
let isScrolling = false; // Variable pour éviter un changement trop rapide

window.addEventListener("wheel", (e) => {
  if (isScrolling) return; // Ignore l'événement si un autre scroll est déjà en cours

  // Utilisation d'un seuil pour rendre le scroll moins sensible
  const threshold = 100; // Seuil en pixels
  let scrollDelta = e.deltaY;

  // On ne change la section que si la distance de scroll dépasse le seuil
  if (Math.abs(scrollDelta) > threshold) {
    isScrolling = true; // Début du défilement

    if (scrollDelta > 0) {
      // Scroll vers le bas
      if (currentIndex < sections.length - 1) {
        currentIndex++;
      }
    } else {
      // Scroll vers le haut
      if (currentIndex > 0) {
        currentIndex--;
      }
    }

    // Scroll vers la section suivante avec une transition fluide
    const sectionTop = sections[currentIndex].offsetTop;

    window.scrollTo({
      top: sectionTop,
      behavior: "smooth",
    });

    // Réinitialiser l'état après un délai
    setTimeout(() => {
      isScrolling = false;
    }, 400); // Temps de transition, ajustez selon vos préférences
  }
});
