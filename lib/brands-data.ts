// Brand and category data structure
export interface Brand {
  slug: string
  name: string
  type: string
  category: string
  url: string
  amazonLink?: string
  buttonText?: string
  description: string
  brandStory?: string
  affiliateProducts?: Array<{
    name: string
    url: string
    image?: string
  }>
}

export interface Category {
  slug: string
  name: string
  icon: string
  brandCount: number
  seoBlurb?: string
}

export const brands: Brand[] = [
  {
    "slug": "a-w",
    "name": "A W",
    "type": "Brand",
    "category": "Restaurant",
    "url": "https://web.aw.ca/",
    "description": "Whether you’re stopping by for a Teen Burger, crispy onion rings, or a cold, refreshing root beer float, A&W offers that familiar taste and feel-good vibe Canadians love."
  },
  {
    "slug": "ardene",
    "name": "Ardene",
    "type": "Brand",
    "category": "Clothing",
    "url": "https://www.ardene.com",
    "amazonLink": "https://shopstyle.it/l/cwE8W",
    "buttonText": "ardene sale on now!",
    "description": "Started in Montreal, the brand is known for its fun, youthful vibe and inclusive styles for every body."
  },
  {
    "slug": "aritzia",
    "name": "Aritzia",
    "type": "Brand",
    "category": "Clothing",
    "url": "https://www.aritzia.com/en/",
    "amazonLink": "https://shopstyle.it/l/cwE2N",
    "buttonText": "aritzia sale on now!",
    "description": "Launched in Vancouver, Aritzia offers beautifully designed pieces from brands like Wilfred, Babaton, and TNA."
  },
  {
    "slug": "barburrito",
    "name": "Barburrito",
    "type": "Brand",
    "category": "Restaurant",
    "url": "https://www.barburrito.ca/",
    "description": "Starting out in Toronto back in 2005, BarBurrito has quickly become one of Canada’s go-to spots for fresh, customizable Mexican eats."
  },
  {
    "slug": "beavertails",
    "name": "Beavertails",
    "type": "Brand",
    "category": "Restaurant",
    "url": "https://beavertails.com/",
    "description": "BeaverTails offer over just pastries, they also delivers poutines, frozen treats, and refreshing drinks that are all crafted to turn everyday outings into lifelong memories. Whether it’s après-ski, a summer stroll, or a family road trip, the sight of a BeaverTails stand means one thing: happiness is about to be served."
  },
  {
    "slug": "blume",
    "name": "Blume",
    "type": "Brand",
    "category": "Health",
    "url": "https://www.blume.com/",
    "description": "This proudly Canadian company creates health products focused on efficacy, purity, and your wellbeing."
  },
  {
    "slug": "booster-juice",
    "name": "Booster Juice",
    "type": "Brand",
    "category": "Restaurant",
    "url": "https://boosterjuice.com/",
    "description": "A Canadian dining favourite known for fresh ingredients, welcoming atmosphere, and consistent quality."
  },
  {
    "slug": "boston-pizza",
    "name": "Boston Pizza",
    "type": "Brand",
    "category": "Restaurant",
    "url": "https://bostonpizza.com/en/index.html",
    "description": "Canadian-owned and operated, this restaurant chain brings authentic flavours and friendly service to communities nationwide."
  },
  {
    "slug": "browns-shoes",
    "name": "Browns Shoes",
    "type": "Brand",
    "category": "Shoes",
    "url": "https://www.brownsshoes.com",
    "description": "This Canadian company creates footwear built for real life—comfortable, well-made, and stylish."
  },
  {
    "slug": "call-it-spring",
    "name": "Call It Spring",
    "type": "Brand",
    "category": "Shoes",
    "url": "https://www.callitspring.com/ca/en",
    "description": "Proudly Canadian, this go-to company features trendy shoes, bags, and accessories that let you express your style—without breaking the bank."
  },
  {
    "slug": "cheekbone-beauty",
    "name": "Cheekbone Beauty",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://www.cheekbonebeauty.com",
    "description": "Created by Indigenous entrepreneur Jenn Harper, this proudly Canadian brand blends high-performance beauty with purpose."
  },
  {
    "slug": "cineplex",
    "name": "Cineplex",
    "type": "Brand",
    "category": "Entertainment",
    "url": "https://www.cineplex.com/",
    "description": "A Canadian entertainment company providing quality experiences, memorable moments, and cultural connections."
  },
  {
    "slug": "cora-breakfast-lunch",
    "name": "Cora Breakfast Lunch",
    "type": "Brand",
    "category": "Restaurant",
    "url": "https://www.chezcora.com/en/",
    "description": "A Canadian dining favourite known for fresh ingredients, welcoming atmosphere, and consistent quality."
  },
  {
    "slug": "dennys",
    "name": "Dennys",
    "type": "Brand",
    "category": "Restaurant",
    "url": "https://www.dennys.ca/",
    "description": "Denny's has long been a Canadian favourite starting in opening it's first Canadian location in 1970 in Vancouver, British Columbia."
  },
  {
    "slug": "dollarama",
    "name": "Dollarama",
    "type": "Brand",
    "category": "Retail",
    "url": "https://www.dollarama.com/en-ca/",
    "description": "With stores all across Canada, Dollarama produces budget-friendly shopping simple, convenient, and full of great deals."
  },
  {
    "slug": "earls",
    "name": "Earls",
    "type": "Brand",
    "category": "Restaurant",
    "url": "https://earls.ca/",
    "description": "Earl’s is a favourite Canadian restaurant known for its lively vibe and tasty menu that mixes international flavours with fresh, local ingredients."
  },
  {
    "slug": "eastside-marios",
    "name": "Eastside Marios",
    "type": "Brand",
    "category": "Restaurant",
    "url": "https://www.eastsidemarios.com/en.html",
    "description": "Famous for hearty pasta dishes, classic pizzas, fresh salads, and indulgent desserts, this family-friendly restaurant provides authentic Italian comfort food made with quality ingredients."
  },
  {
    "slug": "enterprise",
    "name": "Enterprise",
    "type": "Brand",
    "category": "Travel",
    "url": "https://www.enterprise.ca/en/home.html",
    "description": "Recognized for friendly service and flexible options, Enterprise has been helping Canadians get where they need to go for decades."
  },
  {
    "slug": "flair-air",
    "name": "Flair Air",
    "type": "Brand",
    "category": "Travel",
    "url": "https://flyflair.com/",
    "description": "Flair Air is all about making flying easy on your wallet while still delivering the true Canadian travel experience."
  },
  {
    "slug": "freshii",
    "name": "Freshii",
    "type": "Brand",
    "category": "Restaurant",
    "url": "https://freshii.com/",
    "description": "A Canadian dining favourite known for fresh ingredients, welcoming atmosphere, and consistent quality."
  },
  {
    "slug": "giant-tiger",
    "name": "Giant Tiger",
    "type": "Brand",
    "category": "Retail",
    "url": "https://www.gianttiger.com/",
    "description": "Whether you’re shopping for groceries, clothes, home essentials, or seasonal items, Giant Tiger offers a wide variety of well-crafted products at prices that won’t break the bank."
  },
  {
    "slug": "good-food",
    "name": "Good Food",
    "type": "Brand",
    "category": "Meal Delivery",
    "url": "https://www.makegoodfood.ca/",
    "description": "This homegrown service delivers quality meal kits focused on convenience, freshness, and great taste."
  },
  {
    "slug": "good-protein",
    "name": "Good Protein",
    "type": "Brand",
    "category": "Health",
    "url": "https://goodprotein.ca",
    "description": "Good Protein is a Canadian brand all about helping you stay active and healthy with protein-packed products you can actually enjoy."
  },
  {
    "slug": "groupe-marcelle",
    "name": "Groupe Marcelle",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://marcelle.com/en?srsltid=AfmBOopOrRmntJMfkNbqXhm6Lu6O2bwPwQI5MD4uJKQ-PSzoQAzyi_qz",
    "description": "Started in 1982, the brand has become known for it's affordability and products that blend luxury, quality, and care."
  },
  {
    "slug": "harveys",
    "name": "Harveys",
    "type": "Brand",
    "category": "Restaurant",
    "url": "https://www.harveys.ca/",
    "description": "A Canadian dining favourite known for fresh ingredients, welcoming atmosphere, and consistent quality."
  },
  {
    "slug": "herschel-supply-co",
    "name": "Herschel Supply Co",
    "type": "Brand",
    "category": "Accessories",
    "url": "https://herschel.ca",
    "description": "Herschel Supply Co. is a Canadian company making backpacks, bags, and accessories that blend classic style with everyday practicality."
  },
  {
    "slug": "home-hardware",
    "name": "Home Hardware",
    "type": "Brand",
    "category": "Retail",
    "url": "https://www.homehardware.ca",
    "description": "A Canadian retail favourite known for quality products and community connections."
  },
  {
    "slug": "indigo-books",
    "name": "Indigo Books",
    "type": "Brand",
    "category": "Retail",
    "url": "https://www.indigo.ca/en-ca/",
    "description": "More than just a bookstore, Indigo is a welcoming spot where readers, families, and creatives come together to explore, learn, and be inspired."
  },
  {
    "slug": "joe-fresh",
    "name": "Joe Fresh",
    "type": "Brand",
    "category": "Clothing",
    "url": "https://www.joefresh.com/ca",
    "description": "Starting in 2006, Joe Fresh has been bringing modern style to Canadian families with clothing, accessories, and footwear that balance thoughtful design with everyday value. What began in Toronto as a fresh, accessible approach to fashion has grown into one of Canada’s leading retailers that's available at over 1,650 locations nationwide, including Loblaw and Shoppers Drug Mart stores, as well as dedicated Joe Fresh boutiques and joefresh. com."
  },
  {
    "slug": "knix",
    "name": "Knix",
    "type": "Brand",
    "category": "Intimates",
    "url": "https://knix.ca/",
    "description": "From 2013, this proudly Canadian company has been all about creating bras, underwear, activewear, and loungewear that make you feel good inside and out."
  },
  {
    "slug": "lee-valley",
    "name": "Lee Valley",
    "type": "Brand",
    "category": "Retail",
    "url": "https://www.leevalley.com",
    "description": "A Canadian retail favourite known for quality products and community connections."
  },
  {
    "slug": "lise-watier",
    "name": "Lise Watier",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://watier.com",
    "description": "Proudly Canadian since 1972, this luxury brand is famous for creating high-performance products that blend innovation, elegance, and inclusivity."
  },
  {
    "slug": "loblaws",
    "name": "Loblaws",
    "type": "Brand",
    "category": "Grocery",
    "url": "https://www.loblaws.ca/",
    "description": "Loblaws has been part of Canadian life for decades—where families go for fresh food, trusted brands, and everything in between."
  },
  {
    "slug": "london-drugs",
    "name": "London Drugs",
    "type": "Brand",
    "category": "Retail",
    "url": "https://www.londondrugs.com/",
    "description": "London Drugs is a leading Canadian pharmacy and retail chain that remains providing quality products and exceptional service from 1945!."
  },
  {
    "slug": "lululemon",
    "name": "Lululemon",
    "type": "Brand",
    "category": "Clothing",
    "url": "https://shop.lululemon.com/",
    "amazonLink": "https://shopstyle.it/l/cwE20",
    "buttonText": "we made too much sale!",
    "description": "Lululemon is a popular Canadian athletic wear brand known for it's trendy, high performance clothing aimed at inspiring an active lifestyle."
  },
  {
    "slug": "m-m-food-market",
    "name": "M M Food Market",
    "type": "Brand",
    "category": "Grocery",
    "url": "https://www.mmfoodmarket.com/",
    "description": "Proudly Canadian, this grocery chain offers quality food and household essentials with community focus."
  },
  {
    "slug": "made-good",
    "name": "Made Good",
    "type": "Brand",
    "category": "Snacks",
    "url": "https://www.madegoods.com/",
    "description": "A Canadian snack brand creating delicious, quality treats made with care and better ingredients."
  },
  {
    "slug": "marks",
    "name": "Marks",
    "type": "Brand",
    "category": "Clothing",
    "url": "https://www.marks.com/en.html",
    "description": "Mark’s is a Canadian retailer that features durable workwear as well as casual clothing and footwear to keep you comfortable and stylish."
  },
  {
    "slug": "mary-browns",
    "name": "Mary Browns",
    "type": "Brand",
    "category": "Restaurant",
    "url": "https://marybrowns.com/",
    "description": "A beloved Canadian restaurant chain serving quality food and memorable dining experiences across the country."
  },
  {
    "slug": "metro",
    "name": "Metro",
    "type": "Brand",
    "category": "Grocery",
    "url": "https://www.metro.ca/en",
    "description": "Metro is a favourite Canadian grocery chain known for its fresh produce, carefully made meats, and all your everyday essentials."
  },
  {
    "slug": "montanas",
    "name": "Montanas",
    "type": "Brand",
    "category": "Restaurant",
    "url": "https://www.montanas.ca/",
    "description": "Recognized for its smoky, flame-grilled ribs, burgers, steaks, and more, Montana’s provides delicious dishes perfect for sharing with family and friends."
  },
  {
    "slug": "moxies",
    "name": "Moxies",
    "type": "Brand",
    "category": "Restaurant",
    "url": "https://moxies.com",
    "description": "This homegrown Canadian restaurant has been serving delicious meals and building community connections for years."
  },
  {
    "slug": "nudestix",
    "name": "Nudestix",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://nudestix.ca",
    "description": "This Canadian label is all about creamy, multi-use sticks you can swipe on in seconds—for eyes, lips, cheeks, and everything in between."
  },
  {
    "slug": "panago-pizza",
    "name": "Panago Pizza",
    "type": "Brand",
    "category": "Restaurant",
    "url": "https://www.panago.com/",
    "description": "Panago Pizza is a proudly Canadian pizza chain known for its delicious, chef-inspired creations made with fresh dough, quality ingredients, and bold flavours."
  },
  {
    "slug": "petro-canada",
    "name": "Petro Canada",
    "type": "Brand",
    "category": "Automotive",
    "url": "https://www.petro-canada.ca/en/personal",
    "description": "Proudly Canadian, this brand offers vehicles and automotive solutions for Canadian roads and drivers."
  },
  {
    "slug": "pharmasave",
    "name": "Pharmasave",
    "type": "Brand",
    "category": "Pharmacy",
    "url": "https://pharmasave.com/",
    "description": "A Canadian pharmacy chain providing trusted healthcare services, quality products, and professional guidance."
  },
  {
    "slug": "pizza-pizza",
    "name": "Pizza Pizza",
    "type": "Brand",
    "category": "Restaurant",
    "url": "https://www.pizzapizza.ca/",
    "description": "A beloved Canadian restaurant chain serving quality food and memorable dining experiences across the country."
  },
  {
    "slug": "porter-airlines",
    "name": "Porter Airlines",
    "type": "Brand",
    "category": "Travel",
    "url": "https://www.flyporter.com/en-ca/",
    "description": "Located in downtown Toronto, Porter features easy, stylish short-haul flights across Canada and the U. , all with a signature Canadian touch. S."
  },
  {
    "slug": "princess-auto",
    "name": "Princess Auto",
    "type": "Brand",
    "category": "Retail",
    "url": "https://www.princessauto.com",
    "description": "A Canadian retail chain offering diverse products, great value, and convenient shopping across the country."
  },
  {
    "slug": "reitmans",
    "name": "Reitmans",
    "type": "Brand",
    "category": "Clothing",
    "url": "https://www.reitmans.com",
    "description": "Reitmans is a popular Canadian clothing label that’s been providing women with stylish, affordable AND comfortable fashion pieces starting in 1926!."
  },
  {
    "slug": "revolution-nutrition",
    "name": "Revolution Nutrition",
    "type": "Brand",
    "category": "Health",
    "url": "https://revolution-nutrition.com",
    "description": "Revolution Nutrition is a Canadian brand specializing in high-well-crafted sports supplements designed to support fitness, performance, and wellness goals."
  },
  {
    "slug": "rocky-mountain-soap-co",
    "name": "Rocky Mountain Soap Co",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://www.rockymountainsoap.com",
    "description": "A Canadian beauty brand committed to clean formulations, quality ingredients, and effective results."
  },
  {
    "slug": "rogers",
    "name": "Rogers",
    "type": "Brand",
    "category": "Telecom",
    "url": "https://www.rogers.com/",
    "description": "Proudly Canadian, this provider offers wireless, internet, and communication services built for Canadian needs."
  },
  {
    "slug": "roots",
    "name": "Roots",
    "type": "Brand",
    "category": "Clothing",
    "url": "https://www.roots.com/ca/en/homepage",
    "amazonLink": "https://shopstyle.it/l/cwE2E",
    "buttonText": "roots sale on now!",
    "description": "A homegrown fashion label delivering on-trend pieces that work for real Canadian lifestyles."
  },
  {
    "slug": "stanfields",
    "name": "Stanfield's",
    "type": "Brand",
    "category": "Clothing",
    "url": "https://www.stanfields.com/",
    "amazonLink": "https://amzn.to/4p8TKoG",
    "buttonText": "shop now on amazon",
    "description": "Founded in 1856 in Nova Scotia, Stanfield's is Canada's original wool and thermal clothing maker. Durable, warm, and crafted for real Canadian winters."
  },
  {
    "slug": "save-on-foods",
    "name": "Save On Foods",
    "type": "Brand",
    "category": "Grocery",
    "url": "https://www.saveonfoods.com",
    "description": "Save On Foods is a Canadian grocery favourite known for fresh, well-crafted food that won’t break the bank."
  },
  {
    "slug": "second-cup",
    "name": "Second Cup",
    "type": "Brand",
    "category": "Coffee",
    "url": "https://secondcup.com/en/",
    "description": "A Canadian coffee roaster dedicated to fresh beans, expert roasting, and exceptional flavour."
  },
  {
    "slug": "shoppers-drug-mart",
    "name": "Shoppers Drug Mart",
    "type": "Brand",
    "category": "Pharmacy",
    "url": "https://www.shoppersdrugmart.ca/",
    "description": "Since 1962, Shoppers Drug Mart is a go-to spot for Canadians looking after their health and everyday needs."
  },
  {
    "slug": "simons",
    "name": "Simons",
    "type": "Brand",
    "category": "Clothing",
    "url": "https://m.simons.ca/en",
    "description": "Started in 1840, Simons is a Canadian fashion chain that sells stylish clothing and home decor!."
  },
  {
    "slug": "soft-moc-shoes",
    "name": "Soft Moc Shoes",
    "type": "Brand",
    "category": "Shoes",
    "url": "https://www.softmoc.com/ca/",
    "description": "No matter the occasion, SoftMoc is all about helping Canadians put their best foot forward — comfortably and confidently."
  },
  {
    "slug": "sportchek",
    "name": "Sportchek",
    "type": "Brand",
    "category": "Retail",
    "url": "https://www.sportchek.ca/en.html",
    "description": "Launched in 1999, Sport Chek is a popular Canadian sports retailer that sells athletic apparel, footwear, and equipment for all your favourite activities!."
  },
  {
    "slug": "stacked-pancake-house",
    "name": "Stacked Pancake House",
    "type": "Brand",
    "category": "Restaurant",
    "url": "https://www.stackedpancakehouse.ca/",
    "description": "Stacked Pancake House is a favourite Canadian breakfast spot known for its stacks of fluffy pancakes, crispy waffles, and classic morning comfort food."
  },
  {
    "slug": "state-main",
    "name": "State Main",
    "type": "Brand",
    "category": "Restaurant",
    "url": "https://www.stateandmain.ca/",
    "description": "State & Main is a Canadian restaurant that takes classic comfort food and gives it a fresh, modern spin."
  },
  {
    "slug": "super-c",
    "name": "Super C",
    "type": "Brand",
    "category": "Grocery",
    "url": "https://www.superc.ca/",
    "description": "Super C is a favourite Canadian grocery chain that brings fresh produce, meats, and everyday essentials to your table—all without breaking the bank."
  },
  {
    "slug": "swiss-chalet",
    "name": "Swiss Chalet",
    "type": "Brand",
    "category": "Restaurant",
    "url": "https://www.swisschalet.com/",
    "description": "A Canadian dining favourite known for fresh ingredients, welcoming atmosphere, and consistent quality."
  },
  {
    "slug": "t-t-supermarket",
    "name": "T T Supermarket",
    "type": "Brand",
    "category": "Grocery",
    "url": "https://www.tntsupermarket.com/eng/",
    "description": "A Canadian grocery favourite known for fresh products and reliable service."
  },
  {
    "slug": "telus",
    "name": "Telus",
    "type": "Brand",
    "category": "Telecom",
    "url": "https://www.telus.com/en",
    "description": "This homegrown telecom delivers quality service, network reliability, and Canadian support."
  },
  {
    "slug": "tentree",
    "name": "Tentree",
    "type": "Brand",
    "category": "Clothing",
    "url": "https://www.tentree.ca",
    "description": "A homegrown fashion label delivering on-trend pieces that work for real Canadian lifestyles."
  },
  {
    "slug": "three-ships-beauty",
    "name": "Three Ships Beauty",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://www.threeshipsbeauty.ca",
    "description": "This Canadian label keeps it clean with plant-based, vegan skincare that actually works—no nasties, no fluff."
  },
  {
    "slug": "ultramar",
    "name": "Ultramar",
    "type": "Brand",
    "category": "Automotive",
    "url": "https://journie.ca/ultramar/on-en",
    "description": "A Canadian automotive brand delivering quality vehicles, reliable performance, and customer-focused service."
  },
  {
    "slug": "urban-planet",
    "name": "Urban Planet",
    "type": "Brand",
    "category": "Clothing",
    "url": "https://urban-planet.com",
    "description": "Urban Planet is one of the fastest growing Canadian retailers that features stylish yet affordable clothing and accessories."
  },
  {
    "slug": "vessi",
    "name": "Vessi",
    "type": "Brand",
    "category": "Shoes",
    "url": "https://ca.vessi.com/",
    "description": "Proudly Canadian, this brand designs shoes that deliver on quality, fit, and lasting wear."
  },
  {
    "slug": "well-ca",
    "name": "Well Ca",
    "type": "Brand",
    "category": "Retail",
    "url": "https://well.ca/",
    "description": "A Canadian retail chain offering diverse products, great value, and convenient shopping across the country."
  },
  {
    "slug": "westjet",
    "name": "Westjet",
    "type": "Brand",
    "category": "Travel",
    "url": "https://www.westjet.com/en-ca",
    "description": "Famous for its friendly crew and reliable service, WestJet connects you to destinations across Canada and around the world."
  },
  {
    "slug": "canadian-tire",
    "name": "Canadian Tire",
    "type": "Brand",
    "category": "Retail",
    "url": "https://www.canadiantire.ca/en.html",
    "description": "Famous for great value and that beloved Canadian Tire money, it’s perfect for DIY projects, backyard upgrades, or getting ready for winter’s chill."
  },
  {
    "slug": "freshco",
    "name": "Freshco",
    "type": "Brand",
    "category": "Grocery",
    "url": "https://freshco.com/",
    "description": "Proudly Canadian, this grocery chain offers quality food and household essentials with community focus."
  },
  {
    "slug": "bouclair",
    "name": "Bouclair",
    "type": "Brand",
    "category": "Home",
    "url": "https://bouclair.com/",
    "description": "This Canadian company designs home essentials with attention to quality, design, and everyday living."
  },
  {
    "slug": "ecksand",
    "name": "Ecksand",
    "type": "Brand",
    "category": "Jewellery",
    "url": "https://ecksand.com/",
    "description": "Handcrafted in Montreal, this Canadian fine jewellery brand creates elegant pieces that are as kind to the planet as they are beautiful."
  },
  {
    "slug": "wecook",
    "name": "Wecook",
    "type": "Brand",
    "category": "Meal Delivery",
    "url": "https://www.wecookmeals.ca/en/about-us",
    "description": "A Canadian meal delivery service bringing fresh ingredients and chef-designed recipes right to your door."
  },
  {
    "slug": "sofia-zakia",
    "name": "Sofia Zakia",
    "type": "Brand",
    "category": "Jewellery",
    "url": "https://sofiazakia.com/",
    "description": "Proudly Canadian, this jeweller crafts pieces that celebrate quality materials and thoughtful design."
  },
  {
    "slug": "leah-alexandra",
    "name": "Leah Alexandra",
    "type": "Brand",
    "category": "Jewellery",
    "url": "https://leahalexandra.com",
    "description": "Proudly Canadian, this jeweller crafts pieces that celebrate quality materials and thoughtful design."
  },
  {
    "slug": "magpie-jewellery",
    "name": "Magpie Jewellery",
    "type": "Brand",
    "category": "Jewellery",
    "url": "https://magpiejewellery.com/",
    "description": "Magpie Jewellery is a favourite Canadian boutique recognized for its carefully curated collection of unique, handcrafted pieces."
  },
  {
    "slug": "hillberg-berk",
    "name": "Hillberg Berk",
    "type": "Brand",
    "category": "Jewellery",
    "url": "https://hillbergandberk.com",
    "description": "This Canadian brand designs jewellery that balances timeless elegance with modern sensibility."
  },
  {
    "slug": "garage-clothing",
    "name": "Garage Clothing",
    "type": "Brand",
    "category": "Clothing",
    "url": "https://www.garageclothing.com/ca/",
    "description": "Born in Montreal, this Canadian brand nails laid-back vibes with comfy, on-trend pieces that look as good as they feel."
  },
  {
    "slug": "goodlife-fitness",
    "name": "Goodlife Fitness",
    "type": "Brand",
    "category": "Fitness",
    "url": "https://www.goodlifefitness.com/",
    "description": "GoodLife Fitness is Canada’s biggest and friendliest gym, dedicated to helping Canadians live healthier, happier lives."
  },
  {
    "slug": "fit4less",
    "name": "Fit4Less",
    "type": "Brand",
    "category": "Fitness",
    "url": "https://www.fit4less.ca",
    "description": "Canadian-designed fitness products and services helping people achieve their wellness goals."
  },
  {
    "slug": "oxygen-yoga-fitness",
    "name": "Oxygen Yoga Fitness",
    "type": "Brand",
    "category": "Fitness",
    "url": "https://oxygenyogaandfitness.com/",
    "description": "Canadian-designed fitness products and services helping people achieve their wellness goals."
  },
  {
    "slug": "pet-valu",
    "name": "Pet Valu",
    "type": "Brand",
    "category": "Pets",
    "url": "https://www.petvalu.ca",
    "description": "Pet Valu is helping pets live healthy, happy, and active lives for over 40 years. What started out as a single Canadian pet store has grown into nearly 600 locations nationwide, including Bosley’s, Total Pet, and Tisol. Even as the largest small-format pet specialty retailer in the country, Pet Valu still feels like your friendly neighbourhood shop and is stocked with everything from premium nutrition to toys, treats, and everyday essentials."
  },
  {
    "slug": "g-adventures",
    "name": "G Adventures",
    "type": "Brand",
    "category": "Travel",
    "url": "https://www.gadventures.com",
    "description": "A Canadian travel company providing memorable experiences, reliable service, and expert trip planning."
  },
  {
    "slug": "aldo",
    "name": "Aldo",
    "type": "Brand",
    "category": "Shoes",
    "url": "https://www.aldoshoes.com/ca/en",
    "description": "Loved across Canada, ALDO features trend-forward footwear, accessories, and bags that effortlessly elevate your everyday style."
  },
  {
    "slug": "baffin-boots",
    "name": "Baffin Boots",
    "type": "Brand",
    "category": "Shoes",
    "url": "https://www.baffin.com/",
    "description": "This Canadian company creates footwear built for real life—comfortable, well-made, and stylish."
  },
  {
    "slug": "manitobah",
    "name": "Manitobah",
    "type": "Brand",
    "category": "Shoes",
    "url": "https://www.manitobah.ca/",
    "description": "Manitobah is a proudly Indigenous-owned Canadian brand that brings cultural craftsmanship front and centre in modern footwear."
  },
  {
    "slug": "sash-bustle",
    "name": "Sash Bustle",
    "type": "Brand",
    "category": "Wedding",
    "url": "https://sashandbustle.com/",
    "description": "Tucked in the heart of Toronto, Sash + Bustle is a sister-owned bridal boutique that brings heart, style, and a whole lot of love to wedding dress shopping."
  },
  {
    "slug": "blush-bowties",
    "name": "Blush Bowties",
    "type": "Brand",
    "category": "Wedding",
    "url": "https://www.blushandbowties.ca/",
    "description": "Blush + Bowties is a boutique wedding planning brand based in Toronto, known for its fresh, stylish, and heartfelt approach to modern celebrations."
  },
  {
    "slug": "popeyes-supplements",
    "name": "Popeyes Supplements",
    "type": "Brand",
    "category": "Health",
    "url": "https://www.popeyescanada.com/",
    "description": "With expert advice and top-quality brands, Popeye’s produces fuelling your body simple, effective, and proudly Canadian."
  },
  {
    "slug": "melanie-auld",
    "name": "Melanie Auld",
    "type": "Brand",
    "category": "Jewellery",
    "url": "https://www.melanieauld.com/",
    "description": "Based in Vancouver, this Canadian brand shines with elegant layering pieces, custom birthstone charms, and modern designs made to celebrate life’s special moments."
  },
  {
    "slug": "anne-marie-chagnon",
    "name": "Anne Marie Chagnon",
    "type": "Brand",
    "category": "Jewellery",
    "url": "https://annemariechagnon.com/en",
    "description": "Proudly Canadian, this jeweller crafts pieces that celebrate quality materials and thoughtful design."
  },
  {
    "slug": "jenny-bird",
    "name": "Jenny Bird",
    "type": "Brand",
    "category": "Jewellery",
    "url": "https://jenny-bird.ca/",
    "description": "Favoured by celebrities and style icons, Jenny Bird’s designs are where contemporary creativity meets Canadian flair."
  },
  {
    "slug": "mr-lube",
    "name": "Mr Lube",
    "type": "Brand",
    "category": "Automotive",
    "url": "https://www.mrlube.com/",
    "description": "With locations all across the country, this proudly Canadian company is celebrated for dependable service, clear pricing, and a real focus on customer care."
  },
  {
    "slug": "namaste",
    "name": "Namaste",
    "type": "Brand",
    "category": "Food",
    "url": "https://namastejewelryca.ca/",
    "description": "This Canadian company brings authentic taste and quality to tables across the country."
  },
  {
    "slug": "stelar-adorn",
    "name": "Stelar Adorn",
    "type": "Brand",
    "category": "Jewellery",
    "url": "https://stellaradorn.com/",
    "description": "A homegrown jewellery brand creating stunning accessories for every occasion."
  },
  {
    "slug": "birch-jewellery",
    "name": "Birch Jewellery",
    "type": "Brand",
    "category": "Jewellery",
    "url": "https://birchjewellery.com/",
    "description": "Proudly made in Canada, each handcrafted piece celebrates simplicity and nature with designs inspired by botanicals, wildlife, and organic textures."
  },
  {
    "slug": "made-you-look",
    "name": "Made You Look",
    "type": "Brand",
    "category": "Jewellery",
    "url": "https://www.madeyoulook.ca/",
    "description": "Made You Look Jewellery is a vibrant Toronto gem showcasing handcrafted pieces from over 20 independent Canadian designers."
  },
  {
    "slug": "manguare",
    "name": "Manguare",
    "type": "Brand",
    "category": "Jewellery",
    "url": "https://www.manguare.ca/",
    "description": "Manguaré is a proudly Canadian company working alongside Indigenous artisans in the Amazon to create beautiful, handcrafted jewellery and accessories."
  },
  {
    "slug": "supplement-king",
    "name": "Supplement King",
    "type": "Brand",
    "category": "Health",
    "url": "https://www.supplementking.ca/",
    "description": "Whether you’re aiming to build muscle, boost your endurance, or just feel your best, this proudly Canadian retailer offers trusted products and expert advice you can count on."
  },
  {
    "slug": "global-pet-foods",
    "name": "Global Pet Foods",
    "type": "Brand",
    "category": "Pets",
    "url": "https://globalpetfoods.com/",
    "description": "This proudly Canadian company crafts pet products with safety, quality, and animal wellbeing in mind."
  },
  {
    "slug": "house-sitters-canada",
    "name": "House Sitters Canada",
    "type": "Brand",
    "category": "Services",
    "url": "https://www.housesitterscanada.com/",
    "description": "Proudly Canadian, this provider offers services focused on quality and customer satisfaction."
  },
  {
    "slug": "country-style",
    "name": "Country Style",
    "type": "Brand",
    "category": "Coffee",
    "url": "https://countrystyle.com/",
    "description": "From donuts to hearty breakfasts, or just your daily cup, Country Style is always brewing something good—right here at home in Canada."
  },
  {
    "slug": "pizza-73",
    "name": "Pizza 73",
    "type": "Brand",
    "category": "Restaurant",
    "url": "https://www.pizza73.com/",
    "description": "Known for its wide variety of toppings, crust choices, and great value deals, Pizza 73 features more than just delicious flavour—it brings convenience with a distinctly Canadian touch."
  },
  {
    "slug": "red-swan-pizza",
    "name": "Red Swan Pizza",
    "type": "Brand",
    "category": "Restaurant",
    "url": "https://redswanpizza.ca/",
    "description": "A Canadian dining favourite known for fresh ingredients, welcoming atmosphere, and consistent quality."
  },
  {
    "slug": "241-pizza",
    "name": "241 Pizza",
    "type": "Brand",
    "category": "Restaurant",
    "url": "https://www.241pizza.com/",
    "description": "Famous for its classic “2-for-1” deals, this proudly Canadian brand produces it easy to feed a crowd without stretching your budget."
  },
  {
    "slug": "double-double-pizza",
    "name": "Double Double Pizza",
    "type": "Brand",
    "category": "Restaurant",
    "url": "https://www.doubledouble.ca/",
    "description": "A beloved Canadian restaurant chain serving quality food and memorable dining experiences across the country."
  },
  {
    "slug": "copper-branch",
    "name": "Copper Branch",
    "type": "Brand",
    "category": "Restaurant",
    "url": "https://eatcopperbranch.com/",
    "description": "Canadian-owned and operated, this restaurant chain brings authentic flavours and friendly service to communities nationwide."
  },
  {
    "slug": "pita-pit",
    "name": "Pita Pit",
    "type": "Brand",
    "category": "Restaurant",
    "url": "https://pitapit.ca/",
    "description": "Proudly Canadian since 1995, Pita Pit is all about fresh, made-to-order pitas packed with bold flavour and wholesome ingredients."
  },
  {
    "slug": "new-york-fries",
    "name": "New York Fries",
    "type": "Brand",
    "category": "Restaurant",
    "url": "https://www.newyorkfries.com/",
    "description": "A beloved Canadian restaurant chain serving quality food and memorable dining experiences across the country."
  },
  {
    "slug": "wok-box",
    "name": "Wok Box",
    "type": "Brand",
    "category": "Restaurant",
    "url": "https://wokbox.ca/",
    "description": "Wok Box serves up sizzling stir-fries, noodles, and Asian-inspired dishes—all brought to you by a proudly Canadian company."
  },
  {
    "slug": "rickys-all-day-grill",
    "name": "Rickys All Day Grill",
    "type": "Brand",
    "category": "Restaurant",
    "url": "https://rickysrestaurants.ca/",
    "description": "Ricky’s All Day Grill is a true Canadian favourite where you can grab a hearty breakfast, a satisfying lunch, or a comforting dinner any time of day."
  },
  {
    "slug": "milestones",
    "name": "Milestones",
    "type": "Brand",
    "category": "Restaurant",
    "url": "https://milestonesrestaurants.com/",
    "description": "Canadian-owned and operated, this restaurant chain brings authentic flavours and friendly service to communities nationwide."
  },
  {
    "slug": "kelseys",
    "name": "Kelseys",
    "type": "Brand",
    "category": "Restaurant",
    "url": "https://www.kelseys.ca/",
    "description": "A beloved Canadian restaurant chain serving quality food and memorable dining experiences across the country."
  },
  {
    "slug": "cactus-club",
    "name": "Cactus Club",
    "type": "Brand",
    "category": "Restaurant",
    "url": "https://www.cactusclubcafe.com/",
    "description": "With its roots in Vancouver and locations across the country, Cactus Club serves up West Coast flair with a distinctly Canadian touch."
  },
  {
    "slug": "mr-sub",
    "name": "Mr Sub",
    "type": "Brand",
    "category": "Restaurant",
    "url": "https://mrsub.ca/",
    "description": "This homegrown Canadian restaurant has been serving delicious meals and building community connections for years."
  },
  {
    "slug": "fat-burger",
    "name": "Fat Burger",
    "type": "Brand",
    "category": "Restaurant",
    "url": "https://www.fatburgercanada.com/",
    "description": "A Canadian dining favourite known for fresh ingredients, welcoming atmosphere, and consistent quality."
  },
  {
    "slug": "thai-express",
    "name": "Thai Express",
    "type": "Brand",
    "category": "Restaurant",
    "url": "https://thaiexpress.ca/",
    "description": "A beloved Canadian restaurant chain serving quality food and memorable dining experiences across the country."
  },
  {
    "slug": "opa-of-greece",
    "name": "Opa Of Greece",
    "type": "Brand",
    "category": "Restaurant",
    "url": "https://opaofgreece.com/",
    "description": "A beloved Canadian restaurant chain serving quality food and memorable dining experiences across the country."
  },
  {
    "slug": "manchu-wok",
    "name": "Manchu Wok",
    "type": "Brand",
    "category": "Restaurant",
    "url": "https://manchuwok.com/",
    "description": "This homegrown Canadian restaurant has been serving delicious meals and building community connections for years."
  },
  {
    "slug": "oeb-breakfast",
    "name": "Oeb Breakfast",
    "type": "Brand",
    "category": "Restaurant",
    "url": "https://eatoeb.com/",
    "description": "This homegrown Canadian restaurant has been serving delicious meals and building community connections for years."
  },
  {
    "slug": "monogram-coffee",
    "name": "Monogram Coffee",
    "type": "Brand",
    "category": "Coffee",
    "url": "https://monogramcoffee.com",
    "description": "A Canadian coffee roaster dedicated to fresh beans, expert roasting, and exceptional flavour."
  },
  {
    "slug": "d-spot-dessert-cafe",
    "name": "D Spot Dessert Cafe",
    "type": "Brand",
    "category": "Restaurant",
    "url": "https://dspotdessert.com/",
    "description": "Canadian-owned and operated, this restaurant chain brings authentic flavours and friendly service to communities nationwide."
  },
  {
    "slug": "sobeys",
    "name": "Sobeys",
    "type": "Brand",
    "category": "Grocery",
    "url": "https://www.sobeys.com/en/",
    "description": "Committed to sustainability and supporting Canadian farmers, it’s a grocery store that feels like part of the community."
  },
  {
    "slug": "no-frills",
    "name": "No Frills",
    "type": "Brand",
    "category": "Grocery",
    "url": "https://www.nofrills.ca/",
    "description": "This homegrown grocer delivers value, variety, and friendly service to neighbourhoods across Canada."
  },
  {
    "slug": "safeway",
    "name": "Safeway",
    "type": "Brand",
    "category": "Grocery",
    "url": "https://www.safeway.ca/",
    "description": "A Canadian grocery retailer providing quality products, fresh options, and convenient shopping for communities."
  },
  {
    "slug": "food-basics",
    "name": "Food Basics",
    "type": "Brand",
    "category": "Grocery",
    "url": "https://www.foodbasics.ca/",
    "description": "Food Basics is a favourite grocery chain for Canadians who want great value without sacrificing quality."
  },
  {
    "slug": "real-canadian-superstore",
    "name": "Real Canadian Superstore",
    "type": "Brand",
    "category": "Grocery",
    "url": "https://www.realcanadiansuperstore.ca/",
    "description": "Real Canadian Superstore is your go-to spot for everything—from groceries and household essentials to fashion and more—all in one place."
  },
  {
    "slug": "john-fluevog",
    "name": "John Fluevog",
    "type": "Brand",
    "category": "Shoes",
    "url": "https://www.fluevog.com",
    "description": "John Fluevog is a true Canadian legend in footwear, famous for bold, one-of-a-kind shoes that mix artistry with top-notch craftsmanship."
  },
  {
    "slug": "alberta-boot",
    "name": "Alberta Boot",
    "type": "Brand",
    "category": "Shoes",
    "url": "https://www.albertaboot.ca",
    "description": "A homegrown footwear label committed to crafting shoes you'll love to wear."
  },
  {
    "slug": "matt-nat",
    "name": "Matt Nat",
    "type": "Brand",
    "category": "Accessories",
    "url": "https://mattandnat.com/",
    "description": "Matt & Nat (short forMaterial and Nature) is a proudly Canadian company redefining fashion with sustainability at its core."
  },
  {
    "slug": "canada-west-boots",
    "name": "Canada West Boots",
    "type": "Brand",
    "category": "Shoes",
    "url": "https://www.canadawestboots.com/",
    "description": "Proudly Canadian, this brand designs shoes that deliver on quality, fit, and lasting wear."
  },
  {
    "slug": "boulet",
    "name": "Boulet",
    "type": "Brand",
    "category": "Shoes",
    "url": "https://bouletboots.com/",
    "description": "Established in Saint-Tite, Quebec, Boulet is Canada’s original cowboy boot maker, handcrafting high-quality Western footwear since 1933."
  },
  {
    "slug": "hettas",
    "name": "Hettas",
    "type": "Brand",
    "category": "Shoes",
    "url": "https://hettas.ca/",
    "description": "This Canadian company creates footwear built for real life—comfortable, well-made, and stylish."
  },
  {
    "slug": "native",
    "name": "Native",
    "type": "Brand",
    "category": "Shoes",
    "url": "https://www.nativeshoes.com/ca",
    "description": "A homegrown footwear label committed to crafting shoes you'll love to wear."
  },
  {
    "slug": "tatra",
    "name": "Tatra",
    "type": "Brand",
    "category": "Shoes",
    "url": "https://www.tatra.ca/",
    "description": "Located in Dunnville, Ontario, Tatra specializes in CSA-approved steel toe boots designed for industries like construction and manufacturing."
  },
  {
    "slug": "wolf-circus",
    "name": "Wolf Circus",
    "type": "Brand",
    "category": "Jewellery",
    "url": "https://www.wolfcircus.com/",
    "description": "Wolf Circus is a Vancouver-based jewellery brand known for its handmade pieces crafted from recycled metals and cultured pearls."
  },
  {
    "slug": "omi-woods",
    "name": "Omi Woods",
    "type": "Brand",
    "category": "Jewellery",
    "url": "https://omiwoods.com/",
    "description": "This Canadian brand designs jewellery that balances timeless elegance with modern sensibility."
  },
  {
    "slug": "emily-hartwell",
    "name": "Emily Hartwell",
    "type": "Brand",
    "category": "Jewellery",
    "url": "https://emilyhartwell.com/",
    "description": "A homegrown jewellery brand creating stunning accessories for every occasion."
  },
  {
    "slug": "sapling-flint",
    "name": "Sapling Flint",
    "type": "Brand",
    "category": "Jewellery",
    "url": "https://www.saplingandflint.ca/",
    "description": "Sapling & Flint is an Indigenous-owned jewellery brand crafting beautiful, meaningful pieces on Six Nations Territory in Canada."
  },
  {
    "slug": "mejuri",
    "name": "Mejuri",
    "type": "Brand",
    "category": "Jewellery",
    "url": "https://mejuri.com/",
    "description": "Mejuri is a Canadian-born jewellery label reshaping how we wear fine jewellery—making it accessible, modern, and designed to be worn every day."
  },
  {
    "slug": "corey-moranis",
    "name": "Corey Moranis",
    "type": "Brand",
    "category": "Jewellery",
    "url": "https://coreymoranis.com/",
    "description": "Corey Moranis is a Canadian designer celebrated for her playful, sculptural jewellery crafted from hand-tied lucite."
  },
  {
    "slug": "balzacs-coffee-roasters",
    "name": "Balzacs Coffee Roasters",
    "type": "Brand",
    "category": "Coffee",
    "url": "https://balzacs.com",
    "description": "Balzac’s Coffee Roasters is a proudly Canadian, small-batch coffee company that brings a little bit of European café charm right to your cup, all with a warm Canadian twist."
  },
  {
    "slug": "okayok",
    "name": "Okayok",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://okayok.ca/",
    "description": "Canadian-made beauty focusing on performance, purity, and products you can feel good about using."
  },
  {
    "slug": "vasanti",
    "name": "Vasanti",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://vasanticosmetics.ca/",
    "description": "Vasanti is a proudly Canadian beauty brand creating inclusive skincare and makeup designed for all skin tones."
  },
  {
    "slug": "endy",
    "name": "Endy",
    "type": "Brand",
    "category": "Home",
    "url": "https://www.endy.com",
    "description": "A Canadian home goods brand creating quality products that bring style and function to your space."
  },
  {
    "slug": "purdys-chocolatier",
    "name": "Purdys Chocolatier",
    "type": "Brand",
    "category": "Food",
    "url": "https://www.purdys.com",
    "description": "A Canadian food brand crafting quality products with care, flavour, and local ingredients."
  },
  {
    "slug": "frank-and-oak",
    "name": "Frank And Oak",
    "type": "Brand",
    "category": "Clothing",
    "url": "https://www.frankandoak.com/",
    "description": "A Canadian fashion brand offering quality clothing designed for style, comfort, and Canadian living."
  },
  {
    "slug": "mob-beauty",
    "name": "Mob Beauty",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://mobbeauty.com",
    "description": "MOB Beauty is a Canadian brand shaking up clean beauty with high-performance, vegan, cruelty-free, and eco-friendly products."
  },
  {
    "slug": "island-enchantments",
    "name": "Island Enchantments",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://islandenchantments.com",
    "description": "A homegrown beauty brand delivering effective, thoughtfully crafted products for modern self-care."
  },
  {
    "slug": "19-99-beauty",
    "name": "19 99 Beauty",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://1999beauty.com/",
    "description": "Canadian-made beauty focusing on performance, purity, and products you can feel good about using."
  },
  {
    "slug": "kits-eyewear",
    "name": "Kits Eyewear",
    "type": "Brand",
    "category": "Eyewear",
    "url": "https://www.kits.ca",
    "description": "Based in Vancouver, British Columbia, KITS Eyewear produces getting stylish, high-quality glasses and contacts not only simple but convenient."
  },
  {
    "slug": "fabricland",
    "name": "Fabricland",
    "type": "Brand",
    "category": "Retail",
    "url": "https://fabricland.ca/",
    "description": "Proudly Canadian, this retail brand delivers value, variety, and accessible shopping experiences."
  },
  {
    "slug": "charm-diamond-centres",
    "name": "Charm Diamond Centres",
    "type": "Brand",
    "category": "Jewellery",
    "url": "https://charmdiamondcentres.com",
    "description": "Charm Diamond Centres is one of Canada’s biggest independent jewellery retailers, known for timeless pieces that mark every milestone."
  },
  {
    "slug": "potion-masters",
    "name": "Potion Masters",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://www.thepotionmasters.com",
    "description": "A Canadian beauty brand committed to clean formulations, quality ingredients, and effective results."
  },
  {
    "slug": "penny-lane-organics",
    "name": "Penny Lane Organics",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://pennylaneorganics.com/",
    "description": "From Ontario, Penny Lane Organics is a Canadian, family-run brand making clean personal care products with love and purpose."
  },
  {
    "slug": "mangata-apothecary",
    "name": "Mangata Apothecary",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://mangataapothecary.ca",
    "description": "Mangata Apothecary is a family-run, female-established brand based in Delta, BC, created by midwife-turned-herbalist Stefanie Henderlin."
  },
  {
    "slug": "lowens-natural-skincare",
    "name": "Lowens Natural Skincare",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://lowens.ca/",
    "description": "What started as a dad’s mission to help his daughter’s sensitive skin has grown into one of Calgary’s most trusted clean skincare companys."
  },
  {
    "slug": "kinkd-beauty",
    "name": "Kinkd Beauty",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://kinkdbeauty.shop/",
    "description": "Founded by Alysha McLoughlin, a licensed stylist with over 8 years of hands-on experience (including work in film), this Canadian small business concentrates on clean, handmade products that actually work."
  },
  {
    "slug": "elate-beauty",
    "name": "Elate Beauty",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://elatebeauty.com/",
    "description": "This proudly Canadian company creates beauty products that combine innovation with conscious ingredients."
  },
  {
    "slug": "reversa",
    "name": "Reversa",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://reversa.ca/",
    "description": "A Canadian beauty brand committed to clean formulations, quality ingredients, and effective results."
  },
  {
    "slug": "ocanada-soapworks",
    "name": "Ocanada Soapworks",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://ocanadasoapworks.com/",
    "description": "A Canadian beauty brand committed to clean formulations, quality ingredients, and effective results."
  },
  {
    "slug": "jouviance",
    "name": "Jouviance",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://en.jouviance.com/",
    "description": "Born in Montreal and created by a Canadian dermatologist, Jouviance delivers powerful yet gentle formulas that tackle aging, hydration, and glow-up goals."
  },
  {
    "slug": "wildcraft",
    "name": "Wildcraft",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://wildcraftcare.ca/",
    "description": "A Canadian beauty brand committed to clean formulations, quality ingredients, and effective results."
  },
  {
    "slug": "annabelle",
    "name": "Annabelle",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://annabelle.com/en",
    "description": "Born in Montreal, this Canadian makeup company brings you vibrant colours, clean formulas, and wallet-friendly prices."
  },
  {
    "slug": "green-beaver",
    "name": "Green Beaver",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://greenbeaver.com/",
    "description": "Made in Canada with organic, plant-based ingredients, this family-run brand crafts everything from toothpaste to sunscreen without the toxins."
  },
  {
    "slug": "indeed-labs",
    "name": "Indeed Labs",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://indeedlabs.com/",
    "description": "Born in Canada, this company delivers science-backed formulas that actually work, with ingredients your skinwants(and none of the stuff it doesn’t)."
  },
  {
    "slug": "saje-natural-wellness",
    "name": "Saje Natural Wellness",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://www.saje.ca/",
    "description": "A homegrown beauty brand delivering effective, thoughtfully crafted products for modern self-care."
  },
  {
    "slug": "harlow-skin-co",
    "name": "Harlow Skin Co",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://harlowskinco.com/",
    "description": "Handcrafted in Vancouver with organic, plant-located ingredients, this small-batch skincare company is all about rituals that feel as good as they look."
  },
  {
    "slug": "buck-naked-soap-company",
    "name": "Buck Naked Soap Company",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://bucknakedsoapcompany.com/",
    "description": "Made in Canada and totally vegan, this brand serves up handcrafted soaps, bath bombs, and skincare with no fillers, no fluff, and zero nasties."
  },
  {
    "slug": "east-coast-glow",
    "name": "East Coast Glow",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://eastcoastglow.ca/",
    "description": "A Canadian beauty brand committed to clean formulations, quality ingredients, and effective results."
  },
  {
    "slug": "bleau",
    "name": "Bleau",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://bleaubeauty.com/",
    "description": "This proudly Canadian company creates beauty products that combine innovation with conscious ingredients."
  },
  {
    "slug": "birch-babe",
    "name": "Birch Babe",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://birchbabe.com/",
    "description": "Canadian-made beauty focusing on performance, purity, and products you can feel good about using."
  },
  {
    "slug": "bareluxe",
    "name": "Bareluxe",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://www.bareluxeskincare.com/",
    "description": "Proudly Canadian and rooted in green beauty values, this brand blends clinical-level ingredients with sustainably sourced botanicals—no compromises, no clutter."
  },
  {
    "slug": "pure-anada",
    "name": "Pure Anada",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://www.pureanada.ca/",
    "description": "Made in Manitoba with ethically sourced, natural ingredients, this Canadian brand makes makeup, skincare, and body care that’s gentle on your skin and kind to the planet."
  },
  {
    "slug": "altitude-sports",
    "name": "Altitude Sports",
    "type": "Brand",
    "category": "Retail",
    "url": "https://www.altitude-sports.com/",
    "description": "Based in Montreal, this Canadian retailer curates top-tier gear and apparel for life in motion—whether you’re hitting the trails, braving the snow, or just layering up for your morning coffee run."
  },
  {
    "slug": "spud-ca",
    "name": "Spud Ca",
    "type": "Brand",
    "category": "Grocery",
    "url": "https://www.spud.ca/index.cfm",
    "description": "Based in Western Canada, this online grocer partners with local farmers and makers to deliver organic produce, clean ingredients, and everyday essentials you can feel great about."
  },
  {
    "slug": "polysleep",
    "name": "Polysleep",
    "type": "Brand",
    "category": "Home",
    "url": "https://polysleep.ca/",
    "description": "This Canadian company designs home essentials with attention to quality, design, and everyday living."
  },
  {
    "slug": "pura-botanicals",
    "name": "Pura Botanicals",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://www.purabotanicals.ca/",
    "description": "Handcrafted in Edmonton, this Canadian skincare brand uses ethically sourced botanicals, aromatherapy, and clean ingredients to create dreamy creams, serums, and masks."
  },
  {
    "slug": "om-organics",
    "name": "Om Organics",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://omskin.com/",
    "description": "Handmade in small batches with organic botanicals and zero fillers, this Canadian company delivers glowing skin with a side of nature."
  },
  {
    "slug": "province-apothecary",
    "name": "Province Apothecary",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://provinceapothecary.com/",
    "description": "Handcrafted in Toronto using wildcrafted Canadian ingredients, this company is all about clean formulas, therapeutic scents, and results you can feel."
  },
  {
    "slug": "veriphy",
    "name": "Veriphy",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://veriphyskincare.com/",
    "description": "Powered by PhytoSpherix®—a Canadian-grown, science-backed form of glycogen—this clean beauty company delivers brightening, hydrating skincare that works."
  },
  {
    "slug": "cocoon-apothecary",
    "name": "Cocoon Apothecary",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://cocoonapothecary.com/",
    "description": "Made in Ontario with ethically sourced botanicals, this Canadian label crafts clean, effective products for every skin type."
  },
  {
    "slug": "air-transat",
    "name": "Air Transat",
    "type": "Brand",
    "category": "Travel",
    "url": "https://www.airtransat.com/",
    "description": "Based in Montreal, Air Transat connects you to sun-soaked beaches and European escapes -with friendly service and great value along the way."
  },
  {
    "slug": "hakim-optical",
    "name": "Hakim Optical",
    "type": "Brand",
    "category": "Eyewear",
    "url": "https://hakimoptical.ca/",
    "description": "Known for stylish frames, quality lenses, and unbeatable value, this homegrown company offers eyewear for every look and budget."
  },
  {
    "slug": "fresh-prep",
    "name": "Fresh Prep",
    "type": "Brand",
    "category": "Meal Delivery",
    "url": "https://www.freshprep.ca/",
    "description": "From Vancouver, they deliver pre-chopped, pre-portioned ingredients right to your door—so you can cook up something delicious in no time."
  },
  {
    "slug": "rona",
    "name": "Rona",
    "type": "Brand",
    "category": "Retail",
    "url": "https://www.rona.ca/en",
    "description": "Proudly Canadian, this go-to hardware and renovation retailer helps homeowners and pros tackle every project—from weekend fixes to full-on builds."
  },
  {
    "slug": "canalta-hotels",
    "name": "Canalta Hotels",
    "type": "Brand",
    "category": "Hotels",
    "url": "https://canaltahotels.com/",
    "description": "Family-owned and deeply rooted in prairie values, this Canadian hotel chain provides clean, cozy stays with genuine hospitality—whether you're on a road trip, a work trip, or anything in between."
  },
  {
    "slug": "sandman-hotels",
    "name": "Sandman Hotels",
    "type": "Brand",
    "category": "Hotels",
    "url": "https://www.sandmanhotels.com/",
    "description": "Proudly Canadian and family-run, this hotel chain offers stylish stays from coast to coast—whether you're traveling for work, play, or something in between."
  },
  {
    "slug": "ben-florentine",
    "name": "Ben Florentine",
    "type": "Brand",
    "category": "Restaurant",
    "url": "https://benetflorentine.com/en/",
    "description": "Canadian-owned and operated, this restaurant chain brings authentic flavours and friendly service to communities nationwide."
  },
  {
    "slug": "sunset-grill",
    "name": "Sunset Grill",
    "type": "Brand",
    "category": "Restaurant",
    "url": "https://sunsetgrill.ca/",
    "description": "Established in Ontario and growing coast to coast, this Canadian favourite keeps it classic with real ingredients, sizzling grills, and no shortcuts."
  },
  {
    "slug": "pur-simple",
    "name": "Pur Simple",
    "type": "Brand",
    "category": "Restaurant",
    "url": "https://pursimple.com/",
    "description": "This homegrown Canadian restaurant has been serving delicious meals and building community connections for years."
  },
  {
    "slug": "first-choice-haircutters",
    "name": "First Choice Haircutters",
    "type": "Brand",
    "category": "Haircare",
    "url": "https://www.firstchoice.com/",
    "description": "With salons across Canada, this trusted label delivers quality cuts, colours, and styles for the whole family—no appointments needed."
  },
  {
    "slug": "chatters-hair-salon",
    "name": "Chatters Hair Salon",
    "type": "Brand",
    "category": "Haircare",
    "url": "https://chatters.ca/",
    "description": "A homegrown haircare brand committed to formulations that work."
  },
  {
    "slug": "bentley",
    "name": "Bentley",
    "type": "Brand",
    "category": "Haircare",
    "url": "https://www.shopbentley.com/",
    "description": "A homegrown haircare brand committed to formulations that work."
  },
  {
    "slug": "ag-hair",
    "name": "Ag Hair",
    "type": "Brand",
    "category": "Haircare",
    "url": "https://ag.care/",
    "description": "A Canadian haircare brand formulating effective products with quality ingredients for beautiful, healthy hair."
  },
  {
    "slug": "smokes-poutinerie",
    "name": "Smokes Poutinerie",
    "type": "Brand",
    "category": "Restaurant",
    "url": "https://smokespoutinerie.com/",
    "description": "Born in Canada and now spreading the poutine gospel worldwide, Smoke’s serves up fast, fun, and totally over-the-top meals that are as unapologetically Canadian as it gets."
  },
  {
    "slug": "poutineville",
    "name": "Poutineville",
    "type": "Brand",
    "category": "Restaurant",
    "url": "https://poutineville.com/en/",
    "description": "Born in Montreal, this Canadian favourite lets you build your own from the fries up—with endless combos of cheese, gravy, and gourmet toppings."
  },
  {
    "slug": "toys-r-us",
    "name": "Toys R Us",
    "type": "Brand",
    "category": "Retail",
    "url": "https://www.toysrus.ca/",
    "description": "Whether you're shopping for the latest toys, games, or the perfect gift, this Canadian favourite has it all."
  },
  {
    "slug": "beluga-baby",
    "name": "Beluga Baby",
    "type": "Brand",
    "category": "Baby",
    "url": "https://belugababy.com/",
    "description": "Canadian-made baby products delivering on safety, comfort, and peace of mind."
  },
  {
    "slug": "oneka",
    "name": "Oneka",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://www.onekaelements.com/",
    "description": "Canadian-made beauty focusing on performance, purity, and products you can feel good about using."
  },
  {
    "slug": "skinfix",
    "name": "Skinfix",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://ca.skinfix.com/",
    "description": "Born in Canada and backed by dermatologists, this award-winning label creates science-powered formulas that treat everything from sensitive skin to chronic conditions—without compromising on safety. With barrier-loving ingredients and proven performance, Skinfix is trusted care for real skin, every day."
  },
  {
    "slug": "germain-hotels",
    "name": "Germain Hotels",
    "type": "Brand",
    "category": "Hotels",
    "url": "https://www.germainhotels.com/en/hotels",
    "description": "Germain Hotels offers a uniquely Canadian stay, blending modern luxury with warm, personalized service."
  },
  {
    "slug": "n49-eyewear",
    "name": "N49 Eyewear",
    "type": "Brand",
    "category": "Eyewear",
    "url": "https://n49-eyewear.ca/",
    "description": "This proudly Canadian company creates glasses and sunglasses with attention to design and craftsmanship."
  },
  {
    "slug": "awesoap",
    "name": "Awesoap",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://www.awesoapco.com/",
    "description": "A Canadian beauty brand committed to clean formulations, quality ingredients, and effective results."
  },
  {
    "slug": "fat-bastard-burrito",
    "name": "Fat Bastard Burrito",
    "type": "Brand",
    "category": "Restaurant",
    "url": "https://www.fatbastardburrito.ca/",
    "description": "Canadian-owned and operated, this restaurant chain brings authentic flavours and friendly service to communities nationwide."
  },
  {
    "slug": "instameals",
    "name": "Instameals",
    "type": "Brand",
    "category": "Meal Delivery",
    "url": "https://instameals.com/",
    "description": "This homegrown service delivers quality meal kits focused on convenience, freshness, and great taste."
  },
  {
    "slug": "petland",
    "name": "Petland",
    "type": "Brand",
    "category": "Pets",
    "url": "https://www.petland.ca/",
    "description": "A Canadian pet brand creating quality products that show how much you care for your furry family members."
  },
  {
    "slug": "coffee-time",
    "name": "Coffee Time",
    "type": "Brand",
    "category": "Coffee",
    "url": "https://coffeetime.com/",
    "description": "A homegrown coffee brand committed to sourcing and roasting beans that deliver outstanding taste."
  },
  {
    "slug": "the-keg",
    "name": "The Keg",
    "type": "Brand",
    "category": "Restaurant",
    "url": "https://thekeg.com/",
    "description": "A beloved Canadian restaurant chain serving quality food and memorable dining experiences across the country."
  },
  {
    "slug": "joey-restaurants",
    "name": "Joey Restaurants",
    "type": "Brand",
    "category": "Restaurant",
    "url": "https://joeyrestaurants.com/",
    "description": "Born in Canada and loved coast to coast, JOEY is where bold flavours meet stylish spaces—perfect for date nights, business lunches, or cocktails with friends."
  },
  {
    "slug": "big-smoke-burger",
    "name": "Big Smoke Burger",
    "type": "Brand",
    "category": "Restaurant",
    "url": "https://bigsmokeburger.com/",
    "description": "Born in Toronto, this Canadian favourite serves up fresh, flame-grilled burgers made with high-quality beef, house-made sauces, and toppings that mean business."
  },
  {
    "slug": "blenz-coffee",
    "name": "Blenz Coffee",
    "type": "Brand",
    "category": "Coffee",
    "url": "https://blenz.com/",
    "description": "Established in British Columbia, this Canadian coffeehouse is known for expertly crafted drinks, real ingredients, and warm, welcoming vibes."
  },
  {
    "slug": "kicking-horse-coffee",
    "name": "Kicking Horse Coffee",
    "type": "Brand",
    "category": "Coffee",
    "url": "https://kickinghorsecoffee.ca/",
    "description": "This proudly Canadian company roasts premium coffee beans with care and precision."
  },
  {
    "slug": "bluenotes",
    "name": "Bluenotes",
    "type": "Brand",
    "category": "Clothing",
    "url": "https://blnts.com/",
    "description": "Recognized for its denim roots, this homegrown brand delivers affordable, comfortable styles that keep up with your everyday—whether you're chilling, working, or heading out."
  },
  {
    "slug": "bootlegger",
    "name": "Bootlegger",
    "type": "Brand",
    "category": "Clothing",
    "url": "https://www.bootlegger.com/",
    "description": "Proudly Canadian from 1971, this classic brand blends trusted quality with modern trends—offering everything from laid-back loungewear to elevated essentials."
  },
  {
    "slug": "suzy-shier",
    "name": "Suzy Shier",
    "type": "Brand",
    "category": "Clothing",
    "url": "https://suzyshier.com/",
    "description": "Proudly Canadian, this brand creates clothing that reflects modern style while honouring quality craftsmanship."
  },
  {
    "slug": "la-vie-en-rose",
    "name": "La Vie En Rose",
    "type": "Brand",
    "category": "Intimates",
    "url": "https://www.lavieenrose.com/",
    "description": "Proudly Canadian, this beloved label blends elegance with everyday ease—offering pieces that range from romantic to practical, always with a perfect fit."
  },
  {
    "slug": "anne-louise-jewellery",
    "name": "Anne Louise Jewellery",
    "type": "Brand",
    "category": "Jewellery",
    "url": "https://annlouise.ca/",
    "description": "Proudly Canadian, this jeweller crafts pieces that celebrate quality materials and thoughtful design."
  },
  {
    "slug": "below-the-belt",
    "name": "Below The Belt",
    "type": "Brand",
    "category": "Clothing",
    "url": "https://www.belowthebelt.com/",
    "description": "This Canadian retailer provides versatile wardrobe essentials that balance fashion-forward design with everyday wearability."
  },
  {
    "slug": "ben-moss",
    "name": "Ben Moss",
    "type": "Brand",
    "category": "Jewellery",
    "url": "https://www.benmoss.com/",
    "description": "Known for quality craftsmanship, exceptional service, and stunning designs, this iconic Canadian jeweller offers everything from engagement rings to everyday elegance."
  },
  {
    "slug": "bikini-village",
    "name": "Bikini Village",
    "type": "Brand",
    "category": "Clothing",
    "url": "https://www.bikinivillage.com/",
    "description": "Bikini Village brings vacation ready fashion to Canadians with a curated selection of swimwear, resort wear, and accessories from top global brands."
  },
  {
    "slug": "boathouse",
    "name": "Boathouse",
    "type": "Brand",
    "category": "Clothing",
    "url": "https://boathousestores.com/",
    "description": "Proudly Canadian, this go-to retailer curates the freshest gear in fashion, footwear, and accessories from top lifestyle and skate companys."
  },
  {
    "slug": "bourbon-st-grill",
    "name": "Bourbon St Grill",
    "type": "Brand",
    "category": "Restaurant",
    "url": "https://bourbonstdixie.ca/",
    "description": "Known for its sizzling grilled meats, savoury sides, and signature bourbon sauce, this Canadian spot delivers Southern-inspired comfort food with every bite."
  },
  {
    "slug": "denim-smith",
    "name": "Denim Smith",
    "type": "Brand",
    "category": "Clothing",
    "url": "https://denimandsmith.com/",
    "description": "Proudly Canadian, this barbershop brand is recognized for its sharp cuts, clean fades, and beard care essentials—all delivered in a sleek, welcoming space."
  },
  {
    "slug": "kernels",
    "name": "Kernels",
    "type": "Brand",
    "category": "Snacks",
    "url": "https://www.kernelspopcorn.com/",
    "description": "A Canadian snack brand creating delicious, quality treats made with care and better ingredients."
  },
  {
    "slug": "jugo-juice",
    "name": "Jugo Juice",
    "type": "Brand",
    "category": "Restaurant",
    "url": "https://jugojuice.com/",
    "description": "This homegrown Canadian restaurant has been serving delicious meals and building community connections for years."
  },
  {
    "slug": "dynamite-clothing",
    "name": "Dynamite Clothing",
    "type": "Brand",
    "category": "Clothing",
    "url": "https://www.dynamiteclothing.com/ca/",
    "description": "Proudly Canadian, this brand blends trend-driven pieces with everyday staples—from sleek blazers and statement dresses to elevated basics and denim."
  },
  {
    "slug": "jimmy-the-greek",
    "name": "Jimmy The Greek",
    "type": "Brand",
    "category": "Restaurant",
    "url": "https://jimmythegreek.com/",
    "description": "This homegrown Canadian restaurant has been serving delicious meals and building community connections for years."
  },
  {
    "slug": "carbonaut",
    "name": "Carbonaut",
    "type": "Brand",
    "category": "Keto",
    "url": "https://carbonaut.ca/",
    "description": "Proudly Canadian, this bakery label crafts soft, delicious bread, bagels, and buns that fit perfectly into keto and low-carb lifestyles."
  },
  {
    "slug": "fatso",
    "name": "Fatso",
    "type": "Brand",
    "category": "Keto",
    "url": "https://eatfatso.com/",
    "description": "This proudly Canadian company crafts keto-friendly foods focused on clean ingredients and great taste."
  },
  {
    "slug": "mucho-burrito",
    "name": "Mucho Burrito",
    "type": "Brand",
    "category": "Restaurant",
    "url": "https://muchoburrito.com/",
    "description": "Proudly Canadian, this fast-casual spot delivers customizable burritos, bowls, tacos, and salads that are as satisfying as they are delicious."
  },
  {
    "slug": "yogen-fruz",
    "name": "Yogen Fruz",
    "type": "Brand",
    "category": "Restaurant",
    "url": "https://yogenfruz.com/",
    "description": "This homegrown Canadian restaurant has been serving delicious meals and building community connections for years."
  },
  {
    "slug": "chachis",
    "name": "Chachis",
    "type": "Brand",
    "category": "Restaurant",
    "url": "http://www.chachis.ca/",
    "description": "Canadian-owned and operated, this restaurant chain brings authentic flavours and friendly service to communities nationwide."
  },
  {
    "slug": "rw-co",
    "name": "Rw Co",
    "type": "Brand",
    "category": "Clothing",
    "url": "https://www.rw-co.com/",
    "description": "A homegrown fashion label delivering on-trend pieces that work for real Canadian lifestyles."
  },
  {
    "slug": "danier",
    "name": "Danier",
    "type": "Brand",
    "category": "Clothing",
    "url": "https://danier.com/",
    "description": "Known for its upscale leather jackets, bags, and accessories, this proudly Canadian brand delivers timeless staples and bold looks that last."
  },
  {
    "slug": "tip-top-tailors",
    "name": "Tip Top Tailors",
    "type": "Brand",
    "category": "Clothing",
    "url": "https://www.tiptop.ca/",
    "description": "Proudly Canadian, this brand creates clothing that reflects modern style while honouring quality craftsmanship."
  },
  {
    "slug": "buff-bison",
    "name": "Buff Bison",
    "type": "Brand",
    "category": "Snacks",
    "url": "https://www.buff.ca/",
    "description": "Canadian-made snacks focusing on flavour, quality ingredients, and feel-good indulgence."
  },
  {
    "slug": "pur-gum",
    "name": "Pur Gum",
    "type": "Brand",
    "category": "Snacks",
    "url": "https://thepurcompany.com/",
    "description": "A Canadian snack brand creating delicious, quality treats made with care and better ingredients."
  },
  {
    "slug": "knotty",
    "name": "Knotty",
    "type": "Brand",
    "category": "Food",
    "url": "https://www.shopknotty.ca/",
    "description": "This Canadian company brings authentic taste and quality to tables across the country."
  },
  {
    "slug": "edo-japan",
    "name": "Edo Japan",
    "type": "Brand",
    "category": "Restaurant",
    "url": "https://www.edojapan.com/",
    "description": "A Canadian dining favourite known for fresh ingredients, welcoming atmosphere, and consistent quality."
  },
  {
    "slug": "inspired-go",
    "name": "Inspired Go",
    "type": "Brand",
    "category": "Snacks",
    "url": "https://inspiredgo.ca/",
    "description": "This Canadian company makes healthy eating simple and convenient with crisp salads, hearty bowls, and vibrant breakfasts ready whenever you are."
  },
  {
    "slug": "thrive-protein",
    "name": "Thrive Protein",
    "type": "Brand",
    "category": "Health",
    "url": "https://www.thriveprotein.ca/",
    "description": "A homegrown health brand dedicated to supporting your wellness journey with effective formulations."
  },
  {
    "slug": "canadian-protein",
    "name": "Canadian Protein",
    "type": "Brand",
    "category": "Health",
    "url": "https://canadianprotein.com/",
    "description": "Canadian Protein is one of Canada’s leading online sources for high-well-crafted, affordable health and fitness supplements."
  },
  {
    "slug": "plain-protein",
    "name": "Plain Protein",
    "type": "Brand",
    "category": "Health",
    "url": "https://www.plainnutrition.ca/",
    "description": "If you’re after effective supplements without the extras, this Canadian company produces it easy to fuel your goals without the fuss."
  },
  {
    "slug": "pela-case",
    "name": "Pela Case",
    "type": "Brand",
    "category": "Tech",
    "url": "https://pelacase.ca/",
    "description": "Canadian-developed technology offering innovation, reliability, and smart design."
  },
  {
    "slug": "nupasta",
    "name": "Nupasta",
    "type": "Brand",
    "category": "Keto",
    "url": "https://www.nupasta.ca/",
    "description": "nuPasta is a low-carb, gluten-free pasta made from konjac root that features a lighter, healthier twist on traditional pasta."
  },
  {
    "slug": "koodo-mobile",
    "name": "Koodo Mobile",
    "type": "Brand",
    "category": "Telecom",
    "url": "https://www.koodomobile.com/",
    "description": "A Canadian telecommunications provider offering reliable connectivity and customer service across the country."
  },
  {
    "slug": "tbooth-wireless",
    "name": "Tbooth Wireless",
    "type": "Brand",
    "category": "Telecom",
    "url": "https://tboothwireless.ca/",
    "description": "Proudly Canadian, this provider offers wireless, internet, and communication services built for Canadian needs."
  },
  {
    "slug": "bell-mobility",
    "name": "Bell Mobility",
    "type": "Brand",
    "category": "Telecom",
    "url": "https://www.bell.ca/",
    "description": "A Canadian telecommunications provider offering reliable connectivity and customer service across the country."
  },
  {
    "slug": "hot-mamas",
    "name": "Hot Mamas",
    "type": "Brand",
    "category": "Restaurant",
    "url": "https://www.hotmamas.ca/",
    "description": "Hot Mama’s is a Canadian, family-run company celebrated for turning up the flavour with bold, Caribbean-inspired hot sauces, marinades, and condiments."
  },
  {
    "slug": "freedom-mobile",
    "name": "Freedom Mobile",
    "type": "Brand",
    "category": "Telecom",
    "url": "https://www.freedommobile.ca/en-CA",
    "description": "Proudly Canadian, this provider offers wireless, internet, and communication services built for Canadian needs."
  },
  {
    "slug": "the-rec-room",
    "name": "The Rec Room",
    "type": "Brand",
    "category": "Entertainment",
    "url": "https://www.therecroom.com/",
    "description": "A Canadian entertainment company providing quality experiences, memorable moments, and cultural connections."
  },
  {
    "slug": "undz",
    "name": "Undz",
    "type": "Brand",
    "category": "Intimates",
    "url": "https://undz.ca/",
    "description": "Based in Montreal, this Canadian company brings personality to the basics with playful patterns and premium fabrics."
  },
  {
    "slug": "saxx",
    "name": "Saxx",
    "type": "Brand",
    "category": "Intimates",
    "url": "https://www.saxxunderwear.ca/",
    "description": "A Canadian intimates brand designing comfortable, body-positive pieces for every shape and style."
  },
  {
    "slug": "structube",
    "name": "Structube",
    "type": "Brand",
    "category": "Home",
    "url": "https://www.structube.com/",
    "description": "Structube is a Canadian furniture store where you can find modern, good-looking pieces at prices that make sense."
  },
  {
    "slug": "elte",
    "name": "Elte",
    "type": "Brand",
    "category": "Home",
    "url": "https://www.elte.com/",
    "description": "Elte is a family-owned Canadian store known for carefully made furniture, rugs, lighting, and décor."
  },
  {
    "slug": "urban-barn",
    "name": "Urban Barn",
    "type": "Brand",
    "category": "Home",
    "url": "https://www.urbanbarn.com/",
    "description": "A homegrown home brand committed to making your space more beautiful and functional."
  },
  {
    "slug": "bonlook",
    "name": "Bonlook",
    "type": "Brand",
    "category": "Eyewear",
    "url": "https://www.bonlook.com/",
    "description": "A Canadian eyewear brand designing quality frames that combine style, durability, and optical excellence."
  },
  {
    "slug": "sundog-eyewear",
    "name": "Sundog Eyewear",
    "type": "Brand",
    "category": "Eyewear",
    "url": "https://sundogeyewear.ca/",
    "description": "Canadian-designed eyewear focusing on quality materials, great fit, and timeless style."
  },
  {
    "slug": "bolero-eyewear",
    "name": "Bolero Eyewear",
    "type": "Brand",
    "category": "Eyewear",
    "url": "https://boleroeyewear.ca/",
    "description": "This proudly Canadian company creates glasses and sunglasses with attention to design and craftsmanship."
  },
  {
    "slug": "wyld-skincare",
    "name": "Wyld Skincare",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://www.wyldskincare.com/",
    "description": "A Canadian beauty brand committed to clean formulations, quality ingredients, and effective results."
  },
  {
    "slug": "bkind",
    "name": "Bkind",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://bkind.com/",
    "description": "BKIND is a Montreal-based skincare company creating natural, vegan, and cruelty-free products that are as effective as they are eco-conscious."
  },
  {
    "slug": "attitude",
    "name": "Attitude",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://ca.attitudeliving.com/",
    "description": "ATTITUDE is a Canadian label offering eco-friendly personal care, cleaning, and baby products made with worry-free ingredients."
  },
  {
    "slug": "everist",
    "name": "Everist",
    "type": "Brand",
    "category": "Haircare",
    "url": "https://helloeverist.com/",
    "description": "Everist is a Canadian label shaking up hair and body care with waterless, concentrated formulas that come in eco-friendly packaging."
  },
  {
    "slug": "designme",
    "name": "Designme",
    "type": "Brand",
    "category": "Haircare",
    "url": "https://designmehair.com/",
    "description": "DESIGNME is a Canadian haircare label known for its fun, effective products that blend professional performance with clean, cruelty-free ingredients."
  },
  {
    "slug": "mela-kera",
    "name": "Mela Kera",
    "type": "Brand",
    "category": "Haircare",
    "url": "https://melaandkera.com/",
    "description": "Canadian-made haircare focused on performance, clean ingredients, and hair health."
  },
  {
    "slug": "allmax-nutrition",
    "name": "Allmax Nutrition",
    "type": "Brand",
    "category": "Health",
    "url": "https://allmaxnutrition.com/",
    "description": "ALLMAX Nutrition is a trusted Canadian brand offering high-performance supplements for athletes, bodybuilders, and fitness enthusiasts."
  },
  {
    "slug": "kaizen-naturals",
    "name": "Kaizen Naturals",
    "type": "Brand",
    "category": "Health",
    "url": "https://www.kaizennaturals.com/",
    "description": "A Canadian health brand committed to quality supplements, natural ingredients, and wellness support."
  },
  {
    "slug": "leanfit",
    "name": "Leanfit",
    "type": "Brand",
    "category": "Health",
    "url": "https://leanfit.ca/",
    "description": "This Canadian brand makes high-quality protein powders—from whey and plant-based to collagen—using clean, functional ingredients you can feel good about."
  },
  {
    "slug": "biosteel",
    "name": "Biosteel",
    "type": "Brand",
    "category": "Health",
    "url": "https://biosteel.ca/",
    "description": "BioSteel is a Canadian brand delivering clean, effective hydration and sports nutrition products trusted by athletes and active individuals."
  },
  {
    "slug": "huha",
    "name": "Huha",
    "type": "Brand",
    "category": "Intimates",
    "url": "https://hu-ha.com/",
    "description": "Huha is a Canadian company redefining intimates with underwear made from breathable, eco-friendly fabrics infused with soothing zinc oxide."
  },
  {
    "slug": "aleppo-savon",
    "name": "Aleppo Savon",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://alepposavon.ca/",
    "description": "A Canadian beauty brand committed to clean formulations, quality ingredients, and effective results."
  },
  {
    "slug": "mutant",
    "name": "Mutant",
    "type": "Brand",
    "category": "Health",
    "url": "https://mutantnation.ca/",
    "description": "Known for their no-nonsense approach and bold attitude, MUTANT features high-calorie mass gainers, advanced whey blends, and powerful pre-workouts that deliver real results."
  },
  {
    "slug": "birks",
    "name": "Birks",
    "type": "Brand",
    "category": "Jewellery",
    "url": "https://www.maisonbirks.com/",
    "description": "A homegrown jewellery brand creating stunning accessories for every occasion."
  },
  {
    "slug": "umbra",
    "name": "Umbra",
    "type": "Brand",
    "category": "Home",
    "url": "https://www.umbra.com/",
    "description": "Recognized for their innovative designs, they create everything from clever storage solutions to eye-catching wall art—always with a focus on style and practicality."
  },
  {
    "slug": "eq3",
    "name": "Eq3",
    "type": "Brand",
    "category": "Home",
    "url": "https://www.eq3.com/",
    "description": "Their clean, modern designs are crafted with care—many right here in Canada—using durable, sustainable materials."
  },
  {
    "slug": "skoah",
    "name": "Skoah",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://www.skoah.com/",
    "description": "skoah is a Canadian skincare company and spa that focuses on simple, effective care tailored just for you."
  },
  {
    "slug": "nutrience",
    "name": "Nutrience",
    "type": "Brand",
    "category": "Pets",
    "url": "https://nutrience.com/",
    "description": "Nutrience is a Canadian pet food company that specializes in giving your dogs and cats the best with wholesome, high-quality ingredients."
  },
  {
    "slug": "nature-clean",
    "name": "Nature Clean",
    "type": "Brand",
    "category": "Cleaning",
    "url": "https://natureclean.ca/",
    "description": "Nature Clean is a Canadian business that makes cleaning and personal care products without harsh chemicals."
  },
  {
    "slug": "nud-fud",
    "name": "Nud Fud",
    "type": "Brand",
    "category": "Keto",
    "url": "https://www.nudfud.com/",
    "description": "nud is a Canadian label that makes wholesome, plant-based snacks from simple, whole-food ingredients."
  },
  {
    "slug": "unbun",
    "name": "Unbun",
    "type": "Brand",
    "category": "Keto",
    "url": "https://unbunfoods.com/",
    "description": "Unbun is a Canadian food company redefining baked goods with grain-free, keto-certified, and gluten-free alternatives to your favourite staples."
  },
  {
    "slug": "love-good-fats",
    "name": "Love Good Fats",
    "type": "Brand",
    "category": "Keto",
    "url": "https://www.lovegoodfats.ca/",
    "description": "Love Good Fats is a Canadian snack company that produces low-sugar, keto-friendly bars and treats rich in good fats like nut butters and coconut oil."
  },
  {
    "slug": "kiss-my-keto",
    "name": "Kiss My Keto",
    "type": "Brand",
    "category": "Keto",
    "url": "https://www.kissmyketo.com/",
    "description": "A homegrown keto brand committed to making low-carb living easier and more enjoyable."
  },
  {
    "slug": "thinslim-foods",
    "name": "Thinslim Foods",
    "type": "Brand",
    "category": "Keto",
    "url": "https://www.thinslimfoods.com/",
    "description": "A homegrown keto brand committed to making low-carb living easier and more enjoyable."
  },
  {
    "slug": "good-to-go-snacks",
    "name": "Good To Go Snacks",
    "type": "Brand",
    "category": "Keto",
    "url": "https://goodtogosnacks.ca/",
    "description": "GOOD TO GO is a Canadian brand offering soft-baked snack bars that are low in sugar, high in fibre, and packed with healthy fats—perfect for keto lifestyles."
  },
  {
    "slug": "chocxo",
    "name": "Chocxo",
    "type": "Brand",
    "category": "Keto",
    "url": "https://chocxo.com/",
    "description": "Chocxo is a Canadian chocolate label crafting premium organic treats made with simple ingredients and significantly less sugar."
  },
  {
    "slug": "archipelago",
    "name": "Archipelago",
    "type": "Brand",
    "category": "Keto",
    "url": "https://archipelago-store.com/",
    "description": "Archipelago is a Canadian keto food brand offering clean, high-fat, low-carb staples made with real, whole ingredients."
  },
  {
    "slug": "sweet-monk",
    "name": "Sweet Monk",
    "type": "Brand",
    "category": "Keto",
    "url": "https://www.shopsweetmonk.com/",
    "description": "Sweet Monk is a Canadian company offering plant-based sweeteners made with pure monk fruit—zero calories, zero sugar, and no bitter aftertaste."
  },
  {
    "slug": "farm-girl",
    "name": "Farm Girl",
    "type": "Brand",
    "category": "Keto",
    "url": "https://farmgirlcereal.com/",
    "description": "Farm Girl is a Toronto-based food company crafting keto-friendly cereals, granolas, and baking mixes that bring comfort food back to low-carb living."
  },
  {
    "slug": "cove-soda",
    "name": "Cove Soda",
    "type": "Brand",
    "category": "Beverages",
    "url": "https://www.covesoda.com/",
    "description": "Cove Soda is a Canadian label reinventing soft drinks with gut-friendly, probiotic-packed sodas made from clean, plant-based ingredients."
  },
  {
    "slug": "sweet-friendly",
    "name": "Sweet Friendly",
    "type": "Brand",
    "category": "Keto",
    "url": "https://sweetfriendly.com/",
    "description": "Sweet & Friendly is a Canadian label that lets you enjoy all the sweetness of sugar without the calories or blood sugar spikes."
  },
  {
    "slug": "liviva-foods",
    "name": "Liviva Foods",
    "type": "Brand",
    "category": "Keto",
    "url": "https://livivafoods.ca/",
    "description": "LIVIVA Foods is a Canadian label offering low-carb, high-protein pasta alternatives made from clean, plant-located ingredients like organic soybeans, black beans, and shirataki."
  },
  {
    "slug": "fiber-gourmet",
    "name": "Fiber Gourmet",
    "type": "Brand",
    "category": "Keto",
    "url": "https://fibergourmet.com/",
    "description": "A homegrown keto brand committed to making low-carb living easier and more enjoyable."
  },
  {
    "slug": "nuts-to-you",
    "name": "Nuts To You",
    "type": "Brand",
    "category": "Food",
    "url": "https://www.nutstoyou.ca/",
    "description": "Nuts To You is a proudly Canadian label offering a wide range of natural and organic nut and seed butters, all made without added oils, sugars, or preservatives."
  },
  {
    "slug": "healthy-crunch",
    "name": "Healthy Crunch",
    "type": "Brand",
    "category": "Snacks",
    "url": "https://healthycrunch.com/",
    "description": "Healthy Crunch is a Canadian label creating allergen-friendly snacks and pantry staples that are big on flavour and free from the top common allergens."
  },
  {
    "slug": "fody",
    "name": "Fody",
    "type": "Brand",
    "category": "Food",
    "url": "https://fodyfoods.ca/",
    "description": "Fody Foods is a Canadian brand making delicious, low FODMAP snacks, sauces, and pantry staples designed for sensitive stomachs."
  },
  {
    "slug": "iron-vegan",
    "name": "Iron Vegan",
    "type": "Brand",
    "category": "Health",
    "url": "https://www.ironvegan.ca/",
    "description": "This Canadian label creates high-quality protein powders and performance supplements using organic, non-GMO ingredients—no artificial stuff, just real food-based fuel."
  },
  {
    "slug": "natures-path",
    "name": "Natures Path",
    "type": "Brand",
    "category": "Food",
    "url": "https://naturespath.com/",
    "description": "Nature’s Path is a Canadian, family-owned company committed to crafting organic, non-GMO breakfast foods that nourish people and the planet."
  },
  {
    "slug": "ross-chocolates",
    "name": "Ross Chocolates",
    "type": "Brand",
    "category": "Food",
    "url": "https://rosschocolates.ca/",
    "description": "Ross Chocolates is a Canadian company offering rich, high-quality chocolate sweetened with stevia for those looking to reduce sugar without sacrificing flavour."
  },
  {
    "slug": "its-skinny-pasta",
    "name": "Its Skinny Pasta",
    "type": "Brand",
    "category": "Keto",
    "url": "https://itsskinny.com/",
    "description": "This proudly Canadian company crafts keto-friendly foods focused on clean ingredients and great taste."
  },
  {
    "slug": "stars-strauss-menswear",
    "name": "Stars Strauss Menswear",
    "type": "Brand",
    "category": "Clothing",
    "url": "https://shop.stars-strauss.com/",
    "description": "A Canadian fashion brand offering quality clothing designed for style, comfort, and Canadian living."
  },
  {
    "slug": "macro-foods",
    "name": "Macro Foods",
    "type": "Brand",
    "category": "Food",
    "url": "https://macrofoods.ca/",
    "description": "This Canadian company brings authentic taste and quality to tables across the country."
  },
  {
    "slug": "prana",
    "name": "Prana",
    "type": "Brand",
    "category": "Snacks",
    "url": "https://pranafoods.ca/",
    "description": "This Canadian label offers tasty, organic treats like nut mixes, dried fruit, and chocolate bark—always plant-based, non-GMO, and gluten-free."
  },
  {
    "slug": "sauce-pantry",
    "name": "Sauce Pantry",
    "type": "Brand",
    "category": "Food",
    "url": "https://saucepantry.com/",
    "description": "A homegrown food brand committed to great taste and honest ingredients."
  },
  {
    "slug": "ode",
    "name": "Ode",
    "type": "Brand",
    "category": "Intimates",
    "url": "https://odelingerie.com/",
    "description": "Proudly Canadian and female-created, ODE provides bras, underwear, and loungewear crafted from soft, sustainable fabrics and made to move with you."
  },
  {
    "slug": "sewn",
    "name": "Sewn",
    "type": "Brand",
    "category": "Intimates",
    "url": "https://www.shopsewn.com/",
    "description": "Proudly Canadian and female-founded, SEWN provides effortless pieces—like tees, tanks, and lounge sets—crafted from eco-friendly fabrics in small batches."
  },
  {
    "slug": "mary-young",
    "name": "Mary Young",
    "type": "Brand",
    "category": "Intimates",
    "url": "https://maryyoung.com/",
    "description": "A homegrown intimates brand committed to pieces that feel as good as they look."
  },
  {
    "slug": "thief-bandit",
    "name": "Thief Bandit",
    "type": "Brand",
    "category": "Intimates",
    "url": "https://thiefandbandit.com/",
    "description": "Canadian-designed intimates celebrating comfort, confidence, and quality construction."
  },
  {
    "slug": "understance",
    "name": "Understance",
    "type": "Brand",
    "category": "Intimates",
    "url": "https://understance.com/",
    "description": "Understance is a Canadian lingerie company redefining comfort with inclusive, wire-free bras made for real bodies."
  },
  {
    "slug": "blush-lingerie",
    "name": "Blush Lingerie",
    "type": "Brand",
    "category": "Intimates",
    "url": "https://blushlingerie.com/",
    "description": "This proudly Canadian company creates intimate apparel focused on comfort, quality, and inclusive sizing."
  },
  {
    "slug": "montelle-intimates",
    "name": "Montelle Intimates",
    "type": "Brand",
    "category": "Intimates",
    "url": "https://ca.montelleintimates.com/",
    "description": "Canadian-designed intimates celebrating comfort, confidence, and quality construction."
  },
  {
    "slug": "cureus-label",
    "name": "Cureus Label",
    "type": "Brand",
    "category": "Intimates",
    "url": "https://cureuslabel.com/",
    "description": "Proudly Canadian and female-started, their capsule collections feature versatile pieces made in small batches using sustainable fabrics."
  },
  {
    "slug": "manmade",
    "name": "Manmade",
    "type": "Brand",
    "category": "Clothing",
    "url": "https://manmadebrand.com/",
    "description": "A homegrown fashion label delivering on-trend pieces that work for real Canadian lifestyles."
  },
  {
    "slug": "devon-lang",
    "name": "Devon Lang",
    "type": "Brand",
    "category": "Clothing",
    "url": "https://devonandlang.com/",
    "description": "Proudly Canadian, this brand creates clothing that reflects modern style while honouring quality craftsmanship."
  },
  {
    "slug": "huer-candy",
    "name": "Huer Candy",
    "type": "Brand",
    "category": "Snacks",
    "url": "https://www.huerfoods.com/",
    "description": "A homegrown snack brand committed to creating treats you'll love."
  },
  {
    "slug": "fizz-mobile",
    "name": "Fizz Mobile",
    "type": "Brand",
    "category": "Telecom",
    "url": "https://fizz.ca/",
    "description": "A Canadian telecom committed to keeping Canadians connected with reliable service."
  },
  {
    "slug": "linen-chest",
    "name": "Linen Chest",
    "type": "Brand",
    "category": "Home",
    "url": "https://www.linenchest.com/",
    "description": "From soft bedding and chic décor to kitchen must-haves and thoughtful gifts, this family-owned Canadian store has something for every room and every style."
  },
  {
    "slug": "leons",
    "name": "Leons",
    "type": "Brand",
    "category": "Home",
    "url": "https://www.leons.ca/",
    "description": "This Canadian company designs home essentials with attention to quality, design, and everyday living."
  },
  {
    "slug": "goodee",
    "name": "Goodee",
    "type": "Brand",
    "category": "Home",
    "url": "https://www.goodeeworld.com/",
    "description": "Established in Canada, this B Corp-certified marketplace showcases global artisans, sustainable materials, and transparent sourcing."
  },
  {
    "slug": "loulou-lollipop",
    "name": "Loulou Lollipop",
    "type": "Brand",
    "category": "Baby",
    "url": "https://louloulollipop.ca/",
    "description": "Founded by Canadian moms, the brand offers silicone teething accessories, cozy sleepwear, and feeding essentials that are safe, sustainable, and irresistibly cute."
  },
  {
    "slug": "kewe-collective",
    "name": "Kewe Collective",
    "type": "Brand",
    "category": "Baby",
    "url": "https://www.kewecollective.com/",
    "description": "Canadian-made baby products delivering on safety, comfort, and peace of mind."
  },
  {
    "slug": "petits-genoux",
    "name": "Petits Genoux",
    "type": "Brand",
    "category": "Baby",
    "url": "https://www.petitsgenoux.com/",
    "description": "A homegrown baby brand committed to products that support growing families."
  },
  {
    "slug": "b-babyco",
    "name": "B Babyco",
    "type": "Brand",
    "category": "Baby",
    "url": "https://bbabyco.com/",
    "description": "Proudly Canadian, their collection features organic textiles, playful designs, and neutral tones perfect for modern nurseries."
  },
  {
    "slug": "squish-candies",
    "name": "Squish Candies",
    "type": "Brand",
    "category": "Snacks",
    "url": "https://www.squishcandies.ca/",
    "description": "Proudly Canadian and from Montreal, SQUISH leads the way with vegan, gluten-free, and naturally flavoured options that are as inclusive as they are delicious."
  },
  {
    "slug": "bridgehead-coffee",
    "name": "Bridgehead Coffee",
    "type": "Brand",
    "category": "Coffee",
    "url": "https://www.bridgehead.ca/",
    "description": "Partnering directly with small‑scale farmers, this Canadian label ensures every bean is organic, fair‑trade, and traceable."
  },
  {
    "slug": "49th-parallel-coffee-roasters",
    "name": "49Th Parallel Coffee Roasters",
    "type": "Brand",
    "category": "Coffee",
    "url": "https://49thcoffee.com/",
    "description": "This proudly Canadian company roasts premium coffee beans with care and precision."
  },
  {
    "slug": "pilot-coffee-roasters",
    "name": "Pilot Coffee Roasters",
    "type": "Brand",
    "category": "Coffee",
    "url": "https://pilotcoffeeroasters.com/",
    "description": "Based in Toronto, Pilot Coffee Roasters is known for exceptional beans, ethical sourcing, and a fresh, innovative take on specialty coffee."
  },
  {
    "slug": "bean-around-the-world",
    "name": "Bean Around The World",
    "type": "Brand",
    "category": "Coffee",
    "url": "https://batwcoffee.com/",
    "description": "A Canadian coffee roaster dedicated to fresh beans, expert roasting, and exceptional flavour."
  },
  {
    "slug": "birch-bark-coffee-co",
    "name": "Birch Bark Coffee Co",
    "type": "Brand",
    "category": "Coffee",
    "url": "https://birchbarkcoffeecompany.com/",
    "description": "Birch Bark Coffee Co. is a proudly Indigenous-owned Canadian brand roasting organic, fair trade coffee with heart and purpose."
  },
  {
    "slug": "equator-coffee-roasters",
    "name": "Equator Coffee Roasters",
    "type": "Brand",
    "category": "Coffee",
    "url": "https://equator.ca/",
    "description": "Equator Coffee Roasters is a community-minded Canadian business offering fair trade, organic coffee in the heart of Ontario!."
  },
  {
    "slug": "roar-organic",
    "name": "Roar Organic",
    "type": "Brand",
    "category": "Beverages",
    "url": "https://roarorganic.ca/",
    "description": "A homegrown drink brand delivering refreshment and quality in every sip."
  },
  {
    "slug": "two-bears",
    "name": "Two Bears",
    "type": "Brand",
    "category": "Beverages",
    "url": "https://www.twobears.ca/",
    "description": "A homegrown drink brand delivering refreshment and quality in every sip."
  },
  {
    "slug": "davidstea",
    "name": "Davidstea",
    "type": "Brand",
    "category": "Beverages",
    "url": "https://davidstea.com/",
    "description": "DAVIDsTEA is shaking up the tea world—one cup at a time. What started as a single shop on Queen Street West in Toronto has brewed into a full-blown tea movement across Canada and the U. S. , with a loyal communi-tea of sippers who crave flavour, fun, and something a little unexpected."
  },
  {
    "slug": "four-oclock-tea",
    "name": "Four Oclock Tea",
    "type": "Brand",
    "category": "Beverages",
    "url": "https://fouroclock.ca/",
    "description": "This proudly Canadian brand creates beverages that balance great taste with quality craftsmanship."
  },
  {
    "slug": "chopped-leaf",
    "name": "Chopped Leaf",
    "type": "Brand",
    "category": "Restaurant",
    "url": "https://choppedleaf.ca/",
    "description": "Canadian-owned and operated, this restaurant chain brings authentic flavours and friendly service to communities nationwide."
  },
  {
    "slug": "bulk-barn",
    "name": "Bulk Barn",
    "type": "Brand",
    "category": "Retail",
    "url": "https://www.bulkbarn.ca/",
    "description": "This homegrown retailer provides quality products and friendly service to Canadian communities."
  },
  {
    "slug": "flourish",
    "name": "Flourish",
    "type": "Brand",
    "category": "Health",
    "url": "https://www.flourishpancakes.com/",
    "description": "A Canadian health brand committed to quality supplements, natural ingredients, and wellness support."
  },
  {
    "slug": "green-press",
    "name": "Green Press",
    "type": "Brand",
    "category": "Health",
    "url": "https://greenpress.ca/",
    "description": "Canadian-made wellness products delivering quality nutrition and trusted ingredients."
  },
  {
    "slug": "dose-juice",
    "name": "Dose Juice",
    "type": "Brand",
    "category": "Beverages",
    "url": "https://dosejuice.com/",
    "description": "A homegrown drink brand delivering refreshment and quality in every sip."
  },
  {
    "slug": "revive-superfoods",
    "name": "Revive Superfoods",
    "type": "Brand",
    "category": "Food",
    "url": "https://revivesuperfoods.com/",
    "description": "A homegrown food brand committed to great taste and honest ingredients."
  },
  {
    "slug": "wakewater",
    "name": "Wakewater",
    "type": "Brand",
    "category": "Beverages",
    "url": "https://www.wakewater.ca/",
    "description": "A homegrown drink brand delivering refreshment and quality in every sip."
  },
  {
    "slug": "organika",
    "name": "Organika",
    "type": "Brand",
    "category": "Health",
    "url": "https://organika.com/",
    "description": "A Canadian health brand committed to quality supplements, natural ingredients, and wellness support."
  },
  {
    "slug": "jamieson-vitamins",
    "name": "Jamieson Vitamins",
    "type": "Brand",
    "category": "Health",
    "url": "https://www.jamiesonvitamins.com/",
    "description": "This proudly Canadian company creates health products focused on efficacy, purity, and your wellbeing."
  },
  {
    "slug": "mobilia",
    "name": "Mobilia",
    "type": "Brand",
    "category": "Home",
    "url": "https://mobilia.ca/",
    "description": "This Canadian company designs home essentials with attention to quality, design, and everyday living."
  },
  {
    "slug": "canada-goose",
    "name": "Canada Goose",
    "type": "Brand",
    "category": "Clothing",
    "url": "https://www.canadagoose.com/",
    "description": "Canada Goose is a world-famous Canadian company that’s all about making gear tough enough to handle the coldest, harshest weather."
  },
  {
    "slug": "fellow-earthlings",
    "name": "Fellow Earthlings",
    "type": "Brand",
    "category": "Clothing",
    "url": "https://fellowearthlings.com/",
    "description": "Proudly Canadian, this brand creates clothing that reflects modern style while honouring quality craftsmanship."
  },
  {
    "slug": "direct-vision-eyewear",
    "name": "Direct Vision Eyewear",
    "type": "Brand",
    "category": "Eyewear",
    "url": "https://directvisioneyewear.ca/",
    "description": "This proudly Canadian company creates glasses and sunglasses with attention to design and craftsmanship."
  },
  {
    "slug": "ilook-glasses",
    "name": "Ilook Glasses",
    "type": "Brand",
    "category": "Eyewear",
    "url": "https://www.ilookglasses.ca/",
    "description": "A Canadian eyewear brand designing quality frames that combine style, durability, and optical excellence."
  },
  {
    "slug": "maguire-shoes",
    "name": "Maguire Shoes",
    "type": "Brand",
    "category": "Shoes",
    "url": "https://maguireshoes.com/",
    "description": "A Canadian footwear brand designing quality shoes that combine style, comfort, and durability."
  },
  {
    "slug": "atp-lab",
    "name": "Atp Lab",
    "type": "Brand",
    "category": "Health",
    "url": "https://ca.atplab.com/",
    "description": "A Canadian health brand committed to quality supplements, natural ingredients, and wellness support."
  },
  {
    "slug": "broya-broth",
    "name": "Broya Broth",
    "type": "Brand",
    "category": "Food",
    "url": "https://broyaliving.com/",
    "description": "A Canadian food brand crafting quality products with care, flavour, and local ingredients."
  },
  {
    "slug": "lus-brands",
    "name": "Lus Brands",
    "type": "Brand",
    "category": "Haircare",
    "url": "https://lusbrands.com/",
    "description": "LUS Brands, short for Love Ur Self, offers clean, Canadian-made haircare designed especially for wavy, curly, and kinky-coily hair."
  },
  {
    "slug": "carina-organics",
    "name": "Carina Organics",
    "type": "Brand",
    "category": "Haircare",
    "url": "https://ca.carinaorganics.com/",
    "description": "Carina Organics is a proudly Canadian label that creates gentle, effective hair and body care products using certified organic and wildcrafted ingredients."
  },
  {
    "slug": "oligo",
    "name": "Oligo",
    "type": "Brand",
    "category": "Haircare",
    "url": "https://oligoprofessionnel.ca/",
    "description": "Canadian-made haircare focused on performance, clean ingredients, and hair health."
  },
  {
    "slug": "lathr",
    "name": "Lathr",
    "type": "Brand",
    "category": "Haircare",
    "url": "https://lathr.com/",
    "description": "Lathr is a Canadian label that keeps things simple, clean, and honest with small-batch grooming essentials made for everyday use."
  },
  {
    "slug": "the-spice-age",
    "name": "The Spice Age",
    "type": "Brand",
    "category": "Food",
    "url": "https://thespiceage.ca/",
    "description": "Proudly Canadian, this brand creates food products that deliver on flavour and quality."
  },
  {
    "slug": "clean-journey",
    "name": "Clean Journey",
    "type": "Brand",
    "category": "Cleaning",
    "url": "https://cleanjourney.com/",
    "description": "A homegrown cleaning brand committed to products that clean well and feel good to use."
  },
  {
    "slug": "ole-cocktail-co",
    "name": "Ole Cocktail Co",
    "type": "Brand",
    "category": "Beverages",
    "url": "https://olecocktails.com/",
    "description": "A Canadian beverage company crafting refreshing drinks with quality ingredients and authentic flavour."
  },
  {
    "slug": "soja-co",
    "name": "Soja Co",
    "type": "Brand",
    "category": "Food",
    "url": "https://sojaco.ca/",
    "description": "SOJA & Co. is a Montreal-based company blending wellness, simplicity, and sustainability through handcrafted candles and home goods."
  },
  {
    "slug": "the-7-virtues",
    "name": "The 7 Virtues",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://the7virtues.com/",
    "description": "The 7 Virtues is a Canadian perfume label redefining beauty through empowerment, sustainability, and social impact."
  },
  {
    "slug": "tealish",
    "name": "Tealish",
    "type": "Brand",
    "category": "Beverages",
    "url": "https://tealish.com/",
    "description": "Canadian-made beverages focusing on fresh flavours and premium ingredients."
  },
  {
    "slug": "the-bark",
    "name": "The Bark",
    "type": "Brand",
    "category": "Pets",
    "url": "https://www.thebarktreats.ca/",
    "description": "This proudly Canadian company crafts pet products with safety, quality, and animal wellbeing in mind."
  },
  {
    "slug": "wild-coast-perfumery",
    "name": "Wild Coast Perfumery",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://www.wildcoastperfumes.com/",
    "description": "This proudly Canadian company creates beauty products that combine innovation with conscious ingredients."
  },
  {
    "slug": "mala-the-brand",
    "name": "Mala The Brand",
    "type": "Brand",
    "category": "Clothing",
    "url": "https://www.malathebrand.com/",
    "description": "Mala the Label hand-pours clean-burning candles in Vancouver using sustainable soy wax, natural scents, and eco-conscious packaging."
  },
  {
    "slug": "the-bare-home",
    "name": "The Bare Home",
    "type": "Brand",
    "category": "Home",
    "url": "https://thebarehome.ca/",
    "description": "A Canadian home goods brand creating quality products that bring style and function to your space."
  },
  {
    "slug": "gutsy-kombucha",
    "name": "Gutsy Kombucha",
    "type": "Brand",
    "category": "Beverages",
    "url": "https://gutsykombucha.com/",
    "description": "Gutsy Kombucha is a Canadian company Kombucha that’s as good for your gut as it is for your taste buds."
  },
  {
    "slug": "mec",
    "name": "Mec",
    "type": "Brand",
    "category": "Retail",
    "url": "https://www.mec.ca/",
    "description": "MEC (Mountain Equipment Company) is Canada’s go-to outdoor retailer, equipping adventurers with the gear they need to hike, climb, camp, paddle, ski, and explore the wild."
  },
  {
    "slug": "jones-soda",
    "name": "Jones Soda",
    "type": "Brand",
    "category": "Beverages",
    "url": "https://www.jonessoda.com/",
    "description": "Famous for its vibrant flavours, offbeat personality, and fan-submitted label photos, this proudly independent brand has been shaking up the soda game starting in the ‘90s."
  },
  {
    "slug": "native-northwest",
    "name": "Native Northwest",
    "type": "Brand",
    "category": "Indigenous",
    "url": "https://nativenorthwest.ca/",
    "description": "From Vancouver and guided by a deep respect for Indigenous communities, they collaborate with Indigenous artists to create authentic, functional goods—from stationery and housewares to kids’ items and apparel."
  },
  {
    "slug": "sisters-sage",
    "name": "Sisters Sage",
    "type": "Brand",
    "category": "Indigenous",
    "url": "https://sisterssage.com/",
    "description": "Sisters Sage is a Tsimshian-owned wellness brand established by Lynn-Marie Angus of the Gitxaala, Nisga’a, and Métis Nations."
  },
  {
    "slug": "spirit-bear-coffee-co",
    "name": "Spirit Bear Coffee Co",
    "type": "Brand",
    "category": "Indigenous",
    "url": "https://spiritbearcoffeecompany.com/",
    "description": "Co-led by Paul Biglin and Sean Harding, the label proudly partners with over 600 locations across Canada, proving that Indigenous entrepreneurship and high-quality coffee go hand in hand."
  },
  {
    "slug": "swalwen-botanicals",
    "name": "Swalwen Botanicals",
    "type": "Brand",
    "category": "Indigenous",
    "url": "https://skwalwen.com/",
    "description": "This Indigenous Canadian company creates products that honour tradition while embracing modern design and innovation."
  },
  {
    "slug": "old-tribes",
    "name": "Old Tribes",
    "type": "Brand",
    "category": "Indigenous",
    "url": "https://www.oldtribes.com/",
    "description": "OldTribes is a family-run label blending traditional Kichwa craftsmanship from Ecuador with Indigenous designs from across Canada."
  },
  {
    "slug": "warren-steven-scott",
    "name": "Warren Steven Scott",
    "type": "Brand",
    "category": "Indigenous",
    "url": "https://warrenstevenscott.com/",
    "description": "Warren Steven Scott is a Nlaka’pamux designer recognized for blending luxury fashion with ancestral influence."
  },
  {
    "slug": "alice-sage",
    "name": "Alice Sage",
    "type": "Brand",
    "category": "Indigenous",
    "url": "https://aliceandsage.com/",
    "description": "Alice + Sage is an Indigenous, female-owned candle company based in Winnipeg, Manitoba, established by Salina Morse—Anishinaabe (Bear Clan), Ukrainian, and a member of Lake St."
  },
  {
    "slug": "algonquin-tea-company",
    "name": "Algonquin Tea Company",
    "type": "Brand",
    "category": "Indigenous",
    "url": "https://algonquintea.com/",
    "description": "Created by a painter and a herbalist drawn to the healing power of the land, the company began with plants like sweet gale, gathered by canoe, and grew into a beloved source of deeply connected, sustainably made teas."
  },
  {
    "slug": "mother-earth-essentials",
    "name": "Mother Earth Essentials",
    "type": "Brand",
    "category": "Indigenous",
    "url": "https://motherearth.ca/",
    "description": "Proudly Indigenous-owned, this brand shares culture and craft through thoughtfully made products."
  },
  {
    "slug": "mini-tipi",
    "name": "Mini Tipi",
    "type": "Brand",
    "category": "Indigenous",
    "url": "https://minitipi.ca/",
    "description": "Co-launched by Trisha Pitura (Nipissing First Nation) and Melanie Bernard in 2016, MINI TIPI is a proudly Canadian lifestyle brand from Gatineau, QC."
  },
  {
    "slug": "satya-organic",
    "name": "Satya Organic",
    "type": "Brand",
    "category": "Indigenous",
    "url": "https://satya.ca/",
    "description": "This Indigenous Canadian company creates products that honour tradition while embracing modern design and innovation."
  },
  {
    "slug": "nehwo-maskwa-candles",
    "name": "Nehwo Maskwa Candles",
    "type": "Brand",
    "category": "Indigenous",
    "url": "https://nehwomaskwacandle.com/",
    "description": "Established by Christina, a proud Cree and Métis woman, the name honours her son Tucker, who received the name Nehwo Maskwa (“Four Bears”) in ceremony, and her mother, whose 1981 story “Brother Bear” inspired the label’s symbol."
  },
  {
    "slug": "inner-wolf-jewelry",
    "name": "Inner Wolf Jewelry",
    "type": "Brand",
    "category": "Indigenous",
    "url": "https://innerwolfjewelry.com/",
    "description": "Inner Wolf Jewelry is the creation of Ashya Elizabeth, an independent Cree and Turkish artist based in so-called Vancouver. Every piece is a reflection of her deep-rooted connection to the natural and spiritual world—fused with her love for storytelling, cultural tradition, and the land."
  },
  {
    "slug": "lesley-hampton",
    "name": "Lesley Hampton",
    "type": "Brand",
    "category": "Indigenous",
    "url": "https://lesleyhampton.com/",
    "description": "Lesley Hampton is an Anishinaabe artist and designer from Temagami First Nation whose fashion label is rooted in body neutrality, mental wellness, and Indigenous worldview."
  },
  {
    "slug": "sanyas-soaps",
    "name": "Sanyas Soaps",
    "type": "Brand",
    "category": "Indigenous",
    "url": "https://www.etsy.com/ca/shop/SanyasSoaps?ref=shop-header-name&listing_id=1901837775&from_page=listing",
    "description": "This Indigenous Canadian company creates products that honour tradition while embracing modern design and innovation."
  },
  {
    "slug": "outway-socks",
    "name": "Outway Socks",
    "type": "Brand",
    "category": "Clothing",
    "url": "https://outway.com/",
    "description": "Established by athletes, Outway is all about pushing limits, standing tall, and expressing yourself with every step. Proudly Canadian, proudly different."
  },
  {
    "slug": "milk-jar",
    "name": "Milk Jar",
    "type": "Brand",
    "category": "Home",
    "url": "https://milkjar.ca/",
    "description": "Created by Holly Singer in 2016, Milk Jar designs clean-burning, plant-based candles, diffusers, and fragrances, all while championing inclusive hiring and donating to non-profits that support accessibility and inclusion."
  },
  {
    "slug": "bjeweled-vintage",
    "name": "Bjeweled Vintage",
    "type": "Brand",
    "category": "Jewellery",
    "url": "https://www.etsy.com/ca/shop/BjeweledVintage?ref=shop-header-name&listing_id=292704315&from_page=listing",
    "description": "A Canadian jewellery designer creating beautiful, quality pieces with attention to craft and detail."
  },
  {
    "slug": "hardbite-chips",
    "name": "Hardbite Chips",
    "type": "Brand",
    "category": "Snacks",
    "url": "https://hardbitechips.com/",
    "description": "Canadian-made snacks focusing on flavour, quality ingredients, and feel-good indulgence."
  },
  {
    "slug": "lammles-western-wear",
    "name": "Lammles Western Wear",
    "type": "Brand",
    "category": "Clothing",
    "url": "https://www.lammles.com/",
    "description": "Lammle’s Western Wear has been outfitting Canadians in authentic western style since 1983. Founded in Calgary by rancher and entrepreneur Barry Lammle, the brand brings together top-carefully made boots, hats, denim, and accessories all under one roof."
  },
  {
    "slug": "beaver-buzz",
    "name": "Beaver Buzz",
    "type": "Brand",
    "category": "Beverages",
    "url": "https://beaverbuzz.com/",
    "description": "A Canadian beverage company crafting refreshing drinks with quality ingredients and authentic flavour."
  },
  {
    "slug": "guru-energy",
    "name": "Guru Energy",
    "type": "Brand",
    "category": "Beverages",
    "url": "https://guruenergy.com/",
    "description": "This proudly Canadian brand creates beverages that balance great taste with quality craftsmanship."
  },
  {
    "slug": "trulocal",
    "name": "Trulocal",
    "type": "Brand",
    "category": "Food",
    "url": "https://trulocal.ca/",
    "description": "From Canada, truLOCAL lets you customize your meat box and get it shipped on dry ice—fresh, frozen, and ready when you are."
  },
  {
    "slug": "educated-beards",
    "name": "Educated Beards",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://educatedbeards.com/",
    "description": "A Canadian beauty brand committed to clean formulations, quality ingredients, and effective results."
  },
  {
    "slug": "yes-we-can-drinks",
    "name": "Yes We Can Drinks",
    "type": "Brand",
    "category": "Beverages",
    "url": "https://www.yeswecandrinks.com/",
    "description": "Yes We Can is all about celebrating nature’s diversity—with a sparkle. Inspired by global flavours and grounded in innovation, this Canadian label crafts refreshing sparkling waters that bring together aromatic ingredients from around the world."
  },
  {
    "slug": "ironbull-strength",
    "name": "Ironbull Strength",
    "type": "Brand",
    "category": "Fitness",
    "url": "https://ca.ironbullstrength.com/",
    "description": "Iron Bull Strength is a proudly Canadian company creating high-performance fitness gear built to power your workouts and push your limits."
  },
  {
    "slug": "tea-horse",
    "name": "Tea Horse",
    "type": "Brand",
    "category": "Beverages",
    "url": "https://www.teahorse.ca/",
    "description": "Tea Horse is an Indigenous and woman-owned tea company blending tradition with innovation from the heart of Northwestern Ontario."
  },
  {
    "slug": "anne-mulaire",
    "name": "Anne Mulaire",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://annemulaire.ca/",
    "description": "Anne Mulaire is a Métis and Anishinaabe-owned fashion company blending heritage, sustainability, and inclusive design."
  },
  {
    "slug": "ans-performance",
    "name": "Ans Performance",
    "type": "Brand",
    "category": "Health",
    "url": "https://www.ansperformance.com/",
    "description": "Founded by a chemical engineer and Ph. D. in Biological Chemistry, ANS is all about performance, integrity, and real-world results. Trusted by pros, gym-goers, and weekend warriors alike—this is fuel you can feel."
  },
  {
    "slug": "lohn",
    "name": "Lohn",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://shoplohn.com/",
    "description": "Started by two chemical engineers turned fragrance fanatics, LOHN creates clean-burning, coconut & soy wax candles infused with nostalgic scents inspired by the ancient Amber Road."
  },
  {
    "slug": "eco-collective",
    "name": "Eco Collective",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://www.ecocollective.com/",
    "description": "Founded by Genevieve on a farmer’s market sailboat journey turned wellness mission, the company blends slow living with feel-good routines. From plastic-free beauty to mindful rituals, everything is crafted to ground you in the now—and help the planet while you’re at it."
  },
  {
    "slug": "earths-own",
    "name": "Earths Own",
    "type": "Brand",
    "category": "Food",
    "url": "https://earthsown.com/",
    "description": "Earth’s Own is a proudly Canadian plant-based brand crafting delicious oat, almond, and soy m*lks and creamers in BC, Ontario, and Quebec."
  },
  {
    "slug": "wild-vibes-treat-co",
    "name": "Wild Vibes Treat Co",
    "type": "Brand",
    "category": "Pets",
    "url": "https://wildvibestreats.com/",
    "description": "A homegrown pet brand committed to products that pets love and owners trust."
  },
  {
    "slug": "kootenay-woman",
    "name": "Kootenay Woman",
    "type": "Brand",
    "category": "Clothing",
    "url": "https://kootenaywildcrafting.com/",
    "description": "A Canadian fashion brand offering quality clothing designed for style, comfort, and Canadian living."
  },
  {
    "slug": "loop-mission",
    "name": "Loop Mission",
    "type": "Brand",
    "category": "Beverages",
    "url": "https://loopmission.com/",
    "description": "LOOP Mission is a Montreal-based circular food company turning perfectly good \"\"waste\"\" into delicious cold-pressed juices, beer, snacks, gin—even soap."
  },
  {
    "slug": "simply-the-goodz",
    "name": "Simply The Goodz",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://simplythegoodz.com/",
    "description": "Simply the GOODZ is a proudly Canadian snack brand keeping it real with dried fruits, nuts, and bold flavours you’ll actually crave."
  },
  {
    "slug": "open-farm",
    "name": "Open Farm",
    "type": "Brand",
    "category": "Pets",
    "url": "https://openfarmpet.ca/",
    "description": "Open Farm is a Canadian pet food label that’s rewriting the rules—because your pet deserves food made with the same values you care about."
  },
  {
    "slug": "beauty-from-bees",
    "name": "Beauty From Bees",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://beautyfrombees.ca/",
    "description": "Beauty From Bees is a proudly Canadian skincare label born from a mom’s mission to eliminate toxins and protect her growing family."
  },
  {
    "slug": "odd-bunch",
    "name": "Odd Bunch",
    "type": "Brand",
    "category": "Clothing",
    "url": "https://www.oddbunch.ca/",
    "description": "Odd Bunch is a proudly Canadian company rescuing perfectly good, “imperfect” fruits and veggies that grocery stores reject for being too small, too big, or just plain quirky."
  },
  {
    "slug": "clever-mocktails",
    "name": "Clever Mocktails",
    "type": "Brand",
    "category": "Beverages",
    "url": "https://clevermocktails.com/",
    "description": "A Canadian beverage company crafting refreshing drinks with quality ingredients and authentic flavour."
  },
  {
    "slug": "keen-energy",
    "name": "Keen Energy",
    "type": "Brand",
    "category": "Beverages",
    "url": "https://keenenergy.ca/",
    "description": "This proudly Canadian brand creates beverages that balance great taste with quality craftsmanship."
  },
  {
    "slug": "zoraw-chocolates",
    "name": "Zoraw Chocolates",
    "type": "Brand",
    "category": "Food",
    "url": "https://www.zorawchocolates.ca/",
    "description": "A Canadian food brand crafting quality products with care, flavour, and local ingredients."
  },
  {
    "slug": "carolines-homemade-home",
    "name": "Carolines Homemade Home",
    "type": "Brand",
    "category": "Home",
    "url": "https://www.etsy.com/shop/carolinehomemadehome",
    "description": "This Canadian company designs home essentials with attention to quality, design, and everyday living."
  },
  {
    "slug": "eq-state-teas",
    "name": "Eq State Teas",
    "type": "Brand",
    "category": "Beverages",
    "url": "https://eqstate.ca/",
    "description": "A Canadian beverage company crafting refreshing drinks with quality ingredients and authentic flavour."
  },
  {
    "slug": "guests-on-earth",
    "name": "Guests On Earth",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://www.guestsonearth.com/",
    "description": "Established in Toronto, Ontario, Guests on Earth blends sustainable, plant-based formulas with intentional design to transform everyday cleaning into a self-care ritual. Their products aren’t just non-toxic—they’re counter-worthy, gift-worthy, and genuinely enjoyable to use."
  },
  {
    "slug": "shoes-for-the-soul",
    "name": "Shoes For The Soul",
    "type": "Brand",
    "category": "Shoes",
    "url": "https://shoesforthesoul.online/",
    "description": "Since 1998, Shoes for the Soul remains a go-to for women across Canada looking for stylish shoes, boots, and handbags that feel as good as they look. Family-owned and operated, this Canadian brand takes pride in curating pieces that blend comfort, well-crafted, and everyday style."
  },
  {
    "slug": "ye-old-rock-shop",
    "name": "Ye Old Rock Shop",
    "type": "Brand",
    "category": "Retail",
    "url": "https://yeolderockshop.com/",
    "description": "Based in Canada, this gem of a shop is packed with authentic crystals, vintage treasures, and crafting supplies—perfect for collectors, creators, and anyone chasing a little sparkle."
  },
  {
    "slug": "the-great-canadian-sox-shop",
    "name": "The Great Canadian Sox Shop",
    "type": "Brand",
    "category": "Clothing",
    "url": "https://greatsox.com/",
    "description": "For nearly a century, The Great Canadian Sox Company is keeping Canadians comfortable, starting way in 1934 with socks made for the logging industry. Still family-owned and proudly Canadian, the business is now best famous for its J. B. Field’s and Vagden companys—designed for hiking, working, skiing, or just staying cozy on the coldest days."
  },
  {
    "slug": "awasis-boutique",
    "name": "Awasis Boutique",
    "type": "Brand",
    "category": "Indigenous",
    "url": "https://awasisboutique.ca/",
    "description": "From 2018, the label has grown across Canada, now found in retail shops and gift-giving circles alike. Whether you're looking for a thoughtful gift or a comfy staple, Awasis offers something for everyone—while also helping give back."
  },
  {
    "slug": "sequoia-soaps",
    "name": "Sequoia Soaps",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://shop.sequoia.ca/",
    "description": "Sequoia is a proudly Indigenous-owned brand, created and led by Michaelee Lazore—Kanien'kehá:ka (Mohawk) from Akwesáhsne and Northern Paiute from Nevada. From 2002, Michaelee has grown Sequoia from small-batch soapmaking in her kitchen to a full line of skincare and wellness products inspired by Indigenous culture, nature, and tradition."
  },
  {
    "slug": "section-35",
    "name": "Section 35",
    "type": "Brand",
    "category": "Indigenous",
    "url": "https://www.sectionthirtyfive.com/",
    "description": "SECTION 35 is more than just a clothing brand—it’s a voice. Began in 2016 by Justin Jacob Louis of the Samson Cree Nation, SECTION 35 blends streetwear with powerful storytelling, creating pieces that honour Indigenous identity and spark conversation. Inspired by the past and rooted in the present, every design is a reflection of culture, resistance, and pride."
  },
  {
    "slug": "kokom-scrunchies",
    "name": "Kokom Scrunchies",
    "type": "Brand",
    "category": "Indigenous",
    "url": "https://kokomscrunchies.ca/",
    "description": "Starting in launching in 2019, Kokom Scrunchies has remained a family-run company, with each scrunchie lovingly handmade in Canada. What started as a simple idea has grown into something truly special—celebrating culture, heritage, and identity one scrunchie at a time."
  },
  {
    "slug": "red-rebel-armour",
    "name": "Red Rebel Armour",
    "type": "Brand",
    "category": "Indigenous",
    "url": "https://redrebelarmour.ca/",
    "description": "Red Rebel Armour is an Indigenous-owned streetwear brand built on culture, pride, and community. Rooted in Anishinaabe identity and inspired by street culture, they create bold, meaningful clothing that tells our stories and honours our roots."
  },
  {
    "slug": "okakie",
    "name": "Okakie",
    "type": "Brand",
    "category": "Indigenous",
    "url": "https://www.okakie.com/",
    "description": "OKAKIE is a family-founded brand rooted in the ancestral lands of Fort McKay First Nation. What began as a deeply personal journey has grown into a globally loved label, now shipping to over 190 countries. Created in 2017 by a husband-and-wife team, the brand blends fashion and purpose with a strong sense of community."
  },
  {
    "slug": "resist-clothing-co",
    "name": "Resist Clothing Co",
    "type": "Brand",
    "category": "Indigenous",
    "url": "https://resistclothing.ca/",
    "description": "Resist Clothing Co. is an Indigenous-owned streetwear brand that uses bold design to speak truth. With every piece, the brand amplifies underrepresented voices, sparks real conversations, and pushes back against systems that silence. The art is wearable—but the message runs deep."
  },
  {
    "slug": "dare-foods",
    "name": "Dare Foods",
    "type": "Brand",
    "category": "Snacks",
    "url": "https://www.darefoods.com/",
    "description": "A homegrown snack brand committed to creating treats you'll love."
  },
  {
    "slug": "saltwinds-coffee-co",
    "name": "Saltwinds Coffee Co",
    "type": "Brand",
    "category": "Coffee",
    "url": "https://www.saltwindscoffee.com/",
    "description": "A homegrown coffee brand committed to sourcing and roasting beans that deliver outstanding taste."
  },
  {
    "slug": "eatable-popcorn",
    "name": "Eatable Popcorn",
    "type": "Brand",
    "category": "Snacks",
    "url": "https://eatable.com/",
    "description": "A homegrown snack brand committed to creating treats you'll love."
  },
  {
    "slug": "fratello-coffee-roasters",
    "name": "Fratello Coffee Roasters",
    "type": "Brand",
    "category": "Coffee",
    "url": "https://www.fratellocoffee.com/",
    "description": "A Canadian coffee roaster dedicated to fresh beans, expert roasting, and exceptional flavour."
  },
  {
    "slug": "rhino-coffee-house",
    "name": "Rhino Coffee House",
    "type": "Brand",
    "category": "Coffee",
    "url": "https://rhinocoffeehouse.com/",
    "description": "A Canadian coffee roaster dedicated to fresh beans, expert roasting, and exceptional flavour."
  },
  {
    "slug": "sleep-country",
    "name": "Sleep Country",
    "type": "Brand",
    "category": "Home",
    "url": "https://en.sleepcountry.ca/",
    "description": "Sleep Country started in Vancouver with just four stores and a big idea: that better sleep can change lives. Founded by Christine Magee, Stephen Gunn, and Gordon Lownds, the company has grown into Canada’s leading specialty sleep retailer, with locations coast to coast."
  },
  {
    "slug": "moody-bee",
    "name": "Moody Bee",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://www.moodybee.com/",
    "description": "A Canadian beauty brand committed to clean formulations, quality ingredients, and effective results."
  },
  {
    "slug": "waxetty",
    "name": "Waxetty",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://www.waxetty.ca/",
    "description": "Canadian-made beauty focusing on performance, purity, and products you can feel good about using."
  },
  {
    "slug": "luna-grooming-co",
    "name": "Luna Grooming Co",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://lunagroomingco.com/",
    "description": "LUNA Grooming Co. is a Canadian-made brand crafting upscale grooming products designed to elevate your hair game."
  },
  {
    "slug": "wildpier-beauty",
    "name": "Wildpier Beauty",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://www.wildpier.com/en-ca",
    "description": "Wildpier Beauty is an Indigenous-owned Canadian brand born from a mission to help all skin types feel amazing—naturally."
  },
  {
    "slug": "holos",
    "name": "Holos",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://www.liveholos.com/",
    "description": "This proudly Canadian company creates beauty products that combine innovation with conscious ingredients."
  },
  {
    "slug": "simps-syrups",
    "name": "Simps Syrups",
    "type": "Brand",
    "category": "Beverages",
    "url": "https://simpsmb.com/",
    "description": "Simps Modern Beverage is a proudly Canadian brand launched in 2014 by bartenders-turned-beverage-makers Dave Simpson and Gerry Jobe. What started as a leap from late-night shifts has grown into one of the most innovative names in the beverage world—home to Canada’s first coffee syrup brand, the world’s first vegan Caesar mixes, and a lineup of game-changing products designed to fuel your drinks and your creativity."
  },
  {
    "slug": "muskoka-roastery-coffee-co",
    "name": "Muskoka Roastery Coffee Co",
    "type": "Brand",
    "category": "Coffee",
    "url": "https://www.muskokaroastery.com/",
    "description": "Canadian-roasted coffee bringing quality, freshness, and bold flavour to every cup."
  },
  {
    "slug": "airmiles",
    "name": "Airmiles",
    "type": "Brand",
    "category": "Loyalty",
    "url": "https://www.airmiles.ca/en.html",
    "description": "AIR MILES® Reward Miles is one of Canada’s most recognized loyalty programs, helping shoppers earn miles on everyday purchases—from groceries to gas and beyond. With thousands of partners nationwide, collecting is easy, and the rewards are even better."
  },
  {
    "slug": "nellies",
    "name": "Nellies",
    "type": "Brand",
    "category": "Cleaning",
    "url": "https://nelliesclean.ca/",
    "description": "From laundry soda to dryer balls, everything Nellie’s creates is effective, hypoallergenic, and safe for the whole family—including babies and furry friends. Each product is a tribute to Nellie’s legacy and lovingly shaped by founder James Roberts, her son, who turned his mom’s green cleaning values into a global label."
  },
  {
    "slug": "tru-earth",
    "name": "Tru Earth",
    "type": "Brand",
    "category": "Cleaning",
    "url": "https://ca.tru.earth/",
    "description": "A homegrown cleaning brand committed to products that clean well and feel good to use."
  },
  {
    "slug": "sloane-fine-tea-merchants",
    "name": "Sloane Fine Tea Merchants",
    "type": "Brand",
    "category": "Beverages",
    "url": "https://sloanetea.com/",
    "description": "Sloane Fine Tea Merchants is a Canadian label from Toronto, where tea is treated as a true sensory experience. Every cup is designed to celebrate beauty—through taste, aroma, and appearance."
  },
  {
    "slug": "firebelly-tea",
    "name": "Firebelly Tea",
    "type": "Brand",
    "category": "Beverages",
    "url": "https://www.firebellytea.ca/",
    "description": "A Canadian beverage company crafting refreshing drinks with quality ingredients and authentic flavour."
  },
  {
    "slug": "well-juices",
    "name": "Well Juices",
    "type": "Brand",
    "category": "Beverages",
    "url": "https://www.drinkwell.ca/",
    "description": "A homegrown drink brand delivering refreshment and quality in every sip."
  },
  {
    "slug": "market-candle-company",
    "name": "Market Candle Company",
    "type": "Brand",
    "category": "Home",
    "url": "https://marketcandlecompany.com/",
    "description": "What started on a kitchen counter has grown into a beloved Canadian company with over 100 retail partners across Canada and the U. S. From cozy homes to curated boutiques, Market Candle Co. specializes in its elevated fragrances, minimalist aesthetic, and commitment to clean ingredients."
  },
  {
    "slug": "nala-care",
    "name": "Nala Care",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://nalacare.com/",
    "description": "A homegrown beauty brand delivering effective, thoughtfully crafted products for modern self-care."
  },
  {
    "slug": "blazing-bombs",
    "name": "Blazing Bombs",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://blazingbombs.com/",
    "description": "Blazing Bombs is a Canadian body care label celebrated for its playful, candy-inspired bath bombs and skincare products. Began in 2015 by a former full-time nurse with a love for vibrant scents and feel-good routines, the brand grew from a basement hobby into a full-blown studio and thriving small company."
  },
  {
    "slug": "van-houtte",
    "name": "Van Houtte",
    "type": "Brand",
    "category": "Coffee",
    "url": "https://www.vhcoffeeservices.com/",
    "description": "Van Houtte Coffee Services brings more than 100 years of coffee heritage to the table—literally. As Canada’s leading brand coffee solutions provider, they help companies across the country fuel their day with expertly curated brews, reliable equipment, and friendly local service."
  },
  {
    "slug": "pluck-tea",
    "name": "Pluck Tea",
    "type": "Brand",
    "category": "Beverages",
    "url": "https://pluckteas.com/",
    "description": "This proudly Canadian brand creates beverages that balance great taste with quality craftsmanship."
  },
  {
    "slug": "nature-bee",
    "name": "Nature Bee",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://www.naturebeewraps.ca/",
    "description": "Nature Bee is a sustainability-focused company from Victoria, BC, founded in 2018 by Katie Gamble. What started as a student project in her basement has turned into a growing team of passionate people making simple, low-waste products that actually work—and look good too."
  },
  {
    "slug": "zwicks-pretzels",
    "name": "Zwicks Pretzels",
    "type": "Brand",
    "category": "Snacks",
    "url": "https://zwickspretzels.com/",
    "description": "A Canadian snack brand creating delicious, quality treats made with care and better ingredients."
  },
  {
    "slug": "nektar-coffee-roasters",
    "name": "Nektar Coffee Roasters",
    "type": "Brand",
    "category": "Coffee",
    "url": "https://nektar.ca/",
    "description": "A Canadian coffee roaster dedicated to fresh beans, expert roasting, and exceptional flavour."
  },
  {
    "slug": "awake-chocolate",
    "name": "Awake Chocolate",
    "type": "Brand",
    "category": "Food",
    "url": "https://awakechocolate.com/",
    "description": "From then, AWAKE has grown into Canada’s go-to functional chocolate brand, delivering a tasty way to power through long days, late nights, and everything in between. After a successful pitch onDragon’s Denand surviving the challenges of COVID, the brand came out even stronger—fuelled by passion, resilience, and a whole lot of chocolate."
  },
  {
    "slug": "magic-oats",
    "name": "Magic Oats",
    "type": "Brand",
    "category": "Food",
    "url": "https://www.drinkmagicoats.com/",
    "description": "Magic Oats is a women-led Canadian company that’s shaking up how we do dairy-free. Tired of wasteful cartons and oat milks full of filler, oils, and additives, Magic Oats created something better—clean, creamy oat milk powder you can make fresh in seconds. Just add water and shake!."
  },
  {
    "slug": "up-north-naturals",
    "name": "Up North Naturals",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://www.upnorthnaturals.ca/",
    "description": "Up North Naturals is a Canadian brand built on a love for clean, effective hair care. Launched by Toronto entrepreneur Lisa Keizer, this woman-led brand creates plant-based products designed specifically for textured and curly hair—without harsh chemicals, fillers, or shortcuts."
  },
  {
    "slug": "wellness-monster",
    "name": "Wellness Monster",
    "type": "Brand",
    "category": "Health",
    "url": "https://wellnessmonstersnacks.com/",
    "description": "Wellness Monster is a Canadian, female-founded company reshaping the snack aisle with nutrient-rich, kid-approved bites made from real, clean ingredients. Born from a passion for better snacking, every product is packed with superfoods and crafted to fuel growing minds and bodies—without the junk."
  },
  {
    "slug": "doodle-dogs",
    "name": "Doodle Dogs",
    "type": "Brand",
    "category": "Pets",
    "url": "https://www.doodledogsboutique.com/",
    "description": "Doodle Dogs is a proudly Canadian, sibling-launched pet boutique bringing style, well-crafted, and local flair to the world of dog gear. From launching in Calgary in 2016, the company has grown into a go-to destination for handmade collars, leashes, accessories, and more—featuring over 20 artisan brands from Calgary and across Canada."
  },
  {
    "slug": "1908-barbeque",
    "name": "1908 Barbeque",
    "type": "Brand",
    "category": "Food",
    "url": "https://1908bbq.com/",
    "description": "Born in Wainwright, Alberta, 1908 Barbeque is a proudly Canadian, pitmaster-driven company serving up high-carefully made BBQ rubs with serious flavour. Launched by Marty Yurchak, a BBQ lover with a deep respect for smoky traditions and bold seasoning, 1908 was built on the simple belief that life’s too short for bad barbecue."
  },
  {
    "slug": "salt-mustard",
    "name": "Salt Mustard",
    "type": "Brand",
    "category": "Food",
    "url": "https://saltnmustard.com/",
    "description": "salt + MUSTARD is a Canadian-made celebration of small-batch excellence, where bold flavour meets old-world tradition. Created by chef and maker Olga, the company blends heritage recipes with modern creativity to deliver handcrafted goods that turn everyday meals into something special."
  },
  {
    "slug": "natural-calm",
    "name": "Natural Calm",
    "type": "Brand",
    "category": "Health",
    "url": "https://naturalcalm.ca/",
    "description": "Natural Calm Canada is the country’s trusted source for magnesium supplementation that’s both effective and delicious. Starting in 2005, this family-established company has helped Canadians ease stress, improve sleep, and support better overall health with one essential mineral: magnesium."
  },
  {
    "slug": "1890-natural-bath-co",
    "name": "1890 Natural Bath Co",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://www.1890.ca/",
    "description": "Based in Merrickville, Ontario, 1890 Natural Bath Co. is a Canadian small company creating handmade bath and body products rooted in wellness, science, and sustainability. Every item is crafted in small batches using ethically sourced, paraben-free, and family-safe ingredients—because what goes on your skin should be as pure as what goes into your body."
  },
  {
    "slug": "saaboon",
    "name": "Saaboon",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://saaboon.com/",
    "description": "Based in Ottawa, SAABOON is a proudly Canadian, one-person operation dedicated to crafting plant-based, all-natural skincare with heart. Started by Joulian Tavalloli, SAABOON is over a company—it's a labour of love where every bar of soap is handmade in small batches using the traditional cold-process method."
  },
  {
    "slug": "oak-eve",
    "name": "Oak Eve",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://oakandeve.com/",
    "description": "Oak + Eve is a Canadian, woman-led label rooted in craftsmanship, connection, and style. Launched by Marisa—a proud mom of three, wife, and lifelong coffee lover—Oak + Eve was born from a desire to create beautiful, high-well-crafted accessories that women genuinely love to wear."
  },
  {
    "slug": "tocha-foods",
    "name": "Tocha Foods",
    "type": "Brand",
    "category": "Food",
    "url": "https://tochafoods.com/",
    "description": "Proudly Canadian, this brand creates food products that deliver on flavour and quality."
  },
  {
    "slug": "leopold",
    "name": "Leopold",
    "type": "Brand",
    "category": "Clothing",
    "url": "https://leopoldstavern.com/",
    "description": "A homegrown fashion label delivering on-trend pieces that work for real Canadian lifestyles."
  },
  {
    "slug": "toboggan-canada",
    "name": "Toboggan Canada",
    "type": "Brand",
    "category": "Clothing",
    "url": "https://toboggancanada.com/",
    "description": "The name “Toboggan” itself honours Indigenous ingenuity. These long, narrow sleds were once used to transport people and supplies across wintry terrain. What began as a tool of necessity evolved into a national pastime, and eventually a competitive winter sport. Toboggan Canada channels that same spirit of resilience, tradition, and pure love for the outdoors in every piece it creates."
  },
  {
    "slug": "nutracelle",
    "name": "Nutracelle",
    "type": "Brand",
    "category": "Health",
    "url": "https://nutracelle.com/",
    "description": "A homegrown health brand dedicated to supporting your wellness journey with effective formulations."
  },
  {
    "slug": "pestle-pods",
    "name": "Pestle Pods",
    "type": "Brand",
    "category": "Food",
    "url": "https://pestleandpods.com/",
    "description": "A homegrown food brand committed to great taste and honest ingredients."
  },
  {
    "slug": "early-robin",
    "name": "Early Robin",
    "type": "Brand",
    "category": "Clothing",
    "url": "https://premiernuts.ca/",
    "description": "A homegrown fashion label delivering on-trend pieces that work for real Canadian lifestyles."
  },
  {
    "slug": "yukon-soaps",
    "name": "Yukon Soaps",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://yukonsoaps.com/",
    "description": "A Canadian beauty brand committed to clean formulations, quality ingredients, and effective results."
  },
  {
    "slug": "indogo-arrows",
    "name": "Indogo Arrows",
    "type": "Brand",
    "category": "Clothing",
    "url": "https://indigoarrows.ca/",
    "description": "Over just design, Indigo Arrows is a movement to restore representation in the built environment. It’s about bringing ancestral art into everyday life—out of museum cases and into living rooms, bedrooms, and shared spaces."
  },
  {
    "slug": "bare-activewear",
    "name": "Bare Activewear",
    "type": "Brand",
    "category": "Clothing",
    "url": "https://bareactivewear.com/",
    "description": "Bäre Activewear is more than just workout gear—it’s made for real life. Designed in Calgary for Canadian women, their collection of bras, leggings, joggers, and athleisure pieces blends support, style, and stretch. Every piece is crafted to feel good during workouts, school runs, or just lounging around—you can sweat, stretch, and step out all in the same outfit."
  },
  {
    "slug": "poppy-peonies",
    "name": "Poppy Peonies",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://poppyandpeonies.com/",
    "description": "Poppy & Peonies is a Canadian, Métis-founded brand on a mission to make accessories that work as hard as you do. Whether you’re balancing boardrooms or baby bottles, their vegan leather bags combine style, organization, and comfort—so you can tackle your day with ease (and pockets!)."
  },
  {
    "slug": "jack59",
    "name": "Jack59",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://www.jack59.ca/",
    "description": "Born from a mother-daughter moment and fuelled by a passion for sustainable beauty, Jack59 is a Canadian brand redefining hair care with pH-balanced, plastic-free shampoo and conditioner bars that actually work."
  },
  {
    "slug": "big-willys-soap",
    "name": "Big Willys Soap",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://www.bigwillysoap.ca/",
    "description": "This proudly Canadian company creates beauty products that combine innovation with conscious ingredients."
  },
  {
    "slug": "ener-life",
    "name": "Ener Life",
    "type": "Brand",
    "category": "Health",
    "url": "https://www.ener-life.com/",
    "description": "Born out of a shake-up in the vitamin world, Ener-Life was created by a small but passionate Canadian team who refused to settle for corporate takeovers and generic formulas. When the vitamin C brand they once supported was bought by Big Pharma, they banded together to do something different—something better."
  },
  {
    "slug": "the-brick",
    "name": "The Brick",
    "type": "Brand",
    "category": "Home",
    "url": "https://www.thebrick.com/",
    "description": "Proudly began in Edmonton, Alberta, The Brick is helping Canadians turn houses into homes for over 50 years. With more than 200 locations across the country—including The Brick, The Brick Mattress Store, The Brick Super Store, and The Brick Outlet—they’ve become a trusted go-to for carefully made furniture, mattresses, appliances, and electronics at unbeatable prices."
  },
  {
    "slug": "bothwell-cheese",
    "name": "Bothwell Cheese",
    "type": "Brand",
    "category": "Food",
    "url": "https://www.bothwellcheese.com/",
    "description": "Proudly Canadian, this brand creates food products that deliver on flavour and quality."
  },
  {
    "slug": "serendipity-soy-candles",
    "name": "Serendipity Soy Candles",
    "type": "Brand",
    "category": "Home",
    "url": "https://serendipitycandlefactory.com/",
    "description": "For over two decades, Serendipity Soy Candles has been lighting up homes across Canada with clean-burning, all-natural soy candles made with love, care, and purpose. Began in 2003 and now proudly based in Collingwood, Ontario, each candle is hand-poured in small batches using pure soy wax, cotton wicks, and classic, calming scents like lavender and eucalyptus."
  },
  {
    "slug": "rexall",
    "name": "Rexall",
    "type": "Brand",
    "category": "Pharmacy",
    "url": "https://www.rexall.ca/",
    "description": "With a history stretching back over 120 years, Rexall has grown from humble apothecary beginnings into one of Canada’s most trusted pharmacy brands. Today, with nearly 400 locations and thousands of passionate team members, Rexall supports the health and wellness of Canadians from coast to coast."
  },
  {
    "slug": "monika-succs",
    "name": "Monika Succs",
    "type": "Brand",
    "category": "Home",
    "url": "https://www.monikasuccs.com/",
    "description": "A Canadian home goods brand creating quality products that bring style and function to your space."
  },
  {
    "slug": "clay-by-ally",
    "name": "Clay By Ally",
    "type": "Brand",
    "category": "Home",
    "url": "https://claybyally.com/",
    "description": "Clay by Ally is where bold design, playful colour, and precision craftsmanship collide. Founded by Ally, a multi-talented artist and Computer Engineering student at Memorial University, the label is a fusion of art and tech, inspired by a lifelong love of creating."
  },
  {
    "slug": "local-laundry",
    "name": "Local Laundry",
    "type": "Brand",
    "category": "Cleaning",
    "url": "https://locallaundry.ca/",
    "description": "Every piece of clothing is proudly made in Canada, supporting local jobs, reducing environmental impact, and showcasing the craftsmanship that comes from keeping production close to home. Local Laundry’s garments aren’t just stylish—they’re meaningful. Whether you rep your hometown or support a cause you care about, this is apparel with impact."
  },
  {
    "slug": "ergogenics",
    "name": "Ergogenics",
    "type": "Brand",
    "category": "Health",
    "url": "https://www.ergogenicsnutrition.com/",
    "description": "Canadian-made wellness products delivering quality nutrition and trusted ingredients."
  },
  {
    "slug": "becks-broth",
    "name": "Becks Broth",
    "type": "Brand",
    "category": "Food",
    "url": "https://www.becksbroth.com/",
    "description": "Beck’s Broth began with a simple mission: make real nourishment easy (and tasty). Created by Beck—a registered holistic nutritionist—and powered by her business partner Domenique, an eco-conscious foodie with a knack for sustainable solutions, the duo dreamed up a way to bring bone broth into daily routines without the fuss."
  },
  {
    "slug": "dainty-rice",
    "name": "Dainty Rice",
    "type": "Brand",
    "category": "Food",
    "url": "https://dainty.ca/",
    "description": "A Canadian food brand crafting quality products with care, flavour, and local ingredients."
  },
  {
    "slug": "mccoy-teas",
    "name": "Mccoy Teas",
    "type": "Brand",
    "category": "Beverages",
    "url": "https://www.mccoyteascanada.com/",
    "description": "A Canadian beverage company crafting refreshing drinks with quality ingredients and authentic flavour."
  },
  {
    "slug": "ang-hill",
    "name": "Ang Hill",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://www.anghill.com/",
    "description": "Ang Hill started as a dream in a little girl’s heart and grew into a full-blown fashion company rooted in comfort, confidence, and conscious design. Founded by Edmonton’s own Ang Johnson (formerly Hillaby), the brand is all about making everyday style feel effortless."
  },
  {
    "slug": "vancouver-candle-co",
    "name": "Vancouver Candle Co",
    "type": "Brand",
    "category": "Home",
    "url": "https://www.vancouvercandleco.com/",
    "description": "Vancouver Candle Co. blends art, memory, and scent into every candle they create. What started as a love for beautiful craftsmanship has evolved into a beloved Canadian label—now led by Kathy Lee, a former production manager turned owner, whose creative roots in fashion and jewellery bring a fresh spark to everything they do."
  },
  {
    "slug": "bush-berry-tea",
    "name": "Bush Berry Tea",
    "type": "Brand",
    "category": "Beverages",
    "url": "https://bushberry.ca/",
    "description": "Bush Berry Tea blends the wisdom of herbal traditions with a deep respect for the earth. This Canadian, female-owned brand produces organic tea blends using clean, high-quality ingredients sourced from small, sustainable farms. No chemicals. No shortcuts. Just real, honest herbs that taste as good as they feel."
  },
  {
    "slug": "loon-kombucha",
    "name": "Loon Kombucha",
    "type": "Brand",
    "category": "Beverages",
    "url": "https://loonkombucha.com/",
    "description": "Established in 2016 on the shores of Otty Lake, Loon Kombucha set out to change how kombucha should taste—fresh, smooth, and naturally crisp. Inspired by the purity of the loons that glided past the cottage windows during early brews, the company was born with a promise to be different."
  },
  {
    "slug": "good-vibes-juice-co",
    "name": "Good Vibes Juice Co",
    "type": "Brand",
    "category": "Beverages",
    "url": "https://goodvibesjuice.com/",
    "description": "Good Vibes Juice Co crafts small-batch wellness shots made with all-natural, nutrient-rich ingredients known for their immune-supporting benefits. Rooted in holistic traditions and fuelled by a belief in the body’s natural ability to heal, each shot is a simple way to support everyday health."
  },
  {
    "slug": "myni",
    "name": "Myni",
    "type": "Brand",
    "category": "Cleaning",
    "url": "https://myni.ca/",
    "description": "This proudly Canadian company formulates cleaning solutions that work hard without harsh chemicals."
  },
  {
    "slug": "the-unscented-company",
    "name": "The Unscented Company",
    "type": "Brand",
    "category": "Cleaning",
    "url": "https://unscentedco.com/",
    "description": "The Unscented Label is all about getting back to basics—with home and body care that works, without all the added fragrance. Based in Canada, they make everything from dish soap to shampoo with clean, effective ingredients and packaging that’s kinder to the planet."
  },
  {
    "slug": "subi-superfood",
    "name": "Subi Superfood",
    "type": "Brand",
    "category": "Food",
    "url": "https://getsubi.com/",
    "description": "Subi is a Canadian wellness label based in Vancouver that’s making it easier to get your greens—without the hassle of juicing or bulky produce hauls. Their best-selling SUBI Greens Super Juice Mix is made with 100% natural, whole-food ingredients and nothing synthetic or lab-made."
  },
  {
    "slug": "zavida-coffee-roasters",
    "name": "Zavida Coffee Roasters",
    "type": "Brand",
    "category": "Coffee",
    "url": "https://zavida.com/",
    "description": "Canadian-roasted coffee bringing quality, freshness, and bold flavour to every cup."
  },
  {
    "slug": "newfoundland-tea-company",
    "name": "Newfoundland Tea Company",
    "type": "Brand",
    "category": "Beverages",
    "url": "https://www.thenewfoundlandteaco.com/",
    "description": "Born from a love of food, community, and comforting cups of tea, The Newfoundland Tea Company brings the rich culture of the island to life through high-well-crafted organic loose leaf blends. What began as a small inn and bistro in Gambo has blossomed into a beloved tea company rooted in Newfoundland’s warmth, hospitality, and deep appreciation for quality."
  },
  {
    "slug": "landish",
    "name": "Landish",
    "type": "Brand",
    "category": "Food",
    "url": "https://landish.ca/",
    "description": "A homegrown food brand committed to great taste and honest ingredients."
  },
  {
    "slug": "routine-natural-beauty",
    "name": "Routine Natural Beauty",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://routinenaturalbeauty.com/",
    "description": "Founded by Canadian sisters Neige and Pippa in the foothills of the Rockies, Routine is redefining personal care with natural products that celebrate scent, individuality, and joy. Recognized for their cult-favourite natural deodorants, Routine produces personal care that smells incredible, works like a charm, and is packaged with the planet in mind."
  },
  {
    "slug": "william-ashley",
    "name": "William Ashley",
    "type": "Brand",
    "category": "Home",
    "url": "https://www.williamashley.com/",
    "description": "Established by the visionary Tillie Abrams, William Ashley was one of the first retailers in Canada to offer a wedding registry. Today, the company still honour her legacy by combining impeccable service with a modern take on luxury and lifestyle."
  },
  {
    "slug": "towne-goods",
    "name": "Towne Goods",
    "type": "Brand",
    "category": "Home",
    "url": "https://townegoods.com/",
    "description": "Towne Goods is a lifestyle shop rooted in sustainability, showcasing beautifully made essentials for everyday life. From handcrafted homeware to one-of-a-kind finds by independent makers around the world, every item is chosen with care."
  },
  {
    "slug": "monsieur-cocktail",
    "name": "Monsieur Cocktail",
    "type": "Brand",
    "category": "Beverages",
    "url": "https://www.monsieur-cocktail.com/en",
    "description": "Monsieur Cocktail was born from a simple idea: that crafting delicious cocktails at home should be easy, fun, and made with real ingredients. Created in 2015 by Quebec-based chef and mixologist Patrice Plante, the brand was created out of frustration with artificial bar mixes and a desire to bring kitchen-level quality to the glass."
  },
  {
    "slug": "thoughtfully",
    "name": "Thoughtfully",
    "type": "Brand",
    "category": "Home",
    "url": "https://www.thoughtfully.com/",
    "description": "Thoughtfully isn’t just a gifting business—it’s a celebration of connection. From cozy tea nights and sweet treats to hot sauce challenges and cocktail kits, Thoughtfully creates curated gift experiences designed to spark joy and make people feel seen, appreciated, and loved."
  },
  {
    "slug": "duchess-cocktails",
    "name": "Duchess Cocktails",
    "type": "Brand",
    "category": "Beverages",
    "url": "https://duchesscocktails.com/",
    "description": "Duchess Cocktails blends sophistication with convenience, offering beautifully crafted, ready-to-serve cocktails that bring the bar experience home—without the extra sugar or fuss. Launched in Vancouver by Olivia, a fintech-marketer-turned-beverage-entrepreneur, Duchess was born from a simple in-flight thought: “Why can’t I get a good cocktail up here?”."
  },
  {
    "slug": "rosso-coffee-roasters",
    "name": "Rosso Coffee Roasters",
    "type": "Brand",
    "category": "Coffee",
    "url": "https://www.rossocoffeeroasters.com/",
    "description": "This proudly Canadian company roasts premium coffee beans with care and precision."
  },
  {
    "slug": "loft-coffee-co",
    "name": "Loft Coffee Co",
    "type": "Brand",
    "category": "Coffee",
    "url": "https://www.loftcoffeeco.ca/",
    "description": "A homegrown coffee brand committed to sourcing and roasting beans that deliver outstanding taste."
  },
  {
    "slug": "kingdom-coffee",
    "name": "Kingdom Coffee",
    "type": "Brand",
    "category": "Coffee",
    "url": "https://www.kingdomcoffee.ca/",
    "description": "This proudly Canadian company roasts premium coffee beans with care and precision."
  },
  {
    "slug": "phil-sebastian-coffee-roasters",
    "name": "Phil Sebastian Coffee Roasters",
    "type": "Brand",
    "category": "Coffee",
    "url": "https://philsebastian.com/",
    "description": "Based in Calgary, Phil & Sebastian Coffee Roasters is committed to pushing the boundaries of specialty coffee—not just in Canada, but around the globe. From sourcing to roasting to brewing, their focus is simple: raise the bar, then raise it again."
  },
  {
    "slug": "canadian-heritage-roasting-co",
    "name": "Canadian Heritage Roasting Co",
    "type": "Brand",
    "category": "Coffee",
    "url": "https://canadianheritageroastingco.com/",
    "description": "Canadian Heritage Roasting Co. was born in the backcountry over a simple cup of percolated coffee—and a shared love for the outdoors. Launched by two former wildland firefighters, this Alberta-based company blends bold, small-batch coffee with a deep respect for nature."
  },
  {
    "slug": "big-mountain-coffee-roasters",
    "name": "Big Mountain Coffee Roasters",
    "type": "Brand",
    "category": "Coffee",
    "url": "https://bigmountaincoffeeroasters.ca/",
    "description": "Big Mountain Coffee Roasters is all about great coffee without the fluff. Born in the heart of Canada, this roastery serves up a wide range of single-origin beans and house blends—over 18 in total—that are carefully roasted for smooth, bold flavour in every cup."
  },
  {
    "slug": "gry-mattr",
    "name": "Gry Mattr",
    "type": "Brand",
    "category": "Coffee",
    "url": "https://www.grymattr.ca/",
    "description": "Canadian-roasted coffee bringing quality, freshness, and bold flavour to every cup."
  },
  {
    "slug": "qe-home",
    "name": "Qe Home",
    "type": "Brand",
    "category": "Home",
    "url": "https://www.qehomelinens.com/",
    "description": "Now a proudly Canadian company with over 70 stores coast-to-coast, QE Home is celebrated for beautiful, high-well-crafted bedding made with care. Their in-house design team works year-round to create collections that feel like you—stylish, functional, and made to last. Whether it's buttery-soft bamboo sheets or seasonally designed duvet sets, everything is crafted with comfort, sustainability, and real life in mind."
  },
  {
    "slug": "mrs-greenway",
    "name": "Mrs Greenway",
    "type": "Brand",
    "category": "Cleaning",
    "url": "https://www.mrsgreenway.ca/",
    "description": "Since opening in 2014, Mrs. Greenway has expanded to serve more communities with shops in Grimsby and Elora. Each store is a welcoming, judgement-free space where anyone—no matter where they are on their sustainability journey—can ask questions, explore eco-conscious swaps, and feel empowered to make small, meaningful changes."
  },
  {
    "slug": "organic-traditions",
    "name": "Organic Traditions",
    "type": "Brand",
    "category": "Food",
    "url": "https://ca.organictraditions.com/",
    "description": "A Canadian food brand crafting quality products with care, flavour, and local ingredients."
  },
  {
    "slug": "sugar-blossom-jewelry",
    "name": "Sugar Blossom Jewelry",
    "type": "Brand",
    "category": "Jewellery",
    "url": "https://shopsugarblossom.com/",
    "description": "Born in Winnipeg in 2008, Sugar Blossom Jewelry began as a creative spark from founder Kelli Miller—who first started crafting one-of-a-kind pieces using her mom’s old jewellery and vintage finds. What started as a personal passion quickly caught attention, and soon, her handmade designs were being stopped on the streets of Toronto."
  },
  {
    "slug": "chocolats-favoris",
    "name": "Chocolats Favoris",
    "type": "Brand",
    "category": "Food",
    "url": "https://www.chocolatsfavoris.com/en",
    "description": "Proudly Canadian, this brand creates food products that deliver on flavour and quality."
  },
  {
    "slug": "brust-protein-coffee",
    "name": "Brust Protein Coffee",
    "type": "Brand",
    "category": "Beverages",
    "url": "https://www.brustbeverages.com/",
    "description": "This proudly Canadian brand creates beverages that balance great taste with quality craftsmanship."
  },
  {
    "slug": "yupik",
    "name": "Yupik",
    "type": "Brand",
    "category": "Food",
    "url": "https://yupik.com/en/",
    "description": "Yupik is a family-owned Canadian company that’s all about simple, quality ingredients you can feel good about. From Montréal, they offer a huge variety of snacks and pantry staples—from organic nuts and dried fruit to baking essentials, trail mixes, sweets, and more."
  },
  {
    "slug": "genuine-tea",
    "name": "Genuine Tea",
    "type": "Brand",
    "category": "Beverages",
    "url": "https://www.genuinetea.ca/",
    "description": "Genuine Tea is a Toronto-based company built on a shared love of travel, culture, and exceptional loose leaf tea. Established by David and Sarah—an Englishman and a Canadian who met at a ski resort in B. C. —their story is steeped in exploration. After spending nearly five years in Taiwan studying Mandarin and immersing themselves in the world of handcrafted teas, they came home to Canada with a mission: to make truly great tea more accessible and meaningful."
  },
  {
    "slug": "tease-wellness",
    "name": "Tease Wellness",
    "type": "Brand",
    "category": "Beverages",
    "url": "https://teasetea.com/",
    "description": "Tease is a Canadian, women-owned brand that’s all about helping you feel your best—through every hustle, high, and hard moment. It was founded by someone who knows burnout firsthand: a former luxury hospitality pro who swapped 6 cups of coffee a day for functional teas that actually helped her sleep, focus, and stay well."
  },
  {
    "slug": "lovenote-bride",
    "name": "Lovenote Bride",
    "type": "Brand",
    "category": "Wedding",
    "url": "https://lovenotebride.com/",
    "description": "Lovenote Bride is a Canadian bridal label bringing fresh, thoughtful design to wedding dress shopping. With boutiques in Vancouver, Calgary, and Winnipeg—and a light-filled design studio in Vancouver—Lovenote designs handmade gowns that blend comfort, confidence, and serious style."
  },
  {
    "slug": "eight-ounce-coffee",
    "name": "Eight Ounce Coffee",
    "type": "Brand",
    "category": "Coffee",
    "url": "https://eightouncecoffee.ca/",
    "description": "Operating from Calgary with team members in Montréal and Toronto, Eight Ounce bridges the gap between the best coffee gear in the world and the Canadian coffee community. By importing at scale and handling logistics, they make it easier (and more affordable) for local cafés and retailers to access the high-end tools they need—no knock-offs, no cutting corners."
  },
  {
    "slug": "blair-nadeau",
    "name": "Blair Nadeau",
    "type": "Brand",
    "category": "Jewellery",
    "url": "https://www.blairnadeau.com/",
    "description": "Blair Nadeau Bridal Adornments is a Canadian label creating one-of-a-kind bridal accessories that are made to feel just as special as the person wearing them. Starting in 2009, Blair and her small team have been designing and handcrafting every piece—veils, crowns, headpieces, and jewelry—out of their cozy studio just outside Toronto."
  },
  {
    "slug": "honey-candles",
    "name": "Honey Candles",
    "type": "Brand",
    "category": "Home",
    "url": "https://www.honeycandles.com/",
    "description": "Honey Candles is a family-run Canadian company making beautiful, 100% pure beeswax candles by hand—right in the heart of the mountains near Kaslo, B. For over 30 years, their small team remains perfecting the craft, becoming a go-to for anyone who loves the warm glow and natural scent of beeswax. C."
  },
  {
    "slug": "fern-petal",
    "name": "Fern Petal",
    "type": "Brand",
    "category": "Jewellery",
    "url": "https://fernandpetal.ca/",
    "description": "Fern & Petal is a small, family-run brand from Vancouver, B. C. They make pure essential oils and natural wellness products you can feel good about. It all started with a simple frustration: they couldn’t find clean, high-carefully made products made close to home—so they decided to make their own."
  },
  {
    "slug": "chayle-jewellery",
    "name": "Chayle Jewellery",
    "type": "Brand",
    "category": "Jewellery",
    "url": "https://shop.chayle.ca/",
    "description": "Chayle Jewellery is a Canadian company creating minimalist, meaningful pieces that feel like wearable art. Designed and handmade in Ottawa by artist goldsmith Chayle Bowen, each piece is crafted with care using recycled metals, ethically sourced gemstones, and traditional techniques passed down through generations."
  },
  {
    "slug": "bluboho",
    "name": "Bluboho",
    "type": "Brand",
    "category": "Jewellery",
    "url": "https://www.bluboho.com/",
    "description": "bluboho designs fine jewellery with soul—pieces that are as meaningful as the moments they mark. Created in 2010 by two women with a shared dream, the brand was born from a desire to offer something different: jewellery that’s ethically made, rich with symbolism, and designed to connect us to ourselves, to others, and to the natural world."
  },
  {
    "slug": "poppy-finch",
    "name": "Poppy Finch",
    "type": "Brand",
    "category": "Jewellery",
    "url": "https://www.poppyfinch.com/",
    "description": "Poppy Finch is a Vancouver-based jewellery brand that believes fine jewellery should feel just as good as it looks. Starting in 2014, they’ve been making delicate, timeless pieces you can wear every day—designed with intention, made with care, and crafted to last."
  },
  {
    "slug": "hestia-jewels",
    "name": "Hestia Jewels",
    "type": "Brand",
    "category": "Jewellery",
    "url": "https://hestiajewels.com/",
    "description": "Hestia Jewels is a Toronto-based jewellery brand inspired by the beauty of everyday moments, milestones, and memories. Named after the Greek goddess of home and family, Hestia is all about creating pieces that feel personal—little treasures you’ll reach for often and keep forever."
  },
  {
    "slug": "attic",
    "name": "Attic",
    "type": "Brand",
    "category": "Jewellery",
    "url": "https://atticgold.com/",
    "description": "ATTIC is a small jewellery studio based in Toronto, created by Melissa Gobeil and Susan Shaw—two goldsmiths who met at school and decided to build something meaningful together. They wanted to create fine jewellery that was simple, well-made, and didn’t cut corners when it came to ethics or sustainability."
  },
  {
    "slug": "celi",
    "name": "Celi",
    "type": "Brand",
    "category": "Jewellery",
    "url": "https://www.shopceli.com/",
    "description": "CELI was created with a simple belief: every moment in life deserves to be celebrated. Founded by Chau and Trang, two women passionate about storytelling through design, CELI provides solid gold jewellery that reflects who you are, where you’ve been, and where you’re going."
  },
  {
    "slug": "dean-davidson",
    "name": "Dean Davidson",
    "type": "Brand",
    "category": "Jewellery",
    "url": "https://www.deandavidson.ca/",
    "description": "Dean Davidson is a Canadian jewellery brand known for elegant, easy-to-wear designs that tell a story. Started by Dean himself, what started as a leap from farm life into the creative unknown has grown into a globally recognized brand worn by style icons and everyday people alike."
  },
  {
    "slug": "anne-sportun",
    "name": "Anne Sportun",
    "type": "Brand",
    "category": "Jewellery",
    "url": "https://www.annesportun.com/",
    "description": "Anne Sportun Fine Jewellery is a Toronto-based label built on creativity, connection, and craftsmanship. What began in the late '80s as one artist’s passion has grown into a mother-daughter partnership that still evolve—always rooted in the belief that jewellery should be both meaningful and beautifully made."
  },
  {
    "slug": "pilgram",
    "name": "Pilgram",
    "type": "Brand",
    "category": "Jewellery",
    "url": "https://pilgrim.ca/",
    "description": "In 2014, the story continued in Canada when Robert P. Hayes brought the label home to Montreal after discovering it during his time in Denmark. Since then, Pilgrim has become a proudly Canadian operation, blending Scandinavian design with Canadian warmth and values."
  },
  {
    "slug": "pearlory",
    "name": "Pearlory",
    "type": "Brand",
    "category": "Jewellery",
    "url": "https://pearlory.com/",
    "description": "Proudly Canadian, this jeweller crafts pieces that celebrate quality materials and thoughtful design."
  },
  {
    "slug": "cuchara-jewelry",
    "name": "Cuchara Jewelry",
    "type": "Brand",
    "category": "Jewellery",
    "url": "https://www.cuchara.ca/",
    "description": "Cuchara is a Toronto-based jewellery company started by designer Edi Candeo, who first started creating pieces by repurposing vintage spoons in Victoria, B. C. What began as a small, creative project has grown into a full-fledged collection—still made in small batches, still rooted in intention, and still proudly women-owned and operated."
  },
  {
    "slug": "suetables",
    "name": "Suetables",
    "type": "Brand",
    "category": "Jewellery",
    "url": "https://suetables.com/",
    "description": "Suetables is a Canadian jewellery label built around meaning, memory, and personal connection. Founded in 2005 by Sue Henderson, what began as a creative outlet—hand-stamping names onto vintage spoons—quickly grew into a heartfelt way to mark life’s moments. From initials close to the heart to meaningful symbols, each piece is designed to carry a story."
  },
  {
    "slug": "vitaly",
    "name": "Vitaly",
    "type": "Brand",
    "category": "Jewellery",
    "url": "https://www.vitalydesign.com/",
    "description": "Vitaly is a Toronto-based brand designing genderless jewellery from 100% recycled stainless steel. From 2011, the goal has been simple: to create pieces that are built to last, made responsibly, and designed to reflect the world we live in now."
  },
  {
    "slug": "par-ici",
    "name": "Par Ici",
    "type": "Brand",
    "category": "Jewellery",
    "url": "https://paricijewellery.com/",
    "description": "Par Ici is a Toronto-based jewellery company started by Eve Tobolka and Alynne Lavigne—two friends who met through a shared love of vintage jewellery and kept running into each other at their university co-op building. They started out collecting and selling vintage pieces in Toronto, New York, and LA, and eventually began designing their own."
  },
  {
    "slug": "mackenzie-jones",
    "name": "Mackenzie Jones",
    "type": "Brand",
    "category": "Jewellery",
    "url": "https://mmackenziejones.com/",
    "description": "Mackenzie Jones is a Canadian jewellery company built on creativity, nature, and a whole lot of heart. It all started with Megan Mackenzie Jones—a born artist who followed her creative instincts from a young age and never looked back. Her love of Canada, from coast to coast, and her connection to the land shows up in everything she produces."
  },
  {
    "slug": "lisa-gozlan",
    "name": "Lisa Gozlan",
    "type": "Brand",
    "category": "Jewellery",
    "url": "https://www.lisagozlan.com/",
    "description": "Lisa Gozlan is a jewellery label created by Lisa and Ryan Gozlan, a husband-and-wife team who brought their shared love for style and craftsmanship into one vision. Lisa, a longtime stylist, always saw jewellery as more than an accessory—it was part of how you show up in the world. Ryan, a fifth-generation jeweller, had the knowledge and care to bring those ideas to life."
  },
  {
    "slug": "pyrrha",
    "name": "Pyrrha",
    "type": "Brand",
    "category": "Jewellery",
    "url": "https://pyrrha.com/en-ca",
    "description": "Proudly Canadian, this jeweller crafts pieces that celebrate quality materials and thoughtful design."
  },
  {
    "slug": "this-ilk",
    "name": "This Ilk",
    "type": "Brand",
    "category": "Jewellery",
    "url": "https://thisilk.com/",
    "description": "A Canadian jewellery designer creating beautiful, quality pieces with attention to craft and detail."
  },
  {
    "slug": "lovers-tempo-jewelry",
    "name": "Lovers Tempo Jewelry",
    "type": "Brand",
    "category": "Jewellery",
    "url": "https://loverstempo.com/",
    "description": "Over the years, the booth turned into a studio, and the team grew to include her company partner Leslie, plus a group of creative women who help bring the vision to life. From their studio in Vancouver, they design jewellery meant to make you feel like your best self—polished, light, and ready for whatever your day holds."
  },
  {
    "slug": "anvil-jewellery",
    "name": "Anvil Jewellery",
    "type": "Brand",
    "category": "Jewellery",
    "url": "https://anviljewellery.ca/",
    "description": "Anvil Jewellery has been part of Toronto’s story starting in 1965. It all began with Henry and Vickie Kasekamp, who came to Canada after the war and started something small with big heart. They believed in doing good work, treating people right, and making jewellery that would last—and those same values are still behind everything we do."
  },
  {
    "slug": "true-bijoux",
    "name": "True Bijoux",
    "type": "Brand",
    "category": "Jewellery",
    "url": "https://truebijoux.ca/",
    "description": "True Bijoux opened its doors in 2006 as the sister store to Ottawa’s long-standing favourite, Howard Fine Jewellers. Established by the Jewelry Sisters, Lindsay and Stephanie Appotive, the boutique has become a go-to destination for those seeking beautifully curated jewellery."
  },
  {
    "slug": "rampage-coffee-co",
    "name": "Rampage Coffee Co",
    "type": "Brand",
    "category": "Coffee",
    "url": "https://rampagecoffee.com/",
    "description": "A portion of every sale goes toward organizations like Wounded Warriors Canada, River Valley Resilience Retreat, and The Royal Canadian Legion. Through every bag brewed and every cup poured, Rampage is helping support the people and families who serve."
  },
  {
    "slug": "daryls-bars",
    "name": "Daryls Bars",
    "type": "Brand",
    "category": "Snacks",
    "url": "https://darylsbars.com/",
    "description": "A homegrown snack brand committed to creating treats you'll love."
  },
  {
    "slug": "a-spice-affair",
    "name": "A Spice Affair",
    "type": "Brand",
    "category": "Food",
    "url": "https://aspiceaffair.com/",
    "description": "A Spice Affair was launched by Ayman Saifi, a fourth-generation spice merchant with a deep love for bold flavours and real, honest ingredients. Starting in 2016, the brand has focused on bringing high-quality, chemical-free spices and seasonings to food lovers across Canada and beyond."
  },
  {
    "slug": "pet-planet",
    "name": "Pet Planet",
    "type": "Brand",
    "category": "Pets",
    "url": "https://petplanet.ca/",
    "description": "At the heart of it all is a simple belief: better food and better choices lead to better lives for our pets. Whether you're walking into a store or shopping online, Pet Planet is there to help you make informed decisions—because pets are family, and they deserve the very best."
  },
  {
    "slug": "rocky-mountain-barber-company",
    "name": "Rocky Mountain Barber Company",
    "type": "Brand",
    "category": "Beauty",
    "url": "https://rockymountainbarber.ca/",
    "description": "Starting in 2015, Rocky Mountain Barber Business remains helping men across Canada (and beyond) take care of their skin, beards, and hair with simple, high-carefully made products. Everything is made with clean ingredients, designed to work, and infused with subtle, masculine scents that feel natural—not overpowering."
  },
  {
    "slug": "hungry-buddha",
    "name": "Hungry Buddha",
    "type": "Brand",
    "category": "Snacks",
    "url": "https://buddhabrands.ca/",
    "description": "This proudly Canadian company crafts snacks that deliver on taste, quality, and satisfaction."
  },
  {
    "slug": "the-6th-scent-candle",
    "name": "The 6Th Scent Candle",
    "type": "Brand",
    "category": "Home",
    "url": "https://www.the6thscentcandle.com/",
    "description": "The 6th Scent Candle is a small candle business located in Langley, British Columbia. Back in 2016 it started with just two people—Allie and Tom—making candles by hand and packing orders themselves. With the support of their customers, the business has grown, but the heart of it hasn’t changed."
  },
  {
    "slug": "the-dsrt-company",
    "name": "The Dsrt Company",
    "type": "Brand",
    "category": "Food",
    "url": "https://thedsrtcompany.com/",
    "description": "This Canadian company brings authentic taste and quality to tables across the country."
  },
  {
    "slug": "freshfield-supplements",
    "name": "Freshfield Supplements",
    "type": "Brand",
    "category": "Health",
    "url": "https://freshfield.life/",
    "description": "A Canadian health brand committed to quality supplements, natural ingredients, and wellness support."
  },
  {
    "slug": "big-bear-trading-company",
    "name": "Big Bear Trading Company",
    "type": "Brand",
    "category": "Clothing",
    "url": "https://bigbeartradingco.com/",
    "description": "Big Bear Trading Brand isn’t just a store — it’s a reflection of the place it calls home. Locally owned and family-run, it was started by Chelsea and Jon Cudmore in Banff in 2021, right in the middle of a pandemic. What began as one shop quickly became two, with their second location opening in Canmore the following year."
  },
  {
    "slug": "centex",
    "name": "Centex",
    "type": "Brand",
    "category": "Clothing",
    "url": "https://www.centexpetroleum.com/",
    "description": "Centex remains proudly Canadian and fully independent starting in 1986. What started as one location in Calgary’s Inglewood neighbourhood has grown to over 150 stations across the country. Through it all, the goal has stayed the same: offer great fuel at a fair price, and treat people right."
  },
  {
    "slug": "dodjivi",
    "name": "Dodjivi",
    "type": "Brand",
    "category": "Indigenous",
    "url": "https://www.dodjivi.com/",
    "description": "This Indigenous Canadian company creates products that honour tradition while embracing modern design and innovation."
  },
  {
    "slug": "nikihk",
    "name": "Nikihk",
    "type": "Brand",
    "category": "Indigenous",
    "url": "https://www.nikihk.ca/",
    "description": "Proudly Indigenous-owned, this brand shares culture and craft through thoughtfully made products."
  },
  {
    "slug": "milk-and-memories",
    "name": "Milk And Memories",
    "type": "Brand",
    "category": "Food",
    "url": "https://milkandmemories.ca/",
    "description": "This Canadian company brings authentic taste and quality to tables across the country."
  },
  {
    "slug": "bn3th",
    "name": "Bn3Th",
    "type": "Brand",
    "category": "Intimates",
    "url": "https://www.bn3th.ca/",
    "description": "A homegrown intimates brand committed to pieces that feel as good as they look."
  },
  {
    "slug": "mojja",
    "name": "Mojja",
    "type": "Brand",
    "category": "Intimates",
    "url": "https://www.mojja.ca/",
    "description": "moJJa is a Canadian company from Toronto, bringing some serious fun to your top drawer. Recognized for bold patterns and comfy fits, they make socks and underwear that don’t just feel good—they make a statement."
  },
  {
    "slug": "2undr",
    "name": "2Undr",
    "type": "Brand",
    "category": "Intimates",
    "url": "https://ca.2undr.com/",
    "description": "A homegrown intimates brand committed to pieces that feel as good as they look."
  },
  {
    "slug": "kerrs-candy",
    "name": "Kerrs Candy",
    "type": "Brand",
    "category": "Snacks",
    "url": "https://kerrs.com/",
    "description": "Kerr’s remains part of Canadian candy traditions for well over a century. Thomas, Ontario after moving from Scotland. It all established in 1895, when brothers Edward and Albert Kerr opened a small sweet shop in St. Their focus was simple: make great candy with well-crafted ingredients."
  },
  {
    "slug": "ganong",
    "name": "Ganong",
    "type": "Brand",
    "category": "Snacks",
    "url": "https://ganong.com/",
    "description": "Ganong has been part of Canada’s history for more than 150 years. Stephen, New Brunswick, to this day it’s still family-owned and making chocolate in the same town today. Established in 1873 by brothers James and Gilbert Ganong in St."
  },
  {
    "slug": "peace-by-chocolate",
    "name": "Peace By Chocolate",
    "type": "Brand",
    "category": "Food",
    "url": "https://peacebychocolate.ca/",
    "description": "After years as refugees in Lebanon, they were welcomed to Canada and settled in the small town of Antigonish, Nova Scotia. With the support of the local community, they slowly rebuilt their family chocolate business—this time from a small shed by their new home."
  },
  {
    "slug": "mordens-chocolate",
    "name": "Mordens Chocolate",
    "type": "Brand",
    "category": "Food",
    "url": "https://www.mordenschocolate.com/",
    "description": "Proudly Canadian, this brand creates food products that deliver on flavour and quality."
  },
  {
    "slug": "penningtons",
    "name": "Penningtons",
    "type": "Brand",
    "category": "Clothing",
    "url": "https://www.penningtons.com/",
    "description": "Proudly Canadian from 1948, Penningtons has been a go-to for plus-size fashion that actually fits and feels good. From sizes 14 to 32, the company has spent over 70 years perfecting its craft and creating clothing designed to move with you, support you, and help you feel your best."
  },
  {
    "slug": "free-label",
    "name": "Free Label",
    "type": "Brand",
    "category": "Clothing",
    "url": "https://freelabel.com/",
    "description": "Everything is designed in-house and sewn in small batches right here in Canada. Their factory partners are just down the road from their Vancouver studio, and visit often—sometimes to talk about new pieces, sometimes just to say hi and drop off coffee. They know exactly who makes the clothes, and that matters to them."
  },
  {
    "slug": "lustre",
    "name": "Lustre",
    "type": "Brand",
    "category": "Clothing",
    "url": "https://boutiquelustre.com/",
    "description": "Lustre is a small but mighty atelier in Montréal, created in 2006 by designer Yasmine Wasfy. From day one, Lustre remains about over just beautiful clothes—it’s about making people feel seen, celebrated, and comfortable in what they wear."
  },
  {
    "slug": "laura",
    "name": "Laura",
    "type": "Brand",
    "category": "Clothing",
    "url": "https://laura.ca/",
    "description": "Laura Canada remains part of Canadian fashion for generations. What began as a small, family-run business in 1930 has grown into two beloved labels—Laura and Melanie Lyne—known coast to coast for timeless style and thoughtful service."
  },
  {
    "slug": "mountain-joe-coffee",
    "name": "Mountain Joe Coffee",
    "type": "Brand",
    "category": "Coffee",
    "url": "https://www.drinkmountainjoe.com/home",
    "description": "This proudly Canadian company roasts premium coffee beans with care and precision."
  },
  {
    "slug": "biko",
    "name": "Biko",
    "type": "Brand",
    "category": "Jewellery",
    "url": "https://www.ilovebiko.com/",
    "description": "BIKO is a small jewellery studio based in Toronto and led by designer Corrine Anestopoulos. From 2005, she’s been creating pieces that are modern and timeless while drawing inspiration from nature, art, travel, and everyday beauty."
  },
  {
    "slug": "shoppers-drug-mart",
    "name": "Shoppers Drug Mart",
    "type": "Brand",
    "category": "Pharmacy",
    "url": "https://www.shoppersdrugmart.ca/",
    "description": "Canada's premier pharmacy and health retailer, offering prescriptions, beauty products, and wellness essentials with trusted service coast to coast."
  },
  {
    "slug": "loblaws",
    "name": "Loblaws",
    "type": "Brand",
    "category": "Grocery",
    "url": "https://www.loblaws.ca/",
    "description": "One of Canada's largest grocery retailers, providing fresh food, quality products, and convenient shopping for families nationwide."
  },
  {
    "slug": "sobeys",
    "name": "Sobeys",
    "type": "Brand",
    "category": "Grocery",
    "url": "https://www.sobeys.com/",
    "description": "A trusted Canadian grocery chain offering fresh produce, quality meats, and everyday essentials with friendly neighbourhood service."
  },
  {
    "slug": "metro",
    "name": "Metro",
    "type": "Brand",
    "category": "Grocery",
    "url": "https://www.metro.ca/",
    "description": "A leading Canadian food retailer committed to fresh products, quality service, and supporting local communities."
  },
  {
    "slug": "rexall",
    "name": "Rexall",
    "type": "Brand",
    "category": "Pharmacy",
    "url": "https://www.rexall.ca/",
    "description": "A Canadian pharmacy chain providing health services, prescriptions, and wellness products with knowledgeable care."
  },
  {
    "slug": "sport-chek",
    "name": "Sport Chek",
    "type": "Brand",
    "category": "Retail",
    "url": "https://www.sportchek.ca/",
    "description": "Canada's leading sporting goods retailer offering athletic wear, equipment, and footwear for every sport and lifestyle."
  },
  {
    "slug": "mec-mountain-equipment-co-op",
    "name": "MEC (Mountain Equipment Co-op)",
    "type": "Brand",
    "category": "Retail",
    "url": "https://www.mec.ca/",
    "description": "An iconic Canadian outdoor retailer providing quality gear for hiking, camping, cycling, and adventure sports."
  },
  {
    "slug": "hudson-s-bay",
    "name": "Hudson's Bay",
    "type": "Brand",
    "category": "Retail",
    "url": "https://www.thebay.com/",
    "description": "Canada's oldest company, offering fashion, home goods, and beauty products with over 350 years of retail heritage."
  },
  {
    "slug": "la-vie-en-rose",
    "name": "La Vie en Rose",
    "type": "Brand",
    "category": "Intimates",
    "url": "https://www.lavieenrose.com/",
    "description": "A Canadian intimates retailer designing comfortable, stylish lingerie, sleepwear, and swimwear for every body."
  },
  {
    "slug": "goodlife-fitness",
    "name": "GoodLife Fitness",
    "type": "Brand",
    "category": "Fitness",
    "url": "https://www.goodlifefitness.com/",
    "description": "Canada's largest fitness club chain helping Canadians achieve their health goals with state-of-the-art facilities."
  },
  {
    "slug": "second-cup",
    "name": "Second Cup",
    "type": "Brand",
    "category": "Coffee",
    "url": "https://www.secondcup.com/",
    "description": "A beloved Canadian café chain serving premium coffee, specialty drinks, and cozy gathering spaces since 1975."
  },
  {
    "slug": "indigo",
    "name": "Indigo",
    "type": "Brand",
    "category": "Retail",
    "url": "https://www.chapters.indigo.ca/",
    "description": "Canada's cultural department store offering books, gifts, home décor, and lifestyle products with curated selections."
  },
  {
    "slug": "well-ca",
    "name": "Well.ca",
    "type": "Brand",
    "category": "Health",
    "url": "https://well.ca/",
    "description": "A Canadian online health and wellness retailer offering natural products, vitamins, and beauty essentials delivered to your door."
  },
  {
    "slug": "frank-and-oak",
    "name": "Frank And Oak",
    "type": "Brand",
    "category": "Clothing",
    "url": "https://ca.frankandoak.com/",
    "description": "A Montreal-based sustainable fashion brand creating modern, eco-conscious clothing for men and women."
  },
  {
    "slug": "smythe",
    "name": "Smythe",
    "type": "Brand",
    "category": "Clothing",
    "url": "https://smythe.com/",
    "description": "A Vancouver-based luxury brand famous for expertly tailored blazers and sophisticated Canadian style."
  },
  {
    "slug": "kotn",
    "name": "Kotn",
    "type": "Brand",
    "category": "Clothing",
    "url": "https://kotn.com/",
    "description": "A Toronto-based ethical fashion brand creating premium basics from sustainable materials with transparent sourcing."
  },
  {
    "slug": "kit-and-ace",
    "name": "Kit and Ace",
    "type": "Brand",
    "category": "Clothing",
    "url": "https://www.kitandace.com/",
    "description": "A Vancouver-born brand creating technical casual wear with innovative fabrics for modern lifestyles."
  },
  {
    "slug": "smash-tess",
    "name": "Smash + Tess",
    "type": "Brand",
    "category": "Clothing",
    "url": "https://www.smashtess.ca/",
    "description": "A Canadian brand famous for comfortable, stylish rompers and loungewear that women love."
  },
  {
    "slug": "naked-famous-denim",
    "name": "Naked & Famous Denim",
    "type": "Brand",
    "category": "Clothing",
    "url": "https://nakedandfamousdenim.com/",
    "description": "A Montreal-based denim brand creating high-quality jeans with innovative fabrics and Japanese craftsmanship."
  },
  {
    "slug": "peace-collective",
    "name": "Peace Collective",
    "type": "Brand",
    "category": "Clothing",
    "url": "https://www.peacecollective.com/",
    "description": "A Toronto-based brand creating Canadian pride apparel while giving back to local communities."
  },
  {
    "slug": "jillian-harris-design",
    "name": "Jillian Harris Design",
    "type": "Brand",
    "category": "Home",
    "url": "https://jillianharris.com/",
    "description": "A Canadian lifestyle brand by designer Jillian Harris offering home décor, fashion, and curated living essentials."
  },
  {
    "slug": "endy",
    "name": "Endy",
    "type": "Brand",
    "category": "Home",
    "url": "https://ca.endy.com/",
    "description": "A Canadian mattress company creating quality sleep products delivered in a box with risk-free trials."
  },
  {
    "slug": "douglas",
    "name": "Douglas",
    "type": "Brand",
    "category": "Home",
    "url": "https://douglas.ca/",
    "description": "A Canadian furniture company creating quality, comfortable mattresses and sleep products since 1948."
  },
  {
    "slug": "novosbed",
    "name": "Novosbed",
    "type": "Brand",
    "category": "Home",
    "url": "https://www.novosbed.com/",
    "description": "A Canadian mattress brand creating premium memory foam beds with adjustable comfort and quality materials."
  }
]

