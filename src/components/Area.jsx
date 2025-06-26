import React, {useEffect} from 'react'
import { faPaperclip, faRedo, faPaperPlane, faCircleStop } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Mic from './Mic';
import { useAppContext } from '../context/Context';
import FileIcon from './FileIcon';
import { Link } from 'react-router-dom';

function Area() {

    const {addMessage, messages, setTyping, assistant, mode,
    currentThreadId, input, setInput, inputAccess, setInputAccess, setFileName, fileInputRef,setMode,ChangeAssistant} = useAppContext();
    const [error, setError] = useState('');
    const [showTokenError, setShowTokenError] = useState(false);
        

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(fileInputRef)
        
        if (!input.trim()) {
            return;
        }

        addMessage({
            id: new Date().getTime(),
            sender:'user',
            message:input,
            createdAt:new Date()
        })
    
        setTyping(true);
        setError('');
        setInput('');

        let data;

        if(assistant == ""){
            let options = {
                method: 'POST',
                headers: {},
                body: null,
            };

            if (fileInputRef.current?.files[0]) {
                let _formData = new FormData();
                _formData.append("message", input);                
                _formData.append('threadId', currentThreadId)                
                _formData.append('file', fileInputRef.current.files[0]);
                options.body = _formData;
        
                fileInputRef.current.value = "";
                setFileName('')
            } else {
                options.headers['Content-Type'] = 'application/json';
                options.body = JSON.stringify({message:input, threadId:currentThreadId, file:null});
            }

            try {
                const response = await fetch('http://localhost:3000/folders/search_info', options);
            
                if (!response.ok) {
                    if (response.status === 401) {
                        addMessage({
                            id: new Date().getTime(),
                            sender: 'assistant',
                            message: "Vous n'avez pas assez de tokens pour effectuer cette action. Veuillez acheter des tokens pour continuer à utiliser le service.",
                            createdAt: new Date()
                        });
                        return;
                    }
                    if (response.status === 504) {
                        addMessage({
                            id: new Date().getTime(),
                            sender: 'assistant',
                            message: "Le serveur met trop de temps à répondre. Veuillez réessayer dans quelques instants.",
                            createdAt: new Date()
                        });
                        return;
                    }
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }
            
                data = await response.json();
                addMessage({
                    id: new Date(),
                    sender:'assistant',
                    message: data.answer.output_text,
                    createdAt:new Date()
                });
                
            } catch (err) {
                console.log(`Erreur lors de l'envoi: ${err.message}`);
            } finally {
                setTyping(false);
            }

        } else {
            const formData = new FormData();
            formData.append("message", input);
            formData.append('threadId', currentThreadId)
            formData.append('assistant_id', assistant)
            formData.append('sender', "user")
            formData.append('mode', mode)

            if (fileInputRef.current?.files[0]) {
                console.log("Fichier trouvé : ", fileInputRef.current.files[0]);
                formData.append('file', fileInputRef.current.files[0]);
                addMessage({
                    id: new Date().getTime(),
                    sender:'user',
                    message:fileInputRef.current.files[0].name,
                    createdAt:new Date()
                })
        
                fileInputRef.current.value = "";
                setFileName('')
            }

            try {
                const response = await fetch('http://localhost:3000/folders/thread/message/add', {
                    method: 'POST',
                    body: formData,
                });
            
                if (!response.ok) {
                    if (response.status === 401) {
                        addMessage({
                            id: new Date().getTime(),
                            sender: 'assistant',
                            message: "Vous n'avez pas assez de tokens pour effectuer cette action. Veuillez acheter des tokens pour continuer à utiliser le service.",
                            createdAt: new Date()
                        });
                        return;
                    }
                    if (response.status === 504) {
                        addMessage({
                            id: new Date().getTime(),
                            sender: 'assistant',
                            message: "Le serveur met trop de temps à répondre. Veuillez réessayer dans quelques instants.",
                            createdAt: new Date()
                        });
                        return;
                    }
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }
            
                data = await response.json();
                console.log('Response data:', data);

                // Handle both single object and array response formats
                let messageContent = '';
                if (Array.isArray(data)) {
                    // Handle array format
                    const firstMessage = data[0];
                    if (firstMessage.content && Array.isArray(firstMessage.content)) {
                        messageContent = firstMessage.content
                            .filter(item => item.type === 'text')
                            .map(item => item.text.value)
                            .join('\n');
                    }
                } else {
                    // Handle single object format
                    messageContent = data.output_text || '';
                }

                addMessage({
                    id: Array.isArray(data) ? data[0].id : (data.id || new Date().getTime()),
                    sender: 'assistant',
                    message: messageContent,
                    createdAt: new Date()
                });
                        
            } catch (err) {
                console.log(`Erreur lors de l'envoi: ${err.message}`);
            } finally {
                setTyping(false);
            }
        }
    };
    
  return (
    <div id="control-chat">
        <Mic setInputEnter = {setInput} disabled={currentThreadId == null}/>
        <form id="area">
            <textarea placeholder='Entrez votre message, le cas échéant accompagné de documents attachés que vous souhaitez me confier' name="" id="" disabled={currentThreadId == null}
            value={input} onChange={(e) => setInput(e.target.value)} className={currentThreadId == null ? "disabledbtn" : ""}>
            

            </textarea>

           {mode =="analyse" || mode=="recherche" ?  <FileIcon /> : <></>}

        </form>

        <div>
            <FontAwesomeIcon icon={faRedo}   onClick={()=>ChangeAssistant("asst_ufQ7CW20LTyC0Wi22jVOigWN", "conversation", currentThreadId)}/>
            <FontAwesomeIcon icon={faPaperPlane}    onClick={currentThreadId != null ? handleSubmit : ()=>null}
             className={currentThreadId == null ? "disabledbtn" : "faPaper"} />
        </div>
    </div>
  )
}

export default Area
