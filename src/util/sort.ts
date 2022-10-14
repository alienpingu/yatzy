function countElement(hand: number[]) {
    let counts: { [key: string]: number } = {}
    hand.forEach((x) => { counts[x] = (counts[x] || 0) + 1; });
    return (counts);
}

function areConsecutive(arr: number[], n: number): boolean {
    // Sort the array
    arr.sort();
    // checking the adjacent elements
    for (var i = 1; i < n; i++)
        if (arr[i] != arr[i - 1] + 1)
            return false;

    return true;
}

export { countElement, areConsecutive };