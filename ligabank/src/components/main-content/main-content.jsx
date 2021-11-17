import React from 'react';
import Calculator from '../calculator/calculator';
// import CalculatorForm from '../calculator-form/calculator-form';
import ServicesSlider from '../services-slider/services-slider';
import Slider from '../slider/slider';

export default function MainContent() {
  return (
    <main>
      <h1 className='visually-hidden'>Лига Банк - Рассчитать кредит</h1>
      <Slider />
      <ServicesSlider />
      {/* <CalculatorForm /> */}
      <Calculator />
    </main>
  );
}
