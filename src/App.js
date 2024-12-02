import React, { useState, useEffect } from "react";
import axios from "axios";
import PhotoCard from "./components/PhotoCard";

function App() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    setLoading(true); // Show loading state
    try {
      const response = await axios.get(
        "https://api.unsplash.com/photos",
        {
          params: { per_page: 10 }, // Fetch 10 photos
          headers: {
            Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`,

          },
        }
      );
      setPhotos(response.data); // Store fetched photos
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  return (
    <div style={styles.gallery}>
      {loading && <p>Loading...</p>}
      {photos.map((photo) => (
        <PhotoCard
          key={photo.id}
          src={photo.urls.small}
          name={photo.user.name}
        />
      ))}
    </div>
  );
}

const styles = {
  gallery: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
    margin: "20px",
  },
};

export default App;
