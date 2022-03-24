import moment from "moment";
import ServiceManager, {Service, apiConsts} from "../utils/serviceManager";

export default {
    getSimplexOpenTrades: () => {
        const service = new Service("v1/merge", apiConsts.HTTP_METHOD_GET);

        let resources = {};
        resources.forexOpenTrades = {};
        resources.forexOpenTrades = {
            includeOffers: true,
            filterByOptionType: "forex,harealforex",
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
            orderId: null,
            tradeId: null,
            fromDate: null,
            toDate: null,
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
    cancelOpenPosition: (positionId) => {
        const service = new Service('v1/games/forex/orders/closeForexTrade',
            apiConsts.HTTP_METHOD_GET
        );

        let options = {}
        options.orderId = positionId

        service.setPrepareRequest((request) => {
            request.setHeader(
                "Authorization",
                `OAuth oauth_token=${ServiceManager.getAccessToken()}`
            );

            request.setQueryParameters(options);

            return request;
        });

        return service;
    },
    cancelPendingOrder: (orderId) => {
        const service = new Service(`v1/games/forex/pendingorders/cancel/${orderId}/18`,
            apiConsts.HTTP_METHOD_PUT
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
    getSimplexClosedPositions: () => {
        const service = new Service(
            "v2/users/current/pastTrades",
            apiConsts.HTTP_METHOD_GET
        );

        service.setPrepareRequest(
            (request, {fromDate, toDate}) => {
                let data = {
                    tradableAssetId: 0,
                    fromDate: moment(fromDate).format("YYYY-MM-DD") + "T00:00:01",
                    toDate: moment(toDate).format("YYYY-MM-DD") + "T23:59:59",
                    game: 18,
                    limit: 10000,
                    action: "all",
                    offset: 0,
                    sortBy: "OrderDate",
                    sortDir: '0',
                    sortOrder: 0,
                    showFilter: 0,
                    useHours: true,
                    includeForexTrades: true,
                    isKnockin: false,
                    tradeId: null,
                    orderId: null,
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
