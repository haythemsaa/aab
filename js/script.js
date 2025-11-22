// =====================================================
// AAB BROCANTEUR - SCRIPT PRINCIPAL
// Gestion des interactions et animations
// =====================================================

document.addEventListener('DOMContentLoaded', function() {

  // ===== MENU MOBILE =====
  initMobileMenu();

  // ===== SMOOTH SCROLL =====
  initSmoothScroll();

  // ===== FORMULAIRE =====
  initFormValidation();

  // ===== ANIMATIONS ON SCROLL =====
  initScrollAnimations();

  // ===== STICKY HEADER =====
  initStickyHeader();

  // ===== LIENS TÉLÉPHONE =====
  initPhoneLinks();
});

/**
 * Gestion du menu mobile
 */
function initMobileMenu() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && nav) {
    // Toggle menu
    menuToggle.addEventListener('click', function() {
      nav.classList.toggle('active');
      this.setAttribute('aria-expanded', nav.classList.contains('active'));

      // Animation de l'icône hamburger
      const icon = this.querySelector('i') || this;
      if (nav.classList.contains('active')) {
        icon.textContent = '✕';
      } else {
        icon.textContent = '☰';
      }
    });

    // Fermer le menu lors du clic sur un lien
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        nav.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        const icon = menuToggle.querySelector('i') || menuToggle;
        icon.textContent = '☰';
      });
    });

    // Fermer le menu si clic en dehors
    document.addEventListener('click', function(e) {
      if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
        nav.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        const icon = menuToggle.querySelector('i') || menuToggle;
        icon.textContent = '☰';
      }
    });
  }
}

/**
 * Smooth scroll pour les ancres
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      // Ignorer # seul
      if (href === '#') {
        e.preventDefault();
        return;
      }

      const targetElement = document.querySelector(href);

      if (targetElement) {
        e.preventDefault();

        const headerOffset = 80; // Hauteur du header sticky
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Validation et soumission du formulaire de contact
 */
function initFormValidation() {
  const forms = document.querySelectorAll('.contact-form');

  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      // Reset des messages d'erreur
      clearFormErrors(form);

      // Validation
      let isValid = true;

      // Nom
      const nameInput = form.querySelector('[name="name"]');
      if (nameInput && !nameInput.value.trim()) {
        showError(nameInput, 'Veuillez entrer votre nom');
        isValid = false;
      }

      // Téléphone
      const phoneInput = form.querySelector('[name="phone"]');
      if (phoneInput && !validatePhone(phoneInput.value)) {
        showError(phoneInput, 'Veuillez entrer un numéro de téléphone valide');
        isValid = false;
      }

      // Email
      const emailInput = form.querySelector('[name="email"]');
      if (emailInput && !validateEmail(emailInput.value)) {
        showError(emailInput, 'Veuillez entrer une adresse email valide');
        isValid = false;
      }

      // Service
      const serviceInput = form.querySelector('[name="service"]');
      if (serviceInput && !serviceInput.value) {
        showError(serviceInput, 'Veuillez sélectionner un service');
        isValid = false;
      }

      // Commune
      const communeInput = form.querySelector('[name="commune"]');
      if (communeInput && !communeInput.value.trim()) {
        showError(communeInput, 'Veuillez entrer votre commune ou code postal');
        isValid = false;
      }

      // Message
      const messageInput = form.querySelector('[name="message"]');
      if (messageInput && !messageInput.value.trim()) {
        showError(messageInput, 'Veuillez décrire votre besoin');
        isValid = false;
      }

      // RGPD
      const rgpdCheckbox = form.querySelector('[name="rgpd"]');
      if (rgpdCheckbox && !rgpdCheckbox.checked) {
        showError(rgpdCheckbox, 'Vous devez accepter la politique de confidentialité');
        isValid = false;
      }

      // Honeypot (anti-spam)
      const honeypot = form.querySelector('[name="website"]');
      if (honeypot && honeypot.value !== '') {
        // C'est un bot
        return false;
      }

      if (isValid) {
        // Soumettre le formulaire via AJAX
        submitFormData(form);
      } else {
        // Scroll vers la première erreur
        const firstError = form.querySelector('.form-error');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });
  });
}

/**
 * Valide un email
 */
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Valide un numéro de téléphone (format belge et international)
 */
function validatePhone(phone) {
  // Enlever les espaces, points, tirets, parenthèses
  const cleaned = phone.replace(/[\s\.\-\(\)]/g, '');
  // Accepter les numéros belges et internationaux (au moins 9 chiffres)
  const re = /^(\+)?[0-9]{9,15}$/;
  return re.test(cleaned);
}

/**
 * Affiche un message d'erreur sur un champ
 */
function showError(input, message) {
  const formGroup = input.closest('.form-group') || input.closest('.form-checkbox');

  if (formGroup) {
    // Ajouter la classe d'erreur
    formGroup.classList.add('has-error');
    input.classList.add('is-invalid');

    // Créer le message d'erreur
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.style.color = '#D9534F';
    errorDiv.style.fontSize = '0.9rem';
    errorDiv.style.marginTop = '0.3rem';
    errorDiv.textContent = message;

    formGroup.appendChild(errorDiv);
  }
}

/**
 * Supprime tous les messages d'erreur du formulaire
 */
