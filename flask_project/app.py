from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

# ==========================================
# 1. DATASET UTAMA KAMAR (15 UNIT KOS)
# ==========================================
# Disimpan dalam bentuk List-Dictionary Python untuk pengelolaan dinamis yang mudah.
# Masing-masing kamar memiliki atribut: id, nomor kamar, tipe, harga, ketersediaan, lantai, dan daftar fasilitas.
DATA_KAMAR = [
    {
        "id": "1", "number": "101", "type": "AC", "price": 800000, "isAvailable": False, "floor": 1,
        "facilities": ["Kasur Springbed", "Air Conditioner (AC)", "Kamar Mandi Dalam", "Meja & Kursi", "Lemari Pakaian"]
    },
    {
        "id": "2", "number": "102", "type": "AC", "price": 800000, "isAvailable": True, "floor": 1,
        "facilities": ["Kasur Springbed", "Air Conditioner (AC)", "Kamar Mandi Dalam", "Meja & Kursi", "Lemari Pakaian"]
    },
    {
        "id": "3", "number": "103", "type": "Non-AC", "price": 700000, "isAvailable": False, "floor": 1,
        "facilities": ["Kasur", "Kipas Angin", "Kamar Mandi Dalam", "Rak Serbaguna", "Lemari Pakaian"]
    },
    {
        "id": "4", "number": "104", "type": "AC", "price": 800000, "isAvailable": True, "floor": 1,
        "facilities": ["Kasur Springbed", "Air Conditioner (AC)", "Kamar Mandi Dalam", "Meja & Kursi", "Lemari Pakaian"]
    },
    {
        "id": "5", "number": "105", "type": "Non-AC", "price": 700000, "isAvailable": True, "floor": 1,
        "facilities": ["Kasur Busa Tebal", "Kipas Angin", "Kamar Mandi Dalam", "Rak Serbaguna", "Lemari Pakaian"]
    },
    {
        "id": "6", "number": "201", "type": "AC", "price": 800000, "isAvailable": False, "floor": 2,
        "facilities": ["Kasur Springbed", "Air Conditioner (AC)", "Kamar Mandi Dalam", "Meja & Kursi", "Lemari Pakaian"]
    },
    {
        "id": "7", "number": "202", "type": "AC", "price": 800000, "isAvailable": True, "floor": 2,
        "facilities": ["Kasur Springbed", "Air Conditioner (AC)", "Kamar Mandi Dalam", "Meja & Kursi", "Lemari Pakaian"]
    },
    {
        "id": "8", "number": "203", "type": "Non-AC", "price": 700000, "isAvailable": False, "floor": 2,
        "facilities": ["Kasur Busa Tebal", "Kipas Angin", "Kamar Mandi Dalam", "Rak Serbaguna", "Lemari Pakaian"]
    },
    {
        "id": "9", "number": "204", "type": "Non-AC", "price": 700000, "isAvailable": True, "floor": 2,
        "facilities": ["Kasur Busa Tebal", "Kipas Angin", "Kamar Mandi Dalam", "Rak Serbaguna", "Lemari Pakaian"]
    },
    {
        "id": "10", "number": "205", "type": "AC", "price": 800000, "isAvailable": False, "floor": 2,
        "facilities": ["Kasur Springbed", "Air Conditioner (AC)", "Kamar Mandi Dalam", "Meja & Kursi", "Lemari Pakaian"]
    },
    {
        "id": "11", "number": "301", "type": "AC", "price": 800000, "isAvailable": False, "floor": 3,
        "facilities": ["Kasur Springbed", "Air Conditioner (AC)", "Kamar Mandi Dalam", "Meja & Kursi", "Lemari Pakaian"]
    },
    {
        "id": "12", "number": "302", "type": "Non-AC", "price": 700000, "isAvailable": True, "floor": 3,
        "facilities": ["Kasur Busa Tebal", "Kipas Angin", "Kamar Mandi Dalam", "Rak Serbaguna", "Lemari Pakaian"]
    },
    {
        "id": "13", "number": "303", "type": "Non-AC", "price": 700000, "isAvailable": True, "floor": 3,
        "facilities": ["Kasur Busa Tebal", "Kipas Angin", "Kamar Mandi Dalam", "Rak Serbaguna", "Lemari Pakaian"]
    },
    {
        "id": "14", "number": "304", "type": "AC", "price": 800000, "isAvailable": False, "floor": 3,
        "facilities": ["Kasur Springbed", "Air Conditioner (AC)", "Kamar Mandi Dalam", "Meja & Kursi", "Lemari Pakaian"]
    },
    {
        "id": "15", "number": "305", "type": "Non-AC", "price": 700000, "isAvailable": True, "floor": 3,
        "facilities": ["Kasur Busa Tebal", "Kipas Angin", "Kamar Mandi Dalam", "Rak Serbaguna", "Lemari Pakaian"]
    }
]

