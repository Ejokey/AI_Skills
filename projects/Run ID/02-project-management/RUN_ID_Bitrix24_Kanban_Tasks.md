# RUN.ID — задачи для канбана в Bitrix24

Копируй заголовок + текст каждой карточки прямо в задачу Bitrix24.

## Доска: "RUN.ID — Мобильное приложение"

**Колонки:** Бэклог → Требует обсуждения → UI/UX → Frontend → Backend → Тестирование → Готово

- "Требует обсуждения" — парковка с любой стадии при блокирующем вопросе, возврат обратно после ответа.
- Ответственный меняется при переходе UI/UX → Frontend → Backend. На "Тестировании" — PM.
- Одна карточка = один экран.

---

## P0 — 10 карточек, в Бэклог сразу

### 1. Регистрация / Вход

Новый пользователь регистрируется и создаёт базовый профиль бегуна.

**Элементы экрана**
- Email/телефон + пароль
- Переключатель регистрация ↔ вход
- Ссылка на политику конфиденциальности

**Состояния:** пустая форма, ошибка формата, email уже используется.

**Правило:** email/телефон уникальны в системе; пароль — минимальная длина и сложность.

**Полезные ссылки**
- Вайрфреймы (Miro): https://miro.com/welcomeonboard/TGxlY3ZKK2RtWmNtS3QzZXVEOEhPWFNJdStqQ0tZMUxzUG1mQzNaOHpXOXNKVFgxUTlrQ002bXhTbTVoZ2lSWnp0QVhSN2treDAxSFZmUTIxSmxtRjFsU3oxYTdrOFAxQjRQTlQyVzZ0WDRZc2RIaGUzYTNOQ0JTbHNPcVdrZ2ZBS2NFMDFkcUNFSnM0d3FEN050ekl3PT0hdjE=?share_link_id=606033559503
- Общий док по экранам: https://docs.google.com/document/d/1Otc6q2-2nDPB3iMcDPwwZ-D4APch0goZ/edit?usp=sharing&ouid=111463861333690498961&rtpof=true&sd=true

**DoD:** [ ] UI/UX [ ] Frontend [ ] Backend

**Приоритет:** P0

---

### 2. Профиль (свой): статистика + настройки

Как зарегистрированный бегун, я хочу видеть общий километраж, часы и число тренировок в своём профиле, чтобы ощущать прогресс — и настроить аватар, единицы измерения и видимость профиля.

**Элементы экрана**
- Аватар, имя
- Суммарные км / часы / число тренировок
- Список последних тренировок
- Кнопка «Загрузить тренировку»
- Ссылка на настройки
- Badge статуса членства
- Настройки: аватар, ед. измерения, видимость профиля, удаление аккаунта

**Состояния:** новый пользователь без тренировок → нули, не заглушка.

**Полезные ссылки**
- Вайрфреймы (Miro): https://miro.com/welcomeonboard/TGxlY3ZKK2RtWmNtS3QzZXVEOEhPWFNJdStqQ0tZMUxzUG1mQzNaOHpXOXNKVFgxUTlrQ002bXhTbTVoZ2lSWnp0QVhSN2treDAxSFZmUTIxSmxtRjFsU3oxYTdrOFAxQjRQTlQyVzZ0WDRZc2RIaGUzYTNOQ0JTbHNPcVdrZ2ZBS2NFMDFkcUNFSnM0d3FEN050ekl3PT0hdjE=?share_link_id=606033559503
- Общий док по экранам: https://docs.google.com/document/d/1Otc6q2-2nDPB3iMcDPwwZ-D4APch0goZ/edit?usp=sharing&ouid=111463861333690498961&rtpof=true&sd=true

**DoD:** [ ] UI/UX [ ] Frontend [ ] Backend

**Приоритет:** P0

---

### 3. Загрузка тренировки + статус обработки

Бегун загружает файл тренировки (.fit/.gpx) и получает обработанную тренировку с картой и статистикой.

**Элементы экрана**
- Зона загрузки файла (.fit/.gpx, до 20 МБ)
- Неблокирующий статус «в обработке»

**Состояния:** processing → processed, failed (нет GPS), duplicate, неподдерживаемый формат.

