import { useEffect, useState} from 'react'
import './App.css'
import './loading.css'
import './ring.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp, faSave, faRedo, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import VertNav from "./components/VertNav"
import Mode from './components/Mode';
import Conv from './components/Conv';
import Area from './components/Area';
import { getCompletion } from './components/aiFunctions';
import { useAppContext } from './context/Context';
import AddThread from './components/AddThread';
import DeleteThread from './components/DeleteThread';
import Help from './components/Help';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
function App() {
  const [response, setResponse] = useState("");
  const [input, setInput] = useState('Hello');
  const [loading, setLoading] = useState(true);
  const [printResponse,setPrintResponse] = useState(false)
  const { messages, setMessages, currentMode, setCurrentMode, 
    FetchThreads, showAddThread, toDeleteThreadId, help, setHelp } = useAppContext();

  

  return (
    <>
    
      <NavBar />

      <VertNav  />


      <div id="app">        

        <section>

          <Mode />

          <div id="awe">
            <FontAwesomeIcon icon={faVolumeUp} size="2x"  />
            <FontAwesomeIcon icon={faSave} size="2x" onClick={()=> {
            
            setPrintResponse(prev => !prev)

          }}/>

            
          </div>

        </section>


        {showAddThread ? <AddThread /> : <></>}
        {toDeleteThreadId!=null ? <DeleteThread /> : <></>}
        {help ? <Help /> : <></>}

        <div id="chat">
          
          <Conv proccessToPrint = {printResponse} setPrintAction={setPrintResponse}/>

          <Area />

        </div>


          <Footer />
    </div>
    
  </>
    
     
  )
}

export default App


