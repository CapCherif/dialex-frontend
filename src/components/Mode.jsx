import React, {useState} from "react";
import { useAppContext } from '../context/Context';

const Mode = () => {

    const {ChangeAssistant, mode, anim, setAnim} = useAppContext();

    return (
        <div id="context">
        <p className={mode == "conversation" ? `selected`: ''} 
            onClick={()=>ChangeAssistant("asst_ufQ7CW20LTyC0Wi22jVOigWN", "conversation")}>
              
               {mode=="conversation" && anim ?  <span className="loading-ring-white"></span>: <></>}
                Conversation
        </p>
        <p className={mode == "complétion" ? `selected`: ''}
             onClick={()=>ChangeAssistant("asst_tyivYhJFEgjxP1cK8ImsB6EX", "complétion")}>
                {mode=="complétion" && anim ?  <span className="loading-ring-white"></span>: <></>}
            Complétion
        </p>
        <p className={mode == "vérification" ? `selected`: ''} 
            onClick={()=>ChangeAssistant("asst_rgTUuxYoQxDk6ZjbbKIkJPWM", "vérification")}>
            {mode=="vérification" && anim ?  <span className="loading-ring-white"></span>: <></>}                
            Vérification
        </p>
        <p className={mode == "rédaction" ? `selected`: ''} 
            onClick={()=>ChangeAssistant("asst_04S171lWtvs2Z2q0MSV9nqSP", "rédaction")}>
            {mode=="rédaction" && anim ?  <span className="loading-ring-white"></span>: <></>}  
            Rédaction
        </p>
        <p className={mode == "résumé" ? `selected`: ''} 
            onClick={()=>ChangeAssistant("asst_4gDUuBHCMuAJQIGextGMSYVF", "résumé")}>
            {mode=="résumé" && anim ?  <span className="loading-ring-white"></span>: <></>} 
            Résumé
        </p>
        <p className={mode == "reformulation" ? `selected`: ''} 
            onClick={()=>ChangeAssistant("asst_S2SzpBfOfB0NFVx7Q7gLXbin", "reformulation")}>
            {mode=="reformulation" && anim ?  <span className="loading-ring-white"></span>: <></>} 
            Reformulation
        </p>
        <p className={mode == "traduction" ? `selected`: ''} 
            onClick={()=>ChangeAssistant("asst_hyTnlmcZ2IFsdotMIXlItYVe", "traduction")}>
            {mode=="traduction" && anim ?  <span className="loading-ring-white"></span>: <></>}                 
            Traduction
        </p>
        <p className={mode == "explication" ? `selected`: ''} 
            onClick={()=>ChangeAssistant("asst_SCQnc15jV1XiLWpnVikKDxHN", "explication")}>
            {mode=="explication" && anim ?  <span className="loading-ring-white"></span>: <></>}  
            Explication
        </p>
        </div>
    );


};

export default Mode;
