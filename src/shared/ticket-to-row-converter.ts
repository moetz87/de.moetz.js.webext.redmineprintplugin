import { Cell, Row } from './entities/document';
import { Settings } from './entities/settings';
import { Ticket, TicketExtended } from './entities/ticket';
import { Messager } from './messager';
import { SettingsLoader } from './utils/settings-loader';

export module TicketToRowConverter {

    export async function convert(ticket: Ticket): Promise<Row> {
        const ticketExt = new TicketExtended(ticket);
        const settings = await SettingsLoader.load(Settings);
        try {
            switch (ticket.tracker.name) {
                case 'Feature':
                    return convertFeature(ticketExt, settings);
                case 'Kundenfeedback':
                    return convertKundenfeedback(ticketExt, settings);
                case 'Karte':
                    return convertKarte(ticketExt, settings);
                case 'Misc':
                    return convertMisc(ticketExt, settings);
                default:
                    return convertUnknown(ticketExt, settings);
            }
        } catch (e) {
            // tslint:disable-next-line:max-line-length
            Messager.showMessage('Fehler', `Fehler beim Konvertieren des Tickets mit der ID ${ticket.id} in ein druckbares Format.\n"${e.message}"`);
            throw e;
        }
    }

    function convertFeature(ticket: TicketExtended, settings: Settings): Row {
        return new Row(
            new Cell(getOrBlank(() => ticket.subject), settings.centerFormatting),
            new Cell(getOrBlank(() => `Feature #${ticket.id}`), settings.topLeftFormatting),
            new Cell(getOrBlank(() => `Backlog-Nr: ${ticket.backlog_nr || '-'}`), settings.topRightFormatting),
            Cell.empty(),
            new Cell(getOrBlank(() => `${ticket.komplexitaetspunkte || '-'} KP`), settings.bottomRightFormatting)
        );
    }

    function convertKundenfeedback(ticket: TicketExtended, settings: Settings): Row {
        return new Row(
            new Cell(getOrBlank(() => ticket.subject), settings.centerFormatting),
            new Cell(getOrBlank(() => `Kundenfeedback #${ticket.id}`), settings.topLeftFormatting),
            new Cell(getOrBlank(() => `Backlog-Nr: ${ticket.backlog_nr || '-'}`), settings.topRightFormatting),
            new Cell(getOrBlank(() => `Priorität: ${ticket.priority.name}`), settings.bottomLeftFormatting),
            new Cell(getOrBlank(() => `${ticket.komplexitaetspunkte || '-'} KP`), settings.bottomRightFormatting)
        );
    }

    function convertKarte(ticket: TicketExtended, settings: Settings): Row {
        return new Row(
            new Cell(getOrBlank(() => ticket.subject), settings.centerFormatting),
            new Cell(getOrBlank(() => `Karte #${ticket.id}`), settings.topLeftFormatting),
            new Cell(getOrBlank(() => `Backlog-Nr: ${ticket.backlog_nr || '-'}`), settings.topRightFormatting),
            new Cell(getOrBlank(() => `Priorität: ${ticket.priority.name}`), settings.bottomLeftFormatting),
            new Cell(getOrElse(() => `Feature #${ticket.parent.id}`, 'Kein Feature'), settings.bottomRightFormatting)
        );
    }

    function convertMisc(ticket: TicketExtended, settings: Settings): Row {
        return new Row(
            new Cell(getOrBlank(() => ticket.subject), settings.centerFormatting),
            new Cell(getOrBlank(() => `Misc #${ticket.id}`), settings.topLeftFormatting),
            new Cell(getOrBlank(() => `Backlog-Nr: ${ticket.backlog_nr || '-'}`), settings.topRightFormatting),
            new Cell(getOrBlank(() => `Priorität: ${ticket.priority.name}`), settings.bottomLeftFormatting),
            Cell.empty()
        );
    }

    function convertUnknown(ticket: TicketExtended, settings: Settings): Row {
        return new Row(
            new Cell(getOrBlank(() => ticket.subject), settings.centerFormatting),
            new Cell(getOrBlank(() => `#${ticket.id}`), settings.topLeftFormatting),
            new Cell(getOrBlank(() => `Tracker: ${ticket.tracker.name}`), settings.bottomLeftFormatting),
            Cell.empty(),
            Cell.empty()
        );
    }

    function getOrElse(val: () => any, alternative: any): any {
        try {
            return val();
        } catch (e) {
            return alternative;
        }
    }

    function getOrBlank(val: () => any): any {
        return getOrElse(val, '');
    }

}
