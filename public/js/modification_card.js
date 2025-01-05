function initializeCardEvents() {
  // INFO DE LA CARTE //
  const card = document.querySelector(".card");
  const cardContainer = document.getElementById("card-test");
  if (!cardContainer) {
    console.error("Le DOM n'est pas prêt ou l'élément est manquant !");
    return;
  }

  if (cardContainer) {
    var cardTypeValue = cardContainer.dataset.cardTypeValue;
    var cardIdValue = cardContainer.dataset.cardIdValue;

    console.log("Type de la carte:", cardTypeValue);
    console.log("ID de la carte:", cardIdValue);
  } else {
    console.error("Élément #card-container non trouvé !");
  }

  // NOM //
  const inputName = document.getElementById("card_form_name");
  const nameDisplay = document.getElementById("card-name-display");

  if (!inputName || !nameDisplay) {
    console.error("Élément input ou affichage du nom non trouvé !");
  }

  inputName.addEventListener("input", function () {
    nameDisplay.textContent = inputName.value;
  });

  // PV //
  const inputHp = document.getElementById("card_form_hp");
  const hpDisplay = document.getElementById("card-hp-display");

  inputHp.addEventListener("input", function () {
    console.log(inputHp.value);
    hpDisplay.textContent = inputHp.value;
  });

  // TYPE DE LA CARTE //
  var cardTypeValue = "{{ card.type.value }}"; // Assurez-vous que la donnée est bien échappée
  console.log(cardTypeValue);
  const typeInput = document.getElementById("card_form_type");
  const cardImage = document.querySelector(
    'img[src^="/assets/template_cards/"]'
  );
  const energyImage = document.querySelector('img[src^="/assets/energies/"]');

  // Fonction pour mettre à jour l'image en fonction du type sélectionné
  function updateCardImage() {
    const selectedType = typeInput.value.toLowerCase(); // Récupérer la valeur sélectionnée et la mettre en minuscules
    const newSrc = `/assets/template_cards/basic/${selectedType}.png`; // Créer le chemin de l'image

    cardImage.src = newSrc;
    cardImage.alt = `${selectedType}.png`;
  }

  typeInput.addEventListener("change", updateCardImage);

  // IMAGE DE LA CARTE //
  const imageInput = document.getElementById("card_form_imageFile"); // L'input de fichier
  const cardImagePokemon = document.getElementById("card-image"); // L'élément <img> qui affiche l'image de la carte

  // Fonction pour prévisualiser l'image téléchargée
  imageInput.addEventListener("change", function (event) {
    const file = event.target.files[0]; // Récupère le premier fichier sélectionné

    if (file) {
      const reader = new FileReader();

      // Lorsque le fichier est chargé, on met à jour l'image
      reader.onload = function (e) {
        // On remplace la source de l'image avec le résultat du FileReader (une URL blob)
        cardImagePokemon.src = e.target.result;
      };

      // Lire le fichier comme une URL blob
      reader.readAsDataURL(file);
    }
  });

  // DESCRIPTION //
  const inputDescription = document.getElementById("card_form_description");
  const descriptionDisplay = document.getElementById(
    "card-description-display"
  );

  inputDescription.addEventListener("input", function () {
    descriptionDisplay.textContent = inputDescription.value;
  });

  // ATTAQUE 1//
  // titre
  const inputAttack1Title = document.getElementById(
    "card_form_attacks_0_title"
  );
  const attack1TitleDisplay = document.getElementById(
    "card-attack1-title-display"
  );

  if (inputAttack1Title && attack1TitleDisplay) {
    inputAttack1Title.addEventListener("input", function () {
      attack1TitleDisplay.textContent = inputAttack1Title.value;
    });
  }

  // Puissance
  const inputAttack1Damage = document.getElementById(
    "card_form_attacks_0_power"
  );
  const attack1DamageDisplay = document.getElementById(
    "card-attack1-damage-display"
  );

  if (inputAttack1Damage && attack1DamageDisplay) {
    inputAttack1Damage.addEventListener("input", function () {
      let value = inputAttack1Damage.value;

      // Si la valeur est supérieure à 999, la remettre à 999
      if (value > 999) {
        inputAttack1Damage.value = 999;
        attack1DamageDisplay.textContent = 999;
      }
      // Si la valeur est valide, mettre à jour l'affichage en temps réel
      else {
        attack1DamageDisplay.textContent = inputAttack1Damage.value;
      }
    });
  }

  // Description
  const inputAttack1Description = document.getElementById(
    "card_form_attacks_0_description"
  );
  const attack1DescriptionDisplay = document.getElementById(
    "card-attack1-description-display"
  );

  if (inputAttack1Description && attack1DescriptionDisplay) {
    inputAttack1Description.addEventListener("input", function () {
      attack1DescriptionDisplay.textContent = inputAttack1Description.value;
    });
  }

  // ATTAQUE 2 //
  // Titre
  const inputAttack2Title = document.getElementById(
    "card_form_attacks_1_title"
  );
  const attack2TitleDisplay = document.getElementById(
    "card-attack2-title-display"
  );

  if (inputAttack2Title && attack2TitleDisplay) {
    inputAttack2Title.addEventListener("input", function () {
      attack2TitleDisplay.textContent = inputAttack2Title.value;
    });
  }

  // Puissance
  const inputAttack2Damage = document.getElementById(
    "card_form_attacks_1_power"
  );
  const attack2DamageDisplay = document.getElementById(
    "card-attack2-damage-display"
  );

  if (inputAttack2Damage && attack2DamageDisplay) {
    inputAttack2Damage.addEventListener("input", function () {
      let value = inputAttack2Damage.value;

      // Si la valeur est supérieure à 999, la remettre à 999
      if (value > 999) {
        inputAttack2Damage.value = 999;
        attack2DamageDisplay.textContent = 999;
      }
      // Si la valeur est valide, mettre à jour l'affichage en temps réel
      else {
        attack2DamageDisplay.textContent = inputAttack2Damage.value;
      }
    });
  }

  // Description
  const inputAttack2Description = document.getElementById(
    "card_form_attacks_1_description"
  );
  const attack2DescriptionDisplay = document.getElementById(
    "card-attack2-description-display"
  );

  if (inputAttack2Description && attack2DescriptionDisplay) {
    inputAttack2Description.addEventListener("input", function () {
      attack2DescriptionDisplay.textContent = inputAttack2Description.value;
    });
  }

  // RARETÉ //
  const rarityInput = document.getElementById("card_form_rarity");
  rarityInput.addEventListener("change", function () {
    console.log(rarityInput.value);
    const selectedRarity = rarityInput.value.toLowerCase();

    // Effectuer une requête GET pour récupérer le bloc de rareté
    fetch(`/card/rarity/${selectedRarity}/${cardIdValue}`)
      .then((response) => response.text())
      .then((data) => {
        cardContainer.innerHTML = data;
        initializeCardEvents();
        initializeCardInteractions(card);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération de la rareté:", error)
      );
  });
}

initializeCardEvents();
