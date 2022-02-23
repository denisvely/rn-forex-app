import React from 'react';
import PropTypes from 'prop-types';
import {Text} from 'react-native';

import styles from './typographyStyles';
import colors from "../../constants/colors";

const Typography = ({
	name = 'normal',
	text = null,
	linesNumber = null,
	style,
	children,
	color = colors.primaryColorNight,
	onPress,
	...reset
}) => {
	return (
		<Text
			style={{...styles[name], color, ...style}}
			onPress={onPress}
			{...reset}
			numberOfLines={linesNumber}>
			{text !== null ? `${text}` : children}
		</Text>
	);
};

Typography.propTypes = {
	name: PropTypes.string,
	text: PropTypes.string,
	style: PropTypes.object,
	children: PropTypes.any,
	onPress: PropTypes.func,
	color: PropTypes.string,
	linesNumber: PropTypes.number || null,
};

export default Typography;
