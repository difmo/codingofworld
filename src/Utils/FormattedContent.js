// components/FormattedContent.jsx
import React from "react";

const replaceCodeWithLanguageClass = (content) => {
  return content.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/g, (match, code) => {
    let language = 'js'; // Default to JavaScript
    if (code.includes('def') && code.includes('print')) language = 'python';
    if (code.includes('<html') && code.includes('</html>')) language = 'html';
    if (code.includes('function') && code.includes('console.log')) language = 'javascript';
    if (code.includes('class') && code.includes('public')) language = 'java';
    return `<pre class="language-${language}" style="color: black;"><code>${code}</code></pre>`;
  });
};

const formatHTML = (rawHTML) => {
  if (!rawHTML) return "";

  return replaceCodeWithLanguageClass(rawHTML)
    .replace(/<h1>/g, '<h1 class="text-red-500">')
    .replace(/<h2>/g, '<h2 class="text-red-500">')
    .replace(/<h3>/g, '<h3 class="text-red-500">')
    .replace(/<h4>/g, '<h4 class="text-red-500">')
    .replace(/<\/h1>/g, '</h1>')
    .replace(/<\/h2>/g, '</h2>')
    .replace(/<p>/g, '<p class="dark:text-white text-sm ">')
    .replace(/<strong>/g, '<strong class="text-red-500">')
    .replace(/<ul>/g, '<ul class="list-disc dark:text-white pl-5">')
    .replace(/<ol>/g, '<ol class="list-decimal pl-5">')
    .replace(/<li>/g, '<li class="dark:text-white">');
};

const FormattedContent = ({ html }) => {
  return (
    <div
      className="text-lg prose leading-relaxed text-gray-700 dark:text-white font-anek_telugu transition-all duration-700 ease-in-out"
      dangerouslySetInnerHTML={{ __html: formatHTML(html) }}
    />
  );
};

export default FormattedContent;
