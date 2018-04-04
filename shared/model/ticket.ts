
export class Ticket {

    constructor(
        readonly id: number,
        readonly parent: number,
        readonly subject: string) { }

    public static fromJson(json: any): Ticket {
        const ticket = new Ticket(0, 0, '');
        Object.assign(ticket, json);
        return ticket;
    }

    public toJson(): string {
        return JSON.stringify(this);
    }

}
