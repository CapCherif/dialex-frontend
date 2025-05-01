import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { ValidateToken } from './aiFunctions';
function Subscribe() {


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
  }, [navigate])


      
    const [loading, setLoading] = useState(false)
    const [valideForm, setValideForm] = useState(false)
    
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [cabinet, setCabinet] = useState("")
    const [fullName, setFullName] = useState("")
    const [birthDate, setBirthDate] = useState("")
    const [address, setAddress] = useState("")

    const [psw, setPsw] = useState("")
    const [cpsw, setCpsw] = useState("")
    const [errPsw, setErrPsw] = useState(false)
    const [errLong, setErrLong] = useState(false)
    
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        if(psw.length < 6 && psw !== ""){
            setErrLong(true)
            setValideForm(false)
        }

        else if (cpsw !== psw) {

          setErrPsw(true)
          setValideForm(false)
          setErrLong(false)

        } else {
          setErrPsw(false)
          setValideForm(true)
        }
        console.log(valideForm)
    }, [psw, cpsw])

    async function handleSubscribe(e){
        e.preventDefault()
        console.log(valideForm)
        if(valideForm){
            let data;
            console.log(name, email, phone, psw, cpsw)
            setLoading(true)
            setTimeout( async () => {
                try {
                    const response = await fetch('http://localhost:3000/api/auth/register/user', {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json',
                        },
                        // credentials: 'include',
                        body: JSON.stringify({
                            name:fullName,
                            email:email,
                            phoneNumber:phone,
                            avatar:"default",
                            fullName:fullName,
                            cabinet:cabinet,
                            birthDate:"birthDate",
                            password:psw,
                            address:address
                        }),
                      });
                  
                      if (!response.ok) {
                          throw new Error(`Erreur HTTP: ${response.status}`);
                      }
                  
                      data = await response.json();
                      if(data){
                        setSuccess(true)
                        setLoading(false)
                        setName('')
                        setEmail('')
                        setPsw('')
                        setCpsw('')
                        setPhone('')
                        setErrLong(false)
                        setErrPsw(false)
                       }
                      
                } catch (err) {
                      console.log(`Erreur lors de l'envoi: ${err.message}`);
            
                } 
            }, 2000);
            
        }
        else{
            console.log("not a valid form")
        }
        

    } 

  
    return (
    <div className='auth-component large-form'>
        <h2>Inscrivez vous:</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id nesciunt, sed reprehenderit reiciendis odio eaque.</p>
        <form onSubmit={handleSubscribe}>
            <div className="champ">
                <label htmlFor="fullName">Nom et prénom *</label>
                <input type="text" id='fullName' placeholder='Votre nom et prénom...' required 
                value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>

            <div className="champ">
                <label htmlFor="phone">Téléphone *</label>
                <input type="text" id='phone' placeholder='+2130 00 00 00 00' required 
                value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>

            <div className="champ">
                <label htmlFor="email">Email*</label>
                <input type="email" id='email' placeholder='example@gmail.com..' required 
                value={email} onChange={(e) => setEmail(e.target.value)}  />
            </div>

            {/* <div className="champ">
                <label htmlFor="birthDate">Date de naissance *</label>
                <input type="text" id='birthDate' placeholder='DD/MM/YY' required 
                value={birthDate} onChange={(e) => setBirthDate(e.target.value)}  />
            </div> */}

            <div className="champ">
                <label htmlFor="address">Adresse*</label>
                <input type="text" id='address' placeholder='Cité, Commune..' required 
                value={address} onChange={(e) => setAddress(e.target.value)}  />
            </div>

            <div className="champ">
                <label htmlFor="cabinet">Institution*</label>
                <input type="text" id='cabinet' placeholder='Nom de votre cabinet..' required 
                value={cabinet} onChange={(e) => setCabinet(e.target.value)}  />
            </div>

            <div className="champ">
                <label htmlFor="psw">Mot de passe*</label>
                <input type="password" id='psw' placeholder='secret...'required 
                value={psw} onChange={(e) => setPsw(e.target.value)}  />
            </div>

            <div className="champ">
                <label htmlFor="cpsw">Confirmation du mot de passe*</label>
                <input type="password" id='cpsw' placeholder='secret...' required  
                value={cpsw} onChange={(e) => setCpsw(e.target.value)}  />
            </div>

            

            <button type='submit' 
            // disabled={loading || !name || !email || !phone || !psw || !cpsw}
            >
                {/* className={!valideForm || !phone || !psw || !email ? 'disabled' : '' } */}
                { loading ? <div className='loading-ring-white'></div> : <></> } 
                S'inscrire  
            </button>
            { errPsw ? <div className="err">Erreur de confirmation du mot de passe.</div> :<></> }
            { errLong ? <div className="err">Mot de passe trop court.</div> :<></> }
            { success ? <div className="success">Inscription réussie.</div> :<></> }
            <p>Si vous avez déja un compte, veuillez vous <Link to="/login">identifier ici</Link></p>
        </form>
    </div>
  )
}

export default Subscribe
