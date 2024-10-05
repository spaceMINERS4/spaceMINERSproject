import './header.css'
import groupphoto from '../../assets/groupphoto.jpeg'

const Header = () => {
    return(
        <div className="header1">
            <div className='header2'>
                <img src={groupphoto} alt=''/>
                <h2>SpaceMINERS</h2>
            </div>
            <div className='header3'>
                <h4>Filter</h4>
                <h4>Predict</h4>
                <h4>About us</h4>
            </div>
        </div>
    );
}
export default Header;