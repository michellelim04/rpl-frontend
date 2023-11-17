import Template from "@/components/template"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/router"
const Index = () => {
  const [rows, setRows] = useState([])
  const router = useRouter()
  const [deleteToggle, setDeleteToggle] = useState(null)
  const handleDelete = async () => {
    const token = window.localStorage.getItem("token")
    if (token === undefined || token === null) {
      window.location.replace("/auth/login")
      return
    }
    const deleteRequest = await fetch("https://rpl-backend-production.up.railway.app/v1/instruktur/delete/" + deleteToggle, {
      method: "DELETE",
      headers: {
        Authorization: token
      }
    }).then(response => response).catch(() => null)
    setDeleteToggle(null)
    if (deleteRequest === null) {
      toast.error("Something went wrong...");
      return;
    }
    if (deleteRequest.status !== 200) {
      toast.error("Failed to delete..");
      return;
    }
    toast.success("Successfully deleted!");
    router.reload();
    return;
  }
  useEffect(() => {
    const token = window.localStorage.getItem("token")
    if (token === undefined || token === null) {
      window.location.replace("/auth/login")
      return
    }
    fetch("https://rpl-backend-production.up.railway.app/v1/instruktur/list", {
      method: "GET",
      headers: {
        "Authorization": token
      }
    }).then(async response => {
      if (response.status !== 200) {
        toast.error("Failed to retrieve items")
        return
      }
      const responsejson = await response.json()
      setRows(responsejson.data)
    })
  }, [])
  return <>
    <Template>
      <main className="min-h-screen px-14 py-5 bg-[#FFF6F6]">
        <div className="w-full mb-2">
          <span className="text-[#F875AA] font-bold text-2xl">Back</span>
        </div>
        <h1 className="text-[#F875AA] font-extrabold text-5xl mb-8">Data Instruktur</h1>
        <table className="w-full text-center border-spacing-3 border-separate">
          <thead>
            <tr>
              <th className="bg-[#F875AA] p-2 border border-[#F875AA]">NIK</th>
              <th className="bg-[#F875AA] p-2 border border-[#F875AA]">Nama Lengkap</th>
              <th className="bg-[#F875AA] p-2 border border-[#F875AA]">Alamat</th>
              <th className="bg-[#F875AA] p-2 border border-[#F875AA]">No Telp</th>
              <th className="bg-[#F875AA] p-2 border border-[#F875AA]">Nomor Rekening</th>
              <th className=""></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => {
              return <tr key={row.nikInstruktur}>
                <td className="p-6 border border-[#F875AA] bg-white">{row.nikInstruktur}</td>
                <td className="p-6 border border-[#F875AA] bg-white">{row.namaLengkap}</td>
                <td className="p-6 border border-[#F875AA] bg-white">{row.alamatInstruktur}</td>
                <td className="p-6 border border-[#F875AA] bg-white">{row.noTelp}</td>
                <td className="p-6 border border-[#F875AA] bg-white">{row.noRekening}</td>
                <td className="px-2 flex flex-col align-middle justify-evenly space-y-2 ">
                  <button className="bg-[#AEDEFC] p-1 rounded-lg" onClick={(e) => {
                    e.preventDefault();
                    router.push("/instruktur/edit/" + row.nikInstruktur)
                    return;
                  }}>Update</button>
                  <button data-modal-target="popup-modal" data-modal-toggle="popup-modal" className="bg-[#FFDFDF] p-1 rounded-lg" onClick={(e) => {
                    e.preventDefault()
                    setDeleteToggle(row.nikInstruktur)
                  }}>Delete</button>
                </td>
              </tr>
            })}
          </tbody>
        </table>
      </main>
      {deleteToggle !== null && <div className="left-0 top-0 fixed w-screen h-screen bg-white bg-opacity-80 p-20 flex flex-col align-middle justify-center">
        <div className="w-1/2 mx-auto space-y-5">
          <h1 className="text-center p-10 bg-[#FFDFDF] border-2 border-[#F875AA] rounded-xl font-bold text-xl">Apakah anda yakin akan menghapus data instruktur?</h1>
          <div className="space-x-5 flex flex-row align-middle justify">
            <button className="p-3 rounded-xl w-full bg-[#FFDFDF] border-2 border-[#F875AA]" onClick={(e) => {
              e.preventDefault();
              handleDelete()
            }}>Delete</button>
            <button className="p-3 rounded-xl w-full bg-[#FFDFDF] border-2 border-[#F875AA]" onClick={(e) => {
              e.preventDefault()
              setDeleteToggle(null)
            }}>Cancel</button>
          </div>
        </div>
      </div>}
    </Template >
  </>

}

export default Index