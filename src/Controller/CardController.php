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

class CardController extends AbstractController
{
    #[Route('/cards', name: 'app_card')]
    public function index(EntityManagerInterface $em, Security $security): Response
    {

        $user = $security->getUser();
        $cards = $em->getRepository(Card::class)->findBy(['user' => $user]);

        return $this->render('card/index.html.twig', [
            'cards' => $cards,
        ]);
    }


    #[Route('/card/create', name: 'app_card_create')]
    public function create(Request $request, EntityManagerInterface $em, Security $security): Response
    {
        $card = new Card();
        $form = $this->createForm(CardFormType::class, $card);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $user = $security->getUser();

            $card->setUser($user);
            $em->persist($card);
            $em->flush();

            return $this->redirectToRoute('home');
        }

        return $this->render('card/create.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    #[Route('/card/{id}/edit', name: 'app_card_edit')]
    public function edit(int $id, Request $request, EntityManagerInterface $em): Response
    {
        // Chercher explicitement la carte
        $card = $em->getRepository(Card::class)->find($id);

        if (!$card) {
            throw $this->createNotFoundException('Carte introuvable');
        }

        $form = $this->createForm(CardFormType::class, $card);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em->flush();

            return $this->redirectToRoute('app_card');
        }

        return $this->render('card/edit.html.twig', [
            'form' => $form->createView(),
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

        $em->remove($card);
        $em->flush();

        // Redirigez l'utilisateur vers la liste des cartes
        return $this->redirectToRoute('app_card');
    }
}
