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
import { Card } from "@chakra-ui/react"
import { CardTitle } from "@components/ui/card"
import { useNavigate } from "react-router-dom"
import axios from "axios" // Import Axios
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

  const navigate = useNavigate() // Used for redirecting after successful login

  // Submit handler for the form
  const onSubmit = async data => {
    const { username, password } = data

    try {
      // Make the API request to authenticate
      // const response = await axios.post("http://127.0.0.1:8000/api/sign/", {
      //   username,
      //   password,
      // })

      // Handle successful login
      if (username === "admin" && password === "admin") {
        // console.log("Login successful:", response.data)
        // Store token or any required data (optional)
        // localStorage.setItem("authToken", response.data.token)
        navigate("/admin") // Redirect to map page on successful login
      }
    } catch (error) {
      // Handle login error
      console.error("Login failed:", error)
      alert("Invalid username or password. Please try again.")
    }
  }

  return (
    <div className="flex justify-evenly items-center w-full ">
      <img src={SignIn} alt="" className="w-[500px]" />
      <Card className="p-10 w-[400px]">
        <CardTitle className="text-center mb-4">Sign In</CardTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
            <Button className="mt-4" type="submit">
              Login
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  )
}

export default Sign


