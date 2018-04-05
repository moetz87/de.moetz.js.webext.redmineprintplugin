import { Ticket } from '../model/ticket';
import { Document, Row } from './document';

const DOC_HEIGHT = 841.89;
const DOC_WIDTH = 595.28;
const DOC_MARGIN = 10;
const FONT_SIZE = 12;
const FONT_SIZE_LARGE = 16;

export class TicketPdf {

    private tickets: Ticket[] = [];

    constructor(
        readonly ticketsPerPage: number) { }

    public addTicket(ticket: Ticket): TicketPdf {
        this.tickets.push(ticket);
        return this;
    }

    public create(): Blob {
        const doc = new Document(this.ticketsPerPage, DOC_WIDTH, DOC_HEIGHT, DOC_MARGIN, FONT_SIZE, FONT_SIZE_LARGE);
        this.tickets.map(ticket => this.ticketToRow(ticket)).forEach(row => doc.addRow(row));
        return doc.create().output('blob');
    }

    private ticketToRow(ticket: Ticket): Row {
        console.log(`Ticket has ${ticket.tracker.name} Type`);
        switch (ticket.tracker.name) {
            case 'Feature':
                return new Row(
                    ticket.subject,
                    `Feature #${ticket.id}`,
                    `Backlog-Nr: ${this.getCustomField(ticket, 'BacklogNr')}`,
                    '',
                    `${this.getCustomField(ticket, 'Komplexitätspunkte')} KP`);
            case 'Kundenfeedback':
                return new Row(
                    ticket.subject,
                    `Feature #${ticket.id}`,
                    `Backlog-Nr: ${this.getCustomField(ticket, 'BacklogNr')}`,
                    `Priorität ${ticket.priority.name}`,
                    `${this.getCustomField(ticket, 'Komplexitätspunkte')} KP`);
            case 'Karte':
            case 'Misc':
                return new Row(
                    ticket.subject,
                    `Karte #${ticket.id}`,
                    '',
                    `Priorität ${ticket.priority.name}`,
                    `Feature #${ticket.parent.id}`);
            default:
                throw new Error(`Tracker ${ticket.tracker.name} not known!`);
        }
    }

    private getCustomField(ticket: Ticket, fieldname: string): any {
        const backlogNrField = ticket.custom_fields.find(field => field.name === fieldname);
        return backlogNrField!!.value;
    }

}
