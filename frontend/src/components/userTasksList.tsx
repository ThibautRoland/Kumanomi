import { userTask } from "@/interfaces/tasks"

type Props = {
    tasks: userTask[]
}

export const UserTasksList = ({tasks}: Props) => {
    return     <div className="">
        {!tasks &&
            <div>you don't have any task assigned for the moment.</div>
        }
        {tasks &&
            <div>
                {tasks.map((task, i) => (
                    <div key={i}>description: {task.description}</div>
                )) }
            </div> 
        }
</div>
}