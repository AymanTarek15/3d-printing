"use client";
import { useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "@/store/cartSlice";
import { toggleWishlist, selectIsWishlistedById } from "@/store/wishlistSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { formatPrice } from "@/app/lib/format";
import Rating from "@/components/ui/Rating";
import Image from "next/image";
import "./productdetailclient.css";

export default function ProductDetailClient({ product }) {
  // ----- Base fields -----
  const id = product.id;
  const title = product.title;
  const basePrice = Number(product.price || 0);
  const productFallback =
    (product.color_options && product.color_options[0]?.image_url) ||
    product.image_url ||
    product.image ||
    "/placeholder.png";
  const rating = Number(product.rating || 0);
  const description = product.description || "No description provided.";

  const dispatch = useDispatch();
  const isWishlisted = useSelector(selectIsWishlistedById(id));

  const [qty, setQty] = useState(1);

  // ===== Personalization availability & fees =====
  const showEn = !!product.english_name_entry_only;
  const showAr = !!product.arabic_name_entry_only;
  const showBoth = !!product.both_name_entry;
  const showPersonalization = showEn || showAr || showBoth;

  const FEES = {
    none: 0,
    en: Number(product.single_language_price || 0),
    ar: Number(product.single_language_price || 0),
    both: Number(product.two_language_price || 0),
  };

  const [pOption, setPOption] = useState("none");
  const [enName, setEnName] = useState("");
  const [arName, setArName] = useState("");
  const [nameError, setNameError] = useState(false);

  const personalizationFee = FEES[pOption] || 0;
  const unitPrice = basePrice + personalizationFee;

  // ===== Font options from product flags =====
  const enFonts = useMemo(() => {
    const opts = [];
    if (product.creamy_font) opts.push({ key: "creamy", label: "Creamy", className: "creamy" });
    if (product.goudy_font)  opts.push({ key: "goudy",  label: "Classic", className: "classic" });
    return opts;
  }, [product.creamy_font, product.goudy_font]);

  const arFonts = useMemo(() => {
    const opts = [];
    if (product.naskh_hadith_font) opts.push({ key: "naskh",  label: "Naskh",       className: "arabic-text" });
    if (product.babeloo_font)      opts.push({ key: "babeloo", label: "Handwritten", className: "handwritten" });
    return opts;
  }, [product.naskh_hadith_font, product.babeloo_font]);

  const [enFont, setEnFont] = useState(enFonts[0]?.key || null);
  const [arFont, setArFont] = useState(arFonts[0]?.key || null);

  useEffect(() => {
    setEnFont(enFonts[0]?.key || null);
    setArFont(arFonts[0]?.key || null);
  }, [enFonts, arFonts]);

  // ===== Gallery =====
  const gallery = useMemo(() => {
    const extra = (product.images || [])
      .map((img) => img?.image_url)
      .filter(Boolean);
    const unique = Array.from(new Set(extra));
    return unique.filter((src) => src !== productFallback);
  }, [product.images, productFallback]);

  const [mainSrc, setMainSrc] = useState(productFallback);
  const [staticThumbSrc, setStaticThumbSrc] = useState(productFallback);

  const secondaryThumbs = useMemo(() => {
    return (product.color_options || [])
      .map((co) => ({ id: co?.id, src: co?.image_url, label: co?.colour }))
      .filter((v) => v?.src);
  }, [product.color_options]);

  const [selectedVariant, setSelectedVariant] = useState(() => {
    const first = secondaryThumbs?.[0];
    return first ? { id: first.id, label: first.label, src: first.src } : null;
  });

  useEffect(() => {
    const first = secondaryThumbs?.[0];
    setSelectedVariant(
      first ? { id: first.id, label: first.label, src: first.src } : null
    );
    setMainSrc(productFallback);
    setStaticThumbSrc(productFallback);
  }, [productFallback, secondaryThumbs]);

  const onSelectSecondary = (v) => {
    setSelectedVariant({ id: v.id, label: v.label, src: v.src });
    setStaticThumbSrc(v.src);
  };

  const inc = () => setQty((q) => Math.min(q + 1, 99));
  const dec = () => setQty((q) => Math.max(q - 1, 1));

  // ===== Language helpers =====
  function isArabicText(str) {
    return /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\s'’\-0-9]+$/.test(
      str.trim()
    );
  }
  function isEnglishText(str) {
    return /^[A-Za-z\s'’-]+$/.test(str.trim());
  }
  function detectScript(str) {
    const s = str.trim();
    if (!s) return "empty";
    const hasAr =
      /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/.test(
        s
      );
    const hasEn = /[A-Za-z]/.test(s);
    if (hasAr && !hasEn) return "ar";
    if (hasEn && !hasAr) return "en";
    if (!hasAr && !hasEn) return "none";
    return "mixed";
  }

  // ===== Validation =====
  const validateNames = () => {
    if (pOption === "none") return true;

    if (pOption === "en") {
      if (!enName.trim() || !isEnglishText(enName)) return false;
      if (enFonts.length > 0 && !enFont) return false; // require font if options exist
      return true;
    }

    if (pOption === "ar") {
      if (!arName.trim() || !isArabicText(arName)) return false;
      if (arFonts.length > 0 && !arFont) return false;
      return true;
    }

    if (pOption === "both") {
      const enOk = enName.trim() && isEnglishText(enName) && (enFonts.length ? !!enFont : true);
      const arOk = arName.trim() && isArabicText(arName) && (arFonts.length ? !!arFont : true);
      return enOk && arOk;
    }
    return true;
  };

  // ===== Add to cart =====
  const handleAddToCart = () => {
    if (!validateNames()) {
      setNameError(true);
      return;
    }

    // const compositeName =
    //   pOption === "none"
    //     ? ""
    //     : `${enName.trim() || ""}|${arName.trim() || ""}|${pOption}`;

    const lineKey = [
  id,
  pOption || "none",
  (enName || "").trim(),
  (arName || "").trim(),
  enFont || "",
  arFont || "",
  selectedVariant?.id || ""   // color option id if any
].join("||");

    // dispatch(
    //   addItem({
    //     ...product,
    //     basePrice,
    //     personalizationFee,
    //     price: unitPrice,
    //     image: mainSrc,
    //     qty,
    //     personalizationOption: pOption,
    //     enName: enName.trim() || null,
    //     arName: arName.trim() || null,
    //     enFont: enFont || null,    // <-- save selected English font
    //     arFont: arFont || null,    // <-- save selected Arabic font
    //     customName: compositeName || null,
    //     selectedColorName: selectedVariant?.label || null,
    //     selectedColorOptionId: selectedVariant?.id || null,
    //   })
    // );
    dispatch(
  addItem({
    lineKey,            // <-- unique per configuration
    id,                 // product id (keep for backend)
    productId: id,      // explicit, used at checkout
    basePrice,
    personalizationFee,
    price: unitPrice,
    image: mainSrc,
    qty,
    personalizationOption: pOption,
    enName: enName.trim() || null,
    arName: arName.trim() || null,
    enFont: enFont || null,
    arFont: arFont || null,
    customName: pOption === "none" ? "" : `${enName.trim() || ""}|${arName.trim() || ""}|${pOption}`,
    selectedColorName: selectedVariant?.label || null,
    selectedColorOptionId: selectedVariant?.id || null,
    title,              // keep whatever fields your UI uses
  })
);

    setNameError(false);
    setEnName("");
    setArName("");
  };
  // console.log(product);

  return (
    <div className="pdWrap">
      <div className="pdGrid">
        {/* LEFT: Gallery */}
        <div className="pdGallery">
          <div className="pdThumbMain">
            <Image
              src={mainSrc}
              alt={title}
              width={720}
              height={540}
              sizes="(max-width: 900px) 100vw, 720px"
              priority
              className="pdImg"
            />
            <button
              className="pdWish"
              onClick={() =>
                dispatch(
                  toggleWishlist({
                    id,
                    title,
                    price: unitPrice,
                    image: mainSrc,
                  })
                )
              }
              aria-label={
                isWishlisted ? "Remove from wishlist" : "Add to wishlist"
              }
              title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <FontAwesomeIcon
                icon={faHeart}
                size="lg"
                style={{ color: isWishlisted ? "red" : "white" }}
              />
            </button>
          </div>

          {(staticThumbSrc || gallery.length > 0) && (
            <div className="pdThumbs" role="list">
              <button
                type="button"
                className={`pdThumb ${
                  mainSrc === staticThumbSrc ? "is-active" : ""
                }`}
                onClick={() => setMainSrc(staticThumbSrc)}
              >
                <Image src={staticThumbSrc} alt="" width={96} height={96} className="pdThumbImg" />
              </button>

              {gallery.map((src) => {
                const active = src === mainSrc;
                return (
                  <button
                    key={src}
                    type="button"
                    className={`pdThumb ${active ? "is-active" : ""}`}
                    onClick={() => setMainSrc(src)}
                  >
                    <Image src={src} alt="" width={96} height={96} className="pdThumbImg" />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* RIGHT: Info */}
        <div className="pdInfo card">
          <h1 className="h2">{title}</h1>

          <div
            style={{
              display: "flex",
              gap: 12,
              alignItems: "center",
              margin: "8px 0 12px",
            }}
          >
            {/* <Rating value={rating} /> */}
            {/* <span className="muted">({rating.toFixed(1)})</span> */}
          </div>

          <div className="pdPrice">
            {formatPrice(unitPrice)}
            {personalizationFee > 0 && (
              <span className="muted" style={{ marginLeft: 8, fontSize: 14 }}>
                (base {formatPrice(basePrice)} +{" "}
                {formatPrice(personalizationFee)})
              </span>
            )}
          </div>

          {/* Variants under price */}
          {secondaryThumbs.length > 0 && (
            <div className="pdSecondary">
              <div className="pdSecondaryLabel">Variants</div>
              <div className="pdSecondaryList">
                {secondaryThumbs.map((v) => {
                  const isActive = selectedVariant?.id === v.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      className={`pdSecondaryItem ${
                        isActive ? "is-active" : ""
                      }`}
                      onClick={() => onSelectSecondary(v)}
                    >
                      <Image
                        src={v.src}
                        alt={v.label || ""}
                        width={44}
                        height={44}
                        className="pdSecondaryImg"
                      />
                      {v.label ? (
                        <small className="pdSecondaryCaption">{v.label}</small>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <p className="muted" style={{ marginTop: 12, lineHeight: 1.6 }}>
            {description}
          </p>

          {/* Personalization */}
          {showPersonalization ? (
            <div style={{ marginTop: 16 }}>
              <div style={{ fontWeight: 600, marginBottom: 8 }}>
                Name Personalization
              </div>

              <div style={{ display: "grid", gap: 8, marginBottom: 10 }}>
                {/* Always allow None */}
                <label
                  style={{ display: "flex", alignItems: "center", gap: 8 }}
                >
                  <input
                    type="radio"
                    name="pOption"
                    value="none"
                    checked={pOption === "none"}
                    onChange={(e) => setPOption(e.target.value)}
                  />
                  <span>
                    None{" "}
                    <small className="muted">({formatPrice(FEES.none)})</small>
                  </span>
                </label>

                {showEn && (
                  <label
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <input
                      type="radio"
                      name="pOption"
                      value="en"
                      checked={pOption === "en"}
                      onChange={(e) => setPOption(e.target.value)}
                    />
                    <span>
                      English only{" "}
                      <small className="muted">(+{formatPrice(FEES.en)})</small>
                    </span>
                  </label>
                )}

                {showAr && (
                  <label
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <input
                      type="radio"
                      name="pOption"
                      value="ar"
                      checked={pOption === "ar"}
                      onChange={(e) => setPOption(e.target.value)}
                    />
                    <span>
                      Arabic only{" "}
                      <small className="muted">(+{formatPrice(FEES.ar)})</small>
                    </span>
                  </label>
                )}

                {showBoth && (
                  <label
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <input
                      type="radio"
                      name="pOption"
                      value="both"
                      checked={pOption === "both"}
                      onChange={(e) => setPOption(e.target.value)}
                    />
                    <span>
                      English + Arabic{" "}
                      <small className="muted">
                        (+{formatPrice(FEES.both)})
                      </small>
                    </span>
                  </label>
                )}
              </div>

              {product.note && pOption !== "none" ? (
                <div className="callout callout--warning" role="note">
                  <div className="callout__title">Note</div>
                  <p>{product.note}</p>
                </div>
              ) : null}

              {/* EN input + font radios */}
              {(pOption === "en" || pOption === "both") && (
                <div className="coRow" style={{ marginTop: 8 }}>
                  <label style={{ fontWeight: 600, marginBottom: 6 }}>
                    Name (English)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ayman"
                    value={enName}
                    onChange={(e) => {
                      const v = e.target.value;
                      setEnName(v);
                      if (nameError && v.trim()) setNameError(false);
                    }}
                    dir={detectScript(enName) === "ar" ? "rtl" : "ltr"}
                    pattern="[A-Za-z\s'’-]+"
                    inputMode="latin"
                    autoComplete="off"
                    maxLength={40}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      border:
                        nameError || (enName && !isEnglishText(enName))
                          ? "2px solid crimson"
                          : "1px solid #ccc",
                      borderRadius: 12,
                    }}
                  />
                  {enName && !isEnglishText(enName) ? (
                    <small style={{ color: "crimson" }}>
                      Please use English letters only.
                    </small>
                  ) : null}

                  {/* English font selection radios (appear when text entered) */}
                  {enFonts.length > 0 && enName.trim() ? (
                    <div style={{ marginTop: 8, display: "grid", gap: 6 }}>
                      <div className="muted" style={{ fontWeight: 600 }}>
                        Choose English font
                      </div>
                      <div style={{ display: "grid", gap: 6 }}>
                        {enFonts.map((f) => (
                          <label
                            key={f.key}
                            style={{ display: "flex", alignItems: "center", gap: 8 }}
                          >
                            <input
                              type="radio"
                              name="enFont"
                              value={f.key}
                              checked={enFont === f.key}
                              onChange={() => setEnFont(f.key)}
                            />
                            <span className={f.className}>{enName || "Preview"}</span>
                            <small className="muted" style={{ marginLeft: 6 }}>
                              ({f.label})
                            </small>
                          </label>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              )}

              {/* AR input + font radios */}
              {(pOption === "ar" || pOption === "both") && (
                <div className="coRow" style={{ marginTop: 8 }}>
                  <label style={{ fontWeight: 600, marginBottom: 6 }}>
                    الاسم (عربي)
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: أيمن"
                    value={arName}
                    onChange={(e) => {
                      const v = e.target.value;
                      setArName(v);
                      if (nameError && v.trim()) setNameError(false);
                    }}
                    dir={detectScript(arName) === "en" ? "ltr" : "rtl"}
                    pattern="[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\s'’\-0-9]+"
                    inputMode="text"
                    autoComplete="off"
                    maxLength={40}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      border:
                        nameError || (arName && !isArabicText(arName))
                          ? "2px solid crimson"
                          : "1px solid #ccc",
                      borderRadius: 12,
                    }}
                  />
                  {arName && !isArabicText(arName) ? (
                    <small style={{ color: "crimson" }}>
                      الرجاء الكتابة بالعربية فقط.
                    </small>
                  ) : null}

                  {/* Arabic font selection radios (appear when text entered) */}
                  {arFonts.length > 0 && arName.trim() ? (
                    <div style={{ marginTop: 8, display: "grid", gap: 6 }}>
                      <div className="muted" style={{ fontWeight: 600 }}>
                        اختر الخط العربي
                      </div>
                      <div style={{ display: "grid", gap: 6 }}>
                        {arFonts.map((f) => (
                          <label
                            key={f.key}
                            style={{ display: "flex", alignItems: "center", gap: 8 }}
                          >
                            <input
                              type="radio"
                              name="arFont"
                              value={f.key}
                              checked={arFont === f.key}
                              onChange={() => setArFont(f.key)}
                            />
                            <span className={f.className}>{arName || "معاينة"}</span>
                            <small className="muted" style={{ marginLeft: 6 }}>
                              ({f.label})
                            </small>
                          </label>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              )}

              {nameError && (
                <small
                  style={{ color: "crimson", marginTop: 6, display: "block" }}
                >
                  Please enter the required name(s) and choose a font where applicable.
                </small>
              )}
            </div>
          ) : null}

          <div className="pdControls">
            <div className="qty">
              <button className="btn" onClick={dec}>
                -
              </button>
              <span className="qtyNum">{qty}</span>
              <button className="btn" onClick={inc}>
                +
              </button>
            </div>

            <button className="btn btn-primary" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
