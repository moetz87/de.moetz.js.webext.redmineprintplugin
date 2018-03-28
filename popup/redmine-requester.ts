export class RedmineRequester {

    public async getTicket(id: number): Promise<any> {
        return new Promise((resolve, reject) => {
            const url = `http://redmine/redmine/issues/${id}.json`;
            const req = new XMLHttpRequest();
            req.open('GET', url, true);
            req.onload = event => {
                const response = JSON.parse(req.response);
                resolve(response);
            };
            req.send();
        });
    }

}
