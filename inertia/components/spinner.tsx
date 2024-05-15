type Props = {
  text?: string
}

function Spinner({ text }: Props) {
  return (
    <div className="flex items-center gap-3">
      <span className="size-6 animate-spin rounded-full border-4 border-white/50 border-t-white"></span>
      {text && <span className="text-white">{text}...</span>}
    </div>
  )
}

export default Spinner
