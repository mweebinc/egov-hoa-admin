import React from 'react';
import CollectionListPresenter from './CollectionListPresenter';
import {Table, dialog, Button} from "nq-component";
import AddField from "./components/AddField";
import {addSchemaUseCase, updateSchemaUseCase, deleteSchemaUseCase} from '../../usecases/schema/usecases';
import {
    deleteObjectUseCase,
    findObjectUseCase,
    upsertUseCase
} from '../../usecases/object';
import {exportCSVUseCase} from '../../usecases/csv/usecases';
import FormCollection from "./components/FormCollection";
import DeleteCollection from "./components/DeleteCollection";
import DeleteField from "./components/DeleteField";
import {Progress, InfiniteScroll} from "nq-component";
import FormAccess from "./components/FormAccess";
import mergeACl from "../../mergeACl";
import withRouter from "../../withRouter";
import Search from "../../components/Search";
import BaseListPage from "../../base/BaseListPage";
import NavBar from "../../components/navbar";

class CollectionListPage extends BaseListPage {
    constructor(props) {
        super(props);
        this.presenter = new CollectionListPresenter(
            this,
            findObjectUseCase(),
            deleteObjectUseCase(),
            upsertUseCase(),
            exportCSVUseCase(),
            addSchemaUseCase(),
            updateSchemaUseCase(),
            deleteSchemaUseCase(),
        );
        this.state = {
            objects: [],
            selected: [],
            progress: true,
            count: 0,
        };
    }

    /*when class change*/
    componentDidUpdate(prevProps, prevState) {
        this.presenter.componentDidUpdate(prevProps, prevState);
    }

    closeDialog() {
        dialog.close();
    }


    onClickAddCollection() {
        // create empty schema
        dialog.fire({
            html: <FormCollection
                schema={{}}
                onSubmit={(schema) => this.presenter.onSubmitAddCollection(schema)}
                onCancel={() => dialog.close()}/>,
            footer: false
        });
    }

    onClickEditCollection(schema) {
        dialog.fire({
            html: <FormCollection
                schema={schema}
                onSubmit={s => this.presenter.onSubmitEditCollection(s)}
                onCancel={() => dialog.close()}/>,
            footer: false
        });
    }

    onClickAddField(schema) {
        const schemas = this.getSchemas();
        dialog.fire({
            html: <AddField
                schema={schema}
                collections={schemas.map(s => s.collection)}
                onSubmit={s => this.presenter.onSubmitEditCollection(s)}
                onCancel={() => dialog.close()}/>,
            footer: false,
        });
    }

    onCLickAccess() {
        function submit(acl) {
            this.presenter.onSubmitAccess(acl);
        }

        const acl = mergeACl(this.state.selected);
        dialog.fire({
            html: <FormAccess
                currentUser={this.getCurrentUser()}
                acl={acl}
                onSubmit={submit.bind(this)}
                onCancel={() => dialog.close()}/>,
            footer: false
        });
    }

    onClickDeleteField() {
        const schema = this.getSchema(this.getCollectionName());
        dialog.fire({
            html: <DeleteField
                fields={Object.keys(schema.fields)}
                onSubmit={(f) => this.presenter.onSubmitDeleteField(f)}
                onCancel={() => dialog.close()}/>,
            footer: false
        });
    }

    onClickDeleteCollection() {
        const schema = this.getSchema(this.getCollectionName());
        dialog.fire({
            html: <DeleteCollection
                schema={schema}
                onSubmit={() => this.presenter.onSubmitDeleteCollection(schema.collection)}
                onCancel={() => dialog.close()}/>,
            footer: false
        });
    }


    onClickImport() {
        this.presenter.onClickImport();
    }

    onClickExport() {
        this.presenter.onClickExport();
    }

