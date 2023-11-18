import Template from "@/components/template"
import { useState } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/router"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  return (
    <main className="min-h-screen flex flex-col align-middle justify-center">

    <div className="w-[1512px] h-[982px] relative bg-red-50">
      <img className="w-[352px] h-[352px] left-[580px] top-[168px] absolute" src="/logo.png" />
      <div className="w-[693px] h-[124px] left-[409px] top-[106px] absolute text-center text-pink-400 text-[40px] font-extrabold font-'Poppins'">Log In</div>
      <div className="w-[130px] h-[33px] left-[427px] top-[559px] absolute text-pink-400 text-xl font-extrabold font-'Poppins'">Username</div>
      <div className="w-[58px] h-[27px] left-[72px] top-[48px] absolute text-pink-400 text-xl font-extrabold font-'Poppins'">
        <span className="text-[#F875AA] font-bold text-2xl hover:cursor-pointer" onClick={(e) => {
              e.preventDefault()
              router.push("/")
            }}>Back</span>
      </div>
      <div className="w-[130px] h-[33px] left-[427px] top-[654px] absolute text-pink-400 text-xl font-extrabold font-'Poppins'">Password</div>
      <div className="w-[252px] h-[55px] left-[630px] top-[750px] absolute">
      </div>
      <img className="w-[22px] h-[22px] left-[38px] top-[53px] absolute" src="/back.png" />
    </div>

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

      }} 
      className="">
        <input type="text" placeholder=" Username" required className="w-[483px] h-14 left-[602px] top-[536px] absolute bg-white rounded-[15px] shadow border border-red-100" value={username} onChange={(e) => {
              setUsername(e.target.value)
            }} />
        <input type="password" placeholder=" Password" required className="w-[483px] h-14 left-[602px] top-[643px] absolute bg-white rounded-[15px] shadow border border-red-100" value={password} onChange={(e) => {
          setPassword(e.target.value)
        }} />
        <input type="submit" className="w-[252px] h-[55px] left-[630px] top-[750px] absolute w-[252px] h-[55px] left-0 top-0 absolute bg-pink-400 rounded-[15px] w-[168.56px] h-[29.40px] left-[41.72px] top-[11.38px] absolute text-center text-white text-2xl font-bold font-'Poppins'" value ={"Log In"}/>

      </form>
    </main>
  )

}

export default Login