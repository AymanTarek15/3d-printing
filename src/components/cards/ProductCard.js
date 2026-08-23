"use client";
import Link from "next/link";
import Image from "next/image";
import Rating from "@/components/ui/Rating";
import { formatPrice } from "@/app/lib/format";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "@/store/cartSlice";
import { selectIsWishlistedById,toggleWishlist } from "@/store/wishlistSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import './productcard.css'




export default function ProductCard({ product }) {
  
  const { id, title, image_url, price, rating = 0, badge } = product;
  const dispatch = useDispatch();
  const isWishlisted = useSelector(selectIsWishlistedById(product.id));


const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist({
      id: product.id,
      title: product.title,
      price: product.price,
      image_url: product.image_url,
    }));
  };

  return (
    <article className="pCard card">
      <div className="pThumb">
        <button
          className="wishlistBtn"
          onClick={handleWishlistToggle}
          aria-label="Add or remove from wishlist"
          title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            width: 36,
            height: 36,
            border: "none",
            background: "transparent",
            cursor: "pointer",
          }}
        >
          <FontAwesomeIcon
            icon={faHeart}
            size="lg"
            style={{
              color: isWishlisted ? "red" : "white",
              filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.4))",
              transition: "color 0.2s ease",
            }}
          />
        </button>
        {badge && <span className="pBadge">{badge}</span>}
        <Link href={`/products/${title}`}>
          <Image src={image_url} alt={title} width={420} height={320} sizes="(max-width: 768px) 50vw, 420px" className="pImg" />
        </Link>
      </div>

      <div className="pBody">
        <Link href={`/products/${title}`} className="pTitle">{title}</Link>

        <div className="pMeta">
          {rating > 0 && <Rating value={rating} />}
          <span className="pPrice">{formatPrice(price)}</span>
        </div>

        <div className="pActions">
          <button
            type="button"
            className="btn btn-primary"
            style={{ justifyContent: "center" }}
            onClick={(e) => {
              e.preventDefault();
              dispatch(addItem({ id, title, price, image_url, qty: 1 }));
            }}
          >
            Add to Cart
          </button>
          <Link
            href={`/products/${title}`}
            className="btn btn-ghost hidden-in-small-btn"
            style={{ justifyContent: "center" }}
          >
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}
