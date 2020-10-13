import React from "react";
import { Formik, Form, Field } from "formik";
import { FilterType } from '../../Redux/Users-reducer';

type setSubmittingType = {
  setSubmitting: (isSubmitting: boolean) => void;
};

type PropsType = {
  onFilterChanged: (filter: FilterType) => void;
};

type FormType = {
  term: string,
  friend: 'true' | 'false' | 'null',
};

const userSearchFormValidate = (values: any) => {
  const errors = {};
  return errors;
};

const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {
  const submit = (
    values: FormType,
    { setSubmitting }: setSubmittingType
  ) => {
    const filter: FilterType = {
      term: values.term,
      friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
    };
    props.onFilterChanged(filter);
    setSubmitting(false);
  };

  return (
    <div>
      <Formik
        initialValues={{ term: "", friend: 'null' }}
        validate={userSearchFormValidate}
        onSubmit={submit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="term" />
            <Field as="select" name="friend">
             <option value="null">All</option>
             <option value="true">Only followed</option>
             <option value="false">Only unfollowed</option>
           </Field>
            <button type="submit" disabled={isSubmitting}>
              Find
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
});

export default UsersSearchForm;
