"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function CategoryCard({ category }) {
  const { slug, name,description, image, count } = category;


  return (
    <article className="cCard card">
      <Link href={`/category/${name}`} className="cThumb">
        <Image
          src={image}
          alt={name}
          width={420}
          height={320}
          sizes="(max-width: 768px) 100vw, 420px"
          className="cImg"
        />
        {typeof count === "number" && (
          <span className="cBadge">{count} items</span>
        )}
      </Link>

      <div className="cBody">
        <h3  className="">{name}</h3>
        <Link href={`/category/${name}`} className="btn btn-primary hidden-in-small-btn">Explore</Link>
      </div>
    </article>
  );
}
