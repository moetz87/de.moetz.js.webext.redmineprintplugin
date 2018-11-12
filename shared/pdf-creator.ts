import * as jsPDF from 'jspdf';
import { Cell, Document, Row } from './entities/document';

export class PdfCreator {

    // return doc.create().output('blob');

    public create(doc: Document): jsPDF {
        const pdf = new jsPDF('p', 'pt', 'a4'); // orientation, unit, format
        doc.rows.forEach((row: Row, rowNumber) => {
            const rowOnPage = rowNumber % doc.rowsPerPage;
            // top
            this.setFontOptions(pdf, row.topLeft);
            pdf.text(row.topLeft.text, this.calcLeft(doc), this.calcTop(doc, row.topLeft.formatting.fontSize, rowOnPage));
            this.setFontOptions(pdf, row.topRight);
            pdf.text(row.topRight.text, this.calcRight(doc), this.calcTop(doc, row.topRight.formatting.fontSize, rowOnPage), 'right');
            // bottom
            this.setFontOptions(pdf, row.bottomLeft);
            pdf.text(row.bottomLeft.text, this.calcLeft(doc), this.calcBottom(doc, rowOnPage));
            this.setFontOptions(pdf, row.bottomRight);
            pdf.text(row.bottomRight.text, this.calcRight(doc), this.calcBottom(doc, rowOnPage), 'right');
            // center
            this.setFontOptions(pdf, row.center);
            const center = pdf.splitTextToSize(row.center.text, doc.width);
            pdf.text(center, this.calcCenter(doc), this.calcMiddle(doc, rowOnPage), 'center');
            // end
            this.drawLineOrCreateNewPage(doc, pdf, rowNumber);
        });
        return pdf;
    }

    private setFontOptions(pdf: jsPDF, cell: Cell) {
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(cell.formatting.fontSize);
        if (cell.formatting.fontBold) {
            pdf.setFontType('bold');
        } else {
            pdf.setFontType('normal');
        }
    }

    private drawLineOrCreateNewPage(doc: Document, pdf: jsPDF, rowNumber: number) {
        const rowOnPage = (rowNumber % doc.rowsPerPage) + 1;
        if (rowOnPage === doc.rowsPerPage) {
            if (rowNumber + 1 !== doc.rows.length) {
                pdf.addPage();
            }
        } else {
            const y = (doc.height / doc.rowsPerPage) * rowOnPage;
            pdf.line(0, y, doc.width, y);
        }
    }

    private calcTop(doc: Document, fontSize: number, rowPos: number): number {
        const heightRow = doc.height / doc.rowsPerPage;
        return (rowPos * heightRow) + doc.margin + fontSize;
    }

    private calcMiddle(doc: Document, rowPos: number): number {
        const heightRow = doc.height / doc.rowsPerPage;
        return (rowPos * heightRow) + (heightRow / 2);
    }

    private calcBottom(doc: Document, rowPos: number): number {
        const heightRow = doc.height / doc.rowsPerPage;
        return ((rowPos + 1) * heightRow) - doc.margin;
    }

    private calcLeft(doc: Document): number {
        return doc.margin;
    }

    private calcCenter(doc: Document): number {
        return (doc.width / 2);
    }

    private calcRight(doc: Document): number {
        return (doc.width - doc.margin);
    }

}
