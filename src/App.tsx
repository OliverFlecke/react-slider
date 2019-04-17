import React from 'react';
import styles from './App.module.scss';
import Slider from './components/slider/Slider';

function App() {
  return (
    <div className={styles.Container}>
      <Slider width={0.8}>
        <div className={styles.First} />
        <div className={styles.Second} />
        <div className={styles.Third} />
        <div className={styles.Fourth} />
        <div className={styles.Fifth} />
      </Slider>
    </div>
  );
}

export default App;
