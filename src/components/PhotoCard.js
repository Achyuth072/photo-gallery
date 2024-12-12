import React, { useState } from "react";
import styles from "./PhotoCard.module.css";
import LazyLoad from "react-lazyload";

function PhotoCard({ src, name }) {
  const [likes, setLikes] = useState(0); // State to track likes

  return (
    <LazyLoad height={200} offset={100}>
      <div className={styles.card} role="img" aria-label={'Photo by ${name}'}>
        <img src={src} alt={`Phot by ${name}`} className={styles.image} />
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
