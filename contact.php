<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'message' => 'Only POST requests are accepted.']);
    exit;
}

$honeypot = trim((string) ($_POST['website'] ?? ''));
if ($honeypot !== '') {
    echo json_encode(['ok' => true, 'message' => 'Thanks — your inquiry has been received.']);
    exit;
}

$cleanLine = static function (string $value, int $maxLength): string {
    $value = trim(strip_tags($value));
    $value = preg_replace('/[\r\n\x00-\x1F\x7F]+/', ' ', $value) ?? '';
    return substr($value, 0, $maxLength);
};

$name = $cleanLine((string) ($_POST['name'] ?? ''), 100);
$email = trim((string) ($_POST['email'] ?? ''));
$message = trim(strip_tags((string) ($_POST['message'] ?? '')));
$message = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/', '', $message) ?? '';
$message = substr($message, 0, 5000);

if ($name === '' || strlen($name) < 2) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'message' => 'Please enter your name.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 254) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'message' => 'Please enter a valid email address.']);
    exit;
}

if ($message === '' || strlen($message) < 10) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'message' => 'Please add a little more detail to your message.']);
    exit;
}

$recipient = 'hello@ochayoli.in';
$subject = 'New Ochayoli inquiry from ' . $name;
$body = "Name: {$name}\nEmail: {$email}\n\nMessage:\n{$message}\n";
$headers = implode("\r\n", [
    'From: hello@ochayoli.in',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8'
]);

$sent = mail($recipient, $subject, $body, $headers, '-fhello@ochayoli.in');

if (!$sent) {
    http_response_code(502);
    echo json_encode(['ok' => false, 'message' => 'The message could not be delivered right now. Please try again later.']);
    exit;
}

echo json_encode(['ok' => true, 'message' => 'Thanks — your inquiry was forwarded to hello@ochayoli.in.']);
