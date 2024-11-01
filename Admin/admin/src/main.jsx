
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AppProvider from './Contex/Appcontex.jsx'
import AdminProvider from './Contex/Admincontex.jsx'
import DoctorProvider from './Contex/Doctorcontex.jsx'  

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppProvider>
      <AdminProvider>
        <DoctorProvider>
          <App />
        </DoctorProvider>
      </AdminProvider>
    </AppProvider>
  </BrowserRouter>
);
