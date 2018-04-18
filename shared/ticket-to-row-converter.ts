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
            Cell.large(ticket.subject),
            Cell.normal(`Feature #${ticket.id}`),
            Cell.normal(`Backlog-Nr: ${this.getCustomField(ticket, 'BacklogNr')}`),
            Cell.empty(),
            Cell.normal(`${this.getCustomField(ticket, 'Komplexitätspunkte')} KP`));
    }

    private convertKundenfeedback(ticket: Ticket): Row {
        return new Row(
            Cell.large(ticket.subject),
            Cell.normal(`Feature #${ticket.id}`),
            Cell.normal(`Backlog-Nr: ${this.getCustomField(ticket, 'BacklogNr')}`),
            Cell.normal(`Priorität ${ticket.priority.name}`),
            Cell.normal(`${this.getCustomField(ticket, 'Komplexitätspunkte')} KP`));
    }

    private convertKarte(ticket: Ticket): Row {
        return new Row(
            Cell.large(ticket.subject),
            Cell.normal(`Karte #${ticket.id}`),
            Cell.empty(),
            Cell.normal(`Priorität ${ticket.priority.name}`),
            Cell.normal(`Feature #${ticket.parent.id}`));
    }

    private convertMisc(ticket: Ticket): Row {
        return new Row(
            Cell.large(ticket.subject),
            Cell.normal(`Karte #${ticket.id}`),
            Cell.empty(),
            Cell.normal(`Priorität ${ticket.priority.name}`),
            Cell.empty());
    }

    private convertUnknown(ticket: Ticket): Row {
        return new Row(
            Cell.large(ticket.subject),
            Cell.normal(`#${ticket.id}`),
            Cell.normal(`Tracker: ${ticket.tracker.name}`),
            Cell.empty(),
            Cell.empty());
    }

    private getCustomField(ticket: Ticket, fieldname: string): any {
        const backlogNrField = ticket.custom_fields.find(field => field.name === fieldname);
        return (backlogNrField != null) ? backlogNrField.value : '';
    }

}