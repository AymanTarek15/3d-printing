import Image from "next/image";

/**
 * Image plate with a brand-coloured fallback.
 *
 * Every image slot renders a placeholder until a real `src` is supplied, so a
 * missing photo reads as a deliberate plate rather than a broken frame.
 */
export default function Media({ src, alt = "", ratio = "4x3", className = "", priority = false }) {
  return (
    <div className={`media media--${ratio} ${className}`}>
      {src ? (
        <Image src={src} alt={alt} fill sizes="(max-width: 900px) 100vw, 33vw" priority={priority} />
      ) : (
        <div className="media-ph" role="img" aria-label={alt || "Placeholder image"}>
          <CubeGlyph />
        </div>
      )}
    </div>
  );
}

/* Isometric cube — echoes the cube in the FATH logo. */
function CubeGlyph() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M32 6 58 20v24L32 58 6 44V20L32 6z" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M6 20l26 14 26-14M32 34v24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  );
}
