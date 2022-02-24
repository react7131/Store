const Input = ({type, name, value, label, onChange, onBlur,  inputRef, dirty, errors}) => {
    return (
        <div className="mb-3">
                <label htmlFor={name}>{label}</label>
                <input 
                    type={type}
                    ref={inputRef}
                    className="form-control" 
                    id= {name}
                    name= {name}
                    value={value} 
                    onChange={onChange}
                    onBlur={onBlur}
                />
                <div className="text-danger">
                    {dirty[name]&&errors[name] ? errors[name] : ''}
                </div>
            </div>
    )
}

export default Input;