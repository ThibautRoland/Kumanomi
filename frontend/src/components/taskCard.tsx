import { task } from "@/interfaces/tasks"

type Props = {
    task: task
}

export const TaskCard = ({task}: Props) => {
    return     <div className="flex flex-col bg-slate-100 p-10">
    <p>task_id: {task.id}</p>
    <p>{task.name}</p>
    <p>{task.description}</p>
    <p>deadline: {task.deadline.toString()}</p>
    <p>priority level: {task.priority}</p>
    <p>status: {task.status}</p>
    <p>assigned to {task.assigned_user_first_name} {task.assigned_user_last_name}</p>
</div>
}