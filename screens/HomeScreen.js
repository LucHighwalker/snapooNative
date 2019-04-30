import React from "react";
import {
  Text,
	Image,
	Animated,
	StyleSheet,
	Dimensions,
	View,
	PanResponder
} from "react-native";

const requests = [
	{ name: "hi", image: require("../assets/images/0.jpg") },
	{ name: "hi", image: require("../assets/images/1.jpg") },
	{ name: "hi", image: require("../assets/images/2.jpg") },
	{ name: "hi", image: require("../assets/images/3.jpg") }
];

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

export default class HomeScreen extends React.Component {
	static navigationOptions = {
		header: null
	};

	constructor() {
		super();

    this.position = new Animated.ValueXY();
    this.rotate = this.position.x.interpolate({
      inputRange: [-WIDTH / 2, 0, WIDTH / 2],
      outputRange: ['-10deg', '0deg', '10deg'],
      extrapolate: 'clamp'
    })

    this.rotateTranslate = {
      transform: [
        {
          rotate: this.rotate
        },
        ...this.position.getTranslateTransform()
      ]
    }

		this.state = {
			index: 0
    }
	}

	componentWillMount() {
		this.PanResponder = PanResponder.create({
			onStartShouldSetPanResponder: (evt, gestureState) => true,
			onPanResponderMove: (evt, gestureState) => {
				this.position.setValue({
					x: gestureState.dx,
					y: gestureState.dy
				});
			},
			onPanResponderRelease: (evt, gestureState) => {}
		});
	}

	renderRequests = () => {
		return requests
			.map(({ name, image }, index) => {
        let panResponder = {}
        let position = {}

        if (index < this.state.index) {
          return null
        } else if (index === this.state.index) {
          panResponder = this.PanResponder.panHandlers
          position = this.rotateTranslate;
        }

				return (
					<Animated.View
						{...panResponder}
						key={index}
						style={[
							position,
							{
								position: "absolute",
								height: HEIGHT - 120,
								width: WIDTH,
								padding: 10,
								paddingTop: 40
							}
						]}
					>
            <Animated.View style={{position: 'absolute', top: 50, left: 50, zIndex: 100}}>
              <Text style={{
                borderWidth: 1,
                borderColor: 'green',
                color: 'green',
                fontSize: 32,
                fontWeight: '800',
                padding: 10
              }}>Like</Text>
            </Animated.View>
						<Image
							style={{
								flex: 1,
								height: null,
								width: null,
								resizeMode: "cover",
								borderRadius: 20
							}}
							source={image}
						/>
					</Animated.View>
				);
			})
			.reverse();
	};

	render() {
		return (
			<View style={{ flex: 1 }}>
				<View stlye={{ height: 60 }} />
				<View stlye={{ flex: 1 }}>{this.renderRequests()}</View>
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
