import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function useFetch(url, key) {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: [key],
    queryFn: () => getRecentBrands(),
  });
  async function getRecentBrands() {
    return axios.get(url);
  }

  return { data, isError, error, isLoading };
}

export default useFetch;
