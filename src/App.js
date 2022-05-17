import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import AppLayout from './components/Layout';

const HomePage = lazy(() => import('./pages/Home'));
const DetailPage = lazy(() => import('./pages/Anime'));
const CollectionListPage = lazy(() => import('./pages/CollectionList'));
const CollectionPage = lazy(() => import('./pages/Collection'));

function App() {
  const client = new ApolloClient({
    uri: 'https://graphql.anilist.co/',
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Suspense fallback={null} maxDuration={5000}>
          <Routes>
            <Route element={<AppLayout />}>
              <Route
                exact
                path="/"
                element={<Navigate to="/animes" replace />}
              />
              <Route exact path="/animes" element={<HomePage />} />
              <Route path="/anime/:id" element={<DetailPage />} />
              <Route path="/collections" element={<CollectionListPage />} />
              <Route path="/collection/:id" element={<CollectionPage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
