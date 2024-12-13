import React, { useState, useEffect } from "react";
import axios from "axios";
import PhotoCard from "./components/PhotoCard";
import styles from "./components/Gallery.module.css"

function App() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  // Fetch photos for the first page on component mount
  useEffect(() => {
    const fetchInitialPhotos = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get("https://api.unsplash.com/photos", {
          params: { per_page: 10, page: 1 },
          headers: {
            Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`,
          },
        });

        // Cache page 1
        sessionStorage.setItem("photos-page-1", JSON.stringify(response.data));
        setPhotos(response.data);
      } catch (error) {
        setError("Failed to fetch photos. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchInitialPhotos();
  }, []);

  // Infinite scroll fetch for subsequent pages
  const fetchPhotos = async () => {
    if (loading) return; // Prevent duplicate requests

    setLoading(true);
    setError(null);

    try {
      const cachedPhotos = sessionStorage.getItem(`photos-page-${page}`);
      if (cachedPhotos) {
        const parsedPhotos = JSON.parse(cachedPhotos);
        setPhotos((prevPhotos) => {
          const existingIds = new Set(prevPhotos.map((photo) => photo.id));
          const uniquePhotos = parsedPhotos.filter(
            (photo) => !existingIds.has(photo.id)
          );
          return [...prevPhotos, ...uniquePhotos];
        });
      } else {
        const response = await axios.get("https://api.unsplash.com/photos", {
          params: { per_page: 10, page },
          headers: {
            Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`,
          },
        });

        // Cache the new page
        sessionStorage.setItem(
          `photos-page-${page}`,
          JSON.stringify(response.data)
        );

        setPhotos((prevPhotos) => {
          const existingIds = new Set(prevPhotos.map((photo) => photo.id));
          const uniquePhotos = response.data.filter(
            (photo) => !existingIds.has(photo.id)
          );
          return [...prevPhotos, ...uniquePhotos];
        });
      }
    } catch (error) {
      setError("Failed to fetch photos. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Infinite scroll handler
  useEffect(() => {
    if (page === 1) return; // Skip the first page, already fetched during mount
    fetchPhotos();
  }, [page]); // Trigger fetchPhotos when `page` changes

  // Scroll event listener for infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setPage((prevPage) => prevPage + 1); // Increment page when reaching the bottom
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Render
  return (
    <div className={styles.gallery}>
      {photos.map((photo, index) => (
        <PhotoCard
          key={photo.id}
          src={photo.urls.small}
          name={photo.user.name}
          delay={Math.min(index * 0.05, 1)} // Reduce the delay factor and limit it to 1 second max
        />
      ))}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default App;