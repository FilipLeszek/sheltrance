This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Cel projektu
Stworzenie aplikacji CRM dla schronisk. <br>
Ma na celu ułatwić codziennie funkcjonowanie schroniska poprzez dostarczenie rozwiązania do <br>
monitorowania zgłoszeń od osób zainteresowanymi adopcją oraz prowadzenie spraw adopcyjnych.<br>
Nasze rozwiązanie kierowane jest szczególnie do małych schronisk często prowadzonych przez kilka <br>
osób, które do tego celu używają rozwiązań analogowych czy np. portali społecznościowych.<br>
Chcemy, aby rejestracja schroniska była możliwie prosta i intuicyjna – manager będzie musiał podać <br>
tylko podstawowe dane z możliwością uzupełnienia reszty później.<br>
Manager będzie mógł następnie utworzyć konta pracowników.<br>
Podstawową funkcjonalnością aplikacji ma być obsługa nowych zgłoszeń/wiadomość od osób zainteresowanych adopcją.<br>
System ma również wspierać tworzenie spraw adopcyjnych jak i zarządzanie sprawami istniejącymi.<br>
Użytkownicy będą mieli możliwość przeglądania listy zgłoszeń oraz spraw z możliwością filtrowania widoków. <br>
Będzie również możliwość obejrzenia i modyfikowania szczegółów spraw oraz zgłoszeń.<br>
Aby, ułatwić zarządzanie zgłoszeniami i sprawami będzie możliwość przypisania spraw oraz zgłoszeń do konkretnych<br> pracowników.




### Skład zespołu
* Zuzanna Filipkowska 
* Mariusz Paluch
* Filip Leszek
* Michał Kowalczyk

Mentor zespołu: mgr inż. Klara Borowa <br>



### Instrukcja uruchomienia
Aplikacja jest skonteneryzowana <br>
wystraczy wykonać polecenie: docker compose up w folderze sheltrance <br>
Docker compose up spowoduje zbudowanie aplikacji next.js i <br>
wykona niezbędne polcenia do poprawnej pracy ORM. <br>
Następnie poczeka aż baza danych będzie gotowa i wykona migrację schematu danych.

Zostanie stworzony testowy użytkownik o danych: <br>
login: user
hasło: test

### Przebudowanie obrazu
Jeśli chcemy wymusić przebudowanie obrazów można to zrobić za pomocą: >br>
docker compose up --build

## Dla developerów

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
