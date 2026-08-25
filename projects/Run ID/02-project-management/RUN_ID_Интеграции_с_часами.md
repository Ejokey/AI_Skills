# RUN.ID — интеграция с часами: что доступно без партнёрств

Справка на 20.08.2026. Составлено по официальной документации вендоров и платформ. Доли рынка РФ взяты из внутреннего исследования `runid_vendors_full.md` и отдельно не верифицировались.

## Вывод в одну строку

При наличии мобильного приложения ~63–72% рынка РФ подключается **без единого договора с вендором** — через Apple HealthKit и Google Health Connect. Единственная закрытая доля — Huawei (25–30%). Отдельно: как работает Strava (прямые договоры облако-в-облако, шину почти не использует) и что реально доступно без мобилки — см. ниже.

## Почему договоры не нужны (шины)

HealthKit и Health Connect — это общие шины данных на устройстве. В них пишут **сами вендорские приложения** (Garmin Connect, Zepp, Mi Fitness, Samsung Health, Polar Flow, Suunto App, COROS App) по тумблеру, который включает пользователь. RUN.ID читает из шины, а не из облака вендора. В этой схеме вендор вообще не является контрагентом — отпадают партнёрские заявки, подписание API Agreement, санкционные оговорки в ToS и вопрос о юрлице.

## Таблица вендоров

| Вендор | Доля РФ | Как приходит | Партнёрство | Источник |
|---|---|---|---|---|
| Huawei | 25–30% | Нативной поддержки Health Connect нет | 🔴 нужно их Health Kit, остаётся закрыт | FitMesh 2026; Huawei Developer Forum |
| Amazfit / Zepp | 20–25% | Health Connect (Zepp: Profile → 3rd-party account linking). Также Apple Health | 🟢 не нужно | Notebookcheck; Amazfit Support |
| Xiaomi | ~15% | Health Connect (Mi Fitness: Profile → Settings → Accounts) | 🟢 не нужно | Mi Fitness / Google Play; Healthy Chronos |
| Apple Watch | 10–12% | HealthKit напрямую | 🟢 не нужно; нужен Apple Developer + entitlement | Apple: HealthKit Entitlement |
| Samsung | 7–9% | Health Connect (Samsung Health ≥6.22.5, с окт. 2022) | 🟢 не нужно | Samsung Developer; Samsung Health Connect FAQ |
| Garmin | 5–7% | Health Connect (Garmin Connect: Settings → Health Connect). Apple Health на iOS | 🟢 не нужно | Android Central; Garmin Forums |
| Polar | ~2% | Apple Health (More → General settings) + Health Connect | 🟢 не нужно | Polar Support (обе статьи) |
| Suunto | ~2% | Apple Health + Health Connect через Suunto App | 🟢 не нужно | Suunto App Store; Sahha |
| COROS | ~1%, растёт | Apple Health + Health Connect (Profile → Setting → 3rd Party Apps → Data Sync) | 🟢 не нужно | COROS Help Center |

## Ключевые тезисы

1. **Garmin и Suunto приезжают без заявок.** Это снимает главные блокеры прежнего плана: длинную партнёрскую очередь Garmin и прямой запрет в ToS Suunto (п.4k, п.20) на использование в санкционных юрисдикциях. Через шину вендор не ваш контрагент.

2. **Мосты-агрегаторы (Health Sync, SyncMyTracks) не нужны и не решают отдельной задачи.** Они льют данные в те же шины. Все значимые вендоры, кроме Huawei, пишут туда сами. Мост остаётся актуальным только как обходной путь для Huawei.

3. **Без мобильного приложения потолок — около 2% рынка** (только Polar, единственная self-serve интеграция, доступная из РФ). Все шины работают на устройстве, из веба они недоступны. Мобильное приложение — не улучшение охвата, а условие его существования. *(Решено: мобилка будет — см. раздел про Intervals.icu ниже, это меняет приоритеты.)*

