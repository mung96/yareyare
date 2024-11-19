import './App.css';
import yare from './yareLogo.png'
import LoadingComponent from "./LodingComponent";

function App() {
  return (
      <div id={'container'}>
        <img src={yare} alt={'logo'}/>
        <LoadingComponent/>
        <h1>로그인 중입니다.</h1>
      </div>
  );
}

export default App;
