import React from "react";

const AlldetailCourese = () => {
  const sections = [
    {
      // img: img1,
      id: "1",
      title: "React Development",
      description:
        "React, also known as ReactJS, is a popular and powerful JavaScript library used for building dynamic and interactive user interfaces, primarily for single-page applications (SPAs). It was developed and maintained by Facebook and has gained significant popularity due to its efficient rendering techniques, reusable components, and active community support.",
      topics: [
        "JSX (JavaScript XML) Syntax",
        "Functional & Class Components",
        "State & Props Management",
        "React Hooks (useState, useEffect)",
        "React Router for Navigation",
      ],
    },
    {
      // // img: img2,
      id: "2",
      title: "MERN Stack Development",
      description:
        "MERN is a full-stack JavaScript framework consisting of MongoDB, Express.js, React.js, and Node.js. It enables seamless development of scalable and modern web applications.",
      topics: [
        "MongoDB for Database Management",
        "Express.js for Backend Framework",
        "React.js for Frontend Development",
        "Node.js for Server-Side Programming",
        "JWT for Authentication and Authorization",
      ],
    },
    {
      // // img: img3,
      id: "3",
      title: "Python Development",
      description:
        "Python is a versatile programming language widely used for web development, data science, machine learning, and automation. With frameworks like Django and Flask, Python excels in backend development.",
      topics: [
        "Django/Flask for Web Development",
        "Data Analysis with Pandas",
        "Machine Learning using TensorFlow",
        "Unit Testing with pytest",
        "Virtual Environments for Dependency Management",
      ],
    },
    {
      // // img: img4,
      id: "4",
      title: "Java Development",
      description:
        "Java is a versatile, object-oriented programming language known for its Write Once, Run Anywhere (WORA) philosophy. Developed by Sun Microsystems (now owned by Oracle), Java is widely used in web development, mobile apps, desktop applications, and enterprise-level solutions.",
      topics: [
        "Platform Independence: Java programs can run on any device with a Java Virtual Machine (JVM).",
        "Robust Ecosystem: A rich set of libraries, tools, and frameworks for various use cases.",
        "High Demand: Java developers are highly sought after, especially in enterprise and Android development.",
        "Scalability: Perfect for building large-scale, distributed applications.",
      ],
    },
    {
      // // img: img5,
      id: "5",
      title: "Android Development",
      description:
        "Android development is the process of building apps for Android devices (smartphones, tablets, wearables, etc.) using a variety of tools and programming languages. The most common tool for Android development is Android Studio, and the primary language for modern Android development is Kotlin (though Java is still widely used).",
      topics: [
        "Massive User Base: Android has the largest market share in mobile operating systems.",
        "Flexibility: Android allows customization of apps and features.",
        "Java/Kotlin: Java has been a staple language for Android development.",
        "Wide Device Range: Android powers a broad range of devices.",
        "Large Ecosystem: Rich in tools, libraries, and APIs for various features.",
      ],
    },
    {
      // // img: img6,
      id: "6",
      title: "Flutter Development",
      description:
        "Flutter is a UI toolkit for building cross-platform apps (Android, iOS, web, desktop) with a single codebase. It uses the Dart programming language and provides a rich set of pre-designed widgets, a powerful rendering engine, and tools for high-performance applications.",
      topics: [
        "Single Codebase: Write once, run anywhere.",
        "Widgets: Everything is a widget (buttons, text, images, layout).",
        "Fast Development: With hot reload, developers can instantly see changes in the app.",
      ],
    },
    {
      // // img: img7,
      id: "7",
      title: "Next.js Development",
      description:
        "Next.js is a React-based framework that enables server-side rendering (SSR) and static site generation (SSG) to create optimized web applications.",
      topics: [
        "Server-side rendering (SSR) for dynamic content.",
        "Static site generation (SSG) for fast, pre-rendered pages.",
        "File-based routing so you don't need to manually configure routes.",
        "API routes to create backend logic inside your Next.js app.",
      ],
    },
    {
      // // img: img8,
      id: "8",
      title: ".Net Development",
      description:
        ".NET is a free, open-source, cross-platform framework developed by Microsoft for building applications on Windows, Linux, and macOS.",
      topics: [
        ".NET Framework: The original version for Windows-based applications.",
        ".NET Core: A cross-platform, open-source version.",
        ".NET 5/6/7: A unified platform for new development.",
        "Common Language Runtime (CLR): The environment that executes .NET applications.",
      ],
    },
    {
      // // img: img9,
      id: "9",
      title: "DSA",
      description:
        "Data Structures and Algorithms (DSA) are essential for efficient problem-solving in programming. They define the structure of data and the steps required to manipulate it.",
      topics: [
        "Arrays, Linked Lists, Stacks, Queues, Trees, Hash Tables, Graphs.",
        "Searching and Sorting Algorithms.",
        "Dynamic Programming, Greedy Algorithms, Divide & Conquer.",
      ],
    },
    {
      // // img: img10,
      id: "10",
      title: "JavaScript Development",
      description:
        "JavaScript is a high-level, interpreted programming language used for dynamic content on websites. It's essential for building modern web applications.",
      topics: [
        "Client-Side Scripting and Event-Driven Programming.",
        "Asynchronous Programming with AJAX.",
        "DOM Manipulation and Cross-Platform Compatibility.",
      ],
    },
    {
      // // img: img11,
      id: "11",
      title: "Blockchain Development",
      description:
        "Blockchain is a decentralized ledger technology that records transactions across multiple computers securely and transparently.",
      topics: [
        "Decentralization, Transparency, Security, Immutability.",
        "Consensus Mechanisms (Proof of Work, Proof of Stake).",
      ],
    },
    {
      // // img: img12,
      id: "12",
      title: "PHP Development",
      description:
        "PHP is a widely-used server-side scripting language designed for web development. It's used to build dynamic websites and applications.",
      topics: [
        "Server-Side Scripting and Database Integration.",
        "Easy to Learn and Use for Beginners.",
        "Creating Data-Driven Applications with MySQL.",
      ],
    },
    {
      // // img: img13,
      id: "13",
      title: "C++ Language",
      description:
        "C++ is a powerful, high-performance programming language used for software development, system programming, and real-time applications.",
      topics: [
        "Object-Oriented Programming (OOP), Memory Management.",
        "Standard Template Library (STL), Cross-Platform Development.",
      ],
    },
  ];

  return (
    <div className="container mx-auto p-6">
      {sections.map((section, index) => (
        <div
          key={index}
          className="bg-white shadow-lg rounded-lg mb-6 px-6 py-4 w-full sm:px-8 sm:py-6 lg:px-10 lg:py-8"
        >
          <section>
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">
              {`${index + 1}. ${section.title}`}
            </h2>

            <p className="text-gray-600 mb-4 text-sm sm:text-base lg:text-lg">
              {section.description}
            </p>
            <ul className="list-disc pl-5 text-gray-600 text-sm sm:text-base">
              {section.topics.map((topic, topicIndex) => (
                <li key={topicIndex}>{topic}</li>
              ))}
            </ul>

            {/* Enroll Now Button */}
            <div className="mt-6">
              <button className="bg-primary text-white px-6 py-2 rounded-lg text-sm sm:text-base hover:bg-primary focus:outline-none transition duration-300 shadow-xl hover:shadow-yellow-300">
                Enroll Now
              </button>
            </div>
          </section>
        </div>
      ))}
    </div>
  );
};

export default AlldetailCourese;
