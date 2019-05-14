import React from "react";
import { StyleSheet } from "react-native";
import { Constants, MapView } from "expo";
import MapViewDirections from "react-native-maps-directions";

import { getRoute } from "../backend";

const origin = { latitude: 37.3318456, longitude: -122.0296002 };
const destination = { latitude: 37.771707, longitude: -122.4053769 };
const GOOGLE_MAPS_APIKEY = Constants.manifest.extra.GOOGLE_MAPS_APIKEY;

export default class LinksScreen extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			route: []
		};
	}

	static navigationOptions = {
		title: "Map"
	};

	componentWillMount() {
		getRoute("5ca938d677d0070004db47a0")
			.then(resp => {
				const route = resp.map(location => ({
					longitude: parseFloat(location.coordinates.longitude),
					latitude: parseFloat(location.coordinates.latitude)
				}));
				this.setState({
					route
				});
			})
			.catch(error => {
				console.error(error);
			});
	}

	getMapRoute(route) {
		return route.map((coord, i) => <MapView.Marker key={i} coordinate={coord}/>)
	}

	render() {
		const { route } = this.state;

		if (route.length == 0) {
			return null;
		}

		return (
			<MapView
				style={{ flex: 1 }}
				initialRegion={{
					latitude: 37.78825,
					longitude: -122.4324,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421
				}}
			>
			{this.getMapRoute(route)}
				<MapViewDirections
					origin={route[0]}
					destination={route[route.length - 1]}
					apikey={GOOGLE_MAPS_APIKEY}
					strokeWidth={3}
					strokeColor="blue"
				/>
			</MapView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 15,
		backgroundColor: "#fff"
	}
});
