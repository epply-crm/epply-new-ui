import RadioGroup from '@/components/ui/Radio';
import React from 'react';

const DashboardPage = () => {
  const [selectedOption, setSelectedOption] = React.useState('option1');

  return (
    <div className="p-8">
      <RadioGroup
        radios={[
          { name: 'Option 1', value: 'option1' },
          { name: 'Option 2', value: 'option2' },
        ]}
        color="secondary"
        selectedValue={selectedOption}
        onChange={setSelectedOption}
      />
    </div>
  );
};
export default DashboardPage;
