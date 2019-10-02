export class BookedPackage { // Class that holds booked package details

  BookingDate: Date; // Date on which package is booked
  PkgName: string; // Package name
  Image; // Imge as base 64 string
  Partner: string; // Partner url (currently not shown)
  PkgStartDate: Date; // Package start date
  PkgEndDate: Date; // Package end date
  PkgDesc: string; // Package description
  PkgBasePrice: number; // Package price

}
