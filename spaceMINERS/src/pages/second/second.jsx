import './second.css'
import SolarSystem from '../../components/3Dmodel/model';
import Header from '../../components/header/header';

const Second = () => {
    return(
        <div>
            <Header/>
            <div className='second1'>
                <SolarSystem/>
            </div>
        </div>
    );
}
export default Second;