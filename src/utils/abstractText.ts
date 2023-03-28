const abstractText = (txt: string, txtLength?: number) =>
  txtLength ? (txt?.length > txtLength ? txt.slice(0, txtLength) + '...' : txt) : txt

export default abstractText
