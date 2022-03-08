import ServiceManager, { Service, apiConsts } from "../utils/serviceManager";

export default {
  getServerSettings: () => {
    const service = new Service("v1/merge", apiConsts.HTTP_METHOD_GET);

    service.setPrepareRequest((request) => {
      var game = "",
        resources = {},
        gameType = "",
        optionsCache = null,
        isFirstLoad = true;

      if (!game) {
        game = game.toLowerCase();
      }

      // TODO
      // if (widgets.game && (widgets.game.toLocaleLowerCase() == 'binaryexchange' || widgets.game.toLocaleLowerCase() == 'realforex') || widgets.game.toLocaleLowerCase() == 'easyforex') {
      //     var resources = {};
      //     resources.settings = {};
      //     resources.user = {
      //         id: 'current',
      //         hash: widgets.userhash
      //     }
      //     resources.limitations = {};

      //     if (widgets.game == "EasyForex") {
      //         resources.limitations = { isForex: 'true' };
      //     };

      //     widgets.api.getAnonymousResources(resources, widgets.processResources);

      //     widgets.updateExchangeResources();
      //     widgets.initNotificationStyles();
      //     widgets.isfirstload = false;
      //     return;
      // }; // TODO LATER WHEN I GET WIDGETS.GAME

      if (!optionsCache) {
        resources.games = { created: true };
      }

      if (gameType === "") {
        resources.settings = {};
      }
      // else {
      //     resources.settings = $.extend({}, gameTypeObj);
      // }
      if (isFirstLoad) {
        //invoke the user in order to check if it is logged
        resources.user = {
          id: "current",
          hash: "",
        };
      }

      if (isFirstLoad) {
        //get the users limitations if the user is logged
        resources.limitations = {};
      }

      var options = {
        token: ServiceManager.getAccessToken(),
        resources: JSON.stringify(resources),
      };
      request.setQueryParameters(options);

      return request;
    });

    return service;
  },
};
