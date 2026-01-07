import { Button } from '@/components/ui';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-surface-primary flex min-h-screen items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-primary-500 text-[120px] leading-none font-bold">404</h1>
          <div className="mt-4">
            <i className="ki-duotone ki-question text-[80px] text-gray-400">
              <span className="path1"></span>
              <span className="path2"></span>
            </i>
          </div>
        </div>

        <h2 className="text-text-primary mb-4 text-3xl font-bold">Sayfa Bulunamadı</h2>

        <p className="text-text-secondary mx-auto mb-8 max-w-md text-lg">
          Aradığınız sayfa mevcut değil, taşınmış veya silinmiş olabilir.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Button
            color="primary"
            size="large"
            onClick={() => navigate(-1)}
            leftIcon={<i className="ki-filled ki-arrow-left text-[18px]" />}
          >
            Geri Dön
          </Button>

          <Button
            color="secondary"
            size="large"
            to="/"
            rightIcon={<i className="ki-filled ki-home text-[18px]" />}
          >
            Ana Sayfa
          </Button>
        </div>

        <div className="border-border-primary mt-12 border-t pt-8">
          <p className="text-text-secondary text-sm">
            Sorun devam ederse lütfen bizimle iletişime geçin.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
