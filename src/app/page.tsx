import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { Statement } from "@/components/sections/statement";
import { Possibilities } from "@/components/sections/possibilities";
import { Capabilities } from "@/components/sections/capabilities";
import { Founder } from "@/components/sections/founder";
import { Showcase } from "@/components/sections/showcase";
import { Enquiry } from "@/components/sections/enquiry";
import { Footer } from "@/components/sections/footer";
import { Intro } from "@/components/ui/intro";

export default function Home() {
  return (
    <>
      <Intro />
      <Header />
      <main id="main-content">
        <Hero />
        <Statement />
        <Possibilities />
        <Capabilities />
        <Founder />
        <Showcase />
        <Enquiry />
      </main>
      <Footer />
    </>
  );
}
