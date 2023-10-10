import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../enviroments/enviroment'; // Corrected import path

// Define an interface for GeoJSON data
interface GeoJsonData {
  type: 'Feature';
  properties: {};
  geometry: {
    type: 'LineString';
    coordinates: number[][];
  };
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map!: mapboxgl.Map; // Use '!' to indicate that it will be initialized in ngOnInit
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 37.75641610668089;
  lng = -122.40523320342561;
  @Input() lat1: number = 0;
  @Input() lng1: number = 0;
  @Input() lat2: number = 0;
  @Input() lng2: number = 0;

  constructor() {
    // Set the accessToken before using mapboxgl
  }

  ngOnInit() {
    // Initialize the Mapbox map in the ngOnInit lifecycle hook
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.accessToken,
      container: 'map',
      style: this.style,
      center: [this.lng, this.lat]
    });

    // Add map controls, like zoom and pan controls
    this.map.addControl(new mapboxgl.NavigationControl());

    // Create markers and add them to the map
    new mapboxgl.Marker()
      .setLngLat([this.lng1, this.lat1]) // Set the marker's coordinates
      .addTo(this.map); // Add the marker to the map

    new mapboxgl.Marker()
      .setLngLat([this.lng2, this.lat2]) // Set the marker's coordinates
      .addTo(this.map); // Add the marker to the map

    // Define GeoJSON data for a line
    const geoJsonSource: GeoJsonData = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: [
          [this.lng1, this.lat1],
          [this.lng2, this.lat2],
        ],
      },
    };

    // Calculate the bounds of the line for fitting the map view
    const lineBounds = new mapboxgl.LngLatBounds()
      .extend([this.lng1, this.lat1])
      .extend([this.lng2, this.lat2]);

    // Fit the map view to the line bounds with padding
    this.map.fitBounds(lineBounds, {
      padding: 50 // Adjust this value as needed
    });

    // Wait for the map to load before adding the line
    this.map.on('load', () => {
      // Add a GeoJSON data source and a line layer to the map
      this.map.addSource('route', {
        type: 'geojson',
        data: geoJsonSource, // Provide the GeoJSON data
      });

      this.map.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#888',
          'line-width': 8,
        },
      });
    });

    // Listen for map click events and log the coordinates
    this.map.on('click', (e) => {
      console.log('Clicked at coordinates:', e.lngLat);
    });
  }
}
