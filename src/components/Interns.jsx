import React from 'react';

const internships = [
  {
    title: 'Business Internships',
    description: 'Business internships include multiple teams and roles within the business world at Google. Available outside of the United States, the internship is for undergraduate and graduate students with qualifications and application dates varying by location.',
    link: 'https://careers.google.com/jobs/results/?src=Online/Google Website/ByF&utm_source=online&utm_medium=careers_site&utm_campaign=ByF business intern&company=Fitbit&company=Google&company=YouTube&distance=50&employment_type=INTERN&jex=ENTRY_LEVEL&q=business',
    image: 'https://lh3.googleusercontent.com/gDHLisDSrG75KfSu5-EtEkaVSWrhq2Lz1JOvHmYaSFJz9kmCVv6l7P5NiXnxp2nlQXe0KbsVnpf9kQevTF2Sf-tUvsjP_pKILV6MFcwYt1LzCtERsDQ',
  },
  {
    title: 'Business Internships',
    description: 'Business internships include multiple teams and roles within the business world at Google. Available outside of the United States, the internship is for undergraduate and graduate students with qualifications and application dates varying by location.',
    link: 'https://careers.google.com/jobs/results/?src=Online/Google Website/ByF&utm_source=online&utm_medium=careers_site&utm_campaign=ByF business intern&company=Fitbit&company=Google&company=YouTube&distance=50&employment_type=INTERN&jex=ENTRY_LEVEL&q=business',
    image: 'https://lh3.googleusercontent.com/gDHLisDSrG75KfSu5-EtEkaVSWrhq2Lz1JOvHmYaSFJz9kmCVv6l7P5NiXnxp2nlQXe0KbsVnpf9kQevTF2Sf-tUvsjP_pKILV6MFcwYt1LzCtERsDQ',
  },
  {
    title: 'Business Internships',
    description: 'Business internships include multiple teams and roles within the business world at Google. Available outside of the United States, the internship is for undergraduate and graduate students with qualifications and application dates varying by location.',
    link: 'https://careers.google.com/jobs/results/?src=Online/Google Website/ByF&utm_source=online&utm_medium=careers_site&utm_campaign=ByF business intern&company=Fitbit&company=Google&company=YouTube&distance=50&employment_type=INTERN&jex=ENTRY_LEVEL&q=business',
    image: 'https://lh3.googleusercontent.com/gDHLisDSrG75KfSu5-EtEkaVSWrhq2Lz1JOvHmYaSFJz9kmCVv6l7P5NiXnxp2nlQXe0KbsVnpf9kQevTF2Sf-tUvsjP_pKILV6MFcwYt1LzCtERsDQ',
  },
  {
    title: 'Business Internships',
    description: 'Business internships include multiple teams and roles within the business world at Google. Available outside of the United States, the internship is for undergraduate and graduate students with qualifications and application dates varying by location.',
    link: 'https://careers.google.com/jobs/results/?src=Online/Google Website/ByF&utm_source=online&utm_medium=careers_site&utm_campaign=ByF business intern&company=Fitbit&company=Google&company=YouTube&distance=50&employment_type=INTERN&jex=ENTRY_LEVEL&q=business',
    image: 'https://lh3.googleusercontent.com/gDHLisDSrG75KfSu5-EtEkaVSWrhq2Lz1JOvHmYaSFJz9kmCVv6l7P5NiXnxp2nlQXe0KbsVnpf9kQevTF2Sf-tUvsjP_pKILV6MFcwYt1LzCtERsDQ',
  },
  {
    title: 'Business Internships',
    description: 'Business internships include multiple teams and roles within the business world at Google. Available outside of the United States, the internship is for undergraduate and graduate students with qualifications and application dates varying by location.',
    link: 'https://careers.google.com/jobs/results/?src=Online/Google Website/ByF&utm_source=online&utm_medium=careers_site&utm_campaign=ByF business intern&company=Fitbit&company=Google&company=YouTube&distance=50&employment_type=INTERN&jex=ENTRY_LEVEL&q=business',
    image: 'https://lh3.googleusercontent.com/gDHLisDSrG75KfSu5-EtEkaVSWrhq2Lz1JOvHmYaSFJz9kmCVv6l7P5NiXnxp2nlQXe0KbsVnpf9kQevTF2Sf-tUvsjP_pKILV6MFcwYt1LzCtERsDQ',
  },
  {
    title: 'Business Internships',
    description: 'Business internships include multiple teams and roles within the business world at Google. Available outside of the United States, the internship is for undergraduate and graduate students with qualifications and application dates varying by location.',
    link: 'https://careers.google.com/jobs/results/?src=Online/Google Website/ByF&utm_source=online&utm_medium=careers_site&utm_campaign=ByF business intern&company=Fitbit&company=Google&company=YouTube&distance=50&employment_type=INTERN&jex=ENTRY_LEVEL&q=business',
    image: 'https://lh3.googleusercontent.com/gDHLisDSrG75KfSu5-EtEkaVSWrhq2Lz1JOvHmYaSFJz9kmCVv6l7P5NiXnxp2nlQXe0KbsVnpf9kQevTF2Sf-tUvsjP_pKILV6MFcwYt1LzCtERsDQ',
  },
];

const Internships = () => {
  return (
    <section className=" mx-auto p-6 ">
      <h2 className="text-2xl font-bold text-center">Browse our internships</h2>
      <p className="text-center mb-6 relative  ">The internships below are not exhaustive, and may or may not be currently available, but provide a taste of the various internships Google offers.</p>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  container    ">
        {internships.map((internship, index) => (
          <div key={index} className="relative flex flex-col justify-evenly border rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 group p-9 h-96">
                <h3 className="text-3   xl font-semibold text-center">{internship.title}</h3>
            <a href={internship.link} target="_blank" rel="noopener noreferrer" className="block p-4">
              <div className="transition-opacity duration-300 group-hover:opacity-0">
                <img className="w-full h-24 object-cover my-2" src={internship.image} alt={internship.title} loading="lazy" />
              </div>
              <p className="text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-0 flex items-center justify-center bg-white z-10 m-5">
                {internship.description}
              </p>
            </a>
            <div className="bg-gray-200 text-center p-2">
              <span className="text-blue-600">Learn more</span>
            </div>
          </div>
        ))}
      </ul>
    </section>
  );
};

export default Internships;
