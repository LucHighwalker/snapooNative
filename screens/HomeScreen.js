import React from "react";
import { Image, Animated, StyleSheet, Dimensions, View } from "react-native";
import { WebBrowser } from "expo";

import ImageResizeMode from "react-native/Libraries/Image/ImageResizeMode";

import { MonoText } from "../components/StyledText";

const requests = [
  { name: "hi", image: require("../assets/images/1.png") },
  { name: "hi", image: require("../assets/images/1.png") },
  { name: "hi", image: require("../assets/images/1.png") },
  { name: "hi", image: require("../assets/images/1.png") }
];

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View stlye={{ height: 60 }} />
        <View stlye={{ flex: 1 }}>
          <Animated.View
            style={{
              height: HEIGHT - 120,
              width: WIDTH,
              padding: 10
            }}
          >
            <Image
              resizeMode={ImageResizeMode.cover}
              style={{
                flex: 1,
                height: null,
                width: null,
                resizeMode: "cover",
                borderRadius: 20
              }}
              source={requests[0].image}
            />
          </Animated.View>
        </View>
        <View stlye={{ height: 60 }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
