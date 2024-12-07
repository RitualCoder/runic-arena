<?php

namespace App\Enum;

enum CardCategory: string
{
    case MAGE = 'mage';
    case HEALER = 'healer';
    case WARRIOR = 'warrior';
    case ARCHER = 'archer';
    case ASSASSIN = 'assassin';
}
