"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

export default function Home() {
  const [properties, setProperties] = useState<any[]>([]);

  useEffect(() => {
    getProperties();
  }, []);

  async function getProperties() {
    const { data, error } = await supabase
      .from("properties")
      .select("*");

    if (error) {
      console.log(error);
    } else {
      setProperties(data || []);
    }
  }

  return (
    <div
      style={{
        background: "#0a0a0a",
        minHeight: "100vh",
        color: "white",
        fontFamily: "sans-serif",
      }}
    >
      {/* NAVBAR */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 40px",
          borderBottom: "1px solid #222",
          position: "sticky",
          top: 0,
          background: "#0a0a0a",
          zIndex: 1000,
        }}
      >
        <h1
          style={{
            fontSize: "30px",
            fontWeight: "bold",
            color: "#d4af37",
          }}
        >
          ELROBY GROUP
        </h1>

        <div
          style={{
            display: "flex",
            gap: "25px",
            fontSize: "18px",
          }}
        >
          <p>الرئيسية</p>

          <p>شقق للبيع</p>

          <p>شقق للإيجار</p>

          <p>تواصل معنا</p>
        </div>
      </div>

      {/* HERO SECTION */}

      <div
        style={{
          height: "400px",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1600585154526-990dced4db0d)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "60px",
            marginBottom: "20px",
            textShadow: "0 0 20px black",
          }}
        >
          ELROBY GROUP
        </h1>

        <p
          style={{
            fontSize: "24px",
            textShadow: "0 0 10px black",
          }}
        >
          أفضل العقارات للبيع والإيجار
        </p>
      </div>

      {/* PROPERTIES */}

      <div
        style={{
          padding: "40px",
        }}
      >
        {properties.map((property) => (
          <div
            key={property.id}
            style={{
              background: "#111",
              borderRadius: "20px",
              overflow: "hidden",
              marginBottom: "40px",
              border: "1px solid #222",
            }}
          >
            {/* SLIDER */}

           <Swiper
  navigation={true}
  modules={[Navigation]}
>
  {property.Images?.map((img: string, index: number) => (
    <SwiperSlide key={index}>
      <img
        src={img}
        alt=""
        style={{
          width: "100%",
          height: "500px",
          objectFit: "cover",
        }}
      />
    </SwiperSlide>
  ))}
</Swiper>

            {/* DETAILS */}

            <div
              style={{
                padding: "25px",
              }}
            >
              <h2
                style={{
                  fontSize: "32px",
                  marginBottom: "15px",
                }}
              >
                {property.Title}
              </h2>

              <p>📍 {property.Location}</p>

              <p>💰 {property.Price} جنيه</p>

              <p>📐 {property.Area} متر</p>

              <p>🏢 الدور: {property.Floor}</p>

              <p>🛏️ غرف: {property.Bedrooms}</p>

              <p>🚿 حمامات: {property.Bathrooms}</p>

              <p>🛋️ ريسبشن: {property.Reception}</p>

              <p
                style={{
                  marginTop: "20px",
                  color: "#ccc",
                  lineHeight: "1.8",
                }}
              >
                {property.Description}
              </p>

              <button
                style={{
                  marginTop: "25px",
                  background: "#d4af37",
                  color: "black",
                  border: "none",
                  padding: "15px 25px",
                  borderRadius: "10px",
                  fontSize: "18px",
                  cursor: "pointer",
                }}
              >
                تواصل واتساب
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}