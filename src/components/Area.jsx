import React, {useEffect} from 'react'
import { faPaperclip, faRedo, faPaperPlane, faCircleStop } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Mic from './Mic';
import { useAppContext } from '../context/Context';
import FileIcon from './FileIcon';

function Area() {

    const {addMessage, messages, setTyping, assistant, mode,
    currentThreadId, input, setInput, inputAccess, setInputAccess, setFileName, fileInputRef,setMode,ChangeAssistant} = useAppContext();
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
    
        setTyping(true);
        setError('');
        setInput('');

        let data;

        if(assistant == ""){

            console.log(currentThreadId, input)

             
            let options = {
                method: 'POST',
                headers: {},
                body: null,
            };
            console.log(fileInputRef.current.files[0]);

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
            
                const response = await fetch('http://localhost:3000/folders/search_info', 
                    options
                );
            
                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }
            
                data = await response.json();
                // console.log(data)

                
            } catch (err) {
                console.log(`Erreur lors de l'envoi: ${err.message}`);
        
            }
            finally{
                 addMessage({
                    id: new Date(),
                    sender:'assistant',
                    message:data.answer.output_text,
                    createdAt:new Date()
                })
                setTyping(false);
            }


        }else{

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
                addMessage({
                    id: new Date().getTime(),
                    sender:'user',
                    message:fileInputRef.current.files[0].name,
                    createdAt:new Date()
                })
        
                fileInputRef.current.value = "";
                setFileName('')
            } else {
                console.log("Aucun fichier sélectionné.");
            }


            




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
                // if(fileInputRef.current?.files[0]){
                
                // }
                
                addMessage({
                    id: data.id ? data.id : data[0].id,
                    sender:'assistant',
                    message:data.output_text ? data.output_text :  data[0].content[0].text.value,
                    createdAt:new Date()
                })
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

          
            {/*<FontAwesomeIcon icon={faCircleStop} className='disabled' />*/}
         

        </div>
    </div>
    
 
  )
}

export default Area
