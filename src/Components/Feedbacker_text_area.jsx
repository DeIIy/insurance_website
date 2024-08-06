import React, { useEffect, useState } from 'react'
import Feedbacker_image from './Feedbacker_image'
import Feedbacker_info from './Feedbacker_info'

const Feedbacker_text_area = ({selectedFeedbacker}) => {

const [image, setImage] = useState("/Feedbacker_Images/Turkish_Airline_Prof_Dr_Ahmet_BOLAT.png")
const [text, setText] = useState("Ahmet BOLAT")
const [infoName, setInfoName] = useState("Prof. Dr. Ahmet BOLAT")
const [infoCompany, setInfoCompany] = useState("Turkish Airlines")
const [infoDegree, setInfoDegree] = useState("Yönetim Kurulu Başkanı")
const [feedbackText, setFeedbackText] = useState("Sigorta sektöründe lider konumda olan Guardian, sağladığı üstün hizmet kalitesi ve müşteri memnuniyeti ile her zaman takdirimizi kazanmıştır. Özellikle zorlu dönemlerde gösterdiği hızlı ve etkili çözümler, sektördeki örnek alınacak yaklaşımlarından sadece birkaçıdır.")

useEffect(() => {
    switch (selectedFeedbacker) {
        case "1":
            setImage("/Feedbacker_Images/Turkish_Airline_Prof_Dr_Ahmet_BOLAT.png");
            setText("Ahmet BOLAT");
            setInfoName("Prof. Dr. Ahmet BOLAT");
            setInfoCompany("Turkish Airlines");
            setInfoDegree("Yönetim Kurulu Başkanı");
            setFeedbackText("Sigorta sektöründe lider konumda olan Guardian, sağladığı üstün hizmet kalitesi ve müşteri memnuniyeti ile her zaman takdirimizi kazanmıştır. Özellikle zorlu dönemlerde gösterdiği hızlı ve etkili çözümler, sektördeki örnek alınacak yaklaşımlarından sadece birkaçıdır.");
            break;
        
        case "2":
            setImage("/Feedbacker_Images/Volswagen_EMİR_ALİ_BİLALOĞLU.png");
            setText("Emir Ali Bilaloğlu");
            setInfoName("Emir Ali Bilaloğlu");
            setInfoCompany("Doğuş Otomativ");
            setInfoDegree("Yönetim Kurulu Başkanı ");
            setFeedbackText("Yenilikçi ve güvenilir sigorta çözümleri sunarak müşterilerimizin hayatını kolaylaştıran Guardian, iş dünyasında güvenin adresi olmayı sürdürmektedir. Şirketinizin profesyonel yaklaşımı ve müşteri odaklı hizmet anlayışı, sektördeki başarınızın en önemli anahtarıdır.");
            break;

        case "3":
            setImage("/Feedbacker_Images/Ziraat_Bankası_Alpaslan_Çakar.png");
            setText("Alpaslan ÇAKAR");
            setInfoName("Alpaslan ÇAKAR");
            setInfoCompany("Ziraat Bankası");
            setInfoDegree("Genel Müdür");
            setFeedbackText("Guardian, sigorta sektöründe sunduğu yenilikçi hizmetler ve müşteri memnuniyeti odaklı yaklaşımı ile şirketimizin güvenini kazanmıştır. Özellikle, esnek ve kapsamlı sigorta çözümleri sunarak, müşterilerimizin ihtiyaçlarına her daim cevap verebilmesi takdire şayandır.");
            break;

        case "4":
            setImage("/Feedbacker_Images/English_Home_Kazim_Cimen.png");
            setText("Kazım CİMEN");
            setInfoName("Kazım CİMEN");
            setInfoCompany("English Home");
            setInfoDegree("Yönetim Kurulu Başkanı");
            setFeedbackText("Guardian'nın sektördeki lider konumu ve profesyonel hizmet anlayışı, iş dünyasında güven ve istikrarın simgesi haline gelmiştir. Müşterilerimize sunduğunuz güvence ve destek, iş birliğimizin temel taşlarından biridir.");
            break;
    }
},[selectedFeedbacker]);
    
  return (
    <div className='text-area-container'>
        <div className='text-area-image'>
            <Feedbacker_image img={image} text={text}/>
                <div className='feedbacker-text-container'>
                    <Feedbacker_info info= {infoName}/>
                    <Feedbacker_info info={infoCompany}/>
                    <Feedbacker_info info={infoDegree}/>
                </div>
            </div>
            <p className='text-area-text'>{feedbackText}</p>
        </div>
  )
}

export default Feedbacker_text_area