import { useQuery } from "@tanstack/react-query"
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react"

const ProjectService = () => {

    const API_URL = 'http://localhost:8080/api/projects';

    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['projects'],
        queryFn: async () => {
            const response = await fetch(API_URL)
            return response.json()
        }
    })

    if(isLoading){
        return (
            <h2>Cargando ...</h2>
        )
    }

    if(isError){
        return (
            <h2>{error.message}</h2>
        )
    }

  return (
    <>
        {
            data?.map((project: { id: Key | null | undefined; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined }) => {
                return (
                    <li key={project.id} className="list-none">
                        {project.name}
                    </li>
                )
            })
        }
    </>
  )
}

export default ProjectService