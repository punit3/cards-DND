import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
// import { worker } from './mocks/mocks';


export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Router />
    </MantineProvider>
  );
}
