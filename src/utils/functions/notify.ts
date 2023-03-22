import { toast } from 'react-toastify'

export default function notify({
  type = 'success',
  msg
}: {
  type: 'success' | 'info' | 'error'
  msg: string
}) {
  return toast(msg, {
    toastId: type,
    type:
      type === 'success'
        ? toast.TYPE.SUCCESS
        : type === 'info'
        ? toast.TYPE.INFO
        : type === 'error'
        ? toast.TYPE.ERROR
        : toast.TYPE.DEFAULT
  })
}