4. **Платформенные гейты есть, но это процедуры, а не переговоры.** Android — декларация медприложений в Play Console, без неё типы данных Health Connect не откроются. iOS — HealthKit entitlement, усиленное ревью health-приложений и обязательная публичная Privacy Policy.

5. **Huawei — отдельное решение, не техническое.** Их Health Kit требует приложение в AppGallery и уставный капитал ≥1 млн CNY. Либо идти на этот ценз, либо сознательно списать четверть рынка и закрывать её файловым импортом.

## Как работает Strava — и почему это не пример для копирования

Strava получает данные **прямыми договорами облако-в-облако**, а не через шину: Garmin Connect официально заливает активность в Strava через API Garmin, бесплатно, синк за ~2 минуты, год истории при подключении. Это путь B — тот самый, который для RUN.ID на старте закрыт партнёрскими заявками.

При этом сама Strava **HealthKit почти не использует**: импортирует только тренировки, записанные родным Apple Workout, только за последние 30 дней, и явно **не берёт активности, записанные в Apple Health сторонними приложениями** — то есть игнорирует именно то, что мы предлагаем как основной канал. Вероятная причина (не подтверждена документацией ни одного вендора): через шину приходит агрегат (тип, длительность, дистанция, средний пульс), а не GPS-трек. Строить стратегию только на шинах, не имея этому подтверждения на устройстве, рискованно — см. раздел «Что не подтверждено» ниже.

## Что не подтверждено и требует проверки на устройстве

**Ни один вендор не заявляет в документации передачу GPS-трека в шину.** Что документировано по составу данных:

- Garmin → Health Connect: шаги, калории, сон, пульс, SpO2, тренировки (тип, длительность, дистанция). Явно не передаются Body Battery, Stress, Training Load, Training Effect.
- Polar → Apple Health: тип тренировки, длительность, дистанция, время старта/финиша, активные калории, средний пульс.
- COROS → Apple Health: дистанции, пульс, сон, шаги.
- Suunto: тренировки, шаги, дистанция, пульс.

Технически шины трек поддерживают: в Health Connect есть класс `ExerciseRoute` (координаты + таймстемпы), в HealthKit — `HKWorkoutRoute`. Но пишет ли туда конкретный вендор, из документации не следует ни у кого.

Второе расхождение: один источник указывает, что Garmin → Health Connect работает только на Android 14+, другие этого ограничения не упоминают. Не разрешено.

**Huawei-владелец в семье:** Health Sync не видит Huawei Health как источник для Health Connect напрямую в списке уже подключённых — Huawei и Health Connect живут в разных экосистемах (HMS/GMS), моста между ними нет нативно, только через Health Sync (мост читает Huawei Health и генерирует TCX/GPX/KML при наличии GPS). Официальный экспорт данных: Huawei ID Portal → Me → Privacy Settings → Request Your Data → Health app.

## Intervals.icu как источник данных — деталь, решающая для приоритетов

Intervals.icu — не альтернатива интеграциям, а **готовый агрегатор**, за которым уже стоят Garmin, Polar, Suunto, COROS, Zepp, Wahoo и другие (пользователь сам подключает свои устройства к своему аккаунту Intervals.icu, а RUN.ID читает готовый результат одним OAuth). Проверено вживую 20.08.2026:

**Кто это и как реагируют на такие запросы.** Один разработчик — David Tinker (Кейптаун, ЮАР), с 2024 работает над проектом full-time, вокруг него команда из 6–7 человек и активное сообщество. Regisтрация OAuth-приложения идёт напрямую письмом David на david@intervals.icu — не автоматическая форма, а ручная процедура с одним человеком. В публичном посте автор прямо пишет: «As a general principle Intervals.icu wants to be connected to as many services as possible with a preference for services that already aggregate other services» — то есть он лично заинтересован в таких интеграциях. В истории форума не нашлось ни одного случая отказа в регистрации приложения, включая совсем нишевые проекты (например, приложение с ~10 обращениями в день).

