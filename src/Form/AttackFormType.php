<?php

namespace App\Form;

use App\Entity\Attack;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;

class AttackFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('title', null, [
                'label' => 'Titre',
                'required' => true,
                'attr' => [
                    'placeholder' => 'Entrez un titre',
                    'maxlength' => 15,
                    'class' => 'w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary focus:outline-none transition duration-200 ease-in-out mb-4',
                ]
            ])
            ->add('power', null, [
                'label' => 'Puissance',
                'required' => true,
                'attr' => [
                    'placeholder' => 'Entrez une puissance',
                    'class' => 'w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary focus:outline-none transition duration-200 ease-in-out mb-4',
                    'min' => 0,
                    'max' => 999,
                    'step' => 10,
                ]
            ])
            ->add('description', TextareaType::class, [
                'label' => 'Description',
                'required' => true,
                'attr' => [
                    'placeholder' => 'Entrez une description',
                    'readonly' => false,
                    'rows' => 2,
                    'maxlength' => 150,
                    'class' => 'w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary focus:outline-none transition duration-200 ease-in-out mb-4',
                    'style' => 'resize: none; white-space: pre-wrap;',
                ],
            ])
            ->add('cost', IntegerType::class, [
                'label' => 'Coût',
                'required' => true,
                'attr' => [
                    'placeholder' => 'Entrez un coût',
                    'min' => 0,
                    'max' => 4,
                    'class' => 'w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary focus:outline-none transition duration-200 ease-in-out mb-4',
                ]
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Attack::class,
        ]);
    }
}
