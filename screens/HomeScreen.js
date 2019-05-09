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

import { getRequests } from "../backend";

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
			outputRange: ["-10deg", "0deg", "10deg"],
			extrapolate: "clamp"
		});
		this.acceptOpacity = this.position.x.interpolate({
			inputRange: [-WIDTH / 2, 0, WIDTH / 2],
			outputRange: [0, 0, 1],
			extrapolate: "clamp"
		});
		this.rejectOpacity = this.position.x.interpolate({
			inputRange: [-WIDTH / 2, 0, WIDTH / 2],
			outputRange: [1, 0, 0],
			extrapolate: "clamp"
		});
		this.nextScaleAndOpacity = this.position.x.interpolate({
			inputRange: [-WIDTH / 2, 0, WIDTH / 2],
			outputRange: [1, 0.25, 1],
			extrapolate: "clamp"
		});

		this.rotateTranslate = {
			transform: [
				{
					rotate: this.rotate
				},
				...this.position.getTranslateTransform()
			]
		};

		this.state = {
			index: 1, // change back to 0
			requests: []
		};
	}

	componentWillMount() {
		getRequests("5ca938d677d0070004db47a0")
			.then(requests => {
				this.setState({
					requests
				});
			})
			.catch(error => {
				console.error(error);
			});

		this.PanResponder = PanResponder.create({
			onStartShouldSetPanResponder: (evt, gestureState) => true,
			onPanResponderMove: (evt, gestureState) => {
				this.position.setValue({
					x: gestureState.dx,
					y: gestureState.dy
				});
			},
			onPanResponderRelease: (evt, gestureState) => {
				let x = 0;
				let y = 0;
				let accepted,
					rejected = false;
				if (gestureState.dx > WIDTH / 2) {
					x = WIDTH + 100;
					y = gestureState.dy;
					accepted = true;
					// accept
				} else if (gestureState.dx < -WIDTH / 2) {
					x = -WIDTH - 100;
					y = gestureState.dy;
					rejected = true;
					// reject
				}

				Animated.spring(this.position, {
					toValue: { x, y },
					friction: 4
				}).start(() => {
					if (accepted) {
						// accepted request
					} else if (rejected) {
						// reject request
					}
				});

				if (accepted || rejected) {
					this.setState({ index: this.state.index + 1 }, () => {
						this.position.setValue({ x: 0, y: 0 });
					});
				}
			}
		});
	}

	renderRequests = () => {
		return this.state.requests
			.map(({ imageURL }, index) => {
				let panResponder = {};
				let position = {};
				let acceptOpacity = 0;
				let rejectOpacity = 0;
				let cardScaleOpacity = 0;

				const image = { uri: imageURL };

				if (index < this.state.index) {
					return null;
				} else if (index === this.state.index) {
					panResponder = this.PanResponder.panHandlers;
					position = this.rotateTranslate;
					acceptOpacity = this.acceptOpacity;
					rejectOpacity = this.rejectOpacity;
					cardScaleOpacity = 1;
				} else if (index === this.state.index + 1) {
					cardScaleOpacity = this.nextScaleAndOpacity;
				}

				return (
					<Animated.View
						{...panResponder}
						key={index}
						style={[
							{
								transform: [{ scale: cardScaleOpacity }],
								opacity: cardScaleOpacity,
								position: "absolute",
								height: HEIGHT - 120,
								width: WIDTH,
								padding: 10,
								paddingTop: 40
							},
							position
						]}
					>
						<Animated.View
							style={{
								opacity: acceptOpacity,
								position: "absolute",
								top: 50,
								left: 50,
								zIndex: 100
							}}
						>
							<Text
								style={{
									borderWidth: 1,
									borderColor: "green",
									color: "green",
									fontSize: 32,
									fontWeight: "800",
									padding: 10
								}}
							>
								Accept
							</Text>
						</Animated.View>
						<Animated.View
							style={{
								opacity: rejectOpacity,
								position: "absolute",
								top: 50,
								right: 50,
								zIndex: 100
							}}
						>
							<Text
								style={{
									borderWidth: 1,
									borderColor: "red",
									color: "red",
									fontSize: 32,
									fontWeight: "800",
									padding: 10
								}}
							>
								Reject
							</Text>
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
