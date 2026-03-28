import { useParams, Link } from "react-router-dom";
import newsData from "../../data/newsData";

const cityMap = {
  kanpur: "कानपुर",
  lucknow: "लखनऊ",
  ayodhya: "अयोध्या",
  agra: "आगरा",
  varanasi: "वाराणसी",
  gorakhpur: "गोरखपुर",
  prayagraj: "प्रयागराज",
  ghaziabad: "गाज़ियाबाद"
};

const CityPage = () => {
  const { city } = useParams();

  const cityName = cityMap[city];

  const filteredNews = newsData.filter(
    (item) => item.city === cityName
  );

  return (
    <div className="container" style={{ padding: "20px" }}>
      <h1>{cityName} News</h1>

      {filteredNews.map((item) => (
        <Link to={`/article/${item.slug}`} key={item.id}>
          <div style={{ marginBottom: "20px" }}>
            <img src={item.image} alt="" width="100%" />
            <h3>{item.title}</h3>
            <p>{item.time}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CityPage;