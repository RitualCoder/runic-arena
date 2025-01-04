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
                'choice_label' => fn($choice) => ucfirst(strtolower($choice->value)),
                'choice_value' => fn($choice) => $choice ? $choice->name : null,
                'required' => true,
            ])

            ->add('rarity', ChoiceType::class, [
                'choices' => array_combine(
                    array_map(fn($case) => ucfirst(strtolower($case->name)), CardRarity::cases()),
                    CardRarity::cases()
                ),
                'choice_label' => fn($choice) => ucfirst(strtolower($choice->value)),
                'choice_value' => fn($choice) => $choice ? $choice->name : null,
                'required' => true,
            ])

            ->add('hp', TextType::class, [
                'label' => 'Points de vie',
                'attr' => [
                    'placeholder' => 'Entrez un nombre',
                ],
                'mapped' => true,
                'required' => true,
            ])

            ->add('imageFile', FileType::class, [
                'label' => 'Image de la carte (PNG, JPG)',
                'required' => false,
                'mapped' => true,
                'attr' => [
                    'accept' => 'image/*',
                ],
            ])
            ->add('description', TextType::class, [
                'label' => 'Description de la carte',
                'attr' => [
                    'placeholder' => 'Entrez une description',
                ],
                'mapped' => true,
                'required' => true,
            ])

            ->add('attacks', CollectionType::class, [
                'entry_type' => AttackFormType::class,
                'entry_options' => ['label' => false],
                'allow_add' => true,
                'allow_delete' => true,
                'by_reference' => false,
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Card::class,
        ]);
    }
}
