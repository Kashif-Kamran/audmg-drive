
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SignUpPayload } from "@/api/auth/dto"
import AuthApi from "@/api/auth"
import { useToast } from "@/components/ui/use-toast"
import { useNavigate } from "react-router-dom"

export function SignUpForm() {
    const { toast } = useToast()
    const [isLoading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()
    const [signUpPayload, setSignUpPayload] = useState<SignUpPayload>({
        email: "",
        password: "",
        username: ""
    })
    // 
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSignUpPayload({ ...signUpPayload, [event.target.id]: event.target.value });
    }
    // 
    const handleSubmit = async () => {
        console.log("Signup payload to send : ", signUpPayload);
        if (!signUpPayload.email || !signUpPayload.password || !signUpPayload.username)
            return;

        setLoading(true);
        try
        {
            console.log(signUpPayload);
            const { data: signUpResponse } = await AuthApi.signUp(signUpPayload);
            if (!signUpResponse.success)
            {
                toast({
                    title: "Failed to SignUp",
                    description: signUpResponse.message
                })
                setLoading(false)
                return;
            }
            toast({
                title: "User Registered Succssfully",
            })
            navigate('/login')
        } catch (error)
        {
            console.log("Signup catch error : ", error);
            toast({
                variant: "destructive",
                title: "Unable to SignUp New User",
            })
        }
        setLoading(false);
    }

    const handleAlreadyAccount = () => {
        navigate('/login')
    }
    return (
        <Card className="w-3/4 md:w-2/4 lg:w-2/5 bg-primary-foreground shadow-xl shadow-primary-foreground">
            <CardHeader className="">
                <CardTitle className="text-center my-4">Create new account</CardTitle>

            </CardHeader>
            <CardContent className="">
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" placeholder="Enter First Name" required onChange={handleInputChange} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" placeholder="Enter Password" onChange={handleInputChange} />
                    </div>
                    <div className="flex gap-4">
                        <Button disabled={isLoading} onClick={handleSubmit} className="w-full">
                            Create an account
                        </Button>
                        <Button variant={"secondary"} onClick={handleAlreadyAccount} disabled={isLoading} className="w-full">
                            Already have account
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}


export default SignUpForm
