import moment from "moment";
import ServiceManager, { Service, apiConsts } from "../utils/serviceManager";

export default {
  getRealForexOpenTrades: () => {
    const service = new Service("v1/merge", apiConsts.HTTP_METHOD_GET);

    var resources = {};
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
  getRealForexPendingOrders: () => {
    const service = new Service(
      "v2/users/current/forexpendingorders",
      apiConsts.HTTP_METHOD_GET
    );

    let resources = {
      offset: "0",
      limit: "100",
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
  getRealForexClosedPositions: () => {
    const service = new Service(
      "v2/users/current/pastTrades/forex/closedPositions",
      apiConsts.HTTP_METHOD_GET
    );

    const accessToken = ServiceManager.getAccessToken();

    service.setPrepareRequest(
      (request, { fromDate, toDate, positionId, tradableAssetId }) => {
        let data = {
          tradableAssetId: tradableAssetId === undefined ? 0 : tradableAssetId,
          fromDate: moment(fromDate).format("YYYY-MM-DD") + "T00:00:01",
          toDate: moment(toDate).format("YYYY-MM-DD") + "T23:59:59",
          limit: 10000,
          action: "all",
          offset: 0,
          sortBy: "OrderDate",
          sortOrder: 0,
          useHours: true,
          positionId: positionId === undefined ? null : positionId,
        };

        request.setHeader("Authorization", `OAuth oauth_token=${accessToken}`);

        request.setQueryParameters(data);

        return request;
      }
    );

    return service;
  },
  getRealForexTradingSettings: () => {
    const service = new Service(
      "v1/tradingsetting/realforex",
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

    resources.forexassetsettings = {
      optionType: 24,
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
  getRealForexPrices: () => {
    let resources = {
      forexPrices: { OptionType: 24 },
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
  getRealForexSwapRates: () => {
    const service = new Service(
      "v1/assets/forexswaprates",
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
  getRealForexOptions: () => {
    const service = new Service("v1/merge", apiConsts.HTTP_METHOD_GET);

    let resources = {};

    resources.options = {
      game: "RealForex",
      hash: "",
    };
    resources.balanceRealForex = {};

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
  getRealForexAssetsOrder: () => {
    const service = new Service(
      "v1/tradingsetting/rearrangement?optionType=24",
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

  updateAssetOrder: () => {
    const service = new Service(
      "v1/tradingsetting/rearrangement?optionType=24",
      apiConsts.HTTP_METHOD_POST
    );

    service.setPrepareRequest((request, { id, posFrom, posTo, game, fav }) => {
      let options = {};

      options["TAID"] = id;
      options["positionFrom"] = posFrom;
      options["positionTo"] = posTo;
      options["optionType"] = game;
      options["IsFavorite"] = fav;

      request.setHeader(
        "Authorization",
        `OAuth oauth_token=${ServiceManager.getAccessToken()}`
      );
      request.convertToQueryParamsWithoutToken(options);

      return request;
    });

    return service;
  },
  getRealForexNotifications: () => {
    const service = new Service(
      "v1/users/tradeNotification/getAll/24",
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
  getRealForexTraderInsight: () => {
    const service = new Service(
      "v1/forextraderInsight",
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
  closePosition: () => {
    const service = new Service(
      "v1/games/forex/orders/closeForexTrade",
      apiConsts.HTTP_METHOD_GET
    );

    service.setPrepareRequest((request, { orderID }) => {
      const options = {};

      options["orderId"] = orderID;

      request.setHeader(
        "Authorization",
        `OAuth oauth_token=${ServiceManager.getAccessToken()}`
      );

      request.setQueryParameters(options);

      return request;
    });

    return service;
  },
  closePositioNetting: () => {
    const service = new Service(
      "v1/games/forex/orders/closeForexTrade",
      apiConsts.HTTP_METHOD_GET
    );

    service.setPrepareRequest((request, { orderID }) => {
      const options = {};

      options["PositionId"] = orderID;
      options["optionType"] = 24;

      request.setHeader(
        "Authorization",
        `OAuth oauth_token=${ServiceManager.getAccessToken()}`
      );

      request.setQueryParameters(options);

      return request;
    });

    return service;
  },
  addRealForexTradeOrderV2: () => {
    const service = new Service(
      "v1/games/forex/orders/closeForexTrade",
      apiConsts.HTTP_METHOD_GET
    );

    service.setPrepareRequest(
      (
        request,
        optionId,
        ruleId,
        isBuy,
        rate,
        volume,
        takeProfit,
        StopLoss,
        leverage,
        TakeProfitDistance,
        StoplossDistance,
        pip,
        pendingPrice,
        slippage,
        orderId,
        expirationDate,
        delay,
        ask,
        bid,
        takeProfitRate,
        stopLossRate
      ) => {
        // if (widgets.tradeOrderInProgress) {
        //     $(window).trigger(widgets.events.tradeInProgress);
        //     return;
        // // }

        // widgets.tradeOrderInProgress = true;

        const options = {
          TradableAssetId: optionId,
          ForexRuleID: ruleId,
          Rate: rate,
          Volume: volume,
          TakeProfit: takeProfit,
          StopLoss: StopLoss,
          IsBuy: isBuy,
          Leverage: leverage,
          TakeProfitDistance: TakeProfitDistance,
          StoplossDistance: StoplossDistance,
          Pip: pip,
          PendingPrice: pendingPrice || 0,
          Slippage: slippage || false,
          OrderId: orderId,
          OptionType: 24,
          ExpirationDate: expirationDate,
          qDelay: delay,
          askPrice: ask,
          bidPrice: bid,
          TakeProfitRate: takeProfitRate,
          StopLostRate: stopLossRate,
        };

        // widgets.api.setTradeStarted(options);

        request.setHeader(
          "Authorization",
          `OAuth oauth_token=${ServiceManager.getAccessToken()}`
        );

        request.setQueryParameters(options);

        return request;
      }
    );

    return service;
  },
};
