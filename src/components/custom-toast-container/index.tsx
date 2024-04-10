import { ToastContainer } from 'react-toastify';

import TOASTIFY_CONFIG from '@/libs/toastify-config';

import 'react-toastify/dist/ReactToastify.css';
import './index.css';

export default function CustomToastContainer() {
  return <ToastContainer {...TOASTIFY_CONFIG} />;
}

// TODO: Update wherever using <ToastContainer /> to use <CustomToastContainer /> instead
// TODO: Update wherever necessary using <ModalAlert /> or console.log to use toastify instead
