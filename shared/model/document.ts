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
        readonly center: string,
        readonly topLeft: string,
        readonly topRight: string,
        readonly bottomLeft: string,
        readonly bottomRight: string) { }

}
