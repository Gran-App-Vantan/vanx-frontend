type PostDeleteModalProps = {
  onClose: () => void;
}

export function PostDeleteModal({ onClose }: PostDeleteModalProps) {
  return (
    <div className="flex flex-col gap-[58px]">
      <p className="text-center">投稿を削除しますか？</p>

      <div className="flex justify-around gap-6">
        <button 
          className="py-3 px-6 bg-gray text-text-gray font-label rounded-full cursor-pointer"
          onClick={onClose}
        >
          キャンセル
        </button>

        <button className="w-[118px] py-3 bg-accent text-white font-label rounded-full cursor-pointer">
          {/* 削除処理はバックエンド待ち */}
          削除
        </button>
      </div>
    </div>
  )
}