import React from "react";
import { useAppContext } from '../context/Context';

const Mode = () => {

    const {ChangeAssistant, mode} = useAppContext();


    return (
        <div id="context">
        <p className={mode == "conversation" ? `selected`: ''} onClick={()=>ChangeAssistant("asst_ufQ7CW20LTyC0Wi22jVOigWN", "conversation")}>Conversation</p>
        <p className={mode == "complétion" ? `selected`: ''} onClick={()=>ChangeAssistant("asst_tyivYhJFEgjxP1cK8ImsB6EX", "complétion")}>Complétion</p>
        <p className={mode == "vérification" ? `selected`: ''} onClick={()=>ChangeAssistant("asst_rgTUuxYoQxDk6ZjbbKIkJPWM", "vérification")}>Vérification</p>
        <p className={mode == "rédaction" ? `selected`: ''} onClick={()=>ChangeAssistant("asst_04S171lWtvs2Z2q0MSV9nqSP", "rédaction")}>Rédaction</p>
        <p className={mode == "résumé" ? `selected`: ''} onClick={()=>ChangeAssistant("asst_4gDUuBHCMuAJQIGextGMSYVF", "résumé")}>Résumé</p>
        <p className={mode == "reformulation" ? `selected`: ''} onClick={()=>ChangeAssistant("asst_S2SzpBfOfB0NFVx7Q7gLXbin", "reformulation")}>Reformulation</p>
        <p className={mode == "traduction" ? `selected`: ''} onClick={()=>ChangeAssistant("asst_hyTnlmcZ2IFsdotMIXlItYVe", "traduction")}>Traduction</p>
        <p className={mode == "explication" ? `selected`: ''} onClick={()=>ChangeAssistant("asst_SCQnc15jV1XiLWpnVikKDxHN", "explication")}>Explication</p>
        </div>
    );


};

export default Mode;
