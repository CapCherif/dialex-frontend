import React, {useEffect} from 'react'
import { faPaperclip, faRedo, faPaperPlane, faCircleStop } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Mic from './Mic';
import { useAppContext } from '../context/Context';
import FileIcon from './FileIcon';

function Area() {

    const {addMessage, messages, setTyping, assistant, mode,
    currentThreadId, input, setInput, inputAccess, setInputAccess, setFileName, fileInputRef} = useAppContext();
    const [error, setError] = useState('');
        

    const handleSubmit = async (e) => {

        
        e.preventDefault();
        console.log(fileInputRef)
        addMessage({
            id: new Date().getTime(),
            sender:'user',
            message:input,
            createdAt:new Date()
        })

        if (!input.trim()) {
            return;
        }
    

        const formData = new FormData();
        formData.append("message", input);
        
        formData.append('threadId', currentThreadId)
        formData.append('assistant_id', assistant)
        formData.append('sender', "user")
        // formData.append('_time', new Date().toISOString())
        formData.append('mode', mode)

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
            
            const response = await fetch('http://localhost:3000/folders/thread/message/add', {
                method: 'POST',
                // credentials: 'include',
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
                    message:data.filename,
                    createdAt:new Date()
                })
                fileInputRef.current.value = "";
                setFileName('')
            }
            
            addMessage({
                id: data[0].id,
                sender:'assistant',
                message:data[0].content[0].text.value,
                createdAt:new Date()
            })
            setTyping(false);
        }

    };
    
  return (
    <div id="control-chat">

        <Mic setInputEnter = {setInput} disabled={currentThreadId == null}/>
        <form id="area">
            <textarea placeholder='Entrez votre message, le cas échéant accompagné de documents attachés que vous souhaitez me confier' name="" id="" disabled={currentThreadId == null}
            value={input} onChange={(e) => setInput(e.target.value)} className={currentThreadId == null ? "disabledbtn" : ""}>
            

            </textarea>

            <FileIcon />

        </form>

        <div>
            <FontAwesomeIcon icon={faRedo} />
            <FontAwesomeIcon icon={faPaperPlane}  onClick={currentThreadId != null ? handleSubmit : ()=>null}
             className={currentThreadId == null ? "disabledbtn" : ""} />

          
            <FontAwesomeIcon icon={faCircleStop} className='disabled' />
         

        </div>
    </div>
    
 
  )
}

export default Area
