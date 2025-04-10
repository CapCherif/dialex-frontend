import React, { useState } from 'react'
import { useAppContext } from '../context/Context';

function AddThread() {

    const {setShowAddThread, setThreads, setCurrentThreadId, setMessages, addMessage} = useAppContext();
    const [nameThread, setNameThread] = useState("");
    const [loading, setLoading] = useState(false);
    const [textBtn, setTextBtn] = useState('Valider');
    const[errExist, setErrExist] = useState(false)

    async function handleNewThread(e){
        e.preventDefault()
        console.log(nameThread)
        if(!nameThread.trim()){
            return;
        }
        setTextBtn('Validation...')
        
        let data;
        setLoading(true);
        try {
            const response = await fetch('/api/new_thread', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    nameThread:nameThread,
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
            if(data.err){
                setErrExist(true);
                setTextBtn('Valider')
                setLoading(false);

                setTimeout(() => {
                    setErrExist(false);
                }, 3000);
            }
            else{
                // set the threads
                setThreads(data.rows)
                setTextBtn('Validation réussie.')
                setNameThread('')
                setTimeout(() => {
                    setTextBtn('Valider')
                    
                }, 1000);
                setCurrentThreadId(data.insertedId)
                setLoading(false);
                setShowAddThread(false);

                setMessages([])
                addMessage({
                    id:1,
                    sender:'assistant',
                    message:data.message
                })
            }
            
        }

    } 

    return (
        <div id="voile">
            <form onSubmit={(e)=> handleNewThread(e)}>
                <h3>Ajouter un dossier</h3>
                <div className="close" onClick={()=>setShowAddThread(false)}>x</div>
                <p>Choisissez le nom de votre dossier suivant le sujet que vous souhaitez aborder</p>
                <input type="text" required placeholder='Nom...' value={nameThread} onChange={(e) => setNameThread(e.target.value)} />
                <button> 
                    {
                        loading ? <div className='loading-ring-white'></div> : <></>
                    } 
                    {textBtn}
                </button>

                {errExist ? <p className='err'>Ce nom existe déja.</p> : <></>}
            </form>
        </div>
    )
}

export default AddThread
