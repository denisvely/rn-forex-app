// Foo.jsx
import Toast, {
  BaseToast,
  ErrorToast,
  InfoToast,
} from "react-native-toast-message";
import { colors } from "constants";

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
        borderLeftColor: colors.successLighten,
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
};

const CustomToast = () => {
  return <Toast config={toastConfig} />;
};

export default CustomToast;
