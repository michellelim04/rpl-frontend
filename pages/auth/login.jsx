import Template from "@/components/template"
import { useState } from "react"
import { toast } from "react-toastify"
const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  return <Template>
    <main className="min-h-screen flex flex-col align-middle justify-center">
      <h1 className="font-bold text-center text-3xl mb-5">Temporary login screen...</h1>
      <h3 className="font-semibold text-center text-xl mb-5">geblek hirup daek jadi runtahhh</h3>
      <form onSubmit={(e) => {
        e.preventDefault()
        const requestBody = JSON.stringify({
          username, password
        })
        fetch("https://rpl-backend-production.up.railway.app/v1/auth/login", {
          method: "POST",
          body: requestBody,
          headers: {
            "Content-Type": "application/json"
          }
        }).then(async (response) => {
          if (response.status !== 200) {
            toast.error("Failed to login..")
            return
          }
          const responsejson = await response.json();
          const type = responsejson.data.type
          const token = responsejson.data.token
          localStorage.setItem("token", `${type} ${token}`)
          window.location.replace("/")
          return
        }).catch(() => {
          toast.error("Something went wrong..")
        })

      }} className="flex flex-col align-middle justify-center w-1/2 bg-slate-300 p-28 mx-auto space-y-2">
        <input type="text" placeholder="Username" required className="p-2 rounded-xl" value={username} onChange={(e) => {
          setUsername(e.target.value)
        }} />
        <input type="password" placeholder="Password" required className="p-2 rounded-xl" value={password} onChange={(e) => {
          setPassword(e.target.value)
        }} />
        <input type="submit" className="bg-blue-500 w-1/3 p-3 mx-auto rounded-xl font-bold text-white" value={"Login"} />
      </form>
    </main>
  </Template>

}

export default Login