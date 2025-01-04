document.addEventListener("DOMContentLoaded", () => {
  // Conteneur des attaques
  const attackContainer = document.querySelector(".mb-4 .grid");

  // Bouton d'ajout
  const addAttackButton = document.createElement("button");
  addAttackButton.textContent = "Ajouter une attaque";
  addAttackButton.classList.add(
    "bg-green-500",
    "text-white",
    "px-4",
    "py-2",
    "rounded",
    "hover:bg-green-600",
    "transition",
    "duration-200",
    "ease-in-out",
    "mt-4"
  );
  attackContainer.after(addAttackButton);

  // Récupération du prototype (fourni par Symfony)
  const prototype = attackContainer.getAttribute("data-prototype");
  let attackIndex = attackContainer.children.length;
  // Nombre d'attaques existantes

  // Fonction pour ajouter une nouvelle attaque
  const addAttack = () => {
    const newForm = prototype.replace(/__name__/g, attackIndex);
    const attackDiv = document.createElement("div");
    attackDiv.classList.add(
      "flex",
      "flex-col",
      "space-y-4",
      "rounded-lg",
      "shadow-sm",
      "bg-transparent",
      "px-10"
    );
    attackDiv.innerHTML = newForm;

    // Bouton de suppression
    const removeButton = document.createElement("button");
    removeButton.textContent = "Supprimer cette attaque";
    removeButton.classList.add(
      "bg-red-500",
      "text-white",
      "px-4",
      "py-2",
      "rounded",
      "hover:bg-red-600",
      "transition",
      "duration-200",
      "ease-in-out",
      "mt-4"
    );
    removeButton.addEventListener("click", () => attackDiv.remove());

    attackDiv.appendChild(removeButton);
    attackContainer.appendChild(attackDiv);

    attackIndex++;
  };

  // Ajouter une nouvelle attaque au clic sur le bouton
  addAttackButton.addEventListener("click", (e) => {
    e.preventDefault();
    addAttack();
  });

  // Ajouter des boutons de suppression pour les attaques existantes
  attackContainer.querySelectorAll(".flex").forEach((attackDiv) => {
    const removeButton = document.createElement("button");
    removeButton.textContent = "Supprimer cette attaque";
    removeButton.classList.add(
      "bg-red-500",
      "text-white",
      "px-4",
      "py-2",
      "rounded",
      "hover:bg-red-600",
      "transition",
      "duration-200",
      "ease-in-out",
      "mt-4"
    );
    removeButton.addEventListener("click", () => attackDiv.remove());
    attackDiv.appendChild(removeButton);
  });
});
