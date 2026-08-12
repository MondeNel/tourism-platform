import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import Home from '@/pages/Home';
import Placeholder from '@/pages/Placeholder';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Placeholder title="Explore Prieska, Marydale & Niekerkshoop" />} />
          <Route path="/directory" element={<Placeholder title="Tourism Business Directory" />} />
          <Route path="/directory/add" element={<Placeholder title="List your business" />} />
          <Route path="/directory/:slug" element={<Placeholder />} />
          <Route path="/towns/:slug" element={<Placeholder />} />
          <Route path="/experiences/:slug" element={<Placeholder />} />
          <Route path="/routes" element={<Placeholder title="Themed Tourism Routes" />} />
          <Route path="/routes/:slug" element={<Placeholder />} />
          <Route path="/events" element={<Placeholder title="Events & Festivals" />} />
          <Route path="*" element={<Placeholder title="Page not found" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
