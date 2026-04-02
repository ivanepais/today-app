import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import { DashboardPage } from './components/pages/DashboardPage';

function App() {

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <DashboardPage />
    </ThemeProvider>
  )
}

export default App
