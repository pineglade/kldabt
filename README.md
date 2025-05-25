# kldabt

Заказ на подарочное интернет-издание в стиле рукописи.

[pineglade.github.io/kldabt](https://pineglade.github.io/kldabt)

Несколько интересных кейсов:

- Сборка статического многостраничника (SSR + SPA).
- Работа с «тетрадными» градиентами и рукописными шрифтами.
- Работа с вертикальным ритмом.
- Создание «книгоподобного» оглавления с заполнителем промежутков.

## Предпросмотр билда

Доступен с помощью команды `npm start`:

- http://localhost:8080/kldabt/
- http://localhost:8080/kldabt/amp

## Набор возможностей

- [Карта сайта](https://pineglade.github.io/kldabt/sitemap.xml).
- [AMP-страницы](https://pineglade.github.io/kldabt/amp).
- [Turbo-страницы](https://pineglade.github.io/kldabt/turbo.rss).
- [Автообновление зависимостей](tools/upgrade.ts).

## Технические особенности

- Автодеплой при пуше через github action.
- Отказ от scoped-стилей в компонентах из-за бага `inlineStyleThreshold` при сборке AMP-версии,
  а также из-за неглобальной сортировки медиазапросов. Разметка и стили стали компактнее.
