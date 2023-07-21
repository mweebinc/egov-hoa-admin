import React from 'react';
import ResidentListPresenter from './ResidentListPresenter';
import {Table, Button} from "nq-component";
import {aggregateUseCase, deleteObjectUseCase, findObjectUseCase, upsertUseCase} from '../../usecases/object';
import {Progress, InfiniteScroll} from "nq-component";
import withRouter from "../../withRouter";
import Search from "../../components/Search";
import BaseListPage from "../../base/BaseListPage";
import NavBar from "../../components/navbar";
import fields from "./fields.json";
import getStatusColor from "./getStatusColor";
import ButtonGroup from "../../components/ButtonGroup";
import statuses from "./statuses.json";


class ResidentListPage extends BaseListPage {
    constructor(props) {
        super(props);
        this.presenter = new ResidentListPresenter(this, findObjectUseCase(), deleteObjectUseCase(), aggregateUseCase(), upsertUseCase());
        this.state = {
            objects: [],
            selected: [],
            progress: true,
            count: 0,
        };
    }

    getCollectionName() {
        return 'residents';
    }

    setObjects(objects) {
        this.setState({
            objects: objects.map((resident) => {
                const status = resident.status;
                const address = [];
                if (resident.block_number) {
                    address.push('blk ' + resident.block_number);
                }
                if (resident.unit_number) {
                    address.push(resident.unit_number);
                }
                if (resident.street) {
                    address.push(resident.street);
                }
                if (resident.barangay.length > 0) {
                    address.push(resident.barangay[0].name);
                }
                return {
                    id: resident._id,
                    name: `${resident.first_name} ${resident.last_name}`,
                    address: address.join(' '),
                    status: (
                        <span className={`badge ${getStatusColor(status)} text-white`}>
                            {status}
                        </span>
                    ),
                };
            }),
        });
    }

    onClickFilterStatus(option) {
        if (option.label === "ALL") {
            this.onClickFilterStatus({});
            return;
        }
        this.presenter.onClickFilterStatus({status: option.label})
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
                                fields={{
                                    first_name: {type: "String"},
                                    last_name: {type: "String"},
                                }}/>
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