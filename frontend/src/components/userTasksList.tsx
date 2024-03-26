import { patchTaskStatus } from "@/api/tasks"
import { userTask } from "@/interfaces/tasks"
import { useState } from "react"

type Props = {
    tasks: userTask[],
    token: string
}

export const UserTasksList = ({tasks, token}: Props) => {

    const [tasksState, setTasksState] = useState(tasks as userTask[])

    const handleClick = (taskId: number, key: string) => {
        console.log("taskId -> ", taskId, "key -> ", key)

        const newStatusToPatch = "done"
        console.log(tasksState)
        const res = patchTaskStatus(taskId, token, newStatusToPatch)
        res.then(
            function(value) {
                console.log("yooooooooo",value)
                if (value) {
               
                alert("task was successfully marked as done")
            // 
            var copyTasks = [...tasksState]


            for (var i=0; i <= copyTasks.length-1;i++) {

                if (tasks[i].id == taskId){
                    copyTasks[i].status = newStatusToPatch
                    break
                }
            }
            
            setTasksState(copyTasks)
            console.log(tasksState)

        } else {
            console.log("task wasn't successfully marked as done")
        }},
        function(error) {console.log(error)})
    }

    return     <div className="">
        {!tasks &&
            <div>you don't have any task assigned for the moment.</div>
        }
        {tasks &&
            <div>
                {tasksState.map((task, i) => (
                    <div key={i}>
                        <p>description: {task.description}</p>
                        <p>status: {task.status}</p>
                        <button className="border rounded-lg p-3" onClick={() => handleClick(task.id, "done")}>Mark as done</button>
                    </div>
                )) }
            </div> 
        }
</div>
}