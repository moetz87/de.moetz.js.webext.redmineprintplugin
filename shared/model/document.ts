const DEFAULT_FONT_SIZE = 16;
const DEFAULT_FONT_SIZE_LARGE = 22;

export class Document {

    public readonly rows: Row[] = [];

    constructor(
        readonly rowsPerPage: number,
        readonly width: number,
        readonly height: number,
        readonly margin: number
    ) { }

    public addRow(row: Row): Document {
        this.rows.push(row);
        return this;
    }

}

export class Row {

    constructor(
        readonly center: Cell,
        readonly topLeft: Cell,
        readonly topRight: Cell,
        readonly bottomLeft: Cell,
        readonly bottomRight: Cell) { }

}

export class Cell {

    constructor(
        readonly text: string,
        readonly fontSize: number,
        readonly fontBold: boolean) { }

    public static empty(): Cell {
        return new Cell('', DEFAULT_FONT_SIZE, false);
    }

    public static normal(text: string): Cell {
        return new Cell(text, DEFAULT_FONT_SIZE, false);
    }

    public static large(text: string): Cell {
        return new Cell(text, DEFAULT_FONT_SIZE_LARGE, false);
    }

}
