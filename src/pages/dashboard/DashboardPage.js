import React from "react";
import DashboardPresenter from "./DashboardPresenter";
import NavBar from "../../components/navbar";
import Count from "./components/Count";
import BaseListPage from "../../base/BaseListPage";
import {deleteObjectUseCase, findObjectUseCase, upsertUseCase} from "../../usecases/object";
import {dialog} from "nq-component";
import AddWidget from "./components/AddWidget";
import DialogTable from "../../components/DialogTable";
import DeleteWidget from "./components/DeleteWidget";
import FormCollection from "../collection-list/components/FormCollection";
import {updateSchemaUseCase} from "../../usecases/schema/usecases";

class DashboardPage extends BaseListPage {
    constructor(props) {
        super(props);
        this.presenter = new DashboardPresenter(
            this,
            findObjectUseCase(),
            deleteObjectUseCase(),
            upsertUseCase(),
            updateSchemaUseCase(),
        );
        this.state = {
            objects: [],
            selected: [],
            progress: true,
            count: 0,
        };
    }

    getCollectionName() {
        return "dashboard";
    }

    closeDialog() {
        dialog.close();
    }

    onClickAddWidget() {
        const schemas = this.getSchemas();
        dialog.fire({
            html: <AddWidget
                collections={schemas.map(s => s.collection)}
                onSubmit={o => {
                    dialog.close();
                    this.presenter.onSubmitAddWidget(o);
                }}
                onCancel={() => dialog.close()}/>,
            footer: false
        });
    }

    onClickDeleteWidget() {
        const schemas = this.getSchemas();
        dialog.fire({
            html: <DeleteWidget
                objects={this.state.objects}
                collections={schemas.map(s => s.collection)}
                onSubmit={i => {
                    dialog.close();
                    this.presenter.onSubmitDelete(i);
                }}
                onCancel={() => dialog.close()}/>,
            footer: false
        });
    }

    onCLickWidget(object) {
        const schema = this.getSchema(object.collection);
        dialog.fire({
            html: <DialogTable
                title={object.collection}
                where={object.where}
                schema={schema}
                onCancel={() => dialog.close()}/>,
            footer: false
        });
    }

    onClickEditCollection() {
        const schema = this.getSchema(this.getCollectionName());
        dialog.fire({
            html: <FormCollection
                schema={schema}
                onSubmit={s => this.presenter.onSubmitEditCollection(s)}
                onCancel={() => dialog.close()}/>,
            footer: false
        });
    }

    render() {

        const objects = this.state.objects;

        return (
            <>
                <NavBar
                    action={() => (
                        <div className="dropdown dropstart d-inline-block">
                            <i role="button" data-bs-toggle="dropdown" className="bi bi-three-dots-vertical"></i>
                            <div className="dropdown-menu fs-xs">
                                <button
                                    onClick={this.onClickAddWidget.bind(this)}
                                    className="dropdown-item py-3">
                                    <i className='bi bi-folder-plus pe-2'/>Add widget
                                </button>
                                <button
                                    disabled={objects.length < 1}
                                    onClick={this.onClickDeleteWidget.bind(this)}
                                    className="dropdown-item py-3">
                                    <i className='bi bi-trash pe-2'/>Delete widget
                                </button>
                                <button
                                    onClick={this.onClickEditCollection.bind(this)}
                                    className="dropdown-item py-3">
                                    <i className='bi bi-pencil-square pe-2'/>Edit this collection
                                </button>
                            </div>
                        </div>
                    )}
                />
                <div className="overflow-auto">
                    <div className="p-3 p-lg-4">
                        <h1 className="fw-bold mt-3 text-capitalize">Dashboard</h1>
                        <div className="row mt-1 g-3">
                            {
                                objects.map((object) => {
                                    return (
                                        <div className="col-6 col-md-3">
                                            <Count
                                                collection={object.collection}
                                                icon={object.icon}
                                                where={object.where}
                                                label={object.label}
                                                actionLabel={object.actionLabel}
                                                onClick={this.onCLickWidget.bind(this, object)}/>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default DashboardPage;