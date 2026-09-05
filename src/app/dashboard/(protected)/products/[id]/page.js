"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductForm from "../ProductForm";
import { adminApi } from "../../../adminClient";

export default function EditProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setProduct(await adminApi.get(`products/${id}`));
      } catch (e) {
        setError(e.message);
      }
    })();
  }, [id]);

  if (error) return <p className="dashError">{error}</p>;
  if (!product) return <p className="dashMuted">Loading…</p>;

  return (
    <div>
      <h1 className="dashH1">Edit product</h1>
      <ProductForm product={product} />
    </div>
  );
}
