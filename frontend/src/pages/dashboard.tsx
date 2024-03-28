
import { tasksRequest, userTask } from '@/interfaces/tasks';
import { getProtectedEndpoint } from '@/api/sessions';
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
import { getUserTasksFromApi } from '@/api/tasks';
import { UserTasksList } from '@/components/userTasksList';

type IndexProps = {
  tasks: userTask[],
  user_id: number,
  profil_img: string,
  projects: projectType[],
  token: string
}

export default function Dashboard({tasks, user_id,profil_img, projects, token}: IndexProps) {
  const router = useRouter();
  const [tabNumber, setTabNumber] = useState(1)

    const handleClick = (event: React.MouseEvent<HTMLLIElement>, i: number) => {
      setTabNumber(i);
    }

    return (<Layout>
  <div className='px-10'>
    <h1 className="text-center font-bold text-3xl py-5">Dashboard</h1>
    <div className='flex justify-around'>
      <h2>Welcome user_id: {user_id}</h2>
      <UserProfil id={user_id} profilImg={profil_img} />
    </div>

    <div className="flex flex-row">

      <div className="basis-1/6"></div>

      <div className="basis-4/6">
        <ul className="flex text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
          <li className="me-2" onClick={(event) => handleClick(event, 1)}>
            <a href="#" aria-current="page" className={`${tabNumber === 1 ? 'tib-tab-active' : 'tib-tab-sleep'}`}>
              Project List
            </a>
          </li>
          <li className="me-2" onClick={(event) => handleClick(event, 2)}>
            <a href="#" className={`${tabNumber === 2 ? 'tib-tab-active' : 'tib-tab-sleep'}`}>
              My tasks
            </a>
          </li>
          <li className="me-2" onClick={(event) => handleClick(event, 3)}>
            <a href="#" className={`${tabNumber === 3 ? 'tib-tab-active' : 'tib-tab-sleep'}`}>
              Something else
            </a>
          </li>
          <li className="ml-auto" onClick={(event) => handleClick(event, 4)}>
            <a href="#" className={`${tabNumber === 4 ? 'tib-tab-active' : 'tib-tab-sleep'}`}>
              Something else
            </a>
          </li>
        </ul>
      </div>
      
      <div className="basis-1/6 flex justify-center items-center">
        {/* <Link href="./create"><button className="border p-3 rounded-lg hover:bg-slate-100">Add a doctor</button></Link> */}
      </div>
    </div>
          
    <div className={`${tabNumber === 1 ? '' : "hidden"}`}>
      {projects.map((project, i) => (
        <div key={i} className='p-4 my-4'>
          <Link href={`/project/${project.id}`}>
            <ProjectCard project={project}/>
          </Link>
        </div>
      ))}
    </div>

    <div className={`${tabNumber === 2 ? '' : "hidden"}`}>
      <UserTasksList tasks={tasks} token={token} />
    </div>
  
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
    const tasks = await getUserTasksFromApi(parseInt(userIdValue, 10), tokenValue)
    const projects = await getAllProjectsFromApi(tokenValue)
    console.log("userTasks from dashboard -> ", tasks)

        return {
          props: {
            tasks : tasks, 
            user_id: userIdValue,
            profil_img: profilImgValue,
            projects: projects,
            token: tokenValue,
          }
        }
  }