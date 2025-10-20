import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

test('renders site title', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const title = screen.getByRole('heading', { name: /Chess Mastery Academy/i });
  expect(title).toBeInTheDocument();
});