**Реакция на русских пользователей — нормальная.** На форуме есть живые темы от русскоязычных пользователей: запрос оплаты через MIR Pay для российских банков, локализация интерфейса на русский, работающий Telegram-бот с ответами на русском. Никаких блокировок или настороженности к российским пользователям в публичных обсуждениях не встретилось. Юрисдикция сервиса — ЮАР, не США и не ЕС, что снимает часть санкционных рисков, актуальных для Suunto/Garmin/COROS.

**API Terms and Conditions (действуют с 23.10.2025) — коротко:**
- лицензия неисключительная, бессрочная, бесплатная, разрешено коммерческое использование;
- **единственное содержательное ограничение** — атрибуция Garmin: если в приложении отображаются данные, полученные с устройства Garmin (определяется по полю `device_name`), нужно показать атрибуцию по бренд-гайдлайнам Garmin;
- запрет на злоупотребление API, незаконную деятельность, вредоносное ПО;
- сервис может приостановить доступ при нарушении условий (уведомление за 7 дней), может менять условия (уведомление за 30 дней);
- **применимое право — законы ЮАР.**

**Как регистрируется приложение — процедура (подтверждена официальным постом David, Jan 2021):** письмо на david@intervals.icu с полями: App name, Description, Website URL, Logo image URL (квадрат, ≥128×128), Privacy policy URL, Redirect URI's, **и ваш Intervals.icu ID (внизу страницы /settings)**. После регистрации приложение появляется в /settings только у заявителя («Manage App» → client_id/secret, вебхуки), затем по запросу David делает его видимым всем пользователям.

**Лимиты после регистрации через OAuth:** дневной лимит по умолчанию 100 запросов/юзер/день, до 500 юзеров (максимум 50 000 запросов/день), минимум 5000/день. Лимит на 15-минутное окно — 1/8 от дневного, минимум 2500. Если пользователей больше 500 или нужен другой лимит — пишут на support@intervals.icu.

**Оценка предложенного текста письма от вашего руководителя** — по существу верен, состав полей совпадает с официальной процедурой почти дословно. Один содержательный пробел: **не хватает Intervals.icu ID заявителя** — обязательное поле по регламенту David, значит сначала нужно зарегистрировать личный аккаунт на intervals.icu и найти ID внизу /settings, прежде чем отправлять письмо. Формально нужно решить два техничных момента до отправки: подготовить квадратный логотип ≥128×128 и рабочий URL политики конфиденциальности (в футере run-id.ru сейчас ссылки на документы — заглушки на `#`, см. RUN_ID_UIUX_Handoff_Brief.md).

**Риск, отдельный от переговоров с David:** данные Garmin в Intervals.icu происходят из аккаунта Garmin Connect пользователя (или другого источника, включая Strava). Это не нарушает политику Strava напрямую (Intervals.icu не «middleware к Strava» — пользователь подключает Garmin, а не Strava), но стоит держать в уме при written атрибуции: если у пользователя источником окажется Strava-загруженная активность, поле `device_name` это не всегда отразит корректно (тема на форуме подтверждает, что сам David называет это «tricky»).

## Рекомендуемый порядок (обновлено — мобилка подтверждена)

1. **Android + Health Connect первым.** Дешевле и быстрее iOS, закрывает Amazfit + Xiaomi + Samsung + Garmin ≈ 50% рынка. RuStore снимает вопрос дистрибуции.
2. **iOS / HealthKit вторым.** Техника простая, но упирается в возможность российского юрлица оплачивать Apple Developer Program. Выяснить до планирования спринта.
3. **Intervals.icu — параллельно, независимо от мобилки.** Не требует ни мобильного приложения, ни договоров с вендорами устройств, закрывает пользователей Garmin/Polar/Suunto/COROS/Zepp одним OAuth. Дешевле и быстрее всего перечисленного выше. Единственное действие — письмо David с полным набором полей.
4. **Suunto (форма подана/готовится) и Garmin (контакт-форма) — как прямые интеграции**, если Intervals.icu не покроет нужный объём данных или понадобится push (заливка тренировок обратно на часы).
5. **Huawei — отдельным решением** по цензу AppGallery.
6. **Файловый импорт — остаётся** как канал для Huawei и всех, кто не попал ни в шины, ни в Intervals.icu.

