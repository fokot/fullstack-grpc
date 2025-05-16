import { useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'

export default function App() {
  const { register, handleSubmit } = useForm()

  const { 
    data, 
    isLoading, 
    refetch, 
    isRefetching, 
    isError, 
    error 
  } = useQuery({
    queryKey: ['example'],
    queryFn: () => fetch('http://localhost:8080/random').then(res => res.text())
  })

  const onSubmit = (formData: any) => {
    console.log('Form submitted:', formData)
    // Trigger refetch of the random data
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