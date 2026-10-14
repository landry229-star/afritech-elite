# AfriTech Elite

Landing page Next.js en français pour présenter les offres de création de sites web et les cours de mathématiques d’AfriTech Elite.

## Démarrage local

```bash
npm install
cp .env.example .env.local
```

Renseignez `NEXT_PUBLIC_WHATSAPP_NUMBER` dans `.env.local` avec le numéro WhatsApp au format international, sans `+`, espace ni tiret (8 à 15 chiffres). Tant que la variable est absente ou invalide, les liens de contact renvoient aux instructions de configuration. Les boutons des offres préparent un message WhatsApp qui précise l’offre choisie.

Sur la page `/contact`, le formulaire envoie les demandes au endpoint Formspree configuré. Vérifiez dans le tableau de bord Formspree que le formulaire `xldkjyko` est actif et que l’adresse destinataire est confirmée. WhatsApp utilise `NEXT_PUBLIC_WHATSAPP_NUMBER`. Pour afficher aussi les boutons email, téléphone et LinkedIn, renseignez respectivement `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_CONTACT_PHONE` et `NEXT_PUBLIC_CONTACT_LINKEDIN` avec vos coordonnées réelles dans `.env.local` et dans l’environnement Render. Les canaux non configurés ou invalides ne sont pas affichés ; les coordonnées ne sont pas écrites en clair dans les libellés des boutons.

En développement, les métadonnées canoniques et les routes `robots.txt` / `sitemap.xml` utilisent automatiquement `http://localhost:3000` si aucune URL n’est configurée. En production, définissez `NEXT_PUBLIC_SITE_URL` avec l’URL publique HTTPS complète du site. Sur Render, récupérez l’URL `onrender.com`, ajoutez-la comme valeur de `NEXT_PUBLIC_SITE_URL`, puis redéployez pour que les métadonnées utilisent le bon domaine. `RENDER_EXTERNAL_URL` reste utilisé comme solution de repli. Ne configurez pas une URL locale en production.

```bash
npm run dev
```

Ouvrez ensuite http://localhost:3000. Pour préparer une version de production, utilisez `npm run build`, puis `npm start`.

## Pages

- **Accueil** (`/`) : Page de présentation des services de création de sites web, des cours de mathématiques, et du processus de projet.
- **Contact** (`/contact`) : Page dédiée avec canaux de communication multiples (email, WhatsApp, téléphone, LinkedIn, portfolio) et FAQ.

La section Aperçus contient trois concepts fictifs dessinés directement dans la page ; ils sont identifiés comme exemples et ne doivent pas être présentés comme des réalisations clients. Remplacez-les par des projets réels et autorisés dès que vous disposez d'un portfolio.

Les formules définissent un périmètre de départ sans publier de tarif. Avant toute vente, confirmez que le nombre de pages, les livrables et les limites affichés correspondent à votre offre effective. Domaine, hébergement et maintenance ne sont pas annoncés comme inclus.

La section Cours de mathématiques présente les niveaux du collège (6e à 3e) et du lycée (2nde à Terminale), selon le programme béninois, ainsi que la préparation aux devoirs et examens (BEPC et BAC). Elle décrit une méthode fondée sur le repérage des besoins, des explications progressives, des exercices corrigés et le suivi des notions à revoir. Les cours sont proposés à domicile ou à distance ; disponibilités et modalités sont à convenir avec l’enseignant. Aucun tarif ni résultat scolaire garanti n’est annoncé.

Le site inclut aussi des métadonnées de partage social, une image Open Graph, des données structurées Schema.org pour l’organisation, la création de sites et les cours, ainsi que des routes dynamiques pour `robots.txt` et `sitemap.xml`.

## Déploiement sur Render

### Configuration

Le projet inclut un fichier `render.yaml` pour déploiement simplifié sur Render.

1. **Créer un compte Render** et authentifier votre dépôt Git.
2. **Créer un nouveau service Web** dans le tableau de bord Render.
3. **Connecter votre dépôt** et sélectionner la branche à déployer.
4. **Configurer les variables d'environnement** :
   - `NEXT_PUBLIC_WHATSAPP_NUMBER` : numéro WhatsApp au format international
   - `NEXT_PUBLIC_SITE_URL` : URL publique HTTPS du service (ex: `https://afritech-elite.onrender.com`)
5. **Déployer** : Render exécutera automatiquement `npm run build` et `npm start`.

### URL publique et SEO

Une fois déployé, Render génère une URL publique du type `https://<service-name>.onrender.com`. Cette URL doit être configurée dans `NEXT_PUBLIC_SITE_URL` pour que :
- Les balises canoniques et de partage social pointent vers le bon domaine
- Le sitemap et robots.txt soient correctement indexés par les moteurs de recherche
- L'image Open Graph apparaisse correctement dans les aperçus

### Notes sur le déploiement

- Le plan gratuit de Render peut prendre 30–50 secondes au premier lancement après une période d'inactivité.
- Render fournit HTTPS automatiquement, ce qui est nécessaire pour PWA et les installations de service worker.
- Les variables d'environnement doivent être redéployées après modification pour être prises en compte.

## Application web progressive (PWA)

Le site propose un manifeste installable, des icônes adaptées aux appareils, un bouton d’installation sur les navigateurs compatibles et un mode hors connexion de base. Après une première visite en ligne, le service worker met en cache la page d’accueil, la page hors connexion, l’illustration animée d’accueil, les icônes et les ressources statiques Next.js. WhatsApp et les ressources externes nécessitent une connexion. Le service worker et l’installation PWA nécessitent HTTPS en production (Render fournit HTTPS) ; localhost est accepté pour le développement.
