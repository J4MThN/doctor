import {Users , Pregnancy , Point ,Article, Comment, Cycle, DailySymptom} from "../types";

import Point1 from "@/src/assest/point/icon/Group 162736.svg";
import Point2 from "@/src/assest/point/icon/fi_10136147.svg";
import Point3 from "@/src/assest/point/icon/Group 8.svg";
import Point4 from "@/src/assest/point/icon/Group 162734.svg";
import Point5 from "@/src/assest/point/icon/brain-head-1--Streamline-Ultimate.svg";

import Article1 from "@/src/assest/article/Article.png";
import Article2 from "@/src/assest/article/Article2.png";
import Article3 from "@/src/assest/article/Article3.png";
import Article4 from "@/src/assest/article/Article.png";
import Article5 from "@/src/assest/article/Article1.png";
import Article6 from "@/src/assest/article/Article.png";


export const user: Users[] = [
  {
    key: "1",
    name: "ناهید میرزایی",
    mobile: "۰۹۱۱ ۵۵۶ ۳۴۳۵",
    age: 28,
    maritalStatus: "متاهل",
    cycleCount: 5,
  },
  {
    key: "2",
    name: "سیما نوش آبادی",
    mobile: "۰۹۳۸ ۶۵۳ ۳۶۲۵",
    age: 32,
    maritalStatus: "متاهل",
    cycleCount: 8,
  },
  {
    key: "3",
    name: "فاطمه محمدی",
    mobile: "۰۹۱۱ ۵۵۶ ۳۴۳۵",
    age: 15,
    maritalStatus: "مجرد",
    cycleCount: 4,
  },
  {
    key: "4",
    name: "فاطمه زهرا طبیبی",
    mobile: "۰۹۳۸ ۶۹۶ ۲۱۴۵",
    age: 19,
    maritalStatus: "مجرد",
    cycleCount: 2,
  },
  {
    key: "5",
    name: "نگین رمضانی",
    mobile: "۰۹۳۶ ۷۸۸ ۸۸۴۴",
    age: 36,
    maritalStatus: "مطلقه",
    cycleCount: 15,
  },
  {
    key: "6",
    name: "مینا میرزایی",
    mobile: "۰۹۱۱ ۵۵۶ ۳۴۳۵",
    age: 69,
    maritalStatus: "متاهل",
    cycleCount: 5,
  },
  {
    key: "7",
    name: "نازنین نوش آبادی",
    mobile: "۰۹۳۸ ۶۵۳ ۳۶۲۵",
    age: 24,
    maritalStatus: "مجرد",
    cycleCount: 8,
  },
  {
    key: "8",
    name: "الهام رضایی",
    mobile: "۰۹۳۸ ۶۵۳ ۳۶۲۵",
    age: 34,
    maritalStatus: "متاهل",
    cycleCount: 9,
  },
  {
    key: "9",
    name: "نرگس محمدی",
    mobile: "۰۹۳۸ ۶۵۳ ۳۶۲۵",
    age: 31,
    maritalStatus: "مطلقه",
    cycleCount: 11,
  },
  {
    key: "10",
    name: "زهرا حسینی",
    mobile: "۰۹۳۸ ۶۵۳ ۳۶۲۵",
    age: 26,
    maritalStatus: "مجرد",
    cycleCount: 3,
  },
  {
    key: "11",
    name: "لیلا موسوی",
    mobile: "۰۹۳۸ ۶۵۳ ۳۶۲۵",
    age: 30,
    maritalStatus: "متاهل",
    cycleCount: 10,
  },
  {
    key: "12",
    name: "سمیه اکبری",
    mobile: "۰۹۳۸ ۶۵۳ ۳۶۲۵",
    age: 33,
    maritalStatus: "متاهل",
    cycleCount: 12,
  },
];

export const cycle: Cycle[] = [
  {
    key: "1",
    date: "1405/05/12",
    lengh: 2,
    cycle: 28,
  },
  {
    key: "2",
    date: "1405/05/12",
    lengh: 4,
    cycle: 32,
  },
  {
    key: "3",
    date: "1405/05/12",
    lengh: 8,
    cycle: 15,
  },
  {
    key: "4",
    date: "1405/04/10",
    lengh: 1,
    cycle: 19,
  },
  {
    key: "5",
    date: "1405/03/09",
    lengh: 3,
    cycle: 36,
  },
  {
    key: "6",
    date: "1405/02/08",
    lengh: 5,
    cycle: 69,
  },
  {
    key: "7",
    date: "1405/02/08",
    lengh: 1,
    cycle: 24,
  },
  {
    key: "8",
    date:"1405/02/08",
    lengh: 7,
    cycle: 34,
  },
  {
    key: "9",
    date: "1405/02/08",
    lengh: 3,
    cycle: 31,
  },
  {
    key: "10",
    date: "1405/02/08",
    lengh: 4,
    cycle: 26,
  },
  {
    key: "11",
    date: "1405/02/08",
    lengh: 2,
    cycle: 30,
  },
  {
    key: "12",
    date: "1405/02/08",
    lengh: 5,
    cycle: 33,
  },
];

