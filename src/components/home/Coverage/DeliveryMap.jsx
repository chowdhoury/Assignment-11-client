import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { MapPin } from "lucide-react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon issue with Leaflet in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const DeliveryMap = () => {
  const [deliveryPoints, setDeliveryPoints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch delivery points data
    fetch("/delivery-point.json")
      .then((response) => response.json())
      .then((data) => {
        // Filter only active delivery points
        if (Array.isArray(data)) {
          const activePoints = data.filter(
            (point) => point.status === "active"
          );
          setDeliveryPoints(activePoints);
        } else {
          setDeliveryPoints([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading delivery points:", error);
        setDeliveryPoints([]);
        setLoading(false);
      });
  }, []);

  // Default center of Bangladesh
  const bangladeshCenter = [23.685, 90.3563];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[500px]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-6 text-center">
        <h3 className="text-2xl font-bold text-secondary mb-2 flex items-center justify-center gap-2">
          <MapPin className="w-6 h-6" />
          Our Delivery Coverage Map
        </h3>
        <p className="text-secondary-content">
          We deliver to {deliveryPoints.length}+ locations across Bangladesh
        </p>
      </div>

      <div className="rounded-lg overflow-hidden shadow-xl border-4 border-primary">
        <MapContainer
          center={bangladeshCenter}
          zoom={7}
          style={{ height: "500px", width: "100%" }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {deliveryPoints.map((point, index) => (
            <Marker key={index} position={[point.latitude, point.longitude]}>
              <Popup>
                <div className="p-2">
                  <h4 className="font-bold text-lg text-primary mb-2">
                    {point.city}
                  </h4>
                  <p className="text-sm mb-1">
                    <strong>District:</strong> {point.district}
                  </p>
                  <p className="text-sm mb-1">
                    <strong>Region:</strong> {point.region}
                  </p>
                  <p className="text-sm mb-2">
                    <strong>Status:</strong>{" "}
                    <span className="badge badge-success badge-sm">
                      {point.status}
                    </span>
                  </p>
                  <div className="text-sm">
                    <strong>Covered Areas:</strong>
                    <ul className="list-disc list-inside mt-1">
                      {point.covered_area.map((area, i) => (
                        <li key={i}>{area}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stat bg-base-200 rounded-lg shadow">
          <div className="stat-title">Total Locations</div>
          <div className="stat-value text-primary">{deliveryPoints.length}</div>
          <div className="stat-desc">Active delivery points</div>
        </div>
        <div className="stat bg-base-200 rounded-lg shadow">
          <div className="stat-title">Regions Covered</div>
          <div className="stat-value text-secondary">
            {[...new Set(deliveryPoints.map((p) => p.region))].length}
          </div>
          <div className="stat-desc">Across Bangladesh</div>
        </div>
        <div className="stat bg-base-200 rounded-lg shadow">
          <div className="stat-title">Districts Served</div>
          <div className="stat-value text-accent">
            {[...new Set(deliveryPoints.map((p) => p.district))].length}
          </div>
          <div className="stat-desc">And growing</div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryMap;
