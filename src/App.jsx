import { useEffect, useState} from 'react'
import './App.css'
import './loading.css'
import './ring.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp, faSave, faRedo, faPaperPlane  ,faVolumeMute} from "@fortawesome/free-solid-svg-icons";
import VertNav from "./components/VertNav"
import Mode from './components/Mode';
import Conv from './components/Conv';
import Area from './components/Area';
// import { Configuration, OpenAIApi } from "openai";
import { getCompletion } from './components/aiFunctions';
import { useAppContext } from './context/Context';
import AddThread from './components/AddThread';

function App() {
  const [response, setResponse] = useState("");
  const [input, setInput] = useState('Hello');
  const [loading, setLoading] = useState(true);
  const [printResponse,setPrintResponse] = useState(false)
  const { messages, setMessages, currentMode, setCurrentMode, FetchThreads, showAddThread ,globalVoice ,setGlobalVoice  } = useAppContext();

  

  return (
    <>
      <VertNav  />


      <div id="app">        

            <section>

              <Mode />

              <div id="awe">
                <FontAwesomeIcon icon={globalVoice ? faVolumeUp : faVolumeMute } size="2x"  onClick={()=> setGlobalVoice(prev => !prev)}/>
                <FontAwesomeIcon icon={faSave} size="2x" onClick={()=> {
            
                  setPrintResponse(prev => !prev)
                }} />
              </div>

            </section>


            {showAddThread ? <AddThread /> : <></>}

            <div id="chat">
              
              <Conv proccessToPrint = {printResponse} setPrintAction={setPrintResponse}/>

              <Area />

            </div>

        </div>

    </>
  )
}

export default App
