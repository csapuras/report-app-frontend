export default function LoadingComponent () {
  return (
  <>
    <div className="flex gap-2">
        <span className="size-3 animate-pulse rounded-full bg-(--color-accent)"></span>
        <span className="size-3 animate-pulse rounded-full bg-(--color-accent) [animation-delay:0.2s]"></span>
        <span className="size-3 animate-pulse rounded-full bg-(--color-accent) [animation-delay:0.4s]"></span>
    </div>
  </>  
  )
}