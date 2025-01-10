<?php

// src/Service/RandomNameGenerator.php
namespace App\Service;

class RandomNameGenerator
{
    private array $prefixes;
    private array $roots;
    private array $suffixes;

    public function __construct()
    {
        $this->prefixes = [
            'Fl',
            'Th',
            'Sn',
            'Dr',
            'Bl',
            'Gr',
            'Pyro',
            'Aqua',
            'Luma',
            'Electro',
            'Stry',
            'Veno'
        ];

        $this->roots = [
            'aqua',
            'flare',
            'breeze',
            'shadow',
            'frost',
            'spark',
            'vortex',
            'storm',
            'puff',
            'lume',
            'claw',
            'glim',
            'plume',
            'snout',
            'tail',
            'fang',
            'wing'
        ];

        $this->suffixes = [
            'on',
            'a',
            'oid',
            'us',
            'ar',
            'er',
            'i',
            'zard',
            'lith',
            'ium',
            'ly',
            'ver',
            'orb'
        ];
    }

    public function generate(): string
    {
        // Choisir un préfixe, une racine, et un suffixe de manière aléatoire
        $prefix = $this->prefixes[array_rand($this->prefixes)];
        $root = $this->roots[array_rand($this->roots)];
        $suffix = $this->suffixes[array_rand($this->suffixes)];

        // Concaténer les trois éléments pour former le nom
        $name = $prefix . $root . $suffix;

        // Retourner le nom généré
        return ucfirst($name); // Première lettre en majuscule pour avoir un nom propre
    }
}
