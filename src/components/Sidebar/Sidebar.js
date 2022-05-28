import { SidebarBorder, SidebarComponent } from './styles.js';
import { Link } from "react-router-dom";

const SideBar = () => {
    return <SidebarBorder>
        <div className='sidebar'>
            <Link to="/skipjack" style={{ textDecoration: 'none' }}>
                <SidebarComponent>Skipjack</SidebarComponent>
            </Link>
        </div>
    </SidebarBorder>

}

export default SideBar;