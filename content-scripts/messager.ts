import { HtmlUtils } from 'ts-common/html-utils';

const ID_MESSAGER = 'messager';
const ID_BG_LAYER = 'messager-bglayer';

export module Messager {

    export function showMessage(title: string, message: string) {
        const messager = document.createElement('div');
        messager.id = ID_MESSAGER;
        Object.assign(messager.style, {
            position: 'absolute',
            width: '400px',
            margin: '0px',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
        });
        messager.appendChild(createHeader(title));
        messager.appendChild(createBody(message));
        HtmlUtils.findFirst('body').appendChild(createBackground());
        HtmlUtils.findFirst('body').appendChild(messager);
    }

    function createHeader(title: string): HTMLDivElement {
        const header = document.createElement('div');
        Object.assign(header.style, {
            display: 'block',
            padding: '10px',
            'background-color': 'white'
        });

        const text = document.createElement('div');
        text.innerText = title;
        Object.assign(text.style, {
            display: 'inline-block',
            'font-weight': 'bold'
        });
        header.appendChild(text);

        const button = document.createElement('button');
        button.type = 'button';
        button.innerText = 'X';
        Object.assign(button.style, {
            position: 'absolute',
            width: '30px',
            top: '1px',
            left: 'calc(100% - 30px - 2px)',
            color: 'white',
            'background-color': '#628DB6'
        });
        button.onclick = clear;
        header.appendChild(button);

        return header;
    }

    function createBody(message: string): HTMLDivElement {
        const body = document.createElement('div');
        body.innerText = message;
        Object.assign(body.style, {
            display: 'block',
            'min-height': '150px',
            padding: '10px',
            'text-align': 'center',
            'background-color': 'white'
        });
        return body;
    }

    function createBackground(): HTMLDivElement {
        const layer = document.createElement('div');
        layer.id = ID_BG_LAYER;
        Object.assign(layer.style, {
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: '0',
            left: '0',
            'background-color': 'rgba(0, 0, 0, 0.5)'
        });
        return layer;
    }

    function clear() {
        HtmlUtils.remove(`#${ID_MESSAGER}`);
        HtmlUtils.remove(`#${ID_BG_LAYER}`);
    }

}
