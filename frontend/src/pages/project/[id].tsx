import { tasksRequest } from '@/interfaces/tasks';
import { getBearerToken, getItemFromContext } from '@/api/cookies/cookies'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { task } from '@/interfaces/tasks';
import { Layout } from '@/components/layout';
import { getProjectByID } from '@/api/projects';
import { projectType } from '@/interfaces/projects';
import { getProjectTasksFromApi } from '@/api/tasks';
import { TaskCard } from '@/components/taskCard';
import { TaskForm } from '@/components/taskForm';
import { getProjectMemberFromApi } from '@/api/projectMembers';
import { ProjectMember } from '@/interfaces/projectMember';
import Link from 'next/link';

type Props = {
  project: projectType,
  tasks: task[] | null,
  token: string,
  projectMember: ProjectMember | null
}

export default function Project({project, tasks, token, projectMember}: Props) {

    const [taskFormDisplay, setTaskFormDisplay] = useState(false)
    const [tasksState, setTasksState] = useState(tasks!)

    const router = useRouter();
    const { id } = router.query;

    const handleClick = () => {
      setTaskFormDisplay(!taskFormDisplay)
    }

    return (<Layout>
          <h1 className="text-center font-bold text-3xl py-5">Project</h1>          
          <p> id : {project.id}</p>
          <p> name : {project.name}</p>
          <p> description : {project.description}</p>           
          <p> userAdminID : {project.user_admin_id}</p>
          <Link href="/dashboard">back to dashboard</Link>

          {projectMember && projectMember.role === "manager" && 
            <button className='border rounded-lg p-3' onClick={handleClick}>Add a task</button>
          }
          {projectMember && projectMember.role === "manager" && 
            <div className={`${taskFormDisplay ? '' : 'hidden'}`}>
              <TaskForm projectId={project.id} projectName={project.name} token={token} tasksState={tasksState} setTasksState={setTasksState} taskFormDisplay={taskFormDisplay} setTaskFormDisplay={setTaskFormDisplay} />
            </div>
          }

          {tasksState && 
            <div>
              {tasksState.map((task, i) => (
                <div key={i} className='m-4 p-4'>
                  <TaskCard task={task} token={token} tasksState={tasksState} setTasksState={setTasksState} />
                </div>
              ))}
            </div>
          }

          {!tasksState &&
            <div>No task in this project yet!</div>
          }
        </Layout>
    );
  }

  export async function getServerSideProps(context : any) {
    const id = context.params.id
    // const id = context.query.id
    // if(!context.query.id){
    //   return {
    //     redirect: {
    //       destination: '/dashboard', 
    //       permanent: false, 
    //     },
    //   };
    // }
    const tokenValue = getItemFromContext(context, 'token')

    const res = await getProjectByID(id, tokenValue)
    if (res == null) {
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false,
        },
      };
    }

    if (res.status == 404){
      return {
        redirect: {
          destination: '/notfound',
          permanent: false,
        },
      };
    }

    const project = await res.json() as Response
    
    const tasks = await getProjectTasksFromApi(id, tokenValue) as task[] | null
   
    const userId = getItemFromContext(context, "user_id");

    const projectMemberRes = await getProjectMemberFromApi(parseInt(userId, 10), id, tokenValue)
    // var projectMember : ProjectMember | null = null
    // if(!(projectMemberRes === null) && projectMemberRes!.status === 200) {
    //   projectMember = await projectMemberRes!.json()
    // }
    const projectMember = (projectMemberRes && projectMemberRes.status === 200) ? await projectMemberRes!.json() : null


        return {
          props: {
            project : project,
            tasks: tasks,
            token: tokenValue,
            projectMember: projectMember
          }
        }

  }