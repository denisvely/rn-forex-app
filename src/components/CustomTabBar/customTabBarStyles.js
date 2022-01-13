import {StyleSheet} from 'react-native';
import {colors} from 'constants';

export default StyleSheet.create({
	navigatorContainerTransparent: {
		height: 94,
		width: '100%',
		flexDirection: 'row',
		backgroundColor: colors.primaryColorWhite,
		paddingTop: 14,
		borderTopWidth: 0.5,
		borderTopColor: 'rgba(102, 134, 163, 0.2)',
	},
	iconContainer: {
		height: '100%',
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginVertical: 0,
		paddingVertical: 0,
	},
});
