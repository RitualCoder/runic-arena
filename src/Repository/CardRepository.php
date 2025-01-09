<?php

namespace App\Repository;

use App\Entity\Card;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Card>
 */
class CardRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Card::class);
    }

    public function countCardsByRarity(): array
    {
        $qb = $this->createQueryBuilder('c')
            ->select('c.rarity, COUNT(c.id) as rarityCount')
            ->groupBy('c.rarity')
            ->getQuery()
            ->getResult();

        return $qb;
    }

    public function countCardsByType(): array
    {
        $qb = $this->createQueryBuilder('c')
            ->select('c.type, COUNT(c.id) as typeCount')
            ->groupBy('c.type')
            ->getQuery()
            ->getResult();

        return $qb;
    }
}
