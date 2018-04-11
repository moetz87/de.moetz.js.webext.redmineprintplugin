export class UrlUtils {

    public getCurrentUrl(): string {
        return window.location.href;
    }

    public currentUrlMatchesRegex(pattern: string): boolean {
        const regex = new RegExp(pattern, 'g');
        return regex.test(this.getCurrentUrl());
    }

}