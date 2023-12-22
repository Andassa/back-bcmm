import React, { useRef, useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, FeatureGroup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import { EditControl } from 'react-leaflet-draw';
import L from "leaflet";

const icon = L.icon({
    iconUrl: "./location.png",
    iconSize: [40, 40]
});
const position = [-18.822733, 47.171147];

const DrawMap = (props) => {
    const { coordonnees } = props;
    const { setCoordonnees } = props;
    const { selectPosition } = props;
    const locationSelection = [selectPosition?.lat, selectPosition?.lon];
    const [drawingEnabled, setDrawingEnabled] = useState(true);
    const [editableLayers, setEditableLayers] = useState(null);
    const [editingEnabled, setEditingEnabled] = useState(false);


    const featureGroupRef = useRef();

    const onCreated = (e) => {
        const type = e.layerType;
        const layer = e.layer;

        if (type === 'polygon') {
            const coordinates = layer.getLatLngs()[0].map((latLng) => [latLng.lat, latLng.lng]);
            setCoordonnees(coordinates);
        }

        featureGroupRef.current.addLayer(layer);
        setDrawingEnabled(false);
        setEditableLayers(e.layer);
        setEditingEnabled(true);

    };
    const handleOnEdited = (e) => {
        // Obtenez les nouvelles coordonnées après l'édition
        const newCoordinates = e.layers.getLayers()[0].getLatLngs()[0].map((latLng) => [latLng.lat, latLng.lng]);
        setCoordonnees(newCoordinates);
        // console.log('Nouvelles coordonnées du polygone :', newCoordinates);
    };
    const handleDelete =(e)=>{
        setDrawingEnabled(true);
        setCoordonnees([]);
    }


    return (
        <MapContainer center={position} zoom={6.4} style={{ width: "100%", height: "100%", boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://api.maptiler.com/maps/topo-v2/256/{z}/{x}/{y}.png?key=vbdUPhtNPokkRlCqiG7n"
            />
            <FeatureGroup ref={featureGroupRef}>
                <EditControl
                    position="topright"
                    draw={{
                        rectangle: false,
                        polyline: false,
                        circle: false,
                        marker: false,
                        circlemarker: false,
                        polygon: drawingEnabled ? {
                            allowIntersection: false,
                            drawError: {
                                color: '#e1e100',
                                timeout: 1000,
                            },
                            shapeOptions: {
                                color: '#97009c',
                            },
                        } : false,
                    }}
                    edit={{
                        featureGroup: featureGroupRef.current,
                        // featureGroup: editableLayers,
                        edit: editingEnabled,

                    }}
                    onCreated={onCreated}
                    onEdited={handleOnEdited}
                    onDeleted={handleDelete}
                />
            </FeatureGroup>
            {selectPosition && (
                <Marker position={locationSelection} icon={icon}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            )}
        </MapContainer>
    );
};

export default DrawMap;
