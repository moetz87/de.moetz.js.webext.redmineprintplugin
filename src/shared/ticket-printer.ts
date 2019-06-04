import { HtmlUtils } from '../shared/utils/html-utils';
import { Document } from './entities/document';
import { Row } from './entities/document';
import { Ticket } from './entities/ticket';
import { Messager } from './messager';
import { PdfCreator } from './pdf-creator';
import { RedmineRequester } from './redmine-requester';
import { TicketToRowConverter } from './ticket-to-row-converter';

const ROWS_PER_PAGE = 3;
const HEIGHT = 841.89;
const WIDTH = 595.28;
const MARGIN = 30;

export module TicketPrinter {

    export async function printTickets(ids: number[]): Promise<void> {
        if (ids.length === 0) {
            Messager.showMessage('Info', 'Keine druckbaren Tickets gewählt.');
            return Promise.resolve();
        }
        const tickets = await loadTickets(ids);
        const document = await createDocument(tickets);
        const objectUrl = createPdfAndConvertToObjectUrl(document);
        print(objectUrl);
    }

    async function loadTickets(ids: number[]): Promise<Ticket[]> {
        const promises: Promise<Ticket>[] = [];
        ids.forEach(id => promises.push(RedmineRequester.getTicket(id)));
        return Promise.all(promises);
    }

    async function createDocument(tickets: Ticket[]): Promise<Document> {
        const promisedRows: Promise<Row>[] = [];
        tickets.forEach(t => promisedRows.push(TicketToRowConverter.convert(t)));
        const rows = await Promise.all(promisedRows);
        return new Document(rows, ROWS_PER_PAGE, WIDTH, HEIGHT, MARGIN);
    }

    function createPdfAndConvertToObjectUrl(document: Document): string {
        const pdf = PdfCreator.create(document);
        const pdfBlob = pdf.output('blob');
        return window.URL.createObjectURL(pdfBlob);
    }

    function print(objectUrl: string) {
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
        closebtn.onclick = () => HtmlUtils.remove('#printingoverlay');

        overlay.appendChild(closebtn);
        overlay.appendChild(iframe);
        document.body.appendChild(overlay);
    }

}
