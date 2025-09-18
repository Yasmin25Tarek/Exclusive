import { getBrandDetails } from "@/services/brands.services";
import Image from "next/image";


export default async function brandDetails({params: {brandId}}:{params: {brandId: string};}){
  const brand = await getBrandDetails(brandId);

if (!brand) {
  return <p>Brand not found</p>;
}

return (
  <section className="py-20">
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <picture className="lg:col-span-2">
          <Image
            src={brand.image}
            alt={brand.slug || "Brand"}
            width={500}
            height={500}
            className="border-4 border-black rounded"
          />
        </picture>
        <h3 className="text-2xl font-semibold">{brand.name}</h3>
      </div>
    </div>
  </section>
);

}

