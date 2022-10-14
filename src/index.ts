import express from "express";
import Game from "./model/Game";
import Player from "./model/Player";

let PORT = process.env.PORT || 3001;
let app = express();
let player = new Player();
let game = new Game(player);

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
// GET
app.get('*', (req, res) => {
    res.redirect('/');
})
// POST
app.post('/throw', (req, res) => {
    let side = req.body.side;
    game.throw(side);
    res.status(200).send({
        hand: game.player.hand,
        round: game.player.round,
        turn: game.player.turn
    });
})
app.post('/skip', (req, res) => {
    game.player.turn++;
    res.status(200).send({
        hand: game.player.hand,
        round: game.player.round,
        turn: game.player.turn
    });
})
app.post('/compute', (req, res) => {
    let hand = req.body.hand;
    let computedList = game.compute(hand);
    res.status(200).send(computedList);
})
app.post('/points', (req, res) => {
    let computed = req.body.computed;
    if (game.points(computed)) {
        res.status(200).send(player.points);
    } else {
        res.status(300).send("Impossible to write points");
    }
})

app.post('/reset', (req, res) => {
    game.reset();
    res.status(200).send(game.player.points);
})

app.post('/info', (req, res) => {
    res.status(200).send({
        round: game.player.round,
        turn: game.player.turn,
        points: game.player.points
    });
});

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})
