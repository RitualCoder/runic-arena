<?php

namespace App\Form;

use App\Entity\Attack;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;

class AttackFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('title', null, [
                'required' => false, // Le champ n'est pas obligatoire
            ])
            ->add('power', null, [
                'required' => false, // Le champ n'est pas obligatoire
            ])
            ->add('description', null, [
                'required' => false, // Le champ n'est pas obligatoire
            ])
            ->add('cost', IntegerType::class, [
                'required' => false, // Le champ n'est pas obligatoire
                'constraints' => [
                    new Assert\Range([
                        'min' => 0,
                        'max' => 4,
                        'notInRangeMessage' => 'Le coût doit être compris entre {{ min }} et {{ max }}.',
                    ]),
                ],
                'attr' => [
                    'min' => 0,
                    'max' => 4,
                    'class' => 'w-full px-4 py-2 border border-gray-400 rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
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
