import { Messager } from './messager';

export function withLogging<T>(message: string, fun: () => T): T {
    const value = fun();
    Messager.showMessage('Info', message);
    return value;
}

export function withErrorlogging<T>(message: string, fun: () => T): T {
    try {
        return fun();
    } catch (e) {
        Messager.showMessage('Fehler', `${message}\nFehlernachricht: ${e.message}`);
        throw e;
    }
}
