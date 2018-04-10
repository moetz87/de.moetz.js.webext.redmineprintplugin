import { Ticket } from './model/ticket';
import { SettingsLoader } from './utils/settings-loader';

export class RedmineRequester {

    constructor(
        private settingsLoader: SettingsLoader) { }

    public async getTicket(id: number): Promise<Ticket> {
        const settings = await this.settingsLoader.load();
        const url = `${settings.url}/issues/${id}.json`;
        console.log(`Request-URL: ${url}`);
        const response = await fetch(url);
        const data = await response.json();
        return <Ticket>data.issue;
    }

}
