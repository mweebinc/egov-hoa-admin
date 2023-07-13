import React from 'react';
import {signOutUseCase} from "../../usecases/user";
import BasePage from "../../base/BasePage";

class AccessDeniedPage extends BasePage {
    constructor(props) {
        super(props);
        this.signOutUseCase = signOutUseCase();
    }

    onClickLogout() {
        this.signOutUseCase.execute()
            .then(() => {
                this.navigateTo('/signin');
            });
    }

    render() {
        return (
            <div className="vh-100 d-flex align-items-center">
                <div className="container text-center w-50">
                    <i className="bi bi-lock fs-1"/>
                    &nbsp;<h1 className="d-inline">403</h1>
                    <h1>Access Denied</h1>
                    <p>You don't have permission to access this page</p>
                    <button onClick={this.onClickLogout.bind(this)}>Log out</button>
                </div>
            </div>
        );
    }
}

export default AccessDeniedPage;