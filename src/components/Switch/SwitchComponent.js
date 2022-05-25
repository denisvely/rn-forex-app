import React from 'react';
import PropTypes from 'prop-types';
import {Switch} from 'react-native';
import {colors} from 'constants';

const SwitchComponent = ({style, value, onValueChange, disabled}) => {
	return (
		<Switch
			style={style}
			trackColor={{false: colors.systemColorInactive, true: colors.blueColor}}
			thumbColor={colors.white}
			ios_backgroundColor={colors.systemColorInactive}
			onValueChange={onValueChange}
			value={value}
			disabled={disabled}
		/>
	);
};

SwitchComponent.propTypes = {
	style: PropTypes.object,
	value: PropTypes.bool,
	onValueChange: PropTypes.func,
};

export default SwitchComponent;
