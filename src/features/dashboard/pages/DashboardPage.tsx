import Avatar from '@/components/ui/Avatar';
import Progress from '@/components/ui/Progress';

const DashboardPage = () => {
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
    </div>
  );
};

export default DashboardPage;
