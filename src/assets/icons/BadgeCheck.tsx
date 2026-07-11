interface BadgeCheckProps {
  className?: string;
}

export default function BadgeCheck({ className }: BadgeCheckProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 2.5 15 5.2 18.8 5l.7 3.8L22 12l-2.5 3.2-.7 3.8-3.8-.2L12 21.5 9 18.8 5.2 19l-.7-3.8L2 12l2.5-3.2L5.2 5l3.8.2L12 2.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="m8.7 12 2 2 4.6-5.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
