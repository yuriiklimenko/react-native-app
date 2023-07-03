import PropTypes from "prop-types";
import { View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

export const Loading = ({ loading, title }) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
      }}
    >
      <Spinner
        visible={loading}
        textContent={title}
        textStyle={{ color: "#FFF" }}
      />
    </View>
  );
};

Loading.propTypes = {
  loading: PropTypes.bool.isRequired,
  title: PropTypes.string,
};
