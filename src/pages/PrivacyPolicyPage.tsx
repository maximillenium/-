import { useEffect } from "react";
import { Link } from "react-router-dom";
import { PageHero } from "@/components/site/Layout";
import { ShieldCheck, ArrowLeft, Phone, FileText, CheckCircle2 } from "lucide-react";

export function PrivacyPolicyPage() {
  useEffect(() => {
    document.title = "Политика конфиденциальности — Центр БиоСтоматологии";
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Правовая информация"
        title="Политика конфиденциальности и обработки персональных данных"
        subtitle="Настоящий документ определяет порядок и условия обработки персональных данных пользователей сайта cbstom.ru, меры по их защите и права субъектов персональных данных в соответствии с Федеральным законом РФ № 152-ФЗ «О персональных данных»."
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
              Дата последнего обновления: <strong>19 октября 2026 г.</strong>
            </span>
          </div>

          <div className="space-y-10 text-sm leading-relaxed text-foreground/90">
            {/* Раздел 1 */}
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-medium text-foreground">
                1. Общие положения
              </h2>
              <div className="mt-3 space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  1.1. Настоящая Политика конфиденциальности (далее — «Политика») действует в отношении всей информации, которую Общество с ограниченной ответственностью «Центр БиоСтоматологии» (далее — «Оператор» или «Клиника») может получить о пользователе во время использования им веб-сайта, размещённого в сети Интернет по адресу:{" "}
                  <a href="https://cbstom.ru/" className="text-[var(--gold)] hover:underline font-medium">
                    https://cbstom.ru/
                  </a>{" "}
                  (далее — «Сайт»).
                </p>
                <p>
                  1.2. Использование сервисов и форм Сайта означает безоговорочное согласие пользователя с настоящей Политикой и указанными в ней условиями обработки его персональной информации. В случае несогласия с этими условиями пользователь должен воздержаться от использования форм обратной связи Сайта.
                </p>
                <p>
                  1.3. Настоящая Политика составлена в строгом соответствии с требованиями Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных» и подзаконных актов РФ в области защиты персональных данных.
                </p>
              </div>
            </div>

            {/* Раздел 2 */}
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-medium text-foreground">
                2. Сведения об Операторе персональных данных
              </h2>
              <div className="mt-4 rounded-sm border border-border bg-card p-5 sm:p-6 shadow-sm">
                <dl className="grid grid-cols-1 gap-2.5 sm:grid-cols-[220px_1fr] text-xs sm:text-sm">
                  <dt className="font-semibold text-muted-foreground">Полное наименование:</dt>
                  <dd className="text-foreground">Общество с ограниченной ответственностью «Центр БиоСтоматологии»</dd>

                  <dt className="font-semibold text-muted-foreground">Сокращённое наименование:</dt>
                  <dd className="text-foreground">ООО «Центр БиоСтоматологии»</dd>

                  <dt className="font-semibold text-muted-foreground">Юридический адрес:</dt>
                  <dd className="text-foreground">127473, г. Москва, ул. Октябрьская, д. 36</dd>

                  <dt className="font-semibold text-muted-foreground">Фактический и почтовый адрес:</dt>
                  <dd className="text-foreground">127473, г. Москва, ул. Октябрьская, д. 36</dd>

                  <dt className="font-semibold text-muted-foreground">ОГРН / ИНН / КПП:</dt>
                  <dd className="text-foreground font-mono">1207700219275 / 9731066155 / 771501001</dd>

                  <dt className="font-semibold text-muted-foreground">Генеральный директор:</dt>
                  <dd className="text-foreground">Симакова Татьяна Геннадьевна</dd>

                  <dt className="font-semibold text-muted-foreground">Контактный телефон:</dt>
                  <dd className="text-foreground">
                    <a href="tel:+74996734401" className="text-[var(--gold)] font-medium hover:underline">
                      +7 (499) 673-44-01
                    </a>
                  </dd>

                  <dt className="font-semibold text-muted-foreground">Электронная почта:</dt>
                  <dd className="text-foreground">
                    <a href="mailto:admin@cbstom.ru" className="text-[var(--gold)] font-medium hover:underline">
                      admin@cbstom.ru
                    </a>
                  </dd>
                </dl>
              </div>
            </div>

            {/* Раздел 3 */}
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-medium text-foreground">
                3. Состав обрабатываемых персональных данных
              </h2>
              <div className="mt-3 space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  3.1. Оператор обрабатывает следующие категории персональных данных, предоставляемые пользователем самостоятельно при заполнении электронных форм на Сайте («Запись на приём», «Заказ обратного звонка», «Записаться к врачу»):
                </p>
                <ul className="space-y-1.5 pl-5 list-disc text-foreground">
                  <li>Фамилия, имя или обращение пользователя;</li>
                  <li>Номер контактного телефона;</li>
                  <li>Интересующее направление или услуга клиники (по желанию пользователя);</li>
                  <li>Желаемый специалист клиники (по желанию пользователя);</li>
                  <li>Пожелания пользователя по времени или формату визита (в поле комментария).</li>
                </ul>
                <div className="rounded-sm border border-border/80 bg-surface p-4 text-xs leading-relaxed text-foreground">
                  <strong className="block text-sm mb-1 text-[var(--gold)] font-serif">
                    Важное уведомление о специальных категориях персональных данных:
                  </strong>
                  Сайт <strong>не осуществляет</strong> сбор и обработку сведений о состоянии здоровья (диагнозы, анамнез, результаты лабораторных анализов и т.д.) через онлайн-формы. Предоставление медицинской информации, заключение договора на оказание медицинских услуг и оформление медицинской документации производятся исключительно при личном визите пациента в клинику.
                </div>
                <p>
                  3.2. На Сайте также может осуществляться автоматический сбор обезличенных технических данных: IP-адрес, данные файлов cookie (cookie-файлы), тип и версия веб-браузера, дата и время доступа к Сайту, адрес запрашиваемой страницы Сайта.
                </p>
              </div>
            </div>

            {/* Раздел 4 */}
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-medium text-foreground">
                4. Цели обработки персональных данных
              </h2>
              <div className="mt-3 space-y-2 text-muted-foreground leading-relaxed">
                <p>Персональные данные пользователей обрабатываются исключительно в следующих целях:</p>
                <ul className="space-y-2 pl-5 list-disc text-foreground">
                  <li>
                    <strong>Обработка входящих обращений и заявок:</strong> идентификация пользователя, перезвон администратором клиники для подтверждения запроса и согласования удобной даты и времени консультации/приёма.
                  </li>
                  <li>
                    <strong>Предоставление консультационной информации:</strong> информирование о перечне оказываемых стоматологических услуг, расписании приёма врачей и прейскуранте цен.
                  </li>
                  <li>
                    <strong>Обеспечение технического функционирования Сайта:</strong> контроль работоспособности, защита от спам-атак и предотвращение несанкционированного доступа.
                  </li>
                </ul>
              </div>
            </div>

            {/* Раздел 5 */}
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-medium text-foreground">
                5. Правовые основания обработки данных
              </h2>
              <div className="mt-3 space-y-2 text-muted-foreground leading-relaxed">
                <p>Правовыми основаниями обработки персональных данных Оператором являются:</p>
                <ul className="space-y-1.5 pl-5 list-disc text-foreground">
                  <li>Федеральный закон от 27.07.2006 № 152-ФЗ «О персональных данных» (в т.ч. п. 1 и п. 5 ч. 1 ст. 6);</li>
                  <li>Уставные документы ООО «Центр БиоСтоматологии» и Лицензия на медицинскую деятельность № Л041-01137-77 / 77/00360298;</li>
                  <li>
                    Конкретное, предметное, информированное, сознательное и однозначное <strong>согласие пользователя</strong> на обработку персональных данных, предоставляемое путём проставления отметки в соответствующем поле формы Сайта до момента отправки данных.
                  </li>
                </ul>
              </div>
            </div>

            {/* Раздел 6 */}
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-medium text-foreground">
                6. Порядок и условия обработки персональных данных
              </h2>
              <div className="mt-3 space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  6.1. Обработка персональных данных осуществляется с использованием средств автоматизации (включая сбор, запись, систематизацию, накопление, хранение, уточнение, извлечение, использование, передачу уполномоченным администраторам клиники, блокирование, удаление, уничтожение).
                </p>
                <p>
                  6.2. <strong>Локализация баз данных:</strong> В соответствии с ч. 5 ст. 18 Федерального закона № 152-ФЗ запись, систематизация, накопление, хранение, уточнение (обновление, изменение) и извлечение персональных данных граждан Российской Федерации осуществляются с использованием баз данных, находящихся на территории Российской Федерации (хостинг-провайдер Beget, РФ).
                </p>
                <p>
                  6.3. Оператор принимает необходимые правовые, организационные и технические меры для защиты персональных данных от неправомерного или случайного доступа к ним, уничтожения, изменения, блокирования, копирования, распространения, а также от иных неправомерных действий третьих лиц:
                </p>
                <ul className="space-y-1 pl-5 list-disc text-foreground">
                  <li>Использование шифрованного соединения (протокол HTTPS/SSL);</li>
                  <li>Ограничение круга лиц, имеющих доступ к заявкам пациентов (только дежурные администраторы регистратуры клиники);</li>
                  <li>Регулярный контроль защищенности и обновление программного обеспечения.</li>
                </ul>
              </div>
            </div>

            {/* Раздел 7 */}
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-medium text-foreground">
                7. Передача данных и третьи лица
              </h2>
              <div className="mt-3 space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  7.1. Оператор не продаёт, не передаёт и не распространяет персональные данные пользователей третьим лицам в коммерческих или рекламных целях.
                </p>
                <p>
                  7.2. <strong>Фактические сервисы и интеграции, используемые Сайтом:</strong>
                </p>
                <ul className="space-y-2 pl-5 list-disc text-foreground">
                  <li>
                    <strong>Хостинг и почтовая служба Beget (ООО «Бегет», Россия):</strong> серверное размещение Сайта и защищённая доставка электронных писем с заявками на рабочий адрес <code>admin@cbstom.ru</code>.
                  </li>
                  <li>
                    <strong>Яндекс Карты (ООО «Яндекс», Россия):</strong> интерактивный картографический виджет для отображения схемы проезда к клинике (м. Марьина Роща). Сервис может собирать обезличенные геолокационные и технические данные в соответствии со своей политикой.
                  </li>
                  <li>
                    <strong>Шрифтовые сервисы Google Fonts:</strong> загрузка шрифтов для корректного отображения типографики Сайта.
                  </li>
                </ul>
                <p>
                  7.3. Трансграничная передача персональных данных в рамках функционирования форм обратной связи Сайта <strong>не осуществляется</strong>.
                </p>
              </div>
            </div>

            {/* Раздел 8 */}
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-medium text-foreground">
                8. Сроки хранения и уничтожение данных
              </h2>
              <div className="mt-3 space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  8.1. Персональные данные, полученные через формы Сайта, хранятся в течение срока, необходимого для достижения целей их обработки (включая проведение обратного звонка, организацию записи на приём и подтверждение визита), либо до момента отзыва согласия субъектом персональных данных.
                </p>
                <p>
                  8.2. При достижении целей обработки или при получении отзыва согласия персональные данные подлежат уничтожению Оператором в срок, не превышающий 30 (тридцати) дней, за исключением случаев, когда более длительный срок хранения предусмотрен законодательством РФ (например, в рамках хранения медицинской документации при оформлении карты пациента).
                </p>
              </div>
            </div>

            {/* Раздел 9 */}
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-medium text-foreground">
                9. Права субъекта персональных данных
              </h2>
              <div className="mt-3 space-y-2 text-muted-foreground leading-relaxed">
                <p>Пользователь имеет право:</p>
                <ul className="space-y-1.5 pl-5 list-disc text-foreground">
                  <li>Получать информацию, касающуюся обработки его персональных данных Оператором;</li>
                  <li>Требовать уточнения своих персональных данных, их блокирования или уничтожения в случае, если данные являются неполными, устаревшими, неточными или незаконно полученными;</li>
                  <li>Отозвать данное ранее согласие на обработку персональных данных;</li>
                  <li>Обжаловать действия или бездействие Оператора в Роскомнадзор или в судебном порядке.</li>
                </ul>
              </div>
            </div>

            {/* Раздел 10 */}
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-medium text-foreground">
                10. Порядок отзыва согласия и направления запросов
              </h2>
              <div className="mt-3 space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  10.1. Субъект персональных данных может в любой момент отозвать своё согласие на обработку персональных данных, направив письменное заявление Оператору одним из следующих способов:
                </p>
                <ul className="space-y-1.5 pl-5 list-disc text-foreground">
                  <li>
                    Почтовым отправлением либо лично по адресу: <strong>127473, г. Москва, ул. Октябрьская, д. 36, ООО «Центр БиоСтоматологии»</strong>;
                  </li>
                  <li>
                    По электронной почте:{" "}
                    <a href="mailto:admin@cbstom.ru" className="text-[var(--gold)] font-medium hover:underline">
                      admin@cbstom.ru
                    </a>{" "}
                    с темой письма «Отзыв согласия на обработку персональных данных»;
                  </li>
                  <li>
                    По контактному телефону клиники:{" "}
                    <a href="tel:+74996734401" className="text-[var(--gold)] font-medium hover:underline">
                      +7 (499) 673-44-01
                    </a>.
                  </li>
                </ul>
                <p>
                  10.2. Заявление должно содержать фамилию, имя заявителя, контактный номер телефона, указанный ранее при подаче заявки, и суть требования.
                </p>
              </div>
            </div>

            {/* Раздел 11 */}
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-medium text-foreground">
                11. Использование файлов Cookie
              </h2>
              <div className="mt-3 space-y-2 text-muted-foreground leading-relaxed">
                <p>
                  11.1. Сайт использует технологию cookies (небольшие текстовые файлы, сохраняемые браузером) для технического обеспечения функционирования страниц, запоминания предпочтений пользователя и защиты форм от спама.
                </p>
                <p>
                  11.2. Пользователь может в любой момент отключить сохранение cookies в настройках своего браузера. Отключение cookies не блокирует работу Сайта, однако некоторые функции могут стать недоступны.
                </p>
              </div>
            </div>

            {/* Раздел 12 */}
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-medium text-foreground">
                12. Изменение Политики конфиденциальности
              </h2>
              <div className="mt-3 space-y-2 text-muted-foreground leading-relaxed">
                <p>
                  12.1. Оператор имеет право вносить изменения в настоящую Политику конфиденциальности в связи с изменениями законодательства или регламентов работы клиники.
                </p>
                <p>
                  12.2. Новая редакция Политики вступает в силу с момента её размещения на Сайте, если иное не предусмотрено новой редакцией документа. Действующая редакция всегда доступна на странице:{" "}
                  <Link to="/privacy-policy" className="text-[var(--gold)] hover:underline font-medium">
                    https://cbstom.ru/privacy-policy
                  </Link>.
                </p>
              </div>
            </div>

            {/* Дополнительный блок согласия */}
            <div className="mt-8 rounded-sm border border-border bg-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
              <div>
                <div className="flex items-center gap-2 font-serif text-base font-semibold text-foreground">
                  <FileText className="h-5 w-5 text-[var(--gold)]" />
                  Согласие на обработку персональных данных
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Ознакомьтесь с текстом отдельного согласия, подтверждаемого при отправке формы записи.
                </p>
              </div>
              <Link
                to="/consent"
                className="inline-flex shrink-0 items-center justify-center rounded-sm bg-[var(--gold)] px-5 py-2.5 text-xs font-medium text-[var(--gold-foreground)] transition-opacity hover:opacity-90 shadow-sm"
              >
                Текст согласия →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
