import React, { useEffect, useState } from 'react';
import Navigation from "./Navigation";
import Footer from "./Footer";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Import these for proper marker icons
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

const CardPage = (props) => {
    const [id, setId] = useState(0);
    const [cardDetails, setCardDetails] = useState(() => {
        // Retrieve cardDetails from localStorage if available
        const storedDetails = localStorage.getItem('cardDetails');
        return storedDetails ? JSON.parse(storedDetails) : null;
    });

    useEffect(() => {
        if (props.location.card) {
            setId(props.match.params.id);
            setCardDetails(props.location.card);
            
            // Save cardDetails to localStorage
            localStorage.setItem('cardDetails', JSON.stringify(props.location.card));
        }
    }, [props.match.params.id, props.location.card]);

    useEffect(() => {
        // Clear localStorage on component unmount
        return () => localStorage.removeItem('cardDetails');
    }, []);

    const latitude = cardDetails?.location?.coordinates?.latitude || 51.505;
    const longitude = cardDetails?.location?.coordinates?.longitude || -0.09;

    return (
        <>
            <Navigation />
            <div className="container" style={{ margin: '150px auto', textAlign: 'center' }}>
                <h1>{cardDetails ? cardDetails.name.first + ' ' + cardDetails.name.last : ''}</h1>
                <div className="overflow">
                    <img
                        src={cardDetails?.picture?.thumbnail && cardDetails.picture.thumbnail !== "N/A" ? cardDetails.picture.thumbnail : "https://source.unsplash.com/800x500"}
                        alt="image1"
                        className="card-img-top"
                        style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '50%' }}
                    />
                </div>
                <p>Age: {cardDetails?.dob?.age || ''}</p>
                <p>Country: {cardDetails?.location?.country || "unknown Country"}</p>
                <p>City: {cardDetails?.location?.city || "unknown City"}</p>
                <p>Email: {cardDetails?.email || "unknown Email"}</p>
                <p>Phone: {cardDetails?.phone || "unknown phone"}</p>
                <p>Company: {cardDetails?.phone|| "unknown Company"}</p>
                <div style={{ margin: '0 auto', display: 'inline-block' }}>
                    <MapContainer center={[latitude, longitude]} zoom={12} scrollWheelZoom={false} style={{ height: "300px", width: "300px" }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={[latitude, longitude]}>
                            <Popup>
                                {cardDetails ? cardDetails.name.first + ' ' + cardDetails.name.last + '  latitude : ' + latitude + ' longitude : ' + longitude : ''}
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CardPage;
