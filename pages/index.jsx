import Template from "@/components/template"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/router"

export default function Home() {
  const router = useRouter();
  const [kelasmengemudi, setKelasMengemudi] = useState([])
  const [infoperusahaan, setInfoPerusahaan] = useState("")

  useEffect(() => {
    const token = window.localStorage.getItem("token")
    if (!token){
      window.location.replace("/auth/login")
    }
    const tokenParsed = token.split(" ")[1]
    fetch(`https://rpl-backend-production.up.railway.app/v1/auth/verify/${tokenParsed}`).then(async (response) => {
      if (response.status !== 200){
        toast.error("Failed to retrieve user")
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

    fetch("https://rpl-backend-production.up.railway.app/v1/kelasmengemudi/list", {
      method: "GET",
      headers: {
        Authorization: token
      }
    }).then(async (response) => {
      if (response.status !== 200){
        toast.error("Failed to retrieve kelas")
        return;
      }
      const responsejson = await response.json();
      setKelasMengemudi(responsejson.data)

    }).catch(error=>{
      console.error(error)
      return
    })

    fetch("https://rpl-backend-production.up.railway.app/v1/property", {
      method: "GET",
      headers: {
        Authorization: token
      }
    }).then(async (response) => {
      if (response.status !== 200){
        toast.error("Failed to retrieve info perusahaan")
        return;
      }
      const responsejson = await response.json();
      setInfoPerusahaan(responsejson.data)
    }).catch(error=>{
      console.error(error)
      return
    })
  }, [])

  return <>
    <Template>
      <main className="min-h-screen px-14 py-5 bg-[#FFF6F6]">
        <h1 className="text-[#F875AA] font-extrabold text-4xl mt-5 mb-20 text-center leading-[1.5]">Sistem  Manajemen  Kursus  Mengemudi  RPL</h1>
        <p>{infoperusahaan.description}</p>
        
        <div className="flex justify-center items-center">
          <span className="text-[#F875AA] font-extrabold text-3xl text-center">Paket Kelas</span>
        </div>
        
        <div className="overflow-y-auto max-h-calc(100vh - 88px) px-28 mt-10 mx-auto max-w-[1270px] relative grid grid-cols-3 gap-x-8 gap-y-80">
          {kelasmengemudi.map((row, index) => {
            return <tr key={row.kelasMengemudiID}>
            <div className="relative col-span-1 row-span-1 col-start-${(index % 3) + 1} row-start-${Math.floor(index / 3) + 1}">
              <div className="w-[317px] h-[271px] left-0 top-0 absolute bg-white rounded-[15px] shadow" />
              <div className="text-center text-[#F875AA] text-xl font-extrabold w-[207px] h-[34px] left-[55px] top-[17px] absolute ']">{row.namaKelas}</div>
              <div className="w-[207px] h-[49px] left-[58px] top-[85px] absolute text-center text-black text-base']">Jenis Kendaraan : {row.jenisKendaraan}</div>
              <div className="w-[207px] h-[49px] left-[51px] top-[125px] absolute text-center text-black text-base']">Jumlah Sesi : {row.jumlahSesi}</div>
              <div className="w-[207px] h-8 left-[54px] top-[163px] absolute text-center text-black text-base']">Harga : Rp{row.hargaKelas}</div>
              <button onClick={(e) => {
                e.preventDefault();
                router.push({
                  pathname: "/calonpelanggan/create",
                  query: {kelasID: row.kelasMengemudiID, namaKelas: row.namaKelas},
                })
              }} className="bg-[#AFDEFC] w-[126px] h-[53px] left-[95px] top-[203px] absolute p-3 text-lg font-bold text-black rounded-2xl">Daftar</button>
            </div></tr>
          })}
        </div>

        <div className="flex justify-center items-center">
          <span className="text-[#F875AA] font-extrabold text-3xl text-center">Frequently Asked Questions</span>
        </div>

        <div className="overflow-y-auto max-h-calc(100vh - 88px) px-28 mt-10 mx-auto max-w-[1270px] relative grid grid-cols-3 gap-x-8 gap-y-80">
          <div>
              {faq.map((item, index) => (
                <div key={index} className="faq-item">
                  <div className="question">{item.question}</div>
                  <div className="answer">{item.answer}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </Template>
    </>
}