**Правило:** единственный способ получить тренировку в MVP — загрузка файла; дедупликация по времени, дистанции и хэшу файла.

**Полезные ссылки**
- Вайрфреймы (Miro): https://miro.com/welcomeonboard/TGxlY3ZKK2RtWmNtS3QzZXVEOEhPWFNJdStqQ0tZMUxzUG1mQzNaOHpXOXNKVFgxUTlrQ002bXhTbTVoZ2lSWnp0QVhSN2treDAxSFZmUTIxSmxtRjFsU3oxYTdrOFAxQjRQTlQyVzZ0WDRZc2RIaGUzYTNOQ0JTbHNPcVdrZ2ZBS2NFMDFkcUNFSnM0d3FEN050ekl3PT0hdjE=?share_link_id=606033559503
- Общий док по экранам: https://docs.google.com/document/d/1Otc6q2-2nDPB3iMcDPwwZ-D4APch0goZ/edit?usp=sharing&ouid=111463861333690498961&rtpof=true&sd=true

**DoD:** [ ] UI/UX [ ] Frontend [ ] Backend

**Приоритет:** P0

---

### 4. Детали тренировки: карта + графики + сводка

Бегун просматривает карту, графики и сводку своей обработанной тренировки.

**Элементы экрана**
- Карта маршрута с окраской по темпу/пульсу (переключатель)
- Графики темпа/пульса/высоты
- Таблица сплитов по км
- Сводка (темп, пульс, набор высоты, moving/elapsed time, калории)
- Список найденных сегментов + кнопка «Создать сегмент»
- Лайк + счётчик

**Состояния:** нет данных пульса → график скрыт; приватная зона обрезает маршрут для чужих зрителей.

**Полезные ссылки**
- Вайрфреймы (Miro): https://miro.com/welcomeonboard/TGxlY3ZKK2RtWmNtS3QzZXVEOEhPWFNJdStqQ0tZMUxzUG1mQzNaOHpXOXNKVFgxUTlrQ002bXhTbTVoZ2lSWnp0QVhSN2treDAxSFZmUTIxSmxtRjFsU3oxYTdrOFAxQjRQTlQyVzZ0WDRZc2RIaGUzYTNOQ0JTbHNPcVdrZ2ZBS2NFMDFkcUNFSnM0d3FEN050ekl3PT0hdjE=?share_link_id=606033559503
- Общий док по экранам: https://docs.google.com/document/d/1Otc6q2-2nDPB3iMcDPwwZ-D4APch0goZ/edit?usp=sharing&ouid=111463861333690498961&rtpof=true&sd=true

**DoD:** [ ] UI/UX [ ] Frontend [ ] Backend

**Приоритет:** P0

---

### 5. Создание сегмента

Бегун выделяет участок своей тренировки и создаёт из него именованный сегмент для сравнения с другими.

**Элементы экрана**
- Карта тренировки с выбором начальной/конечной точки
- Поле «название сегмента»

**Состояния:** участок короче ~500 м → предупреждение; сегмент с такой же геометрией уже есть → предложить существующий.

**Правило:** сопоставление тренировок с сегментами — упрощённый алгоритм (bounding box + пересечение линий).

**Полезные ссылки**
- Вайрфреймы (Miro): https://miro.com/welcomeonboard/TGxlY3ZKK2RtWmNtS3QzZXVEOEhPWFNJdStqQ0tZMUxzUG1mQzNaOHpXOXNKVFgxUTlrQ002bXhTbTVoZ2lSWnp0QVhSN2treDAxSFZmUTIxSmxtRjFsU3oxYTdrOFAxQjRQTlQyVzZ0WDRZc2RIaGUzYTNOQ0JTbHNPcVdrZ2ZBS2NFMDFkcUNFSnM0d3FEN050ekl3PT0hdjE=?share_link_id=606033559503
- Общий док по экранам: https://docs.google.com/document/d/1Otc6q2-2nDPB3iMcDPwwZ-D4APch0goZ/edit?usp=sharing&ouid=111463861333690498961&rtpof=true&sd=true

**DoD:** [ ] UI/UX [ ] Frontend [ ] Backend

**Приоритет:** P0

---

### 6. Экран сегмента (лидерборд)

Бегун просматривает список лучших результатов на сегменте и своё место в нём.

