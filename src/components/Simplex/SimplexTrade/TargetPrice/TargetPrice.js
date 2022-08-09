import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { View } from "react-native";
import Toast from "react-native-toast-message";

import { Typography } from "../../../../components";
import Spinner from "../../../Spinner/Spinner";
import { getSimplexOptionsByType } from "../../../../store/simplex";

import styles from "./targetPriceStyles";

const TargetPrice = ({ targetPrice, setTargetPrice, asset, disabled }) => {
  const { t } = useTranslation();
  const simplexOptionsByType = useSelector((state) =>
    getSimplexOptionsByType(state)
  );

  const onChange = (value) => {
    // TODO -> Ask Orlin
    if (value != "") {
      setTargetPrice(value);
    } else {
      setTargetPrice("");
    }
  };

  return (
    <View style={{ ...styles.inputsWrapper, opacity: disabled ? 0.5 : 1 }}>
      <Typography
        style={styles.label}
        name="normal"
        text={t("easyForex.targetPrice")}
      />
      <View style={styles.quantityInputWrapper}>
        <Spinner
          placeholder={t("easyForex.targetPrice")}
          spinnerValue={targetPrice}
          onSpinnerChange={(value) => onChange(value)}
          step={Math.pow(10, -simplexOptionsByType.All[asset.id].accuracy)}
          accuracy={simplexOptionsByType.All[asset.id].accuracy}
        />
      </View>
    </View>
  );
};

export default TargetPrice;
