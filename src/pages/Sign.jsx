import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import SignIn from "../assets/SigninFrame.png"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
})

const Sign = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const navigate = useNavigate()

  const onSubmit = async data => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/", {
        username: data.username,
        password: data.password,
      })
      console.log(response)

      if (response.status === 200) {
        localStorage.setItem("authToken", response.data.access) // Store token
        localStorage.setItem("refreshToken", response.data.refresh) // Store refresh token
        navigate("/admin") // Redirect to admin dashboard
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message)
      alert(error.response?.data?.detail || "Invalid username or password.")
    }
  }

  return (
    <div className="flex justify-evenly items-center w-full">
      <img src={SignIn} alt="Sign In" className="w-[500px]" />
      <Card className="p-10 w-[400px]">
        <CardContent>
          <h2 className="text-center text-xl font-semibold mb-4">Sign In</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit">
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Sign
