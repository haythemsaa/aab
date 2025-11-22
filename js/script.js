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
        // Simulation d'envoi (à remplacer par vraie soumission)
        showSuccessMessage(form);
        form.reset();

        // TODO: Remplacer par vraie soumission AJAX
        // submitFormData(form);
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
function showSuccessMessage(form) {
  const successDiv = document.createElement('div');
  successDiv.className = 'alert alert-success';
  successDiv.style.backgroundColor = '#D4EDDA';
  successDiv.style.color = '#155724';
  successDiv.style.padding = '1rem';
  successDiv.style.borderRadius = '6px';
  successDiv.style.marginBottom = '1rem';
  successDiv.style.border = '1px solid #C3E6CB';
  successDiv.innerHTML = `
    <strong>✓ Message envoyé avec succès !</strong><br>
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
