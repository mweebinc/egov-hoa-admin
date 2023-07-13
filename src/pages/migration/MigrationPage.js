import BasePage from "../../base/BasePage";
import {NavBar} from "nq-component";
import React from "react";
import MigrationPresenter from "./MigrationPresenter";
import {exportUseCase, importUseCase} from "../../usecases/migration";
import {Button} from "nq-component";
import browseFile from "../../browseFile";

class MigrationPage extends BasePage {
    constructor(props) {
        super(props);
        this.presenter = new MigrationPresenter(this, exportUseCase(), importUseCase());
        this.state = {progress: false};
    }

    showProgress() {
        this.setState({progress: true});
    }

    hideProgress() {
        this.setState({progress: false});
    }

    exportClick() {
        this.presenter.export();
    }

    importClick() {
        browseFile('*')
            .then(files => {
                if (files.length > 0) {
                    const file = files[0];
                    this.presenter.import(file);
                }
            });
    }

    render() {
        return (
            <>
                <NavBar className="shadow-sm mb-3"/>
                <div className="container d-flex flex-column">
                    <div className="bg-white shadow rounded m-auto mb-3">
                        <div className="p-4 p-lg-5">
                            <div className="row align-items-center">
                                <div>
                                    <h4>Export your content</h4>
                                    <p>Export all (or specific) text content (pages,post,feedback) from your site.</p>
                                </div>
                                <div>
                                    <Button
                                        progress={this.state.progress}
                                        onClick={this.exportClick.bind(this)}
                                        className="btn btn-primary">
                                        {this.state.progress ? 'Please wait...' : 'EXPORT'}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white shadow rounded m-auto">
                        <div className="p-4 p-lg-5">
                            <div className="row align-items-center">
                                <div>
                                    <h4>Import your content</h4>
                                    <p>Import all (or specific) text content (pages,post,feedback) from your site.</p>
                                </div>
                                <div>
                                    <button onClick={this.importClick.bind(this)} className="btn btn-primary">IMPORT
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )

    }
}

export default MigrationPage;
