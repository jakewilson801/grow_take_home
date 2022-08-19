import moment from "moment";
export default function PageDateOptions(props: {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
}) {
  return (
    <input
      type="date"
      value={props?.selectedDate}
      onChange={(event) => {
        const selected = event?.target.value;
        if (
          !(
            moment(selected).isAfter(moment()) ||
            moment(selected).format("yyyy-DD-MM") ===
              moment().format("yyyy-DD-MM") ||
            moment(selected).year() < 2000
          )
        ) {
          props?.setSelectedDate(event?.target.value);
        }
      }}
    />
  );
}
