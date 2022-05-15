import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import AppLayout from './components/Layout';

const HomePage = lazy(() => import('./pages/Home'));
const DetailPage = lazy(() => import('./pages/Anime'));

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
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
