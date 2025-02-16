import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

// Google Maps API Load (using useEffect)
const loadGoogleMapsScript = (callback) => {
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCUJueD5IgQqhwqUmEwk5sjAz6iZ0EKtss&callback=${callback}`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
};

const ServiceRequest = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [location, setLocation] = useState('');
  const [map, setMap] = useState(null);
  
  // Initialize socket.io client
  const socket = io('http://localhost:8000');

  useEffect(() => {
    // Load Google Maps
    loadGoogleMapsScript('initMap');
    
    window.initMap = initMap;

    // Listen to incoming messages
    socket.on('receive_message', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, []);

  const initMap = () => {
    const mapInstance = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 40.730610, lng: -73.935242 }, // default center
      zoom: 12,
    });

    const marker = new window.google.maps.Marker({
      position: mapInstance.getCenter(),
      map: mapInstance,
    });

    mapInstance.addListener('click', (event) => {
      marker.setPosition(event.latLng);
      setLocation(`${event.latLng.lat()}, ${event.latLng.lng()}`);
    });

    setMap(mapInstance);
  };

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit('send_message', { message: input });
      setMessages((prev) => [...prev, { sender: 'You', message: input }]);
      setInput('');
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      serviceType: e.target.serviceType.value,
      location,
    };

    // Send form data (e.g., to your API or backend)
    console.log(formData);
  };

  return (
    <div>
      <main>
        <section id="service-form">
          <h2>Fill Out the Form to Request Assistance</h2>
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="firstName">First Name:</label>
            <input type="text" id="firstName" name="firstName" required />

            <label htmlFor="lastName">Last Name:</label>
            <input type="text" id="lastName" name="lastName" required />

            <label htmlFor="serviceType">Service Type:</label>
            <select id="serviceType" name="serviceType" required>
              <option value="towing">Towing</option>
              <option value="flatTireRepair">Flat Tire Repair</option>
              <option value="batteryJumpstart">Battery Jumpstart</option>
              <option value="fuelDelivery">Fuel Delivery</option>
            </select>

            {/* Google Maps location selector */}
            <label htmlFor="location">Location:</label>
            <div id="map" style={{ height: '400px', width: '100%' }}></div>
            <input type="hidden" value={location} name="location" />

            <button type="submit">Request Service</button>
          </form>
        </section>

        {/* Live Chat Section */}
        <section id="live-chat">
          <h2>Live Chat</h2>
          <div id="chat-box">
            <div id="chat-history">
              {messages.map((msg, index) => (
                <p key={index}>
                  <strong>{msg.sender}:</strong> {msg.message}
                </p>
              ))}
            </div>
            <textarea
              id="chat-input"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows="3"
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </section>
      </main>

      <footer>
        <p>&copy; 2025 Roadside Assistance. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ServiceRequest;
