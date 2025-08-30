export interface Positions {
    StraightUp: number;
    Split: number;
    Corner: number;
    Street: number;
    SixLine: number;
}


export function randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function newNumbers(amountsOfChips: number): [Positions, number] {
    const positions: Positions = {
        StraightUp: 0,
        Split: 0,
        Corner: 0,
        Street: 0,
        SixLine: 0
    };

    const currentResult = [];
    for (let i = 0; i < 4; i++) {
        const currenDraw = randomNumber(1, amountsOfChips);
        amountsOfChips -= currenDraw;
        if (amountsOfChips < 0)
            break;
        currentResult.push(currenDraw);
    }

    positions.StraightUp = currentResult[0] || 0;
    positions.Split = currentResult[1] || 0;
    positions.Corner = currentResult[2] || 0;
    positions.Street = currentResult[3] || 0;
    positions.SixLine = amountsOfChips < 0 ? 0 : amountsOfChips;

    // positions.StraightUp *= 35
    // positions.Split *= 17
    // positions.Corner *= 8
    // positions.Street *= 11
    // positions.SixLine *= 5
    const total =
        (positions.StraightUp * 35) +
        (positions.Split * 17) +
        (positions.Corner * 8) +
        (positions.Street * 11) +
        (positions.SixLine * 5);

    return [positions, total];
}

