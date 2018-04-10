import * as jquery from 'jquery';
import { PdfCreator } from '../shared/pdf-creator';
import { RedmineRequester } from '../shared/redmine-requester';
import { TicketPrinter } from '../shared/ticket-printer';
import { TicketToRowConverter } from '../shared/ticket-to-row-converter';
import { UrlUtils } from '../shared/url-utils';

const SELECTOR_TR_KARTE = 'tr:has(td.tracker:contains("Karte"))';
const SELECTOR_TR_FEATURE = 'tr:has(td.tracker:contains("Feature"))';
const SELECTOR_TR_SELECTED = 'tr.context-menu-selection';
const URL_PATTERN = '.*(\\/projects).*(\\/issues).*';

class Main {

    constructor(
        private ticketPrinter: TicketPrinter,
        private urlUtils: UrlUtils) { }

    public async main() {
        if (!this.urlUtils.currentUrlMatchesRegex(URL_PATTERN)) {
            console.log(`URL ${this.urlUtils.getCurrentUrl()} not matching pattern ${URL_PATTERN}.`);
            console.log('Not including print-buttons.');
            return;
        } else {
            console.log(`URL ${this.urlUtils.getCurrentUrl()} matching pattern ${URL_PATTERN}.`);
            console.log('Including print-buttons.');
        }

        // append header
        const header = jquery('<h3>Drucken</h3>');
        jquery('#sidebar').append(header);
        // append print all tickets
        const allTicketsIds = () => this.findIds(SELECTOR_TR_KARTE);
        const printAllTicketsBtn = this.createPrintButton('Alle Karten', allTicketsIds);
        jquery('#sidebar').append(printAllTicketsBtn);
        // append print all features
        const allFeatureIds = () => this.findIds(SELECTOR_TR_FEATURE);
        const printAllFeaturesBtn = this.createPrintButton('Alle Features', allFeatureIds);
        jquery('#sidebar').append(printAllFeaturesBtn);
        // append print selected
        const allSelectedIds = () => this.findIds(SELECTOR_TR_SELECTED);
        const printAllSelectedBtn = this.createPrintButton('Ausgewählte', allSelectedIds);
        jquery('#sidebar').append(printAllSelectedBtn);
    }

    private findIds(selector: string): number[] {
        const ids: number[] = [];
        jquery(selector).find('td.id > a').each((i, e) => {
            const a = jquery(e);
            const id = parseInt(a.text(), 10);
            ids.push(id);
        });
        return ids;
    }

    private createPrintButton(caption: string, ids: () => number[]): HTMLAnchorElement {
        const button = document.createElement('a');
        button.innerText = caption;
        button.style.display = 'block';
        button.style.cursor = 'pointer';
        button.onclick = () => this.ticketPrinter.printTickets(ids());
        return button;
    }

}

jquery(document).ready(() => {
    new Main(
        new TicketPrinter(
            new RedmineRequester(),
            new TicketToRowConverter(),
            new PdfCreator()
        ),
        new UrlUtils()
    ).main();
});
