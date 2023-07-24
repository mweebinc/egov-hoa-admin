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
import getStatusColor from "./getStatusColor";
import ButtonGroup from "../../components/ButtonGroup";
import statuses from "./statuses.json";
import printComponent from "../../printComponent";
import ResidentCertificate from "../../components/Print";
import certificate from "../../certificate.pdf";
import CertificatePage from "../print/PrintCertificate/CertificatePage";

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

  setObjects(objects) {
    console.log("hehehe", objects);
    this.setState({
      objects: objects.map((resident) => {
        const status = resident.status;
        const barangay = resident.barangay.map((b) => b.name);
        const picture = resident.picture;
        const sex = resident.sex;
        const civil_status = resident.civil_status;
        const birthdate = resident.birthdate;
        const address = [];
        if (resident.block_number) {
          address.push("blk " + resident.block_number);
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
          address: address.join(" "),
          status: (
            <span className={`badge ${getStatusColor(status)} text-white`}>
              {status}
            </span>
          ),
          barangay: barangay,
          picture: picture,
          sex: sex,
          civil_status: civil_status,
          birthDate: birthdate,
        };
      }),
    });
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
    console.log("clg print", object);
    this.setStatePromise({ object })
      .then(() => printComponent(this.certRef.current, "certificate"))
      .then((result) => {
        console.log("result", result);
      })
      .catch((error) => {
        alert(error);
      });
  }

  onCollapse(index, object) {
    console.log("Data :", object);
    return (
      <>
        <div className="d-flex">
          <span>
            <b>Name:</b>{" "}
          </span>

          <span> {object["name"]}</span>
        </div>
        <div className="d-flex">
          <span>
            <b>Address:</b>{" "}
          </span>

          <span> {object["address"]}</span>
        </div>
        <div className="d-flex">
          <span>
            <b>Status:</b>{" "}
          </span>

          <span> {object["status"]}</span>
        </div>
        <div className="mt-2">
          {" "}
          <button
            className="btn btn-primary btn-sm"
            onClick={this.onClickItem.bind(this, index)}
          >
            EDIT
          </button>
          <button
            className="btn btn-primary btn-sm ms-2"
            onClick={this.onClickPrint.bind(this, index)}
          >
            PRINT CERTIFICATE
          </button>
        </div>
      </>
    );
  }

  render() {
    const schema = this.getSchema(this.getCollectionName());
    const { objects, selected, count, progress, officials, hoaLogo } =
      this.state;

    if (!schema) return <Progress />;
    return (
      <>
        <div className="d-none">
          <div ref={this.certRef}>
            {this.state.object && (
              <CertificatePage
                object={this.state.object}
                official={officials}
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
                onCollapse={this.onCollapse.bind(this)}
                className="mt-3"
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
