<?php

namespace App\Enum;

enum CardType: string
{
    case FIRE = 'Feu';
    case WATER = 'Eau';
    case GRASS = 'Plante';
    case PSYCHIC = 'Psy';
    case NORMAL = 'Normal';
    case ELECTRIC = 'Électrique';
    case FIGHTING = 'Combat';
    case DARK = 'Obscur';
    case DRAGON = 'Dragon';
}
