document.querySelectorAll(".add_item_link").forEach((btn) => {
  btn.addEventListener("click", addFormToCollection);
});

function addFormToCollection(e) {
  const collectionHolder = document.querySelector(
    "." + e.currentTarget.dataset.collectionHolderClass
  );

  // Vérifier le nombre d'attaques déjà ajoutées
  const currentCount = collectionHolder.querySelectorAll("li").length;

  // Limiter à 2 attaques
  if (currentCount >= 2) {
    return; // Ne pas ajouter de nouvelle attaque
  }

  const item = document.createElement("li");

  // Remplacer __name__ dans le prototype par l'index dynamique
  item.innerHTML = collectionHolder.dataset.prototype.replace(
    /__name__/g,
    collectionHolder.dataset.index
  );

  collectionHolder.appendChild(item);
  collectionHolder.dataset.index++;

  // Désactiver le bouton si 2 attaques sont ajoutées
  if (currentCount + 1 >= 2) {
    e.currentTarget.style.display = "none"; // Masquer le bouton "Ajouter une attaque"
  }
}

function toggleAddButton(collectionHolder) {
  const currentCount = collectionHolder.querySelectorAll("li").length;
  const addButton = document.querySelector(".add_item_link");

  // Afficher le bouton si moins de 2 attaques
  if (currentCount < 2) {
    addButton.style.display = "block";
  }
}
