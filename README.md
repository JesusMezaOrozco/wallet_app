# Project Local Deployment :rocket:

Hi Everyone, The nexts steps are the guide to deploy locally the wallet application.

#### First Step

Clone this repository in an specific directory:

```bash
git clone 'this repository url'
```

#### Second Step

Go to root project directory and run:

```bash
npm i
```

#### Third Step

Create in root project directory a .env file and define the next env variable:

```bash
VITE_VITA_WALLET_API = https://api.qa.vitawallet.io/api
```

#### Fourth Step

Run:

```bash
  npm run dev
```

#### App Previewer

## ![App_Previewer](/public/images/app_previewer.png)

## ![App_Previewer](/public/images/app_previewer_2.png)

## ![App_Previewer](/public/images/app_previewer_3.png)

## ![App_Previewer](/public/images/app_previewer_4.png)

---

#### Unit Tests :dart:

Run:

```bash
  npm run test
```

#### E2E :dart:

Run:

```bash
  npm run cypress:open
```

## Technologies :hammer:

:white_check_mark: React Router Dom
:white_check_mark: React
:white_check_mark: Typescript
:white_check_mark: Material UI
:white_check_mark: Tailwind CSS
:white_check_mark: React Context API
:white_check_mark: Vitest
:white_check_mark: Axios
:white_check_mark: Cypress
