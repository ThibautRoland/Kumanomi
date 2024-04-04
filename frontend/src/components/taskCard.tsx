import { deleteTask } from "@/api/tasks"
import { task } from "@/interfaces/tasks"
import { useState } from "react"
import { Card } from "./theme/card";

type Props = {
    task: task,
    token: string,
    tasksState: task[],
    setTasksState: React.Dispatch<React.SetStateAction<task[]>>;
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    taskFocus: null | task,
    setTaskFocus: React.Dispatch<React.SetStateAction<null | task>>;
}

export const TaskCard = ({task, token, tasksState, setTasksState, showModal, setShowModal, taskFocus, setTaskFocus}: Props) => {
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

<<<<<<< HEAD
    const openModal = (task: task) => {
        console.log("openModal")
        setTaskFocus(task)
        if (taskFocus) {
            setShowModal(true)
        }
    }

    return     <div className="flex flex-col bg-slate-100 p-10">
    <p>task_id: {task.id}</p>
    <p>{task.name}</p>
    <p>{task.description}</p>
    <p>deadline: {task.deadline.toString().split("T")[0]}</p>
    <p>priority level: {task.priority}</p>
    <p>status: {task.status}</p>
    {assignedState &&
        <div>
            <p>assigned to {task.assigned_user_first_name} {task.assigned_user_last_name}</p>
        </div>
    }
    {!assignedState &&
        <div>
            <p>Not assigned</p>
            <button className="border rounded-lg p-3" onClick={() => openModal(task)}>assign task</button>
        </div>
    }
    <button className="border rounded-lg p-3" onClick={() => {handleClick(task.id, token)}}>Delete Task</button>

=======
    return <Card>

    <div className="flex flex-col italic space-y-8">
                <div className="flex flex-row justify-end items-center">

        <div className="text-kum-light-grey">☠ quest end  {task.deadline.toString().split("T")[0]}</div>

        </div>

        <div className="flex flex-row items-center space-x-4">
      <img className="max-h-8 max-w-8" src="/icon_scroll.png"/>
      <div className="font-bold">Quest</div>
      <div>{task.description}</div>
      <div className="text-kum-light-grey">[ id: {task.id} ]</div>
      </div>

      <div className="flex flex-row space-x-4">
        <div className="font-bold">Priority</div>
        <div>{task.priority}</div>
      </div>

      <div className="flex flex-row space-x-4">
        <div className="font-bold">Status</div>
        <div>{task.status}</div>
      </div>

    { assignedState ?
        <div className="flex flex-row space-x-4">

            <img className="kum-mini-profil-pic" src={`http://localhost:9000/profils_pics/${task.assigned_user_first_name?.toLowerCase()}.jpg`}/>
            <div>assigned to {task.assigned_user_first_name} {task.assigned_user_last_name}</div>
        </div> :

        <div>Not assigned</div>
    }
    <button className="kum-btn" onClick={() => {handleClick(task.id, token)}}>Delete Task</button>
>>>>>>> d233727 (feat(front): make taskCard)
</div>
</Card>
}