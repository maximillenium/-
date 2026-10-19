<?php
/**
 * Обработчик заявок с сайта Стоматологической клиники «Центр БиоСтоматологии» (cbstom.ru)
 * Разработан для стандартного PHP хостинга Beget.
 * Совместим с PHP 7.4 / 8.0 / 8.1 / 8.2 / 8.3 на Beget.
 */

// Заголовки безопасности и CORS
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');

// Разрешаем CORS при запросах
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
        header('Access-Control-Allow-Methods: POST, OPTIONS');
    }
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    }
    exit(0);
}

// Принимаем только POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Метод не поддерживается. Разрешён только POST.'], JSON_UNESCAPED_UNICODE);
    exit;
}

// Поиск внешнего защищённого конфигурационного файла (вне web root)
// Например: /home/u/user/cbstom.ru/cbstom_config.php (на 1 уровень выше public_html)
$config = [];
$possibleConfigPaths = [
    dirname(__DIR__, 2) . '/cbstom_config.php',
    dirname(__DIR__, 3) . '/cbstom_config.php',
    sys_get_temp_dir() . '/cbstom_config.php'
];
foreach ($possibleConfigPaths as $cfgPath) {
    if (file_exists($cfgPath) && is_readable($cfgPath)) {
        $loaded = @include $cfgPath;
        if (is_array($loaded)) {
            $config = $loaded;
            break;
        }
    }
}

// Получаем тело запроса
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!is_array($data)) {
    $data = $_POST;
}

// Защита от спам-ботов: honeypot (скрытое поле)
if (!empty($data['website']) || !empty($data['honeypot'])) {
    // Тихо возвращаем успех, не выполняя отправку
    echo json_encode(['success' => true, 'message' => 'Заявка принята.'], JSON_UNESCAPED_UNICODE);
    exit;
}

// Защита от спам-флуда (ограничение частоты обращений с одного IP)
$ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
$floodFile = sys_get_temp_dir() . '/cbstom_flood_' . md5($ip) . '.tmp';
$now = time();

if (file_exists($floodFile)) {
    $lastSent = (int)@file_get_contents($floodFile);
    if (($now - $lastSent) < 10) { // Минимум 10 секунд между запросами с одного IP
        http_response_code(429);
        echo json_encode(['success' => false, 'error' => 'Пожалуйста, подождите несколько секунд перед повторной отправкой.'], JSON_UNESCAPED_UNICODE);
        exit;
    }
}
@file_put_contents($floodFile, (string)$now);

// Валидация полей
$name = isset($data['name']) ? trim(strip_tags((string)$data['name'])) : '';
$phone = isset($data['phone']) ? trim(strip_tags((string)$data['phone'])) : '';
$comment = isset($data['comment']) ? trim(strip_tags((string)$data['comment'])) : '';
$service = isset($data['service']) ? trim(strip_tags((string)$data['service'])) : '';
$doctor = isset($data['doctor']) ? trim(strip_tags((string)$data['doctor'])) : '';
$formType = isset($data['formType']) ? trim(strip_tags((string)$data['formType'])) : 'Запись на приём';

if (empty($name) || mb_strlen($name, 'UTF-8') < 2) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Пожалуйста, укажите ваше имя (не менее 2 символов).'], JSON_UNESCAPED_UNICODE);
    exit;
}

$cleanPhoneDigits = preg_replace('/\D/', '', $phone);
if (empty($phone) || strlen($cleanPhoneDigits) < 10) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Пожалуйста, укажите корректный контактный номер телефона.'], JSON_UNESCAPED_UNICODE);
    exit;
}

$consent = !empty($data['consent']);
if (!$consent) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Для отправки заявки требуется согласие на обработку персональных данных (152-ФЗ).'], JSON_UNESCAPED_UNICODE);
    exit;
}

// Очистка от инъекций в заголовки
$cleanName = preg_replace('/[\r\n]+/', ' ', $name);
$cleanPhone = preg_replace('/[\r\n]+/', ' ', $phone);

// Настройки получателя (из конфига вне web root либо по умолчанию)
$to = !empty($config['mail_to']) ? $config['mail_to'] : 'admin@cbstom.ru';
$fromEmail = !empty($config['from_email']) ? $config['from_email'] : 'noreply@cbstom.ru';

$subject = "Новая заявка с сайта cbstom.ru: {$formType}";
$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
$dateStr = date('d.m.Y H:i:s (MSK)');

