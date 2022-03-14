import React, { useEffect, useState } from "react";
import { View, TextInput } from "react-native";
import { useTranslation } from "react-i18next";
import { SvgXml } from "react-native-svg";

import {
  RealForexTradeButtons,
  MarketPendingButtons,
  QuantityInput,
  TakeProfit,
  StopLoss,
  HeaderAssetInfo,
} from "components";
import { assetIcon } from "../../../assets/svg/assetIcons/assetsIcons";

import styles from "./realForexOrderDetailsStyles";

const RealForexOrderDetails = ({ route, navigation }) => {
  const { t } = useTranslation();
  const asset = route.params.asset;
  const isBuy = route.params.isBuy;

  const [isMarket, setOrderType] = useState(true);
  const [quantity, onChangeQuantity] = useState(null);

  const [takeProfitAmount, onChangeTakeProfitAmount] = useState(null);
  const [takeProfitDistance, onChangeTakeProfitDistance] = useState(null);
  const [stopLossAmount, onChangeStopLossAmount] = useState(null);
  const [stopLossDistance, onChangeStopLossDistance] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderAssetInfo
          assetName={asset.name}
          assetIcon={assetIcon}
          navigation={navigation}
        />
      ),
    });
  }, [route.params.asset]);

  return (
    <View style={styles.container}>
      <MarketPendingButtons
        isMarket={isMarket}
        setOrderType={(orderType) => setOrderType(orderType)}
      />
      <QuantityInput
        value={quantity}
        onChange={(text) => onChangeQuantity(text)}
      />
      <TakeProfit
        takeProfitAmount={takeProfitAmount}
        onChangeTakeProfitAmount={(orderType) =>
          onChangeTakeProfitAmount(orderType)
        }
        takeProfitDistance={takeProfitDistance}
        onChangeTakeProfitDistance={(orderType) =>
          onChangeTakeProfitDistance(orderType)
        }
      />
      <StopLoss
        stopLossAmount={stopLossAmount}
        onChangeStopLossAmount={(orderType) =>
          onChangeStopLossAmount(orderType)
        }
        stopLossDistance={stopLossDistance}
        onChangeStopLossDistance={(orderType) =>
          onChangeStopLossDistance(orderType)
        }
      />
      <RealForexTradeButtons asset={asset} />
    </View>
  );
};

export default RealForexOrderDetails;
