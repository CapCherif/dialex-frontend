import React from 'react'
import Logo from "../assets/logo-noir.png";
import { Link } from 'react-router-dom';
import Samia from "../assets/samia.jpg"; 
import Star1 from "../assets/star1.png"; 
// import Star2 from "../assets/star2.png"; 
import LogoDz from "../assets/logo-dkilmy.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import dzArabe from "../assets/dk_arabe.png";
import { useAppContext } from '../context/Context';

function Home() {
    const {language} = useAppContext();

  return (
    <div style={{backgroundColor:"lightgray"}}>

        <div id="home">
            <img src={Logo} alt="" id='home-logo' />

            <div id='banner'>
                <div id='banner-text'>
                    
                    { language == "fr" ? (
                        <h1>Assistante Juridique En Droit Algérien.</h1>
                     ) : (
                     <h1 dir='rtl'>المساعدة القانونية في القانون الجزائري</h1>
                    ) }
                    
                    
                    {language == "fr" ? 
                        <p>
                            Je suis Samia, une intelligence artificielle générative de dernière génération, spécialiste du Droit algérien.
                            Je peux répondre à toutes vos questions et vous aider dans l'élaboration de vos documents juridiques.
                        </p>
                        :
                        <p dir='rtl'>                           
                            أنا سامية، ذكاء اصطناعي توليدي من الجيل الأخير، متخصصة في القانون الجزائري.
                            يمكنني الإجابة على جميع أسئلتكم ومساعدتكم في إعداد مستنداتكم القانونية.
                        </p>
                    }
                    
                
                    {language == "fr" ? (
                        <Link className='home-btn' id='btn1' to={"/login"}>Commençons</Link>
                    ):(
                        <div style={{display:'flex',justifyContent:"center"}}>
                            <Link style={{width:"200px",textAlign:"center",

                            }} className='home-btn' id='btn1' to={"/login"}>لنبدأ</Link>
                        </div>
                    )}
                    

                    <div className="flex" id='serv'>
                        <div>
                            {language == "fr" ?
                            (<img src={Logo} alt="" id='first-i' />):
                            (
                                <section style={{display:'flex',justifyContent:"right"}}>
                                    <img src={Logo} alt="" id='first-i' />
                                </section>
                            )}
                            
                            {language == "fr" ?
                                (<p>Vous êtes un juriste professionnel, je peux analyser tout document juridique et vous fournir des conseils.</p>):
                                (
                                    <p dir="rtl" style={{fontSize:"22px"}}>
                                    أنت قانوني محترف، يمكنني تحليل أي مستند قانوني وتقديم النصائح لك.
                                    </p>
                                )
                            }
                            
                        </div>

                        <div>
                            
                            {language == "fr" ?
                            (<img src={Logo} alt="" id='second-i' />):
                            (
                                <section style={{display:'flex',justifyContent:"right"}}>
                                    <img src={Logo} alt="" id='second-i' />
                                </section>
                            )}
                            {language == "fr" ?
                                (<p>Vous êtes un étudiant en droit, je peux vous aider à comprendre, évaluer et rédiger des contenus juridiques.</p>):
                                (
                                    <p dir="rtl" style={{fontSize:"22px"}}>
                                    أنت طالب في القانون، يمكنني مساعدتك على الفهم والتقييم وصياغة المحتوى القانوني.
                                    </p>
                                )
                            }
                            
                        </div>

                        <div>
                            {language == "fr" ?
                            (<img src={Logo} alt="" id='third-i' />):
                            (
                                <section style={{display:'flex',justifyContent:"right"}}>
                                    <img src={Logo} alt="" id='third-i' />
                                </section>
                            )}

                            {language == "fr" ?
                                ( <p>Vous êtes un citoyen et souhaitez connaitre vos droits, des procédures juridiques, formulez une requête, je suis là.</p>):
                                (
                                    <p dir="rtl" style={{fontSize:"22px"}}>
                                    أنت مواطن وتود معرفة حقوقك والإجراءات القانونية، أو صياغة طلب، أنا هنا لمساعدتك.
                                    </p>
                                )
                            }
                           
                        </div>
                    </div>
                </div>

                <div id="banner-img">
                    <img src={Samia} alt="" className='_img' />
                    <img src={Star1} alt="" id="star1"/>
                    {/* <img src={Star1} alt="" id="star2" /> */}
                    {language == "fr" ? (
                        <Link className='home-btn' to={"/landing"} id='btn2'>En savoir plus sur moi</Link>
                    ):
                    (
                    <Link className='home-btn' dir='rtl' to={"/landing"} id='btn2'> معرفة المزيد عني</Link>
                    )}
                    
                   
                </div>


            </div>


        
        </div>

    

        <div id="home-footer">
            <div>
                <section>
                    {/* <h2 style={{color:'yellow'}}>دي زاد ذكاء علمي
                    </h2> */}
                    <img src={dzArabe} alt="" style={{width:'180px'}} />
                    <h2>Sarl DZ DAKAA ILMY</h2>
                    <img src={LogoDz} alt="" />
                </section>

                <section>
                    <h2>Contact</h2>
                    <Link to="#">
                        <FontAwesomeIcon icon={faLocationDot} />
                        <span>82, lotissement Geric, cité Zouaghi Ain El Bey 25000 Contantine</span>
                    </Link>
                    <Link to="mailto:dk-ilmy@parene.org">
                        <FontAwesomeIcon icon={faEnvelope} />
                        <span>dk-ilmy@parene.org</span>
                    </Link>
                    <Link to="tel:+213563839627">
                        <FontAwesomeIcon icon={faPhone} />
                        <span>+213 563 83 9627</span>
                    </Link>
                    
                    <Link to="whatsapp:+213 563 83 96 27">
                        <FontAwesomeIcon icon={faWhatsapp} />
                        <span>+213 563 83 96 27</span>
                    </Link>
                </section>

                <section>
                    <h2>                        
                        Politique de confidentialité                
                    </h2>
                    <a href="/politic.pdf" target="_blank" rel="noopener noreferrer">
                        Consulter
                    </a>
                  
                </section>

                <section>
                    <h2>                        
                        Conditions générales de vente                 
                    </h2>
                    <a href="/cgv.pdf" target="_blank" rel="noopener noreferrer">
                        Consulter
                    </a>
                </section>

                

               
            </div>


        </div>


    </div>
      )
}

export default Home
