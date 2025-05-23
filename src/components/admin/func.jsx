export async function GetAllUsers(){
    try {
            
      const response = await fetch('http://localhost:3000/users/all', {
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
            
      const response = await fetch('http://localhost:3000/orders/all', {
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
            
      const response = await fetch('http://localhost:3000/abonnement/all', {
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