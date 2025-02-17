import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { v4 as uuidv4 } from "uuid"; // Import UUID generator

// Load Google Maps API only once with the 'async' attribute and prevent multiple script loads
const loadGoogleMapsScript = (callback) => {
  const scriptSrc = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCUJueD5IgQqhwqUmEwk5sjAz6iZ0EKtss&callback=${callback}`;

  if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
    const script = document.createElement("script");
    script.src = scriptSrc;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }
};

const ServiceRequest = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [location, setLocation] = useState("");
  const [map, setMap] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const socket = io("http://localhost:8000");

  // Initialize the Google Map
  useEffect(() => {
    loadGoogleMapsScript("initMap");
    window.initMap = initMap;

    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  const initMap = () => {
    const mapInstance = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 40.73061, lng: -73.935242 },
      zoom: 12,
    });

    // Use google.maps.Marker as fallback if AdvancedMarkerElement isn't available
    const marker = new window.google.maps.Marker({
      position: mapInstance.getCenter(),
      map: mapInstance,
    });

    mapInstance.addListener("click", (event) => {
      marker.setPosition(event.latLng);
      setLocation(`${event.latLng.lat()}, ${event.latLng.lng()}`);
    });

    setMap(mapInstance);
  };

  // Handle the service request form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = {
      customerId: uuidv4(), // Generate a unique UUID dynamically
      serviceType: e.target.serviceType.value,
      location,
    };

    try {
      const response = await axios.post("http://localhost:8000/api/requests", formData);
      console.log("Service Request Created:", response.data);
      alert("Service request submitted successfully!");
    } catch (error) {
      console.error("Error creating request:", error);
      alert("Failed to submit the service request.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <main>
        <section id="service-form">
          <h2>Request Assistance</h2>
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="serviceType">Service Type:</label>
            <select id="serviceType" name="serviceType" required>
              <option value="towing">Towing</option>
              <option value="flatTireRepair">Flat Tire Repair</option>
              <option value="batteryJumpstart">Battery Jumpstart</option>
              <option value="fuelDelivery">Fuel Delivery</option>
            </select>

            <label htmlFor="location">Location:</label>
            <div id="map" style={{ height: "400px", width: "100%" }}></div>
            <input type="hidden" value={location} name="location" />

            <button type="submit" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Request Service"}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default ServiceRequest;
