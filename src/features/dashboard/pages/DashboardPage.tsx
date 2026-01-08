import Avatar from '@/components/ui/Avatar';
import Progress from '@/components/ui/Progress';
import { Button, Checkbox } from '@/components/ui';
import { useState } from 'react';
import Dropdown from '@/components/ui/Dropdown';

const DashboardPage = () => {
  const [checked1, setChecked1] = useState(false);

  const options = [
    {
      label: 'Profile',
      value: 'profile',
      onClick: () => console.log('Profile clicked'),
    },
    {
      label: 'Settings',
      value: 'settings',
      href: '/settings',
    },
    {
      label: 'Logout',
      value: 'logout',
      onClick: () => console.log('Logout clicked'),
    },
  ];

  return (
    <div className="space-y-8 p-8">
      <div>
        <h2 className="mb-4 text-2xl font-bold">Avatar Examples</h2>
        <div className="flex items-center gap-4">
          <Avatar size="medium" alt="John Doe" />
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-2xl font-bold">Progress Examples</h2>
        <Progress value={52} size="large" color="primary" variant="linear" showLabel />
      </div>
      <Dropdown label="Options" className="mt-4" options={options} size="small" />
      <Dropdown label="Options" className="mt-4" options={options} size="medium" />
      <Dropdown label="Options" className="mt-4" options={options} size="large" />
      <Button color="secondary" size="small">
        Small Secondary Button
      </Button>
      <Button color="secondary" size="medium">
        Small Secondary Button
      </Button>
      <Button color="secondary" size="large">
        Small Secondary Button
      </Button>
    </div>
  );
};

export default DashboardPage;
