import Template from "@/components/template"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/router"

export default function Home() {
  const router = useRouter();
  const [kelasmengemudi, setKelasMengemudi] = useState([])

  useEffect(() => {
    fetch("https://rpl-backend-production.up.railway.app/v1/kelasmengemudi/list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
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
  }, [])

  return <>
    <Template>
      <main className="min-h-screen px-14 py-5 bg-[#FFF6F6]">
        <h1 className="text-[#F875AA] font-extrabold text-4xl mt-5 mb-20 text-center">Sistem  Manajemen  Kursus  Mengemudi  RPL</h1>
                
        {/* code buat info perusahaan */}
        
        <div className="flex justify-center items-center">
          <span className="text-[#F875AA] font-extrabold text-3xl text-center">Paket Kelas</span>
        </div>
        
        <div className={`max-h-fit px-28 mt-10 mx-auto max-w-[1270px] relative grid grid-cols-3 gap-x-8 gap-y-80`}>
          {kelasmengemudi.map((row, index) => {
            return (
            <div key={row.kelasMengemudiID}
            className={`relative col-span-1 row-span-1 col-start-${(index % 3) + 1} row-start-${Math.floor(index / 3) + 1}`}>
              <div className="w-[320px] h-[360px] left-0 top-0 absolute bg-white rounded-[15px] shadow relative flex flex-col justify-center items-center">
                <div className="text-[#F875AA] text-xl font-extrabold">{row.namaKelas}</div>
                <div className="text-center text-black text-base mt-8">Harga: Rp{row.hargaKelas}</div>
                <div className="text-center text-black text-base mt-3">Total Jam Kursus: {2*row.jumlahSesi}</div>
                <div className="text-center text-black text-base mt-3">Jumlah Sesi: {row.jumlahSesi}</div>
                <div className="text-center text-black text-base mt-3">Nama Kendaraan: {row.namaKendaraan}</div>
                <div className="text-center text-black text-base mt-3">Jenis Kendaraan: {row.jenisKendaraan}</div>
                
                <button onClick={(e) => {
                  e.preventDefault();
                  router.push({
                    pathname: "/calonpelanggan/create",
                    query: {kelasID: row.kelasMengemudiID, namaKelas: row.namaKelas},
                  })
                }} className="bg-[#AFDEFC] w-[126px] h-[53px] p-3 text-lg font-bold text-black rounded-2xl mt-8">Daftar</button>
              </div>
            </div>);
          })}
        </div>

        {/* code buat faq */}

      </main>
    </Template>
    </>
}
