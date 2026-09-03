export interface GroupRequest {
  id: string;
  name: string;
  description: string;
  ageLimit: number;
  colourTheme: string;
  requestedByUserId: string;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason: string | null;
}