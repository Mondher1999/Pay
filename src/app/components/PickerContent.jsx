"use client";

import React, { useState, useEffect, useCallback, memo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Search, MapPin, LocateFixed } from "lucide-react";

// --- CONSTANTES ET HELPERS ---
const INITIAL_MAP_STATE = { center: [46.2276, 2.2137], zoom: 10 };
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api-xv44jczyxq-uc.a.run.app";
const parseCoord = (coord) => parseFloat(String(coord).replace(",", "."));

// --- Icônes personnalisées ---
const createCustomIcon = ({ bgColor, pulse = false }) => {
  const markerHtml = `
    <div class="relative flex justify-center items-center">
      ${pulse ? `<div class="absolute h-[60px] w-[60px] ${bgColor} opacity-20 rounded-full animate-marker-pulse -z-10"></div>` : ""}
      <div class="relative h-[30px] w-[30px] transform -rotate-45 ${bgColor} rounded-t-full rounded-l-full border-2 border-white shadow-lg">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[14px] w-[14px] bg-white rounded-full"></div>
      </div>
    </div>
  `;
  return L.divIcon({
    html: markerHtml,
    className: "bg-transparent border-none",
    iconSize: [30, 42],
    iconAnchor: [15, 42],
    popupAnchor: [0, -42],
  });
};
const defaultIcon = createCustomIcon({ bgColor: "bg-blue-600" });
const hoveredIcon = createCustomIcon({ bgColor: "bg-blue-800" });
const selectedIcon = createCustomIcon({ bgColor: "bg-red-500", pulse: true });

const MapAnimator = ({ target, panTarget, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (target && target[0] !== INITIAL_MAP_STATE.center[0]) {
      map.flyTo(target, zoom, { animate: true, duration: 1.0 });
    }
  }, [target, zoom, map]);
  useEffect(() => {
    if (panTarget) {
      map.panTo(panTarget, { animate: true, duration: 0.5, easeLinearity: 0.5 });
    }
  }, [panTarget, map]);
  return null;
};

const ResetViewControl = ({ center, zoom }) => {
  const map = useMap();
  return (
    <div className="leaflet-bottom leaflet-right">
      <div className="leaflet-control leaflet-bar bg-white p-0">
        <button
          onClick={() => map.flyTo(center, zoom)}
          title="Recentrer la vue"
          className="w-[34px] h-[34px] flex items-center justify-center hover:bg-gray-100"
        >
          <LocateFixed size={18} />
        </button>
      </div>
    </div>
  );
};

const SkeletonLoader = () => (
  <div className="space-y-3 p-3">
    {[...Array(8)].map((_, i) => (
      <div key={i} className="p-4 bg-gray-200 rounded-lg animate-pulse">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
        <div className="h-3 bg-gray-300 rounded w-1/2" />
      </div>
    ))}
  </div>
);

