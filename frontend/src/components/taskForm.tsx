import { createProjectTask } from "@/api/tasks"
import { ProjectMember } from "@/interfaces/projectMember"
import { createTask, task } from "@/interfaces/tasks"
import Link from "next/link"
import { useState } from "react"

type Props = {
    projectId: number,
    projectName: string
    token: string,
    tasksState: task[] | null,
    setTasksState: React.Dispatch<React.SetStateAction<task[]>>,
    taskFormDisplay: boolean,
    setTaskFormDisplay: React.Dispatch<React.SetStateAction<boolean>>
}

export const TaskForm = ({projectId, projectName, token, tasksState, setTasksState, taskFormDisplay, setTaskFormDisplay}: Props) => {
    const defaultTask = {
        description: "",
        deadline: "",
        priority: 0
    } as {
        description: string,
        deadline: string | Date,
        priority: number
    }

    const [task, setTask] = useState(defaultTask)


    const handleTaskData = (event: React.ChangeEvent<HTMLInputElement>, key: string) => {
        const taskData = {... task}
        const value = event.currentTarget.value
        switch (key) {
            case "description":
                taskData.description = value;
                break
            case "deadline": 
                taskData.deadline = new Date(value);
                break
            case "priority": 
                taskData.priority = parseInt(value, 10);
                break
            default:
                return
        }
        setTask(taskData)
    }

    const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log(task);
        const res = createProjectTask(projectId, token, task as createTask);
        res.then(
            function(value) {
                if (value) {
                    alert("task successfully added")
                    const createdTask = {
                        ...task, 
                        id: -1,
                        name: projectName,
                        status: "pending",
                        assigned_user_role: null,
                        assigned_user_first_name: null,
                        assigned_user_last_name: null
                    } as task
                    setTasksState([... tasksState!, createdTask])
                    setTaskFormDisplay(false)
                    setTask(defaultTask)
                } else {
                    alert('the inputs were not correctly fulfilled')
                }},
            function(error) {console.log(error);}
        )
    }

    return     <div>
    <h2 className='text-center text-xl'>Add a new task</h2>
    <div className="flex flex-row m-5">
        <div className="basis-1/3"></div>
        <div className="flex flex-col basis-1/3 p-4">
            <h2 className="text-center m-4">Fill in the form</h2>
            <p>What is the task's description</p>
            <input 
                placeholder="Describe the task" 
                onChange={(event) => handleTaskData(event, "description")} 
                type="text" 
                className="slate-input p-2 mb-2"
                value={task.description === defaultTask.description ? "" : task.description}/>
            <p>What is the task's deadline</p>
            <input 
                placeholder="yyyy-mm-dd format" 
                onChange={(event) => handleTaskData(event, "deadline")} 
                type="text" 
                className="slate-input p-2 mb-2"
                value={task.deadline === defaultTask.deadline ? "" : undefined }
                />
            <p>What is the task's priority level ?</p>
            <input 
                placeholder="1-5" 
                onChange={(event) => handleTaskData(event, "priority")} 
                type="text" 
                className="slate-input p-2 mb-2"
                value={task.priority === defaultTask.priority ? "" : task.priority}/>
            <div className="flex justify-center mt-2">
                <button className='mb-3 border rounded-lg w-1/2 p-2 hover:bg-slate-100' onClick={handleClick}>Submit</button>
            </div>
        </div>
        <div className="basis-1/3 flex justify-center">
            {/* <Link href="/"> 
                <FontAwesomeIcon icon={faArrowLeft} />
                <button className="text-lg ms-1">Back</button> 
            </Link> */}
        </div>

    </div>
</div>
}