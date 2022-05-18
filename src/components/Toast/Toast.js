// Foo.jsx
import Toast, {
  BaseToast,
  ErrorToast,
  InfoToast,
} from "react-native-toast-message";
import { colors } from "constants";
import { View } from "react-native";
import { Typography } from "../../components";
import { deviceWidth } from "../../utils";

const toastConfig = {
  /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
  */
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: colors.successLighten,
        backgroundColor: colors.successLighten,
      }}
      contentContainerStyle={{
        borderRadius: 4,
        paddingHorizontal: 8,
        justifyContent: "center",
        alignItems: "center",
      }}
      text1Style={{
        fontSize: 12,
        textAlign: "center",
        color: colors.success,
      }}
      text2Style={{
        fontSize: 12,
        textAlign: "center",
        color: colors.success,
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props) => (
    <ErrorToast
      style={{
        backgroundColor: colors.errorLighten,
        borderLeftColor: colors.errorLighten,
      }}
      contentContainerStyle={{
        borderRadius: 4,
        paddingHorizontal: 8,
        justifyContent: "center",
        alignItems: "center",
      }}
      {...props}
      text1Style={{
        fontSize: 12,
        textAlign: "center",
        color: colors.error,
      }}
      text2Style={{
        fontSize: 12,
        textAlign: "center",
        color: colors.error,
      }}
    />
  ),
  /*
    Overwrite 'info' type,
    by modifying the existing `InfoToast` component
  */
  info: (props) => (
    <InfoToast
      style={{
        backgroundColor: colors.infoLighten,
        borderLeftColor: colors.infoLighten,
      }}
      contentContainerStyle={{
        borderRadius: 4,
        paddingHorizontal: 8,
        justifyContent: "center",
        alignItems: "center",
      }}
      {...props}
      text1Style={{
        fontSize: 12,
        textAlign: "center",
        color: colors.info,
      }}
      text2Style={{
        fontSize: 12,
        textAlign: "center",
        color: colors.info,
      }}
    />
  ),
  successForex: ({ props }) => {
    return (
      <View
        style={{
          width: deviceWidth - 48,
          backgroundColor: colors.successLighten,
          borderLeftColor: colors.successLighten,
          alignItems: "flex-start",
          justifyContent: "flex-start",
          paddingHorizontal: 16,
          paddingVertical: 16,
          borderRadius: 4,
          zIndex: 9999,
        }}
      >
        <Typography
          name="normal"
          text={props.text1}
          style={{ color: colors.success }}
        />
        <Typography
          name="normal"
          text={props.text2}
          style={{ color: colors.success }}
        />
        {props.text3 ? (
          <Typography
            name="normal"
            text={props.text3}
            style={{ color: colors.success }}
          />
        ) : null}
        {props.text4 ? (
          <Typography
            name="normal"
            text={props.text4}
            style={{ color: colors.success }}
          />
        ) : null}
      </View>
    );
  },
  platformInfoSuccess: ({ props }) => {
    return (
      <View
        style={{
          width: deviceWidth - 48,
          backgroundColor: colors.successLighten,
          borderLeftColor: colors.successLighten,
          alignItems: "flex-start",
          justifyContent: "flex-start",
          paddingHorizontal: 16,
          paddingVertical: 16,
          borderRadius: 4,
        }}
      >
        <Typography
          name="normalBold"
          text={props.text1}
          style={{ color: colors.success }}
        />
        <Typography
          name="small"
          text={props.text2}
          style={{ color: colors.success }}
        />
      </View>
    );
  },
  platformInfoError: ({ props }) => {
    return (
      <View
        style={{
          width: deviceWidth - 48,
          backgroundColor: colors.errorLighten,
          borderLeftColor: colors.errorLighten,
          alignItems: "flex-start",
          justifyContent: "flex-start",
          paddingHorizontal: 16,
          paddingVertical: 16,
          borderRadius: 4,
        }}
      >
        <Typography
          name="normalBold"
          text={props.text1}
          style={{ color: colors.error }}
        />
        <Typography
          name="small"
          text={props.text2}
          style={{ color: colors.error }}
        />
      </View>
    );
  },
};

const CustomToast = () => {
  return <Toast config={toastConfig} />;
};

export default CustomToast;
