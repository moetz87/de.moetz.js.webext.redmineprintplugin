import { Formatting } from './formatting';

export class Settings {

    constructor(
        public url = 'https://redmine.n-design.de',
        public token = '',
        public topLeftFormatting = new Formatting(),
        public topRightFormatting = new Formatting(),
        public centerFormatting = new Formatting(),
        public bottomLeftFormatting = new Formatting(),
        public bottomRightFormatting = new Formatting()) {

    }

    public static fromJson(json: any): Settings {
        return Object.assign(new Settings(), json);
    }

}
