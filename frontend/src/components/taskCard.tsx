import { deleteTask } from "@/api/tasks"
import { task } from "@/interfaces/tasks"
import { useState } from "react"

type Props = {
    task: task,
    token: string,
    tasksState: task[],
    setTasksState: React.Dispatch<React.SetStateAction<task[]>>;
}

export const TaskCard = ({task, token, tasksState, setTasksState}: Props) => {
    const [assignedState, setAssignedState] = useState(task.assigned_user_first_name !== null)
    console.log(task.assigned_user_first_name !== null)

    const handleSetTasksState = (taskId: number) => {
        const copyTasks = [... tasksState].filter(task => task.id !== taskId)
        setTasksState(copyTasks);
    }

    const handleClick = (taskId: number, token: string) => {
        const confirmation = confirm("Are you sure you want to delete this task ?")

        if (!confirmation) {
            return
        }

        const res = deleteTask(taskId, token)
        res.then(
            function(value) {
                if (value) {
                    alert("the task was successfully deleted ?")
                    handleSetTasksState(taskId)
                } else {
                    console.log("task wasn't successfully deleted");
                    alert("task wasn't successfully deleted")
                }
            },
            function(error) {console.log(error)}
        )
    }

    return     <div className="flex flex-col bg-slate-100 p-10">
    <p>task_id: {task.id}</p>
    <p>{task.name}</p>
    <p>{task.description}</p>
    <p>deadline: {task.deadline.toString().split("T")[0]}</p>
    <p>priority level: {task.priority}</p>
    <p>status: {task.status}</p>
    <p className={assignedState ? "" : "hidden"}>
        assigned to {task.assigned_user_first_name} {task.assigned_user_last_name}
    </p>
    <p className={!assignedState ? "" : "hidden"}>
        Not assigned
    </p>
    <button className="border rounded-lg p-3" onClick={() => {handleClick(task.id, token)}}>Delete Task</button>
</div>
}