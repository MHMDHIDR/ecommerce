import { NotifyProps } from '@/types'
import { toast } from 'react-toastify'

/**
 *
 * @param type = the type of the notification can be ['success', 'info', 'error']
 * @param msg = the message of the notification can be any text
 * @param reloadIn = the Time until notification reloads the page
 * @param reloadTo = the destination where the page should be reloaded to
 * @param position = the position of the notification on the page, can be
 *  'top-right' ,'top-center' ,'top-left' ,'bottom-right' ,'bottom-center' ,'bottom-left'
 * @param duration = how long should the notification last on the page, defult is 5 Seconds
 * @returns customized notification alert
 */
export default function notify({
  type = 'success',
  msg,
  reloadIn,
  reloadTo,
  position,
  duration = 5 //5 Seconds
}: NotifyProps) {
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
          : toast.TYPE.DEFAULT,
      position,
      autoClose: duration * 1000
    }
  )
}
