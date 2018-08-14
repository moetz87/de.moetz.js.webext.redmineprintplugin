import { HtmlUtils } from 'ts-common/html-utils';

export module Messager {

    export function showMessage(message: string) {
        HtmlUtils.findFirst('body').appendChild(createBGLayer());
        const notification = createNotification(message);
        notification.appendChild(createOKButton());
        HtmlUtils.findFirst('body').appendChild(notification);
    }

    function createNotification(message: string): HTMLDivElement {
        const messager = document.createElement('div');
        messager.id = 'messager';
        messager.innerText = message;
        Object.assign(messager.style, {
            position: 'absolute',
            padding: '10px',
            left: '50%',
            top: '50%',
            transform: 'translateX(-50%, -50%)',
            'text-align': 'center',
            'background-color': 'rgb(146, 252, 160)',
            border: '1px solid rgb(90, 175, 100)'
        });
        return messager;
    }

    function createOKButton(): HTMLAnchorElement {
        const button = document.createElement('a');
        button.innerText = 'OK';
        button.style.display = 'block';
        button.style.cursor = 'pointer';
        button.onclick = () => {
            HtmlUtils.remove('#messager-bg');
            HtmlUtils.remove('#messager');
        };
        return button;
    }

    function createBGLayer(): HTMLDivElement {
        const layer = document.createElement('div');
        layer.id = 'messager-bg';
        Object.assign(layer.style, {
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: '0',
            left: '0',
            'background-color': 'rgba(0, 0, 0, 0.25'
        });
        return layer;
    }

}
