// src/context/Context.js
import React, { createContext, useState, useContext, useEffect, useRef } from 'react';

// Créer un contexte
const AppContext = createContext();
import assistants_prompt from "./assistants"


// Créer un provider de contexte
export const AppProvider = ({ children }) => {
  // Définir l'état global du contexte
    const [messages, setMessages] = useState([]);
    const [backupMessages, setBackupMessages] = useState([]); // For temporary storage during analyse mode
    const [typing, setTyping] = useState(false);

    const[fileName, setFileName] = useState("");
    const fileInputRef = useRef(null);

    const [loadingThread, setLoadingThread] = useState(false);
    const [currentThreadId, setCurrentThreadId] = useState(null);

    const [assistant, setAssistant] = useState("")
    const [mode, setMode] = useState("")
    const [threads, setThreads] = useState([]);
    
    const [user, setUser] = useState(null);
    const [anim, setAnim] = useState(false);

    const [showAddThread, setShowAddThread] = useState(false);
    
    const [toDeleteThreadId, setToDeleteThreadId] = useState(null);

    const [input, setInput] = useState("");
    const [inputAccess, setInputAccess] = useState(false);

    const [help, setHelp] = useState(false);

    const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'ar');

    // Global auto audio playback setting
    const [autoAudio, setAutoAudio] = useState(false);
    const [autoAudioActivatedAt, setAutoAudioActivatedAt] = useState(null);

    useEffect(() => {
      localStorage.setItem('language', language);
    }, [language]);

    const addMessage = async (newMessage) => {
      setMessages(prevMessages => [...prevMessages, newMessage]);
    };

    const ChangeAssistant = async (newAssistant, newMode, threadId)=>{
        setAssistant(newAssistant)  
        
        // If switching to "analyse" mode
        if (newMode === "analyse" && mode !== "analyse") {
            setBackupMessages(messages); // Store current messages
            setMessages([]); // Clear for analyse mode
        }
        // If switching from "analyse" mode to another mode
        else if (mode === "analyse" && newMode !== "analyse") {
            const analyseMessages = messages; // Current analyse messages
            setMessages([...backupMessages, ...analyseMessages]); // Combine previous and analyse messages
        }
        
        setMode(newMode)
        setTyping(true)
        setAnim(true);
        let data;
       
        try {
            const response = await fetch('/api/folders/thread/message/add', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: assistants_prompt[newMode],
                    threadId: threadId,   
                    sender: 'assistant',
                    assistant_id: newAssistant, 
                    mode: newMode,                              
                }),
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
                messageContent = assistants_prompt[newMode];
            }

            // Add welcome message for the new mode
            addMessage({
                id: Array.isArray(data) ? data[0].id : new Date().toISOString(),
                sender: 'assistant',
                message: messageContent,
                createdAt: new Date()
            });
            
        } catch (err) {
            console.log(`Erreur lors de l'envoi: ${err.message}`);
        } finally {
            setTyping(false);
            setAnim(false);
        }
    };

    const ChargeThread = async (threadId) => {
      setCurrentThreadId(threadId);
      setLoadingThread(true)
      setMessages([])
      setBackupMessages([])

      let data;

      try {
        console.log('getting conversation...')
        const response = await fetch('/api/folders/thread/message/'+threadId, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            },
          });
      
          if (!response.ok) {
              throw new Error(`Erreur HTTP: ${response.status}`);
          }
      
          data = await response.json();
          data = data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

          setTimeout(() => {
            setLoadingThread(null);
            
            // Get the last message to determine the current mode
            const lastMessage = data[data.length - 1];
            
            if (lastMessage.assistant_mode === "analyse") {
              // If we're in analyse mode, store other messages as backup
              const regularMessages = data.filter(msg => msg.assistant_mode !== "analyse");
              const analyseMessages = data.filter(msg => msg.assistant_mode === "analyse");
              setBackupMessages(regularMessages);
              setMessages(analyseMessages);
            } else {
              // If we're in regular mode, show all messages
              setMessages(data);
            }

            setMode(lastMessage.assistant_mode);
            setAssistant(lastMessage.assistant_id);
          }, 1000);

      } catch (err) {
          console.log(`Erreur lors de l'envoi: ${err.message}`);
          setLoadingThread(false);
      }
    };
    
  return (
    <AppContext.Provider value={{ 
      messages,
      typing, 
      setMessages, 
      setTyping, 
      currentThreadId,
      addMessage, 
      ChangeAssistant, 
      setMode, 
      mode, 
      threads, 
      setThreads, 
      loadingThread, 
      setLoadingThread,
      ChargeThread, 
      setShowAddThread, 
      showAddThread, 
      setCurrentThreadId, 
      anim,
      setAnim, 
      toDeleteThreadId, 
      setToDeleteThreadId,
      assistant,
      setAssistant, 
      input, 
      setInput, 
      inputAccess, 
      setInputAccess, 
      help, 
      setHelp, 
      fileName, 
      setFileName, 
      fileInputRef,
      user, 
      setUser, 
      language, 
      setLanguage,
      autoAudio, setAutoAudio,
      autoAudioActivatedAt, setAutoAudioActivatedAt
    }}>
      {children}
    </AppContext.Provider>
  );
};

// Créer un hook personnalisé pour accéder au contexte
export const useAppContext = () => {
  return useContext(AppContext);
};
