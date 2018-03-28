export class PdfLoader {

    public loadPdfAsBlob(url: string, onLoaded: (objectUrl) => void) {
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

}
