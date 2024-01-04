import {BrowserRouter as Router ,Routes,Route} from 'react-router-dom'
import UploadFile from './components/UploadFile';
// import VideoPlayer from './components/VideoPlayer';
import VideoDetails from './components/VideoDetails';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/video" element={<UploadFile/>}/>
          <Route path="/video/:id" element={<VideoDetails/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
