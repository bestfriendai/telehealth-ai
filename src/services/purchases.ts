import { useState } from 'react';
// Note: In production, install react-native-purchases

export const PRODUCT_IDS = {
  MONTHLY: 'telehealth_premium_monthly',
  ANNUAL: 'telehealth_premium_annual',
};

export type SubscriptionStatus = {
  isPremium: boolean;
  expirationDate: Date | null;
  productId: string | null;
};

// Mock package type
export type Package = {
  identifier: string;
  product: {
    productId: string;
    title: string;
    description: string;
    price: string;
    priceString: string;
  };
};

export function useRevenueCat() {
  const [status, setStatus] = useState<SubscriptionStatus>({
    isPremium: false,
    expirationDate: null,
    productId: null,
  });

  const [packages, setPackages] = useState<Package[]>([]);

  // Mock implementations - replace with real RevenueCat SDK in production
  const purchasePackage = async (_package: Package): Promise<boolean> => {
    // In production, use:
    // const { purchaserInfo } = await Purchases.purchasePackage(_package);
    console.log('Mock purchase:', _package.identifier);
    return true;
  };

  const restorePurchases = async (): Promise<SubscriptionStatus> => {
    // In production, use:
    // const purchaserInfo = await Purchases.restoreTransactions();
    return status;
  };

  return {
    status,
    packages,
    purchasePackage,
    restorePurchases,
  };
}
