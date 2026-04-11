import { format } from 'date-fns';

export const getInitials = (fullName: string | undefined) => {
  if (!fullName) return 'N/A';
  return fullName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();
};

export const formatDate = (date?: string | number | Date, dateFormat?: string) => {
  if (!date) return '-';
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) return '-';
  return dateFormat ? format(parsedDate, dateFormat) : format(parsedDate, 'dd MMM yyyy, hh:mm a');
};

export const formatCurrency = (value: number, currency = 'INR') =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value);

export const formatRole = (role: string | undefined) => {
  if (!role) return '';
  return role
    .split('_')
    .map(word => word.charAt(0) + word.slice(1).toLowerCase())
    .join(' ');
};
