import * as jquery from 'jquery';

jquery(document).ready(() => {
    loadPdfAsBlob('http://localhost:8000/test.pdf', objectUrl => {
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
    });
});

function loadPdfAsBlob(url: string, onLoaded: (objectUrl) => void) {
    const req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.responseType = 'blob';
    req.onload = event => {
        const blob = req.response;
        console.log(`Blob: ${blob}`);
        const objectUrl = window.URL.createObjectURL(blob);
        onLoaded(objectUrl);
    };
    req.send();
}
