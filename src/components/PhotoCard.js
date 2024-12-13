import React, { useState } from "react";
import styles from "./PhotoCard.module.css";
import LazyLoad from "react-lazyload";

function PhotoCard({ src, name, delay }) {
  const [likes, setLikes] = useState(0); // State to track likes

  return (
    <LazyLoad height={200} offset={100}>
      <div
        className={styles.card}
        style={{ animationDelay: `${delay}s` }} // Add delay dynamically
        role="img"
        aria-label={`Photo by ${name}`}
      >
        <img src={src} alt={`Photo by ${name}`} className={styles.image} />
        <p>{name}</p>
        <button
          onClick={() => setLikes(likes + 1)}
          className={styles.button}
        >
          ❤️ {likes} Likes
        </button>
      </div>
    </LazyLoad>
  );
}

export default PhotoCard;
