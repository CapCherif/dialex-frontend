// src/context/Context.js
import React, { createContext, useState, useContext, useEffect } from 'react';

// Créer un contexte
const AppContext = createContext();

// Créer un provider de contexte
export const AppProvider = ({ children }) => {
  // Définir l'état global du contexte
    const [messages, setMessages] = useState([]);
    const [typing, setTyping] = useState(false);


    const [loadingThread, setLoadingThread] = useState(false);
    const [currentThreadId, setCurrentThreadId] = useState(null);

    const [assistant, setAssistant] = useState("asst_ufQ7CW20LTyC0Wi22jVOigWN")
    const [mode, setMode] = useState("conversation")
    const [threads, setThreads] = useState([]);
    const [globalVoice, setGlobalVoice] = useState(false);
    const [showAddThread, setShowAddThread] = useState(false);
  
    const addMessage = async (newMessage) => {

      setMessages((prevMessages) => [...prevMessages, newMessage]);
        
    };

   
    const ChangeAssistant = (newAssistant, mode)=>{

        setAssistant(newAssistant)  
        setMode(mode)

        // poster un messsage db
        
        addMessage({
            id: new Date().getTime(),
            sender:'assitant',
            message:"Nouvelle Assistant: "+mode
        })
        
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
            
          }, 1000);
      }
    };
    


  return (
    <AppContext.Provider value={{ messages, typing, setMessages, setTyping, currentThreadId,
     addMessage, ChangeAssistant, assistant, setMode, mode, threads, setThreads, loadingThread, setLoadingThread,
    ChargeThread, setShowAddThread, showAddThread, setCurrentThreadId , globalVoice,setGlobalVoice
     }}>
      {children}
    </AppContext.Provider>
  );
};

// Créer un hook personnalisé pour accéder au contexte
export const useAppContext = () => {
  return useContext(AppContext);
};
