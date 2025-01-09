<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Card;
use App\Repository\CardRepository;
use Symfony\UX\Chartjs\Builder\ChartBuilderInterface;
use Symfony\UX\Chartjs\Model\Chart;

class DashboardController extends AbstractController
{
    #[Route('/dashboard', name: 'app_dashboard')]
    public function index(CardRepository $cardRepository, ChartBuilderInterface $chartBuilder): Response
    {
        // Récupérer toutes les cartes
        $cards = $cardRepository->findAll();

        $totalCards = count($cards);

        // Récupérer les données par rareté et par type
        $cardsByRarity = $cardRepository->countCardsByRarity();
        $cardsByType = $cardRepository->countCardsByType();

        // Préparer les données pour Chart.js
        $rarityLabels = array_map(fn($item) => $item['rarity']->value, $cardsByRarity);
        $rarityData = array_map(fn($item) => $item['rarityCount'], $cardsByRarity);

        $typeLabels = array_map(fn($item) => $item['type']->value, $cardsByType);
        $typeData = array_map(fn($item) => $item['typeCount'], $cardsByType);

        // Couleurs spécifiques pour les types
        $typeColors = [
            'Feu' => 'rgba(255, 69, 0, 0.7)',        // Rouge
            'Eau' => 'rgba(54, 162, 235, 0.7)',     // Bleu
            'Plante' => 'rgba(50, 168, 82, 0.7)',  // Vert pomme
            'Psy' => 'rgba(153, 102, 255, 0.7)',    // Violet
            'Normal' => 'rgba(169, 169, 169, 0.7)', // Gris
            'Électrique' => 'rgba(255, 206, 86, 0.7)', // Jaune
            'Combat' => 'rgba(139, 69, 19, 0.7)',   // Marron foncé
            'Obscur' => 'rgba(0, 0, 0, 0.7)',       // Noir
            'Dragon' => 'rgba(210, 180, 140, 0.7)', // Marron clair
        ];

        $typeBackgroundColors = array_map(fn($label) => $typeColors[$label] ?? 'rgba(0, 0, 0, 0.7)', $typeLabels);

        // Couleurs pour les graphiques
        $colors = [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(255, 159, 64, 0.7)',
        ];

        // Créer le graphique pour les raretés
        $chartRarity = $chartBuilder->createChart(Chart::TYPE_DOUGHNUT);
        $chartRarity->setData([
            'labels' => $rarityLabels,
            'datasets' => [
                [
                    'label' => 'Cartes par rareté',
                    'data' => $rarityData,
                    'backgroundColor' => $colors,
                    'borderWidth' => 1,
                ],
            ],
        ]);
        $chartRarity->setOptions([
            'responsive' => true,
            'plugins' => [
                'legend' => [
                    'position' => 'top',
                ],
            ],
        ]);

        // Créer le graphique pour les types
        $chartType = $chartBuilder->createChart(Chart::TYPE_DOUGHNUT);
        $chartType->setData([
            'labels' => $typeLabels,
            'datasets' => [
                [
                    'label' => 'Cartes par type',
                    'data' => $typeData,
                    'backgroundColor' => $typeBackgroundColors,
                    'borderWidth' => 1,
                ],
            ],
        ]);
        $chartType->setOptions([
            'responsive' => true,
            'plugins' => [
                'legend' => [
                    'position' => 'top',
                ],
            ],
        ]);

        return $this->render('dashboard/index.html.twig', [
            'controller_name' => 'DashboardController',
            'totalCards' => $totalCards,
            'chartRarity' => $chartRarity,
            'chartType' => $chartType,
        ]);
    }
}
