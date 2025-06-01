export interface UserResponseDto {
  id: number;
  numberID: string;
  fullName: string;
  email: string;
  role: RoleType;
}

export type RoleType = 'ADMINISTRADOR' | 'SUPERVISOR' | 'OPERADOR';