import { icon, LatLngExpression, Popup as LeafletPopup } from "leaflet";
import { createContext, Ref, useContext, useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  MapConsumer,
  PopupProps,
  useMap,
  useMapEvents,
  Tooltip,
} from "react-leaflet";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Device, selectDevice, unselectDevice } from "../../features/devmanager/devmanagerSlice";
import getDistance from "../../lib/getDistance";

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
  const selectedDevice = useAppSelector((state) => state.devmanager.device);
  const userPosition = useAppSelector((state) => state.geolocalizer.coords) as {
    lat: number;
    lng: number;
  };
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
      {device.Id === selectedDevice?.Id && (
        <Tooltip direction="bottom" offset={[1, 22]} opacity={1} permanent>
          <span>
            {getDistance(
              {
                lat: userPosition?.lat,
                lng: userPosition?.lng,
              },
              {
                lat: position[0],
                lng: position[1],
              }
            )}{" "}
            km
          </span>
        </Tooltip>
      )}
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

const UserLocalizer = () => {
  const map = useMap();
  const dispatch = useAppDispatch();
  const position = useAppSelector((state) => state.geolocalizer.coords) as {
    lat: number;
    lng: number;
  };

  const handleClick = () => {
    dispatch(unselectDevice());

    const latlng = Object.values(position) as any;

    map.flyTo(latlng, map.getZoom());
  };

  return (
    <Button onClick={handleClick} className="position-absolute mr-2 mb-4" style={{ zIndex: 9999, right: 0, bottom: 0 }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-cursor-fill mb-1 mr-2"
        viewBox="0 0 16 16"
      >
        <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
      </svg>
      Localize me
    </Button>
  );
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
          <UserLocalizer />
        </MapContextProvider>
      </MapContainer>
    </div>
  );
};
