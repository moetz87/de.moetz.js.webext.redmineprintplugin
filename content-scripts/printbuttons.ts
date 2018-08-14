import { HtmlUtils } from 'ts-common/html-utils';
import { UrlUtils } from 'ts-common/url-utils';
import { WebextMain } from 'ts-common/webext-main';
import { PdfCreator } from '../shared/pdf-creator';
import { RedmineRequester } from '../shared/redmine-requester';
import { TicketPrinter } from '../shared/ticket-printer';
import { TicketToRowConverter } from '../shared/ticket-to-row-converter';
import { Messager } from './messager';

const SELECTOR_TR_KARTE = 'tr:has(td.tracker:contains("Karte")) > td.id > a';
const SELECTOR_TR_FEATURE = 'tr:has(td.tracker:contains("Feature")) > td.id > a';
const SELECTOR_TR_SELECTED = 'tr.context-menu-selection  > td.id > a';
const URL_PATTERN_OVERVIEW = '.*(\\/projects).*(\\/issues).*';
const URL_PATTERN_DETAILEDVIEW = '.*(\\/issues).*';

class Main extends WebextMain {

    constructor(
        private ticketPrinter: TicketPrinter) {
        super();
    }

    public async onExecuteMain() {
        if (UrlUtils.currentUrlMatchesRegex(URL_PATTERN_OVERVIEW)) {
            console.log(`URL ${UrlUtils.getCurrentUrl()} matching pattern ${URL_PATTERN_OVERVIEW}.`);
            console.log('Including print-buttons.');
            this.addButtonsOnOverview();
        } else if (UrlUtils.currentUrlMatchesRegex(URL_PATTERN_DETAILEDVIEW)) {
            console.log(`URL ${UrlUtils.getCurrentUrl()} matching pattern ${URL_PATTERN_DETAILEDVIEW}.`);
            console.log('Including print-buttons.');
            this.addButtonsOnDetailedView();
        } else {
            console.log(`URL ${UrlUtils.getCurrentUrl()} not matching pattern ${URL_PATTERN_OVERVIEW}.`);
            console.log(`URL ${UrlUtils.getCurrentUrl()} not matching pattern ${URL_PATTERN_DETAILEDVIEW}.`);
            console.log('Not including print-buttons.');
        }

    }

    private async addButtonsOnOverview() {
        const sidebar = HtmlUtils.findFirst<HTMLDivElement>('#sidebar');
        // append header
        const header = document.createElement('h3');
        header.innerText = 'Drucken';
        sidebar.appendChild(header);
        // append 'print all tickets'
        const allTicketsIds = () => this.findIdsInOverview(SELECTOR_TR_KARTE);
        const printAllTicketsBtn = this.createPrintButton('Alle Karten', allTicketsIds);
        sidebar.appendChild(printAllTicketsBtn);
        // append 'print all features'
        const allFeatureIds = () => this.findIdsInOverview(SELECTOR_TR_FEATURE);
        const printAllFeaturesBtn = this.createPrintButton('Alle Features', allFeatureIds);
        sidebar.appendChild(printAllFeaturesBtn);
        // append 'print selected'
        const allSelectedIds = () => this.findIdsInOverview(SELECTOR_TR_SELECTED);
        const printAllSelectedBtn = this.createPrintButton('Ausgewählte', allSelectedIds);
        sidebar.appendChild(printAllSelectedBtn);
    }

    private findIdsInOverview(selector: string): number[] {
        return HtmlUtils.find<HTMLAnchorElement>(selector).map(e => parseInt(e.text, 10));
    }

    private async addButtonsOnDetailedView() {
        const sidebar = HtmlUtils.findFirst<HTMLDivElement>('#sidebar');
        // append header
        const header = document.createElement('h3');
        header.innerText = 'Drucken';
        sidebar.appendChild(header);
        // append 'print showed'
        const ticketId = () => [Number(UrlUtils.getLastUrlSegment())];
        const printAllSelectedBtn = this.createPrintButton('Drucken', ticketId);
        sidebar.appendChild(printAllSelectedBtn);

        const btn = document.createElement('a');
        btn.innerText = 'TEST';
        btn.style.cursor = 'pointer';
        btn.onclick = () => {
            console.log('onClick');
            Messager.showMessage('Foobar!');
        };
        sidebar.appendChild(btn);
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
        new RedmineRequester(),
        new TicketToRowConverter(),
        new PdfCreator()
    )
).main();
