import React, { ReactNode, useState } from 'react';
import styles from './Slider.module.scss';

interface SliderProps {
  children: ReactNode[];
  width: number;
}

const Slider = (props: SliderProps) => {
  const [index, setIndex] = useState(0);
  const previousSlide = () =>
    setIndex(i => Math.abs((i - 1) % props.children.length));
  const nextSlide = () => setIndex(i => (i + 1) % props.children.length);

  return (
    <div className={styles.Container}>
      <div
        className={styles.SliderContainer}
        style={{
          width: `${100 * props.width}%`,
        }}
      >
        {props.children.map((x, i) => (
          <Slide
            key={i}
            index={i}
            selectedIndex={index}
            numberOfSlides={props.children.length}
          >
            {x}
          </Slide>
        ))}
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

const Slide = (props: {
  children: ReactNode;
  index: number;
  selectedIndex: number;
  numberOfSlides: number;
}) => {
  const left = calculatePosition(
    props.index,
    props.selectedIndex,
    props.numberOfSlides,
  );

  return (
    <div
      className={styles.Slide}
      style={{
        left,
      }}
    >
      {props.children}
      {props.index}
    </div>
  );
};

function calculatePosition(
  index: number,
  selectedIndex: number,
  numberOfSlides: number,
): string {
  const dist = index - selectedIndex;
  const relativeDist =
    Math.abs(dist) < numberOfSlides / 2
      ? dist
      : numberOfSlides - Math.abs(dist);
  const absRelativeDist =
    dist > relativeDist ? -Math.abs(relativeDist) : relativeDist;

  return `${absRelativeDist * 100}%`;
}
