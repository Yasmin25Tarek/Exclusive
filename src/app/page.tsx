import MainSlider from "@/components/home/MainSlider";
import CategoriesSection from "@/components/home/CategoriesSection";
import ProductsSection from "@/components/home/ProductsSection";
import { Suspense } from "react";
import { SkeletonCard } from "@/components/shared/skeletoncard";

export default function Home() {
  return (
    <>
    <MainSlider />
    <Suspense fallback={<SkeletonCard />}>
    <CategoriesSection />    
    </Suspense>
    <Suspense fallback={<SkeletonCard />}>
    <ProductsSection />
    </Suspense>
    </>
  );
}