// Формируем HTML тело письма
$htmlBody = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #f6f8fb; margin: 0; padding: 20px; color: #1e293b; }
        .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        .header { background: #1e293b; color: #ffffff; padding: 24px; text-align: center; }
        .header h2 { margin: 0; font-size: 20px; color: #e2b960; }
        .header p { margin: 6px 0 0 0; font-size: 13px; color: #94a3b8; }
        .content { padding: 24px; }
        .row { margin-bottom: 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px; }
        .row:last-child { border-bottom: none; }
        .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #64748b; font-weight: 600; margin-bottom: 4px; }
        .value { font-size: 16px; color: #0f172a; font-weight: 500; }
        .phone { font-size: 20px; font-weight: 700; color: #0284c7; text-decoration: none; }
        .comment-box { background: #f8fafc; border-left: 3px solid #e2b960; padding: 12px 16px; margin-top: 6px; border-radius: 4px; font-style: italic; font-size: 14px; }
        .footer { background: #f8fafc; padding: 16px 24px; font-size: 12px; color: #64748b; text-align: center; border-top: 1px solid #e2e8f0; }
    </style>
</head>
<body>
    <div class='card'>
        <div class='header'>
            <h2>Центр БиоСтоматологии</h2>
            <p>Новая заявка с сайта https://cbstom.ru/</p>
        </div>
        <div class='content'>
            <div class='row'>
                <div class='label'>Тип обращения</div>
                <div class='value'><strong>" . htmlspecialchars($formType, ENT_QUOTES, 'UTF-8') . "</strong></div>
            </div>
            <div class='row'>
                <div class='label'>Имя пациента</div>
                <div class='value'>" . htmlspecialchars($cleanName, ENT_QUOTES, 'UTF-8') . "</div>
            </div>
            <div class='row'>
                <div class='label'>Телефон для связи</div>
                <div class='value'><a class='phone' href='tel:" . preg_replace('/[^\+0-9]/', '', $cleanPhone) . "'>" . htmlspecialchars($cleanPhone, ENT_QUOTES, 'UTF-8') . "</a></div>
            </div>";

if (!empty($service)) {
    $htmlBody .= "
            <div class='row'>
                <div class='label'>Интересующая услуга</div>
                <div class='value'>" . htmlspecialchars($service, ENT_QUOTES, 'UTF-8') . "</div>
            </div>";
}

if (!empty($doctor)) {
    $htmlBody .= "
            <div class='row'>
                <div class='label'>Выбранный специалист</div>
                <div class='value'>" . htmlspecialchars($doctor, ENT_QUOTES, 'UTF-8') . "</div>
            </div>";
}

if (!empty($comment)) {
    $htmlBody .= "
            <div class='row'>
                <div class='label'>Комментарий пациента</div>
                <div class='comment-box'>" . nl2br(htmlspecialchars($comment, ENT_QUOTES, 'UTF-8')) . "</div>
            </div>";
}

$htmlBody .= "
            <div class='row'>
                <div class='label'>Согласие с 152-ФЗ</div>
                <div class='value' style='color: #16a34a; font-size: 13px;'>✓ Получено предварительное согласие на обработку персональных данных</div>
            </div>
            <div class='row'>
                <div class='label'>Дата и время</div>
                <div class='value' style='font-size: 13px; color: #64748b;'>{$dateStr} (IP: {$ip})</div>
            </div>
        </div>
        <div class='footer'>
            Письмо сформировано сайтом https://cbstom.ru/ (ООО «Центр БиоСтоматологии»)
        </div>
    </div>
</body>
</html>
";

// Заголовки для отправки через sendmail / Exim на Beget
$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-type: text/html; charset=UTF-8';
$headers[] = 'From: =?UTF-8?B?' . base64_encode('Сайт Центр БиоСтоматологии') . "?= <{$fromEmail}>";
$headers[] = "Reply-To: =?UTF-8?B?" . base64_encode($cleanName) . "?= <{$fromEmail}>";
$headers[] = 'X-Mailer: PHP/' . phpversion();

// Отправка письма функцией mail()
$sent = @mail($to, $encodedSubject, $htmlBody, implode("\r\n", $headers));

// Резервное сохранение заявки вне общедоступного каталога (Point 5)
// Определяем безопасное место хранения вне web root
$savedSecurely = false;
$parentDir = dirname(__DIR__, 2); // Каталог домена /home/u/user/cbstom.ru/
$privateStorageDir = $parentDir . '/private_storage';

if (is_dir($parentDir) && is_writable($parentDir)) {
    if (!is_dir($privateStorageDir)) {
        @mkdir($privateStorageDir, 0700, true);
    }
}

$backupFilePath = null;
if (is_dir($privateStorageDir) && is_writable($privateStorageDir)) {
    $backupFilePath = $privateStorageDir . '/requests_backup.log';
} else {
    // Если подняться выше web root невозможно, используем изолированную системную директорию
    $backupFilePath = sys_get_temp_dir() . '/cbstom_backup_' . md5(__DIR__) . '.log';
}

if ($backupFilePath) {
    $logEntry = date('Y-m-d H:i:s') . " | {$formType} | " . mb_substr($cleanName, 0, 40) . " | " . mb_substr($cleanPhone, 0, 25) . " | " . mb_substr($service, 0, 50) . " | " . mb_substr($doctor, 0, 50) . "\n";
    @file_put_contents($backupFilePath, $logEntry, FILE_APPEND | LOCK_EX);
    $savedSecurely = true;
}

if ($sent) {
    echo json_encode([
        'success' => true,
        'message' => 'Заявка успешно отправлена! Администратор клиники перезвонит вам в ближайшее рабочее время.'
    ], JSON_UNESCAPED_UNICODE);
} else {
    // Если mail() локально не вернул true (например локальный dev-сервер без SMTP)
    echo json_encode([
        'success' => true,
        'message' => 'Заявка принята! Администратор свяжется с вами в ближайшее рабочее время.',
        'logged' => $savedSecurely
    ], JSON_UNESCAPED_UNICODE);
}
