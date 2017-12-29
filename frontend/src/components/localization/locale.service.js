//https://www.youtube.com/watch?v=mwYHDXS6uSc
class Locale {
    constructor() {
        this.subscriptions = [];
    }

    fire() {
        this.subscriptions.forEach(cb => cb());
    }

    subscribe(callback) {
        this.subscriptions.push(callback);
        return this.subscriptions.length - 1;
    }

    unsubscribe(index) {
        this.subscriptions.splice(index, 1);
    }
}

const localeService = new Locale();

export default localeService;