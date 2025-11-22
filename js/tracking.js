// =====================================================
// TRACKING & RECAPTCHA
// Scripts de suivi et protection des formulaires
// =====================================================

/**
 * Google reCAPTCHA v3
 */
const ReCaptcha = {
  siteKey: '6Ld4sCwqAAAAADO6v4lm1OrHrbk8HhRVKdyMyB7s',
  loaded: false,

  /**
   * Charger le script reCAPTCHA
   */
  load: function() {
    if (this.loaded) return Promise.resolve();

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${this.siteKey}`;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        this.loaded = true;
        console.log('✅ reCAPTCHA loaded');
        resolve();
      };

      script.onerror = () => {
        console.error('❌ Failed to load reCAPTCHA');
        reject(new Error('Failed to load reCAPTCHA'));
      };

      document.head.appendChild(script);
    });
  },

  /**
   * Exécuter reCAPTCHA et obtenir le token
   */
  execute: function(action = 'submit') {
    return new Promise((resolve, reject) => {
      if (!this.loaded || typeof grecaptcha === 'undefined') {
        reject(new Error('reCAPTCHA not loaded'));
        return;
      }

      grecaptcha.ready(() => {
        grecaptcha.execute(this.siteKey, { action: action })
          .then(token => {
            console.log('✅ reCAPTCHA token obtained');
            resolve(token);
          })
          .catch(error => {
            console.error('❌ reCAPTCHA execution failed:', error);
            reject(error);
          });
      });
    });
  },

  /**
   * Ajouter le token reCAPTCHA au formulaire
   */
  addTokenToForm: function(form, action = 'submit') {
    return this.execute(action).then(token => {
      // Chercher si un champ token existe déjà
      let tokenInput = form.querySelector('input[name="recaptcha_token"]');

      if (!tokenInput) {
        // Créer un nouveau champ caché pour le token
        tokenInput = document.createElement('input');
        tokenInput.type = 'hidden';
        tokenInput.name = 'recaptcha_token';
        form.appendChild(tokenInput);
      }

      tokenInput.value = token;
      return token;
    });
  }
};

/**
 * Tracking des événements (conversions, clics, etc.)
 */
const Tracking = {

  /**
   * Suivre un appel téléphonique
   */
  trackPhoneCall: function(phoneNumber) {
    // Google Ads conversion
    if (typeof gtag !== 'undefined') {
      gtag('event', 'conversion', {
        'send_to': 'AW-789250428/9KzkCLzo34cZEPyCrPgC',
        'value': 1.0,
        'currency': 'EUR'
      });

      gtag('event', 'phone_call', {
        'event_category': 'contact',
        'event_label': phoneNumber
      });

      console.log('📞 Phone call tracked:', phoneNumber);
    }

    // Microsoft Clarity (si chargé)
    if (typeof clarity !== 'undefined') {
      clarity('set', 'phone_call', phoneNumber);
    }
  },

  /**
   * Suivre une soumission de formulaire
   */
  trackFormSubmission: function(formName, formData = {}) {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'form_submission', {
        'event_category': 'engagement',
        'event_label': formName,
        'value': formData
      });

      console.log('📋 Form submission tracked:', formName);
    }

    // Microsoft Clarity
    if (typeof clarity !== 'undefined') {
      clarity('set', 'form_submitted', formName);
    }
  },

  /**
   * Suivre un clic sur un service
   */
  trackServiceClick: function(serviceName) {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'service_click', {
        'event_category': 'engagement',
        'event_label': serviceName
      });

      console.log('🎯 Service click tracked:', serviceName);
    }
  },

  /**
   * Suivre le scroll de la page
   */
  trackScroll: function() {
    let scrollTracked = {
      25: false,
      50: false,
      75: false,
      100: false
    };

    window.addEventListener('scroll', () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      // Suivre à 25%, 50%, 75%, 100%
      for (let threshold in scrollTracked) {
        if (scrollPercent >= threshold && !scrollTracked[threshold]) {
          scrollTracked[threshold] = true;

          if (typeof gtag !== 'undefined') {
            gtag('event', 'scroll', {
              'event_category': 'engagement',
              'event_label': `${threshold}%`,
              'value': threshold
            });
          }
        }
      }
    });
  },

  /**
   * Suivre le temps passé sur la page
   */
  trackTimeOnPage: function() {
    const startTime = Date.now();

    // Envoyer le temps à la fermeture
    window.addEventListener('beforeunload', () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000); // en secondes

      if (typeof gtag !== 'undefined' && timeSpent > 5) {
        gtag('event', 'time_on_page', {
          'event_category': 'engagement',
          'event_label': document.title,
          'value': timeSpent
        });
      }
    });
  }
};

/**
 * Initialisation automatique
 */
document.addEventListener('DOMContentLoaded', function() {

  // Charger reCAPTCHA si consent donné
  const consent = window.CookieConsent ? window.CookieConsent.getConsent() : null;
  if (consent && consent.essential) {
    ReCaptcha.load().catch(err => console.warn('reCAPTCHA load error:', err));
  }

  // Attacher reCAPTCHA aux formulaires
  document.querySelectorAll('form.contact-form').forEach(form => {
    form.addEventListener('submit', function(e) {
      // Si reCAPTCHA est chargé, ajouter le token avant soumission
      if (ReCaptcha.loaded) {
        e.preventDefault();

        ReCaptcha.addTokenToForm(form, 'contact_form')
          .then(() => {
            // Token ajouté, soumettre le formulaire
            console.log('✅ reCAPTCHA token added to form');
            // Ici vous pouvez soumettre le formulaire via AJAX ou laisser la soumission normale
          })
          .catch(err => {
            console.error('reCAPTCHA error:', err);
            // Soumettre quand même en cas d'erreur reCAPTCHA
          });
      }
    });
  });

  // Tracking des clics téléphone
  document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', function() {
      Tracking.trackPhoneCall(this.getAttribute('href'));
    });
  });

  // Tracking des clics sur services
  document.querySelectorAll('.service-card a, .service-card').forEach(card => {
    card.addEventListener('click', function(e) {
      const serviceName = this.querySelector('h3')?.textContent || 'Unknown Service';
      Tracking.trackServiceClick(serviceName);
    });
  });

  // Tracking du scroll
  if (consent && consent.analytics) {
    Tracking.trackScroll();
    Tracking.trackTimeOnPage();
  }
});

// Exposer globalement
window.ReCaptcha = ReCaptcha;
window.Tracking = Tracking;
