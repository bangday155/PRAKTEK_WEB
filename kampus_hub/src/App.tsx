import { type FormEvent, useMemo, useState } from 'react'
import './App.css'

type Mahasiswa = {
  nim: string
  nama: string
  asal: string
  nilai: number
  prodi: string
}

const initialMahasiswa: Mahasiswa[] = [
  { nim: '2023001', nama: 'Muhammad Rizki Pratama', asal: 'Bandung', nilai: 85, prodi: 'Teknik Informatika' },
  { nim: '2023002', nama: 'Budi Santoso', asal: 'Surabaya', nilai: 70, prodi: 'Manajemen' },
  { nim: '2023003', nama: 'Siti Aisyah Putri', asal: 'Jakarta', nilai: 92, prodi: 'Desain Komunikasi Visual' },
  { nim: '2023004', nama: 'Dian Permata Sari', asal: 'Yogyakarta', nilai: 78, prodi: 'Psikologi' },
  { nim: '2023005', nama: 'Fajar Nugroho', asal: 'Semarang', nilai: 82, prodi: 'Teknik Elektro' },
  { nim: '2023006', nama: 'Gita Maharani', asal: 'Medan', nilai: 100, prodi: 'Teknik Elektro' },
  { nim: '2023007', nama: 'Hendra Wijaya', asal: 'Palembang', nilai: 88, prodi: 'Teknik Elektro' },
  { nim: '2023008', nama: 'Intan Sari Dewi', asal: 'Makassar', nilai: 20, prodi: 'Teknik Elektro' },
  { nim: '2023009', nama: 'Joko Widodo', asal: 'Solo', nilai: 19, prodi: 'Teknik Elektro' },
  { nim: '2023010', nama: 'Kartika Lestari', asal: 'Bogor', nilai: 60, prodi: 'Teknik Elektro' },
  { nim: '2023011', nama: 'Lina Marlina', asal: 'Banjarmasin', nilai: 76, prodi: 'Teknik Elektro' },
  { nim: '2023012', nama: 'Mira Septia', asal: 'Pontianak', nilai: 60, prodi: 'Teknik Elektro' },
  { nim: '2023013', nama: 'Nanda Putra', asal: 'Padang', nilai: 90, prodi: 'Teknik Elektro' },
  { nim: '2023014', nama: 'Omar Farhan', asal: 'Balikpapan', nilai: 73, prodi: 'Teknik Elektro' },
  { nim: '2023015', nama: 'Putri Ayu Lestari', asal: 'Denpasar', nilai: 78, prodi: 'Teknik Elektro' },
  { nim: '2023016', nama: 'Qori Maulida', asal: 'Malang', nilai: 99, prodi: 'Teknik Elektro' },
  { nim: '2023017', nama: 'Rizki Prasetyo', asal: 'Tasikmalaya', nilai: 86, prodi: 'Teknik Elektro' },
  { nim: '2023018', nama: 'Sari Rahmawati', asal: 'Bekasi', nilai: 85, prodi: 'Ekonomi' },
  { nim: '2023019', nama: 'Miranti Kusuma', asal: 'Sukabumi', nilai: 50, prodi: 'Teknik Industri' },
  { nim: '2023020', nama: 'Umar Hasan', asal: 'Cirebon', nilai: 49, prodi: 'Teknik Industri' },
  { nim: '2023021', nama: 'Vina Amelia', asal: 'Mataram', nilai: 80, prodi: 'Kedokteran' },
  { nim: '2023022', nama: 'Wahyu Pratama', asal: 'Pekanbaru', nilai: 82, prodi: 'Teknik Elektro' },
  { nim: '2023023', nama: 'Xena Nabila', asal: 'Banda Aceh', nilai: 87, prodi: 'Teknik Elektro' },
  { nim: '2023024', nama: 'Yusuf Hidayat', asal: 'Lampung', nilai: 68, prodi: 'Teknik Elektro' },
  { nim: '2023025', nama: 'Zahra Aulia', asal: 'Kendari', nilai: 53, prodi: 'Teknik Elektro' },
]

const emptyForm = {
  nim: '',
  nama: '',
  asal: '',
  prodi: '',
  nilai: '',
}

