# 📸 Guide des Images - AAB Brocanteur

Ce document liste toutes les images à ajouter au site pour un rendu professionnel et attractif.

## 🎯 Images Prioritaires

### 1. Logo (URGENT)

**Fichier :** `images/logo.png` ou `images/logo.svg`
**Dimensions recommandées :** SVG (vectoriel) ou PNG 500x200px
**Utilisation :** Header, footer, favicon
**Description :** Logo professionnel AAB Brocanteur avec typographie vintage/classique

**Sources recommandées pour création :**
- Canva.com (template logo gratuit)
- Looka.com (générateur de logo IA)
- Créateur graphique professionnel

**Style recommandé :**
- Couleurs : Marron (#8B6F47) + Or (#C4A661)
- Police : Serif classique (Georgia, Garamond)
- Icône : Ancien meuble, clé vintage, ou initiales stylisées

---

### 2. Image Hero (Page d'accueil)

**Fichier :** `images/hero-home.jpg`
**Dimensions :** 1920x800px (responsive)
**Format :** JPG optimisé (< 200 Ko)
**Utilisation :** Bannière principale page d'accueil

**Sujet :**
- Brocanteur au travail
- Intérieur maison avec meubles anciens
- Grenier/cave rempli d'objets vintage
- Objets de brocante disposés élégamment

**Sources gratuites :**
- Unsplash.com : `antique furniture`, `flea market`, `vintage items`
- Pexels.com : `antique shop`, `second hand`, `vintage decor`
- Pixabay.com : `brocante`, `antiquités`

**Mots-clés de recherche :**
- `antique furniture belgium`
- `flea market interior`
- `vintage objects collection`
- `attic full of objects`
- `estate sale items`

---

## 📦 Images Services (7 images)

Créer un dossier `images/services/` avec les images suivantes :

### 3.1 Vide Maison
**Fichier :** `images/services/vide-maison.jpg`
**Sujet :** Maison vide ou en cours de vidage, pièce avec meubles
**Recherche :** `house clearance`, `empty house`, `moving house`

### 3.2 Vide Appartement
**Fichier :** `images/services/vide-appartement.jpg`
**Sujet :** Appartement urbain, salon moderne à vider
**Recherche :** `apartment clearance`, `empty apartment`, `urban flat`

### 3.3 Vide Grenier
**Fichier :** `images/services/vide-grenier.jpg`
**Sujet :** Grenier/combles avec cartons, objets anciens
**Recherche :** `attic full`, `attic clearance`, `loft storage`

### 3.4 Vide Cave
**Fichier :** `images/services/vide-cave.jpg`
**Sujet :** Cave/sous-sol avec objets entassés
**Recherche :** `basement clearance`, `cellar storage`, `underground storage`

### 3.5 Vide Professionnel
**Fichier :** `images/services/vide-professionnel.jpg`
**Sujet :** Bureau professionnel, entrepôt, commerce
**Recherche :** `office clearance`, `warehouse empty`, `commercial space`

### 3.6 Achat Antiquités
**Fichier :** `images/services/achat-antiquites.jpg`
**Sujet :** Meubles anciens, objets de valeur, brocante
**Recherche :** `antique furniture`, `vintage objects`, `antique dealer`

### 3.7 Vide Succession
**Fichier :** `images/services/vide-succession.jpg`
**Sujet :** Maison de famille, objets personnels anciens
**Recherche :** `estate clearance`, `family home clearance`, `inherited items`

---

## 🎨 Images pour Galerie (6-12 photos)

**Dossier :** `images/gallery/`
**Format :** JPG 800x600px
**Poids :** < 150 Ko chaque

**Sujets variés :**
1. Meubles anciens (armoire, commode, buffet)
2. Objets de décoration vintage
3. Vaisselle ancienne (porcelaine, argenterie)
4. Livres anciens
5. Tableaux, cadres
6. Outils anciens
7. Lampes vintage
8. Bibelots et curiosités
9. Vide grenier avant/après
10. Équipe au travail (photos authentiques à prendre)

---

## 👥 Photos Témoignages (3 photos)

**Dossier :** `images/testimonials/`
**Format :** Portraits ronds 150x150px
**Type :** Photos de profil (ou avatars génériques)

**Options :**
- **Option 1 :** Vraies photos de clients (avec accord RGPD)
- **Option 2 :** Avatars génériques/illustrations
- **Option 3 :** Icons/initiales stylisées

**Sources avatars :**
- UI Avatars : https://ui-avatars.com/
- Boring Avatars : https://boringavatars.com/
- DiceBear Avatars : https://www.dicebear.com/

---

## 🏘️ Images Zones/Communes (optionnel)

**Dossier :** `images/zones/`
**Sujet :** Photos des 19 communes de Bruxelles (landmarks)

**Exemples :**
- Bruxelles-Ville : Grand Place
- Ixelles : Étangs d'Ixelles
- Uccle : Parc de Wolvendael
- Etc.

**Source :** Wikimedia Commons (domaine public)

---

## 🎯 Icônes Services (déjà en émoji, à améliorer)

**Option A :** Utiliser des SVG custom (voir section suivante)
**Option B :** Utiliser Font Awesome (gratuit)
**Option C :** Créer des icônes personnalisées

**Services Font Awesome (CDN) :**
```html
<!-- Ajouter dans <head> -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

<!-- Icônes recommandées -->
Vide Maison : <i class="fas fa-home"></i>
Vide Appartement : <i class="fas fa-building"></i>
Vide Grenier : <i class="fas fa-warehouse"></i>
Vide Cave : <i class="fas fa-dungeon"></i>
Vide Professionnel : <i class="fas fa-briefcase"></i>
Achat Antiquités : <i class="fas fa-gem"></i>
Vide Succession : <i class="fas fa-hands-helping"></i>
```

---

## 📏 Spécifications Techniques

### Formats Recommandés
- **Logo :** SVG (vectoriel) ou PNG transparent
- **Photos :** JPG optimisé
- **Icônes :** SVG inline ou Font Awesome

### Optimisation
- **Compression :** TinyPNG.com, Squoosh.app
- **Format moderne :** WebP + fallback JPG
- **Lazy loading :** Attribut `loading="lazy"` sur images

### Dimensions Standards
```
Hero : 1920x800px
Services : 800x600px
Gallery : 800x600px
Thumbnails : 400x300px
Avatars : 150x150px
Logo : Variable (SVG) ou 500x200px
```

---

## 🔄 Workflow d'Ajout d'Images

### 1. Télécharger les images
Depuis Unsplash, Pexels, ou Pixabay

### 2. Optimiser
Passer par TinyPNG ou Squoosh

### 3. Renommer
Utiliser des noms descriptifs :
- `hero-home.jpg`
- `service-vide-maison.jpg`
- `gallery-armoire-ancienne.jpg`

### 4. Placer dans le bon dossier
```
images/
├── logo.svg
├── hero-home.jpg
├── services/
│   ├── vide-maison.jpg
│   ├── vide-appartement.jpg
│   └── ...
├── gallery/
│   ├── photo-1.jpg
│   ├── photo-2.jpg
│   └── ...
└── testimonials/
    ├── client-1.jpg
    ├── client-2.jpg
    └── client-3.jpg
```

### 5. Mettre à jour le HTML
Remplacer les placeholders par les vraies images

---

## 📝 Checklist Images

- [ ] Logo AAB Brocanteur (SVG ou PNG)
- [ ] Image hero page d'accueil
- [ ] 7 images services
- [ ] 6-12 photos galerie
- [ ] 3 photos témoignages
- [ ] Favicon (généré depuis logo)
- [ ] Optimiser toutes les images (< 200 Ko)
- [ ] Ajouter attributs `alt` descriptifs
- [ ] Tester responsive sur mobile

---

## 💡 Conseils

### Pour un Rendu Professionnel
1. **Cohérence visuelle** : Choisir des photos avec un style similaire
2. **Qualité HD** : Privilégier des photos nettes et bien éclairées
3. **Authenticité** : Photos réelles > stock photos génériques
4. **Alt text** : Toujours remplir pour le SEO et l'accessibilité

### Budget Zéro
- Unsplash, Pexels, Pixabay : 100% gratuits
- Canva : Version gratuite pour le logo
- TinyPNG : Compression gratuite

### Budget Pro
- Shutterstock, Adobe Stock : Photos premium
- 99designs, Fiverr : Logo professionnel
- Photographe local : Photos authentiques du travail

---

## 🚀 Prochaines Étapes

1. **Priorité 1 :** Logo + Image hero
2. **Priorité 2 :** 7 images services
3. **Priorité 3 :** Galerie photos
4. **Optionnel :** Photos témoignages, zones

**Une fois les images ajoutées, le site sera visuellement complet et professionnel !**
