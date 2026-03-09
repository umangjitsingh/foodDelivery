"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

interface MapProps {
		coordinates: [number, number] | null;
		locationError: string;
		onMarkerDrag?: (lng: number, lat: number) => void;
}

export default function Map({ coordinates, locationError, onMarkerDrag }: MapProps) {
		const mapContainer = useRef<HTMLDivElement | null>(null);
		const mapInstance = useRef<maplibregl.Map | null>(null);
		const markerRef = useRef<maplibregl.Marker | null>(null);

		// Initialize map ONCE
		useEffect(() => {
				if (!mapContainer.current || !coordinates) return;

				const [lng, lat] = coordinates;

				mapInstance.current = new maplibregl.Map({
						container: mapContainer.current,
						style: "https://api.maptiler.com/maps/dataviz-v4/style.json?key=nz4kIQmHG4tJE2V2tgvc",
						center: [lng, lat],
						zoom: 14,
						attributionControl: false,
						pixelRatio: 1.4,
				});

				mapInstance.current.addControl(new maplibregl.NavigationControl(), "bottom-right");

				// Create marker
				const el = document.createElement("img");
				el.src = "/pin.png";
				el.style.width = "24px";
				el.style.height = "29px";
				el.style.objectFit = "contain";
				el.style.cursor = "pointer";

				const marker = new maplibregl.Marker({ element: el, draggable: true })
					.setLngLat([lng, lat])
					.addTo(mapInstance.current);

				markerRef.current = marker;

				marker.on("dragend", () => {
						const pos = marker.getLngLat();
						onMarkerDrag?.(pos.lng, pos.lat);

						mapInstance.current?.flyTo({
								center: [pos.lng, pos.lat],
								zoom: 14,
								speed: 1.2,
								curve: 1.4,
						});
				});

				return () => mapInstance.current?.remove();
		}, []); // runs once only

		// Fly to new coordinates when parent updates them
		useEffect(() => {
				if (!mapInstance.current || !markerRef.current || !coordinates) return;

				const [lng, lat] = coordinates;

				markerRef.current.setLngLat([lng, lat]);

				mapInstance.current.flyTo({
						center: [lng, lat],
						zoom: 14,
						speed: 1.2,
						curve: 1.4,
				});
		}, [coordinates]);

		if (!coordinates) {
				return (
					<div className="text-red-600 p-4 text-center">
							{locationError || "Fetching your location..."}
					</div>
				);
		}

		return <div ref={mapContainer} className="w-full h-75 rounded-md" />;
}