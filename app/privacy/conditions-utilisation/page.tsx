import React from 'react';
import Link from 'next/link';

const TermsOfUsePage = () => {
    const currentDate = new Date().toLocaleDateString();
    const platformName = <p className='font-major text-oranground'>eduVibe</p> as any;
    const privacyPolicyLink = "/privacy/politique-de-confidentialite"; // Remplacez par le lien réel
    const contactEmail = process.env.CONTACT_EMAIL;

    return (
        <>
            <div className="container mx-auto my-8 px-4 max-w-3xl">
                <div className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-gray-300 pb-2">
                    Conditions d'Utilisation de {platformName}
                </div>

                <div className="text-gray-700 mb-4">Date de dernière mise à jour : {currentDate}</div>

                <div className="text-gray-700 mb-4">
                    Bienvenue sur {platformName} (ci-après "la Plateforme"). Veuillez lire attentivement ces Conditions d'Utilisation
                    (ci-après "les Conditions") avant d'accéder à ou d'utiliser notre Plateforme. En accédant ou en utilisant la
                    Plateforme, vous acceptez d'être lié par ces Conditions. Si vous n'acceptez pas toutes les dispositions de ces
                    Conditions, vous ne devez pas accéder à ou utiliser la Plateforme.
                </div>

                <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">1. Acceptation des Conditions</h2>
                <p className="text-gray-700 mb-4">
                    En utilisant la Plateforme, vous reconnaissez avoir lu, compris et accepté d'être lié par ces Conditions, ainsi
                    que par notre <Link href={privacyPolicyLink} target="_blank" className="text-blue-500 hover:underline">Politique de Confidentialité</Link>, qui est intégrée aux présentes par référence.
                </p>

                <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">2. Utilisation de la Plateforme</h2>
                <p className="text-gray-700 mb-4">
                    La Plateforme est destinée à un usage personnel et non commercial à des fins d'apprentissage en ligne. Vous
                    vous engagez à utiliser la Plateforme conformément à toutes les lois et réglementations applicables et d'une
                    manière qui ne porte pas atteinte aux droits d'autrui ni n'entrave l'utilisation de la Plateforme par d'autres
                    utilisateurs.
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4">
                    <li>Vous êtes responsable de maintenir la confidentialité de votre compte et de votre mot de passe.</li>
                    <li>Vous ne devez pas utiliser la Plateforme de manière abusive, y compris en introduisant des virus, des chevaux de Troie, des vers, des bombes logiques ou tout autre élément malveillant ou technologiquement nuisible.</li>
                    <li>Vous ne devez pas tenter d'accéder sans autorisation à la Plateforme, aux serveurs sur lesquels elle est hébergée ou à tout serveur, ordinateur ou base de données connecté à la Plateforme.</li>
                    <li>Vous ne devez pas reproduire, distribuer, modifier, créer des œuvres dérivées, afficher publiquement, exécuter publiquement, republier, télécharger, stocker ou transmettre tout contenu de notre Plateforme sans notre consentement écrit préalable.</li>
                </ul>

                <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">3. Contenu de l'Utilisateur</h2>
                <p className="text-gray-700 mb-4">
                    La Plateforme peut vous permettre de soumettre, publier, afficher ou rendre autrement disponible du contenu, y
                    compris des commentaires, des questions, des réponses et d'autres communications (ci-après "Contenu de
                    l'Utilisateur"). Vous conservez tous les droits de propriété intellectuelle sur votre Contenu de l'Utilisateur.
                    Cependant, en soumettant du Contenu de l'Utilisateur à la Plateforme, vous nous accordez une licence mondiale,
                    non exclusive, transférable, sous-licenciable, libre de redevances, perpétuelle et irrévocable pour utiliser,
                    reproduire, modifier, adapter, publier, traduire, créer des œuvres dérivées, distribuer, exécuter publiquement et
                    afficher publiquement ce Contenu de l'Utilisateur sur la Plateforme et dans le cadre de la fourniture des
                    services de la Plateforme.
                </p>
                <p className="text-gray-700 mb-4">
                    Vous déclarez et garantissez que vous avez tous les droits nécessaires pour soumettre votre Contenu de
                    l'Utilisateur et que ce Contenu de l'Utilisateur ne viole pas les droits de tiers, y compris les droits
                    d'auteur, les marques de commerce, la vie privée, la publicité ou autres droits de propriété intellectuelle ou
                    droits de propriété.
                </p>

                <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">4. Propriété Intellectuelle</h2>
                <div className="text-gray-700 mb-4">
                    La Plateforme et son contenu original (à l'exclusion du Contenu de l'Utilisateur), ses caractéristiques et ses
                    fonctionnalités sont et resteront la propriété exclusive de {platformName} et de ses concédants de licence. La
                    Plateforme est protégée par le droit d'auteur, les marques de commerce et d'autres lois sur la propriété
                    intellectuelle de Madagascar et d'autres pays. Nos marques de commerce et noms commerciaux ne peuvent pas être
                    utilisés en relation avec un produit ou un service qui n'est pas le nôtre, d'une manière susceptible de créer
                    une confusion chez les consommateurs ou de dénigrer ou de discréditer {platformName}.
                </div>

                <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">5. Résiliation</h2>
                <p className="text-gray-700 mb-4">
                    Nous pouvons résilier ou suspendre votre accès à la Plateforme, sans préavis ni responsabilité, pour quelque
                    raison que ce soit, y compris, sans limitation, si vous enfreignez ces Conditions. Toutes les dispositions des
                    Conditions qui, de par leur nature, devraient survivre à la résiliation survivront à la résiliation, y compris,
                    sans limitation, les dispositions relatives à la propriété intellectuelle, aux exclusions de garantie, à la
                    limitation de responsabilité et à l'indemnisation.
                </p>

                <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">6. Exonération de Garanties</h2>
                <p className="text-gray-700 mb-4">
                    La Plateforme est fournie "TELLE QUELLE" et "SELON LA DISPONIBILITÉ", sans aucune garantie d'aucune sorte, expresse
                    ou implicite, y compris, mais sans s'y limiter, les garanties implicites de qualité marchande, d'adéquation à un
                    usage particulier, de non-contrefaçon et de déroulement des opérations ou d'usage commercial.
                </p>

                <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">7. Limitation de Responsabilité</h2>
                <div className="text-gray-700 mb-4">
                    Dans toute la mesure permise par la loi applicable, {platformName}, ses affiliés, ses dirigeants, ses employés,
                    ses agents, ses fournisseurs ou ses concédants de licence ne seront en aucun cas responsables des dommages
                    indirects, accessoires, spéciaux, consécutifs ou punitifs (y compris, sans limitation, les dommages pour perte
                    de bénéfices, de données, d'utilisation, de clientèle ou d'autres pertes intangibles) résultant de votre accès
                    à, de votre utilisation de ou de votre incapacité à accéder à ou à utiliser la Plateforme.
                </div>

                <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">8. Indemnisation</h2>
                <div className="text-gray-700 mb-4">
                    Vous acceptez de défendre, d'indemniser et de dégager de toute responsabilité {platformName}, ses affiliés, ses
                    dirigeants, ses employés, ses agents, ses fournisseurs et ses concédants de licence contre toute réclamation,
                    toute responsabilité, tout dommage, tout jugement, toute sentence, toute perte, tout coût, toute dépense ou tout
                    honoraires (y compris les honoraires d'avocat raisonnables) découlant de ou liés à (a) votre utilisation de la
                    Plateforme, (b) votre violation de ces Conditions, (c) votre Contenu d'Utilisateur, ou (d) votre violation de
                    tout droit d'un tiers.
                </div>

                <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">9. Droit Applicable et Règlement des Différends</h2>
                <p className="text-gray-700 mb-4">
                    Ces Conditions seront régies et interprétées conformément aux lois de Madagascrar, sans égard à ses dispositions
                    en matière de conflits de lois. Tout litige découlant de ou lié à ces Conditions sera soumis à la compétence
                    exclusive des tribunaux situés à Antananarivo.
                </p>

                <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">10. Modifications des Conditions</h2>
                <p className="text-gray-700 mb-4">
                    Nous nous réservons le droit de modifier ou de remplacer ces Conditions à tout moment et à notre seule discrétion.
                    Si une révision est importante, nous nous efforcerons de fournir un préavis d'au moins 30 jours avant
                    l'entrée en vigueur de toute nouvelle condition. Ce qui constitue un changement important sera déterminé à notre
                    seule discrétion. En continuant d'accéder à ou d'utiliser notre Plateforme après l'entrée en vigueur de ces
                    révisions, vous acceptez d'être lié par les conditions révisées. Si vous n'acceptez pas les nouvelles
                    conditions, veuillez cesser d'utiliser la Plateforme.
                </p>

                <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">11. Nous contacter</h2>
                <p className="text-gray-700 mb-4">
                    Si vous avez des questions concernant ces Conditions d'Utilisation, veuillez nous contacter à :
                </p>
                <p className="text-gray-700 mb-2">{contactEmail}</p>

                <p className="text-gray-500 mt-8 text-sm">Dernière mise à jour : {currentDate}</p>
            </div>
        </>
    );
};

export default TermsOfUsePage;