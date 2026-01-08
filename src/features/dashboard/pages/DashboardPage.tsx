import Avatar from '@/components/ui/Avatar';
import { Checkbox } from '@/components/ui';
import { useState } from 'react';

const DashboardPage = () => {
  const [checked1, setChecked1] = useState(false);

  return (
    <div className="space-y-8 p-8">
      <div>
        <h2 className="mb-4 text-2xl font-bold">Avatar Examples</h2>
        <div className="flex items-center gap-4">
          <Avatar size="medium" alt="John Doe" />
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-2xl font-bold">Checkbox Component Examples</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <h3 className="text-lg font-semibold">Basic Checkboxes</h3>
          <Checkbox
            label="Unchecked Checkbox"
            checked={checked1}
            onChange={(e) => setChecked1(e.target.checked)}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
