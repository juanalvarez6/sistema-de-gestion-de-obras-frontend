import { useEffect } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useQueryClient } from "@tanstack/react-query";

export const useProjectSync = () => {
  const queryClient = useQueryClient(); // ← accede al client del contexto

  useEffect(() => {
    const socket = new SockJS(`${import.meta.env.VITE_API_GESTION}/ws`);
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        stompClient.subscribe("/topic/projects", (message) => {
          if (message.body === "refresh") {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
          }
        });
      },
    });

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, [queryClient]);
};
