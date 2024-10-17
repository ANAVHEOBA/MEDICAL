import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Banner from "@/components/Banner";
import FindSection from "@/components/FindSection";
import Categories from "@/components/Categories";
import BookDoctor from "@/components/BookDoctor";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      
      <main>
        <Banner />
        <FindSection />
        <Categories />
        <BookDoctor />
      </main>
    </>
  );
}
