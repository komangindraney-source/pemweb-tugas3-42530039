CREATE DATABASE IF NOT EXISTS db_mahasiswa;
USE db_mahasiswa;

CREATE TABLE IF NOT EXISTS mahasiswa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nim VARCHAR(20) NOT NULL,
    nama VARCHAR(100) NOT NULL,
    jurusan VARCHAR(50) NOT NULL
);

INSERT INTO mahasiswa (nim, nama, jurusan) VALUES 
('22001001', 'Budi Santoso', 'Teknologi Informasi'),
('22001002', 'Siti Rahma', 'Sistem Informasi');