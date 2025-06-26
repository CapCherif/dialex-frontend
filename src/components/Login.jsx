import React, { useEffect, useState } from 'react'
import { Link,  useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { ValidateToken } from './aiFunctions'
import { CheckIfUserHasOrder } from './aiFunctions'
import { useAppContext } from '../context/Context'


function Login() {

  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [psw, setPsw] = useState('')
  const [errAuth, setErrAuth] = useState(false)
  const [msgActivation, setMsgActivation] = useState(false)
  const [msgWaitingAbonnement, setMsgWaitingAbonnement] = useState(false)

  const navigate = useNavigate();
  const {setUser, language} = useAppContext()

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
                    setUser(data.user)
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
      <h2 className='center'>
        {language == "fr" ?
        ("Connectez vous"):("سجّل الدخول")}
      </h2>
      
      <small><i>* Champ requis</i></small>
      <form onSubmit={handleLogin}>
        <div className="champ">
        {language == "fr" ?
          (<label htmlFor="email"> Email* </label>)
          :
          (
            <div style={{textAlign:"right"}}>
              <label htmlFor="email">   البريد الإلكتروني* </label>
            </div>
          )
        }          

          <input type="email" id='email' placeholder='example@gmail.com..' 
          value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className="champ">
          {language == "fr" ? (
          <label htmlFor="psw"> Mot de passe* </label>
          ) :
          (
            <div style={{textAlign:"right"}}>
              <label htmlFor="email">  كلمة السر* </label>
            </div>
          )
          }
          
          <input type="password" id='psw' placeholder='secret...' 
          value={psw} onChange={(e) => setPsw(e.target.value)} required />
        </div>

        <button>
        { loading ? <div className='loading-ring-white'></div> : <></> } 
        { language == "fr" ? "Se connecter" : "تسجيل" }
           
        </button>
        
        {
          language == "fr" ?(
            <p>Si vous n'avez pas encore de compte, veuillez vous <Link to="/subscribe">inscrire ici</Link></p>
          ): (  
          <p dir='rtl'>إذا لم يكن لديك حساب بعد، يُرجى  <Link to="/subscribe">التسجيل هنا</Link></p>
          )
        }
        
        
        
        {errAuth ? <div className="err">Erreur, mot de passe ou email incorrecte.</div> : <></> }
        {msgActivation ? <div className="info">Votre compte est en cours de validation, merci de patienter.</div> : <></> }
        {msgWaitingAbonnement ? <div className="info">Votre abonnement est en cours de traitement, merci de patienter.</div> : <></> }
      </form>
    </div>
  )
}

export default Login
