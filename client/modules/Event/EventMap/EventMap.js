import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";

const EventMap = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={10}
    defaultCenter={props.location}
    center={props.location}
  >
    {console.log('center', props.location)}
    {props.markers.map(marker => (
      <Marker position={marker.location} />
    ))}
  </GoogleMap>
));

export default EventMap;
