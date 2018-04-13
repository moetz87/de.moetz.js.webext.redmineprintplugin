import { Row } from './model/document';
import { Ticket } from './model/ticket';

export class TicketToRowConverter {

    public convert(ticket: Ticket): Row {
        console.log(`Ticket has ${ticket.tracker.name} Type`);
        switch (ticket.tracker.name) {
            case 'Feature':
                return this.convertFeature(ticket);
            case 'Kundenfeedback':
                return this.convertKundenfeedback(ticket);
            case 'Karte':
                return this.convertKarte(ticket);
            case 'Misc':
                return this.convertMisc(ticket);
            default:
            return this.convertUnknown(ticket);
        }
    }

    private convertFeature(ticket: Ticket): Row {
        return new Row(
            ticket.subject,
            `Feature #${ticket.id}`,
            `Backlog-Nr: ${this.getCustomField(ticket, 'BacklogNr')}`,
            '',
            `${this.getCustomField(ticket, 'Komplexitätspunkte')} KP`);
    }

    private convertKundenfeedback(ticket: Ticket): Row {
        return new Row(
            ticket.subject,
            `Feature #${ticket.id}`,
            `Backlog-Nr: ${this.getCustomField(ticket, 'BacklogNr')}`,
            `Priorität ${ticket.priority.name}`,
            `${this.getCustomField(ticket, 'Komplexitätspunkte')} KP`);
    }

    private convertKarte(ticket: Ticket): Row {
        return new Row(
            ticket.subject,
            `Karte #${ticket.id}`,
            '',
            `Priorität ${ticket.priority.name}`,
            `Feature #${ticket.parent.id}`);
    }

    private convertMisc(ticket: Ticket): Row {
        return new Row(
            ticket.subject,
            `Karte #${ticket.id}`,
            '',
            `Priorität ${ticket.priority.name}`,
            '');
    }

    private convertUnknown(ticket: Ticket): Row {
        return new Row(
            ticket.subject,
            `#${ticket.id}`,
            `Tracker: ${ticket.tracker.name}`,
            '',
            '');
    }

    private getCustomField(ticket: Ticket, fieldname: string): any {
        const backlogNrField = ticket.custom_fields.find(field => field.name === fieldname);
        return (backlogNrField != null) ? backlogNrField.value : '';
    }

}