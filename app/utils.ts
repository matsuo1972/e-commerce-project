export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
  }).format(price);
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const demoProducts = [
  {
    id: 1,
    title: "シンプルフレンチネイル",
    price: 3800,
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500&q=80",
    category: "ベーシック",
    rating: 4.8,
    description: "清楚で上品な印象を与えるフレンチネイル。オフィスシーンにも最適です。"
  },
  {
    id: 2,
    title: "パールグラデーション",
    price: 4200,
    image: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=500&q=80",
    category: "トレンド",
    rating: 4.7,
    description: "真珠のような輝きを放つグラデーションデザイン。特別な日におすすめです。"
  },
  {
    id: 3,
    title: "フラワーアート",
    price: 4800,
    image: "https://images.unsplash.com/photo-1604902396830-aca29e19b067?w=500&q=80",
    category: "アート",
    rating: 4.9,
    description: "繊細な花柄アートが施された華やかなデザイン。春のイベントにぴったりです。"
  },
  {
    id: 4,
    title: "ミラーネイル",
    price: 5200,
    image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=500&q=80",
    category: "トレンド",
    rating: 4.6,
    description: "鏡のような輝きを放つミラーネイル。モダンで洗練された印象を与えます。"
  },
  {
    id: 5,
    title: "ニュアンスアート",
    price: 4500,
    image: "https://images.unsplash.com/photo-1607779097040-26e80aa4576b?w=500&q=80",
    category: "アート",
    rating: 4.7,
    description: "抽象的なアートが特徴的なデザイン。個性的でおしゃれな仕上がりです。"
  },
  {
    id: 6,
    title: "ブライダルネイル",
    price: 6800,
    image: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=500&q=80",
    category: "ブライダル",
    rating: 5.0,
    description: "特別な一日を彩る上品なブライダルネイル。パールとラメの上品な輝きが特徴です。"
  },
  {
    id: 7,
    title: "プロフェッショナルネイルケアキット",
    price: 3500,
    image: "https://images.unsplash.com/photo-1610992015732-2449b0dd2b8f?w=500&q=80",
    category: "ケア用品",
    rating: 4.8,
    description: "プロ仕様のネイルケアキット。爪切り、甘皮処理、バッファー等が含まれています。"
  },
  {
    id: 8,
    title: "キューティクルオイル",
    price: 1200,
    image: "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=500&q=80",
    category: "ケア用品",
    rating: 4.9,
    description: "天然オイルを配合した保湿オイル。乾燥から爪を守り、健やかに保ちます。"
  },
  {
    id: 9,
    title: "ネイル補強美容液",
    price: 2800,
    image: "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=500&q=80",
    category: "ケア用品",
    rating: 4.7,
    description: "爪の成長を促進し、割れや欠けを防ぐ美容液。ビタミンE配合で爪を健やかに保ちます。"
  },
  {
    id: 10,
    title: "ハンドクリーム",
    price: 1800,
    image: "https://images.unsplash.com/photo-1620916297612-b1867db9d266?w=500&q=80",
    category: "ケア用品",
    rating: 4.6,
    description: "シアバター配合の保湿クリーム。手肌を乾燥から守り、しっとりとした肌に導きます。"
  }
];