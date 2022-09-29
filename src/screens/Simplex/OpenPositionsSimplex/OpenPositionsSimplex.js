import React, { useRef, useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";

import { getSimplexOpenPositions } from "../../../store/simplex";
import { deviceWidth } from "../../../utils";
import {
  LazyFlatList,
  OpenPositionsSimplexTradeBox,
  BottomSlidingPanel,
  Typography,
} from "../../../components";
import simplexServices from "../../../services/simplexServices";
import styles from "./openPositionsSimplexStyles";

const closePosition = simplexServices.cancelOpenPosition();

const OpenPositionsSimplex = ({ navigation }) => {
  const dispatch = useDispatch();
  const [slidingPanelType, setPanelType] = useState(null);
  const [currentTrade, setCurrentTrade] = useState(null);
  const openPositionsRef = useRef();
  const openPositions = useSelector((state) => getSimplexOpenPositions(state));

  const cancelSimplexOpenPosition = (id) => {
    closePosition
      .fetch({ positionId: id })
      .then(({ response }) => {
        if (response.code == 200) {
          Toast.show({
            type: "success",
            text1: "Position closed",
            topOffset: 100,
            visibilityTime: 3000,
            autoHide: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      {openPositions && openPositions.length > 0 ? (
        <LazyFlatList
          list={openPositions}
          renderItem={({ item }) => {
            return (
              <OpenPositionsSimplexTradeBox
                item={item}
                toggleBottomSlidingPanel={(type) => setPanelType(type)}
                setCurrentTrade={(trade) => setCurrentTrade(trade)}
                navigation={navigation}
                cancelPosition={cancelSimplexOpenPosition}
              />
            );
          }}
          keyExtractor={(item) => item.orderID}
          showsVerticalScrollIndicator={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            width: deviceWidth,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            paddingBottom: 100,
          }}
          style={styles.flatListContainer}
          listRef={openPositionsRef}
        />
      ) : (
        <View style={styles.noTrades}>
          <Typography name="largeBold" text={"No trades found."} />
        </View>
      )}
      <BottomSlidingPanel
        panelType={slidingPanelType}
        item={currentTrade}
        setCurrentTrade={(trade) => setCurrentTrade(trade)}
        toggleSlidingPanel={() => setPanelType(false)}
      />
    </View>
  );
};

export default OpenPositionsSimplex;
