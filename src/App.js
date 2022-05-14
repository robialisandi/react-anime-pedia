import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Suspense fallback={<div>Suspenseee</div>} maxDuration={5000}>
          <Routes>
            <Route element={<AppLayout />}>
              <Route exact path='/' element={<HomePage />} />
              <Route path='/anime/:id' element={<DetailPage />} />
            </Route>
          </Routes>
        </Suspense>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
