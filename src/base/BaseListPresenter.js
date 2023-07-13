class BaseListPresenter {
    constructor(view, findObjectUseCase, deleteObjectUseCase) {
        this.view = view;
        this.findObjectUseCase = findObjectUseCase;
        this.deleteObjectUseCase = deleteObjectUseCase;
    }

    componentDidMount() {
        this.init();
        this.getObjects();
    }

    init() {
        this.limit = 10;
        this.current = 1;
        this.where = {};
        this.objects = [];
        this.sort = {createdAt: -1};
        this.view.setObjects([]);
        this.view.setSelected([]);
    }

    async getObjects() {
        const collection = this.view.getCollectionName();
        const skip = (this.current - 1) * this.limit;
        const query = {
            count: true,
            limit: this.limit,
            skip: skip,
            where: this.where,
            include: ['all'],
            sort: this.sort
        };
        this.view.showProgress();
        try {
            const {count, objects} = await this.findObjectUseCase.execute(collection, query);
            this.objects = this.objects.concat(objects);
            this.view.setCount(count);
            this.view.setObjects(this.objects);
            this.view.hideProgress();
        } catch (error) {
            this.view.hideProgress();
            this.view.showError(error);
        }
    }

    onClickEditItem(index) {
        const object = this.objects[index];
        const collection = this.view.getCollectionName();
        this.view.navigateTo("/collection/" + collection + "/form/" + object.id);
    }

    onSelect(index) {
        const selectedObjects = this.view.getSelected();
        const selected = this.objects[index];
        const i = selectedObjects.indexOf(selected);
        if (i > -1) {
            selectedObjects.splice(i, 1);
        } else {
            selectedObjects.push(selected);
        }
        this.view.setSelected(selectedObjects);
    }

    searchSubmit(where) {
        this.init();
        this.where = where;
        this.getObjects();
    }

    loadMore() {
        this.current++;
        this.getObjects();
    }

    onSelectAll(checked) {
        if (checked) {
            this.view.setSelected([...this.objects]);
        } else {
            this.view.setSelected([]);
        }
    }

    onClickItem(index) {
        const object = this.objects[index];
        const collection = this.view.getCollectionName();
        this.view.navigateTo("/collection/" + collection + "/form/" + object.id);
    }

    onClickAdd() {
        const collection = this.view.getCollectionName();
        this.view.navigateTo("/collection/" + collection + "/form");
    }

    async onClickDeleteSelected() {
        const selected = this.view.getSelected();
        const collection = this.view.getCollectionName();
        try {
            await this.view.showDialog({title: 'Delete Data?', message: 'Are you sure you want to delete?'});
            for (const obj of selected) {
                await this.deleteObjectUseCase.execute(collection, obj.id);
                const index = this.objects.indexOf(obj);
                this.objects.splice(index, 1);
                this.view.setObjects(this.objects);
            }
            this.view.setSelected([]);
        } catch (error) {
            this.view.hideProgress();
            this.view.showError(error);
        }
    }
}

export default BaseListPresenter;