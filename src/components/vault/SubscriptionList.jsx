import SubscriptionCard from './SubscriptionCard'

export default function SubscriptionList() {
  return (
    <div
      className="p-5 rounded-3xl h-full flex flex-col justify-between transition-all duration-300"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
      }}
    >
      <div>
        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
              Active Payments
            </p>
            <h3 className="text-lg font-bold mt-0.5" style={{ color: 'var(--color-text)' }}>Subscriptions</h3>
          </div>

          <button
            className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-xl transition-all duration-200"
            style={{ color: 'var(--color-primary)', background: 'rgba(120,90,255,0.12)', border: '1px solid rgba(120,90,255,0.25)' }}
          >
            Manage
          </button>
        </div>

        {/* LIST */}
        <div className="space-y-3">
          <SubscriptionCard
            name="Spotify Premium"
            price="$9.99"
            renewal="May 28"
            color="linear-gradient(135deg, #1DB954, #1ed760)"
          />
          <SubscriptionCard
            name="Netflix UHD"
            price="$15.49"
            renewal="June 02"
            color="linear-gradient(135deg, #E50914, #b20710)"
          />
          <SubscriptionCard
            name="ChatGPT Plus"
            price="$20.00"
            renewal="June 10"
            color="linear-gradient(135deg, #10a37f, #0d8366)"
          />
          <SubscriptionCard
            name="Apple iCloud+"
            price="$3.99"
            renewal="May 31"
            color="linear-gradient(135deg, #5fc38d, #6ea8ff)"
          />
        </div>
      </div>
    </div>
  )
}