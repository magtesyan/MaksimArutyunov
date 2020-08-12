<h1 align="center">Create HTML boilerplate</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-green.svg?cacheSeconds=2592000" />
  <img src="https://img.shields.io/badge/node-%5E10.18-green.svg" />
</p>

<p>Привет! Спасибо за то что используете наш Create HTML boilerplate.</p>
  <p>
    Данная сборка вдохновлена проектом с хабра и многими часами вёрстки и
    разработки. Здесь специально нет ничего лишнего и только набор базовых
    файлов, чтобы было понятно как построить базовую структуру проекта
  </p>
  <ul>
    <li>HTML</li>
    <li>SCSS</li>
    <li>JS</li>
    <li>Шрифты</li>
    <li>Картинки и т.д.</li>
  </ul>
</p>

## Файловая структура
  
```
source/
fonts/                - папка с подключаемыми шрифтами
html/                 – HTML
  includes/           – блоки
  views/              – страницы
img/                  - картинки
js/                   - JavaScript
scss/                 - стили
  blocks/               – блоки
  font-face.scss        - подключение шрифтов
  global.scss           - глобальные стили
  style.scss            - подключение всех стилей проекта
  variables.scss        - SCSS переменные (цвета, размеры, шрифты)
vendors/
  normalize-css/
    normalize.min.css - нормализация стилей по-умолчанию


.editorconfig           - настройки редактора кода
.eslitrc.js             - настройки JS линтера
```

## Зависимости

- node ^10.18

## Что под капотом

- Webpack
- SCSS
- JS с Babel
- Stylelint, Eslint
- Prettier, Husky, lint-staged – для автоформатирования и пре-коммит проверки

## Установка

```sh
npm i
```

## Запуск

```sh
npm start
```
