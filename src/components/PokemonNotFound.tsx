export function PokemonNotFound() {
  return (
    <div className="col-[span_36_/_span_36] row-[span_32_/_span_32] grid place-content-center bg-[#e8e8e8]">
      <div className="flex flex-col items-center text-[#1a1a1a]">
        <span className="text-9xl font-bold">404</span>
        <p>Sorry, we couldnt find any pokemon match</p>
        <p>Click on reload to reset filters</p>
      </div>
    </div>
  )
}
