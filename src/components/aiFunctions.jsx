export const getCompletion = async (prompt) => {
    try {
      const response = await fetch('http://localhost:3000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: prompt }) // ✅ JSON.stringify pour bien envoyer l'objet
      });
  
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Réponse de l'IA :", data);
      return data;
  
    } catch (error) {
      console.error("Erreur fetch :", error);
      return null;
    }
  };
  