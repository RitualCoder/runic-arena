// Récupérer l'élément contenant les données
const chartDataElement = document.getElementById("chart-data");

// Extraire les données JSON des attributs `data-*`
const cardsByRarity = JSON.parse(chartDataElement.getAttribute("data-rarity"));
const cardsByType = JSON.parse(chartDataElement.getAttribute("data-type"));

// Transformer les données pour Chart.js
const rarityLabels = cardsByRarity.map((item) => item.rarity);
const rarityData = cardsByRarity.map((item) => item.rarityCount);

const typeLabels = cardsByType.map((item) => item.type);
const typeData = cardsByType.map((item) => item.typeCount);

// Couleurs pour les graphiques
const colors = [
  "rgba(255, 99, 132, 0.7)",
  "rgba(54, 162, 235, 0.7)",
  "rgba(255, 206, 86, 0.7)",
  "rgba(75, 192, 192, 0.7)",
  "rgba(153, 102, 255, 0.7)",
  "rgba(255, 159, 64, 0.7)",
];

// Graphique pour la rareté
new Chart(document.getElementById("rarityChart"), {
  type: "doughnut",
  data: {
    labels: rarityLabels,
    datasets: [
      {
        data: rarityData,
        backgroundColor: colors,
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.label + ": " + tooltipItem.raw + " cartes";
          },
        },
      },
    },
  },
});

// Graphique pour les types
new Chart(document.getElementById("typeChart"), {
  type: "doughnut",
  data: {
    labels: typeLabels,
    datasets: [
      {
        data: typeData,
        backgroundColor: colors,
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.label + ": " + tooltipItem.raw + " cartes";
          },
        },
      },
    },
  },
});
