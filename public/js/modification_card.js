function updateAtkTitles(index) {
  const atkTitles = document.querySelectorAll(`.card-atk${index}-title`);
  const inputAttackTitle = document.getElementById(
    `card_form_attacks_${index - 1}_title`
  );

  if (!inputAttackTitle) {
    return;
  }

  inputAttackTitle.value = inputAttackTitle.value || `Attaque ${index}`;

  inputAttackTitle.addEventListener("input", function () {
    atkTitles.forEach(function (atkTitle) {
      atkTitle.textContent = inputAttackTitle?.value || "";
    });
  });
}

function updateAtkPower(index) {
  const atkPowers = document.querySelectorAll(`.card-atk${index}-damage`);
  const inputAttackPower = document.getElementById(
    `card_form_attacks_${index - 1}_power`
  );

  if (!inputAttackPower) {
    return;
  }

  inputAttackPower.value = inputAttackPower.value || 0;

  if (atkPowers.length > 0) {
    // Vérifie si les éléments existent
    inputAttackPower.addEventListener("input", function () {
      let value = parseInt(inputAttackPower.value, 10); // Assure-toi que la valeur est un nombre entier

      // Si la valeur est supérieure à 999, la remettre à 999
      if (value > 999) {
        inputAttackPower.value = 999;
        value = 999;
      }

      // Mettre à jour l'affichage en temps réel pour tous les éléments .card-atk{index}-power
      atkPowers.forEach(function (atkPower) {
        atkPower.textContent = value;
      });
    });
  }
}

function updateAtkDescription(index) {
  const atkDescriptions = document.querySelectorAll(
    `.card-atk${index}-description`
  );
  const inputAttackDescription = document.getElementById(
    `card_form_attacks_${index - 1}_description`
  );

  if (!inputAttackDescription) {
    return;
  }

  inputAttackDescription.value =
    inputAttackDescription.value || `Description ${index}`;

  inputAttackDescription.addEventListener("input", function () {
    atkDescriptions.forEach(function (atkDescription) {
      atkDescription.textContent = inputAttackDescription.value;
    });
  });
}

function updateAtkCost(index) {
  const energyInput = document.getElementById(
    `card_form_attacks_${index - 1}_cost`
  );

  const energyContainers = document.querySelectorAll(`.energies-${index}`);

  const cardContentV = document.querySelector(".attack-content-v");
  const type = cardContentV.dataset?.energy || "normal";

  if (!energyInput) {
    return;
  }

  energyInput.value = energyInput.value || 0;

  energyInput.addEventListener("input", function () {
    let cost = parseInt(energyInput.value, 10) || 0;

    energyContainers.forEach((container) => {
      const currentEnergies = container.querySelectorAll(".atk-energy");
      const currentCount = currentEnergies.length;

      if (currentCount < cost) {
        // Ajouter des énergies si nécessaire
        for (let i = currentCount; i < cost; i++) {
          const newEnergy = document.createElement("img");

          newEnergy.src = `/assets/energies/${type}.png`;
          newEnergy.alt = "energy.png";
          newEnergy.classList.add(
            "atk-energy",
            "w-[17.5px]",
            "h-[17.5px]",
            "rounded-full"
          );
          container.appendChild(newEnergy);
        }
      } else if (currentCount > cost) {
        // Supprimer des énergies si nécessaire
        for (let i = currentCount - 1; i >= cost; i--) {
          if (container.contains(currentEnergies[i])) {
            container.removeChild(currentEnergies[i]);
          }
        }
      }
    });
  });
}

