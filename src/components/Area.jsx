import React, {useEffect} from 'react'
import { faPaperclip, faRedo, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Mic from './Mic';
import { useAppContext } from '../context/Context';
import FileIcon from './FileIcon';

function Area() {

    const {addMessage, messages, setTyping, assistant, 
    currentThreadId, input, setInput, inputAccess, setInputAccess, setFileName, fileInputRef} = useAppContext();
    const [error, setError] = useState('');
        

    const handleSubmit = async (e) => {

        
        e.preventDefault();
        console.log(fileInputRef)
        addMessage({
            id: new Date().getTime(),
            sender:'user',
            message:input
        })

        if (!input.trim()) {
            return;
        }
    

        const formData = new FormData();
        formData.append("msg", input);
        
        formData.append('threadId', currentThreadId)
        formData.append('assistant_id', assistant)
        formData.append('_time', new Date().toISOString())


        if (fileInputRef.current?.files[0]) {
            console.log("Fichier trouvé : ", fileInputRef.current.files[0]);
            formData.append('file', fileInputRef.current.files[0]);
        } else {
            console.log("Aucun fichier sélectionné.");
        }


        setTyping(true);
        setError('');
        setInput('');

        let data;
        try {
            
            const response = await fetch('http://localhost:3000/add_msg', {
                method: 'POST',
                credentials: 'include',
                body: formData,
              });
          
              if (!response.ok) {
                  throw new Error(`Erreur HTTP: ${response.status}`);
              }
          
              data = await response.json();
              console.log(data)

              
        } catch (err) {
              console.log(`Erreur lors de l'envoi: ${err.message}`);
    
        } finally {
            if(fileInputRef.current?.files[0]){
                addMessage({
                    id: new Date().getTime(),
                    sender:'user',
                    message:data.filename
                })
                fileInputRef.current.value = "";
                setFileName('')
            }
            
            addMessage({
                id: data.insertedId,
                sender:'assistant',
                message:data.response[0].text.value
            })
            setTyping(false);
        }

    };
    
  return (
    <div id="control-chat">

        <Mic setInputEnter = {setInput} disabled={currentThreadId == null}/>
        <form id="area">
            <textarea placeholder='Entrez votre message...' name="" id="" disabled={currentThreadId == null}
            value={input} onChange={(e) => setInput(e.target.value)} className={currentThreadId == null ? "disabledbtn" : ""}>
            

            </textarea>

            <FileIcon />

        </form>

        <div>
            <FontAwesomeIcon icon={faRedo} />
            <FontAwesomeIcon icon={faPaperPlane}  onClick={currentThreadId != null ? handleSubmit : ()=>null}
             className={currentThreadId == null ? "disabledbtn" : ""} />
        </div>
    </div>
    
 
  )
}

export default Area
