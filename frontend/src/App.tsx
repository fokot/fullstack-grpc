import { useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'

export default function App() {
  const { register, handleSubmit } = useForm()

  const { data, isLoading } = useQuery({
    queryKey: ['example'],
    queryFn: () => fetch('/api/data').then(res => res.json())
  })

  const onSubmit = (data: any) => {
    console.log('Form submitted:', data)
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Starter Template</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register('name')}
          className="w-full p-2 border rounded"
          placeholder="Your name"
        />
        <Button type="submit">Submit</Button>
      </form>

      <div className="mt-6">
        {isLoading ? <p>Loading...</p> : <pre>{JSON.stringify(data, null, 2)}</pre>}
      </div>
    </div>
  )
}