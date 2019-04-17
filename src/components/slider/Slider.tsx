import React, { ReactNode, useState } from 'react';
import { animated, useSpring, interpolate } from 'react-spring';
import styles from './Slider.module.scss';

interface SliderProps {
  children: ReactNode[];
  width: number;
}

const Slider = (props: SliderProps) => {
  const numberOfSlides = props.children.length;

  const [index, setIndex] = useState(0);
  const previousSlide = () =>
    setIndex(i => (i <= 0 ? numberOfSlides - 1 : (i - 1) % numberOfSlides));
  const nextSlide = () => setIndex(i => (i + 1) % numberOfSlides);

  return (
    <div className={styles.Container}>
      <div
        className={styles.SliderContainer}
        style={{
          width: `${100 * props.width}%`,
        }}
      >
        {props.children.map((x, i) => {
          const position = calculatePosition(i, index, numberOfSlides);

          return (
            <Slide key={i} position={position}>
              {x}
            </Slide>
          );
        })}
      </div>
      <div className={styles.ButtonsContainer}>
        <button type='button' onClick={previousSlide}>
          Prev
        </button>
        <button type='button' onClick={nextSlide}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Slider;

const Slide = (props: { children: ReactNode; position: number }) => {
  const { position } = props;
  const { left } = useSpring({
    left: 100 * position,
    from: { left: 100 * position },
  });

  return (
    <animated.div
      className={styles.Slide}
      style={{
        zIndex: Math.abs(position) > 1 ? -1 : 0,
        left: left.interpolate((l: any) => `${l}%`),
      }}
    >
      {props.children}
    </animated.div>
  );
};

function calculatePosition(
  index: number,
  selectedIndex: number,
  numberOfSlides: number,
): number {
  const dist = index - selectedIndex;
  const relativeDist =
    Math.abs(dist) < numberOfSlides / 2
      ? dist
      : numberOfSlides - Math.abs(dist);

  return dist > relativeDist ? -Math.abs(relativeDist) : relativeDist;
}
