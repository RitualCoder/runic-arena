<?php

namespace App\Form;

use App\Entity\Card;
use App\Enum\CardCategory;
use App\Enum\CardType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;

class CardFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('name', TextType::class, [
                'label' => 'Nom de la carte',
                'attr' => [
                    'placeholder' => 'Entrez un nom',
                ],
                'mapped' => true,
                'required' => true,
            ])

            ->add('type', ChoiceType::class, [
                'choices' => array_combine(
                    array_map(fn($case) => ucfirst(strtolower($case->name)), CardType::cases()),
                    CardType::cases()
                ),
                'choice_label' => fn($choice) => ucfirst(strtolower($choice->name)),
                'choice_value' => fn($choice) => $choice ? $choice->value : null,
                'placeholder' => 'Choisir...',
                'required' => true,
            ])
            ->add('pv')
            ->add('imageFile', FileType::class, [
                'label' => 'Image de la carte (PNG, JPG)',
                'required' => false,
                'mapped' => true,
                'attr' => [
                    'accept' => 'image/*',
                ],
            ])
            // Sous-formulaire pour les attaques
            ->add('attacks', CollectionType::class, [
                'entry_type' => AttackFormType::class, // Utilisation d'un autre formulaire pour les attaques
                'allow_add' => true, // Permet d'ajouter dynamiquement des attaques si nécessaire
                'allow_delete' => true, // Permet de supprimer des attaques si nécessaire
                'by_reference' => false, // Obligatoire pour les relations OneToMany ou ManyToMany
                'label' => false, // Pas de label pour le champ collection
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Card::class,
        ]);
    }
}
