import { Settings } from '../shared/model/settings';

export class UserInterface {

    public readonly urlField = <HTMLInputElement>document.getElementById('urlField');
    public readonly messager = <HTMLElement>document.getElementById('messager');
    public readonly messagerOverlay = <HTMLElement>document.getElementById('messagerOverlay');

    public setSettings = (settings: Settings) => {
        this.urlField.value = settings.url;
    }

    public getSettings(): Settings {
        return new Settings({
            url: this.urlField.value
        });
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

}