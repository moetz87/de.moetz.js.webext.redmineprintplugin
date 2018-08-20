import { Messager } from './messager';

export function withLogging<T>(message: string, fun: () => T): T {
    const value = fun();
    console.debug(message);
    Messager.showMessage('Nachricht', message);
    return value;
}

export function withErrorlogging<T>(message: string, fun: () => T): T {
    try {
        return fun();
    } catch (e) {
        console.error(`${message}\n${e.message}`);
        Messager.showError(`${message}\n\nFehlernachricht: ${e.message}`);
        throw e;
    }
}
