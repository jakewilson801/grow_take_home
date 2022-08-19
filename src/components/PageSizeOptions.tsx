export default function PageSizeOptions(props: {
  pageSize: number;
  setPageSize: (size: number) => void;
}) {
  return (
    <select
      data-testid={"PAGE_SIZE"}
      defaultValue={props?.pageSize}
      onChange={(event) => props?.setPageSize(Number(event?.target.value))}
    >
      <option value={25}>25</option>
      <option value={50}>50</option>
      <option value={75}>75</option>
      <option value={100}>100</option>
      <option value={200}>200</option>
    </select>
  );
}
