# KURSUS MENGEMUDI RPL BY HELMI
Disusun oleh K2_G14 yang beranggotakan :
- Michelle Lim / 18221052
- Esther Regina / 18221086
- Angela Geraldine Hasian Panjaitan / 18221158
- Seren Elizabeth Siahaan / 18221160

## Penjelasan Singkat Aplikasi
Kursus Mengemudi RPL adalah aplikasi untuk melakukan pendaftaran kursus mengemudi oleh calon pelanggan 🚘. Aplikasi ini juga memungkinkan owner untuk mengelola data kelas, akun admin, informasi perusahaan & FAQ, data kendaraan, data instruktur. Selain itu, aplikasi ini juga memungkinkan admin untuk mengelola data pelanggan. 

## Cara menjalankan aplikasi untuk development backend

## Cara menjalankan aplikasi untuk development frontend pada localhost

## Cara menjalankan aplikasi secara remote melalui web address yang telah di-deploy.


## Tabel Basis Data Implementasi

| Nama Tabel          |Atribut     |
| ----------------    | ------------------|
| calonpelanggan_datas| - _id <br>- calonPelangganID <br> - nama <br> - kelasPelanggan <br> - umur <br> - noWA <br> - alamat<br> - adminKursus<br> - statusPelanggan<br> - tanggalPendaftaran <br> - __v <br>|
|instruktur_datas| - _id <br>- nikInstruktur <br> - namaLengkap <br> - alamatInstruktur <br> - noTelp <br> - noRekening <br> - createdAt<br> - createdBy<br> - __v <br>|
|kelasmengemudi_datas| - _id <br>- kelasMengemudiID <br> - namaKelas <br> - hargaKelas <br> - jenisKendaraan <br> - totalJamKursus <br> - jumlahSesi<br> - platNomorKendaraan<br> - namaKendaraan<br> - createdAt<br> - createdBy <br> - __v <br>|
|kendaraan_datas| - _id <br>- nomorKendaraan <br> - namaKendaraan <br> - jenisTransmisi <br> - jumlahKilometer <br> - tanggalTerakhirService <br> - statusKetersediaan<br> - statusKendaraan<br> - createdAt<br> - createdBy <br> - __v <br>|
|kendaraan_datas| - _id <br>- nomorKendaraan <br> - namaKendaraan <br> - jenisTransmisi <br> - jumlahKilometer <br> - tanggalTerakhirService <br> - statusKetersediaan<br> - statusKendaraan<br> - createdAt<br> - createdBy <br> - __v <br>|
|user_datas| - _id <br>- user_id <br> - username <br> - password_hash <br> - tipe_user <br> - created_at <br> - created_by<br> - __v <br>|
|property|<table><tr><td>Key</td><td>Value</td></tr><tr><td>deskripsi</td><td>deskripsi</td></tr><tr><td>faq</td><td>[ { question, answer} ]</td></tr></table>|
