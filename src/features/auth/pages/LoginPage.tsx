import { Button, Input } from '@/components/ui';

const LoginPage = () => {
  return (
    <div className="mx-auto mt-10 max-w-md rounded-lg bg-white p-8 shadow-md">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Giriş Yap</h1>
      <div className="space-y-4">
        <Input
          label="E-posta"
          type="email"
          placeholder="ornek@email.com"
          size="medium"
          variant="outlined"
        />
        <Input
          label="Şifre"
          type="password"
          placeholder="••••••••"
          size="medium"
          variant="outlined"
        />
        <Button color="primary" size="medium" fullWidth>
          Giriş Yap
        </Button>
        <Button color="secondary" size="medium" fullWidth to="/auth/forgot-password">
          Şifremi Unuttum
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
