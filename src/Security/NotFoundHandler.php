<?php

namespace App\Security;

use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;

class NotFoundHandler
{
    public function __construct(
        private UrlGeneratorInterface $urlGenerator,
    ) {}

    public function handle(ExceptionEvent $event): void
    {
        $exception = $event->getThrowable();

        // Vérifie si l'exception est une 404
        if ($exception instanceof NotFoundHttpException) {
            // Redirige vers la page d'accueil
            $response = new RedirectResponse($this->urlGenerator->generate('app_404'));
            $event->setResponse($response);
        }
    }
}
