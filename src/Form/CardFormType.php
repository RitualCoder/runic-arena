<?php

namespace App\Form;

use App\Entity\Card;
use App\Enum\CardCategory;
use App\Enum\CardRarity;
use App\Enum\CardType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Validator\Constraints as Assert;

class CardFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('name', TextType::class, [
                'label' => 'Nom',
                'attr' => [
                    'placeholder' => 'Entrez un nom',
                    'maxlength' => 12,
                    'class' => 'w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary focus:outline-none transition duration-200 ease-in-out mb-4',
                ],
                'mapped' => true,
                'required' => true,
            ])
            ->add('type', ChoiceType::class, [
                'choices' => array_combine(
                    array_map(fn($case) => ucfirst(strtolower($case->name)), CardType::cases()),
                    CardType::cases()
                ),
                'choice_label' => fn($choice) => ucfirst(strtolower($choice->value)),
                'choice_value' => fn($choice) => $choice ? $choice->name : null,
                'required' => true,
                'attr' => [
                    'class' => 'w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary focus:outline-none transition duration-200 ease-in-out mb-4',
                ],
            ])
            ->add('rarity', ChoiceType::class, [
                'label' => 'Rareté',
                'choices' => array_combine(
                    array_map(fn($case) => ucfirst(strtolower($case->name)), CardRarity::cases()),
                    CardRarity::cases()
                ),
                'choice_label' => fn($choice) => ucfirst(strtolower($choice->value)),
                'choice_value' => fn($choice) => $choice ? $choice->name : null,
                'required' => true,
                'attr' => [
                    'class' => 'w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary focus:outline-none transition duration-200 ease-in-out mb-4',
                ],
            ])
            ->add('hp', TextType::class, [
                'label' => 'Points de vie',
                'attr' => [
                    'placeholder' => 'Entrez un nombre',
                    'class' => 'w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary focus:outline-none transition duration-200 ease-in-out mb-4',
                    'maxlength' => 3,  // Limite à 3 caractères
                    'pattern' => '^[1-9][0-9]{0,2}$', // Regular expression to allow only numbers between 1 and 999
                ],
                'mapped' => true,
                'required' => true,
            ])
            ->add('imageFile', FileType::class, [
                'label' => 'Image (PNG, JPG)',
                'required' => false,
                'mapped' => true,
                'attr' => [
                    'accept' => 'image/*',
                    'class' => 'w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary focus:outline-none transition duration-200 ease-in-out mb-4',
                ],
            ])
            ->add('description', TextareaType::class, [
                'label' => 'Description',
                'required' => true,
                'attr' => [
                    'readonly' => false,
                    'rows' => 3,
                    'maxlength' => 120,
                    'class' => 'w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary focus:outline-none transition duration-200 ease-in-out mb-4',
                    'style' => 'resize: none; white-space: pre-wrap;',
                ],
            ])

            // Ajoutez la collection d'attaques
            ->add('attacks', CollectionType::class, [
                'label' => false,
                'entry_type' => AttackFormType::class, // Le type de formulaire pour chaque attaque
                'entry_options' => ['label' => false],
                'allow_add' => true, // Permet d'ajouter dynamiquement des attaques
                'by_reference' => false, // Assurez-vous que les attaques sont traitées comme des entités distinctes
                'prototype' => true, // Permet de générer un prototype d'attaque
            ]);
    }


    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Card::class,
        ]);
    }
}
