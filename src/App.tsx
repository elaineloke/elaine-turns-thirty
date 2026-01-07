import { HomePage } from './pages/HomePage';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';

import '@fontsource/roboto';
import '@fontsource/playfair-display';
import '@fontsource-variable/kapakana';
import '@fontsource/allura';
import '@fontsource/sacramento';

export const App = () => {
	return (
      <ThemeProvider theme={theme}>
        <HomePage />
      </ThemeProvider>
    );
}

