export interface Room {
  id: string;
  number: string;
  type: 'AC' | 'Non-AC';
  price: number;
  isAvailable: boolean;
  floor: number;
  facilities: string[];
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  status: string; // e.g. "Mahasiswi Undip", "Karyawati Swasta"
  date: string;
}
