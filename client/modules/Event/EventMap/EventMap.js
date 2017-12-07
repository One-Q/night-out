import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";

const EventMap = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={16}
    defaultCenter={props.location}
    center={props.location}
  >
    {props.markers.map(marker => {
      console.log('marker', marker);
      return <Marker position={marker.location} />
    })}
  </GoogleMap>
));

export default EventMap;
