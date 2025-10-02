type PostDeleteModalProps = {
  onDelete: () => void;
  onClose: () => void;
};

export function PostDeleteModal({ onDelete, onClose }: PostDeleteModalProps) {
  return (
    <div className="flex flex-col gap-[58px]">
      <p className="text-center">投稿を削除しますか？</p>

      <div className="flex justify-around gap-6">
        <button
          className="py-3 px-6 bg-gray text-text-gray text-label rounded-full cursor-pointer"
          onClick={() => onClose()}
        >
          キャンセル
        </button>

        <button 
          className="w-[118px] py-3 bg-accent text-white text-label rounded-full cursor-pointer"
          onClick={() => onDelete()}
        >
          削除
        </button>
      </div>
    </div>
  );
}
