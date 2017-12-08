import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";

const EventMap = withScriptjs(withGoogleMap((props) =>



  <GoogleMap
    defaultZoom={16}
    defaultCenter={props.location}
    center={props.location}
  >
    {props.markers.map(marker => {
      return (
      <Marker position={marker.location} title={marker.title}>
      </Marker>
      )
    })}
  </GoogleMap>
));

export default EventMap;
