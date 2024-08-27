import { useForm } from "react-hook-form";
import { useState } from 'react';
import { checkPassword } from "../../util/passwords";
export default function Login(props) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    //Login Handler
    const onSubmit = async data => {
        const fetchedObj = localStorage.getItem(data.email.toLowerCase());
        if (fetchedObj === null) {
            alert("Couldn't find Account linked to " + data.email);
            return;
        }
        if (checkPassword(data.password, JSON.parse(fetchedObj).password)) {
            props.setUserDetails(JSON.parse(fetchedObj));
            props.navigateTo("Home");
            return;
        }
        alert("Invalid Password");
    }

    return (
        <>
            {/* <form onSubmit={handleSubmit(onSubmit)} className="row align-items-center justify-content-center">
                <div className="col-md-8 flex-column align-items-center justify-content-center align-content-center gap-3">
                    {/* <input className="" type="email" placeholder="example@mail.dom" {...register("email", { required: true })} />
                    {errors.email && <span className="text-danger row">Email is required</span>}

                    <input className="" type="password" {...register("password", { required: true })} />
                    {errors.password && <span className="text-danger">Password is required</span>}

                    <button className="btn btn-success" type="submit" >Login</button>
                </div>
            </form> */}
            <div className="row w-100 justify-content-center">
                <form onSubmit={handleSubmit(onSubmit)} className="col-md-8 flex-column align-items-center justify-content-center w-md-50 w-lg-50">
                    <div class="form-group m-2">
                        <label for="email">Email address <span className="text-danger">*</span></label>
                        <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" {...register("email", { required: true })} />
                        {errors.email && <span id="emailHelp" className="text-danger m-1">Email is required</span>}
                    </div>
                    <div class="form-group m-2">
                        <label for="pasword">Password <span className="text-danger">*</span></label>
                        <input type="password" class="form-control" id="password" placeholder="Password" {...register("password", { required: true })} />
                        {errors.password && <span className="text-danger">Password is required</span>}
                    </div>
                    <button type="submit" class="btn btn-primary m-2">Login</button>
                </form>
            </div>
        </>
    );
}