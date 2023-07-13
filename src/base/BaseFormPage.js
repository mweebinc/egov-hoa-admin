import BasePage from "./BasePage";

class BaseFormPage extends BasePage {
    componentDidMount() {
        this.presenter.componentDidMount();
    }

    getCollectionName() {
        return this.props.params.name;
    }

    getObjectId() {
        return this.props.params.id;
    }

    onSubmitForm(e) {
        e.preventDefault();
        this.presenter.submit();
    }

    getObject() {
        return this.state.object;
    }

    onClickBack() {
        this.presenter.onClickBack();
    }


    setObject(object) {
        this.setState({object});
    }

    onChange(value, field) {
        this.presenter.onChange(value, field);
    }

    getAcl() {
        const roles = this.getCurrentRoles();
        const aclRoles = roles.map(r => `role:${r.name}`);
        const user = this.getCurrentUser();
        return {
            read: ['*', user.id, ...aclRoles],
            write: [user.id, ...aclRoles],
        };
    }
}

export default BaseFormPage;