    render() {
        const schema = this.getSchema(this.getCollectionName());
        const {objects, selected, count, progress} = this.state;
        if (!schema) return <Progress/>;
        return (
            <>
                <NavBar
                    action={() => (
                        <div className="dropdown dropstart d-inline-block">
                            <i role="button" data-bs-toggle="dropdown" className="bi bi-three-dots-vertical"></i>
                            <div className="dropdown-menu fs-xs">
                                <button
                                    onClick={this.onClickImport.bind(this)}
                                    className="dropdown-item py-3">
                                    <i className='bi bi-arrow-down-square pe-2'/>Import Data
                                </button>
                                <button
                                    onClick={this.onClickExport.bind(this)}
                                    disabled={selected.length < 1}
                                    className="dropdown-item py-3">
                                    <i className='bi bi-arrow-up-square pe-2'/>Export Data
                                </button>
                                <button
                                    onClick={this.onCLickAccess.bind(this)}
                                    disabled={selected.length < 1}
                                    className="dropdown-item py-3">
                                    <i className='bi  bi-ui-checks mr-5 pe-2'/>
                                    Access
                                </button>
                                <button
                                    onClick={this.onClickDeleteSelected.bind(this)}
                                    disabled={selected.length < 1}
                                    className="dropdown-item py-3">
                                    <i className='bi bi-trash pe-2'/>Delete selected
                                </button>
                                <div className="dropdown-divider"></div>
                                <button
                                    onClick={this.onClickAddField.bind(this, schema)}
                                    className="dropdown-item py-3">
                                    <i className='bi bi-journal-plus pe-2'/>Add a field
                                </button>
                                <button
                                    onClick={this.onClickDeleteField.bind(this)}
                                    className="dropdown-item py-3">
                                    <i className='bi bi-journal-x pe-2'/>Delete a field
                                </button>
                                <button
                                    onClick={this.onClickEditCollection.bind(this, schema)}
                                    className="dropdown-item py-3">
                                    <i className='bi bi-pencil-square pe-2'/>Edit this collection
                                </button>
                                <button
                                    onClick={this.onClickDeleteCollection.bind(this)}
                                    className="dropdown-item py-3">
                                    <i className='bi bi-folder-x pe-2'/>Delete this collection
                                </button>
                                <button
                                    onClick={this.onClickAddCollection.bind(this)}
                                    className="dropdown-item py-3">
                                    <i className='bi bi-folder-plus pe-2'/>Add a collection
                                </button>
                            </div>
                        </div>
                    )}/>
                <div className="overflow-auto">
                    <InfiniteScroll
                        className="h-100"
                        loadMore={this.loadMore.bind(this)}
                        hasMore={(!progress && count > objects.length)}>
                        <div className="p-3 p-lg-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <h1 className="fw-bold mt-3 text-capitalize">{schema.label || this.getCollectionName()}</h1>
                                {
                                    selected.length > 0 ? (
                                            <div>
                                                <span
                                                    className="ms-2">Selected: </span>
                                                <span className="fs-sm text-nowrap">{selected.length}</span>
                                                <span
                                                    className="ms-1">of </span>
                                                <span className="fs-sm text-nowrap">{count}</span>
                                            </div>
                                        ) :
                                        (
                                            <div>
                                                <span
                                                    className="ms-2">Total: </span>
                                                <span className="fs-sm text-nowrap">{objects.length}</span>
                                                <span
                                                    className="ms-1">of </span>
                                                <span className="fs-sm text-nowrap">{count}</span>
                                            </div>
                                        )
                                }
                            </div>
                            <Search
                                schemas={this.getSchemas()}
                                className="mt-3"
                                onSubmit={this.searchSubmit.bind(this)}
                                fields={schema.fields}/>
                            <Table
                                fields={schema.fields}
                                objects={objects}
                                hasSelect
                                excludeFields={
                                    Object.keys(schema.fields)
                                        .reduce((acc, key) => {
                                            const options = schema.fields[key];
                                            if (options.read === false) {
                                                acc.push(key);
                                            }
                                            switch (options._type || options.type) {
                                                case 'Relation':
                                                case 'Array':
                                                case 'Object':
                                                case 'File':
                                                    acc.push(key);
                                                    break;
                                                default:
                                            }
                                            return acc;
                                        }, ['acl', 'password'])
                                }
                                selected={selected}
                                onSelect={this.onSelect.bind(this)}
                                onSelectAll={this.onSelectAll.bind(this)}
                                progress={progress}
                                onClickItem={this.onClickItem.bind(this)}
                                className="mt-3"
                            />
                        </div>
                    </InfiniteScroll>
                </div>
                <div className="position-fixed bottom-0 end-0 m-4">
                    <Button
                        className="btn btn-primary shadow-sm bg-primary"
                        onClick={this.onClickAdd.bind(this)}
                        style={{width: '50px', height: '50px', borderRadius: '25px'}}>
                        <i className="bi bi-plus-lg"/>
                    </Button>
                </div>
            </>
        );
    }
}

export default withRouter(CollectionListPage);