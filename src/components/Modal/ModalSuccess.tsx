import Modal from '.'
import { Success } from '../Icons/Status'

const ModalSuccess = ({
  // status prop type react element
  status = Success,
  btnLink = '/',
  btnName = 'الصفحة الرئيسية',
  msg = `مبروك تم العمل بنجاح! بإمكانك العودة الى ${btnName} إضغط الزر أدناه`,
  fullscreen = false
}: any) => {
  return (
    <Modal
      status={status}
      msg={msg}
      btnName={btnName}
      btnLink={btnLink}
      fullscreen={fullscreen}
    />
  )
}

export default ModalSuccess
