export default function CustomLabel ({ text }: { text: string }) {
  return (
    <>
      <div className="custom-label text-white px-2 py-1 text-2xl text-center">
        {text}
      </div>
    </>
  )
}