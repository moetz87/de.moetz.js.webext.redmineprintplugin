import * as jquery from 'jquery';
import { RedmineRequester } from '../shared/redmine-requester';
import { TicketPdf } from '../shared/ticket-pdf-creator/ticket-pdf';

class Main {

    constructor(
        private redmineRequester: RedmineRequester) { }

    public async main() {
        // load ticket
        const ticket1 = await this.redmineRequester.getTicket(11405);
        const ticket2 = await this.redmineRequester.getTicket(12077);
        const ticket3 = await this.redmineRequester.getTicket(11442);
        const ticket4 = await this.redmineRequester.getTicket(11443);
        const ticket5 = await this.redmineRequester.getTicket(12148);
        const ticket6 = await this.redmineRequester.getTicket(12154);
        // create pdf
        const pdf = new TicketPdf(3);
        [ticket1, ticket2, ticket3, ticket4, ticket5, ticket6, ticket6].forEach(ticket => pdf.addTicket(ticket));
        const pdfBlob = pdf.create();
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
    new Main(new RedmineRequester()).main();
});
