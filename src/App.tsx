import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import { TodoPage } from './components/pages/TodoPage/TodoPage';

function App() {

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <TodoPage />
    </ThemeProvider>
  )
}

export default App
