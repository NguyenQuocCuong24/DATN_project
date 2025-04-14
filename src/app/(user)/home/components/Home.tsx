'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";

const images = [
  "/assets/images/banner2.png",
  "/assets/images/img_respon01.png",
  "/assets/images/img_respon02.png",
];

const imageDescriptions = [
  [
    "Bản tin",
    "Hình ảnh",
    "Thời khóa Biểu",
    "Dinh dưỡng hàng ngày",
    "Biểu đồ sức khỏe",
    "Học phí",
    "Xin phép nghỉ học",
    "Dặn thuốc",
    "Lời nhắc đầu ngày",
  ],
  [
    "Quản lý trên thiết bị",
    "Không cần cài đặt",
    "Dữ liệu tập trung",
    "Quản lý từ xa",
  ],
  [
    "Khẩu phần dinh dưỡng",
    "Quản lý thu chi",
    "Theo dõi sức khỏe trẻ",
    "Báo cáo Phòng giáo dục",
    "Tin nhắn",
  ],
];

export default function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div>
      <div className="relative w-screen h-[500px] overflow-hidden group bg-white">
        {/* Background image */}
        <Image
          src="/assets/images/bg_slide02.png"
          alt="Background"
          fill
          className="object-cover z-0"
        />

        {/* Nội dung chính: Slide trượt ngang */}
        <div className="relative z-10 h-full w-full overflow-hidden">
          <div
            className="flex h-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >

            {images.map((img, index) => (
              <div key={index} className="w-full flex flex-shrink-0 h-full">
                {/* Text mô tả bên trái */}
                <div className="w-[55%] flex flex-col justify-center items-center px-10">
                  {imageDescriptions[index].map((text, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 mb-4 w-full max-w-md"
                    >
                      <CheckCircle className="text-green-600 w-6 h-6 flex-shrink-0" />
                      <span className="text-xl font-semibold text-gray-800 leading-tight">
                        {text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Ảnh bên phải */}
                <div className="w-[45%] relative">
                  <Image
                    src={img}
                    alt={`Slide ${index + 1}`}
                    fill
                    className="object-contain"
                    priority={index === currentIndex}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Nút chuyển slide */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-1/12 z-20 transform -translate-y-1/2 bg-white/70 hover:bg-white p-3 rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-1/12 z-20 transform -translate-y-1/2 bg-white/70 hover:bg-white p-3 rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ChevronRight size={28} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-white" : "bg-white/40"}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Tiêu đề dưới slider */}
      <div className="w-screen flex items-center justify-center bg-white py-10">
        <h1 className="text-5xl font-stix-two text-center">
          Phân hệ trong Quản lý trường bán trú trực tuyến
        </h1>
      </div>
    </div>
  );
}
