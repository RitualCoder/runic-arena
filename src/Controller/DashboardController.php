<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Card;

class DashboardController extends AbstractController
{
    #[Route('/dashboard', name: 'app_dashboard')]
    public function index(Security $security, EntityManagerInterface $em): Response
    {
        // Récupérer l'utilisateur authentifié
        $user = $security->getUser();

        // Nombre total de cartes
        $totalCards = $em->getRepository(Card::class)->count([]);

        // Nombre de cartes par rareté
        $cardsByRarity = $em->getRepository(Card::class)
            ->createQueryBuilder('c')
            ->select('c.rarity, COUNT(c.id) as rarityCount')
            ->groupBy('c.rarity')
            ->getQuery()
            ->getResult();

        // Nombre de cartes par type
        $cardsByType = $em->getRepository(Card::class)
            ->createQueryBuilder('c')
            ->select('c.type, COUNT(c.id) as typeCount')
            ->groupBy('c.type')
            ->getQuery()
            ->getResult();

        return $this->render('dashboard/index.html.twig', [
            'controller_name' => 'DashboardController',
            'totalCards' => $totalCards,
            'cardsByRarity' => $cardsByRarity,
            'cardsByType' => $cardsByType,
        ]);
    }
}
