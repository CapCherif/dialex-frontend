import React, { useState } from 'react'
import { useAppContext } from '../context/Context';
import assistants_prompt from '../context/assistants';

function AddThread() {

    const {setShowAddThread, setThreads,threads, currentThreadId,
        setCurrentThreadId, setMessages,setMode,setAssistant, addMessage, mode, ChangeAssistant} = useAppContext();
    const [nameThread, setNameThread] = useState("");
    const [loading, setLoading] = useState(false);
    const [textBtn, setTextBtn] = useState('Valider');
    const[errExist, setErrExist] = useState(false)


    async function handleNewThread(e) {
        e.preventDefault();
      
        if (!nameThread.trim()) return;
      
        setTextBtn('Validation...');
        setLoading(true);
      
        let data;
      
        try {
          const response = await fetch('/api/folders/thread/add', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: nameThread,
              userId: localStorage.getItem('iduser'),
            }),
          });
      
          if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
          }
      
          data = await response.json();
          console.log(data);
          setMessages([]);


          // ✅ Tout est OK, on met à jour l’état
          setThreads(prevThreads => [data, ...prevThreads]);
          setTextBtn('Validation réussie.');
          setNameThread('');
          setCurrentThreadId(data.id);
          console.log(data)
          setShowAddThread(false);


          console.log('changement d assistant : ')
          await ChangeAssistant("asst_ufQ7CW20LTyC0Wi22jVOigWN", "conversation", data.id);
          console.log('changement d assistant terminé : ')
          
          if (data.err) {
            setErrExist(true);
            setTextBtn('Valider');
            setTimeout(() => setErrExist(false), 3000);
            return; // ⛔ stop ici si erreur serveur
          }
      
          
          
      
          setTimeout(() => setTextBtn('Valider'), 1000);
      
          // ✅ Appel de l’assistant
      
        } catch (err) {
          console.log(`Erreur lors de l'envoi: ${err.message}`);
        } finally {
          setLoading(false); // Toujours désactiver le loading
        }
      }
      
    // async function handleNewThread(e){
    //     e.preventDefault()
    //     console.log(nameThread)
    //     if(!nameThread.trim()){
    //         return;
    //     }
    //     setTextBtn('Validation...')
        
    //     let data;
    //     setLoading(true);
    //     try {
    //         const response = await fetch('/api/folders/thread/add', {
    //             method: 'POST',
    //             headers: {
    //             'Content-Type': 'application/json',
    //             },
    //             // credentials: 'include',
    //             body: JSON.stringify({
    //                 name:nameThread,
    //                 userId:localStorage.getItem('iduser')            
    //             }),
    //           });
          
    //           if (!response.ok) {
    //               throw new Error(`Erreur HTTP: ${response.status}`);
    //           }
          
    //           data = await response.json();
    //           console.log(data)


    //           if(data.err){
    //             setErrExist(true);
    //             setTextBtn('Valider')
    //             setLoading(false);
    
    //             setTimeout(() => {
    //                 setErrExist(false);
    //             }, 3000);
    //             }
    //             else{
    //                 // set the threads
                    
    //                 setThreads(prevThreads => [data, ...prevThreads]);
    //                 setTextBtn('Validation réussie.')
    //                 setNameThread('')
    //                 setTimeout(() => {
    //                     setTextBtn('Valider')
                        
    //                 }, 1000);
    //                 setCurrentThreadId(data.id)
    //                 setLoading(false);
    //                 setShowAddThread(false);
                
        
    //                 setMessages([])
                                    
    //             }
    
                
            
    
    //             await ChangeAssistant("asst_ufQ7CW20LTyC0Wi22jVOigWN", "conversation")
              
              
    //     } catch (err) {
    //           console.log(`Erreur lors de l'envoi: ${err.message}`);
    
    //     } 
        

    // } 

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
