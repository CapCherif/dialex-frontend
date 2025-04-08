import React, {useEffect} from 'react'
import { faPaperclip, faRedo, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Mic from './Mic';
import { useAppContext } from '../context/Context';


function Area() {
    const {addMessage, messages, setTyping, assistant, currentThreadId} = useAppContext();

    const [input, setInput] = useState('');
    const [error, setError] = useState('');
        

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        addMessage({
            id: new Date().getTime(),
            sender:'user',
            message:input
        })

        if (!input.trim()) {
        return;
        }
    
        setTyping(true);
        setError('');
        setInput('');
        let data;
        try {
            
            const response = await fetch('http://localhost:3000/add_msg', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    msg:input,
                    threadId: currentThreadId,   
                    assistant_id:assistant,
                    _time: new Date().toISOString(),             
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
        <Mic />
        <form id="area">
            <textarea placeholder='Entrez votre message...' name="" id="" value={input} onChange={(e) => setInput(e.target.value)}>
            

            </textarea>
            <FontAwesomeIcon icon={faPaperclip} id="fapaper" />
        </form>

        <div>
            <FontAwesomeIcon icon={faRedo} />
            <FontAwesomeIcon icon={faPaperPlane} onClick={handleSubmit} />
        </div>
    </div>
    
 
  )
}

export default Area
