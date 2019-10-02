export class Customer { // Customer information (available to user for editing)
      customerId: number; // Customer id
      custFirstName: string; // First name
      custLastName: string; // Last name
      custAddress: string; // Address
      custCity: string; // City
      custProv: string; // Province
      custPostal: string; // Postal code
      custCountry: string; // Country
      custHomePhone: string; // Home phone #
      custBusPhone: string; // Business phone # (optional)
      custEmail: string; // Email (optional)
      Username: string; // Username
      AgentId?: number; // Agent id if assigned
      
}
