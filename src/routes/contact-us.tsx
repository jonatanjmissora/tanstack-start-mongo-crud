import { createFileRoute, Outlet } from '@tanstack/react-router'
export const Route = createFileRoute('/contact-us')({
  component: ContactUsLayout,
})
function ContactUsLayout() {
  return (
    <div>
      <h1>Contact Us</h1>
      
        <Outlet />
      
    </div>
  )
}