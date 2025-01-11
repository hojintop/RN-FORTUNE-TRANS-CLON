import LottieView from "lottie-react-native";
import { useEffect, useRef } from "react";
import { View } from "react-native";

export default () => {
//   const ref = useRef(null);

//   useEffect(() => {
//     setTimeout(() => {
//       ref.current?.play();
//     }, 1000);
//   }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <LottieView
        autoPlay
        // ref={ref}
        style={{
          width: 200,
          height: 200,
        }}
        source={require("../assets/loading.json")}
      />
    </View>
  );
};
