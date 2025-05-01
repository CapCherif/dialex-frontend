

export const ValidateToken = async (token) => {

    try {
      const response = await fetch('http://localhost:3000/auth/validate-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token:token }) // ✅ JSON.stringify pour bien envoyer l'objet
      });
  
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
        
      }
      else{
        const data = await response.json();
        return true;
      }
  
      
  
    } catch (error) {
      return false;
    }
  };

  export const ValidateAdminToken = async (token) => {

    try {
      const response = await fetch('http://localhost:3000/auth/validate-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token:token }) // ✅ JSON.stringify pour bien envoyer l'objet
      });
  
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
        
      }
      else{
        const data = await response.json();
        return data;
      }
  
      
  
    } catch (error) {
      return false;
    }
  };


  export const CheckIfUserHasOrder = async (iduser) => {
    try {
      const response = await fetch('http://localhost:3000/orders/user/'+iduser, {
          method: 'GET',
          headers: {
          'Content-Type': 'application/json',
          }
          
        });
    
        if (!response.ok) {
          // Ici, on intercepte l'erreur envoyée par le backend
          throw new Error(data.message || 'Erreur inconnue');
        }
        else{
          let data = await response.json();
         
          return data;
         
        }
    
    } catch (err) {
          console.log(`Erreur lors de l'envoi: ${err.message}`);
        

    }
  }
  