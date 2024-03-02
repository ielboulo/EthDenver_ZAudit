export interface FunctionData {
  id: number;
  contractAddress: string;
  name: string;
  securityLevel: 'Critical' | 'High' | 'Medium' | 'Low';
  details: string; // Adding a details field for vulnerability descriptions
}

export const mockedFunctions: FunctionData[] = [
  {
    id: 1,
    contractAddress: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    name: 'transferFrom',
    securityLevel: 'Medium',
    details: 'This function exposes user data without proper authentication checks. It can be accessed publicly by any caller, potentially leading to data leaks and privacy violations.',
  },
  {
    id: 2,
    contractAddress: "0xExampleContractAddress",
    name: 'setUserPassword',
    securityLevel: 'Critical',
    details: 'Allows password resets without verifying the current password, leading to account takeover. This function does not implement rate limiting or checks against previous passwords, further increasing the risk.',
  },
  {
    id: 3,
    contractAddress: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    name: 'redeem',
    securityLevel: 'High',
    details: 'This function allows an account to be redeemed without sufficient security checks, leading to potential unauthorized account deletions. It lacks a multi-factor authentication step for such a critical action.',
  },
  {
    id: 4,
    contractAddress: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    name: 'restake',
    securityLevel: 'Low',
    details: 'While this function includes basic checks, it does not verify the new email address against a known list of malicious domains, which could lead to phishing attacks.',
  },
  {
    id: 5,
    contractAddress: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    name: 'withdrawFunds',
    securityLevel: 'Critical',
    details: 'The function does not properly check the caller’s permissions, allowing anyone to trigger withdrawals. This critical vulnerability could lead to total loss of funds stored in the contract.',
  },
  {
    id: 6,
    contractAddress: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    name: 'addAdmin',
    securityLevel: 'High',
    details: 'This function allows adding new admin users without adequate logging or notification to existing administrators, raising potential security oversight issues.',
  },
  // You can add more functions as needed
];
