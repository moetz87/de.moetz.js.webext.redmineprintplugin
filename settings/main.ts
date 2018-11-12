import { SettingsLoader } from 'ts-common/settings-loader';
import { WebextMain } from 'ts-common/webext-main';
import { Messager } from '../shared/messager';
import { Settings } from '../shared/model/settings';
import { UserInterface } from './user-interface';

export class Main extends WebextMain {

    constructor(
        readonly ui: UserInterface) {
        super();
    }

    public async onExecuteMain() {
        try {
            const settings = await SettingsLoader.load(Settings);
            this.ui.setSettings(settings);
        } catch (e) {
            Messager.showMessage('Fehler', `Fehler beim Laden der Einstellungen:\n${e.message}`);
        }
    }

}

new Main(
    new UserInterface()
).main();
