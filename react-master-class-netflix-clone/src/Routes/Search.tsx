import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { IOtherMoviesResult, searchMovie, ISearch } from "../api";

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");

  const { data, isLoading } = useQuery(["SearchMovie", keyword], () =>
    searchMovie(keyword || "")
  );

  console.log(keyword);
  return (
    <>
      <div>adsfasdf</div>
    </>
  );
}

export default Search;
