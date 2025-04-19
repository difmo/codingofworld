import React from "react";

const SectionTitle = ({
  title,
  paragraph,
  width = "70%",
  center,
  mb = "100px",
}) => {
  return (
    <div
      className={`wow fadeInUp w-full ${center ? "mx-auto text-center" : ""}`}
      data-wow-delay=".1s"
      style={{ maxWidth: width, mxarginBottom: mb }}
    >
      <h2 className="mb-4  text-3xl font-bold !leading-tight text-primary dark:text-primary sm:text-4xl md:text-[45px]">
        {title}
      </h2>
      <p className="text-base dark:text-white !leading-relaxed text-body-color md:text-lg">
        {paragraph}
      </p>
    </div>
  );
};

export default SectionTitle;
