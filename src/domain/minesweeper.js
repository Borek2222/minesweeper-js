import {field} from "./models/field.js";
import {Coordinates} from "./models/Coordinates.js";


export class Minesweeper {

    /**
     * @param {number} rows
     * @param {number} columns
     * @param {number | null} bombs
     */
    constructor(rows, columns, bombs = null)  {
        this.rows = rows;
        this.columns = columns;

        this.isGameOver = false;

        if (bombs == null)
            this.bombs = this._calculateDefaultBombs();
        else
            this.bombs = bombs;

        this.bombLoc = [];
        for (let i = 0; i < this.bombs; i++){
            let x = Math.floor(Math.random() * columns);
            let y = Math.floor(Math.random() * rows);
            let coor = new Coordinates(x, y);
            this.bombLoc.push(coor);
        }

        console.log(this.bombLoc);

        this.array = [];
        for (let i = 0; i < rows; i++) {
            let tempArray = [];
            for (let j = 0; j < columns; j++) {
                tempArray.push(field.hidden);
            }
            this.array.push(tempArray);
        }
    }

    /**
     * TODO: IMPLEMENT THIS (DONE)
     * Calculate how many bombs should be on the field and return it.
     * The calculation should Depend on the size of the field.
     * @private
     * @return {number} amount of bombs
     */
    _calculateDefaultBombs() {
        let defBombs = 15;
        if (this.rows > 10 && this.rows > 10) {
            for (let i = 0; i < this.rows; i++)
                defBombs++;
        }
        return defBombs;
    }

    /**
     * TODO: IMPLEMENT THIS (DONE)
     * Returns the current state of the field.
     * Fields can be: hidden, visible, flagged or question marked.
     * @param {number} x
     * @param {number} y
     * @return {field}
     */
    getField(x, y) {
        return this.array[x][y];
    }

    /**
     * TODO: IMPLEMENT THIS (DONE)
     * Returns how many bombs are around the field
     * @param {number} x
     * @param {number} y
     * @return {number}
     */
    getAmountOfSurroundingBombs(x, y) {
        let surrBombs = 0;

        if(this.isBombOnPosition(x+1, y) === true)
            surrBombs++;

        if (this.isBombOnPosition(x, y+1)  === true)
            surrBombs++;

        if (this.isBombOnPosition(x+1, y+1)  === true)
            surrBombs++;

        if (this.isBombOnPosition(x-1, y)  === true)
            surrBombs++;

        if (this.isBombOnPosition(x, y-1)  === true)
            surrBombs++;

        if (this.isBombOnPosition(x-1, y-1)  === true)
            surrBombs++;

        if (this.isBombOnPosition(x+1, y-1)  === true)
            surrBombs++;

        if (this.isBombOnPosition(x-1, y+1)  === true)
            surrBombs++;

        return surrBombs;
    }

    /**
     * TODO: IMPLEMENT THIS (DONE)
     * Returns true there is a bomb on the position
     * @param {number} x
     * @param {number} y
     * @return {boolean}
     */
    isBombOnPosition(x, y) {
        for (let i = 0; i < this.bombLoc.length; i++) {
            if (this.bombLoc[i].x === x && this.bombLoc[i].y === y)
                return true;
        }
        return false;
    }

    /**
     * TODO: IMPLEMENT THIS (DONE)
     * Reveals the field and all empty connected fields around it.
     * Or stops the game if clicked on a position, where a bomb is located.
     * @param {number} x
     * @param {number} y
     */
    reveal(x, y) {
        if (!(this.array[x][y] === field.flag || this.array[x][y] === field.question_mark))
            this.array[x][y] = field.visible;

        if (this.isBombOnPosition(x,y) === true) {
            this.isGameOver = true;
            this.array[x][y] = field.hidden;
        }
        this.revealCell(x,y);
    }

    revealCell(x,y) {
        if (this.array[x][y] === field.hidden)
            this.array[x][y] = field.visible;

        if (this.getAmountOfSurroundingBombs(x,y+1) === 0 && this.array[x][y] === field.hidden)
            this.revealCell(x)(y+1);
        else if (!this.getAmountOfSurroundingBombs(x,y) > 0)
            this.array[x][y+1] = field.visible;

        if (this.getAmountOfSurroundingBombs(x+1,y) === 0 && this.array[x][y] === field.hidden )
            this.revealCell(x+1)(y);
        else if (!this.getAmountOfSurroundingBombs(x,y) > 0)
            this.array[x+1][y] = field.visible;

        if (this.getAmountOfSurroundingBombs(x+1,y+1) === 0 && this.array[x][y] === field.hidden)
            this.revealCell(x+1)(y+1);
        else if (!this.getAmountOfSurroundingBombs(x,y) > 0)
            this.array[x+1][y+1] = field.visible;

        if (this.getAmountOfSurroundingBombs(x,y-1) === 0 && this.array[x][y] === field.hidden)
            this.revealCell(x)(y-1);
        else if (!this.getAmountOfSurroundingBombs(x,y) > 0)
            this.array[x][y-1] = field.visible;

        if (this.getAmountOfSurroundingBombs(x-1,y) === 0 && this.array[x][y] === field.hidden)
            this.revealCell(x-1)(y);
        else if (!this.getAmountOfSurroundingBombs(x,y) > 0)
            this.array[x-1][y] = field.visible;

        if (this.getAmountOfSurroundingBombs(x-1,y-1) === 0 && this.array[x][y] === field.hidden)
            this.revealCell(x-1)(y-1);
        else if (!this.getAmountOfSurroundingBombs(x,y) > 0)
            this.array[x-1][y-1] = field.visible;

        if (this.getAmountOfSurroundingBombs(x-1,y+1) === 0 && this.array[x][y] === field.hidden)
            this.revealCell(x-1)(y+1);
        else if (!this.getAmountOfSurroundingBombs(x,y) > 0)
            this.array[x-1][y+1] = field.visible;

        if (this.getAmountOfSurroundingBombs(x+1,y-1) === 0 && this.array[x][y] === field.hidden)
            this.revealCell(x+1)(y-1);
        else if (!this.getAmountOfSurroundingBombs(x,y) > 0)
            this.array[x+1][y-1] = field.visible;
    }

    /**
     * TODO: IMPLEMENT THIS (DONE)
     * Toggles the field state, if it has not been revealed yet.
     * @param {number} x
     * @param {number} y
     */
    toggleFieldState(x, y) {
        if (this.array[x][y] === field.hidden)
            this.array[x][y] = field.flag;

        else if (this.array[x][y] === field.flag)
            this.array[x][y] = field.question_mark;

        else if ( this.array[x][y] === field.question_mark)
            this.array[x][y] = field.hidden;
    }

    /**
     * TODO: IMPLEMENT THIS
     * Returns if the user already won
     * @returns {boolean}
     */
    didWin() {
        return false;
    }

    /**
     * TODO: IMPLEMENT THIS (DONE)
     * Returns if the user clicked a bomb and therefore lost.
     * @returns {boolean}
     */
    didLoose() {
        if (this.isGameOver === true)
            return true;
    }

    /**
     * Returns the remaining amount bombs, user has to select
     * @return {number}
     */
    getRemainingBombCount() {
        return this.bombs;
    }
}


