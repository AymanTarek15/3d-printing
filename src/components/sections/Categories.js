import Section from "@/components/ui/Section";
import CategoryCard from "@/components/cards/CategoryCard";
import './categories.css'
import Link from "next/link";

const demoCategories = [
  { name: "View all Products",   title: "Home Décor",         image: "/categories/home-decor.png",   counts: 24 },
  // { slug: "keychains",    title: "Keychains",          image: "/categories/keychains.png",     count: 18 },
  // { slug: "figurines",    title: "Figurines & Busts",  image: "/categories/figurines.png",     count: 32 },
  // { slug: "tools",        title: "Tools & Gadgets",    image: "/categories/tools.png",         count: 15 },
  // { slug: "accessories",  title: "Phone Accessories",  image: "/categories/phone-acc.png",     count: 12 },
  // { slug: "seasonal",     title: "Seasonal & Gifts",   image: "/categories/seasonal.png",      count: 20 },
];

export default function Categories({ categories  }) {
  console.log(categories);
  
  return (
    <Section id="categories">
      <div className="sectionTitle">
        <h2 className="h2">Shop by Category</h2>
        {/* <p className="muted" style={{marginTop:8}}>
          Browse curated groups to find what you need faster.
        </p> */}
      </div>

      <div className="cGrid">
        <CategoryCard  category={demoCategories[0]} />
        {categories.map((cat) => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>
    </Section>
  );
}
