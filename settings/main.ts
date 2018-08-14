import { SettingsLoader } from 'ts-common/settings-loader';
import { WebextMain } from 'ts-common/webext-main';
import { Settings } from '../shared/model/settings';
import { UserInterface } from './user-interface';

export class Main extends WebextMain {

    constructor(
        readonly ui: UserInterface) {
        super();
    }

    public onExecuteMain() {
        this.registerEventHandler();
        SettingsLoader.load(Settings).then(this.ui.setSettings);
    }

    private registerEventHandler() {
        this.ui.registerOnChangeListener(() => {
            const settings = this.ui.getSettings();
            SettingsLoader.save(settings)
                .then(() => this.ui.showMessage('Einstellungen erfolgreich gespeichert.'))
                .catch(error => this.ui.showErrorMessage(`Fehler beim Speichern von Einstellungen: ${error}.`));
        });
    }

}

new Main(
    new UserInterface()
).main();
