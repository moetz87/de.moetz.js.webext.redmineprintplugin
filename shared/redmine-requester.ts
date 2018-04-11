import { Ticket } from './model/ticket';
import { SettingsLoader } from './utils/settings-loader';

export class RedmineRequester {

    constructor(
        private settingsLoader: SettingsLoader) { }

    public getTicket(id: number): Promise<Ticket> {
        return new Promise((resolve, reject) => {
            this.settingsLoader.load().then(settings => {
                const url = `${settings.url}/issues/${id}.json`;
                const req = new XMLHttpRequest();
                req.open('GET', url, true);
                req.onload = event => {
                    const response = JSON.parse(req.response);
                    resolve(response.issue);
                };
                req.send();
            });
        });
    }

}
