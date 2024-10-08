import { Sidenav, Nav } from 'rsuite';
import { useNavigate } from 'react-router-dom';
import { FaClock, FaHome, FaUserFriends, FaCog, FaSignOutAlt } from 'react-icons/fa'; // Importing icons from react-icons

const SideBar = () => {
  const navigate = useNavigate();

  return (
    <Sidenav defaultOpenKeys={['1', '2']} appearance="subtle" className="h-full min-h-screen shadow-lg">
      <Sidenav.Body>
        <Nav>
          <Nav.Item icon={<FaClock />} onClick={() => navigate('/assign-time')}>
            Assign Time
          </Nav.Item>
          <Nav.Item icon={<FaHome />} onClick={() => navigate('/remote-work')}>
            Remote Work
          </Nav.Item>
          <Nav.Item icon={<FaUserFriends />} onClick={() => navigate('/match-room')}>
            Match Room
          </Nav.Item>
          <Nav.Item icon={<FaCog />} onClick={() => navigate('/settings')}>
            Settings
          </Nav.Item>
          <Nav.Item icon={<FaSignOutAlt />} onClick={() => navigate('/logout')}>
            Log Out
          </Nav.Item>
        </Nav>
      </Sidenav.Body>
    </Sidenav>
  );
};

export default SideBar;
