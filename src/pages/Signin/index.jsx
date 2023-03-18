import { useMutation } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { signinFetch } from '../../api/user'
import { setUser } from "../../redux/slices/user";

const SignInSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});


export const Signin = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const initialValues = {
    password: '',
    email: '',
  }

  const { mutateAsync } = useMutation({
    mutationFn: (values) => {
      return signinFetch(values)
    },
  })

  const onSubmit = async (values) => {
    const res = await mutateAsync(values)

    if (res.ok) {
      const responce = await res.json();
      dispatch(setUser({
        ...responce.data,
        token: responce.token
      }))
      return navigate('/products')
    }

    return alert('Что то пошло не так')
  }


  return (
    <div>
      <h1>Sign In</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={SignInSchema}
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

          <label htmlFor="password">Пароль</label>
          <Field id="password" name="password" type="password" placeholder="Пароль" />
          <ErrorMessage name="password" />


          <button type="submit" className="btn btn-primary">Войти</button>
          <p>У вас еще нет аккаута? <Link to={"/signup"}>Зарегистрироваться</Link> </p>
        </Form>
      </Formik>
    </div>
  )
}
