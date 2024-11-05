
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

const ALL_MOVIES = gql`
  query getMovies {
    allMovies {
      id
      title
    }
  }
`;

export default function Movies() {
  const { data, loading } = useQuery(ALL_MOVIES);
  return (
    <div>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <div>
            <h1>Apollo Movies</h1>
            <ul>
              {data?.allMovies?.map((movie) => (
                <li key={movie.id}>
                  <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
  );
}