document
  .getElementById("generate-name-button")
  .addEventListener("click", function (e) {
    e.preventDefault(); // Empêche le comportement par défaut du bouton (soumission du formulaire)

    const url = document
      .getElementById("generate-name-button")
      .getAttribute("data-url");

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const cardName = document.querySelectorAll(".card-name");

        document.getElementById("card_form_name").value = data.name;

        cardName.forEach((element) => {
          element.innerHTML = data.name;
        });
      })
      .catch((error) => {
        console.error("Erreur:", error);
      });
  });
