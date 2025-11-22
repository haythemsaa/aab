# 🏠 Site Web AAB Brocanteur - Bruxelles

Site web professionnel pour **AAB Brocanteur**, spécialiste du vide maison, vide appartement, vide grenier et achat d'antiquités à Bruxelles.

## 📋 Description

Site vitrine moderne et optimisé SEO pour présenter les services d'AAB Brocanteur dans la Région de Bruxelles-Capitale. Design professionnel inspiré des standards du secteur artisanal, adapté au métier de brocanteur avec des couleurs vintage et chaleureuses.

## 🎯 Objectifs

- **SEO local optimisé** : Cibler les recherches "vide maison Bruxelles", "brocanteur Bruxelles", etc.
- **Vocabulaire belge** : Utilisation systématique de "VIDE" plutôt que "débarras"
- **Conversion** : Inciter aux demandes de devis et appels téléphoniques
- **Expertise** : Mettre en avant la double compétence (vide + brocante/antiquités)
- **3 scénarios financiers** : Expliquer clairement que le client peut gagner de l'argent, avoir un service gratuit, ou payer un coût réduit

## 📁 Structure du Site

```
/
├── index.html                                    # Page d'accueil
├── vide-maison-bruxelles.html                   # Service vide maison
├── vide-appartement-bruxelles.html              # Service vide appartement
├── vide-grenier-bruxelles.html                  # Service vide grenier
├── vide-cave-bruxelles.html                     # Service vide cave
├── vide-professionnel-bruxelles.html            # Service vide professionnel
├── brocanteur-achat-antiquites-bruxelles.html   # Service achat antiquités
├── vide-succession-bruxelles.html               # Service vide succession
├── contact.html                                  # Page contact avec formulaire
├── zones-intervention.html                       # Liste des 19 communes
├── a-propos.html                                # À propos d'AAB Brocanteur
├── sitemap.xml                                   # Plan du site
├── robots.txt                                    # Fichier robots
├── /css/
│   └── style.css                                # Feuille de style principale
├── /js/
│   └── script.js                                # JavaScript (navigation, formulaire, animations)
├── /images/
│   ├── /services/                               # Images des services (à ajouter)
│   └── /icons/                                  # Icônes (à ajouter)
└── README.md                                     # Ce fichier
```

## 🎨 Design

### Palette de Couleurs

Le design utilise des couleurs chaleureuses et vintage adaptées au métier de brocanteur :

- **Primaire** : `#8B6F47` (Marron chaud bois)
- **Secondaire** : `#C4A661` (Or/bronze)
- **Accent** : `#A67C52` (Terre cuite)
- **Foncé** : `#2C2416` (Marron très foncé)
- **Fond clair** : `#FAF8F5` (Blanc cassé)
- **Succès** : `#5C8F5A` (Vert)
- **Alerte** : `#D97642` (Orange)

### Typographie

- **Titres** : Georgia (serif) - aspect classique et ancien
- **Texte** : Segoe UI (sans-serif) - lisibilité moderne

### Responsive Design

Le site est entièrement responsive (mobile-first) :
- **Mobile** : < 768px (menu hamburger, layout simple colonne)
- **Tablette** : 768px - 968px
- **Desktop** : > 968px

## ✨ Fonctionnalités

### Navigation

- **Header sticky** avec logo, navigation et bouton CTA
- **Menu mobile** avec toggle hamburger
- **Navigation au clavier** (accessibilité)
- **Smooth scroll** pour les ancres

### Formulaires

- **Validation HTML5 + JavaScript**
- **Protection anti-spam** (honeypot)
- **Messages d'erreur clairs**
- **Champs obligatoires** marqués avec *
- **RGPD** : case à cocher pour consentement

### Animations

- **Fade-in au scroll** pour les éléments (Intersection Observer)
- **Transitions smooth** sur les boutons et liens
- **Hover effects** sur les cartes de services

### SEO

#### Balises Meta

Chaque page inclut :
- `<title>` unique et optimisé (max 60 caractères)
- `<meta description>` attractive (max 155 caractères)
- Open Graph pour réseaux sociaux
- Canonical URL

#### Schema.org (Données Structurées)