## Ближайшие проверки

1. Тест на живом устройстве, ~2 часа: Android-телефон + любые часы, включить синхронизацию в приложении вендора, записать уличную тренировку, проверить тестовым приложением, приходит ли `ExerciseRoute`. Результат определяет, достаточна ли шина как основной канал получения тренировок.
2. Перед письмом David: завести личный аккаунт на intervals.icu, найти свой Intervals.icu ID, подготовить логотип и рабочий URL Privacy Policy.

## Источники

- Android Developers — [типы данных Health Connect](https://developer.android.com/health-and-fitness/guides/health-connect/plan/data-types), [класс ExerciseRoute](https://developer.android.com/reference/androidx/health/connect/client/records/ExerciseRoute)
- Apple — [HealthKit Entitlement](https://developer.apple.com/documentation/bundleresources/entitlements/com.apple.developer.healthkit), [Protecting access to user's health data](https://support.apple.com/guide/security/protecting-access-to-users-health-data-sec88be9900f/web)
- Garmin — [Android Central: что Garmin отдаёт в Health Connect](https://www.androidcentral.com/wearables/garmin/heres-everything-garmin-will-and-wont-share-with-google-health-connect), [Garmin Forums](https://forums.garmin.com/apps-software/mobile-apps-web/f/connect-iq-store-android/339240/let-s-sync-garmin-data-to-health-connect-and-google-fit-apps)
- Amazfit / Zepp — [Notebookcheck](https://www.notebookcheck.net/Amazfit-smartwatches-get-new-Health-Connect-data-sync-feature.951489.0.html), [Amazfit Support](https://support.amazfit.com/en/amazfit_gts_2_mini/docs/N6cUdJxDRo6rbfxiLs1cJDBrnRd)
- Xiaomi — [Mi Fitness в Google Play](https://play.google.com/store/apps/details?id=com.xiaomi.wearable&hl=en_US), [Healthy Chronos](https://healthychronos.com/en/mi-fitness/)
- Samsung — [Accessing Samsung Health Data through Health Connect](https://developer.samsung.com/health/blog/en/health/blog/accessing-samsung-health-data-through-health-connect), [Health Connect FAQ](https://developer.samsung.com/health/health-connect-faq.html)
- Polar — [Apple Health](https://support.polar.com/en/support/connecting_polar_flow_with_apple_health), [Health Connect](https://support.polar.com/us-en/flow-app-health-connect)
- Suunto — [App Store](https://apps.apple.com/us/app/suunto/id1230327951), [Sahha](https://sahha.ai/integrations/suunto/)
- COROS — [Connecting Apple Health with COROS App](https://support.coros.com/hc/en-us/articles/360041549551-Connecting-Apple-Health-with-COROS-App)
- Huawei — [FitMesh 2026](https://www.fitmesh.fit/en/blog/huawei-health-health-connect-sync), [Huawei Developer Forum](https://forums.developer.huawei.com/forumPortal/en/topic/0204421756542530063)
- Strava — [Garmin and Strava](https://support.strava.com/hc/en-us/articles/216918057-Garmin-and-Strava), [Apple Health and Strava](https://support.strava.com/en-us/articles/15402024-apple-health-and-strava)
- Intervals.icu — [OAuth support / регистрация приложения](https://forum.intervals.icu/t/intervals-icu-oauth-support/), [API Terms and Conditions (23.10.2025)](https://forum.intervals.icu/t/intervals-icu-api-terms-and-conditions/114087), [About / команда](https://www.intervals.icu/about/), [форум — обсуждения на русском](https://forum.intervals.icu/search?q=Russia)
- Доли рынка РФ — внутреннее исследование `runid_vendors_full.md`, не верифицировано
