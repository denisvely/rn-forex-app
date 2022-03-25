import React, { useEffect, useRef } from "react";
import { View, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import SlidingUpPanel from "rn-sliding-up-panel";

import { deviceHeight } from "../../utils";
import TakeProfit from "../../components/RealForex/TakeProfit/TakeProfit";
import StopLoss from "../../components/RealForex/StopLoss/StopLoss";
import Button from "../../components/Button/Button";
import styles from "./bottomSlidingPanelStyles";
import ClosePositionPanel from "./components/ClosePositionPanel";

const velocity = 0.1;

const types = {
  ["tpAndSl"]: {
    panelHeight: deviceHeight - 400,
  },
  ["closePosition"]: {
    panelHeight: deviceHeight / 3,
  },
};

const BottomSlidingPanel = ({
  panelType,
  toggleSlidingPanel,
  item,
  children,
}) => {
  let isFirstLoad = true;
  const slidingPanel = useRef();
  const { t } = useTranslation();

  useEffect(() => {
    if (!panelType) {
      slidingPanel.current.hide();
    } else {
      slidingPanel.current.show(types[panelType]?.panelHeight, 0.1);
      isFirstLoad = false;
    }
    return () => {
      isFirstLoad = true;
    };
  }, [panelType]);

  const _onBottomReached = (position) => {
    if (!isFirstLoad) {
      toggleSlidingPanel(false);
    }
  };

  return (
    <SlidingUpPanel
      ref={slidingPanel}
      draggableRange={{
        top: panelType ? types[panelType].panelHeight : deviceHeight / 2,
        bottom: 0,
      }}
      snappingPoints={[100]}
      height={panelType ? types[panelType].panelHeight : deviceHeight / 2}
      showBackdrop={true}
      friction={velocity}
      backdropOpacity={0.5}
      onBottomReached={_onBottomReached}
    >
      {({ onResponderRelease, ...dragHandler }) => {
        return (
          <View style={styles.container}>
            <View
              style={{
                ...styles.slidingLineWrapper,
              }}
              {...dragHandler}
              onResponderRelease={(e) => {
                onResponderRelease(e);
              }}
            >
              <View style={styles.slidingLine}></View>
            </View>
            <View style={styles.containerInner}>
              {panelType === "tpAndSl" ? (
                <>
                  <TakeProfit />
                  <StopLoss />
                  <Button
                    text={t(`common-labels.modify`)}
                    type="primary"
                    font="mediumBold"
                    size="almostBig"
                  />
                </>
              ) : null}
              <ClosePositionPanel
                trade={item}
                toggleSlidingPanel={() => toggleSlidingPanel(false)}
              />
              {children ? children : null}
            </View>
          </View>
        );
      }}
    </SlidingUpPanel>
  );
};

export default BottomSlidingPanel;
