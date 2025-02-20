import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"
import KsrtcTrips from "./Ksrtc"

const Admin = () => {
  const [activeTab, setActiveTab] = useState("ksrtc")
  const navigate = useNavigate()

  const token = localStorage.getItem("authToken")
  const userRole = localStorage.getItem("")

  if (!token) {
    navigate("/sign")
  }

  return (
    <div className="flex min-h-screen ">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-5 flex flex-col">
        <h2 className="text-lg font-semibold mb-6 text-center">Admin Panel</h2>
        <nav className="space-y-4">
          <Button
            variant={activeTab === "ksrtc" ? "secondary" : "ghost"}
            className="flex items-center space-x-3 w-full p-3"
            onClick={() => setActiveTab("ksrtc")}
          >
            <Home className="w-5 h-5" />
            <span>KSRTC Portal</span>
          </Button>
          {userRole === "admin" && (
            <Button
              variant={activeTab === "users" ? "secondary" : "ghost"}
              className="flex items-center space-x-3 w-full p-3"
              onClick={() => setActiveTab("users")}
            >
              <Users className="w-5 h-5" />
              <span>Users</span>
            </Button>
          )}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        {activeTab === "ksrtc" ? (
          <KsrtcTrips />
        ) : userRole === "admin" ? (
          <UserList />
        ) : null}
      </main>
    </div>
  )
}

export default Admin
