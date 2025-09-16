# 🚀 SiteOptz Upgrade System

A comprehensive upgrade system that handles both logged-in and non-logged-in users, with dynamic button text and Stripe payment integration.

## 📋 Features

- **Dynamic Button Text**: Shows "Subscribe" for non-logged-in users, "Upgrade" for logged-in users
- **Stripe Integration**: Secure payment processing with checkout sessions
- **User State Management**: Tracks login status and current plan
- **Intended Upgrade Flow**: Stores upgrade intent for users who need to log in first
- **Plan Management**: Handles upgrades, downgrades, and new subscriptions
- **Analytics Tracking**: Comprehensive event tracking for conversion optimization

## 🏗️ Architecture

### Components

1. **`UpgradeButton`** - Main upgrade button component with dynamic text
2. **`StripePaymentModal`** - Modal for payment processing
3. **`UpgradeExample`** - Complete example implementation

### Hooks

1. **`useUpgradeFlow`** - Manages upgrade flow state and actions
2. **`useUpgradeButton`** - Provides button text and behavior logic
3. **`useStripeCheckout`** - Handles Stripe checkout integration

### API Endpoints

1. **`/api/upgrade/subscription`** - Handles subscription upgrades
2. **`/api/user/plan-status`** - Returns user's current plan status
3. **`/api/create-checkout-session`** - Creates Stripe checkout sessions

## 🚀 Quick Start

### 1. Basic Usage

```tsx
import UpgradeButton from '../components/UpgradeButton';

function PricingCard() {
  return (
    <UpgradeButton
      plan="starter"
      price={497}
      billingCycle="yearly"
      onUpgradeSuccess={(plan) => console.log(`Upgraded to ${plan}`)}
    />
  );
}
```

### 2. With Custom Styling

```tsx
<UpgradeButton
  plan="pro"
  price={1997}
  variant="primary"
  size="lg"
  className="w-full"
  showIcon={true}
/>
```

### 3. Using the Payment Modal

```tsx
import StripePaymentModal from '../components/StripePaymentModal';

function UpgradePage() {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <>
      <button onClick={() => setShowModal(true)}>
        Upgrade Now
      </button>
      
      <StripePaymentModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        plan="starter"
        billingCycle="yearly"
        onSuccess={(plan) => console.log(`Success: ${plan}`)}
        onError={(error) => console.error(`Error: ${error}`)}
      />
    </>
  );
}
```

## 🔧 Configuration

### Environment Variables

Add these to your `.env.local`:

```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Stripe Price IDs
STRIPE_STARTER_MONTHLY_PRICE_ID=price_...
STRIPE_STARTER_YEARLY_PRICE_ID=price_...
STRIPE_PRO_MONTHLY_PRICE_ID=price_...
STRIPE_PRO_YEARLY_PRICE_ID=price_...

# NextAuth Configuration
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### Stripe Setup

1. Create products and prices in your Stripe dashboard
2. Copy the price IDs to your environment variables
3. Configure webhooks for subscription events

## 📊 Button Behavior

### For Non-Logged-In Users
- Button text: **"Subscribe"**
- Icon: User icon
- Action: Redirects to login/register, stores intended upgrade

### For Logged-In Users
- Button text: **"Upgrade"** (or "Upgrade to Pro" for cross-plan upgrades)
- Icon: Crown icon
- Action: Opens Stripe checkout directly

## 🔄 Upgrade Flow

### 1. Non-Logged-In User Flow
```
User clicks "Subscribe" → 
Redirected to login → 
After login, upgrade intent is restored → 
Redirected to Stripe checkout
```

### 2. Logged-In User Flow
```
User clicks "Upgrade" → 
Stripe checkout opens → 
Payment processed → 
User redirected to success page
```

## 🎯 API Usage

### Get User Plan Status

```typescript
const response = await fetch('/api/user/plan-status');
const data = await response.json();

