<?php
/**
 * Configuration Email - AAB Brocanteur
 *
 * ⚠️ IMPORTANT : Remplir ces informations avant utilisation
 */

// Configuration Email de destination
define('EMAIL_TO', 'contact@aab-brocanteur.be'); // Votre email
define('EMAIL_FROM', 'noreply@aab-brocanteur.be'); // Email expéditeur
define('EMAIL_SUBJECT_PREFIX', '[AAB Brocanteur] '); // Préfixe sujet

// Configuration SMTP (optionnel - pour serveur SMTP externe)
// Si vide, utilise la fonction mail() PHP par défaut
define('SMTP_HOST', ''); // Ex: smtp.gmail.com
define('SMTP_PORT', ''); // Ex: 587
define('SMTP_USERNAME', ''); // Votre email SMTP
define('SMTP_PASSWORD', ''); // Votre mot de passe SMTP
define('SMTP_ENCRYPTION', ''); // tls ou ssl

// Configuration reCAPTCHA
define('RECAPTCHA_SECRET_KEY', 'VOTRE_CLE_SECRETE_RECAPTCHA'); // Clé secrète reCAPTCHA v3

// Configuration générale
define('SITE_URL', 'https://aab-brocanteur.be');
define('ADMIN_EMAIL', 'admin@aab-brocanteur.be'); // Email pour notifications d'erreur

// Protection anti-spam
define('HONEYPOT_FIELD', 'website'); // Nom du champ honeypot
define('MAX_SUBMISSIONS_PER_HOUR', 5); // Max soumissions par IP/heure

// Mode debug (à désactiver en production)
define('DEBUG_MODE', false);

// Langue
define('LANG', 'fr');

// Messages de réponse
$messages = [
    'fr' => [
        'success' => 'Votre message a été envoyé avec succès ! Nous vous contacterons dans les plus brefs délais.',
        'error_general' => 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer ou nous contacter par téléphone.',
        'error_spam' => 'Votre soumission a été identifiée comme spam.',
        'error_rate_limit' => 'Vous avez atteint la limite de soumissions. Veuillez réessayer plus tard.',
        'error_missing_fields' => 'Veuillez remplir tous les champs obligatoires.',
        'error_invalid_email' => 'Adresse email invalide.',
        'error_invalid_phone' => 'Numéro de téléphone invalide.',
        'error_recaptcha' => 'Échec de la vérification anti-spam. Veuillez réessayer.',
        'error_recaptcha_low_score' => 'Votre requête semble suspecte. Si vous êtes humain, veuillez nous contacter par téléphone.'
    ]
];

// Retourner le message selon la langue
function getMessage($key) {
    global $messages;
    $lang = defined('LANG') ? LANG : 'fr';
    return isset($messages[$lang][$key]) ? $messages[$lang][$key] : $messages['fr'][$key];
}
