<?php

namespace App\Form;

use App\Entity\Card;
use App\Enum\CardCategory;
use App\Enum\CardType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;

class CardFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('name')
            ->add('type', ChoiceType::class, [
                'choices' => array_combine(
                    array_map(fn($case) => ucfirst(strtolower($case->name)), CardType::cases()),
                    CardType::cases()
                ),
                'choice_label' => fn($choice) => ucfirst(strtolower($choice->name)),
                'choice_value' => fn($choice) => $choice ? $choice->value : null,
                'placeholder' => 'Choisir...',
                'required' => false,
            ])
            ->add('power')
            ->add('category', ChoiceType::class, [
                'choices' => array_combine(
                    array_map(fn($case) => ucfirst(strtolower($case->name)), CardCategory::cases()),
                    CardCategory::cases()
                ),
                'choice_label' => fn($choice) => ucfirst(strtolower($choice->name)),
                'choice_value' => fn($choice) => $choice ? $choice->value : null,
                'placeholder' => 'Choisir...',
                'required' => false,
            ])
            ->add('Enregistrer', SubmitType::class);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Card::class,
        ]);
    }
}
