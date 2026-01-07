import Button from '@/components/ui/Button';

const DashboardPage = () => {
  return (
    <div>
      <Button color="primary" size="large" isLoading={true}>
        Go to Login
      </Button>
      <Button
        color="secondary"
        size="medium"
        isLoading={false}
        leftIcon={<span>🔐</span>}
      >
        Go to Signup
      </Button>
      <Button color="success" size="medium" to="/dashboard" rightIcon={<span>➡️</span>}>
        Go to Dashboard
      </Button>
      <Button color="primary" size="small" fullWidth>
        Go to Full Width
      </Button>
    </div>
  );
};

export default DashboardPage;
