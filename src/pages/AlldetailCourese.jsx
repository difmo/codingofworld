import React from "react";

const AlldetailCourese = () => {
  const sections = [
    {
      id: "1",
      title: "React Development",
      description:
        "React, also known as ReactJS, is a popular and powerful JavaScript library used for building dynamic and interactive user interfaces, primarily for single-page applications (SPAs). It was developed and maintained by Facebook and has gained significant popularity due to its efficient rendering techniques, reusable components, and active community support.",
      topics: [
        "JSX (JavaScript XML) Syntax ",
        "Functional & Class Components",
        "State & Props Management",
        "React Hooks (useState, useEffect)",
        "React Router for Navigation",
      ],
    },
    {
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
      id: "5",
      title: "Android Development",
      description:
        "Android development is the process of building apps for Android devices (smartphones, tablets, wearables, etc.) using a variety of tools and programming languages. The most common tool for Android development is Android Studio, and the primary language for modern Android development is Kotlin (though Java is still widely used).Here’s an overview of the best practices, tools, and key concepts you need to know to become proficient in Android development.",
      topics: [
        "Massive User Base: Android has the largest market share in mobile operating systems, which means developing for Android opens your app up to a large global audience.",
        "Flexibility: Android allows you to customize your app and its features in ways that are not as restricted as some other platforms (e.g., iOS).",
        "Java/Kotlin: Java has been a staple language for Android development, and Kotlin (introduced by Google in 2017) is a modern, more concise language that fully supports Android development",
        "Wide Device Range: Android powers a broad range of devices, from smartphones and tablets to TVs, wearables, and cars.",
        "Large Ecosystem: The Android ecosystem is rich in tools, libraries, and APIs for features like GPS, camera, storage, and push notifications.",
      ],
    },
    {
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
      id: "7",
      title: "Next.js Development",
      description:
        "Common Language Runtime (CLR): The runtime environment that executes .NET applications, handling memory management, garbage collection, exception handling, and security.",
      topics: [
        "Server-side rendering (SSR) for dynamic content.",
        "Static site generation (SSG) for fast, pre-rendered pages.",
        "File-based routing so you don't need to manually configure routes.",
        "API routes to create backend logic inside your Next.js app.",
      ],
    },
    {
      id: "8",
      title: ".Net Development",
      description:
        ".NET is a free, open-source, cross-platform framework developed by Microsoft, designed for building and running applications on Windows, Linux, and macOS. It provides a wide range of tools, libraries, and runtime environments to create applications in various programming languages, with C# being the most common.",
      topics: [
        ".NET Framework: The original version of .NET, primarily for Windows-based applications. It is no longer actively developed for new projects but still supported for legacy applications.",
        ".NET Core: A cross-platform, open-source version of .NET that supports Windows, Linux, and macOS. It's the foundation for modern .NET development.",
        ".NET 5/6/7: Starting from .NET 5, Microsoft unified .NET Core and .NET Framework into a single platform. With .NET 6 and beyond, this unified platform has become the default for new development.",
        "FCommon Language Runtime (CLR): The runtime environment that executes .NET applications, handling memory management, garbage collection, exception handling, and security.",
        // "JavaScript Frameworks (React, Angular, Vue.js)",
      ],
    },
    {
      id: "9",
      title: "DSA",
      description:
        "A data structure is a way of organizing and storing data so that it can be accessed and manipulated efficiently. The choice of data structure depends on the operations you need to perform (e.g., searching, inserting, deleting, updating), and the type of data you're working with.",
      topics: [
        "JSX (JavaScript XML) Syntax Arrays: Store elements in contiguous memory. Fast indexing (O(1)), but slow insertion/deletion (O(n)).",
        "Linked Lists: Collection of nodes, each pointing to the next. Good for dynamic data but slower access (O(n)).",
        "Stacks: LIFO (Last In, First Out) structure. Operations (push, pop) are O(1). Used in recursion and backtracking.",
        "Queues: FIFO (First In, First Out) structure. Operations (enqueue, dequeue) are O(1). Used in scheduling and buffering.",
        "Trees: Hierarchical data structure (e.g., binary tree, AVL tree). Used for fast searching and sorting.",
        "Hash Tables: Stores key-value pairs. Allows O(1) average-time lookups but may suffer from collisions.",
        "Graphs: Nodes connected by edges. Used for modeling relationships (e.g., social networks, routing).,",
      ],
    },
    {
      id: "10",
      title: "Javascript ",
      description:
        "JavaScript is a high-level, interpreted programming language that is primarily used to create interactive effects and dynamic content on websites. It enables web pages to respond to user input, update content without reloading, and interact with external data sources like APIs. JavaScript code is executed by the browser, making it essential for building modern web applications.",
      topics: [
        "Client-Side Scripting: JavaScript runs in the user's browser, meaning it allows for dynamic interactions without requiring communication with the server. For example, form validation, dynamic content updates, and animations can all be done client-side.",
        "Event-Driven Programming: JavaScript is often used in event-driven programming, where actions are triggered by events, such as user clicks, key presses, or mouse movements. This makes it ideal for building interactive web pages and applications.",
        "Asynchronous Programming (AJAX): JavaScript supports asynchronous programming through techniques like AJAX (Asynchronous JavaScript and XML), allowing web pages to request data from the server and update the page without reloading. This improves the user experience by making websites faster and more responsive",
        "DOM Manipulation: JavaScript can interact with the Document Object Model (DOM) of an HTML page, enabling developers to dynamically change the content, structure, and style of a webpage. This is how elements such as buttons, forms, or entire sections of a page are modified in response to user actions.",
        "Cross-Platform: JavaScript works on all major browsers (like Chrome, Firefox, Safari, and Edge), and its applications can run on different platforms (Windows, macOS, Linux). This makes JavaScript highly versatile in developing applications for the web.     ",
        "Dynamic Typing: JavaScript is dynamically typed, meaning you do not need to explicitly declare variable types (like integer, string, etc.). This makes it flexible, but can also lead to potential issues if types are not carefully managed.",
      ],
    },
    {
      id: "11",
      title: "Block Chain  Development",
      description:
        "A blockchain is essentially a distributed ledger that records transactions across multiple computers in such a way that the registered transactions cannot be altered retroactively. Each block in the blockchain contains a list of transactions, and once a block is completed, it is added to the chain in a linear, chronological order. Blockchain's decentralized nature ensures that no single party has control over the entire system, making it resistant to tampering and fraud.",
      topics: [
        "Decentralization: Unlike traditional centralized systems, blockchain distributes data across multiple nodes (computers) in a network. This means no single entity has control over the entire system, reducing the risks of single points of failure or corruption.",
        "Transparency: Transactions recorded on a blockchain are visible to all participants in the network. This transparency helps build trust between parties and ensures accountability",
        "Security: Blockchain uses cryptographic techniques to secure data, making it nearly impossible to alter the data once it is recorded. Each block contains a unique hash that links it to the previous one, ensuring data integrity.",
        "Immutability: Once a transaction is added to the blockchain, it cannot be changed or deleted. This creates a permanent, auditable record, which is critical for applications that require secure and verifiable data.",
        "Consensus Mechanisms: Blockchain networks rely on various consensus algorithms to validate transactions. These include Proof of Work (PoW), Proof of Stake (PoS), and Delegated Proof of Stake (DPoS), among others. These mechanisms ensure that all participants agree on the current state of the blockchain.",
      ],
    },
    {
      id: "12",
      title: "Php Development",
      description:
        "PHP (Hypertext Preprocessor) is a widely-used, open-source scripting language that powers dynamic web applications. Initially created by Rasmus Lerdorf in 1993, PHP has evolved over the years into one of the most popular server-side languages for web development. It is particularly well-suited for creating dynamic websites, web applications, and content management systems (CMS) like WordPress, Drupal, and Joomla.",
      topics: [
        "Server-Side Scripting: PHP is primarily used for server-side web development. It runs on the server and generates dynamic content that is then sent to the user's browser. Unlike client-side languages (like JavaScript), PHP handles the back-end processes, such as form submissions, database interactions, and user authentication. ",
        "Easy to Learn and Use: PHP is known for its simple syntax and ease of learning. Its flexibility makes it accessible to both beginners and experienced developers. PHP code can be embedded directly into HTML, making it straightforward for web developers to integrate dynamic content into static web pages.",
        "Database Integration: PHP excels at working with databases, particularly MySQL. Using PHP, developers can connect to databases to store, retrieve, update, and delete data. This makes PHP an ideal choice for building data-driven applications like blogs, e-commerce platforms, and social networks.",
      ],
    },
    {
      id: "13",
      title: "C++ Languge",
      description:
        "++ is a powerful, high-performance programming language widely used in software development, system programming, game development, and applications requiring real-time processing. Developed by Bjarne Stroustrup in the early 1980s, C++ is an extension of the C programming language, adding object-oriented features such as classes, inheritance, polymorphism, and encapsulation.",
      topics: [
        "Object-Oriented Programming (OOP): C++ supports OOP principles, allowing developers to model real-world entities using classes and objects. This enhances code reusability, modularity, and maintainability. Features like inheritance and polymorphism make C++ a preferred choice for large-scale applications",
        "Memory Management: One of C++'s strongest points is its manual memory management capabilities. Using pointers and dynamic memory allocation (via new and delete), developers have direct control over memory usage, which is crucial in performance-critical applications like embedded systems or game engines.",
        "Performance: C++ provides low-level access to system memory and hardware, making it an excellent choice for applications where speed and efficiency are paramount. It's widely used in areas like high-frequency trading, simulation software, and graphics rendering.",
        "Standard Template Library (STL): The STL is a powerful collection of template classes and functions for handling common data structures (such as vectors, lists, and maps) and algorithms (such as sorting and searching). STL helps reduce the need to manually implement these structures, enhancing both speed and productivity",
        "Cross-Platform Development: C++ code can be compiled and executed on various platforms, from desktop computers to embedded systems, making it highly versatile for developing cross-platform applications.",
        "Compatibility with C: C++ is largely compatible with C, meaning that C code can be easily integrated into C++ programs. This feature allows developers to leverage existing C libraries and codebases while benefiting from C++'s additional features.",
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
              <button className="bg-primary text-white px-6 py-2 rounded-lg text-sm sm:text-base hover:bg-primary focus:outline-none transition duration-300 shadow-xl  hover:shadow-yellow-300">
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
