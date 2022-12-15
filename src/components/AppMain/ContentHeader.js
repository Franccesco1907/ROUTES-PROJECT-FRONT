import { Form, useForm } from "../useForm";
import { Grid, Typography, Box } from "@mui/material";
import { PR } from "../PackRunner/PR";

export default function ContentHeader({ text, cbo, records, setRecords }) {
  //console.log(records)

  return (
    <Form>
      <Grid container>
        <Grid item>
          <PR.Title size="big" text={text} />
        </Grid>
        <Grid item sm />
      </Grid>
    </Form>
  );
}