- **LocalBusiness** (page d'accueil)
- **Service** (pages services)
- **FAQPage** (pages services avec FAQ)
- **BreadcrumbList** (fil d'Ariane)

#### Mots-Clés Ciblés

**Primaires :**
- vide maison bruxelles
- vide appartement bruxelles
- vide grenier bruxelles
- vide cave bruxelles
- brocanteur bruxelles
- achat antiquités bruxelles

**Locaux (19 communes) :**
Anderlecht, Auderghem, Berchem-Sainte-Agathe, Bruxelles-Ville, Etterbeek, Evere, Forest, Ganshoren, Ixelles, Jette, Koekelberg, Molenbeek-Saint-Jean, Saint-Gilles, Saint-Josse-ten-Noode, Schaerbeek, Uccle, Watermael-Boitsfort, Woluwe-Saint-Lambert, Woluwe-Saint-Pierre

## 📝 Contenu

### Messages Clés

Chaque page met en avant :

1. **⚠️ "Ne jetez rien avant notre visite !"** - Beaucoup de gens jettent des objets de valeur
2. **💎 "Vos objets ont peut-être de la valeur"** - Expertise en antiquités
3. **💰 "3 scénarios possibles"** - Vous gagnez / Neutre / Vous payez (réduit)
4. **🔒 "Service professionnel et discret"** - Surtout pour successions
5. **🗺️ "Intervention dans toute la région bruxelloise"** - 19 communes

### Pages Services (Structure Type)

Chaque page service (800-1500 mots) comprend :

1. **H1 optimisé SEO**
2. **Introduction** (150-200 mots)
3. **Breadcrumb** navigation
4. **"Notre Service Comprend"** - Liste détaillée des prestations
5. **"Comment se Déroule..."** - Processus étape par étape
6. **"Les 3 Scénarios Possibles"** - Financièrement transparent
7. **"Pourquoi Nous Choisir"** - Avantages compétitifs
8. **"Zones d'Intervention"** - 19 communes listées
9. **FAQ** - 5-8 questions/réponses spécifiques
10. **Services Connexes** - Liens internes
11. **CTA final** - Appel à l'action fort

## 🚀 Installation & Déploiement

### Pré-requis

Aucun pré-requis particulier. Site en HTML/CSS/JS vanilla.

### Installation Locale

```bash
# Cloner le repository
git clone [URL_DU_REPO]

# Ouvrir index.html dans un navigateur
# ou lancer un serveur local :
python -m http.server 8000
# Puis ouvrir http://localhost:8000
```

### Déploiement

Le site peut être déployé sur n'importe quel hébergeur web :

- **Netlify** (recommandé pour simplicité)
- **GitHub Pages**
- **Hébergeur classique** (OVH, Infomaniak, etc.)

#### Checklist Avant Déploiement

- [ ] Remplacer `+32 XXX XXX XXX` par le vrai numéro de téléphone
- [ ] Remplacer `contact@aab-brocanteur.be` par le vrai email
- [ ] Ajouter le logo `images/logo.png` ou `logo.svg`
- [ ] Ajouter les images de services dans `images/services/`
- [ ] Ajouter les icônes dans `images/icons/`
- [ ] Vérifier que le domaine `https://aab-brocanteur.be/` est correct dans sitemap.xml
- [ ] Tester le formulaire de contact (backend à configurer)
- [ ] Configurer Google Analytics ou autre outil analytics (optionnel)
- [ ] Tester sur mobile, tablette, desktop
- [ ] Valider le HTML (W3C Validator)
- [ ] Tester la vitesse (Google PageSpeed Insights)
- [ ] Soumettre le sitemap à Google Search Console

## 📊 SEO - Checklist Post-Déploiement

### Google Search Console

1. Ajouter et vérifier la propriété
2. Soumettre le sitemap.xml
3. Demander l'indexation des pages principales
4. Vérifier les données structurées (Schema.org)

### Google My Business

1. Créer/revendiquer la fiche Google My Business
2. Renseigner toutes les informations (adresse, téléphone, horaires, photos)
3. Choisir les catégories : "Brocanteur", "Service de vide maison"
4. Demander des avis clients

### Mots-Clés Locaux

S'assurer que chaque commune de Bruxelles est bien mentionnée dans le contenu pour capter les recherches locales.

### Backlinks

- Annuaires locaux belges
- Partenaires (antiquaires, déménageurs, notaires)
- Réseaux sociaux (Facebook, Instagram)

## 🖼️ Images à Ajouter

Le site est fonctionnel mais nécessite l'ajout d'images pour être complet :

### Images Requises

1. **Logo** : `images/logo.svg` ou `logo.png`
2. **Hero** : `images/hero.jpg` (photo d'ambiance brocante)
3. **Services** :
   - `images/services/vide-maison.jpg`
   - `images/services/vide-appartement.jpg`
   - `images/services/vide-grenier.jpg`
   - `images/services/vide-cave.jpg`
   - `images/services/vide-professionnel.jpg`
   - `images/services/achat-antiquites.jpg`
   - `images/services/vide-succession.jpg`

4. **Icônes** (optionnel, actuellement emojis Unicode) :
   - Icons pour chaque service
   - Icons pour avantages/features

### Format Recommandé

- **Format** : WebP (meilleure compression) + fallback JPG
- **Résolution** : Optimisées pour le web (< 200 Ko par image)
- **Dimensions** :
  - Hero : 1920x800px
  - Services : 600x400px
  - Logo : SVG vectoriel ou PNG transparent

### Outils de Compression

- **TinyPNG** : https://tinypng.com/
- **Squoosh** : https://squoosh.app/
- **ImageOptim** (Mac)

## ⚙️ Configuration du Formulaire

Le formulaire actuel est en HTML/JS uniquement (front-end). Pour le rendre fonctionnel, vous devez :

### Option 1 : Service Tiers (Recommandé)

Utiliser un service comme :
- **Formspree** : https://formspree.io/
- **Netlify Forms** : (si hébergé sur Netlify)
- **EmailJS** : https://www.emailjs.com/

### Option 2 : Backend PHP

Créer un fichier `send-email.php` pour traiter le formulaire :

```php
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
    $service = htmlspecialchars($_POST['service']);
    $commune = htmlspecialchars($_POST['commune']);
    $message = htmlspecialchars($_POST['message']);

    $to = "contact@aab-brocanteur.be";
    $subject = "Nouveau devis - " . $service;
    $body = "Nom: $name\nEmail: $email\nTéléphone: $phone\nService: $service\nCommune: $commune\n\nMessage:\n$message";
    $headers = "From: $email";

    if (mail($to, $subject, $body, $headers)) {
        echo "OK";
    } else {
        echo "ERROR";
    }
}
?>
```

Puis modifier `js/script.js` pour envoyer vers ce fichier.

## 🔧 Personnalisation

### Modifier les Couleurs

Éditer les variables CSS dans `css/style.css` :

```css
:root {
  --primary-color: #8B6F47;
  --secondary-color: #C4A661;
  /* ... */
}
```

### Ajouter un Service

1. Dupliquer une page service existante
2. Adapter le contenu (H1, texte, FAQ, etc.)
3. Ajouter le lien dans la navigation (header/footer)
4. Ajouter l'URL dans `sitemap.xml`

### Modifier le Contenu

Tous les textes sont directement dans les fichiers HTML. Modifier directement les fichiers pour changer le contenu.

## 📱 Compatibilité

### Navigateurs

- ✅ Chrome (dernière version)
- ✅ Firefox (dernière version)
- ✅ Safari (dernière version)
- ✅ Edge (dernière version)
- ⚠️ IE11 (compatibilité partielle, non recommandé)

### Appareils

- ✅ Desktop (1920px et +)
- ✅ Laptop (1366px - 1920px)
- ✅ Tablette (768px - 1366px)
- ✅ Mobile (320px - 768px)

## 🐛 Bugs Connus & Limitations

- **Formulaire** : Nécessite configuration backend pour fonctionner réellement
- **Images** : Placeholders à remplacer par vraies images
- **Téléphone/Email** : Coordonnées fictives (`+32 XXX XXX XXX`)

## 📈 Améliorations Futures

### Court Terme

- [ ] Ajouter les vraies images
- [ ] Configurer le formulaire de contact
- [ ] Créer les pages mentions légales, politique de confidentialité, CGV
- [ ] Ajouter Google Analytics
- [ ] Optimiser les images (WebP + lazy loading)

### Moyen Terme

- [ ] Blog pour le SEO (articles sur la brocante, conseils vide maison, etc.)
- [ ] Galerie photos avant/après
- [ ] Témoignages clients avec photos
- [ ] Chat en direct ou chatbot
- [ ] Système de réservation en ligne pour visite d'estimation

### Long Terme

- [ ] Version multilingue (NL pour Bruxelles)
- [ ] Espace client avec suivi de dossier
- [ ] Calculateur de devis en ligne
- [ ] Intégration CRM

## 👥 Support & Contact

Pour toute question sur le code ou la personnalisation :

- **Email** : [votre email de développeur]
- **Documentation** : Ce fichier README.md

---

## 📜 Licence

Ce projet a été créé spécifiquement pour AAB Brocanteur.

---

**Dernière mise à jour** : 22 novembre 2024

**Version** : 1.0.0
