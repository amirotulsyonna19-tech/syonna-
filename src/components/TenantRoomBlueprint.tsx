import React, { useState } from 'react';
import { 
  Bed, 
  Trash2, 
  Tv, 
  BookOpen, 
  Droplets, 
  Wind, 
  Home, 
  CheckCircle,
  AlertCircle,
  Sparkles,
  Info
} from 'lucide-react';

interface TenantRoomBlueprintProps {
  roomNumber: string;
  roomType: 'AC' | 'Non-AC';
  onReportIssue: (itemName: string) => void;
}

export default function TenantRoomBlueprint({ roomNumber, roomType, onReportIssue }: TenantRoomBlueprintProps) {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  // Determine floor from first digit
  const floorNum = roomNumber ? roomNumber.charAt(0) : '1';

  // Room details configuration
  const roomItems = [
    {
      id: 'bed',
      name: roomType === 'AC' ? 'Kasur Springbed' : 'Kasur Busa Tebal',
      description: 'Kasur mewah size single, matras empuk dengan sprei rose-pastel.',
      status: 'Sangat Baik (Prima)',
      cleaningDate: 'Dibersihkan: 14 Juni 2026',
      icon: Bed,
      color: 'bg-rose-50 border-[#FAD0D4] text-rose-700'
    },
    {
      id: 'shower',
      name: 'Kamar Mandi Dalam',
      description: 'Kloset duduk, bak air bersih otomatis, gantungan baju, lantai anti-slip.',
      status: 'Bersih & Saluran Lancar',
      cleaningDate: 'Dibersihkan: 13 Juni 2026',
      icon: Droplets,
      color: 'bg-blue-50 border-blue-200 text-blue-750'
    },
    {
      id: 'desk',
      name: 'Meja Belajar & Kursi',
      description: 'Meja kayu minimalis dengan colokan listrik ganda, laci tempat buku.',
      status: 'Kokoh & Rapi',
      cleaningDate: 'Dibersihkan: 10 Juni 2026',
      icon: BookOpen,
      color: 'bg-amber-50 border-amber-200 text-amber-800'
    },
    {
      id: 'climate',
      name: roomType === 'AC' ? 'Air Conditioner (AC)' : 'Kipas Angin Dinding',
      description: roomType === 'AC' ? 'AC hemat energi 0.5 PK dengan filter udara bersih.' : 'Kipas angin putar 3 kecepatan hemat daya quiet-breeze.',
      status: roomType === 'AC' ? 'Dingin & Senyap (Suhu ideal 22°C)' : 'Berputar Lancar',
      cleaningDate: roomType === 'AC' ? 'Servis berkala: 25 Mei 2026' : 'Dibersihkan: 12 Juni 2026',
      icon: Wind,
      color: 'bg-sky-50 border-sky-200 text-sky-800'
    },
    {
      id: 'wardrobe',
      name: 'Lemari Pakaian Kayu',
      description: 'Dua pintu dengan laci terkunci dan cermin tinggi badan penuh.',
      status: 'Bersih & Terkunci Aman',
      cleaningDate: 'Dibersihkan: 8 Juni 2026',
      icon: Home,
      color: 'bg-stone-50 border-stone-200 text-stone-750'
    }
  ];

  // Helper to find building structure coordinates
  // Griya Ayu has rooms 101-105, 201-205, 301-305
  const buildingRooms = Array.from({ length: 5 }, (_, i) => `${floorNum}0${i + 1}`);

  return (
    <div className="space-y-6" id="tenant-room-blueprint-component">
      {/* HEADER INFO */}
      <div className="bg-gradient-to-r from-[#FFF5F6] to-[#FFF9FA] border border-[#FAD0D4] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-rose-gold text-white flex flex-col items-center justify-center shadow-sm">
            <span className="text-[10px] tracking-wider uppercase font-bold">Kamar</span>
            <span className="text-xl font-bold font-serif leading-none">{roomNumber}</span>
          </div>
          <div>
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wider block">Denah Unit Pribadi</span>
            <h4 className="text-base sm:text-lg font-bold text-gray-900 font-serif">Kamar Hunian {roomType === 'AC' ? 'Eksklusif (AC)' : 'Ekonomis'}</h4>
          </div>
        </div>
        <div className="text-xs text-right sm:border-l border-[#F5E1E3] sm:pl-4">
          <span className="text-gray-400 block font-medium">Lokasi Lantai</span>
          <span className="text-rose-gold font-bold text-sm block">Lantai {floorNum} (Sisi Timur)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* INTERACTIVE 2D LAYOUT CANVAS */}
        <div className="lg:col-span-7 bg-white border border-[#F5E1E3] rounded-2xl p-4 sm:p-6 shadow-2xs">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-rose-gold" />
              <span>Blueprint Tata Letak Kamar {roomNumber}</span>
            </span>
            <span className="text-[10px] text-gray-400 bg-[#FFF5F5] py-0.5 px-2 rounded-full border border-[#FFE5E8] italic">
              Klik perabotan untuk inspeksi kondisi
            </span>
          </div>

          {/* Interactive Room Grid Styling (SVG / HTML Hybrid Layout) */}
          <div className="relative w-full aspect-square max-w-[420px] mx-auto bg-[#FFFBFB] border-4 border-dashed border-[#FAD0D4] rounded-3xl p-6 overflow-hidden shadow-inner flex flex-col justify-between">
            {/* Ambient Wall outlines */}
            <div className="absolute top-0 bottom-0 left-0 w-3 bg-red-100/50" />
            <div className="absolute top-0 bottom-0 right-0 w-3 bg-red-100/50" />
            <div className="absolute top-0 right-0 left-0 h-3 bg-red-100/50" />

            {/* DOOR ENTRY */}
            <div className="absolute bottom-0 right-10 w-14 h-3 bg-rose-300 border border-[#B76E79] flex items-center justify-center text-[8px] font-bold text-white uppercase tracking-wider">
              Pintu Masuk
            </div>
            
            {/* WINDOW */}
            <div className="absolute top-0 left-12 w-20 h-3 bg-sky-200 border border-sky-400 flex items-center justify-center text-[8px] font-bold text-sky-800 uppercase tracking-wider">
              Jendela Kaca
            </div>

            {/* ROW 1: BED (LEFT) & CHIME AC (TOP RIGHT) */}
            <div className="flex justify-between items-start h-2/5 w-full gap-4">
              
              {/* BED ITEM (Interactive) */}
              <button 
                onClick={() => setSelectedItem('bed')}
                className={`w-1/2 h-full rounded-2xl border-2 flex flex-col justify-between p-3 transition-all relative ${
                  selectedItem === 'bed' 
                    ? 'border-rose-gold ring-4 ring-rose-200 bg-rose-50/70 shadow-md scale-98' 
                    : 'border-[#FAD0D4] hover:border-rose-300 bg-white shadow-2xs hover:scale-98'
                }`}
              >
                <div className="flex justify-between items-start w-full">
                  <div className="bg-rose-100 text-rose-800 p-1.5 rounded-lg">
                    <Bed className="w-5 h-5" />
                  </div>
                  <span className="text-[8px] uppercase tracking-wider bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded-full">OK</span>
                </div>
                <div className="text-left">
                  <span className="text-[10px] text-gray-500 font-medium block">BED</span>
                  <span className="text-xs font-bold text-gray-900 block truncate">Springbed</span>
                </div>
                {/* Visual Pillow */}
                <div className="absolute top-2 right-2 w-10 h-4 border border-dashed border-[#FAD0D4] bg-[#FFEBEF] rounded-sm" />
              </button>

              {/* CLIMATE AC / WALL FAN (Interactive) */}
              <button 
                onClick={() => setSelectedItem('climate')}
                className={`w-2/5 h-3/4 rounded-2xl border-2 flex flex-col justify-between p-2.5 transition-all relative ${
                  selectedItem === 'climate' 
                    ? 'border-sky-400 ring-4 ring-sky-100 bg-sky-50' 
                    : 'border-sky-100 hover:border-sky-300 bg-white hover:scale-98'
                }`}
              >
                <div className="flex justify-between items-center w-full">
                  <div className="bg-sky-100 text-sky-800 p-1 rounded-md">
                    <Wind className="w-4 h-4" />
                  </div>
                  <span className="text-[8px] font-bold bg-sky-100 text-sky-700 py-0.5 px-1.5 rounded-sm">22°C</span>
                </div>
                <div className="text-left mt-1">
                  <span className="text-[8px] text-gray-400 block tracking-wider uppercase font-medium">DINDING</span>
                  <span className="text-[10px] font-bold text-gray-800 block truncate">{roomType === 'AC' ? 'Unit AC' : 'Wall Fan'}</span>
                </div>
              </button>

            </div>

            {/* ROW 2: BATHROOM (LEFT BOTTOM) & WARDROBE (RIGHT BOTTOM) & STUDY DESK */}
            <div className="flex justify-between items-end h-2/5 w-full gap-4 mt-6">
              
              {/* BATHROOM ITEM (Interactive) */}
              <button 
                onClick={() => setSelectedItem('shower')}
                className={`w-5/12 h-full rounded-2xl border-2 flex flex-col justify-between p-2.5 transition-all ${
                  selectedItem === 'shower' 
                    ? 'border-blue-400 ring-4 ring-blue-100 bg-blue-50/70 shadow-md' 
                    : 'border-blue-100 hover:border-blue-200 bg-white hover:scale-98'
                }`}
              >
                <div className="flex justify-between items-start w-full">
                  <div className="bg-blue-100 text-blue-700 p-1.5 rounded-lg">
                    <Droplets className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-[8px] bg-emerald-50 text-emerald-800 font-bold px-1 rounded-sm uppercase tracking-tighter">Dalam</span>
                </div>
                <div className="text-left col-span-2">
                  <span className="text-[9px] text-gray-500 font-medium block">Kamar Mandi</span>
                  <span className="text-xs font-bold text-gray-900 block truncate leading-none mt-0.5">KM Dalam</span>
                </div>
              </button>

              {/* STUDY DESK & STUDY CHAIR (Interactive) */}
              <button 
                onClick={() => setSelectedItem('desk')}
                className={`w-1/3 h-5/6 rounded-2xl border-2 flex flex-col justify-between p-2 transition-all ${
                  selectedItem === 'desk' 
                    ? 'border-amber-400 ring-4 ring-amber-100 bg-amber-50/80' 
                    : 'border-amber-150 hover:border-amber-250 bg-white hover:scale-98'
                }`}
              >
                <div className="bg-amber-100 text-amber-850 w-7 h-7 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="text-left mt-1">
                  <span className="text-[8px] text-gray-400 block tracking-wider uppercase font-medium">WORKSPACE</span>
                  <span className="text-[10px] font-bold text-gray-800 block leading-tight">Meja Belajar</span>
                </div>
              </button>

              {/* WARDROBE (Interactive) */}
              <button 
                onClick={() => setSelectedItem('wardrobe')}
                className={`w-1/4 h-full rounded-2xl border-2 flex flex-col justify-between p-2 transition-all ${
                  selectedItem === 'wardrobe' 
                    ? 'border-stone-400 ring-4 ring-stone-100 bg-[#FAF7F5]' 
                    : 'border-stone-150 hover:border-stone-250 bg-white hover:scale-98'
                }`}
              >
                <span className="text-[7px] tracking-wider uppercase bg-stone-100 text-stone-700 self-end px-1 rounded">2 Pintu</span>
                <div className="text-left">
                  <span className="text-[9px] text-gray-400 block">STORAGE</span>
                  <span className="text-[10px] font-bold text-gray-800 block truncate">Lemari</span>
                </div>
              </button>

            </div>
          </div>

          {/* SPECIFIC ITEM CONDITION DISPLAY (BASED ON BLUEPRINT CLICK) */}
          <div className="mt-5 border border-slate-100 bg-slate-50/75 p-4 rounded-xl min-h-[100px] flex items-center justify-center">
            {selectedItem ? (() => {
              const item = roomItems.find(i => i.id === selectedItem);
              if (!item) return null;
              const Icon = item.icon;
              return (
                <div className="w-full flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
                  <div className="flex items-start space-x-3.5">
                    <div className={`p-3 rounded-xl border shrink-0 ${item.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="text-center sm:text-left">
                      <span className="text-[10px] bg-white border border-[#FAD0D4] text-[#B76E79] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider inline-block">
                        Fasilitas Kamar {roomNumber}
                      </span>
                      <h5 className="text-sm font-bold text-gray-900 mt-1">{item.name}</h5>
                      <p className="text-xs text-gray-500 mt-1 font-light leading-snug">{item.description}</p>
                      
                      <div className="mt-2.5 flex flex-wrap gap-2 items-center justify-center sm:justify-start text-[10px]">
                        <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 py-0.5 px-2.5 rounded-full font-semibold flex items-center space-x-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                          <span>{item.status}</span>
                        </span>
                        <span className="text-gray-400 italic">
                          {item.cleaningDate}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="w-full sm:w-auto shrink-0 self-center">
                    <button 
                      onClick={() => onReportIssue(item.name)}
                      className="w-full bg-white hover:bg-rose-50 text-rose-gold text-xs font-semibold py-2 px-3 border border-[#E9C8CE] rounded-lg shadow-2xs hover:shadow-xs transition-all cursor-pointer block text-center"
                    >
                      ⚠️ Laporkan Kerusakan
                    </button>
                  </div>
                </div>
              );
            })() : (
              <div className="text-center space-y-1.5">
                <Info className="w-5 h-5 mx-auto text-gray-400" />
                <p className="text-xs font-semibold text-gray-600">Ketuk salah satu item perabot pada denah kamar di atas</p>
                <p className="text-[10px] text-gray-400">Untuk memantau kondisi, tanggal pembersihan berkala, serta melakukan pelaporan jika terdapat kerusakan.</p>
              </div>
            )}
          </div>
        </div>

        {/* BUILDING MAP LOCATOR & TIPS */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6">
          
          {/* Floor Map Layout highlighting current block */}
          <div className="bg-white border border-[#F5E1E3] rounded-2xl p-5 shadow-2xs space-y-4">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest block">
              Peta Posisi Kamar (Lantai {floorNum})
            </span>

            <p className="text-xs text-gray-500 font-light leading-snug">
              Berikut peta keseluruhan denah koridor lantai {floorNum} Kos Putri Griya Ayu. Kamar Anda ditandai dengan sorotan box merah menyala.
            </p>

            <div className="bg-[#FFFBFB] border border-[#F5E1E3] rounded-xl p-4">
              <div className="grid grid-cols-5 gap-2 text-center text-[10px] font-bold">
                {buildingRooms.map((num) => {
                  const isCurrent = num === roomNumber;
                  return (
                    <div 
                      key={num}
                      className={`py-3 rounded-lg border-2 ${
                        isCurrent 
                          ? 'border-rose-gold bg-[#FFEAEB] text-rose-800 ring-2 ring-rose-350 shadow-sm font-black' 
                          : 'border-slate-100 bg-white text-gray-400 font-semibold'
                      } relative overflow-hidden`}
                    >
                      {isCurrent && (
                        <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                      )}
                      <span className="block text-[8px] uppercase font-medium tracking-tight">Kamar</span>
                      <span className="block text-xs mt-0.5">{num}</span>
                    </div>
                  );
                })}
              </div>

              {/* Lobby and Staircase annotation in corridor map */}
              <div className="mt-3 grid grid-cols-12 gap-2 text-[9px] text-gray-400 text-center font-semibold">
                <div className="col-span-3 bg-slate-50 border border-dashed rounded py-1">Koridor Utama</div>
                <div className="col-span-5 bg-stone-50 border border-dashed rounded py-1 text-stone-600">Tangga Naik/Turun Samping</div>
                <div className="col-span-4 bg-emerald-50 border border-dashed rounded py-1 text-emerald-800">Balkon / Jemuran</div>
              </div>
            </div>

            <div className="bg-[#FFF5F6] border border-[#FFE5E8] p-3 rounded-xl flex items-start space-x-2.5">
              <AlertCircle className="w-5 h-5 text-rose-gold mt-0.5 shrink-0" />
              <div className="text-xs leading-normal">
                <strong className="block text-gray-900 font-bold">Akses Kode & Kunci</strong>
                <span className="text-gray-600 block mt-0.5">Pintu gerbang kos menggunakan PIN Smart Lock elektrik terpusat. PIN rahasia gerbang dapat dilihat di profil digital tenant di atas atau chat CS.</span>
              </div>
            </div>
          </div>

          {/* Quick Guides & Rules */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-4 shadow-sm">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
              💡 Panduan Singkat Tinggal
            </span>

            <ul className="space-y-2 text-xs font-light text-gray-300">
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-[#B76E79] shrink-0 mt-0.5" />
                <span><strong>Simpan Token:</strong> Pastikan pulsa token listrik kamar Anda tidak berbunyi lewat pengisian reguler.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-[#B76E79] shrink-0 mt-0.5" />
                <span><strong>Kunci Kamar:</strong> Harap mengunci kamar & laci lemari demi keamanan saat Anda bepergian ke luar kampus.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-[#B76E79] shrink-0 mt-0.5" />
                <span><strong>Sampah Kamar:</strong> Buang sampah kamar Anda pada bak sampah koridor yang dibersihkan pengurus setiap pagi pukul 07.30 WIB.</span>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
