import ContainerImage from "@/components/containerimage"
import LoginForm from "@/components/loginform"
export default function login() {
    return(
        <div className = "flex h-screen w-screen "> 
        {/*lado esquerdo do formulario*/}
        <div className="w-1/2 h-full ">
            <ContainerImage />
        </div>
        {/*lado esquerdo do formulario*/}   
            <div className="w-1/2 bg-white h-full flex items-center justify-center">
                <LoginForm/>
            </div>
        </div>

   
    )

}