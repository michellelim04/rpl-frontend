import Template from "@/components/template"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/router"
const Create = () => {
  const router = useRouter()
  const [nama, setNama] = useState("")
  const [kelasPelanggan, setKelasPelanggan] = useState("")
  const [umur, setUmur] = useState("")
  const [noWA, setNoWA] = useState("")
  const [alamat, setAlamat] = useState("")
  const statusPelanggan = "Calon"

  const handleUpdate = async () => {
    const body = JSON.stringify({
      nama,
      kelasPelanggan,
      umur,
      noWA,
      alamat,
      statusPelanggan
    })
    const updateQuery = await fetch("https://rpl-backend-production.up.railway.app/v1/calonpelanggan/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body
    }).then(response => response).catch(() => null)
    if (updateQuery === null) {
      toast.error("Something went wrong..")
      return
    }
    if (updateQuery.status !== 200) {
      toast.error("Failed to create...")
      return
    }
    toast.success("Successfully created!")
    router.push("/calonpelanggan")
    return;
  }
  return <>
    <Template>
      <main className="min-h-screen px-14 py-5 bg-[#FFF6F6]">
        <div className="w-full mb-2">
          <span className="text-[#F875AA] font-bold text-2xl hover:cursor-pointer" onClick={(e) => {
            e.preventDefault()
            router.push("/")
          }}>Back</span>
        </div>
        <h1 className="text-[#F875AA] font-extrabold text-5xl mb-20 text-center">Form  Pendaftaran  Kursus  Mengemudi  RPL</h1>
        <form className="w-2/3 mx-auto space-y-10 flex flex-col align-middle justify-evenly" onSubmit={(e) => {
          e.preventDefault()
          handleUpdate()
          return;
        }}>
          <div className="flex flex-row align-middle justify-between">
            <span className="h-min my-auto font-bold text-lg">Nama Siswa</span>
            <input value={nama} onChange={(e) => {
              setNama(e.target.value)
            }} type="text" required className="drop-shadow-xl w-2/3 p-2 rounded-xl" />
          </div>
          <div className="flex flex-row align-middle justify-between">
            <span className="h-min my-auto font-bold text-lg">Kelas Pilihan</span>
            <input value={kelasPelanggan} onChange={(e) => {
              setKelasPelanggan(e.target.value)
            }} type="number" required className="drop-shadow-xl w-2/3 p-2 rounded-xl" />
          </div>
          <div className="flex flex-row align-middle justify-between">
            <span className="h-min my-auto font-bold text-lg">Umur</span>
            <input value={umur} onChange={(e) => {
              setUmur(e.target.value)
            }} type="number" required className="drop-shadow-xl w-2/3 p-2 rounded-xl" />
          </div>
          <div className="flex flex-row align-middle justify-between">
            <span className="h-min my-auto font-bold text-lg">No WhatsApp</span>
            <input value={noWA} onChange={(e) => {
              setNoWA(e.target.value)
            }} type="tel" required className="drop-shadow-xl w-2/3 p-2 rounded-xl" />
          </div>
          <div className="flex flex-row align-middle justify-between">
            <span className="h-min my-auto font-bold text-lg">Alamat</span>
            <input value={alamat} onChange={(e) => {
              setAlamat(e.target.value)
            }} type="text" required className="drop-shadow-xl w-2/3 p-2 rounded-xl" />
          </div>
          {/* <div className="flex flex-row align-middle justify-between">
            <span className="h-min my-auto font-bold text-lg">adminKursus</span>
            <input value={adminKursus} onChange={(e) => {
              setAdminKursus(e.target.value)
            }} type="text" required className="drop-shadow-xl w-2/3 p-2 rounded-xl" />
          </div> */}
          <input type="submit" className="bg-[#F875AA] px-8 py-3 text-xl font-bold text-white rounded-xl mx-auto" value={"Simpan"} />
        </form>

      </main>
    </Template >
  </>

}

export default Create