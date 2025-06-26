export async function GetAllUsers(){
    try {
            
      const response = await fetch('/api/users/all', {
          method: 'GET',
          headers: {
          'Content-Type': 'application/json',
          },
  
          
        });
    
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
    
        let data = await response.json();
        return data
        
    } catch (err) {
          console.log(`Erreur lors de l'envoi: ${err.message}`);
            return []
    } 
  
  }



  export async function GetAllOrders(){
    try {
            
      const response = await fetch('/api/orders/all', {
          method: 'GET',
          headers: {
          'Content-Type': 'application/json',
          },
  
          
        });
    
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
    
        let data = await response.json();
        return data
        
    } catch (err) {
          console.log(`Erreur lors de l'envoi: ${err.message}`);
            return []
    } 
  
  }

  export async function GetAllAbonnement(){
    try {
            
      const response = await fetch('/api/abonnement/all', {
          method: 'GET',
          headers: {
          'Content-Type': 'application/json',
          },
  
          
        });
    
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
    
        let data = await response.json();
        return data
        
    } catch (err) {
          console.log(`Erreur lors de l'envoi: ${err.message}`);
            return []
    } 
  
  }