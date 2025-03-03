// app/admin/subscribers/page.tsx
import { prisma } from '@/lib/prisma'
import DeleteSubscriberButton from '@/components/ui/buttons/DeleteSubscriberButton'
import GeneralSection from '@/components/layouts/sections/GeneralSection'
import PageTitle from '@/components/typography/PageTitle'

export default async function SubscribersPage() {
  // Fetch subscribers sorted by subscription date (you can adjust the query as needed)
  const subscribers = await prisma.subscriber.findMany({
    orderBy: { subscribedAt: 'desc' },
  })

  return (
    <GeneralSection>
      <PageTitle>Subscribers</PageTitle>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Subscribed At</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subscribers.map((subscriber) => (
            <tr key={subscriber.id}>
              <td>{subscriber.email}</td>
              <td>{new Date(subscriber.subscribedAt).toLocaleString()}</td>
              <td>
                {subscriber.unsubscribedAt
                  ? `Unsubscribed at ${new Date(
                      subscriber.unsubscribedAt
                    ).toLocaleString()}`
                  : 'Active'}
              </td>
              <td>
                <DeleteSubscriberButton email={subscriber.email} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </GeneralSection>
  )
}