**Элементы экрана**
- Название/карта сегмента, дистанция
- Список прохождений по времени
- Выделенная позиция пользователя + личный рекорд

**Состояния:** не проходил сегмент → лидерборд без выделения + CTA попробовать.

**Полезные ссылки**
- Вайрфреймы (Miro): https://miro.com/welcomeonboard/TGxlY3ZKK2RtWmNtS3QzZXVEOEhPWFNJdStqQ0tZMUxzUG1mQzNaOHpXOXNKVFgxUTlrQ002bXhTbTVoZ2lSWnp0QVhSN2treDAxSFZmUTIxSmxtRjFsU3oxYTdrOFAxQjRQTlQyVzZ0WDRZc2RIaGUzYTNOQ0JTbHNPcVdrZ2ZBS2NFMDFkcUNFSnM0d3FEN050ekl3PT0hdjE=?share_link_id=606033559503
- Общий док по экранам: https://docs.google.com/document/d/1Otc6q2-2nDPB3iMcDPwwZ-D4APch0goZ/edit?usp=sharing&ouid=111463861333690498961&rtpof=true&sd=true

**DoD:** [ ] UI/UX [ ] Frontend [ ] Backend

**Приоритет:** P0

---

### 7. Лента активности подписок

Бегун подписывается на другого пользователя и видит его тренировки в ленте, может поставить лайк.

**Элементы экрана**
- Хронологический список тренировок подписок
- Карточка: автор, дата, дистанция/время/темп, мини-карта, лайк+счётчик
- Переход в детали тренировки или профиль автора

**Состояния:** пустая лента (нет подписок) → призыв найти и подписаться.

**Полезные ссылки**
- Вайрфреймы (Miro): https://miro.com/welcomeonboard/TGxlY3ZKK2RtWmNtS3QzZXVEOEhPWFNJdStqQ0tZMUxzUG1mQzNaOHpXOXNKVFgxUTlrQ002bXhTbTVoZ2lSWnp0QVhSN2treDAxSFZmUTIxSmxtRjFsU3oxYTdrOFAxQjRQTlQyVzZ0WDRZc2RIaGUzYTNOQ0JTbHNPcVdrZ2ZBS2NFMDFkcUNFSnM0d3FEN050ekl3PT0hdjE=?share_link_id=606033559503
- Общий док по экранам: https://docs.google.com/document/d/1Otc6q2-2nDPB3iMcDPwwZ-D4APch0goZ/edit?usp=sharing&ouid=111463861333690498961&rtpof=true&sd=true

**DoD:** [ ] UI/UX [ ] Frontend [ ] Backend

**Приоритет:** P0

---

### 8. Чужой профиль + поиск пользователей

Бегун находит другого пользователя через поиск и подписывается на него.

**Элементы экрана**
- Поиск по имени (от 2 символов)
- Карточка чужого профиля со статистикой
- Кнопка «Подписаться» / «Отписаться»

**Состояния:** пустой результат поиска — не ошибка.

**Правило:** подписка асимметрична, не требует подтверждения второй стороной.

**Полезные ссылки**
- Вайрфреймы (Miro): https://miro.com/welcomeonboard/TGxlY3ZKK2RtWmNtS3QzZXVEOEhPWFNJdStqQ0tZMUxzUG1mQzNaOHpXOXNKVFgxUTlrQ002bXhTbTVoZ2lSWnp0QVhSN2treDAxSFZmUTIxSmxtRjFsU3oxYTdrOFAxQjRQTlQyVzZ0WDRZc2RIaGUzYTNOQ0JTbHNPcVdrZ2ZBS2NFMDFkcUNFSnM0d3FEN050ekl3PT0hdjE=?share_link_id=606033559503
- Общий док по экранам: https://docs.google.com/document/d/1Otc6q2-2nDPB3iMcDPwwZ-D4APch0goZ/edit?usp=sharing&ouid=111463861333690498961&rtpof=true&sd=true

**DoD:** [ ] UI/UX [ ] Frontend [ ] Backend

**Приоритет:** P0

---

### 9. Моё членство + оплата

Как бегун, я оплачиваю разовый платёж и получаю доступ к каталогу привилегий.

