"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

export default function Home() {
  const [properties, setProperties] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");

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

  // FILTER
  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.Title?.toLowerCase().includes(search.toLowerCase()) ||
      property.Location?.toLowerCase().includes(search.toLowerCase());

    const matchesType =
      filterType === "all" || property.Type === filterType;

    return matchesSearch && matchesType;
  });

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
        {/* LOGO */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <img
            src="/logo.png"
            alt="logo"
            style={{
              width: "70px",
              height: "70px",
              objectFit: "contain",
            }}
          />

          <div>
            <h1
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                color: "#d4af37",
              }}
            >
              ELROBY GROUP
            </h1>

            <p
              style={{
                color: "#ccc",
                fontSize: "14px",
              }}
            >
              Real Estate
            </p>
          </div>
        </div>

        {/* MENU */}

        <div
          style={{
            display: "flex",
            gap: "25px",
            fontSize: "18px",
            alignItems: "center",
          }}
        >
          <p
            onClick={() => setFilterType("all")}
            style={{
              cursor: "pointer",
              color: filterType === "all" ? "#d4af37" : "white",
            }}
          >
            الرئيسية
          </p>

          <p
            onClick={() => setFilterType("sale")}
            style={{
              cursor: "pointer",
              color: filterType === "sale" ? "#d4af37" : "white",
            }}
          >
            شقق للبيع
          </p>

          <p
            onClick={() => setFilterType("rent")}
            style={{
              cursor: "pointer",
              color: filterType === "rent" ? "#d4af37" : "white",
            }}
          >
            شقق للإيجار
          </p>

          <a
            href="https://wa.me/201003456173?text=مرحبا%20اريد%20الاستفسار%20عن%20العقارات"
            target="_blank"
            style={{
              background: "#25D366",
              padding: "12px 20px",
              borderRadius: "10px",
              color: "white",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            WhatsApp
          </a>

          <a
            href="tel:01003456173"
            style={{
              background: "#d4af37",
              padding: "12px 20px",
              borderRadius: "10px",
              color: "black",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            📞 اتصل بنا
          </a>
        </div>
      </div>

      {/* HERO */}

      <div
        style={{
          height: "500px",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1600585154526-990dced4db0d)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
          }}
        />

        <img
          src="/logo.png"
          alt="logo"
          style={{
            width: "150px",
            marginBottom: "20px",
            zIndex: 2,
          }}
        />

        <h1
          style={{
            fontSize: "70px",
            marginBottom: "20px",
            textShadow: "0 0 20px black",
            zIndex: 2,
          }}
        >
          ELROBY GROUP
        </h1>

        <p
          style={{
            fontSize: "28px",
            textShadow: "0 0 10px black",
            zIndex: 2,
          }}
        >
          أفضل العقارات للبيع والإيجار
        </p>

        <a
          href="https://wa.me/201003456173"
          target="_blank"
          style={{
            marginTop: "30px",
            background: "#d4af37",
            color: "black",
            padding: "15px 35px",
            borderRadius: "12px",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "20px",
            zIndex: 2,
          }}
        >
          تواصل معنا الآن
        </a>
      </div>

      {/* SEARCH */}

      <div
        style={{
          padding: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginBottom: "40px",
            flexWrap: "wrap",
          }}
        >
          <input
            type="text"
            placeholder="ابحث عن شقة أو منطقة..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              minWidth: "250px",
              padding: "18px",
              borderRadius: "12px",
              border: "1px solid #333",
              background: "#111",
              color: "white",
              fontSize: "18px",
            }}
          />

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            style={{
              padding: "18px",
              borderRadius: "12px",
              border: "1px solid #333",
              background: "#111",
              color: "white",
              fontSize: "18px",
            }}
          >
            <option value="all">كل العقارات</option>
            <option value="sale">للبيع</option>
            <option value="rent">للإيجار</option>
          </select>
        </div>

        <h1
          style={{
            textAlign: "center",
            marginBottom: "40px",
            fontSize: "45px",
            color: "#d4af37",
          }}
        >
          العقارات المتاحة
        </h1>

        {/* PROPERTIES */}

        {filteredProperties.map((property) => (
          <div
            key={property.id}
            style={{
              background: "#111",
              borderRadius: "20px",
              overflow: "hidden",
              marginBottom: "50px",
              border: "1px solid #222",
              boxShadow: "0 0 20px rgba(0,0,0,0.5)",
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
                padding: "30px",
              }}
            >
              {/* TYPE */}

              <div
                style={{
                  display: "inline-block",
                  background:
                    property.Type === "sale"
                      ? "#d4af37"
                      : "#25D366",
                  color: "black",
                  padding: "8px 18px",
                  borderRadius: "10px",
                  marginBottom: "20px",
                  fontWeight: "bold",
                }}
              >
                {property.Type === "sale"
                  ? "للبيع"
                  : "للإيجار"}
              </div>

              <h2
                style={{
                  fontSize: "38px",
                  marginBottom: "20px",
                  color: "#d4af37",
                }}
              >
                {property.Title}
              </h2>

              <p style={{ marginBottom: "10px", fontSize: "20px" }}>
                📍 {property.Location}
              </p>

              <p style={{ marginBottom: "10px", fontSize: "20px" }}>
                💰 {property.Price} جنيه
              </p>

              <p style={{ marginBottom: "10px", fontSize: "20px" }}>
                📐 {property.Area} متر
              </p>

              <p style={{ marginBottom: "10px", fontSize: "20px" }}>
                🏢 الدور: {property.Floor}
              </p>

              <p style={{ marginBottom: "10px", fontSize: "20px" }}>
                🛏️ غرف: {property.Bedrooms}
              </p>

              <p style={{ marginBottom: "10px", fontSize: "20px" }}>
                🚿 حمامات: {property.Bathrooms}
              </p>

              <p style={{ marginBottom: "10px", fontSize: "20px" }}>
                🛋️ ريسبشن: {property.Reception}
              </p>

              <p
                style={{
                  marginTop: "25px",
                  color: "#ccc",
                  lineHeight: "2",
                  fontSize: "18px",
                }}
              >
                {property.Description}
              </p>

              <a
                href={`https://wa.me/201003456173?text=مرحبا اريد الاستفسار عن ${property.Title}`}
                target="_blank"
                style={{
                  display: "inline-block",
                  marginTop: "30px",
                  background: "#25D366",
                  color: "white",
                  textDecoration: "none",
                  padding: "15px 30px",
                  borderRadius: "12px",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                تواصل واتساب
              </a>
            </div>
          </div>
        ))}

        {/* NO RESULTS */}

        {filteredProperties.length === 0 && (
          <div
            style={{
              textAlign: "center",
              marginTop: "80px",
              color: "#999",
              fontSize: "28px",
            }}
          >
            لا توجد عقارات حالياً
          </div>
        )}
      </div>
    </div>
  );
}