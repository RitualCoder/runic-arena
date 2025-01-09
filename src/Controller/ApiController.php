<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Attribute\Route;
use App\Repository\CardRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

class ApiController extends AbstractController
{
    #[Route('/api/cards', name: 'api_cards')]
    public function index(CardRepository $cardRepository, SerializerInterface $serializer): JsonResponse
    {
        $cards = $cardRepository->findAll();

        $context = [
            AbstractNormalizer::IGNORED_ATTRIBUTES => [
                'card',
                'user',
                'id',
                'imageFile',
                'updatedAt',
            ],
        ];

        $cardsJson = $serializer->serialize($cards, 'json', $context);

        $cardsArray = json_decode($cardsJson, true);

        foreach ($cardsArray as &$card) {
            if (isset($card['imagePath'])) {
                $card['imagePath'] = 'http://localhost:8000/images/cards/' . $card['imagePath'];
            }
        }

        return $this->json($cardsArray);
    }
}