function clearFormErrors(form) {
  form.querySelectorAll('.form-error').forEach(error => error.remove());
  form.querySelectorAll('.has-error').forEach(group => group.classList.remove('has-error'));
  form.querySelectorAll('.is-invalid').forEach(input => input.classList.remove('is-invalid'));
}

/**
 * Affiche un message de succès
 */
function showSuccessMessage(form, message = 'Message envoyé avec succès !') {
  const successDiv = document.createElement('div');
  successDiv.className = 'alert alert-success';
  successDiv.style.backgroundColor = '#D4EDDA';
  successDiv.style.color = '#155724';
  successDiv.style.padding = '1rem';
  successDiv.style.borderRadius = '6px';
  successDiv.style.marginBottom = '1rem';
  successDiv.style.border = '1px solid #C3E6CB';
  successDiv.innerHTML = `
    <strong>✓ ${message}</strong><br>
    Nous vous contacterons dans les plus brefs délais.
  `;

  form.insertBefore(successDiv, form.firstChild);

  // Scroll vers le message
  successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

  // Supprimer le message après 5 secondes
  setTimeout(() => {
    successDiv.style.transition = 'opacity 0.5s';
    successDiv.style.opacity = '0';
    setTimeout(() => successDiv.remove(), 500);
  }, 5000);
}

/**
 * Affiche un message d'erreur global
 */
function showErrorMessage(form, message = 'Une erreur est survenue') {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'alert alert-error';
  errorDiv.style.backgroundColor = '#F8D7DA';
  errorDiv.style.color = '#721C24';
  errorDiv.style.padding = '1rem';
  errorDiv.style.borderRadius = '6px';
  errorDiv.style.marginBottom = '1rem';
  errorDiv.style.border = '1px solid #F5C6CB';
  errorDiv.innerHTML = `
    <strong>✗ ${message}</strong>
  `;

  form.insertBefore(errorDiv, form.firstChild);

  // Scroll vers le message
  errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

  // Supprimer le message après 7 secondes
  setTimeout(() => {
    errorDiv.style.transition = 'opacity 0.5s';
    errorDiv.style.opacity = '0';
    setTimeout(() => errorDiv.remove(), 500);
  }, 7000);
}

/**
 * Soumettre le formulaire via AJAX
 */
function submitFormData(form) {
  // Désactiver le bouton submit
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn ? submitBtn.innerHTML : '';

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '⏳ Envoi en cours...';
  }

  // Préparer les données du formulaire
  const formData = new FormData(form);

  // Ajouter le token reCAPTCHA si disponible
  if (window.ReCaptcha && window.ReCaptcha.loaded) {
    window.ReCaptcha.execute('contact_form')
      .then(token => {
        formData.set('recaptcha_token', token);
        sendFormDataToServer(form, formData, submitBtn, originalBtnText);
      })
      .catch(err => {
        console.warn('reCAPTCHA error:', err);
        // Envoyer quand même sans reCAPTCHA
        sendFormDataToServer(form, formData, submitBtn, originalBtnText);
      });
  } else {
    // Envoyer sans reCAPTCHA
    sendFormDataToServer(form, formData, submitBtn, originalBtnText);
  }
}

/**
 * Envoyer les données au serveur
 */
function sendFormDataToServer(form, formData, submitBtn, originalBtnText) {
  fetch('send-email.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }

    if (data.success) {
      showSuccessMessage(form, data.message);
      form.reset();

      // Tracking de la conversion
      if (typeof Tracking !== 'undefined') {
        Tracking.trackFormSubmission('Contact Form', {
          service: formData.get('service'),
          commune: formData.get('commune')
        });
      }
    } else {
      showErrorMessage(form, data.message);
    }
  })
  .catch(error => {
    console.error('Form submission error:', error);

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }

    showErrorMessage(form, 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer ou nous contacter par téléphone.');
  });
}

/**
 * Animations au scroll
 */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observer les éléments à animer
  document.querySelectorAll('.service-card, .step, .scenario-card, .feature, .testimonial-card').forEach(el => {
    observer.observe(el);
  });
}

/**
 * Gestion du header sticky avec ombre au scroll
 */
function initStickyHeader() {
  const header = document.querySelector('.header');

  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
}

/**
 * Gestion des liens téléphone avec tracking
 */
function initPhoneLinks() {
  document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', function() {
      // Possibilité d'ajouter du tracking analytics ici
      console.log('Appel téléphonique initié:', this.getAttribute('href'));

      // Exemple avec Google Analytics (à décommenter si GA est installé)
      // if (typeof gtag !== 'undefined') {
      //   gtag('event', 'phone_call', {
      //     'event_category': 'contact',
      //     'event_label': this.getAttribute('href')
      //   });
      // }
    });
  });
}

/**
 * Détection du lien actif dans la navigation
 */
function setActiveNavLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname;

    if (linkPath === currentPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Appeler au chargement
setActiveNavLink();

/**
 * Protection anti-spam pour les emails
 */
function protectEmails() {
  // Remplace les emails encodés par de vrais liens mailto
  document.querySelectorAll('[data-email]').forEach(el => {
    const email = atob(el.getAttribute('data-email'));
    el.href = 'mailto:' + email;
    if (!el.textContent) {
      el.textContent = email;
    }
  });
}

protectEmails();
