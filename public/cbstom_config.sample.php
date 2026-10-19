<?php
/**
 * Пример защищённого конфигурационного файла для Beget.
 *
 * ИНСТРУКЦИЯ ПО РАЗМЕЩЕНИЮ:
 * 1. Скопируйте этот файл в каталог НА УРОВЕНЬ ВЫШЕ public_html:
 *    /home/u/user/cbstom.ru/cbstom_config.php
 * 2. Укажите ваши настройки (при необходимости).
 * 3. Этот файл никогда не будет доступен через веб-браузер, так как находится вне web root.
 */

return [
    // Основной email для получения заявок с сайта
    'mail_to' => 'admin@cbstom.ru',

    // Email отправителя (рекомендуется создавать ящик на домене в панели Beget)
    'from_email' => 'noreply@cbstom.ru',

    // Опциональные настройки для SMTP (если не используется стандартный mail() Beget)
    'smtp' => [
        'enabled' => false,
        'host' => 'smtp.beget.com',
        'port' => 465,
        'secure' => 'ssl', // 'ssl' или 'tls'
        'username' => 'admin@cbstom.ru',
        'password' => 'ВАШ_ПАРОЛЬ_ОТ_ПОЧТЫ',
    ]
];
