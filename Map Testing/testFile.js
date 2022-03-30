import React,{Component, useState } from 'react';
import "./Table.css";
import { MapContainer,Marker,Popup,TileLayer, useMapEvents, } from 'react-leaflet';

function LocationMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
    })
  
    return position === null ? null : (
      <Marker position={position}>
      <Popup>
          You Are Here!
        </Popup>
        </Marker>
    )
  }
  

export class TestFile extends Component{
    render(){
        const singapore = [1.3521, 103.8198]
        return(
            <MapContainer center={singapore} zoom={13} scrollWheelZoom={false}  className='leaflet'>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <LocationMarker />
  </MapContainer>
        )
    }
}