**Элементы экрана**
- Статус: нет членства / ожидает оплаты / активно / истекло
- Кнопка «Оформить членство» → оплата (ЮKassa/Robokassa)
- Автоактивация после оплаты

**Состояния:** оплата отклонена/отменена → ошибка + повтор; страница закрыта без оплаты → «ожидает оплаты» до тайм-аута.

**Открытый вопрос → «Требует обсуждения»:** ЮKassa или Robokassa; устраивает ли разовый платёж без тарифа.

**Правило:** в MVP только разовый платёж, без рекуррентных списаний.

**Полезные ссылки**
- Вайрфреймы (Miro): https://miro.com/welcomeonboard/TGxlY3ZKK2RtWmNtS3QzZXVEOEhPWFNJdStqQ0tZMUxzUG1mQzNaOHpXOXNKVFgxUTlrQ002bXhTbTVoZ2lSWnp0QVhSN2treDAxSFZmUTIxSmxtRjFsU3oxYTdrOFAxQjRQTlQyVzZ0WDRZc2RIaGUzYTNOQ0JTbHNPcVdrZ2ZBS2NFMDFkcUNFSnM0d3FEN050ekl3PT0hdjE=?share_link_id=606033559503
- Общий док по экранам: https://docs.google.com/document/d/1Otc6q2-2nDPB3iMcDPwwZ-D4APch0goZ/edit?usp=sharing&ouid=111463861333690498961&rtpof=true&sd=true

**DoD:** [ ] UI/UX [ ] Frontend [ ] Backend

**Приоритет:** P0

---

### 10. Каталог привилегий партнёров

Бегун с активным членством просматривает каталог привилегий партнёров и получает промокод.

**Элементы экрана**
- Список 2–3 партнёров (лого, описание)
- Клик → условия + промокод

**Состояния:** без членства → промокод скрыт, CTA «оформи членство».

**Открытый вопрос → «Требует обсуждения»:** какие 2–3 партнёра на старте — нужны лого/бренд-гайды.

**Полезные ссылки**
- Вайрфреймы (Miro): https://miro.com/welcomeonboard/TGxlY3ZKK2RtWmNtS3QzZXVEOEhPWFNJdStqQ0tZMUxzUG1mQzNaOHpXOXNKVFgxUTlrQ002bXhTbTVoZ2lSWnp0QVhSN2treDAxSFZmUTIxSmxtRjFsU3oxYTdrOFAxQjRQTlQyVzZ0WDRZc2RIaGUzYTNOQ0JTbHNPcVdrZ2ZBS2NFMDFkcUNFSnM0d3FEN050ekl3PT0hdjE=?share_link_id=606033559503
- Общий док по экранам: https://docs.google.com/document/d/1Otc6q2-2nDPB3iMcDPwwZ-D4APch0goZ/edit?usp=sharing&ouid=111463861333690498961&rtpof=true&sd=true

**DoD:** [ ] UI/UX [ ] Frontend [ ] Backend

**Приоритет:** P0

---

## P1 — 4 карточки, следующая волна

### 11. RunFriendly-места (список/карта)

Бегун просматривает список/карту RunFriendly-мест, внесённых администратором.

**Элементы экрана**
- Карта/список точек: название, координаты, описание

**Полезные ссылки**
- Вайрфреймы (Miro): https://miro.com/welcomeonboard/TGxlY3ZKK2RtWmNtS3QzZXVEOEhPWFNJdStqQ0tZMUxzUG1mQzNaOHpXOXNKVFgxUTlrQ002bXhTbTVoZ2lSWnp0QVhSN2treDAxSFZmUTIxSmxtRjFsU3oxYTdrOFAxQjRQTlQyVzZ0WDRZc2RIaGUzYTNOQ0JTbHNPcVdrZ2ZBS2NFMDFkcUNFSnM0d3FEN050ekl3PT0hdjE=?share_link_id=606033559503
- Общий док по экранам: https://docs.google.com/document/d/1Otc6q2-2nDPB3iMcDPwwZ-D4APch0goZ/edit?usp=sharing&ouid=111463861333690498961&rtpof=true&sd=true

**DoD:** [ ] UI/UX [ ] Frontend [ ] Backend

**Приоритет:** P1

---

