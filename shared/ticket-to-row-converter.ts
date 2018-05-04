import { Cell, Row } from './model/document';
import { Ticket } from './model/ticket';
import { SettingsLoader } from './utils/settings-loader';

export class TicketToRowConverter {

    constructor(
        private settingsLoader: SettingsLoader) { }

    public async convert(ticket: Ticket): Promise<Row> {
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

    private async convertFeature(ticket: Ticket): Promise<Row> {
        const settings = await this.settingsLoader.load();
        return new Row(
            new Cell(ticket.subject, settings.centerFormatting),
            new Cell(`Feature #${ticket.id}`, settings.topLeftFormatting),
            new Cell(`Backlog-Nr: ${this.getCustomField(ticket, 'BacklogNr')}`, settings.topRightFormatting),
            Cell.empty(),
            new Cell(`${this.getCustomField(ticket, 'Komplexitätspunkte')} KP`, settings.bottomRightFormatting));
    }

    private async convertKundenfeedback(ticket: Ticket): Promise<Row> {
        const settings = await this.settingsLoader.load();
        return new Row(
            new Cell(ticket.subject, settings.centerFormatting),
            new Cell(`Feature #${ticket.id}`, settings.topLeftFormatting),
            new Cell(`Backlog-Nr: ${this.getCustomField(ticket, 'BacklogNr')}`, settings.topRightFormatting),
            new Cell(`Priorität ${ticket.priority.name}`, settings.bottomLeftFormatting),
            new Cell(`${this.getCustomField(ticket, 'Komplexitätspunkte')} KP`, settings.bottomRightFormatting));
    }

    private async convertKarte(ticket: Ticket): Promise<Row> {
        const settings = await this.settingsLoader.load();
        return new Row(
            new Cell(ticket.subject, settings.centerFormatting),
            new Cell(`Karte #${ticket.id}`, settings.topLeftFormatting),
            Cell.empty(),
            new Cell(`Priorität ${ticket.priority.name}`, settings.bottomLeftFormatting),
            new Cell(`Feature #${ticket.parent.id}`, settings.bottomRightFormatting));
    }

    private async convertMisc(ticket: Ticket): Promise<Row> {
        const settings = await this.settingsLoader.load();
        return new Row(
            new Cell(ticket.subject, settings.centerFormatting),
            new Cell(`Karte #${ticket.id}`, settings.topLeftFormatting),
            Cell.empty(),
            new Cell(`Priorität ${ticket.priority.name}`, settings.bottomLeftFormatting),
            Cell.empty());
    }

    private async convertUnknown(ticket: Ticket): Promise<Row> {
        const settings = await this.settingsLoader.load();
        return new Row(
            new Cell(ticket.subject, settings.centerFormatting),
            new Cell(`#${ticket.id}`, settings.topLeftFormatting),
            new Cell(`Tracker: ${ticket.tracker.name}`, settings.bottomLeftFormatting),
            Cell.empty(),
            Cell.empty());
    }

    private getCustomField(ticket: Ticket, fieldname: string): any {
        const backlogNrField = ticket.custom_fields.find(field => field.name === fieldname);
        return (backlogNrField != null) ? backlogNrField.value : '';
    }

}
