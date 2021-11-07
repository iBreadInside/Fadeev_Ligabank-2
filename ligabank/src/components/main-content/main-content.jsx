import React from 'react';
import ServicesSlider from '../services-slider/services-slider';
import Slider from '../slider/slider';

export default function MainContent() {
  return (
    <main>
      <h1 className='visually-hidden'>Лига Банк - Рассчитать кредит</h1>
      <Slider />
      <ServicesSlider />
    </main>
  );
}
