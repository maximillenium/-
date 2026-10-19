import { useEffect } from "react";
import { Link } from "react-router-dom";
import { PageHero } from "@/components/site/Layout";
import { ArrowLeft, ShieldCheck, Check, Phone } from "lucide-react";

export function ConsentPage() {
  useEffect(() => {
    document.title = "Согласие на обработку персональных данных — Центр БиоСтоматологии";
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Правовая информация"
        title="Согласие на обработку персональных данных"
        subtitle="Текст согласия, предоставляемого пользователем при отправке электронных форм обратной связи на официальном сайте клиники https://cbstom.ru/."
      />

      <section className="bg-background py-12 sm:py-20">
        <div className="mx-auto max-w-[960px] px-4 sm:px-6">
          <div className="mb-8 flex items-center justify-between border-b border-border pb-4">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[var(--gold)] hover:underline"
            >
              <ArrowLeft className="h-4 w-4" /> Вернуться на главную
            </Link>
            <span className="text-xs text-muted-foreground">
              Действует с: <strong>19 октября 2026 г.</strong>
            </span>
          </div>

          <div className="space-y-8 text-sm leading-relaxed text-foreground/90">
            <div className="rounded-sm border border-border bg-card p-5 sm:p-7 shadow-sm">
              <h2 className="font-serif text-lg sm:text-xl font-medium text-foreground mb-4">
                Текст согласия субъекта на обработку персональных данных
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Настоящим я, действуя свободно, своей волей и в своём интересе, а также подтверждая свою дееспособность, даю своё согласие{" "}
                <strong>Обществу с ограниченной ответственностью «Центр БиоСтоматологии»</strong> (ОГРН: 1207700219275, ИНН: 9731066155, КПП: 771501001, адрес: 127473, г. Москва, ул. Октябрьская, д. 36) на обработку моих персональных данных на следующих условиях:
              </p>
            </div>

            <div className="space-y-6 text-muted-foreground">
              <div>
                <h3 className="font-serif text-base font-semibold text-foreground mb-2">
                  1. Перечень персональных данных, на обработку которых даётся согласие:
                </h3>
                <ul className="space-y-1.5 pl-5 list-disc text-foreground">
                  <li>Фамилия, имя (или указанное обращение);</li>
                  <li>Номер контактного телефона;</li>
                  <li>Выбранное направление стоматологии или услуга клиники (если указано в форме);</li>
                  <li>Желаемый врач / специалист клиники (если выбран в форме);</li>
                  <li>Текст комментария или организационные пожелания по визиту;</li>
                  <li>Технические данные: IP-адрес, данные файлов cookie, сведения о браузере и времени отправки.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-serif text-base font-semibold text-foreground mb-2">
                  2. Цели обработки персональных данных:
                </h3>
                <ul className="space-y-1.5 pl-5 list-disc text-foreground">
                  <li>Обработка моей заявки, отправленной через сайт https://cbstom.ru/;</li>
                  <li>Осуществление телефонного звонка администратором клиники для уточнения запроса;</li>
                  <li>Согласование удобной даты и времени приёма или консультации в Центре БиоСтоматологии;</li>
                  <li>Предоставление справочной информации об услугах клиники и расписании работы специалистов.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-serif text-base font-semibold text-foreground mb-2">
                  3. Перечень действий с персональными данными:
                </h3>
                <p>
                  Оператор вправе осуществлять следующие действия с моими персональными данными с использованием средств автоматизации и/или без их использования: сбор, запись, систематизацию, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передачу (внутреннюю передачу администраторам клиники для связи), обезличивание, блокирование, удаление и уничтожение персональных данных.
                </p>
              </div>

              <div>
                <h3 className="font-serif text-base font-semibold text-foreground mb-2">
                  4. Отсутствие специальных категорий данных:
                </h3>
                <p>
                  Я подтверждаю, что через онлайн-форму сайта не передаю сведения, составляющие врачебную тайну, диагнозы или историю болезни. Предоставление медицинских сведений и подписание согласия на медицинское вмешательство осуществляются лично в помещении клиники при первичном приёме.
                </p>
              </div>

              <div>
                <h3 className="font-serif text-base font-semibold text-foreground mb-2">
                  5. Срок действия согласия и порядок его отзыва:
                </h3>
                <p>
                  Настоящее согласие действует с момента его подтверждения (отправки формы на Сайте) до достижения целей обработки, либо до момента отзыва согласия.
                </p>
                <p className="mt-2">
                  Согласие может быть отозвано мной в любой момент путём направления письменного заявления по адресу клиники: <strong>127473, г. Москва, ул. Октябрьская, д. 36</strong>, либо по электронной почте:{" "}
                  <a href="mailto:admin@cbstom.ru" className="text-[var(--gold)] hover:underline font-medium">
                    admin@cbstom.ru
                  </a>
                  , либо по контактному телефону{" "}
                  <a href="tel:+74996734401" className="text-[var(--gold)] hover:underline font-medium">
                    +7 (499) 673-44-01
                  </a>.
                </p>
              </div>

              <div>
                <h3 className="font-serif text-base font-semibold text-foreground mb-2">
                  6. Подтверждение ознакомления:
                </h3>
                <p>
                  Отправляя форму и проставляя отметку в поле согласия, я подтверждаю, что предварительно ознакомлен с{" "}
                  <Link to="/privacy-policy" className="text-[var(--gold)] hover:underline font-medium">
                    Политикой конфиденциальности и обработки персональных данных ООО «Центр БиоСтоматологии»
                  </Link>{" "}
                  и принимаю её условия в полном объёме.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
