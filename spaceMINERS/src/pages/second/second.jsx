import './second.css'
import Asteroids from '../../components/3Dmodel/asteroids';
import SolarSystem from '../../components/3Dmodel/model';

import Header from '../../components/header/header';

const Second = () => {
    return(
        <div>
            <Header/>
            <div className='second1'>
                <Asteroids/>
            </div>
        </div>
    );
}
export default Second;