import { ReactNode } from "react";

type cardProps = {
    children?: ReactNode
}

export const Card = ({children}: cardProps) => {
    return     <div className="bg-kum-yellow shadow-kum-black border-4 border-black p-6">
        {children}
</div>
}