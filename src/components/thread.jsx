import React, {useEffect, useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, } from "@fortawesome/free-solid-svg-icons";
import { useAppContext } from '../context/Context';


function Thread({thread ,selected}) {
  const { ChargeThread, currentThreadId, setThreads, setMessages, setToDeleteThreadId, toDeleteThreadId } = useAppContext();

  const [deleting, setDeleting] = useState(false)
  

  const isLoading = currentThreadId == thread.id;
  
  // async function DeleteThread(id){

  //   setDeleting(true)
  //   let data;
  //   try {
            
  //       const response = await fetch('/api/delete_thread', {
  //           method: 'POST',
  //           headers: {
  //           'Content-Type': 'application/json',
  //           },
  //           credentials: 'include',
  //           body: JSON.stringify({
  //               iduser:localStorage.getItem('iduser'),
  //               threadId: id,                               
  //           }),
  //         });
      
  //         if (!response.ok) {
  //             throw new Error(`Erreur HTTP: ${response.status}`);
  //         }
      
  //         data = await response.json();
  //         console.log(data)
          
  //   } catch (err) {
  //         console.log(`Erreur lors de l'envoi: ${err.message}`);

  //   } finally {
  //       if(id == currentThreadId){
  //           setMessages([])
  //       }
  //       setThreads(data.rows);
  //   }
  // }

  useEffect(()=>{
    console.log(toDeleteThreadId)
  }, [toDeleteThreadId])

  return (
    <div className={`cfile ${selected ? 'selec_thread' : ''}`} >
        {/* {isLoading && <div className="loading-ring-blue"></div>} */}
        <strong onClick={()=> ChargeThread(thread.id)}><span>{thread.name}</span></strong>

        <button onClick={()=> setToDeleteThreadId(thread.id)}>
            {!deleting ? <FontAwesomeIcon icon={faTrash} className="fa-trash" /> : <></>}
            {deleting ? <div className="loading-ring-blue"></div>: <></>}
        </button>
        
    </div>
  )
}

export default Thread
