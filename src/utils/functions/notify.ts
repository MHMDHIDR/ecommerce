import { toast } from 'react-toastify'

export default function notify({
  type = 'success',
  msg,
  reloadIn,
  reloadTo
}: {
  type: 'success' | 'info' | 'error'
  msg: string
  reloadIn?: number
  reloadTo?: string
}) {
  reloadIn &&
    setTimeout(() => {
      reloadTo ? location.replace(reloadTo) : location.reload()
    }, reloadIn)
  return toast(
    reloadIn
      ? msg +
          ` سيتم ${reloadTo ? 'إعادة توجيهك' : 'تحديث الصفحة'} في ${
            reloadIn > 1000 ? reloadIn / 1000 + ' ثوان' : 'ثانية'
          }`
      : msg,
    {
      toastId: type,
      type:
        type === 'success'
          ? toast.TYPE.SUCCESS
          : type === 'info'
          ? toast.TYPE.INFO
          : type === 'error'
          ? toast.TYPE.ERROR
          : toast.TYPE.DEFAULT
    }
  )
}
