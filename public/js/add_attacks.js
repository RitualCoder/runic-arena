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

  item.innerHTML = `<h1>Attaque ${currentCount + 1}</h1>` + item.innerHTML;

  collectionHolder.appendChild(item);
  collectionHolder.dataset.index++;

  // Désactiver le bouton si 2 attaques sont ajoutées
  if (currentCount + 1 >= 2) {
    e.currentTarget.style.display = "none"; // Masquer le bouton "Ajouter une attaque"
  }

  addAttackContentToCard(currentCount);
}

function toggleAddButton(collectionHolder) {
  const currentCount = collectionHolder.querySelectorAll("li").length;
  const addButton = document.querySelector(".add_item_link");

  // Afficher le bouton si moins de 2 attaques
  if (currentCount < 2) {
    addButton.style.display = "block";
  }
}

function addAttackContentToCard(currentCount) {
  // Sélectionner tous les éléments des différentes raretés
  const cardContentHolo = document.querySelector(".attack-content-holo");
  const cardContentV = document.querySelector(".attack-content-v");
  const cardContentGold = document.querySelector(".attack-content-gold");
  const cardContentBasic = document.querySelector(".attack-content-basic");

  // Définitions des contenus à insérer pour chaque rareté
  const attackContentV = `
  <div class="flex flex-col w-full">
    <div class="flex justify-between w-full align-baseline">
      <div class="flex items-center gap-6">
        <div class="energies-${
          currentCount + 1
        } flex w-[60px] items-center gap-[2px]">
        </div>
        <p class="card-atk${
          currentCount + 1
        }-title font-GillSans font-sem text-[18px] leading-[18px] text-stroke">Attaque ${
    currentCount + 1
  }</p>
      </div>
      <p class="card-atk${
        currentCount + 1
      }-damage font-GillSans font-semibold text-[17px] leading-[18px] tracking-tighter text-stroke">0</p>
    </div>
    <p class="card-atk${
      currentCount + 1
    }-description font-GillSans font-medium text-[10px] text-stroke mt-1 break-words leading-none">Description ${
    currentCount + 1
  }</p>
  </div>`;

  const attackContentGold = `
  <div class="flex flex-col w-full">
    <div class="flex justify-between w-full align-baseline">
      <div class="flex items-center gap-6">
        <div class="energies-${
          currentCount + 1
        } flex w-[80px] items-center gap-[2px]"></div>
        <p class="card-atk${
          currentCount + 1
        }-title font-GillSans font-sem text-[18px] leading-[18px] text-stroke"></p>
      </div>
      <p class="card-atk${
        currentCount + 1
      }-damage font-GillSans font-semibold text-[17px] leading-[18px] tracking-tighter text-stroke"></p>
    </div>
    <p class="card-atk${
      currentCount + 1
    }-description font-GillSans font-medium text-[10px] text-stroke mt-1 break-words leading-none"></p>
  </div>`;

  const attackContentBasic = `
      <div class="flex flex-col w-full">
        <div class="flex justify-between w-full align-baseline">
          <div class="flex items-center gap-6">
            <div class="energies-${
              currentCount + 1
            } flex w-[60px] items-center gap-[2px]"></div>
            <p class="card-atk${
              currentCount + 1
            }-title font-GillSans font-sem text-[18px] leading-[18px]">Basic</p>
          </div>
          <p class="card-atk${
            currentCount + 1
          }-damage font-GillSans font-semibold text-[17px] leading-[18px] tracking-tighter">Basic Damage</p>
        </div>
        <p class="card-atk${
          currentCount + 1
        }-description font-GillSans font-medium text-[10px] mt-1 break-words leading-none">Basic description</p>
      </div>`;

  cardContentHolo.insertAdjacentHTML("beforeend", attackContentBasic);

  cardContentV.insertAdjacentHTML("beforeend", attackContentV);

  cardContentGold.insertAdjacentHTML("beforeend", attackContentGold);

  cardContentBasic.insertAdjacentHTML("beforeend", attackContentBasic);

  // Mettre à jour les titres après l'insertion des contenus
  if (currentCount === 0) {
    updateAtkTitles(1);
    updateAtkPower(1);
    updateAtkDescription(1);
    updateAtkCost(1);
  } else {
    updateAtkTitles(2);
    updateAtkPower(2);
    updateAtkDescription(2);
    updateAtkCost(2);
  }
}
