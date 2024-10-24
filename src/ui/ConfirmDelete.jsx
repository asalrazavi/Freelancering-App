export default function ConfirmDelete({
  resourceName,
  onclose,
  disabled,
  onConfirm,
}) {
  return (
    <div>
      <h2 className="font-bold text-base mb-8">
        آیا از حذف {resourceName} مطمین هستید؟
      </h2>
      <div className="flex justify-between items-center gap-x-16">
        <button
          onClick={onclose}
          disabled={disabled}
          className="btn btn--primary flex-1"
        >
          لغو
        </button>
        <button onClick={onConfirm} className="btn btn--danger flex-1 py-3">
          تایید
        </button>
      </div>
    </div>
  );
}
