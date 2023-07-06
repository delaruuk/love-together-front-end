# Love Together Front End

This is where all the front end code for Love Together is stored.

## Getting Started

Before starting make sure you have the latest [npm](https://www.npmjs.com/) and [node](https://nodejs.org/) version!

> [Homebrew](https://brew.sh/) is a good option, for **mac** developers, to manage packages like the ones above.

- Clone repository on to your local machine.
- **cd** into the base directory of **love-together-front-end**.
- Create a .env file in the base directory and fill with values provided in the google [doc](https://docs.google.com/document/d/1DMZMuRXDwaXl_DLprfNtJbs-FUOF440LoNovyojknqU/edit).
- Run **npm install** to install all the necessary packages.
- Run **npm run dev** to start a dev server.

## Project Structure

love-together-front-end

```bash
├── .husky
│   └── pre-commit //pre commit scripts (testing, linting, etc)
├── apps
│   ├── mobile
│   └── web
├── packages
│   ├── eslint-config-custom
│   ├── ts-config
│   ├── tailwind-config
│   ├── firebase-config
│   ├── models
│   ├── utils
│   ├── assets
│   ├── context
│   └── ui
```
