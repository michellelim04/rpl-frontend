import Template from "@/components/templatenofooter"
import { toast } from "react-toastify"
import { useEffect, useState} from "react"
import { useRouter } from "next/router"

const DashboardAdmin = () => {
    const router = useRouter();
    const [username, setUsername] = useState(null)

    useEffect(() => {
      const token = window.localStorage.getItem("token")
      if (!token){
        window.location.replace("/auth/login")
      }
      const tokenParsed = token.split(" ")[1]
      fetch(`https://rpl-backend-production.up.railway.app/v1/auth/verify/${tokenParsed}`).then(async (response) => {
        if (response.status !== 200){
          toast.error("Failed to retrieve items")
          return;
        }
        const responsejson = await response.json();
        if (responsejson.data.tipe_user !== "ADMIN"){
          window.location.replace("/auth/login")
          return
        }
        setUsername(responsejson.data.username)

      }).catch(error=>{
        console.error(error)
        return
      })
    }, [])

  return (
    <Template>

    <main className="min-h-screen px-14 py-10 bg-[#FFF6F6]">
    
    <div></div>
    <div className="text-[#F875AA] font-extrabold text-5xl mt-10 mb-20 text-center">Selamat datang kembali, {username}!</div>
    <div className="w-[515px] h-[462px] absolute bg-white rounded-[15px] shadow left-1/2 transform -translate-x-1/2" />
    <div className="text-[#F875AA] w-[226px] h-[95px] absolute text-center text-[32px] font-extrabold left-1/2 transform -translate-x-1/2 mt-5">Data<br/>Pelanggan</div>
    <div className="w-[126px] h-[53px] top-[680px] absolute left-1/2 transform -translate-x-1/2">
    <button onClick={(e) => {
      e.preventDefault();
      router.push("/calonpelanggan")
      return;
    }} className="bg-[#AFDEFC] w-[126px] h-[53px] text-lg font-bold text-black rounded-2xl">Ubah</button>
    </div>
    <img className="w-[171px] h-[171px] absolute transform left-1/2 -translate-x-1/2 mt-40" src="/client.png" />
        </main>
    </Template>


  )

}

export default DashboardAdmin