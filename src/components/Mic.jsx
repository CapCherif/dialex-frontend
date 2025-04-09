import React, { useEffect, useState } from "react";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useAppContext } from "../context/Context";

const Mic = ({setInputEnter}) => {
  const [isListening, setIsListening] = useState(false);
  const [volume, setVolume] = useState(0);
  const {addMessage, messages, setTyping, assistant, currentThreadId} = useAppContext();
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      console.warn("SpeechRecognition n'est pas supporté par ce navigateur.");
      return;
    }

    setIsListening(listening);
  }, [listening, browserSupportsSpeechRecognition]);

  useEffect(() => {
    setInputEnter(transcript);
  }, [transcript]);
  // Simule les changements de volume pour la démonstration
  useEffect(() => {
    const simulateVolume = setInterval(() => {
      if (isListening) {
        setVolume(Math.random() * 10);
      } else {
        setVolume(0);
      }
    }, 300);

    return () => clearInterval(simulateVolume);
  }, [isListening]);
  const handleMicrophoneClick = () => {
    if (!browserSupportsSpeechRecognition) {
      alert("Votre navigateur ne supporte pas la reconnaissance vocale.");
      return;
    }

    if (isListening) {
      console.log("Arrêt immédiat de la reconnaissance vocale...");
      SpeechRecognition.stopListening();
     
      resetTranscript();
      setVolume(0);
    } else {
      console.log("Démarrage de la reconnaissance vocale...");
      setTimeout(() => {
        try {
          SpeechRecognition.startListening({
            continuous: true,
            language: "fr-FR",
          });
        } catch (error) {
          console.error(
            "Erreur lors du démarrage de la reconnaissance vocale :",
            error
          );
        }
      }, 300); // Attendre pour éviter un conflit immédiat avec `stopListening`
    }
  };
  return (
    <>
      <FontAwesomeIcon icon={faMicrophone} id="famic"  onClick={handleMicrophoneClick} style={{
            position: "relative",
            boxShadow: isListening ? `0 0 ${volume * 5}px red` : "none",
          }}/>
    </>
  );
};

export default Mic;
