type Props = {
  type?: string
  label: string
  state: string
  placeholder: string
  isTextArea?: boolean
  setState: (value: string) => void
}

const FormField = ({ type, label, state, placeholder, isTextArea, setState }: Props) => {
  return (
    <div className="flexStart flex-col w-full gap-4">
      <label htmlFor="" className="w-full text-gray-100">
        {label}
      </label>

      {isTextArea ? (
        <textarea placeholder={placeholder} value={state} required className="form_field-input" onChange={(e) => setState(e.target.value)} />
      ) : (
        <input type={type || 'text'} placeholder={placeholder} value={state} required className="form_field-input" onChange={(e) => setState(e.target.value)} />
      )}
    </div>
  )
}

export default FormField
