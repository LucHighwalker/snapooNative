import React from "react";
import {
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
		this.state = {
			index: 0
		};
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
			.map(({ name, image }, index) => (
				<Animated.View
					{...this.PanResponder.panHandlers}
					key={index}
					style={[
            {
              transform: this.position.getTranslateTransform()
            },
						{
							position: "absolute",
							height: HEIGHT - 120,
							width: WIDTH,
							padding: 10,
							paddingTop: 40
						}
					]}
				>
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
			))
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