// Generate categories with actual counts
const categoryIcons: Record<string, string> = {
  'Clothing': '👕',
  'Beauty': '💄',
  'Jewellery': '💎',
  'Shoes': '👟',
  'Health': '💪',
  'Coffee': '☕',
  'Home': '🏠',
  'Food': '🍁',
  'Restaurant': '🍽️',
  'Accessories': '👜',
  'Intimates': '👙',
  'Keto': '🥑',
  'Snacks': '🍿',
  'Haircare': '💇',
  'Pets': '🐾',
  'Retail': '🛒',
  'Eyewear': '👓',
  'Baby': '👶'
}

const categoryBlurbs: Record<string, string> = {
  'Clothing': 'Discover the best Canadian clothing brands, from iconic heritage labels to modern streetwear and elevated basics. Explore homegrown fashion built for real Canadian weather and everyday life.',
  'Beauty': 'Support Canadian beauty innovation with clean, cruelty-free products made with pride. From skincare to makeup, these brands deliver quality and ethics in every formula.',
  'Jewellery': 'Canadian jewellery designers crafting stunning, high-quality pieces from coast to coast. Discover rings, necklaces, earrings, and more—made locally with care.',
  'Shoes': 'Canadian footwear brands making quality shoes, boots, and sneakers right here at home. From rugged work boots to stylish everyday kicks.',
  'Health': 'Canadian health and wellness brands committed to quality supplements, fitness products, and holistic care.',
  'Coffee': 'Canadian coffee roasters serving up fresh, locally roasted beans from coast to coast.',
  'Home': 'Canadian home goods brands bringing style, quality, and craftsmanship to your living space.',
  'Food': 'Canadian food brands making quality products from local ingredients.',
  'Restaurant': 'Canadian restaurant chains serving up homegrown flavors across the country.',
  'Accessories': 'Canadian accessories brands crafting bags, backpacks, and everyday essentials.',
  'Intimates': 'Canadian intimates brands creating comfortable, body-positive underwear and loungewear.',
  'Keto': 'Canadian keto brands making low-carb, high-fat products for healthy living.',
  'Snacks': 'Canadian snack brands creating delicious treats and better-for-you options.',
  'Haircare': 'Canadian haircare brands formulating clean, effective products for beautiful hair.',
  'Pets': 'Canadian pet brands caring for your furry friends with quality products.',
  'Retail': 'Canadian retail chains offering diverse products and supporting local communities.',
  'Eyewear': 'Canadian eyewear brands designing stylish glasses and sunglasses.',
  'Baby': 'Canadian baby brands creating safe, quality products for little ones.'
}

