import { Table, Button, Spin } from 'antd'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Social Security',
    dataIndex: 'socialSecurity',
    key: 'socialSecurity',
  },
  {
    title: 'Birth Date',
    dataIndex: 'birthDate',
    key: 'birthDate',
    render: (ms) => new Date(ms).toLocaleDateString()
  },
]

function Dashboard() {
  const navigate = useNavigate()
  const [students, setStudents] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  function goBack () {
    navigate("/")
  }

  function loadStudents() {
    setTimeout(() => {
      const students = localStorage.getItem('students')
      if (!students) {
        return
      }
      setStudents(JSON.parse(students))
      setIsLoading(false)
    }, 1000)
  }

  useEffect(() => {
    loadStudents()
  }, [])

  if (isLoading) {
    return <Spin size="large" />
  }

  return (<>
    <div>
      <Button
          type="link"
          size="small"
          onClick={() => {
            goBack()
          }}
        >
        Back
      </Button>
    </div>
    <Table dataSource={students} columns={columns} />
  </>)
}

export default Dashboard