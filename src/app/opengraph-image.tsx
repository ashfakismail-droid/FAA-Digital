import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #12102E 0%, #1C1B47 50%, #17153C 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Grid texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            display: "flex",
          }}
        />
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: -200,
            left: "50%",
            width: 900,
            height: 500,
            borderRadius: 9999,
            background: "rgba(95, 92, 230, 0.35)",
            filter: "blur(120px)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: "#4B49D6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 32px rgba(75,73,214,0.5)",
            }}
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="white">
              <path d="M13 2 4.5 13.5H11L9.5 22 19 10h-6.5L13 2Z" />
            </svg>
          </div>
          <span style={{ color: "white", fontSize: 34, fontWeight: 700, letterSpacing: "-0.02em" }}>
            {site.name}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <span
            style={{
              color: "#9DA0F7",
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Premium Digital Agency
          </span>
          <span
            style={{
              color: "white",
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              maxWidth: 900,
            }}
          >
            Exceptional digital experiences for modern businesses
          </span>
          <div style={{ display: "flex", gap: 32, marginTop: 8 }}>
            {["Websites", "E-Commerce", "Web Apps", "UI/UX", "SEO"].map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  color: "rgba(255,255,255,0.75)",
                  fontSize: 24,
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 999,
                    background: "#7A78F0",
                    display: "flex",
                  }}
                />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
