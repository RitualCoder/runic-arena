<?php

namespace App\Enum;

enum CardRarity: string
{
    case BASIC = 'Basique';
    case HOLO = 'Holographique';
    case V = 'V';
    case GOLD = 'Gold';
    case TRAINER = 'Trainer';
}
