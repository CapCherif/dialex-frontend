import React, { useEffect, useState } from "react";
import LuminaLogo from "../assets/lumina.png";
import UserLogo from "../assets/user.png";
import { ImSpinner8 } from "react-icons/im";
import { FaCopy, FaPause, FaThumbsDown, FaThumbsUp, FaVolumeUp } from "react-icons/fa";
import { useAppContext } from '../context/Context';

// ChatGPT Response Formatter Component
const ChatGPTFormatter = ({ content }) => {
  // Parse and format the response text
  const formatResponse = (text) => {
    if (!text) return null;

    // If the content is a simple text without any markdown, return it directly wrapped in a paragraph
    if (!text.includes('```') && !text.includes('|') && !text.includes('#') && !text.includes('*')) {
      return (
        <div className="chatgpt-formatted-response">
          <p className="response-paragraph">{text}</p>
        </div>
      );
    }

    // Split by code blocks first
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(text)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        const beforeText = text.slice(lastIndex, match.index);
        parts.push({ type: 'text', content: beforeText });
      }

      // Add code block
      parts.push({
        type: 'codeblock',
        language: match[1] || 'text',
        content: match[2].trim()
      });

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push({ type: 'text', content: text.slice(lastIndex) });
    }

    return parts.length > 0 ? parts : [{ type: 'text', content: text }];
  };

  // Parse table from markdown format
  const parseTable = (text) => {
    const lines = text.trim().split('\n');
    if (lines.length < 2) return null;

    // Check if it's a table by looking for the separator line
    const separatorLine = lines[1];
    if (!separatorLine.match(/^\|[-:\s|]*\|$/)) return null;

    const headers = lines[0].split('|').slice(1, -1).map(cell => cell.trim());
    const rows = lines.slice(2).map(line => 
      line.split('|').slice(1, -1).map(cell => cell.trim())
    );

    return { headers, rows };
  };

  // Format inline elements
  const formatInlineText = (text) => {
    // Handle article references with content (full article text)
    text = text.replace(/^-\s*\*\*(Article\s+\d+)\*\*\s*:\s*(.+)$/gm, '<div class="article-container"><div class="article-reference">$1</div><div class="article-content">$2</div></div>');
    
    // Handle regular article references (without content)
    text = text.replace(/^-\s*\*\*(Article\s+\d+)\*\*/gm, '<div class="article-reference">$1</div>');
    
    // Handle inline code
    text = text.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');
    
    // Handle bold text (but not if already handled as article)
    text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    
    // Handle italic text
    text = text.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    
    // Handle links
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="response-link">$1</a>');
    
    return text;
  };

  // Format paragraphs and lists
  const formatTextContent = (text) => {
    const lines = text.split('\n');
    const elements = [];
    let currentList = null;
    let currentListType = null;
    let tableContent = [];
    let isCollectingTable = false;
    let isInMetadata = false;
    let metadataContent = [];

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      
      // Detect metadata section (key: value format)
      const metadataMatch = trimmedLine.match(/^([^:]+)\s*:\s*(.+)$/);
      if (metadataMatch && !isCollectingTable) {
        if (!isInMetadata) {
          isInMetadata = true;
          metadataContent = [];
        }
        metadataContent.push({
          key: metadataMatch[1].trim(),
          value: metadataMatch[2].trim()
        });
        return;
      } else if (isInMetadata && (!trimmedLine || !metadataMatch)) {
        // End of metadata section
        elements.push(
          <div key={`metadata-${index}`} className="response-metadata">
            {metadataContent.map((item, i) => (
              <div key={i} className="response-metadata-item">
                <span className="response-metadata-key">{item.key}</span>
                <span className="response-metadata-value">{item.value}</span>
              </div>
            ))}
          </div>
        );
        isInMetadata = false;
        metadataContent = [];
      }

      // Handle table lines
      if (trimmedLine.startsWith('|') || (isCollectingTable && trimmedLine)) {
        tableContent.push(trimmedLine);
        isCollectingTable = true;
        return;
      } else if (isCollectingTable && !trimmedLine) {
        // End of table
        const table = parseTable(tableContent.join('\n'));
        if (table) {
          elements.push(
            <div key={`table-${index}`} className="response-table-container">
              <table className="response-table">
                <thead>
                  <tr>
                    {table.headers.map((header, i) => (
                      <th key={i}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {table.rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} dangerouslySetInnerHTML={{ __html: formatInlineText(cell) }} />
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        tableContent = [];
        isCollectingTable = false;
        return;
      }

      if (!trimmedLine) {
        // Empty line - close current list if exists
        if (currentList) {
          elements.push(
            <div key={`list-${elements.length}`} className={currentListType === 'ordered' ? 'response-ordered-list' : 'response-unordered-list'}>
              {currentList}
            </div>
          );
          currentList = null;
          currentListType = null;
        }
        return;
      }

      // Check for numbered list
      const numberedMatch = trimmedLine.match(/^(\d+)\.\s+(.+)$/);
      if (numberedMatch) {
        if (currentListType !== 'ordered') {
          if (currentList) {
            elements.push(
              <div key={`list-${elements.length}`} className="response-unordered-list">
                {currentList}
              </div>
            );
          }
          currentList = [];
          currentListType = 'ordered';
        }
        currentList.push(
          <div key={`item-${index}`} className="response-list-item response-numbered">
            <span className="response-list-marker">{numberedMatch[1]}.</span>
            <span dangerouslySetInnerHTML={{ __html: formatInlineText(numberedMatch[2]) }} />
          </div>
        );
        return;
      }

      // Check for bullet list
      const bulletMatch = trimmedLine.match(/^[-*]\s+(.+)$/);
      if (bulletMatch) {
        if (currentListType !== 'unordered') {
          if (currentList) {
            elements.push(
              <div key={`list-${elements.length}`} className="response-ordered-list">
                {currentList}
              </div>
            );
          }
          currentList = [];
          currentListType = 'unordered';
        }
        currentList.push(
          <div key={`item-${index}`} className="response-list-item response-bulleted">
            <span className="response-list-marker">•</span>
            <span dangerouslySetInnerHTML={{ __html: formatInlineText(bulletMatch[1]) }} />
          </div>
        );
        return;
      }

      // Check for headers with enhanced styling
      const headerMatch = trimmedLine.match(/^(#{1,6})\s+(.+)$/);
      if (headerMatch) {
        if (currentList) {
          elements.push(
            <div key={`list-${elements.length}`} className={currentListType === 'ordered' ? 'response-ordered-list' : 'response-unordered-list'}>
              {currentList}
            </div>
          );
          currentList = null;
          currentListType = null;
        }
        const level = headerMatch[1].length;
        const HeaderTag = `h${Math.min(level, 6)}`;
        elements.push(
          <HeaderTag 
            key={`header-${index}`} 
            className={`response-header response-header-${level}`}
            dangerouslySetInnerHTML={{ __html: formatInlineText(headerMatch[2]) }}
          />
        );
        return;
      }

      // Regular paragraph
      if (currentList) {
        elements.push(
          <div key={`list-${elements.length}`} className={currentListType === 'ordered' ? 'response-ordered-list' : 'response-unordered-list'}>
            {currentList}
          </div>
        );
        currentList = null;
        currentListType = null;
      }

      if (trimmedLine) {
        elements.push(
          <p key={`p-${index}`} className="response-paragraph" dangerouslySetInnerHTML={{ __html: formatInlineText(trimmedLine) }} />
        );
      }
    });

    // Close any remaining list
    if (currentList) {
      elements.push(
        <div key={`list-${elements.length}`} className={currentListType === 'ordered' ? 'response-ordered-list' : 'response-unordered-list'}>
          {currentList}
        </div>
      );
    }

    return elements;
  };

  const copyCodeToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Code copied to clipboard');
    });
  };

  const parts = formatResponse(content);
  
  // If parts is a React element (for simple text), return it directly
  if (React.isValidElement(parts)) {
    return parts;
  }

  // Otherwise, render the formatted content
  return (
    <div className="chatgpt-formatted-response">
      <style jsx>{`
        .chatgpt-formatted-response {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          line-height: 1.6;
          color: inherit;
          max-width: 100%;
        }

        .response-paragraph {
          margin: 0 0 16px 0;
          word-wrap: break-word;
        }

        .response-paragraph:last-child {
          margin-bottom: 0;
        }

        .response-header {
          font-weight: 600;
          margin: 24px 0 16px 0;
          line-height: 1.3;
          position: relative;
          padding-left: 12px;
          border-left: 4px solid #2563eb;
        }

        .response-header-1 { 
          font-size: 1.875rem; 
          color: #1a365d;
          border-bottom: 2px solid #e2e8f0;
          padding-bottom: 8px;
        }
        .response-header-2 { 
          font-size: 1.5rem;
          color: #2d3748;
        }
        .response-header-3 { 
          font-size: 1.25rem;
          color: #4a5568;
        }
        .response-header-4 { 
          font-size: 1.125rem;
          color: #4a5568;
        }
        .response-header-5 { 
          font-size: 1rem;
          color: #4a5568;
        }
        .response-header-6 { 
          font-size: 0.875rem;
          color: #4a5568;
        }

        .response-unordered-list, .response-ordered-list {
          margin: 16px 0;
          padding: 0;
        }

        .response-list-item {
          display: flex;
          margin: 8px 0;
          align-items: flex-start;
        }

        .response-list-marker {
          margin-right: 8px;
          color: #6b7280;
          font-weight: 500;
          min-width: 20px;
        }

        .response-bulleted .response-list-marker {
          margin-top: 2px;
        }

        .response-code-block {
          background: #1f2937;
          border-radius: 8px;
          margin: 16px 0;
          overflow: hidden;
          font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
        }

        .response-code-header {
          background: #374151;
          padding: 8px 16px;
          font-size: 0.875rem;
          color: #d1d5db;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .response-copy-button {
          background: #4b5563;
          border: none;
          color: #d1d5db;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.75rem;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .response-copy-button:hover {
          background: #6b7280;
        }

        .response-code-content {
          padding: 16px;
          overflow-x: auto;
          color: #e5e7eb;
          font-size: 0.875rem;
          line-height: 1.5;
          white-space: pre;
        }

        .inline-code {
          background: #f3f4f6;
          color: #dc2626;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
          font-size: 0.875em;
        }

        .response-link {
          color: #2563eb;
          text-decoration: underline;
        }

        .response-link:hover {
          color: #1d4ed8;
        }

        .response-table-container {
          margin: 16px 0;
          overflow-x: auto;
        }

        .response-table {
          border-collapse: collapse;
          width: 100%;
          margin-bottom: 1rem;
          background-color: transparent;
        }

        .response-table th,
        .response-table td {
          padding: 12px;
          border: 1px solid #e5e7eb;
          text-align: left;
        }

        .response-table th {
          background-color: #f3f4f6;
          font-weight: 600;
        }

        .response-table tr:nth-child(even) {
          background-color: #f9fafb;
        }

        .response-table tr:hover {
          background-color: #f3f4f6;
        }

        .response-metadata {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 16px;
          margin: 16px 0;
        }

        .response-metadata-item {
          display: flex;
          margin: 8px 0;
          align-items: flex-start;
          gap: 12px;
        }

        .response-metadata-key {
          font-weight: 600;
          color: #4a5568;
          min-width: 160px;
          position: relative;
        }

        .response-metadata-key::after {
          content: ":";
          position: absolute;
          right: 0;
        }

        .response-metadata-value {
          color: #1a202c;
          flex: 1;
        }

        .article-container {
          margin: 1.5rem 0;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .article-reference {
          font-size: 1.1rem;
          font-weight: 600;
          color: #2563eb;
          padding: 0.75rem 1rem;
          background: #f8fafc;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          align-items: center;
        }

        .article-reference::before {
          content: "§";
          margin-right: 0.75rem;
          color: #64748b;
          font-weight: normal;
          font-size: 1.2rem;
        }

        .article-content {
          padding: 1rem;
          color: #1e293b;
          line-height: 1.6;
          font-size: 1rem;
        }

        /* When article reference appears alone without content */
        .article-reference:not(.article-container .article-reference) {
          display: inline-flex;
          margin: 0.5rem 0;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          background: #f8fafc;
        }
      `}</style>

      {parts.map((part, index) => {
        if (part.type === 'codeblock') {
          return (
            <div key={index} className="response-code-block">
              <div className="response-code-header">
                <span>{part.language}</span>
                <button 
                  className="response-copy-button"
                  onClick={() => copyCodeToClipboard(part.content)}
                >
                  Copy code
                </button>
              </div>
              <div className="response-code-content">{part.content}</div>
            </div>
          );
        } else {
          return (
            <div key={index}>
              {formatTextContent(part.content)}
            </div>
          );
        }
      })}
    </div>
  );
};

const ResponsComponent = ({ msg }) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audio, setAudio] = useState(null);
  const { autoAudio, autoAudioActivatedAt } = useAppContext();

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

  // Auto play audio for assistant responses if autoAudio is enabled and message is after activation
  useEffect(() => {
    if (
      msg.sender === 'assistant' &&
      autoAudio &&
      autoAudioActivatedAt &&
      msg.message &&
      new Date(msg.createdAt).getTime() >= autoAudioActivatedAt
    ) {
      handleAudioVoice(msg.message);
    }
    // eslint-disable-next-line
  }, [msg.id, autoAudio, autoAudioActivatedAt]);

  const handleDislike = () => {
    setDisliked((prev) => !prev);
    if (liked) setLiked(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(msg.message);
    console.log("Text copied to clipboard:", msg.message);
  };

  const handleAudioVoice = async (text) => {
    try {
      // Remplacé axios par fetch
      const response = await fetch("https://test.parene.org/api/text_to_speech_token/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          user_id: parseInt(1051),
        }),
      });
      
      const data = await response.json();
      
      try {
        console.log("https://test.parene.org/" + data.audio_file);
        
        const newAudio = new Audio("https://test.parene.org/api/" + data.audio_file);
        newAudio.addEventListener("ended", () => {
          setIsPlaying(false);
        });
        console.log("newAudio", newAudio);
        
        setAudio(prev => (newAudio));
        console.log("audio", audio);
      } catch (error) {
        console.error("Error loading audio file:", error);
      }
    } catch (error) {
      console.error("Error in text to speech:", error);
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
    
    if (!audio) {
      console.log("Ha");
      await handleAudioVoice(msg.message); 
    } else {
      setIsLoading(false);
      setIsPlaying(true);
      audio.play().catch((err) => console.error("Audio playback error:", err));
    }
  };

  function formatDate(isoDate) {
    const date = new Date(isoDate);
  
    const options = {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
  
    return date.toLocaleString('fr-FR', options);
  }
  
  return (
    msg.sender === "user" ? (
      <div key={msg.id} className={`msg ${msg.sender}`}>
        <div className="msg_user">
          {msg.message}
          <p className="date">{formatDate(msg.createdAt)}</p>
        </div>
        <img src={UserLogo} alt="" />
      </div>
    ) : (
      <div key={msg.id} className="msg-container-assistant" style={{ 
        display: "flex",
        flexDirection: "column",
      }}>
        <div className={`msg ${msg.sender}`}>
          <img src={LuminaLogo} alt="" />
          <div className="msg_lumina">
            <ChatGPTFormatter content={msg.message} />
            <p className="date">{formatDate(msg.createdAt)}</p>                 
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
          <button className="icon-btn" onClick={handleCopy}>
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
  );
};

export default ResponsComponent;