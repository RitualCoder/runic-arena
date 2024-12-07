<?php

namespace App\Entity;

use App\Enum\CardCategory;
use App\Enum\CardType;
use App\Repository\CardRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CardRepository::class)]
class Card
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(enumType: CardType::class)]
    private ?CardType $type = null;

    #[ORM\Column]
    private ?int $power = null;

    #[ORM\Column(enumType: CardCategory::class)]
    private ?CardCategory $category = null;

    #[ORM\ManyToOne(inversedBy: 'cards')]
    private ?User $user = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getType(): ?CardType
    {
        return $this->type;
    }

    public function setType(CardType $type): static
    {
        $this->type = $type;

        return $this;
    }

    public function getPower(): ?int
    {
        return $this->power;
    }

    public function setPower(int $power): static
    {
        $this->power = $power;

        return $this;
    }

    public function getCategory(): ?CardCategory
    {
        return $this->category;
    }

    public function setCategory(?CardCategory $category): static
    {
        $this->category = $category;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }
}
