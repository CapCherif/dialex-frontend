// src/context/Context.js
import React, { createContext, useState, useContext, useEffect, useRef } from 'react';

// Créer un contexte
const AppContext = createContext();
import assistants_prompt from "./assistants"


// Créer un provider de contexte
export const AppProvider = ({ children }) => {
  // Définir l'état global du contexte
    const [messages, setMessages] = useState([]);
    const [typing, setTyping] = useState(false);

    const[fileName, setFileName] = useState("");
    const fileInputRef = useRef(null);

    const [loadingThread, setLoadingThread] = useState(false);
    const [currentThreadId, setCurrentThreadId] = useState(null);

    // const [assistant, setAssistant] = useState("asst_ufQ7CW20LTyC0Wi22jVOigWN")
    const [assistant, setAssistant] = useState("")
    // const [mode, setMode] = useState("conversation")
    const [mode, setMode] = useState("")
    const [threads, setThreads] = useState([]);
    

    const [anim, setAnim] = useState(false);

    const [showAddThread, setShowAddThread] = useState(false);
    
    const [toDeleteThreadId, setToDeleteThreadId] = useState(null);

    const [input, setInput] = useState("");
    const [inputAccess, setInputAccess] = useState(false);

    const [help, setHelp] = useState(false);


    localStorage.setItem('iduser', 1)
    const addMessage = async (newMessage) => {

      setMessages((prevMessages) => [...prevMessages, newMessage]);
        
    };

   
    const ChangeAssistant = async (newAssistant, mode)=>{

        setAssistant(newAssistant)  
        setMode(mode)
        setTyping(true)
        setAnim(true);
        let data;
        try {
            
            const response = await fetch('http://localhost:3000/change_assistant', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    msg:assistants_prompt[mode],
                    threadId: currentThreadId,   
                    
                    id_assistant:newAssistant, 
                    mode_assistant:mode,
                    
                    iduser:localStorage.getItem('iduser'),
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
                message:data.response.response[0].text.value
            })
            setTyping(false);
            setAnim(false);

        }
        // poster un messsage db

        // addMessage({
        //     id: new Date().getTime(),
        //     sender:'assitant',
        //     message:"Nouvelle Assistant: "+mode
        // })
        
    }



    const ChargeThread = async (threadId) => {

      setCurrentThreadId(threadId); // Mise à jour du state
      setLoadingThread(true)
      setMessages([])

      let data;

      try {
        console.log('getting conversation...')
        const response = await fetch('http://localhost:3000/get_thread', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                threadId: threadId,                
            }),
          });
      
          if (!response.ok) {
              throw new Error(`Erreur HTTP: ${response.status}`);
          }
      
          data = await response.json();
          // console.log(data.rows)

      } catch (err) {
          console.log(`Erreur lors de l'envoi: ${err.message}`);
      } finally {
          setTimeout(() => {
            setLoadingThread(null); // Reset
            setMessages(data.rows)
            console.log(data.mode, data.id_assistant)
            setMode(data.mode)
            setAssistant(data.id_assistant)
            // ChangeAssistant("asst_ufQ7CW20LTyC0Wi22jVOigWN", "conversation")

          }, 1000);
      }
    };
    


  return (
    <AppContext.Provider value={{ messages, typing, setMessages, setTyping, currentThreadId,
     addMessage, ChangeAssistant, setMode, mode, threads, setThreads, loadingThread, setLoadingThread,
    ChargeThread, setShowAddThread, showAddThread, setCurrentThreadId, anim,setAnim, toDeleteThreadId, setToDeleteThreadId,
    assistant,setAssistant, input, setInput, inputAccess, setInputAccess, help, setHelp, fileName, setFileName, fileInputRef
     }}>

      {children}


    </AppContext.Provider>
  );
};

// Créer un hook personnalisé pour accéder au contexte
export const useAppContext = () => {
  return useContext(AppContext);
};
