import React from 'react'
import JSONPretty from 'react-json-pretty'

interface JsonPrettyProps {
  data: string
}

const JsonPretty: React.FC<JsonPrettyProps> = (props) => {
  const { data } = props
  return <JSONPretty id="json-pretty-header" data={data} />
}

export default JsonPretty
