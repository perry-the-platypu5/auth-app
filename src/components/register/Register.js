import { useForm } from "react-hook-form";
import { getHashed, checkPassword } from "../../util/passwords";

export default function Register(props) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async data => {
        console.log(data);
        const obj = {
            name: data.name,
            email: data.email.toLowerCase(),
            password: await getHashed(data.password),
            gender: data.gender
        };
        const fetchedObj = localStorage.getItem(obj.email);
        if (fetchedObj !== null) {
            alert("Email already used");
            return;
        }
        localStorage.setItem(obj.email, JSON.stringify(obj));
        console.log("Password match =" + checkPassword(data.password + "as", obj.password));
        console.log("Fetched obj = " + fetchedObj);
        props.navigateTo("Login");
    }

    return (<>
        <div className="row w-100 justify-content-center">
            <form onSubmit={handleSubmit(onSubmit)} className="col-md-8 flex-column align-items-center justify-content-center w-md-50 w-lg-50">
                <div class="form-group m-2">
                    <label for="name">Name<span className="text-danger">*</span></label>
                    <input type="text" class="form-control" id="name" aria-describedby="nameHelp" placeholder="Enter Name" {...register("name", { required: true })} />
                    {errors.name && <span id="nameHelp" className="text-danger m-1">Name is required</span>}
                </div>
                <div class="form-group m-2">
                    <label for="genderSelect">Gender <span className="text-danger">*</span></label>
                    <select class="form-control" id="genderSelect" {...register("gender")}>
                        <option value="F">Female</option>
                        <option value="M">Male</option>
                        <option value="O">Other</option>
                    </select>
                </div>
                <div class="form-group m-2">
                    <label for="email">Email address <span className="text-danger">*</span></label>
                    <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" {...register("email", { required: true })} />
                    {errors.email && <span id="emailHelp" className="text-danger m-1">Email is required</span>}
                </div>
                <div class="form-group m-2">
                    <label for="pasword">Password <span className="text-danger">*</span></label>
                    <input type="password" class="form-control" id="password" placeholder="Password" {...register("password", { required: true, pattern: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/ })} />
                    {errors.password && <span className="text-danger m-1">Password should contain 8 characters with special character, alphabet and number</span>}
                </div>
                <div class="form-group m-2">
                    <label for="confirmPasword">Confirm Password <span className="text-danger">*</span></label>
                    <input type="password" class="form-control" id="confirmPassword" placeholder="Password" {...register("confirmPassword", { required: true, validate: (val) => { if (watch('password') != val) { return "Passwords don't match"; } } })} />
                    {errors.confirmPassword && <span className="text-danger m-1">{errors.confirmPassword.message}</span>}
                </div>
                <button type="submit" class="btn btn-primary m-2">Login</button>
            </form>
        </div>
    </>
    );
}