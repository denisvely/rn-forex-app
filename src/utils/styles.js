import {StyleSheet} from 'react-native';

const styles = (custom = {}) => {
	const styleSheet = StyleSheet.create({
		container: {
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center',
			...custom,
		},
	});
	return styleSheet;
};

export default styles;
