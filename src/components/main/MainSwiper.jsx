import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./MainSwiper.css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const MainSwiper = () => {
  return (
    <Swiper
      slidesPerView={2}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      loop={true}
      spaceBetween={30}
      pagination={{ clickable: true }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      <SwiperSlide>
        <img src="/banner1.png" alt="Banner 1" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/banner2.png" alt="Banner 2" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/banner3.png" alt="Banner 3" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/banner1.png" alt="Banner 1" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/banner2.png" alt="Banner 2" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/banner3.png" alt="Banner 3" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/banner1.png" alt="Banner 1" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/banner2.png" alt="Banner 2" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/banner3.png" alt="Banner 3" />
      </SwiperSlide>
    </Swiper>
  );
};

export default MainSwiper;
