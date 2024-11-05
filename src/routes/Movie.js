import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const GET_MOVIE = gql`
  query getMovie($movieId: ID!) {
    movie(id: $movieId) {
      id
      title
      medium_cover_image
      rating
      isLiked @client
    }
  }
`;

export default function Movie() {
    const { id } = useParams();
    const {
      data,
      loading,
      client: { cache },
    } = useQuery(GET_MOVIE, {
      variables: {
        movieId: id,
      },
    });
    const onClick = () => {
      cache.writeFragment({
        id: `Movie:${id}`,
        fragment: gql`
          fragment MovieFragment on Movie {
            isLiked
          }
        `,
        data: {
          isLiked: !data.movie.isLiked,
        },
      });
    };
    return (
        <div>
            {loading? (
              <h1>Loading...</h1>
            ) : (
              <div>
                <h1>{data.movie?.title}</h1>
                <img src={data?.movie?.medium_cover_image} alt={data.movie?.title} />
                <p>Rating: {data?.movie?.rating}</p>
                <button onClick={onClick}>
                  {data?.movie?.isLiked? "Unlike" : "Like"}
                </button>
              </div>
            )}
        </div>
    );
  }