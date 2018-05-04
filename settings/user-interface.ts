import { Formatting } from '../shared/model/formatting';
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
    private onChangeListener: (() => void)[] = [];

    constructor() {
        this.fields.forEach((field, name) => {
            field.onchange = this.onFieldValueChange;
        });
    }

    public setSettings = (settings: Settings) => {
        this.getField('url').value = settings.url;
        this.getField('topLeftFontSize').valueAsNumber = settings.topLeftFormatting.fontSize;
        this.getField('topLeftFontBold').checked = settings.topLeftFormatting.fontBold;
        this.getField('topRightFontSize').valueAsNumber = settings.topRightFormatting.fontSize;
        this.getField('topRightFontBold').checked = settings.topRightFormatting.fontBold;
        this.getField('centerFontSize').valueAsNumber = settings.centerFormatting.fontSize;
        this.getField('centerFontBold').checked = settings.centerFormatting.fontBold;
        this.getField('bottomLeftFontSize').valueAsNumber = settings.bottomLeftFormatting.fontSize;
        this.getField('bottomLeftFontBold').checked = settings.bottomLeftFormatting.fontBold;
        this.getField('bottomRightFontSize').valueAsNumber = settings.bottomRightFormatting.fontSize;
        this.getField('bottomRightFontBold').checked = settings.bottomRightFormatting.fontBold;
    }

    public getSettings(): Settings {
        const topLeftFormatting = new Formatting(
            this.getField('topLeftFontSize').valueAsNumber,
            this.getField('topLeftFontBold').checked
        );
        const topRightFormatting = new Formatting(
            this.getField('topRightFontSize').valueAsNumber,
            this.getField('topRightFontBold').checked
        );
        const centerFormatting = new Formatting(
            this.getField('centerFontSize').valueAsNumber,
            this.getField('centerFontBold').checked
        );
        const bottomLeftFormatting = new Formatting(
            this.getField('bottomLeftFontSize').valueAsNumber,
            this.getField('bottomLeftFontBold').checked
        );
        const bottomRightFormatting = new Formatting(
            this.getField('bottomRightFontSize').valueAsNumber,
            this.getField('bottomRightFontBold').checked
        );
        return new Settings(
            this.getField('url').value,
            topLeftFormatting,
            topRightFormatting,
            centerFormatting,
            bottomLeftFormatting,
            bottomRightFormatting
        );
    }

    public registerOnChangeListener(callback: () => void) {
        this.onChangeListener.push(callback);
    }

    public showMessage(message: string) {
        this.messager.innerText = message;
        this.messager.className = '';
        this.messager.style.display = 'block';
        setTimeout(() => this.messager.style.display = 'none', 2500);
    }

    public showErrorMessage(message: string) {
        this.showMessage(message);
        this.messager.className = 'error';
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
