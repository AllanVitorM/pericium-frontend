
import ladoEsquerdo from "@/app/assents/ladoesquerdo.png"
import Image from "next/image"

export default function login() {
    return(
        <div className = "flex h-screen"> 
        {/*lado esquerdo do formulario*/}
            <div className=" w-1/2 bg-blue-900 text-white flex justify-center items-center">
            <Image
                src={ladoEsquerdo}
                alt=" login illustration"
                className="w-3/4"
            />
            </div>

        {/*lado esquerdo do formulario*/}   
            <div className="w-1/2  bg white flex flex-col justify-center items-center px-16">
                <h1 className=" text-5xl front-bold text-gray-800 mb-2">Login</h1>
                <p className=" text-lg text-gray-600 mb-6">Faça login para acessar o sistema</p>


                <form className=" w-full max-w-sm space-y-4">
                    <div>
                        <label htmlFor="CPF" className="block text-sm front-medium text-gray-700">
                            CPF
                        </label>
                        <input 
                        type="email"
                        id="email"
                        className="mt-1 w-full px-4 py-2 border border-black rounded-md  rounded-lg  text-black placeholder-gray-600  focus:outline-none focus: ring-2 focus: ring-black"
                        placeholder="Digite seu CPF"
                        required
                        />
                        <p className="text-sm text-red-500 mt-1">E-mail é obrigatorio</p>
                    </div>


                <div>
                    <label htmlFor="senha" className="block text-sm font-medium text-gray-700">
                        Senha
                    </label>
                    <input 
                        type="password" 
                        id="senha" 
                        className="mt-1 w-full px-4 py-2 border border-black rounded-lg text-black placeholder-gray-600  bg-white focus:outline-none focus: ring-2 focus: ring-black"
                        placeholder=" Digite sua senha"
                        required
                    />
                    <p className="text-sm text-red-500 mt-1">Senha é obrigátoria</p>
                </div>
                    <button
                        type="submit"
                        className="wfull py-2 px-4 bg-blue-900 text-white  font-semibold rounded-md hover:bg-blue-800 transition duration-300"
                        >
                        Entrar
                        </button>

                    <p className="text-sm text-gray-500 text-center mt-4">
                        Esqueceu a senha?
                    </p>
                </form>
            </div>
        </div>

   
    )

}