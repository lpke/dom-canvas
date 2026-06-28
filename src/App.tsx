import { Route, Routes } from 'react-router';
import HomePage from '@/routes/HomePage';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}
