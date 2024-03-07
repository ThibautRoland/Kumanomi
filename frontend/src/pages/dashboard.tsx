
import { tasksRequest } from '@/interfaces/tasks';
import { getProtectedEndpoint, getTasksApi } from '@/api/sessions/sessions';
import { getBearerToken, getItemFromContext } from '@/api/cookies/cookies'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { task } from '@/interfaces/tasks';
import { Layout } from '@/components/layout';
import { getAllProjectsFromApi } from '@/api/projects';
import { projectType } from '@/interfaces/projects';
import { ProjectCard } from '@/components/projectCard';

type IndexProps = {
  tasks: task[],
  user_id: number,
  projects: projectType[]
}

export default function Dashboard({tasks, user_id, projects}: IndexProps) {
  const router = useRouter();
  const [tokenState, setTokenState] = useState("")

    return (<Layout>
      <div className='px-10'>
        <h1 className="text-center font-bold text-3xl py-5">Dashboard</h1>
        <h2>Welcome user_id: {user_id}</h2>
        {projects.map((project, i) => (
          <div key={i} className='p-4 my-4'>
            <ProjectCard project={project}/>
          </div>
        ))}
        
      </div>
        </Layout>
    );
  }

  export const config = {
    runtime: 'nodejs',
  }

  export async function getServerSideProps(context : any) {
    // console.log("context.req.headers.cookie ---> ", context.req.headers.cookie)
    const tokenValue = getItemFromContext(context, 'token')
    const userIdValue = getItemFromContext(context, 'user_id')
    console.log("from cookie context --> ", userIdValue)
    const tasks = await getTasksApi(tokenValue)
    const projects = await getAllProjectsFromApi(tokenValue)

        return {
          props: {
            tasks : tasks, 
            user_id: userIdValue,
            projects: projects
          }
        }
  }