import React from 'react';
import MainPagePresenter from './MainPagePresenter';
import {Menu} from "nq-component";
import {getAllSchemasUseCase} from '../../usecases/schema/usecases';
import {getCurrentUserUseCase, signOutUseCase} from '../../usecases/user';
import {Routes, Route} from 'react-router-dom';
import {OffCanvas} from 'nq-component';
import CollectionListPage from "../collection-list/CollectionListPage";
import CollectionFormPage from "../collection-form/CollectionFormPage";
import BasePage from "../../base/BasePage";
import NotFoundPage from "../notfound";
import {Layout, Progress, LogoHolder} from "nq-component";
import MigrationPage from "../migration/MigrationPage";
import AccountPage from "../account/AccountPage";
import RoleFormPage from "../role-form/RoleFormPage";
import withRouter from "../../withRouter";
import DashboardPage from "../dashboard/DashboardPage";
import ResidentListPage from "../resident-list/ResidentListPage";
import PaymentListPage from "../payment-list/PaymentListPage";
import HoaFormPage from "../hoa-form/HoaFormPage";

class MainPage extends BasePage {
    constructor(props) {
        super(props);
        this.presenter = new MainPagePresenter(this, getCurrentUserUseCase(), signOutUseCase(), getAllSchemasUseCase());
    }

    componentDidMount() {
        this.presenter.componentDidMount();
    }

    onClickSignOut() {
        this.presenter.onClickSignOut();
    }

    onClickMenu(e, item) {
        e.preventDefault();
        this.navigateTo(item.route);
    }

    render() {
        const user = this.getCurrentUser();
        const schemas = this.getSchemas();
        if (user === undefined || schemas === undefined) {
            return (
                <Progress/>
            )
        }
        const settings = [
            {
                name: "Edit Account",
                route: "/account",
                icon: "bi bi-person-check",
            },
            {
                name: "HOA",
                route: "/form",
                icon: "bi bi-house-gear"
            },
        ];
        const menus = [
            {
                name: "Dashboard",
                route: "/",
                icon: "bi bi-pie-chart"
            },
            {
                name: "Residents",
                route: "/collection/residents",
                icon: "bi bi-people"
            },
            {
                name: "Payments",
                route: "/collection/payments",
                icon: "bi bi-wallet2"
            },
            {
                name: "Settings",
                icon: "bi bi-sliders",
                route: settings,
            }
        ];
        return (
            <Layout>
                <Layout.Context.Consumer>
                    {
                        (value =>
                                <OffCanvas
                                    onSetShow={value.setCollapse}
                                    show={value.collapsed}>
                                    <div className="offcanvas-body">
                                        <nav className="navbar-dark">
                                            <div className="text-center">
                                                <LogoHolder
                                                    className="bg-white"
                                                    textClassName="text-dark"
                                                    logo={user.picture}
                                                    name={user.username}
                                                />
                                                <p className="text-white mt-3">{user.name || user.username}</p>
                                            </div>
                                            <hr className="dropdown-divider bg-light"/>
                                            <Menu
                                                onClickItem={this.onClickMenu.bind(this)}
                                                menus={menus}/>
                                        </nav>
                                    </div>
                                    <div className="m-3">
                                        <button
                                            className="nav-link text-white btn btn-link"
                                            onClick={this.onClickSignOut.bind(this)}>
                                            <i className="bi bi-power"></i>
                                            <span className="ms-2 fw-bold small">Log out</span>
                                        </button>
                                    </div>
                                </OffCanvas>
                        )
                    }
                </Layout.Context.Consumer>
                <main className="vh-100 d-flex flex-column">
                    <Routes>
                        <Route exact path={'/'} element={<DashboardPage/>}/>
                        <Route exact path={'/collection/dashboard'} element={<DashboardPage/>}/>
                        <Route exact path={'/collection/residents'} element={<ResidentListPage/>}/>
                        <Route exact path={'/collection/payments'} element={<PaymentListPage/>}/>
                        <Route exact path={'/collection/:name'} element={<CollectionListPage/>}/>
                        <Route path={'/collection/roles/form'} element={<RoleFormPage/>}/>
                        <Route path={'/collection/roles/form/:id'} element={<RoleFormPage/>}/>
                        <Route path={'/collection/:name/form/'} element={<CollectionFormPage/>}/>
                        <Route path={'/collection/:name/form/:id'} element={<CollectionFormPage/>}/>
                        <Route path={'/migration'} element={<MigrationPage/>}/>
                        <Route path={'/account'} element={<AccountPage/>}/>
                        <Route path={'/form'} element={<HoaFormPage/>}/>
                        <Route element={<NotFoundPage/>}/>
                    </Routes>
                </main>
            </Layout>
        )
    }
}

export default withRouter(MainPage);
