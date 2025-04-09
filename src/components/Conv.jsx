import React, { useEffect } from "react";

import { useAppContext } from '../context/Context';

import ResponsComponent from "./Response";

const Conv = ({proccessToPrint , setPrintAction}) => {
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

      {typing ? (
        <div className="typing-animation">
          <span></span><span></span><span></span>
        </div>
      ) : null}
    </div>
  );
};

export default Conv;
