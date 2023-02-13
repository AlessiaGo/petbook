import { Link } from 'react-router-dom';


export const Header = () => {
    return (
        <div className='header'>

             <Link className="link" to="/"> Homepage</Link>

             <Link className="link" to="/pet"> Pets</Link>

             <Link className="link" to="/new"> Add Pets</Link>
    
             
        </div>
    
    )
}
