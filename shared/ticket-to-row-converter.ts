import { SettingsLoader } from 'ts-common/settings-loader';
import { Cell, Row } from './model/document';
import { Settings } from './model/settings';
import { Ticket, TicketExtended } from './model/ticket';

export class TicketToRowConverter {

    public async convert(ticket: Ticket): Promise<Row> {
        const ticketExt = new TicketExtended(ticket);
        switch (ticket.tracker.name) {
            case 'Feature':
                return this.convertFeature(ticketExt);
            case 'Kundenfeedback':
                return this.convertKundenfeedback(ticketExt);
            case 'Karte':
                return this.convertKarte(ticketExt);
            case 'Misc':
                return this.convertMisc(ticketExt);
            default:
                return this.convertUnknown(ticketExt);
        }
    }

    private async convertFeature(ticket: TicketExtended): Promise<Row> {
        const settings = await SettingsLoader.load(Settings);
        return new Row(
            new Cell(this.getOrBlank(() => ticket.subject), settings.centerFormatting),
            new Cell(this.getOrBlank(() => `Feature #${ticket.id}`), settings.topLeftFormatting),
            new Cell(this.getOrBlank(() => `Backlog-Nr: ${ticket.backlog_nr}`), settings.topRightFormatting),
            Cell.empty(),
            new Cell(this.getOrBlank(() => `${ticket.komplexitaetspunkte} KP`), settings.bottomRightFormatting)
        );
    }

    private async convertKundenfeedback(ticket: TicketExtended): Promise<Row> {
        const settings = await SettingsLoader.load(Settings);
        return new Row(
            new Cell(this.getOrBlank(() => ticket.subject), settings.centerFormatting),
            new Cell(this.getOrBlank(() => `Feature #${ticket.id}`), settings.topLeftFormatting),
            new Cell(this.getOrBlank(() => `Backlog-Nr: ${ticket.backlog_nr}`), settings.topRightFormatting),
            new Cell(this.getOrBlank(() => `Priorität ${ticket.priority.name}`), settings.bottomLeftFormatting),
            new Cell(this.getOrBlank(() => `${ticket.komplexitaetspunkte} KP`), settings.bottomRightFormatting)
        );
    }

    private async convertKarte(ticket: TicketExtended): Promise<Row> {
        const settings = await SettingsLoader.load(Settings);
        return new Row(
            new Cell(this.getOrBlank(() => ticket.subject), settings.centerFormatting),
            new Cell(this.getOrBlank(() => `Karte #${ticket.id}`), settings.topLeftFormatting),
            Cell.empty(),
            new Cell(this.getOrBlank(() => `Priorität ${ticket.priority.name}`), settings.bottomLeftFormatting),
            new Cell(this.getOrBlank(() => `Feature #${ticket.parent.id}`), settings.bottomRightFormatting)
        );
    }

    private async convertMisc(ticket: TicketExtended): Promise<Row> {
        const settings = await SettingsLoader.load(Settings);
        return new Row(
            new Cell(this.getOrBlank(() => ticket.subject), settings.centerFormatting),
            new Cell(this.getOrBlank(() => `Karte #${ticket.id}`), settings.topLeftFormatting),
            Cell.empty(),
            new Cell(this.getOrBlank(() => `Priorität ${ticket.priority.name}`), settings.bottomLeftFormatting),
            Cell.empty()
        );
    }

    private async convertUnknown(ticket: TicketExtended): Promise<Row> {
        const settings = await SettingsLoader.load(Settings);
        return new Row(
            new Cell(this.getOrBlank(() => ticket.subject), settings.centerFormatting),
            new Cell(this.getOrBlank(() => `#${ticket.id}`), settings.topLeftFormatting),
            new Cell(this.getOrBlank(() => `Tracker: ${ticket.tracker.name}`), settings.bottomLeftFormatting),
            Cell.empty(),
            Cell.empty()
        );
    }

    private getOrElse(val: () => any, alternative: any): any {
        try {
            return val();
        } catch (e) {
            return alternative;
        }
    }

    private getOrBlank(val: () => any): any {
        return this.getOrElse(val, '');
    }

}