function initializeCardEvents() {
  // INFO DE LA CARTE //
  const cardContainer = document.getElementById("card-test");
  if (!cardContainer) {
    console.error("Le DOM n'est pas prêt ou l'élément est manquant !");
    return;
  }

  let rarity;
  const energyContainers = document.querySelectorAll(".energies");
  let type = energyContainers[0]?.dataset.energy || "normal";

  // NOM //
  const inputName = document.getElementById("card_form_name");
  const cardNames = document.querySelectorAll(".card-name");

  inputName.addEventListener("input", function () {
    cardNames.forEach(function (cardName) {
      cardName.textContent = inputName.value;
    });
  });

  // PV //
  const inputHp = document.getElementById("card_form_hp");
  const cardHps = document.querySelectorAll(".card-hp");

  inputHp.addEventListener("input", function () {
    cardHps.forEach(function (cardHp) {
      cardHp.textContent = inputHp.value;
    });
  });

  // TYPE DE LA CARTE //
  function updateEnergy() {
    const cardBackgroundType = document.querySelectorAll(".card-type");
    const energies = Array.from(document.querySelectorAll("img")).filter(
      (img) => img.src.includes("/assets/energies")
    );

    const selectedType = typeInput.value.toLowerCase(); // Récupérer la valeur sélectionnée et la mettre en minuscules
    const newBackgroundSrc = `/assets/template_cards/basic/${selectedType}.png`; // Créer le chemin de l'image
    const newEnergySrc = `/assets/energies/${selectedType}.png`;

    type = selectedType;

    cardBackgroundType.forEach(function (typeImage) {
      typeImage.src = newBackgroundSrc;
      typeImage.alt = `${selectedType}.png`;
    });

    energies.forEach(function (energy) {
      energy.src = newEnergySrc;
    });
  }

  const typeInput = document.getElementById("card_form_type");
  typeInput.addEventListener("change", updateEnergy);

  // IMAGE DE LA CARTE //
  const imageInput = document.getElementById("card_form_imageFile");

  // Fonction pour prévisualiser l'image téléchargée
  imageInput.addEventListener("change", function (event) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      // Lorsque le fichier est chargé, on met à jour l'image
      reader.onload = function (e) {
        const cardImages = document.querySelectorAll(".card-img");

        // Pour chaque image, on change la source de l'image
        cardImages.forEach(function (cardImage) {
          cardImage.src = e.target.result;
        });
      };

      reader.readAsDataURL(file);
    }
  });

  // DESCRIPTION //
  const inputDescription = document.getElementById("card_form_description");
  const cardDescriptions = document.querySelectorAll(".card-description");

  inputDescription.addEventListener("input", function () {
    cardDescriptions.forEach(function (cardDescription) {
      cardDescription.textContent = inputDescription.value;
    });
  });

  // ATTAQUE 1//
  // titre
  let atk1Titles = document.querySelectorAll(".card-atk1-title");

  if (atk1Titles) {
    updateAtkTitles(1);
  }

  // Puissance
  const atk1Damages = document.querySelectorAll(".card-atk1-damage");
  if (atk1Damages) {
    updateAtkPower(1);
  }

  // Description
  const atk1Descriptions = document.querySelectorAll(".card-atk1-description");

  if (atk1Descriptions) {
    updateAtkDescription(1);
  }

  // Coût
  if (energyContainers && type) {
    updateAtkCost(1);
  }

  // ATTAQUE 2 //
  // titre
  const atk2Titles = document.querySelectorAll(".card-atk2-title");

  if (atk2Titles) {
    updateAtkTitles(2);
  }

  // Puissance
  const atk2Damages = document.querySelectorAll(".card-atk2-damage");
  if (atk2Damages) {
    updateAtkPower(2);
  }

  // Description
  const atk2Descriptions = document.querySelectorAll(".card-atk2-description");

  if (atk2Descriptions) {
    updateAtkDescription(2);
  }

  // Côut
  if (energyContainers && type) {
    updateAtkCost(2);
  }

  // RARETÉ //
  const cardHolo = document.getElementById("card-holo");
  const cardV = document.getElementById("card-v");
  const cardBasic = document.getElementById("card-basic");
  const cardGold = document.getElementById("card-gold");

  const rarityInput = document.getElementById("card_form_rarity");

  rarityInput.addEventListener("change", function () {
    const selectedRarity = rarityInput.value.toLowerCase();
    rarity = selectedRarity;

    // Masquer tous les éléments
    cardHolo.classList.add("hidden");
    cardV.classList.add("hidden");
    cardBasic.classList.add("hidden");
    cardGold.classList.add("hidden");

    // Afficher l'élément correspondant à la rareté sélectionnée
    if (selectedRarity === "holographic") {
      cardHolo.classList.remove("hidden");
    } else if (selectedRarity === "v") {
      cardV.classList.remove("hidden");
    } else if (selectedRarity === "basic") {
      cardBasic.classList.remove("hidden");
    } else if (selectedRarity === "gold") {
      cardGold.classList.remove("hidden");
    }
  });
}

initializeCardEvents();
