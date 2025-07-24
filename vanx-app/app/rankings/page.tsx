import { MyProfile, Number, ReturnButton } from "@/components/shared";
export default function Rankings() {
  return (
    <>
        <div className="fixed top-0 w-full z-10">
          <ReturnButton />
          <div>
              <MyProfile myImage="/icon.png" myName="じゅんPayん??" myRank={1} />
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-50">
          <Number rank={1} name="じゅんPayん??" image="/icon.png" score="100,000P" />
          <Number rank={2} name="paypay" image="/icon.png" score="50,000P" />
          <Number rank={3} name="れおれおん" image="/icon.png" score="50,000P" />
          <Number rank={4} name="じゅんPayでーーーす" image="/icon.png" score="50,000P" />
          <Number rank={5} name="じゅんPayでーーーす" image="/icon.png" score="50,000P" />
          <Number rank={6} name="じゅんPayでーーーす" image="/icon.png" score="50,000P" />
          <Number rank={7} name="じゅんPayでーーーす" image="/icon.png" score="50,000P" />
          <Number rank={8} name="じゅんPayでーーーす" image="/icon.png" score="50,000P" />
          <Number rank={9} name="じゅんPayでーーーす" image="/icon.png" score="50,000P" />
          <Number rank={10} name="じゅんPayでーーーす" image="/icon.png" score="50,000P" />
          <Number rank={11} name="じゅんPayでーーーす" image="/icon.png" score="50,000P" />
          <Number rank={12} name="じゅんPayでーーーす" image="/icon.png" score="50,000P" />
        </div>
    </>
  );
}