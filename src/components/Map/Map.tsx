import { icon, LatLngExpression, Popup as LeafletPopup } from "leaflet";
import { createContext, Ref, useContext, useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, MapConsumer, PopupProps, useMap, useMapEvents } from "react-leaflet";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Device, selectDevice, unselectDevice } from "../../features/devmanager/devmanagerSlice";

const Icon = (level: number | undefined, type: string) => {
  let filename;
  if (level === undefined) filename = "non";
  else if (level < 40) filename = "low";
  else if (level < 70) filename = "mid";
  else filename = "high";
  return icon({
    iconUrl: `/markers/${filename}-level.png`,
    iconSize: [28, 41],
  });
};

const mapContext = createContext<any>(null);
const MapContextProvider = mapContext.Provider;

const MapMarker = (device: Device) => {
  const dispatch = useAppDispatch();
  const [currentRefPopup, setCurrentRefPopup] = useContext(mapContext).ref;
  const ref = useRef(null);
  const map = useMap();

  const position: LatLngExpression = [Number(device?.Position?.Lat), Number(device?.Position?.Lon)];

  const handleClick = async () => {
    if (currentRefPopup !== null && currentRefPopup.current !== ref.current) {
      const popupref = (await currentRefPopup.current) as LeafletPopup;
      await map.closePopup(popupref);
    }

    await dispatch(selectDevice(device));
    await setCurrentRefPopup(ref);
    const location = (await [Number(device?.Position?.Lat), Number(device?.Position?.Lon)]) as LatLngExpression;
    await map.flyTo(location, Math.max(12, map.getZoom()));
  };

  return (
    <Marker eventHandlers={{ click: handleClick }} icon={Icon(device.BatteryLevel, device.Type)} position={position}>
      <Popup ref={ref}>
        <div className="card-body p-0">
          <h5 className="card-title">
            #{device.Id} {device.Name}
          </h5>
          <h6 className="card-subtitle mb-2">{device.Type}</h6>
          <h6 className="card-subtitle mb-1 text-muted">{device.SerialNumber}</h6>
          <p className="card-text m-0 p-0">Working Mode: {device.WorkingMode}</p>
          <p className="card-text m-0 p-0">Strength: {device.Strength}/10</p>
          <p className="card-text m-0 p-0">Battery level: {device.BatteryLevel}%</p>
        </div>
      </Popup>
    </Marker>
  );
};

const MapLocalizer = () => {
  const { device, devices } = useAppSelector((state) => state.devmanager);
  const dispatch = useAppDispatch();
  const map = useMapEvents({
    click: () => dispatch(unselectDevice()),
  });

  const [currentRefPopup, setCurrentRefPopup] = useContext(mapContext).ref;

  useEffect(() => {
    if (currentRefPopup) {
      map.closePopup(currentRefPopup.current as LeafletPopup);
      setCurrentRefPopup(null);
    }
    if (!device && currentRefPopup) {
      map.closePopup(currentRefPopup.current as LeafletPopup);
      setCurrentRefPopup(null);
    }
  }, [device]);

  useEffect(() => {
    if (device) {
      const refersTo = devices.find((d) => d.Id === device?.Id)?.Position;

      const location = [Number(refersTo?.Lat), Number(refersTo?.Lon)] as LatLngExpression;
      map.flyTo(location, Math.max(12, map.getZoom()));
    }
  }, [device, devices.find((d) => d.Id === device?.Id)]);

  return null;
};

export default () => {
  const devices = useAppSelector((state) => state.devmanager.devices);
  const position = useAppSelector((state) => state.geolocalizer.coords);
  const [currentRefPopup, setCurrentRefPopup] = useState<any>(null);

  if (!position) return <div>Map</div>;

  return (
    <div id="map" style={{ minHeight: "400px", height: "60vh" }}>
      <MapContainer
        id="map-container"
        center={position}
        zoom={12}
        className="h-100"
        zoomDelta={2}
        scrollWheelZoom
        placeholder={<div>Enable javascript to watch map</div>}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapContextProvider value={{ ref: [currentRefPopup, setCurrentRefPopup] }}>
          {devices.length > 0 && devices.map((device) => <MapMarker key={device.Id} {...device} />)}
          <MapLocalizer />
        </MapContextProvider>
      </MapContainer>
    </div>
  );
};
