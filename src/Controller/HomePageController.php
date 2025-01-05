<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Card;

class HomePageController extends AbstractController
{
    #[Route('/', name: 'home')]
    public function index(EntityManagerInterface $em): Response
    {
        // Récupère la première carte en fonction de la date de création
        $showcaseCard = $em->getRepository(Card::class)->findOneBy([], ['updatedAt' => 'ASC']);

        $threeLastCards = $em->getRepository(Card::class)->findBy([], ['updatedAt' => 'DESC'], 3);

        return $this->render('index.html.twig', [
            'showcaseCard' => $showcaseCard,
            'threeLastCards' => $threeLastCards,
        ]);
    }
}
