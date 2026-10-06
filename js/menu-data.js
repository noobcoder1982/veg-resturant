// Vaishno Bhojnalaya - Pure Veg Menu Database

const MENU_CATEGORIES = [
  { id: 'all', nameEn: 'All Dishes', nameHi: 'सभी व्यंजन', icon: 'fa-utensils' },
  { id: 'thali', nameEn: 'Special Thalis', nameHi: 'वेज थाली स्पेशल', icon: 'fa-bowl-food', badgeEn: 'Best Value', badgeHi: 'सर्वोत्तम मूल्य' },
  { id: 'paneer', nameEn: 'Paneer Specials', nameHi: 'पनीर स्पेशल', icon: 'fa-cheese' },
  { id: 'dal', nameEn: 'Dal & Gravies', nameHi: 'दाल एवं छोले', icon: 'fa-fire-burner' },
  { id: 'sabzi', nameEn: 'Fresh Sabzis', nameHi: 'ताज़ी सब्जियाँ', icon: 'fa-carrot' },
  { id: 'chawal', nameEn: 'Rice & Combos', nameHi: 'चावल एवं कॉम्बो', icon: 'fa-wheat-awn' },
  { id: 'tandoor', nameEn: 'Tandoor & Breads', nameHi: 'तन्दूरी एवं रोटी', icon: 'fa-bread-slice' },
  { id: 'extras', nameEn: 'Accompaniments', nameHi: 'रायता एवं दही', icon: 'fa-jar' }
];

