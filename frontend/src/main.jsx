import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client'

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache()
});

const BOOKS = gql`
  query Books {
    books {
      title
      author
    }
  }
`;

function Books() {
  const { loading, error, data } = useQuery(BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return data.books.map(({ title, author }) => (
    <div key={title}>
      <p>
        {title} by {author}
      </p>
    </div>
  ));
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Books />
    </ApolloProvider>
  </React.StrictMode>,
)
