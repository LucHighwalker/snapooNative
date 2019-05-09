import React from "react";
import { StyleSheet } from "react-native";
import { Constants, MapView } from "expo";
import MapViewDirections from 'react-native-maps-directions';

const origin = {latitude: 37.3318456, longitude: -122.0296002};
const destination = {latitude: 37.771707, longitude: -122.4053769};
const GOOGLE_MAPS_APIKEY = Constants.manifest.extra.GOOGLE_MAPS_APIKEY;

export default class LinksScreen extends React.Component {
	static navigationOptions = {
		title: "Map"
	};

	render() {
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
				<MapViewDirections
					origin={origin}
					destination={destination}
					apikey={GOOGLE_MAPS_APIKEY}
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
