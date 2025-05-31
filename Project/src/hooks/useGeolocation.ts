import { useState, useEffect } from "react";

interface GeolocationState {
  location: {
    latitude: number | null;
    longitude: number | null;
  };
  locationText: string;
  error: string | null;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    location: {
      latitude: null,
      longitude: null,
    },
    locationText: "Fetching location...",
    error: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState({
        ...state,
        locationText: "Geolocation not supported",
        error: "Geolocation is not supported by your browser",
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          location: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          locationText: `Lat: ${position.coords.latitude.toFixed(2)}, Long: ${position.coords.longitude.toFixed(2)}`,
          error: null,
        });
      },
      (error) => {
        let errorMessage = "Location access denied";
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information unavailable";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out";
            break;
          default:
            errorMessage = "An unknown error occurred";
        }
        
        setState({
          ...state,
          locationText: errorMessage,
          error: errorMessage,
        });
      }
    );
  }, []);

  return state;
}