import { formatDistance } from "date-fns";

export const formatTimeDistance = (timeString: string): string => {
  const presentDay = new Date();
  const dateObj = new Date(timeString);

  return `${formatDistance(presentDay, dateObj)} ago`;
};
