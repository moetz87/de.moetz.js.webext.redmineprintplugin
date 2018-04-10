import * as jquery from 'jquery';
import { SettingsLoader } from '../shared/utils/settings-loader';
import { UserInterface } from './user-interface';

export class Main {

    constructor(
        readonly ui: UserInterface,
        readonly settingsLoader: SettingsLoader) { }

    public main() {
        this.registerEventHandler();
        this.settingsLoader.load().then(this.ui.setSettings);
    }

    private registerEventHandler() {
        this.ui.urlField.onchange
            = () => {
                const settings = this.ui.getSettings();
                this.settingsLoader.save(settings)
                    .then(() => this.ui.showMessage('Einstellungen erfolgreich gespeichert.'))
                    .catch(error => this.ui.showErrorMessage(`Fehler beim Speichern von Einstellungen: ${error}.`));
            };
    }

}

jquery(document).ready(() => {
    new Main(
        new UserInterface(),
        new SettingsLoader()
    ).main();
});
