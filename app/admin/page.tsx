"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [area, setArea] = useState("");
  const [floor, setFloor] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [reception, setReception] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("sale");

  const [image1, setImage1] = useState<any>(null);
  const [image2, setImage2] = useState<any>(null);
  const [image3, setImage3] = useState<any>(null);
  const [image4, setImage4] = useState<any>(null);

  async function handleAddProperty(e: any) {
    e.preventDefault();

    try {
      if (!image1 || !image2 || !image3 || !image4) {
        alert("ارفع كل الصور");
        return;
      }

      const files = [image1, image2, image3, image4];

      const uploadedImages = [];

      for (const file of files) {
        const fileName = `${Date.now()}-${file.name}`;

        const { error: uploadError } = await supabase.storage
          .from("properties")
          .upload(fileName, file);

        if (uploadError) {
          console.log(uploadError);
          alert(uploadError.message);
          return;
        }

        const { data } = supabase.storage
          .from("properties")
          .getPublicUrl(fileName);

        uploadedImages.push(data.publicUrl);
      }

      const { error } = await supabase
        .from("properties")
        .insert([
          {
            Title: title,
            Price: Number(price),
            Location: location,
            Area: Number(area),
            Floor: Number(floor),
            Bedrooms: Number(bedrooms),
            Bathrooms: Number(bathrooms),
            Reception: Number(reception),
            Description: description,
            type: type,
            Images: uploadedImages,
          },
        ]);

      if (error) {
        console.log(error);
        alert(error.message);
      } else {
        alert("تم إضافة العقار بنجاح");

        setTitle("");
        setPrice("");
        setLocation("");
        setArea("");
        setFloor("");
        setBedrooms("");
        setBathrooms("");
        setReception("");
        setDescription("");

        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
      }
    } catch (err) {
      console.log(err);
      alert("في مشكلة");
    }
  }

  return (
    <div
      style={{
        background: "#0a0a0a",
        minHeight: "100vh",
        padding: "40px",
        color: "white",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "40px",
          color: "#d4af37",
        }}
      >
        إضافة عقار
      </h1>

      <form
        onSubmit={handleAddProperty}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          maxWidth: "700px",
          margin: "auto",
        }}
      >
        <input
          placeholder="اسم العقار"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="السعر"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          placeholder="المكان"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          placeholder="المساحة"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />

        <input
          placeholder="الدور"
          value={floor}
          onChange={(e) => setFloor(e.target.value)}
        />

        <input
          placeholder="عدد الغرف"
          value={bedrooms}
          onChange={(e) => setBedrooms(e.target.value)}
        />

        <input
          placeholder="عدد الحمامات"
          value={bathrooms}
          onChange={(e) => setBathrooms(e.target.value)}
        />

        <input
          placeholder="الريسبشن"
          value={reception}
          onChange={(e) => setReception(e.target.value)}
        />

        <textarea
          placeholder="الوصف"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="sale">للبيع</option>
          <option value="rent">للإيجار</option>
        </select>

        <div>
          <p>الصورة الأولى</p>
          <input
            type="file"
            onChange={(e: any) => setImage1(e.target.files[0])}
          />
        </div>

        <div>
          <p>الصورة الثانية</p>
          <input
            type="file"
            onChange={(e: any) => setImage2(e.target.files[0])}
          />
        </div>

        <div>
          <p>الصورة الثالثة</p>
          <input
            type="file"
            onChange={(e: any) => setImage3(e.target.files[0])}
          />
        </div>

        <div>
          <p>الصورة الرابعة</p>
          <input
            type="file"
            onChange={(e: any) => setImage4(e.target.files[0])}
          />
        </div>

        <button
          type="submit"
          style={{
            background: "#d4af37",
            color: "black",
            padding: "18px",
            border: "none",
            borderRadius: "12px",
            fontSize: "20px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          إضافة العقار
        </button>
      </form>
    </div>
  );
}