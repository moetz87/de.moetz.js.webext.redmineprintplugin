import { Settings } from './entities/settings';
import { Ticket } from './entities/ticket';
import { withErrorlogging } from './executor';
import { Messager } from './messager';
import { SettingsLoader } from './utils/settings-loader';

const TIMEOUT_IN_MS = 5000;

export module RedmineRequester {

    export async function getTicket(id: number): Promise<Ticket> {
        const settings = await withErrorlogging('Fehler beim Laden der Einstellungen.', () => SettingsLoader.load(Settings));
        const url = `https://redmine.n-design.de/issues/${id}.json`;
        return new Promise<Ticket>((resolve, reject) => {
            const req = new XMLHttpRequest();
            req.timeout = TIMEOUT_IN_MS;
            req.open('GET', url, true);
            req.setRequestHeader('X-Redmine-API-Key', settings.token || '');
            req.onreadystatechange = () => {
                if (req.readyState === XMLHttpRequest.DONE) {
                    handleResponse(id, req, resolve, reject);
                }
            };
            req.send();

        });
    }

    function handleResponse(id: number, req: XMLHttpRequest, resolve, reject) {
        if (req.status === 200) {
            const response = JSON.parse(req.response);
            resolve(response.issue);
        } else if (req.status === 0) {
            const msg1 = `Verbindungsfehler beim Laden des Tickets mit der ID ${id}.`;
            const msg2 = 'Möglicherweise ist eine fehlerhafte Basis-URL in den Addon-Einstellungen konfiguiert.';
            Messager.showMessage('Fehler', `${msg1}\n${msg2}`);
            reject();
        } else {
            const msg1 = `Fehler beim Laden des Tickets mit der ID ${id}.`;
            const msg2 = `Statuscode: ${req.status}\nStatustext: ${req.statusText}`;
            Messager.showMessage('Fehler', `${msg1}\n${msg2}`);
            reject();
        }
    }

}
