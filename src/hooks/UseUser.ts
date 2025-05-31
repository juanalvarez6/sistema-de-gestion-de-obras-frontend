import { useQuery } from "@tanstack/react-query";
import { UserService } from "../services/UserService";
import { RoleType, UserResponseDto } from "../models/UserResponse";
import { useAuth } from "../context/AuthProvider";

const userService = new UserService();


export const useAllUsers = () => {
    const { token } = useAuth();
    return useQuery<UserResponseDto[], Error>({
        queryKey: ["all-users"],
        queryFn: () => userService.fetchAllUsers(token!),
        enabled: !!token,
    });
};

export const useAllUsersSupervisor = () => {
    const { token } = useAuth();
    const role: RoleType = "SUPERVISOR";
    return useQuery<UserResponseDto[]>({
        queryKey: ["users-supervisor", role],
        queryFn: () => new UserService().fetchUsersByRole(role, token!),
        enabled: !!token && !!role,
    });
};

export const useAllUsersOperator = () => {
    const { token } = useAuth();
    const role: RoleType = "OPERADOR";
    return useQuery<UserResponseDto[]>({
        queryKey: ["users-operator", role],
        queryFn: () => new UserService().fetchUsersByRole(role, token!),
        enabled: !!token && !!role,
    });
};

export const useUserByIdentification = (numberID: string) => {
    const { token } = useAuth();

    return useQuery<UserResponseDto>({
        queryKey: ['user-identification', numberID],
        queryFn: () => new UserService().fetchUserByIdentification(numberID, token!),
        enabled: !!token && !!numberID,
    });
};