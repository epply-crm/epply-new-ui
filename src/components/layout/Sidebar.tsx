import { Link } from 'react-router-dom';
import { useState } from 'react';

interface SubMenuItem {
  name: string;
  href: string;
  icon?: string;
}

interface NavItem {
  name: string;
  href?: string;
  icon: string;
  subItems?: SubMenuItem[];
}

const navItems: NavItem[] = [
  { name: 'Dashboard', href: '/', icon: 'ki-outline ki-home' },
  {
    name: 'Profil',
    icon: 'ki-outline ki-profile-circle',
    subItems: [
      { name: 'Hesabım', href: '/profile', icon: 'ki-outline ki-user' },
      { name: 'Güvenlik', href: '/security', icon: 'ki-outline ki-lock' },
      { name: 'Bildirimler', href: '/notifications', icon: 'ki-outline ki-notification' },
    ],
  },
];

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const toggleMenu = (menuName: string) => {
    setOpenMenus((prev) =>
      prev.includes(menuName)
        ? prev.filter((name) => name !== menuName)
        : [...prev, menuName],
    );
  };

  return (
    <aside className="border-border-primary fixed top-16 bottom-0 left-0 w-64 overflow-y-auto border-r bg-white">
      <nav className="p-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.name}>
              {item.subItems ? (
                <div>
                  <button
                    onClick={() => toggleMenu(item.name)}
                    className="hover:bg-surface-secondary flex w-full cursor-pointer items-center justify-between rounded px-4 py-2 text-[15px] text-gray-800 transition-colors duration-200"
                  >
                    <div className="flex items-center">
                      <i className={`${item.icon} mr-2 text-[16px]`}></i>
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <i
                      className={`ki-outline ki-down text-[14px] transition-transform duration-200 ${
                        openMenus.includes(item.name) ? 'rotate-180' : ''
                      }`}
                    ></i>
                  </button>
                  <ul
                    className={`mt-1 ml-4 space-y-1 overflow-hidden transition-all duration-200 ${
                      openMenus.includes(item.name)
                        ? 'max-h-96 opacity-100'
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    {item.subItems.map((subItem) => (
                      <li key={subItem.name}>
                        <Link
                          to={subItem.href}
                          className="hover:bg-primary-500 flex items-center rounded px-4 py-2 text-gray-600 transition-all duration-300 hover:text-white"
                        >
                          {subItem.icon && (
                            <i className={`${subItem.icon} mr-2 text-[16px]`}></i>
                          )}
                          <span className="text-sm">{subItem.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <Link
                  to={item.href!}
                  className="hover:bg-primary-500 flex items-center rounded px-4 py-2 text-[15px] text-gray-800 transition-all duration-300 hover:text-white"
                >
                  <i className={`${item.icon} mr-2 text-[16px]`}></i>
                  <span className="font-medium">{item.name}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
