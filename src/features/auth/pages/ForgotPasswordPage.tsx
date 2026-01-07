import { Button, Input } from '@/components/ui';

const ForgotPasswordPage = () => {
  return (
    <div className="mx-auto mt-10 max-w-md rounded-lg bg-white p-8 shadow-md">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Şifremi Unuttum</h1>
      <p className="mb-6 text-gray-600">
        E-posta adresinizi girin, size şifre sıfırlama bağlantısı gönderelim.
      </p>
      <div className="space-y-4">
        <Input
          label="E-posta"
          type="email"
          placeholder="ornek@email.com"
          size="medium"
          variant="outlined"
        />
        <Button color="primary" size="medium" fullWidth>
          Sıfırlama Bağlantısı Gönder
        </Button>
        <Button color="secondary" size="medium" fullWidth to="/auth/login">
          Giriş Sayfasına Dön
        </Button>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
