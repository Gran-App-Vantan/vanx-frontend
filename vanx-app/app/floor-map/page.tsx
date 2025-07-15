import { FloorMapCard, FloorNavItem } from "@/components/shared";

export default function FloorMap() {
  return (
    <>
      {/* フロアマップページ */}
      {/* <FooterNavItem /> */}
      <FloorNavItem floors={["2F", "3F", "4F", "5F", "6F"]} />
    </>
  );
}