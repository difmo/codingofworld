// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/autoplay";

// import {
//   SiGoogle,
//   SiAmazon,
//   SiMeta,
//   SiAdobe,
//   SiNetflix,
//   SiTesla,
// } from "react-icons/si";

// const partners = [
//   { icon: <SiGoogle />, name: "Google" },
//   { icon: <SiAmazon />, name: "Amazon" },
//   { icon: <SiAmazon />, name: "Microsoft" },
//   { icon: <SiMeta />, name: "Meta" },
//   { icon: <SiAdobe />, name: "Adobe" },
//   { icon: <SiNetflix />, name: "Netflix" },
//   { icon: <SiTesla />, name: "Tesla" },
// ];

// const PartnerLogos = () => {
//   return (
//     <div className="my-10 px-4">
//       <h2 className="text-center text-2xl font-bold text-black dark:text-white mb-6">
//         Our Partners
//       </h2>
//       <Swiper
//         modules={[Autoplay]}
//         spaceBetween={40}
//         slidesPerView={3}
//         loop={true}
//         autoplay={{ delay: 2000 }}
//         breakpoints={{
//           640: { slidesPerView: 3 },
//           768: { slidesPerView: 4 },
//           1024: { slidesPerView: 5 },
//         }}
//       >
//         {partners.map((partner, index) => (
//           <SwiperSlide
//             key={index}
//             className="flex justify-center items-center text-5xl text-gray-500 hover:text-primary transition"
//           >
//             {partner.icon}
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default PartnerLogos;
