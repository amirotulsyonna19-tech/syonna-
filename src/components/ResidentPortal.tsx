import React, { useState, useEffect } from 'react';
import { 
  User, 
  LogOut, 
  MapPin, 
  Phone, 
  Copy, 
  CheckCircle, 
  Wrench, 
  AlertTriangle, 
  Wifi, 
  Lock, 
  Clock, 
  ShieldAlert, 
  ClipboardList, 
  Compass, 
  FileText, 
  ChevronRight,
  Upload,
  Check,
  Megaphone
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Room } from '../types';
import TenantRoomBlueprint from './TenantRoomBlueprint';

interface ResidentPortalProps {
  loggedInTenant: { name: string; phone: string; roomNumber: string };
  onLogout: () => void;
  rooms: Room[];
  ownerWhatsapp: string;
  tenantReports: any[];
  setTenantReports: (reports: any[]) => void;
  tenantBills: any[];
  setTenantBills: (bills: any[]) => void;
  activeTenantTab: 'room' | 'billing' | 'info' | 'announcements';
  setActiveTenantTab: (tab: 'room' | 'billing' | 'info' | 'announcements') => void;
  setViewMode: (mode: 'portal' | 'public') => void;
  fullAddress: string;
  getFacilityDetail: (name: string) => any;
}

