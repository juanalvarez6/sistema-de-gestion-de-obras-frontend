import { Mail, BadgeInfo, UserCircle } from "lucide-react";
import { UserResponseDto } from "../models/UserResponse";

interface Props {
  user: UserResponseDto;
}

const UserCard = ({ user }: Props) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border p-6 w-full hover:shadow-xl transition duration-300 relative">
      {/* Ícono principal */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800 break-words">
          {user.fullName}
        </h2>
        <UserCircle className="text-blue-600 w-8 h-8" />
      </div>

      {/* Detalles */}
      <div className="grid gap-2 text-gray-600 text-sm px-2">
        <p className="flex items-center gap-2">
          <BadgeInfo className="w-4 h-4 text-gray-500" />
          <strong>ID:</strong> {user.numberID}
        </p>
        <p className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-gray-500" />
          <strong>Email:</strong> {user.email}
        </p>
        <p className="flex items-center gap-2">
          <UserCircle className="w-4 h-4 text-gray-500" />
          <strong>Rol:</strong> {user.role}
        </p>
      </div>
    </div>
  );
};

export default UserCard;