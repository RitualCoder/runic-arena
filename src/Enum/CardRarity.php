<?php

namespace App\Enum;

enum CardRarity: string
{
    case BASIC = 'Basic';
    case HOLO = 'Holographic';
    case V = 'V';
    case GOLD = 'Gold';
    case TRAINER = 'Trainer';
}
