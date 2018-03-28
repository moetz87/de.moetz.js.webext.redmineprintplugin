import * as jquery from 'jquery';
import { PdfCreator } from './pdf-creator';
import { RedmineRequester } from './redmine-requester';

class Main {

    constructor(
        private pdfCreator: PdfCreator,
        private redmineRequester: RedmineRequester) { }

    public async main() {
        // load ticket
        const ticket = await this.redmineRequester.getTicket(11645);
        // create pdf
        const pdfBlob = this.pdfCreator.createPdf(ticket);
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
        new PdfCreator(),
        new RedmineRequester())
        .main();
});
