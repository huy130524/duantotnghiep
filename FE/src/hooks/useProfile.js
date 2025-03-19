import { useQuery } from "@tanstack/react-query";
import { api } from "../api/api";
import { useAuth } from "./useAuth";

export const useProfile = () => {
  const { getAccessToken } = useAuth();

  const token = getAccessToken();

  const { data, refetch } = useQuery({
    queryKey: ["GET_PROFILE"],
    queryFn: () => api.get("/profile"),
    enabled: !!token,
  });

  return { profile: data ?? null, refreshProfile: refetch };
};
