type TicketType = {
  id: string;
  active: boolean;
  name: string;
  description: string;
  price: number;
  quantity?: number;
  warningLimit?: number;
  soldRecently?: number;
  benefits?: string;
};

export default TicketType;