const categoryCounts: Record<string, number> = {
  "Restaurant": 56,
  "Clothing": 52,
  "Health": 27,
  "Shoes": 16,
  "Beauty": 74,
  "Entertainment": 2,
  "Retail": 21,
  "Travel": 6,
  "Meal Delivery": 4,
  "Accessories": 2,
  "Intimates": 17,
  "Grocery": 16,
  "Snacks": 17,
  "Automotive": 3,
  "Pharmacy": 5,
  "Telecom": 7,
  "Coffee": 31,
  "Home": 32,
  "Jewellery": 48,
  "Fitness": 5,
  "Pets": 9,
  "Wedding": 3,
  "Food": 35,
  "Services": 1,
  "Eyewear": 8,
  "Hotels": 3,
  "Haircare": 11,
  "Baby": 5,
  "Keto": 17,
  "Tech": 1,
  "Cleaning": 8,
  "Beverages": 34,
  "Indigenous": 23,
  "Loyalty": 1
}

export const categories: Category[] = Object.entries(categoryCounts)
  .map(([name, count]) => ({
    slug: name.toLowerCase().replace(/\s+/g, '-'),
    name,
    icon: categoryIcons[name] || '🍁',
    brandCount: count,
    seoBlurb: categoryBlurbs[name]
  }))
  .sort((a, b) => b.brandCount - a.brandCount)

// Helper functions
export function getBrandBySlug(slug: string): Brand | undefined {
  return brands.find(b => b.slug === slug)
}

export function getBrandsByCategory(categorySlug: string): Brand[] {
  const category = categories.find(c => c.slug === categorySlug)
  if (!category) return []
  return brands.filter(b => b.category.toLowerCase().replace(/\s+/g, '-') === categorySlug)
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug)
}

export function getRelatedBrands(brand: Brand, limit: number = 6): Brand[] {
  return brands
    .filter(b => b.category === brand.category && b.slug !== brand.slug)
    .slice(0, limit)
}
