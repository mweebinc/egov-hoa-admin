import React from "react";

const ResidentCertificate = ({ object }) => {
  console.log("print data", object);
  return (
    <div>
      <div
        className="d-flex justify-content-between m-3"
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          {" "}
          <img
            src="https://cavite.gov.ph/home/wp-content/uploads/Images/CitiesMunicipalities/bacoor.png"
            alt=""
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

          <p className="mb-0">Mambog 2, Bacoor, Cavite</p>
        </div>
        <div>
          <img
            src="https://cavite.gov.ph/home/wp-content/uploads/Images/CitiesMunicipalities/bacoor.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default ResidentCertificate;
