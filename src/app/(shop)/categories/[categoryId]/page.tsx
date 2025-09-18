import { getCategortDetails } from "@/services/categories.services";
import Image from "next/image";


export default async function categoryDetails({params: {categoryId}}:{params: {categoryId: string};}){
  const category = await getCategortDetails(categoryId);

if (!category) {
  return <p>Category not found</p>;
}

return (
  <section className="py-20">
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <picture className="lg:col-span-2">
          <Image
            src={category.image}
            alt={category.slug || "category"}
            width={500}
            height={500}
            className="border-2 border-black rounded"
          />
        </picture>
        <h3 className="text-2xl font-semibold">{category.name}</h3>
      </div>
    </div>
  </section>
);

}

