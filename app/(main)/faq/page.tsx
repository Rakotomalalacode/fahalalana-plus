'use client'

import { useState } from 'react';

const faqs = [
  {
    question: "Comment accéder à mes cours après l'achat ?",
    answer:
      "Une fois le paiement confirmé, accédez à votre tableau de bord. Vous y trouverez tous les cours achetés avec un bouton 'Commencer' ou 'Continuer'.",
  },
  {
    question: "Puis-je suivre les cours sur mobile ?",
    answer:
      "Oui, notre plateforme est entièrement responsive. Vous pouvez suivre les cours depuis votre téléphone, tablette ou ordinateur.",
  },
  {
    question: "Comment poser une question à un enseignant ?",
    answer:
      "Chaque cours dispose d'une section 'Commentaires' ou 'Questions'. Vous pouvez y écrire directement et l’enseignant vous répondra rapidement.",
  },
  {
    question: "Que faire si une vidéo ne se charge pas ?",
    answer:
      "Essayez de rafraîchir la page. Si le problème persiste, vérifiez votre connexion ou contactez notre support technique.",
  },
  {
    question: "Puis-je obtenir un remboursement ?",
    answer:
      "Les remboursements sont possibles sous 7 jours après achat, à condition que moins de 30% du cours ait été suivi.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="lg:px-9 font-outfit px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Centre de FAQ</h1>
      <p className="text-gray-600 mb-8">
        Voici les réponses aux questions les plus fréquentes concernant notre plateforme.
      </p>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border rounded p-4"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left font-medium text-gray-800 focus:outline-none"
            >
              {faq.question}
            </button>
            {openIndex === index && (
              <div className="mt-2 text-gray-600">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
