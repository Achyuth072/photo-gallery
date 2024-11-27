import logo from './logo.svg';
import './App.css';
import PhotoCard from './components/PhotoCard';
// import Counter from './components/Counter';
// import Prop from './components/Props';
function App() {
  return (
    <div style={styles.gallery}>
      <PhotoCard
        src="https://via.placeholder.com/200"
        name="Alice"
      />
      <PhotoCard
        src="https://via.placeholder.com/200"
        name="Bob"
      />
      <PhotoCard
        src="https://via.placeholder.com/200"
        name="Charlie"
      />
    </div>
  );
}

const styles = {
  gallery: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    margin: "20px",
  },
};


export default App;
