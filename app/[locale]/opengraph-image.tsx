import { ImageResponse } from "next/og";
import { profile, t } from "@/content/profile";
import { routing, type Locale } from "@/i18n/routing";

export const alt = `${profile.name} · ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = (
    routing.locales.includes(locale as Locale) ? locale : routing.defaultLocale
  ) as Locale;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background: "#0a0a0b",
        backgroundImage:
          "radial-gradient(rgba(255,255,255,0.08) 1.5px, transparent 1.5px)",
        backgroundSize: "28px 28px",
        color: "#f4f4f5",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 14,
            background: "#b4f461",
            color: "#0a0a0b",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 26,
            fontWeight: 700,
          }}
        >
          {profile.initials}
        </div>
        <div style={{ fontSize: 30, color: "#a1a1aa" }}>{profile.name}</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <div
          style={{
            fontSize: 76,
            fontWeight: 700,
            letterSpacing: -2,
            lineHeight: 1.05,
          }}
        >
          {profile.title}
        </div>
        <div style={{ fontSize: 32, color: "#a1a1aa", maxWidth: 960 }}>
          {t(profile.tagline, lang)}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          fontSize: 24,
          color: "#b4f461",
          fontFamily: "monospace",
        }}
      >
        {'> generate post --icp "retail" --format carousel'}
      </div>
    </div>,
    size,
  );
}
