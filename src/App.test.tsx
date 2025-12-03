import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders MelodyCraft title', () => {
  render(<App />);
  const heading = screen.getByText(/MelodyCraft/i);
  expect(heading).toBeInTheDocument();
});
