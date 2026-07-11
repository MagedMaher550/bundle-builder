export type ReviewLineItem = {
  id: string;
  title: string;
  category: "camera" | "sensor" | "protection";
  quantity: number;
  currentPrice: number;
  originalPrice?: number;
  suffix?: string;
  image?: string;
};
