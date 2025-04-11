// import React, { useEffect } from "react";
// import LuminaLogo from "../assets/lumina.png";
// import UserLogo from "../assets/user.png";
// import { useAppContext } from '../context/Context';

// const Conv = () => {

//     // from the context api
//     const { messages, typing, loadingThread, currentThreadId } = useAppContext();
   

//   return (
//     <div id="conv">

//     {
//       currentThreadId == null ? (
//         <div id="msg-debut">
//           <h1>Bienvenue à Dialex</h1>
//           <p>Veuillez selectionner un dossier ou ajoutez en un pour démarrer une nouvelle session juridique.</p>
//         </div>
//       ):<></>
//     }

//       {
//         loadingThread ? (
//           <div className="loader-fixed">
//             <div className="conv-loading"></div>
//           </div>
//         ):null
//       }
      
//       {messages.map((msg) =>
//         msg.sender === "user" ? (
//           <div key={msg.id} className={`msg ${msg.sender}`}>
//             <div className="msg_user">
//               {msg.message}
//             </div>
//             <img src={UserLogo} alt="" />
//           </div>
//         ) : (
//           <div key={msg.id} className={`msg ${msg.sender}`}>
//             <img src={LuminaLogo} alt="" />
//             <div className="msg_lumina">
//               {msg.message}
//             </div>
//           </div>
//         )
//       )}

//       {typing ? (
//         <div className="typing-animation">
//           <span></span><span></span><span></span>
//         </div>
//       ) : null}
//     </div>
//   );
// };

// export default Conv;






import React, { useEffect } from "react";

import { useAppContext } from '../context/Context';

import ResponsComponent from "./Response";

const Conv = ({proccessToPrint , setPrintAction}) => {

  const {  currentThreadId } = useAppContext();


  const handleDownloadPDF = () => {
    const divToPrint = document.getElementById("conv");
  
    if (!divToPrint) {
      console.error("Element with id 'conv' not found");
      return;
    }
  
    const newWindow = window.open("", "", "width=800,height=600");
  
    // Clone all styles and links from the current page
    const styles = [...document.querySelectorAll("style, link[rel='stylesheet']")]
      .map((node) => node.outerHTML)
      .join("\n");
  
    newWindow.document.open();
    newWindow.document.write(`
      <html>
        <head>
          <title>Print</title>
          ${styles} <!-- Inject styles -->
        </head>
        <body class="p-4">
          <div class="container mx-auto">
            ${divToPrint.innerHTML}
          </div>
        </body>
      </html>
    `);
    newWindow.document.close();
  
    newWindow.focus();
    newWindow.print();
    // newWindow.close(); // Optional
  };
    // from the context api
    const { messages, typing, loadingThread } = useAppContext();
   
    useEffect(()=> {
      console.log("proccessToPrint", proccessToPrint);
      if(proccessToPrint){
        handleDownloadPDF();
        setPrintAction(prev => false)
      }
        
    } , [proccessToPrint])

  return (
    <div id="conv" className="toPrintDoc">

      {
        loadingThread ? (
          <div className="loader-fixed">
            <div className="conv-loading"></div>
          </div>
        ):null
      }
      
      {messages.map((msg,index) =>
       <ResponsComponent msg ={msg}   key={msg.id || index}/>
      )}

      {
        currentThreadId == null ? (
          <div id="msg-debut">
            <h1>Bienvenue à Dzialex</h1>
            <p>Veuillez selectionner un dossier ou ajoutez en un pour démarrer une nouvelle session juridique.</p>
          </div>
        ):<></>
      }

      {typing ? (
        <div className="typing-animation">
          <span></span><span></span><span></span>
        </div>
      ) : null}
    </div>
  );
};

export default Conv;