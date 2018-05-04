import * as jquery from 'jquery';
import { AbstractMain } from '../shared/abstract-main';
import { PdfCreator } from '../shared/pdf-creator';
import { RedmineRequester } from '../shared/redmine-requester';
import { TicketPrinter } from '../shared/ticket-printer';
import { TicketToRowConverter } from '../shared/ticket-to-row-converter';
import { SettingsLoader } from '../shared/utils/settings-loader';
import { UrlUtils } from '../shared/utils/url-utils';

const SELECTOR_TR_KARTE = 'tr:has(td.tracker:contains("Karte"))';
const SELECTOR_TR_FEATURE = 'tr:has(td.tracker:contains("Feature"))';
const SELECTOR_TR_SELECTED = 'tr.context-menu-selection';
const URL_PATTERN_OVERVIEW = '.*(\\/projects).*(\\/issues).*';
const URL_PATTERN_DETAILEDVIEW = '.*(\\/issues).*';

class Main extends AbstractMain {

    constructor(
        private ticketPrinter: TicketPrinter,
        private urlUtils: UrlUtils) {
        super();
    }

    public async onExecuteMain() {
        if (this.urlUtils.currentUrlMatchesRegex(URL_PATTERN_OVERVIEW)) {
            console.log(`URL ${this.urlUtils.getCurrentUrl()} matching pattern ${URL_PATTERN_OVERVIEW}.`);
            console.log('Including print-buttons.');
            this.addButtonsOnOverview();
        } else if (this.urlUtils.currentUrlMatchesRegex(URL_PATTERN_DETAILEDVIEW)) {
            console.log(`URL ${this.urlUtils.getCurrentUrl()} matching pattern ${URL_PATTERN_DETAILEDVIEW}.`);
            console.log('Including print-buttons.');
            this.addButtonsOnDetailedView();
        } else {
            console.log(`URL ${this.urlUtils.getCurrentUrl()} not matching pattern ${URL_PATTERN_OVERVIEW}.`);
            console.log(`URL ${this.urlUtils.getCurrentUrl()} not matching pattern ${URL_PATTERN_DETAILEDVIEW}.`);
            console.log('Not including print-buttons.');
        }

    }

    private async addButtonsOnOverview() {
        // append header
        const header = jquery('<h3>Drucken</h3>');
        jquery('#sidebar').append(header);
        // append 'print all tickets'
        const allTicketsIds = () => this.findIdsInOverview(SELECTOR_TR_KARTE);
        const printAllTicketsBtn = this.createPrintButton('Alle Karten', allTicketsIds);
        jquery('#sidebar').append(printAllTicketsBtn);
        // append 'print all features'
        const allFeatureIds = () => this.findIdsInOverview(SELECTOR_TR_FEATURE);
        const printAllFeaturesBtn = this.createPrintButton('Alle Features', allFeatureIds);
        jquery('#sidebar').append(printAllFeaturesBtn);
        // append 'print selected'
        const allSelectedIds = () => this.findIdsInOverview(SELECTOR_TR_SELECTED);
        const printAllSelectedBtn = this.createPrintButton('Ausgewählte', allSelectedIds);
        jquery('#sidebar').append(printAllSelectedBtn);
    }

    private findIdsInOverview(selector: string): number[] {
        const ids: number[] = [];
        jquery(selector).find('td.id > a').each((i, e) => {
            const a = jquery(e);
            const id = parseInt(a.text(), 10);
            ids.push(id);
        });
        return ids;
    }

    private async addButtonsOnDetailedView() {
        // append header
        const header = jquery('<h3>Drucken</h3>');
        jquery('#sidebar').append(header);
        // append 'print showed'
        const ticketId = () => [ Number(this.urlUtils.getLastUrlSegment()) ];
        const printAllSelectedBtn = this.createPrintButton('Drucken', ticketId);
        jquery('#sidebar').append(printAllSelectedBtn);
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

new Main(
    new TicketPrinter(
        new RedmineRequester(
            new SettingsLoader()
        ),
        new TicketToRowConverter(
            new SettingsLoader()
        ),
        new PdfCreator()
    ),
    new UrlUtils()
).main();
