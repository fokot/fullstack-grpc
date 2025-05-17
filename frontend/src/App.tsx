import { useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
// Import service definition that you want to connect to.
import { MyApi } from "./gen/my_api_pb";
import {createConnectTransport} from "@connectrpc/connect-web";
import {createClient} from "@connectrpc/connect";
import {useState} from "react";

export default function App() {
  // State to store the name from form submission
  const [submittedName, setSubmittedName] = useState('Fero');

  // The transport defines what type of endpoint we're hitting.
  // In our example we'll be communicating with a Connect endpoint.
  const transport = createConnectTransport({
    baseUrl: "http://localhost:8080",
    useBinaryFormat: true,
  });

  // Here we make the client itself, combining the service
  // definition with the transport.
  const client = createClient(MyApi, transport);

  const { register, handleSubmit } = useForm()

  const { 
    data, 
    isLoading, 
    refetch, 
    isRefetching, 
    isError, 
    error 
  } = useQuery({
    queryKey: ['example', submittedName],
    // queryFn: () => fetch('http://localhost:8080/random').then(res => res.text())
    queryFn: () =>
      client.hello({name: submittedName}).then((response) => response.message),
  })

  const onSubmit = (formData: any) => {
    console.log('Form submitted:', formData)
    // Update the submitted name
    setSubmittedName(formData.name)
    // Trigger refetch of the data with the new name
    refetch()
  }

  const isSubmitting = isLoading || isRefetching

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Starter Template</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register('name')}
          className="w-full p-2 border rounded"
          placeholder="Your name"
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Loading...' : 'Submit'}
        </Button>
      </form>

      <div className="mt-6">
        {isSubmitting ? (
          <p>Loading data...</p>
        ) : isError ? (
          <div className="text-red-500">Error: {error.message}</div>
        ) : (
          <div>
            <h2 className="text-xl font-bold">Random Data:</h2>
            <pre className="bg-gray-100 p-3 rounded mt-2">{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  )
}