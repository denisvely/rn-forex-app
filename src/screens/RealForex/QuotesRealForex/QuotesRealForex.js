import React, {useState, useRef, memo} from "react";
import {View} from "react-native";
import {useSelector} from "react-redux";
import {getRealForexOptionsByType} from "../../../store/realForex";
import {LazyFlatList, AssetBox, AssetsFilter, Loading} from "../../../components";
import {assetIcon} from "../../../assets/svg/assetIcons/assetsIcons";
import styles from "./quotesStyles";
import {deviceWidth} from "../../../utils";

const Quotes = ({navigation}) => {
    const flatListRef = useRef();
    const realForexOptionsByType = useSelector((state) =>
        getRealForexOptionsByType(state)
    );
    const [activeFilter, setActiveFilter] = useState("All");

    return (
        <View style={styles.container}>
            <AssetsFilter
                activeFilter={activeFilter}
                changeActiveFilter={(translation) => setActiveFilter(translation)}
            />
            {realForexOptionsByType ? (
                <LazyFlatList
                    list={Object.values(realForexOptionsByType[activeFilter])}
                    renderItem={({item, index}) => {
                        return (
                            <AssetBox
                                asset={item}
                                index={index}
                                navigation={navigation}
                                icon={assetIcon}
                            />
                        );
                    }}
                    keyExtractor={(item) => item.id}
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
                    listRef={flatListRef}
                />
            ) : (
                <Loading/>
            )}
        </View>
    );
};

export default memo(Quotes);
