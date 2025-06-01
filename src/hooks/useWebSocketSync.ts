import { useEffect } from "react";
import { Client } from "@stomp/stompjs";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/AuthProvider";

export const useProjectSync = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  useEffect(() => {
    const stompClient = new Client({
      brokerURL: `${import.meta.env.VITE_API_GESTION}/ws`,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
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

export const useWorkZoneSync = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  useEffect(() => {
    // Configuración del cliente STOMP
    const stompClient = new Client({
      brokerURL: `${import.meta.env.VITE_API_GESTION}/ws`,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      reconnectDelay: 5000, // Reintenta conexión cada 5 segundos si falla
      debug: (str) => console.debug('[STOMP]', str), // Opcional: logs para depuración

      onConnect: () => {
        // Suscripción al topic de zonas
        stompClient.subscribe('/topic/zones', (message) => {
          if (message.body === 'refresh') {
            // Invalida la caché de zonas cuando llega "refresh"
            queryClient.invalidateQueries({ queryKey: ['workZones'] });
          }
        });
      },
    });

    stompClient.activate();

    // Limpieza al desmontar el componente
    return () => {
      stompClient.deactivate();
    };
  }, [queryClient]); // Dependencia del queryClient
};