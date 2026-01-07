import Avatar from '@/components/ui/Avatar';

const DashboardPage = () => {
  return (
    <div>
      <Avatar size="sm" alt="John Doe" />
      <Avatar
        size="md"
        alt="John Doe"
        src="https://randomuser.me/api/portraits/men/1.jpg"
      />
      <Avatar size="lg" alt="Jane Smith" />
    </div>
  );
};

export default DashboardPage;
