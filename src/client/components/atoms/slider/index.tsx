import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import './style.scss';
import { Autoplay, Pagination, Navigation, Scrollbar } from 'swiper';
import { getAssetUrl } from '../../../utils/config';

const Slider = () => (
  <Swiper
    modules={[Autoplay, Navigation, Pagination, Scrollbar]}
    className="slider"
    loop={true}
    autoplay={{ delay: 4000 }}
    autoHeight={true}
    spaceBetween={1}
    slidesPerView={1}
    navigation
    pagination={{ clickable: true }}
    scrollbar={{ draggable: true }}
  >
    <SwiperSlide>
      <img className="sliderimg" src={getAssetUrl('./slider/slider2.jpg')} />
    </SwiperSlide>
    <SwiperSlide>
      <img className="sliderimg" src={getAssetUrl('./slider/slider3.jpg')} />{' '}
    </SwiperSlide>
    <SwiperSlide>
      <img className="sliderimg" src={getAssetUrl('./slider/slider3.webp')} />
    </SwiperSlide>
    <SwiperSlide>
      <img className="sliderimg" src={getAssetUrl('./slider/slider4.jpeg')} />{' '}
    </SwiperSlide>
  </Swiper>
);

export default Slider;
