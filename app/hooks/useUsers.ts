import axios from "axios";
import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import UserDetails from "../interfaces/user-details.interfaces";

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axios.get("/api/users");
      return data.users as UserDetails[];
    },
  });
};

export const useUserMutation = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: async (newUser: UserDetails) =>
      await axios.post("/api/users", newUser),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      alert("Registration Successful");
    },
    onError: (error) => {
      alert("An Error Occured, Please try again.");
      console.log(error);
    },
  });
};

export const useUserUpdate = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: async (newUser: UserDetails) =>
      await axios.put(`/api/users/${newUser.id}`, newUser),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.log("Error", error);
    },
  });
};
