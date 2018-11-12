import { SettingsLoader } from 'ts-common/settings-loader';
import { Cell, Row } from './entities/document';
import { Settings } from './entities/settings';
import { Ticket, TicketExtended } from './entities/ticket';
import { Messager } from './messager';

export class TicketToRowConverter {

    public async convert(ticket: Ticket): Promise<Row> {
        const ticketExt = new TicketExtended(ticket);
        const settings = await SettingsLoader.load(Settings);
        try {
            switch (ticket.tracker.name) {
                case 'Feature':
                    return this.convertFeature(ticketExt, settings);
                case 'Kundenfeedback':
                    return this.convertKundenfeedback(ticketExt, settings);
                case 'Karte':
                    return this.convertKarte(ticketExt, settings);
                case 'Misc':
                    return this.convertMisc(ticketExt, settings);
                default:
                    return this.convertUnknown(ticketExt, settings);
            }
        } catch (e) {
            // tslint:disable-next-line:max-line-length
            Messager.showMessage('Fehler', `Fehler beim Konvertieren des Tickets mit der ID ${ticket.id} in ein druckbares Format.\n"${e.message}"`);
            throw e;
        }
    }

    private convertFeature(ticket: TicketExtended, settings: Settings): Row {
        return new Row(
            new Cell(this.getOrBlank(() => ticket.subject), settings.centerFormatting),
            new Cell(this.getOrBlank(() => `Feature #${ticket.id}`), settings.topLeftFormatting),
            new Cell(this.getOrBlank(() => `Backlog-Nr: ${ticket.backlog_nr || '-'}`), settings.topRightFormatting),
            Cell.empty(),
            new Cell(this.getOrBlank(() => `${ticket.komplexitaetspunkte || '-'} KP`), settings.bottomRightFormatting)
        );
    }

    private convertKundenfeedback(ticket: TicketExtended, settings: Settings): Row {
        return new Row(
            new Cell(this.getOrBlank(() => ticket.subject), settings.centerFormatting),
            new Cell(this.getOrBlank(() => `Kundenfeedback #${ticket.id}`), settings.topLeftFormatting),
            new Cell(this.getOrBlank(() => `Backlog-Nr: ${ticket.backlog_nr || '-'}`), settings.topRightFormatting),
            new Cell(this.getOrBlank(() => `Priorität: ${ticket.priority.name}`), settings.bottomLeftFormatting),
            new Cell(this.getOrBlank(() => `${ticket.komplexitaetspunkte || '-'} KP`), settings.bottomRightFormatting)
        );
    }

    private convertKarte(ticket: TicketExtended, settings: Settings): Row {
        return new Row(
            new Cell(this.getOrBlank(() => ticket.subject), settings.centerFormatting),
            new Cell(this.getOrBlank(() => `Karte #${ticket.id}`), settings.topLeftFormatting),
            Cell.empty(),
            new Cell(this.getOrBlank(() => `Priorität: ${ticket.priority.name}`), settings.bottomLeftFormatting),
            new Cell(this.getOrElse(() => `Feature #${ticket.parent.id}`, 'Kein Feature'), settings.bottomRightFormatting)
        );
    }

    private convertMisc(ticket: TicketExtended, settings: Settings): Row {
        return new Row(
            new Cell(this.getOrBlank(() => ticket.subject), settings.centerFormatting),
            new Cell(this.getOrBlank(() => `Karte #${ticket.id}`), settings.topLeftFormatting),
            Cell.empty(),
            new Cell(this.getOrBlank(() => `Priorität: ${ticket.priority.name}`), settings.bottomLeftFormatting),
            Cell.empty()
        );
    }

    private convertUnknown(ticket: TicketExtended, settings: Settings): Row {
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
