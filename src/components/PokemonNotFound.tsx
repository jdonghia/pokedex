export function PokemonNotFound() {
  return (
    <div className="col-[span_36_/_span_36] row-[span_32_/_span_32] grid place-content-center">
      <div className="flex flex-col items-center">
        <span className="text-9xl font-bold">404</span>
        <p>Sorry, we couldnt find any pokemon match</p>
        <p>Click on reload to reset filters</p>
      </div>
    </div>
  )
}
