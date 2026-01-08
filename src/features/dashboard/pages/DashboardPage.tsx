import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';

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
        <h2 className="mb-4 text-2xl font-bold">Badge Examples</h2>
        <div className="flex items-center gap-4">
          <Badge variant="light" color="primary">
            Primary Solid
          </Badge>
          <Badge variant="solid" color="secondary">
            Primary Solid
          </Badge>
          <Badge variant="outline" color="secondary">
            Secondary Outline
          </Badge>
          <Badge variant="light" color="success">
            Success Light
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
