import * as jquery from 'jquery';
import { Document } from '../shared/model/document';
import { PdfCreator } from '../shared/pdf-creator';
import { RedmineRequester } from '../shared/redmine-requester';
import { TicketToRowConverter } from '../shared/ticket-to-row-converter';

const ROWS_PER_PAGE = 3;
const DOC_HEIGHT = 841.89;
const DOC_WIDTH = 595.28;
const DOC_MARGIN = 10;
const FONT_SIZE = 12;
const FONT_SIZE_LARGE = 16;

class Main {

    constructor(
        private redmineRequester: RedmineRequester,
        private ticketToRowConverter: TicketToRowConverter,
        private pdfCreator: PdfCreator) { }

    public async main() {
        // load ticket
        // const ticket1 = await this.redmineRequester.getTicket(11405);
        // const ticket2 = await this.redmineRequester.getTicket(12077);
        // const ticket3 = await this.redmineRequester.getTicket(11442);
        // const ticket4 = await this.redmineRequester.getTicket(11443);
        // const ticket5 = await this.redmineRequester.getTicket(12148);
        // const ticket6 = await this.redmineRequester.getTicket(12154);
        const ticket1 = await this.redmineRequester.getTicket(1);
        const ticket2 = await this.redmineRequester.getTicket(2);
        const ticket3 = await this.redmineRequester.getTicket(3);
        const ticket4 = await this.redmineRequester.getTicket(4);
        const ticket5 = await this.redmineRequester.getTicket(5);
        // create doc
        const doc = new Document(ROWS_PER_PAGE, DOC_WIDTH, DOC_HEIGHT, DOC_MARGIN, FONT_SIZE, FONT_SIZE_LARGE);
        [ticket1, ticket2, ticket3, ticket4, ticket5]
            .map(t => this.ticketToRowConverter.convert(t))
            .forEach(t => doc.addRow(t));
        // create pdf
        const pdf = this.pdfCreator.create(doc);
        const pdfBlob = pdf.output('blob');
        const objectUrl = window.URL.createObjectURL(pdfBlob);
        // print pdf
        window.open(objectUrl);
    }

}

jquery(document).ready(() => {
    new Main(
        new RedmineRequester(),
        new TicketToRowConverter(),
        new PdfCreator()
    ).main();
});
