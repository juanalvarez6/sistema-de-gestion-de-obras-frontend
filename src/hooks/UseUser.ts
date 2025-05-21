import { useQuery } from "@tanstack/react-query";
import { UserService } from "../services/UserService";
import { RoleType, UserResponseDto } from "../models/UserResponse";

const userService = new UserService();


export const useAllUsers = (token: string) => {
    return useQuery<UserResponseDto[], Error>({
        queryKey: ["all-users"],
        queryFn: () => userService.fetchAllUsers(token!),
        enabled: !!token,
    });
};

export const useAllUsersSupervisor = (token: string) => {
    const role: RoleType = "SUPERVISOR";
    return useQuery<UserResponseDto[]>({
        queryKey: ["users-supervisor", role],
        queryFn: () => new UserService().fetchUsersByRole(role, token!),
        enabled: !!token && !!role,
    });
};

export const useAllUsersOperator = (token: string) => {
    const role: RoleType = "OPERADOR";
    return useQuery<UserResponseDto[]>({
        queryKey: ["users-operator", role],
        queryFn: () => new UserService().fetchUsersByRole(role, token!),
        enabled: !!token && !!role,
    });
};