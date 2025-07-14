import { FloorMapCard, FloorNavItem } from "@/components/shared";

export default function FloorMap() {
  return (
    <>
      {/* フロアマップページ */}
      {/* <FooterNavItem /> */}
      <FloorNavItem floors={[2, 3, 4, 5, 6]} />
    </>
  );
}