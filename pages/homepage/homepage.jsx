import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Login from "../auth/login"

const Homepage = ({children}) => {
  const router = useRouter()
  const [userObject, setUser] = useState(null)
  const handleRegistratio  = (e) => {
    e.preventDefault();
    router.push("/calonpelanggan/create")
    return;
  }
  const handleLogin = (e) => {
    e.preventDefault();
    router.push("/auth/login")
    return;
  }
  const handleLogout = (e) => {
    e.preventDefault();
    window.localStorage.removeItem("token");
    window.location.reload();
  }
  useEffect(() => {
    const token = window.localStorage.getItem("token")
    if (!token) return;
    const tokenParsed = token.split(" ")[1]
    fetch(`https://rpl-backend-production.up.railway.app/v1/auth/verify/${tokenParsed}`).then(async (response) => {
      if (response.status !== 200) return null;
      const responsejson = await response.json();
      setUser(responsejson.data)
    })
  }, [])
  useEffect(() => {
    fetch("https://rpl-backend-production.up.railway.app/v1/property", {
      method: "GET",
    }).then(async response => {
      if (response.status !== 200) {
        toast.error("Failed to retrieve items")
        return
      }
      const responsejson = await response.json()
      setRows(responsejson.data)
    })
  }, [])}
  return <>
    <Template>
    <header className="flex flex-row align-middle justify-between bg-[#AEDEFC] px-10">
      <div className="flex flex-row align-middle justify-center space-x-3">
        <Image src="/logo.png" alt="Main Logo" width={100} height={100} />
        <span className="h-min my-auto font-bold text-xl">Sistem Manajemen Kursus Mengemudi RPL</span>
      </div>
      <div className="flex flex-row align-middle justify-center space-x-6">
        {userObject === null && <span className="h-min my-auto font-semibold">Login as Admin Kursus/Owner?</span>}
        {userObject !== null && <span className="h-min my-auto font-semibold">Logged in as {userObject.tipe_user}</span>}
        {userObject === null && <button className="bg-[#F875AA] h-1/2 w-28 rounded-2xl font-bold text-white text-xl  my-auto p-2 " onClick={handleLogin}>Log In</button>}
        {userObject !== null && <button className="bg-[#F875AA] h-1/2 w-28 rounded-2xl font-bold text-white text-xl  my-auto p-2 " onClick={handleLogout}>Log Out</button>}
      </div>
    </header >
    <main className="min-h-screen px-14 py-5 bg-[#FFF6F6]">
        <div className="flex flex-row align-middle justify-between"></div>
        <div className="w-[690px] h-[59px] left-[411px] top-[218px] absolute text-pink-400 text-[40px] font-extrabold font-'Poppins'">RPL Kursus Mengemudi</div>
        <div className="w-[690px] h-[59px] left-[411px] top-[218px] absolute text-pink-400 text-[40px] font-extrabold font-'Poppins'">Paket Kelas</div>
        <div className="w-[690px] h-[59px] left-[411px] top-[218px] absolute text-pink-400 text-[40px] font-extrabold font-'Poppins'">Frequently Asked Questions</div>
    </main>
    {children}
    <footer className="bg-[#AEDEFC] p-8 align-middle justify-around flex flex-row font-semibold">
      <div className="flex flex-col h-min my-auto">
        <span>Kursus Mengemudi RPL</span>
        <span>Alamat: Jalan Ganesha no. 100, Bandung</span>
        <span>No Telepon: (022) 2020202</span>
      </div>
      <div className="flex flex-col ">
        <span>Ikuti Kami:</span>
        <span>Instagram: @kursusmengemudirpl</span>
        <span>Website: kursusmengemudirpl.com</span>
        <span>Facebook: Kursus Mengemudi RPL</span>
      </div>
    </footer>
    </Template >
  </>

export default Homepage

