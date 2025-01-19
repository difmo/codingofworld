import React, { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import html2pdf from 'html2pdf.js';
import img from '../../assets/certi2.svg';  // Assuming this is your certificate background

const CertificatesGeneratorComponent = ({ name }) => {
  const [certificateGenerated, setCertificateGenerated] = useState(false);

  useEffect(() => {
    if (name) {
      setCertificateGenerated(true);
    }
  }, [name]);

  const downloadAsPDF = () => {
    const certificate = document.getElementById('certificate');
    html2pdf().from(certificate).save('certificate.pdf');
  };

  return (
    <div>
      {certificateGenerated ? (
        <div className="md:flex hidden flex-col items-center justify-center min-h-screen">
          <div
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
            }}
            id="certificate"
          >
            <div className="flex flex-col items-center justify-center w-[60%] h-[5.5in] text-center">
              <h3 className="text-3xl font-bold text-gray-800 mt-4">{name}</h3>
              <p className="text-sm text-gray-500 mt-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet mauris euismod, tincidunt erat ut, laoreet tortor.
              </p>
            </div>
          </div>

       
        </div>
      ) : (
        <p className="text-center text-gray-600">No certificate to display</p>
      )}
   <div className="mt-6 space-x-4">
            <button
              onClick={downloadAsPDF}
              className="bg-red-500 text-white py-2 px-4 rounded-md"
            >
              Download as PDF
            </button>
          </div>
    </div>
  );
};

export default CertificatesGeneratorComponent;
