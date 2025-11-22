// =====================================================
// GESTION DES COOKIES - RGPD/GDPR COMPLIANT
// Bannière de consentement et gestion des préférences
// =====================================================

(function() {
  'use strict';

  // Configuration
  const COOKIE_NAME = 'aab_cookie_consent';
  const COOKIE_EXPIRY = 365; // jours

  const CookieConsent = {

    /**
     * Initialisation
     */
    init: function() {
      // Vérifier si le consentement existe déjà
      const consent = this.getConsent();

      if (!consent) {
        // Pas de consentement : afficher la bannière
        this.showBanner();
      } else {
        // Consentement existant : charger les scripts autorisés
        this.loadScriptsBasedOnConsent(consent);
      }

      // Écouter les clics sur le bouton "Paramètres cookies" (footer)
      this.attachSettingsListeners();
    },

    /**
     * Afficher la bannière de cookies
     */
    showBanner: function() {
      // Créer la bannière si elle n'existe pas
      if (document.getElementById('cookie-banner')) return;

      const banner = document.createElement('div');
      banner.id = 'cookie-banner';
      banner.className = 'cookie-banner';
      banner.innerHTML = `
        <div class="cookie-banner-content">
          <div class="cookie-banner-text">
            <h3>🍪 Nous utilisons des cookies</h3>
            <p>
              Nous utilisons des cookies pour améliorer votre expérience, analyser notre trafic et personnaliser le contenu.
              En cliquant sur "Accepter tout", vous consentez à l'utilisation de TOUS les cookies.
              Vous pouvez également personnaliser vos choix.
            </p>
          </div>
          <div class="cookie-banner-actions">
            <button id="cookie-accept-all" class="btn btn-primary">Accepter tout</button>
            <button id="cookie-customize" class="btn btn-secondary">Personnaliser</button>
            <button id="cookie-reject-all" class="btn btn-secondary">Refuser tout</button>
          </div>
        </div>
      `;

      document.body.appendChild(banner);

      // Attacher les événements
      document.getElementById('cookie-accept-all').addEventListener('click', () => this.acceptAll());
      document.getElementById('cookie-reject-all').addEventListener('click', () => this.rejectAll());
      document.getElementById('cookie-customize').addEventListener('click', () => this.showCustomizeModal());
    },

    /**
     * Afficher le modal de personnalisation
     */
    showCustomizeModal: function() {
      // Supprimer l'ancien modal si existant
      const oldModal = document.getElementById('cookie-modal');
      if (oldModal) oldModal.remove();

      const modal = document.createElement('div');
      modal.id = 'cookie-modal';
      modal.className = 'cookie-modal';
      modal.innerHTML = `
        <div class="cookie-modal-overlay"></div>
        <div class="cookie-modal-content">
          <div class="cookie-modal-header">
            <h2>Paramètres des cookies</h2>
            <button class="cookie-modal-close" aria-label="Fermer">&times;</button>
          </div>

          <div class="cookie-modal-body">
            <p>Choisissez les types de cookies que vous souhaitez autoriser. Les cookies essentiels ne peuvent pas être désactivés.</p>

            <!-- Cookies Essentiels -->
            <div class="cookie-category">
              <div class="cookie-category-header">
                <label class="cookie-switch">
                  <input type="checkbox" id="cookie-essential" checked disabled>
                  <span class="cookie-slider"></span>
                </label>
                <div class="cookie-category-info">
                  <h3>Cookies Essentiels</h3>
                  <span class="cookie-badge">Toujours actifs</span>
                </div>
              </div>
              <p class="cookie-category-description">
                Ces cookies sont nécessaires au fonctionnement du site et ne peuvent pas être désactivés.
                Ils permettent la navigation, la sécurité et l'accès aux fonctionnalités de base.
              </p>
            </div>

            <!-- Cookies Analytics -->
            <div class="cookie-category">
              <div class="cookie-category-header">
                <label class="cookie-switch">
                  <input type="checkbox" id="cookie-analytics">
                  <span class="cookie-slider"></span>
                </label>
                <div class="cookie-category-info">
                  <h3>Cookies Analytiques</h3>
                  <span class="cookie-badge cookie-badge-optional">Optionnel</span>
                </div>
              </div>
              <p class="cookie-category-description">
                Ces cookies nous permettent de mesurer et d'analyser la fréquentation du site pour améliorer nos services.
                Ils collectent des informations anonymes sur votre navigation.
                <br><small><strong>Services :</strong> Google Analytics, Microsoft Clarity</small>
              </p>
            </div>

            <!-- Cookies Marketing -->
            <div class="cookie-category">
              <div class="cookie-category-header">
                <label class="cookie-switch">
                  <input type="checkbox" id="cookie-marketing">
                  <span class="cookie-slider"></span>
                </label>
                <div class="cookie-category-info">
                  <h3>Cookies Marketing</h3>
                  <span class="cookie-badge cookie-badge-optional">Optionnel</span>
                </div>
              </div>
              <p class="cookie-category-description">
                Ces cookies sont utilisés pour afficher des publicités pertinentes et mesurer l'efficacité de nos campagnes publicitaires.
                <br><small><strong>Services :</strong> Google Ads, Suivi des conversions</small>
              </p>
            </div>
          </div>

          <div class="cookie-modal-footer">
            <button id="cookie-save-preferences" class="btn btn-primary">Enregistrer mes préférences</button>
            <button id="cookie-accept-all-modal" class="btn btn-secondary">Accepter tout</button>
          </div>
        </div>
      `;

      document.body.appendChild(modal);

      // Charger les préférences existantes si elles existent
      const consent = this.getConsent();
      if (consent) {
        document.getElementById('cookie-analytics').checked = consent.analytics;
        document.getElementById('cookie-marketing').checked = consent.marketing;
      }

      // Événements
      document.querySelector('.cookie-modal-close').addEventListener('click', () => this.closeModal());
      document.querySelector('.cookie-modal-overlay').addEventListener('click', () => this.closeModal());
      document.getElementById('cookie-save-preferences').addEventListener('click', () => this.saveCustomPreferences());
      document.getElementById('cookie-accept-all-modal').addEventListener('click', () => this.acceptAll());
    },

    /**
     * Fermer le modal
     */
    closeModal: function() {
      const modal = document.getElementById('cookie-modal');
      if (modal) {
        modal.classList.add('cookie-modal-closing');
        setTimeout(() => modal.remove(), 300);
      }
    },

    /**
     * Accepter tous les cookies
     */
    acceptAll: function() {
      const consent = {
        essential: true,
        analytics: true,
        marketing: true,
        timestamp: Date.now()
      };

      this.saveConsent(consent);
      this.hideBanner();
      this.closeModal();
      this.loadScriptsBasedOnConsent(consent);

      // Notification
      this.showNotification('Vos préférences ont été enregistrées', 'success');
    },

    /**
     * Refuser tous les cookies (sauf essentiels)
     */
    rejectAll: function() {
      const consent = {
        essential: true,
        analytics: false,
        marketing: false,
        timestamp: Date.now()
      };

      this.saveConsent(consent);
      this.hideBanner();
      this.closeModal();

      // Notification
      this.showNotification('Seuls les cookies essentiels sont activés', 'info');
    },

    /**
     * Enregistrer les préférences personnalisées
     */
    saveCustomPreferences: function() {
      const consent = {
        essential: true,
        analytics: document.getElementById('cookie-analytics').checked,
        marketing: document.getElementById('cookie-marketing').checked,
        timestamp: Date.now()
      };

      this.saveConsent(consent);
      this.hideBanner();
      this.closeModal();
      this.loadScriptsBasedOnConsent(consent);

      // Notification
      this.showNotification('Vos préférences ont été enregistrées', 'success');
    },

    /**
     * Sauvegarder le consentement dans un cookie
     */
    saveConsent: function(consent) {
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + COOKIE_EXPIRY);

      document.cookie = `${COOKIE_NAME}=${JSON.stringify(consent)}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;
    },

    /**
     * Récupérer le consentement
     */
    getConsent: function() {
      const cookies = document.cookie.split(';');
      for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === COOKIE_NAME) {
          try {
            return JSON.parse(decodeURIComponent(value));
          } catch (e) {
            return null;
          }
        }
      }
      return null;
    },

    /**
     * Masquer la bannière
     */
    hideBanner: function() {
      const banner = document.getElementById('cookie-banner');
      if (banner) {
        banner.classList.add('cookie-banner-hidden');
        setTimeout(() => banner.remove(), 300);
      }
    },

    /**
     * Charger les scripts en fonction du consentement
     */
    loadScriptsBasedOnConsent: function(consent) {
      // Toujours charger les scripts essentiels
      // (déjà chargés dans le HTML de base)

      // Analytics
      if (consent.analytics) {
        this.loadAnalytics();
      }

      // Marketing
      if (consent.marketing) {
        this.loadMarketing();
      }
    },

    /**
     * Charger Google Analytics et Microsoft Clarity
     */
    loadAnalytics: function() {
      // Éviter de charger plusieurs fois
      if (window.analyticsLoaded) return;
      window.analyticsLoaded = true;

      // Google Analytics / Google Ads
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', 'AW-789250428');

      // Charger le script gtag.js
      const gtagScript = document.createElement('script');
      gtagScript.async = true;
      gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=AW-789250428';
      document.head.appendChild(gtagScript);

      // Microsoft Clarity
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;
        t.src="https://www.clarity.ms/tag/mbah4etx6l";
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "mbah4etx6l");

      console.log('📊 Analytics chargés (Google Analytics, Microsoft Clarity)');
    },

    /**
     * Charger Google Ads Conversion
     */
    loadMarketing: function() {
      // Éviter de charger plusieurs fois
      if (window.marketingLoaded) return;
      window.marketingLoaded = true;

      // Google Ads - Conversion téléphone
      if (window.gtag) {
        gtag('config', 'AW-789250428/9KzkCLzo34cZEPyCrPgC', {
          'phone_conversion_number': '0486752452'
        });
      }

      console.log('📢 Marketing chargé (Google Ads Conversion)');
    },

    /**
     * Attacher les événements pour ouvrir les paramètres
     */
    attachSettingsListeners: function() {
      // Créer un lien "Paramètres cookies" dans le footer si absent
      document.addEventListener('click', (e) => {
        if (e.target.id === 'cookie-settings-link' || e.target.classList.contains('cookie-settings-link')) {
          e.preventDefault();
          this.showCustomizeModal();
        }
      });
    },

    /**
     * Afficher une notification
     */
    showNotification: function(message, type = 'info') {
      const notification = document.createElement('div');
      notification.className = `cookie-notification cookie-notification-${type}`;
      notification.textContent = message;
      document.body.appendChild(notification);

      // Animation d'apparition
      setTimeout(() => notification.classList.add('cookie-notification-show'), 10);

      // Suppression après 3 secondes
      setTimeout(() => {
        notification.classList.remove('cookie-notification-show');
        setTimeout(() => notification.remove(), 300);
      }, 3000);
    }
  };

  // Initialiser au chargement du DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => CookieConsent.init());
  } else {
    CookieConsent.init();
  }

  // Exposer globalement pour permettre l'accès depuis d'autres scripts
  window.CookieConsent = CookieConsent;

})();
