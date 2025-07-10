import { useForm } from "react-hook-form";
import { createUser } from "../api/profiles.api";

export function RegisterPage(){

    const {register, handleSubmit, formState:{
        errors
    }} = useForm();

    const onSubmit = handleSubmit(async data => {
        const res = await createUser(data);
        console.log(res);
    })
    
    return(
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Nickname" {...register("nickname", {required: true})}/>
                {errors.nickname && <span>Este campo es Requerido</span>}
                <br />
                <input type="password" placeholder="Password" {...register("password", {required: true})}/>
                {errors.password && <span>Este campo es Requerido</span>}
                <br />
                <button>Crear Cuenta</button>
            </form>
        </div>
    )
}