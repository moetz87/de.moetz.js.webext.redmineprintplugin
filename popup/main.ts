import * as jquery from 'jquery';
import { RedmineRequester } from '../shared/redmine-requester';
import { TicketPdfCreator } from '../shared/ticket-pdf-creator/ticket-pdf-creator';

class Main {

    constructor(
        private ticketPdfCreator: TicketPdfCreator,
        private redmineRequester: RedmineRequester) { }

    public async main() {
        // load ticket
        const ticket = await this.redmineRequester.getTicket(11645);
        const ticket2 = await this.redmineRequester.getTicket(11645);
        // create pdf
        const pdfBlob = this.ticketPdfCreator.createTicketPdf(3, [ticket, ticket2]);
        const objectUrl = window.URL.createObjectURL(pdfBlob);
        // create element
        console.log(`ObjectURL: ${objectUrl}`);
        const element = document.createElement('iframe');
        element.src = objectUrl;
        element.className = 'printframe';
        // append element
        const content = document.getElementById('content');
        if (content != null) {
            content.appendChild(element);
        } else {
            console.error('Element #content not found.');
        }
    }

}

jquery(document).ready(() => {
    new Main(
        new TicketPdfCreator(),
        new RedmineRequester())
        .main();
});
