import  { useState } from 'react';
import { Button, Form, Input, DatePicker } from 'antd';
import { useNavigate } from "react-router-dom";

const onFinish = (values) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

function Register() {
  const [form] = Form.useForm()
  const [isBtnDisabled, setIsBtnDisabled] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  function onDateChange(data) {
    console.log('form', form)
    console.log('date changed', data)
  }

  function onValuesChangeHandler () {
    if (!form.isFieldsTouched({allTouched: true})) {
      return
    }
    const allErrors = form.getFieldsError()
    for (const errItem of allErrors) {
      if (errItem.errors.length !== 0) {
        return
      }
    }
    setIsBtnDisabled(false)
  }

  function onSubmit() {
    setIsBtnDisabled(() => true)
    setIsLoading(() => true)
    setTimeout(() =>{
      const students = localStorage.getItem('students')
      const newStudentData = form.getFieldsValue(true)
      newStudentData.birthDate = newStudentData.birthDate.$d.getTime()
      if (students) {
        const arr = JSON.parse(students)
        newStudentData.key = arr.length + 1
        arr.push(newStudentData)
        localStorage.setItem('students', JSON.stringify(arr))
      } else {
        newStudentData.key = 1
        localStorage.setItem('students', JSON.stringify([newStudentData]))
      }
      navigate('/dashboard')
    }, 2000)
  }

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 10 }}
      wrapperCol={{ span: 20 }}
      style={{ minWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      onValuesChange={onValuesChangeHandler}
    >
      <Form.Item
        label="Name"
        name="name"
        hasFeedback
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Social Security"
        name="socialSecurity"
        hasFeedback
        rules={[{ required: true, message: 'Please input your social security number!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Birth Date"
        name="birthDate"
        hasFeedback
        rules={[{ required: true, message: 'Please input your date of birth!' }]}
      >
        <DatePicker onChange={onDateChange} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 10, span: 20 }}>
        <Button type="primary" htmlType="submit"
          onClick={onSubmit}
          disabled={isBtnDisabled}
          loading={isLoading} >
          Register
        </Button>
      </Form.Item>
    </Form>

  )
}

export default Register;