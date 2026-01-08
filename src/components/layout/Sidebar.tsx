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
    name: 'Organization',
    icon: 'ki-outline ki-brifecase-timer',
    subItems: [
      { name: 'Organization', href: '/organization' },
      { name: 'Organization Manager', href: '/organization/manager' },
      { name: 'Organization Advisor', href: '/organization/advisor' },
    ],
  },
  { name: 'Student', href: '/student', icon: 'ki-outline ki-teacher' },
  { name: 'Task', href: '/task', icon: 'ki-outline ki-questionnaire-tablet' },
  { name: 'Calendar', href: '/calendar', icon: 'ki-outline ki-calendar' },
  {
    name: 'Academic',
    icon: 'ki-outline ki-book-square',
    subItems: [
      { name: 'University', href: '/universities' },
      { name: 'Faculty', href: '/faculties' },
      { name: 'Department', href: '/department' },
      { name: 'Class', href: '/class' },
      { name: 'Exam', href: '/exam' },
    ],
  },
  {
    name: 'Other',
    icon: 'ki-outline ki-menu',
    subItems: [
      { name: 'Follow Up Reason', href: '/follow-up-reason' },
      { name: 'Source', href: '/source' },
      { name: 'Diploma', href: '/diploma' },
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
                    className="hover:bg-surface-secondary hover:text-primary-500 flex w-full cursor-pointer items-center justify-between rounded-xl px-4 py-2 text-[15px] text-gray-800 transition-colors duration-200"
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
                          className="hover:bg-primary-500 flex items-center rounded-xl px-4 py-2 text-gray-600 transition-all duration-200 hover:text-white"
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
                  className="hover:bg-primary-500 flex items-center rounded-xl px-4 py-2 text-[15px] text-gray-800 transition-all duration-200 hover:text-white"
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
