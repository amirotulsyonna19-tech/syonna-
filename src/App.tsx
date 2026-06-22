import React, { useState, useMemo, useEffect } from 'react';
import { 
  Home, 
  Menu, 
  X, 
  Check, 
  Phone, 
  Instagram, 
  Copy, 
  MapPin, 
  Wifi, 
  Droplet, 
  Trash2, 
  ShieldAlert, 
  Sparkles, 
  Star, 
  Send, 
  Smartphone, 
  Compass, 
  CheckCircle,
  HelpCircle,
  Clock,
  ExternalLink,
  ChevronRight,
  User,
  LogIn,
  LogOut,
  Lock,
  Settings,
  ClipboardList,
  Wrench,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Room, Review } from './types';
import TenantRoomBlueprint from './components/TenantRoomBlueprint';
import ResidentPortal from './components/ResidentPortal';

// Importing generated images using reference policy
import cozyRoomImg from './assets/images/cozy_kos_room_1780930104103.png';
import kosLobbyImg from './assets/images/kos_lobby_1780930121866.png';

const initialRooms: Room[] = [
  { id: '1', number: '101', type: 'AC', price: 800000, isAvailable: false, floor: 1, facilities: ['Kasur Springbed', 'Air Conditioner (AC)', 'Kamar Mandi Dalam', 'Meja & Kursi', 'Rak Serbaguna', 'Lemari Pakaian'] },
  { id: '2', number: '102', type: 'AC', price: 800000, isAvailable: true, floor: 1, facilities: ['Kasur Springbed', 'Air Conditioner (AC)', 'Kamar Mandi Dalam', 'Meja & Kursi', 'Rak Serbaguna', 'Lemari Pakaian'] },
  { id: '3', number: '103', type: 'Non-AC', price: 700000, isAvailable: false, floor: 1, facilities: ['Kasur Busa Tebal', 'Kipas Angin Dinding', 'Kamar Mandi Dalam', 'Meja Belajar', 'Rak Buku', 'Lemari Pakaian'] },
  { id: '4', number: '104', type: 'AC', price: 800000, isAvailable: true, floor: 1, facilities: ['Kasur Springbed', 'Air Conditioner (AC)', 'Kamar Mandi Dalam', 'Meja & Kursi', 'Rak Serbaguna', 'Lemari Pakaian'] },
  { id: '5', number: '105', type: 'Non-AC', price: 700000, isAvailable: true, floor: 1, facilities: ['Kasur Busa Tebal', 'Kipas Angin Dinding', 'Kamar Mandi Dalam', 'Meja Belajar', 'Rak Buku', 'Lemari Pakaian'] },
  { id: '6', number: '201', type: 'AC', price: 800000, isAvailable: false, floor: 2, facilities: ['Kasur Springbed', 'Air Conditioner (AC)', 'Kamar Mandi Dalam', 'Meja & Kursi', 'Rak Serbaguna', 'Lemari Pakaian'] },
  { id: '7', number: '202', type: 'AC', price: 800000, isAvailable: true, floor: 2, facilities: ['Kasur Springbed', 'Air Conditioner (AC)', 'Kamar Mandi Dalam', 'Meja & Kursi', 'Rak Serbaguna', 'Lemari Pakaian'] },
  { id: '8', number: '203', type: 'Non-AC', price: 700000, isAvailable: false, floor: 2, facilities: ['Kasur Busa Tebal', 'Kipas Angin Dinding', 'Kamar Mandi Dalam', 'Meja Belajar', 'Rak Buku', 'Lemari Pakaian'] },
  { id: '9', number: '204', type: 'Non-AC', price: 700000, isAvailable: true, floor: 2, facilities: ['Kasur Busa Tebal', 'Kipas Angin Dinding', 'Kamar Mandi Dalam', 'Meja Belajar', 'Rak Buku', 'Lemari Pakaian'] },
  { id: '10', number: '205', type: 'AC', price: 800000, isAvailable: false, floor: 2, facilities: ['Kasur Springbed', 'Air Conditioner (AC)', 'Kamar Mandi Dalam', 'Meja & Kursi', 'Rak Serbaguna', 'Lemari Pakaian'] },
  { id: '11', number: '301', type: 'AC', price: 800000, isAvailable: false, floor: 3, facilities: ['Kasur Springbed', 'Air Conditioner (AC)', 'Kamar Mandi Dalam', 'Meja & Kursi', 'Rak Serbaguna', 'Lemari Pakaian'] },
  { id: '12', number: '302', type: 'Non-AC', price: 700000, isAvailable: true, floor: 3, facilities: ['Kasur Busa Tebal', 'Kipas Angin Dinding', 'Kamar Mandi Dalam', 'Meja Belajar', 'Rak Buku', 'Lemari Pakaian'] },
  { id: '13', number: '303', type: 'Non-AC', price: 700000, isAvailable: true, floor: 3, facilities: ['Kasur Busa Tebal', 'Kipas Angin Dinding', 'Kamar Mandi Dalam', 'Meja Belajar', 'Rak Buku', 'Lemari Pakaian'] },
  { id: '14', number: '304', type: 'AC', price: 800000, isAvailable: false, floor: 3, facilities: ['Kasur Springbed', 'Air Conditioner (AC)', 'Kamar Mandi Dalam', 'Meja & Kursi', 'Rak Serbaguna', 'Lemari Pakaian'] },
  { id: '15', number: '305', type: 'Non-AC', price: 700000, isAvailable: true, floor: 3, facilities: ['Kasur Busa Tebal', 'Kipas Angin Dinding', 'Kamar Mandi Dalam', 'Meja Belajar', 'Rak Buku', 'Lemari Pakaian'] },
];

const mockReviews: Review[] = [
  { id: 'r1', name: 'Almira Shafa', rating: 5, text: 'Kosnya bersih banget, air mandi selalu bersih dan mengalir lancar. Lokasinya strategis dekat daerah kampus dan aman, ada CCTV dan penjaga gerbang. Tenang buat belajar kuliah!', status: 'Mahasiswi S1', date: 'Mei 2026' },
  { id: 'r2', name: 'Nabila Putri', rating: 5, text: 'Suka banget sama vibe kosnya yang estetik dan tenang. Ibu kosnya super ramah, suka ngasih camilan kadang-kadang. WiFi-nya kenceng, cocok buat wfh atau ngerjain tugas malem-malem.', status: 'Karyawati Swasta', date: 'April 2026' },
  { id: 'r3', name: 'Dinda Rahma', rating: 4, text: 'Sudah 2 tahun ngekos di sini betah banget. Listrik pakai token sendiri-sendiri jadi gampang diatur pengeluarannya. Keamanan terjamin, khusus putri jadi merasa sangat aman.', status: 'Mahasiswi Pascasarjana', date: 'Maret 2026' }
];

export const PRESET_TENANTS = [
  { name: 'Siska Amelia', phone: '081234567812', roomNumber: '101', avatar: '👩‍🦰', type: 'AC' },
  { name: 'Diana Lestari', phone: '082345678913', roomNumber: '103', avatar: '👩', type: 'Non-AC' },
  { name: 'Amanda Putri', phone: '083456789014', roomNumber: '201', avatar: '👩‍', type: 'AC' },
  { name: 'Vania Clarissa', phone: '084567890123', roomNumber: '205', avatar: '👱‍♀️', type: 'AC' },
  { name: 'Lidya Natalia', phone: '085678901234', roomNumber: '301', avatar: '👩‍⚕️', type: 'AC' },
  { name: 'Fitri Handayani', phone: '086789012345', roomNumber: '304', avatar: '👩‍💼', type: 'AC' }
];

const getFacilityDetail = (name: string) => {
  const norm = name.trim();
  switch (norm) {
    case 'Kasur Springbed':
      return {
        title: 'Kasur Springbed',
        qty: '1 Unit',
        color: 'bg-rose-50/70 border-[#FAD0D4] text-rose-800',
        image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=300&q=80'
      };
    case 'Kasur Busa Tebal':
    case 'Kasur':
      return {
        title: norm,
        qty: '1 Unit',
        color: 'bg-amber-50/75 border-amber-200 text-amber-900',
        image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=300&q=80'
      };
    case 'Air Conditioner (AC)':
      return {
        title: 'AC Hemat Daya',
        qty: '1 Unit',
        color: 'bg-sky-50/70 border-sky-200 text-sky-850',
        image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=300&q=80'
      };
    case 'Kipas Angin Dinding':
    case 'Kipas Angin':
      return {
        title: 'Kipas Angin',
        qty: '1 Unit',
        color: 'bg-emerald-50/70 border-emerald-200 text-emerald-850',
        image: 'https://images.unsplash.com/photo-1591815302525-753a9cbd34df?auto=format&fit=crop&w=300&q=80'
      };
    case 'Kamar Mandi Dalam':
      return {
        title: 'Kamar Mandi Dalam',
        qty: '1 Ruang',
        color: 'bg-blue-50/70 border-blue-200 text-blue-800',
        image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=300&q=80'
      };
    case 'Meja & Kursi':
    case 'Meja Belajar':
      return {
        title: norm,
        qty: '1 Set',
        color: 'bg-amber-50/70 border-amber-200 text-amber-850',
        image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=300&q=80'
      };
    case 'Lemari Pakaian':
    case 'Lemari Pakaian Kayu':
      return {
        title: 'Lemari Pakaian',
        qty: '1 Unit',
        color: 'bg-stone-50/70 border-stone-200 text-stone-850',
        image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=300&q=80'
      };
    case 'Rak Serbaguna':
    case 'Rak Buku':
      return {
        title: norm,
        qty: '1 Unit',
        color: 'bg-indigo-50/70 border-indigo-200 text-indigo-850',
        image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=300&q=80'
      };
    default:
      return {
        title: norm,
        qty: '1 Unit',
        color: 'bg-pink-50/70 border-pink-250 text-[#B76E79]',
        image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=300&q=80'
      };
  }
};

