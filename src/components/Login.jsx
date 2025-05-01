import React, { useEffect, useState } from 'react'
import { Link,  useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { ValidateToken } from './aiFunctions'
import { CheckIfUserHasOrder } from './aiFunctions'


function Login() {

  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [psw, setPsw] = useState('')
  const [errAuth, setErrAuth] = useState(false)
  const [msgActivation, setMsgActivation] = useState(false)
  const [msgWaitingAbonnement, setMsgWaitingAbonnement] = useState(false)

  const navigate = useNavigate();


  // useEffect

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('access_token');
      const isValid = await ValidateToken(token);

      console.log('Token valide ?', isValid);

      if (isValid) {
        console.log('Redirection vers login...');
        navigate('/');
      }
    };

    checkToken();
  }, [navigate]);


  

  async function handleLogin(e){
    e.preventDefault()
   
        let data;
        setLoading(true)
        setTimeout( async () => {
            try {
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    // credentials: 'include',
                    body: JSON.stringify({
                        email:email,                        
                        password:psw
                    }),
                  });
              
                  if (!response.ok) {
                    // Ici, on intercepte l'erreur envoyée par le backend
                    throw new Error(data.message || 'Erreur inconnue');
                  }
                  else{
                    data = await response.json();
                    console.log(data)
                    if(data.user.isActive){
                      
                                           
                      // voir si il a un abonnement
                      let resp = await CheckIfUserHasOrder(data.user.id)
                      resp = resp.filter(order => order.state != 2)
                      console.log(resp)
                      if(resp.length == 0){
                        localStorage.setItem('iduser', data.user.id)
                        navigate('/abonnement')
                      }
                      else{
                        if(resp[0].state == 0){
                          setMsgWaitingAbonnement(true)
                          setLoading(false)

                        }
                        else if(resp[0].state == 2){
                          localStorage.setItem('iduser', data.user.id)
                          navigate('/abonnement')
                        }
                        else{

                          localStorage.setItem('access_token', data.access_token)
                          localStorage.setItem('login', true)
                          localStorage.setItem('iduser', data.user.id)
                          setLoading(false)
                          navigate('/');
                        }
                      }
                      // si oui navigate to /
                      // sinon navigate to Abonnement
                      
                      
                    }
                    else{
                      setMsgActivation(true)
                      setLoading(false)
                    }
                    setEmail('')
                    setPsw('')
    
                   
                  }
            
            } catch (err) {
                  console.log(`Erreur lors de l'envoi: ${err.message}`);
                  setErrAuth(true)
                  setLoading(false)
                    setTimeout(() => {
                      setErrAuth(false)
                    }, 5000);
        
            }
        }, 1000);
        
    }
    
    

 



  return (
    <div className='auth-component'>
      <img src={logo} alt="" />
      <h2 className='center'>Connectez vous</h2>
      
      <small><i>* Champ requis</i></small>
      <form onSubmit={handleLogin}>
        <div className="champ">
          <label htmlFor="email">Email*</label>
          <input type="email" id='email' placeholder='example@gmail.com..' 
          value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="champ">
          <label htmlFor="psw">Mot de passe*</label>
          <input type="password" id='psw' placeholder='secret...' 
          value={psw} onChange={(e) => setPsw(e.target.value)} />
        </div>

        <button>
        { loading ? <div className='loading-ring-white'></div> : <></> } 
          Se connecter  
        </button>
        
        <p>Si vous n'avez pas encore de compte, veuillez vous <Link to="/subscribe">inscrire ici</Link></p>
        {errAuth ? <div className="err">Erreur, mot de passe ou email incorrecte.</div> : <></> }
        {msgActivation ? <div className="info">Votre compte est en cours de validation, merci de patienter.</div> : <></> }
        {msgWaitingAbonnement ? <div className="info">Votre abonnement est en cours de traitement, merci de patienter.</div> : <></> }
      </form>
    </div>
  )
}

export default Login
