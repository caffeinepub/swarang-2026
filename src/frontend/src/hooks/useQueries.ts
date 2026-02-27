import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";
import type { EventInfo } from "../backend.d";

export function useEventInfo() {
  const { actor, isFetching } = useActor();
  return useQuery<EventInfo>({
    queryKey: ["eventInfo"],
    queryFn: async () => {
      if (!actor) {
        return {
          name: "SWARANG 2026",
          dates: "13–14 March 2026",
          location: "Swaminarayan Siddhanta Institute of Technology",
          about:
            "SWARANG 2026 is the annual cultural extravaganza of Swaminarayan Siddhanta Institute of Technology. A celebration of talent, creativity, and performance arts — bringing together the best performers from across campus to showcase their skill in Dance, Singing, Music, and DJ.",
          contactEmail: "swarang2026@ssit.edu.in",
          contactPhone: "+91 98765 43210",
        };
      }
      const result = await actor.getEventInfo();
      return {
        name: result.name || "SWARANG 2026",
        dates: result.dates || "13–14 March 2026",
        location:
          result.location || "Swaminarayan Siddhanta Institute of Technology",
        about:
          result.about ||
          "SWARANG 2026 is the annual cultural extravaganza of Swaminarayan Siddhanta Institute of Technology. A celebration of talent, creativity, and performance arts — bringing together the best performers from across campus to showcase their skill in Dance, Singing, Music, and DJ.",
        contactEmail: result.contactEmail || "swarang2026@ssit.edu.in",
        contactPhone: result.contactPhone || "+91 98765 43210",
      };
    },
    enabled: !isFetching,
    staleTime: 60_000,
  });
}

export function useGoogleFormUrl() {
  const { actor, isFetching } = useActor();
  return useQuery<string>({
    queryKey: ["googleFormUrl"],
    queryFn: async () => {
      if (!actor) return "";
      return actor.getGoogleFormEmbedUrl();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

export function useSetGoogleFormUrl() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (url: string) => {
      if (!actor) throw new Error("Not connected");
      await actor.setGoogleFormEmbedUrl(url);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["googleFormUrl"] });
    },
  });
}

export function useUpdateEventInfo() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (info: EventInfo) => {
      if (!actor) throw new Error("Not connected");
      await actor.updateEventInfo(
        info.name,
        info.dates,
        info.location,
        info.about,
        info.contactEmail,
        info.contactPhone
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["eventInfo"] });
    },
  });
}

export function useClaimAdmin() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (secret: string) => {
      if (!actor) throw new Error("Not connected");
      await actor._initializeAccessControlWithSecret(secret);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["isAdmin"] });
    },
  });
}
