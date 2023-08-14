import React, { Component } from "react";
import BasePage from "../../base/BasePage";
import NavBar from "../../components/navbar";
import { LogoHolder } from "nq-component";

class WelcomePage extends BasePage {
  render() {
    const user = this.getCurrentUser();
    return (
      <>
        <NavBar />
        <div>
          <div
            className="d-flex m-4 rounded"
            style={{ backgroundColor: "orange" }}
          >
            <div className="m-2">
              <LogoHolder
                className="bg-white"
                textClassName="text-dark"
                logo={user.picture}
                name={user.username}
              />
            </div>

            <div className=" mt-4">
              <h6>Welcome,</h6>
              <h6>{user.email}</h6>
            </div>

            <div className="flex-grow-1 d-flex align-items-center justify-content-end p-3">
              <div className="d-flex align-items-center flex-column">
                <i className="bi bi-sliders"></i>
                <p className="mb-0">Account</p>
              </div>
            </div>
          </div>

          <div></div>
        </div>
      </>
    );
  }
}

export default WelcomePage;
