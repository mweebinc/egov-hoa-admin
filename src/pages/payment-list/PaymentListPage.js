import React from 'react';
import PaymentListPresenter from './PaymentListPresenter';
import {Table, Button} from "nq-component";
import {deleteObjectUseCase, findObjectUseCase, upsertUseCase} from '../../usecases/object';
import {Progress, InfiniteScroll, OutputFactory} from "nq-component";
import withRouter from "../../withRouter";
import Search from "../../components/Search";
import BaseListPage from "../../base/BaseListPage";
import NavBar from "../../components/navbar";
import ButtonGroup from "../../components/ButtonGroup";
import statuses from "./statuses.json";


class PaymentListPage extends BaseListPage {
    constructor(props) {
        super(props);
        this.presenter = new PaymentListPresenter(this, findObjectUseCase(), deleteObjectUseCase(), upsertUseCase());
        this.state = {
            objects: [],
            selected: [],
            progress: true,
            count: 0,
        };
    }

    getCollectionName() {
        return 'payments';
    }

    onClickFilterStatus(option) {
        if (option.label === "ALL") {
            this.searchSubmit({});
            return;
        }
        this.searchSubmit({status: option.label})
    }

    onClickApprove(index) {
        this.presenter.onClickApprove(index);
    }

    onClickReject(index) {
        this.presenter.onClickReject(index);
    }

    onCollapse(index, object, excludeFields) {
        const schema = this.getSchema(this.getCollectionName());
        const fields = schema.fields;
        const status = object['status'];
        return (
            <>
                <div className="d-flex">
                    <div style={{width: "100px", height: "100px"}}>
                        <img className="w-100 h-100"
                             style={{objectFit: 'cover'}}
                             src={object["receipt"]}/>
                    </div>
                    <ul className="list-unstyled ms-1">
                        {
                            Object.keys(fields).map((field) => {
                                const options = fields[field];
                                const value = object[field];
                                if (options._type === "Image") return null;
                                if (value === undefined) return null;
                                if (excludeFields.includes(field)) return null;
                                return (
                                    <li key={field}>
                                        <span
                                            className="ms-2 fw-light">{field}: </span>
                                        <span
                                            className="fs-sm text-nowrap">
                                            <OutputFactory
                                                field={field}
                                                object={object}
                                                {...options}
                                            />
                                        </span>
                                    </li>
                                );
                            })}
                    </ul>
                </div>
                <button
                    className="btn btn-primary btn-sm"
                    onClick={this.onClickItem.bind(this, index)}>EDIT
                </button>
                {
                    status === 'PENDING' && (
                        <>
                            <button
                                className="btn btn-primary btn-sm ms-2"
                                onClick={this.onClickApprove.bind(this, index)}>APPROVE
                            </button>
                            <button
                                className="btn btn-outline-primary btn-sm ms-2"
                                onClick={this.onClickReject.bind(this, index)}>REJECT
                            </button>
                        </>
                    )
                }
            </>
        )
    }

    render() {
        const schema = this.getSchema(this.getCollectionName());
        const {objects, selected, count, progress} = this.state;
        if (!schema) return <Progress/>;
        return (
            <>
                <NavBar/>
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
                            <div className="mt-3">
                                <ButtonGroup
                                    onClick={this.onClickFilterStatus.bind(this)}
                                    options={statuses}/>
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
                                selected={selected}
                                onSelect={this.onSelect.bind(this)}
                                onSelectAll={this.onSelectAll.bind(this)}
                                progress={progress}
                                onClickItem={this.onClickItem.bind(this)}
                                className="mt-3"
                                onCollapse={this.onCollapse.bind(this)}
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

export default withRouter(PaymentListPage);