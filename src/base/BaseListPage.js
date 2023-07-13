import BasePage from "./BasePage";

class BaseListPage extends BasePage {

    getCollectionName() {
        return this.props.params.name;
    }

    componentDidMount() {
        this.presenter.componentDidMount();
    }

    onClickAdd() {
        this.presenter.onClickAdd();
    }

    onClickDeleteSelected() {
        this.presenter.onClickDeleteSelected();
    }

    getSelected() {
        return this.state.selected;
    }

    setSelected(selected) {
        this.setState({selected});
    }

    setObjects(objects) {
        this.setState({objects});
    }

    getObjects() {
        return this.state.objects;
    }

    loadMore() {
        this.presenter.loadMore();
    }

    searchSubmit(query) {
        this.presenter.searchSubmit(query);
    }

    setCount(count) {
        this.setState({count});
    }

    onSelect(index) {
        this.presenter.onSelect(index);
    }

    onSelectAll(checked) {
        this.presenter.onSelectAll(checked);
    }
    onClickItem(index, field) {
        this.presenter.onClickItem(index, field);
    }
}

export default BaseListPage;