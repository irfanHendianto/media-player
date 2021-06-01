import Main from './Main'
import 'antd/dist/antd.css';
import {SongProvider} from "./context/SongContext"
import './App.css';

function App() {
  return (
    <div className="App">
      <SongProvider>
        <Main/>
      </SongProvider>
    </div>
  );
}

export default App;
