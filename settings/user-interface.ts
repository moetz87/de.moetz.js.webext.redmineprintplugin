import { Settings } from '../shared/model/settings';

export class UserInterface {

    private fields = new Map<string, HTMLInputElement>([
        ['url', <HTMLInputElement>document.getElementById('urlField')],
        ['topLeftFontSize', <HTMLInputElement>document.getElementById('topleftfontsize')],
        ['topLeftFontBold', <HTMLInputElement>document.getElementById('topleftfontbold')],
        ['topRightFontSize', <HTMLInputElement>document.getElementById('toprightfontsize')],
        ['topRightFontBold', <HTMLInputElement>document.getElementById('toprightfontbold')],
        ['centerFontSize', <HTMLInputElement>document.getElementById('centerfontsize')],
        ['centerFontBold', <HTMLInputElement>document.getElementById('centerfontbold')],
        ['bottomLeftFontSize', <HTMLInputElement>document.getElementById('bottomleftfontsize')],
        ['bottomLeftFontBold', <HTMLInputElement>document.getElementById('bottomleftfontbold')],
        ['bottomRightFontSize', <HTMLInputElement>document.getElementById('bottomrightfontsize')],
        ['bottomRightFontBold', <HTMLInputElement>document.getElementById('bottomrightfontbold')]
    ]);
    private readonly messager = <HTMLElement>document.getElementById('messager');
    private readonly messagerOverlay = <HTMLElement>document.getElementById('messagerOverlay');
    private onChangeListener: (() => void)[] = [];

    constructor() {
        this.fields.forEach((field, name) => {
            field.onchange = this.onFieldValueChange;
        });
    }

    public setSettings = (settings: Settings) => {
        this.getField('url').value = settings.url;
    }

    public getSettings(): Settings {
        return new Settings({
            url: this.getField('url').value
        });
    }

    public registerOnChangeListener(callback: () => void) {
        this.onChangeListener.push(callback);
    }

    public showMessage(message: string) {
        this.messager.innerText = message;
        this.messager.className = '';
        this.messagerOverlay.className = 'error';
        this.messagerOverlay.style.display = 'block';
        setTimeout(() => this.messagerOverlay.style.display = 'none', 2000);
    }

    public showErrorMessage(message: string) {
        this.showMessage(message);
        this.messager.className = 'error';
        this.messagerOverlay.className = 'error';
    }

    private onFieldValueChange = () => {
        this.onChangeListener.forEach(callback => callback());
    }

    private getField(name: string): HTMLInputElement {
        // tslint:disable-next-line:no-backbone-get-set-outside-model
        const field = this.fields.get(name);
        if (field) {
            return field;
        } else {
            throw new Error(`Field mit Name "${name}" nicht bekannt.`);
        }
    }

}
