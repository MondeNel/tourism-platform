import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import Home from '@/pages/Home';
import RouteLoading from '@/components/ui/RouteLoading';

// Home ships eagerly — it's the landing page, most-visited route.
// Everything else is code-split so first paint on capetown.travel-scale
// content stays lean (spec §4.6: <3s mobile load on 4G).
const Placeholder = lazy(() => import('@/pages/Placeholder'));
const Directory = lazy(() => import('@/pages/Directory'));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<RouteLoading />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Placeholder title="Explore Prieska, Marydale & Niekerkshoop" />} />
            <Route path="/directory" element={<Directory />} />
            <Route path="/directory/add" element={<Placeholder title="List your business" />} />
            <Route path="/directory/:slug" element={<Placeholder />} />
            <Route path="/towns/:slug" element={<Placeholder />} />
            <Route path="/experiences/:slug" element={<Placeholder />} />
            <Route path="/routes" element={<Placeholder title="Themed Tourism Routes" />} />
            <Route path="/routes/:slug" element={<Placeholder />} />
            <Route path="/events" element={<Placeholder title="Events & Festivals" />} />
            <Route path="/plan" element={<Placeholder title="Plan Your Visit" />} />
            <Route path="/plan/:slug" element={<Placeholder />} />
            <Route path="*" element={<Placeholder title="Page not found" />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}