import { SettingsLoader } from 'ts-common/settings-loader';
import { withErrorlogging } from './executor';
import { Messager } from './messager';
import { Settings } from './model/settings';
import { Ticket } from './model/ticket';

const TIMEOUT_IN_MS = 1000;

export class RedmineRequester {

    public async getTicket(id: number): Promise<Ticket> {
        const settings = await withErrorlogging('Fehler beim Laden der Einstellungen.', () => SettingsLoader.load(Settings));
        const url = `${settings.url}/issues/${id}.json`;
        console.debug(`Lade Ticket ${id} per URL ${url}.`);
        return new Promise<Ticket>((resolve, reject) => {
            const req = new XMLHttpRequest();
            req.timeout = TIMEOUT_IN_MS;
            req.onload = () => this.parseAndResolve(req, resolve);
            req.onerror = () => this.showErrorAndReject(`(OnError) Fehler beim Laden des Tickets mit der ID ${id}.`, reject);
            req.ontimeout = () => this.showErrorAndReject(`(OnTimeout) Fehler beim Laden des Tickets mit der ID ${id}.`, reject);
            req.open('GET', url, true);
            req.send();
        });
    }

    private parseAndResolve(req: any, resolve: (data: any) => void) {
        const response = JSON.parse(req.response);
        resolve(response.issue);
    }

    private showErrorAndReject(message: string, reject: () => void) {
        console.error(message);
        Messager.showError(message);
        reject();
    }

}
