import EventDetails from "../interfaces/event-details.interfaces";
import axios from "axios";
import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";

export const useEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const { data } = await axios.get("/api/events");
      return data.events as EventDetails[];
    },
  });
};

export const eventsMutation = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: async (newEvent: EventDetails) =>
      await axios.post("/api/events", newEvent),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      alert("Event successfully added.");
    },
    onError: (error) => {
      alert("An error occured, please try again.");
      console.log("Error", error);
    },
  });
};

export const eventUpdate = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: async (newEvent: EventDetails) =>
      await axios.put(`/api/events/${newEvent._id}`, newEvent),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
    onError: (error) => {
      alert("An error occured, please try again.");
      console.log("Error", error);
    },
  });
};

export const eventDelete = (queryClient: QueryClient) => {
  return useMutation({
    mutationFn: async (evenId: string) =>
      await axios.delete(`/api/events/${evenId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });

      alert("Event successfully deleted.");
    },
    onError: (error) => {
      alert("An error occured, please try again.");
      console.log("Error", error);
    },
  });
};
