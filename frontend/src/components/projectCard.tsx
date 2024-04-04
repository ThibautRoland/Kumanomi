import { projectType } from "@/interfaces/projects"
import { Card } from "./theme/card"
import { mockImageNameFromId } from "@/utils/mock"

type projectProps = {
    project: projectType
}

export const ProjectCard = ({project}: projectProps) => {


    //TODO we have an error here, "d instance of Date" return false
    // QUICKFIX a created a new date to have a real variable of type "date"
    function formatDate(d: Date): string {
        d  = new Date(d);
        return `${d.getDay()}/${d.getMonth()}/${d.getFullYear()}`;
      }



    return <Card>

    <div className="flex flex-col italic space-y-8">
        <div className="flex flex-row justify-around items-center">
        <h1 className="text-3xl font-bold">{project.name}</h1>
        <div className="text-kum-light-grey">☠ Epic end  {formatDate(project.deadline)}</div>

        </div>

      <div className="flex flex-row items-center space-x-4">
      <img className="max-h-8 max-w-8" src="/icon_scroll.png"/>
      <div className="font-bold">Epic</div>
      <div>{project.description}</div>
      </div>


      <div className="flex flex-row space-x-4 items-center">

      {
      //TODO we should get the id of user assigned to get his profil pic
      }
      <img className="kum-mini-profil-pic mr-4" src={`http://localhost:9000/profils_pics/${mockImageNameFromId(project.user_admin_id)}`} />
      <div className="font-bold">admin</div>
      <div>{project.user_admin_id}</div>
      </div>

</div>
</Card>
}