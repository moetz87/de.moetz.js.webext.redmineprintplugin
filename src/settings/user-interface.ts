import { Formatting } from '../shared/entities/formatting';
import { Settings } from '../shared/entities/settings';
import { Messager } from '../shared/messager';
import { HtmlUtils } from '../shared/utils/html-utils';
import { SettingsLoader } from '../shared/utils/settings-loader';

export class UserInterface {

    private readonly urlField = HtmlUtils.findFirst<HTMLInputElement>('#urlField');
    private readonly tokenField = HtmlUtils.findFirst<HTMLInputElement>('#tokenField');
    private readonly tokenLink = HtmlUtils.findFirst<HTMLAnchorElement>('#tokenLink');
    private readonly topLeftFrontSizeField = HtmlUtils.findFirst<HTMLInputElement>('#topleftfontsize');
    private readonly topLeftFontBoldField = HtmlUtils.findFirst<HTMLInputElement>('#topleftfontbold');
    private readonly topRightFontSizeField = HtmlUtils.findFirst<HTMLInputElement>('#toprightfontsize');
    private readonly topRightFontBoldField = HtmlUtils.findFirst<HTMLInputElement>('#toprightfontbold');
    private readonly centerFontSizeField = HtmlUtils.findFirst<HTMLInputElement>('#centerfontsize');
    private readonly centerFontBoldField = HtmlUtils.findFirst<HTMLInputElement>('#centerfontbold');
    private readonly bottomLeftFontSizeField = HtmlUtils.findFirst<HTMLInputElement>('#bottomleftfontsize');
    private readonly bottomLeftFontBoldField = HtmlUtils.findFirst<HTMLInputElement>('#bottomleftfontbold');
    private readonly bottomRightFontSizeField = HtmlUtils.findFirst<HTMLInputElement>('#bottomrightfontsize');
    private readonly bottomRightFontBoldField = HtmlUtils.findFirst<HTMLInputElement>('#bottomrightfontbold');
    private readonly saveButton = HtmlUtils.findFirst<HTMLButtonElement>('#savebutton');


    constructor() {
        this.saveButton.onclick = () => SettingsLoader.save(this.getSettings())
            .then(() => Messager.showMessage('Erfolg', 'Einstellungen gespeichert.'))
            .catch(() => Messager.showMessage('Fehler', 'Fehler beim Speichern der Einstellungen.'));

        this.urlField.oninput = () => this.tokenLink.href = `${this.urlField.value}/my/api_key`;
    }

    public setSettings = (settings: Settings) => {
        this.urlField.value = settings.url;
        this.tokenField.value = settings.token || '';
        this.tokenLink.href = `${settings.url}/my/api_key`;
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
            this.tokenField.value,
            topLeftFormatting,
            topRightFormatting,
            centerFormatting,
            bottomLeftFormatting,
            bottomRightFormatting
        );
    }

}
