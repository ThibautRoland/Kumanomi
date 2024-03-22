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

type Props = {
  project: projectType,
  tasks: task[] | null,
  token: string,
  projectMember: ProjectMember
}

export default function Project({project, tasks, token, projectMember}: Props) {

    const [taskFormDisplay, setTaskFormDisplay] = useState(false)

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

          {projectMember.role === "manager" && 
            <button className='border rounded-lg p-3' onClick={handleClick}>Add a task</button>
          }
          {projectMember.role === "manager" && 
            <div className={`${taskFormDisplay ? '' : 'hidden'}`}>
              <TaskForm projectId={project.id} token={token} projectMember={projectMember} />
            </div>
          }


          {tasks?.map((task, i) => (
            <div key={i} className='m-4 p-4'>
              <TaskCard task={task} />
            </div>
          ))}
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
    
    const tasksRes = await getProjectTasksFromApi(id, tokenValue)
    if (tasksRes === null || tasksRes.status !== 200) {
      const tasks = null
    }

    const userId = getItemFromContext(context, "user_id");
    console.log("userid from mtn", userId)

    const projectMemberRes = await getProjectMemberFromApi(parseInt(userId, 10), id, tokenValue)
    if(projectMemberRes === null || projectMemberRes.status !== 200) {
      const projectMember = null
    }

    const projectMember = await projectMemberRes!.json()

    console.log("projectmember from mtn", projectMember)

    const tasks = await tasksRes?.json()

        return {
          props: {
            project : project,
            tasks: tasks,
            token: tokenValue,
            projectMember: projectMember
          }
        }

  }