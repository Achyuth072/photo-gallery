import React, { useState, useEffect } from "react";
import axios from "axios";
import PhotoCard from "./components/PhotoCard";
import styles from "./components/Gallery.module.css"

function App() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);


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
    setError(null); // Clear any previous error before fetching

    //to check if the photos are cached
    const cachedPhotos = localStorage.getItem("photos-page-${page}");
    if (cachedPhotos) {
      setPhotos((prevPhotos) => [...prevPhotos, ...JSON.parse(cachedPhotos)]);
      setLoading(false);
      return;
    }

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

      // cache the photos
      localStorage.setItem(
        `photos-page-${page}`,
        JSON.stringify(response.data)
      );

    } catch (error) {
      setError("Failed to fetch photos. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.gallery}>
      {photos.map((photo) => (
        <PhotoCard
          key={photo.id}
          src={photo.urls.small}
          name={photo.user.name}
        />
      ))}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default App;
