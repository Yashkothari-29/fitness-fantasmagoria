
import { LucideProps } from 'lucide-react';

export const Dumbbell = (props: LucideProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M6.5 6.5h11" />
      <path d="M6.5 17.5h11" />
      <path d="M4 9.5v5" />
      <path d="M9 4.5v15" />
      <path d="M15 4.5v15" />
      <path d="M20 9.5v5" />
    </svg>
  );
};

export default Dumbbell;
