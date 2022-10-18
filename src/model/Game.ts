import player from "../interface/player";
import { countElement, areConsecutive } from "../util/sort";
import initialPoints from "../util/initialPoints";

export default class Game {
    player: player;

    constructor(player: player) {
        this.player = player;
    }

    throw = (side: number[]): void => {
        if (this.player.turn === 0) {
            this.player.hand = [];
            for (let i = this.player.hand.length; i < 5; i++) {
                this.player.hand.push(Math.floor(Math.random() * (6 - 1 + 1)) + 1)
            }
        } else {
            this.player.hand = side;
            for (let i = side.length; i < 5; i++) {
                this.player.hand.push(Math.floor(Math.random() * (6 - 1 + 1)) + 1)
            }
        }
        this.player.turn++;
    }

    compute = (hand: number[]) => {
        let result: object[] = [];
        // Chance: Can be always used but only once time
        result.push({ name: "chance", points: hand.reduce((a, b) => a + b, 0) });
        // Check for equal dice, tris, 4 dice
        let count = countElement(hand);
        Object.entries(count).forEach(([key, value]) => {
            let name = "";
            let points = 0;
            if (value >= 1) {
                switch (key) {
                    case "1":
                        name = "equal_1";
                        break;
                    case "2":
                        name = "equal_2";
                        break;
                    case "3":
                        name = "equal_3";
                        break;
                    case "4":
                        name = "equal_4";
                        break;
                    case "5":
                        name = "equal_5";
                        break;
                    case "6":
                        name = "equal_6";
                        break;
                }
                points = Number(key) * value;
                result.push({ name: name, points: points });
            }
            if (value >= 3) {
                name = "tris"
                points = hand.reduce((a, b) => a + b, 0)
                result.push({ name: name, points: points });
            }
            if (value >= 4) {
                name = "poker"
                points = hand.reduce((a, b) => a + b, 0)
                result.push({ name: name, points: points });
            }
            if (value === 5) {
                name = "yahtzee"
                result.push({ name: name, points: 50 });
            }
        });

        // Full Check
        if (
            Object.keys(count).length === 2 &&
            count[Object.keys(count)[0]] === 3 &&
            count[Object.keys(count)[1]] === 2
        ) {
            result.push({ name: "full", points: 25 });
        } else if (Object.keys(count).length === 2 &&
            count[Object.keys(count)[0]] === 2 &&
            count[Object.keys(count)[1]] === 3) {
            result.push({ name: "full", points: 25 });
        }
        // Straight
        let unique = hand.filter((item, pos) => hand.indexOf(item) == pos)
        if (areConsecutive(unique, 5)) {
            result.push({ name: "little_straight", points: 30 });
            result.push({ name: "big_straight", points: 40 });
        } else if (areConsecutive(unique, 4)) {
            result.push({ name: "little_straight", points: 30 });
        }



        return result;
    }

    points = (computed: any) => {
        // if (this.player.turn === 3) {
        //     this.player.turn = 0;
        //     this.player.round++;
        // } else {
        //     return false;
        // }

        if (this.player.points[computed.name] === "" && computed.name !== "yahtzee") {

            this.player.points[computed.name] = computed.points;
            let equal_total: number = Number(this.player.points["equal_1"]) + Number(this.player.points["equal_2"]) + Number(this.player.points["equal_3"]) + Number(this.player.points["equal_4"]) + Number(this.player.points["equal_5"]) + Number(this.player.points["equal_6"])

            if (equal_total >= 63) {
                this.player.points["bonus"] = 35;
            }
            return true;
        } else if (computed.name === "yahtzee") {
            if (this.player.points["yahtzee"] === "") {
                this.player.points["yahtzee"] = 50;
            } else {
                this.player.points["yahtzee_bonus"] += 100;
            }
            return true;
        }
        return false;
    }

    reset = () => {
        this.player.points = { ...initialPoints };
        this.player.turn = 0;
        this.player.round = 1;
    }
}