const PickerContent = memo(({ onPointSelected }) => {
  const [pickupPoints, setPickupPoints] = useState([]);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [hoveredPointNum, setHoveredPointNum] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mapState, setMapState] = useState(INITIAL_MAP_STATE);
  const [panTarget, setPanTarget] = useState(null);
  const [internalSearchValue, setInternalSearchValue] = useState("");
  const [activeSearch, setActiveSearch] = useState("");

  const handleSearch = useCallback(async () => {
    if (!activeSearch) return;
    setLoading(true);
    setError("");
    setSelectedPoint(null);
    setPickupPoints([]);
    try {
      const response = await fetch(`${API_BASE_URL}/mondial-relay/search?postalCode=${activeSearch}`);
      if (!response.ok) throw new Error(`Erreur serveur (${response.status})`);
      const data = await response.json();
      setPickupPoints(data || []);
      if (data?.length > 0) {
        const firstPoint = data[0];
        setMapState({ center: [parseCoord(firstPoint.Latitude), parseCoord(firstPoint.Longitude)], zoom: 15 });
      } else {
        setError("Aucun point relais trouvé pour ce code postal.");
      }
    } catch (err) {
      setError(err.message || "Impossible de récupérer les points relais.");
    } finally {
      setLoading(false);
    }
  }, [activeSearch]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  const handleInternalSearchSubmit = (e) => {
    e.preventDefault();
    setActiveSearch(internalSearchValue);
  };

  const handleProvisionalSelect = (point) => {
    setSelectedPoint(point);
    setPanTarget([parseCoord(point.Latitude), parseCoord(point.Longitude)]);
  };

  const getMarkerIcon = (point) => {
    if (selectedPoint?.Num === point.Num) return selectedIcon;
    if (hoveredPointNum === point.Num) return hoveredIcon;
    return defaultIcon;
  };

  const ListPanelContent = () => {
    if (loading) return <SkeletonLoader />;
    if (error) return <div className="p-4"><p className="text-red-600 bg-red-100 p-3 rounded-lg font-medium">{error}</p></div>;
    if (!activeSearch) return <div className="p-4 text-center text-gray-500">Veuillez lancer une recherche pour afficher les points relais.</div>;
    if (pickupPoints.length === 0) return <div className="p-4 text-center"><p className="text-gray-500">Aucun résultat.</p></div>;

    return pickupPoints.map((point) => {
      if (!point?.Num) return null;
      const isSelected = selectedPoint?.Num === point.Num;
      return (
        <div
          key={point.Num}
          onClick={() => handleProvisionalSelect(point)}
          onMouseEnter={() => setHoveredPointNum(point.Num)}
          onMouseLeave={() => setHoveredPointNum(null)}
          className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 ${isSelected ? "bg-blue-100 border-blue-500 ring-2 ring-blue-500" : "bg-white hover:bg-blue-50"}`}
        >
          <p className="font-bold text-gray-800 flex gap-2"><MapPin size={16} className="text-blue-600 shrink-0" />{point.LgAdr1}</p>
          <p className="text-sm text-gray-600 pl-8">{point.LgAdr3}, {point.CP} {point.Ville}</p>
        </div>
      );
    });
  };

  return (
    <div className="flex w-full h-full flex-col-reverse md:flex-row">
      {/* Liste */}
      <div className="w-full h-1/2 md:w-[400px] md:h-full flex flex-col border-t md:border-t-0 md:border-r border-gray-200 bg-white">
        <div className="p-3 border-b shrink-0">
          <form onSubmit={handleInternalSearchSubmit} className="flex items-center gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-black" />
              <input
                type="text"
                value={internalSearchValue}
                onChange={(e) => setInternalSearchValue(e.target.value.replace(/\D/g, ""))}
                placeholder="Code postal..."
                className="border border-gray-300 p-2 pl-10 text-black rounded-md w-full focus:ring-1 focus:ring-blue-500"
                maxLength="5"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 disabled:bg-blue-300"
              disabled={loading || internalSearchValue.length < 5}
            >
              OK
            </button>
          </form>
        </div>
        <div className="flex-1 p-2 space-y-2 overflow-y-auto">
          <ListPanelContent />
        </div>
        {selectedPoint && (
          <div className="p-3 border-t bg-gray-50 shrink-0">
            <button
              onClick={() => onPointSelected(selectedPoint)}
              className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors"
            >
              Choisir ce point relais
            </button>
          </div>
        )}
      </div>

      {/* Carte */}
      <div className="w-full h-1/2 md:flex-1 md:h-full">
        <MapContainer center={mapState.center} zoom={mapState.zoom} style={{ height: "100%", width: "100%" }} scrollWheelZoom zoomControl>
          <MapAnimator target={mapState.center} panTarget={panTarget} zoom={mapState.zoom} />
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            attribution='&copy; OpenStreetMap &copy; CARTO'
          />
          {pickupPoints.map((point) => (
            <Marker
              key={point.Num}
              position={[parseCoord(point.Latitude), parseCoord(point.Longitude)]}
              icon={getMarkerIcon(point)}
              eventHandlers={{
                click: () => handleProvisionalSelect(point),
                mouseover: () => setHoveredPointNum(point.Num),
                mouseout: () => setHoveredPointNum(null),
              }}
            >
              <Popup>
                <b>{point.LgAdr1}</b><br />{point.LgAdr3}
              </Popup>
            </Marker>
          ))}
          <ResetViewControl center={mapState.center} zoom={mapState.zoom} />
        </MapContainer>
      </div>
    </div>
  );
});
PickerContent.displayName = "PickerContent";

export default PickerContent;
