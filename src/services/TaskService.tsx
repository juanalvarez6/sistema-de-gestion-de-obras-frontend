class TaskService {

    static getTask = async () => {
        try{
            const response = await fetch('http://localhost:8080/api/task')
            const data = await response.json()
            return data
        }catch(error){
            return `error, ${error}`
        }
    }

}

export default TaskService;