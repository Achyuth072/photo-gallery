import React, { useState } from "react";
import styles from "./PhotoCard.module.css";

function PhotoCard({ src, name }) {
  const [likes, setLikes] = useState(0); // State to track likes

  return (
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
  );
}

export default PhotoCard;
