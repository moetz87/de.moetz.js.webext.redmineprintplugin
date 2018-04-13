import { Cell, Row } from './model/document';
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
            Cell.plain(ticket.subject),
            Cell.plain(`Feature #${ticket.id}`),
            Cell.plain(`Backlog-Nr: ${this.getCustomField(ticket, 'BacklogNr')}`),
            Cell.empty(),
            Cell.plain(`${this.getCustomField(ticket, 'Komplexitätspunkte')} KP`));
    }

    private convertKundenfeedback(ticket: Ticket): Row {
        return new Row(
            Cell.plain(ticket.subject),
            Cell.plain(`Feature #${ticket.id}`),
            Cell.plain(`Backlog-Nr: ${this.getCustomField(ticket, 'BacklogNr')}`),
            Cell.plain(`Priorität ${ticket.priority.name}`),
            Cell.plain(`${this.getCustomField(ticket, 'Komplexitätspunkte')} KP`));
    }

    private convertKarte(ticket: Ticket): Row {
        return new Row(
            Cell.plain(ticket.subject),
            Cell.plain(`Karte #${ticket.id}`),
            Cell.empty(),
            Cell.plain(`Priorität ${ticket.priority.name}`),
            Cell.plain(`Feature #${ticket.parent.id}`));
    }

    private convertMisc(ticket: Ticket): Row {
        return new Row(
            Cell.plain(ticket.subject),
            Cell.plain(`Karte #${ticket.id}`),
            Cell.empty(),
            Cell.plain(`Priorität ${ticket.priority.name}`),
            Cell.empty());
    }

    private convertUnknown(ticket: Ticket): Row {
        return new Row(
            Cell.plain(ticket.subject),
            Cell.plain(`#${ticket.id}`),
            Cell.plain(`Tracker: ${ticket.tracker.name}`),
            Cell.empty(),
            Cell.empty());
    }

    private getCustomField(ticket: Ticket, fieldname: string): any {
        const backlogNrField = ticket.custom_fields.find(field => field.name === fieldname);
        return (backlogNrField != null) ? backlogNrField.value : '';
    }

}