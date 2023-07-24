import React, { Component } from "react";
import BaseListPage from "../../../base/BaseListPage";
import CertificatePresenter from "./CertificatePresenter";
import { findObjectUseCase } from "../../../usecases/object";

class CertificatePage extends BaseListPage {
  constructor(props) {
    super(props);
    this.presenter = new CertificatePresenter(this, findObjectUseCase());
    this.state = {
      objects: [],
    };
  }

  getCollectionName() {
    return "hoa_officials";
  }
  render() {
    const { object, official, logo } = this.props;
    const user = this.getCurrentUser();

    const lolo = logo[0].objects.filter((o) => o.id === user.hoa.id);

    return (
      <div>
        <div
          className="d-flex justify-content-between m-3"
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "10px",
          }}
        >
          <div>
            {" "}
            <img
              src={lolo.map((o) => o.logo)}
              alt=""
              style={{ width: "125px", height: "125px", borderRadius: "50%" }}
            />
          </div>
          <div style={{ textAlign: "center" }} className="text-center">
            <p style={{ marginBottom: "0px" }} className="mb-0">
              Republic of the Philippines
            </p>
            <p style={{ margin: "" }} className="mb-0">
              Province of Cavite
            </p>
            <p style={{ marginBottom: "0px" }} className="mb-0">
              City of Bacoor
            </p>

            <p className="mb-0" style={{ fontWeight: "bold" }}>
              {object.barangay}
            </p>
          </div>
          <div>
            <img
              src={lolo.map((o) => o.logo2)}
              alt=""
              style={{ width: "125px", height: "125px", borderRadius: "50%" }}
            />
          </div>
        </div>
        <div className="text-center">
          <div style={{ textAlign: "center" }}>
            <h2>BARANGAY CLEARANCE</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: ".3fr 1fr" }}>
            <div
              style={{
                border: "1px solid black",
                padding: "10px",
                textAlign: "center",
              }}
            >
              {official.map((o) => {
                return (
                  <div
                    key={o.id}
                    style={{
                      marginTop: "10px",
                      padding: "0",
                    }}
                  >
                    {o.objects.map((o) => (
                      <div
                        style={{
                          marginTop: "10px",
                          padding: "0",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "15px",
                            margin: "0",
                            padding: "0",
                          }}
                        >
                          {o.name}
                        </p>
                        <p
                          style={{
                            fontSize: "13px",
                            margin: "0",
                            padding: "0",
                          }}
                        >
                          {o.position}
                        </p>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateRows: "1fr .3fr",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: ".2fr .1fr .4fr .3fr",
                }}
              >
                <div style={{ paddingLeft: "10px" }}>
                  {" "}
                  <p
                    style={{
                      fontSize: "15px",
                      paddingTop: "10px",
                    }}
                  >
                    NAME
                  </p>
                  <p
                    style={{
                      fontSize: "15px",
                    }}
                  >
                    AGE
                  </p>
                  <p
                    style={{
                      fontSize: "15px",
                    }}
                  >
                    GENDER
                  </p>
                  <p
                    style={{
                      fontSize: "15px",
                    }}
                  >
                    CIVIL STATUS
                  </p>
                  <p
                    style={{
                      fontSize: "15px",
                    }}
                  >
                    ADDRESS
                  </p>
                  <p
                    style={{
                      fontSize: "15px",
                    }}
                  >
                    BIRTHDAY
                  </p>
                </div>
                <div>
                  <p>:</p>
                  <p>:</p>
                  <p>:</p>
                  <p>:</p>
                  <p>:</p>
                  <p>:</p>
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "15px",
                      paddingTop: "6px",
                      fontWeight: "bold",
                    }}
                  >
                    {object.name}
                  </p>
                  <p
                    style={{
                      fontSize: "15px",
                    }}
                  >
                    22
                  </p>
                  <p
                    style={{
                      fontSize: "15px",
                    }}
                  >
                    {object.sex}
                  </p>
                  <p
                    style={{
                      fontSize: "15px",
                    }}
                  >
                    {object.civil_status}
                  </p>
                  <p
                    style={{
                      fontSize: "15px",
                    }}
                  >
                    {object.address}
                  </p>
                  <p
                    style={{
                      fontSize: "15px",
                    }}
                  >
                    {new Date(object.birthDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <img
                    src={object.picture}
                    alt=""
                    style={{ width: "125px", height: "125px" }}
                  />
                </div>
              </div>
              <div style={{ paddingLeft: "10px", margin: 0 }}>
                <p style={{ margin: 0, padding: 0 }}>
                  According to records kept in this office, the subject has no
                  pending
                </p>
                <p style={{ margin: 0, padding: 0 }}>
                  {" "}
                  cases. The resident has known to me to be a GOOD MORAL
                  CHARACTER
                </p>
                <p style={{ margin: 0, padding: 0 }}>
                  {" "}
                  and LAW-ABIDING CITIZEN of this community.
                </p>
              </div>
              <div style={{ paddingLeft: "10px" }}>
                <p>This Barangay Clearance is issued upon request for</p>
                <p style={{ textAlign: "center", fontWeight: "bold" }}>
                  WORK APPLICATION
                </p>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateRows: "1fr 1fr",
                    paddingLeft: "10px",
                  }}
                >
                  <p>Given this day, March 7, 2023</p>
                  <div style={{ marginTop: "35px", textAlign: "center" }}>
                    <p
                      style={{
                        margin: 0,
                        padding: 0,
                        textDecoration: "underline",
                        fontWeight: "bold",
                      }}
                    >
                      {object.name}
                    </p>
                    <p style={{ margin: 0, padding: 0 }}>
                      Signature over printed name
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: ".7fr 1fr",
                    paddingLeft: "10px",
                  }}
                >
                  <div
                    style={{
                      border: "1px solid black",
                      height: "100px",
                      width: "100px",
                      fontSize: "10px",
                    }}
                  >
                    LEFT THUMB MARK
                  </div>
                  <div
                    style={{
                      border: "1px solid black",
                      height: "100px",
                      width: "100px",
                      fontSize: "9px",
                    }}
                  >
                    RIGHT THUMB MARK
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateRows: ".5fr .5fr",
              backgroundImage: "url('/Picture1.png')",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              height: "314px",
              width: "807px",
              padding: 0,
              margin: 0,
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div
              style={{ display: "grid", gridTemplateColumns: ".3fr .5fr .5fr" }}
            >
              <div></div>
              <div>
                <p>Prepared by:</p>
                <div>
                  <p style={{ marginBottom: 0 }}>___________________</p>
                  <p>RIZZALYN C. TAMARO</p>
                  <p> Barangay Secretary </p>
                </div>
              </div>
              <div>
                <p>Prepared by:</p>
                <div>
                  <p style={{ marginBottom: 0 }}>___________________</p>
                  <p>CORALYN L. PULIDO</p>
                  <p> Barangay Captain </p>
                </div>
              </div>
            </div>
            <div>
              <p>
                Note: Valid for three (3) months from the Date of Issue. Not
                Valid without Dry Seal.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CertificatePage;
