import Template from "@/components/templatenofooter"
import { toast } from "react-toastify"
import { useEffect} from "react"


const DashboardOwner = () => {

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
        if (responsejson.data.tipe_user !== "OWNER"){
          window.location.replace("/auth/login")
          return
        }
      })
    }, [])

    return (
    <Template>

        <main className="min-h-screen px-14 py-10 bg-[#FFF6F6]">
        <div className="w-[690px] h-[59px] left-[462px] top-[200px] absolute text-pink-400 text-[40px] font-extrabold font-'Poppins'">Selamat datang kembali, Helmi!</div>
        <div className="w-[317px] h-[271px] left-[418px] top-[341px] absolute bg-white rounded-[15px] shadow" />
        <img className="w-[99px] h-[100px] left-[527px] top-[427px] absolute" src="/todolist.png" />
        <div className="w-[207px] h-[34px] left-[473px] top-[351px] absolute text-center text-pink-400 text-xl font-extrabold font-'Poppins'">Data Kelas Yang Tersedia</div>
        <div className="w-[126px] h-[53px] left-[513px] top-[544px] absolute">
            <div className="w-[126px] h-[53px] left-0 top-0 absolute bg-sky-200 rounded-[15px]" />
            <div className="w-[84.28px] h-[28.33px] left-[21px] top-[15px] absolute text-center text-black text-base font-bold font-'Poppins'">Ubah</div>

        </div>
        <div className="w-[317px] h-[271px] left-[879px] top-[341px] absolute bg-white rounded-[15px] shadow" />
        <div className="w-[207px] h-[34px] left-[934px] top-[351px] absolute text-center text-pink-400 text-xl font-extrabold font-'Poppins'">Akun Pengguna Admin</div>
        <div className="w-[126px] h-[53px] left-[974px] top-[544px] absolute">
            <div className="w-[126px] h-[53px] left-0 top-0 absolute bg-sky-200 rounded-[15px]" />
                <span className="w-[84.28px] h-[28.33px] left-[21px] top-[15px] absolute text-center text-black text-base font-bold font-'Poppins'" onClick={(e) => {
                        e.preventDefault()
                        router.push("/adminkursus")
                        }}>Ubah</span>  

        </div>
        <div className="w-[317px] h-[271px] left-[876px] top-[692px] absolute bg-white rounded-[15px] shadow" />
        <div className="w-[207px] h-[34px] left-[931px] top-[702px] absolute text-center text-pink-400 text-xl font-extrabold font-'Poppins'">Data <br/>Instruktur</div>
        <img className="w-28 h-28 left-[979px] top-[766px] absolute" src="/instructor.png" />
        <div className="w-[126px] h-[53px] left-[971px] top-[895px] absolute">
            <div className="w-[126px] h-[53px] left-0 top-0 absolute bg-sky-200 rounded-[15px]" />
                <span className="w-[84.28px] h-[28.33px] left-[21px] top-[15px] absolute text-center text-black text-base font-bold font-'Poppins'" onClick={(e) => {
                e.preventDefault()
                router.push("/instruktur")
                }}>Ubah</span>  
        </div>
        <div className="w-[317px] h-[271px] left-[418px] top-[694px] absolute bg-white rounded-[15px] shadow" />
        <div className="w-[207px] h-[34px] left-[473px] top-[704px] absolute text-center text-pink-400 text-xl font-extrabold font-'Poppins'">Data<br/> Kendaraan</div>
        <img className="w-[138px] h-[138px] left-[508px] top-[759px] absolute" src="/sedan.png" />
        <div className="w-[126px] h-[53px] left-[513px] top-[897px] absolute">
            <div className="w-[126px] h-[53px] left-0 top-0 absolute bg-sky-200 rounded-[15px]" />
            <div className="w-[84.28px] h-[28.33px] left-[21px] top-[15px] absolute text-center text-black text-base font-bold font-'Poppins'">Ubah</div>
        </div>
        <img className="w-[117px] h-[117px] left-[982px] top-[419px] absolute" src="/setting.png" />
        </main>
    </Template>


  )

}

export default DashboardOwner