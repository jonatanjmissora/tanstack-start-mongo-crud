import { createFileRoute } from '@tanstack/react-router'
export const Route = createFileRoute('/contact-us/$country')({
  component: CountryRoute,
})
function CountryRoute() {
  const { country } = Route.useParams()
  return (
    <div>
      <h2>Country: {country.toUpperCase()}</h2>
      <p>This is the contact page for {country}.</p>
    </div>
  )
}