export default function ResidentPortal({
  loggedInTenant,
  onLogout,
  rooms,
  ownerWhatsapp,
  tenantReports,
  setTenantReports,
  tenantBills,
  setTenantBills,
  activeTenantTab,
  setActiveTenantTab,
  setViewMode,
  fullAddress,
  getFacilityDetail
}: ResidentPortalProps) {
  // Local states for bill payments
  const [selectedBillToPay, setSelectedBillToPay] = useState<string | null>(null);
  const [paySenderBank, setPaySenderBank] = useState('BCA');
  const [paySenderName, setPaySenderName] = useState('');
  const [isUploadingSlip, setIsUploadingSlip] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [paymentSuccessToast, setPaymentSuccessToast] = useState(false);
  const [copyToast, setCopyToast] = useState<string | null>(null);

  // States for report fields
  const [reportItem, setReportItem] = useState('');
  const [reportDesc, setReportDesc] = useState('');
  const [reportSuccess, setReportSuccess] = useState(false);

  // Get active tenant room details
  const myRoom = rooms.find(r => r.number === loggedInTenant.roomNumber);

  // Trigger copy fields
  const triggerCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopyToast(`${label} berhasil disalin!`);
    setTimeout(() => setCopyToast(null), 3500);
  };

  // Simulated billing slip upload via drag and drop or select
  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      simulateSlipUpload(file.name);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      simulateSlipUpload(file.name);
    }
  };

  const simulateSlipUpload = (fileName: string) => {
    setSelectedFileName(fileName);
    setIsUploadingSlip(true);
    setUploadProgress(10);
    
    // Simulate upload progress interval
    const timer = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsUploadingSlip(false);
          return 100;
        }
        return prev + 15;
      });
    }, 180);
  };

  const handleConfimPayment = (e: React.FormEvent, billId: string) => {
    e.preventDefault();
    if (!paySenderName) {
      alert('Tulis nama rekening pengirim terlebih dahulu!');
      return;
    }
    if (!selectedFileName) {
      alert('Harap unggah bukti transfer / slip pembayaran!');
      return;
    }

    const updated = tenantBills.map(b => {
      if (b.id === billId) {
        return { 
          ...b, 
          status: 'Diproses' as const,
          payDate: 'Hari ini',
          senderName: paySenderName,
          senderBank: paySenderBank,
          checkDigit: 'MOCK' + Math.floor(1000 + Math.random() * 9000)
        };
      }
      return b;
    });

    setTenantBills(updated);
    localStorage.setItem('griya_ayu_bills', JSON.stringify(updated));

    // Reset payment states
    setPaymentSuccessToast(true);
    setSelectedBillToPay(null);
    setPaySenderName('');
    setSelectedFileName(null);
    setUploadProgress(0);

    setTimeout(() => setPaymentSuccessToast(false), 5000);
  };

  // Setup bills default selection
  useEffect(() => {
    const unpaid = tenantBills.find(b => b.status === 'Belum Bayar');
    if (unpaid && !selectedBillToPay) {
      setSelectedBillToPay(unpaid.id);
    }
  }, [tenantBills]);

  return (
    <div className="bg-[#FFFBFB] min-h-screen py-8 sm:py-12" id="portal-penghuni-dashboard">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. HERO MEMBERSHIP BANNER */}
        <div className="bg-white border border-[#FAD0D4] rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xs mb-8">
          <div className="absolute top-4 right-4 text-red-100/30 uppercase transform rotate-12 font-serif font-black text-6xl select-none pointer-events-none hidden sm:block">
            MEMBER
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#F5D5D9]">
            <div className="flex items-center gap-4 text-left">
              <div className="w-14 h-14 rounded-full bg-[#B76E79] text-white flex items-center justify-center shadow-md border-4 border-white shrink-0">
                <User className="w-7 h-7" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] border border-[#FAD0D4] bg-white text-[#B76E79] px-2.5 py-0.5 rounded-md font-bold uppercase tracking-wider">
                    Kartu Anggota Digital
                  </span>
                  <span className="inline-flex items-center space-x-1 bg-emerald-50 text-emerald-800 py-0.5 px-2.5 rounded-full text-[10px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Tenant Aktif</span>
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 mt-1">Hello, {loggedInTenant.name} 👋</h2>
                <p className="text-xs text-gray-500 font-light mt-0.5">Sistem Layanan Mandiri Digital & Pengaduan — Kos Putri Griya Ayu</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button 
                onClick={() => setViewMode('public')}
                className="bg-white border border-[#E9C8CE] hover:border-rose-gold text-gray-700 hover:bg-[#FFFBFB] px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
              >
                <span>🌐 Tinjau Beranda Catalog</span>
              </button>
              
              <button 
                onClick={onLogout}
                className="bg-[#FFF0F1] border border-[#FAD0D4] text-[#B76E79] hover:bg-rose-50 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out Sesi</span>
              </button>
            </div>
          </div>

          {/* Quick pass metrics row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
            <div className="bg-[#FFF8F8] p-4 rounded-xl border border-[#FFE0E3] text-left">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Kamar Anda</span>
              <strong className="text-xl font-serif font-bold text-rose-gold block mt-1">Room {loggedInTenant.roomNumber}</strong>
              <span className="text-[10px] text-gray-500 mt-0.5 block capitalize">{myRoom?.type || 'AC'} Room</span>
            </div>

            <div className="bg-[#FFF8F8] p-4 rounded-xl border border-[#FFE0E3] text-left">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">PIN Smart Gerbang</span>
              <div className="flex items-center justify-between mt-1">
                <strong className="text-lg font-mono font-bold text-gray-900 tracking-wider">🔑 *2799#</strong>
                <button 
                  onClick={() => triggerCopy('*2799#', 'PIN Gerbang')}
                  className="text-[10px] text-rose-gold hover:underline"
                  title="Salin PIN"
                >
                  Salin
                </button>
              </div>
              <span className="text-[10px] text-gray-400 mt-0.5 block">Diubah Tiap Bulan</span>
            </div>

            <div className="bg-[#FFF8F8] p-4 rounded-xl border border-[#FFE0E3] text-left">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Status Tagihan</span>
              {tenantBills.some(b => b.status === 'Belum Bayar') ? (
                <span className="inline-flex items-center space-x-1 text-red-700 bg-red-50 py-1 px-2.5 rounded-md text-xs font-semibold mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span>Ada 1 Belum Bayar</span>
                </span>
              ) : (
                <span className="inline-flex items-center space-x-1 text-emerald-800 bg-emerald-50 py-1 px-2.5 rounded-md text-xs font-semibold mt-1">
                  <span>✓ Semua Lunas</span>
                </span>
              )}
              <span className="text-[10px] text-gray-400 mt-0.5 block">Periode Juli 2026</span>
            </div>

            <div className="bg-[#FFF8F8] p-4 rounded-xl border border-[#FFE0E3] text-left">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Hubungi Pengurus</span>
              <a 
                href={`https://wa.me/${ownerWhatsapp}?text=Halo%252520Ibu%252520Kos%25252C%252520saya%252520penghuni%252520Kamar%252520${loggedInTenant.roomNumber}%252520(${loggedInTenant.name}).%252520Ada%252520yang%252520ingin%252520saya%252520tanyakan`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1 text-rose-gold bg-white border border-[#FAD0D4] py-1 px-2.5 rounded-md text-[11px] font-bold mt-1.5 shadow-3xs hover:bg-[#FFF2F3]"
              >
                <span>📞 Chat Direct WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* 2. TABBED PORTAL INTERFACE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Dashboard Left Tab Buttons */}
          <div className="lg:col-span-3 bg-white border border-[#F5E1E3] rounded-3xl p-4 shadow-3xs space-y-2 text-left">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block px-3 mb-3">Layanan Kamar</span>
            
            <button
              onClick={() => setActiveTenantTab('room')}
              className={`w-full text-left p-3.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center space-x-3 transition-all cursor-pointer ${
                activeTenantTab === 'room' 
                  ? 'bg-rose-gold text-white shadow-sm' 
                  : 'text-gray-700 hover:bg-[#FFF5F5] hover:text-[#B76E79]'
              }`}
            >
              <Wrench className="w-4 h-4" />
              <div className="flex-1">
                <span className="block font-bold">Kamar Saya & Denah</span>
                <span className={`text-[10px] font-normal block ${activeTenantTab === 'room' ? 'text-rose-100' : 'text-gray-400'}`}>Denah 2D & servis perbaikan</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTenantTab('billing')}
              className={`w-full text-left p-3.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center space-x-3 transition-all cursor-pointer ${
                activeTenantTab === 'billing' 
                  ? 'bg-rose-gold text-white shadow-sm' 
                  : 'text-gray-700 hover:bg-[#FFF5F5] hover:text-[#B76E79]'
              }`}
            >
              <ClipboardList className="w-4 h-4" />
              <div className="flex-1">
                <span className="block font-bold">Tagihan & Sewa</span>
                <span className={`text-[10px] font-normal block ${activeTenantTab === 'billing' ? 'text-rose-100' : 'text-gray-400'}`}>Pembayaran bulanan mandiri</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTenantTab('info')}
              className={`w-full text-left p-3.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center space-x-3 transition-all cursor-pointer ${
                activeTenantTab === 'info' 
                  ? 'bg-rose-gold text-white shadow-sm' 
                  : 'text-gray-700 hover:bg-[#FFF5F5] hover:text-[#B76E79]'
              }`}
            >
              <Lock className="w-4 h-4" />
              <div className="flex-1">
                <span className="block font-bold">Aturan & Akses Wi-Fi</span>
                <span className={`text-[10px] font-normal block ${activeTenantTab === 'info' ? 'text-rose-100' : 'text-gray-400'}`}>Password wifi, CCTV, ketertiban</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTenantTab('announcements')}
              className={`w-full text-left p-3.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center space-x-3 transition-all cursor-pointer ${
                activeTenantTab === 'announcements' 
                  ? 'bg-rose-gold text-white shadow-sm' 
                  : 'text-gray-700 hover:bg-[#FFF5F5] hover:text-[#B76E79]'
              }`}
            >
              <Megaphone className="w-4 h-4" />
              <div className="flex-1">
                <span className="block font-bold">Pengumuman Kos</span>
                <span className={`text-[10px] font-normal block ${activeTenantTab === 'announcements' ? 'text-rose-100' : 'text-gray-400'}`}>Kabar & jadwal fogging</span>
              </div>
            </button>
          </div>

          {/* Active Content Panes on Right */}
          <div className="lg:col-span-9 bg-white border border-[#F5E1E3] rounded-3xl p-6 shadow-3xs text-left min-h-[500px]">
            
            {/* TABS VIEW RENDER */}
            <AnimatePresence mode="wait">
              
              {/* TAB 1: ROOM BLUEPRINT & DEFECT LOG */}
              {activeTenantTab === 'room' && (
                <motion.div
                  key="room-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="space-y-6"
                >
                  <div className="border-b border-gray-100 pb-4">
                    <h3 className="text-lg font-serif font-bold text-gray-950 flex items-center gap-2">
                      <Wrench className="w-5 h-5 text-rose-gold" />
                      <span>Sistem Denah Kamar & Pengaduan Fasilitas</span>
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">Interaksi visual denah kamar Anda 100% mandiri. Klik elemen furnitur di bawah untuk melihat kondisinya, atau ajukan keluhan perbaikan jika terdapat kerusakan.</p>
                  </div>

                  {/* Room Facilities Detail */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#FFFBFB] p-4 rounded-2xl border border-[#F5E1E3]">
                    <div className="p-3 bg-white rounded-xl border border-slate-100">
                      <span className="text-[10px] text-gray-400 block font-semibold">Tipe Kamar</span>
                      <strong className="text-sm text-[#B76E79] font-bold block mt-1">{myRoom?.type === 'AC' ? 'Eksklusif (AC)' : 'Ekonomis'} Room</strong>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-100">
                      <span className="text-[10px] text-gray-400 block font-semibold">Kasur / Bed</span>
                      <strong className="text-xs text-gray-700 font-semibold block mt-1">{myRoom?.type === 'AC' ? 'Springbed Premium' : 'Busa Tebal Single'}</strong>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-100">
                      <span className="text-[10px] text-gray-400 block font-semibold">Suhu Kamar</span>
                      <strong className="text-xs text-gray-700 font-semibold block mt-1">{myRoom?.type === 'AC' ? 'AC Split 0.5 PK' : 'Kipas Angin Dinding'}</strong>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-100">
                      <span className="text-[10px] text-gray-400 block font-semibold">Kamar Mandi</span>
                      <strong className="text-xs text-gray-700 font-semibold block mt-1">Shower (Dalam)</strong>
                    </div>
                  </div>

                  {/* 2D Room Blueprint Render */}
                  <div className="bg-white border text-center p-4 rounded-2xl border-[#F5E1E3] relative shadow-2xs">
                    <TenantRoomBlueprint 
                      roomNumber={loggedInTenant.roomNumber}
                      roomType={myRoom?.type || 'AC'}
                      onReportIssue={(itemName) => {
                        setReportItem(itemName);
                        setReportDesc(`Saya menemukan masalah di unit ${itemName}. Perlu ditinjau pengelola.`);
                        // Highlight form
                        const fieldEl = document.getElementById('report-panel-start');
                        if (fieldEl) fieldEl.scrollIntoView({ behavior: 'smooth' });
                      }}
                    />
                  </div>

                  {/* Maintenance Log Timeline */}
                  <div className="pt-6 border-t border-gray-100">
                    <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3">📋 Riwayat Pengaduan Kamar {loggedInTenant.roomNumber}</h4>
                    
                    <div className="space-y-2 max-h-[220px] overflow-y-auto pr-2 mb-4">
                      {tenantReports.map((rep) => (
                        <div key={rep.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                          <div>
                            <span className="font-bold text-gray-800 block text-left">{rep.item}</span>
                            <span className="text-gray-500 font-light block mt-0.5 text-left">{rep.description}</span>
                            <span className="text-[10px] text-gray-400 block mt-1 text-left">Dilaporkan: {rep.date}</span>
                          </div>
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            rep.status === 'Selesai Dikerjakan' 
                              ? 'bg-emerald-50 text-emerald-800' 
                              : 'bg-amber-50 text-amber-800'
                          }`}>
                            {rep.status}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Complaint Form */}
                    <div id="report-panel-start" className="bg-[#FFF8F8] border border-[#FAD0D4] rounded-2xl p-4 sm:p-5">
                      <span className="text-xs font-bold text-rose-gold block mb-3">Buat Pengaduan Keluhan Kamar Baru:</span>
                      
                      <form 
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (!reportItem || !reportDesc) return;
                          const newReport = {
                            id: 'rep_' + Date.now(),
                            item: reportItem,
                            description: reportDesc,
                            date: 'Hari ini',
                            status: 'Menunggu Teknisi'
                          };
                          const updated = [newReport, ...tenantReports];
                          setTenantReports(updated);
                          localStorage.setItem('griya_ayu_reports', JSON.stringify(updated));
                          setReportItem('');
                          setReportDesc('');
                          setReportSuccess(true);
                          setTimeout(() => setReportSuccess(false), 5000);
                        }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                      >
                        <div>
                          <label className="text-[10px] text-gray-400 font-bold block mb-1">Pilih Item Rusak</label>
                          <input 
                            type="text" 
                            placeholder="Misal: Kran Bocor, Bohlam Mati, AC tidak dingin"
                            required
                            value={reportItem}
                            onChange={(e) => setReportItem(e.target.value)}
                            className="w-full bg-white border border-slate-200 focus:border-rose-gold p-2.5 rounded-lg text-xs outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-gray-400 font-bold block mb-1">Ceritakan Detil Masalah</label>
                          <input 
                            type="text" 
                            placeholder="Sebutkan letak kendala secara singkat..."
                            required
                            value={reportDesc}
                            onChange={(e) => setReportDesc(e.target.value)}
                            className="w-full bg-white border border-slate-200 focus:border-rose-gold p-2.5 rounded-lg text-xs outline-none"
                          />
                        </div>

                        <div className="sm:col-span-2 pt-2 flex flex-wrap gap-2 justify-between items-center">
                          {reportSuccess ? (
                            <span className="text-xs text-emerald-700 font-semibold">✓ Berhasil dikirim! Pengelola akan segera menjadwalkan perbaikan gratis.</span>
                          ) : (
                            <span className="text-[9px] text-gray-400 font-light">Perbaikan dilayani gratis tanpa dipungut biaya apapun bagi penghuni resmi.</span>
                          )}
                          <button 
                            type="submit"
                            className="bg-rose-gold hover:bg-rose-gold-dark text-white text-xs font-semibold py-2 px-4 rounded-xl shadow-sm transition-all cursor-pointer"
                          >
                            Kirim Sinyal Pengaduan Kamar
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 2: BILLING & PAYMENT SIMULATION */}
              {activeTenantTab === 'billing' && (
                <motion.div
                  key="billing-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="space-y-6"
                >
                  <div className="border-b border-gray-100 pb-4 flex flex-wrap justify-between items-center gap-2">
                    <div>
                      <h3 className="text-lg font-serif font-bold text-gray-950 flex items-center gap-2">
                        <ClipboardList className="w-5 h-5 text-rose-gold" />
                        <span>Siklus Pembayaran Sewa Bulanan Anda</span>
                      </h3>
                      <p className="text-xs text-gray-400 mt-1">Lacak histori kuitansi denda/biaya kost, salin rekening transfer, dan unggah konfirmasi transfer mandiri.</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-right font-light text-xs">
                      <span className="text-[9px] text-gray-400 block uppercase">Metode Tagihan</span>
                      <strong className="text-[#B76E79] font-bold">Transfer / Cashless Bank</strong>
                    </div>
                  </div>

                  {/* List of Bills */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    <div className="md:col-span-5 space-y-3">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Daftar Tagihan</span>
                      
                      {tenantBills.map(bill => (
                        <button
                          key={bill.id}
                          onClick={() => {
                            if (bill.status === 'Belum Bayar') {
                              setSelectedBillToPay(bill.id);
                            } else {
                              setSelectedBillToPay(null);
                            }
                          }}
                          className={`w-full text-left p-3.5 rounded-xl border transition-all flex justify-between items-center ${
                            bill.status === 'Belum Bayar'
                              ? selectedBillToPay === bill.id
                                ? 'border-red-300 bg-red-50/50 ring-2 ring-red-400/20'
                                : 'border-red-200 bg-red-50/20 hover:bg-red-50/35'
                              : bill.status === 'Diproses'
                                ? 'border-amber-200 bg-amber-50/30'
                                : 'border-emerald-100 bg-[#F4FCF7] hover:bg-[#EDFAF1]'
                          }`}
                        >
                          <div>
                            <strong className="text-xs sm:text-sm text-gray-900 block font-semibold">{bill.month}</strong>
                            <span className="text-xs text-[#B76E79] font-medium block mt-0.5">Rp {bill.amount.toLocaleString('id-ID')}</span>
                            {bill.payDate && (
                              <span className="text-[9px] text-gray-400 block mt-1 font-light">Lunas terekam: {bill.payDate}</span>
                            )}
                            {bill.senderName && (
                              <span className="text-[9px] text-gray-400 block mt-0.5">Konfirm a.n {bill.senderName}</span>
                            )}
                          </div>

                          <div className="text-right flex flex-col items-end shrink-0">
                            {bill.status === 'Lunas' && (
                              <span className="bg-emerald-50 text-emerald-800 text-[10px] font-extrabold px-2.5 py-1 rounded-md flex items-center space-x-1.5">
                                <Check className="w-3 h-3" />
                                <span>Lunas</span>
                              </span>
                            )}
                            {bill.status === 'Belum Bayar' && (
                              <span className="bg-red-50 text-red-700 text-[10px] font-extrabold px-2.5 py-1 rounded-md animate-pulse">
                                Belum Bayar
                              </span>
                            )}
                            {bill.status === 'Diproses' && (
                              <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2.5 py-1 rounded-md">
                                Diproses
                              </span>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Step-by-Step Payment form */}
                    <div className="md:col-span-7 bg-white border border-slate-150 p-5 rounded-2xl space-y-4 shadow-3xs text-left">
                      
                      {selectedBillToPay ? (
                        <>
                          {/* Found unpaid bill details */}
                          {(() => {
                            const unpaidBill = tenantBills.find(b => b.id === selectedBillToPay);
                            if (!unpaidBill) return null;
                            return (
                              <div className="space-y-4 animate-fade-in">
                                <div className="border-b border-gray-100 pb-3 flex justify-between items-center">
                                  <div>
                                    <span className="text-[9px] text-gray-400 uppercase tracking-widest block">Menyelesaikan Tagihan</span>
                                    <span className="text-sm font-bold text-gray-900 font-serif block">{unpaidBill.month}</span>
                                  </div>
                                  <strong className="text-lg font-bold text-red-650 tracking-tight font-sans text-right block">
                                    Rp {unpaidBill.amount.toLocaleString('id-ID')}
                                  </strong>
                                </div>

                                {/* Step 1: Account details with Salin */}
                                <div className="space-y-2.5">
                                  <span className="text-[10px] uppercase font-bold text-gray-400 block">LANGKAH 1: Transfer Rekening Resmi Kos</span>
                                  
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="bg-[#FFFBFB] p-3 rounded-xl border border-[#FAD0D4] text-left flex justify-between items-center">
                                      <div>
                                        <span className="text-[9px] text-gray-400 block font-semibold uppercase">BANK BCA</span>
                                        <strong className="text-sm font-mono tracking-wide text-gray-900 block mt-0.5">8610 554 222</strong>
                                        <span className="text-[9px] text-gray-500 font-light block">a.n Siti Ayu R</span>
                                      </div>
                                      <button 
                                        onClick={() => triggerCopy('8610554222', 'No Rekening BCA')}
                                        className="text-[10px] p-1 text-rose-gold font-bold hover:underline"
                                      >
                                        Salin
                                      </button>
                                    </div>

                                    <div className="bg-[#FFFBFB] p-3 rounded-xl border border-[#FAD0D4] text-left flex justify-between items-center">
                                      <div>
                                        <span className="text-[9px] text-gray-400 block font-semibold uppercase">BANK MANDIRI</span>
                                        <strong className="text-sm font-mono tracking-wide text-gray-900 block mt-0.5">1360022145999</strong>
                                        <span className="text-[9px] text-gray-500 font-light block">a.n Griya Ayu</span>
                                      </div>
                                      <button 
                                        onClick={() => triggerCopy('1360022145999', 'No Rekening Mandiri')}
                                        className="text-[10px] p-1 text-rose-gold font-bold hover:underline"
                                      >
                                        Salin
                                      </button>
                                    </div>
                                  </div>
                                </div>

                                {/* Step 2: Drag and Drop receipt uploader */}
                                <form onSubmit={(e) => handleConfimPayment(e, unpaidBill.id)} className="space-y-3 pt-2">
                                  <span className="text-[10px] uppercase font-bold text-gray-400 block">LANGKAH 2: Unggah Slip / Bukti Transfer</span>

                                  {/* Drag-and-drop / selector area */}
                                  <div 
                                    onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                                    onDragLeave={() => setIsDragOver(false)}
                                    onDrop={handleFileDrop}
                                    onClick={() => document.getElementById('slip-file-input')?.click()}
                                    className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all duration-300 relative ${
                                      isDragOver 
                                        ? 'border-[#B76E79] bg-[#FFF5F5]' 
                                        : 'border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-slate-400'
                                    }`}
                                  >
                                    <input 
                                      id="slip-file-input"
                                      type="file" 
                                      accept="image/*,application/pdf"
                                      onChange={handleFileSelect}
                                      className="hidden" 
                                    />
                                    
                                    <div className="space-y-1.5 flex flex-col items-center">
                                      <Upload className="w-7 h-7 text-gray-400" />
                                      {selectedFileName ? (
                                        <p className="text-xs text-emerald-700 font-semibold max-w-xs truncate">✓ {selectedFileName}</p>
                                      ) : (
                                        <div className="space-y-1">
                                          <p className="text-xs text-gray-700 font-bold block">Tarik & Lepas file bukti transfer Ke Sini</p>
                                          <p className="text-[10px] text-gray-400 font-light block">Atau click untuk telusuri berkas foto JPG/PNG kuitansi</p>
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  {/* Upload Progress Simulation */}
                                  {isUploadingSlip && (
                                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 space-y-1">
                                      <div className="flex justify-between text-[10px] text-gray-500 font-bold">
                                        <span>Mentransmisikan slip berkas data...</span>
                                        <span>{uploadProgress}%</span>
                                      </div>
                                      <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                                        <div className="bg-emerald-500 h-full transition-all duration-200" style={{ width: `${uploadProgress}%` }} />
                                      </div>
                                    </div>
                                  )}

                                  {/* Sender Details */}
                                  <div className="grid grid-cols-2 gap-3 pt-1">
                                    <div>
                                      <label className="text-[10px] text-gray-400 font-bold block mb-1">Bank Pengirim</label>
                                      <select 
                                        value={paySenderBank} 
                                        onChange={(e) => setPaySenderBank(e.target.value)}
                                        className="w-full bg-slate-50 p-2 border border-slate-200 rounded-lg text-xs outline-none cursor-pointer font-medium"
                                      >
                                        <option value="BCA">BCA</option>
                                        <option value="MANDIRI">MANDIRI</option>
                                        <option value="BRI">BRI</option>
                                        <option value="BNI">BNI</option>
                                        <option value="GOPAY">GOPAY / OVO / Dana</option>
                                      </select>
                                    </div>

                                    <div>
                                      <label className="text-[10px] text-gray-400 font-bold block mb-1">Nama Pemilik Rekening</label>
                                      <input 
                                        type="text" 
                                        required 
                                        placeholder="Contoh: Siska Amelia"
                                        value={paySenderName}
                                        onChange={(e) => setPaySenderName(e.target.value)}
                                        className="w-full bg-slate-50 p-2 border border-slate-200 rounded-lg text-xs outline-none"
                                      />
                                    </div>
                                  </div>

                                  <div className="pt-2">
                                    <button 
                                      type="submit" 
                                      disabled={isUploadingSlip || !selectedFileName}
                                      className={`w-full font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm text-center shadow-sm flex items-center justify-center space-x-1.5 cursor-pointer transition-all ${
                                        selectedFileName && !isUploadingSlip
                                          ? 'bg-rose-gold text-white hover:bg-[#a35e69]'
                                          : 'bg-gray-100 text-gray-400 cursor-not-allowed border'
                                      }`}
                                    >
                                      <span>Kirim Konfirmasi Ke Pemilik Kos</span>
                                    </button>
                                  </div>
                                </form>
                              </div>
                            );
                          })()}
                        </>
                      ) : (
                        <div className="text-center py-24 text-gray-400 text-xs font-light space-y-2 animate-fade-in flex flex-col items-center justify-center">
                          <CheckCircle className="w-10 h-10 text-emerald-500 mb-1" />
                          <strong>✓ Semua Tagihan Lunas Terbayarkan!</strong>
                          <p className="max-w-xs leading-normal">Tidak ada tagihan tertunggak pada bulan ini. Terimakasih telah membayar sewa tepat waktu!</p>
                        </div>
                      )}

                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 3: RULES, WIFI, CODES */}
              {activeTenantTab === 'info' && (
                <motion.div
                  key="info-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="space-y-6"
                >
                  <div className="border-b border-gray-100 pb-4">
                    <h3 className="text-lg font-serif font-bold text-gray-950 flex items-center gap-2">
                      <Lock className="w-5 h-5 text-rose-gold" />
                      <span>Aturan Hunian Resmi & Akses WiFi</span>
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">Panduan praktis menjaga ketertiban, kebersihan dapur bersama, serta detail sandi nirkabel internet kecepatan tinggi.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* WiFi Access details */}
                    <div className="bg-[#FFFBFB] rounded-2xl border border-[#FAD0D4] p-5 space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-rose-gold text-white rounded-lg"><Wifi className="w-4 h-4" /></div>
                        <h4 className="text-xs sm:text-sm font-bold text-gray-900 uppercase">📶 Akses Internet WiFi Kos</h4>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between py-1 border-b border-rose-100">
                          <span className="text-gray-500">SSID Router</span>
                          <strong className="text-gray-800 font-semibold select-all">GriyaAyu_HighSpeed</strong>
                        </div>
                        <div className="flex justify-between py-1 border-b border-rose-100 items-center">
                          <span className="text-gray-500">Password Wi-Fi</span>
                          <strong className="text-gray-800 font-serif font-semibold select-all">ayu27tembalang</strong>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-gray-500">Kapasitas Aliran</span>
                          <span className="text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded">Up to 100 Mbps (Fiber Optic)</span>
                        </div>
                      </div>

                      <div className="pt-2">
                        <button 
                          onClick={() => triggerCopy('ayu27tembalang', 'Sandi Wi-Fi')}
                          className="w-full text-center bg-white border border-[#B76E79] text-[#B76E79] hover:bg-[#FFF2F3] text-xs py-2 px-3 rounded-lg font-semibold transition-colors"
                        >
                          Salin Sandi Wifi
                        </button>
                      </div>
                    </div>

                    {/* Infrastructure PIN Codes */}
                    <div className="bg-[#FFFBFB] rounded-2xl border border-[#FAD0D4] p-5 space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-rose-gold text-white rounded-lg"><Lock className="w-4 h-4" /></div>
                        <h4 className="text-xs sm:text-sm font-bold text-gray-900 uppercase">🔑 Aturan Gerbang Elektronik</h4>
                      </div>

                      <div className="space-y-2 text-xs text-slate-750 font-light leading-normal">
                        <p>1. <strong>Kode PIN Utama saat ini:</strong> <code className="bg-slate-100 px-1 py-0.5 rounded font-bold">*2799#</code>. Gerbang otomatis mendeteksi status PIN.</p>
                        <p>2. Tolong pastikan lubang slot terkunci rapat saat Anda keluar atau masuk sehabis pukul 22.00 WIB malam.</p>
                        <p>3. Guna menjaga keselamatan bersama, dilarang membagikan kode PIN ini kepada ojek online atau kurir logistik!</p>
                      </div>
                    </div>
                  </div>

                  {/* Curfew, Garbage schedules, kitchen guidelines */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-xs text-left">
                    <h4 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wider flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-rose-gold text-amber-800" />
                      <span>Aturan Umum Tata Tertib Rumah Griya Ayu</span>
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-1">
                        <span className="font-bold text-gray-900 block text-sm border-b border-gray-200 pb-1">⏲️ Jadwal Jam Besuk</span>
                        <p className="text-gray-500 font-light leading-normal py-1">
                          Teman/Keluarga perempuan diperbolehkan bertamu hingga pukul 22.00 WIB. Tamu pria mutlak tidak diperkenankan memasuki koridor area kamar demi privasi penghuni.
                        </p>
                      </div>
                      
                      <div className="space-y-1">
                        <span className="font-bold text-gray-900 block text-sm border-b border-gray-200 pb-1">🍳 Tata Dapur Bersama</span>
                        <p className="text-gray-500 font-light leading-normal py-1">
                          Harap bersihkan peralatan makan & panci langsung setelah memasak. Gas kompor disediakan pengelola gratis namun tolong gunakan secukupnya dan matikan setelah usai memasak.
                        </p>
                      </div>

                      <div className="space-y-1">
                        <span className="font-bold text-gray-900 block text-sm border-b border-gray-200 pb-1">🗑️ Kebersihan Sampah</span>
                        <p className="text-gray-500 font-light leading-normal py-1">
                          Petugas sampah keliling kos mengangkut tong sampah kamar setiap hari pukul 07.30 WIB pagi. Taruh bungkusan kantung plastik sampah Anda di luar samping pintu kamar malam sebelumnya.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 4: ANNOUNCEMENTS TIMELINE */}
              {activeTenantTab === 'announcements' && (
                <motion.div
                  key="announcements-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="space-y-6"
                >
                  <div className="border-b border-gray-100 pb-4">
                    <h3 className="text-lg font-serif font-bold text-gray-950 flex items-center gap-2">
                      <Megaphone className="w-5 h-5 text-rose-gold" />
                      <span>Hub Pembaruan & Pemberitahuan Pengurus</span>
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">Informasi resmi langsung dari Ibu Kos seputar pemeliharaan utilitas, fogging kesehatan DBD, hingga siklus token listrik.</p>
                  </div>

                  <div className="space-y-4 text-left">
                    {/* Notice 1 */}
                    <div className="flex gap-4 p-4 rounded-2xl bg-orange-50/50 border border-orange-200">
                      <div className="w-10 h-10 bg-orange-100 text-orange-850 rounded-xl flex items-center justify-center shrink-0">
                        <Megaphone className="w-5 h-5 text-orange-600" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <strong className="text-sm font-bold text-gray-900">Jadwal Fogging Nyamuk Cegah DBD</strong>
                          <span className="text-[9px] bg-orange-200 text-orange-950 px-2 py-0.5 rounded font-extrabold uppercase font-sans">Terbaru</span>
                        </div>
                        <p className="text-xs text-gray-600 font-light leading-relaxed">
                          Diberitahukan kepada seluruh tenant, pengelola akan melaksanakan penyemprotan asap fogging antisipasi DBD di pekarangan, lobi, koridor dan parkiran kos pada tanggal <strong>18 Juni 2026</strong> jam 09.00 - 11.00 WIB pagi. Tolong tutup gorden, pastikan ventilasi kamar diganjal, dan amankan pakaian jemuran. Terimakasih!
                        </p>
                        <span className="text-[10px] text-gray-400 block pt-1 font-mono">Diumumkan: 14 Juni 2026 • Oleh: Ibu Kos Griya Ayu</span>
                      </div>
                    </div>

                    {/* Notice 2 */}
                    <div className="flex gap-4 p-4 rounded-2xl bg-[#FFFBFB] border border-slate-200">
                      <div className="w-10 h-10 bg-sky-50 text-sky-850 rounded-xl flex items-center justify-center shrink-0">
                        <Wrench className="w-5 h-5 text-sky-600" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <strong className="text-sm font-bold text-gray-900">Pipa Jalur Tandon Air Atas Selesai Servis</strong>
                          <span className="text-[9px] bg-[#E1F1FD] text-sky-800 px-2 py-0.5 rounded font-bold uppercase font-sans">Informasi</span>
                        </div>
                        <p className="text-xs text-gray-600 font-light leading-relaxed">
                          Servis pipa pendorong tandon filter utama di atap lantai 3 telah berhasil dikerjakan kemarin siang. Aliran debit air di masing-masing unit kamar mandi dalam kini telah kembali normal 100% kencang dan bening berseri.
                        </p>
                        <span className="text-[10px] text-gray-400 block pt-1 font-mono">Diumumkan: 12 Juni 2026 • Oleh: Teknisi Mandiri</span>
                      </div>
                    </div>

                    {/* Notice 3 */}
                    <div className="flex gap-4 p-4 rounded-2xl bg-[#FFFBFB] border border-slate-200">
                      <div className="w-10 h-10 bg-stone-100 text-stone-850 rounded-xl flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5 text-stone-600" />
                      </div>
                      <div className="space-y-1">
                        <strong className="text-sm font-bold text-gray-900 block">Pengingat Pembayaran Token Prabayar Listrik Kamar</strong>
                        <p className="text-xs text-gray-600 font-light leading-relaxed">
                          Bagi penghuni yang sisa pulsa meteran token listrik kamarnya sudah di bawah 10 kWh (bunyi alarm pager), bisa membeli token PLN prabayar nominal fleksibel bebas di minimarket atau o-banking terdekat demi menghindari padam mendadak di malam hari ya.
                        </p>
                        <span className="text-[10px] text-gray-400 block pt-1 font-mono">Diumumkan: 5 Juni 2026 • Oleh: Pengurus Harian</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>

          </div>

        </div>

      </div>

      {/* Floating alert notifications inside portal */}
      <AnimatePresence>
        {copyToast && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="fixed bottom-6 right-6 z-50 bg-[#FFF5F5] border-2 border-emerald-400 text-emerald-900 p-4 rounded-2xl shadow-xl flex items-center space-x-3 text-xs max-w-sm"
          >
            <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
            <span className="font-bold text-gray-950">{copyToast}</span>
          </motion.div>
        )}

        {paymentSuccessToast && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="fixed bottom-6 left-6 z-50 bg-[#F4FCF7] border border-emerald-400 text-emerald-900 p-5 rounded-2xl shadow-xl flex items-start space-x-3 text-xs max-w-md text-left"
          >
            <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5 animate-bounce" />
            <div>
              <span className="font-serif font-bold text-gray-950 block text-sm">Bukti Pembayaran Terkirim!</span>
              <p className="text-gray-600 mt-1 leading-normal">
                Kuitansi digital berhasil diunggah menuju sistem. Status tagihan Juli berubah menjadi <strong>"Diproses"</strong> dan sedang divalidasi oleh pengawas keuangan Griya Ayu. Silakan cek status secara berkala.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
