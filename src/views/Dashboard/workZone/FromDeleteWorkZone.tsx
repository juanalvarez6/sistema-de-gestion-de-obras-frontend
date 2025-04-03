import { useEffect, useState } from "react";
import { useDeleteWorkZone } from "../../../hooks/UseWorkZone";

interface FormDeleteWorkZoneProps {
    workZoneId: number
}

const FormDeleteWorkZone = ({ workZoneId }: FormDeleteWorkZoneProps) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const { mutate: deleteWorkZoneMutation, isPending, isSuccess } = useDeleteWorkZone();

    const deleteWorkZone = () => {
        deleteWorkZoneMutation(workZoneId);
    }
    useEffect(() => {
        if (isSuccess) {
            setIsModalOpen(false);
            alert("La zona se elimino correctamente.");
        }
    }, [isSuccess]);
    return (
        <>
            <button className="m-1.5"
                onClick={() => setIsModalOpen(true)}>
                <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
            {isModalOpen && (
                <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-100 p-6 rounded-lg max-w-sm">
                        <h3 className="text-lg font-medium mb-4">¿Eliminar zona?</h3>
                        <p className="mb-4">Esta acción no se puede deshacer</p>

                        <div className="flex gap-2 justify-end">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 border rounded"
                                disabled={isPending}
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={deleteWorkZone}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                disabled={isPending}
                            >
                                {isPending ? 'Eliminando...' : 'Confirmar'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default FormDeleteWorkZone