import { Document } from '../shared/model/document';
import { PdfCreator } from '../shared/pdf-creator';
import { RedmineRequester } from '../shared/redmine-requester';
import { TicketToRowConverter } from '../shared/ticket-to-row-converter';
import { Ticket } from './model/ticket';

const ROWS_PER_PAGE = 3;
const HEIGHT = 841.89;
const WIDTH = 595.28;
const MARGIN = 10;
const FONT_SIZE = 12;
const FONT_SIZE_LARGE = 16;

export class TicketPrinter {

    constructor(
        private redmineRequester: RedmineRequester,
        private ticketToRowConverter: TicketToRowConverter,
        private pdfCreator: PdfCreator) { }

    public async printTickets(ids: number[]): Promise<void> {
        const tickets = await this.loadTickets(ids);
        const document = this.createDocument(tickets);
        const objectUrl = this.createPdfAndConvertToObjectUrl(document);
        this.print(objectUrl);
    }

    private async loadTickets(ids: number[]): Promise<Ticket[]> {
        const promises: Promise<Ticket>[] = [];
        ids.forEach(id => promises.push(this.redmineRequester.getTicket(id)));
        return Promise.all(promises);
    }

    private createDocument(tickets: Ticket[]): Document {
        const doc = new Document(ROWS_PER_PAGE, WIDTH, HEIGHT, MARGIN, FONT_SIZE, FONT_SIZE_LARGE);
        tickets
            .map(t => this.ticketToRowConverter.convert(t))
            .forEach(t => doc.addRow(t));
        return doc;
    }

    private createPdfAndConvertToObjectUrl(document: Document): string {
        const pdf = this.pdfCreator.create(document);
        const pdfBlob = pdf.output('blob');
        return window.URL.createObjectURL(pdfBlob);
    }

    private print(objectUrl: string) {
        window.open(objectUrl);
    }

}
