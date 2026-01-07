import { Link } from 'react-router-dom';
import LogoURL from '../../assets/images/logo/epply-logo.png';
import { Button, IconButton } from '@/components/ui';

const Logo = () => {
  return (
    <Link to="/" className="flex h-full items-center px-4">
      <img src={LogoURL} alt="Epply Logo" className="ml-4 h-10" />
    </Link>
  );
};

const HeaderMenuItem = () => {
  const headerMenu = [
    { name: 'Panel', path: '/' },
    { name: 'Görevler', path: '/task' },
  ];

  return (
    <nav className="flex items-center justify-between">
      <ul className="flex space-x-4 pr-4">
        {headerMenu.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              className="rounded px-2 py-1 text-[14px] text-gray-700 transition-colors duration-200 hover:bg-gray-900 hover:text-white"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const HeaderRightMenu = () => {
  return (
    <div className="flex items-center space-x-4 pr-4">
      <Button
        color="secondary"
        size="small"
        leftIcon={<i className="ki-outline ki-plus"></i>}
        to="/student/add"
      >
        Öğrenci Ekle
      </Button>

      <IconButton
        icon={<i className="ki-outline ki-notification"></i>}
        variant="ghost"
        color="neutral"
        rounded
        ariaLabel="Bildirimler"
      />

      <IconButton
        icon={<i className="ki-outline ki-profile-circle"></i>}
        variant="filled"
        color="primary"
        rounded
        ariaLabel="Profil"
      />
    </div>
  );
};

const Header = () => {
  return (
    <header className="fixed top-0 right-0 left-0 z-10 flex h-16 items-center justify-between border-b border-gray-200 bg-white shadow-xs">
      <Logo />
      <HeaderMenuItem />
      <HeaderRightMenu />
    </header>
  );
};

export default Header;
