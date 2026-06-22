// JavaScript Interoperability untuk Kos Putri Griya Ayu - Flask Project

document.addEventListener("DOMContentLoaded", function () {
    // 1. MOBILE MENU TOGGLE
    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener("click", function () {
            mobileMenu.classList.toggle("hidden");
        });
    }

    // 2. SMOOTH SCROLLING FOR NAVBAR LINKS
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
                    mobileMenu.classList.add("hidden");
                }
                
                // Scroll beautifully
                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    // 3. SALIN ALAMAT KE CLIPBOARD (DENGAN CUSTOM TOAST ALERT)
    const btnCopyAlamat = document.getElementById("btnCopyAlamat");
    const alamatText = document.getElementById("alamatText");
    const customToast = document.getElementById("customToast");
    const customToastMsg = document.getElementById("customToastMsg");

    function showToast(message) {
        if (customToast && customToastMsg) {
            customToastMsg.innerText = message;
            customToast.classList.remove("hidden");
            setTimeout(() => {
                customToast.classList.add("hidden");
            }, 3000);
        }
    }

    if (btnCopyAlamat && alamatText) {
        btnCopyAlamat.addEventListener("click", function () {
            const rawText = alamatText.innerText.trim();
            navigator.clipboard.writeText(rawText).then(function () {
                showToast("Alamat berhasil disalin ke clipboard!");
            }, function () {
                // Fallback jika diblokir browser iFrame
                alert("Alamat: " + rawText);
            });
        });
    }

    // 4. INTERAKTIVITAS PETA KAMAR (DENAH LANTAI)
    const btnKamarList = document.querySelectorAll(".btn-kamar-click");
    const detailBox = document.getElementById("detailBox");
    const detailKamarNo = document.getElementById("detailKamarNo");
    const detailKamarTipe = document.getElementById("detailKamarTipe");
    const detailKamarHarga = document.getElementById("detailKamarHarga");
    const detailKamarStatus = document.getElementById("detailKamarStatus");
    const detailKamarFasilitas = document.getElementById("detailKamarFasilitas");
    const btnPesanSpesifik = document.getElementById("btnPesanSpesifik");
    const btnTutupDetail = document.getElementById("btnTutupDetail");

    let activeSelectedRoom = null;

    btnKamarList.forEach(btn => {
        btn.addEventListener("click", function () {
            const num = this.getAttribute("data-number");
            const type = this.getAttribute("data-type");
            const price = parseInt(this.getAttribute("data-price"), 10);
            const isAvail = this.getAttribute("data-available") === "true";
            const facilities = this.getAttribute("data-facilities");

            activeSelectedRoom = { number: num, type: type, price: price, isAvailable: isAvail };

            // Update UI
            if (detailKamarNo) detailKamarNo.innerText = "Kamar No " + num;
            if (detailKamarTipe) detailKamarTipe.innerText = "TIPE KAMAR " + type;
            if (detailKamarHarga) detailKamarHarga.innerText = "Rp " + price.toLocaleString("id-ID") + " / Bulan";
            
            if (detailKamarStatus) {
                if (isAvail) {
                    detailKamarStatus.innerText = "Tersedia Sekarang";
                    detailKamarStatus.className = "bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs px-3 py-1.5 rounded-full font-bold inline-block";
                    if (btnPesanSpesifik) {
                        btnPesanSpesifik.innerText = "💬 Pesan Kamar " + num + " Via WhatsApp";
                        btnPesanSpesifik.disabled = false;
                        btnPesanSpesifik.className = "w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center space-x-2 cursor-pointer transition-colors";
                    }
                } else {
                    detailKamarStatus.innerText = "Sudah Terisi";
                    detailKamarStatus.className = "bg-rose-50 border border-rose-200 text-rose-700 text-xs px-3 py-1.5 rounded-full font-bold inline-block";
                    if (btnPesanSpesifik) {
                        btnPesanSpesifik.innerText = "🔒 Kamar Sudah Terisi";
                        btnPesanSpesifik.disabled = true;
                        btnPesanSpesifik.className = "w-full bg-gray-200 text-gray-400 font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center cursor-not-allowed";
                    }
                }
            }

            const facilityMeta = {
                'Kasur Springbed': {
                    title: 'Kasur Springbed',
                    qty: '1 Unit',
                    color: 'bg-rose-50/70 border-[#FAD0D4] text-rose-800',
                    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=300&q=80'
                },
                'Kasur Busa Tebal': {
                    title: 'Kasur Busa Tebal',
                    qty: '1 Unit',
                    color: 'bg-amber-50/75 border-amber-200 text-amber-900',
                    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=300&q=80'
                },
                'Kasur': {
                    title: 'Kasur',
                    qty: '1 Unit',
                    color: 'bg-amber-50/75 border-amber-200 text-amber-900',
                    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=300&q=80'
                },
                'Air Conditioner (AC)': {
                    title: 'AC Hemat Daya',
                    qty: '1 Unit',
                    color: 'bg-sky-50/70 border-sky-200 text-sky-850',
                    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=300&q=80'
                },
                'Kipas Angin Dinding': {
                    title: 'Kipas Angin',
                    qty: '1 Unit',
                    color: 'bg-emerald-50/70 border-emerald-250 text-emerald-850',
                    image: 'https://images.unsplash.com/photo-1591815302525-753a9cbd34df?auto=format&fit=crop&w=300&q=80'
                },
                'Kipas Angin': {
                    title: 'Kipas Angin',
                    qty: '1 Unit',
                    color: 'bg-emerald-50/70 border-emerald-250 text-emerald-850',
                    image: 'https://images.unsplash.com/photo-1591815302525-753a9cbd34df?auto=format&fit=crop&w=300&q=80'
                },
                'Kamar Mandi Dalam': {
                    title: 'Kamar Mandi Dalam',
                    qty: '1 Ruang',
                    color: 'bg-blue-50/70 border-blue-200 text-blue-800',
                    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=300&q=80'
                },
                'Meja & Kursi': {
                    title: 'Meja & Kursi',
                    qty: '1 Set',
                    color: 'bg-amber-50/70 border-amber-200 text-amber-850',
                    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=300&q=80'
                },
                'Meja Belajar': {
                    title: 'Meja Belajar',
                    qty: '1 Set',
                    color: 'bg-amber-50/70 border-amber-200 text-amber-850',
                    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=300&q=80'
                },
                'Lemari Pakaian': {
                    title: 'Lemari Pakaian',
                    qty: '1 Unit',
                    color: 'bg-stone-50/70 border-stone-200 text-stone-850',
                    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=300&q=80'
                },
                'Lemari Pakaian Kayu': {
                    title: 'Lemari Pakaian',
                    qty: '1 Unit',
                    color: 'bg-stone-50/70 border-stone-200 text-stone-850',
                    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=300&q=80'
                },
                'Rak Serbaguna': {
                    title: 'Rak Serbaguna',
                    qty: '1 Unit',
                    color: 'bg-indigo-50/70 border-indigo-200 text-indigo-850',
                    image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=300&q=80'
                },
                'Rak Buku': {
                    title: 'Rak Buku',
                    qty: '1 Unit',
                    color: 'bg-indigo-50/70 border-indigo-205 text-indigo-850',
                    image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=300&q=80'
                }
            };

            if (detailKamarFasilitas) {
                detailKamarFasilitas.innerText = facilities;
            }

            const detailKamarFasilitasGrid = document.getElementById("detailKamarFasilitasGrid");
            if (detailKamarFasilitasGrid && facilities) {
                detailKamarFasilitasGrid.innerHTML = "";
                const list = facilities.split(",").map(f => f.trim());
                list.forEach(fac => {
                    const data = facilityMeta[fac] || {
                        title: fac,
                        qty: '1 Unit',
                        color: 'bg-pink-50/70 border-pink-200 text-[#B76E79]',
                        image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=300&q=80'
                    };
                    
                    const card = document.createElement("div");
                    card.className = "flex flex-col items-center justify-between p-2.5 rounded-xl border text-center transition-all hover:scale-[1.02] " + data.color;
                    card.innerHTML = `
                        <div class="w-full h-16 sm:h-20 rounded-lg overflow-hidden mb-1.5 shadow-2xs relative border border-white/60 bg-zinc-100 flex-shrink-0">
                            <img 
                                src="${data.image}" 
                                alt="${data.title}" 
                                class="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                                referrerPolicy="no-referrer"
                            />
                        </div>
                        <span class="text-[11px] font-bold leading-tight block text-gray-800 line-clamp-1">
                            ${data.title}
                        </span>
                        <span class="text-[10px] bg-white/90 px-2 py-0.5 rounded-full font-extrabold text-[#B76E79] mt-1 border border-black/5 flex-shrink-0">
                            ${data.qty}
                        </span>
                    `;
                    detailKamarFasilitasGrid.appendChild(card);
                });
            }

            // Show box
            if (detailBox) {
                detailBox.classList.remove("hidden");
                // Scroll focus slightly to the detail box for great UX
                detailBox.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest"
                });
            }
        });
    });

    if (btnTutupDetail && detailBox) {
        btnTutupDetail.addEventListener("click", function () {
            detailBox.classList.add("hidden");
        });
    }

    // 5. REDIRECT WHATSAPP PESAN KAMAR SPESIFIK
    const ownerWhatsapp = "6281234567890";

    if (btnPesanSpesifik) {
        btnPesanSpesifik.addEventListener("click", function () {
            if (activeSelectedRoom && activeSelectedRoom.isAvailable) {
                const textTemplate = `Halo Pengelola Kos Putri Griya Ayu, saya tertarik ingin memesan Unit Kamar ${activeSelectedRoom.number} tipe ${activeSelectedRoom.type}. Apakah kamar tersebut masih bisa saya pesan? Terima kasih!`;
                const encodedText = encodeURIComponent(textTemplate);
                const url = `https://wa.me/${ownerWhatsapp}?text=${encodedText}`;
                
                showToast("Membuka WhatsApp untuk memesan Kamar " + activeSelectedRoom.number + "...");
                setTimeout(() => {
                    window.open(url, "_blank");
                }, 1000);
            }
        });
    }

    // 6. REDIRECT WHATSAPP PESAN KAMAR UMUM (DARI PRICING CARDS)
    const btnPesanUmumList = document.querySelectorAll(".btn-pesan-whatsapp-umum");
    btnPesanUmumList.forEach(btn => {
        btn.addEventListener("click", function () {
            const type = this.getAttribute("data-type");
            const textTemplate = `Halo Pengelola Kos Putri Griya Ayu, saya ingin berkonsultasi mengenai ketersediaan Kamar tipe ${type}. Terimakasih!`;
            const encodedText = encodeURIComponent(textTemplate);
            const url = `https://wa.me/${ownerWhatsapp}?text=${encodedText}`;

            showToast("Membuka obrolan WhatsApp...");
            setTimeout(() => {
                window.open(url, "_blank");
            }, 1000);
        });
    } );

    // 7. KLIK SOSIAL MEDIA ALERT VALIDASI
    const btnSosmedList = document.querySelectorAll(".btn-sosmed");
    btnSosmedList.forEach(btn => {
        btn.addEventListener("click", function () {
            const platform = this.getAttribute("data-platform");
            const user = this.getAttribute("data-user");
            showToast(`Mengalihkan Anda ke profil resmi ${platform}: ${user}...`);
        });
    });

    // 8. FORM TANYA JAWAB VALIDATION & SUBMIT SIMULATION
    const formTanya = document.getElementById("formTanya");
    const tanyaNama = document.getElementById("tanyaNama");
    const tanyaPesan = document.getElementById("tanyaPesan");

    if (formTanya) {
        formTanya.addEventListener("submit", function (e) {
            e.preventDefault();
            const namaVal = tanyaNama ? tanyaNama.value.trim() : "";
            const pesanVal = tanyaPesan ? tanyaPesan.value.trim() : "";

            if (!namaVal || !pesanVal) {
                showToast("Harap lengkapi semua isian formulir pertanyaan!");
                return;
            }

            // Simulate sending success
            showToast(`Terima kasih ${namaVal}! Pertanyaan Anda berhasil dikirim ke Pengelola.`);
            
            // Clean inputs
            if (tanyaNama) tanyaNama.value = "";
            if (tanyaPesan) tanyaPesan.value = "";
        });
    }
});
