import Template from "@/components/templatenofooter"
import { toast } from "react-toastify"
import { useEffect} from "react"
import { useRouter } from "next/router"

const DashboardOwner = () => {
    const router = useRouter();

    useEffect(() => {
      const token = window.localStorage.getItem("token")
      if (!token){
        window.location.replace("/auth/login")
      }
      const tokenParsed = token.split(" ")[1]
      fetch(`https://rpl-backend-production.up.railway.app/v1/auth/verify/${tokenParsed}`).then(async (response) => {
        if (response.status !== 200){
          console.log(response)
          toast.error("Failed to retrieve items")
          return;
        }
        const responsejson = await response.json();
        if (responsejson.data.tipe_user !== "OWNER"){
          window.location.replace("/auth/login")
          return
        }
      }).catch(error=>{
        console.error(error)
        return
      })
    }, [])

    return (
    <Template>
      <main className="min-h-screen px-14 py-7 bg-[#FFF6F6]">
      <div className="w-full h-full mb-10"></div>
        <div className="w-[690px] h-[59px] left-[462px] top-[200px] absolute text-[#F875AA] text-[40px] font-extrabold">Selamat datang kembali, Helmi!</div>
        <div className="w-[317px] h-[271px] left-[138px] top-[341px] absolute bg-white rounded-[15px] shadow" />
        <img className="w-[99px] h-[100px] left-[247px] top-[427px] absolute" src="/todolist.png" />
        <div className="w-[207px] h-[34px] left-[193px] top-[351px] absolute text-center text-[#F875AA] text-xl font-extrabold font-">Data Kelas Yang Tersedia</div>
          <div className="w-[126px] h-[53px] left-[233px] top-[544px] absolute">
          <div className="w-[126px] h-[53px] left-0 top-0 absolute bg-sky-200 rounded-[15px]" />
          <span className="w-[84.28px] h-[28.33px] left-[21px] top-[15px] absolute text-center text-black text-base font-bold font- hover:cursor-pointer" onClick={(e) => {
                          e.preventDefault()
                          router.push("/kelasmengemudi")
                          }}>Ubah</span>  
      </div>
        <div className="w-[317px] h-[271px] left-[599px] top-[341px] absolute bg-white rounded-[15px] shadow" />
        <div className="w-[207px] h-[34px] left-[654px] top-[351px] absolute text-center text-[#F875AA] text-xl font-extrabold font-">Akun Pengguna Admin</div>
        <img className="w-[117px] h-[117px] left-[702px] top-[419px] absolute" src="/setting.png" />
          <div className="w-[126px] h-[53px] left-[694px] top-[544px] absolute">
          <div className="w-[126px] h-[53px] left-0 top-0 absolute bg-sky-200 rounded-[15px]" />
          <span className="w-[84.28px] h-[28.33px] left-[21px] top-[15px] absolute text-center text-black text-base font-bold font- hover:cursor-pointer" onClick={(e) => {
                          e.preventDefault()
                          router.push("/adminkursus")
                          }}>Ubah</span>  
      </div>
        <div className="w-[317px] h-[271px] left-[1050px] top-[345px] absolute bg-white rounded-[15px] shadow" />
        <div className="w-[207px] h-[57px] left-[1125px] top-[355px] absolute text-center text-[#F875AA] text-xl font-extrabold font-">Info Perusahaan dan FAQ</div>
        <img className="w-[108px] h-[108px] left-[1165px] top-[428px] absolute" src="/briefcase.png" />
        <div className="w-[126px] h-[53px] left-[1155px] top-[548px] absolute">
        <div className="w-[126px] h-[53px] left-0 top-0 absolute bg-sky-200 rounded-[15px]" />
        <span className="w-[84.28px] h-[28.33px] left-[21px] top-[15px] absolute text-center text-black text-base font-bold font- hover:cursor-pointer" onClick={(e) => {
                          e.preventDefault()
                          router.push("/property")
                          }}>Ubah</span>  
      </div>
        <div className="w-[317px] h-[271px] left-[358px] top-[694px] absolute bg-white rounded-[15px] shadow" />
        <div className="w-[207px] h-[34px] left-[413px] top-[704px] absolute text-center text-[#F875AA] text-xl font-extrabold font-">Data<br/> Kendaraan</div>
        <img className="w-[138px] h-[138px] left-[448px] top-[759px] absolute" src="/sedan.png" />
        <div className="w-[126px] h-[53px] left-[453px] top-[897px] absolute">
        <div className="w-[126px] h-[53px] left-0 top-0 absolute bg-sky-200 rounded-[15px]" />
        <span className="w-[84.28px] h-[28.33px] left-[21px] top-[15px] absolute text-center text-black text-base font-bold font- hover:cursor-pointer" onClick={(e) => {
                          e.preventDefault()
                          router.push("/kendaraan")
                          }}>Ubah</span>        
        </div>
        <div className="w-[317px] h-[271px] left-[816px] top-[692px] absolute bg-white rounded-[15px] shadow" />
        <div className="w-[207px] h-[34px] left-[871px] top-[702px] absolute text-center text-[#F875AA] text-xl font-extrabold font-">Data <br/>Instruktur</div>
        <img className="w-28 h-28 left-[919px] top-[766px] absolute" src="/instructor.png" />
          <div className="w-[126px] h-[53px] left-[911px] top-[895px] absolute">
          <div className="w-[126px] h-[53px] left-0 top-0 absolute bg-sky-200 rounded-[15px]" />
          <span className="w-[84.28px] h-[28.33px] left-[21px] top-[15px] absolute text-center text-black text-base font-bold font- hover:cursor-pointer" onClick={(e) => {
                          e.preventDefault()
                          router.push("/instruktur")
                          }}>Ubah</span>  
      </div>
      </main>
    </Template>
    
  )
}
export default DashboardOwner