# JSON Serialization Fix for getServerSideProps

## 🚨 **Problem:**
```
Error: Error serializing `.userPlan.startDate` returned from `getServerSideProps` in "/dashboard/pro".
Reason: `object` ("[object Date]") cannot be serialized as JSON. Please only return JSON serializable data types.
```

## 🔍 **Root Cause:**
Next.js `getServerSideProps` can only return JSON-serializable data. `Date` objects cannot be serialized to JSON.

## ✅ **Solution Applied:**

### **1. Updated UserPlan Interface**
```typescript
export interface UserPlan {
  // ...
  startDate: string; // Changed from Date to ISO string
  // ...
}
```

### **2. Updated Plan Generation Functions**
```typescript
// BEFORE:
startDate: new Date(),

// AFTER:
startDate: new Date().toISOString(),
```

### **3. Updated Google Ads Data Interfaces**
```typescript
export interface CleanGoogleAdsData {
  // ...
  lastUpdated: string; // Changed from Date to ISO string
  // ...
}

export interface CleanGoogleAdsConnection {
  // ...
  lastSync?: string; // Changed from Date to ISO string
  // ...
}
```

### **4. Updated Component Date Handling**
```typescript
// BEFORE:
Last updated: {googleAdsData.lastUpdated.toLocaleString()}

// AFTER:
Last updated: {new Date(googleAdsData.lastUpdated).toLocaleString()}
```

## 📁 **Files Updated:**
- ✅ `lib/server-side-auth.ts` - UserPlan interface and plan functions
- ✅ `lib/clean-google-ads.ts` - Google Ads data interfaces
- ✅ `lib/google-ads-client.ts` - Connection status interface
- ✅ `components/dashboard/CleanMarketingROIDashboard.tsx` - Date display

## 🎯 **Result:**
- ✅ **No more JSON serialization errors**
- ✅ **Clean server-side rendering**
- ✅ **Proper date handling** in components
- ✅ **Fast, reliable page loads**

## 💡 **Key Learning:**
Always use ISO strings for dates in `getServerSideProps` and convert to Date objects in components when needed.
