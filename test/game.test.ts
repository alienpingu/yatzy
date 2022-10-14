import Game from "../src/model/Game";
import Player from "../src/model/Player";

let player = new Player();
let game = new Game(player);

describe("throw", () => {
    it("return lenght of 5", () => {
        game.throw([4, 3])
        expect(game.player.hand.length).toBe(5);
    })
    it("return incremented turn counter", () => {
        game.player.turn = 1;
        game.throw([])
        expect(game.player.turn).toBe(2);
    })
    it("return incremented round counter after 3 turn", () => {
        game.player.turn = 0;
        game.player.round = 1;
        game.throw([])
        game.throw([])
        game.throw([])
        expect(game.player.round).toBe(1);
    })

});
describe("compute", () => {
    // Compute
    it("dice equal with 1. eg. 1 1-3-4-5", () => {
        expect(game.compute([1, 3, 4, 5, 1])).toStrictEqual([
            { name: "chance", points: 14 },
            { name: "equal_1", points: 2 },
            { name: "equal_3", points: 3 },
            { name: "equal_4", points: 4 },
            { name: "equal_5", points: 5 }
        ]);
    })
    it("dice equal with 2. eg. 2-1-2-3-5", () => {
        expect(game.compute([2, 2, 2, 3, 5])).toStrictEqual([
            { name: "chance", points: 14 },
            { name: "equal_2", points: 6 },
            { name: "tris", points: 14 },
            { name: "equal_3", points: 3 },
            { name: "equal_5", points: 5 }
        ]);
    })
    it("dice equal with 3. eg. 3-1-3-4-5", () => {
        expect(game.compute([3, 1, 3, 4, 5])).toStrictEqual([
            { name: "chance", points: 16 },
            { name: "equal_1", points: 1 },
            { name: "equal_3", points: 6 },
            { name: "equal_4", points: 4 },
            { name: "equal_5", points: 5 },
        ]);
    })
    it("dice equal with 4. eg. 4-1-2-2-1", () => {
        expect(game.compute([4, 1, 2, 2, 1])).toStrictEqual([
            { name: "chance", points: 10 },
            { name: "equal_1", points: 2 },
            { name: "equal_2", points: 4 },
            { name: "equal_4", points: 4 },
        ]);
    })
    it("dice equal with 5. eg. 5-1-5-5-2", () => {
        expect(game.compute([5, 1, 5, 5, 2])).toStrictEqual([
            { name: "chance", points: 18 },
            { name: "equal_1", points: 1 },
            { name: "equal_2", points: 2 },
            { name: "equal_5", points: 15 },
            { name: "tris", points: 18 }
        ]);
    })
    it("dice equal with 6. eg. 6-3-2-6-1", () => {
        expect(game.compute([6, 3, 2, 6, 1])).toStrictEqual([
            { name: "chance", points: 18 },
            { name: "equal_1", points: 1 },
            { name: "equal_2", points: 2 },
            { name: "equal_3", points: 3 },
            { name: "equal_6", points: 12 },
        ]);
    })
    it("little straight. [30 points] eg. 2-2-3-4-5", () => {
        expect(game.compute([2, 2, 3, 4, 5])).toStrictEqual([
            { name: "chance", points: 16 },
            { name: "equal_2", points: 4 },
            { name: "equal_3", points: 3 },
            { name: "equal_4", points: 4 },
            { name: "equal_5", points: 5 },
            { name: "little_straight", points: 30 }
        ]);
    })
    it("big straight. [40 points]eg. 1-2-3-4-5", () => {
        expect(game.compute([1, 2, 3, 4, 5])).toStrictEqual([
            { name: "chance", points: 15 },
            { name: "equal_1", points: 1 },
            { name: "equal_2", points: 2 },
            { name: "equal_3", points: 3 },
            { name: "equal_4", points: 4 },
            { name: "equal_5", points: 5 },
            { name: "little_straight", points: 30 },
            { name: "big_straight", points: 40 }
        ]);
    })
    it("tris. return sum of all dice eg. 2-2-2-2-5 => 13", () => {
        expect(game.compute([2, 2, 2, 4, 5])).toStrictEqual([
            { name: "chance", points: 15 },
            { name: "equal_2", points: 6 },
            { name: "tris", points: 15 },
            { name: "equal_4", points: 4 },
            { name: "equal_5", points: 5 },
        ]);
    })
    it("4 (dice) equal.return sum of all dice eg. 2-2-2-2-5 => 13", () => {
        expect(game.compute([2, 2, 2, 2, 5])).toStrictEqual([
            { name: "chance", points: 13 },
            { name: "equal_2", points: 8 },
            { name: "poker", points: 13 },
            { name: "equal_5", points: 5 }
        ]);
    })
    it("Full return sum of all dice eg. 2-2-2-5-5 => 25", () => {
        expect(game.compute([2, 2, 2, 5, 5])).toStrictEqual([
            { name: "chance", points: 16 },
            { name: "equal_2", points: 6 },
            { name: "tris", points: 16 },
            { name: "equal_5", points: 10 },
            { name: "full", points: 25 }
        ]);
    })
    it("Yahtzee. [25 points ]eg. 2-2-2-2-2", () => {
        expect(game.compute([2, 2, 2, 2, 2])).toStrictEqual([
            { name: "chance", points: 10 },
            { name: "equal_2", points: 10 },
            { name: "yahtzee", points: 50 }
        ]);
    })
    it("chance. only one time. [sum] with 3-2-1-6-5", () => {
        expect(game.compute([1, 2, 2, 4, 6])).toStrictEqual([
            { name: "chance", points: 15 },
            { name: "equal_1", points: 1 },
            { name: "equal_2", points: 4 },
            { name: "equal_4", points: 4 },
            { name: "equal_6", points: 6 },
        ]);
    })
});


describe("points", () => {

    it("return 2 in equal_1 score if added", () => {
        game.points({ name: "equal_1", points: 2 })
        expect(player.points.equal_1).toBe(2);
    })
    it("return false if isn't possible add a points ", () => {
        let player = new Player();
        game.points({ name: "equal_1", points: 2 })

        expect(game.points({ name: "equal_1", points: 2 })).toBe(false);
    })
    // MOVED IN FE
    // it("return bonus = 35 if upper_sum > 63 ", () => {
    //     let player = new Player();
    //     game.points({ name: "equal_1", points: 4 })
    //     game.points({ name: "equal_2", points: 8 })
    //     game.points({ name: "equal_3", points: 12 })
    //     game.points({ name: "equal_4", points: 16 })
    //     game.points({ name: "equal_5", points: 20 })
    //     game.points({ name: "equal_6", points: 24 })

    //     expect(player.points["bonus"]).toBe(35);
    // })
});
