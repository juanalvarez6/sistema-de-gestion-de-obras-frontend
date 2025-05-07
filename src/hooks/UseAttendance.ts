import { useQuery, useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { attendanceService } from "../services/AttendanceService";
import { Attendance, CreateAttendance } from "../models/Attendance";

export const useAttendances = () => {
    return useQuery<Attendance[], Error>({
        queryKey: ["attendances"],
        queryFn: () => attendanceService.fetchAll(),
    });
};

export const useAttendance = (id: number) => {
    return useQuery<Attendance, Error>({
        queryKey: ["attendance", id],
        queryFn: () => attendanceService.fetchById(id),
        enabled: !!id,
    });
};

export const useCreateAttendance = (): UseMutationResult<Attendance, Error, CreateAttendance> => {
  const queryClient = useQueryClient();
  return useMutation<Attendance, Error, CreateAttendance>({
    mutationFn: (data) => attendanceService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attendances"] });
    },
    onError: (error) => {
      console.error("Error al agregar dato de asistencia:", error.message);
    },
  });
};

export const useUpdateAttendance = () => {
    const queryClient = useQueryClient();
    return useMutation<Attendance, Error, { id: number; data: Partial<CreateAttendance> }>({
        mutationFn: ({id, data}) => attendanceService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["attendances"] });
        },
        onError: (error) => {
            console.error("Error al actualizar dato de asistencia:", error.message);
        }
    });
};

export const useDeleteAttendance = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: (id) => attendanceService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attendances"] });
    },
    onError: (error) => {
      console.error("Error al eliminar dato de asistencia:", error.message);
    },
  });
};