import * as React from "react";
import { useForm } from "react-hook-form"; // Importing useForm from react-hook-form
import { Input } from "./input"; // Importing Input component
import { Button } from "./button"; // Importing Button component

const LoginForm = () => { // LoginForm component for user authentication
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        // Handle login logic here, e.g., send data to the server
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label htmlFor="username">Username</label>
                <Input id="username" {...register("username")} />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <Input id="password" type="password" {...register("password")} />
            </div>
            <Button type="submit">Login</Button>
        </form>
    );
};

export default LoginForm;
