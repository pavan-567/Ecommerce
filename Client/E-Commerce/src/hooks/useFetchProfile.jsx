import { useQuery } from "@tanstack/react-query";
import { getProfileDetails } from "../services/apiUser";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profileDetails } from "../features/Users/userSlice";

function useFetchProfile() {
  const { data, isFetched, error, isError, isFetching } = useQuery({
    queryKey: ["userProfile"],
    queryFn: getProfileDetails,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (isFetched) dispatch(profileDetails(data));
  }, [data, isFetched, dispatch]);

  return { data, isFetched, error, isError, isFetching };
}

export default useFetchProfile;
