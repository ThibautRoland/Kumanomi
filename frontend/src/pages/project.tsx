
import { tasksRequest } from '@/interfaces/tasks';
import { getProjectByID, getProtectedEndpoint, getTasksApi } from '@/api/sessions/sessions';
import { getBearerToken, getItemFromContext } from '@/api/cookies/cookies'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { task } from '@/interfaces/tasks';
import { Layout } from '@/components/layout';
import { project } from '@/interfaces/project';

type ProjectProps = {
  project: project
}

export default function Project({project}: ProjectProps) {

    return (<Layout>
          <h1 className="text-center font-bold text-3xl py-5">Project</h1>          
            <p> id : {project.id}</p>
            <p> name : {project.name}</p>
            <p> description : {project.description}</p>           
            <p> userAdminID : {project.userAdminID}</p>
        </Layout>
    );
  }

  export async function getServerSideProps(context : any) {
    const id = context.query.id
    if(!context.query.id){
      return {
        redirect: {
          destination: '/dashboard', 
          permanent: false, 
        },
      };
    }
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

        return {
          props: {
            project : project
          }
        }
  }