function App() {
  const [students, setStudents] = useState<Mahasiswa[]>(initialMahasiswa)
  const [query, setQuery] = useState('')
  const [selectedStudent, setSelectedStudent] = useState<Mahasiswa | null>(null)
  const [editingNim, setEditingNim] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)

  const filteredData = useMemo(() => {
    const trimmedQuery = query.trim().toLowerCase()

    if (!trimmedQuery) {
      return students
    }

    return students.filter((mhs) => {
      const nama = mhs.nama.toLowerCase()
      const nim = mhs.nim.toLowerCase()
      const asal = mhs.asal.toLowerCase()
      const prodi = mhs.prodi.toLowerCase()

      return (
        nama.includes(trimmedQuery) ||
        nim.includes(trimmedQuery) ||
        asal.includes(trimmedQuery) ||
        prodi.includes(trimmedQuery)
      )
    })
  }, [query, students])

  const resetForm = () => {
    setForm(emptyForm)
    setEditingNim(null)
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    const nim = form.nim.trim()
    const nama = form.nama.trim()
    const asal = form.asal.trim()
    const prodi = form.prodi.trim()
    const nilai = Number(form.nilai)

    if (!nim || !nama || !asal || !prodi || Number.isNaN(nilai)) {
      return
    }

    const nextStudent: Mahasiswa = {
      nim,
      nama,
      asal,
      prodi,
      nilai,
    }

    setStudents((currentStudents) => {
      if (editingNim) {
        return currentStudents.map((student) =>
          student.nim === editingNim ? nextStudent : student,
        )
      }

      return [...currentStudents, nextStudent]
    })

    setSelectedStudent(nextStudent)
    resetForm()
  }

  const handleEdit = (student: Mahasiswa) => {
    setEditingNim(student.nim)
    setForm({
      nim: student.nim,
      nama: student.nama,
      asal: student.asal,
      prodi: student.prodi,
      nilai: String(student.nilai),
    })
    setSelectedStudent(student)
  }

  const handleDelete = (nim: string) => {
    setStudents((currentStudents) =>
      currentStudents.filter((student) => student.nim !== nim),
    )

    if (selectedStudent?.nim === nim) {
      setSelectedStudent(null)
    }

    if (editingNim === nim) {
      resetForm()
    }
  }

  return (
    <main className="app-shell">
      <h2>Daftar Nilai Mahasiswa</h2>

      <form className="student-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <label>
            NIM
            <input
              type="text"
              value={form.nim}
              onChange={(event) =>
                setForm((current) => ({ ...current, nim: event.target.value }))
              }
              placeholder="Contoh: 2023001"
            />
          </label>

          <label>
            Nama
            <input
              type="text"
              value={form.nama}
              onChange={(event) =>
                setForm((current) => ({ ...current, nama: event.target.value }))
              }
              placeholder="Nama mahasiswa"
            />
          </label>

          <label>
            Asal
            <input
              type="text"
              value={form.asal}
              onChange={(event) =>
                setForm((current) => ({ ...current, asal: event.target.value }))
              }
              placeholder="Asal daerah"
            />
          </label>

          <label>
            Program Studi
            <input
              type="text"
              value={form.prodi}
              onChange={(event) =>
                setForm((current) => ({ ...current, prodi: event.target.value }))
              }
              placeholder="Program studi"
            />
          </label>

          <label>
            Nilai
            <input
              type="number"
              min="0"
              max="100"
              value={form.nilai}
              onChange={(event) =>
                setForm((current) => ({ ...current, nilai: event.target.value }))
              }
              placeholder="0 - 100"
            />
          </label>
        </div>

        <div className="form-actions">
          <button type="submit" className="primary-btn">
            {editingNim ? 'Simpan Perubahan' : 'Tambah Mahasiswa'}
          </button>

          {editingNim && (
            <button type="button" className="secondary-btn" onClick={resetForm}>
              Batal
            </button>
          )}
        </div>
      </form>

      <div className="search-wrap">
        <input
          id="search-input"
          type="text"
          placeholder="Cari nama, asal, prodi, atau nilai..."
          aria-label="Cari nama, asal, prodi, atau nilai"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button id="search-btn" type="button" onClick={() => setQuery(query)}>
          Cari
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>NIM</th>
            <th>Nama Mahasiswa</th>
            <th>Asal</th>
            <th>Program Studi</th>
            <th>Nilai</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody id="tabel-mahasiswa">
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan={7}>Data tidak ditemukan.</td>
            </tr>
          ) : (
            filteredData.map((mhs, index) => (
              <tr key={mhs.nim}>
                <td>{index + 1}</td>
                <td>{mhs.nim}</td>
                <td>
                  <button
                    className="student-name-btn"
                    type="button"
                    onClick={() => setSelectedStudent(mhs)}
                  >
                    {mhs.nama}
                  </button>
                </td>
                <td>{mhs.asal}</td>
                <td>{mhs.prodi}</td>
                <td>{mhs.nilai}</td>
                <td>
                  <div className="row-actions">
                    <button
                      type="button"
                      className="action-btn edit-btn"
                      onClick={() => handleEdit(mhs)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="action-btn delete-btn"
                      onClick={() => handleDelete(mhs.nim)}
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {selectedStudent && (
        <div className="detail-box" aria-live="polite">
          <h3>Detail Mahasiswa</h3>
          <div className="detail-grid">
            <div className="detail-item">
              <strong>NIM</strong>
              <span>{selectedStudent.nim}</span>
            </div>
            <div className="detail-item">
              <strong>Nama</strong>
              <span>{selectedStudent.nama}</span>
            </div>
            <div className="detail-item">
              <strong>Asal</strong>
              <span>{selectedStudent.asal}</span>
            </div>
            <div className="detail-item">
              <strong>Program Studi</strong>
              <span>{selectedStudent.prodi}</span>
            </div>
            <div className="detail-item">
              <strong>Nilai</strong>
              <span>{selectedStudent.nilai}</span>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default App
