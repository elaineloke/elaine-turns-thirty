import { ThemeProvider } from '@mui/material/styles';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { AdminPage } from './pages/AdminPage';
import { theme } from './theme';

import '@fontsource/roboto';
import '@fontsource/playfair-display';
import '@fontsource-variable/kapakana';
import '@fontsource/allura';
import '@fontsource/sacramento';
import { FaqPage } from './pages/FaqPage';
import { ScrollToTop } from './components/ScrollToTop';

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/faq" element={<FaqPage />} />
      </Routes>
    </ThemeProvider>
  );
};
