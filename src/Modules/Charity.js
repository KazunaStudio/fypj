
import React,{Component, useState} from 'react';
import "./Table.css";
import {variables} from './Variables.js';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { MapContainer,Marker,Popup,TileLayer, useMapEvents} from 'react-leaflet';
import L from 'leaflet';
import "leaflet-easybutton/src/easy-button.js";
import "leaflet-easybutton/src/easy-button.css";
import "font-awesome/css/font-awesome.min.css";


  
export class Charity extends Component{
    //Do not touch Section A
      constructor(props){
        super(props);

        this.state={
            Banners:[],
            ImgId:0,
            Imgcaption:"",
            modalTitle:"",
            Bannerimg:"empty.png",
            PhotoPath:variables.IMG_URL,

            StoreInfo:[],
            StoreId:0,
            StoreName:"",
            StoreStreet:"",
            StorePostalCode:"",
            StoreOpHrs:"",
            StorePh:"",
            lat:"",
            lng:"",
            Storelogo:"empty.png",

            AddressFilter:"",
            AddressWithoutFilter:[],
        }
    }
    
    //Filter to the desired items
    FilterFn(){
        var AddressFilter = this.state.AddressFilter;

        var AfilteredData=this.state.AddressWithoutFilter.filter(
            function(el){
                return el.StoreStreet.toString().toLowerCase().includes(AddressFilter.toString().trim().toLowerCase()
                )
            }
        );

        this.setState({StoreInfo:AfilteredData});

    }

    changeAddressFilter = (e)=>{
            this.state.AddressFilter = e.target.value;
            this.FilterFn(); 
        }

    refreshList(){
        fetch(variables.API_URL+'BannerImages')
        .then(response=>response.json())
        .then(data=>{
            this.setState({Banners:data});
        });
        fetch(variables.API_URL+'StoreInfo')
        .then(response=>response.json())
        .then(data=>{
            this.setState({StoreInfo:data, AddressWithoutFilter:data});
        });
    }

    

    componentDidMount(){
        this.refreshList();
    }
      
    render(){
        const{Banners,StoreInfo,PhotoPath}=this.state;
        const properties = {
            duration: 5000,
            transitionDuration: 500,
            indicators: true,
            arrows:false,
        }
        //End of Section A
        //Static information 
            const AboutDonation = 
            <span>
            <p>We are helping families who are in need of spectacles and are not able to afford to buy one. Your donations would be helping these families to be able to get a pair of spectacles.</p>
            <p>Donators stand to win attractive prizes at the end of the month that they donated. Make sure to keep your lucky draw ticket and not lose them!</p>
            </span>;
            const Stepstodonation =
            <ul style={{textAlign:"left"}}>
                <li><b>Step 1 :</b> Take note of your spectacle condition, check that your spectacle are in good condition. (Damage,broken etc. spectacle are not accepted)</li>
                <li><b>Step 2 :</b> Visit your nearest participating stores to drop off your spectacle.</li>
                <li><b>Step 3 :</b> Collect your lucky draw ticket once you drop off your spectacle, the ticket would consist of a number.</li>
                <li><b>Step 4 :</b> Wait for our announcement at the end of the month to see if your one of the lucky winners to walk away with a prize!</li>
            </ul>;
        //leaflet and react-leaflet package, please refer to the documentation before any attempt on editing.
        const LocationMarker = () =>{
            //have a red marker to indicate individual's location
            const redIcon = new L.Icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
              });
              //set individual's location
                const [position, setPosition] = useState(null);
                //when click on the map, it will locate individual's location
                const map = useMapEvents({
                    click() {
                      map.locate()
                    },
                    //once found, it will set the location and zooms to the individual's location
                    locationfound(e) {
                      setPosition(e.latlng)
                      map.flyTo(e.latlng, map.getZoom())
                    },
                  })
                //this will mark the individual's location and it will have a popup if click/tap on
                  return position === null ? null : (
                    <Marker position={position} icon={redIcon}>
                      <Popup>You are around this area.</Popup>
                    </Marker>
                  )
                }
       
        
        const Singapore = [1.3521, 103.8198]; //SG Lat & Lng
        return(
            <div>
                <div className="containerSize">
                    <Fade {...properties}>
                        {Banners.map(BI => (
                        <div className="each-fade" key={BI.ImgId}>
                            <div className="bannerSize">
                                <img src={PhotoPath+BI.Bannerimg} alt=""/>
                            </div>  

                        </div>
                        )
                        )}
                    </Fade>
                </div>
                <p style={{paddingBottom:"30px"}} id='AboutDonation'></p>
                <h2>How Your Donation Helps</h2>
                {AboutDonation}
                <p style={{paddingBottom:"30px"}} id='Stepstodonate'></p>
                <h2>How to donate</h2>
                    {Stepstodonation}
                    <p style={{paddingBottom:"30px"}} id='Stores&Location'></p>
                <h2>Participating Stores Near You</h2>
                <p>
                    {/* A search bar to locate desired store in a location in SG */}
                    <input className="form-control" style={{display:"block",margin:"auto",width:"80%"}} onChange={this.changeAddressFilter} placeholder="Location"/>
                    </p>
                    {/* To display the map */}
                <MapContainer center={Singapore} zoom={11} scrollWheelZoom={true}  className='leaflet'>
                <LocationMarker/> 
                {/* Display map */}
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"  />
                        {StoreInfo.map(SLoc => 
                        //To mark the stored data of the stores, with a popup that contains info of the store
                        <Marker position={[SLoc.lat, SLoc.lng]} key={SLoc.StoreId}>
                            <Popup className='popupsize'>
                            <p style={{textAlign:"center"}}><img className='PUimageSize' src={PhotoPath+SLoc.Storelogo} alt=""/>
                            </p>
                            <h4  style={{textAlign:"center"}} className='PUfontSize'><b>{SLoc.StoreName}</b></h4>
                            <p>
                                {SLoc.StoreStreet} S{SLoc.StorePostalCode} 
                                <br/>Opening Hours: {SLoc.StoreOpHrs}
                                <br/>
                                Phone No. (+65) {SLoc.StorePh}
                            </p>   
                            </Popup>
                        </Marker>
                        )} 
                </MapContainer>
                <p>Tap on the map to see your current location</p>
                <br/>
                <h2>List of Participating Store</h2>
                <table className='collapsetable' >
                <tbody>
                <tr>
                {StoreInfo.map(SLoc =>

                    <td key={SLoc.StoreId} className='collapsetd'>
                    <div style={{paddingLeft:"2%",paddingTop:"3%"}}>
                        <p><img className='imageSize' src={PhotoPath+SLoc.Storelogo} alt=""/>
                        </p>
                        <h4><b>{SLoc.StoreName}</b></h4>
                        <p>
                            {SLoc.StoreStreet} S{SLoc.StorePostalCode} 
                            <br/>
                            Opening Hours: {SLoc.StoreOpHrs}
                            <br/>
                            Phone No. (+65) {SLoc.StorePh}
                        </p>
                        </div></td>
                        )
                    }
                    </tr>
                    </tbody>
            </table>
                <br/><br/>
            </div>
        )
    }
}