export const dailySymptom: DailySymptom[] = [
  {
    key:"1",
    cycleId:"1",
    date:"1405/05/12",
    symptoms:[
      "سردرد",
      "درد شکم",
      "خستگی"
    ]
  },
    {
    key:"2",
    cycleId:"1",
    date:"1405/05/13",
    symptoms:[
      "سردرد",
      "درد شکم",
      "تهوع"
    ]
  },
      {
    key:"3",
    cycleId:"1",
    date:"1405/05/14",
    symptoms:[
      "کمر درد",
      "درد شکم",
      "تهوع"
    ]
  },
]

export const pregnancy: Pregnancy[] = [
  {
    key: "1",
    name: "ناهید میرزایی",
    mobile: "۰۹۱۱ ۵۵۶ ۳۴۳۵",
    age: 28,
    maritalStatus: "متاهل",
    cycleCount: 5,
    pregnancyCount: "بله",
  },
  {
    key: "2",
    name: "سیما نوش آبادی",
    mobile: "۰۹۳۸ ۶۵۳ ۳۶۲۵",
    age: 32,
    maritalStatus: "متاهل",
    cycleCount: 8,
    pregnancyCount: "بله",
  },
  {
    key: "3",
    name: "فاطمه محمدی",
    mobile: "۰۹۱۱ ۵۵۶ ۳۴۳۵",
    age: 15,
    maritalStatus: "مجرد",
    cycleCount: 4,
    pregnancyCount: "خیر",
  },
  {
    key: "4",
    name: "فاطمه زهرا طبیبی",
    mobile: "۰۹۳۸ ۶۹۶ ۲۱۴۵",
    age: 19,
    maritalStatus: "مجرد",
    cycleCount: 2,
    pregnancyCount: "خیر",
  },
  {
    key: "5",
    name: "نگین رمضانی",
    mobile: "۰۹۳۶ ۷۸۸ ۸۸۴۴",
    age: 36,
    maritalStatus: "مطلقه",
    cycleCount: 15,
    pregnancyCount: "خیر",
  },
  {
    key: "6",
    name: "مینا میرزایی",
    mobile: "۰۹۱۱ ۵۵۶ ۳۴۳۵",
    age: 69,
    maritalStatus: "متاهل",
    cycleCount: 5,
    pregnancyCount: "بله",
  },
  {
    key: "7",
    name: "نازنین نوش آبادی",
    mobile: "۰۹۳۸ ۶۵۳ ۳۶۲۵",
    age: 24,
    maritalStatus: "مجرد",
    cycleCount: 8,
    pregnancyCount: "خیر",
  },
  {
    key: "8",
    name: "الهام رضایی",
    mobile: "۰۹۳۸ ۶۵۳ ۳۶۲۵",
    age: 34,
    maritalStatus: "متاهل",
    cycleCount: 9,
    pregnancyCount: "بله",
  },
  {
    key: "9",
    name: "نرگس محمدی",
    mobile: "۰۹۳۸ ۶۵۳ ۳۶۲۵",
    age: 31,
    maritalStatus: "مطلقه",
    cycleCount: 11,
    pregnancyCount: "خیر",
  },
  {
    key: "10",
    name: "زهرا حسینی",
    mobile: "۰۹۳۸ ۶۵۳ ۳۶۲۵",
    age: 26,
    maritalStatus: "مجرد",
    cycleCount: 3,
    pregnancyCount: "خیر",
  },
  {
    key: "11",
    name: "لیلا موسوی",
    mobile: "۰۹۳۸ ۶۵۳ ۳۶۲۵",
    age: 30,
    maritalStatus: "متاهل",
    cycleCount: 10,
    pregnancyCount: "بله",
  },
  {
    key: "12",
    name: "سمیه اکبری",
    mobile: "۰۹۳۸ ۶۵۳ ۳۶۲۵",
    age: 33,
    maritalStatus: "متاهل",
    cycleCount: 12,
    pregnancyCount: "بله",
  },
    {
    key: "13",
    name: "سمیه اکبری",
    mobile: "۰۹۳۸ ۶۵۳ ۳۶۲۵",
    age: 33,
    maritalStatus: "متاهل",
    cycleCount: 12,
    pregnancyCount: "بله",
  },
      {
    key: "14",
    name: "سمیه اکبری",
    mobile: "۰۹۳۸ ۶۵۳ ۳۶۲۵",
    age: 33,
    maritalStatus: "متاهل",
    cycleCount: 12,
    pregnancyCount: "بله",
  },
];

