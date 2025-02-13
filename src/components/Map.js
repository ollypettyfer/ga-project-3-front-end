import React from 'react'
import { useState } from 'react'
import ReactMapGL, { MapContext, Marker } from 'react-map-gl'
const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`
const SIZE = 20

import Geocode from 'react-geocode'
Geocode.setApiKey('AIzaSyBK6SzZbuxMjIHPxdoBk54ag5K23MLTss4')
Geocode.setLanguage('en')
Geocode.enableDebug()

export default function Map(props) {
  const [viewport, setViewport] = useState(
    {
      width: 700,
      height: 500,
      latitude: 46,
      longitude: 17,
      zoom: 1,
    },
    []
  )

  return (
    <div>
      <ReactMapGL
        {...viewport}
        // mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        mapboxApiAccessToken="pk.eyJ1IjoiamFtZXNnb3JlIiwiYSI6ImNrdW5qMWZnYTFucGgycG82MGVwaW83aXkifQ.ClJikErzkit5U1DNhCCwpw"
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
      >
        {/* MAP OVER THE MARKERS FUNCTION WITH CO-ORDINATES */}
        {props.props?.map(({ lat, lng }) => (
          <Marker key={lat} latitude={lat} longitude={lng}>
            <svg
              height={SIZE}
              viewBox="0 0 24 24"
              style={{
                cursor: 'pointer',
                fill: '#d00',
                stroke: 'none',
                transform: `translate(${-SIZE / 2}px,${-SIZE}px)`,
              }}
            >
              <path d={ICON} />
            </svg>
          </Marker>
        ))}

        {/* END OF MAP FUNCTION */}
      </ReactMapGL>
    </div>
  )
}
