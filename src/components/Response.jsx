import LuminaLogo from "../assets/lumina.png";
import UserLogo from "../assets/user.png";
import { ImSpinner8 } from "react-icons/im";
import { FaCopy, FaPause, FaThumbsDown, FaThumbsUp, FaVolumeUp } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const ResponsComponent = ({ msg }) => {
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [audio, setAudio] = useState(null);
const handleLike = () => {
    setLiked((prev) => !prev);
    if (disliked) setDisliked(false);
  };
  useEffect(() => {
    if (audio) {
      setIsLoading(false);
      setIsPlaying(true);
      audio.play().catch((err) => console.error("Audio playback error:", err));
    } 
    
  }, [audio]);
  const handleDislike = () => {
    setDisliked((prev) => !prev);
    if (liked) setLiked(false);
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(msg.message);
    console.log("Text copied to clipboard:", msg.message);
    
  };
  const handleAudioVoice = async  (text) => {
    try{
      const response = await axios.post("https://test.parene.org/api/text_to_speech_token/", {
        text: text, // Assuming the endpoint expects a "text" field in the body
        user_id: parseInt(1051),
      });
      try {
        // Read the audio file
     
        console.log("https://test.parene.org/api/"+response.data.audio_file);
        
        const newAudio = new Audio("https://test.parene.org/api/"+response.data.audio_file); // Load the file into the Audio object
        newAudio.addEventListener("ended", () => {
          setIsPlaying(false);
        });
        console.log("newAudio", newAudio);
        
         setAudio(prev => (newAudio));
        console.log("audio", audio);
      } catch (error) {
        console.error("Error loading audio file:", error);
      }
      
    }catch{

    }
  }
  const handleAudio = async () => {
   
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }
    setIsLoading(true);
    console.log(audio);
    
    if(!audio){
        console.log("Ha");
        
      await handleAudioVoice(msg.message); 
    }else {
      setIsLoading(false);
      setIsPlaying(true);
      audio.play().catch((err) => console.error("Audio playback error:", err));
    }
   
  {
    /*
     speech.onstart = () => {
      setIsLoading(false);
      setIsPlaying(true);
    };
  
    speech.onend = () => {
      setIsPlaying(false);
    };
    */
  }
   
  

  };
    return (
          msg.sender === "user" ? (
                  <div key={msg.id} className={`msg ${msg.sender}`}>
                    <div className="msg_user">
                      {msg.message}
                    </div>
                    <img src={UserLogo} alt="" />
                  </div>
                ) : (
                  <div key={msg.id} className="msg-container-assistant" style={{ display: "flex",
                    flexDirection: "column",
                  }}>
                    <div className={`msg ${msg.sender}`} >
                    <img src={LuminaLogo} alt="" />
                    <div className="msg_lumina">
                       <ReactMarkdown>{msg.message}</ReactMarkdown>                     
                    </div>
                    </div>
                   
                    <div className="icons-container">
        
                    <button
                    onClick={handleLike}
                    className={`icon-btn ${liked ? "text-blue-500" : ""}`}
                    >
                      <FaThumbsUp />
                    </button>
                    <button
                      onClick={handleDislike}
                      className={`icon-btn ${disliked ? "text-red-500" : ""}`}
                    >
                      <FaThumbsDown />
                    </button>
                    <button   className="icon-btn" onClick={handleCopy} >
                      <FaCopy />
                    </button>
                    <button
              onClick={handleAudio}
              className="icon-btn"
              title={isPlaying ? "Pause" : "Lire à haute voix"}
            >
              {isLoading ? (
                <ImSpinner8 className="animate-spin" />
              ) : isPlaying ? (
                <FaPause className="text-yellow-500" />
              ) : (
                <FaVolumeUp />
              )}
            </button>
                      </div>
                  </div>
                )
    )
}
export default ResponsComponent;