export const points: Point[] = [
  {
    key: "1",
    icon: Point1,
    title: "ورزش در چرخه قاعدگی",
    desc: "ورزش در دوران پریودی می‌تواند به کاهش درد قاعدگی بانوان کمک کند.",
    image: 5,
  },
  {
    key: "2",
    icon: Point2,
    title: "ورزش در چرخه قاعدگی",
    desc: "مراحل چرخه‌ی قاعدگی و آموزش محاسبه‌ی طول سیکل قاعدگی",
    image: 6,
  },
  {
    key: "3",
    icon: Point3,
    title: "7 روز سیکل",
    desc: "12 نشانه کم خونی که نباید نادیده بگیرید",
    image: 1,
  },
  {
    key: "4",
    icon: Point4,
    title: "کمبود آهن در زنان چرا شایع است ؟",
    desc: "چگونه نه بگوییم؟ 24 تمرین و 30 جمله کاربردی برای نه گفتن",
    image: 4,
  },
  {
    key: "5",
    icon: Point5,
    title: "اگر به کسی نه بگی یعنی کمتر دوسش داری؟",
    desc: "آیا باور دارید که می‌توانید تصویر مثبتی از خودتان داشته باشید؟",
    image: 2,
  },
];


export const article: Article[] = [
  {
    key: "1",
    icon: Article1,
    title: "روز جهانی بهداشت قاعدگی چیست و چرا مهم است؟",
    desc: "ورزش در دوران پریودی می‌تواند به کاهش درد قاعدگی بانوان کمک کند.",
    subject: "عمومی",
  },
  {
    key: "2",
    icon: Article2,
    title: "گاهی بدن هم از فشار روانی حرف می‌زند!",
    desc: "مراحل چرخه‌ی قاعدگی و آموزش محاسبه‌ی طول سیکل قاعدگی",
    subject: "عمومی",
  },
  {
    key: "3",
    icon: Article3,
    title: "خوراکی‌های خوش‌طعم در دوران پریود؛ چطور انتخا... ",
    desc: "12 نشانه کم خونی که نباید نادیده بگیرید",
    subject: "تخصصی",
  },
  {
    key: "4",
    icon: Article4,
    title: "گاهی بدن هم از فشار روانی حرف می‌زند!",
    desc: "چگونه نه بگوییم؟ 24 تمرین و 30 جمله کاربردی برای نه گفتن",
    subject: "تخصصی",
  },
  {
    key: "5",
    icon: Article5,
    title: "ترس، هورمون‌ها و پریود؛ این سه چطور بر هم اثر م...",
    desc: "آیا باور دارید که می‌توانید تصویر مثبتی از خودتان داشته باشید؟",
    subject: "عمومی",
  },
  {
    key: "6",
    icon: Article6,
    title: "ترس، هورمون‌ها و پریود؛ این سه چطور بر هم اثر م...",
    desc: "آیا باور دارید که می‌توانید تصویر مثبتی از خودتان داشته باشید؟",
    subject: "عمومی",
  },

];


export const comment: Comment[] = [
  {
    key: "1",
    name: "ناهید میرزایی",
    desc: "ورزش در دوران پریودی می‌تواند به کاهش درد قاعدگی بانوان کمک کند.",
    status: "تایید شده",
  },
  {
    key: "2",
    name: "سیما نوش آبادی",
    desc: "مراحل چرخه‌ی قاعدگی و آموزش محاسبه‌ی طول سیکل قاعدگی",
    status: "رد شده",
  },
  {
    key: "3",
    name: "فاطمه محمدی",
    desc: "12 نشانه کم خونی که نباید نادیده بگیرید",
    status: "تایید شده",
  },
  {
    key: "4",
    name: "فاطمه زهرا طیبی",
    desc: "چگونه نه بگوییم؟ 24 تمرین و 30 جمله کاربردی برای نه گفتن",
    status: "تایید شده",
  },
  {
    key: "5",
    name: "نگین رمضانی",
    desc: "آیا باور دارید که می‌توانید تصویر مثبتی از خودتان داشته باشید؟",
    status: "تایید شده",
  },

];