'use client'

import Link from "next/link";

export default function ObtenirDeLAide() {
  return (
    <div className="lg:px-9 font-outfit px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Obtenir de l’aide</h1>

      <p className="text-gray-700 mb-6">
        Vous avez une question, un problème technique ou besoin de support concernant nos cours ?
        Cette page est là pour vous guider.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">FAQ - Questions fréquentes</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Comment accéder aux cours que j’ai achetés ?</li>
          <li>J’ai oublié mon mot de passe, que faire ?</li>
          <li>Comment contacter un enseignant ?</li>
          <li>Comment obtenir une facture ou un reçu ?</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Support par e-mail</h2>
        <p className="text-gray-700 mb-2">
          Vous pouvez nous contacter directement par email pour tout type de problème ou de question :
        </p>
        <p className="text-blue-600 font-medium">
          📧 <a href="mailto:tahina615@gmail.com">support@falarohy.com</a>
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Assistance en ligne</h2>
        <p className="text-gray-700 mb-2">
          Nous proposons une assistance via chat en direct pendant les heures ouvrables.
        </p>
        <p className="text-sm text-gray-500">Disponible du lundi au vendredi de 9h à 17h (UTC+3)</p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Centre d’aide</h2>
        <p className="text-gray-700">
          Visitez notre <Link href="/faq" className="text-blue-600 underline">centre de FAQ</Link> pour trouver rapidement des réponses aux questions les plus courantes.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Rejoindre la communauté</h2>
        <p className="text-gray-700">
          Vous pouvez poser vos questions ou aider les autres sur notre groupe Telegram :
        </p>
        <p className="text-blue-600 font-medium">
          📱 <a href="https://t.me/fahalalana_plus" target="_blank">https://t.me/fahalalana_plus</a>
        </p>
      </section>
    </div>
  );
}
