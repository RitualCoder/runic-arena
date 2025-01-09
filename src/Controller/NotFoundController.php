<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;


class NotFoundController extends AbstractController
{
    #[Route('/error404', name: 'app_404')]
    public function notFound(): Response
    {
        return $this->render('error404.html.twig');
    }
}
