import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import bg from "../../assets/bg.jpg";
import groupphoto1 from "../../assets/fatima.jpg";
import groupphoto from "../../assets/groupphoto.jpeg";

import groupphoto2 from "../../assets/elbey.jpg";
import groupphoto3 from "../../assets/ouiam.jpg";
import groupphoto4 from "../../assets/aya.jpg";

import NASA from "../../assets/NASA.png";
import './third.css';
import Header from '../../components/header/header';

const Third = () => {
    const navigate = useNavigate();


     

    return (
        <div>
        <Header/>
        <div className="allAboutUs">
            
            <img className="bg1" src={bg} alt="" />
            <div className="everything">
                <div className="pc1"> 
                    <img className="gp" src={groupphoto} alt="Group Photo" />
                    <img className="nasa" src={NASA} alt="NASA Logo" />
                </div>
                <h2>SpaceMINERS</h2>
                <h5>Team members</h5>
                
                <div className="blockAboutUs"> 
                    <div className="About">
                        <img className="Aboutgp" src={groupphoto1} alt="Group Photo" />
                        <p className='def'>
                        <b>Fatima Zahra Ouardirhi</b>
                        <br/>
                        Data engineering <br/>student at ENSMR(ex-ENIM)
                        </p>
                    </div>
                    <div className="About">
                        <img className="Aboutgp" src={groupphoto2} alt="NASA Logo" />
                        <p className='def'>
                        <b>Aya EL Hani</b>
                        <br/>
                        Data engineering <br/>student at ENSMR(ex-ENIM)
                        </p>
                    </div>
                    <div className="About">
                        <img className="Aboutgp" src={groupphoto3} alt="Group Photo" />
                        <p className='def'>
                        <b>Ouiam Charki</b>
                        <br/>
                        Data engineering <br/>student at ENSMR(ex-ENIM)
                        </p>
                    </div>
                    <div className="About">
                        <img className="Aboutgp" src={groupphoto4} alt="NASA Logo" />
                        <p className='def'>
                        <b>Mohammed El Bye</b>
                        <br/>
                        Data engineering <br/>student at ENSMR(ex-ENIM)
                        </p>
                    </div>
                    
                    
                    
                    

                </div>
            </div>
        </div>
        </div>
    );
};

export default Third;
