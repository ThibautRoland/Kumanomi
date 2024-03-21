import { createProjectTask } from "@/api/tasks"
import Link from "next/link"
import { useState } from "react"

type Props = {
    projectId: number,
    token: string
}

export const TaskForm = ({projectId, token}: Props) => {
    const [task, setTask] = useState({
        description: "",
        deadline: new Date("0001-01-01"),
        priority: 0
    })

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
        const res = createProjectTask(projectId, token, task);
        res.then(
            function(value) {if (value) {
                    alert("task successfully added")
                    location.reload()
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
            <input placeholder="Describe the task" onChange={(event) => handleTaskData(event, "description")} type="text" className="slate-input p-2 mb-2"/>
            <p>What is the task's deadline</p>
            <input placeholder="yyyy-mm-dd format" onChange={(event) => handleTaskData(event, "deadline")} type="text" className="slate-input p-2 mb-2"/>
            <p>What is the task's priority level ?</p>
            <input placeholder="1-5" onChange={(event) => handleTaskData(event, "priority")} type="text" className="slate-input p-2 mb-2"/>
            <p className="text-center">Coordinates</p>
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