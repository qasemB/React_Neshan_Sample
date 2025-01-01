import { useEffect, useRef, useState } from "react";
import "@neshan-maps-platform/react-openlayers/dist/style.css";

import NeshanMap, {
  NeshanMapRef,
  OlMap,
  Ol,
} from "@neshan-maps-platform/react-openlayers";

function App() {
  const mapRef = useRef<NeshanMapRef | null>(null);

  const [ol, setOl] = useState<Ol>();
  const [olMap, setOlMap] = useState<OlMap>();
  const [markerLayer, setMarkerLayer] = useState<any>();

  const oninit = (ol: Ol, map: OlMap) => {
    setOl(ol);
    setOlMap(map);

    // // افزودن لایه‌ی سفارشی
    // const xyzSource = new ol.source.XYZ({
    //   url: "http://SERVER_IP:9173/map/newSat/{z}/{x}/{y}.jpg", // مسیر XYZ شما
    // });    
    // const xyzLayer = new ol.layer.Tile({
    //   source: xyzSource,
    // });    
    // // اضافه کردن لایه به نقشه
    // map.addLayer(xyzLayer);

    const newMarkerLayer = new ol.layer.Vector({
      source: new ol.source.Vector(),
    });
    map.addLayer(newMarkerLayer);
    setMarkerLayer(newMarkerLayer);

    // تنظیم مرکز و انیمیشن
    const view = map.getView();
    view.animate({
      center: ol.proj.fromLonLat([49.696238, 34.091855]),
      zoom: 12,
      duration: 1000,
    });

    // // اضافه کردن مارکر
    // const markerLayer = new ol.layer.Vector({
    //   source: new ol.source.Vector(),
    // });
    // map.addLayer(markerLayer);

    // const marker = new ol.Feature({
    //   geometry: new ol.geom.Point(ol.proj.fromLonLat([49.696238, 34.091855])),
    // });

    // const markerStyle = new ol.style.Style({
    //   image: new ol.style.Icon({
    //     src: "https://cdn-icons-png.flaticon.com/512/252/252025.png", // آیکن مارکر
    //     scale: 0.05, // تنظیم اندازه
    //   }),
    // });

    // marker.setStyle(markerStyle);
    // markerLayer.getSource().addFeature(marker);
  };

  // تابع افزودن مارکر جدید
  const addMarker = (longitude: number, latitude: number) => {
    if (!ol || !olMap || !markerLayer) return;

    // ایجاد مارکر جدید
    const marker = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat([longitude, latitude])),
    });

    const markerStyle = new ol.style.Style({
      image: new ol.style.Icon({
        src: "https://cdn-icons-png.flaticon.com/512/252/252025.png", // آیکن مارکر
        scale: 0.05,
      }),
    });

    marker.setStyle(markerStyle);
    markerLayer.getSource().addFeature(marker);

    // نویگیت کردن نقشه به نقطه جدید
    const view = olMap.getView();
    view.animate({
      center: ol.proj.fromLonLat([longitude, latitude]),
      zoom: 14,
      duration: 1000,
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (mapRef.current?.map) {
        mapRef.current?.map.setMapType("standard-night");
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <NeshanMap
        mapKey="web.fdd68991ffb54a1d87c7012a955be75e"
        defaultType="neshan"
        center={{ latitude: 34.19824, longitude: 49.850487 }}
        style={{ height: "100vh", width: "100%" }}
        onInit={oninit}
        zoom={13}
      ></NeshanMap>
      <button
        onClick={() => addMarker(51.421509, 35.694389)} // مختصات جدید
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          zIndex: 1000,
          padding: "10px",
          background: "blue",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        افزودن نقطه جدید
      </button>
    </div>
  );
}

export default App;
