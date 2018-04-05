import { Ticket } from './model/ticket';

export class RedmineRequester {

    public getTicket(id: number): Promise<Ticket> {
        return new Promise((resolve, reject) => {
            const url = `http://redmine/redmine/issues/${id}.json`;
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
