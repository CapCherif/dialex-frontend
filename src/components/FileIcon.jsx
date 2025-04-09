import React, {useState, useRef} from 'react'
import { useAppContext } from '../context/Context'



import { faPaperclip} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function FileIcon() {

    const {fileName, setFileName, fileInputRef} = useAppContext();

  
     // référence au champ input file

    const onClickFile = () => {
        // Cliquer manuellement sur l’input file
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
        setFileName(file.name); // ou stocker directement le fichier selon ton besoin
            console.log("Fichier sélectionné :", file.name);
        }
    };


    const DeleteFile = ()=>{
        setFileName("")
        fileInputRef.current.value = ""
    }

  return (
    <div className='fileIcon'>
        <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }} // on cache le champ input
            onChange={handleFileChange}
        />

        <FontAwesomeIcon icon={faPaperclip} id="fapaper" onClick={()=>onClickFile()}/>

        {fileName != "" ? (
            <div id="fileName">
                <span>{fileName}</span>
                <span className='close' onClick={()=>DeleteFile()}>x</span>                
            </div>
            
        ):(
            <></>
        )}
        
    </div>
  )
}

export default FileIcon
