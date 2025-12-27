

export function Electrodomesticos({ electrodomesticos, page }: {electrodomesticos: any[], page?: number}) {

  /*  cuando muestro todos los electrodomesticos, al principio */
  if(!page)
    return (
    <div className="flex flex-wrap gap-8">
      {electrodomesticos.map(electrodomestico => (
        <div key={electrodomestico.id} className='p-4 m-4 border shadow-xl rounded-lg bg-slate-600 flex flex-col justify-center items-center gap-2'>
            <span>nombre: {electrodomestico.name}</span>
            <span className="text-xs">precio: $ {electrodomestico.price}</span>
        </div>
      ))}
    </div>
  );

  const electrodomesticosPerPage = 2
  let totalPages = 1
  if(page) {
    totalPages = Math.trunc(electrodomesticos.length/electrodomesticosPerPage)
    totalPages = electrodomesticos.length % electrodomesticosPerPage !== 0 ? totalPages + 1 : totalPages
  }

  /*  si la pagina del input esta fuera de rango */
  if(totalPages < page) return <div>Pagina fuera de rango</div>

  const startIndex = (page - 1) * electrodomesticosPerPage
  const endIndex = startIndex + electrodomesticosPerPage
  const electrodomesticosToShow = electrodomesticos.slice(startIndex, endIndex)

  /*  cuando muestro 2 electrodomesticos por pagina */
  return (
    <div className="flex flex-wrap gap-8">
      {electrodomesticosToShow.map(electrodomestico => (
        <div key={electrodomestico.id} className='p-4 m-4 border shadow-xl rounded-lg bg-slate-600 flex flex-col justify-center items-center gap-2'>
            <span>nombre: {electrodomestico.name}</span>
            <span className="text-xs">precio: $ {electrodomestico.price}</span>
        </div>
      ))}
    </div>
  )
}