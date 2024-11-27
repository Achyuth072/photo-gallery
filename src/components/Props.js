function Greeting({ name }) {
    return <p>Hello, {name}!</p>;
  }
  
  function App() {
    return (
      <div>
        <Greeting name="Alice" />
        <Greeting name="Bob" />
      </div>
    );
  }
  
  export default App;
  