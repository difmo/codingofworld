import React from 'react';

const NestedContainersExample = () => {
    return (
        <div className="bg-blue-400">
            {/* Outer Container */}

            <div className="bg-yellow-500 w-40 h-40 fixed top-0 z-10">
                navbar
                <br /> navbar
                <br /> navbar
                <br /> navbar
                <br /> navbar
            </div>

            <h2 className="text-4xl relative bg-red-300 top-40" > {/* Adjust based on navbar height */}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae cumque sunt voluptates cupiditate maxime dolor eum dicta possimus distinctio! Quidem?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae cumque sunt voluptates cupiditate maxime dolor eum dicta possimus distinctio! Quidem?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae cumque sunt voluptates cupiditate maxime dolor eum dicta possimus distinctio! Quidem?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae cumque sunt voluptates cupiditate maxime dolor eum dicta possimus distinctio! Quidem?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae cumque sunt voluptates cupiditate maxime dolor eum dicta possimus distinctio! Quidem?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae cumque sunt voluptates cupiditate maxime dolor eum dicta possimus distinctio! Quidem?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae cumque sunt voluptates cupiditate maxime dolor eum dicta possimus distinctio! Quidem?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae cumque sunt voluptates cupiditate maxime dolor eum dicta possimus distinctio! Quidem?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae cumque sunt voluptates cupiditate maxime dolor eum dicta possimus distinctio! Quidem?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae cumque sunt voluptates cupiditate maxime dolor eum dicta possimus distinctio! Quidem?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae cumque sunt voluptates cupiditate maxime dolor eum dicta possimus distinctio! Quidem?
                {/* ... rest of the content ... */}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae cumque sunt voluptates cupiditate maxime dolor eum dicta possimus distinctio! Quidem?
            </h2>
        </div>
    );
};

export default NestedContainersExample;
