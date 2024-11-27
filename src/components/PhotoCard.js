import React, { useState } from "react";

function PhotoCard({ src, name }) {
  const [likes, setLikes] = useState(0); // State to track likes

  return (
    <div style={styles.card}>
      <img src={src} alt={`${name}'s photo`} style={styles.image} />
      <p>{name}</p>
      <button onClick={() => setLikes(likes + 1)} style={styles.button}>
        ❤️ {likes} Likes
      </button>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ccc",
    padding: "10px",
    textAlign: "center",
    borderRadius: "5px",
    maxWidth: "200px",
  },
  image: {
    width: "100%",
    borderRadius: "5px",
  },
  button: {
    marginTop: "10px",
    padding: "5px 10px",
    background: "tomato",
    color: "white",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
  },
};

export default PhotoCard;
