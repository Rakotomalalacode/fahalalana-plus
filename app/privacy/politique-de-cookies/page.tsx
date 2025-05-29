import Link from 'next/link';
import React from 'react';

const CookiePolicyPage = () => {
    const currentDate = new Date().toLocaleDateString();
    const platformName = <p className='font-major text-oranground'>eduVibe</p> as any;
    const privacyPolicyLink = "/privacy/politique-de-confidentialite";

    return (
        <>
            <div className="container mx-auto my-8 px-4 max-w-3xl">
                <div className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-gray-300 pb-2">
                    Politique de Cookies de {platformName}
                </div>

                <div className="text-gray-700 mb-4">Date de dernière mise à jour : {currentDate}</div>

                <p className="text-gray-700 mb-4">
                    Cette Politique de Cookies explique comment {platformName} (ci-après "la Plateforme") utilise des cookies et
                    d'autres technologies similaires pour vous reconnaître lorsque vous visitez notre site web. Elle explique ce
                    que sont ces technologies, pourquoi nous les utilisons et vos droits de contrôler notre utilisation de celles-ci.
                </p>

                <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">1. Que sont les cookies ?</h2>
                <p className="text-gray-700 mb-4">
                    Les cookies sont de petits fichiers de données qui sont placés sur votre ordinateur ou votre appareil mobile
                    lorsque vous visitez un site web. Les cookies sont largement utilisés par les propriétaires de sites web pour
                    faire fonctionner leurs sites web, ou pour fonctionner plus efficacement, ainsi que pour fournir des informations
                    de reporting.
                </p>
                <p className="text-gray-700 mb-4">
                    Les cookies configurés par le propriétaire du site web (dans ce cas, {platformName}) sont appelés "cookies
                    de première partie". Les cookies configurés par des parties autres que le propriétaire du site web sont appelés
                    "cookies tiers". Les cookies tiers permettent de fournir des fonctionnalités ou des services tiers via le site
                    web (par exemple, la publicité, le contenu interactif et les analyses). Les parties qui configurent ces cookies
                    tiers peuvent reconnaître votre ordinateur à la fois lorsqu'il visite le site web en question et également
                    lorsqu'il visite certains autres sites web.
                </p>

                <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">2. Pourquoi utilisons-nous des cookies ?</h2>
                <p className="text-gray-700 mb-4">Nous utilisons des cookies de première partie et tiers pour plusieurs raisons. Certains cookies sont nécessaires pour que notre Plateforme fonctionne et nous permettent de vous fournir nos services ; ces cookies sont appelés cookies "essentiels" ou "strictement nécessaires". D'autres cookies nous permettent également de suivre et de cibler les intérêts de nos utilisateurs afin d'améliorer l'expérience sur notre Plateforme. Les tiers servent des cookies via notre Plateforme à des fins publicitaires, analytiques et autres. Ceci est décrit plus en détail ci-dessous.</p>

                <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">3. Les cookies que nous utilisons</h2>
                <p className="text-gray-700 mb-4">Les types spécifiques de cookies de première et de tierce partie servis via notre Plateforme et les objectifs qu'ils remplissent sont décrits dans le tableau ci-dessous (veuillez noter que les cookies spécifiques utilisés peuvent varier en fonction des fonctionnalités de la Plateforme) :</p>

                <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Cookies Essentiels</h3>
                <p className="text-gray-700 mb-4">Ces cookies sont strictement nécessaires pour vous fournir les services disponibles via notre Plateforme et pour utiliser certaines de ses fonctionnalités, telles que l'accès aux zones sécurisées.</p>
                {/* Exemple de tableau - à adapter à vos cookies essentiels */}
                <table className="table-auto w-full mb-4">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Nom du Cookie</th>
                            <th className="px-4 py-2">Objectif</th>
                            <th className="px-4 py-2">Durée</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border px-4 py-2">`PHPSESSID`</td>
                            <td className="border px-4 py-2">Maintient votre session utilisateur.</td>
                            <td className="border px-4 py-2">Session</td>
                        </tr>
                        {/* Ajoutez vos autres cookies essentiels ici */}
                    </tbody>
                </table>

                <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Cookies de Performance et de Fonctionnalité</h3>
                <p className="text-gray-700 mb-4">Ces cookies sont utilisés pour améliorer les performances et la fonctionnalité de notre Plateforme, mais ne sont pas essentiels à son utilisation. Cependant, sans ces cookies, certaines fonctionnalités peuvent devenir indisponibles.</p>
                {/* Exemple de tableau - à adapter à vos cookies de performance */}
                <table className="table-auto w-full mb-4">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Nom du Cookie</th>
                            <th className="px-4 py-2">Objectif</th>
                            <th className="px-4 py-2">Durée</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border px-4 py-2">`__ga`</td>
                            <td className="border px-4 py-2">Utilisé par Google Analytics pour distinguer les utilisateurs.</td>
                            <td className="border px-4 py-2">2 ans</td>
                        </tr>
                        {/* Ajoutez vos autres cookies de performance ici */}
                    </tbody>
                </table>

                <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Cookies de Publicité et de Ciblage</h3>
                <p className="text-gray-700 mb-4">Ces cookies sont utilisés pour rendre les messages publicitaires plus pertinents pour vous. Ils remplissent des fonctions telles qu'empêcher la même publicité de réapparaître continuellement, s'assurer que les publicités sont correctement affichées pour les annonceurs et, dans certains cas, sélectionner des publicités basées sur vos intérêts.</p>
                {/* Exemple de tableau - à adapter à vos cookies publicitaires */}
                <table className="table-auto w-full mb-4">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Nom du Cookie</th>
                            <th className="px-4 py-2">Objectif</th>
                            <th className="px-4 py-2">Durée</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Ajoutez vos cookies publicitaires ici */}
                    </tbody>
                </table>

                <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">Cookies de Médias Sociaux</h3>
                <p className="text-gray-700 mb-4">Ces cookies sont utilisés pour vous permettre de partager des pages et du contenu que vous trouvez intéressants sur notre Plateforme via des réseaux sociaux tiers et d'autres sites web.</p>
                {/* Exemple de tableau - à adapter à vos cookies de médias sociaux */}
                <table className="table-auto w-full mb-4">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Nom du Cookie</th>
                            <th className="px-4 py-2">Objectif</th>
                            <th className="px-4 py-2">Durée</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Ajoutez vos cookies de médias sociaux ici */}
                    </tbody>
                </table>

                <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">4. Comment contrôler les cookies</h2>
                <p className="text-gray-700 mb-4">Vous avez le droit de décider d'accepter ou de refuser les cookies. Vous pouvez exercer vos préférences en matière de cookies en utilisant les mécanismes de consentement fournis sur notre Plateforme (par exemple, une bannière de cookies). Vous pouvez également modifier les paramètres de votre navigateur web pour accepter ou refuser les cookies. Si vous choisissez de refuser les cookies, vous pourrez peut-être toujours utiliser notre site web, bien que votre accès à certaines fonctionnalités et zones de notre site web puisse être restreint.</p>
                <p className="text-gray-700 mb-4">Étant donné que les moyens par lesquels vous pouvez refuser les cookies via les commandes de votre navigateur web varient d'un navigateur à l'autre, vous devriez consulter le menu d'aide de votre navigateur pour plus d'informations.</p>
                <p className="text-gray-700 mb-4">Pour en savoir plus sur les cookies, y compris comment voir quels cookies ont été configurés et comment les gérer et les supprimer, visitez <a href="https://www.allaboutcookies.org/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">www.allaboutcookies.org</a>.</p>

                <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">5. Mises à jour de cette Politique de Cookies</h2>
                <p className="text-gray-700 mb-4">Nous pouvons mettre à jour cette Politique de Cookies de temps à autre afin de refléter, par exemple, les changements apportés aux cookies que nous utilisons ou pour d'autres raisons opérationnelles, légales ou réglementaires. Veuillez donc consulter régulièrement cette Politique de Cookies pour rester informé de notre utilisation des cookies et des technologies associées.</p>
                <p className="text-gray-700 mb-4">La date de la dernière mise à jour de cette Politique de Cookies est indiquée en haut de la page.</p>

                <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">6. Plus d'informations</h2>
                <p className="text-gray-700 mb-4">Si vous avez des questions concernant notre utilisation des cookies et d'autres technologies de suivi, veuillez nous contacter à : <a href={`mailto:${privacyPolicyLink}`} className="text-blue-500 hover:underline">Notre Politique de Confidentialité</a>.</p>

                <p className="text-gray-500 mt-8 text-sm">Dernière mise à jour : {currentDate}</p>
            </div>
        </>
    );
};

export default CookiePolicyPage;