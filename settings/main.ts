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
        SettingsLoader.load(Settings).then(this.ui.setSettings);
    }

}

new Main(
    new UserInterface()
).main();
