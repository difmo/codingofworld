import React from 'react';
import Lottie from 'react-lottie';
import HelicopterAnimation from '../../assets/helicopter.json'; // path to your animation

const HelicopterAnimationComponent = () => {
  // Lottie animation options
  const defaultOptions = {
    loop: true, // Keep looping the animation
    autoplay: true, // Autoplay when component renders
    animationData: HelicopterAnimation, // path to the animation JSON
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice', // Keep the aspect ratio correct
    },
  };

  return (
    <div className="helicopter-animation-container relative w-full">
      {/* Helicopter animation */}
      <Lottie options={defaultOptions} height={120} width={120} />

      {/* Optional: Add animation controls */}
      {/* <button onClick={() => lottie.play()}>Play</button> */}
      {/* <button onClick={() => lottie.stop()}>Stop</button> */}
    </div>
  );
};

export default HelicopterAnimationComponent;
