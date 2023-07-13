import saveAs from "../../saveAs";

class MigrationPresenter {
    constructor(view, exportUseCase, importUseCase) {
        this.view = view;
        this.exportUseCase = exportUseCase;
        this.importUseCase = importUseCase;
    }

    export() {
        this.view.showProgress();
        this.exportUseCase.execute()
            .then(response => {
                const blob = new Blob([response], {type: 'application/octet-stream'});
                const date = new Date();
                const day = date.toISOString().slice(0, 10);
                const time = date.toLocaleTimeString('en-GB').replaceAll(':', '');
                saveAs(blob, `${day}-${time}.archive`);
                this.view.hideProgress();
            })
            .catch(error => {
                this.view.hideProgress();
                this.view.showError(error);
            });
    }

    import(file) {
        this.view.showProgress();
        this.importUseCase.execute(file)
            .then(response => {
                console.log(response);
                this.view.hideProgress();
            })
            .catch(error => {
                this.view.hideProgress();
                this.view.showError(error);
            });
    }
}

export default MigrationPresenter;
