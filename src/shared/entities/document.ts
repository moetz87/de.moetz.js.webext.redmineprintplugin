import { Formatting } from './formatting';

const DEFAULT_FORMATTING = new Formatting(16, false);
const DEFAULT_FORMATTING_LARGE = new Formatting(22, false);

export class Document {

    constructor(
        readonly rows: Row[],
        readonly rowsPerPage: number,
        readonly width: number,
        readonly height: number,
        readonly margin: number
    ) {
    }

}

export class Row {

    constructor(
        readonly center: Cell,
        readonly topLeft: Cell,
        readonly topRight: Cell,
        readonly bottomLeft: Cell,
        readonly bottomRight: Cell) {
    }

}

export class Cell {

    constructor(
        readonly text: string,
        readonly formatting: Formatting) {
    }

    public static empty(): Cell {
        return new Cell('', DEFAULT_FORMATTING);
    }

    public static normal(text: string): Cell {
        return new Cell(text, DEFAULT_FORMATTING);
    }

    public static large(text: string): Cell {
        return new Cell(text, DEFAULT_FORMATTING_LARGE);
    }

}
