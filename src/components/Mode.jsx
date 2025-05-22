import React, {useState} from "react";
import { useAppContext } from '../context/Context';

const Mode = () => {

    const {ChangeAssistant, mode, anim, setAnim, currentThreadId, language} = useAppContext();

    return (
        <div id="context">
            {
                currentThreadId == null ? (
                    language== "fr" ? (
                        <div>
                            <p>Conversation</p>
                            <p>Complétion</p>
                            <p>Vérification</p>
                            <p>Rédaction</p>
                            <p>Résumé</p>
                            <p>Reformulation</p>
                            <p>Traduction</p>
                            <p>Explication</p>
                            <p>Chargement de document</p>
                            <p>Recherche d'information (Non disponible)</p>
                        </div>
                    ):
                    (
                        <div dir="rtl">
                            <p>محادثة</p>
                            <p>إكمال</p>
                            <p>تحقّق</p>
                            <p>تحرير</p>
                            <p>تلخيص</p>
                            <p>إعادة صياغة</p>
                            <p>ترجمة</p>
                            <p>شرح</p>
                            <p>تحميل المستند</p>
                            <p>البحث عن المعلومات (غير متاح)</p>
                        </div>
                    )
                    
                ):
                (
                    <section>
                        <p className={mode == "conversation" ? `selected`: ''} 
                            onClick={()=>ChangeAssistant("asst_ufQ7CW20LTyC0Wi22jVOigWN", "conversation", currentThreadId)}>
                            
                            {mode=="conversation" && anim ?  <span className="loading-ring-white"></span>: <></>}
                                {language == "fr" ? "Conversation" : "محادثة"}
                        </p>
                        <p className={mode == "complétion" ? `selected`: ''}
                            onClick={()=>ChangeAssistant("asst_tyivYhJFEgjxP1cK8ImsB6EX", "complétion", currentThreadId)}>
                                {mode=="complétion" && anim ?  <span className="loading-ring-white"></span>: <></>}
                            {language == "fr" ? "Complétion": "إكمال"}
                        </p>
                        <p className={mode == "vérification" ? `selected`: ''} 
                            onClick={()=>ChangeAssistant("asst_rgTUuxYoQxDk6ZjbbKIkJPWM", "vérification", currentThreadId)}>
                            {mode=="vérification" && anim ?  <span className="loading-ring-white"></span>: <></>}                
                            {language == "fr" ? "Vérification":"تحقّق"}
                        </p>
                        <p className={mode == "rédaction" ? `selected`: ''} 
                            onClick={()=>ChangeAssistant("asst_04S171lWtvs2Z2q0MSV9nqSP", "rédaction", currentThreadId)}>
                            {mode=="rédaction" && anim ?  <span className="loading-ring-white"></span>: <></>}  
                            {language == "fr" ? "Rédaction" : "تحرير" }
                        </p>
                        <p className={mode == "résumé" ? `selected`: ''} 
                            onClick={()=>ChangeAssistant("asst_4gDUuBHCMuAJQIGextGMSYVF", "résumé", currentThreadId)}>
                            {mode=="résumé" && anim ?  <span className="loading-ring-white"></span>: <></>} 
                            {language == "fr" ? "Résumé":"تلخيص"}
                        </p>
                        <p className={mode == "reformulation" ? `selected`: ''} 
                            onClick={()=>ChangeAssistant("asst_S2SzpBfOfB0NFVx7Q7gLXbin", "reformulation", currentThreadId)}>
                            {mode=="reformulation" && anim ?  <span className="loading-ring-white"></span>: <></>} 
                            {language == "fr" ? "Reformulation":"إعادة صياغة"}
                        </p>
                        <p className={mode == "traduction" ? `selected`: ''} 
                            onClick={()=>ChangeAssistant("asst_hyTnlmcZ2IFsdotMIXlItYVe", "traduction", currentThreadId)}>
                            {mode=="traduction" && anim ?  <span className="loading-ring-white"></span>: <></>}                 
                            {language == "fr" ? "Traduction":"ترجمة"}
                        </p>
                        <p className={mode == "explication" ? `selected`: ''} 
                            onClick={()=>ChangeAssistant("asst_SCQnc15jV1XiLWpnVikKDxHN", "explication", currentThreadId)}>
                            {mode=="explication" && anim ?  <span className="loading-ring-white"></span>: <></>}  
                            {language =="fr" ? "Explication":"شرح"}
                        </p>

                        <p className={mode == "analyse" ? `selected`: ''} 
                            onClick={()=>ChangeAssistant("asst_FjUbjQ1RhKbXzuNtYFchU8lu", "analyse", currentThreadId)}>
                            {mode=="analyse" && anim ?  <span className="loading-ring-white"></span>: <></>}  
                            {language == "fr" ? "Chargement de document":"تحميل المستند"}
                        </p>
                        {/* <p id="n-dispo" */}
                        <p className={mode == "recherche" ? `selected`:''}
                            onClick={()=>ChangeAssistant("", "recherche", currentThreadId)}>
                           
                            {mode=="recherche" && anim ?  <span className="loading-ring-white"></span>: <></>} 
                            {language == "fr" ? "Recherche d'information" : "البحث عن المعلومات"} 
                        </p>
                    </section>
                )
            }
            
        </div>
    );


};

export default Mode;
