<?php

// src/Service/RandomNameGenerator.php
namespace App\Service;

class RandomNameGenerator
{
    private array $names;

    public function __construct()
    {
        $this->names = [
            "Glimmershard",
            "Thornickel",
            "Frillapuff",
            "Flaroona",
            "Frozagoon",
            "Plasmaflare",
            "Breezechomp",
            "Quilgora",
            "Drifloom",
            "Snazzletooth",
            "Squidgloom",
            "Glimmerdust",
            "Frostbite",
            "Flamefrost",
            "Breezeflare",
        ];
    }

    public function generate(): string
    {
        return $this->names[array_rand($this->names)];
    }
}
