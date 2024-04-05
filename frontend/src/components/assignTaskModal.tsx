import { getProjectTasksFromApi, patchTask } from "@/api/tasks";
import { ProjectMember } from "@/interfaces/projectMember";
import { projectType } from "@/interfaces/projects";
import { task } from "@/interfaces/tasks";
import { useState } from "react";

type props = {
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    taskFocus: null | task,
    setTaskFocus: React.Dispatch<React.SetStateAction<null | task>>;
    projectMembers: ProjectMember[],
    token: string,
    setTasksState: React.Dispatch<React.SetStateAction<task[]>>;
    project: projectType
}

export const AssignTaskModal = ({showModal, setShowModal, taskFocus, setTaskFocus, projectMembers, token, setTasksState, project}: props) => {

    const handleClick = (projectMemberId: number, taskId:  number) => {
        console.log(projectMemberId)
        const res = patchTask(projectMemberId, taskId, token)
        res.then(
          async function(value) {
            if (value) {
              const updatedTasks = await getProjectTasksFromApi(project.id, token) as task[] | null
              setTasksState(updatedTasks!)
              alert("task was successfully assigned")
              setShowModal(false)
            } else {
              alert("task wasn't successfully assigned, try again")
            }
          },
          function(error) {
            console.log('error from patchTask -> ', error)
            alert("there's been a problem, try again later...")
          }
        )
    }

    return     <div>
        <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Open regular modal
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {taskFocus!.description}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    Assign a team member to this task
                  </p>
                  <div>
                    {projectMembers.map((pm, i) => (
                        <button className="border rounded-lg m-2 p-3" onClick={() => handleClick(pm.id, taskFocus!.id)}>{pm.first_name}</button>
                    ))}
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
</div>
}