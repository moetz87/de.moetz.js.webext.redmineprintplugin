import { Ticket } from './model/ticket';

const REDMINEBASEURL = 'http://localhost';

export class RedmineRequester {

    public getTicket(id: number): Promise<Ticket> {
        return new Promise((resolve, reject) => {
            const url = `${REDMINEBASEURL}/issues/${id}.json`;
            const req = new XMLHttpRequest();
            req.open('GET', url, true);
            req.onload = event => {
                const response = JSON.parse(req.response);
                const ticket = <Ticket> response.issue;
                resolve(ticket);
            };
            req.send();
        });
    }

}
