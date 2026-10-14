import { ImageResponse } from "next/og";

export const alt =
  "AfriTech Elite : création de sites web au Bénin et cours de mathématiques";
export const size = {
  width: 1200,
  height: 630,
};
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
          padding: "72px",
          background:
            "radial-gradient(ellipse at 12% 0%, #c98a2c 0%, transparent 42%), linear-gradient(135deg, #f6f1e7 0%, #fffdf8 100%)",
          color: "#241c15",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div style={{ display: "flex", color: "#233a5c", fontSize: 34, fontWeight: 700 }}>
          AfriTech Elite
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 1000 }}>
          <div style={{ color: "#a8452f", fontSize: 23, fontWeight: 700, letterSpacing: 3 }}>
            DES SERVICES ADAPTÉS À VOS BESOINS
          </div>
          <div
            style={{
              color: "#233a5c",
              fontFamily: "Georgia, Times New Roman, serif",
              fontSize: 62,
              lineHeight: 1.13,
            }}
          >
            Sites web professionnels & cours de mathématiques
          </div>
          <div style={{ color: "#665d52", fontSize: 28 }}>Au Bénin · En ligne et selon votre projet</div>
        </div>
        <div style={{ display: "flex", width: 110, height: 5, background: "#c98a2c" }} />
      </div>
    ),
    size,
  );
}
