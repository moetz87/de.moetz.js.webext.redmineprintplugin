import { TicketPrinter } from '../shared/ticket-printer';
import { Domready } from '../shared/utils/domready-dynamic';
import { HtmlUtils } from '../shared/utils/html-utils';
import { UrlUtils } from '../shared/utils/url-utils';

const SELECTOR_TR_KARTE = 'tr:has(td.tracker:contains("Karte")) > td.id > a';
const SELECTOR_TR_FEATURE = 'tr:has(td.tracker:contains("Feature")) > td.id > a';
const SELECTOR_TR_KUNDENFEEDBACK = 'tr:has(td.tracker:contains("Kundenfeedback")) > td.id > a';
const SELECTOR_TR_SELECTED = 'tr.context-menu-selection  > td.id > a';
const URL_PATTERN_OVERVIEW = '.*(\\/projects).*(\\/issues).*';
const URL_PATTERN_DETAILEDVIEW = '.*(\\/issues).*';

export class Printbuttons {

    public async main() {
        if (UrlUtils.currentUrlMatchesRegex(URL_PATTERN_OVERVIEW)) {
            this.addButtonsOnOverview();
        } else if (UrlUtils.currentUrlMatchesRegex(URL_PATTERN_DETAILEDVIEW)) {
            this.addButtonsOnDetailedView();
        }
    }

    private addButtonsOnOverview() {
        const sidebar = HtmlUtils.findFirst<HTMLDivElement>('#sidebar');
        // append header
        const header = document.createElement('h3');
        header.innerText = 'Drucken';
        sidebar.appendChild(header);
        // append 'print all features'
        const allFeatureIds = () => this.findIdsInOverview(SELECTOR_TR_FEATURE);
        const printAllFeaturesBtn = this.createPrintButton('Alle Features', allFeatureIds);
        sidebar.appendChild(printAllFeaturesBtn);
        // append 'print all kundenfeedbacks'
        const allKundenfeedbackIds = () => this.findIdsInOverview(SELECTOR_TR_KUNDENFEEDBACK);
        const printAllKundenfeedbacksBtn = this.createPrintButton('Alle Kundenfeedbacks', allKundenfeedbackIds);
        sidebar.appendChild(printAllKundenfeedbacksBtn);
        // append 'print all tickets'
        const allTicketsIds = () => this.findIdsInOverview(SELECTOR_TR_KARTE);
        const printAllTicketsBtn = this.createPrintButton('Alle Karten', allTicketsIds);
        sidebar.appendChild(printAllTicketsBtn);
        // append 'print selected'
        const allSelectedIds = () => this.findIdsInOverview(SELECTOR_TR_SELECTED);
        const printAllSelectedBtn = this.createPrintButton('Ausgewählte', allSelectedIds);
        sidebar.appendChild(printAllSelectedBtn);
    }

    private findIdsInOverview(selector: string): number[] {
        return HtmlUtils.find<HTMLAnchorElement>(selector).map(e => parseInt(e.text, 10));
    }

    private addButtonsOnDetailedView() {
        const sidebar = HtmlUtils.findFirst<HTMLDivElement>('#sidebar');
        // append header
        const header = document.createElement('h3');
        header.innerText = 'Drucken';
        sidebar.appendChild(header);
        // append 'print showed'
        const ticketId = () => [Number(UrlUtils.getLastUrlSegment())];
        const printAllSelectedBtn = this.createPrintButton('Drucken', ticketId);
        sidebar.appendChild(printAllSelectedBtn);
    }

    private createPrintButton(caption: string, ids: () => number[]): HTMLAnchorElement {
        const button = document.createElement('a');
        button.innerText = caption;
        Object.assign(button.style, {
            display: 'block',
            cursor: 'pointer'
        });
        button.onclick = () => TicketPrinter.printTickets(ids());
        return button;
    }

}

Domready.onReady(async () => new Printbuttons().main());
