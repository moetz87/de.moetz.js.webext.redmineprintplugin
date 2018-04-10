
export class Settings {

    public url = 'http://localhost:80';

    constructor(json: any) {
        return Object.assign(this, json);
    }

    public toJson(): string {
        return JSON.stringify(this);
    }

}
