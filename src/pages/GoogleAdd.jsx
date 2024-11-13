import { useEffect } from "react";

const GoogleAdd = () => {
    useEffect(() => {
      if (window.adsbygoogle && window.adsbygoogle.loaded) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    }, []);
  
    return (
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <div
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-4765539220931071"
          data-ad-slot="3774960648"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></div>
      </div>
    );
  };
  
  export default GoogleAdd;
  