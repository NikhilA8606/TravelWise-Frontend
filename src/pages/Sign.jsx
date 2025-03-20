import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const formSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters."),
  password: z.string().min(2, "Password must be at least 2 characters."),
})

const Sign = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { username: "", password: "" },
  })

  const navigate = useNavigate()

  const onSubmit = async data => {
    try {
      // First, authenticate to get the tokens
      const tokenResponse = await axios.post(
        "http://127.0.0.1:9000/api/token/",
        data
      )

      if (tokenResponse.status === 200) {
        const { access, refresh } = tokenResponse.data
        localStorage.setItem("accessToken", access)
        localStorage.setItem("refreshToken", refresh)

        // Now fetch the user details to get the user ID using the correct endpoint
        try {
          const userResponse = await axios.get(
            "http://127.0.0.1:9000/api/v1/user/me",
            {
              headers: {
                Authorization: `Bearer ${access}`,
              },
            }
          )

          // Store the user ID in localStorage
          if (userResponse.status === 200) {
            const userData = userResponse.data
            console.log("User details:", userData)
            localStorage.setItem("userId", userData.id)
            console.log("User ID stored:", userData.id)
          }
        } catch (userError) {
          console.error("Failed to fetch user details:", userError)
          // We can still proceed even if this fails
        }

        navigate("/admin")
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message)
      alert(error.response?.data?.detail || "Invalid credentials!")
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="p-6 w-full max-w-md">
        <CardContent>
          <h2 className="text-center text-2xl font-semibold mb-6">Sign In</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter username" {...field} />
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
                        placeholder="Enter password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                type="submit"
              >
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