### 12. Календарь событий

Бегун просматривает список предстоящих событий.

**Элементы экрана**
- Список событий: название, дата, организатор
- Сортировка по дате, прошедшие не показываются

**Полезные ссылки**
- Вайрфреймы (Miro): https://miro.com/welcomeonboard/TGxlY3ZKK2RtWmNtS3QzZXVEOEhPWFNJdStqQ0tZMUxzUG1mQzNaOHpXOXNKVFgxUTlrQ002bXhTbTVoZ2lSWnp0QVhSN2treDAxSFZmUTIxSmxtRjFsU3oxYTdrOFAxQjRQTlQyVzZ0WDRZc2RIaGUzYTNOQ0JTbHNPcVdrZ2ZBS2NFMDFkcUNFSnM0d3FEN050ekl3PT0hdjE=?share_link_id=606033559503
- Общий док по экранам: https://docs.google.com/document/d/1Otc6q2-2nDPB3iMcDPwwZ-D4APch0goZ/edit?usp=sharing&ouid=111463861333690498961&rtpof=true&sd=true

**DoD:** [ ] UI/UX [ ] Frontend [ ] Backend

**Приоритет:** P1

---

### 13. Настройки приватности (privacy zone)

Бегун задаёт приватную зону вокруг адреса, чтобы скрыть участок маршрута на публичной карте.

**Элементы экрана**
- Точка на карте + радиус
- Список уже заданных зон

**Состояния:** слишком большой радиус → предупреждение.

**Правило:** обрезка — только для публичного показа; сам пользователь видит полный трек.

**Полезные ссылки**
- Вайрфреймы (Miro): https://miro.com/welcomeonboard/TGxlY3ZKK2RtWmNtS3QzZXVEOEhPWFNJdStqQ0tZMUxzUG1mQzNaOHpXOXNKVFgxUTlrQ002bXhTbTVoZ2lSWnp0QVhSN2treDAxSFZmUTIxSmxtRjFsU3oxYTdrOFAxQjRQTlQyVzZ0WDRZc2RIaGUzYTNOQ0JTbHNPcVdrZ2ZBS2NFMDFkcUNFSnM0d3FEN050ekl3PT0hdjE=?share_link_id=606033559503
- Общий док по экранам: https://docs.google.com/document/d/1Otc6q2-2nDPB3iMcDPwwZ-D4APch0goZ/edit?usp=sharing&ouid=111463861333690498961&rtpof=true&sd=true

**DoD:** [ ] UI/UX [ ] Frontend [ ] Backend

**Приоритет:** P1

---

### 14. Удаление аккаунта

Как бегун, я хочу удалить свой аккаунт и все данные, чтобы реализовать право на забвение по 152-ФЗ.

**Элементы экрана**
- Диалог подтверждения (повторный пароль/email)
- Предупреждение о необратимости

**Полезные ссылки**
- Вайрфреймы (Miro): https://miro.com/welcomeonboard/TGxlY3ZKK2RtWmNtS3QzZXVEOEhPWFNJdStqQ0tZMUxzUG1mQzNaOHpXOXNKVFgxUTlrQ002bXhTbTVoZ2lSWnp0QVhSN2treDAxSFZmUTIxSmxtRjFsU3oxYTdrOFAxQjRQTlQyVzZ0WDRZc2RIaGUzYTNOQ0JTbHNPcVdrZ2ZBS2NFMDFkcUNFSnM0d3FEN050ekl3PT0hdjE=?share_link_id=606033559503
- Общий док по экранам: https://docs.google.com/document/d/1Otc6q2-2nDPB3iMcDPwwZ-D4APch0goZ/edit?usp=sharing&ouid=111463861333690498961&rtpof=true&sd=true

**DoD:** [ ] UI/UX [ ] Frontend [ ] Backend

**Приоритет:** P1

---

## Не заводить задачами (вне MVP)

Запись тренировки в реальном времени, нативное приложение, мультиспорт, продвинутая аналитика (TSS/TRIMP/VO2max), клубы/групповые челленджи/личные сообщения, физическая карта/браслет членства, лидерборд среди подписок, promo/trial/рекуррентные платежи, тепловая карта B2G, импорт из Toplist.run/S10.run/Strava.
