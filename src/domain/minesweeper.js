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
     * TODO: IMPLEMENT THIS
     * Calculate how many bombs should be on the field and return it.
     * The calculation should Depend on the size of the field.
     * @private
     * @return {number} amount of bombs
     */
    _calculateDefaultBombs() {
        return 10;
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
     * TODO: IMPLEMENT THIS
     * Returns how many bombs are around the field
     * @param {number} x
     * @param {number} y
     * @return {number}
     */
    getAmountOfSurroundingBombs(x, y) {
        return 0;
    }

    /**
     * TODO: IMPLEMENT THIS (DONE)
     * Returns true there is a bomb on the position
     * @param {number} x
     * @param {number} y
     * @return {boolean}
     */
    isBombOnPosition(x, y) {
        if (this.array[y][x] === this.bombLoc)
          return true;
    }

    /**
     * TODO: IMPLEMENT THIS (DONE)
     * Reveals the field and all empty connected fields around it.
     * Or stops the game if clicked on a position, where a bomb is located.
     * @param {number} x
     * @param {number} y
     */
    reveal(x, y) {
        if(this.array[y][x] === field.flag || this.array[y][x] === field.question_mark)
          this.array[y][x] !== field.visible;
        else
            this.array[y][x] = field.visible;
    }

    /**
     * TODO: IMPLEMENT THIS (DONE)
     * Toggles the field state, if it has not been revealed yet.
     * @param {number} x
     * @param {number} y
     */
    toggleFieldState(x, y) {
        if (this.array[y][x] === field.hidden)
            this.array[y][x] = field.flag;

        else if (this.array[y][x] === field.flag)
            this.array[y][x] = field.question_mark;

        else if ( this.array[y][x] === field.question_mark)
            this.array[y][x] = field.hidden;

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
     * TODO: IMPLEMENT THIS
     * Returns if the user clicked a bomb and therefore lost.
     * @returns {boolean}
     */
    didLoose() {
            return false;
    }

    /**
     * Returns the remaining amount bombs, user has to select
     * @return {number}
     */
    getRemainingBombCount() {
        return this.bombs;
    }
}


