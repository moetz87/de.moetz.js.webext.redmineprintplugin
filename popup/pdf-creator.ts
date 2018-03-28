import * as jsPDF from 'jspdf';

export class PdfCreator {

    public createPdf(ticket: any): Blob {
        const doc = new jsPDF('p', 'pt', 'a4'); // orientation, unit, format
        doc.text(`${ticket.issue.id}`, 50, 50);
        return doc.output('blob');
    }

}
