import moment from "moment";
import ServiceManager, {Service, apiConsts} from "../utils/serviceManager";

export default {
    getSimplexOpenTrades: () => {
        const service = new Service("v1/merge", apiConsts.HTTP_METHOD_GET);

        let resources = {};
        resources.forexOpenTrades = {};
        resources.forexOpenTrades = {
            includeOffers: true,
            filterByOptionType: "forex",
        };

        service.setPrepareRequest((request) => {
            let options = {
                token: ServiceManager.getAccessToken(),
                resources: JSON.stringify(resources),
            };

            request.setQueryParameters(options);

            return request;
        });

        return service;
    },
    getSimplexPendingOrders: () => {
        const service = new Service(
            "v1/users/current/simplexPendingOrders",
            apiConsts.HTTP_METHOD_GET
        );

        let resources = {
            orderId: '',
            tradeId: '',
            fromDate: '',
            toDate: '',
            offset: 0,
            limit: 1000,
            tradableAssetId: 0,
            showOnlyActive: true
        };

        service.setPrepareRequest((request) => {
            request.setHeader(
                "Authorization",
                `OAuth oauth_token=${ServiceManager.getAccessToken()}`
            );

            request.setQueryParameters(resources);

            return request;
        });

        return service;
    },
    getSimplexClosedPositions: () => {
        const service = new Service(
            "v2/users/current/pastTrades",
            apiConsts.HTTP_METHOD_GET
        );

        service.setPrepareRequest(
            (request, {fromDate, toDate, tradableAssetId}) => {
                let data = {
                    tradableAssetId: tradableAssetId === undefined ? 0 : tradableAssetId,
                    fromDate: moment(fromDate).format("YYYY-MM-DD") + "T00:00:01",
                    toDate: moment(toDate).format("YYYY-MM-DD") + "T23:59:59",
                    game: 18,
                    limit: 10000,
                    action: "all",
                    offset: 0,
                    sortBy: "OrderDate",
                    sortDir: 0,
                    sortOrder: 0,
                    showFilter: 0,
                    useHours: true,
                    includeForexTrades: true,
                    isKnockin: false,
                    tradeId: '',
                    orderId: '',
                };

                request.setHeader(
                    "Authorization",
                    `OAuth oauth_token=${ServiceManager.getAccessToken()}`
                );

                request.setQueryParameters(data);

                return request;
            }
        );

        return service;
    },
    getSimplexTradingSettings: () => {
        const service = new Service(
            "v1/tradingsetting/simplex",
            apiConsts.HTTP_METHOD_GET
        );

        service.setPrepareRequest((request) => {
            request.setHeader(
                "Authorization",
                `OAuth oauth_token=${ServiceManager.getAccessToken()}`
            );

            return request;
        });

        return service;
    },
    getSimplexAssetSettings: () => {
        let resources = {};

        resources.forexassetsettings = {
            optionType: 18,
        };

        const service = new Service("v1/merge", apiConsts.HTTP_METHOD_GET);

        service.setPrepareRequest((request) => {
            let options = {
                token: ServiceManager.getAccessToken(),
                resources: JSON.stringify(resources),
            };

            request.setQueryParameters(options);

            return request;
        });

        return service;
    },
    getSimplexPrices: () => {
        let resources = {
            forexPrices: {OptionType: 18},
        };

        const service = new Service("v1/merge", apiConsts.HTTP_METHOD_GET);

        service.setPrepareRequest((request) => {
            let options = {
                token: ServiceManager.getAccessToken(),
                resources: JSON.stringify(resources),
            };

            request.setQueryParameters(options);

            return request;
        });

        return service;
    },
    getSimplexOptions: () => {
        const service = new Service("v1/merge", apiConsts.HTTP_METHOD_GET);

        let resourcesVar = {};

        resourcesVar.options = {
            game: 'Forex',
            hash: '',
        };

        service.setPrepareRequest((request) => {
            let options = {
                token: ServiceManager.getAccessToken(),
                resources: JSON.stringify(resourcesVar),
            };

            request.setQueryParameters(options);

            return request;
        });

        return service;
    },
    getSimplexAssetsOrder: () => {
        const service = new Service(
            "v1/tradingsetting/rearrangement?optionType=18",
            apiConsts.HTTP_METHOD_GET
        );

        service.setPrepareRequest((request) => {
            request.setHeader(
                "Authorization",
                `OAuth oauth_token=${ServiceManager.getAccessToken()}`
            );

            return request;
        });

        return service;
    },
    getSimplexNotifications: () => {
        const service = new Service(
            "v1/users/tradeNotification/getAll/18",
            apiConsts.HTTP_METHOD_GET
        );

        service.setPrepareRequest((request) => {
            request.setHeader(
                "Authorization",
                `OAuth oauth_token=${ServiceManager.getAccessToken()}`
            );

            return request;
        });

        return service;
    }
};
