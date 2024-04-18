import 'react-toastify/dist/ReactToastify.css';
import './index.css';

import { ToastContainer } from 'react-toastify';

import { TOASTIFY_CONFIG } from '@/config';

export default function CustomToastContainer() {
  return <ToastContainer {...TOASTIFY_CONFIG} />;
}

// TODO: Update wherever using <ToastContainer /> to use <CustomToastContainer /> instead
// TODO: Update wherever necessary using <ModalAlert /> or console.log to use toastify instead
