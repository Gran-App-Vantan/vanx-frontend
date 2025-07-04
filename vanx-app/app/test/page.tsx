import { PostingButton, PostItem, ReactionAddButton, ReactionBottomSheet } from "@/components/post";
import { Button } from "@/components/shared/Button";

export default function Test() {
  return (
    <main>
      <div className="absolute bottom-0">
        <Button buttonType="redButton" size="l" text="登録" />
        <ReactionBottomSheet />
      </div>
    </main>
  );
}