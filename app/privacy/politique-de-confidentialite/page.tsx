import React from 'react';
import Link from 'next/link';

const PrivacyPolicyPage = () => {
    const currentDate = new Date().toLocaleDateString();
    const platformName = <p className='font-major text-oranground'>eduVibe</p> as any;
    const cookiePolicyLink = "/privacy/politique-de-cookies"; // Remplacez par le lien réel si vous en avez un
    const privacyContactEmail = "[Votre adresse e-mail de contact pour la confidentialité]";
    const privacyPostalAddress = "[Votre adresse postale (facultatif)]";
    const childAgeLimit = "[Âge]";

    return (
        <>
            <div className="container mx-auto my-8 px-4 max-w-3xl">
                <div className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-gray-300 pb-2">
                    Politique de Confidentialité de {platformName}
                </div>

                <div className="text-gray-700 mb-4">Date de dernière mise à jour : {currentDate}</div>

                <div className="text-gray-700 mb-4">
                    Bienvenue sur {platformName} (ci-après "la Plateforme"). Nous nous engageons à protéger votre vie privée et à
                    assurer la sécurité de vos informations personnelles. Cette Politique de Confidentialité explique comment nous
                    collectons, utilisons, partageons et protégeons vos informations lorsque vous utilisez notre Plateforme.
                </div>

                <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">1. Informations que nous collectons</h2>
                <p className="text-gray-700 mb-4">Nous pouvons collecter les types d'informations suivants lorsque vous utilisez notre Plateforme :</p>
                <ul className="list-disc list-inside text-gray-700 mb-4">
                    <li>
                        <strong>Informations d'identification personnelle :</strong> Nom, prénom, adresse e-mail, nom d'utilisateur,
                        mot de passe, date de naissance, etc., que vous nous fournissez lors de l'inscription ou de la création de
                        votre profil.
                    </li>
                    <li>
                        <strong>Informations de profil :</strong> Informations que vous choisissez d'ajouter à votre profil, telles que
                        votre photo, vos intérêts, votre parcours éducatif et professionnel.
                    </li>
                    <li>
                        <strong>Informations d'utilisation :</strong> Données sur la manière dont vous utilisez la Plateforme, y compris
                        les cours que vous suivez, vos progrès, vos interactions avec d'autres utilisateurs, les contenus que vous
                        consultez, les recherches que vous effectuez et les fonctionnalités que vous utilisez.
                    </li>
                    <li>
                        <strong>Informations techniques :</strong> Adresse IP, type d'appareil, système d'exploitation, type de
                        navigateur, identifiants uniques de l'appareil, données de localisation (si vous l'autorisez) et autres
                        informations techniques similaires.
                    </li>
                    <li>
                        <strong>Informations de paiement :</strong> Si vous effectuez des achats sur notre Plateforme, nous collectons
                        les informations nécessaires au traitement de vos paiements, telles que les détails de votre carte de crédit
                        ou d'autres informations de paiement. Veuillez noter que ces informations sont généralement traitées par des
                        prestataires de services de paiement tiers sécurisés.
                    </li>
                    <li>
                        <strong>Communications :</strong> Les informations contenues dans vos communications avec nous (par exemple,
                        lorsque vous nous contactez pour obtenir de l'aide).
                    </li>
                    <li>
                        <strong>Cookies et technologies similaires :</strong> Nous utilisons des cookies et d'autres technologies de
                        suivi pour collecter des informations sur votre activité sur notre Plateforme et pour personnaliser votre
                        expérience. Veuillez consulter notre <Link target="_blank" href={cookiePolicyLink} className="text-blue-500 hover:underline">Politique de Cookies</Link> pour plus d'informations.
                    </li>
                </ul>

                <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">2. Comment nous utilisons vos informations</h2>
                <p className="text-gray-700 mb-4">Nous pouvons utiliser vos informations aux fins suivantes :</p>
                <ul className="list-disc list-inside text-gray-700 mb-4">
                    <li>Pour vous fournir et gérer votre compte et votre accès à la Plateforme.</li>
                    <li>Pour personnaliser votre expérience d'apprentissage et vous recommander des cours et du contenu pertinents.</li>
                    <li>Pour suivre vos progrès dans les cours et vous fournir des certificats ou des badges.</li>
                    <li>Pour vous permettre d'interagir avec d'autres utilisateurs (par exemple, via des forums de discussion).</li>
                    <li>Pour communiquer avec vous concernant votre compte, les mises à jour de la Plateforme, les offres spéciales et d'autres informations pertinentes.</li>
                    <li>Pour répondre à vos demandes d'assistance et à vos questions.</li>
                    <li>Pour traiter vos paiements et gérer les abonnements.</li>
                    <li>Pour améliorer et développer notre Plateforme, y compris ses fonctionnalités et son contenu.</li>
                    <li>Pour analyser l'utilisation de la Plateforme et comprendre les tendances.</li>
                    <li>Pour assurer la sécurité de notre Plateforme et prévenir la fraude et les abus.</li>
                    <li>Pour nous conformer à nos obligations légales et réglementaires.</li>
                </ul>

                <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">3. Partage de vos informations</h2>
                <p className="text-gray-700 mb-4">Nous pouvons partager vos informations avec les catégories de tiers suivantes :</p>
                <ul className="list-disc list-inside text-gray-700 mb-4">
                    <li>
                        <strong>Autres utilisateurs :</strong> Les informations de votre profil que vous choisissez de rendre publiques
                        peuvent être visibles par d'autres utilisateurs de la Plateforme.
                    </li>
                    <li>
                        <strong>Instructeurs et créateurs de contenu :</strong> Nous pouvons partager des informations agrégées ou
                        anonymisées sur les performances des apprenants avec les instructeurs des cours que vous suivez.
                    </li>
                    <li>
                        <strong>Prestataires de services tiers :</strong> Nous pouvons faire appel à des prestataires de services tiers
                        pour nous aider à exploiter, fournir, améliorer, comprendre, personnaliser, soutenir et commercialiser nos
                        services. Ces prestataires peuvent avoir accès à vos informations pour effectuer des tâches en notre nom (par
                        exemple, hébergement de serveurs, analyse de données, traitement des paiements, marketing par e-mail). Nous
                        exigeons de ces prestataires qu'ils protègent vos informations conformément à cette Politique de
                        Confidentialité.
                    </li>
                    <li>
                        <strong>Partenaires commerciaux :</strong> Nous pouvons partager des informations avec des partenaires
                        commerciaux dans le cadre de collaborations ou de promotions spécifiques, avec votre consentement.
                    </li>
                    <li>
                        <strong>Autorités légales :</strong> Nous pouvons divulguer vos informations si la loi l'exige ou en réponse à
                        une demande légale valide (par exemple, une ordonnance d'un tribunal, une assignation à comparaître).
                    </li>
                    <li>
                        <strong>Transferts d'entreprise :</strong> Dans le cas d'une fusion, d'une acquisition, d'une réorganisation,
                        d'une vente d'actifs ou d'une autre transaction similaire, vos informations peuvent être transférées à la
                        partie acquéreuse.
                    </li>
                </ul>

                <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">4. Vos droits et choix</h2>
                <p className="text-gray-700 mb-4">Vous disposez de certains droits et choix concernant vos informations personnelles :</p>
                <ul className="list-disc list-inside text-gray-700 mb-4">
                    <li>
                        <strong>Accès et mise à jour :</strong> Vous pouvez accéder à la plupart des informations personnelles que nous
                        détenons à votre sujet et les mettre à jour via les paramètres de votre compte.
                    </li>
                    <li>
                        <strong>Suppression :</strong> Vous pouvez demander la suppression de votre compte et de vos informations
                        personnelles, sous réserve de certaines exceptions légales. Veuillez nous contacter pour exercer ce droit.
                    </li>
                    <li>
                        <strong>Opposition au marketing :</strong> Vous pouvez vous désinscrire de nos communications marketing à tout
                        moment en suivant les instructions de désabonnement incluses dans ces communications ou en nous contactant
                        directement.
                    </li>
                    <li>
                        <strong>Cookies :</strong> Vous pouvez gérer vos préférences en matière de cookies via les paramètres de votre
                        navigateur. Veuillez consulter notre <Link target="_blank" href={cookiePolicyLink} className="text-blue-500 hover:underline">Politique de Cookies</Link> pour plus d'informations.
                    </li>
                    <li>
                        <strong>Autres droits :</strong> Selon votre lieu de résidence, vous pouvez avoir d'autres droits concernant vos
                        données personnelles, tels que le droit à la portabilité des données et le droit de restreindre le
                        traitement. Veuillez nous contacter si vous souhaitez exercer ces droits.
                    </li>
                </ul>

                <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">5. Sécurité de vos informations</h2>
                <p className="text-gray-700 mb-4">
                    Nous prenons des mesures de sécurité raisonnables pour protéger vos informations personnelles contre l'accès non
                    autorisé, la divulgation, l'altération ou la destruction. Ces mesures peuvent inclure le cryptage des données,
                    les pare-feu et les contrôles d'accès sécurisés. Cependant, aucune méthode de transmission sur Internet ni aucune
                    méthode de stockage électronique n'est totalement sécurisée, et nous ne pouvons garantir une sécurité absolue.
                </p>

                <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">6. Conservation de vos informations</h2>
                <p className="text-gray-700 mb-4">
                    Nous conservons vos informations personnelles aussi longtemps que nécessaire pour fournir les services de la
                    Plateforme, pour nous conformer à nos obligations légales, résoudre les litiges et faire respecter nos accords.
                </p>

                <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">7. Transferts internationaux de données</h2>
                <p className="text-gray-700 mb-4">
                    Vos informations personnelles peuvent être transférées et traitées dans des pays autres que votre pays de
                    résidence. Ces pays peuvent avoir des lois sur la protection des données différentes de celles de votre pays.
                    En utilisant notre Plateforme, vous consentez à ces transferts.
                </p>

                <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">8. Vie privée des enfants</h2>
                <p className="text-gray-700 mb-4">
                    Notre Plateforme n'est pas destinée aux enfants de moins de {childAgeLimit}. Nous ne collectons pas sciemment
                    d'informations personnelles auprès d'enfants de moins de cet âge. Si vous êtes un parent ou un tuteur et que
                    vous pensez que votre enfant nous a fourni des informations personnelles, veuillez nous contacter immédiatement
                    et nous prendrons des mesures pour supprimer ces informations.
                </p>

                <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">9. Modifications de cette Politique de Confidentialité</h2>
                <p className="text-gray-700 mb-4">
                    Nous pouvons mettre à jour cette Politique de Confidentialité de temps à autre. Nous vous informerons de toute
                    modification importante en publiant la nouvelle politique sur cette page et en mettant à jour la date de
                    "dernière mise à jour" ci-dessus. Nous vous encourageons à consulter régulièrement cette page pour prendre
                    connaissance des éventuelles modifications.
                </p>

                <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">10. Nous contacter</h2>
                <p className="text-gray-700 mb-4">
                    Si vous avez des questions, des préoccupations ou des demandes concernant cette Politique de Confidentialité,
                    veuillez nous contacter à :
                </p>
                <p className="text-gray-700 mb-2">{privacyContactEmail}</p>
                {privacyPostalAddress && <p className="text-gray-700">{privacyPostalAddress}</p>}

                <p className="text-gray-500 mt-8 text-sm">Dernière mise à jour : {currentDate}</p>
            </div>
        </>
    );
};

export default PrivacyPolicyPage;