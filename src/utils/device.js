import * as Device from 'expo-device';
import Constants from 'expo-constants';

export default {
	deviceId: Constants.installationId,
	brand: Device.brand,
	model: Device.modelName,
	osName: Device.osName,
	osVersion: Device.osVersion,
};
