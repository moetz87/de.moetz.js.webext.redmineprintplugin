export class Document {

    public readonly rows: Row[] = [];

    constructor(
        readonly rowsPerPage: number,
        readonly width: number,
        readonly height: number,
        readonly margin: number,
        readonly fontSize: number,
        readonly fontSizeLarge: number
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
        readonly fontSize?: number,
        readonly fontBold?: boolean) { }

    public static empty(): Cell {
        return new Cell('', 14, false);
    }

    public static plain(text: string): Cell {
        return new Cell(text, 14, false);
    }

}
