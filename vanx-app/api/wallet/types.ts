export type Wallet = {
  id: number;
  userId: number;
  serviceName: string;
  pointAmount: number;
  type: "puls" | "minus";
  date: string;
  time: string;
}

export type WalletData = {
  data: Wallet[];
  currentPage: number;
  lastPage: number;
  nextPageUrl: string | null;
  prevPageUrl: string | null;
  total: number;
}