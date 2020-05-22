import { TicketPrinter } from '../shared/ticket-printer';
import { Domready } from '../shared/utils/domready-dynamic';
import { HtmlUtils } from '../shared/utils/html-utils';

const SELECTOR_TR_KARTE = 'tr:has(td.tracker:contains("Karte")) > td.id > a';
const SELECTOR_TR_FEATURE = 'tr:has(td.tracker:contains("Feature")) > td.id > a';
const SELECTOR_TR_KUNDENFEEDBACK = 'tr:has(td.tracker:contains("Kundenfeedback")) > td.id > a';
const SELECTOR_TR_SELECTED = 'tr.context-menu-selection  > td.id > a';

export class PrintbuttonsIterationview {

    public async main() {
        const sidebar = HtmlUtils.findFirst<HTMLDivElement>('#sidebar');
        // append header
        const header = document.createElement('h3');
        header.innerText = 'Drucken';
        sidebar.appendChild(header);
        // append 'print all features'
        const allFeatureIds = () => this.findTicketIds(SELECTOR_TR_FEATURE);
        const printAllFeaturesBtn = this.createPrintButton('Alle Features', allFeatureIds);
        sidebar.appendChild(printAllFeaturesBtn);
        // append 'print all kundenfeedbacks'
        const allKundenfeedbackIds = () => this.findTicketIds(SELECTOR_TR_KUNDENFEEDBACK);
        const printAllKundenfeedbacksBtn = this.createPrintButton('Alle Kundenfeedbacks', allKundenfeedbackIds);
        sidebar.appendChild(printAllKundenfeedbacksBtn);
        // append 'print all tickets'
        const allTicketsIds = () => this.findTicketIds(SELECTOR_TR_KARTE);
        const printAllTicketsBtn = this.createPrintButton('Alle Karten', allTicketsIds);
        sidebar.appendChild(printAllTicketsBtn);
        // append 'print selected'
        const allSelectedIds = () => this.findTicketIds(SELECTOR_TR_SELECTED);
        const printAllSelectedBtn = this.createPrintButton('Ausgewählte', allSelectedIds);
        sidebar.appendChild(printAllSelectedBtn);
    }

    private findTicketIds(selector: string): number[] {
        return HtmlUtils.find<HTMLAnchorElement>(selector).map(e => parseInt(e.text, 10));
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

Domready.onReady(async () => new PrintbuttonsIterationview().main());
