import initialPoints from "../util/initialPoints";

export default class Player {
    hand: number[] = [];
    points: any = { ...initialPoints };
    round: number = 1;
    turn: number = 0;
}