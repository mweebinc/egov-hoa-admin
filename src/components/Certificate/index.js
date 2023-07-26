import React from "react";

const defaultProps = {
    logo1: '/logo.png',
    logo2: '/logo.png',
    headers: ['Republic of the Philippines', 'Province of Cavite', 'CITY OF BACOOR'],
    subtitle: 'BARANGAY TALABA IV',
    title: 'BARANGAY CLEARANCE',
    officials: [],
    background: '',
    resident: {},
    purpose: 'WORK APPLICATION',
    details: 'According to records kept in this office, the subject has no pending cases. The resident has known to me to be a GOOD MORAL CHARACTER and LAW-ABIDING CITIZEN of this community.'
}

function CertificatePage({logo1, logo2, headers, subtitle, title, details, purpose, object, official}) {
    return (
        <div className="p-3">
            <div
                className="d-flex justify-content-between p-3">
                <div>
                    <img
                        className="rounded-circle"
                        src={logo1}
                        alt="Logo 1"
                        width="125px"
                        height="125px"
                    />
                </div>
                <div className="text-center">
                    {
                        headers.map((header, index) => (
                            <p key={index} className="mb-0">
                                {header}
                            </p>
                        ))
                    }
                    <p className="fw-bold">
                        {subtitle}
                    </p>
                </div>
                <div>
                    <img
                        className="rounded-circle"
                        src={logo2}
                        alt="Logo 2"
                        width="125px"
                        height="125px"
                    />
                </div>
            </div>
            <div className="text-center">
                <h2>{title}</h2>
            </div>
            <div className="d-flex">
                <div
                    className="text-center">
                    {official.map((o) => {
                        return (
                            <div
                                className="border p-3"
                                key={o.id}>
                                {o.objects.map((o) => (
                                    <div className="text-nowrap">
                                        <h6
                                            className="m-0 fw-bold">
                                            {o.name}
                                        </h6>
                                        <p
                                            style={{
                                                fontSize: "10px",
                                            }}>
                                            {o.position}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>
                <div>
                    <div className="text-center">
                        <h5 className="fw-bold">MANZANA, MARY KEM, MERIDA</h5>
                    </div>
                    <div className="mt-3 position-relative">
                        <div className="position-absolute" style={{right: 50, top: -10}}>
                            <img
                                src={object.picture}
                                alt="resident picture"
                                style={{width: "125px", height: "125px"}}
                            />
                        </div>
                    </div>
                    <div className="d-flex px-4">
                        <div className="d-flex justify-content-between w-100">
                            <div>
                                <p>AGE</p>
                                <p>GENDER</p>
                                <p>CIVIL STATUS</p>
                                <p>ADDRESS</p>
                            </div>
                            <div className="col-1 px-4">
                                <p>:</p>
                                <p>:</p>
                                <p>:</p>
                                <p>:</p>
                            </div>
                            <div className="col">
                                <p>29</p>
                                <p>FEMALE</p>
                                <p>SINGLE</p>
                                <p>TALABA VII, BACOOR CITY, CAVITE</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-4">
                        <p>{details}</p>
                        <p>This Barangay Clearance is issued upon request for</p>
                        <div className="text-center">
                            <h5 className="fw-bold">{purpose}</h5>
                        </div>
                        <div className="d-flex mt-3">
                            <div>
                                <p>Given this day, <span className="fw-bold">March 7, 2023</span></p>
                                <div className="text-center mt-5">
                                    <p className="fw-bold text-decoration-underline mb-0">
                                        {object.name}
                                    </p>
                                    <p className="mb-0">
                                        Signature over printed name
                                    </p>
                                </div>
                            </div>
                            <div
                                className="ms-5 border text-center"
                                style={{
                                    height: "100px",
                                    width: "100px",
                                    fontSize: "10px",
                                }}>
                                <span>LEFT THUMB</span>
                            </div>
                            <div
                                className="ms-2 border text-center"
                                style={{
                                    height: "100px",
                                    width: "100px",
                                    fontSize: "10px",
                                }}>
                                <span>RIGHT THUMB</span>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-between p-4">
                        <div>
                            <p>Prepared by:</p>
                            <div className="border-top border-black mt-5">
                                <p className="mb-0">RIZZALYN C. TAMARO</p>
                                <p className="fst-italic">Barangay Secretary</p>
                            </div>
                        </div>
                        <div>
                            <p>Prepared by:</p>
                            <div className="border-top border-black mt-5">
                                <p className="mb-0">RENATO C. DIZON</p>
                                <p className="fst-italic">Barangay Captain</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="text-center">
                <p className="fst-italic">
                    Note: Valid for three (3) months from the Date of Issue. Not
                    Valid without Dry Seal.
                </p>
            </div>
        </div>
    )
}

CertificatePage.defaultProps = defaultProps;
export default CertificatePage;
