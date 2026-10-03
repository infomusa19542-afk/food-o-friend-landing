"use client";

export default function Home() {
  const imageUrl =
    "https://nipbfuwpxuoibuornhfd.supabase.co/storage/v1/object/public/site-assets/food.png";

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#111",
        color: "#fff",
        padding: "40px",
      }}
    >
      <h1>Food O Friend</h1>

      <p style={{ marginTop: "12px", marginBottom: "24px" }}>
        Testing Supabase Storage image
      </p>

      <img
        src={imageUrl}
        alt="Food O Friend test"
        style={{
          width: "100%",
          maxWidth: "900px",
          height: "auto",
          display: "block",
          borderRadius: "16px",
        }}
      />

      <p
        style={{
          marginTop: "20px",
          wordBreak: "break-all",
          opacity: 0.7,
        }}
      >
        {imageUrl}
      </p>
    </main>
  );
}