export default function App() {
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Custom states for login & tenant portal (penghuni)
  const [loggedInTenant, setLoggedInTenant] = useState<{ name: string; phone: string; roomNumber: string } | null>(null);

  const [viewMode, setViewMode] = useState<'portal' | 'public'>('public');

  useEffect(() => {
    // Clear any active saved tenant sessions to revert to the initial view mode with no active login
    try {
      localStorage.removeItem('griya_ayu_tenant');
    } catch (e) {
      console.error(e);
    }
  }, []);

  const [activeTenantTab, setActiveTenantTab] = useState<'room' | 'billing' | 'info' | 'announcements'>('room');

  // Dynamic bills log state
  const [tenantBills, setTenantBills] = useState<{ id: string; month: string; amount: number; status: 'Lunas' | 'Belum Bayar' | 'Diproses'; payDate?: string; bankName?: string; senderName?: string; senderBank?: string; checkDigit?: string }[]>(() => {
    try {
      const saved = localStorage.getItem('griya_ayu_bills');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      { id: 'b1', month: 'April 2026', amount: 800000, status: 'Lunas', payDate: '1 April 2026' },
      { id: 'b2', month: 'Mei 2026', amount: 800000, status: 'Lunas', payDate: '1 Mei 2026' },
      { id: 'b3', month: 'Juni 2026', amount: 800000, status: 'Lunas', payDate: '1 Juni 2026' },
      { id: 'b4', month: 'Juli 2026', amount: 800000, status: 'Belum Bayar' }
    ];
  });

  // Upload simulation states
  const [selectedBillToPay, setSelectedBillToPay] = useState<string | null>(null);
  const [paySenderBank, setPaySenderBank] = useState('BCA');
  const [paySenderName, setPaySenderName] = useState('');
  const [isUploadingSlip, setIsUploadingSlip] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [paymentSuccessToast, setPaymentSuccessToast] = useState(false);
  
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginName, setLoginName] = useState('');
  const [loginPhone, setLoginPhone] = useState('');
  const [loginRoom, setLoginRoom] = useState('101');
  const [loginError, setLoginError] = useState('');

  // Local maintenance tickets log
  const [tenantReports, setTenantReports] = useState<{ id: string; item: string; description: string; date: string; status: string }[]>(() => {
    try {
      const saved = localStorage.getItem('griya_ayu_reports');
      return saved ? JSON.parse(saved) : [
        { id: 'rep1', item: 'Air Conditioner (AC)', description: 'AC kurang dingin di siang hari', date: '12 Juni 2026', status: 'Selesai Dikerjakan' }
      ];
    } catch {
      return [
        { id: 'rep1', item: 'Air Conditioner (AC)', description: 'AC kurang dingin di siang hari', date: '12 Juni 2026', status: 'Selesai Dikerjakan' }
      ];
    }
  });

  const [reportItem, setReportItem] = useState('');
  const [reportDesc, setReportDesc] = useState('');
  const [reportSuccess, setReportSuccess] = useState(false);

  // Sync room occupancy when a tenant is logged in & dynamic billing rates alignment
  useEffect(() => {
    if (loggedInTenant) {
      // Find room price dynamically to update bills
      const roomObj = rooms.find(r => r.number === loggedInTenant.roomNumber);
      const roomPrice = roomObj ? roomObj.price : 800000;
      
      setRooms(prev => prev.map(r => {
        if (r.number === loggedInTenant.roomNumber) {
          return { ...r, isAvailable: false };
        }
        return r;
      }));

      setTenantBills(prev => {
        const updated = prev.map(bill => {
          if (bill.amount !== roomPrice) {
            return { ...bill, amount: roomPrice };
          }
          return bill;
        });
        localStorage.setItem('griya_ayu_bills', JSON.stringify(updated));
        return updated;
      });
    }
  }, [loggedInTenant, rooms]);

  // Custom states for interactions
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [filterFloor, setFilterFloor] = useState<number | 'all'>('all');
  const [filterType, setFilterType] = useState<'AC' | 'Non-AC' | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'available' | 'occupied'>('all');
  
  // Contact and notifications
  const [ownerWhatsapp] = useState('6281234567890'); // Owner WhatsApp Phone Number
  const [copyToastVisible, setCopyToastVisible] = useState(false);
  const [bookingModalVisible, setBookingModalVisible] = useState<Room | null>(null);
  const [contactName, setContactName] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);
  const [socialToastText, setSocialToastText] = useState<string | null>(null);

  // Address constant
  const fullAddress = "Jl. Menur Indah Gg. Ayu No. 27, Tembalang, Kota Semarang, Jawa Tengah (Dekat Kampus Undip)";
  const mockMapsUrl = "https://maps.google.com/maps?q=Politeknik%20Negeri%20Semarang&t=&z=15&ie=UTF8&iwloc=&output=embed";

  // Calculations for dynamic dashboard states
  const totalRoomsCount = rooms.length;
  const availableRoomsCount = useMemo(() => rooms.filter(r => r.isAvailable).length, [rooms]);

  // Filtered rooms logic
  const filteredRooms = useMemo(() => {
    return rooms.filter(room => {
      const matchFloor = filterFloor === 'all' || room.floor === filterFloor;
      const matchType = filterType === 'all' || room.type === filterType;
      const matchStatus = filterStatus === 'all' || 
        (filterStatus === 'available' && room.isAvailable) || 
        (filterStatus === 'occupied' && !room.isAvailable);
      return matchFloor && matchType && matchStatus;
    });
  }, [rooms, filterFloor, filterType, filterStatus]);

  // Trigger copy address
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopyToastVisible(true);
    setTimeout(() => setCopyToastVisible(false), 3000);
  };

  // Switch room availability for UI demonstration & interaction
  const toggleRoomStatus = (roomId: string) => {
    setRooms(prev => prev.map(room => {
      if (room.id === roomId) {
        return { ...room, isAvailable: !room.isAvailable };
      }
      return room;
    }));
    // Also update selectedRoom view if visible
    if (selectedRoom && selectedRoom.id === roomId) {
      setSelectedRoom(prev => prev ? { ...prev, isAvailable: !prev.isAvailable } : null);
    }
  };

  const handleWhatsappBooking = (roomNum: string, type: string) => {
    const textTemplate = `Halo Pengelola Kos Putri Griya Ayu, saya tertarik ingin memesan Kamar ${roomNum} tipe ${type}. Apakah kamar tersebut masih tersedia?`;
    const encodedText = encodeURIComponent(textTemplate);
    const waUrl = `https://wa.me/${ownerWhatsapp}?text=${encodedText}`;
    window.open(waUrl, '_blank', 'noreferrer');
  };

  const handleGeneralWhatsappBooking = (type: 'AC' | 'Non-AC') => {
    const textTemplate = `Halo Pengelola Kos Putri Griya Ayu, saya tertarik ingin berkonsultasi untuk memesan kamar tipe ${type}. Terimakasih!`;
    const encodedText = encodeURIComponent(textTemplate);
    const waUrl = `https://wa.me/${ownerWhatsapp}?text=${encodedText}`;
    window.open(waUrl, '_blank', 'noreferrer');
  };

  const handleSocialClick = (platform: string, username: string) => {
    setSocialToastText(`Membuka profil ${platform} ${username}...`);
    setTimeout(() => setSocialToastText(null), 3000);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactMsg) return;
    setFormSuccess(true);
    setTimeout(() => {
      setFormSuccess(false);
      setContactName('');
      setContactMsg('');
    }, 4500);
  };

  return (
    <div className="min-h-screen bg-[#FFFBFB] text-gray-800 font-sans relative overflow-x-hidden selection:bg-[#FFDFDF] selection:text-[#9C5560]" id="home">
      {/* 1. HEADER & NAVBAR */}
      <nav id="navbar" className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#F5E1E3] transition-all duration-300 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-[#B76E79] flex items-center justify-center text-white font-serif font-semibold text-lg shadow-sm">
                G
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-serif font-bold text-gray-900 tracking-tight block">
                  Kos Putri <span className="text-rose-gold">Griya Ayu</span>
                </span>
                <span className="text-[10px] uppercase tracking-wider text-rose-gold font-medium -mt-1 block">
                  Hunian Nyaman Khusus Putri
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {loggedInTenant && viewMode === 'portal' ? (
                <>
                  <button 
                    onClick={() => setActiveTenantTab('room')}
                    className={`font-semibold text-sm cursor-pointer transition-colors py-1 py-1.5 relative ${activeTenantTab === 'room' ? 'text-rose-gold' : 'text-gray-600 hover:text-rose-gold'}`}
                  >
                    <span>Kamar Saya</span>
                    {activeTenantTab === 'room' && <motion.div layoutId="nav-line" className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-gold" />}
                  </button>
                  <button 
                    onClick={() => setActiveTenantTab('billing')}
                    className={`font-semibold text-sm cursor-pointer transition-colors py-1 py-1.5 relative ${activeTenantTab === 'billing' ? 'text-rose-gold' : 'text-gray-600 hover:text-rose-gold'}`}
                  >
                    <span>Tagihan Sewa</span>
                    {activeTenantTab === 'billing' && <motion.div layoutId="nav-line" className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-gold" />}
                  </button>
                  <button 
                    onClick={() => setActiveTenantTab('info')}
                    className={`font-semibold text-sm cursor-pointer transition-colors py-1 py-1.5 relative ${activeTenantTab === 'info' ? 'text-rose-gold' : 'text-gray-600 hover:text-rose-gold'}`}
                  >
                    <span>Aturan & Wi-Fi</span>
                    {activeTenantTab === 'info' && <motion.div layoutId="nav-line" className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-gold" />}
                  </button>
                  <button 
                    onClick={() => setActiveTenantTab('announcements')}
                    className={`font-semibold text-sm cursor-pointer transition-colors py-1 py-1.5 relative ${activeTenantTab === 'announcements' ? 'text-rose-gold' : 'text-gray-600 hover:text-rose-gold'}`}
                  >
                    <span>Pengumuman</span>
                    {activeTenantTab === 'announcements' && <motion.div layoutId="nav-line" className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-gold" />}
                  </button>

                  <button 
                    onClick={() => setViewMode('public')}
                    className="bg-[#FFF0F1] border border-[#FAD0D4] text-rose-gold px-4 py-2 rounded-full font-bold shadow-2xs hover:bg-[#FFE0E3] transition-all duration-300 text-xs flex items-center space-x-1.5 cursor-pointer"
                  >
                    <span>🌐 Beranda Publik</span>
                  </button>
                </>
              ) : (
                <>
                  <a href="#home" className="text-gray-600 hover:text-rose-gold font-medium transition-colors">Dashboard</a>
                  <a href="#peta-kamar" className="text-gray-600 hover:text-rose-gold font-medium transition-colors">Status Kamar</a>
                  <a href="#fasilitas-harga" className="text-gray-600 hover:text-rose-gold font-medium transition-colors">Fasilitas & Harga</a>
                  <a href="#testimoni" className="text-gray-600 hover:text-rose-gold font-medium transition-colors">Testimoni</a>
                  <a href="#kontak" className="text-gray-600 hover:text-rose-gold font-medium transition-colors">Narahubung</a>
                  
                  {loggedInTenant ? (
                    <button 
                      onClick={() => setViewMode('portal')}
                      className="bg-[#FFF0F1] border border-[#FAD0D4] text-rose-gold px-4 py-1.5 rounded-full font-bold shadow-2xs hover:bg-[#FFE0E3] transition-all duration-300 text-xs flex items-center space-x-1.5 cursor-pointer"
                    >
                      <User className="w-3.5 h-3.5 animate-pulse" />
                      <span>Masuk Portal Kamar {loggedInTenant.roomNumber}</span>
                    </button>
                  ) : (
                    <button 
                      onClick={() => setLoginModalOpen(true)}
                      className="border border-[#B76E79] text-[#B76E79] px-4 py-1.5 rounded-full font-semibold shadow-2xs hover:bg-[#FFF5F5] transition-all duration-300 text-xs flex items-center space-x-1.5 cursor-pointer"
                    >
                      <LogIn className="w-3.5 h-3.5" />
                      <span>Login Penghuni</span>
                    </button>
                  )}
                </>
              )}

              <a 
                href={`https://wa.me/${ownerWhatsapp}`} 
                target="_blank" 
                rel="noreferrer"
                className="bg-rose-gold text-white px-5 py-2.5 rounded-full font-medium shadow-sm hover:bg-rose-gold-dark transition-all duration-300 text-xs flex items-center space-x-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Tanya Pemilik</span>
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                id="mobile-menu-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                className="text-gray-500 hover:text-rose-gold focus:outline-none p-2"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              id="mobile-menu-drawer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-white border-b border-[#F5E1E3] overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-3">
                {loggedInTenant && viewMode === 'portal' ? (
                  <>
                    <div className="px-3 py-1.5 bg-[#FFF0F1] rounded-lg text-rose-gold text-xs font-bold text-center">
                      💼 PORTAL KAMAR {loggedInTenant.roomNumber}
                    </div>
                    <button 
                      onClick={() => {
                        setActiveTenantTab('room');
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full text-left block px-3 py-2.5 rounded-lg font-medium transition-colors ${activeTenantTab === 'room' ? 'bg-[#FFE0E3] text-[#B76E79] font-bold' : 'text-gray-700 hover:bg-[#FFF5F5]'}`}
                    >
                      Kamar Saya & Denah
                    </button>
                    <button 
                      onClick={() => {
                        setActiveTenantTab('billing');
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full text-left block px-3 py-2.5 rounded-lg font-medium transition-colors ${activeTenantTab === 'billing' ? 'bg-[#FFE0E3] text-[#B76E79] font-bold' : 'text-gray-700 hover:bg-[#FFF5F5]'}`}
                    >
                      Tagihan & Pembayaran
                    </button>
                    <button 
                      onClick={() => {
                        setActiveTenantTab('info');
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full text-left block px-3 py-2.5 rounded-lg font-medium transition-colors ${activeTenantTab === 'info' ? 'bg-[#FFE0E3] text-[#B76E79] font-bold' : 'text-gray-700 hover:bg-[#FFF5F5]'}`}
                    >
                      Aturan & Wi-Fi Kos
                    </button>
                    <button 
                      onClick={() => {
                        setActiveTenantTab('announcements');
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full text-left block px-3 py-2.5 rounded-lg font-medium transition-colors ${activeTenantTab === 'announcements' ? 'bg-[#FFE0E3] text-[#B76E79] font-bold' : 'text-gray-700 hover:bg-[#FFF5F5]'}`}
                    >
                      Pengumuman Pengurus
                    </button>

                    <div className="border-t border-gray-100 pt-2 flex flex-col gap-2">
                      <button 
                        onClick={() => {
                          setViewMode('public');
                          setMobileMenuOpen(false);
                        }}
                        className="w-full text-center bg-gray-50 border border-gray-200 text-gray-750 py-2 rounded-xl text-xs font-bold flex items-center justify-center space-x-1"
                      >
                        <span>🌐 Buka Catalog Publik</span>
                      </button>
                      
                      <button 
                        onClick={() => {
                          setMobileMenuOpen(false);
                          const confirmLogout = window.confirm('Apakah Anda yakin ingin keluar dari Portal?');
                          if (confirmLogout) {
                            localStorage.removeItem('griya_ayu_tenant');
                            setLoggedInTenant(null);
                            setViewMode('public');
                          }
                        }}
                        className="w-full text-center bg-[#FFF0F1] text-[#B76E79] py-2 rounded-xl text-xs font-bold flex items-center justify-center space-x-1"
                      >
                        <span>🚪 Log Out Sesi</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <a 
                      href="#home" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2.5 rounded-lg text-gray-700 hover:bg-[#FFF5F5] hover:text-rose-gold font-medium transition-colors"
                    >
                      Dashboard Beranda
                    </a>
                    
                    {loggedInTenant ? (
                      <button 
                        onClick={() => {
                          setViewMode('portal');
                          setMobileMenuOpen(false);
                        }}
                        className="w-full text-left block px-3 py-2.5 rounded-lg bg-[#FFF0F1] text-[#B76E79] hover:bg-[#FFE0E3] font-bold transition-all flex items-center space-x-2 text-sm"
                      >
                        <User className="w-4 h-4 text-rose-gold animate-pulse" />
                        <span>Buka Portal Kamar {loggedInTenant.roomNumber} ({loggedInTenant.name})</span>
                      </button>
                    ) : (
                      <button 
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setLoginModalOpen(true);
                        }}
                        className="w-full text-left block px-3 py-2.5 rounded-lg border-2 border-rose-gold text-rose-gold hover:bg-[#FFF5F5] font-bold transition-all flex items-center space-x-2 cursor-pointer text-sm"
                      >
                        <LogIn className="w-4 h-4 text-rose-gold" />
                        <span>Login Penghuni</span>
                      </button>
                    )}

                    <a 
                      href="#peta-kamar" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2.5 rounded-lg text-gray-700 hover:bg-[#FFF5F5] hover:text-rose-gold font-medium transition-colors"
                    >
                      Status Kamar (Peta Interaktif)
                    </a>
                    <a 
                      href="#fasilitas-harga" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2.5 rounded-lg text-gray-700 hover:bg-[#FFF5F5] hover:text-rose-gold font-medium transition-colors"
                    >
                      Fasilitas & Harga
                    </a>
                    <a 
                      href="#testimoni" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2.5 rounded-lg text-gray-700 hover:bg-[#FFF5F5] hover:text-rose-gold font-medium transition-colors"
                    >
                      Testimoni
                    </a>
                    <a 
                      href="#kontak" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2.5 rounded-lg text-gray-700 hover:bg-[#FFF5F5] hover:text-rose-gold font-medium transition-colors"
                    >
                      Narahubung
                    </a>
                    <div className="pt-2 px-3">
                      <a 
                        href={`https://wa.me/${ownerWhatsapp}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="w-full bg-rose-gold text-white py-3 px-4 rounded-xl font-medium shadow-md flex items-center justify-center space-x-2"
                      >
                        <Phone className="w-4 h-4" />
                        <span>Hubungi Via WhatsApp</span>
                      </a>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {loggedInTenant && viewMode === 'portal' ? (
        <ResidentPortal 
          loggedInTenant={loggedInTenant}
          onLogout={() => {
            const confirmLogout = window.confirm('Apakah Anda yakin ingin keluar dari Portal?');
            if (confirmLogout) {
              localStorage.removeItem('griya_ayu_tenant');
              setLoggedInTenant(null);
              setViewMode('public');
            }
          }}
          rooms={rooms}
          ownerWhatsapp={ownerWhatsapp}
          tenantReports={tenantReports}
          setTenantReports={setTenantReports}
          tenantBills={tenantBills}
          setTenantBills={setTenantBills}
          activeTenantTab={activeTenantTab}
          setActiveTenantTab={setActiveTenantTab}
          setViewMode={setViewMode}
          fullAddress={fullAddress}
          getFacilityDetail={getFacilityDetail}
        />
      ) : (
        <>
          {loggedInTenant && viewMode === 'public' && (
            <div id="session-active-ribbon" className="bg-[#FFF0F1] border-b border-[#FAD0D4] text-[#B76E79] py-3 px-4 text-center text-xs font-semibold flex items-center justify-center space-x-2.5 shadow-2xs animate-fade-in relative z-20">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse pointer-events-none" />
                <span>Sesi Kamar <strong>{loggedInTenant.roomNumber}</strong> ({loggedInTenant.name}) Sedang Berjalan.</span>
              </span>
              <button 
                onClick={() => setViewMode('portal')}
                className="bg-rose-gold text-white px-3 py-1 rounded-lg text-[10px] font-bold shadow-2xs hover:bg-[#a35e69] transition-all cursor-pointer"
              >
                Masuk Portal Tenant
              </button>
              <button 
                onClick={() => {
                  const confirmLogout = window.confirm('Apakah Anda yakin ingin keluar dari Portal?');
                  if (confirmLogout) {
                    localStorage.removeItem('griya_ayu_tenant');
                    setLoggedInTenant(null);
                    setViewMode('public');
                  }
                }}
                className="text-gray-500 hover:text-red-700 underline text-[10px] cursor-pointer ml-1"
              >
                Log Out
              </button>
            </div>
          )}

          {false && (
            <AnimatePresence>
              {loggedInTenant && (
                <motion.section 
                  id="portal-penghuni"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-white border-b border-[#FAD0D4] py-12 scroll-mt-20"
                >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-[#FFF8F8] border-2 border-[#FAD0D4] rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xs">
                
                {/* Decorative overlay stamp */}
                <div className="absolute top-4 right-4 text-red-100/50 uppercase transform rotate-12 font-serif font-black text-6xl select-none pointer-events-none hidden sm:block">
                  AKTIF
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#F5D5D9]">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-[#B76E79] text-white flex items-center justify-center shadow-md border-4 border-white shrink-0">
                      <User className="w-7 h-7" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] borer border-[#FAD0D4] bg-white text-[#B76E79] px-2.5 py-0.5 rounded-md font-bold uppercase tracking-wider">
                          Kartu Anggota Digital
                        </span>
                        <span className="inline-flex items-center space-x-1 bg-emerald-50 text-emerald-800 py-0.5 px-2.5 rounded-full text-[10px] font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span>Tenant Aktif</span>
                        </span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 mt-1">Hello, {loggedInTenant.name} 👋</h2>
                      <p className="text-xs text-gray-500 font-light mt-0.5">Sistem Monitoring Kamar & Fasilitas Mandiri - Kos Putri Griya Ayu</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button 
                      onClick={() => {
                        const confirmLogout = window.confirm('Apakah Anda yakin ingin keluar dari Portal Penghuni?');
                        if (confirmLogout) {
                          localStorage.removeItem('griya_ayu_tenant');
                          setLoggedInTenant(null);
                        }
                      }}
                      className="bg-[#FFF0F1] border border-[#FAD0D4] text-[#B76E79] hover:bg-rose-50 px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out dari Portal</span>
                    </button>
                  </div>
                </div>

                {/* Grid for details and actions */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6">
                  {/* Digital Pass Card */}
                  <div className="md:col-span-4 bg-white border border-[#F5E1E3] rounded-2xl p-5 shadow-inner space-y-4">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block">Kartu Hunian</span>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-xs pb-2 border-b border-gray-100">
                        <span className="text-gray-400 font-medium">Nama Penghuni</span>
                        <strong className="text-gray-900 font-semibold">{loggedInTenant.name}</strong>
                      </div>
                      <div className="flex justify-between text-xs pb-2 border-b border-gray-100">
                        <span className="text-gray-400 font-medium">No. WhatsApp/HP</span>
                        <strong className="text-gray-900 font-mono font-medium">{loggedInTenant.phone}</strong>
                      </div>
                      <div className="flex justify-between text-xs pb-2 border-b border-gray-100">
                        <span className="text-gray-400 font-medium">Nomor Kamar</span>
                        <strong className="text-rose-gold font-bold">Room {loggedInTenant.roomNumber}</strong>
                      </div>
                      <div className="flex justify-between text-xs pb-2 border-b border-gray-100">
                        <span className="text-gray-400 font-medium">Kode PIN Gerbang</span>
                        <strong className="text-gray-900 font-mono tracking-widest bg-slate-100 px-1.5 py-0.5 rounded select-all" title="Klik untuk salin">
                          🔑 *2799#
                        </strong>
                      </div>
                      <div className="flex justify-between text-xs pb-2 border-b border-gray-100">
                        <span className="text-gray-400 font-medium">Siklus Sewa</span>
                        <span className="text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 rounded-full text-[10px]">Tiap Tanggal 1</span>
                      </div>
                    </div>

                    {/* Support Button */}
                    <div className="pt-2 bg-[#FFFDFD] p-3 rounded-lg border border-dashed border-[#FAD0D4] space-y-2">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Butuh bantuan pengelola?</span>
                      <a 
                        href={`https://wa.me/${ownerWhatsapp}?text=Halo%20Ibu%2520Kos%2C%20saya%20penghuni%20Kamar%20${loggedInTenant.roomNumber}%20(${loggedInTenant.name}).%20Ingin%20bertanya`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full text-center bg-rose-gold text-white text-xs py-2 px-3 rounded-lg font-semibold shadow-2xs hover:bg-rose-gold-dark transition-all block"
                      >
                        📞 Kontak WhatsApp CS Kos
                      </a>
                    </div>
                  </div>

                  {/* MAINTENANCE OR PROBLEM CORNER */}
                  <div className="md:col-span-8 bg-white border border-[#F5E1E3] rounded-2xl p-5 shadow-xs space-y-4">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block flex items-center justify-between">
                      <span>🔧 Laporan Pemeliharaan Kamar ({loggedInTenant.roomNumber})</span>
                      <span className="text-[10px] bg-sky-50 text-sky-850 px-2 py-0.5 rounded-full lowercase font-light italic">
                        dilayani dalam 1x24 jam
                      </span>
                    </span>

                    {/* Log of reports */}
                    <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
                      {tenantReports.map((rep) => (
                        <div key={rep.id} className="flex justify-between items-start p-2.5 bg-slate-50/70 rounded-xl border border-slate-100 text-xs text-left">
                          <div>
                            <span className="font-bold text-gray-800 block">{rep.item}</span>
                            <span className="text-gray-500 font-light block mt-0.5">{rep.description}</span>
                            <span className="text-[10px] text-gray-400 block mt-1">{rep.date}</span>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-[10px] font-semibold ${
                            rep.status === 'Selesai Dikerjakan' 
                              ? 'bg-emerald-50 text-emerald-800' 
                              : 'bg-amber-50 text-amber-800'
                          }`}>
                            {rep.status}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Submit local report form */}
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
                        setTimeout(() => setReportSuccess(false), 4000);
                      }}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-gray-100 animate-fade-in"
                    >
                      <div>
                        <label className="text-[10px] text-gray-400 font-bold block mb-1">Nama Fasilitas</label>
                        <input 
                          type="text" 
                          placeholder="Misal: Kran Kamar Mandi, Lampu, AC"
                          required
                          value={reportItem}
                          onChange={(e) => setReportItem(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 focus:border-rose-gold p-2.5 rounded-lg text-xs outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-400 font-bold block mb-1">Detail Masalah / Keluhan</label>
                        <input 
                          type="text" 
                          placeholder="Sebutkan kendala teknis secara singkat..."
                          required
                          value={reportDesc}
                          onChange={(e) => setReportDesc(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 focus:border-rose-gold p-2.5 rounded-lg text-xs outline-none"
                        />
                      </div>
                      <div className="sm:col-span-2 pt-1 flex flex-wrap gap-2 justify-between items-center text-left">
                        {reportSuccess ? (
                          <span className="text-xs text-emerald-700 font-semibold">✓ Keluhan terkirim. Pengelola segera merespons!</span>
                        ) : (
                          <span className="text-[9px] text-gray-400">Teknis perbaikan dilayani gratis tanpa biaya tambahan bagi penghuni.</span>
                        )}
                        <button 
                          type="submit"
                          className="bg-rose-gold hover:bg-rose-gold-dark text-white text-xs font-semibold py-1.5 px-3 rounded-lg shadow-sm transition-all cursor-pointer"
                        >
                          Kirim Pengaduan Kamar
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                {/* DETAILED INTERACTIVE BLUEPRINT FOR USER ROOM */}
                <div className="mt-8 pt-8 border-t-2 border-dashed border-[#FAD0D4]">
                  <div className="mb-4 text-left">
                    <h3 className="text-lg font-serif font-bold text-gray-900 flex items-center gap-1.5">
                      <MapPin className="w-5 h-5 text-rose-gold" />
                      <span>Denah Interior Kamar Pribadi Anda — Room {loggedInTenant.roomNumber}</span>
                    </h3>
                    <p className="text-xs text-gray-500 font-light">Gunakan denah terperinci di bawah ini untuk melihat kondisi perabot bawaan Anda.</p>
                  </div>
                  
                  <TenantRoomBlueprint 
                    roomNumber={loggedInTenant.roomNumber}
                    roomType={rooms.find(r => r.number === loggedInTenant.roomNumber)?.type || 'AC'}
                    onReportIssue={(itemName) => {
                      setReportItem(itemName);
                      setReportDesc(`Kerusakan pada unit ${itemName}, perlu perbaikan segera.`);
                      const section = document.getElementById('portal-penghuni');
                      if (section) {
                        section.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  />
                </div>

              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
      )}
      </>
      )}

      {(!loggedInTenant || viewMode === 'public') && (
        <>
          {/* 2. DASHBOARD / HERO SECTION */}
          <section className="relative overflow-hidden pt-6 pb-16 sm:py-20 lg:py-24">
        {/* Decorative ambient background glows */}
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-[#FFE5E8] opacity-50 blur-3xl -z-10" />
        <div className="absolute bottom-20 right-10 w-[350px] h-[350px] rounded-full bg-[#FFEAE5] opacity-40 blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
            {/* Hero text */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-center lg:text-left">
              <div id="hero-badge" className="inline-flex items-center space-x-2 bg-[#FFF0F1] border border-[#FAD0D4] text-[#B76E79] px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mx-auto lg:mx-0">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Kost Putri Eksklusif Tembalang</span>
              </div>
              
              <h1 id="hero-title" className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-gray-900 tracking-tight leading-tight">
                Hunian Modern, <br className="hidden sm:inline" />
                <span className="text-rose-gold relative inline-block">
                  Aman & Nyaman
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#FFDFDF]" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0,5 Q50,10 100,5" stroke="currentColor" strokeWidth="4" fill="none" />
                  </svg>
                </span> <br className="sm:hidden" />Khusus Putri
              </h1>

              <p id="hero-desc" className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                Griya Ayu menawarkan kost bersih, aman, tenang, dan kondusif untuk mahasiswi maupun karyawati. Lokasi strategis, fasilitas lengkap, serta lingkungan yang akrab dan aman terjaga penuh.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a 
                  href="#peta-kamar" 
                  className="w-full sm:w-auto text-center bg-rose-gold text-white px-8 py-3.5 rounded-full font-medium shadow-md hover:bg-rose-gold-dark transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  Cek Ketersediaan Kamar
                </a>
                <a 
                  href="#fasilitas-harga" 
                  className="w-full sm:w-auto text-center bg-white text-gray-700 border border-[#E9C8CE] hover:border-rose-gold px-8 py-3.5 rounded-full font-medium shadow-xs hover:bg-[#FFFBFB] transition-all duration-300"
                >
                  Lihat Fasilitas & Harga
                </a>
              </div>

              {/* Quick Trust Highlights */}
              <div id="hero-highlights" className="pt-6 border-t border-[#F5D5D9] grid grid-cols-3 gap-4 text-center lg:text-left">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-[#B76E79]">98%</div>
                  <div className="text-xs text-gray-500 mt-1">Betah & Puas</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-[#B76E79]">24 Jam</div>
                  <div className="text-xs text-gray-500 mt-1">Keamanan CCTV</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-[#B76E79]">100%</div>
                  <div className="text-xs text-gray-500 mt-1 font-sans">Khusus Putri</div>
                </div>
              </div>
            </div>

            {/* Hero Visual Card Carousel / Grid */}
            <div className="lg:col-span-6 mt-12 lg:mt-0 relative">
              <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden shadow-xl border-4 border-white transform rotate-1 hover:rotate-0 transition-transform duration-500 z-10">
                <img 
                  id="hero-main-img"
                  src={cozyRoomImg} 
                  alt="Kamar Kos Putri Griya Ayu" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-6 text-white">
                  <span className="bg-[#B76E79] text-xs px-2.5 py-1 rounded-md font-semibold mb-2 inline-block">Contoh Kamar AC</span>
                  <p className="text-sm font-sans opacity-95">Desain kamar minimalis, rapi, dan mudah dibersihkan.</p>
                </div>
              </div>

              {/* Smaller overlapping design card */}
              <div className="absolute -bottom-8 -left-8 w-1/2 rounded-xl overflow-hidden shadow-lg border-4 border-white transform -rotate-3 hover:rotate-0 transition-transform duration-500 hidden sm:block z-20">
                <img 
                  id="hero-lobby-img"
                  src={kosLobbyImg} 
                  alt="Lobi Bersama Griya Ayu" 
                  className="w-full h-40 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="bg-white p-3">
                  <p className="text-xs font-semibold text-gray-900">Area Bersama & Lobi</p>
                  <p className="text-[10px] text-gray-500">Nyaman & Bersih</p>
                </div>
              </div>

              {/* Availability bubble indicator */}
              <div className="absolute -top-4 -right-4 bg-white border border-[#F5E1E3] rounded-2xl p-4 shadow-md flex items-center space-x-3 z-30 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <div>
                  <div className="text-xs text-gray-500 font-medium">Kamar Tersedia</div>
                  <div className="text-sm font-bold text-gray-900">{availableRoomsCount} / {totalRoomsCount} Unit</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DASHBOARD STATS & MAPS CARD SECTION */}
      <section className="bg-[#FFF5F6] py-12 border-y border-[#F5E1E3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-10">
            <h2 className="text-sm font-bold uppercase tracking-wider text-rose-gold">Ringkasan Kos</h2>
            <p className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mt-2">Daftar Informasi Utama</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Visual Cards Grid for metadata info */}
            <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Card Total Kamar */}
              <div className="bg-white p-5 rounded-2xl border border-[#F5E1E3] shadow-xs flex items-start space-x-4">
                <div className="bg-[#FFF0F1] p-3 rounded-xl text-[#B76E79]">
                  <Home className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-gray-500 font-medium block">Total Kapasitas</span>
                  <span className="text-xl font-bold text-gray-900 block mt-0.5">{totalRoomsCount} Kamar</span>
                  <span className="text-xs text-gray-400 mt-1 block">Tersedia per Lapis Lantai 1-3</span>
                </div>
              </div>

              {/* Card Kamar Tersedia */}
              <div className="bg-white p-5 rounded-2xl border border-[#F5E1E3] shadow-xs flex items-start space-x-4">
                <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-gray-500 font-medium block">Status Terkini</span>
                  <span className="text-xl font-bold text-emerald-600 block mt-0.5">{availableRoomsCount} Kamar Kosong</span>
                  <span className="text-xs text-gray-500 bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-1 font-medium">Bisa Dipesan</span>
                </div>
              </div>

              {/* Card Free Include */}
              <div className="bg-white p-5 rounded-2xl border border-[#F5E1E3] shadow-xs sm:col-span-2">
                <span className="text-xs text-gray-500 font-semibold block uppercase tracking-wider mb-3">Fasilitas Gratis (Include Bulanan)</span>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-700">
                    <Wifi className="w-4 h-4 text-rose-gold text-emerald-500" />
                    <span>Free Wi-Fi Kencang</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-700">
                    <Droplet className="w-4 h-4 text-emerald-500" />
                    <span>Air Bersih Berlimpah</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-700">
                    <Trash2 className="w-4 h-4 text-emerald-500" />
                    <span>Kebersihan & Sampah</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-700">
                    <ShieldAlert className="w-4 h-4 text-emerald-500" />
                    <span>Keamanan CCTV</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F5E1E3] flex items-center space-x-2 text-xs text-gray-500">
                  <Clock className="w-4 h-4 text-[#B76E79]" />
                  <span>Listrik menggunakan token mandiri per kamar (lebih hemat & adil).</span>
                </div>
              </div>

              {/* Address area card */}
              <div className="bg-white p-5 rounded-2xl border border-[#F5E1E3] shadow-xs sm:col-span-2 space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-rose-gold mt-1 shrink-0" />
                  <div>
                    <span className="text-xs text-gray-400 block uppercase tracking-wider font-semibold">Alamat Lengkap</span>
                    <p id="address-text" className="text-sm font-medium text-gray-800 mt-1">{fullAddress}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2.5 pt-1">
                  <button 
                    id="copy-address-btn"
                    onClick={handleCopyAddress}
                    className="bg-[#FFF5F5] border border-[#F5D5D9] text-rose-gold hover:bg-[#FFF0F1] px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin Alamat</span>
                  </button>
                  <a 
                    href="https://maps.app.goo.gl/kosputriGriyaAyuMock" 
                    target="_blank" 
                    rel="noreferrer"
                    className="bg-white border border-gray-300 hover:border-rose-gold text-gray-700 px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Buka Google Maps</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Interactive Mock Google Maps Location card */}
            <div className="md:col-span-5 bg-white p-4 rounded-2xl border border-[#F5E1E3] shadow-sm space-y-3">
              <span className="text-xs font-semibold text-gray-500 block uppercase tracking-wider px-1">Peta Lokasi Hunian</span>
              <div className="rounded-xl overflow-hidden h-72 border border-[#F5E1E3] relative bg-[#FFF9F9]">
                <iframe 
                  id="maps-iframe"
                  src={mockMapsUrl}
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Kos Putri Griya Ayu Location Map"
                />
                
                <div className="absolute top-2 left-2 bg-rose-gold text-white text-[10px] uppercase tracking-wider font-bold py-1 px-2.5 rounded-md shadow-sm">
                  Kawasan Kampus & Kuliner
                </div>
              </div>
              <div className="p-1">
                <p className="text-xs text-gray-500 leading-snug">
                  📌 <strong>Petunjuk arah:</strong> Berada di kawasan tenang, hanya 3 menit dari gerbang universitas utama, minimarket, warung makan, laundry, dan jalan raya utama Tembalang.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* DYNAMIC ROOM STATUS GRID (FLOOR PLAN) */}
      <section id="peta-kamar" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-sm font-bold uppercase tracking-wider text-rose-gold">Sistem Informasi Kamar</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mt-2">Denah & Ketersediaan Kamar</h2>
          <p className="text-gray-500 mt-3 font-light text-sm sm:text-base">
            Klik nomor kamar di bawah ini untuk melihat detail fasilitas, harga bulanan, atau melakukan simulasi pemesanan langsung lewat integrasi WhatsApp.
          </p>
        </div>

        {/* Dashboard Filters Toolbar */}
        <div className="bg-[#FFF5F6] border border-[#F5D5D9] rounded-2xl p-4 sm:p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="text-xs sm:text-sm font-semibold text-gray-800 uppercase tracking-wider">
              Filter Kamar Kost:
            </div>
            
            <div className="flex flex-wrap gap-2.5">
              {/* Floor Filter */}
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">Lantai:</span>
                <select 
                  value={filterFloor} 
                  onChange={(e) => setFilterFloor(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                  className="bg-white border border-gray-300 rounded-lg text-xs py-1.5 px-3 focus:outline-none focus:border-rose-gold font-medium"
                >
                  <option value="all">Semua Lantai</option>
                  <option value="1">Lantai 1</option>
                  <option value="2">Lantai 2</option>
                  <option value="3">Lantai 3</option>
                </select>
              </div>

              {/* Type Filter */}
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">Tipe:</span>
                <select 
                  value={filterType} 
                  onChange={(e) => setFilterType(e.target.value as any)}
                  className="bg-white border border-gray-300 rounded-lg text-xs py-1.5 px-3 focus:outline-none focus:border-rose-gold font-medium"
                >
                  <option value="all">Semua Tipe</option>
                  <option value="AC">Kamar AC</option>
                  <option value="Non-AC">Kamar Non-AC</option>
                </select>
              </div>

              {/* Availability Filter */}
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">Status:</span>
                <select 
                  value={filterStatus} 
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="bg-white border border-gray-300 rounded-lg text-xs py-1.5 px-3 focus:outline-none focus:border-rose-gold font-medium"
                >
                  <option value="all">Semua Status</option>
                  <option value="available">Tersedia (Kosong)</option>
                  <option value="occupied">Terisi (Penuh)</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-3 border-t border-[#F5E1E3] flex flex-wrap gap-4 items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-3">
              <span className="flex items-center space-x-1">
                <span className="w-3 h-3 rounded-md bg-emerald-500 inline-block" />
                <span>Hijau: Tersedia ({availableRoomsCount})</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="w-3 h-3 rounded-md bg-rose-200 inline-block" />
                <span>Pink: Terisi ({totalRoomsCount - availableRoomsCount})</span>
              </span>
            </div>
            
            <div className="text-gray-400 font-light italic">
              *Tampilkan {filteredRooms.length} dari {totalRoomsCount} Unit Kamar
            </div>
          </div>
        </div>

        {/* Dynamic Floor-by-Floor layout grids */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Floor Groupings (Visual Layout) */}
          {[1, 2, 3].map(floorNum => {
            const floorRooms = filteredRooms.filter(r => r.floor === floorNum);
            
            // Skip rendering if filtered out
            if (floorRooms.length === 0 && filterFloor !== 'all' && filterFloor !== floorNum) return null;

            return (
              <div key={floorNum} className="bg-white rounded-2xl border border-[#F5E1E3] p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#F5E1E3] pb-3">
                  <span className="font-serif font-bold text-gray-900 text-lg">Lantai {floorNum}</span>
                  <span className="text-xs bg-[#FFF0F1] text-[#B76E79] px-2.5 py-1 rounded-full font-semibold">
                    {rooms.filter(r => r.floor === floorNum && r.isAvailable).length} Kosong
                  </span>
                </div>
                
                {floorRooms.length === 0 ? (
                  <div className="text-center py-8 text-gray-400 text-xs font-light">
                    Kamar tidak ditemukan untuk filter ini
                  </div>
                ) : (
                  <div className="grid grid-cols-5 gap-2.5">
                    {floorRooms.map(room => (
                      <button
                        key={room.id}
                        onClick={() => setSelectedRoom(room)}
                        className={`aspect-square rounded-xl border flex flex-col items-center justify-center p-1 cursor-pointer transition-all duration-200 ${
                          room.isAvailable 
                            ? 'border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100/50 text-emerald-800 hover:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20' 
                            : 'border-rose-200 bg-rose-50/45 hover:bg-rose-100/40 text-rose-800 hover:border-[#E1B6BB]'
                        } ${selectedRoom?.id === room.id ? 'ring-2 ring-rose-gold shadow-md scale-102 font-bold' : ''}`}
                      >
                        <span className="text-xs font-medium block">Room</span>
                        <span className="text-base sm:text-lg font-bold block -mt-0.5">{room.number}</span>
                        <span className="text-[9px] scale-90 opacity-75 font-sans font-medium uppercase mt-0.5">
                          {room.type}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
                
                <div className="text-[10px] text-gray-400 text-center font-light">
                  Tip: Pilih nomor kamar untuk melihat detail tipe
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Room Details Drawer/Card display after clicking */}
        <AnimatePresence>
          {selectedRoom && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-8 bg-white max-w-3xl mx-auto rounded-2xl border-2 border-[#E9C8CE] shadow-md p-6 relative"
            >
              <button 
                onClick={() => setSelectedRoom(null)} 
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 p-1 rounded-full hover:bg-[#FFF5F5]"
                aria-label="Tutup detail kamar"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                
                <div className="md:col-span-4 bg-[#FFF5F6] p-4 rounded-xl flex flex-col items-center justify-center text-center border border-[#F5E1E3]">
                  <span className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">Pilihan Kamar</span>
                  <span className="text-5xl font-serif font-black text-[#B76E79]">No {selectedRoom.number}</span>
                  <span className="text-xs bg-[#FFF] border border-[#F5D5D9] text-[#B76E79] px-2.5 py-1 rounded-md font-semibold mt-3 inline-block uppercase">
                    Kamar Tipe {selectedRoom.type}
                  </span>
                  
                  {/* DEMO TOOL: Let the user interactive toggle room state to experiment with dashboard live! */}
                  <button 
                    onClick={() => toggleRoomStatus(selectedRoom.id)}
                    className="mt-4 text-[11px] font-semibold text-rose-gold hover:underline cursor-pointer bg-white px-3 py-1 rounded-full border border-[#FFF5F5] shadow-xs"
                    title="Alat simulasi: Ubah status untuk tes dashboard"
                  >
                    🛠️ Set Jadi {selectedRoom.isAvailable ? 'Terisi' : 'Kosong (Tersedia)'}
                  </button>
                </div>

                <div className="md:col-span-8 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-gray-400 text-xs font-semibold block">Harga Bulanan</span>
                      <span className="text-2xl font-bold text-rose-gold text-amber-900 font-sans">
                        Rp {selectedRoom.price.toLocaleString('id-ID')} <span className="text-xs text-gray-500 font-normal">/ Bulan</span>
                      </span>
                    </div>
                    
                    <span className={`inline-flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-bold ${
                      selectedRoom.isAvailable 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${selectedRoom.isAvailable ? 'bg-emerald-500 animate-pulse' : 'bg-rose-400'} inline-block`} />
                      <span>{selectedRoom.isAvailable ? 'Tersedia Sekarang' : 'Sudah Terisi'}</span>
                    </span>
                  </div>

                  <div>
                    <span className="text-gray-500 text-xs font-semibold block mb-2.5">Gambar & Detail Fasilitas Kamar {selectedRoom.number}:</span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {selectedRoom.facilities.map((fac, idx) => {
                        const detail = getFacilityDetail(fac);
                        return (
                          <div 
                            key={idx} 
                            className={`flex flex-col items-center justify-between p-2.5 rounded-xl border text-center transition-all hover:shadow-xs hover:scale-[1.02] ${detail.color}`}
                          >
                            <div className="w-full h-16 sm:h-20 rounded-lg overflow-hidden mb-1.5 shadow-2xs relative border border-white/60 bg-zinc-100 flex-shrink-0">
                              <img 
                                src={detail.image} 
                                alt={detail.title} 
                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <span className="text-[11px] font-bold leading-tight block text-gray-800 line-clamp-1">
                              {detail.title}
                            </span>
                            <span className="text-[10px] bg-white/90 px-2 py-0.5 rounded-full font-extrabold text-[#B76E79] mt-1 border border-black/5 flex-shrink-0">
                              {detail.qty}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    {selectedRoom.isAvailable ? (
                      <button
                        onClick={() => handleWhatsappBooking(selectedRoom.number, selectedRoom.type)}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-4 rounded-xl text-xs sm:text-sm text-center shadow-md flex items-center justify-center space-x-2 cursor-pointer transition-colors"
                      >
                        <Smartphone className="w-4 h-4" />
                        <span>Pesan Kamar {selectedRoom.number} Via WhatsApp</span>
                      </button>
                    ) : (
                      <button
                        disabled
                        className="flex-1 bg-gray-200 text-gray-400 font-semibold py-2.5 px-4 rounded-xl text-xs sm:text-sm text-center cursor-not-allowed flex items-center justify-center space-x-2"
                      >
                        <ShieldAlert className="w-4 h-4" />
                        <span>Kamar Sudah Terisi (Ganti Status di Kiri untuk Tes)</span>
                      </button>
                    )}
                    
                    <button
                      onClick={() => handleGeneralWhatsappBooking(selectedRoom.type)}
                      className="bg-white hover:bg-[#FFFBFB] text-gray-700 border border-gray-300 font-semibold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-colors"
                    >
                      <span>Tanya Admin</span>
                    </button>
                  </div>

                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </section>

      {/* 3. FASILITAS & HARGA (PRICING TABLE CARDS) */}
      <section id="fasilitas-harga" className="bg-[#FFF5F6] py-16 sm:py-20 border-y border-[#F5E1E3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-bold uppercase tracking-wider text-rose-gold">Pricelist Bulanan</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mt-2">Daftar Harga & Tipe Kamar</h2>
            <p className="text-gray-500 mt-3 font-light text-sm sm:text-base">
              Kami menawarkan dua tipe kamar yang dirancang khusus menyesuaikan budget mahasiswi dan karyawati. Bayar bulanan transparan tanpa biaya tersembunyi.
            </p>
          </div>

          <div id="pricing-grid" className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            
            {/* TIPE KAMAR 1: NON AC */}
            <div className="bg-white rounded-3xl border border-[#F5E1E3] hover:border-rose-gold overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group">
              <div className="p-6 sm:p-8 space-y-6">
                <div className="flex justify-between items-center">
                  <span className="bg-gray-100 text-gray-700 text-xs px-3.5 py-1 rounded-full font-semibold uppercase tracking-wider">Tipe Standar</span>
                  <span className="text-xs text-gray-400 font-medium font-sans">Kamar Mandi Dalam</span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl font-serif font-bold text-gray-900">Kamar Non-AC</h3>
                  <p className="text-xs text-gray-500 font-medium">Sejuk dengan sistem sirkulasi udara jendela lebar.</p>
                </div>

                <div className="pt-2 border-y border-[#FFF5F5] py-4">
                  <span className="text-sm text-gray-500 font-medium">Harga Bulanan</span>
                  <div className="flex items-baseline space-x-1 mt-0.5">
                    <span className="text-3xl sm:text-4xl font-bold text-[#B76E79]">Rp 700.000</span>
                    <span className="text-sm text-gray-400 font-light">/ Bulan</span>
                  </div>
                </div>

                {/* Facilities Checklist */}
                <div className="space-y-3.5">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest block">Fasilitas Kamar:</span>
                  <ul className="space-y-2.5 text-sm text-gray-700">
                    <li className="flex items-center space-x-2.5">
                      <div className="bg-emerald-50 rounded-full p-1 text-emerald-600"><Check className="w-3.5 h-3.5" /></div>
                      <span>Kasur Nyaman (Bantal + Sprei Lengkap)</span>
                    </li>
                    <li className="flex items-center space-x-2.5">
                      <div className="bg-emerald-50 rounded-full p-1 text-emerald-600"><Check className="w-3.5 h-3.5" /></div>
                      <span>Kipas Angin Dinding (Hemat Listrik)</span>
                    </li>
                    <li className="flex items-center space-x-2.5">
                      <div className="bg-emerald-50 rounded-full p-1 text-emerald-600"><Check className="w-3.5 h-3.5" /></div>
                      <span>Kamar Mandi Dalam (Shower & Kloset Jongkok)</span>
                    </li>
                    <li className="flex items-center space-x-2.5">
                      <div className="bg-emerald-50 rounded-full p-1 text-emerald-600"><Check className="w-3.5 h-3.5" /></div>
                      <span>Rak Buku & Meja Belajar Samping</span>
                    </li>
                    <li className="flex items-center space-x-2.5">
                      <div className="bg-emerald-50 rounded-full p-1 text-emerald-600"><Check className="w-3.5 h-3.5" /></div>
                      <span>Lemari Pakaian Kayu 2 Pintu</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-6 sm:p-8 bg-gray-50 border-t border-gray-100 flex flex-col space-y-3">
                <button
                  onClick={() => handleGeneralWhatsappBooking('Non-AC')}
                  className="w-full bg-slate-800 hover:bg-slate-900 text-white font-semibold py-3 px-4 rounded-xl text-xs sm:text-sm text-center shadow-xs transition-colors cursor-pointer"
                >
                  Pesan Sekarang (Non-AC)
                </button>
                <div className="text-center font-light text-[10px] text-gray-400">
                  ⚡ Listrik Token Mandiri per Kamar
                </div>
              </div>
            </div>

            {/* TIPE KAMAR 2: AC */}
            <div className="bg-white rounded-3xl border-2 border-rose-gold overflow-hidden shadow-md flex flex-col justify-between relative group transform md:-translate-y-2">
              
              {/* Recommended Badge */}
              <div className="absolute top-0 right-0 bg-[#B76E79] text-white text-[10px] uppercase tracking-widest font-black py-1.5 px-6 rounded-bl-2xl">
                Terpopuler
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <div className="flex justify-between items-center">
                  <span className="bg-[#FFF0F1] text-[#B76E79] text-xs px-3.5 py-1 rounded-full font-semibold uppercase tracking-wider">Tipe Eksklusif</span>
                  <span className="text-xs text-[#B76E79] font-semibold font-sans">Kamar Mandi Dalam</span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl font-serif font-bold text-gray-900">Kamar AC</h3>
                  <p className="text-xs text-gray-500 font-medium">Sejuk maksimal, pas untuk belajar & istirahat siang hari.</p>
                </div>

                <div className="pt-2 border-y border-[#FFF5F5] py-4">
                  <span className="text-sm text-gray-500 font-medium">Harga Bulanan</span>
                  <div className="flex items-baseline space-x-1 mt-0.5">
                    <span className="text-3xl sm:text-4xl font-bold text-[#B76E79]">Rp 800.000</span>
                    <span className="text-sm text-gray-400 font-light">/ Bulan</span>
                  </div>
                </div>

                {/* Facilities Checklist */}
                <div className="space-y-3.5">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest block">Fasilitas Kamar:</span>
                  <ul className="space-y-2.5 text-sm text-gray-700">
                    <li className="flex items-center space-x-2.5">
                      <div className="bg-emerald-50 rounded-full p-1 text-emerald-600"><Check className="w-3.5 h-3.5" /></div>
                      <span>Kasur Springbed Premium (Nyaman di Punggung)</span>
                    </li>
                    <li className="flex items-center space-x-2.5">
                      <div className="bg-emerald-50 rounded-full p-1 text-emerald-600"><Check className="w-3.5 h-3.5" /></div>
                      <span>Air Conditioner (AC) Hemat Daya & Dingin</span>
                    </li>
                    <li className="flex items-center space-x-2.5">
                      <div className="bg-emerald-50 rounded-full p-1 text-emerald-600"><Check className="w-3.5 h-3.5" /></div>
                      <span>Kamar Mandi Dalam (Shower, Jet Washer, Kloset)</span>
                    </li>
                    <li className="flex items-center space-x-2.5">
                      <div className="bg-emerald-50 rounded-full p-1 text-emerald-600"><Check className="w-3.5 h-3.5" /></div>
                      <span>Rak Buku Gantung & Meja Belajar Besar</span>
                    </li>
                    <li className="flex items-center space-x-2.5">
                      <div className="bg-emerald-50 rounded-full p-1 text-emerald-600"><Check className="w-3.5 h-3.5" /></div>
                      <span>Lemari Pakaian 2 Pintu + Cermin Rias</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-6 sm:p-8 bg-[#FFF5F6] border-t border-[#F5E1E3] flex flex-col space-y-3">
                <button
                  onClick={() => handleGeneralWhatsappBooking('AC')}
                  className="w-full bg-rose-gold hover:bg-rose-gold-dark text-white font-semibold py-3 px-4 rounded-xl text-xs sm:text-sm text-center shadow-md transition-colors cursor-pointer"
                >
                  Pesan Sekarang (AC)
                </button>
                <div className="text-center font-light text-[10px] text-gray-500">
                  ⚡ Listrik Token Mandiri per Kamar
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* TESTIMONY SECTION */}
      <section id="testimoni" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-bold uppercase tracking-wider text-rose-gold">Ulasan Penghuni</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mt-2">Apa Kata Teman Kos?</h2>
          <p className="text-gray-500 mt-3 font-light text-sm sm:text-base">
            Cerita asli dari mahasiswi dan karyawati yang telah lama menetap di Kos Putri Griya Ayu. Hunian tepercaya dengan suasana ramah kekeluargaan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockReviews.map((rev) => (
            <div key={rev.id} className="bg-white p-6 rounded-2xl border border-[#F5E1E3] shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < rev.rating ? 'fill-current' : 'opacity-30'}`} />
                  ))}
                </div>
                <p className="text-sm text-gray-600 italic leading-relaxed">
                  "{rev.text}"
                </p>
              </div>
              <div className="pt-4 border-t border-[#FFF5F5] flex items-center justify-between">
                <div>
                  <span className="text-sm font-bold text-gray-900 block">{rev.name}</span>
                  <span className="text-xs text-[#B76E79] font-medium block">{rev.status}</span>
                </div>
                <span className="text-[10px] text-gray-400 font-sans uppercase font-medium">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. NARAHUBUNG & KONTAK FORM */}
      <section id="kontak" className="bg-slate-900 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Contact details & Social media icons */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#FFF0F1] inline-block bg-slate-800 px-3 py-1 rounded-md">Hubungi Pemilik</span>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight">Butuh Informasi Lebih Lanjut?</h2>
                <p className="text-sm sm:text-base text-gray-400 font-light leading-relaxed">
                  Ibu Kos dan pengelola selalu siap menyambut kedatangan Anda. Hubungi kami melalui telepon, berkonsultasi via WhatsApp, atau mampir mendaftar langsung di lokasi kos untuk meninjau kamar.
                </p>
              </div>

              {/* Contact list with icons */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3.5">
                  <div className="bg-slate-800 p-2.5 rounded-xl text-rose-gold text-pink-300">
                    <MapPin className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-gray-500 font-bold block">Lokasi Alamat</span>
                    <span className="text-xs sm:text-sm text-gray-300 block mt-0.5">{fullAddress}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3.5">
                  <div className="bg-slate-800 p-2.5 rounded-xl text-rose-gold text-pink-300">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-gray-500 font-bold block">Hubungi Langsung / WA</span>
                    <a href={`https://wa.me/${ownerWhatsapp}`} target="_blank" rel="noreferrer" className="text-sm font-semibold text-rose-gold hover:underline">
                      +{ownerWhatsapp}
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Channels Required under FITUR 3 */}
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <span className="text-xs text-gray-400 font-semibold block uppercase tracking-wide">Sosial Media Resmi:</span>
                <div className="flex flex-wrap gap-3">
                  <a 
                    id="social-instagram"
                    href="https://instagram.com/kosputri_griyaayu" 
                    target="_blank" 
                    rel="noreferrer"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSocialClick('Instagram', '@kosputri_griyaayu');
                    }}
                    className="bg-slate-850 hover:bg-[#B76E79] hover:text-white text-gray-300 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all"
                  >
                    <Instagram className="w-4 h-4" />
                    <span>@kosputri_griyaayu</span>
                  </a>

                  <a 
                    id="social-tiktok"
                    href="https://tiktok.com/@griyaayukos" 
                    target="_blank" 
                    rel="noreferrer"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSocialClick('TikTok', '@griyaayukos');
                    }}
                    className="bg-slate-850 hover:bg-[#B76E79] hover:text-white text-gray-300 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all"
                  >
                    <Compass className="w-4 h-4" />
                    <span>@griyaayukos</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Practical Contact Question Form */}
            <div className="lg:col-span-7 bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-700">
              <h3 className="text-xl font-serif font-bold mb-6">Kirim formulir tanya jawab</h3>
              
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-400 block font-semibold mb-1" htmlFor="input-name">Nama Lengkap</label>
                    <input 
                      id="input-name"
                      type="text" 
                      placeholder="Contoh: Siska Amelia"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      required
                      className="w-full bg-slate-750 border border-slate-655 focus:border-rose-gold text-white font-medium p-3 rounded-xl text-xs outline-none focus:ring-1 focus:ring-rose-gold transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 block font-semibold mb-1" htmlFor="input-phone">No WhatsApp / HP</label>
                    <input 
                      id="input-phone"
                      type="tel" 
                      placeholder="Contoh: 081234xxxx" 
                      required
                      className="w-full bg-slate-750 border border-slate-655 focus:border-rose-gold text-white font-medium p-3 rounded-xl text-xs outline-none focus:ring-1 focus:ring-rose-gold transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-400 block font-semibold mb-1" htmlFor="textarea-msg">Pesan / Pertanyaan Anda</label>
                  <textarea 
                    id="textarea-msg"
                    rows={4}
                    placeholder="Tuliskan pertanyaan mengenai ketersediaan kamar, metode pembayaran, atau jadwal tinjauan lokasi di sini..."
                    value={contactMsg}
                    onChange={(e) => setContactMsg(e.target.value)}
                    required
                    className="w-full bg-slate-750 border border-slate-655 focus:border-rose-gold text-white font-medium p-3 rounded-xl text-xs outline-none focus:ring-1 focus:ring-rose-gold transition-all"
                  />
                </div>

                <div className="pt-2">
                  <button 
                    id="contact-submit-btn"
                    type="submit" 
                    className="w-full bg-rose-gold hover:bg-rose-gold-dark text-white font-semibold py-3 px-4 rounded-xl text-xs sm:text-sm text-center shadow-md flex items-center justify-center space-x-2 transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Kirim Formulir ke Admin</span>
                  </button>
                </div>
              </form>

              {/* Custom alert banner */}
              <AnimatePresence>
                {formSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-emerald-900/40 border border-emerald-500 text-emerald-200 p-4 rounded-xl mt-4 flex items-start space-x-3 text-xs"
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <div>
                      <strong className="block font-bold">Terima kasih, {contactName}!</strong>
                      <span>Pesan Anda berhasil terkirim. Pengelola kami akan segera menghubungi Anda di nomor WhatsApp yang telah diisi dalam beberapa menit ke depan!</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

          <div className="pt-12 mt-12 border-t border-slate-800 text-center text-xs text-gray-500 space-y-2">
            <p>© 2026 Kos Putri Griya Ayu. Hak Cipta Dilindungi Undang-Undang.</p>
            <p className="font-light">Didesain dengan sentuhan elegan & modern khusus untuk hunian putri yang tepercaya.</p>
          </div>
        </div>
      </section>
        </>
      )}

      {/* Floating alert notifications (Toasts) */}
      <AnimatePresence>
        {copyToastVisible && (
          <motion.div 
            id="toast-copy-success"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="fixed bottom-6 left-6 z-50 bg-[#FFF5F5] border-2 border-emerald-400 text-emerald-900 p-4 rounded-2xl shadow-xl flex items-center space-x-3 text-xs max-w-sm"
          >
            <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
            <div>
              <span className="font-bold block text-gray-900">Alamat Berhasil Disalin!</span>
              <span className="text-gray-600 block mt-0.5">Anda sekarang bisa menempelkannya ke aplikasi peta atau obrolan chat Anda.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {socialToastText && (
          <motion.div 
            id="toast-social-info"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-slate-800 text-white p-4 rounded-2xl shadow-xl flex items-center space-x-3 text-xs"
          >
            <Smartphone className="w-5 h-5 text-rose-gold flex-shrink-0 animate-bounce" />
            <span className="font-medium">{socialToastText}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. MODAL LOGIN USER UNTUK PENGHUNI */}
      <AnimatePresence>
        {loginModalOpen && (
          <motion.div 
            id="login-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs z-55 flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div 
              id="login-modal-card"
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl border border-[#F5E1E3] w-full max-w-4xl p-5 sm:p-8 relative shadow-2xl text-left my-8 max-h-[90vh] lg:max-h-none overflow-y-auto lg:overflow-visible"
            >
              {/* Close Button */}
              <button 
                onClick={() => setLoginModalOpen(false)} 
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-rose-50 transition-all cursor-pointer z-10"
                aria-label="Tutup form login"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Title Header */}
              <div className="text-center space-y-2 mb-6 pb-4 border-b border-gray-100">
                <div className="w-12 h-12 rounded-full bg-[#B76E79] text-white flex items-center justify-center mx-auto shadow-md">
                  <User className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-gray-900">Portal Login Penghuni</h3>
                <p className="text-xs text-gray-500 font-light max-w-md mx-auto">
                  Pilih salah satu akun penghuni aktif untuk pengisian otomatis yang instan, atau silakan masukkan info Anda secara mandiri di formulir sebelah kanan.
                </p>
              </div>

              {/* Grid Layout: Left (Occupants Directory) & Right (Active Form) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
                
                {/* Column 1: Directory of Occupants (Daftar Penghuni Terdaftar) */}
                <div className="lg:col-span-5 flex flex-col space-y-4 bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-100">
                  <div className="border-b border-[#FAD0D4]/60 pb-2.5">
                    <h4 className="text-sm font-bold text-gray-800 flex items-center gap-1.5 font-serif text-rose-gold">
                      👥 Daftar Penghuni Aktif
                    </h4>
                    <p className="text-[10px] sm:text-[11px] text-gray-500 font-light mt-0.5">
                      Ketuk salah satu nama di bawah untuk login secara praktis:
                    </p>
                  </div>

                  <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                    {PRESET_TENANTS.map((tenant) => {
                      const isSelected = loginName.toLowerCase().trim() === tenant.name.toLowerCase().trim() && loginRoom === tenant.roomNumber;
                      return (
                        <button
                          key={tenant.roomNumber}
                          type="button"
                          onClick={() => {
                            setLoginName(tenant.name);
                            setLoginPhone(tenant.phone);
                            setLoginRoom(tenant.roomNumber);
                            setLoginError('');
                          }}
                          className={`w-full text-left p-2.5 sm:p-3 rounded-xl border-2 transition-all duration-250 cursor-pointer flex items-center justify-between group ${
                            isSelected 
                              ? 'bg-white border-[#B76E79] shadow-md ring-1 ring-[#B76E79] scale-[1.01]' 
                              : 'bg-white border-slate-200 hover:border-[#FAD0D4] hover:shadow-xs hover:bg-rose-50/10'
                          }`}
                        >
                          <div className="flex items-center space-x-2.5">
                            <span className="text-2xl shrink-0 select-none group-hover:scale-110 transition-transform">{tenant.avatar}</span>
                            <div className="min-w-0">
                              <div className="font-bold text-xs sm:text-sm text-gray-800 truncate">
                                {tenant.name}
                              </div>
                              <div className="text-[10px] text-gray-400 font-light flex items-center gap-1.5 mt-0.5">
                                <span className="bg-rose-50 text-[#B76E79] px-1.5 py-0.5 rounded font-bold text-[9px] shrink-0">
                                  Kamar {tenant.roomNumber}
                                </span>
                                <span className="shrink-0">•</span>
                                <span className="truncate">{tenant.type}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-end space-y-1 shrink-0">
                            <span className="text-[8px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-full font-bold flex items-center gap-0.5 border border-emerald-200 uppercase tracking-wider">
                              <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                              Aktif
                            </span>
                            {isSelected && (
                              <span className="text-[10px] font-bold text-[#B76E79] flex items-center gap-0.5">
                                <Check className="w-3 h-3" /> Terpilih
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="bg-rose-50/60 border border-[#FAD0D4]/40 rounded-xl p-3 text-[10px] text-[#B76E79] leading-relaxed">
                    <p className="font-semibold">💡 Tips Cepat:</p>
                    <p className="mt-0.5 font-light">Tinggal klik salah satu profil penghuni untuk mengisi otomatis, lalu tekan tombol "Masuk ke Portal".</p>
                  </div>
                </div>

                {/* Column 2: Interactive Form Section */}
                <div className="lg:col-span-7 flex flex-col justify-between pt-2 lg:pt-0 lg:pl-4">
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!loginName || !loginPhone || !loginRoom) {
                        setLoginError('Harap lengkapi semua isian!');
                        return;
                      }
                      
                      const tenantData = {
                        name: loginName,
                        phone: loginPhone,
                        roomNumber: loginRoom
                      };
                      
                      // Save state & local storage
                      setLoggedInTenant(tenantData);
                      localStorage.setItem('griya_ayu_tenant', JSON.stringify(tenantData));
                      setLoginModalOpen(false);
                      
                      // Reset form fields
                      setLoginName('');
                      setLoginPhone('');
                      setLoginError('');

                      // Redirect to immersive portal
                      setViewMode('portal');
                      setActiveTenantTab('room');
                    }}
                    className="space-y-4 flex flex-col h-full justify-between"
                  >
                    <div className="space-y-4">
                      {loginError && (
                        <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-xl flex items-center space-x-2">
                          <AlertTriangle className="w-4 h-4 shrink-0" />
                          <span>{loginError}</span>
                        </div>
                      )}

                      <div>
                        <label className="text-xs text-gray-500 font-bold block mb-1">Nama Lengkap Penghuni</label>
                        <input 
                          type="text"
                          required
                          placeholder="Masukkan nama lengkap Anda"
                          value={loginName}
                          onChange={(e) => setLoginName(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 focus:border-rose-gold p-3 rounded-xl text-xs sm:text-sm outline-none font-medium text-gray-800 focus:ring-1 focus:ring-rose-gold transition-all"
                        />
                      </div>

                      <div>
                        <label className="text-xs text-gray-500 font-bold block mb-1">No. WhatsApp Aktif</label>
                        <input 
                          type="tel"
                          required
                          placeholder="Masukkan no. WhatsApp aktif"
                          value={loginPhone}
                          onChange={(e) => setLoginPhone(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 focus:border-rose-gold p-3 rounded-xl text-xs sm:text-sm outline-none font-medium text-gray-800 focus:ring-1 focus:ring-rose-gold transition-all"
                        />
                      </div>

                      <div>
                        <label className="text-xs text-gray-500 font-bold block mb-1">Pilih Nomor Kamar Anda</label>
                        <select 
                          value={loginRoom}
                          onChange={(e) => setLoginRoom(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 focus:border-[#B76E79] p-3 rounded-xl text-xs sm:text-sm outline-none font-medium text-gray-800 transition-all cursor-pointer"
                        >
                          {rooms.map(room => (
                            <option key={room.id} value={room.number}>
                              Kamar {room.number} ({room.type}) {room.isAvailable ? '- (Kosong / Bisa Ditempati)' : '- (Terisi)'}
                            </option>
                          ))}
                        </select>
                        <span className="text-[10px] text-gray-400 mt-1 block leading-normal">
                          *Kamar yang dipilih otomatis terdaftar dihuni oleh Anda serta terupdate menjadi "Terisi" secara publik.
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 mt-auto">
                      <button 
                        type="submit"
                        className="w-full bg-rose-gold hover:bg-[#a35e69] text-white font-bold py-3.5 px-4 rounded-xl text-xs sm:text-sm text-center shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <LogIn className="w-4 h-4" /> Masuk ke Portal & Lihat Denah Kamar
                      </button>
                    </div>
                  </form>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