# ==========================================
# 2. DATASET PENGHUNI AKTIF (PRESET TENANTS)
# ==========================================
# Memindahkan seluruh daftar penghuni kos aktif yang sebelumnya di JS/React langsung ke Python.
# Hal ini agar pemrosesan data (seperti autocompletion atau pencarian penghuni) diatur di sisi server (Python).
DATA_PENGHUNI = [
    { "name": "Siska Amelia", "phone": "081234567812", "roomNumber": "101", "avatar": "👩‍🦰", "type": "AC" },
    { "name": "Diana Lestari", "phone": "082345678913", "roomNumber": "103", "avatar": "👩", "type": "Non-AC" },
    { "name": "Amanda Putri", "phone": "083456789014", "roomNumber": "201", "avatar": "👩‍", "type": "AC" },
    { "name": "Vania Clarissa", "phone": "084567890123", "roomNumber": "205", "avatar": "👱‍♀️", "type": "AC" },
    { "name": "Lidya Natalia", "phone": "085678901234", "roomNumber": "301", "avatar": "👩‍⚕️", "type": "AC" },
    { "name": "Fitri Handayani", "phone": "086789012345", "roomNumber": "304", "avatar": "👩‍💼", "type": "AC" }
]

# ==========================================
# 3. ROUTE UTAMA (MENGIRIMKAN DATA KE TEMPLATE)
# ==========================================
@app.route('/')
def index():
    # Menghitung statistik kamar secara langsung menggunakan fungsi bawaan Python:
    # `len` untuk menghitung total jumlah kamar.
    total_rooms = len(DATA_KAMAR)
    
    # List comprehension + generator untuk menghitung berapa kamar yang memiliki 'isAvailable' True.
    available_rooms = sum(1 for room in DATA_KAMAR if room['isAvailable'])
    
    # Mengirimkan variabel `rooms`, `tenants`, `total_rooms`, dan `available_rooms` ke file index.html (Jinja2).
    # Dengan cara ini, HTML tidak perlu me-load data statis secara manual! semua berasal dari variabel Python di bawah.
    return render_template(
        'index.html', 
        rooms=DATA_KAMAR, 
        tenants=DATA_PENGHUNI,
        total_rooms=total_rooms, 
        available_rooms=available_rooms
    )

# ==========================================
# 4. ENDPOINT API UNTUK KAMAR DAN PENGHUNI (JSON)
# ==========================================
# Menyediakan API berformat JSON agar JavaScript di front-end dapat menarik data ini secara dinamis.
@app.route('/api/rooms', methods=['GET'])
def get_rooms():
    """Mengembalikan data seluruh kamar dalam bentuk JSON."""
    return jsonify(DATA_KAMAR)

@app.route('/api/tenants', methods=['GET'])
def get_tenants():
    """Mengembalikan data seluruh daftar penghuni kos aktif dalam bentuk JSON."""
    return jsonify(DATA_PENGHUNI)

# ==========================================
# 5. INTEGRASI SERVER-SIDE SUBMIT PERTANYAAN (OPSIONAL)
# ==========================================
# Route opsional untuk melakukan pemrosesan formulir pertanyaan di sisi server (Python).
@app.route('/api/tanya', methods=['POST'])
def submit_pertanyaan():
    """Contoh penerimaan form data pertanyaan di Python."""
    data = request.get_json() or {}
    nama = data.get('nama', '').strip()
    pesan = data.get('pesan', '').strip()
    
    if not nama or not pesan:
        return jsonify({ "status": "error", "message": "Nama dan pesan tidak boleh kosong!" }), 400
        
    # Di Python, Anda bisa memproses pesan ini misalnya menyimpannya ke database
    # atau mencetaknya ke log konsol server Anda.
    print(f"[PERTANYAAN BARU] Pengirim: {nama} | Isi: {pesan}")
    
    return jsonify({
        "status": "success",
        "message": f"Terima kasih {nama}! Pertanyaan Anda berhasil diterima di server Python."
    })

# ==========================================
# 6. PENJALANAN SERVER FLASK
# ==========================================
if __name__ == '__main__':
    # Mengimpor modul `os` untuk membaca port sistem dari environment variable
    import os
    
    # Jika PORT tidak dispesifikasi oleh sistem cloud-run, gunakan port default local 5000
    port = int(os.environ.get('PORT', 5000))
    
    # Menjalankan server Flask agar bisa diakses oleh perangkat luar melalui host '0.0.0.0'
    app.run(host='0.0.0.0', port=port, debug=True)
