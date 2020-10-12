import { ToastContainer as ToastifyContainer, Slide } from 'react-toastify';
import { colors } from '@/css/theme';

/**
 * Toast component from https://github.com/fkhadra/react-toastify
 */
export const ToastContainer = () => (
  <>
    <ToastifyContainer transition={Slide} hideProgressBar />
    <style global jsx>{`
      .Toastify__toast {
        color: ${colors.__grey_800};
      }

      .Toastify__progress-bar--animated {
        background: linear-gradient(90deg, ${colors.primary}, ${colors.primary_dark});
      }
    `}</style>
  </>
);
