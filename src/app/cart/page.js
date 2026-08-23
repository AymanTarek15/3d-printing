"use client";
import { useDispatch, useSelector } from "react-redux";
import {
  selectItems,
  selectTotals,
  increase,
  decrease,
  removeItem,
  clearCart,
} from "@/store/cartSlice";
import Link from "next/link";
import Image from "next/image";
import "./cart.css"; // 👈 add this

export default function CartPage() {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const { subtotal, tax, shipping, total } = useSelector(selectTotals);

  return (
    <section className="container section">
      <h1 className="h2">Your Cart</h1>

      {items.length === 0 ? (
        <p className="muted" style={{ marginTop: 12 }}>
          Your cart is empty.
        </p>
      ) : (
        <>
          {items.map((it) => (
            <div key={it._key} className="card cartLine">
              {/* image */}
              <Image
                className="cartLineImg"
                src={it.image || it.image_url || "/placeholder.png"}
                alt={it.title}
                width={100}
                height={100}
              />

              {/* info */}
              <div className="cartLineInfo">
                <div className="cartTitle">{it.title}</div>
                <div className="cartPrice">EGP {Number(it.price).toFixed(2)}</div>

                {it.customName ? (
                  <div className="muted cartMeta">Name: {it.customName}</div>
                ) : null}

                {it.selectedColorName ? (
                  <div className="muted cartMeta">Color: {it.selectedColorName}</div>
                ) : null}

                <div className="cartQtyRow">
                  <button className="btn" onClick={() => dispatch(decrease(it.id))}>–</button>
                  <span>{it.qty}</span>
                  <button className="btn" onClick={() => dispatch(increase(it.id))}>+</button>
                  <button className="btn" onClick={() => dispatch(removeItem(it.id))}>
                    Remove
                  </button>
                </div>
              </div>

              {/* line total */}
              <div className="cartLineTotal">
                Line: EGP {(it.qty * Number(it.price)).toFixed(2)}
              </div>
            </div>
          ))}

          {/* Summary */}
          <div className="card cartSummary">
            {/* <div>Subtotal: <strong>EGP {subtotal.toFixed(2)}</strong></div> */}
            {/* <div>Tax: <strong>EGP {tax.toFixed?.(2) || tax}</strong></div> */}
            {/* <div>Shipping: <strong>EGP {shipping.toFixed?.(2) || shipping}</strong></div> */}
            <div className="cartGrand">
              Total: EGP {total.toFixed(2)}
            </div>
            <div className="cartActions">
              <button className="btn" onClick={() => dispatch(clearCart())}>
                Clear Cart
              </button>
              <Link href="/checkout" className="btn btn-primary">
                Checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
