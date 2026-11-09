/*
  ================================================================
  اطلاعات سایت جواهری قسمتی — فقط همین فایل را ویرایش کنید
  ================================================================
  • برای عوض کردن عکس‌ها: عکس خودتان را با همان اسم در پوشه images بگذارید
    (مثلاً images/products/p01.jpg) یا اسم فایل را این‌جا عوض کنید.
  • بهترین اندازه عکس: ویترین ۸۰۰×۱۰۰۰ (عمودی)، دست دوم ۸۰۰×۸۰۰ (مربع)، عکس اصلی ۱۰۰۰×۱۳۰۰.
  • برای اضافه کردن کالا: یک خط { ... } را کپی کنید و مقدارهایش را عوض کنید.
  • برای کالای دست دومی که فروخته شد: sold: true بگذارید (با برچسب «فروخته شد» نشان داده می‌شود).
*/

window.SITE = {
  name: 'جواهری قسمتی',
  nameLatin: 'GHESMATI JEWELRY',
  since: '۱۳۹۰',
  tagline: 'طلا، جواهر و ساعت در رشت',
  address: 'رشت، منظریه، جنب هتل پردیس',
  hours: 'عصرها، ساعت ۱۷ تا ۲۱:۳۰',
  phoneDisplay: '۰۱۳-۳۲۳۲۹۳۳۱',
  phoneLink: '+981332329331',
  instagram: 'ghesmati_jewelry',
  // لینک نقشه — اگر لینک دقیق گوگل‌مپ یا نشان مغازه را دارید این‌جا بگذارید
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('جواهری قسمتی منظریه رشت'),
  // اگر فایل لوگو دارید (مثلاً images/logo.png) این‌جا بنویسید؛ خالی باشد، اسم با خط نستعلیق نشان داده می‌شود
  logo: '',
  heroImage: 'images/hero.jpg',
  //story: [
  //  'جواهری قسمتی از سال ۱۳۹۰ در منظریه رشت، کنار هتل پردیس، چشم‌به‌راه شماست.',
  //  'از مدال‌ها و زنجیرهای روزمره تا انگشترهای فیروزه و ساعت؛ هر قطعه را می‌توانید از نزدیک ببینید، وزن کنید و با نرخ روز بخرید.',
  //],
};

// دسته‌بندی‌ها (همان هایلایت‌های اینستاگرام)
window.CATEGORIES = [
  { id: 'medal',    name: 'مدال پریزاد',      image: 'images/products/p01.jpg' },
  { id: 'neck',     name: 'گردنی',            image: 'images/products/p02.jpg' },
  { id: 'chain',    name: 'زنجیرها',          image: 'images/products/p03.jpg' },
  { id: 'earring',  name: 'گوشواره',          image: 'images/products/p04.jpg' },
  { id: 'bracelet', name: 'دستبند ظریف',      image: 'images/products/p05.jpg' },
  { id: 'ring',     name: 'انگشتر مینیمال',   image: 'images/products/p06.jpg' },
  { id: 'watch',    name: 'ساعت',             image: 'images/products/p07.jpg' },
];

// ویترین — کالاهای نو
window.PRODUCTS = [
  { name: 'مدال پریزاد ستاره',        category: 'medal',    karat: '۱۸', weight: '۲٫۴۰', image: 'images/products/p01.jpg' },
  { name: 'گردنی اشک یاقوت',         category: 'neck',     karat: '۱۸', weight: '۳٫۱۵', image: 'images/products/p02.jpg' },
  { name: 'زنجیر کارتیه درشت',        category: 'chain',    karat: '۱۸', weight: '۱۲٫۸۰', image: 'images/products/p03.jpg' },
  { name: 'گوشواره آویز مروارید',     category: 'earring',  karat: '۱۸', weight: '۲٫۰۵', image: 'images/products/p04.jpg' },
  { name: 'دستبند ظریف فیروزه',       category: 'bracelet', karat: '۱۸', weight: '۴٫۳۰', image: 'images/products/p05.jpg' },
  { name: 'انگشتر فیروزه نیشابوری',   category: 'ring',     karat: '۱۸', weight: '۵٫۱۰', image: 'images/products/p06.jpg' },
  { name: 'ساعت مچی زنانه',           category: 'watch',    karat: '',   weight: '',      image: 'images/products/p07.jpg', note: 'بند چرم' },
  { name: 'انگشتر تک‌نگین',           category: 'ring',     karat: '۱۸', weight: '۲٫۷۵', image: 'images/products/p08.jpg' },
];

// گالری دست دوم — هر قطعه فقط یکی است
window.USED = [
  { name: 'دستبند زنجیری',     type: 'دستبند',   karat: '۱۸', weight: '۸٫۲۰', condition: 'خیلی تمیز',         image: 'images/used/u01.jpg', sold: false },
  { name: 'انگشتر فیروزه',     type: 'انگشتر',   karat: '۱۸', weight: '۳٫۹۰', condition: 'کمی خط و خش',       image: 'images/used/u02.jpg', sold: false },
  { name: 'زنجیر حلقه‌ای',      type: 'زنجیر',    karat: '۱۸', weight: '۱۰٫۴۰', condition: 'خیلی تمیز',        image: 'images/used/u03.jpg', sold: false },
  { name: 'سکه پارسیان',       type: 'سکه',      karat: '۱۸', weight: '۱٫۵۰', condition: 'پلمب',             image: 'images/used/u04.jpg', sold: true  },
  { name: 'گوشواره قطره‌ای',    type: 'گوشواره',  karat: '۱۸', weight: '۲٫۶۰', condition: 'تمیز',              image: 'images/used/u05.jpg', sold: false },
  { name: 'مدال قدیمی حکاکی',  type: 'مدال',     karat: '۱۸', weight: '۴٫۸۰', condition: 'قدیمی، اصیل',       image: 'images/used/u06.jpg', sold: false },
];
