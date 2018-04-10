import * as jsPDF from 'jspdf';
import { Document } from './model/document';

export class PdfCreator {

    // return doc.create().output('blob');

    public create(doc: Document): jsPDF {
        const pdf = new jsPDF('p', 'pt', 'a4'); // orientation, unit, format
        doc.rows.forEach((row, rowNumber) => {
            const rowOnPage = rowNumber % doc.rowsPerPage;
            // general
            pdf.setTextColor(0, 0, 0);
            pdf.setFontSize(doc.fontSize);
            pdf.setFontType('normal');
            // top
            pdf.text(row.topLeft, this.calcLeft(doc), this.calcTop(doc, rowOnPage));
            pdf.text(row.topRight, this.calcRight(doc), this.calcTop(doc, rowOnPage), 'right');
            // bottom
            pdf.text(row.bottomLeft, this.calcLeft(doc), this.calcBottom(doc, rowOnPage));
            pdf.text(row.bottomRight, this.calcRight(doc), this.calcBottom(doc, rowOnPage), 'right');
            // center
            pdf.setFontSize(doc.fontSizeLarge);
            const center = pdf.splitTextToSize(row.center, doc.width);
            pdf.text(center, this.calcCenter(doc), this.calcMiddle(doc, rowOnPage), 'center');
            // end
            this.drawLineOrCreateNewPage(doc, pdf, rowNumber);
        });
        return pdf;
    }

    private drawLineOrCreateNewPage(doc: Document, pdf: jsPDF, rowNumber: number) {
        const rowOnPage = (rowNumber % doc.rowsPerPage) + 1;
        if (rowOnPage === doc.rowsPerPage) {
            if (rowNumber + 1 !== doc.rows.length) {
                console.log('page is full. add page.');
                pdf.addPage();
            } else {
                console.log('page if full, but last row. not adding page.');
            }
        } else {
            console.log('page is not full. draw line.');
            const y = (doc.height / doc.rowsPerPage) * rowOnPage;
            pdf.line(0, y, doc.width, y);
        }
    }

    private calcTop(doc: Document, rowPos: number): number {
        const heightRow = doc.height / doc.rowsPerPage;
        return (rowPos * heightRow) + doc.margin + doc.fontSize;
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
