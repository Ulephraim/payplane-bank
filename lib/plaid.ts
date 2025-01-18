/** @format */

import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox, // Use sandbox for development
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID || '', // Ensure client ID is loaded from env
      'PLAID-SECRET': process.env.PLAID_SECRET || '', // Ensure secret is loaded from env
    },
  },
});

export const plaidClient = new PlaidApi(configuration);

// Utility function to handle API errors
const handlePlaidError = (error: any) => {
  console.error('Plaid API error:', error);
  if (error.response) {
    // This will capture the response object from Plaid API errors
    console.error('Error response:', error.response);
  } else if (error.request) {
    // This will capture network issues or no response from Plaid API
    console.error('Error request:', error.request);
  } else {
    // Catch other types of errors
    console.error('Error message:', error.message);
  }
};

// Example of using plaidClient with error handling
export const getPlaidData = async (accessToken: string) => {
  try {
    const response = await plaidClient.accountsGet({
      access_token: accessToken,
    });

    return response.data; // or handle response as needed
  } catch (error) {
    handlePlaidError(error); // Logs detailed error info
    throw new Error('Failed to fetch account data from Plaid');
  }
};
