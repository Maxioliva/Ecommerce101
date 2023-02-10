import classNames from 'classnames';
import { useEffect, useState } from 'react';
import './style.scss';

type CarouselProps = {
  images: string[];
};

const Carousel = (props: CarouselProps) => {
  const [activeSlide, setActiveSlide] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide(activeSlide === props.images.length - 1 ? 0 : activeSlide + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, [activeSlide]);
  const onChance = (scenario: 'next' | 'prev') => {
    const lastItemIndex = props.images.length - 1;
    const nextItem = activeSlide === lastItemIndex ? 0 : activeSlide + 1;
    const prevItem = activeSlide === 0 ? lastItemIndex : activeSlide - 1;
    setActiveSlide(scenario === 'next' ? nextItem : prevItem);
  };

  return (
    <div className="carousel">
      <div className="carousel__buttonContainer">
        <span className="carousel__button" onClick={() => onChance('prev')}>
          {'<'}
        </span>
        <span className="carousel__button carousel__button-next" onClick={() => onChance('next')}>
          {'>'}
        </span>
      </div>

      {props.images.map((p, i) => (
        <div
          key={i}
          style={{ transform: `translate(-${activeSlide * 100}%)` }}
          className={classNames('carousel__item', { 'carousel__item--active': i === activeSlide })}
        >
          <img className="image" src={p} />
        </div>
      ))}
    </div>
  );
};

export default Carousel;
