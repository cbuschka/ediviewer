class AppStore {
    constructor() {
        this.state = {ediFile: undefined};
    }

    onFileLoaded({data: ediFile}) {
        this.state = {ediFile};
    }

    appendDataTo(target) {
        const {ediFile} = this.state;
        target.app = {ediFile};
    }
}

export const appStore = new AppStore();