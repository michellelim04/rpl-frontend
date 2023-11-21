import Template from "@/components/template"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/router"

export default function Home({ kelasMengemudi, propertyWebsite }) {
  const router = useRouter();
  return <>
    <Template>
      <main className="min-h-screen px-14 py-5 bg-[#FFF6F6]">
        <h1 className="text-[#F875AA] font-extrabold text-4xl mt-5 mb-20 text-center leading-[1.5]">Sistem  Manajemen  Kursus  Mengemudi  RPL</h1>
        <p>{propertyWebsite.description}</p>

        <div className="flex justify-center items-center">
          <span className="text-[#F875AA] font-extrabold text-3xl text-center">Paket Kelas</span>
        </div>

        <div className="overflow-y-auto max-h-calc(100vh - 88px) px-28 mt-10 mx-auto max-w-[1270px] relative grid grid-cols-3 gap-x-8 gap-y-80">
          {kelasMengemudi.map((row, index) => {
            return <div key={row.kelasMengemudiID}>
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
                    query: { kelasID: row.kelasMengemudiID, namaKelas: row.namaKelas },
                  })
                }} className="bg-[#AFDEFC] w-[126px] h-[53px] left-[95px] top-[203px] absolute p-3 text-lg font-bold text-black rounded-2xl">Daftar</button>
              </div></div>
          })}
        </div>

        <div className="flex justify-center items-center">
          <span className="text-[#F875AA] font-extrabold text-3xl text-center">Frequently Asked Questions</span>
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