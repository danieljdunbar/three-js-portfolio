import Experience from "@/components/Experience";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Daniel Dunbar - Portfolio',
  description: 'Portfolio of Daniel Dunbar',
};

export default function Home() {
  return <Experience />;
}
