import * as jsPDF from 'jspdf';

export class Document {

    private rows: Row[] = [];
    private heightRow: number;
    private heightRowHalf: number;

    constructor(
        private rowsPerPage: number,
        private width: number,
        private height: number,
        private margin: number,
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
            const rowOnPage = rowNumber % this.rowsPerPage;
            // general
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(this.fontSize);
            doc.setFontType('normal');
            // top
            doc.text(row.topLeft, this.calcLeft(), this.calcTop(rowOnPage));
            doc.text(row.topRight, this.calcRight(), this.calcTop(rowOnPage), 'right');
            // bottom
            doc.text(row.bottomLeft, this.calcLeft(), this.calcBottom(rowOnPage));
            doc.text(row.bottomRight, this.calcRight(), this.calcBottom(rowOnPage), 'right');
            // center
            doc.setFontSize(this.fontSizeLarge);
            const center = doc.splitTextToSize(row.center, this.width);
            doc.text(center, this.calcCenter(), this.calcMiddle(rowOnPage), 'center');
            // end
            this.drawLineOrCreateNewPage(doc, rowNumber);
        });
        return doc;
    }

    private drawLineOrCreateNewPage(document: jsPDF, rowNumber: number) {
        const rowOnPage = (rowNumber % this.rowsPerPage) + 1;
        if (rowOnPage === this.rowsPerPage) {
            if (rowNumber + 1 !== this.rows.length) {
                console.log('page is full. add page.');
                document.addPage();
            } else {
                console.log('page if full, but last row. not adding page.');
            }
        } else {
            console.log('page is not full. draw line.');
            const y = (this.height / this.rowsPerPage) * rowOnPage;
            document.line(0, y, this.width, y);
        }
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
