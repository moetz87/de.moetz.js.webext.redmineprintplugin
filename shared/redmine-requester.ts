import { SettingsLoader } from 'ts-common/settings-loader';
import { withErrorlogging } from './executor';
import { Messager } from './messager';
import { Settings } from './model/settings';
import { Ticket } from './model/ticket';

const TIMEOUT_IN_MS = 5000;

export class RedmineRequester {

    public async getTicket(id: number): Promise<Ticket> {
        const settings = await withErrorlogging('Fehler beim Laden der Einstellungen.', () => SettingsLoader.load(Settings));
        const url = `${settings.url}/issues/${id}.json`;
        return new Promise<Ticket>((resolve, reject) => {
            const req = new XMLHttpRequest();
            req.timeout = TIMEOUT_IN_MS;
            req.open('GET', url, true);
            req.onreadystatechange = () => {
                if (req.readyState === XMLHttpRequest.DONE) {
                    this.handleResponse(id, req, resolve, reject);
                }
            };
            req.send();

        });
    }

    private handleResponse(id: number, req: XMLHttpRequest, resolve, reject) {
        if (req.status === 200) {
            const response = JSON.parse(req.response);
            resolve(response.issue);
        } else {
            // tslint:disable-next-line:max-line-length
            Messager.showMessage('Fehler', `Fehler beim Laden des Tickets mit der ID ${id}.\nStatuscode: ${req.status}\nStatustext: ${req.statusText}`);
            reject();
        }
    }

}
