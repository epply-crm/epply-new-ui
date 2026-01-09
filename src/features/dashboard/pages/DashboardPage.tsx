import SwiperComponent from '@/components/ui/Swiper';
import Typography from '@/components/ui/Typography';
import CarouselImage from '../../../assets/images/e-carousel.png';
import { useEffect } from 'react';

const DashboardPage = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .swiper-button-next::after, .swiper-button-prev::after {
        content: '';
      }
      .swiper-button-next, .swiper-button-prev {
        width: 2.5rem;
        height: 2.5rem;
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 9999px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .swiper-button-next i, .swiper-button-prev i {
        font-size: 1.25rem;
        color: white;
      }
        .swiper-pagination-bullet-active {
        background-color: #db0f67;
      }
    `;
    document.head.appendChild(style);

    const nextButton = document.querySelector('.swiper-button-next');
    const prevButton = document.querySelector('.swiper-button-prev');

    if (nextButton) {
      nextButton.innerHTML = '<i class="ki-solid ki-right"></i>';
    }
    if (prevButton) {
      prevButton.innerHTML = '<i class="ki-solid ki-left"></i>';
    }

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div>
      <Typography variant="h4">Dashboard</Typography>
      <div className="grid grid-cols-12 gap-6 md:gap-8 lg:gap-10">
        {/* Dashboard Title*/}
        <div className="col-span-8">
          {/* Dashboard Content */}
          <SwiperComponent
            slidesPerView={1}
            spaceBetween={20}
            loop={true}
            className="h-64 rounded-2xl"
          >
            <img
              className="h-full w-full object-cover"
              src={CarouselImage}
              alt="Slide 1"
            />
            <img
              className="h-full w-full object-cover"
              src={CarouselImage}
              alt="Slide 2"
            />
            <img
              className="h-full w-full object-cover"
              src={CarouselImage}
              alt="Slide 3"
            />
          </SwiperComponent>
        </div>
        <div className="col-span-4">
          <Typography variant="h4">Sidebar</Typography>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
