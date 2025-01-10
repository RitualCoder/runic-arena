<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Card;
use App\Form\CardFormType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\SecurityBundle\Security;
use App\Service\RandomNameGenerator;
use App\Enum\CardRarity;
use App\Enum\CardType;

class CardController extends AbstractController
{
    private $randomNameGenerator;

    public function __construct(RandomNameGenerator $randomNameGenerator)
    {
        $this->randomNameGenerator = $randomNameGenerator;
    }

    #[Route('/cards', name: 'app_cards')]
    public function index(EntityManagerInterface $em, Security $security): Response
    {
        $user = $security->getUser();

        // Vérifiez si l'utilisateur a le rôle ROLE_ADMIN
        if ($security->isGranted('ROLE_ADMIN')) {
            // L'utilisateur admin peut voir toutes les cartes
            $cards = $em->getRepository(Card::class)->findAll();
        } else {
            // Les autres utilisateurs ne voient que leurs propres cartes
            $cards = $em->getRepository(Card::class)->findBy(['user' => $user]);
        }

        return $this->render('card/index.html.twig', [
            'cards' => $cards,
        ]);
    }


    #[Route('/card/create', name: 'app_card_create')]
    public function create(Request $request, EntityManagerInterface $em, Security $security): Response
    {
        $card = new Card();

        // Initialisation des valeurs de la carte par défaut
        $card->setName('');
        $card->setDescription('');
        $card->setHp(0);
        $card->setRarity(CardRarity::BASIC);
        $card->setType(CardType::NORMAL);

        $formCard = $this->createForm(CardFormType::class, $card);

        $formCard->handleRequest($request);

        if ($formCard->isSubmitted() && $formCard->isValid()) {
            // Récupération de l'utilisateur connecté
            $user = $security->getUser();
            $card->setUser($user);

            // Sauvegarde de la carte
            $em->persist($card);
            $em->flush();

            // Associer les attaques à la carte et les enregistrer
            foreach ($card->getAttacks() as $attack) {
                $attack->setCard($card);
                $em->persist($attack);
            }
            $em->flush();

            return $this->redirectToRoute('app_cards');
        }

        return $this->render('card/create.html.twig', [
            'formCard' => $formCard->createView(),
            'card' => $card,
        ]);
    }

    #[Route('/card/{id}/edit', name: 'app_card_edit')]
    public function edit(int $id, Request $request, EntityManagerInterface $em): Response
    {
        $card = $em->getRepository(Card::class)->find($id);

        if (!$card) {
            throw $this->createNotFoundException('Carte introuvable');
        }

        $form = $this->createForm(CardFormType::class, $card);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em->persist($card);
            $em->flush();

            return $this->redirectToRoute('app_cards');
        }

        return $this->render('card/edit.html.twig', [
            'formCard' => $form->createView(),
            'card' => $card,
        ]);
    }

    #[Route('/card/{id}/delete', name: 'app_card_delete', methods: ['POST'])]
    public function delete(Card $card, Request $request, EntityManagerInterface $em, Security $security): Response
    {
        $user = $security->getUser();

        // Vérifiez que l'utilisateur connecté est bien le propriétaire de la carte
        if ($card->getUser() !== $user) {
            throw $this->createAccessDeniedException('Vous n\'avez pas le droit de supprimer cette carte.');
        }

        // Supprimer la carte
        $em->remove($card);
        $em->flush();

        // Rediriger l'utilisateur vers la liste des cartes
        return $this->redirectToRoute('app_cards');
    }

    // Injection du service RandomNameGenerator
    #[Route('/generate-card-name', name: 'generate_card_name', methods: ['GET'])]
    public function generateName(): Response
    {
        $name = $this->randomNameGenerator->generate();

        return $this->json(['name' => $name]);
    }
}
