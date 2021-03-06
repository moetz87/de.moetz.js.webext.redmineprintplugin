import * as jsPDF from 'jspdf';
import { Cell, Document, Row } from './entities/document';

// return doc.create().output('blob');

export module PdfCreator {

    export function create(doc: Document): jsPDF {
        const pdf = new jsPDF('p', 'pt', 'a4'); // orientation, unit, format
        doc.rows.forEach((row: Row, rowNumber) => {
            const rowOnPage = rowNumber % doc.rowsPerPage;
            // top
            setFontOptions(pdf, row.topLeft);
            pdf.text(row.topLeft.text, calcLeft(doc), calcTop(doc, row.topLeft.formatting.fontSize, rowOnPage));
            setFontOptions(pdf, row.topRight);
            pdf.text(row.topRight.text, calcRight(doc), calcTop(doc, row.topRight.formatting.fontSize, rowOnPage), 'right');
            // bottom
            setFontOptions(pdf, row.bottomLeft);
            pdf.text(row.bottomLeft.text, calcLeft(doc), calcBottom(doc, rowOnPage));
            setFontOptions(pdf, row.bottomRight);
            pdf.text(row.bottomRight.text, calcRight(doc), calcBottom(doc, rowOnPage), 'right');
            // center
            setFontOptions(pdf, row.center);
            const center = pdf.splitTextToSize(row.center.text, doc.width - doc.margin);
            pdf.text(center, calcCenter(doc), calcMiddle(doc, rowOnPage), 'center');
            // end
            drawLineOrCreateNewPage(doc, pdf, rowNumber);
        });
        return pdf;
    }

    function setFontOptions(pdf: jsPDF, cell: Cell) {
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(cell.formatting.fontSize);
        if (cell.formatting.fontBold) {
            pdf.setFontType('bold');
        } else {
            pdf.setFontType('normal');
        }
    }

    function drawLineOrCreateNewPage(doc: Document, pdf: jsPDF, rowNumber: number) {
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

    function calcTop(doc: Document, fontSize: number, rowPos: number): number {
        const heightRow = doc.height / doc.rowsPerPage;
        return (rowPos * heightRow) + doc.margin + fontSize;
    }

    function calcMiddle(doc: Document, rowPos: number): number {
        const heightRow = doc.height / doc.rowsPerPage;
        return (rowPos * heightRow) + (heightRow / 2);
    }

    function calcBottom(doc: Document, rowPos: number): number {
        const heightRow = doc.height / doc.rowsPerPage;
        return ((rowPos + 1) * heightRow) - doc.margin;
    }

    function calcLeft(doc: Document): number {
        return doc.margin;
    }

    function calcCenter(doc: Document): number {
        return (doc.width / 2);
    }

    function calcRight(doc: Document): number {
        return (doc.width - doc.margin);
    }

}
