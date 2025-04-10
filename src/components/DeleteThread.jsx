import React, { useState } from 'react'
import { useAppContext } from '../context/Context';

function DeleteThread() {

    const {setShowAddThread, setThreads, setCurrentThreadId, setMessages, 
        addMessage,currentThreadId, toDeleteThreadId, setToDeleteThreadId} = useAppContext();

    const [loading, setLoading] = useState(false);
    const [textBtn, setTextBtn] = useState('Supprimer');

    async function handleDelete(e){
        e.preventDefault()
        
        setTextBtn('Suppression...')
        
        let data;
        try {
            const response = await fetch('/api/delete_thread', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    threadId:toDeleteThreadId,
                    iduser:localStorage.getItem('iduser')            
                }),
              });
          
              if (!response.ok) {
                  throw new Error(`Erreur HTTP: ${response.status}`);
              }
          
              data = await response.json();
              console.log(data)
              
        } catch (err) {
              console.log(`Erreur lors de l'envoi: ${err.message}`);
    
        } finally {
            // set the threads
            setThreads(data.rows)
            setTextBtn('Suppression réussie.')
         
            setTimeout(() => {
                setTextBtn('Supprimer')
                
            }, 1000);
          
            setLoading(false);
            if(toDeleteThreadId== currentThreadId){
                setMessages([])
                setCurrentThreadId(null);
            }

            setToDeleteThreadId(null)

            setThreads(data.rows);

        }

    } 

    return (
        <div id="voile">
            <form onSubmit={(e)=> handleDelete(e)}>
                <h3>Suppression</h3>
                <div className="close" onClick={()=>setToDeleteThreadId(null)}>x</div>
                <p>Etes vous sûr de vouloir supprimer ce dossier ?</p>
                <button style={{backgroundColor:'brown'}}> 
                    {
                        loading ? <div className='loading-ring-white'></div> : <></>
                    } 
                    {textBtn}
                </button>
            </form>
        </div>
    )
}

export default DeleteThread;
