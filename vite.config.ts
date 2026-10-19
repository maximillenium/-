import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { defineConfig, type Plugin } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function devApiPlugin(): Plugin {
  return {
    name: 'cbstom-dev-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url || '';
        if ((url.startsWith('/api/sendmail') || url.startsWith('/api/sendmail.php')) && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const data = JSON.parse(body || '{}');
              const { name, phone, service, doctor, comment, formType, honeypot, website } = data;

              // Антиспам ловушка
              if (honeypot || website) {
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ success: true, message: 'Заявка принята' }));
                return;
              }

              // Валидация согласия (152-ФЗ)
              if (!data.consent) {
                res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(
                  JSON.stringify({
                    success: false,
                    error: 'Необходимо подтвердить согласие на обработку персональных данных (152-ФЗ)',
                  }),
                );
                return;
              }

              // Валидация
              if (!name || String(name).trim().length < 2) {
                res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(
                  JSON.stringify({
                    success: false,
                    error: 'Пожалуйста, укажите имя (не менее 2 символов)',
                  }),
                );
                return;
              }

              const cleanDigits = phone ? String(phone).replace(/\D/g, '') : '';
              if (!phone || cleanDigits.length < 10) {
                res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(
                  JSON.stringify({
                    success: false,
                    error: 'Пожалуйста, укажите полный номер телефона',
                  }),
                );
                return;
              }

              const dateStr = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' });
              console.log(
                `[CBSTOM] Новая заявка [${dateStr}]: ${formType || 'Запись'} | ${name} | ${phone} | ${
                  service || '-'
                } | ${doctor || '-'} | ${comment || '-'}`,
              );

              // Запись в резервный лог
              try {
                const logEntry = `[${dateStr}] [${formType || 'Запись'}] ${name} | ${phone} | ${service || '-'} | ${
                  doctor || '-'
                } | ${comment || '-'}\n`;
                fs.appendFileSync(path.join(__dirname, 'requests_backup.log'), logEntry);
              } catch (logErr) {
                console.error('Ошибка записи лога:', logErr);
              }

              res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
              res.end(
                JSON.stringify({
                  success: true,
                  message:
                    'Заявка успешно принята! Администратор клиники перезвонит вам в ближайшее рабочее время.',
                }),
              );
            } catch (parseErr) {
              res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
              res.end(JSON.stringify({ success: false, error: 'Некорректный JSON запрос' }));
            }
          });
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), devApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      emptyOutDir: true,
      rollupOptions: {
        input: 'index.html',
      },
      sourcemap: false,
    },
  };
});
