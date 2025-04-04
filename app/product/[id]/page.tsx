import { prisma } from "@/lib/prisma";
import { ProductContent } from "./product-content";

export async function generateStaticParams() {
  const products = await prisma.product.findMany({
    select: { id: true }
  });

  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: { id: Number(params.id) }
  });

  if (!product) {
    return null;
  }

  return <ProductContent product={product} />;
}