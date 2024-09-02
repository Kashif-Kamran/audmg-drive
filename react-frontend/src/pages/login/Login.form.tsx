
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AuthApi from "@/api/auth"
import { useToast } from "@/components/ui/use-toast"
import { useAuthContext } from "@/contexts/authContext"
import { useNavigate } from "react-router-dom"

function LoginForm() {
    const { toast } = useToast();
    const navigate = useNavigate();
    // 
    const [lodding, setLodding] = useState(false);
    const { setAuthToken } = useAuthContext();
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        setLoginData({
            ...loginData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        if (!loginData.email || !loginData.password)
            return;

        setLodding(true);
        try
        {
            console.log(loginData);
            const { data: responseData } = await AuthApi.login(loginData);

            if (!responseData.success)
            {
                toast({
                    title: "Failed to login",
                    description: "Please check your credentials"
                })
                setLodding(false)
                return;
            }
            const token = responseData.data.jwtToken;

            setAuthToken(token);
            toast({
                title: "Logged in successfully",
            });
            navigate('/')
        }
        catch (e)
        {
            console.log(e);
            toast({
                title: "Failed to login",
                description: "Please check your credentials",
            });
        }
        setLodding(false);
    }

    const handleCreateAccount = () => {
        navigate('/signup')
    }
    return (
        <Card className="w-3/4 md:w-2/4 lg:w-2/5 shadow-xl bg-primary-foreground shadow-primary-foreground">
            <CardHeader>
                <CardTitle className="text-center">Login Form</CardTitle>
            </CardHeader>
            <CardContent className="">
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" onChange={handleChange} />
                    </div>
                    <div className="flex gap-4">
                        <Button disabled={lodding} className="w-full" onClick={handleSubmit}>
                            Login
                        </Button>
                        <Button variant={"secondary"} className="w-full" onClick={handleCreateAccount}>
                            Create an account
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}


export default LoginForm 
