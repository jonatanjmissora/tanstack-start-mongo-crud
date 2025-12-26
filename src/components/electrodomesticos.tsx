

export function Electrodomesticos({ electrodomesticos }: {electrodomesticos: any[]}) {
  return (
    <div className="flex flex-wrap gap-8">
      {electrodomesticos.map(electrodomestico => (
        <div key={electrodomestico.id} className='p-4 m-4 border shadow-xl bg-slate-600'>
            {electrodomestico.name}
        </div>
      ))}
    </div>
  );
}