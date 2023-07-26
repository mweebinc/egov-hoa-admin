import BaseListPresenter from "../../base/BaseListPresenter";
import map from "./map";

class ResidentListPresenter extends BaseListPresenter {
    constructor(view, findObjectUseCase, deleteObjectUseCase, aggregateUseCase) {
        super(view, findObjectUseCase, deleteObjectUseCase);
        this.aggregateUseCase = aggregateUseCase;
        this.match = {};
    }

    componentDidMount() {
        this.init();
        this.getObjects();
    }

    init() {
        this.limit = 20;
        this.current = 1;
        this.where = {};
        this.objects = [];
        this.sort = {createdAt: -1};
        this.view.setObjects([]);
        this.view.setSelected([]);
        this.view.setHoaOfficial([]);
        this.official = [];
        this.logo = [];
    }

    onClickFilterStatus(match) {
        this.current = 1;
        this.objects = [];
        this.view.setObjects([]);
        this.view.setSelected([]);
        this.match = match;
        this.getObjects();
    }

    onClickItem(index) {
        const object = this.objects[index];
        const collection = this.view.getCollectionName();
        this.view.navigateTo("/collection/" + collection + "/form/" + object.id);
    }

    async getObjects() {
        const collection = this.view.getCollectionName();
        const collection2 = "hoa_officials";
        const collection3 = "hoa";
        const user = this.view.getCurrentUser();
        const skip = (this.current - 1) * this.limit;
        if (user.hoa) {
            this.match["hoa._id"] = user.hoa.id;
        }
        const pipeline = [
            {
                $match: this.where,
            },
            {
                $lookup: {
                    from: "barangay",
                    localField: "barangay._id",
                    foreignField: "_id",
                    as: "barangay",
                },
            },
            {
                $lookup: {
                    from: "hoa",
                    localField: "hoa._id",
                    foreignField: "_id",
                    as: "hoa",
                },
            },
            {
                $lookup: {
                    from: "payments",
                    localField: "_id",
                    foreignField: "resident._id",
                    as: "payments",
                },
            },
            {
                $addFields: {
                    payments: {
                        $filter: {
                            input: "$payments",
                            as: "payment",
                            cond: {
                                $eq: ["$$payment.status", "COMPLETED"],
                            },
                        },
                    },
                },
            },
            {
                $addFields: {
                    last_payment: {
                        $max: "$payments.date",
                    },
                },
            },
            {
                $addFields: {
                    current_date: {
                        $dateFromString: {
                            dateString: {
                                $dateToString: {
                                    format: "%Y-%m-%d",
                                    date: "$$NOW",
                                },
                            },
                            timezone: "UTC",
                        },
                    },
                },
            },
            {
                $addFields: {
                    last_payment_month: {
                        $add: [
                            {
                                $multiply: [
                                    {
                                        $subtract: [
                                            {$year: "$current_date"},
                                            {$year: "$last_payment"},
                                        ],
                                    },
                                    12,
                                ],
                            },
                            {
                                $subtract: [
                                    {$month: "$current_date"},
                                    {$month: "$last_payment"},
                                ],
                            },
                        ],
                    },
                },
            },
            {
                $addFields: {
                    status: {
                        $cond: {
                            if: {
                                $eq: ["$last_payment_month", null],
                            },
                            then: "DELINQUENT",
                            else: {
                                $cond: {
                                    if: {
                                        $eq: ["$last_payment_month", 0],
                                    },
                                    then: "MIGS",
                                    else: {
                                        $cond: {
                                            if: {
                                                $gte: ["$last_payment_month", 3],
                                            },
                                            then: "DELINQUENT",
                                            else: "DUE",
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            {
                $match: this.match,
            },
            {$skip: skip},
            {$limit: this.limit},
        ];
        const query = {
            count: true,
            limit: 1,
            where: {...this.where},
        };
        const query2 = {
            count: true,
            limit: this.limit,
            skip: skip,
            where: this.where,
            include: ["all"],
            sort: this.sort,
        };

        if (user.hoa) {
            query.where["hoa"] = {id: user.hoa.id, ...this.where};
        }
        try {
            this.view.showProgress();
            const objects = await this.aggregateUseCase.execute(collection, pipeline);
            this.objects = this.objects.concat(objects.map(map));
            const {count} = await this.findObjectUseCase.execute(collection, query);
            const official = await this.findObjectUseCase.execute(
                collection2,
                query2
            );
            const hoaLogo = await this.findObjectUseCase.execute(collection3, query2);

            this.official = this.official.concat(official);
            this.logo = this.logo.concat(hoaLogo);

            this.view.setObjects(this.objects);
            this.view.setHoaOfficial(this.official);
            this.view.setHoaLogo(this.logo);
            this.view.setCount(count);
            this.view.hideProgress();
        } catch (error) {
            this.view.hideProgress();
            this.view.showError(error);
        }
    }
}

export default ResidentListPresenter;
