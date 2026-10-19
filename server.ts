import "dotenv/config";
import express from "express";
import type { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Обработчик отправки заявок (для dev и Node.js environments)
const handleSendMail = async (req: Request, res: Response) => {
  const { name, phone, service, doctor, comment, formType, consent, honeypot, website } = req.body;

  // Антиспам ловушка
  if (honeypot || website) {
    return res.status(200).json({ success: true, message: "Заявка принята" });
  }

  // Валидация согласия (152-ФЗ)
  if (!consent) {
    return res.status(400).json({
      success: false,
      error: "Необходимо согласие на обработку персональных данных в соответствии с 152-ФЗ",
    });
  }

  // Валидация
  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return res.status(400).json({
      success: false,
      error: "Пожалуйста, укажите имя (не менее 2 символов)",
    });
  }

  const cleanDigits = phone ? String(phone).replace(/\D/g, "") : "";
  if (!phone || cleanDigits.length < 10) {
    return res.status(400).json({
      success: false,
      error: "Пожалуйста, укажите корректный контактный номер телефона",
    });
  }

  const payload = {
    date: new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" }),
    name: name.trim(),
    phone: String(phone).trim(),
    formType: formType || "Запись на приём",
    service: service ? String(service).trim() : null,
    doctor: doctor ? String(doctor).trim() : null,
    comment: comment ? String(comment).trim() : null,
    ip: req.ip || req.socket.remoteAddress,
  };

  console.log(`=== [CBSTOM] Заявка принята: ${payload.formType} (${payload.service || 'Без услуги'}) ===`);

  // Резервное сохранение заявки в лог файл
  try {
    const logLine = `[${payload.date}] [${payload.formType}] Имя: ${payload.name} | Тел: ${payload.phone} | Услуга: ${payload.service || "-"} | Врач: ${payload.doctor || "-"} | Коммент: ${payload.comment || "-"}\n`;
    fs.appendFileSync(path.join(__dirname, "requests_backup.log"), logLine);
  } catch (err) {
    console.error("Не удалось записать в requests_backup.log:", err);
  }

  // Отправка по SMTP, если настроены переменные окружения
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT || 465);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const mailTo = process.env.MAIL_TO || "admin@cbstom.ru";

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const htmlContent = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #1e293b; margin-top: 0;">Центр БиоСтоматологии</h2>
          <p style="font-size: 14px; color: #64748b;">Новая заявка с сайта https://cbstom.ru/</p>
          <hr style="border: none; border-top: 1px solid #f1f5f9; margin: 16px 0;" />
          <p><strong>Тип заявки:</strong> ${payload.formType}</p>
          <p><strong>Имя пациента:</strong> ${payload.name}</p>
          <p><strong>Телефон:</strong> <a href="tel:${cleanDigits}" style="color: #0284c7; font-size: 18px; font-weight: bold;">${payload.phone}</a></p>
          ${payload.service ? `<p><strong>Услуга:</strong> ${payload.service}</p>` : ""}
          ${payload.doctor ? `<p><strong>Врач:</strong> ${payload.doctor}</p>` : ""}
          ${payload.comment ? `<p><strong>Комментарий:</strong> ${payload.comment}</p>` : ""}
          <p style="font-size: 12px; color: #94a3b8; margin-top: 24px;">Дата: ${payload.date} (МСК)</p>
        </div>
      `;

      await transporter.sendMail({
        from: `"Сайт Центр БиоСтоматологии" <${smtpUser}>`,
        to: mailTo,
        subject: `Новая заявка cbstom.ru: ${payload.formType} — ${payload.name}`,
        html: htmlContent,
      });

      console.log(`Письмо успешно отправлено на ${mailTo}`);
    } catch (mailErr) {
      console.error("Ошибка при отправке через SMTP:", mailErr);
    }
  } else {
    console.log(`[CBSTOM] SMTP не настроен в .env — заявка зафиксирована в логе для передачи администратору admin@cbstom.ru`);
  }

  return res.status(200).json({
    success: true,
    message: "Заявка успешно принята! Администратор клиники перезвонит вам в ближайшее время.",
  });
};

app.post("/api/sendmail", handleSendMail);
app.post("/api/sendmail.php", handleSendMail);

// Интеграция с Vite в dev режиме или раздача статики
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer } = await import("vite");
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, () => {
    console.log(`Сервер Стоматологической клиники запущен на порту ${PORT}`);
  });
}

startServer();
