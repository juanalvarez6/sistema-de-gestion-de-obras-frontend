import axios, { AxiosResponse } from "axios";
import { RoleType, UserResponseDto } from "../models/UserResponse";

export class UserService {

    private API_URL = `${import.meta.env.VITE_USERS_URL}/users`;

    async fetchAllUsers(token: string): Promise<UserResponseDto[]> {
        try {
            const response: AxiosResponse<UserResponseDto[]> = await axios.get(
                `${this.API_URL}/all`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data;
        } catch (error: any) {
            if (error.response?.status === 403) {
                throw new Error("No tienes permisos para ver los usuarios");
            }
            throw new Error("Error al obtener los usuarios");
        }
    }

    async fetchUsersByRole(role: RoleType, token: string): Promise<UserResponseDto[]> {
        try {
            const response: AxiosResponse<UserResponseDto[]> = await axios.get(
                `${this.API_URL}/role/${role}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error: any) {
            if (error.response?.status === 403) {
                throw new Error("No tienes permiso para ver estos usuarios");
            }
            throw new Error("Error al obtener los usuarios por rol");
        }
    }
}