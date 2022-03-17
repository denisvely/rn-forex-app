import React, { useEffect, useRef } from "react";
import { View } from "react-native";

import SlidingUpPanel from "rn-sliding-up-panel";

import { deviceHeight } from "../../utils";
import { TakeProfit, StopLoss } from "components";
import styles from "./bottomSlidingPanelStyles";
import Balance from "../../screens/RealForex/Balance/Balance";

const panelHeight = deviceHeight - 400;
const velocity = 0.1;
let isFirstLoad = true;

const BottomSlidingPanel = ({ isVisible, toggleSlidingPanel, children }) => {
  const slidingPanel = useRef();

  useEffect(() => {
    if (!isVisible) {
      slidingPanel.current.hide();
    } else {
      slidingPanel.current.show(panelHeight, 0.1);
      isFirstLoad = false;
    }
    return () => {
      isFirstLoad = true;
    };
  }, [isVisible]);

  const _onBottomReached = (position) => {
    if (!isFirstLoad) {
      toggleSlidingPanel(false);
    }
  };

  return (
    <SlidingUpPanel
      ref={slidingPanel}
      draggableRange={{ top: panelHeight, bottom: 0 }}
      snappingPoints={[100]}
      height={deviceHeight - 400}
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
              {isVisible === "tpAndSl" ? (
                <>
                  <TakeProfit />
                  <StopLoss />
                </>
              ) : null}
              {children ? children : null}
            </View>
          </View>
        );
      }}
    </SlidingUpPanel>
  );
};

export default BottomSlidingPanel;
