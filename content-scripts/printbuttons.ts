import * as jquery from 'jquery';
import { RedmineRequester } from '../shared/redmine-requester';
import { TicketPdf } from '../shared/ticket-pdf-creator/ticket-pdf';

class Main {

    constructor(
        private redmineRequester: RedmineRequester) { }

    public async main() {
        const th = document.createElement('th');
        jquery('table.issues > thead > tr').append(th);

        jquery('tr.issue').each((i, e) => {
            const tr = jquery(e);
            const id = tr.find('td.id > a').text();
            const button = this.createButton('Drucken', () => [parseInt(id, 10)]);
            const td = document.createElement('td');
            td.appendChild(button);
            tr.append(td);
        });

        jquery('#sidebar').append(jquery('<h3>Drucken</h3>'));
        const allTicketsIds = () => this.findIds('tr:has(td.tracker:contains("Karte"))');
        jquery('#sidebar').append(this.createButton('Alle Karten', allTicketsIds));
        const allFeatureIds = () => this.findIds('tr:has(td.tracker:contains("Feature"))');
        jquery('#sidebar').append(this.createButton('Alle Features', allFeatureIds));
        const allSelectedIds = () => this.findIds('tr.context-menu-selection');
        jquery('#sidebar').append(this.createButton('Ausgewählte', allSelectedIds));
    }

    private findIds(selector: string): number[] {
        const ids: number[] = [];
        jquery(selector).find('td.id > a').each((i, e) => {
            const a = jquery(e);
            const id = parseInt(a.text(), 10);
            ids.push(id);
        });
        return ids;
    }

    private createButton(caption: string, ids: () => number[]): HTMLAnchorElement {
        const button = document.createElement('a');
        button.innerText = caption;
        button.style.display = 'block';
        button.style.cursor = 'pointer';
        button.onclick = () => this.print(ids());
        return button;
    }

    private async print(ids: number[]) {
        const tickets = await Promise.all(ids.map(id => this.redmineRequester.getTicket(id)));
        // create pdf
        const pdf = new TicketPdf(3);
        tickets.forEach(ticket => pdf.addTicket(ticket));
        const pdfBlob = pdf.create();
        const objectUrl = window.URL.createObjectURL(pdfBlob);
        // create element
        console.log(`ObjectURL: ${objectUrl}`);
        const element = document.createElement('iframe');
        element.src = objectUrl;
        element.className = 'printframe';
        // append element
        window.open(objectUrl);
    }

}

jquery(document).ready(() => {
    new Main(new RedmineRequester()).main();
});
