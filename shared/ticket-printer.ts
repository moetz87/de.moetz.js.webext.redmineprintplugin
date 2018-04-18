import * as jQuery from 'jquery';
import { Document } from '../shared/model/document';
import { PdfCreator } from '../shared/pdf-creator';
import { RedmineRequester } from '../shared/redmine-requester';
import { TicketToRowConverter } from '../shared/ticket-to-row-converter';
import { Ticket } from './model/ticket';

const ROWS_PER_PAGE = 3;
const HEIGHT = 841.89;
const WIDTH = 595.28;
const MARGIN = 10;

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
        const doc = new Document(ROWS_PER_PAGE, WIDTH, HEIGHT, MARGIN);
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
        const overlay = document.createElement('div');
        overlay.id = 'printingoverlay';
        overlay.style.position = 'fixed';
        overlay.style.width = 'calc(100% - 50px - 50px)';
        overlay.style.height = 'calc(100% - 50px - 50px)';
        overlay.style.top = '50px';
        overlay.style.left = '50px';
        overlay.style.right = '0';
        overlay.style.bottom = '0';
        overlay.style.zIndex = '20';
        overlay.style.backgroundColor = '#4B4B4B';
        overlay.style.textAlign = 'right';

        const iframe = document.createElement('iframe');
        iframe.src = objectUrl;
        iframe.style.width = '100%';
        iframe.style.height = 'calc(100% - 30px - 5px - 5px)';

        const closebtn = document.createElement('button');
        closebtn.textContent = 'Schließen';
        closebtn.style.height = '30px';
        closebtn.style.margin = '5px 10px 5px 10px';
        closebtn.onclick = () => jQuery('#printingoverlay').remove();

        overlay.appendChild(closebtn);
        overlay.appendChild(iframe);
        document.body.appendChild(overlay);
    }

}
