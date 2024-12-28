<?php

namespace App\Enum;

enum CardRarity: string
{
    case BASIC = 'basic';
    case HOLO = 'holo';
    case V = 'v';
    case GOLD = 'gold';
    case TRAINER = 'trainer';
}
