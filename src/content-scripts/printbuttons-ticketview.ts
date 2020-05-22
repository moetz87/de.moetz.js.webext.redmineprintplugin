import { TicketPrinter } from '../shared/ticket-printer';
import { Domready } from '../shared/utils/domready-dynamic';
import { HtmlUtils } from '../shared/utils/html-utils';
import { UrlUtils } from '../shared/utils/url-utils';

export class PrintbuttonsTicketview {

    public async main() {
        const sidebar = HtmlUtils.findFirst<HTMLDivElement>('#sidebar');
        // append header
        const header = document.createElement('h3');
        header.innerText = 'Drucken';
        sidebar.appendChild(header);
        // append 'print showed'
        const ticketId = () => [ Number(UrlUtils.getLastUrlSegment()) ];
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

Domready.onReady(async () => new PrintbuttonsTicketview().main());
