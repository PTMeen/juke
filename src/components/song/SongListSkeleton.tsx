import { Skeleton, Stack } from "@mui/material";

function SongListSkeleton() {
  return (
    <Stack direction="column" rowGap={2}>
      <Skeleton variant="rounded" width="100%" height={130} />
      <Skeleton variant="rounded" width="100%" height={130} />
      <Skeleton variant="rounded" width="100%" height={130} />
      <Skeleton variant="rounded" width="100%" height={130} />
    </Stack>
  );
}
export default SongListSkeleton;
