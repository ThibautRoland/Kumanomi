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

type Props = {
  project: projectType,
  tasks: task[] | null,
  token: string
}

export default function Project({project, tasks, token}: Props) {

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

          <button className='border rounded-lg p-3' onClick={handleClick}>Add a task</button>

          <div className={`${taskFormDisplay ? '' : 'hidden'}`}>
            <TaskForm projectId={project.id} token={token} />
          </div>

          {tasks?.map((task, i) => (
            <div key={i} className='m-4 p-4'>
              <TaskCard task={task} />
            </div>
          ))}
        </Layout>
    );
  }

  export async function getServerSideProps(context : any) {
    console.log(context.params.id)
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

    const tasks = await tasksRes?.json()

        return {
          props: {
            project : project,
            tasks: tasks,
            token: tokenValue
          }
        }

  }