import { HtmlUtils } from 'ts-common/html-utils';

export module Messager {

    const ID_MESSAGER = 'messager';
    const ID_BG_LAYER = 'messager-bglayer';

    const STYLE_MESSAGER_DIV = {
        position: 'absolute',
        width: '400px',
        margin: '0px',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
    };

    const STYLE_HEADER_DIV = {
        display: 'block',
        padding: '10px',
        'background-color': 'white'
    };

    const STYLE_HEADERTEXT_DIV = {
        display: 'inline-block',
        'font-weight': 'bold'
    };

    const STYLE_HEADER_BUTTON = {
        position: 'absolute',
        width: '30px',
        top: '1px',
        left: 'calc(100% - 30px - 2px)',
        color: 'white',
        'background-color': '#628DB6'
    };

    const STYLE_BODY_DIV = {
        display: 'block',
        'min-height': '150px',
        padding: '10px',
        'text-align': 'center',
        'background-color': 'white'
    };

    const STYLE_BG_DIV = {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: '0',
        left: '0',
        'background-color': 'rgba(0, 0, 0, 0.5)'
    };

    const STYLE_BG_LIGHT = 'rgba(0, 0, 0, 0.2)';

    export function showMessage(title: string, message: string) {
        show(title, message);
    }

    export function showMessageLight(title: string, message: string) {
        show(title, message, STYLE_BG_LIGHT);
    }

    export function showError(message: string) {
        show('Fehler!', message);
    }

    export function showErrorLight(message: string) {
        show('Fehler!', STYLE_BG_LIGHT);
    }

    function show(title: string, message: string, bg?: string) {
        if (isMessageShown()) {
            console.debug('Already showing message. Add to waiting messages.');
            WaitingMessages.addMessage(title, message);
            return;
        }

        const background = createBackground();
        if (bg) {
            background.style.backgroundColor = bg;
        }
        HtmlUtils.findFirst('body').appendChild(background);

        const messager = document.createElement('div');
        messager.id = ID_MESSAGER;
        Object.assign(messager.style, STYLE_MESSAGER_DIV);
        messager.appendChild(createHeader(title));
        messager.appendChild(createBody(message));
        HtmlUtils.findFirst('body').appendChild(messager);
    }

    function createHeader(title: string): HTMLDivElement {
        const text = document.createElement('div');
        text.innerText = title;
        Object.assign(text.style, STYLE_HEADERTEXT_DIV);

        const button = document.createElement('button');
        button.type = 'button';
        button.innerText = 'X';
        Object.assign(button.style, STYLE_HEADER_BUTTON);
        button.onclick = closeMessage;

        const header = document.createElement('div');
        Object.assign(header.style, STYLE_HEADER_DIV);
        header.appendChild(text);
        header.appendChild(button);
        return header;
    }

    function createBody(message: string): HTMLDivElement {
        const body = document.createElement('div');
        body.innerText = message;
        Object.assign(body.style, STYLE_BODY_DIV);
        return body;
    }

    function createBackground(): HTMLDivElement {
        const layer = document.createElement('div');
        layer.id = ID_BG_LAYER;
        Object.assign(layer.style, STYLE_BG_DIV);
        return layer;
    }

    function closeMessage() {
        HtmlUtils.remove(`#${ID_BG_LAYER}`);
        HtmlUtils.remove(`#${ID_MESSAGER}`);
        if (WaitingMessages.hasMessage()) {
            const message = WaitingMessages.getNextMessage();
            showMessage(message.title, message.message);
        }
    }

    function isMessageShown(): boolean {
        return (HtmlUtils.find(`#${ID_MESSAGER}`).length !== 0);
    }

}

// tslint:disable-next-line:no-stateless-class
class WaitingMessages {

    private static messages: Message[] = [];

    // tslint:disable-next-line:function-name
    public static hasMessage(): boolean {
        const hasMessage = (WaitingMessages.messages.length !== 0);
        console.debug(`HasMessage? ${hasMessage}`);
        return hasMessage;
    }

    // tslint:disable-next-line:function-name
    public static addMessage(title: string, message: string) {
        WaitingMessages.messages.push(new Message(title, message));
    }

    // tslint:disable-next-line:function-name
    public static getNextMessage(): Message {
        const message = WaitingMessages.messages[0];
        WaitingMessages.messages.splice(0, 1);
        console.debug(`Showing next message ${message}.`);
        return message;
    }

}

class Message {
    constructor(
        public readonly title: string,
        public readonly message: string) {
    }
}
