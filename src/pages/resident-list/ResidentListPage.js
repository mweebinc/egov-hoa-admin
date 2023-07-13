import React from 'react';
import ResidentListPresenter from './ResidentListPresenter';
import {Table, Button} from "nq-component";
import {addSchemaUseCase, updateSchemaUseCase, deleteSchemaUseCase} from '../../usecases/schema/usecases';
import {
    deleteObjectUseCase,
    findObjectUseCase,
    upsertUseCase
} from '../../usecases/object';
import {exportCSVUseCase} from '../../usecases/csv/usecases';
import {Progress, InfiniteScroll} from "nq-component";
import withRouter from "../../withRouter";
import Search from "../../components/Search";
import BaseListPage from "../../base/BaseListPage";
import NavBar from "../../components/navbar";
import fields from "./fields.json";


function getStatus(paymentDate, isCurrentMonth) {
    const monthDiff =
        (new Date().getFullYear() - paymentDate.getFullYear()) * 12;
    const months = monthDiff + new Date().getMonth() - paymentDate.getMonth();

    if (months >= 3) {
        return "DELINQUENT";
    } else if (months >= 0) {
        return isCurrentMonth ? "MIGS" : "DUE";
    } else {
        return "MIGS";
    }
}
function isSameMonth(date1, date2) {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth()
    );
}
function getStatusColor(status) {
    switch (status) {
        case "MIGS":
            return "text-bg-success";
        case "DUE":
            return "text-bg-warning";
        case "DELINQUENT":
            return "text-bg-danger";
        default:
            return "";
    }
}

class ResidentListPage extends BaseListPage {
    constructor(props) {
        super(props);
        this.presenter = new ResidentListPresenter(
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

    getCollectionName() {
        return 'finances';
    }

    setObjects(objects) {
        this.setState({
            objects: objects.map((o) => {
                const resident = o.member;
                const current = new Date();
                const payment_date = new Date(o.payment_date);
                const isCurrentMonth = isSameMonth(payment_date, current);
                const status = getStatus(payment_date, isCurrentMonth);
                return {
                    id: o.id,
                    name: `${resident.first_name} ${resident.last_name}`,
                    subdivision: resident.subdivision,
                    status: (
                        <span className={`badge ${getStatusColor(status)} text-white`}>
                          {status}
                        </span>
                    ),
                };
            }),
        });
    }

    render() {
        const schema = this.getSchema(this.getCollectionName());
        const {objects, selected, count, progress} = this.state;
        if (!schema) return <Progress/>;
        return (
            <>
                <NavBar
                />
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
                                fields={fields}
                                objects={objects}
                                hasSelect
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

export default withRouter(ResidentListPage);