import { useEffect, useState} from 'react'
import '../App.css'
import '../loading.css'
import '../ring.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp, faSave, faRedo, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import VertNav from "./VertNav"
import Mode from './Mode';
import Conv from './Conv';
import Area from './Area';
import { useAppContext } from '../context/Context';
import AddThread from './AddThread';
import DeleteThread from './DeleteThread';
import Help from './Help';
import Footer from './Footer';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';
import { ValidateToken } from './aiFunctions';
import { CheckIfUserHasOrder } from './aiFunctions';
function App() {
  
  const [loading, setLoading] = useState(true);
  const [printResponse,setPrintResponse] = useState(false)
  const { messages, setMessages, currentMode, setCurrentMode, 
    FetchThreads, showAddThread, toDeleteThreadId, help, setHelp } = useAppContext();

    const navigate = useNavigate();
  

    useEffect(() => {
      const checkToken = async () => {
        const token = localStorage.getItem('access_token');
        const isValid = await ValidateToken(token);
  
        console.log('Token valide ?', isValid);
  
        if (isValid) {
          console.log('Redirection vers login...');
          let resp = await CheckIfUserHasOrder(localStorage.getItem('iduser'))
          
          if(resp.length == 0){

            navigate('/abonnement')
          }
          else{
            if(resp[0].state == 0){
              setLoading(false)
              navigate('/login')
            }
            else{
              setLoading(false)
              // navigate('/');
            }
          }
        }
        else{
          navigate('/login')
        }
      };
  
      checkToken();
    }, [navigate]);


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


