import { HtmlUtils } from 'ts-common/html-utils';
import { Formatting } from '../shared/model/formatting';
import { Settings } from '../shared/model/settings';

export class UserInterface {

    private readonly urlField = HtmlUtils.findFirst<HTMLInputElement>('#urlField');
    private readonly topLeftFrontSizeField = HtmlUtils.findFirst<HTMLInputElement>('topleftfontsize');
    private readonly topLeftFontBoldField = HtmlUtils.findFirst<HTMLInputElement>('#topleftfontbold');
    private readonly topRightFontSizeField = HtmlUtils.findFirst<HTMLInputElement>('#toprightfontsize');
    private readonly topRightFontBoldField = HtmlUtils.findFirst<HTMLInputElement>('#toprightfontbold');
    private readonly centerFontSizeField = HtmlUtils.findFirst<HTMLInputElement>('#centerfontsize');
    private readonly centerFontBoldField = HtmlUtils.findFirst<HTMLInputElement>('#centerfontbold');
    private readonly bottomLeftFontSizeField = HtmlUtils.findFirst<HTMLInputElement>('#bottomleftfontsize');
    private readonly bottomLeftFontBoldField = HtmlUtils.findFirst<HTMLInputElement>('#bottomleftfontbold');
    private readonly bottomRightFontSizeField = HtmlUtils.findFirst<HTMLInputElement>('#bottomrightfontsize');
    private readonly bottomRightFontBoldField = HtmlUtils.findFirst<HTMLInputElement>('#bottomrightfontbold');
    private readonly messager = <HTMLElement>document.getElementById('messager');
    private onChangeListener: (() => void)[] = [];

    constructor() {
        this.urlField.onchange = this.onFieldValueChange;
        this.topLeftFrontSizeField.onchange = this.onFieldValueChange;
        this.topLeftFontBoldField.onchange = this.onFieldValueChange;
        this.topRightFontSizeField.onchange = this.onFieldValueChange;
        this.topRightFontBoldField.onchange = this.onFieldValueChange;
        this.centerFontSizeField.onchange = this.onFieldValueChange;
        this.centerFontBoldField.onchange = this.onFieldValueChange;
        this.bottomLeftFontSizeField.onchange = this.onFieldValueChange;
        this.bottomLeftFontBoldField.onchange = this.onFieldValueChange;
        this.bottomRightFontSizeField.onchange = this.onFieldValueChange;
        this.bottomRightFontBoldField.onchange = this.onFieldValueChange;
    }

    public setSettings = (settings: Settings) => {
        this.urlField.value = settings.url;
        this.topLeftFrontSizeField.valueAsNumber = settings.topLeftFormatting.fontSize;
        this.topLeftFontBoldField.checked = settings.topLeftFormatting.fontBold;
        this.topRightFontSizeField.valueAsNumber = settings.topRightFormatting.fontSize;
        this.topRightFontBoldField.checked = settings.topRightFormatting.fontBold;
        this.centerFontSizeField.valueAsNumber = settings.centerFormatting.fontSize;
        this.centerFontBoldField.checked = settings.centerFormatting.fontBold;
        this.bottomLeftFontSizeField.valueAsNumber = settings.bottomLeftFormatting.fontSize;
        this.bottomLeftFontBoldField.checked = settings.bottomLeftFormatting.fontBold;
        this.bottomRightFontSizeField.valueAsNumber = settings.bottomRightFormatting.fontSize;
        this.bottomRightFontBoldField.checked = settings.bottomRightFormatting.fontBold;
    }

    public getSettings(): Settings {
        const topLeftFormatting = new Formatting(
            this.topLeftFrontSizeField.valueAsNumber,
            this.topLeftFontBoldField.checked
        );
        const topRightFormatting = new Formatting(
            this.topRightFontSizeField.valueAsNumber,
            this.topRightFontBoldField.checked
        );
        const centerFormatting = new Formatting(
            this.centerFontSizeField.valueAsNumber,
            this.centerFontBoldField.checked
        );
        const bottomLeftFormatting = new Formatting(
            this.bottomLeftFontSizeField.valueAsNumber,
            this.bottomLeftFontBoldField.checked
        );
        const bottomRightFormatting = new Formatting(
            this.bottomRightFontSizeField.valueAsNumber,
            this.bottomRightFontBoldField.checked
        );
        return new Settings(
            this.urlField.value,
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

}
