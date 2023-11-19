import Template from "@/components/templatenofooter"
import { toast } from "react-toastify"
import { useEffect} from "react"
import { useRouter } from "next/router"

const DashboardOwner = () => {
  const router = useRouter()
  // useEffect(() => {
  //   const token = localStorage.getItem("token")
  //   if (token === undefined || token === null) {
  //     window.location.replace("/auth/login")
  //     return
  //   }
  //   fetch("https://rpl-backend-production.up.railway.app/v1/auth/verify/" + token) 
  //   .then(async (response) => {
  //     if (response.status !== 200){
  //       toast.error("Failed to retrieve items")
  //       window.location.replace("/auth/login")
  //       return
  //     }
  //     const responsejson = await response.json();
  //     if (responsejson.data.tipe_user !== "ADMIN"){
  //       router.push("/auth/login")
  //     }
  //     if (responsejson.data.tipe_user === "ADMIN"){
  //       router.push("/dashboard/admin")
  //     }
  //     }
  //   )
  // }, [])
  // useEffect(() => {
    // const token = localStorage.getItem("token");
    
    // if (token === undefined || token === null) {
    //   window.location.replace("/auth/login");
    //   return;
    // }
  
    // fetch("https://rpl-backend-production.up.railway.app/v1/auth/verify/" + token)
    //   .then(async (response) => {
    //     if (response.status !== 200) {
    //       toast.error("Failed to retrieve items");
    //       console.error("Failed to verify token:", response);
    //       window.location.replace("/auth/login");
    //       return;
    //     }
  
    //     const responseJson = await response.json();
    //     if (responseJson.data.tipe_user === "ADMIN") {
    //       router.push("/dashboard/admin");
    //     } 
    //     else {
    //       router.push("/auth/login")
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error during token verification:", error);
    //     toast.error("Error verifying token");
    //     window.location.replace("/auth/login");
    //   });
    // }, []);

    useEffect(() => {
      const token = window.localStorage.getItem("token")
      if (token === undefined || token === null) {
        window.location.replace("/auth/login")
        return
      }
      fetch("https://rpl-backend-production.up.railway.app/v1/auth/verify/" + token, {
        method: "GET",
        headers: {
          "Authorization": token
        }
      }).then(async response => {
        if (response.status !== 200) {
          // toast.error("Failed to retrieve items")
          return null
        }
        const responsejson = await response.json()
        if (responsejson.data.tipe_user !== "ADMIN"){
          window.location.replace("/auth/login")
          return
        }
      })
    }, [])

  return (
    <Template>

    <main className="min-h-screen px-14 py-10 bg-[#FFF6F6]">
  
    <div className="w-[690px] h-[59px] left-[411px] top-[218px] absolute text-pink-400 text-[40px] font-extrabold font-'Poppins'">Selamat datang kembali, Barbie!</div>
    <div className="w-[515px] h-[462px] left-[498px] top-[352px] absolute bg-white rounded-[15px] shadow" />
    <div className="w-[226px] h-[95px] left-[638px] top-[381px] absolute text-center text-pink-400 text-[32px] font-extrabold font-'Poppins'">Data<br/>Pelanggan</div>
    <div className="w-[126px] h-[53px] left-[694px] top-[715px] absolute">
        <div className="w-[126px] h-[53px] left-0 top-0 absolute bg-sky-200 rounded-[15px]" />
        <div className="w-[84.28px] h-[28.33px] left-[21px] top-[15px] absolute text-center text-black text-base font-bold font-'Poppins'">Ubah</div>
    </div>
    <img className="w-[171px] h-[171px] left-[670px] top-[497px] absolute" src="/client.png" />
        </main>
    </Template>


  )

}

export default DashboardOwner