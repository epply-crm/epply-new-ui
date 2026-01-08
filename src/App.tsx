import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { ToastProvider } from './components/ui';

function App() {
  return (
    <ToastProvider position="top-right">
      <RouterProvider router={router} />
    </ToastProvider>
  );
}

export default App;
