AfriTech Elite
Site vitrine Next.js en français pour présenter les services d’AfriTech Elite : création de sites web pour professionnels et cours particuliers de mathématiques au Bénin.

Sommaire
Démarrage local
Configuration
Pages et fonctionnalités
Déploiement sur Render
SEO
PWA et mode hors connexion
Démarrage local
Prérequis : Node.js et npm.


Ouvrez ensuite http://localhost:3000.

Pour vérifier la version de production en local :


Configuration
Les variables d’environnement sont définies dans .env.local en développement. En production, configurez-les dans les paramètres du service Render, puis redéployez le site.

Variable	Rôle
NEXT_PUBLIC_WHATSAPP_NUMBER	Numéro WhatsApp au format international, uniquement des chiffres — sans +, espaces ni tirets.
NEXT_PUBLIC_SITE_URL	URL publique complète du site, par exemple https://mon-site.onrender.com.
NEXT_PUBLIC_CONTACT_EMAIL	Adresse e-mail affichée comme moyen de contact, si renseignée.
NEXT_PUBLIC_CONTACT_PHONE	Numéro d’appel affiché comme moyen de contact, si renseigné.
NEXT_PUBLIC_CONTACT_LINKEDIN	URL du profil LinkedIn, si renseignée.
Vérifiez que les coordonnées indiquées sont bien les vôtres avant de publier le site. Sur la page Contact, les canaux facultatifs non configurés ou invalides ne sont pas affichés.

Formulaire de contact
Le formulaire de la page /contact transmet les demandes à Formspree via l’endpoint configuré dans le site. Vérifiez dans le tableau de bord Formspree que le formulaire est actif et que l’adresse destinataire est confirmée.

Le formulaire recueille le nom, l’adresse e-mail, le sujet et le message ; le téléphone est facultatif. Les visiteurs doivent éviter d’y transmettre des informations confidentielles.

Pages et fonctionnalités
Accueil — /
La page d’accueil présente les services, les cours de mathématiques, les formules et le déroulement d’un projet. Elle comprend également :

une section portfolio avec des aperçus de sites ;
un lien vers le portfolio de Landry ;
une illustration animée en arrière-plan de la section d’accueil ;
des animations discrètes au défilement et sur les cartes.
Les aperçus de sites sont des concepts de démonstration : ils ne doivent pas être présentés comme des réalisations clients.

Contact — /contact
La page Contact contient le formulaire Formspree, les moyens de contact configurés et une foire aux questions.

Cours de mathématiques
La section dédiée présente l’accompagnement en mathématiques de la 6e à la Terminale, selon le programme béninois, notamment pour la préparation au BEPC et au BAC. Les objectifs, le format des séances, les disponibilités et les modalités sont à convenir avec l’enseignant. Aucun résultat scolaire n’est garanti.

Déploiement sur Render
Le projet contient un fichier render.yaml pour configurer le service. Pour le déployer :

Connectez votre dépôt Git à Render.
Créez ou configurez un service Web à partir du dépôt.
Vérifiez les commandes de construction et de démarrage définies dans render.yaml.
Configurez les variables d’environnement nécessaires, en particulier NEXT_PUBLIC_WHATSAPP_NUMBER et NEXT_PUBLIC_SITE_URL.
Lancez le déploiement.
Définissez NEXT_PUBLIC_SITE_URL avec l’URL publique HTTPS du site, par exemple https://mon-site.onrender.com. Cette URL sert aux métadonnées, au sitemap et au fichier robots.txt. Les variables NEXT_PUBLIC_* doivent être disponibles pendant la construction de l’application ; après leur modification, relancez un déploiement.

Render fournit HTTPS pour les services Web. La disponibilité et le temps de démarrage dépendent du service et du plan choisis.

SEO
Le site inclut des métadonnées pour les pages, le partage sur les réseaux sociaux, une image Open Graph ainsi que des routes pour :

/robots.txt
/sitemap.xml
En local, l’URL du site est déterminée automatiquement. En production, configurez NEXT_PUBLIC_SITE_URL avec le domaine public réel.

PWA et mode hors connexion
Le site dispose d’un manifeste installable, d’icônes adaptées aux appareils et d’un service worker. Après une première visite en ligne, celui-ci met en cache certaines pages et ressources, dont l’illustration d’accueil, pour faciliter l’accès hors connexion.

Les services externes — comme WhatsApp, Formspree et le portfolio — nécessitent une connexion Internet. L’installation de la PWA et le service worker requièrent HTTPS en production ; localhost est pris en charge en développement.

Les animations sont réduites ou désactivées si le visiteur a activé le réglage « Réduire les animations » sur son appareil.
