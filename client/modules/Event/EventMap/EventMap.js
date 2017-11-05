import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"

const EventMap = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={10}
    defaultCenter={props.location}
  >
    <Marker position={props.location}>
    </Marker>
  </GoogleMap>
))

export default EventMap;