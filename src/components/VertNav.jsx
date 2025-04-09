import React , {useEffect, useState} from "react";
import dialLogo from '../assets/logo.png'
import '../ring.css'

import Thread from "./thread";
import { useAppContext } from "../context/Context";

const VertNav = () => {
  const { threads, setThreads, currentThreadId, setLoadingThread, setShowAddThread, setHelp } = useAppContext();


  if(!localStorage.getItem('iduser')){
    localStorage.setItem('iduser', 1)
  }
  
  let iduser = localStorage.getItem('iduser')

 useEffect(() => {
  let ignore = false;

  const FetchThreads = async(iduser)=>{
    try {
      console.log('getting threads...')
      setLoadingThread(true)
      const response = await fetch('http://37.187.176.222:3081/get_threads', {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
              iduser: iduser,                
          }),
        });
    
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
    
        const data = await response.json();
        setThreads(data.rows)
        
      } catch (err) {
          console.log(`Erreur lors de l'envoi: ${err.message}`);
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