if (data.success) {
  console.log('Current plan:', data.planStatus.plan);
  console.log('Billing cycle:', data.planStatus.billingCycle);
}
```

### Initiate Upgrade

```typescript
const response = await fetch('/api/upgrade/subscription', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    plan: 'starter',
    billingCycle: 'yearly'
  })
});

const data = await response.json();
if (data.success) {
  // Redirect to Stripe checkout
  window.location.href = data.url;
}
```

## 📈 Analytics Events

The system tracks these events automatically:

- `upgrade_button_click` - When upgrade button is clicked
- `upgrade_initiated` - When upgrade process starts
- `login_with_intended_upgrade` - When user logs in with pending upgrade
- `payment_initiated` - When payment process starts
- `payment_success` - When payment is successful
- `payment_error` - When payment fails
- `upgrade_completed` - When upgrade is fully completed

## 🎨 Customization

### Button Variants

```tsx
// Primary (default)
<UpgradeButton variant="primary" />

// Secondary
<UpgradeButton variant="secondary" />

// Outline
<UpgradeButton variant="outline" />
```

### Button Sizes

```tsx
<UpgradeButton size="sm" />   // Small
<UpgradeButton size="md" />   // Medium (default)
<UpgradeButton size="lg" />   // Large
```

### Custom Styling

```tsx
<UpgradeButton
  className="w-full bg-gradient-to-r from-purple-600 to-pink-600"
  showIcon={false}
/>
```

## 🔒 Security Features

- **Authentication Required**: All upgrade endpoints require user authentication
- **Stripe Security**: Uses Stripe's secure checkout system
- **Input Validation**: All inputs are validated on both client and server
- **Rate Limiting**: Built-in rate limiting for API endpoints
- **CSRF Protection**: NextAuth provides CSRF protection

## 🧪 Testing

### Test the Complete Flow

1. **Non-logged-in user**:
   - Click "Subscribe" button
   - Should redirect to login
   - After login, should show upgrade intent

2. **Logged-in user**:
   - Click "Upgrade" button
   - Should open Stripe checkout
   - Complete payment flow

3. **Plan status**:
   - Check `/api/user/plan-status` endpoint
   - Verify correct plan is returned

### Test Stripe Integration

```bash
# Test with Stripe test cards
4242424242424242  # Success
4000000000000002  # Declined
4000000000009995  # Insufficient funds
```

## 🚨 Error Handling

The system handles these error scenarios:

- **Authentication errors**: Redirects to login
- **Payment errors**: Shows error message in modal
- **Network errors**: Retry mechanism with user feedback
- **Invalid plans**: Validation with clear error messages
- **Stripe errors**: Graceful fallback with error details

## 📱 Mobile Optimization

- Responsive design for all screen sizes
- Touch-friendly button sizes (44px minimum)
- Optimized modal for mobile devices
- Fast loading with minimal JavaScript

## 🔧 Troubleshooting

### Common Issues

1. **Button shows "Loading..." indefinitely**
   - Check NextAuth session configuration
   - Verify `NEXTAUTH_SECRET` is set

2. **Stripe checkout fails**
   - Verify Stripe keys are correct
   - Check price IDs in environment variables
   - Ensure webhook endpoints are configured

3. **Upgrade intent not restored after login**
   - Check localStorage is enabled
   - Verify intended upgrade hasn't expired (1 hour limit)

### Debug Mode

Enable debug logging:

```typescript
// In your component
const { isLoggedIn, currentPlan, intendedUpgrade } = useUpgradeFlow();
console.log('Upgrade flow state:', { isLoggedIn, currentPlan, intendedUpgrade });
```

## 📚 Examples

See `components/UpgradeExample.tsx` for a complete implementation example that demonstrates:

- Multiple button styles and sizes
- Payment modal integration
- User status display
- Billing cycle toggle
- Feature comparison
- Security guarantees

## 🤝 Contributing

When adding new features:

1. Update the TypeScript interfaces
2. Add proper error handling
3. Include analytics tracking
4. Update this documentation
5. Add tests for new functionality

## 📄 License

This upgrade system is part of the SiteOptz project and follows the same licensing terms.
