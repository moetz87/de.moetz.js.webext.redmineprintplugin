import * as jsPDF from 'jspdf';
import { Ticket } from '../model/ticket';
import { Document, Row } from './document';

const DOC_HEIGHT = new jsPDF('p', 'pt', 'a4').internal.pageSize.height;
const DOC_WIDTH = new jsPDF('p', 'pt', 'a4').internal.pageSize.width;
const DOC_MARGIN = 10;

export class TicketPdfCreator {

    public createTicketPdf(ticketsPerPage: number, tickets: Ticket[]): Blob {
        const doc = new Document(DOC_WIDTH, DOC_HEIGHT, DOC_MARGIN, 3, 12, 16);
        tickets.map(this.ticketToRow).forEach(row => doc.addRow(row));
        return doc.create().output('blob');
    }

    private ticketToRow(ticket: Ticket): Row {
        return new Row('center', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight');
    }

}
