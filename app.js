const express = require('express');
const app = express();
const pool = require('./db');
require('dotenv').config();

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM mahasiswa');
        res.render('index', { mahasiswa: rows });
    } catch (error) {
        res.status(500).send('Terjadi kesalahan pada server: ' + error.message);
    }
});

app.post('/tambah', async (req, res) => {
    const { nim, nama, jurusan } = req.body;
    try {
        const sql = 'INSERT INTO mahasiswa (nim, nama, jurusan) VALUES (?, ?, ?)';
        await pool.execute(sql, [nim, nama, jurusan]);
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Gagal menambah data: ' + error.message);
    }
});

app.post('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { nim, nama, jurusan } = req.body;
    try {
        const sql = 'UPDATE mahasiswa SET nim = ?, nama = ?, jurusan = ? WHERE id = ?';
        await pool.execute(sql, [nim, nama, jurusan, id]);
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Gagal memperbarui data: ' + error.message);
    }
});

app.post('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const sql = 'DELETE FROM mahasiswa WHERE id = ?';
        await pool.execute(sql, [id]);
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Gagal menghapus data: ' + error.message);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan sukses di http://localhost:${PORT}`);
});