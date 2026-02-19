import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <h1>button test</h1>
      <Button variant="outline"
      className="bg-red-300 border-gray-100"
      >Button</Button>
    </div>
    
);
}
