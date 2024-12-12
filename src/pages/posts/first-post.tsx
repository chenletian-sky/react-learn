import MyPdfReader from "@/components/MyPdfReader";
import Link from "next/link";

export default function FirstPost() {
  return (
    <>
      <h1>First post</h1>
      <h2>
        <Link href={"/public"}>back to home</Link>
      </h2>
    </>
  );
}
