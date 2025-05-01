import React , {useEffect, useState} from "react";
import dialLogo from '../assets/logo.png'
import '../ring.css'

import Thread from "./thread";
import { useAppContext } from "../context/Context";

const VertNav = () => {
  const { threads, setThreads, currentThreadId, setLoadingThread, setShowAddThread, setHelp } = useAppContext();

  
  let iduser = localStorage.getItem('iduser')

 useEffect(() => {
  let ignore = false;

  const FetchThreads = async(iduser)=>{
    try {
      console.log('getting threads...')
      setLoadingThread(true)
      const response = await fetch(`http://localhost:3000/folders/thread/user/${iduser}`, {
          method: 'GET',
          headers: {
          'Content-Type': 'application/json',
          }
        });
    
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
    
        const data = await response.json();
        console.log(data)
        setThreads(data)
        
      } catch (err) {
          console.log(`Erreur lors de l'envoi: ${err.message}`);
          setThreads([])
      } finally {
          setLoadingThread(false);
      }
  }

  FetchThreads(iduser);

  return () => {
    ignore = true;
  };
}, []);
  

  return (
    <div id="nav">
      <img src={dialLogo} alt="dialLogo" className="logo" />
      <h3>
        <i>Dossiers</i>
      </h3>
      <div id="codes">

        {threads.length > 0 ? (
          threads.map((thread) => (
            <Thread thread={thread}  key={thread.id} />
          ))
        ) : (
          <p>Aucun Dossier.</p>
        )}

      </div>

      <div id="add_file_form">
        <button onClick={() => setShowAddThread(true)}>
          Ajouter
        </button>
      </div>

     
    </div>
  );
};

export default VertNav;
