import React, { useState, useEffect } from "react";
import axios from "axios";
import PhotoCard from "./components/PhotoCard";

function App() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchPhotos();
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 // Trigger near the bottom
      ) {
        setPage((prevPage) => prevPage + 1); // Increment the page number
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll); // Cleanup on unmount
  }, []);

  const fetchPhotos = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://api.unsplash.com/photos",
        {
          params: { per_page: 10, page },
          headers: {
            Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`,
          },
        }
      );
      setPhotos((prevPhotos) => [...prevPhotos, ...response.data]);
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.gallery}>
      {photos.map((photo) => (
        <PhotoCard
          key={photo.id}
          src={photo.urls.small}
          name={photo.user.name}
        />
      ))}
      {loading && <p>Loading...</p>}
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
