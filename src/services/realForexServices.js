import moment from "moment";

import ServiceManager, { Service, apiConsts } from "utils/serviceManager";

export default {
  // getRealForexTradesResults: () => {
  //   const service = new Service(
  //     "v2/users/current/pastTrades/forex/results?",
  //     apiConsts.HTTP_METHOD_GET
  //   );

  //   service.setPrepareRequest(
  //     (request, { fromDate, toDate, positionId, filterTradableAssetId }) => {
  //       let data = {
  //         tradableAssetId:
  //           filterTradableAssetId === undefined ? 0 : filterTradableAssetId,
  //         fromDate: moment(fromDate).format("YYYY-MM-DD") + "T00:00:01",
  //         toDate: moment(toDate).format("YYYY-MM-DD") + "T23:59:59",
  //         limit: 10000,
  //         offset: 0,
  //         sortBy: "OrderDate",
  //         sortOrder: 0,
  //         positionId: positionId === undefined ? null : positionId,
  //       };

  //       request.setHeader(
  //         "Authorization",
  //         `OAuth oauth_token=${ServiceManager.getAccessToken()}`
  //       );
  //       request.convertToQueryParamsWithoutToken(data);

  //       return request;
  //     }
  //   );

  //   return service;
  // },
  // getRealForexTradesOrders: () => {
  //   const service = new Service(
  //     "v2/users/current/pastTrades/forex/orders?",
  //     apiConsts.HTTP_METHOD_GET
  //   );

  //   service.setPrepareRequest(
  //     (request, { fromDate, toDate, positionId, orderId, tradableAssetId }) => {
  //       let data = {
  //         tradableAssetId: tradableAssetId === undefined ? 0 : tradableAssetId,
  //         fromDate: moment(fromDate).format("YYYY-MM-DD") + "T00:00:01",
  //         toDate: moment(toDate).format("YYYY-MM-DD") + "T23:59:59",
  //         limit: 10000,
  //         offset: 0,
  //         sortBy: "OrderDate",
  //         sortOrder: 0,
  //         positionId: positionId === undefined ? null : positionId,
  //         orderId: orderId === undefined ? null : orderId,
  //       };

  //       request.setHeader(
  //         "Authorization",
  //         `OAuth oauth_token=${ServiceManager.getAccessToken()}`
  //       );
  //       request.convertToQueryParamsWithoutToken(data);

  //       return request;
  //     }
  //   );

  //   return service;
  // },
  // getRealForexClosedTrades: () => {
  //   const service = new Service(
  //     "v2/users/current/pastTrades/forex/closedPositions?",
  //     apiConsts.HTTP_METHOD_GET
  //   );

  //   service.setPrepareRequest(
  //     (request, { fromDate, toDate, positionId, tradableAssetId }) => {
  //       let data = {
  //         tradableAssetId: tradableAssetId === undefined ? 0 : tradableAssetId,
  //         fromDate: moment(fromDate).format("YYYY-MM-DD") + "T00:00:01",
  //         toDate: moment(toDate).format("YYYY-MM-DD") + "T23:59:59",
  //         limit: 10000,
  //         action: "all",
  //         offset: 0,
  //         sortBy: "OrderDate",
  //         sortOrder: 0,
  //         useHours: true,
  //         positionId: positionId === undefined ? null : positionId,
  //       };

  //       request.setHeader("Authorization", `OAuth oauth_token=${ServiceManager.getAccessToken()}`);
  //       request.convertToQueryParamsWithoutToken(data);

  //       return request;
  //     }
  //   );

  //   return service;
  // },
  // getRealForexClosedTrades: () => {
  //   const service = new Service("/v1/merge?", apiConsts.HTTP_METHOD_GET);

  //   service.setPrepareRequest((request) => {
  //     let resources = {};

  //     resources.options = {
  //       game: "RealForex",
  //       hash: 0,
  //     };

  //     request.setHeader("Authorization", `OAuth oauth_token=${ServiceManager.getAccessToken()}`);
  //     request.convertToQueryParamsWithoutToken(resources);

  //     return request;
  //   });

  //   return service;
  // },
  getRealForexTradingSettings: () => {
    const service = new Service(
      "/v1/tradingsetting/realforex",
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
  getRealForexAssetSettings: () => {
    let resources = {},
      forexAssetSettings;
    const token = ServiceManager.getAccessToken();

    resources.forexassetsettings = {
      optionType: 24,
    };

    const service = new Service("/v1/merge?", apiConsts.HTTP_METHOD_GET);

    service.setPrepareRequest((request) => {
      request.convertToQueryParams(resources, token);

      return request;
    });

    return service;
  },
  getRealForexPrices: () => {
    let resources = {
      forexPrices: { OptionType: 24 },
    };
    const token = ServiceManager.getAccessToken();

    const service = new Service("/v1/merge?", apiConsts.HTTP_METHOD_GET);

    service.setPrepareRequest((request) => {
      request.convertToQueryParams(resources, token);

      return request;
    });

    return service;
  },
};
