import './App.css'
import Navigatorbox from './Components/Navigatorbox.jsx'
import Headline from './Components/Headline.jsx'
import Referencerbox from './Components/Referencerbox.jsx'
import Feedbacker from './Components/Feedbacker.jsx'
import Feedbacker_text_area from './Components/Feedbacker_text_area.jsx'
import Certificatebox from './Components/Certificatebox.jsx'
import Aboutbox from './Components/Aboutbox.jsx'
import {FaFacebook, FaLinkedin, FaUserTie, FaTimes} from 'react-icons/fa'
import {FcGoogle} from "react-icons/fc";
import { IoIosArrowDown } from "react-icons/io";
import axios from 'axios';
import { useEffect, useState } from 'react';
/* import { ClipLoader } from 'react-spinners'; */
import Loader from './Components/Loader';

function App() {

  let FCA_BASE_URL = "https://api.freecurrencyapi.com/v1/latest";
  let API_KEY= "fca_live_brqKhIOwsEXlWTJUpBp218bF4I6wWySL9GxVteb6";
  const BASE_URL = "http://localhost:3005";
  const [selectedFeedbacker, setSelectedFeedbacker] = useState('1');
  const [currentClass, setCurrentClass] = useState('fontStyle1');
  const intervalDuration = 5000;
  const [isOpen, setIsOpen] = useState(false);
  const [userID, setUserID] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isUpdatePasswordVisible, setIsUpdatePasswordVisible] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isFormVisible, SetisFormVisible] = useState({formPageOne: false, formPageTwo: false, formPageThree: false, formPageFour: false, formPageFive: false, formPageSix: false, formPageSeven: false});
  const [newForm, setNewForm] = useState({ age: 0, gender: true, measurements: {weight: 0, height: 0, bmi: 0.0}, numberKids: 0, smoke: false, region: {northeast: false, northwest: false, southeast: false, southwest: false}});
  const [selectedRegion, setSelectedRegion] = useState('northeast');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [currency, setCurrency] = useState("USD");
  const [convertedData, setConvertedData] = useState(0)
  /* const [sentForm, setSentForm] = useState({ age: 0, gender: true, measurements: {weight: 0, height: 0, bmi: 0.0}, numberKids: 0}); */

  useEffect(() => {
    const classes = ["fontStyle1", "fontStyle2", "fontStyle3", "fontStyle4", "fontStyle5", "fontStyle6", "fontStyle7"];
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % classes.length;
      setCurrentClass(classes[index]);

      return () => clearInterval(interval);
    }, intervalDuration);
  }, []);

  useEffect(() => {
    if (data && data.description !== undefined) {
        setConvertedData(data.description);
    }
  }, [data]);

  const handleCurrency = async (e) => {
    setCurrency(e.target.value);

    const response_Currency = await axios.get(`${FCA_BASE_URL}?apikey=${API_KEY}`);

    if (e.target.value === 'USD') {
      setConvertedData((data.description * response_Currency.data.data["USD"]).toFixed(2));
  } else if (e.target.value  === 'EUR') {
      setConvertedData((data.description* response_Currency.data.data["EUR"]).toFixed(2));
  } else if (e.target.value  === 'TRY') {
      setConvertedData((data.description * response_Currency.data.data["TRY"]).toFixed(2));
  }

    console.log(response_Currency.data.data);
    console.log(currency);
    console.log(e.target.value);
  }

  /* useEffect(() => {

    const response_Currency = handleCurrency();
    console.log(response_Currency)

    if (currency === 'USD') {
        console.log('currency değeri USD\'dir');

    } else if (currency === 'EUR') {
        console.log('currency değeri EUR\'dur');

    } else if (currency === 'TRY') {
        console.log('currency değeri TRY\'dir');

    }
  }, [currency]); */

  /* useEffect(() => {
    setSentForm(prevForm => ({ ...prevForm, gender: newForm.gender }));
  }, [newForm.gender]); */

  const togglePopup = () => {
    setEmail("");
    setPassword("");
    setNewUser({ name: '', email: '', password: '' });
    setIsOpen(!isOpen);
    setIsUpdatePasswordVisible(false);
  };

  const toggleDropDown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const toggleUpdatePassword = () => {
    setIsUpdatePasswordVisible(!isUpdatePasswordVisible);
    setIsOpen(false);
    setOldPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  }

  const toggleTrueVisibility = () => {
    setIsVisible(true);
  };

  const toggleFalseVisibility = () => {
    setIsVisible(false);
  }

  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
  };

  const handleSignInClick = () => {
    setIsRightPanelActive(false);
  };

  const handleScroll = (event, targetId) => {
    event.preventDefault();
    const targetElement = document.getElementById(targetId);
    const offset = 75;

    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    });
  };

  const handleSignOut = () => {
    setError(null)

    try{
        toggleFalseVisibility();
        setUserID("");
        setName("");
        toggleDropDown();
        setIsUpdatePasswordVisible(false);
        setIsOpen(false);
    }catch(error) {
      console.error('Error adding user:', error);
      setError('An error occurred while adding the user. Please try again.');
    }
  }

  const handleDeleteAccount = async(e) => {
    e.preventDefault();
    setError(null);

    try{
      const response_Delete = await axios.delete(`${BASE_URL}/users/${userID}`);
      console.log(response_Delete.data);
      alert('Delete successful!');
      toggleFalseVisibility();
      setUserID("");
      setName("");
      setIsDropdownVisible(false);
      setIsUpdatePasswordVisible(false);
      setIsOpen(false);
    }catch(error){
      console.error('Error adding user:', error);
      setError('An error occurred while adding the user. Please try again.');
    }
  }

  const handleSwitchToggle = () => {
    setNewForm(prevForm => ({ ...prevForm, gender: !prevForm.gender }));
  };

  const handleSwitchToggleSmoke = () => {
    setNewForm(prevForm => ({ ...prevForm, smoke: !prevForm.smoke }));
  };

  const handleformPageTwoUpdate = () => {
    setError(null);
    if(newForm.age >18 && newForm.age <= 120) {
      /* setSentForm({...sentForm, age: newForm.age}); */ //Çalışmıyor
      SetisFormVisible(prevState => ({ ...prevState, formPageTwo: false, formPageThree: true}));
      /* console.log(sentForm.age); */
      console.log(newForm.age);
    }else{
      setError("18 ile 120 arası değerler giriniz")
    }
  };

  const handleformPageThreeUpdate = () => {
    /* setSentForm(prevForm => ({ ...prevForm, gender: newForm.gender })); */ //Çalışmıyor
    SetisFormVisible(prevState => ({ ...prevState, formPageThree: false, formPageFour: true}));
    console.log(newForm.gender);
    /* console.log(sentForm.gender); */
  };

  const handleFourPageChange = (e) => {
    const { name, value } = e.target;
    setNewForm((prevState) => ({
      ...prevState,
      measurements: {
        ...prevState.measurements,
        [name]: parseFloat(value) || 0
      }
    }));
  };

  const handleformPageFourUpdate = () => {
    setNewForm((prevState) => ({
      ...prevState, measurements: {
        ...prevState.measurements,
        bmi: (prevState.measurements.weight / ((prevState.measurements.height / 100) ** 2)).toFixed(2)
      }
    }));
    console.log(newForm.measurements.weight);
    console.log(newForm.measurements.height);
    console.log(newForm.measurements.bmi);
    SetisFormVisible(prevState => ({ ...prevState, formPageFour: false, formPageFive: true}));
  };

  const handleformPageFiveUpdate = () => {
    setError(null);
    if(newForm.numberKids >0 && newForm.numberKids <= 69) {
      /* setSentForm({...sentForm, numberKids: newForm.numberKids}); */
      setNewForm({ ...newForm, numberKids: newForm.numberKids});
      SetisFormVisible(prevState => ({ ...prevState, formPageFive: false, formPageSix: true}));
      /* console.log(sentForm.numberKids); */
      console.log(newForm.numberKids);
    }else{
      setError("0 ile 69 arası değerler giriniz")
    }
  };

  const handleformPageSixUpdate = () => {
    /* setSentForm(prevForm => ({ ...prevForm, gender: newForm.gender })); */ //Çalışmıyor
    SetisFormVisible(prevState => ({ ...prevState, formPageSix: false, formPageSeven: true}));
    console.log(newForm.smoke);
    /* console.log(sentForm.gender); */
  };

