import { SettingsLoader } from 'ts-common/settings-loader';
import { Settings } from './model/settings';
import { Ticket } from './model/ticket';

export class RedmineRequester {

    public getTicket(id: number): Promise<Ticket> {
        return new Promise((resolve, reject) => {
            SettingsLoader.load(Settings).then(settings => {
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
