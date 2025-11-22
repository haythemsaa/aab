<?php
/**
 * Gestionnaire de formulaire de contact - AAB Brocanteur
 *
 * Traite les soumissions de formulaire avec :
 * - Validation des champs
 * - Protection anti-spam (honeypot + reCAPTCHA)
 * - Rate limiting
 * - Envoi email
 * - Réponse JSON pour AJAX
 */

// Démarrer la session pour rate limiting
session_start();

// Charger la configuration
require_once 'config.php';

// Headers pour JSON
header('Content-Type: application/json; charset=utf-8');

// Fonction de logging (si debug activé)
function logDebug($message) {
    if (DEBUG_MODE) {
        error_log('[AAB Contact Form] ' . $message);
    }
}

// Fonction de réponse JSON
function jsonResponse($success, $message, $data = []) {
    echo json_encode([
        'success' => $success,
        'message' => $message,
        'data' => $data
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// Vérifier que c'est une requête POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(false, 'Méthode non autorisée');
}

// Rate limiting basique (par session)
if (!isset($_SESSION['form_submissions'])) {
    $_SESSION['form_submissions'] = [];
}

$now = time();
$oneHourAgo = $now - 3600;

// Nettoyer les anciennes soumissions
$_SESSION['form_submissions'] = array_filter($_SESSION['form_submissions'], function($timestamp) use ($oneHourAgo) {
    return $timestamp > $oneHourAgo;
});

// Vérifier la limite
if (count($_SESSION['form_submissions']) >= MAX_SUBMISSIONS_PER_HOUR) {
    logDebug('Rate limit exceeded for IP: ' . $_SERVER['REMOTE_ADDR']);
    jsonResponse(false, getMessage('error_rate_limit'));
}

// 1. HONEYPOT - Protection anti-spam basique
if (!empty($_POST[HONEYPOT_FIELD])) {
    logDebug('Honeypot triggered for IP: ' . $_SERVER['REMOTE_ADDR']);
    // Ne pas révéler que c'est du spam, répondre succès
    jsonResponse(true, getMessage('success'));
}

// 2. Récupérer et nettoyer les données
$name = isset($_POST['name']) ? trim(strip_tags($_POST['name'])) : '';
$email = isset($_POST['email']) ? trim(strip_tags($_POST['email'])) : '';
$phone = isset($_POST['phone']) ? trim(strip_tags($_POST['phone'])) : '';
$service = isset($_POST['service']) ? trim(strip_tags($_POST['service'])) : '';
$commune = isset($_POST['commune']) ? trim(strip_tags($_POST['commune'])) : '';
$message = isset($_POST['message']) ? trim(strip_tags($_POST['message'])) : '';
$recaptchaToken = isset($_POST['recaptcha_token']) ? $_POST['recaptcha_token'] : '';

// 3. Validation des champs obligatoires
if (empty($name) || empty($email) || empty($phone) || empty($service) || empty($commune) || empty($message)) {
    jsonResponse(false, getMessage('error_missing_fields'));
}

// 4. Validation email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    jsonResponse(false, getMessage('error_invalid_email'));
}

// 5. Validation téléphone (format belge ou international)
$phoneClean = preg_replace('/[\s\.\-\(\)]/', '', $phone);
if (!preg_match('/^(\+)?[0-9]{9,15}$/', $phoneClean)) {
    jsonResponse(false, getMessage('error_invalid_phone'));
}

// 6. Vérification reCAPTCHA v3
if (!empty($recaptchaToken) && RECAPTCHA_SECRET_KEY !== 'VOTRE_CLE_SECRETE_RECAPTCHA') {
    $recaptchaUrl = 'https://www.google.com/recaptcha/api/siteverify';
    $recaptchaData = [
        'secret' => RECAPTCHA_SECRET_KEY,
        'response' => $recaptchaToken,
        'remoteip' => $_SERVER['REMOTE_ADDR']
    ];

    $options = [
        'http' => [
            'header' => "Content-type: application/x-www-form-urlencoded\r\n",
            'method' => 'POST',
            'content' => http_build_query($recaptchaData)
        ]
    ];

    $context = stream_context_create($options);
    $recaptchaResponse = @file_get_contents($recaptchaUrl, false, $context);

    if ($recaptchaResponse) {
        $recaptchaResult = json_decode($recaptchaResponse, true);

        if (!$recaptchaResult['success']) {
            logDebug('reCAPTCHA failed: ' . json_encode($recaptchaResult));
            jsonResponse(false, getMessage('error_recaptcha'));
        }

        // Vérifier le score (v3 retourne un score entre 0 et 1)
        if (isset($recaptchaResult['score']) && $recaptchaResult['score'] < 0.5) {
            logDebug('reCAPTCHA low score: ' . $recaptchaResult['score']);
            jsonResponse(false, getMessage('error_recaptcha_low_score'));
        }

        logDebug('reCAPTCHA passed with score: ' . ($recaptchaResult['score'] ?? 'N/A'));
    }
}

// 7. Préparer le contenu de l'email
$emailSubject = EMAIL_SUBJECT_PREFIX . 'Demande de devis - ' . $service;

$emailBody = "
==============================================
NOUVELLE DEMANDE DE DEVIS - AAB BROCANTEUR
==============================================

INFORMATIONS CLIENT :
---------------------
Nom : {$name}
Email : {$email}
Téléphone : {$phone}

SERVICE DEMANDÉ :
-----------------
{$service}

LOCALISATION :
--------------
Commune/Code postal : {$commune}

MESSAGE :
---------
{$message}

==============================================
Informations techniques :
- IP : {$_SERVER['REMOTE_ADDR']}
- User Agent : {$_SERVER['HTTP_USER_AGENT']}
- Date : " . date('d/m/Y H:i:s') . "
==============================================
";

// Version HTML de l'email (plus jolie)
$emailBodyHTML = "
<!DOCTYPE html>
<html lang='fr'>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #8B6F47; color: white; padding: 20px; text-align: center; }
        .content { background-color: #f9f9f9; padding: 20px; margin-top: 10px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #8B6F47; }
        .value { margin-left: 10px; }
        .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>📧 Nouvelle Demande de Devis</h2>
            <p>AAB Brocanteur - Bruxelles</p>
        </div>
        <div class='content'>
            <div class='field'>
                <span class='label'>👤 Nom :</span>
                <span class='value'>{$name}</span>
            </div>
            <div class='field'>
                <span class='label'>✉️ Email :</span>
                <span class='value'><a href='mailto:{$email}'>{$email}</a></span>
            </div>
            <div class='field'>
                <span class='label'>📞 Téléphone :</span>
                <span class='value'><a href='tel:{$phoneClean}'>{$phone}</a></span>
            </div>
            <div class='field'>
                <span class='label'>🛠️ Service demandé :</span>
                <span class='value'><strong>{$service}</strong></span>
            </div>
            <div class='field'>
                <span class='label'>📍 Commune :</span>
                <span class='value'>{$commune}</span>
            </div>
            <div class='field'>
                <span class='label'>💬 Message :</span>
                <div style='background: white; padding: 15px; margin-top: 10px; border-left: 3px solid #C4A661;'>
                    {$message}
                </div>
            </div>
        </div>
        <div class='footer'>
            <p>📅 Reçu le " . date('d/m/Y à H:i:s') . "</p>
            <p>🌐 <a href='" . SITE_URL . "'>" . SITE_URL . "</a></p>
        </div>
    </div>
</body>
</html>
";

// 8. Préparer les headers
$headers = [
    'From' => EMAIL_FROM,
    'Reply-To' => $email,
    'X-Mailer' => 'PHP/' . phpversion(),
    'MIME-Version' => '1.0',
    'Content-Type' => 'text/html; charset=UTF-8'
];

$headersString = '';
foreach ($headers as $key => $value) {
    $headersString .= "$key: $value\r\n";
}

// 9. Envoyer l'email
$mailSent = false;

if (!empty(SMTP_HOST)) {
    // TODO: Utiliser PHPMailer ou Swift Mailer pour SMTP
    // Pour l'instant, utiliser mail() par défaut
    $mailSent = mail(EMAIL_TO, $emailSubject, $emailBodyHTML, $headersString);
} else {
    // Utiliser la fonction mail() PHP
    $mailSent = mail(EMAIL_TO, $emailSubject, $emailBodyHTML, $headersString);
}

// 10. Enregistrer la soumission (rate limiting)
if ($mailSent) {
    $_SESSION['form_submissions'][] = $now;

    logDebug('Email sent successfully to: ' . EMAIL_TO);

    // Email de confirmation au client (optionnel)
    $confirmSubject = "Confirmation de votre demande - AAB Brocanteur";
    $confirmBody = "
    <!DOCTYPE html>
    <html lang='fr'>
    <head>
        <meta charset='UTF-8'>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #8B6F47; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>✅ Demande bien reçue !</h2>
            </div>
            <div class='content'>
                <p>Bonjour {$name},</p>
                <p>Nous avons bien reçu votre demande de devis pour <strong>{$service}</strong>.</p>
                <p>Nous vous contacterons dans les plus brefs délais au <strong>{$phone}</strong> ou par email à <strong>{$email}</strong>.</p>
                <p>En attendant, n'hésitez pas à nous contacter directement :</p>
                <ul>
                    <li>📞 Téléphone : +32 XXX XXX XXX</li>
                    <li>✉️ Email : contact@aab-brocanteur.be</li>
                </ul>
                <p>À très bientôt,<br><strong>L'équipe AAB Brocanteur</strong></p>
            </div>
        </div>
    </body>
    </html>
    ";

    @mail($email, $confirmSubject, $confirmBody, $headersString);

    jsonResponse(true, getMessage('success'), [
        'name' => $name,
        'service' => $service
    ]);
} else {
    logDebug('Email sending failed to: ' . EMAIL_TO);

    // Envoyer une notification à l'admin en cas d'échec
    if (defined('ADMIN_EMAIL')) {
        @mail(ADMIN_EMAIL, 'ERREUR - Formulaire AAB', "Échec d'envoi d'email depuis le formulaire de contact.\n\nIP: {$_SERVER['REMOTE_ADDR']}\nDate: " . date('d/m/Y H:i:s'));
    }

    jsonResponse(false, getMessage('error_general'));
}
