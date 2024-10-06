import './header.css'
import groupphoto from '../../assets/groupphoto.jpeg'
import { Link } from 'react-router-dom';

const Header = () => {
    return(
        <div className="header1">
                            <a href="/second">
            <div className='header2'>

                <img src={groupphoto} alt=''/>
                <h2>SpaceMINERS</h2>
            </div>
            </a>
           
            <div className='header3'>
                {/*<h4>Filter</h4>*/}
                <h4><a href="">Predict</a></h4>
                <h4><a href="/third">About us</a></h4>
            </div>
        </div>
    );
}
export default Header;