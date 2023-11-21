import Template from "@/components/template"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/router"

export default function Home({ kelasMengemudi, propertyWebsite }) {
  const router = useRouter();

  return <>
    <Template>
      <main className="min-h-screen px-14 py-5 bg-[#FFF6F6]">
        <h1 className="text-[#F875AA] font-extrabold text-4xl mt-5 mb-20 text-center">Sistem  Manajemen  Kursus  Mengemudi  RPL</h1>

        <p>{propertyWebsite.description}</p>

        <div className="flex flex-col justify-center items-center space-y-5">
          <span className="text-[#F875AA] font-extrabold text-3xl text-center mt-10">Paket Kelas</span>
          <span className="text-[#16A4FF]">*) Setiap 1 sesi kelas berlangsung selama 2 jam</span>
        </div>

        <div className={`max-h-fit px-28 mt-10 mx-auto max-w-[1270px] relative grid grid-cols-3 gap-x-8 gap-y-8`}>
          {kelasMengemudi.map((row, index) => {
            return (
            <div key={row.kelasMengemudiID}
            className={`relative col-span-1 row-span-1 col-start-${(index % 3) + 1} row-start-${Math.floor(index / 3) + 1}`}>
              <div className="w-[320px] h-[360px] bg-white rounded-[15px] shadow relative flex flex-col justify-center items-center">
                <span className="text-[#F875AA] text-xl font-extrabold">{row.namaKelas}</span>
                <span className="text-center text-black text-base mt-8">Harga: Rp{row.hargaKelas}</span>
                <span className="text-center text-black text-base mt-3">Total Jam Kursus: {2*row.jumlahSesi}</span>
                <span className="text-center text-black text-base mt-3">Jumlah Sesi: {row.jumlahSesi}</span>
                <span className="text-center text-black text-base mt-3">Nama Kendaraan: {row.namaKendaraan}</span>
                <span className="text-center text-black text-base mt-3">Jenis Kendaraan: {row.jenisKendaraan}</span>
                
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

        <div className="flex justify-center items-center">
          <span className="text-[#F875AA] font-extrabold text-3xl text-center mt-10">Frequently Asked Questions</span>
        </div>

        <div className="overflow-y-auto max-h-calc(100vh - 88px) px-28 mt-10 mx-auto max-w-[1270px] relative grid grid-cols-3 gap-x-8 gap-y-80">
          <div>
            {propertyWebsite.faq.map((item, index) => (
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

export const getServerSideProps = async () => {
  const kelasMengemudiQuery = await fetch("https://rpl-backend-production.up.railway.app/v1/kelasmengemudi/list", {
    method: "GET",
  }).catch(err => {
    return null
  })
  const propertyQuery = await fetch("https://rpl-backend-production.up.railway.app/v1/property", {
    method: "GET",
  }).catch(error => {
    return null
  })
  let kelasMengemudi;
  if (kelasMengemudiQuery === null) kelasMengemudi = []
  else {
    const kelasMengemudiJson = await kelasMengemudiQuery.json()
    kelasMengemudi = kelasMengemudiJson.data
  }
  let propertyWebsite;
  if (propertyQuery === null) propertyWebsite = {
    description: "",
    faq: []
  }
  else {
    const propertyJson = await propertyQuery.json();
    propertyWebsite = propertyJson.data
  }
  return {
    props: {
      kelasMengemudi,
      propertyWebsite
    }
  }
}
