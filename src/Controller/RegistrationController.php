<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\RegistrationFormType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Bundle\SecurityBundle\Security;

class RegistrationController extends AbstractController
{
    #[Route('/register', name: 'app_register')]
    public function register(Request $request, UserPasswordHasherInterface $userPasswordHasher, EntityManagerInterface $entityManager, Security $security): Response
    {
        if ($this->getUser()) {
            return $this->redirectToRoute('home');
        }

        $user = new User();
        $form = $this->createForm(RegistrationFormType::class, $user);
        $form->handleRequest($request);

        $error = null;

        // Vérification si l'email est déjà pris
        if ($form->isSubmitted() && $form->isValid()) {
            $email = $form->get('email')->getData();
            $existingUser = $entityManager->getRepository(User::class)->findOneBy(['email' => $email]);

            if ($existingUser) {
                // L'email est déjà pris, donc on crée une erreur
                $error = "Cet email est déjà utilisé. Veuillez en choisir un autre.";
            } else {
                $plainPassword = $form->get('plainPassword')->getData();

                $user->setPassword($userPasswordHasher->hashPassword($user, $plainPassword));
                $user->setRoles(['ROLE_USER']);

                $entityManager->persist($user);
                $entityManager->flush();

                $security->login($user, 'form_login', 'main');

                return $this->redirectToRoute('home');
            }
        }

        return $this->render('auth/register.html.twig', [
            'title' => 'Runic - Inscription',
            'registrationForm' => $form,
            'error' => $error,
        ]);
    }
}
