import React, { useState } from 'react';

const CarouselContent = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    //sdsamdw polfz saflpq;wmf x kl
    const slides = [
        {
            src: "https://lh3.googleusercontent.com/kvQj_YkSm3qW_5mNA-IbuIqeXllMSJfMfqjKfbt3N7DHLC_sFz7_7Zzh7UZfrEtwnCRqUNW8FH1YBko9oUB5PKBX2tnaqUDoesoGREAC6TNLCYtWYZg",
            alt: "Google intern wearing a hat on a hike",
            content: "Hiking adventure with a Google intern!"
        },
        {
            src: "https://lh3.googleusercontent.com/P8-8zQQ2s-yqF0ISXY_QD8hpXXnlhq-iHU2iNimO2UZcr_5eASpTDUNBp4MftwArAm_faAwLX9p_qw3tC5wv56TfcLU_xQrQm5iOJTMCnSJtCNIDzQ",
            alt: "Google intern and her dog",
            content: "A lovely day out with my furry friend!"
        },
        {
            src: "https://lh3.googleusercontent.com/GF6L44WbcTbxPzBTMl0mRMN5ddh43qVUtWRHGzbhuKdeK8sE4SMKtcAPT7TCTsnUb767_ZDlavgP2mmLr13Lr9jjM0TZfU-G-YP9ARZe6CPklM9bXP1A",
            alt: "Google interns making a G",
            content: "Team spirit is everything!"
        },
    ];

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : slides.length - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex < slides.length - 1 ? prevIndex + 1 : 0));
    };

    return (
        <div className="flex flex-col items-center justify-center bg-gray-100  m-10 rounded-full p-10">
            <div>

            </div>
            <div className="flex w-full max-w-4xl mx-auto">
                <div className="flex-shrink-0 w-1/2 h-64">
                    <img src={slides[currentIndex].src} alt={slides[currentIndex].alt} className="object-cover w-full h-full" />
                </div>
                <div className="w-1/2 h-64 flex items-center justify-center bg-white p-4 shadow-md">
                    <p className="text-lg text-gray-800">{slides[currentIndex].content}</p>
                </div>
            </div>
            <div className="flex justify-center mt-4">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`w-3 h-3 mx-1 rounded-full ${currentIndex === index ? 'bg-primary' : 'bg-gray-400'} hover:bg-gray-500`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default CarouselContent;
