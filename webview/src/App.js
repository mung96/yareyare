function App() {
  return (
      <div>
        {Array(1000).fill(0).map(item => <p>리액트 레츠고</p>)}
      </div>
  );
}

export default App;
