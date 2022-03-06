# My actionhero Project

_visit www.actionherojs.com for more information_

## To install:

(assuming you have [node](http://nodejs.org/), [TypeScript](https://www.typescriptlang.org/), and NPM installed)

`npm install`

## To Run:

`npm start`

## To Test:

`npm test`

## knex

`npm run knex migrate:make create-users`

Migration cheatsheet into knex/README.md

## Eslint

I using [tslint-microsoft-contrib](https://github.com/microsoft/tslint-microsoft-contrib) converted to eslint with [tslint-to-eslint-config](https://github.com/typescript-eslint/tslint-to-eslint-config). This project already have `.eslint.rc` file.

How I did this:

1. install microsoft-contrib with `npm install tslint-microsoft-contrib --save-dev` and add config file `tslint.json`
```json
{
    "defaultSeverity": "error",
    "extends": ["tslint:recommended", "tslint-microsoft-contrib/recommended"],
    "jsRules": {
      "no-unused-expression": true
    },
    "rules": {
      "quotemark": [true, "single"],
      "member-access": [false],
      "ordered-imports": [false],
      "max-line-length": [true, 150],
      "member-ordering": [false],
      "interface-name": [false],
      "arrow-parens": false,
      "object-literal-sort-keys": false,
      "no-submodule-imports": false,
      "export-name": false,
      "no-relative-imports": false
    },
    "rulesDirectory": ["node_modules/tslint-microsoft-contrib"]
  }
```
2. install tslint packages 
```
npm i typescript tslint -D
```
and convert tslint config to eslint
```
npx tslint-to-eslint-config
```
3. remove all packages that we don't need after converting:
```
npm remove typescript tslint tslint-microsoft-contrib -D
```
and remove files `tslint-to-eslint-config.log` and `tslint.json`

4. remove rules for react a11y etc.