import "./VideoSection.css";

const videos = [
  {
    id: 1,
    title: "राहुल बच्चा सोनकर विधायक बिल्हौर कानपुर",
    url: "https://www.youtube.com/embed/uwhGyAq600E"
  },
  {
    id: 2,
    title: "कानपुर JCP विनोद कुमार सिंह का बयान",
    url: "https://www.youtube.com/embed/7jViZnE9ksA"
  },
  {
    id: 3,
    title: "कानपुर गैंगरेप की घटना को लेकर पुलिस: कमिश्नर का बयान",
    url: "https://www.youtube.com/embed/E9xRCwoeI2s"
  },
  {
    id: 4,
    title: "कानपुर ब्लास्ट के बाद एक्शन-ACP को : हटाया",
    url: "https://www.youtube.com/embed/msrByXSBxBE"
  }
];

const VideoSection = () => {
  return (
    <div className="video-section">
      <div className="container">

        <div className="section-hdr">
          <div className="section-title">📺 न्यूज़ वीडियो</div>
          <a href="https://www.youtube.com/@UPtvLIVE1" className="view-all">सभी वीडियो →</a>
        </div>

        <div className="video-grid">
          {videos.map((video) => (
            <div className="video-card" key={video.id}>

              <iframe
                width="100%"
                height="180"
                src={video.url}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>

              <div className="video-info">
                <div className="video-title">
                  {video.title}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default VideoSection;