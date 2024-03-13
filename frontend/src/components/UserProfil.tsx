
type UserProfilProps = {
    id: number,
    profilImg: string
}

export const UserProfil = ({id, profilImg}: UserProfilProps) => {
    return     <div className="flex flex-row ">
                <div>user id : {id}</div>
                <img src={`http://localhost:9000/profils_pics/${profilImg}`} />
</div>
}