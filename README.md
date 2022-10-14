# boilerplate-ts-node-jest

## Installation Instructions

```JavaScript
npm install
npm run dev     //run in development mode
npm run test    //run tests
npm run build   //build ./dist bundle
npm start       //run javascript bundle
```

## Description

Sono previste diverse combinazioni che ogni giocatore deve realizzare lanciando i dadi. Ottenuta la combinazione il giocatore guadagna il punteggio previsto per la combinazione. Una combinazione non può essere ripetuta quindi il gioco termina dopo 13 turni di lancio dei dadi, anche quando non sono state realizzate tutte le combinazioni.\
\
Ad ogni turno il giocatore può lanciare i dadi tre volte. Al primo lancio il giocatore lancia tutti i dadi, mentre nei successivi due lanci il giocatore può scegliere di trattenere uno o più dadi favorevoli ad ottenere la combinazione cercata. Il giocatore può anche scegliere di non trattenere alcun dado o di non utilizzare successivi lanci, nel caso ad esempio si sia già realizzata una combinazione utile. Al termine dei tre lanci il giocatore deve segnare obbligatoriamente un punteggio in una delle caselle del segnapunti non ancora utilizzata. Se alla fine del turno di gioco non viene realizzata una delle possibili combinazioni ancora "libera" sul tabellone, il giocatore deve segnare "0" (zero) in una delle caselle ancora a sua disposizione.\
\
Vince il giocatore che ha totalizzato il maggior numero di punti.\

## Combinations

- Dadi uguali con **1** (punteggio dato dalla somma dei dadi con 1): si ottiene quando almeno un dado è 1. Il punteggio è la somma dei dadi che riportano 1. Ad esempio: 1-3-4-6-1 vale 2.
- Dadi uguali con **2** (punteggio dato dalla somma dei dadi con 2): si ottiene quando almeno un dado è 2. Il punteggio è la somma dei dadi che riportano 2. Ad esempio: 2-1-2-2-5 vale 6.
- Dadi uguali con **3** (punteggio dato dalla somma dei dadi con 3): Si ottiene quando almeno un dado è 3. Il punteggio è la somma dei dadi che riportano 3. Ad esempio: 3-1-3-4-3 vale 9.
- Dadi uguali con **4** (punteggio dato dalla somma dei dadi con 4): si ottiene quando almeno un dado è 4. Il punteggio è la somma dei dadi che riportano 4. Ad esempio: 4-1-2-2-1 vale 4.
- Dadi uguali con **5** (punteggio dato dalla somma dei dadi con 5): si ottiene quando almeno un dado è 5. Il punteggio è la somma dei dadi che riportano 5. Ad esempio: 5-1-5-5-2 vale 15.
- Dadi uguali con **6** (punteggio dato dalla somma dei dadi con 6): si ottiene quando almeno un dado è 6. Il punteggio è la somma dei dadi che riportano 6. Ad esempio: 6-3-2-6-1 vale 12,
- **Bonus** (35 punti): si ottiene quando la somma dei punteggi per le 6 combinazioni precedenti supera o raggiunge 63.
- **Piccola** Scala (30 punti): quando 4 dadi sono ordinati in modo crescente (1-2-3-4 o 2-3-4-5 o 3-4-5-6)
- **Grande** Scala (40 punti): quando 5 dadi sono ordinati in modo crescente (1-2-3-4-5 o 2-3-4-5-6)
- **Tris** (punteggio dato dalla somma di tutti i dadi): quando 3 dei cinque dadi sono uguali. Ad esempio 3-3-3-5-2.
- **4 dadi uguali** (punteggio dato dalla somma di tutti i dadi): quando 4 dei 5 dadi sono uguali. Ad esempio 5-5-5-5-1.
- **Full** (25 punti): coincide con la combinazione del poker e cioè 3 dadi di un tipo e due di un altro. Ad esempio 4-4-4-1-1.
- **Yahtzee** (50 punti): quando si ottengono 5 dadi uguali. Ad esempio 1-1-1-1-1 o 4-4-4-4-4. Se Yahtzee viene ripetuto può essere inserito solo in un'altra combinazione libera con il relativo punteggio.
- **Chance** (punteggio dato dalla somma dei 5 dadi): qualsiasi combinazione ottenuta. Questa è una possibilità da sfruttare quando non si riesce a realizzare nessuna delle combinazioni precedenti o la combinazione realizzata è già stata utilizzata precedentemente. Anche questa combinazione può essere utilizzata una sola volta.
