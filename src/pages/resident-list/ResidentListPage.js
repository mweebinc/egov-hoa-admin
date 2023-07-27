import React from "react";
import ResidentListPresenter from "./ResidentListPresenter";
import { Table, Button } from "nq-component";
import {
  aggregateUseCase,
  deleteObjectUseCase,
  findObjectUseCase,
  upsertUseCase,
} from "../../usecases/object";
import { Progress, InfiniteScroll } from "nq-component";
import withRouter from "../../withRouter";
import Search from "../../components/Search";
import BaseListPage from "../../base/BaseListPage";
import NavBar from "../../components/navbar";
import fields from "./fields.json";
import ButtonGroup from "../../components/ButtonGroup";
import statuses from "./statuses.json";
import printComponent from "../../printComponent";
import CertificatePage from "../../components/Certificate";

class ResidentListPage extends BaseListPage {
  constructor(props) {
    super(props);
    this.presenter = new ResidentListPresenter(
      this,
      findObjectUseCase(),
      deleteObjectUseCase(),
      aggregateUseCase(),
      upsertUseCase()
    );
    this.state = {
      objects: [],
      selected: [],
      progress: true,
      count: 0,
      object: null,
      officials: [],
      hoaLogo: [],
    };
    this.certRef = React.createRef();
  }

  getCollectionName() {
    return "residents";
  }

  setHoaOfficial(officials) {
    this.setState({ officials });
  }

  setHoaLogo(hoaLogo) {
    this.setState({ hoaLogo });
  }

  onClickFilterStatus(option) {
    if (option.label === "ALL") {
      this.onClickFilterStatus({});
      return;
    }
    this.presenter.onClickFilterStatus({ status: option.label });
  }

  onClickPrint(index) {
    const object = this.state.objects[index];
    this.setStatePromise({ object })
      .then(() => printComponent(this.certRef.current, "certificate"))
      .then((result) => {
        console.log("result", result);
      })
      .catch((error) => {
        alert(error);
      });
  }

  render() {
    const schema = this.getSchema(this.getCollectionName());
    const user = this.getCurrentUser();
    const { objects, selected, count, progress, officials, hoaLogo } =
      this.state;
    const finalOfficials = hoaLogo[0]?.objects.filter(
      (o) => o.id === user.hoa.id
    );
    console.log("success", finalOfficials);

    if (!schema) return <Progress />;
    return (
      <>
        <div className="d-none">
          <div ref={this.certRef}>
            {this.state.object && (
              <CertificatePage
                object={this.state.object}
                official={finalOfficials}
                user={user}
                logo={hoaLogo}
              />
            )}
          </div>
        </div>
        <NavBar />
        <div className="overflow-auto">
          <InfiniteScroll
            className="h-100"
            loadMore={this.loadMore.bind(this)}
            hasMore={!progress && count > objects.length}
          >
            <div className="p-3 p-lg-4">
              <div className="d-flex justify-content-between align-items-center">
                <h1 className="fw-bold mt-3 text-capitalize">
                  {schema.label || this.getCollectionName()}
                </h1>
                {selected.length > 0 ? (
                  <div>
                    <span className="ms-2">Selected: </span>
                    <span className="fs-sm text-nowrap">{selected.length}</span>
                    <span className="ms-1">of </span>
                    <span className="fs-sm text-nowrap">{count}</span>
                  </div>
                ) : (
                  <div>
                    <span className="ms-2">Total: </span>
                    <span className="fs-sm text-nowrap">{objects.length}</span>
                    <span className="ms-1">of </span>
                    <span className="fs-sm text-nowrap">{count}</span>
                  </div>
                )}
              </div>
              <div className="mt-3">
                <ButtonGroup
                  onClick={this.onClickFilterStatus.bind(this)}
                  options={statuses}
                />
              </div>
              <Search
                schemas={this.getSchemas()}
                className="mt-3"
                onSubmit={this.searchSubmit.bind(this)}
                fields={{
                  first_name: { type: "String" },
                  last_name: { type: "String" },
                }}
              />
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
                actions={[
                  {
                    label: "EDIT",
                    onClick: this.onClickItem.bind(this),
                  },
                  {
                    label: "PRINT CERTIFICATE",
                    onClick: this.onClickPrint.bind(this),
                  },
                ]}
              />
            </div>
          </InfiniteScroll>
        </div>
        <div className="position-fixed bottom-0 end-0 m-4">
          <Button
            className="btn btn-primary shadow-sm bg-primary"
            onClick={this.onClickAdd.bind(this)}
            style={{ width: "50px", height: "50px", borderRadius: "25px" }}
          >
            <i className="bi bi-plus-lg" />
          </Button>
        </div>
      </>
    );
  }
}

export default withRouter(ResidentListPage);