/*   useEffect(() => {
    console.log(newForm.region.northeast);
    console.log(newForm.region.northwest);
    console.log(newForm.region.southeast);
    console.log(newForm.region.southwest);
  }, [newForm]); */

  const handleformPageSevenUpdate = () => {
    /* setNewForm(prevForm => ({
      ...prevForm,
      region: {
        ...prevForm.region,
        [selectedRegion]: true
      }
    }));
    SetisFormVisible(prevState => ({ ...prevState, formPageSeven: false, formPageEight: true}));
    setLoading(true);
    axios.post('http://localhost:5000/api/data', { input:  newForm})
      .then(response => {
        setData(response.data);
        setLoading(false);
        
      })
      .catch(error => {
        console.error("There was an error posting the data!", error);
        setLoading(false);
      }); */
      setNewForm(prevForm => {
        const updatedForm = {
          ...prevForm,
          region: {
            ...prevForm.region,
            [selectedRegion]: true
          }
        };
    
        SetisFormVisible(prevState => ({ ...prevState, formPageSeven: false, formPageEight: true }));
        setLoading(true);
    
        axios.post('http://localhost:5000/api/data', { input: updatedForm })
          .then(response => {
            setData(response.data);
            setLoading(false);
          })
          .catch(error => {
            console.error("There was an error posting the data!", error);
            setLoading(false);
          });
    
        return updatedForm;
      });
  };

  const handleformPageEightUpdate = () => {
    SetisFormVisible(prevState => ({ ...prevState, formPageEight: false }));
    setNewForm({
      age: 0,
      gender: true,
      measurements: {
        weight: 0,
        height: 0,
        bmi: 0.0
      },
      numberKids: 0,
      smoke: false,
      region: {
        northeast: false,
        northwest: false,
        southeast: false,
        southwest: false
      }
    });
  }

  const getSelectedRegion = (event) => {
    setSelectedRegion(event.target.value);
  };

  const handlePasswordUpdate = async(e) => {
    e.preventDefault();
    setError(null);
    
    try{
      const response_Update_Login = await axios.get(`${BASE_URL}/users/${userID}`);
      const user = response_Update_Login.data;
      console.log(response_Update_Login.data);

      if(user.password == oldPassword) {
        if(newPassword == confirmNewPassword) {
          const updateUser = (userID ,{
            "id": userID,
            "name": user.name,
            "email": user.email,
            "password": newPassword,
          });
          try{
            const response_Update = await axios.put(`${BASE_URL}/users/${userID}`, updateUser);
            console.log(response_Update.data);
            alert('Update successful!');
            toggleFalseVisibility();
            setUserID("");
            setName("");
            setIsDropdownVisible(false);
            setIsUpdatePasswordVisible(false);
            setIsOpen(false);
          }catch(error){
            console.error('Error adding user:', error);
            setError('An error occurred while adding the user. Please try again.');
          }
        }else{
          setError("Yeni şifre doğrulanamadı")
        }
      }else{
        setError("Eski Şifre hatalı")
      }
    }catch(error) {
      console.error('Error adding user:', error);
      setError('An error occurred while adding the user. Please try again.');
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try{
      const response_Login = await axios.get(`${BASE_URL}/users`);
      const users = response_Login.data;

      const user = users.find(u => u.email === email && u.password === password);
      console.log(user);

      if(user) {
        alert('Login successful!');
        setUserID(user.id);
        console.log(userID);
        setName(user.name);
        console.log(name);
        toggleTrueVisibility();
        togglePopup();
      }else{
        setError('Invalid email or password');
      }
    }catch(error) {
      console.error("Error fetching users:", error);
      setError('An error occurred. Please try again.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    try{
      const response_Register = await axios.post(`${BASE_URL}/users`, {
        name: newUser.name,
        email: newUser.email,
        password: newUser.password
      });
      /* console.log('Yeni Kullanıcı:', response_Register.data); */
      alert('User added successfully!');
      setNewUser({ name: '', email: '', password: '' });
      updateName();
      toggleVisibility();
      togglePopup();
    }catch(error){
      console.error('Error adding user:', error);
      setError('An error occurred while adding the user. Please try again.');
    }
  };


  return (
    <>
    <div className='landign-page'>
      {/* Navbar çubuğu */}
      <div className='navbar-container'>
        {/* Logo kutusu */}
        <a onClick={(e) => handleScroll(e, "slogan")}><div className='logo-container'>
          <img src="\Logo.png" alt="Guardian Logo" className='logo-image' />
          <h1 className='logo-text'>Guardian</h1>
        </div></a>
        {/* Navigasyon butonları */}
        <div className='navigator-container'>
          <a onClick={(e) => handleScroll(e, "reference")}>
          <Navigatorbox text="References" />
          </a>
          <a onClick={(e) => handleScroll(e, "feedback")}><Navigatorbox text="Feedbacks" /></a>
          <a onClick={(e) => handleScroll(e, "certificate")}><Navigatorbox text="Certificates" /></a>
          <a onClick={(e) => handleScroll(e, "about-us")}><Navigatorbox text="About Us" /></a>
          <a onClick={(e) => handleScroll(e, "contact-us")}><Navigatorbox text="Contact Us" /></a>
        </div>
        {/* Hesap İşlemleri */}
        <div className='account-container'>
          {isVisible && (
            <button className='user-button' onClick={toggleDropDown}>
              <FaUserTie /> 
              <p>{name}</p>
              <IoIosArrowDown />
            </button>
          )}
          <button className='register-button' onClick={togglePopup}>Sign up for free or Login</button>
        </div>
      </div>

      {/* Slogan Bölümü */}
      <div className='slogan-container' id='slogan'>
        <div className='slogan-box'>
          <h1 className={`commonStyle ${currentClass}`}>Guardian of Your Health, Assurance for Life</h1>
        </div>
        <button className='started-button' onClick={() => SetisFormVisible(prevState => ({ ...prevState, formPageOne: true }))}>
          Get Started Now
        </button>
      </div>

      {/* Referans Bölümü */}
      <div className='reference-container' id='reference'>
        <Headline text="REFERENCES" />

        {/* Referencerlar */}
        <div className='referencers'>
          <ul className='reference-ul'>
            <li className='reference-li'><a href="https://www.turkishairlines.com" target="_blank"><Referencerbox img="/Referencer_Logos/Turkish_Airlines_Logo.png" text="Turkish Airline" /></a></li>
            <li className='reference-li'><a href="https://www.englishhome.com/" target="_blank"><Referencerbox img="/Referencer_Logos/English_Home_Logo.png" text="English Home"/></a></li>
            <li className='reference-li'><a href="https://www.ziraatbank.com.tr/" target="_blank"><Referencerbox img="/Referencer_Logos/Ziraat_Bankası_Logo.png" text="Ziraat Bankası"/></a></li>
            <li className='reference-li'><a href="https://www.nissan.com.tr/" target="_blank"><Referencerbox img="/Referencer_Logos/Nissan_Logo.png" text="Nissan"/></a></li>
            <li className='reference-li'><a href="https://www.vw.com.tr/" target="_blank"><Referencerbox img="/Referencer_Logos/Volkswagen_Logo.png" text="Volkswagen"/></a></li>

            <li className='reference-li'><a href="https://www.turkishairlines.com" target="_blank"><Referencerbox img="/Referencer_Logos/Turkish_Airlines_Logo.png" text="Turkish Airline" /></a></li>
            <li className='reference-li'><a href="https://www.englishhome.com/" target="_blank"><Referencerbox img="/Referencer_Logos/English_Home_Logo.png" text="English Home"/></a></li>
            <li className='reference-li'><a href="https://www.ziraatbank.com.tr/" target="_blank"><Referencerbox img="/Referencer_Logos/Ziraat_Bankası_Logo.png" text="Ziraat Bankası"/></a></li>
            <li className='reference-li'><a href="https://www.nissan.com.tr/" target="_blank"><Referencerbox img="/Referencer_Logos/Nissan_Logo.png" text="Nissan"/></a></li>
            <li className='reference-li'><a href="https://www.vw.com.tr/" target="_blank"><Referencerbox img="/Referencer_Logos/Volkswagen_Logo.png" text="Volkswagen"/></a></li>
          </ul>
        </div>
      </div>

      {/* Feedbacks Bölümü */}
      <div className='feedback-container' id='feedback'>
        <Headline text="FEEDBACKS"/>

        <Feedbacker_text_area selectedFeedbacker= {selectedFeedbacker}/>

        <div className='feedbacks'>
          <div className='onClick' onClick={() => {setSelectedFeedbacker("1")}}>
          <Feedbacker img="/Feedbacker_Images/Turkish_Airline_Prof_Dr_Ahmet_BOLAT.png" text="Ahmet BOLAT"/>
          </div>

          <div className='onClick' onClick={() => {setSelectedFeedbacker("2")}}>
          <Feedbacker img="/Feedbacker_Images/Volswagen_EMİR_ALİ_BİLALOĞLU.png" text="Emir Ali Bilaloğlu"/>
          </div>

          <div className='onClick' onClick={() => {setSelectedFeedbacker("3")}}>
          <Feedbacker img="/Feedbacker_Images/Ziraat_Bankası_Alpaslan_Çakar.png" text="Alpaslan ÇAKAR"/>
          </div>

          <div className='onClick' onClick={() => {setSelectedFeedbacker("4")}}>
          <Feedbacker img="/Feedbacker_Images/English_Home_Kazim_Cimen.png" text="Kazım CİMEN"/>
          </div>
        </div>
      </div>

      {/* Certificate Bölümü */}
      <div className='certificate-container' id="certificate">
        <Headline text="CERTIFICATE"/>

        <div className='slider'>
          <ul className='brands'>
            <li className='brands-certificate'> <Certificatebox img="/Certificate_Images/Sertifika_1.png" text="ISO 27001 Bilgi Güvenliği Yönetim Sistemi Sertifikası"/></li>
            <li className='brands-certificate'><Certificatebox img="/Certificate_Images/Sertifika_2.png" text="ISO 22301 İş Sürekliliği Yönetim Sistemi Sertifikası"/></li>
            <li className='brands-certificate'><Certificatebox img="/Certificate_Images/Sertifika_3.png" text="ISO 31000 Risk Yönetimi Sertifikası"/></li>
            <li className='brands-certificate'><Certificatebox img="/Certificate_Images/Sertifika_4.png" text="ISO 14001 Çevre Yönetim Sistemi Sertifikası"/></li>
            <li className='brands-certificate'><Certificatebox img="/Certificate_Images/Sertifika_5.png" text="ISO 9001 Kalite Yönetim Sistemi Sertifikası"/></li>
            <li className='brands-certificate'><Certificatebox img="/Certificate_Images/Sertifika_6.png" text="PCI DSS Sertifikası"/></li>
            <li className='brands-certificate'><Certificatebox img="/Certificate_Images/Sertifika_7.png" text="SOC 2 Sertifikası"/></li>


            <li className='brands-certificate'> <Certificatebox img="/Certificate_Images/Sertifika_1.png" text="ISO 27001 Bilgi Güvenliği Yönetim Sistemi Sertifikası"/></li>
            <li className='brands-certificate'><Certificatebox img="/Certificate_Images/Sertifika_2.png" text="ISO 22301 İş Sürekliliği Yönetim Sistemi Sertifikası"/></li>
            <li className='brands-certificate'><Certificatebox img="/Certificate_Images/Sertifika_3.png" text="ISO 31000 Risk Yönetimi Sertifikası"/></li>
            <li className='brands-certificate'><Certificatebox img="/Certificate_Images/Sertifika_4.png" text="ISO 14001 Çevre Yönetim Sistemi Sertifikası"/></li>
            <li className='brands-certificate'><Certificatebox img="/Certificate_Images/Sertifika_5.png" text="ISO 9001 Kalite Yönetim Sistemi Sertifikası"/></li>
            <li className='brands-certificate'><Certificatebox img="/Certificate_Images/Sertifika_6.png" text="PCI DSS Sertifikası"/></li>
            <li className='brands-certificate'><Certificatebox img="/Certificate_Images/Sertifika_7.png" text="SOC 2 Sertifikası"/></li>
          </ul>
        </div>
      </div>

      {/* About us Bölümü */}
      <div className='about-us-container' id='about-us'>
        <Headline text="ABOUT US"/>
        <div className='about-us-box'>
          <Aboutbox title="MISSION:" text="At Guardian Health Assurance, our mission is to provide our customers with the most reliable and comprehensive health insurance solutions. We aim to protect your health, enhance your quality of life, and secure your future. Through our customer-centric service approach and innovative insurance products, we strive to ensure you lead a healthy life with the assurance that we are always by your side."/>
          <Aboutbox title="VISION:" text="Our vision is to be recognized as a leading brand in the health insur    ance industry and to be our customers' trusted health partner. With our innovative technologies and commitment to customer satisfaction, we aim for excellence in the field of health insurance. We are dedicated to reaching every segment of society, working tirelessly to build a healthier and more secure future for all."/>
          </div>
        </div>

    {/* Contact Us Bölümü */}
    <div className='contact-us-container' id='contact-us'>
      <Headline text="CONTACT US"/>
      <img className='logo-one' src="/Contact_Us_Images/map_icon.png" alt="Map Icon" />
      <img className='logo-two' src="/Contact_Us_Images/phone_icon.png" alt="Phone Icon" />
      <img className='logo-three' src="/Contact_Us_Images/mail_icon.png" alt="Mail Icon" />
      <img className='image-one' src="/Contact_Us_Images/mail_image.png" alt="Mail Image" />
      <img className='image-two' src="/Contact_Us_Images/mobile_image.png" alt="Mobile Image" />


      <p className='text-one'>90.Yıl OKP Mahallesi Bilimadamı Caddesi(Yazılım Kule) No:4 İç Kapı No:511 kömürpazarı / muğla</p>
      <p className='text-two'>+90 221 235 2451-52</p>
      <p className='text-three'>+90 232 266 2641-72</p>
      <p className='text-four'>g123456789@guardian.com</p>
      <p className='text-five'>g987654321@guardian.com</p>
    </div>
    {isOpen && (
        <div className="popup">
          <div  className={`account-popup-container ${isRightPanelActive ? 'right-panel-active' : ''}`}>
            <div className='account-popup-sign-up'>
              <form action="#">
                <h1 className='account-popup-h1'>Create Account</h1>
                <div className='social-container'>
                  <a href='https://www.facebook.com/' className='social-container-a'><FaFacebook></FaFacebook></a>
                  <a href='https://mail.google.com/' className='social-container-a'><FcGoogle></FcGoogle></a>
                  <a href='https://www.linkedin.com/' className='social-container-a'><FaLinkedin></FaLinkedin></a>
                </div>
                <p className='account-popup-p'>or use email for registration</p>
                <input type='text' name='name' placeholder='Name' required className='account-popup-input' value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}></input>
                <input type='email' name='registerEmail' placeholder='Email' required className='account-popup-input' value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}></input>
                <input type='password' name='pswd' placeholder='Password' required className='account-popup-input' value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}></input>
                <button className='account-popup-button' onClick={handleRegister}>Sign Up</button>
              </form>
            </div>
            <div className='account-popup-sign-in'>
              <form action="#">
                <h1 className='account-popup-h1'>Sign In</h1>
                <div className='social-container'>
                  <a href='https://www.facebook.com/' className='social-container-a'><FaFacebook></FaFacebook></a>
                  <a href='https://mail.google.com/' className='social-container-a'><FcGoogle></FcGoogle></a>
                  <a href='https://www.linkedin.com/' className='social-container-a'><FaLinkedin></FaLinkedin></a>
                </div>
                <p className='account-popup-p'>or use your account</p>
                <input type='email' name='email' placeholder='Email' required className='account-popup-input' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <input type='password' name='pswd' placeholder='Password' required className='account-popup-input' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <a href="https://support.google.com/mail/answer/41078?hl=tr&co=GENIE.Platform%3DAndroid" >Forget your password</a>
                <button className='account-popup-button' onClick={handleLogin}>Sign In</button>
                {error && <p className='account-popup-error-message'>{error}</p>}
              </form>
            </div>
            <div className='account-popup-overlay-container'>
              <div className='account-popup-overlay'>
                <div className='account-popup-overlay-left'>
                  <h1 className='account-popup-h1'> Welcome Back!</h1>
                  <p className='account-popup-p'>To keep connected with us please login with your personal info</p>
                  <button id='signIn' className='account-popup-button' onClick={handleSignInClick}>Sign In</button>
                </div>
                <div className='account-popup-overlay-right'>
                  <h1 className='account-popup-h1'> Hello, New Friend!</h1>
                  <p className='account-popup-p'>Enter your personal details and start journey with us</p>
                  <button id='signUp' className='account-popup-button' onClick={handleSignUpClick}>Sign Up</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isDropdownVisible && (
        <div className='dropdown-menu'>
        <button onClick={handleSignOut} className='dropdown-button'>Oturumu Kapat</button>
        <button onClick={handleDeleteAccount} className='dropdown-button'>Hesabı Sil</button>
        <button onClick={toggleUpdatePassword} className='dropdown-button'>Şifreyi Güncelle</button>
      </div>
      )}
      {isUpdatePasswordVisible && (
        <div className='update-password-container'>
          <button className='update-password-close-button' onClick={toggleUpdatePassword}><FaTimes /></button>
          <form action='#'>
          <input type='password' name='oldpswd' placeholder='Old Password' required className='account-popup-input' value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}></input>
          <input type='password' name='newpswd' placeholder='New Password' required className='account-popup-input' value={newPassword} onChange={(e) => setNewPassword(e.target.value)}></input>
          <input type='password' name='newpswdconfirm' placeholder='Confirm new password' required className='account-popup-input' value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)}></input>
          <button className='update-password-button' onClick={handlePasswordUpdate}>Change Password</button>
          {error && <p className='account-popup-error-message'>{error}</p>}
          </form>
        </div>
      )}
      {isFormVisible.formPageOne && (
        <div className='hidden_background'>
          <div className='form-one-container'>
            <p className='form-one-slogan'>HEMEN ŞİMDİ</p>
            <p className='form-one-slogan'>ÇALIŞANLARINIZ İÇİN</p>
            <p className='form-one-slogan'>ÖNERDİĞİMİZ SİGORTA</p>
            <p className='form-one-slogan'>MASRAFLARINI GÖR!</p>
            <div className='form-one-img-container'>
              <div className='form-one-button-container'>
                <button className='form-one-accept-button' onClick={() => SetisFormVisible(prevState => ({ ...prevState, formPageOne: false, formPageTwo: true }))}>HADİ BAŞLAYALIM</button>
                <button className='form-one-refuse-button' onClick={() => SetisFormVisible(prevState => ({ ...prevState, formPageOne: false }))}>BELKİ SONRA</button>
              </div>
              <img src="/Contact_Us_Images/Insurance_image.png" alt="" className='form-one-image'/>
            </div>
            <p className='form-one-text'>BU ÖNERİ YAPAY ZEKA TARAFINDAN YAPILMAKTADIR.</p>
          </div>
        </div>
      )}
      {isFormVisible.formPageTwo && (
        <div className='hidden_background'>
        <div className='form-two-container'>
          <div className='form-two-close-button-container'>
          <button className='update-password-close-button' onClick={() => SetisFormVisible(prevState => ({ ...prevState, formPageTwo: false }))}><FaTimes /></button>
          </div>
          <div className='form-two-input-container'>
          <label htmlFor="age" className='form-two-input-text'>Çalışanınızın yaşı:</label>
          <input type='number' id='age' name='age' value={newForm.age} onChange={(e) => setNewForm({ ...newForm, age: e.target.value })} min="18" max="120" placeholder='Çalışanınızın yaşı' className='form-two-input'></input>
          {error && <p className='account-popup-error-message'>{error}</p>}
          <button className='form-two-cont-button' onClick={handleformPageTwoUpdate}>Devam</button>
          </div>
        </div>
        </div>
      )}
      {isFormVisible.formPageThree && (
        <div className='hidden_background'>
        <div className='form-two-container'>
          <div className='form-two-close-button-container'>
          <button className='update-password-close-button' onClick={() => SetisFormVisible(prevState => ({ ...prevState, formPageThree: false }))}><FaTimes /></button>
          </div>
          <p htmlFor="gender" className='form-three-input-text'>ÇALIŞANINIZIN CİNSİYETİ:</p>
          <div className='form-three-container'>
            <div className='gender-labels'>
            <span className={!newForm.gender ? 'selected' : ''}>Kadın</span>
            </div>
              <label className='switch'>
                <input id='gender' type='checkbox' checked={newForm.gender} onChange={handleSwitchToggle} className='switch-checkbox'/>
                <span className='slider-form'></span>
              </label>
              <div className='gender-labels'>
              <span className={newForm.gender ? 'selected' : ''}>Erkek</span>
              </div>
          </div>
          <button className='form-two-cont-button' onClick={handleformPageThreeUpdate}>Devam</button>
        </div>
        </div>
      )}
        {isFormVisible.formPageFour && (
          <div className='hidden_background'>
          <div className='form-two-container'>
            <div className='form-two-close-button-container'>
            <button className='update-password-close-button' onClick={() => SetisFormVisible(prevState => ({ ...prevState, formPageFour: false }))}><FaTimes /></button>
            <div className='form-four-container'>
              <div>
              <p htmlFor="kilo" className='form-four-input-text' id='text-1'>KİLONUZU GİRİNİZ:</p>
              <input id='kilo' type='number' className='form-four-input' value={newForm.measurements.weight} placeholder='kg cinsinden yazınız' name='weight' min="15" max="635" onChange={handleFourPageChange}></input>
              </div>
              <div>
              <p htmlFor="lenght" className='form-four-input-text' id='text-2'>BOYUNUZU GİRİNİZ:</p>
              <input id='lenght' type='number' className='form-four-input' placeholder='cm cinsinden yazınız' min="65" max="251" name='height' value={newForm.measurements.height} onChange={handleFourPageChange}></input>
              </div>
            </div>
            <button className='form-four-cont-button' onClick={handleformPageFourUpdate}>Devam</button>
            </div>
          </div>
          </div>
        )}
      {isFormVisible.formPageFive && (
        <div className='hidden_background'>
        <div className='form-two-container'>
        <div className='form-two-close-button-container'>
        <button className='update-password-close-button' onClick={() => SetisFormVisible(prevState => ({ ...prevState, formPageFive: false }))}><FaTimes /></button>
        </div>
        <div className='form-two-input-container'>
        <label htmlFor="numberKids" className='form-two-input-text'>Çalışanınızın çocuk sayısı:</label>
        <input type='number' id='numberKids' name='numberKids' value={newForm.numberKids} onChange={(e) => setNewForm({ ...newForm, numberKids: e.target.value })} min="0" max="69" placeholder='Çalışanınızın çocuk sayısı:' className='form-two-input'></input>
        {error && <p className='account-popup-error-message'>{error}</p>}
        <button className='form-two-cont-button' onClick={handleformPageFiveUpdate}>Devam</button>
        </div>
      </div>
      </div>
      )}
      {isFormVisible.formPageSix && (
        <div className='hidden_background'>
        <div className='form-two-container'>
        <div className='form-two-close-button-container'>
        <button className='update-password-close-button' onClick={() => SetisFormVisible(prevState => ({ ...prevState, formPageSix: false }))}><FaTimes /></button>
        </div>
        <p htmlFor="smoke" className='form-three-input-text'>ÇALIŞAN SİGARA İÇİYOR MU?</p>
        <div className='form-three-container'>
          <div className='gender-labels'>
          <span className={!newForm.smoke ? 'selected' : ''}>İçmiyor</span>
          </div>
            <label className='switch'>
              <input id='smoke' type='checkbox' checked={newForm.smoke} onChange={handleSwitchToggleSmoke} className='switch-checkbox'/>
              <span className='slider-form'></span>
            </label>
            <div className='gender-labels'>
            <span className={newForm.smoke ? 'selected' : ''}>İçiyor</span>
            </div>
        </div>
        <button className='form-two-cont-button' onClick={handleformPageSixUpdate}>Devam</button>
      </div>
      </div>
      )}
      {isFormVisible.formPageSeven && (
        <div className='hidden_background'>
        <div className='form-two-container'>
          <p htmlFor="region" className='form-seven-input-text' >ÇALIŞANINIZIN BULUNDUĞU BÖLGE:</p>
          <div className='form-page-seven-select-box'>
          <select onChange={getSelectedRegion} id='region' className='form-page-seven-select'>
              <option value="northeast" className='form-page-seven-option'>Northeast</option>
              <option value="northwest" className='form-page-seven-option'>Northwest</option>
              <option value="southwest" className='form-page-seven-option'>Southwest</option>
              <option value="southeast" className='form-page-seven-option'>Southeast</option>
            </select>
          </div>
            <button className='form-two-cont-button' onClick={handleformPageSevenUpdate}>BİTİR</button>
        </div>
        </div>
      )}
      {isFormVisible.formPageEight && (
        <div className='hidden_background'>
        <div className='form-two-container'>
            <div>
            {loading ? (
              <Loader />
            ) : data ? (
              <>
                <h2 className='form-eight-text'>ÖNERİLEN SAĞLIK SİGORTASI</h2>
                <p className='form-eight-data'>{convertedData}</p>
                <select className='form-eight-select' onChange={handleCurrency} value={currency}>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="TRY">TRY</option>
                </select>
                <button className='form-two-cont-button' onClick={handleformPageEightUpdate}>Onayla</button>
              </>
            ) : (
              <>
                <p className='form-seven-no-data'>Verı alinamadi.</p>
                <button className='form-two-cont-button'>Onayla</button>
              </>
            )}
          </div>
        </div>
        </div>
      )}
    </div>
    </>
  )
}

export default App