const MENU_ITEMS = [
  // --- THALI SPECIALS ---
  {
    id: 'thali-100',
    category: 'thali',
    nameEn: 'Regular Veg Thali',
    nameHi: 'रेगुलर वेज थाली',
    descriptionEn: 'Shahi Paneer, Dal Makhani, Seasonal Sabzi, Steamed Basmati Rice & 4 Fresh Tawa Rotis',
    descriptionHi: 'शाही पनीर + दाल मखनी + मौसमी सब्जी + स्टीम्ड चावल + 4 तवा रोटी',
    badgeEn: 'Most Popular',
    badgeHi: 'सबसे लोकप्रिय',
    price: 100,
    hasHalfFull: false,
    image: 'assets/images/hero_thali.jpg'
  },
  {
    id: 'thali-130',
    category: 'thali',
    nameEn: 'Deluxe Missi / Lachha Thali',
    nameHi: 'डीलक्स मिस्सी / लच्छा थाली',
    descriptionEn: 'Shahi Paneer, Dal Makhani, Fresh Sabzi, Basmati Rice with choice of 2 Missi Roti or 2 Lachha Paratha',
    descriptionHi: 'शाही पनीर + दाल मखनी + सब्जी + चावल + आपकी पसंद की 2 मिस्सी रोटी या 2 लच्छा पराठा',
    badgeEn: 'Chef Choice',
    badgeHi: 'शेफ की पसंद',
    price: 130,
    hasHalfFull: false,
    options: ['2 Missi Roti (2 मिस्सी रोटी)', '2 Lachha Paratha (2 लच्छा पराठा)'],
    image: 'assets/images/hero_thali.jpg'
  },
  {
    id: 'thali-140',
    category: 'thali',
    nameEn: 'Special Aloo Paratha Thali',
    nameHi: 'स्पेशल आलू पराठा थाली',
    descriptionEn: 'Shahi Paneer, Dal Makhani, Sabzi, Rice served with 2 Stuffed Butter Aloo Parathas',
    descriptionHi: 'शाही पनीर + दाल मखनी + सब्जी + चावल + 2 मक्खनदार आलू पराठा',
    badgeEn: 'Special Feast',
    badgeHi: 'स्वादिष्ट दावत',
    price: 140,
    hasHalfFull: false,
    image: 'assets/images/hero_thali.jpg'
  },
  {
    id: 'thali-150',
    category: 'thali',
    nameEn: 'Royal Paneer Paratha Thali',
    nameHi: 'रॉयल पनीर पराठा थाली',
    descriptionEn: 'Matar Paneer, Dal Makhani, Mix Veg, Steamed Rice & 2 Rich Stuffed Paneer Parathas',
    descriptionHi: 'मटर पनीर + दाल मखनी + मिक्स वेज + चावल + 2 भरवां पनीर पराठा',
    badgeEn: 'Royal Feast',
    badgeHi: 'रॉयल थाली',
    price: 150,
    hasHalfFull: false,
    image: 'assets/images/hero_thali.jpg'
  },

  // --- PANEER SPECIALS ---
  {
    id: 'paneer-bhurji',
    category: 'paneer',
    nameEn: 'Paneer Bhurji',
    nameHi: 'पनीर भुजिया',
    descriptionEn: 'Fresh scrambled cottage cheese sautéed with finely chopped onions, tomatoes, and aromatic whole spices',
    descriptionHi: 'बारीक कटी प्याज, शिमला मिर्च और टमाटर के साथ तवे पर भुना हुआ फ्रेश पनीर भुजिया',
    hasHalfFull: true,
    prices: { half: 130, full: 250 },
    image: 'assets/images/paneer_special.jpg'
  },
  {
    id: 'kadhai-paneer',
    category: 'paneer',
    nameEn: 'Kadhai Paneer',
    nameHi: 'कढ़ाई पनीर',
    descriptionEn: 'Succulent paneer cubes simmered with bell peppers and roasted coriander in a robust kadhai masala',
    descriptionHi: 'कढ़ाई मसालों, क्रंची शिमला मिर्च और प्याज के साथ गाढ़ी तरी में पका पनीर',
    badgeEn: 'Bestseller',
    badgeHi: 'बेस्टसेलर',
    hasHalfFull: true,
    prices: { half: 110, full: 220 },
    image: 'assets/images/paneer_special.jpg'
  },
  {
    id: 'mushroom-matar-paneer',
    category: 'paneer',
    nameEn: 'Mushroom Matar Paneer',
    nameHi: 'मशरूम मटर पनीर',
    descriptionEn: 'Tender button mushrooms, sweet green peas, and soft paneer in homestyle onion-tomato gravy',
    descriptionHi: 'बटन मशरूम, मीठी हरी मटर और पनीर का खास स्वादिष्ट मेल',
    hasHalfFull: true,
    prices: { half: 100, full: 180 },
    image: 'assets/images/paneer_special.jpg'
  },
  {
    id: 'paneer-butter-masala',
    category: 'paneer',
    nameEn: 'Paneer Butter Masala',
    nameHi: 'पनीर बटर मसाला',
    descriptionEn: 'Soft cottage cheese bathed in a velvety, rich buttery tomato cream sauce infused with fenugreek',
    descriptionHi: 'मक्खन और क्रीम से भरपूर मखमली टमाटर ग्रेवी में डूबे सॉफ्ट पनीर क्यूब्स',
    badgeEn: 'Signature',
    badgeHi: 'सिग्नेचर',
    hasHalfFull: true,
    prices: { half: 100, full: 200 },
    image: 'assets/images/paneer_special.jpg'
  },
  {
    id: 'paneer-lababdar',
    category: 'paneer',
    nameEn: 'Paneer Lababdar',
    nameHi: 'लबाबदार पनीर',
    descriptionEn: 'Luscious paneer cubes simmered in a mildly sweet cashew-tomato gravy garnished with grated paneer',
    descriptionHi: 'काजू-टमाटर की क्रीमी ग्रेवी और कसा हुआ पनीर',
    hasHalfFull: true,
    prices: { half: 100, full: 200 },
    image: 'assets/images/paneer_special.jpg'
  },
  {
    id: 'matar-paneer',
    category: 'paneer',
    nameEn: 'Matar Paneer',
    nameHi: 'मटर पनीर',
    descriptionEn: 'Timeless North Indian comfort delicacy of sweet peas and paneer in seasoned homestyle sauce',
    descriptionHi: 'पारंपरिक उत्तर भारतीय स्वाद - हरी मटर और पनीर की रसीली करी',
    hasHalfFull: true,
    prices: { half: 90, full: 180 },
    image: 'assets/images/paneer_special.jpg'
  },
  {
    id: 'shahi-paneer',
    category: 'paneer',
    nameEn: 'Shahi Paneer',
    nameHi: 'शाही पनीर',
    descriptionEn: 'Royal Mughlai preparation in a fragrant cardamom, nut, and fresh cream velvet sauce',
    descriptionHi: 'शाही मसालों, मलाई और मेवों की लाजवाब मखमली ग्रेवी',
    badgeEn: 'Guest Favorite',
    badgeHi: 'अतिथियों की पसंद',
    hasHalfFull: true,
    prices: { half: 80, full: 160 },
    image: 'assets/images/paneer_special.jpg'
  },
  {
    id: 'palak-paneer',
    category: 'paneer',
    nameEn: 'Palak Paneer',
    nameHi: 'पालक पनीर',
    descriptionEn: 'Nutritious farm spinach puree delicately tempered with garlic, desi ghee, and tender paneer',
    descriptionHi: 'ताज़े पालक की प्यूरी, लहसुन और देशी घी के तड़के में तैयार पनीर',
    hasHalfFull: true,
    prices: { half: 90, full: 180 },
    image: 'assets/images/paneer_special.jpg'
  },
  {
    id: 'paneer-tikka-gravy',
    category: 'paneer',
    nameEn: 'Paneer Tikka Gravy',
    nameHi: 'पनीर टिक्का ग्रेवी',
    descriptionEn: 'Char-grilled smoky paneer tikka tossed in a spicy, roasted onion-tomato masala gravy',
    descriptionHi: 'तन्दूर में भुना हुआ स्मोकी पनीर टिक्का गाढ़ी चटपटी तरी के साथ',
    badgeEn: 'Smoky & Spicy',
    badgeHi: 'स्मोकी स्पेशल',
    hasHalfFull: true,
    prices: { half: 120, full: 210 },
    image: 'assets/images/paneer_special.jpg'
  },
  {
    id: 'tawa-chaap',
    category: 'paneer',
    nameEn: 'Tawa Soya Chaap',
    nameHi: 'तवा चाप',
    descriptionEn: 'Succulent soya chaap pan-seared on flat iron skillet with crushed peppercorns and rich masala',
    descriptionHi: 'तवे पर भुनी हुई रसीली सोया चाप, खड़े मसालों और गाढ़ी मसालेदार तरी में',
    badgeEn: 'Hot Seller',
    badgeHi: 'हॉट सेलर',
    hasHalfFull: true,
    prices: { half: 100, full: 200 },
    image: 'assets/images/paneer_special.jpg'
  },

  // --- DAL & GRAVIES ---
  {
    id: 'dal-makhani',
    category: 'dal',
    nameEn: 'Dal Makhani',
    nameHi: 'दाल मखनी',
    descriptionEn: 'Slow-cooked whole black lentils simmered overnight with generous butter, fresh cream, and fenugreek',
    descriptionHi: 'धीमी आंच पर रातभर पकी उड़द दाल, मक्खन, क्रीम और देशी घी का बेजोड़ स्वाद',
    badgeEn: 'Iconic Dish',
    badgeHi: 'सिग्नेचर डिश',
    hasHalfFull: true,
    prices: { half: 80, full: 160 },
    image: 'assets/images/dal_makhani.jpg'
  },
  {
    id: 'chana-masala',
    category: 'dal',
    nameEn: 'Chana Masala',
    nameHi: 'चना मसाला',
    descriptionEn: 'Tender kabuli chickpeas cooked with tangy dry mango, roasted cumin, and robust Punjabi aromatics',
    descriptionHi: 'चटपटे काबुली चने, भुने जीरे और अनारदाने के तड़के के साथ',
    hasHalfFull: true,
    prices: { half: 80, full: 160 },
    image: 'assets/images/dal_makhani.jpg'
  },
  {
    id: 'rajma-masala',
    category: 'dal',
    nameEn: 'Rajma Masala',
    nameHi: 'राजमा मसाला',
    descriptionEn: 'Authentic red kidney beans simmered in thick onion-ginger-tomato gravy. Soul food at its best.',
    descriptionHi: 'गाढ़ी खुशबूदार तरी में पके कश्मीरी राजमा, पंजाबी स्टाइल में तैयार',
    badgeEn: 'All-Time Classic',
    badgeHi: 'सदाबहार स्वाद',
    hasHalfFull: true,
    prices: { half: 80, full: 160 },
    image: 'assets/images/dal_makhani.jpg'
  },
  {
    id: 'dal-fry',
    category: 'dal',
    nameEn: 'Dal Fry (Yellow Tadka)',
    nameHi: 'दाल फ्राई',
    descriptionEn: 'Yellow pigeon pea lentils vigorously tempered with pure ghee, cumin seeds, garlic, and green chilies',
    descriptionHi: 'देशी घी, हींग, जीरा, लहसुन और हरी मिर्च के शानदार तड़के वाली पीली दाल',
    hasHalfFull: true,
    prices: { half: 60, full: 120 },
    image: 'assets/images/dal_makhani.jpg'
  },
  {
    id: 'rajma',
    category: 'dal',
    nameEn: 'Homestyle Rajma',
    nameHi: 'राजमा',
    descriptionEn: 'Light, comforting homestyle stewed red beans seasoned with mild spices',
    descriptionHi: 'घर जैसा सादा और स्वादिष्ट राजमा',
    hasHalfFull: true,
    prices: { half: 60, full: 120 },
    image: 'assets/images/dal_makhani.jpg'
  },
  {
    id: 'chole',
    category: 'dal',
    nameEn: 'Amritsari Chole',
    nameHi: 'छोले',
    descriptionEn: 'Traditional spiced chickpeas simmered to soft perfection in dark tea-infused Punjabi gravy',
    descriptionHi: 'पारंपरिक पंजाबी मसालेदार छोले',
    hasHalfFull: true,
    prices: { half: 60, full: 120 },
    image: 'assets/images/dal_makhani.jpg'
  },

  // --- SABZI & DAILY SPECIALS ---
  {
    id: 'mix-veg',
    category: 'sabzi',
    nameEn: 'Mix Vegetable Melange',
    nameHi: 'मिक्स वेज',
    descriptionEn: 'Fresh garden vegetables and paneer tossed with roasted cumin and dry masala',
    descriptionHi: 'गाजर, बीन्स, गोभी, मटर और पनीर का रंगीन स्वादिष्ट तड़का',
    hasHalfFull: true,
    prices: { half: 80, full: 160 },
    image: 'assets/images/hero_thali.jpg'
  },
  {
    id: 'mushroom-matar',
    category: 'sabzi',
    nameEn: 'Mushroom Matar',
    nameHi: 'मशरूम मटर',
    descriptionEn: 'Button mushrooms and sweet green peas braised in rich onion-tomato sauce',
    descriptionHi: 'ताज़ा मशरूम और हरी मटर की गाढ़ी मसालेदार सब्जी',
    hasHalfFull: true,
    prices: { half: 80, full: 150 },
    image: 'assets/images/hero_thali.jpg'
  },
  {
    id: 'aloo-gobhi',
    category: 'sabzi',
    nameEn: 'Aloo Gobhi',
    nameHi: 'आलू गोभी',
    descriptionEn: 'Tender cauliflower florets and potatoes dry-roasted with ginger juliennes and turmeric',
    descriptionHi: 'अदरक और खड़े मसालों के तड़के में बनी कुरकुरी आलू-गोभी की सूखी सब्जी',
    hasHalfFull: true,
    prices: { half: 60, full: 100 },
    image: 'assets/images/hero_thali.jpg'
  },
  {
    id: 'ghiya-kofta',
    category: 'sabzi',
    nameEn: 'Ghiya Kofta (Saturday Special)',
    nameHi: 'घिया कोफ्ता (शनिवार स्पेशल)',
    descriptionEn: 'Melt-in-mouth bottle gourd dumplings simmered in velvety spiced gravy. Exclusively on Saturdays.',
    descriptionHi: 'मुलायम लौकी के कोफ्ते गाढ़ी खुशबूदार तरी में - केवल शनिवार को उपलब्ध!',
    badgeEn: 'Saturday Special',
    badgeHi: 'शनि स्पेशल',
    daySpecial: 6,
    hasHalfFull: true,
    prices: { half: 60, full: 100 },
    image: 'assets/images/hero_thali.jpg'
  },
  {
    id: 'kadhi-pakoda',
    category: 'sabzi',
    nameEn: 'Kadhi Pakoda (Tuesday Special)',
    nameHi: 'कढ़ी पकौड़ा (मंगलवार स्पेशल)',
    descriptionEn: 'Silky curd & chickpea flour broth simmered with crispy onion fritters. Exclusively on Tuesdays.',
    descriptionHi: 'दही-बेसन की खट्टी-तीखी कढ़ी में डूबे क्रिस्पी प्याज-मेथी पकौड़े - केवल मंगलवार को!',
    badgeEn: 'Tuesday Special',
    badgeHi: 'मंगल स्पेशल',
    daySpecial: 2,
    hasHalfFull: true,
    prices: { half: 60, full: 100 },
    image: 'assets/images/hero_thali.jpg'
  },
  {
    id: 'aloo-jeera',
    category: 'sabzi',
    nameEn: 'Aloo Jeera',
    nameHi: 'आलू जीरा',
    descriptionEn: 'Cubed golden potatoes tossed with crackled cumin seeds, hing, and fresh cilantro',
    descriptionHi: 'भुने हुए जीरे, हींग और हरी मिर्च के तड़के वाले चटपटे आलू',
    hasHalfFull: true,
    prices: { half: 60, full: 100 },
    image: 'assets/images/hero_thali.jpg'
  },
  {
    id: 'aloo-palak',
    category: 'sabzi',
    nameEn: 'Aloo Palak',
    nameHi: 'आलू पालक',
    descriptionEn: 'Tender baby potatoes braised gently in velvety puréed fresh spinach',
    descriptionHi: 'पौष्टिक पालक की तरी में पके हुए नरम आलू',
    hasHalfFull: true,
    prices: { half: 60, full: 100 },
    image: 'assets/images/hero_thali.jpg'
  },
  {
    id: 'aloo-matar',
    category: 'sabzi',
    nameEn: 'Aloo Matar',
    nameHi: 'आलू मटर',
    descriptionEn: 'Classic homestyle potato and garden peas curry in wholesome tomato broth',
    descriptionHi: 'रसीले आलू और ताज़ी हरी मटर की घर जैसी स्वादिष्ट सब्जी',
    hasHalfFull: true,
    prices: { half: 60, full: 100 },
    image: 'assets/images/hero_thali.jpg'
  },

  // --- CHAWAL & COMBOS ---
  {
    id: 'fry-chawal',
    category: 'chawal',
    nameEn: 'Fried Basmati Rice',
    nameHi: 'फ्राई चावल',
    descriptionEn: 'Fragrant long-grain basmati tossed with caramelized onions and roasted cumin in ghee',
    descriptionHi: 'देशी घी, प्याज, जीरा और हरी सब्जियों के साथ फ्राई किए बासमती चावल',
    hasHalfFull: true,
    prices: { half: 70, full: 140 },
    image: 'assets/images/hero_thali.jpg'
  },
  {
    id: 'chole-chawal',
    category: 'chawal',
    nameEn: 'Chole Chawal Combo',
    nameHi: 'छोले चावल',
    descriptionEn: 'Delhi street comfort classic: spiced Punjabi chole served over steaming hot basmati rice',
    descriptionHi: 'दिल्ली का सबसे पसंदीदा कॉम्बो - चटपटे छोले और गरमा गरम बासमती चावल',
    badgeEn: 'Popular Combo',
    badgeHi: 'पॉपुलर कॉम्बो',
    hasHalfFull: true,
    prices: { half: 70, full: 140 },
    image: 'assets/images/hero_thali.jpg'
  },
  {
    id: 'rajma-chawal',
    category: 'chawal',
    nameEn: 'Rajma Chawal Combo',
    nameHi: 'राजमा चावल',
    descriptionEn: 'The quintessential North Indian soul comfort: luscious red rajma served atop aromatic rice',
    badgeEn: 'Bestseller Combo',
    badgeHi: 'सदाबहार कॉम्बो',
    hasHalfFull: true,
    prices: { half: 70, full: 140 },
    image: 'assets/images/hero_thali.jpg'
  },
  {
    id: 'dal-chawal',
    category: 'chawal',
    nameEn: 'Dal Chawal Combo',
    nameHi: 'दाल चावल',
    descriptionEn: 'Homestyle yellow dal tadka paired with fluffy steamed rice',
    descriptionHi: 'घर का सुकून - देशी घी तड़का दाल और बासमती चावल',
    hasHalfFull: true,
    prices: { half: 70, full: 140 },
    image: 'assets/images/hero_thali.jpg'
  },
  {
    id: 'jeera-chawal',
    category: 'chawal',
    nameEn: 'Jeera Rice',
    nameHi: 'जीरा चावल',
    descriptionEn: 'Aromatic steamed basmati rice tempered with crackled golden cumin seeds and ghee',
    descriptionHi: 'देशी घी और भुने जीरे के तड़के वाले खुशबूदार बासमती चावल',
    hasHalfFull: true,
    prices: { half: 50, full: 100 },
    image: 'assets/images/hero_thali.jpg'
  },
  {
    id: 'plain-chawal',
    category: 'chawal',
    nameEn: 'Plain Steamed Rice',
    nameHi: 'प्लेन चावल',
    descriptionEn: 'Fluffy, pristine long-grain steamed basmati rice',
    descriptionHi: 'खिले-खिले सादे स्टीम्ड बासमती चावल',
    hasHalfFull: true,
    prices: { half: 50, full: 100 },
    image: 'assets/images/hero_thali.jpg'
  },

  // --- TANDOOR & BREADS ---
  {
    id: 'tawa-roti',
    category: 'tandoor',
    nameEn: 'Tawa Roti',
    nameHi: 'तवा रोटी',
    descriptionEn: 'Fresh whole wheat flatbread made to order on flat griddle',
    descriptionHi: 'ताज़ी गरमा-गरम गेहूं की तवा रोटी',
    price: 8,
    hasHalfFull: false,
    image: 'assets/images/hero_thali.jpg'
  },
  {
    id: 'butter-roti',
    category: 'tandoor',
    nameEn: 'Butter Tawa Roti',
    nameHi: 'बटर रोटी (तवा)',
    descriptionEn: 'Fresh tawa roti brushed with golden butter',
    descriptionHi: 'अमूल बटर से चुपड़ी हुई मुलायम तवा रोटी',
    price: 10,
    hasHalfFull: false,
    image: 'assets/images/hero_thali.jpg'
  },
  {
    id: 'tandoori-roti',
    category: 'tandoor',
    nameEn: 'Tandoori Roti',
    nameHi: 'तन्दूरी रोटी',
    descriptionEn: 'Crisp, smoky whole wheat flatbread baked inside charcoal clay tandoor',
    descriptionHi: 'मिट्टी के तन्दूर में सिकी कुरकुरी शुद्ध गेहूं रोटी',
    price: 8,
    hasHalfFull: false,
    image: 'assets/images/dal_makhani.jpg'
  },
  {
    id: 'tandoori-butter-roti',
    category: 'tandoor',
    nameEn: 'Tandoori Butter Roti',
    nameHi: 'तन्दूरी बटर रोटी',
    descriptionEn: 'Smoky clay-oven baked roti generously glazed with butter',
    descriptionHi: 'तन्दूर की सिकी रोटी मक्खन के साथ',
    price: 10,
    hasHalfFull: false,
    image: 'assets/images/dal_makhani.jpg'
  },
  {
    id: 'lachha-paratha',
    category: 'tandoor',
    nameEn: 'Lachha Paratha',
    nameHi: 'लच्छा पराठा',
    descriptionEn: 'Multi-layered flaky spiral bread baked in tandoor with ghee',
    descriptionHi: 'परतों वाला कुरकुरा तन्दूरी लच्छा पराठा',
    badgeEn: 'Crispy & Flaky',
    badgeHi: 'कुरकुरा',
    price: 25,
    hasHalfFull: false,
    image: 'assets/images/paneer_special.jpg'
  },
  {
    id: 'missi-roti',
    category: 'tandoor',
    nameEn: 'Missi Roti',
    nameHi: 'मिस्सी रोटी',
    descriptionEn: 'Spiced gram-flour and wheat bread scented with fenugreek and ajwain',
    descriptionHi: 'बेसन, प्याज, अजवाइन और कस्तूरी मेथी से तैयार मिस्सी रोटी',
    price: 25,
    hasHalfFull: false,
    image: 'assets/images/hero_thali.jpg'
  },
  {
    id: 'aloo-naan',
    category: 'tandoor',
    nameEn: 'Aloo Naan',
    nameHi: 'आलू नान',
    descriptionEn: 'Leavened clay-oven flatbread stuffed with spiced crushed potatoes',
    descriptionHi: 'मसालेदार आलू के भरावन वाला तन्दूरी नान',
    price: 30,
    hasHalfFull: false,
    image: 'assets/images/paneer_special.jpg'
  },
  {
    id: 'butter-naan',
    category: 'tandoor',
    nameEn: 'Butter Naan',
    nameHi: 'बटर नान',
    descriptionEn: 'Soft, pillowy tandoori leavened flatbread brushed with molten butter',
    descriptionHi: 'मुलायम, फूला हुआ मक्खनदार तन्दूरी नान',
    badgeEn: 'Classic',
    badgeHi: 'लोकप्रिय',
    price: 30,
    hasHalfFull: false,
    image: 'assets/images/paneer_special.jpg'
  },
  {
    id: 'paneer-naan',
    category: 'tandoor',
    nameEn: 'Paneer Naan',
    nameHi: 'पनीर नान',
    descriptionEn: 'Indulgent tandoori naan stuffed with seasoned grated fresh cottage cheese',
    descriptionHi: 'ताज़े कसे हुए पनीर और मसालों से भरा तन्दूरी नान',
    badgeEn: 'Rich Delight',
    badgeHi: 'शाही नान',
    price: 40,
    hasHalfFull: false,
    image: 'assets/images/paneer_special.jpg'
  },

  // --- RAITA & EXTRAS ---
  {
    id: 'raita',
    category: 'extras',
    nameEn: 'Special Boondi Raita',
    nameHi: 'रायता',
    descriptionEn: 'Chilled spiced yogurt whisked with crunchy boondi and roasted cumin',
    descriptionHi: 'ठंडा भुने जीरे और पुदीने वाला बूंदी रायता',
    price: 30,
    hasHalfFull: false,
    image: 'assets/images/hero_thali.jpg'
  },
  {
    id: 'dahi',
    category: 'extras',
    nameEn: 'Fresh Curd (Dahi)',
    nameHi: 'दही',
    descriptionEn: 'Pure, thick and wholesome artisanal set yogurt',
    descriptionHi: 'ताज़ा गाढ़ा जमा हुआ शुद्ध दही',
    price: 30,
    priceLabel: '₹30 / MRP',
    hasHalfFull: false,
    image: 'assets/images/hero_thali.jpg'
  }
];

const RESTAURANT_INFO = {
  nameEn: 'Vaishno Bhojnalaya',
  nameHi: 'वैष्णो भोजनालय',
  phone1: '9891660510',
  phone2: '7011774361',
  whatsappNumber: '919891660510',
  minOrderForFreeDelivery: 300,
  addressEn: 'HR-29, 60 Feet Road, Pul Pehladpur (Opp. Hari Krishna Vatika), New Delhi',
  addressHi: 'HR-29, 60 फीट रोड, पुल प्रह्लादपुर (हरि कृष्णा वाटिका के सामने), नई दिल्ली',
  mapsUrl: 'https://maps.app.goo.gl/D6baVidQmz5UEXye9',
  timingsEn: '10:30 AM – 11:00 PM (Open All 7 Days)',
  timingsHi: 'सुबह 10:30 से रात 11:00 बजे (सातों दिन खुला)'
};
