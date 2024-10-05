import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import bg from "../../assets/bg.jpg";
import groupphoto from "../../assets/groupphoto.jpeg";
import NASA from "../../assets/NASA.png";
import './first.css';

const First = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/second');
        }, 10000);

        return () => clearTimeout(timer);
    }, [navigate]);

    const handleClick = () => {
        navigate('/second');
    };

    return (
        <div>
            <img className="bg1" src={bg} alt="" />
            <div className="everything">
                <div className="pc1"> 
                    <img className="gp" src={groupphoto} alt="Group Photo" />
                    <img className="nasa" src={NASA} alt="NASA Logo" />
                </div>
                <h2>SpaceMINERS</h2>
                <h5>Discover Near-Earth Objects</h5>
                <h3 onClick={handleClick} style={{ cursor: 'pointer' }}>Click here!</h3>
            </div>
        </div>
    );
};

export default First;
