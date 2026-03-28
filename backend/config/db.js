import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongod = null;

const connectDB = async () => {
  // First try the configured MongoDB URI
  const configuredUri = process.env.MONGODB_URI;

  if (configuredUri && !configuredUri.includes('your_username') && !configuredUri.includes('xxxxx')) {
    try {
      const conn = await mongoose.connect(configuredUri);
      console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
      return;
    } catch (error) {
      console.warn(`⚠️ Could not connect to configured MongoDB: ${error.message}`);
      console.log('🔄 Falling back to in-memory MongoDB...');
    }
  } else {
    console.log('📝 No valid MongoDB URI configured. Using in-memory MongoDB for development...');
  }

  // Fallback: start in-memory MongoDB
  try {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    const conn = await mongoose.connect(uri);
    console.log(`✅ In-Memory MongoDB started: ${conn.connection.host}`);
    console.log('💡 Tip: Set MONGODB_URI in backend/.env for persistent data');

    // Auto-seed data for development
    await autoSeed();
  } catch (error) {
    console.error(`❌ Failed to start in-memory MongoDB: ${error.message}`);
    process.exit(1);
  }
};

// Auto-seed when using in-memory DB
async function autoSeed() {
  try {
    // Dynamically import the Post model
    const { default: Post } = await import('../models/Post.js');
    const count = await Post.countDocuments();

    if (count === 0) {
      console.log('🌱 Seeding development data...');

      const seedPosts = [
        {
          title: "UP में नए इंडस्ट्रियल कॉरिडोर का शिलान्यास, 50 हजार लोगों को मिलेगा रोजगार",
          slug: "up-industrial-corridor-launch",
          content: "<p>उत्तर प्रदेश सरकार ने आज एक नए इंडस्ट्रियल कॉरिडोर की आधारशिला रखी। मुख्यमंत्री ने कहा कि इस प्रोजेक्ट से 50 हजार से अधिक लोगों को प्रत्यक्ष और अप्रत्यक्ष रोजगार मिलेगा।</p><p>इस कॉरिडोर में ऑटोमोबाइल, इलेक्ट्रॉनिक्स और फार्मास्यूटिकल सेक्टर की कंपनियां निवेश करेंगी। राज्य सरकार ने विशेष प्रोत्साहन पैकेज की भी घोषणा की है।</p>",
          image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
          category: "उत्तर प्रदेश",
          city: "लखनऊ",
          author: "अमित शर्मा",
          type: "news",
          isBreaking: true,
          isFeatured: true,
          isTrending: true,
          views: 15200,
          tags: ["उद्योग", "रोजगार", "विकास"]
        },
        {
          title: "वाराणसी में गंगा आरती का भव्य आयोजन, लाखों श्रद्धालु पहुंचे",
          slug: "varanasi-ganga-aarti-grand-event",
          content: "<p>वाराणसी के दशाश्वमेध घाट पर बुधवार शाम को विशेष गंगा आरती का भव्य आयोजन किया गया। इस आयोजन में देश-विदेश से लाखों श्रद्धालु शामिल हुए।</p><p>गंगा आरती के दौरान पूरा घाट दीपों की रोशनी से जगमगा उठा। इस अवसर पर कई सांस्कृतिक कार्यक्रमों का भी आयोजन किया गया।</p>",
          image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800",
          category: "उत्तर प्रदेश",
          city: "वाराणसी",
          author: "राहुल तिवारी",
          type: "news",
          isBreaking: true,
          views: 12800,
          tags: ["वाराणसी", "गंगा आरती", "धार्मिक"]
        },
        {
          title: "कानपुर मेट्रो का ट्रायल रन सफल, अगले महीने से शुरू होगी सेवा",
          slug: "kanpur-metro-trial-run-success",
          content: "<p>कानपुर मेट्रो रेल प्रोजेक्ट का ट्रायल रन आज सफलतापूर्वक संपन्न हुआ। अधिकारियों ने बताया कि अगले महीने से यात्रियों के लिए मेट्रो सेवा शुरू कर दी जाएगी।</p><p>प्रथम चरण में IIT कानपुर से नवाबगंज तक मेट्रो चलेगी। इसके बाद दूसरे चरण का कार्य भी शीघ्र शुरू किया जाएगा।</p>",
          image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800",
          category: "उत्तर प्रदेश",
          city: "कानपुर",
          author: "सुनील वर्मा",
          type: "news",
          isTrending: true,
          views: 9400,
          tags: ["मेट्रो", "कानपुर", "परिवहन"]
        },
        {
          title: "भारत ने T20 सीरीज़ में इंग्लैंड को 3-0 से किया क्लीन स्वीप",
          slug: "india-t20-series-clean-sweep-england",
          content: "<p>भारतीय क्रिकेट टीम ने शानदार प्रदर्शन करते हुए इंग्लैंड के खिलाफ T20 सीरीज में 3-0 से क्लीन स्वीप किया। तीसरे और अंतिम मैच में भारत ने 7 विकेट से जीत दर्ज की।</p><p>सूर्यकुमार यादव को प्लेयर ऑफ द सीरीज चुना गया। उन्होंने तीनों मैचों में शानदार बैटिंग की।</p>",
          image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800",
          category: "खेल",
          city: "लखनऊ",
          author: "विकास सिंह",
          type: "news",
          isBreaking: true,
          views: 22000,
          tags: ["क्रिकेट", "T20", "भारत"]
        },
        {
          title: "लखनऊ में AI स्टार्टअप समिट, 200 से अधिक कंपनियों ने लिया हिस्सा",
          slug: "lucknow-ai-startup-summit",
          content: "<p>लखनऊ में आयोजित AI स्टार्टअप समिट में 200 से अधिक कंपनियों ने भाग लिया। इस समिट में AI और टेक्नोलॉजी के क्षेत्र में नए इनोवेशन पर चर्चा की गई।</p><p>कई स्टार्टअप्स को निवेशकों से फंडिंग भी मिली। सरकार ने IT सेक्टर के लिए नई पॉलिसी की भी घोषणा की।</p>",
          image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800",
          category: "टेक्नोलॉजी",
          city: "लखनऊ",
          author: "प्रिया गुप्ता",
          type: "news",
          isFeatured: true,
          views: 7600,
          tags: ["AI", "स्टार्टअप", "टेक्नोलॉजी"]
        },
        {
          title: "आगरा में ताजमहल के पास नए हेरिटेज वॉक का उद्घाटन",
          slug: "agra-tajmahal-heritage-walk",
          content: "<p>आगरा में ताजमहल के समीप एक नए हेरिटेज वॉक मार्ग का उद्घाटन किया गया। यह मार्ग पर्यटकों को मुगल काल की विरासत से रूबरू कराएगा।</p><p>इस मार्ग पर कई ऐतिहासिक स्मारकों और कला दीर्घाओं को शामिल किया गया है। अधिकारियों का कहना है कि इससे पर्यटन को बड़ा बढ़ावा मिलेगा।</p>",
          image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800",
          category: "उत्तर प्रदेश",
          city: "आगरा",
          author: "रवि शंकर",
          type: "news",
          views: 8900,
          tags: ["ताजमहल", "पर्यटन", "आगरा"]
        },
        {
          title: "गोरखपुर में किसानों के लिए नई सिंचाई योजना की शुरुआत",
          slug: "gorakhpur-irrigation-scheme",
          content: "<p>गोरखपुर जिले में किसानों के लिए एक नई सिंचाई योजना का शुभारंभ किया गया। इस योजना के तहत 500 से अधिक गांवों में आधुनिक सिंचाई सुविधाएं उपलब्ध कराई जाएंगी।</p>",
          image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800",
          category: "उत्तर प्रदेश",
          city: "गोरखपुर",
          author: "अभय त्रिपाठी",
          type: "news",
          views: 5400,
          tags: ["कृषि", "सिंचाई", "गोरखपुर"]
        },
        {
          title: "बॉलीवुड: अक्षय कुमार की नई फिल्म ने पहले दिन 40 करोड़ कमाए",
          slug: "bollywood-akshay-kumar-box-office",
          content: "<p>बॉलीवुड अभिनेता अक्षय कुमार की नई फिल्म ने बॉक्स ऑफिस पर धमाकेदार शुरुआत की है। फिल्म ने पहले ही दिन 40 करोड़ रुपये की कमाई की।</p><p>समीक्षकों ने फिल्म की तारीफ की है और इसे इस साल की सबसे बड़ी हिट फिल्मों में से एक बताया है।</p>",
          image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800",
          category: "मनोरंजन",
          city: "नई दिल्ली",
          author: "नेहा पाठक",
          type: "news",
          isTrending: true,
          views: 18500,
          tags: ["बॉलीवुड", "फिल्म", "बॉक्स ऑफिस"]
        },
        {
          title: "प्रयागराज में डिजिटल इंडिया कैंप, ग्रामीणों को मिली स्मार्टफोन ट्रेनिंग",
          slug: "prayagraj-digital-india-camp",
          content: "<p>प्रयागराज जिले के ग्रामीण इलाकों में डिजिटल इंडिया अभियान के तहत एक विशेष कैंप लगाया गया। इस कैंप में ग्रामीणों को स्मार्टफोन का उपयोग, ऑनलाइन बैंकिंग और सरकारी योजनाओं की जानकारी दी गई।</p>",
          image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
          category: "शिक्षा",
          city: "प्रयागराज",
          author: "संदीप कुमार",
          type: "news",
          views: 4200,
          tags: ["डिजिटल इंडिया", "शिक्षा", "ग्रामीण"]
        },
        {
          title: "UP बजट 2026: शिक्षा और स्वास्थ्य पर सबसे ज्यादा खर्च",
          slug: "up-budget-2026-education-health",
          content: "<p>उत्तर प्रदेश का वार्षिक बजट पेश किया गया जिसमें शिक्षा और स्वास्थ्य सेक्टर पर सबसे अधिक बजट आवंटित किया गया है। वित्त मंत्री ने कहा कि इस बजट से प्रदेश के विकास को नई गति मिलेगी।</p><p>बजट में कृषि, बुनियादी ढांचे और डिजिटल इंडिया पर भी विशेष ध्यान दिया गया है।</p>",
          image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800",
          category: "राजनीति",
          city: "लखनऊ",
          author: "अमित शर्मा",
          type: "news",
          isBreaking: true,
          isFeatured: true,
          views: 16700,
          tags: ["बजट", "राजनीति", "UP"]
        },
        {
          title: "गाज़ियाबाद में नए मल्टीलेवल फ्लाईओवर का निर्माण शुरू",
          slug: "ghaziabad-multilevel-flyover",
          content: "<p>गाज़ियाबाद शहर में ट्रैफिक की समस्या को देखते हुए एक नए मल्टीलेवल फ्लाईओवर का निर्माण कार्य शुरू कर दिया गया है। इस प्रोजेक्ट पर करीब 800 करोड़ रुपये खर्च होंगे।</p>",
          image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800",
          category: "उत्तर प्रदेश",
          city: "गाज़ियाबाद",
          author: "रवि शंकर",
          type: "news",
          views: 6100,
          tags: ["इंफ्रास्ट्रक्चर", "गाज़ियाबाद", "विकास"]
        },
        {
          title: "भारतीय अर्थव्यवस्था की विकास दर 7.5% रहने का अनुमान — RBI",
          slug: "india-economy-growth-rbi-estimate",
          content: "<p>भारतीय रिज़र्व बैंक ने चालू वित्तीय वर्ष में भारतीय अर्थव्यवस्था की विकास दर 7.5% रहने का अनुमान लगाया है। RBI गवर्नर ने कहा कि भारतीय अर्थव्यवस्था मजबूत स्थिति में है।</p>",
          image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
          category: "व्यापार",
          city: "नई दिल्ली",
          author: "विकास मेहरा",
          type: "news",
          isTrending: true,
          views: 11200,
          tags: ["अर्थव्यवस्था", "RBI", "विकास दर"]
        },
        {
          title: "UP TV Live स्पेशल रिपोर्ट: अयोध्या में पर्यटन उद्योग का बदलता चेहरा",
          slug: "uptv-special-ayodhya-tourism",
          content: "<p>अयोध्या में राम मंदिर के बाद पर्यटन उद्योग में क्रांतिकारी बदलाव आया है। हजारों नए होटल, रेस्टोरेंट और दुकानें खुली हैं। स्थानीय युवाओं को रोजगार के नए अवसर मिल रहे हैं।</p>",
          image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800",
          category: "उत्तर प्रदेश",
          city: "लखनऊ",
          author: "अभय त्रिपाठी",
          type: "news",
          isFeatured: true,
          views: 13400,
          tags: ["अयोध्या", "पर्यटन", "विकास"]
        },
        {
          title: "LIVE: UP विधानसभा सत्र — बजट पर विपक्ष का हंगामा",
          slug: "live-up-vidhan-sabha-budget-session",
          content: "<p>उत्तर प्रदेश विधानसभा के बजट सत्र में विपक्ष ने जोरदार हंगामा किया। विपक्ष का आरोप है कि बजट में जनता के हित की योजनाओं को नजरअंदाज किया गया है।</p>",
          image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800",
          category: "राजनीति",
          city: "लखनऊ",
          author: "अमित शर्मा",
          videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          type: "video",
          isBreaking: true,
          views: 25000,
          tags: ["विधानसभा", "राजनीति", "LIVE"]
        },
        {
          title: "UP TV Live EXCLUSIVE: किसानों की समस्या पर स्पेशल रिपोर्ट",
          slug: "uptv-exclusive-farmers-issues",
          content: "<p>UP TV Live की स्पेशल रिपोर्ट में किसानों की विभिन्न समस्याओं पर विस्तार से चर्चा की गई। सिंचाई, बिजली, और बीज की समस्या से जूझ रहे किसानों की कहानी।</p>",
          image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800",
          category: "उत्तर प्रदेश",
          city: "कानपुर",
          author: "सुनील वर्मा",
          videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          type: "video",
          views: 19800,
          tags: ["किसान", "कृषि", "EXCLUSIVE"]
        },
        {
          title: "लखनऊ: नए IT पार्क में 10,000 नौकरियां — यूथ के लिए बड़ी खबर",
          slug: "lucknow-it-park-10000-jobs",
          content: "<p>लखनऊ में एक नए IT पार्क का उद्घाटन किया गया जिसमें 10,000 से अधिक IT प्रोफेशनल्स को रोजगार मिलेगा। कई बड़ी IT कंपनियों ने यहां ऑफिस खोलने की घोषणा की है।</p>",
          image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
          category: "व्यापार",
          city: "लखनऊ",
          author: "प्रिया गुप्ता",
          type: "article",
          isTrending: true,
          views: 14500,
          tags: ["IT", "रोजगार", "लखनऊ"]
        },
        {
          title: "स्वास्थ्य विभाग की चेतावनी: UP में डेंगू के मामले बढ़े, सावधानी बरतें",
          slug: "up-health-dengue-warning",
          content: "<p>उत्तर प्रदेश स्वास्थ्य विभाग ने डेंगू के बढ़ते मामलों को लेकर चेतावनी जारी की है। विभाग ने लोगों से सफाई रखने और डॉक्टर से परामर्श करने की अपील की है।</p>",
          image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800",
          category: "स्वास्थ्य",
          city: "लखनऊ",
          author: "डॉ. अनिता सिंह",
          type: "article",
          views: 7800,
          tags: ["स्वास्थ्य", "डेंगू", "चेतावनी"]
        },
        {
          title: "वाराणसी: BHU में अंतर्राष्ट्रीय कॉन्फ्रेंस, 40 देशों के विद्वान आए",
          slug: "varanasi-bhu-international-conference",
          content: "<p>बनारस हिंदू विश्वविद्यालय में एक अंतर्राष्ट्रीय कॉन्फ्रेंस का आयोजन किया गया जिसमें 40 से अधिक देशों के विद्वानों और शोधकर्ताओं ने भाग लिया।</p>",
          image: "https://images.unsplash.com/photo-1523050854058-8df90110c476?w=800",
          category: "शिक्षा",
          city: "वाराणसी",
          author: "राहुल तिवारी",
          type: "article",
          views: 5900,
          tags: ["BHU", "शिक्षा", "अंतर्राष्ट्रीय"]
        },
        {
          title: "LIVE: कानपुर में ट्रैफिक अपडेट — कई रास्ते बंद",
          slug: "live-kanpur-traffic-update",
          content: "<p>कानपुर शहर में सड़क निर्माण कार्य के चलते कई मुख्य मार्ग बंद किए गए हैं। पुलिस ने वैकल्पिक रास्तों की जानकारी दी है।</p>",
          image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800",
          category: "उत्तर प्रदेश",
          city: "कानपुर",
          author: "सुनील वर्मा",
          videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          type: "video",
          views: 8200,
          tags: ["कानपुर", "ट्रैफिक", "LIVE"]
        },
        {
          title: "आगरा: पेठा उद्योग में मंदी, कारोबारी चिंतित",
          slug: "agra-petha-industry-slowdown",
          content: "<p>आगरा के प्रसिद्ध पेठा उद्योग में मंदी का दौर जारी है। कारोबारियों का कहना है कि कच्चे माल की कीमतें बढ़ने और मांग घटने से उद्योग पर बुरा असर पड़ा है।</p>",
          image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800",
          category: "व्यापार",
          city: "आगरा",
          author: "रवि शंकर",
          type: "article",
          views: 3800,
          tags: ["आगरा", "पेठा", "व्यापार"]
        }
      ];

      await Post.insertMany(seedPosts);
      console.log(`✅ Seeded ${seedPosts.length} posts for development`);
    }
  } catch (error) {
    console.error('⚠️ Auto-seed failed:', error.message);
  }
}

export default connectDB;
