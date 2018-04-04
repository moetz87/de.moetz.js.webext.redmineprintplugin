import * as jsPDF from 'jspdf';

export class Document {

    private rows: Row[] = [];
    private heightRow: number;
    private heightRowHalf: number;

    constructor(
        private width: number,
        private height: number,
        private margin: number,
        private rowsPerPage: number,
        private fontSize: number,
        private fontSizeLarge: number
    ) {
        this.heightRow = (this.height / this.rowsPerPage);
        this.heightRowHalf = (this.heightRow / 2);
    }

    public addRow(row: Row): Document {
        this.rows.push(row);
        return this;
    }

    public create(): jsPDF {
        const doc = new jsPDF('p', 'pt', 'a4'); // orientation, unit, format
        this.rows.forEach((row, rowNumber) => {
            // top
            doc.setFontSize(this.fontSize);
            doc.text(row.topLeft, this.calcLeft(), this.calcTop(rowNumber));
            doc.text(row.topRight, this.calcRight(), this.calcTop(rowNumber), 'right');
            // bottom
            doc.text(row.bottomLeft, this.calcLeft(), this.calcBottom(rowNumber));
            doc.text(row.bottomRight, this.calcRight(), this.calcBottom(rowNumber), 'right');
            // center
            doc.setFontSize(this.fontSizeLarge);
            doc.text(row.center, this.calcCenter(), this.calcMiddle(rowNumber), 'center');
        });
        return doc;
    }

    private calcTop(rowPos: number): number {
        return (rowPos * this.heightRow) + this.margin + this.fontSize;
    }

    private calcMiddle(rowPos: number): number {
        return (rowPos * this.heightRow) + this.heightRowHalf;
    }

    private calcBottom(rowPos: number): number {
        return ((rowPos + 1) * this.heightRow) - this.margin;
    }

    private calcLeft(): number {
        return this.margin;
    }

    private calcCenter(): number {
        return (this.width / 2);
    }

    private calcRight(): number {
        return (this.width - this.margin);
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
