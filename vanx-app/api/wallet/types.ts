export type Wallet = {
  id: number;
  userId: number;
  balance: number;
}

export type WalletData = {
  data: Wallet[];
  currentPage: number;
  lastPage: number;
  nextPageUrl: string | null;
  prevPageUrl: string | null;
  total: number;
}