import { useMutation } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { signupFetch, signinFetch } from '../../api/user'

const SignUpSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  group: Yup.string()
    .min(4, 'Too Short!')
    .max(10, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});


export const Signup = () => {
  const navigate = useNavigate()

  const initialValues = {
    password: '',
    email: '',
    group: '9-gr'
  }

  const { mutateAsync: mutateUp } = useMutation({
    mutationFn: (values) => {
      return signupFetch(values)
    },
  })

  const { mutate: mutateIn } = useMutation({
    mutationFn: async (values) => {
      const res = await signinFetch(values)
      if (res.ok) {
        const responce = await res.json()
        localStorage.setItem('token', responce.token)
        return navigate('/products')
      }

      return alert('Что то пошло не так')
    },
  })

  const onSubmit = async (values) => {
    const res = await mutateUp(values)

    if (res.ok) {
      return mutateIn({ email: values.email, password: values.password })
    }

    return alert('Что то пошло не так')
  }


  return (
    <div>
      <h1>Sign Up</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={SignUpSchema}
        onSubmit={onSubmit}
      >
        <Form className="d-flex flex-column" style={{ maxWidth: '400px' }}>
          <label htmlFor="email">Email</label>
          <Field
            id="email"
            name="email"
            placeholder="jane@acme.com"
            type="email"
          />
          <ErrorMessage name="email" />

          <label htmlFor="group">Группа</label>
          <Field id="group" name="group" placeholder="Группа" />
          <ErrorMessage name="group" />

          <label htmlFor="password">Пароль</label>
          <Field id="password" name="password" type="password" placeholder="Пароль" />
          <ErrorMessage name="password" />


          <button type="submit" className="btn btn-primary">Зарегистироваться</button>
          <p>У вас уже есть аккаут? <Link to={"/signin"}>Войти</Link> </p>
        </Form>
      </Formik>
    </div>
  )
}
