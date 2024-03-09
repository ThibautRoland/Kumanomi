
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
import Link from 'next/link';
import { UserProfil } from '@/components/UserProfil';

type IndexProps = {
  tasks: task[],
  user_id: number,
  profil_img: string,
  projects: projectType[]
}

export default function Dashboard({tasks, user_id,profil_img, projects}: IndexProps) {
  const router = useRouter();
  const [tokenState, setTokenState] = useState("")

    return (<Layout>
      <div className='px-10'>
        <h1 className="text-center font-bold text-3xl py-5">Dashboard</h1>
        <div className='flex justify-around'>
        <h2>Welcome user_id: {user_id}</h2>
        <UserProfil id={user_id} profilImg={profil_img} />
        </div>
        
        {projects.map((project, i) => (
          <div key={i} className='p-4 my-4'>
            <Link href={`/project/${project.id}`}>
              <ProjectCard project={project}/>
            </Link>
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
    const profilImgValue = getItemFromContext(context, 'profil_img')
    console.log("from cookie context --> ", userIdValue)
    const tasks = await getTasksApi(tokenValue)
    const projects = await getAllProjectsFromApi(tokenValue)

        return {
          props: {
            tasks : tasks, 
            user_id: userIdValue,
            profil_img: profilImgValue,
            projects: projects
          }
        }
  }